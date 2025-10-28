class CombatSimulator {
    constructor() {
        this.combatants = [];
        this.currentTurnIndex = 0;
        this.combatActive = false;
        this.simulationRunning = false;
        this.combatRound = 0;
        this.initiativeOrder = [];
        this.currentTeamFilter = 'All Teams';
        this.selectedMonsterTeam = 'Team A'; // Track selected monster team
        // Surprise Round: which team is surprised this combat (null | 'Team A' | 'Team B')
        this.surprisedTeam = null;
        
        this.initializeEventListeners();
        this.updateDisplay();
    }

    // Decrement and expire timed conditions once per round (duration measured in rounds)
    processTimedConditions() {
        try {
            for (const combatant of this.initiativeOrder) {
                if (!combatant || !Array.isArray(combatant.conditions)) continue;
                const next = [];
                for (const cond of combatant.conditions) {
                    if (cond && typeof cond === 'object' && typeof cond.duration === 'number' && cond.duration > 0) {
                        cond.duration -= 1;
                        if (cond.duration <= 0) {
                            const nm = cond.name || 'condition';
                            this.logMessage(`⌛ ${combatant.name}'s ${nm} expires.`);
                            continue; // drop expired
                        }
                    }
                    next.push(cond);
                }
                combatant.conditions = next;
            }
        } catch {}
    }

    // Remove Grappled conditions maintained by any incapacitated grappler
    removeGrappledMaintainedByIncapacitated() {
        for (const grappler of this.initiativeOrder) {
            if (!grappler || !this.isCombatantIncapacitated(grappler)) continue;
            this.removeGrappledMaintainedBy(grappler);
        }
    }

    // Remove Grappled from all creatures grappled by the given grappler
    removeGrappledMaintainedBy(grappler) {
        if (!grappler) return;
        for (const creature of this.initiativeOrder) {
            if (!Array.isArray(creature?.conditions)) continue;
            const before = creature.conditions.length;
            creature.conditions = creature.conditions.filter(cond => {
                if (typeof cond === 'object' && /grappled/i.test(cond.name || '') && String(cond.grappler_name || cond.grappler || '').toLowerCase() === String(grappler.name || '').toLowerCase()) {
                    this.logMessage(`${creature.name} is no longer Grappled (grappler ${grappler.name} is incapacitated or gone).`);
                    return false;
                }
                return true;
            });
            if (creature.conditions.length !== before) this.updateDisplay();
        }
    }

    // Frightened helpers
    findCombatantByName(name) {
        if (!name) return null;
        const lower = String(name).toLowerCase();
        return (this.initiativeOrder || []).find(c => String(c.name || '').toLowerCase() === lower) || null;
    }
    isSourceVisibleTo(combatant, source) {
        if (!combatant || !source) return false;
        // If the observer is Blinded and lacks Blindsight, they can't see the source
        if (this.hasAnyCondition(combatant, ['Blinded']) && !(this.hasBlindsight && this.hasBlindsight(combatant))) return false;
        // If the source is Invisible and observer lacks Blindsight, assume not visible
        if (this.hasAnyCondition(source, ['Invisible']) && !(this.hasBlindsight && this.hasBlindsight(combatant))) return false;
        return true; // Without a grid/positions, assume LoS otherwise
    }
    isFrightenedActive(combatant) {
        const cond = this.getConditionObject(combatant, 'Frightened');
        if (!cond) return false;
        const srcName = cond.source_name || cond.fear_source || cond.source || null;
        const src = this.findCombatantByName(srcName);
        if (!src) return false;
        return this.isSourceVisibleTo(combatant, src);
    }

    // Remove Restrained from all creatures that are maintained by the given maintainer (by name/id)
    removeRestrainedMaintainedBy(maintainer) {
        if (!maintainer) return;
        for (const creature of this.initiativeOrder) {
            if (!Array.isArray(creature?.conditions)) continue;
            const before = creature.conditions.length;
            creature.conditions = creature.conditions.filter(cond => {
                if (typeof cond === 'object' && /restrained/i.test(cond.name || '') && String(cond.maintainer || '').toLowerCase() === String(maintainer.name || '').toLowerCase()) {
                    this.logMessage(`${creature.name} is no longer Restrained (maintainer ${maintainer.name} is gone).`);
                    return false;
                }
                return true;
            });
            if (creature.conditions.length !== before) this.updateDisplay();
        }
    }

    // Charmed helpers
    getConditionObject(target, name) {
        if (!target || !Array.isArray(target.conditions)) return null;
        const lower = String(name).toLowerCase();
        for (const c of target.conditions) {
            if (typeof c === 'string') {
                if (c.toLowerCase() === lower) return { name: c };
            } else if (c && typeof c === 'object' && String(c.name || '').toLowerCase() === lower) {
                return c;
            }
        }
        return null;
    }

    removeConditionByName(target, name) {
        if (!target) return;
        if (!Array.isArray(target.conditions)) target.conditions = [];
        target.conditions = target.conditions.filter(c => {
            if (typeof c === 'string') return String(c).toLowerCase() !== String(name).toLowerCase();
            return !(c && typeof c === 'object' && String(c.name || '').toLowerCase() === String(name).toLowerCase());
        });
    }

    isCharmedAgainst(attacker, target) {
        if (!attacker || !target) return false;
        const cond = this.getConditionObject(attacker, 'Charmed');
        if (!cond) return false;
        const charmerName = cond.charmer_name || cond.charmer || cond.source || null;
        return !!charmerName && String(charmerName).toLowerCase() === String(target.name || '').toLowerCase();
    }

    tryBreakCharmedOnDamage(target, attacker) {
        if (!target || !attacker) return;
        const charm = this.getConditionObject(target, 'Charmed');
        if (!charm) return;
        // Break charm on any damage from anyone
        this.removeConditionByName(target, 'Charmed');
        this.logMessage(`${target.name} is no longer Charmed because they took damage.`);
        this.updateDisplay();
    }

    // Remove Frightened if the target takes any damage
    tryBreakFrightenedOnDamage(target) {
        if (!target) return;
        const fear = this.getConditionObject(target, 'Frightened');
        if (!fear) return;
        this.removeConditionByName(target, 'Frightened');
        this.logMessage(`${target.name} is no longer Frightened because they took damage.`);
        this.updateDisplay();
    }

    // Petrified helper
    isPetrified(combatant) {
        return this.hasAnyCondition(combatant, ['Petrified']);
    }

    // Adjust damage for Petrified: immune to poison, resistance to all damage (halve)
    adjustDamageForPetrified(target, amount, damageType) {
        let dmg = amount;
        if (this.isPetrified(target)) {
            const dt = String(damageType || '').toLowerCase();
            if (dt === 'poison') return 0;
            dmg = Math.floor(dmg / 2);
        }
        return dmg;
    }

    // Recharge any rechargeable abilities for a combatant (start of its turn)
    rechargeAbilities(combatant) {
        if (!combatant || !combatant.rechargeable_attack) return;

        let recharged = false;
        for (const [name, ability] of Object.entries(combatant.rechargeable_attack)) {
            if (ability && ability.recharge && ability.used) {
                const rechargeRoll = Math.floor(Math.random() * 6) + 1; // d6
                const requiredRoll = parseInt(String(ability.recharge).split('-')[0], 10);
                if (Number.isFinite(requiredRoll) && rechargeRoll >= requiredRoll) {
                    ability.used = false;
                    recharged = true;
                    this.logMessage(`🎲 ${combatant.name}'s ${name} recharged on a roll of ${rechargeRoll}!`);
                } else {
                    this.logMessage(`🔴 ${combatant.name} failed to recharge ${name} (rolled ${rechargeRoll}).`);
                }
            }
        }

        if (recharged) {
            this.updateDisplay();
        }
    }

    initializeEventListeners() {
        // Main control buttons
        $('#newCombat').click(() => this.startNewCombat());
        $('#addCharacter').click(() => this.openCharacterModal());
        $('#addMonster').click(() => this.openMonsterSelectionModal());
        $('#rollInitiative').click(() => this.rollInitiative());
        
        // Combat action buttons
        $('#attackBtn').click(() => combatSim.openAttackModal());
        $('#castSpellBtn').click(() => this.castSpell());
        $('#dodgeBtn').click(() => this.dodgeAction());
        $('#standUpBtn').click(() => this.standUp());
        $('#endTurnBtn').click(() => this.endTurn());

        // Add Simulate Battle button event
        $('#simulateBattleBtn').click(() => this.simulateBattle());
        
        // Modal controls
        $('.close').click(() => this.closeModals());
        $('#characterForm').submit((e) => this.handleCharacterSubmit(e));
        
        // Monster selection controls
        $('#monsterSearch').on('input', () => this.filterMonsters());
        $('#monsterFilter').change(() => this.filterMonsters());
        
        // Team filter controls
        $('#switchTeamA').click(() => this.setTeamFilter('Team A'));
        $('#switchTeamB').click(() => this.setTeamFilter('Team B'));
        $('#switchAll').click(() => this.setTeamFilter('All Teams'));
        
        // Click outside modal to close
        $(window).click((e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModals();
            }
        });

        // Remove Team Monsters buttons
        $('#removeTeamAMonsters').click(() => this.removeMonstersFromTeam('Team A'));
        $('#removeTeamBMonsters').click(() => this.removeMonstersFromTeam('Team B'));
        
        // Copy Team Info button
        $('#copyTeamInfo').click(() => this.copyTeamInfoToClipboard());

        // Attempt to Escape button, if present in DOM (handles Restrained or Grappled)
        $('#attemptEscapeBtn').click(() => this.attemptEscape());

        // Surprise team selector (if present in DOM)
        $(document).on('change', '#surprisedTeamSelect', (e) => {
            this.surprisedTeam = ($(e.target).val() || '').trim() || null;
            this.updateDisplay();
        });

        // Surprise toggle button (cycles None -> Team A -> Team B)
        const ensureSurpriseToggle = () => {
            if ($('#surpriseToggleBtn').length === 0) {
                const btn = $('<button id="surpriseToggleBtn" class="btn btn-warning btn-ml-8">Surprise: None</button>');
                if ($('#rollInitiative').length > 0) {
                    $('#rollInitiative').after(btn);
                } else {
                    $('body').prepend(btn);
                }
            }
            // Set initial label
            const label = this.surprisedTeam ? `Surprise: ${this.surprisedTeam}` : 'Surprise: None';
            $('#surpriseToggleBtn').text(label);
        };
        ensureSurpriseToggle();
        // Initial enable/disable: enabled until simulation starts
        const updateSurpriseToggleState = () => {
            const enable = !this.simulationRunning;
            const title = this.simulationRunning ? 'Disabled during simulation' : '';
            $('#surpriseToggleBtn').prop('disabled', !enable).attr('title', title);
        };
        updateSurpriseToggleState();
        $(document).on('click', '#surpriseToggleBtn', () => {
            const cur = this.surprisedTeam || '';
            let next = null;
            if (cur === '') next = 'Team A';
            else if (cur === 'Team A') next = 'Team B';
            else if (cur === 'Team B') next = null;
            else next = 'Team A';
            this.surprisedTeam = next;
            $('#surpriseToggleBtn').text(next ? `Surprise: ${next}` : 'Surprise: None');
            this.updateDisplay();
        });

        $(document).on('keydown', (e) => {
            const key = (e.key || '').toUpperCase();
            if (e.ctrlKey && e.shiftKey && key === 'M') {
                e.preventDefault();
                try {
                    const pick = (arr) => (Array.isArray(arr) && arr.length > 0) ? arr[0] : null;
                    const srcA = (typeof monsters !== 'undefined') ? pick(monsters) : pick(FALLBACK_MONSTERS);
                    const srcB = (typeof monsters !== 'undefined') ? pick(monsters) : pick(FALLBACK_MONSTERS);
                    if (!srcA || !srcB) return;
                    for (let i = 0; i < 3; i++) {
                        const a = this.convertMonsterToCombatant(srcA);
                        a.team = 'Team A';
                        if (i > 0) a.name = `${a.name} #${this.combatants.length + 1}`;
                        this.combatants.push(a);
                        const b = this.convertMonsterToCombatant(srcB);
                        b.team = 'Team B';
                        if (i > 0) b.name = `${b.name} #${this.combatants.length + 1}`;
                        this.combatants.push(b);
                    }
                    this.updateCharacterList();
                    this.rollInitiative && this.rollInitiative();
                    this.simulateBattle && this.simulateBattle();
                } catch {}
            }
        });
    }

    // Resolve a human-friendly attack name for logs/memory
    getAttackName(attacker, attack) {
        if (!attack) return 'attack';
        if (attack.name && typeof attack.name === 'string') return attack.name;
        // Try to find the key in attack dictionaries by reference or deep equality
        const tryFindKey = (obj) => {
            try {
                if (obj && typeof obj === 'object') {
                    for (const [k, v] of Object.entries(obj)) {
                        if (v === attack) return k;
                        // fallback shallow compare on core fields
                        if (v && typeof v === 'object' && attack && typeof attack === 'object') {
                            if (v['to hit'] === attack['to hit'] && v.hit === attack.hit) return k;
                        }
                    }
                }
            } catch {}
            return null;
        };
        let key = tryFindKey(attacker?.attacks);
        if (key) return key;
        key = tryFindKey(attacker?.rechargeable_attack);
        if (key) return key;
        return 'attack';
    }

    // Character Management
    openCharacterModal() {
        $('#characterModal').show();
        $('#charType').val('player');
        
        // Use current team filter if it's a specific team, otherwise default to Team A
        const defaultTeam = (this.currentTeamFilter !== 'All Teams') ? this.currentTeamFilter : 'Team A';
        $('#charTeam').val(defaultTeam);
    }

    openMonsterSelectionModal() {
        $('#monsterModal').show();

        // Use current team filter as the monster team - no separate team picker in modal
        this.selectedMonsterTeam = this.currentTeamFilter !== 'All Teams' ? this.currentTeamFilter : 'Team A';
        this.updateMonsterModalHeader();
        this.populateMonsterList();

        // Add input for number of monsters if not present
        if ($('#monsterCountInput').length === 0) {
            $('#monsterModal .modal-content').append(`
                <div style="margin-top:10px;">
                    <label for="monsterCountInput">Number to Add:</label>
                    <input type="number" id="monsterCountInput" min="1" value="1" style="width:60px; margin-left:5px;">
                    <button id="addMonsterBtn" class="btn btn-primary btn-ml-10">Add Monster(s)</button>
                </div>
            `);
        }

        // Remove previous click handler to avoid duplicates
        $('#addMonsterBtn').off('click');
        // Add click handler for adding monsters
        $('#addMonsterBtn').on('click', () => this.addSelectedMonster());
        // Track selected monster index
        this.selectedMonsterIndex = null;
    }

    updateMonsterModalHeader() {
        const teamClass = this.selectedMonsterTeam.toLowerCase().replace(' ', '-');
        const header = $(`<h2>Select Monster for <span class="team-indicator ${teamClass}">${this.selectedMonsterTeam}</span></h2>`);
        $('#monsterModal .modal-content h2').replaceWith(header);
        // Log team assignment info to combat log
        this.logMessage(`Adding monsters to: ${this.selectedMonsterTeam} (Use team controls to change)`);
    }

    populateMonsterList() {
        const container = $('#monsterList');
        container.empty();

        if (typeof monsters === 'undefined') {
            container.append(`
                <div style="text-align: center; padding: 20px;">
                    <p>Monster data not loaded. This could be due to CORS restrictions.</p>
                    <p>Please try one of these solutions:</p>
                    <ol style="text-align: left; margin: 10px 0;">
                        <li>Copy the monsters.js file to the same directory as this HTML file</li>
                        <li>Run a local web server (e.g., Python: <code>python -m http.server</code>)</li>
                        <li>Use the manual character creation instead</li>
                    </ol>
                    <button class="btn btn-primary" onclick="combatSim.openCharacterModal()">Add Character Manually</button>
                </div>
            `);
            return;
        }

        monsters.forEach((monster, index) => {
            const monsterItem = $(`
                <div class="monster-item" data-index="${index}">
                    <div class="monster-info">
                        <div class="monster-name">${monster.name}</div>
                        <div class="monster-details">
                            <span>${monster.size} ${monster.type}</span>
                            <span>AC: ${this.parseAC(monster['armor class'])}</span>
                            <span>HP: ${this.parseHP(monster['hit points'])}</span>
                            <span>CR: ${this.parseChallenge(monster.challenge)}</span>
                        </div>
                    </div>
                </div>
            `);

            monsterItem.click(() => {
                $('.monster-item').removeClass('selected');
                monsterItem.addClass('selected');
                this.selectedMonsterIndex = index; // Track selected monster
            });
            container.append(monsterItem);
        });
    }

    selectMonster(monsterData, index) {
        // Remove previous selection
        $('.monster-item').removeClass('selected');

        // Add selection to clicked item
        $(`.monster-item[data-index="${index}"]`).addClass('selected');

        // Use the tracked team variable
        console.log('Selected team:', this.selectedMonsterTeam); // Debug log

        // Get number of monsters to add
        let count = parseInt($('#monsterCountInput').val());
        if (isNaN(count) || count < 1) count = 1;

        for (let i = 0; i < count; i++) {
            // Convert monster data to combat format and add to combatants
            const monster = this.convertMonsterToCombatant(monsterData);
            monster.team = this.selectedMonsterTeam; // Use the tracked team value
            // If adding multiples, append a number to the name
            if (count > 1) {
                monster.name = `${monster.name} #${i + 1}`;
            }
            this.combatants.push(monster);
            this.logMessage(`${monster.name} has been added to ${monster.team}.`);
        }
        this.updateCharacterList();
        this.closeModals();
    }

    convertMonsterToCombatant(monsterData) {
        // Check if monsterData is valid
        if (!monsterData || typeof monsterData !== 'object') {
            console.error('Invalid monster data:', monsterData);
            return this.createDefaultMonster();
        }
        
        // Parse HP from string like "135 (18d10 + 36)" or "9 (2d8)"
        const hp = this.parseHP(monsterData['hit points']);
        
        // Parse AC from string like "17 (Natural Armor)" or "10"
        const ac = this.parseAC(monsterData['armor class']);
        
		// Parse resistances, immunities, and vulnerabilities as comma-separated lists
		const damageResistances = this.parseCommaList(monsterData['damage resistances']);
		const damageImmunities = this.parseCommaList(monsterData['damage immunities']);
		// Support multiple casings for vulnerabilities (e.g., "Damage Vulnerabilities")
		const damageVulnerabilities = this.parseCommaList(
			monsterData['damage vulnerabilities'] || monsterData['Damage Vulnerabilities']
		);
		const conditionImmunities = this.parseCommaList(monsterData['condition immunities']);
        
        // Get attack bonus from first attack if available
        let attackBonus = 0;
        if (monsterData.attacks && typeof monsterData.attacks === 'object') {
            const firstAttack = Object.values(monsterData.attacks)[0];
            if (firstAttack && firstAttack['to hit']) {
                attackBonus = parseInt(firstAttack['to hit'].replace('+', '')) || 0;
            }
        }
        
        // Get damage from first attack if available
        let damage = '1d6';
        if (monsterData.attacks && typeof monsterData.attacks === 'object') {
            const firstAttack = Object.values(monsterData.attacks)[0];
            if (firstAttack && firstAttack.hit) {
                damage = this.parseDamage(firstAttack.hit);
            }
        }
        
        // Calculate initiative bonus from Dexterity
        const dexMod = Math.floor((parseInt(monsterData.dex || 10) - 10) / 2);
        const lrMax = parseInt(
            monsterData.legendary_resistances_max ??
            monsterData.legendary_resistances ??
            monsterData.legendaryResistances ??
            0,
            10
        ) || 0;
        const lrCurrent = lrMax;
        const laPerRound = parseInt(
            monsterData.legendary_actions_per_round ??
            monsterData.legendaryActionsPerRound ??
            0,
            10
        ) || 0;
        
        // Parse explicit saving throws, e.g., "DEX +7, CON +10"
        const savingThrowBonuses = this.parseSavingThrows(
            monsterData['saving throws'] || monsterData['savingThrows'] || monsterData['saving_throws'] || null
        );
        const skillBonuses = this.parseSkills(
            monsterData.skills || monsterData['Skills'] || null
        );

        return {
            id: Date.now() + Math.random(),
            name: monsterData.name || 'Unknown Monster',
            type: 'monster',
            ac: ac,
            hp: hp,
            maxHp: hp,
            baseMaxHp: hp,
            initiativeBonus: dexMod,
            attackBonus: attackBonus,
            damage: damage,
            speed: this.parseSpeed(monsterData.speed),
            numberOfAttacks: this.parseNumberOfAttacks(monsterData['number of attacks']),
            attacksRemaining: this.parseNumberOfAttacks(monsterData['number of attacks']),
            team: 'Neutral', // Default team, will be overridden when selected
            initiative: null,
            conditions: [],
			attacks: monsterData.attacks || null,
			damageResistances: damageResistances,
			damageImmunities: damageImmunities,
			damageVulnerabilities: damageVulnerabilities,
			conditionImmunities: conditionImmunities,
            legendary_resistances_max: lrMax,
            legendary_resistances_current: lrCurrent,
            // Legendary resources
            legendaryResistances: lrMax,
            currentLR: lrCurrent,
            legendaryActionsPerRound: laPerRound,
            legendaryActions: monsterData.legendaryActions || null,
            currentLA: laPerRound,
            // Frightful Presence related state
            frightful_presence: monsterData.frightful_presence || null,
            frightened: false,
            frightenedSourceId: null,
            frightful_presence_immune: false,
            // Regeneration related state
            regeneration: monsterData.regeneration || null,
            regeneration_disabled: false,
            isDead: false,
            originalData: monsterData, // Keep reference to original data
            // Explicit saving throw bonuses parsed from monster data
            savingThrowBonuses: savingThrowBonuses,
            skillBonuses: skillBonuses,
            // Deep-clone rechargeable attacks so state doesn't leak across instances
            rechargeable_attack: monsterData.rechargeable_attack ? JSON.parse(JSON.stringify(monsterData.rechargeable_attack)) : null,
            // Ongoing effects currently affecting this creature
            ongoing_effects: [],
            attackMemory: {} // Track ineffective attacks against specific targets
        };
    }

    createDefaultMonster() {
        return {
            id: Date.now() + Math.random(),
            name: 'Unknown Monster',
            type: 'monster',
            ac: 10,
            hp: 10,
            maxHp: 10,
            baseMaxHp: 10,
            initiativeBonus: 0,
            attackBonus: 0,
            damage: '1d6',
            speed: 30,
            numberOfAttacks: 1, // Default to 1 attack for player characters
            attacksRemaining: 1,
            team: 'Neutral',
            initiative: null,
            conditions: [],
            isDead: false,
            originalData: null,
            attackMemory: {} // Track ineffective attacks against specific targets
        };
    }

    parseHP(hpString) {
        if (typeof hpString === 'number') return hpString;
        if (window.DataParser && typeof window.DataParser.parseHP === 'function') {
            return window.DataParser.parseHP(hpString);
        }
        const match = String(hpString || '').match(/(\d+)/);
        return match ? parseInt(match[1]) : 10;
    }

    parseAC(acString) {
        if (typeof acString === 'number') return acString;
        if (window.DataParser && typeof window.DataParser.parseAC === 'function') {
            return window.DataParser.parseAC(acString);
        }
        const match = String(acString || '').match(/(\d+)/);
        return match ? parseInt(match[1]) : 10;
    }

    parseChallenge(challengeString) {
        if (typeof challengeString === 'number') return challengeString;
        if (window.DataParser && typeof window.DataParser.parseChallenge === 'function') {
            return window.DataParser.parseChallenge(challengeString);
        }
        const match = String(challengeString || '').match(/(\d+(?:\/\d+)?)/);
        return match ? match[1] : '1';
    }

    parseDamage(damageString) {
        // Extract damage dice from strings like "12 (2d6 + 5)" or "15 (3d6 + 5)"
        if (!damageString || typeof damageString !== 'string') return '1d6';
        const match = damageString.match(/(\d+d\d+(?:\s*[+-]\s*\d+)?)/);
        return match ? match[1] : '1d6';
    }

    parseSpeed(speedVal) {
        if (typeof speedVal === 'number') return speedVal;
        if (speedVal && typeof speedVal === 'object') {
            const s = speedVal.surface && speedVal.surface.movement;
            if (Number.isFinite(s)) return s;
            let max = 0;
            try {
                for (const v of Object.values(speedVal)) {
                    const m = v && v.movement;
                    if (Number.isFinite(m)) max = Math.max(max, m);
                }
            } catch {}
            return max || 30;
        }
        if (!speedVal || typeof speedVal !== 'string') return 30;
        const match = speedVal.match(/(\d+)\s*ft/);
        return match ? parseInt(match[1]) : 30;
    }

    parseNumberOfAttacks(attacksString) {
        // Extract number from strings like "3" or "1" or "2"
        if (!attacksString) return 1;
        if (typeof attacksString === 'number') return attacksString;
        if (typeof attacksString === 'string') {
            const match = attacksString.match(/(\d+)/);
            return match ? parseInt(match[1]) : 1;
        }
        return 1;
    }

    parseSkills(skillsVal) {
        const out = {};
        if (!skillsVal) return out;
        if (typeof skillsVal === 'string') {
            const parts = skillsVal.split(/[,;]+/);
            for (const p of parts) {
                const m = String(p).trim().match(/([A-Za-z ]+)\s*\+?(-?\d+)/);
                if (m) {
                    const name = m[1].trim();
                    const val = parseInt(m[2], 10);
                    if (!isNaN(val)) out[name] = val;
                }
            }
            return out;
        }
        if (typeof skillsVal === 'object') {
            for (const [k,v] of Object.entries(skillsVal)) {
                if (typeof v === 'number') out[k] = v;
                else if (typeof v === 'string') {
                    const m = v.match(/\+?(-?\d+)/);
                    if (m) {
                        const val = parseInt(m[1], 10);
                        if (!isNaN(val)) out[k] = val;
                    }
                }
            }
            return out;
        }
        return out;
    }

    // Parse a "saving throws" string like: "DEX +7, CON +10, WIS +6, CHA +8"
    // Returns map: { dex: 7, con: 10, wis: 6, cha: 8 }
    parseSavingThrows(val) {
        const map = {};
        if (!val) return map;
        if (typeof val === 'object') {
            for (const [k, v] of Object.entries(val)) {
                const key = String(k).toLowerCase().slice(0, 3);
                const num = parseInt(v, 10);
                if (['str','dex','con','int','wis','cha'].includes(key) && Number.isFinite(num)) {
                    map[key] = num;
                }
            }
            return map;
        }
        const str = String(val);
        for (const part of str.split(',')) {
            const m = part.trim().match(/(STR|DEX|CON|INT|WIS|CHA)\s*([+-]?\d+)/i);
            if (m) {
                const key = m[1].toLowerCase().slice(0, 3);
                const num = parseInt(m[2], 10);
                if (Number.isFinite(num)) map[key] = num;
            }
        }
        return map;
    }

	// Parse list-like fields (damage/condition immunities, resistances, vulnerabilities)
	// Accepts either a comma-separated string or an array of strings
	parseCommaList(val) {
		if (!val) return [];
		if (Array.isArray(val)) {
			const arr = val
				.map(s => String(s).trim().toLowerCase())
				.filter(Boolean);
			return arr.includes('none') ? [] : arr;
		}
		if (typeof val === 'string') {
			const result = val
				.split(',')
				.map(s => s.trim())
				.filter(Boolean)
				.map(s => s.toLowerCase());
			return result.includes('none') ? [] : result;
		}
		return [];
	}

	// Checkers for immunities
	hasDamageImmunity(target, damageType) {
		if (!damageType) return false;
		return Array.isArray(target.damageImmunities) && target.damageImmunities.includes(String(damageType).toLowerCase());
	}

	hasConditionImmunity(target, condition) {
		if (!condition) return false;
		return Array.isArray(target.conditionImmunities) && target.conditionImmunities.includes(String(condition).toLowerCase());
	}

	// Checker for resistances
	hasDamageResistance(target, damageType) {
		if (!damageType) return false;
		return Array.isArray(target.damageResistances) && target.damageResistances.includes(String(damageType).toLowerCase());
	}

	// Checker for vulnerabilities
	hasDamageVulnerability(target, damageType) {
		if (!damageType) return false;
		return Array.isArray(target.damageVulnerabilities) && target.damageVulnerabilities.includes(String(damageType).toLowerCase());
	}

    // Roll a saving throw for a target (uses explicit save bonus if provided)
    rollSavingThrow(target, ability, dc) {
        const abilityKey = (ability || '').toLowerCase().slice(0, 3);
        const abilityScore = parseInt(target.originalData?.[abilityKey] ?? 10, 10);
        const explicit = (target?.savingThrowBonuses && Number.isFinite(target.savingThrowBonuses[abilityKey]))
            ? target.savingThrowBonuses[abilityKey]
            : null;
        const mod = getAbilityModifier(abilityScore);
        const bonus = (explicit !== null) ? explicit : mod;
        // Auto-fail STR/DEX on certain conditions
        if ((abilityKey === 'str' || abilityKey === 'dex') && this.hasAnyCondition(target, ['Paralyzed','Stunned','Unconscious','Petrified'])) {
            this.logMessage(`${target.name} automatically fails the ${ability.toUpperCase()} save due to condition.`);
            return false;
        }
        let roll = this.rollDice(20) + bonus;
        const bonusLabel = explicit !== null ? `+${bonus} explicit save bonus` : `+${bonus} ability modifier`;
        // Slowed: -2 penalty to Dexterity saves
        if (abilityKey === 'dex' && this.hasAnyCondition(target, ['Slowed'])) {
            const adjusted = roll - 2;
            this.logMessage(`${target.name} ${ability.toUpperCase()} save: ${adjusted} (${bonusLabel}; −2 Slowed) vs DC ${dc}`);
            roll = adjusted;
        } else {
            this.logMessage(`${target.name} ${ability.toUpperCase()} save: ${roll} (${bonusLabel}) vs DC ${dc}`);
        }
        let succeeded = roll >= dc;
        if (!succeeded) {
            const remaining = parseInt((target.currentLR ?? target.legendary_resistances_current ?? 0), 10) || 0;
            if (remaining > 0) {
                const promptMsg = `${target.name} failed the save. Use 1 Legendary Resistance? (${remaining} remaining)`;
                const confirmUse = (typeof window !== 'undefined' && window.confirm) ? window.confirm(promptMsg) : false;
                if (confirmUse) {
                    const newRemaining = remaining - 1;
                    target.currentLR = newRemaining;
                    target.legendary_resistances_current = newRemaining; // keep legacy in sync
                    succeeded = true;
                    this.logMessage(`${target.name} uses a Legendary Resistance to succeed on the save. (${newRemaining} remaining)`);
                }
            }
        }
        return succeeded;
    }

    // Helper: perform structured saving throw (returns { success, roll, total, dc, ability })
    performSavingThrow(target, ability, dc) {
        const abilityKey = (ability || '').toLowerCase().slice(0, 3);
        const abilityScore = parseInt(target.originalData?.[abilityKey] ?? 10, 10);
        const explicit = (target?.savingThrowBonuses && Number.isFinite(target.savingThrowBonuses[abilityKey]))
            ? target.savingThrowBonuses[abilityKey]
            : null;
        const mod = getAbilityModifier(abilityScore);
        const bonus = (explicit !== null) ? explicit : mod;
        // Auto-fail STR/DEX saves for certain conditions
        const autoFail = (['str','dex'].includes(abilityKey)) && this.hasAnyCondition(target, ['Paralyzed','Stunned','Unconscious','Petrified']);
        if (autoFail) {
            return { success: false, roll: 1, total: bonus + 1, dc, ability };
        }
        // Determine disadvantage from conditions
        const saveMode = this.getConditionModifiers(target, `save:${abilityKey}`);
        const exLvlSave = this.getExhaustionLevel ? this.getExhaustionLevel(target) : 0;
        if (exLvlSave >= 3) {
            this.logMessage(`🎯 Disadvantage on ${ability.toUpperCase()} save: ${target.name} is Exhausted (level ${exLvlSave}).`);
        }
        const d20 = this.rollD20WithMode(saveMode);
        let total = d20 + bonus;
        // Slowed: -2 penalty to Dexterity saves
        if (abilityKey === 'dex' && this.hasAnyCondition(target, ['Slowed'])) {
            total -= 2;
        }
        // Log with explicit/ability modifier clarity
        const bonusLabel2 = explicit !== null ? `+${bonus} explicit save bonus` : `+${bonus} ability modifier`;
        if (abilityKey === 'dex' && this.hasAnyCondition(target, ['Slowed'])) {
            this.logMessage(`${target.name} ${ability.toUpperCase()} save: ${total} (${bonusLabel2}; −2 Slowed) vs DC ${dc}`);
        } else {
            this.logMessage(`${target.name} ${ability.toUpperCase()} save: ${total} (${bonusLabel2}) vs DC ${dc}`);
        }
        return { success: total >= dc, roll: d20, total, dc, ability };
    }

    // Structured ability check (auto-fails if sight is required and the creature is Blinded)
    performAbilityCheck(combatant, ability, dc, options = {}) {
        const abilityKey = (ability || '').toLowerCase().slice(0, 3);
        const abilityScore = parseInt(combatant.originalData?.[abilityKey] ?? 10, 10);
        const mod = getAbilityModifier(abilityScore);
        const requiresSight = !!options.requiresSight;
        const requiresHearing = !!options.requiresHearing;
        if (requiresSight && this.hasAnyCondition(combatant, ['Blinded']) && !this.hasBlindsight(combatant)) {
            this.logMessage(`${combatant.name} automatically fails the ${ability} check due to being Blinded.`);
            return { success: false, autoFail: true, roll: 1, total: mod + 1, dc, ability };
        }
        if (requiresHearing && this.hasAnyCondition(combatant, ['Deafened']) && !this.hasTremorsense(combatant)) {
            this.logMessage(`${combatant.name} automatically fails the ${ability} check due to being Deafened.`);
            return { success: false, autoFail: true, roll: 1, total: mod + 1, dc, ability };
        }
        if (requiresHearing && this.hasAnyCondition(combatant, ['Deafened']) && this.hasTremorsense(combatant)) {
            this.logMessage(`🔎 ${combatant.name}'s Tremorsense negates the effects of being Deafened for this check.`);
        }
        const mode = this.getConditionModifiers(combatant, 'ability');
        const exLvlAbility = this.getExhaustionLevel ? this.getExhaustionLevel(combatant) : 0;
        if (exLvlAbility >= 1) {
            this.logMessage(`🎯 Disadvantage on ${ability.toUpperCase()} check: ${combatant.name} is Exhausted (level ${exLvlAbility}).`);
        }
        const d20 = this.rollD20WithMode(mode);
        const total = d20 + mod;
        return { success: total >= dc, roll: d20, total, dc, ability };
    }

    // Returns true if combatant has any condition in names (case-insensitive)
    hasAnyCondition(combatant, names) {
        if (!Array.isArray(combatant?.conditions)) return false;
        const set = new Set(names.map(n => String(n).toLowerCase()));
        return combatant.conditions.some(c => set.has(String((typeof c === 'string' ? c : c.name) || '').toLowerCase()));
    }

    // Detects if a combatant has Blindsight in its senses
    hasBlindsight(combatant) {
        const senses = (combatant?.originalData?.senses ?? combatant?.senses ?? null);
        if (!senses) return false;
        if (typeof senses === 'string') return senses.toLowerCase().includes('blindsight');
        if (typeof senses === 'object') {
            return Object.keys(senses).some(k => String(k).toLowerCase() === 'blindsight');
        }
        return false;
    }

    // Detects if a combatant has Tremorsense in its senses
    hasTremorsense(combatant) {
        const senses = (combatant?.originalData?.senses ?? combatant?.senses ?? null);
        if (!senses) return false;
        if (typeof senses === 'string') return senses.toLowerCase().includes('tremorsense');
        if (typeof senses === 'object') {
            return Object.keys(senses).some(k => String(k).toLowerCase() === 'tremorsense');
        }
        return false;
    }

    // Detects if a combatant has a strong scent sense (heuristic: 'scent' or 'smell' or Keen Smell in traits/senses)
    hasScentSense(combatant) {
        const senses = (combatant?.originalData?.senses ?? combatant?.senses ?? null);
        const traits = (combatant?.originalData?.traits ?? null);
        const hasFromSenses = typeof senses === 'string' ? /scent|smell/i.test(senses) : (typeof senses === 'object' ? Object.keys(senses).some(k => /scent|smell/i.test(String(k))) : false);
        const hasFromTraits = typeof traits === 'string' ? /keen\s+smell/i.test(traits) : false;
        return !!(hasFromSenses || hasFromTraits);
    }

    // Heuristic: can take an action to detect invisible foes using scent or high perception (WIS mod >= +3)
    canDetectInvisible(combatant) {
        if (!combatant) return false;
        const wisScore = parseInt(combatant.originalData?.wis ?? 10, 10);
        const wisMod = getAbilityModifier ? getAbilityModifier(wisScore) : Math.floor((wisScore - 10) / 2);
        return this.hasScentSense(combatant) || wisMod >= 3;
    }

    // Action: spend action to detect invisible enemies for this turn
    detectInvisibleAction() {
        const c = this.getCurrentCombatant();
        if (!c) return false;
        if (this.hasAnyCondition(c, ['Slowed']) && c.slowedActionConsumed) {
            this.logMessage(`${c.name} is Slowed and cannot take another action this turn.`);
            return false;
        }
        const invisibles = this.initiativeOrder.filter(x => x && !x.isDead && x.team !== c.team && this.getConditionObject && this.getConditionObject(x, 'Invisible'));
        if (invisibles.length === 0) {
            this.logMessage(`${c.name} attempts to detect, but finds no invisible foes.`);
            return false;
        }
        if (!Array.isArray(c.detectedInvisibleIds)) c.detectedInvisibleIds = [];
        c.detectedInvisibleIds = invisibles.map(x => x.id);
        if (this.hasAnyCondition(c, ['Slowed'])) c.slowedActionConsumed = true;
        c.attacksRemaining = Math.max(0, (c.attacksRemaining || 1) - 1);
        this.logMessage(`${c.name} uses keen senses to detect invisible enemies this turn.`);
        return true;
    }

    // Decide if a restrained or grappled creature should attempt to escape now, based on higher of INT/WIS (uses a d20-style decision check)
    shouldAttemptEscapeNow(combatant) {
        if (!combatant) return false;
        const isRestrained = this.hasAnyCondition(combatant, ['Restrained']);
        const isGrappled = this.hasAnyCondition(combatant, ['Grappled']);
        if (!isRestrained && !isGrappled) return false;
        const intScore = parseInt(combatant.originalData?.int || 10, 10);
        const wisScore = parseInt(combatant.originalData?.wis || 10, 10);
        const higher = Math.max(intScore, wisScore);
        // Base chance scales with mental score
        let chance = Math.min(0.9, Math.max(0.1, (higher - 8) / 12));
        // If recently hit while restrained/grappled, increase inclination to escape
        if (combatant.considerEscapeAfterHit) chance = Math.min(0.95, chance + 0.2);
        // Convert chance to a d20 target number (higher chance -> lower target)
        // Example: chance 0.5 -> target ~10; 0.9 -> target ~2; 0.1 -> target ~18
        const targetTN = Math.max(2, Math.min(19, 20 - Math.round(chance * 18))); // clamp between 2 and 19
        const d20 = this.rollDice(20);
        const success = d20 >= targetTN;
        const label = isRestrained ? 'escape (Restrained)' : 'escape (Grappled)';
        this.logMessage(`${combatant.name} (${combatant.team}) ${label} decision check: ${d20} vs ${targetTN} (INT ${intScore}/WIS ${wisScore}${combatant.considerEscapeAfterHit ? ', post-hit bonus' : ''}).`);
        return success;
    }

    // Determine advantage/disadvantage for a given roll type
    // rollType: 'attack', 'ability', or 'save:str' | 'save:dex' | ...
    getConditionModifiers(combatant, rollType) {
        if (!Array.isArray(combatant?.conditions)) return 'normal';
        const has = (n) => this.hasAnyCondition(combatant, [n]);
        let adv = false, dis = false;
        if (rollType === 'attack') {
            if (has('Invisible')) adv = true;
            if (has('Blinded') && !this.hasBlindsight(combatant)) dis = true;
            if (has('Frightened') && this.isFrightenedActive(combatant)) dis = true;
            if (has('Poisoned')) dis = true;
            if (has('Restrained')) dis = true;
            if (has('Prone')) dis = true; // Prone creatures attack with disadvantage
            // Exhaustion level 3+: Disadvantage on attack rolls
            const exA = this.getExhaustionLevel(combatant);
            if (exA >= 3) dis = true;
        } else if (rollType === 'ability') {
            if (has('Frightened') && this.isFrightenedActive(combatant)) dis = true;
            if (has('Poisoned')) dis = true;
            // Exhaustion level 1+: Disadvantage on ability checks
            const exB = this.getExhaustionLevel(combatant);
            if (exB >= 1) dis = true;
        } else if (rollType.startsWith('save:')) {
            const ab = rollType.split(':')[1];
            if (ab === 'dex' && has('Restrained')) dis = true;
            // Exhaustion level 3+: Disadvantage on saving throws (if tracked with level)
            const ex = this.getExhaustionLevel(combatant);
            if (ex >= 3) dis = true;
        }
        if (adv && dis) return 'normal';
        if (adv) return 'adv';
        if (dis) return 'dis';
        return 'normal';
    }

    // Roll a d20 with mode: 'normal' | 'adv' | 'dis'
    rollD20WithMode(mode) {
        const a = this.rollDice(20);
        if (mode === 'adv') { const b = this.rollDice(20); return Math.max(a, b); }
        if (mode === 'dis') { const b = this.rollDice(20); return Math.min(a, b); }
        return a;
    }

    // Incapacitation check for turn skipping
    isCombatantIncapacitated(combatant) {
        return this.hasAnyCondition(combatant, ['Incapacitated','Stunned','Paralyzed','Petrified','Unconscious']);
    }

    // Remove Restrained conditions maintained by any incapacitated maintainer
    removeRestrainedMaintainedByIncapacitated() {
        for (const maintainer of this.initiativeOrder) {
            if (!maintainer || !this.isCombatantIncapacitated(maintainer)) continue;
            for (const creature of this.initiativeOrder) {
                if (!Array.isArray(creature?.conditions)) continue;
                const before = creature.conditions.length;
                creature.conditions = creature.conditions.filter(cond => {
                    if (typeof cond === 'object' && /restrained/i.test(cond.name || '') && String(cond.maintainer || '').toLowerCase() === String(maintainer.name || '').toLowerCase()) {
                        this.logMessage(`${creature.name} is no longer Restrained because ${maintainer.name} is incapacitated.`);
                        return false; // remove
                    }
                    return true;
                });
                if (creature.conditions.length !== before) this.updateDisplay();
            }
        }
    }

    // Remove a named condition from a combatant
    removeCondition(combatant, name) {
        if (!Array.isArray(combatant?.conditions)) return;
        const target = String(name || '').toLowerCase();
        combatant.conditions = combatant.conditions.filter(c => String((typeof c === 'string' ? c : c.name) || '').toLowerCase() !== target);
    }

    // Action: Stand up from Prone, consuming half of speed this turn
    standUp() {
        const c = this.getCurrentCombatant();
        if (!c) return;
        if (!this.hasAnyCondition(c, ['Prone'])) {
            this.logMessage(`${c.name} is not Prone.`);
            return;
        }
        const cost = Math.floor((parseInt(c.speed || 0, 10) || 0) / 2);
        if (typeof c.turnMovementRemaining !== 'number') c.turnMovementRemaining = Math.max(0, parseInt(c.speed || 0, 10) || 0);
        if (c.turnMovementRemaining < cost) {
            this.logMessage(`${c.name} does not have enough movement to stand up (needs ${cost} ft).`);
            return;
        }
        c.turnMovementRemaining -= cost;
        this.removeCondition(c, 'Prone');
        this.logMessage(`${c.name} stands up, spending ${cost} ft of movement. (${c.turnMovementRemaining} ft remaining)`);
        this.updateDisplay();
    }

    // Helper: push a condition onto target.conditions with optional duration/source
    applyCondition(target, conditionName, duration = null, sourceId = null) {
        if (!Array.isArray(target.conditions)) target.conditions = [];
        const entry = typeof conditionName === 'string' ? { name: conditionName } : (conditionName || {});
        if (duration) entry.duration = duration;
        if (sourceId) entry.sourceId = sourceId;
        const nameKey = String(entry.name || '').toLowerCase();
        if (nameKey) {
            const existing = target.conditions.find(c => String((typeof c === 'string' ? c : c.name) || '').toLowerCase() === nameKey);
            // Exhaustion: cumulative level stacking behavior
            if (nameKey === 'exhaustion') {
                const gain = parseInt(entry.level_gained || entry.level || 1, 10) || 1;
                if (existing && typeof existing === 'object') {
                    const nextLevel = Math.min(6, Math.max(1, parseInt(existing.level || 0, 10) + gain));
                    existing.level = nextLevel;
                } else {
                    const lvl = Math.min(6, Math.max(1, parseInt(entry.level || entry.level_gained || 1, 10) || 1));
                    target.conditions.push({ name: 'Exhaustion', level: lvl });
                }
                // Apply derived effects immediately (HP max halving, death at 6)
                this.applyExhaustionDerivedStats(target);
                if (this.getExhaustionLevel(target) >= 6) {
                    target.hp = 0;
                    target.isDead = true;
                    // Release any conditions this creature maintains on others
                    this.removeRestrainedMaintainedBy && this.removeRestrainedMaintainedBy(target);
                    this.removeGrappledMaintainedBy && this.removeGrappledMaintainedBy(target);
                    // Remove own Restrained/Grappled and clear conditions for display cleanliness
                    this.removeConditionByName && this.removeConditionByName(target, 'Restrained');
                    this.removeConditionByName && this.removeConditionByName(target, 'Grappled');
                    target.conditions = [];
                    this.logMessage(`${target.name} dies from reaching Exhaustion level 6.`);
                    this.updateDisplay();
                }
                return;
            }
            if (existing && typeof existing === 'object') {
                // Merge/refresh existing condition instead of duplicating
                Object.assign(existing, entry);
                return;
            }
        }
        target.conditions.push(entry);
    }

    // Exhaustion helpers
    getExhaustionLevel(combatant) {
        if (!Array.isArray(combatant?.conditions)) return 0;
        const ex = combatant.conditions.find(c => (typeof c !== 'string') && /exhaustion/i.test(c.name || ''));
        return ex ? Math.max(0, parseInt(ex.level || 0, 10) || 0) : 0;
    }

    applyExhaustionDerivedStats(combatant) {
        const lvl = this.getExhaustionLevel(combatant);
        // Ensure baseMaxHp exists
        if (typeof combatant.baseMaxHp !== 'number') combatant.baseMaxHp = parseInt(combatant.maxHp || combatant.hp || 0, 10) || 0;
        // Level 4: HP max halved, else restore to base
        const desiredMax = (lvl >= 4) ? Math.max(1, Math.floor((parseInt(combatant.baseMaxHp || 0, 10) || 0) / 2)) : (parseInt(combatant.baseMaxHp || 0, 10) || combatant.maxHp);
        if (typeof desiredMax === 'number' && desiredMax > 0) {
            combatant.maxHp = desiredMax;
            if (typeof combatant.hp === 'number' && combatant.hp > combatant.maxHp) {
                combatant.hp = combatant.maxHp;
            }
        }
    }

    // Called whenever a target takes damage from an attacker; clears Frightened and may disable regeneration
    handleDamageTaken(target, attacker, damageType) {
        if (!attacker) return;
        if (target && target.frightened) {
            target.frightened = false;
            target.frightenedSourceId = null;
            this.logMessage(`${target.name} takes damage and is no longer Frightened.`);
            this.updateDisplay();
        }
        // Regeneration disable flag if damage type matches any in disable list
        if (target && target.regeneration && Array.isArray(target.regeneration.disable_type)) {
            const disableTypes = target.regeneration.disable_type.map(t => String(t).toLowerCase());
            const dt = String(damageType || '').toLowerCase();
            if (dt && disableTypes.includes(dt)) {
                target.regeneration_disabled = true;
            }
        }
    }

    // Legendary Action Phase: called after a creature ends its turn, before next creature starts
    legendaryActionPhase(exitingCombatantId) {
        // Iterate all living legendary monsters except the one whose turn just ended
        const legendaryMonsters = this.initiativeOrder.filter(c => !c.isDead && parseInt(c.legendaryActionsPerRound || 0, 10) > 0);
        for (const lm of legendaryMonsters) {
            if (exitingCombatantId && lm.id === exitingCombatantId) continue; // cannot use LAs on its own turn
            // Skip if no actions available
            lm.currentLA = parseInt(lm.currentLA || 0, 10) || 0;
            if (lm.currentLA <= 0) continue;
            // If no actions defined, skip
            if (!lm.legendaryActions || typeof lm.legendaryActions !== 'object') continue;

            // Loop allowing multiple actions until pass or no LA left
            let keepGoing = true;
            while (keepGoing && lm.currentLA > 0) {
                // Pick a target: choose first living enemy by team
                const targets = this.initiativeOrder.filter(c => !c.isDead && c.id !== lm.id && c.team !== lm.team);
                if (targets.length === 0) {
                    this.logMessage(` -> No valid targets for ${lm.name}'s Legendary Action.`);
                    keepGoing = false;
                    break;
                }
                const target = targets[0];

                // Auto-select best legendary action based on current conditions
                const action = this.selectLegendaryActionForConditions(lm, target);
                if (!action) {
                    // Nothing suitable; pass
                    keepGoing = false;
                    break;
                }
                const actionCost = parseInt(action.cost || 1, 10) || 1;
                if (actionCost > lm.currentLA) {
                    // Not enough points; pass for now
                    keepGoing = false;
                    break;
                }
                // Find the action name for logging
                const entry = Object.entries(lm.legendaryActions).find(([k, v]) => v === action);
                const selectionKey = entry ? entry[0] : 'Legendary Action';
                this.logMessage(`${lm.name} uses a Legendary Action: ${selectionKey} (cost ${actionCost}).`);
                // Execute via existing attack pipeline
                this.performAttack(lm, target, action);
                lm.currentLA -= actionCost;
                if (lm.currentLA <= 0) {
                    this.logMessage(` -> ${lm.name} has no Legendary Actions remaining until its next turn.`);
                    keepGoing = false;
                }
            }
        }
    }

    // Select the best legendary action using the same logic as regular attack selection
    selectLegendaryActionForConditions(combatant, target = null) {
        if (!combatant || !combatant.legendaryActions || typeof combatant.legendaryActions !== 'object') return null;
        // Reuse selectAttackForSimulation by temporarily substituting the actions map
        const temp = { ...combatant, attacks: combatant.legendaryActions };
        return this.selectAttackForSimulation(temp, target);
    }

    // Regeneration handler: heals at start of turn unless disabled by prior damage type
    handleRegeneration(combatantId) {
        const combatant = this.initiativeOrder.find(c => c.id === combatantId);
        if (!combatant || !combatant.regeneration || combatant.isDead || combatant.hp <= 0) return;
        const params = combatant.regeneration;
        const disableList = Array.isArray(params.disable_type) ? params.disable_type : [];
        if (combatant.regeneration_disabled) {
            // Reset for next turn and log skip with types
            combatant.regeneration_disabled = false;
            const typesStr = disableList.map(t => String(t)).join(' or ');
            this.logMessage(` -> ${combatant.name}'s regeneration is disabled this turn (was hit by ${typesStr}).`);
            return;
        }
        const amount = parseInt(params.hp_amount, 10) || 0;
        if (amount > 0) {
            const before = combatant.hp;
            combatant.hp = Math.min(combatant.maxHp, combatant.hp + amount);
            const gained = combatant.hp - before;
            if (gained > 0) {
                this.logMessage(` -> ${combatant.name} regains ${gained} HP from Regeneration.`);
                this.updateDisplay();
            }
        }
    }

    filterMonsters() {
        const searchTerm = $('#monsterSearch').val().toLowerCase();
        const typeFilter = $('#monsterFilter').val();
        
        $('.monster-item').each(function() {
            const $item = $(this);
            const monsterName = $item.find('.monster-name').text().toLowerCase();
            const monsterType = $item.find('.monster-details').text().toLowerCase();
            
            const matchesSearch = monsterName.includes(searchTerm);
            const matchesType = !typeFilter || monsterType.includes(typeFilter.toLowerCase());
            
            if (matchesSearch && matchesType) {
                $item.show();
            } else {
                $item.hide();
            }
        });
    }

    setTeamFilter(team) {
        this.currentTeamFilter = team;
        
        // Update button states
        $('.btn-team').removeClass('active');
        if (team === 'Team A') {
            $('#switchTeamA').addClass('active');
        } else if (team === 'Team B') {
            $('#switchTeamB').addClass('active');
        } else {
            $('#switchAll').addClass('active');
        }
        
        // Also set the monster team selection to match the view filter
        if (team !== 'All Teams') {
            this.selectedMonsterTeam = team;
            console.log('Monster team set to:', this.selectedMonsterTeam);
        }
        
        this.updateDisplay();
        this.logMessage(`Viewing: ${team}${team !== 'All Teams' ? ` (New monsters will be added to ${team})` : ''}`);
    }

    handleCharacterSubmit(e) {
        e.preventDefault();
        
        const character = {
            id: Date.now(),
            name: $('#charName').val(),
            type: $('#charType').val(),
            ac: parseInt($('#charAC').val()),
            hp: parseInt($('#charHP').val()),
            maxHp: parseInt($('#charMaxHP').val()),
            initiativeBonus: parseInt($('#charInitiative').val()) || 0,
            attackBonus: parseInt($('#charAttackBonus').val()) || 0,
            damage: $('#charDamage').val(),
            speed: parseInt($('#charSpeed').val()) || 30,
            numberOfAttacks: 1, // Default to 1 attack for player characters
            attacksRemaining: 1,
            team: $('#charTeam').val(),
            initiative: null,
            conditions: [],
            isDead: false
        };

        this.combatants.push(character);
        this.closeModals();
        this.resetCharacterForm();
        this.logMessage(`${character.name} has been added to the combat.`);
    }

    resetCharacterForm() {
        $('#characterForm')[0].reset();
        $('#charInitiative').val(0);
        $('#charAttackBonus').val(0);
        $('#charDamage').val('1d6');
        $('#charSpeed').val(30);
        $('#charTeam').val('Team A');
    }

    // Combat Management
    startNewCombat() {
        this.combatActive = false;
        this.currentTurnIndex = 0;
        this.combatRound = 0;
        this.initiativeOrder = [];
        
        // Clear all combatants (characters and monsters)
        this.combatants = [];
        
        // Reset selected monster index and team
        this.selectedMonsterIndex = null;
        this.selectedMonsterTeam = 'Team A';
        this.currentTeamFilter = 'All Teams';

        // Reset UI forms and filters if needed
        this.resetCharacterForm();
        $('#monsterSearch').val('');
        $('#monsterFilter').val('');
        $('#switchAll').addClass('active');
        $('.btn-team').removeClass('active');
        
        this.updateDisplay();
        this.logMessage('New combat session started. Add characters and roll initiative to begin.');
    }

    rollInitiative() {
        if (this.combatants.length === 0) {
            alert('Please add at least one character before rolling initiative.');
            return;
        }

        this.combatants.forEach(combatant => {
            if (!combatant.isDead) {
                const roll = this.rollDice(20) + combatant.initiativeBonus;
                combatant.initiative = roll;
                this.logMessage(`${combatant.name} rolled initiative: ${roll} (d20 + ${combatant.initiativeBonus})`);
            }
        });

        // Sort by initiative, breaking ties by dexterity, then by a roll-off
        this.initiativeOrder = this.combatants
            .filter(c => !c.isDead)
            .sort((a, b) => {
                if (b.initiative !== a.initiative) {
                    return b.initiative - a.initiative;
                }
                // Initiative tie: break by dexterity
                if ((b.dex || 0) !== (a.dex || 0)) {
                    return (b.dex || 0) - (a.dex || 0);
                }
                // Still tied: roll-off
                const aRoll = Math.floor(Math.random() * 20) + 1;
                const bRoll = Math.floor(Math.random() * 20) + 1;
                this.logMessage(`Initiative tie between ${a.name} and ${b.name}: ${a.name} rolls ${aRoll}, ${b.name} rolls ${bRoll}`);
                return bRoll - aRoll;
            });

    // Apply Surprise selection, if any
    try {
        const sel = (typeof $ !== 'undefined' && $('#surprisedTeamSelect').length > 0) ? ($('#surprisedTeamSelect').val() || '') : '';
        if (sel) this.surprisedTeam = sel;
    } catch {}
    if (this.surprisedTeam) {
        this.logMessage(`⚠️ Surprise! ${this.surprisedTeam} is Surprised this round.`);
        for (const c of this.initiativeOrder) {
            if (c && !c.isDead && c.team === this.surprisedTeam) {
                if (!Array.isArray(c.conditions)) c.conditions = [];
                c.conditions.push({ name: 'Surprised', rounds_remaining: 1 });
            }
        }
    }

    this.combatActive = true;
    this.currentTurnIndex = 0;
    this.combatRound = 1;
    // Initialize Legendary resources at combat start
    for (const c of this.initiativeOrder) {
        if (c && !c.isDead && (parseInt(c.legendaryActionsPerRound || 0, 10) > 0)) {
            c.currentLA = parseInt(c.legendaryActionsPerRound || 0, 10);
        }
        if (c && !c.isDead && (parseInt(c.legendaryResistances || c.legendary_resistances_max || 0, 10) > 0)) {
            const lrMaxInit = parseInt(c.legendaryResistances || c.legendary_resistances_max || 0, 10) || 0;
            c.currentLR = lrMaxInit;
            c.legendary_resistances_current = lrMaxInit; // keep legacy field in sync
        }
        // Ensure rechargeable attacks start charged (used = false)
        if (c && c.rechargeable_attack && typeof c.rechargeable_attack === 'object') {
            for (const ability of Object.values(c.rechargeable_attack)) {
                if (ability && typeof ability === 'object') {
                    ability.used = false;
                }
            }
        }
    }
    
    // Reset attacks for the first turn
    this.resetAttacksForCurrentTurn();
    
    this.updateInitiativeList();
    this.updateCurrentTurn();
    this.updateActionButtons();
    this.logMessage(`Combat Round ${this.combatRound} begins!`);

    // Enable Simulate Battle button
    $('#simulateBattleBtn').prop('disabled', false);
}

    endTurn() {
        if (!this.combatActive) return;
        const justWent = this.getCurrentCombatant();
        this.logMessage(`Ending turn for ${justWent ? justWent.name : 'unknown combatant'}.`);
        // End-of-turn save checks for ongoing effects
        if (justWent) {
            this.resolveEndOfTurnOngoingEffects(justWent);
            this.resolveEndOfTurnConditions(justWent);
        }
        // Legendary Action Phase occurs after a creature's turn ends
        this.legendaryActionPhase(justWent ? justWent.id : null);

        this.currentTurnIndex++;
        
        // Check if round is complete
        if (this.currentTurnIndex >= this.initiativeOrder.length) {
            // End of round: recharge Legendary Actions for eligible monsters
            for (const c of this.initiativeOrder) {
                if (!c || c.isDead) continue;
                const perRound = parseInt(c.legendaryActionsPerRound || 0, 10) || 0;
                if (perRound > 0) {
                    c.currentLA = perRound;
                }
            }
            this.currentTurnIndex = 0;
            const prevRound = this.combatRound;
            this.combatRound++;
            // Tick down any timed conditions at start of a new round
            this.processTimedConditions();
            if (prevRound === 1 && this.surprisedTeam) {
                this.logMessage('Surprise round ends. Creatures act normally.');
                this.surprisedTeam = null;
            }
            // Log in-combat time elapsed using 1 round = 6 seconds
            const elapsedRounds = prevRound; // full rounds completed
            const elapsedSeconds = elapsedRounds * 6;
            if (elapsedRounds > 0) {
                this.logMessage(`⏱️ Time elapsed: ${elapsedRounds} round${elapsedRounds!==1?'s':''} (${elapsedSeconds} seconds).`);
            }
            this.logMessage(`Combat Round ${this.combatRound} begins!`);
        }

        // Start-of-turn recharge checks for the next combatant
        if (this.combatActive && this.initiativeOrder.length > 0) {
            const nextCombatant = this.initiativeOrder[this.currentTurnIndex];
            if (nextCombatant) {
                this.rechargeAbilities(nextCombatant);
            }
        }

        // Reset attacks for the new turn
        this.resetAttacksForCurrentTurn();
        this.updateCurrentTurn();
        this.updateActionButtons();
    }

    resetAttacksForCurrentTurn() {
        const currentCombatant = this.getCurrentCombatant();
        if (currentCombatant) {
			// Apply ongoing start-of-turn effects before actions
			this.applyStartOfTurnEffects(currentCombatant);
            // Apply ongoing effect damage at start of turn
            this.applyOngoingEffectsStartOfTurn(currentCombatant);
            // If frightened, and the source is gone (e.g., dead or missing), remove condition
            if (currentCombatant.frightened && currentCombatant.frightenedSourceId) {
                const src = this.initiativeOrder.find(c => c.id === currentCombatant.frightenedSourceId);
                if (!src || src.isDead) {
                    currentCombatant.frightened = false;
                    currentCombatant.frightenedSourceId = null;
                    this.logMessage(`${currentCombatant.name} is no longer Frightened.`);
                }
            }

            // Auto-activate Frightful Presence at start of turn if available
            // First: handle regeneration at start of turn
            if (currentCombatant.regeneration && !currentCombatant.isDead && currentCombatant.hp > 0) {
                this.handleRegeneration(currentCombatant.id);
            }
            // Then: Frightful Presence
            if (currentCombatant.frightful_presence) {
                this.useFrightfulPresence(currentCombatant.id);
            }
            // If any maintainer is incapacitated, clear maintained restrains/grapples now (do this early each turn)
            this.removeRestrainedMaintainedByIncapacitated();
            this.removeGrappledMaintainedByIncapacitated();
            // Early incapacitation gate: skip the entire turn if a creature is Incapacitated (or Paralyzed, Stunned, Unconscious, Petrified)
            if (this.isCombatantIncapacitated(currentCombatant)) {
                currentCombatant.attacksRemaining = 0;
                currentCombatant.reactionBlocked = true;
                const inc = this.getConditionObject ? this.getConditionObject(currentCombatant, 'Incapacitated') : null;
                if (inc) {
                    this.logMessage(`🛑 ${currentCombatant.name} is Incapacitated and loses their turn!`);
                } else if (this.isPetrified(currentCombatant)) {
                    this.logMessage(`${currentCombatant.name} is Petrified and can take no actions.`);
                } else {
                    this.logMessage(`🛑 ${currentCombatant.name} is unable to act due to a condition!`);
                }
                this.endTurn();
                return;
            }
            // Surprise gate: if Surprised at start of first turn, remove it and skip actions/reactions this turn
            const surpriseObj = this.getConditionObject ? this.getConditionObject(currentCombatant, 'Surprised') : null;
            if (surpriseObj) {
                this.removeConditionByName && this.removeConditionByName(currentCombatant, 'Surprised');
                currentCombatant.attacksRemaining = 0;
                currentCombatant.reactionBlocked = true;
                this.logMessage(`😴 ${currentCombatant.name} is Surprised and cannot act this turn.`);
                this.endTurn();
                return;
            }
            // Confused gate: override turn behavior based on a d10 roll
            const confusedObj = this.getConditionObject ? this.getConditionObject(currentCombatant, 'Confused') : null;
            if (confusedObj) {
                const roll = this.rollDice(10);
                this.logMessage(`🤪 ${currentCombatant.name} is Confused (d10=${roll}).`);
                // 1: uses all movement in random direction, no action
                if (roll === 1) {
                    if (currentCombatant.turnMovementRemaining > 0) {
                        const feet = currentCombatant.turnMovementRemaining;
                        currentCombatant.turnMovementRemaining = 0;
                        this.logMessage(` -> Stumbles ${feet} ft in a random direction and takes no action.`);
                    } else {
                        this.logMessage(' -> Takes no action.');
                    }
                    currentCombatant.attacksRemaining = 0;
                    this.endTurn();
                    return;
                }
                // 2-6: does not move or act
                if (roll >= 2 && roll <= 6) {
                    this.logMessage(' -> Does nothing this turn.');
                    currentCombatant.turnMovementRemaining = 0;
                    currentCombatant.attacksRemaining = 0;
                    this.endTurn();
                    return;
                }
                // 7-8: melee attack a random creature within reach (we approximate by random living creature other than self)
                if (roll === 7 || roll === 8) {
                    const potentialTargets = this.initiativeOrder.filter(c => c && !c.isDead && c.id !== currentCombatant.id);
                    if (potentialTargets.length > 0) {
                        const target = potentialTargets[Math.floor(Math.random() * potentialTargets.length)];
                        const selectedAttack = this.selectAttackForSimulation ? this.selectAttackForSimulation(currentCombatant, target) : null;
                        if (selectedAttack) {
                            this.logMessage(` -> Randomly lashes out at ${target.name}.`);
                            this.performAttack(currentCombatant, target, selectedAttack);
                        } else {
                            this.logMessage(' -> No valid melee attack found; does nothing.');
                        }
                    } else {
                        this.logMessage(' -> No targets available; does nothing.');
                    }
                    currentCombatant.attacksRemaining = 0;
                    this.endTurn();
                    return;
                }
                // 9-10: act normally (continue into standard flow)
            }
            // Initialize per-turn movement points
            currentCombatant.turnMovementRemaining = Math.max(0, parseInt(currentCombatant.speed || 0, 10) || 0);
            // Clear any prior per-turn invisible detections
            currentCombatant.detectedInvisibleIds = [];
            // Exhaustion movement penalties
            const exLvl = this.getExhaustionLevel(currentCombatant);
            if (exLvl >= 5) {
                if (currentCombatant.turnMovementRemaining > 0) {
                    this.logMessage(`${currentCombatant.name} is Exhausted (level ${exLvl}) and cannot move this turn (speed set to 0).`);
                }
                currentCombatant.turnMovementRemaining = 0;
            } else if (exLvl >= 2) {
                const beforeEx = currentCombatant.turnMovementRemaining;
                currentCombatant.turnMovementRemaining = Math.floor(currentCombatant.turnMovementRemaining / 2);
                this.logMessage(`${currentCombatant.name} is Exhausted (level ${exLvl}): movement halved (${beforeEx} -> ${currentCombatant.turnMovementRemaining}).`);
            }
            // (already cleared incapacitated maintainers above)
            // Restrained: speed becomes 0
            if (this.hasAnyCondition(currentCombatant, ['Restrained'])) {
                if (currentCombatant.turnMovementRemaining > 0) {
                    this.logMessage(`${currentCombatant.name} is Restrained and cannot move this turn (speed set to 0).`);
                }
                currentCombatant.turnMovementRemaining = 0;
            }
            // Grappled: speed becomes 0 (but less severe than Restrained for rolls)
            if (!this.hasAnyCondition(currentCombatant, ['Restrained']) && this.hasAnyCondition(currentCombatant, ['Grappled'])) {
                if (currentCombatant.turnMovementRemaining > 0) {
                    this.logMessage(`${currentCombatant.name} is Grappled and cannot move this turn (speed set to 0).`);
                }
                currentCombatant.turnMovementRemaining = 0;
            }
            // If Prone: can only crawl (half speed) unless they stand up
            if (!this.hasAnyCondition(currentCombatant, ['Restrained']) && this.hasAnyCondition(currentCombatant, ['Prone']) && !this.hasAnyCondition(currentCombatant, ['Paralyzed'])) {
                currentCombatant.turnMovementRemaining = Math.floor(currentCombatant.turnMovementRemaining / 2);
                this.logMessage(`${currentCombatant.name} is Prone and can only crawl (${currentCombatant.turnMovementRemaining} ft this turn) unless they stand up.`);
            }
            // If Slowed: halve speed this turn and block reactions
            if (!this.hasAnyCondition(currentCombatant, ['Restrained']) && this.hasAnyCondition(currentCombatant, ['Slowed'])) {
                const before = currentCombatant.turnMovementRemaining;
                currentCombatant.turnMovementRemaining = Math.floor(currentCombatant.turnMovementRemaining / 2);
                currentCombatant.reactionBlocked = true;
                this.logMessage(`${currentCombatant.name} is Slowed: movement halved (${before} -> ${currentCombatant.turnMovementRemaining}) and reactions are blocked this turn.`);
            } else {
                currentCombatant.reactionBlocked = false;
            }
            // Initialize slowed per-turn action limiter
            currentCombatant.slowedActionConsumed = false;
            // If still able to act, set attacksRemaining
            if (!this.isCombatantIncapacitated(currentCombatant)) {
                currentCombatant.attacksRemaining = currentCombatant.numberOfAttacks || 1;
                // Slowed: can only make a single weapon attack this turn
                if (this.hasAnyCondition(currentCombatant, ['Slowed'])) {
                    currentCombatant.attacksRemaining = Math.min(currentCombatant.attacksRemaining, 1);
                }
                this.logMessage(`${currentCombatant.name} starts their turn with ${currentCombatant.attacksRemaining} attack${currentCombatant.attacksRemaining !== 1 ? 's' : ''} remaining.`);
            }
        }
    }

    // End-of-turn condition resolution (e.g., Paralyzed save and duration)
    resolveEndOfTurnConditions(combatant) {
        if (!Array.isArray(combatant?.conditions) || combatant.conditions.length === 0) return;
        const next = [];
        const processed = new Set();
        for (const cond of combatant.conditions) {
            const cname = typeof cond === 'string' ? cond : (cond && cond.name);
            const name = String(cname || '').toLowerCase();
            if (!name) { next.push(cond); continue; }
            if (processed.has(name)) {
                // Drop duplicate named conditions to avoid repeated saves/logs
                continue;
            }
            processed.add(name);
            if (typeof cond === 'object' && (cond.save_check_at_turn_end || typeof cond.rounds_remaining === 'number')) {
                let removed = false;
                // End-of-turn save, if configured
                if (cond.save_check_at_turn_end) {
                    const dc = parseInt(cond.end_save_dc || 0, 10) || 0;
                    const ability = cond.end_save_ability || 'CON';
                    if (dc > 0) {
                        const success = this.rollSavingThrow(combatant, ability, dc);
                        if (success) {
                            const label = String(cond.name || 'condition');
                            this.logMessage(`${combatant.name} shakes off ${label.toLowerCase()} at the end of their turn!`);
                            removed = true;
                        }
                    }
                }
                // Duration countdown
                if (!removed && typeof cond.rounds_remaining === 'number') {
                    cond.rounds_remaining = Math.max(0, cond.rounds_remaining - 1);
                    if (cond.rounds_remaining <= 0) {
                        const label = String(cond.name || 'condition');
                        this.logMessage(`${combatant.name}'s ${label.toLowerCase()} ends as the effect expires.`);
                        removed = true;
                    }
                }
                if (!removed) next.push(cond);
            } else {
                next.push(cond);
            }
        }
        combatant.conditions = next;
        this.updateDisplay();
    }

	// Apply start-of-turn effects: ongoing bundles, condition damage, durations, and turn-preventing states
	applyStartOfTurnEffects(combatant) {
		if (!Array.isArray(combatant.conditions)) return;
		if (combatant.isDead) return; // Do not process or log effects for defeated creatures
		let stunnedThisTurn = false;
		const retained = [];
		for (const cond of combatant.conditions) {
			const name = typeof cond === 'string' ? cond : (cond.name || '');
			const lower = String(name).toLowerCase();
			// 1) Ongoing damage bundles
			if (cond.ongoing && /(start of each of its turns)/i.test(cond.ongoing.timing || '')) {
				const dmgType = (cond.ongoing.type || '').toLowerCase();
				if (this.hasDamageImmunity(combatant, dmgType)) {
					this.logMessage(`${combatant.name} is immune to ${dmgType} damage (ongoing).`);
				} else {
					let dmg = this.rollDamage(cond.ongoing.dice);
					if (this.hasDamageVulnerability(combatant, dmgType)) {
						const before = dmg;
						dmg = dmg * 2;
						this.logMessage(`${combatant.name} is vulnerable to ${dmgType} damage (ongoing doubled: ${before} -> ${dmg}).`);
					}
					combatant.hp -= dmg;
					this.logMessage(`${combatant.name} takes ${dmg} ${dmgType || 'damage'} (ongoing).`);
				}
			}
			// 2) Condition-specific handling
			if (lower === 'stunned') {
				stunnedThisTurn = true;
			}
			if (lower === 'poisoned') {
				// Deal 1d4 poison at start of turn as a simple model
				if (!this.hasDamageImmunity(combatant, 'poison')) {
					let pdmg = this.rollDamage('1d4');
					if (this.hasDamageResistance(combatant, 'poison')) pdmg = Math.floor(pdmg / 2);
					combatant.hp -= pdmg;
					this.logMessage(`${combatant.name} takes ${pdmg} poison damage (poisoned).`);
				}
			}
			if (lower === 'slowed') {
				// Slowed state is enforced at turn start via movement halving; also block reactions
				combatant.reactionBlocked = true;
				this.logMessage(`${combatant.name} is Slowed and cannot take reactions until their next turn.`);
			}
			// 3) Duration handling
			let remove = false;
			if (typeof cond.duration === 'string' && /until start of turn/i.test(cond.duration)) {
				remove = true;
			}
			// Remove "1 round" conditions at the start of the affected creature's next turn
			if (typeof cond.duration === 'string' && /^\s*1\s*round\s*$/i.test(cond.duration)) {
				remove = true;
			}
			if (typeof cond.duration === 'number') {
				cond.duration -= 1;
				if (cond.duration <= 0) remove = true;
			}
            // Generic rounds_remaining support (e.g., Deafened 1 round)
            if (!remove && typeof cond.rounds_remaining === 'number') {
                cond.rounds_remaining = Math.max(0, cond.rounds_remaining - 1);
                if (cond.rounds_remaining <= 0) remove = true;
            }
			if (!remove) retained.push(cond);
		}
		combatant.conditions = retained;
		if (combatant.hp <= 0) {
			combatant.isDead = true;
			this.logMessage(`${combatant.name} drops to 0 HP and is defeated!`);
		}
		if (stunnedThisTurn) {
			combatant.attacksRemaining = 0;
			this.logMessage(`${combatant.name} is stunned and cannot act this turn.`);
		}
		this.updateDisplay();
	}

	// New: Apply damage from ongoing_effects array at start of turn
	applyOngoingEffectsStartOfTurn(combatant) {
		if (combatant.isDead) return; // Do not process or log effects for defeated creatures
		if (!Array.isArray(combatant.ongoing_effects) || combatant.ongoing_effects.length === 0) return;
		for (const effect of combatant.ongoing_effects) {
			if (!effect || !effect.damage) continue;
			// Parse damage like "3 (1d6) Fire" -> dice: 1d6, type: fire
			let diceExpr = null;
			let dmgType = null;
			const paren = String(effect.damage).match(/\(([^)]+)\)/);
			if (paren) {
				diceExpr = paren[1].trim();
				const tail = String(effect.damage).replace(paren[0], '').trim();
				dmgType = tail.split(/\s+/).pop();
			} else {
				const m = String(effect.damage).match(/(\d+d\d+(?:\s*[+-]\s*\d+)?)/i);
				if (m) diceExpr = m[1];
				const parts = String(effect.damage).trim().split(/\s+/);
				dmgType = parts[parts.length - 1];
			}
			const rolled = this.rollDamage(diceExpr || '1d6');
			const type = (dmgType || '').toLowerCase();
			if (type && this.hasDamageImmunity(combatant, type)) {
				this.logMessage(`${combatant.name} is immune to ${type} damage; no damage taken from ${effect.name}.`);
				continue;
			}
			let final = rolled;
			if (type && this.hasDamageResistance(combatant, type)) final = Math.floor(final / 2);
			if (type && this.hasDamageVulnerability(combatant, type)) final = final * 2;
			combatant.hp -= final;
			this.logMessage(`❌ ${combatant.name} takes ${final}${type ? ' ' + type : ''} damage from ${effect.name}.`);
			if (combatant.hp <= 0) {
				combatant.isDead = true;
				this.logMessage(`${combatant.name} drops to 0 HP and is defeated!`);
			}
		}
		this.updateDisplay();
	}

	// New: End-of-turn saves to remove ongoing_effects when applicable
	resolveEndOfTurnOngoingEffects(combatant) {
		if (combatant.isDead) return; // Do not process or log for defeated creatures
		if (!Array.isArray(combatant.ongoing_effects) || combatant.ongoing_effects.length === 0) return;
		const remaining = [];
		for (const effect of combatant.ongoing_effects) {
			if (effect && /end of turn/i.test(String(effect.save_timing || ''))) {
				const ability = effect.save_ability || 'CON';
				const dc = parseInt(effect.save_dc || 0, 10) || 0;
				if (dc > 0) {
					const saved = this.rollSavingThrow(combatant, ability, dc);
					if (saved) {
						this.logMessage(`✅ ${combatant.name} succeeds on a DC ${dc} ${ability} save, ending ${effect.name}.`);
						continue; // remove
					} else {
						this.logMessage(`🔴 ${combatant.name} fails the DC ${dc} ${ability} save. ${effect.name} persists.`);
					}
				}
			}
			remaining.push(effect);
		}
		combatant.ongoing_effects = remaining;
		this.updateDisplay();
	}

    // Frightful Presence: core action
    useFrightfulPresence(sourceId) {
        const source = this.initiativeOrder.find(c => c.id === sourceId);
        if (!source || !source.frightful_presence || source.isDead) return;

        const params = source.frightful_presence;
        const dc = params.dc;
        const ability = params.save_ability || 'WIS';
        const range = params.range || 120;

        // Log activation
        this.logMessage(`${source.name} unleashes its terrifying Frightful Presence (DC ${dc} ${ability}).`);

        // Iterate targets: all other living combatants
        for (const target of this.initiativeOrder) {
            if (!target || target.id === sourceId || target.isDead) continue;

            // 24-hour immunity check
            if (target.frightful_presence_immune) {
                this.logMessage(` -> ${target.name} is immune to this Frightful Presence (24 hours).`);
                continue;
            }

            // LoS/Range checks would go here; lacking positions/LoS, assume visible and in range
            // If you later add positions, filter by distance/visibility here using 'range'

            // Force saving throw
            const saveSucceeded = this.rollSavingThrow(target, ability, dc);

            if (!saveSucceeded) {
                // Apply frightened condition
                target.frightened = true;
                target.frightenedSourceId = sourceId;
                this.logMessage(` -> ${target.name} fails the save and is FRIGHTENED.`);
            } else {
                // Grant 24-hour immunity
                target.frightful_presence_immune = true;
                this.logMessage(` -> ${target.name} succeeds on the save and is immune to this Frightful Presence for 24 hours.`);
            }
        }

        // Update UI after applying conditions
        this.updateDisplay();
    }

    // Attack System
    openAttackModal() {
        const currentCombatant = this.getCurrentCombatant();
        if (!currentCombatant) return;

        // Slowed: only one action or bonus action per turn
        if (this.hasAnyCondition(currentCombatant, ['Slowed']) && currentCombatant.slowedActionConsumed) {
            this.logMessage(`${currentCombatant.name} is Slowed and has already used their action/bonus action this turn.`);
            return;
        }

        // Check if combatant has attacks remaining
        if (currentCombatant.attacksRemaining <= 0) {
            alert(`${currentCombatant.name} has no attacks remaining this turn.`);
            return;
        }

        // Team-aware target selection: avoid friendly fire unless charmed/controlled
        const isCharmedOrControlled = !!currentCombatant.charmed || !!currentCombatant.controlledByEnemy;
        const targets = this.initiativeOrder.filter(c =>
            c.id !== currentCombatant.id &&
            !c.isDead &&
            (isCharmedOrControlled || (c.team !== currentCombatant.team))
        );

        if (targets.length === 0) {
            alert('No valid targets available.');
            return;
        }

        // For now, attack the first available target
        // In a full implementation, you'd have a target selection UI
        const selectedAttack = this.selectAttackForSimulation(currentCombatant, targets[0]);
        if (this.hasAnyCondition(currentCombatant, ['Slowed']) && !currentCombatant.slowedActionConsumed) {
            currentCombatant.slowedActionConsumed = true;
            this.logMessage(`${currentCombatant.name} uses their action for the turn.`);
        }
        this.performAttack(currentCombatant, targets[0], selectedAttack);
    }

    // helper: parse damage strings like "10 (3d6)" or "17 (2d10 + 6)" via DataParser
    parseDamageString(damageStr) {
        if (!damageStr) return 0;
        // Use utilities to extract dice expression first
        const expr = (window.DataParser && typeof window.DataParser.parseDiceFromString === 'function')
            ? window.DataParser.parseDiceFromString(String(damageStr))
            : null;
        if (expr && typeof this.rollDamage === 'function') {
            try {
                return this.rollDamage(expr);
            } catch (e) {
                // fallthrough to numeric parse
            }
        }
        // fallback to leading number via utilities
        const num = (window.DataParser && typeof window.DataParser.parseLeadingNumber === 'function')
            ? window.DataParser.parseLeadingNumber(String(damageStr))
            : null;
        return Number.isFinite(num) ? num : 0;
    }

    performAttack(attacker, target, attack) {
        // Ensure attack exists
        if (!attack) {
            if (attacker.attacks && typeof attacker.attacks === 'object') {
                attack = Object.values(attacker.attacks)[0];
            } else {
                attack = { "to hit": "+0", hit: "1d6" };
            }
        }

        // Prevent friendly fire unless charmed/controlled
        if (!attacker?.charmed && !attacker?.controlledByEnemy && attacker.team === target.team) {
            this.logMessage(`${attacker.name} will not attack an ally.`);
            return;
        }

        // Mark rechargeable usage
        if (attacker && attacker.rechargeable_attack && typeof attacker.rechargeable_attack === 'object') {
            for (const [rName, rAbility] of Object.entries(attacker.rechargeable_attack)) {
                if (rAbility === attack && rAbility.recharge) {
                    if (rAbility.used === false) {
                        rAbility.used = true;
                        this.logMessage(`${attacker.name} uses ${rName}. It will require a recharge to use again.`);
                    }
                    break;
                }
            }
        }

        const applyDR = (t, amount, type) => {
            let dmg = Math.max(0, amount|0);
            if (dmg <= 0) return 0;
            try { if (this.hasDamageImmunity && this.hasDamageImmunity(t, type)) return 0; } catch {}
            try { if (this.hasDamageResistance && this.hasDamageResistance(t, type)) dmg = Math.floor(dmg / 2); } catch {}
            try { if (this.hasDamageVulnerability && this.hasDamageVulnerability(t, type)) dmg = dmg * 2; } catch {}
            try { if (this.adjustDamageForPetrified) dmg = this.adjustDamageForPetrified(t, dmg, type); } catch {}
            return Math.max(0, dmg|0);
        };

        // Inline save notation in to-hit: e.g., "DC 15 DEX Save"
        if (typeof attack["to hit"] === 'string' && /DC\s*\d+/i.test(attack["to hit"])) {
            const m = attack["to hit"].match(/DC\s*(\d+)\s*([A-Z]{3,}|Dexterity|Constitution|Wisdom|Intelligence|Charisma|Strength)?/i);
            const dc = m ? parseInt(m[1], 10) : null;
            const abilRaw = m && m[2] ? m[2].toUpperCase() : 'DEX';
            const ability = (
                abilRaw.startsWith('STR') ? 'Strength' :
                abilRaw.startsWith('DEX') ? 'Dexterity' :
                abilRaw.startsWith('CON') ? 'Constitution' :
                abilRaw.startsWith('INT') ? 'Intelligence' :
                abilRaw.startsWith('WIS') ? 'Wisdom' : 'Charisma'
            );
            if (dc) {
                const attackName = this.getAttackName(attacker, attack);
                const succeeded = this.rollSavingThrow(target, ability, dc);
                let dice = '1d6';
                if (typeof attack.hit === 'string') {
                    const paren = attack.hit.match(/\(([^)]+)\)/);
                    if (paren) dice = paren[1].trim();
                }
                const dmgType = (attack['damage type'] || '').toLowerCase();
                let dmg = this.rollDamage(dice);
                if (succeeded && /half/i.test(String(attack.hit || ''))) dmg = Math.floor(dmg / 2);
                else if (succeeded) dmg = 0;
                dmg = applyDR(target, dmg, dmgType);
                if (dmg > 0) {
                    target.hp -= dmg;
                    if (target.hp <= 0) { target.isDead = true; this.logMessage(`${target.name} drops to 0 HP and is defeated!`); }
                }
                this.logMessage(`${target.name} ${succeeded ? 'succeeds' : 'fails'} the ${ability} save against ${attackName}${dmg > 0 ? ` and takes ${dmg}${dmgType ? ' ' + dmgType : ''}` : ''}.`);
                return;
            }
        }

        // Block if attacker is Charmed against this target
        if (this.isCharmedAgainst && this.isCharmedAgainst(attacker, target)) {
            this.logMessage(`${attacker.name} is Charmed by ${target.name} and refuses to attack their charmer.`);
            return;
        }

        // attack.save path (area effects etc.)
        if (attack.save && attack.save.dc && attack.save.ability) {
            const attackName = this.getAttackName(attacker, attack);
            const dmgType = (attack['damage type'] || attack.save.damageType || '').toLowerCase();
            const succeeded = this.rollSavingThrow(target, attack.save.ability, attack.save.dc);
            const dice = attack.save.damage || attack.hit || '1d6';
            let dmg = this.rollDamage(dice);
            if (succeeded && attack.save.halfOnSuccess) dmg = Math.floor(dmg / 2);
            else if (succeeded && !attack.save.halfOnSuccess) dmg = 0;
            // DR stack
            if (this.hasDamageImmunity && this.hasDamageImmunity(target, dmgType)) dmg = 0;
            if (dmg > 0 && this.hasDamageResistance && this.hasDamageResistance(target, dmgType)) dmg = Math.floor(dmg / 2);
            if (dmg > 0 && this.hasDamageVulnerability && this.hasDamageVulnerability(target, dmgType)) dmg = dmg * 2;
            if (dmg > 0 && this.adjustDamageForPetrified) dmg = this.adjustDamageForPetrified(target, dmg, dmgType);
            if (dmg > 0) {
                target.hp -= dmg;
                // Breaking charm if damaged by charmer or allies
                this.tryBreakCharmedOnDamage && this.tryBreakCharmedOnDamage(target, attacker);
                // Frightened ends on any damage
                this.tryBreakFrightenedOnDamage && this.tryBreakFrightenedOnDamage(target);
                // Maintainer concentration checks if target maintains conditions on others
                this.tryBreakMaintainedConditionsOnMaintainerDamage && this.tryBreakMaintainedConditionsOnMaintainerDamage(target, dmg);
                // Death handling and cleanup
                if (target.hp <= 0) {
                    target.isDead = true;
                    this.logMessage(`${target.name} drops to 0 HP and is defeated!`);
                    // Remove own conditions and any maintained
                    this.removeConditionByName(target, 'Restrained');
                    this.removeRestrainedMaintainedBy && this.removeRestrainedMaintainedBy(target);
                    this.removeConditionByName(target, 'Grappled');
                    this.removeGrappledMaintainedBy && this.removeGrappledMaintainedBy(target);
                    target.conditions = [];
                    this.updateDisplay();
                }
            }
            this.logMessage(`${target.name} ${succeeded ? 'succeeds' : 'fails'} the ${ability} save against ${attackName}${dmg > 0 ? ` and takes ${dmg}${dmgType ? ' ' + dmgType : ''}` : ''}.`);
            return;
        }

        // Attack roll path
        const attackName = this.getAttackName(attacker, attack);
        const isMelee = /\b5\s*ft\.?/i.test(String(attack.reach || ''));
        const attackerMode = this.getConditionModifiers ? this.getConditionModifiers(attacker, 'attack') : 'normal';
        const targetHas = (n) => this.hasAnyCondition && this.hasAnyCondition(target, [n]);
        const attackerHas = (n) => this.hasAnyCondition && this.hasAnyCondition(attacker, [n]);
        // Compute nuanced advantage/disadvantage
        let attackerAdv = false, attackerDis = false, targetAdv = false, targetDis = false;
        // Attacker: Blinded -> Disadvantage unless Blindsight
        if (attackerHas && attackerHas('Blinded')) {
            if (this.hasBlindsight && this.hasBlindsight(attacker)) {
                this.logMessage(`🔎 ${attacker.name}'s Blindsight negates Disadvantage from being Blinded.`);
            } else {
                attackerDis = true;
                this.logMessage(`🎯 Disadvantage: ${attacker.name} is Blinded.`);
            }
        }
        // Attacker: Grappled by this specific target -> Disadvantage on attacks against that grappler
        if (attackerHas && attackerHas('Grappled')) {
            const g = this.getConditionObject ? this.getConditionObject(attacker, 'Grappled') : null;
            const grapplerName = g && (g.grappler_name || g.grappler || '');
            if (grapplerName && String(grapplerName).toLowerCase() === String(target.name || '').toLowerCase()) {
                attackerDis = true;
                this.logMessage(`🎯 Disadvantage: ${attacker.name} is Grappled by ${target.name}.`);
            }
        }
        // Attacker: Poisoned -> Disadvantage on attack rolls
        if (attackerHas && attackerHas('Poisoned')) {
            attackerDis = true;
            this.logMessage(`🎯 Disadvantage: ${attacker.name} is Poisoned.`);
        }
        // Target: Invisible -> Disadvantage to attacker unless attacker has Blindsight or detected this turn
        if (targetHas && targetHas('Invisible')) {
            const detectedNow = Array.isArray(attacker.detectedInvisibleIds) && attacker.detectedInvisibleIds.includes(target.id);
            if (this.hasBlindsight && this.hasBlindsight(attacker)) {
                this.logMessage(`🔎 ${attacker.name}'s Blindsight negates Disadvantage from attacking an Invisible target.`);
            } else if (detectedNow) {
                this.logMessage(`🔎 ${attacker.name} has detected ${target.name} this turn and ignores Invisibility penalties.`);
            } else {
                targetDis = true;
                this.logMessage(`🎯 Disadvantage: target is Invisible.`);
            }
        }
        // Target: Flat advantage cases
        if (targetHas && targetHas('Restrained')) { targetAdv = true; this.logMessage(`🎯 Advantage: target is Restrained.`); }
        if (targetHas && targetHas('Paralyzed')) { targetAdv = true; this.logMessage(`🎯 Advantage: target is Paralyzed.`); }
        if (targetHas && targetHas('Unconscious')) { targetAdv = true; this.logMessage(`🎯 Advantage: target is Unconscious.`); }
        if (targetHas && targetHas('Petrified')) { targetAdv = true; this.logMessage(`🎯 Advantage: target is Petrified.`); }
        // Target: Blinded -> Advantage to attackers
        if (targetHas && targetHas('Blinded')) { targetAdv = true; this.logMessage(`🎯 Advantage: target is Blinded.`); }
        // Target: Prone -> melee advantage, ranged disadvantage
        if (targetHas && targetHas('Prone')) {
            if (isMelee) { targetAdv = true; this.logMessage(`🎯 Advantage: target is Prone and within 5 ft.`); }
            else { targetDis = true; this.logMessage(`🎯 Disadvantage: target is Prone and at range.`); }
        }
        // Combine with attackerMode using a net system
        let net = 0;
        if (attackerMode === 'adv') net += 1;
        if (attackerMode === 'dis') net -= 1;
        if (attackerAdv) net += 1;
        if (attackerDis) net -= 1;
        if (targetAdv) net += 1;
        if (targetDis) net -= 1;
        let finalMode = 'normal';
        if (net > 0) finalMode = 'adv';
        else if (net < 0) finalMode = 'dis';
        const roll = this.rollD20WithMode ? this.rollD20WithMode(finalMode) : (Math.floor(Math.random()*20)+1);
        const toHit = attack["to hit"] ? parseInt(String(attack["to hit"]).replace('+','')) || 0 : 0;
        let crit = roll === 20;
        const total = roll + toHit;
        if (total < target.ac) {
            this.logMessage(`${attacker.name} (${attacker.team}) misses ${target.name} (${target.team}) with ${attackName} (roll ${total}).`);
            // Invisibility ends when attacking
            if (this.hasAnyCondition && this.hasAnyCondition(attacker, ['Invisible'])) {
                this.removeConditionByName(attacker, 'Invisible');
                this.logMessage(`${attacker.name} becomes visible after attacking.`);
                this.updateDisplay();
            }
            return;
        }
        if (!crit && isMelee && targetHas && (targetHas('Paralyzed') || targetHas('Unconscious'))) crit = true;
        const primaryTypeField = (attack['damage type'] || '').toLowerCase();
        const primaryType = primaryTypeField.split(' plus ')[0].trim();
        let dmg = this.rollDamage(attack.hit || '1d6');
        if (crit) dmg *= 2;
        // DR stack
        if (this.hasDamageImmunity && this.hasDamageImmunity(target, primaryType)) dmg = 0;
        if (dmg > 0 && this.hasDamageResistance && this.hasDamageResistance(target, primaryType)) dmg = Math.floor(dmg / 2);
        if (dmg > 0 && this.hasDamageVulnerability && this.hasDamageVulnerability(target, primaryType)) dmg = dmg * 2;
        if (dmg > 0 && this.adjustDamageForPetrified) dmg = this.adjustDamageForPetrified(target, dmg, primaryType);
        if (dmg > 0) {
            target.hp -= dmg;
            this.handleDamageTaken && this.handleDamageTaken(target, attacker, primaryType);
            // Breaking charm if damaged by charmer or allies
            this.tryBreakCharmedOnDamage && this.tryBreakCharmedOnDamage(target, attacker);
            // Frightened ends on any damage
            this.tryBreakFrightenedOnDamage && this.tryBreakFrightenedOnDamage(target);
            // Maintainer concentration checks if target maintains conditions on others
            this.tryBreakMaintainedConditionsOnMaintainerDamage && this.tryBreakMaintainedConditionsOnMaintainerDamage(target, dmg);
            // If target is restrained or grappled, mark it to consider escaping on its turn
            if (this.hasAnyCondition && (this.hasAnyCondition(target, ['Restrained']) || this.hasAnyCondition(target, ['Grappled']))) {
                target.considerEscapeAfterHit = true;
            }
        }
        this.logMessage(`${attacker.name} (${attacker.team}) hits ${target.name} (${target.team}) with ${attackName} for ${dmg}${primaryType ? ' ' + primaryType : ''}.`);
        // Extra parts
        if (attack.extraDamage && Array.isArray(attack.extraDamage)) {
            for (const part of attack.extraDamage) {
                const pType = (part.type || '').toLowerCase();
                let pdmg = this.rollDamage(part.dice || '1d6');
                if (this.hasDamageImmunity && this.hasDamageImmunity(target, pType)) pdmg = 0;
                if (pdmg > 0 && this.hasDamageResistance && this.hasDamageResistance(target, pType)) pdmg = Math.floor(pdmg / 2);
                if (pdmg > 0 && this.hasDamageVulnerability && this.hasDamageVulnerability(target, pType)) pdmg = pdmg * 2;
                if (pdmg > 0 && this.adjustDamageForPetrified) pdmg = this.adjustDamageForPetrified(target, pdmg, pType);
                if (pdmg > 0) {
                    target.hp -= pdmg;
                    this.handleDamageTaken && this.handleDamageTaken(target, attacker, pType);
                    // Breaking charm if damaged by charmer or allies
                    this.tryBreakCharmedOnDamage && this.tryBreakCharmedOnDamage(target, attacker);
                    // Frightened ends on any damage
                    this.tryBreakFrightenedOnDamage && this.tryBreakFrightenedOnDamage(target);
                    // Maintainer concentration checks if target maintains conditions on others
                    this.tryBreakMaintainedConditionsOnMaintainerDamage && this.tryBreakMaintainedConditionsOnMaintainerDamage(target, pdmg);
                    // If target is restrained or grappled, mark it to consider escaping on its turn
                    if (this.hasAnyCondition && (this.hasAnyCondition(target, ['Restrained']) || this.hasAnyCondition(target, ['Grappled']))) {
                        target.considerEscapeAfterHit = true;
                    }
                }
                this.logMessage(`${attacker.name} deals an additional ${pdmg}${pType ? ' ' + pType : ''} to ${target.name}.`);
            }
        }
        // Invisibility ends when attacking
        if (this.hasAnyCondition && this.hasAnyCondition(attacker, ['Invisible'])) {
            this.removeConditionByName(attacker, 'Invisible');
            this.logMessage(`${attacker.name} becomes visible after attacking.`);
            this.updateDisplay();
        }
        // On-hit condition effects
        if (attack && attack.condition_effect) {
            const effect = attack.condition_effect || {};
            const condNameRaw = effect.condition_name || effect.condition || '';
            const condName = String(condNameRaw).trim();
            const ability = effect.save_ability || effect.ability || 'CON';
            const dc = parseInt(effect.save_dc || effect.dc || 0, 10) || 0;
            const parseRounds = (dur) => {
                if (!dur) return null;
                const s = String(dur).toLowerCase().trim();
                if (s === '1 round') return { rounds_remaining: 1 };
                if (s === '1 minute') return { duration: 10 }; // track as 10 start-of-turn ticks
                return { duration: dur };
            };
            const applyNamed = (name) => {
                const lower = String(name).toLowerCase();
                if (lower === 'confused') {
                    const obj = {
                        name: 'Confused',
                        duration: 10,
                        save_check_at_turn_end: true,
                        end_save_ability: 'WIS',
                        end_save_dc: dc
                    };
                    this.applyCondition(target, obj, null, attacker.id);
                    this.logMessage(`🔄 ${target.name} is Confused for up to 10 rounds (WIS ${dc} save at end of each turn).`);
                    return;
                }
                if (lower === 'grappled') {
                    const obj = { name: 'Grappled', duration: effect.duration || 'Until released', grappler_name: effect.grappler_id || attacker.name };
                    if (effect.escape_dc) obj.escape_dc = parseInt(effect.escape_dc, 10) || 14;
                    this.applyCondition(target, obj, null, attacker.id);
                    this.logMessage(`⛓️ ${target.name} is Grappled by ${obj.grappler_name}${obj.escape_dc ? ` (escape DC ${obj.escape_dc})` : ''}.`);
                    return;
                }
                if (lower === 'restrained') {
                    const obj = { name: 'Restrained', duration: effect.duration || null, maintainer: effect.maintainer || attacker.name };
                    if (effect.release_condition) obj.release_condition = effect.release_condition;
                    this.applyCondition(target, obj, null, attacker.id);
                    this.logMessage(`🪤 ${target.name} is Restrained${obj.maintainer ? ` by ${obj.maintainer}` : ''}.`);
                    return;
                }
                if (lower === 'frightened') {
                    const obj = { name: 'Frightened', duration: effect.duration || '1 minute', source_name: effect.fear_source || attacker.name };
                    if (typeof obj.duration === 'string' && /1\s*minute/i.test(obj.duration)) obj.rounds_remaining = 10;
                    if (dc > 0) { obj.save_check_at_turn_end = true; obj.end_save_dc = dc; obj.end_save_ability = ability; }
                    this.applyCondition(target, obj, null, attacker.id);
                    this.logMessage(`😨 ${target.name} becomes Frightened of ${obj.source_name}${obj.duration ? ` for ${obj.duration}` : ''}.`);
                    return;
                }
                if (lower === 'charmed') {
                    const obj = { name: 'Charmed', duration: effect.duration || '1 hour', charmer_name: effect.charmer_id || attacker.name };
                    if (dc > 0) { obj.save_check_at_turn_end = true; obj.end_save_dc = dc; obj.end_save_ability = ability; }
                    this.applyCondition(target, obj, null, attacker.id);
                    this.logMessage(`✨ ${target.name} is Charmed by ${obj.charmer_name}${obj.duration ? ` for ${obj.duration}` : ''}.`);
                    return;
                }
                // Generic fallback
                const base = { name: condName };
                const add = parseRounds(effect.duration);
                const payload = add ? { ...base, ...add } : base;
                this.applyCondition(target, payload, null, attacker.id);
                this.logMessage(`⚠️ ${target.name} is affected by ${condName}.`);
            };

            if (dc > 0) {
                const saved = this.rollSavingThrow(target, ability, dc);
                if (saved) {
                    this.logMessage(`✅ ${target.name} resists ${condName || 'the effect'} (DC ${dc} ${ability.toUpperCase()}).`);
                } else {
                    if (condName) applyNamed(condName);
                }
            } else if (condName) {
                applyNamed(condName);
            }
        }

        // end performAttack
    }

    // Dice utilities
    rollDamage(damageString) {
        const match = String(damageString || '').match(/(\d+)d(\d+)([+-]\d+)?/);
        if (!match) return 0;
        const numDice = parseInt(match[1], 10) || 0;
        const dieSize = parseInt(match[2], 10) || 0;
        const modifier = match[3] ? parseInt(match[3], 10) : 0;
        let total = 0;
        for (let i = 0; i < numDice; i++) {
            total += this.rollDice(dieSize);
        }
        return total + modifier;
    }

    rollDice(sides) {
        const n = parseInt(sides, 10) || 20;
        return Math.floor(Math.random() * n) + 1;
    }

    // Get the primary damage type of an attack
    getAttackDamageType(attack) {
        // Check attack level first
        if (attack['damage type']) {
            return attack['damage type'].toLowerCase();
        }
        
        // Check save-based damage type
        if (attack.save && attack.save.damageType) {
            return attack.save.damageType.toLowerCase();
        }
        
        // Check effects-based damage type
        if (attack.effects && Array.isArray(attack.effects)) {
            for (const effect of attack.effects) {
                if (effect['ongoing damage type']) {
                    return effect['ongoing damage type'].toLowerCase();
                }
                if (effect['damage type']) {
                    return effect['damage type'].toLowerCase();
                }
            }
        }
        
        return 'unknown';
    }

    // Learning helpers used by selectAttackForSimulation
    isAttackRememberedAsIneffective(attacker, target, attack) {
        if (!attacker || !target || !attack) return false;
        const memoryRoot = attacker.attackMemory || {};
        const targetMemory = memoryRoot[target.id] || {};
        const attackName = this.getAttackName(attacker, attack);
        const mem = targetMemory[attackName];
        if (!mem || !mem.ineffective) return false;
        // Consider memory recent if within last 5 minutes (~5 rounds)
        const ageMs = Date.now() - (mem.lastUsed || 0);
        return ageMs < 5 * 60 * 1000;
    }

    recordAttackEffectiveness(attacker, target, attack, damageDealt, damageType) {
        if (!attacker || !target || !attack) return;
        if (!attacker.attackMemory) attacker.attackMemory = {};
        if (!attacker.attackMemory[target.id]) attacker.attackMemory[target.id] = {};
        const attackName = this.getAttackName(attacker, attack);
        const effectiveness = this.calculateAttackEffectiveness(attack);
        const ineffective = (damageDealt === 0) || (damageDealt < (effectiveness * 0.25));
        if (ineffective) {
            const existing = attacker.attackMemory[target.id][attackName] || {};
            attacker.attackMemory[target.id][attackName] = {
                ineffective: true,
                damageType: damageType || existing.damageType || 'unknown',
                lastUsed: Date.now(),
                attempts: (existing.attempts || 0) + 1,
            };
            // Optional log for smarter creatures
            const intScore = parseInt(attacker.originalData?.int || 10, 10);
            const wisScore = parseInt(attacker.originalData?.wis || 10, 10);
            if (Math.max(intScore, wisScore) >= 12) {
                this.logMessage(`${attacker.name} remembers that ${attackName} was ineffective against ${target.name}.`);
            }
        } else {
            if (attacker.attackMemory[target.id][attackName]) delete attacker.attackMemory[target.id][attackName];
        }
    }

    calculateTotalDamageDealt(attacker, target, attack) {
        // Estimate potential damage for learning; uses average damage parsing as a proxy
        let total = 0;
        if (attack.hit) total += this.parseAverageDamage(attack.hit);
        if (attack.save && attack.save.damage) total += this.parseAverageDamage(attack.save.damage);
        if (attack.effects && Array.isArray(attack.effects)) {
            for (const effect of attack.effects) {
                if (effect['one-time damage']) total += this.parseAverageDamage(effect['one-time damage']);
            }
        }
        return total;
    }

    // Spell System (Basic)
    castSpell() {
        const currentCombatant = this.getCurrentCombatant();
        if (!currentCombatant) return;
        if (this.hasAnyCondition(currentCombatant, ['Slowed']) && currentCombatant.slowedActionConsumed) {
            this.logMessage(`${currentCombatant.name} is Slowed and cannot take another action/bonus action this turn.`);
            return;
        }
        if (this.hasAnyCondition(currentCombatant, ['Slowed'])) currentCombatant.slowedActionConsumed = true;

        // Basic spell implementation - could be expanded
        this.logMessage(`${currentCombatant.name} casts a spell! (Spell system not fully implemented yet)`);
        // Invisibility ends on spellcasting
        if (this.hasAnyCondition(currentCombatant, ['Invisible'])) {
            this.removeConditionByName(currentCombatant, 'Invisible');
            this.logMessage(`${currentCombatant.name} becomes visible after casting a spell.`);
            this.updateDisplay();
        }
        this.endTurn();
    }

    dodgeAction() {
        const currentCombatant = this.getCurrentCombatant();
        if (!currentCombatant) return;
        if (this.hasAnyCondition(currentCombatant, ['Slowed']) && currentCombatant.slowedActionConsumed) {
            this.logMessage(`${currentCombatant.name} is Slowed and cannot take another action/bonus action this turn.`);
            return;
        }
        currentCombatant.conditions.push('Dodging');
        this.logMessage(`${currentCombatant.name} takes the Dodge action.`);
        if (this.hasAnyCondition(currentCombatant, ['Slowed'])) currentCombatant.slowedActionConsumed = true;
        this.endTurn();
    }

    // Simulate the entire battle until one team is out of monsters
    simulateBattle() {
        if (!this.combatActive || this.initiativeOrder.length === 0) {
            this.logMessage('Combat must be started and initiative rolled before simulation.');
            return;
        }
        this.logMessage('Battle simulation started!', 'attack');
        this.simulationRunning = true;
        try {
            $('#rollInitiative').prop('disabled', true).attr('title', 'Disabled during simulation');
            $('#addMonster').prop('disabled', true).attr('title', 'Disabled during simulation');
            $('#surpriseToggleBtn').prop('disabled', true).attr('title', 'Disabled during simulation');
        } catch {}
        // Debug: Log initiative order
        this.logMessage(`Initiative order: ${this.initiativeOrder.map(c => `${c.name} (${c.team})`).join(', ')}`);
        let interval = setInterval(() => {
            // Check for end condition
            const aliveTeams = {};
            this.initiativeOrder.forEach(c => {
                if (!c.isDead) {
                    aliveTeams[c.team] = true;
                }
            });
            const teams = Object.keys(aliveTeams);
            if (teams.length <= 1) {
                if (teams.length === 0) {
                    this.logMessage('Battle ended in a draw!', 'critical');
                } else {
                    this.logMessage(`Battle ended! Winning team: ${teams[0]}`, 'critical');
                }
                clearInterval(interval);
                this.combatActive = false;
                this.simulationRunning = false;
                try {
                    $('#rollInitiative').prop('disabled', false).attr('title', '');
                    $('#addMonster').prop('disabled', false).attr('title', '');
                    $('#surpriseToggleBtn').prop('disabled', false).attr('title', '');
                } catch {}
                this.updateActionButtons();
                return;
            }
            // Simulate current turn
            const currentCombatant = this.getCurrentCombatant();
            if (!currentCombatant || currentCombatant.isDead) {
                this.logMessage(`Turn ${this.currentTurnIndex + 1}: No valid combatant, ending turn.`);
                this.endTurn();
                return;
            }
            this.logMessage(`Turn ${this.currentTurnIndex + 1}: ${currentCombatant.name} (${currentCombatant.team}) acts.`);
            // If restrained, decide whether to attempt to escape before attacking
            if (this.hasAnyCondition(currentCombatant, ['Restrained'])) {
                // Only one escape decision per creature per round
                if (currentCombatant.lastEscapeDecisionRound !== this.combatRound) {
                    currentCombatant.lastEscapeDecisionRound = this.combatRound;
                    if (this.shouldAttemptEscapeNow(currentCombatant)) {
                        this.logMessage(`${currentCombatant.name} (${currentCombatant.team}) attempts to escape Restraint before attacking.`);
                        this.attemptEscapeRestrained();
                        // Clear flag for next turns regardless of outcome
                        currentCombatant.considerEscapeAfterHit = false;
                        this.endTurn();
                        return;
                    }
                    // If not attempting this turn, clear the post-hit urge after one turn
                    this.logMessage(`${currentCombatant.name} (${currentCombatant.team}) remains Restrained and chooses not to attempt escape this turn.`);
                    currentCombatant.considerEscapeAfterHit = false;
                }
            }
            // If grappled (but not restrained), decide whether to attempt to escape before attacking
            else if (this.hasAnyCondition(currentCombatant, ['Grappled'])) {
                if (currentCombatant.lastGrappleEscapeDecisionRound !== this.combatRound) {
                    currentCombatant.lastGrappleEscapeDecisionRound = this.combatRound;
                    if (this.shouldAttemptEscapeNow(currentCombatant)) {
                        this.logMessage(`${currentCombatant.name} (${currentCombatant.team}) attempts to escape Grapple before attacking.`);
                        this.attemptEscapeGrappled();
                        currentCombatant.considerEscapeAfterHit = false;
                        this.endTurn();
                        return;
                    }
                    this.logMessage(`${currentCombatant.name} (${currentCombatant.team}) remains Grappled and chooses not to attempt escape this turn.`);
                    currentCombatant.considerEscapeAfterHit = false;
                }
            }
            // Find valid targets (avoid charmer if attacker is Charmed)
            let targets = this.initiativeOrder.filter(c => 
                c.id !== currentCombatant.id && !c.isDead && c.team !== currentCombatant.team &&
                !(this.isCharmedAgainst && this.isCharmedAgainst(currentCombatant, c)) &&
                // Targeting restriction: cannot directly target Invisible enemies without Blindsight or detection this turn
                !(this.getConditionObject && this.getConditionObject(c, 'Invisible') && !((this.hasBlindsight && this.hasBlindsight(currentCombatant)) || (Array.isArray(currentCombatant.detectedInvisibleIds) && currentCombatant.detectedInvisibleIds.includes(c.id))))
            );
            // If no targets due to invisibility, try to detect if capable by spending an action
            if (targets.length === 0) {
                const anyInvisibleEnemies = this.initiativeOrder.some(c => c && !c.isDead && c.team !== currentCombatant.team && this.getConditionObject && this.getConditionObject(c, 'Invisible'));
                if (anyInvisibleEnemies && this.canDetectInvisible(currentCombatant)) {
                    const didDetect = this.detectInvisibleAction();
                    if (didDetect) {
                        targets = this.initiativeOrder.filter(c => 
                            c.id !== currentCombatant.id && !c.isDead && c.team !== currentCombatant.team &&
                            !(this.isCharmedAgainst && this.isCharmedAgainst(currentCombatant, c)) &&
                            !(this.getConditionObject && this.getConditionObject(c, 'Invisible') && !((this.hasBlindsight && this.hasBlindsight(currentCombatant)) || (Array.isArray(currentCombatant.detectedInvisibleIds) && currentCombatant.detectedInvisibleIds.includes(c.id))))
                        );
                    }
                }
            }
            if (targets.length === 0) {
                this.logMessage(`${currentCombatant.name} (${currentCombatant.team}) has no valid targets.`);
                this.endTurn();
                return;
            }
            // Optional alternate action: small chance to Intimidate instead of attacking
            if (targets.length > 0 && Math.random() < 0.10) {
                this.handleIntimidateAction(currentCombatant, targets[0]);
                this.endTurn();
                return;
            }
            // Debug: Log target selection
            this.logMessage(`${currentCombatant.name} (${currentCombatant.team}) targets ${targets[0].name} (${targets[0].team}).`);
            // Attack first valid target with proper attack selection
            this.performAttack(currentCombatant, targets[0], this.selectAttackForSimulation(currentCombatant, targets[0]));
            // End turn after attack to advance to next combatant
            this.endTurn();
        }, 100); // 0.1 seconds per turn for fast simulation
    }

    // Estimate proficiency bonus from a monster's CR string (very rough fallback)
    getProficiencyBonusFromCR(crString) {
        try {
            if (!crString) return 2;
            const s = String(crString);
            // Expect formats like "1/2 (100 XP)" or "5 (1,800 XP)"
            const crMatch = s.match(/^(\d+\/?\d*)/);
            if (!crMatch) return 2;
            let crVal = 0;
            const raw = crMatch[1];
            if (raw.includes('/')) {
                const [a,b] = raw.split('/');
                crVal = parseFloat(a) / parseFloat(b);
            } else {
                crVal = parseFloat(raw);
            }
            // Basic mapping approximating 5e PB by CR bands
            if (crVal < 5) return 2;
            if (crVal < 9) return 3;
            if (crVal < 13) return 4;
            if (crVal < 17) return 5;
            if (crVal < 21) return 6;
            if (crVal < 25) return 7;
            if (crVal < 29) return 8;
            return 9;
        } catch { return 2; }
    }

    // Handle an Intimidate action: CHA (Intimidation) vs WIS save; on failure, target is Frightened for 1 round
    handleIntimidateAction(actor, target) {
        if (!actor || !target) return;
        const already = this.getConditionObject ? this.getConditionObject(target, 'Frightened') : null;
        if (already) {
            this.logMessage(` ${target.name} is already Frightened and immune to new fear effects.`);
            return;
        }
        // Determine modifiers
        const chaScore = parseInt(actor.originalData?.cha ?? actor.cha ?? 10, 10) || 10;
        const wisScore = parseInt(target.originalData?.wis ?? target.wis ?? 10, 10) || 10;
        const chaMod = getAbilityModifier(chaScore);
        const wisMod = getAbilityModifier(wisScore);
        const pb = this.getProficiencyBonusFromCR(actor.originalData?.challenge || actor.challenge || '0');
        const saveDC = 8 + pb + chaMod;
        // Use parsed Intimidation skill bonus if present; else fallback to CHA mod
        let intimidateMod = chaMod;
        try {
            const skills = actor.skillBonuses || {};
            if (Number.isFinite(skills.Intimidation)) intimidateMod = skills.Intimidation;
            else if (Number.isFinite(skills.intimidation)) intimidateMod = skills.intimidation;
        } catch {}
        // Roll checks (actor roll for flavor; target makes a WIS save vs DC)
        const intimidateRoll = this.rollDice(20) + intimidateMod;
        this.logMessage(` ${actor.name} attempts to Intimidate ${target.name}! (Check total: ${intimidateRoll}, mod ${intimidateMod >= 0 ? '+' : ''}${intimidateMod})`);
        const targetSave = this.rollDice(20) + wisMod;
        this.logMessage(`DC ${saveDC}. ${target.name} rolls a WIS save of ${targetSave}.`);
        if (targetSave < saveDC) {
            const condition = { name: 'Frightened', rounds_remaining: 1, source_name: actor.name };
            this.applyCondition && this.applyCondition(target, condition, null, actor.id);
            this.logMessage(` Success! ${target.name} is Frightened until the end of its next turn.`);
        } else {
            this.logMessage(` Failure. ${target.name} is unmoved.`);
        }
    }

    // Decide whether a creature should attempt to escape a movement-impairing condition this turn
    shouldAttemptEscapeNow(combatant) {
        if (!combatant) return false;
        // Simple heuristic: try to escape if you still have at least 1 attack to trade for the attempt
        // and you are either Restrained or Grappled.
        const hasAttacks = (combatant.attacksRemaining || 0) > 0;
        const isRestrained = this.hasAnyCondition && this.hasAnyCondition(combatant, ['Restrained']);
        const isGrappled = this.hasAnyCondition && this.hasAnyCondition(combatant, ['Grappled']);
        return hasAttacks && (isRestrained || isGrappled);
    }

    // Attempt to escape Restrained: STR or DEX check vs escape DC (default 14)
    attemptEscapeRestrained() {
        const c = this.getCurrentCombatant();
        if (!c) return false;
        const cond = this.getConditionObject ? this.getConditionObject(c, 'Restrained') : null;
        const dc = parseInt(cond?.escape_dc, 10) || 14;
        const str = parseInt(c.originalData?.str, 10) || 10;
        const dex = parseInt(c.originalData?.dex, 10) || 10;
        const strMod = getAbilityModifier(str);
        const dexMod = getAbilityModifier(dex);
        const rollStr = this.rollDice(20) + strMod;
        const rollDex = this.rollDice(20) + dexMod;
        const used = rollStr >= rollDex ? `STR ${rollStr}` : `DEX ${rollDex}`;
        const total = Math.max(rollStr, rollDex);
        if (total >= dc) {
            this.removeConditionByName && this.removeConditionByName(c, 'Restrained');
            this.logMessage(`${c.name} breaks free of Restraint (DC ${dc}, ${used} vs DC).`);
            return true;
        }
        this.logMessage(`${c.name} fails to escape Restraint (DC ${dc}, ${used} vs DC).`);
        return false;
    }

    // Attempt to escape Grappled: STR (Athletics) or DEX (Acrobatics) vs escape DC (default 14)
    attemptEscapeGrappled() {
        const c = this.getCurrentCombatant();
        if (!c) return false;
        const cond = this.getConditionObject ? this.getConditionObject(c, 'Grappled') : null;
        const dc = parseInt(cond?.escape_dc, 10) || 14;
        const str = parseInt(c.originalData?.str, 10) || 10;
        const dex = parseInt(c.originalData?.dex, 10) || 10;
        const strMod = getAbilityModifier(str);
        const dexMod = getAbilityModifier(dex);
        const rollStr = this.rollDice(20) + strMod;
        const rollDex = this.rollDice(20) + dexMod;
        const used = rollStr >= rollDex ? `STR ${rollStr}` : `DEX ${rollDex}`;
        const total = Math.max(rollStr, rollDex);
        if (total >= dc) {
            this.removeConditionByName && this.removeConditionByName(c, 'Grappled');
            this.logMessage(`${c.name} breaks free of the Grapple (DC ${dc}, ${used} vs DC).`);
            return true;
        }
        this.logMessage(`${c.name} fails to escape the Grapple (DC ${dc}, ${used} vs DC).`);
        return false;
    }

    // Select an attack for simulation, prioritizing attacks with special effects
    selectAttackForSimulation(combatant, target = null) {
        // Build a combined list of available attacks, including charged rechargeable abilities
        let attacks = [];
        if (combatant.attacks && typeof combatant.attacks === 'object') {
            attacks = attacks.concat(Object.values(combatant.attacks));
        }
        if (combatant.rechargeable_attack && typeof combatant.rechargeable_attack === 'object') {
            for (const ability of Object.values(combatant.rechargeable_attack)) {
                if (ability && ability.recharge) {
                    if (ability.used === false) {
                        attacks.push(ability);
                    }
                }
            }
        }
        if (attacks.length === 0) return null;
        if (attacks.length === 0) return null;
        
        // If only one attack, use it
        if (attacks.length === 1) {
            return attacks[0];
        }
        
        // Get intelligence and wisdom scores from original monster data
        const intScore = parseInt(combatant.originalData?.int || 10);
        const wisScore = parseInt(combatant.originalData?.wis || 10);
        const higherMentalScore = Math.max(intScore, wisScore);
        
        // Filter out attacks remembered as ineffective against this target
        let availableAttacks = attacks;
        if (target && higherMentalScore >= 10) {
            availableAttacks = attacks.filter(attack => 
                !this.isAttackRememberedAsIneffective(combatant, target, attack)
            );
            
            // If all attacks are remembered as ineffective, use all attacks anyway
            if (availableAttacks.length === 0) {
                availableAttacks = attacks;
                this.logMessage(`${combatant.name} has no effective attacks remembered, trying any attack.`);
            } else if (availableAttacks.length < attacks.length) {
                this.logMessage(`${combatant.name} avoids attacks remembered as ineffective against ${target.name}.`);
            }
        }
        
        // Calculate attack effectiveness for each available attack
        const attackEffectiveness = availableAttacks.map(attack => {
            const effectiveness = this.calculateAttackEffectiveness(attack);
            return { attack, effectiveness };
        });
        
        // Sort by effectiveness (highest first)
        attackEffectiveness.sort((a, b) => b.effectiveness - a.effectiveness);
        
        // Determine decision-making ability based on mental score
        // Higher mental scores = more likely to choose the best attack
        const decisionThreshold = Math.min(0.9, Math.max(0.1, (higherMentalScore - 8) / 20));
        
        // Roll to see if monster makes the "smart" choice
        const roll = Math.random();
        
        if (roll < decisionThreshold) {
            // Monster chooses the most effective attack
            const bestAttack = attackEffectiveness[0].attack;
            this.logMessage(`${combatant.name} (Int ${intScore}/Wis ${wisScore}) chooses the most effective attack.`);
            return bestAttack;
        } else {
            // Monster chooses randomly from available attacks
            const randomAttack = availableAttacks[Math.floor(Math.random() * availableAttacks.length)];
            this.logMessage(`${combatant.name} (Int ${intScore}/Wis ${wisScore}) chooses an attack randomly.`);
            return randomAttack;
        }
    }

    // Calculate attack effectiveness based on attack bonus and damage potential
    calculateAttackEffectiveness(attack) {
        let effectiveness = 0;
        
        // Factor 1: Attack bonus (higher = more likely to hit)
        const attackBonus = attack["to hit"] ? parseInt(attack["to hit"].replace('+', '')) || 0 : 0;
        effectiveness += attackBonus * 2; // Weight attack bonus heavily
        
        // Factor 2: Damage potential
        let damagePotential = 0;
        
        // For regular attacks with hit damage
        if (attack.hit) {
            damagePotential = this.parseAverageDamage(attack.hit);
        }
        
        // For save-based attacks
        if (attack.save && attack.save.damage) {
            damagePotential = Math.max(damagePotential, this.parseAverageDamage(attack.save.damage));
        }
        
        // For effects-based attacks
        if (attack.effects && Array.isArray(attack.effects)) {
            for (const effect of attack.effects) {
                if (effect['one-time damage']) {
                    damagePotential = Math.max(damagePotential, this.parseAverageDamage(effect['one-time damage']));
                }
                if (effect['ongoing damage']) {
                    damagePotential += this.parseAverageDamage(effect['ongoing damage']) * 0.5; // Ongoing damage is worth less
                }
            }
        }
        
        effectiveness += damagePotential;
        
        // Factor 3: Special effects bonus
        if (attack.poison || attack.save || attack.effects || attack.extraDamage) {
            effectiveness += 5; // Bonus for special effects
        }
        
        return effectiveness;
    }

    // Parse average damage from damage strings like "10 (3d6)" or "17 (2d10 + 6)"
    parseAverageDamage(damageString) {
        if (!damageString || typeof damageString !== 'string') return 0;
        
        // Try to extract the average damage (the number before the parentheses)
        const avgMatch = damageString.match(/^(\d+)/);
        if (avgMatch) {
            return parseInt(avgMatch[1]);
        }
        
        // Fallback: try to parse dice expression
        const diceMatch = damageString.match(/(\d+)d(\d+)([+-]\d+)?/);
        if (diceMatch) {
            const numDice = parseInt(diceMatch[1]);
            const dieSize = parseInt(diceMatch[2]);
            const modifier = diceMatch[3] ? parseInt(diceMatch[3]) : 0;
            
            // Calculate average damage
            const avgDieRoll = (dieSize + 1) / 2;
            return Math.floor(numDice * avgDieRoll + modifier);
        }
        
        return 0;
    }

    // Function to format the speed object into a readable string
    formatSpeed(speed) {
        if (!speed) return '';

        let formattedSpeed = '';

        if (speed.surface) {
            formattedSpeed += `${speed.surface.movement} ft.`;
        }
        if (speed.fly) {
            formattedSpeed += `${formattedSpeed ? ', ' : ''}fly ${speed.fly.movement} ft.`;
        }
        if (speed.swim) {
            formattedSpeed += `${formattedSpeed ? ', ' : ''}swim ${speed.swim.movement} ft.`;
        }

        return formattedSpeed; // Ensure this is the last statement in the function
    }

    // Update the monster details display logic
    displayMonsterDetails(monster) {
        const speedElement = document.querySelector('.monster-details .speed .value');
        if (speedElement) {
            speedElement.textContent = this.formatSpeed(monster.speed); // Format the speed before displaying it
        }

        // ...other code to display monster details...
    }

    // Utility Methods
    getCurrentCombatant() {
        if (!this.combatActive || this.initiativeOrder.length === 0) return null;
        return this.initiativeOrder[this.currentTurnIndex];
    }

    closeModals() {
        $('.modal').hide();
    }

    logMessage(message, type = 'normal') {
        // Inject team labels for any known combatant names not already followed by a team label
        try {
            const everyone = (this.initiativeOrder && this.initiativeOrder.length > 0) ? this.initiativeOrder : (this.combatants || []);
            const seen = new Set();
            for (const c of everyone) {
                if (!c || !c.name || !c.team) continue;
                if (seen.has(c.name)) continue; // avoid duplicate replacements for same name
                seen.add(c.name);
                const pattern = new RegExp(`\\b${escapeRegExp(c.name)}\\b(?!\\s*\\()`, 'g');
                message = message.replace(pattern, `${c.name} (${c.team})`);
            }
        } catch (_) { /* best-effort labeling; ignore errors */ }

        const timestamp = new Date().toLocaleTimeString();
        const logEntry = $(`<div class="log-entry ${type}">[${timestamp}] ${message}</div>`);
        // Prepend so latest is at the top
        $('#combatLog').prepend(logEntry);
        // No need to scroll, newest is visible
    }

    // Display Updates
    updateDisplay() {
        // Normalize Exhaustion-derived stats before rendering
        for (const c of this.combatants) {
            this.applyExhaustionDerivedStats(c);
        }
        // Keep Surprise toggle state in sync with simulation status
        try {
            const enable = !this.simulationRunning;
            const title = this.simulationRunning ? 'Disabled during simulation' : '';
            $('#surpriseToggleBtn').prop('disabled', !enable).attr('title', title);
            // Only disable Add Monster and Roll Initiative while simulation is running
            $('#rollInitiative').prop('disabled', !!this.simulationRunning).attr('title', this.simulationRunning ? 'Disabled during simulation' : '');
            $('#addMonster').prop('disabled', !!this.simulationRunning).attr('title', this.simulationRunning ? 'Disabled during simulation' : '');
        } catch {}
        this.updateCharacterList();
        this.updateInitiativeList();
        this.updateCurrentTurn();
        this.updateActionButtons();
    }

    updateCharacterList() {
        const container = $('.character-panel');
        container.empty();

        // Filter combatants by current team filter
        let filteredCombatants = this.combatants;
        if (this.currentTeamFilter !== 'All Teams') {
            filteredCombatants = this.combatants.filter(c => c.team === this.currentTeamFilter);
        }

        filteredCombatants.forEach((combatant, index) => {
            const teamClass = combatant.team.toLowerCase().replace(' ', '-');
            const combatantDiv = $(`
                <div class="combatant ${teamClass}" data-index="${index}">
                    <span class="combatant-name left-content">${combatant.name}</span>
                    <span class="combatant-team left-content"> (${combatant.team})</span>
                    <button class="add-multiple-btn btn-ml-10 right-content">Add More</button>
                    <button class="remove-monster-btn btn-danger-mini btn-ml-5 right-content">Remove</button>
                </div>
            `);

            // Add More button
            combatantDiv.find('.add-multiple-btn').click(() => {
                const count = parseInt(prompt(`How many more "${combatant.name}" would you like to add?`, "1"));
                if (isNaN(count) || count < 1) return;

                for (let i = 0; i < count; i++) {
                    let baseName = combatant.name.replace(/\s#\d+$/, '');
                    let newCombatant = { ...combatant, name: `${baseName} #${this.combatants.length + 1}` };
                    this.combatants.push(newCombatant);
                    this.logMessage(`${newCombatant.name} has been added to ${newCombatant.team}.`);
                }
                this.updateCharacterList();
            });

            // Remove button
            combatantDiv.find('.remove-monster-btn').click(() => {
                this.combatants = this.combatants.filter((c, i) => i !== index);
                this.initiativeOrder = this.initiativeOrder.filter((c, i) => i !== index);
                this.updateCharacterList();
                this.updateInitiativeList();
                this.logMessage(`${combatant.name} has been removed from ${combatant.team}.`);
            });
            container.append(combatantDiv);
        });
    }

    updateInitiativeList() {
        const container = $('#initiativeList');
        container.empty();

        // If initiative hasn't been rolled, show all combatants
        let list = this.initiativeOrder.length > 0 ? this.initiativeOrder : this.combatants;

        if (list.length === 0) {
            container.append('<p class="no-combatants">No combatants in combat</p>');
            return;
        }

        // Determine if we should show survivor badges: combat over and there were casualties
        const showSurvivors = (!this.combatActive) && list.some(c => c.isDead) && list.some(c => !c.isDead);

        list.forEach((combatant, index) => {
            const isCurrentTurn = this.combatActive && index === this.currentTurnIndex;
            const teamClass = combatant.team.toLowerCase().replace(' ', '-');
            const conds = Array.isArray(combatant.conditions) ? combatant.conditions : [];
            const condBadges = (!combatant.isDead ? conds.map(c => {
                const n = typeof c === 'string' ? c : (c && c.name) || '';
                if (!n) return '';
                const upper = String(n).toUpperCase();
                if (typeof c === 'object' && /exhaustion/i.test(n) && typeof c.level !== 'undefined') {
                    const lvl = parseInt(c.level, 10) || 0;
                    return `<span class="condition-badge">[EXHAUSTION L${lvl}]</span>`;
                }
                return `<span class="condition-badge">[${upper}]</span>`;
            }) : []).filter(Boolean).join(' ');
            const conditionsHtml = (!combatant.isDead && condBadges) ? `<span class="conditions"> ${condBadges}</span>` : '';
            const deadBadge = combatant.isDead ? '<span class="condition-badge">[DEAD]</span>' : '';
            const survivedBadge = (!combatant.isDead && showSurvivors) ? '<span class="condition-badge">[SURVIVED]</span>' : '';
            const initiativeItem = $(`
                <div class="initiative-item ${isCurrentTurn ? 'current-turn' : ''} ${combatant.isDead ? 'dead' : ''} ${teamClass}">
                    <div class="name">${combatant.name} <span class="team-indicator ${teamClass}">${combatant.team}</span> ${deadBadge || survivedBadge || (!combatant.isDead && combatant.frightened) ? '<span class="condition-badge">[FRIGHTENED]</span>' : ''} ${conditionsHtml}</div>
                    <div class="stats">
                        <span>Initiative: ${combatant.initiative !== null ? combatant.initiative : '-'}</span>
                        <span>AC: ${combatant.ac}</span>
                        <span>HP: ${combatant.hp}/${combatant.maxHp}</span>
                        <span>Attacks: ${combatant.attacksRemaining || 0}/${combatant.numberOfAttacks || 1}</span>
                    </div>
                </div>
            `);
            container.append(initiativeItem);
        });
    }

    updateCurrentTurn() {
        const currentCombatant = this.getCurrentCombatant();
        const container = $('#currentCombatant');
        
        if (!currentCombatant) {
            container.html('<p>No active combatant</p>');
            return;
        }

        container.html(`
            <h3>${currentCombatant.name}</h3>
            <p>Round ${this.combatRound} - Turn ${this.currentTurnIndex + 1}</p>
            <p>HP: ${currentCombatant.hp}/${currentCombatant.maxHp} | AC: ${currentCombatant.ac} | Attacks: ${currentCombatant.attacksRemaining || 0}/${currentCombatant.numberOfAttacks || 1}</p>
        `);
    }

    updateActionButtons() {
        // Disable all action buttons except #simulateBattleBtn
        $(".action-buttons button").not("#simulateBattleBtn").prop("disabled", true);
        // Only enable #simulateBattleBtn if appropriate
        const currentCombatant = this.getCurrentCombatant();
        const hasActiveCombatant = currentCombatant !== null;
        const hasValidTargets = this.initiativeOrder.filter(c => !c.isDead).length > 1;
        const hasAttacksRemaining = currentCombatant ? currentCombatant.attacksRemaining > 0 : false;
        // If you want to control #simulateBattleBtn's enabled state, you can do so here:
        // $('#simulateBattleBtn').prop('disabled', !this.combatActive || this.initiativeOrder.length === 0);
    }

    // Additional Methods
    removeCharacter(id) {
        this.combatants = this.combatants.filter(c => c.id !== id);
        this.initiativeOrder = this.initiativeOrder.filter(c => c.id !== id);
        this.updateDisplay();
        this.logMessage('Character removed from combat.');
    }

    healCharacter(id) {
        const character = this.combatants.find(c => c.id === id);
        if (character) {
            const healAmount = this.rollDice(8) + 2; // Basic healing
            character.hp = Math.min(character.maxHp, character.hp + healAmount);
            this.logMessage(`${character.name} heals for ${healAmount} hit points.`, 'heal');
            this.updateDisplay();
        }
    }

    addSelectedMonster() {
        const index = this.selectedMonsterIndex;
        if (index === null || typeof monsters[index] === 'undefined') {
            alert('Please select a monster first.');
            return;
        }
        const monsterData = monsters[index];
        let count = parseInt($('#monsterCountInput').val());
        if (isNaN(count) || count < 1) count = 1;

        for (let i = 0; i < count; i++) {
            const monster = this.convertMonsterToCombatant(monsterData);
            monster.team = this.selectedMonsterTeam;
            if (count > 1) {
                monster.name = `${monster.name} #${i + 1}`;
            }
            this.combatants.push(monster);
            this.logMessage(`${monster.name} has been added to ${monster.team}.`);
        }
        this.updateCharacterList();
        this.closeModals();
    }

    removeMonstersFromTeam(team) {
        const beforeCount = this.combatants.length;
        this.combatants = this.combatants.filter(c => !(c.type === 'monster' && c.team === team));
        const afterCount = this.combatants.length;
        this.initiativeOrder = this.initiativeOrder.filter(c => !(c.type === 'monster' && c.team === team));
        this.updateDisplay();
        this.logMessage(`Removed ${beforeCount - afterCount} monster(s) from ${team}.`);
    }

    copyTeamInfoToClipboard() {
        try {
            const el = document.getElementById('combatLog');
            const text = el ? (el.innerText || el.textContent || '') : '';
            if (!text) {
                this.logMessage('Combat Log is empty; nothing to copy.');
                return;
            }
            navigator.clipboard.writeText(text).then(() => {
                this.logMessage('Combat Log copied to clipboard!');
            }).catch(err => {
                this.fallbackCopyToClipboard(text);
            });
        } catch (err) {
            const el = document.getElementById('combatLog');
            const text = el ? (el.innerText || el.textContent || '') : '';
            this.fallbackCopyToClipboard(text);
        }
    }

    getTeamInfo() {
        const teams = {};
        
        // Group combatants by team
        this.combatants.forEach(combatant => {
            if (!teams[combatant.team]) {
                teams[combatant.team] = [];
            }
            teams[combatant.team].push(combatant);
        });

        // Format team information
        let teamInfo = '=== D&D Combat Simulator - Team Information ===\n\n';
        
        Object.keys(teams).forEach(teamName => {
            teamInfo += `--- ${teamName} ---\n`;
            teams[teamName].forEach(combatant => {
                const status = combatant.isDead ? ' (DEAD)' : '';
                const hp = `${combatant.hp}/${combatant.maxHp}`;
                teamInfo += `• ${combatant.name}${status} - HP: ${hp}, AC: ${combatant.ac}\n`;
            });
            teamInfo += '\n';
        });

        // Add current view and round info
        teamInfo += `Current View: ${this.currentTeamFilter}\n`;
        if (this.combatActive) {
            teamInfo += `Combat Round: ${this.combatRound}\n`;
            teamInfo += `Current Turn: ${this.currentTurnIndex + 1} of ${this.initiativeOrder.length}\n`;
        }

        return teamInfo;
    }

    fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.logMessage('Team information copied to clipboard!');
        } catch (err) {
            this.logMessage('Failed to copy team information to clipboard.');
        }
        
        document.body.removeChild(textArea);
    }
}

// Escape a string for use inside a RegExp pattern (used by logMessage team labeling)
function escapeRegExp(string) {
    return String(string).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Returns the ability modifier for a given score (e.g., dexterity)
function getAbilityModifier(score) {
    score = parseInt(score, 10);
    if (isNaN(score)) return 0;
    return Math.floor((score - 10) / 2);
}

// Example usage:
// getAbilityModifier(14) // returns 2
// getAbilityModifier(8)  // returns -1

// Fallback monster data if external file fails to load
const FALLBACK_MONSTERS = [
    {
        name: "Goblin",
        size: "Small",
        type: "Humanoid",
        "armor class": "15",
        "hit points": "7 (2d6)",
        speed: "30 ft.",
        dex: "14",
        challenge: "1/4 (50 XP)",
        "number of attacks": 1,
        attacks: {
            "Scimitar": {
                "to hit": "+4",
                hit: "5 (1d6 + 2)"
            }
        }
    },
    {
        name: "Orc",
        size: "Medium",
        type: "Humanoid",
        "armor class": "13",
        "hit points": "15 (2d8 + 6)",
        speed: "30 ft.",
        dex: "12",
        challenge: "1/2 (100 XP)",
        "number of attacks": 1,
        attacks: {
            "Greataxe": {
                "to hit": "+5",
                hit: "9 (1d12 + 3)"
            }
        }
    },
    {
        name: "Skeleton",
        size: "Medium",
        type: "Undead",
        "armor class": "13",
        "hit points": "13 (2d8 + 4)",
        speed: "30 ft.",
        dex: "14",
        challenge: "1/4 (50 XP)",
        "number of attacks": 1,
        attacks: {
            "Shortsword": {
                "to hit": "+4",
                hit: "5 (1d6 + 2)"
            }
        }
    },
    {
        name: "Bandit",
        size: "Medium",
        type: "Humanoid",
        "armor class": "12",
        "hit points": "11 (2d8 + 2)",
        speed: "30 ft.",
        dex: "12",
        challenge: "1/8 (25 XP)",
        "number of attacks": 1,
        attacks: {
            "Scimitar": {
                "to hit": "+3",
                hit: "4 (1d6 + 1)"
            }
        }
    }
];

// Initialize the combat simulator when the page loads
let combatSim;
$(document).ready(() => {
    combatSim = new CombatSimulator();
    
    // If external monsters didn't load, use fallback data
    if (typeof monsters === 'undefined') {
        window.monsters = FALLBACK_MONSTERS;
        console.log('Using fallback monster data');
    }
    
    // Set default team filter
    $('#switchAll').addClass('active');
});