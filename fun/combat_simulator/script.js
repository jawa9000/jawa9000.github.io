// to do list:
/*
    Execute this prompt:
        Update this script to use the attack bonuses ("to hit") and damage ("hit"). The attack bonus should be included in the calculation of the attack. If the monster hits it's target, the include the damage from "hit". To parse the damage found in the hit property, you'll see a number (which is the average of the damage dice) followed by a pair of parentheses. In that parentheses, you'll find something like 2d6 + 8. That means you need to roll two d6 dice, add 8, and add all that up for the total damage.
*/

// D&D 5e Combat Simulator
class CombatSimulator {
    constructor() {
        this.combatants = [];
        this.currentTurnIndex = 0;
        this.combatActive = false;
        this.combatRound = 0;
        this.initiativeOrder = [];
        this.currentTeamFilter = 'All Teams';
        this.selectedMonsterTeam = 'Team A'; // Track selected monster team
        
        this.initializeEventListeners();
        this.updateDisplay();
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
                    <button id="addMonsterBtn" class="btn btn-primary" style="margin-left:10px;">Add Monster(s)</button>
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
                            <span>Speed: ${monster.speed}</span>
                        </div>
                    </div>
                    <div class="monster-stats">
                        <div class="monster-cr">CR ${this.parseChallenge(monster.challenge)}</div>
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
        
        // Parse HP from string like "135 (18d10 + 36)" to just the number
        const hp = this.parseHP(monsterData['hit points']);
        
        // Parse AC from string like "17 (Natural Armor)" to just the number
        const ac = this.parseAC(monsterData['armor class']);
        
		// Parse resistances and immunities as comma-separated lists
		const damageResistances = this.parseCommaList(monsterData['damage resistances']);
		const damageImmunities = this.parseCommaList(monsterData['damage immunities']);
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
        
        return {
            id: Date.now() + Math.random(),
            name: monsterData.name || 'Unknown Monster',
            type: 'monster',
            ac: ac,
            hp: hp,
            maxHp: hp,
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
			conditionImmunities: conditionImmunities,
            isDead: false,
            originalData: monsterData, // Keep reference to original data
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
            initiativeBonus: 0,
            attackBonus: 0,
            damage: '1d6',
            speed: 30,
            numberOfAttacks: 1,
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
        // Extract number from strings like "135 (18d10 + 36)" or "9 (2d8)"
        if (!hpString || typeof hpString !== 'string') return 10;
        const match = hpString.match(/(\d+)/);
        return match ? parseInt(match[1]) : 10;
    }

    parseAC(acString) {
        // Extract number from strings like "17 (Natural Armor)" or "10"
        if (!acString || typeof acString !== 'string') return 10;
        const match = acString.match(/(\d+)/);
        return match ? parseInt(match[1]) : 10;
    }

    parseChallenge(challengeString) {
        // Extract CR from strings like "10 (5,900 XP)" or "1/4 (50 XP)"
        if (!challengeString || typeof challengeString !== 'string') return '1';
        const match = challengeString.match(/(\d+(?:\/\d+)?)/);
        return match ? match[1] : '1';
    }

    parseDamage(damageString) {
        // Extract damage dice from strings like "12 (2d6 + 5)" or "15 (3d6 + 5)"
        if (!damageString || typeof damageString !== 'string') return '1d6';
        const match = damageString.match(/(\d+d\d+(?:\s*[+-]\s*\d+)?)/);
        return match ? match[1] : '1d6';
    }

    parseSpeed(speedString) {
        // Extract first speed value from strings like "10 ft. swim 40ft." or "30ft."
        if (!speedString || typeof speedString !== 'string') return 30;
        const match = speedString.match(/(\d+)\s*ft/);
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

	// Parse comma-separated fields like damage/condition immunities and resistances
	parseCommaList(str) {
		if (!str || typeof str !== 'string') return [];
		const result = str
			.split(',')
			.map(s => s.trim())
			.filter(Boolean)
			.map(s => s.toLowerCase());
		
		// If the result contains "none", return empty array
		if (result.includes('none')) {
			return [];
		}
		
		return result;
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

	// Roll a saving throw for a target
	rollSavingThrow(target, ability, dc) {
		const abilityKey = (ability || '').toLowerCase().slice(0, 3); // 'str','dex','con','int','wis','cha'
		const abilityScore = parseInt(target.originalData?.[abilityKey] ?? 10, 10);
		const mod = getAbilityModifier(abilityScore);
		const roll = this.rollDice(20) + mod;
		this.logMessage(`${target.name} ${ability} save: ${roll} vs DC ${dc}`);
		return roll >= dc;
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

    this.combatActive = true;
    this.currentTurnIndex = 0;
    this.combatRound = 1;
    
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

        this.currentTurnIndex++;
        this.logMessage(`Ending turn ${this.currentTurnIndex}.`);
        
        // Check if round is complete
        if (this.currentTurnIndex >= this.initiativeOrder.length) {
            this.currentTurnIndex = 0;
            this.combatRound++;
            this.logMessage(`Combat Round ${this.combatRound} begins!`);
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
            currentCombatant.attacksRemaining = currentCombatant.numberOfAttacks || 1;
            this.logMessage(`${currentCombatant.name} starts their turn with ${currentCombatant.attacksRemaining} attack${currentCombatant.attacksRemaining !== 1 ? 's' : ''} remaining.`);
        }
    }

	// Apply ongoing start-of-turn effects like ongoing damage from grapple
	applyStartOfTurnEffects(combatant) {
		if (!Array.isArray(combatant.conditions)) return;
		for (const cond of combatant.conditions) {
			if (cond.ongoing && /(start of each of its turns)/i.test(cond.ongoing.timing || '')) {
				const dmgType = (cond.ongoing.type || '').toLowerCase();
				if (this.hasDamageImmunity(combatant, dmgType)) {
					this.logMessage(`${combatant.name} is immune to ${dmgType} damage (ongoing).`);
					continue;
				}
				const dmg = this.rollDamage(cond.ongoing.dice);
				combatant.hp -= dmg;
				this.logMessage(`${combatant.name} takes ${dmg} ${dmgType || 'damage'} (ongoing).`);
			}
		}
		if (combatant.hp <= 0) {
			combatant.isDead = true;
			this.logMessage(`${combatant.name} drops to 0 HP and is defeated!`);
		}
		this.updateDisplay();
	}

    // Attack System
    openAttackModal() {
        const currentCombatant = this.getCurrentCombatant();
        if (!currentCombatant) return;

        // Check if combatant has attacks remaining
        if (currentCombatant.attacksRemaining <= 0) {
            alert(`${currentCombatant.name} has no attacks remaining this turn.`);
            return;
        }

        const targets = this.initiativeOrder.filter(c => 
            c.id !== currentCombatant.id && !c.isDead
        );

        if (targets.length === 0) {
            alert('No valid targets available.');
            return;
        }

        // For now, attack the first available target
        // In a full implementation, you'd have a target selection UI
        const selectedAttack = this.selectAttackForSimulation(currentCombatant, targets[0]);
        this.performAttack(currentCombatant, targets[0], selectedAttack);
    }

    // helper: parse damage strings like "10 (3d6)" or "17 (2d10 + 6)"
    parseDamageString(damageStr) {
        if (!damageStr) return 0;
        // prefer the parenthetical dice expression if present
        const paren = damageStr.match(/\(([^)]+)\)/);
        const expr = paren ? paren[1].trim() : damageStr.trim();
        // If rollDamage helper exists use it (common in this project)
        if (typeof this.rollDamage === 'function') {
            try {
                return this.rollDamage(expr);
            } catch (e) {
                // fallthrough to numeric parse
            }
        }
        // fallback: take leading number (e.g. "10 (3d6)" -> 10)
        const num = damageStr.match(/^\s*(\d+)/);
        return num ? parseInt(num[1], 10) : 0;
    }

    performAttack(attacker, target, attack) {
        // If attack is not provided, use the first available attack from attacker
        if (!attack) {
            if (attacker.attacks && typeof attacker.attacks === 'object') {
                attack = Object.values(attacker.attacks)[0];
            } else {
                // Fallback to a default attack
                attack = { "to hit": "+0", hit: "1d6" };
            }
        }

		// Save-based attack path (e.g., cones/breaths with DC and half on success)
		if (attack.save && attack.save.dc && attack.save.ability) {
			const attackName = this.getAttackName(attacker, attack);
			const succeeded = this.rollSavingThrow(target, attack.save.ability, attack.save.dc);
			const baseDamageDice = attack.save.damage || attack.hit || '1d6';
			let damage = this.rollDamage(baseDamageDice);
			const dmgType = (attack['damage type'] || attack.save.damageType || '').toLowerCase();
			if (this.hasDamageImmunity(target, dmgType)) {
				this.logMessage(`${target.name} is immune to ${dmgType || 'this'} damage from ${attacker.name}'s ${attackName}.`);
				damage = 0;
			} else if (succeeded && attack.save.halfOnSuccess) {
				const originalDamage = damage;
				damage = Math.floor(damage / 2);
				if (this.hasDamageResistance(target, dmgType)) {
					const beforeResistance = damage;
					damage = Math.floor(damage / 2);
					this.logMessage(`${target.name} succeeds against ${attacker.name}'s ${attackName} and takes half ${dmgType || 'damage'}: ${damage} (resistance: ${beforeResistance - damage}).`);
				} else {
					this.logMessage(`${target.name} succeeds against ${attacker.name}'s ${attackName} and takes half ${dmgType || 'damage'}: ${damage}.`);
				}
			} else if (!succeeded) {
				const originalDamage = damage;
				if (this.hasDamageResistance(target, dmgType)) {
					const beforeResistance = damage;
					damage = Math.floor(damage / 2);
					this.logMessage(`${target.name} fails the save against ${attacker.name}'s ${attackName} and takes ${damage} ${dmgType || 'damage'} (resistance: ${beforeResistance - damage}).`);
				} else {
					this.logMessage(`${target.name} fails the save against ${attacker.name}'s ${attackName} and takes ${damage} ${dmgType || 'damage'}.`);
				}
			} else {
				const originalDamage = damage;
				if (this.hasDamageResistance(target, dmgType)) {
					const beforeResistance = damage;
					damage = Math.floor(damage / 2);
					this.logMessage(`${target.name} takes ${damage} ${dmgType || 'damage'} from ${attacker.name}'s ${attackName} (resistance: ${beforeResistance - damage}).`);
				} else {
					this.logMessage(`${target.name} takes ${damage} ${dmgType || 'damage'} from ${attacker.name}'s ${attackName}.`);
				}
			}

			// Remove the separate resistance handling since it's now integrated above

			if (damage > 0) {
				target.hp -= damage;
				if (target.hp <= 0) {
					target.isDead = true;
					this.logMessage(`${target.name} drops to 0 HP and is defeated!`);
				}
				this.updateDisplay();
			}

			// Optional rider on failed save
			if (!succeeded && attack.save.onFail && attack.save.onFail.pull) {
				this.logMessage(`${target.name} is pulled ${attack.save.onFail.pull} ft. toward ${attacker.name}.`);
			}
			return;
		}

		// Effects-based attack path (e.g., Omni Monster's Engulf attack)
		if (attack.effects && Array.isArray(attack.effects)) {
			const attackName = this.getAttackName(attacker, attack);
			// Process the first effect that has DC and damage
			const effect = attack.effects.find(e => e.dc && e.ability && e['one-time damage']);
			if (effect) {
				const succeeded = this.rollSavingThrow(target, effect.ability, effect.dc);
				const baseDamageDice = effect['one-time damage'] || '1d6';
				let damage = this.rollDamage(baseDamageDice);
				const dmgType = (attack['damage type'] || effect['ongoing damage type'] || effect['damage type'] || '').toLowerCase();
				
				if (this.hasDamageImmunity(target, dmgType)) {
					this.logMessage(`${target.name} is immune to ${dmgType || 'this'} damage from ${attacker.name}'s ${attackName}.`);
					damage = 0;
				} else if (succeeded) {
					const originalDamage = damage;
					damage = Math.floor(damage / 2);
					if (this.hasDamageResistance(target, dmgType)) {
						const beforeResistance = damage;
						damage = Math.floor(damage / 2);
						this.logMessage(`${target.name} succeeds against ${attacker.name}'s ${attackName} and takes half ${dmgType || 'damage'}: ${damage} (resistance: ${beforeResistance - damage}).`);
					} else {
						this.logMessage(`${target.name} succeeds against ${attacker.name}'s ${attackName} and takes half ${dmgType || 'damage'}: ${damage}.`);
					}
				} else {
					const originalDamage = damage;
					if (this.hasDamageResistance(target, dmgType)) {
						const beforeResistance = damage;
						damage = Math.floor(damage / 2);
						this.logMessage(`${target.name} fails the save against ${attacker.name}'s ${attackName} and takes ${damage} ${dmgType || 'damage'} (resistance: ${beforeResistance - damage}).`);
					} else {
						this.logMessage(`${target.name} fails the save against ${attacker.name}'s ${attackName} and takes ${damage} ${dmgType || 'damage'}.`);
					}
				}

				// Remove the separate resistance handling since it's now integrated above

				if (damage > 0) {
					target.hp -= damage;
					if (target.hp <= 0) {
						target.isDead = true;
						this.logMessage(`${target.name} drops to 0 HP and is defeated!`);
					}
					this.updateDisplay();
				}

				// Apply ongoing effects if specified
				if (!succeeded && effect.condition && !this.hasConditionImmunity(target, 'restrained')) {
					target.conditions.push({
						name: 'Restrained',
						sourceId: attacker.id,
						ongoing: effect['ongoing damage'] ? {
							dice: effect['ongoing damage'],
							type: effect['ongoing damage type'],
							timing: 'start of each of its turns'
						} : null
					});
					this.logMessage(`${target.name} is ${effect.condition.toLowerCase()}.`);
				}
			}
			return;
		}

		// Attack roll path
        const rawRoll = this.rollDice(20);
		const attackBonus = attack["to hit"] ? parseInt(attack["to hit"].replace('+', '')) || 0 : 0;
        const attackRoll = rawRoll + attackBonus;
		const isCritical = rawRoll === 20;

		let damage = this.rollDamage(attack.hit || '1d6');
		if (isCritical) damage *= 2;

		const damageTypeField = (attack['damage type'] || '').toLowerCase();
		// For strings like "bludgeoning plus acid", treat first segment as primary type
		const mainDmgType = damageTypeField.split(' plus ')[0].trim();

            if (attackRoll >= target.ac) {
			// Get attack name from the attack object or use a default
			const attackName = this.getAttackName(attacker, attack);
			this.logMessage(`${attacker.name} (${attacker.team}) hits ${target.name} (${target.team}) with ${attackName} (roll ${attackRoll}).`);
			// Apply primary damage if not immune
			if (!this.hasDamageImmunity(target, mainDmgType)) {
				if (damage > 0) {
					// Apply resistance if present
					const originalDamage = damage;
					if (this.hasDamageResistance(target, mainDmgType)) {
						damage = Math.floor(damage / 2);
					}
					this.logMessage(this.formatDamageMessage(attacker, target, damage, mainDmgType, originalDamage));
					target.hp -= damage;
				}
			} else {
				this.logMessage(`${target.name} is immune to ${mainDmgType || 'this'} damage.`);
			}

			// Apply extra damage parts (e.g., plus acid)
			if (attack.extraDamage && Array.isArray(attack.extraDamage)) {
				for (const part of attack.extraDamage) {
					const partType = (part.type || '').toLowerCase();
					if (this.hasDamageImmunity(target, partType)) {
						this.logMessage(`${target.name} is immune to ${partType} damage.`);
						continue;
					}
					let partDmg = this.rollDamage(part.dice || '1d6');
					const originalPartDmg = partDmg;
					if (this.hasDamageResistance(target, partType)) {
						partDmg = Math.floor(partDmg / 2);
					}
					target.hp -= partDmg;
					this.logMessage(this.formatDamageMessage(attacker, target, partDmg, partType, originalPartDmg));
				}
			}

			// Poison handling if provided on attack (save, damage, condition)
			if (attack.poison) {
				this.logMessage(`${attacker.name} attempts to poison ${target.name}!`);
				const poisonCfg = attack.poison;
				const dmgType = 'poison';
				let applyCondition = true;
				if (poisonCfg.save && poisonCfg.save.dc && poisonCfg.save.ability) {
					const succeeded = this.rollSavingThrow(target, poisonCfg.save.ability, poisonCfg.save.dc);
					if (succeeded && poisonCfg.save.halfOnSuccess && poisonCfg.damage) {
						let pdmg = this.rollDamage(poisonCfg.damage);
						if (this.hasDamageImmunity(target, dmgType)) {
							this.logMessage(`${target.name} is immune to poison damage.`);
							pdmg = 0;
						} else if (this.hasDamageResistance(target, dmgType)) {
							const before = pdmg;
							pdmg = Math.floor(pdmg / 2);
							this.logMessage(`${target.name} resists poison damage (${before} -> ${pdmg}).`);
						}
						pdmg = Math.floor(pdmg / 2);
						target.hp -= pdmg;
						this.logMessage(`${target.name} succeeds the poison save and takes ${pdmg} poison damage.`);
						applyCondition = false;
					} else if (!succeeded) {
						if (poisonCfg.damage) {
							let pdmg = this.rollDamage(poisonCfg.damage);
							if (this.hasDamageImmunity(target, dmgType)) {
								this.logMessage(`${target.name} is immune to poison damage.`);
								pdmg = 0;
							} else if (this.hasDamageResistance(target, dmgType)) {
								const before = pdmg;
								pdmg = Math.floor(pdg / 2);
								this.logMessage(`${target.name} resists poison damage (${before} -> ${pdmg}).`);
							}
							target.hp -= pdmg;
							this.logMessage(`${target.name} fails the poison save and takes ${pdmg} poison damage.`);
						}
						applyCondition = true;
					} else {
						// No halfOnSuccess or no damage specified: just a binary save
						applyCondition = !succeeded;
					}
				}
				if (applyCondition && poisonCfg.condition && !this.hasConditionImmunity(target, 'poisoned')) {
					target.conditions.push({ name: 'Poisoned', sourceId: attacker.id, duration: poisonCfg.duration || null });
					this.logMessage(`${target.name} is poisoned${poisonCfg.duration ? ` for ${poisonCfg.duration}` : ''}.`);
				} else if (applyCondition && this.hasConditionImmunity(target, 'poisoned')) {
					this.logMessage(`${target.name} is immune to the poisoned condition.`);
				}
			}

			// On-hit effects (e.g., grapple)
			if (attack.effects && Array.isArray(attack.effects)) {
				for (const effect of attack.effects) {
					if ((effect.type || '').toLowerCase() === 'grapple') {
						if (this.hasConditionImmunity(target, 'grappled')) {
							this.logMessage(`${target.name} is immune to being grappled.`);
							continue;
						}
						// If the effect specifies a saving throw on hit, allow it; else apply and use escape DC later
						let applyGrapple = true;
						if (effect.save && effect.save.dc && effect.save.ability) {
							const resisted = this.rollSavingThrow(target, effect.save.ability, effect.save.dc);
							applyGrapple = !resisted;
						}
						if (applyGrapple) {
							target.conditions.push({
								name: 'Grappled',
								sourceId: attacker.id,
								escapeDc: effect.escape_dc,
								ability: effect.ability || 'Strength',
								ongoing: effect['ongoing damage'] ? {
									dice: effect['ongoing damage'],
									type: effect['ongoing damage type'],
									timing: effect['ongoing damage timing']
								} : null
							});
							this.logMessage(`${target.name} is grappled (escape DC ${effect.escape_dc}).`);
						} else {
							this.logMessage(`${target.name} resists the grapple.`);
						}
					} else if ((effect.type || '').toLowerCase() === 'poison') {
						// Support Giant Ant-style effects objects with dc, ability, and "one-time damage"
						const dc = effect.dc;
						const ability = effect.ability || 'Constitution';
						const damageField = effect['one-time damage'] || effect['damage'] || null;
						const poisonType = (effect['ongoing damage type'] || 'poison').toLowerCase();
						if (dc && ability && damageField) {
							const succeeded = this.rollSavingThrow(target, ability, dc);
							let poisonDice = this.parseDamage(String(damageField));
							let pdmg = this.rollDamage(poisonDice || '1d6');
							// Apply immunity and resistance
							if (this.hasDamageImmunity(target, poisonType)) {
								this.logMessage(`${target.name} is immune to ${poisonType} damage.`);
								pdmg = 0;
							} else if (this.hasDamageResistance(target, poisonType)) {
								const before = pdmg;
								pdmg = Math.floor(pdg / 2);
								this.logMessage(`${target.name} resists ${poisonType} damage (${before} -> ${pdmg}).`);
							}
							if (succeeded) {
								const half = Math.floor(pdmg / 2);
								target.hp -= half;
								this.logMessage(`${target.name} succeeds the ${ability} save vs poison (DC ${dc}) and takes ${half} ${poisonType} damage.`);
							} else {
								target.hp -= pdmg;
								this.logMessage(`${target.name} fails the ${ability} save vs poison (DC ${dc}) and takes ${pdmg} ${poisonType} damage.`);
							}
							this.updateDisplay();
						} else {
							// Missing fields; log for visibility
							this.logMessage(`Poison effect present but missing dc/ability/one-time damage; skipping detailed processing.`);
						}
					} else if ((effect.type || '').toLowerCase() === 'fire') {
						// Support fire effects with dc, ability, and "one-time damage"
						const dc = effect.dc;
						const ability = effect.ability || 'Dexterity';
						const damageField = effect['one-time damage'] || effect['damage'] || null;
						const fireType = (effect['ongoing damage type'] || 'fire').toLowerCase();
						if (dc && ability && damageField) {
							const succeeded = this.rollSavingThrow(target, ability, dc);
							let fireDice = this.parseDamage(String(damageField));
							let fdmg = this.rollDamage(fireDice || '1d6');
							// Apply immunity and resistance
							if (this.hasDamageImmunity(target, fireType)) {
								this.logMessage(`${target.name} is immune to ${fireType} damage.`);
								fdmg = 0;
							} else if (this.hasDamageResistance(target, fireType)) {
								const before = fdmg;
								fdmg = Math.floor(fdmg / 2);
								this.logMessage(`${target.name} resists ${fireType} damage (${before} -> ${fdmg}).`);
							}
							if (succeeded) {
								const half = Math.floor(fdmg / 2);
								target.hp -= half;
								this.logMessage(`${target.name} succeeds the ${ability} save vs fire (DC ${dc}) and takes ${half} ${fireType} damage.`);
							} else {
								target.hp -= fdmg;
								this.logMessage(`${target.name} fails the ${ability} save vs fire (DC ${dc}) and takes ${fdmg} ${fireType} damage.`);
							}
							this.updateDisplay();
						} else {
							// Missing fields; log for visibility
							this.logMessage(`Fire effect present but missing dc/ability/one-time damage; skipping detailed processing.`);
						}
					} else if ((effect.type || '').toLowerCase() === 'acid') {
						// Support acid effects with dc, ability, and "one-time damage"
						const dc = effect.dc;
						const ability = effect.ability || 'Dexterity';
						const damageField = effect['one-time damage'] || effect['damage'] || null;
						const acidType = (effect['ongoing damage type'] || 'acid').toLowerCase();
						if (dc && ability && damageField) {
							const succeeded = this.rollSavingThrow(target, ability, dc);
							let acidDice = this.parseDamage(String(damageField));
							let admg = this.rollDamage(acidDice || '1d6');
							// Apply immunity and resistance
							if (this.hasDamageImmunity(target, acidType)) {
								this.logMessage(`${target.name} is immune to ${acidType} damage.`);
								admg = 0;
							} else if (this.hasDamageResistance(target, acidType)) {
								const before = admg;
								admg = Math.floor(admg / 2);
								this.logMessage(`${target.name} resists ${acidType} damage (${before} -> ${admg}).`);
							}
							if (succeeded) {
								const half = Math.floor(admg / 2);
								target.hp -= half;
								this.logMessage(`${target.name} succeeds the ${ability} save vs acid (DC ${dc}) and takes ${half} ${acidType} damage.`);
							} else {
								target.hp -= admg;
								this.logMessage(`${target.name} fails the ${ability} save vs acid (DC ${dc}) and takes ${admg} ${acidType} damage.`);
							}
							this.updateDisplay();
						} else {
							// Missing fields; log for visibility
							this.logMessage(`Acid effect present but missing dc/ability/one-time damage; skipping detailed processing.`);
						}
					} else if ((effect.type || '').toLowerCase() === 'cold') {
						// Support cold effects with dc, ability, and "one-time damage"
						const dc = effect.dc;
						const ability = effect.ability || 'Constitution';
						const damageField = effect['one-time damage'] || effect['damage'] || null;
						const coldType = (effect['ongoing damage type'] || 'cold').toLowerCase();
						if (dc && ability && damageField) {
							const succeeded = this.rollSavingThrow(target, ability, dc);
							let coldDice = this.parseDamage(String(damageField));
							let cdmg = this.rollDamage(coldDice || '1d6');
							// Apply immunity and resistance
							if (this.hasDamageImmunity(target, coldType)) {
								this.logMessage(`${target.name} is immune to ${coldType} damage.`);
								cdmg = 0;
							} else if (this.hasDamageResistance(target, coldType)) {
								const before = cdmg;
								cdmg = Math.floor(cdmg / 2);
								this.logMessage(`${target.name} resists ${coldType} damage (${before} -> ${cdmg}).`);
							}
							if (succeeded) {
								const half = Math.floor(cdmg / 2);
								target.hp -= half;
								this.logMessage(`${target.name} succeeds the ${ability} save vs cold (DC ${dc}) and takes ${half} ${coldType} damage.`);
							} else {
								target.hp -= cdmg;
								this.logMessage(`${target.name} fails the ${ability} save vs cold (DC ${dc}) and takes ${cdmg} ${coldType} damage.`);
							}
							this.updateDisplay();
						} else {
							this.logMessage(`Cold effect present but missing dc/ability/one-time damage; skipping detailed processing.`);
						}
					} else if ((effect.type || '').toLowerCase() === 'force') {
						// Support force effects with dc, ability, and "one-time damage"
						const dc = effect.dc;
						const ability = effect.ability || 'Dexterity';
						const damageField = effect['one-time damage'] || effect['damage'] || null;
						const forceType = (effect['ongoing damage type'] || 'force').toLowerCase();
						if (dc && ability && damageField) {
							const succeeded = this.rollSavingThrow(target, ability, dc);
						 let forceDice = this.parseDamage(String(damageField));
						 let fdmg = this.rollDamage(forceDice || '1d6');
							// Apply immunity and resistance
							if (this.hasDamageImmunity(target, forceType)) {
								this.logMessage(`${target.name} is immune to ${forceType} damage.`);
								fdmg = 0;
							} else if (this.hasDamageResistance(target, forceType)) {
								const before = fdmg;
								fdmg = Math.floor(fdmg / 2);
								this.logMessage(`${target.name} resists ${forceType} damage (${before} -> ${fdmg}).`);
							}
							if (succeeded) {
								const half = Math.floor(fdmg / 2);
								target.hp -= half;
								this.logMessage(`${target.name} succeeds the ${ability} save vs force (DC ${dc}) and takes ${half} ${forceType} damage.`);
							} else {
								target.hp -= fdmg;
								this.logMessage(`${target.name} fails the ${ability} save vs force (DC ${dc}) and takes ${fdmg} ${forceType} damage.`);
							}
							this.updateDisplay();
						} else {
							this.logMessage(`Force effect present but missing dc/ability/one-time damage; skipping detailed processing.`);
						}
					} else if ((effect.type || '').toLowerCase() === 'lightning') {
						// Support lightning effects with dc, ability, and "one-time damage"
						const dc = effect.dc;
						const ability = effect.ability || 'Dexterity';
						const damageField = effect['one-time damage'] || effect['damage'] || null;
						const lightningType = (effect['ongoing damage type'] || 'lightning').toLowerCase();
						if (dc && ability && damageField) {
							const succeeded = this.rollSavingThrow(target, ability, dc);
							let lightningDice = this.parseDamage(String(damageField));
							let ldmg = this.rollDamage(lightningDice || '1d6');
							// Apply immunity and resistance
							if (this.hasDamageImmunity(target, lightningType)) {
								this.logMessage(`${target.name} is immune to ${lightningType} damage.`);
								ldmg = 0;
							} else if (this.hasDamageResistance(target, lightningType)) {
								const before = ldmg;
								ldmg = Math.floor(ldmg / 2);
								this.logMessage(`${target.name} resists ${lightningType} damage (${before} -> ${ldmg}).`);
							}
							if (succeeded) {
								const half = Math.floor(ldmg / 2);
								target.hp -= half;
								this.logMessage(`${target.name} succeeds the ${ability} save vs lightning (DC ${dc}) and takes ${half} ${lightningType} damage.`);
							} else {
								target.hp -= ldmg;
								this.logMessage(`${target.name} fails the ${ability} save vs lightning (DC ${dc}) and takes ${ldmg} ${lightningType} damage.`);
							}
							this.updateDisplay();
						} else {
							this.logMessage(`Lightning effect present but missing dc/ability/one-time damage; skipping detailed processing.`);
						}
					} else if ((effect.type || '').toLowerCase() === 'necrotic') {
						// Support necrotic effects with dc, ability, and "one-time damage"
						const dc = effect.dc;
						const ability = effect.ability || 'Constitution';
						const damageField = effect['one-time damage'] || effect['damage'] || null;
						const necroticType = (effect['ongoing damage type'] || 'necrotic').toLowerCase();
						if (dc && ability && damageField) {
							const succeeded = this.rollSavingThrow(target, ability, dc);
							let necroticDice = this.parseDamage(String(damageField));
							let ndmg = this.rollDamage(necroticDice || '1d6');
							// Apply immunity and resistance
							if (this.hasDamageImmunity(target, necroticType)) {
								this.logMessage(`${target.name} is immune to ${necroticType} damage.`);
								ndmg = 0;
							} else if (this.hasDamageResistance(target, necroticType)) {
								const before = ndmg;
								ndmg = Math.floor(ndmg / 2);
								this.logMessage(`${target.name} resists ${necroticType} damage (${before} -> ${ndmg}).`);
							}
							if (succeeded) {
								const half = Math.floor(ndmg / 2);
								target.hp -= half;
								this.logMessage(`${target.name} succeeds the ${ability} save vs necrotic (DC ${dc}) and takes ${half} ${necroticType} damage.`);
							} else {
								target.hp -= ndmg;
								this.logMessage(`${target.name} fails the ${ability} save vs necrotic (DC ${dc}) and takes ${ndmg} ${necroticType} damage.`);
							}
							this.updateDisplay();
						} else {
							this.logMessage(`Necrotic effect present but missing dc/ability/one-time damage; skipping detailed processing.`);
						}
					} else if ((effect.type || '').toLowerCase() === 'psychic') {
						// Support psychic effects with dc, ability, and "one-time damage"
						const dc = effect.dc;
						const ability = effect.ability || 'Wisdom';
						const damageField = effect['one-time damage'] || effect['damage'] || null;
						const psychicType = (effect['ongoing damage type'] || 'psychic').toLowerCase();
						if (dc && ability && damageField) {
							const succeeded = this.rollSavingThrow(target, ability, dc);
							let psychicDice = this.parseDamage(String(damageField));
							let pdmg = this.rollDamage(psychicDice || '1d6');
							// Apply immunity and resistance
							if (this.hasDamageImmunity(target, psychicType)) {
								this.logMessage(`${target.name} is immune to ${psychicType} damage.`);
								pdmg = 0;
							} else if (this.hasDamageResistance(target, psychicType)) {
								const before = pdmg;
								pdmg = Math.floor(pdmg / 2);
								this.logMessage(`${target.name} resists ${psychicType} damage (${before} -> ${pdmg}).`);
							}
							if (succeeded) {
								const half = Math.floor(pdmg / 2);
								target.hp -= half;
								this.logMessage(`${target.name} succeeds the ${ability} save vs psychic (DC ${dc}) and takes ${half} ${psychicType} damage.`);
							} else {
								target.hp -= pdmg;
								this.logMessage(`${target.name} fails the ${ability} save vs psychic (DC ${dc}) and takes ${pdmg} ${psychicType} damage.`);
							}
							this.updateDisplay();
						} else {
							this.logMessage(`Psychic effect present but missing dc/ability/one-time damage; skipping detailed processing.`);
						}
					} else if ((effect.type || '').toLowerCase() === 'radiant') {
						// Support radiant effects with dc, ability, and "one-time damage"
						const dc = effect.dc;
						const ability = effect.ability || 'Constitution';
						const damageField = effect['one-time damage'] || effect['damage'] || null;
						const radiantType = (effect['ongoing damage type'] || 'radiant').toLowerCase();
						if (dc && ability && damageField) {
							const succeeded = this.rollSavingThrow(target, ability, dc);
							let radiantDice = this.parseDamage(String(damageField));
							let rdmg = this.rollDamage(radiantDice || '1d6');
							// Apply immunity and resistance
							if (this.hasDamageImmunity(target, radiantType)) {
								this.logMessage(`${target.name} is immune to ${radiantType} damage.`);
								rdmg = 0;
							} else if (this.hasDamageResistance(target, radiantType)) {
								const before = rdmg;
								rdmg = Math.floor(rdmg / 2);
								this.logMessage(`${target.name} resists ${radiantType} damage (${before} -> ${rdmg}).`);
							}
							if (succeeded) {
								const half = Math.floor(rdmg / 2);
								target.hp -= half;
								this.logMessage(`${target.name} succeeds the ${ability} save vs radiant (DC ${dc}) and takes ${half} ${radiantType} damage.`);
							} else {
								target.hp -= rdmg;
								this.logMessage(`${target.name} fails the ${ability} save vs radiant (DC ${dc}) and takes ${rdmg} ${radiantType} damage.`);
							}
							this.updateDisplay();
						} else {
							this.logMessage(`Radiant effect present but missing dc/ability/one-time damage; skipping detailed processing.`);
						}
					} else if ((effect.type || '').toLowerCase() === 'thunder') {
						// Support thunder effects with dc, ability, and "one-time damage"
						const dc = effect.dc;
						const ability = effect.ability || 'Constitution';
						const damageField = effect['one-time damage'] || effect['damage'] || null;
						const thunderType = (effect['ongoing damage type'] || 'thunder').toLowerCase();
						if (dc && ability && damageField) {
							const succeeded = this.rollSavingThrow(target, ability, dc);
							let thunderDice = this.parseDamage(String(damageField));
							let tdmg = this.rollDamage(thunderDice || '1d6');
							// Apply immunity and resistance
							if (this.hasDamageImmunity(target, thunderType)) {
								this.logMessage(`${target.name} is immune to ${thunderType} damage.`);
								tdmg = 0;
							} else if (this.hasDamageResistance(target, thunderType)) {
								const before = tdmg;
								tdmg = Math.floor(tdmg / 2);
								this.logMessage(`${target.name} resists ${thunderType} damage (${before} -> ${tdmg}).`);
							}
							if (succeeded) {
								const half = Math.floor(tdmg / 2);
								target.hp -= half;
								this.logMessage(`${target.name} succeeds the ${ability} save vs thunder (DC ${dc}) and takes ${half} ${thunderType} damage.`);
							} else {
								target.hp -= tdmg;
								this.logMessage(`${target.name} fails the ${ability} save vs thunder (DC ${dc}) and takes ${tdmg} ${thunderType} damage.`);
							}
							this.updateDisplay();
						} else {
							this.logMessage(`Thunder effect present but missing dc/ability/one-time damage; skipping detailed processing.`);
						}
					}
				}
			}

            if (target.hp <= 0) {
                target.isDead = true;
                this.logMessage(`${target.name} drops to 0 HP and is defeated!`);
            }
            this.updateDisplay();
		} else {
			// Get attack name from the attack object or use a default
			const attackName = this.getAttackName(attacker, attack);
			this.logMessage(`${attacker.name} (${attacker.team}) misses ${target.name} (${target.team}) with ${attackName} (roll ${attackRoll}).`);
        }
        
        // Record attack effectiveness for learning (only if attack hit)
        if (attackRoll >= target.ac) {
            const totalDamageDealt = this.calculateTotalDamageDealt(attacker, target, attack);
            const damageType = this.getAttackDamageType(attack);
            this.recordAttackEffectiveness(attacker, target, attack, totalDamageDealt, damageType);
        }
    }

    rollDamage(damageString) {
        const match = damageString.match(/(\d+)d(\d+)([+-]\d+)?/);
        if (!match) return 0;

        const numDice = parseInt(match[1]);
        const dieSize = parseInt(match[2]);
        const modifier = match[3] ? parseInt(match[3]) : 0;

        let total = 0;
        for (let i = 0; i < numDice; i++) {
            total += this.rollDice(dieSize);
        }
        return total + modifier;
    }

    rollDice(sides) {
        return Math.floor(Math.random() * sides) + 1;
    }

    // Helper method to get attack name from attacker and attack object
    getAttackName(attacker, attack) {
        // If attacker has attacks object, find the attack name by matching the attack object
        if (attacker.attacks && typeof attacker.attacks === 'object') {
            for (const [attackName, attackData] of Object.entries(attacker.attacks)) {
                if (attackData === attack) {
                    return attackName;
                }
            }
        }
        
        // Fallback: try to get attack name from attack object properties
        if (attack && attack.name) {
            return attack.name;
        }
        
        // Final fallback
        return 'attack';
    }

    // Helper method to format damage message with resistance information
    formatDamageMessage(attacker, target, damage, damageType, originalDamage = null) {
        let message = `${attacker.name} deals ${damage} ${damageType || 'damage'} to ${target.name}`;
        
        // Add resistance information if applicable
        if (originalDamage && originalDamage > damage && this.hasDamageResistance(target, damageType)) {
            message += ` (resistance: ${originalDamage - damage})`;
        }
        
        message += '.';
        return message;
    }

    // Track ineffective attacks for learning purposes
    recordAttackEffectiveness(attacker, target, attack, damageDealt, damageType) {
        if (!attacker.attackMemory) {
            attacker.attackMemory = {};
        }
        
        const targetId = target.id;
        if (!attacker.attackMemory[targetId]) {
            attacker.attackMemory[targetId] = {};
        }
        
        const attackName = this.getAttackName(attacker, attack);
        const effectiveness = this.calculateAttackEffectiveness(attack);
        
        // Consider attack ineffective if:
        // 1. No damage dealt (0 damage)
        // 2. Very low damage compared to attack effectiveness (less than 25% of expected)
        const isIneffective = damageDealt === 0 || damageDealt < (effectiveness * 0.25);
        
        if (isIneffective) {
            attacker.attackMemory[targetId][attackName] = {
                ineffective: true,
                damageType: damageType,
                lastUsed: Date.now(),
                attempts: (attacker.attackMemory[targetId][attackName]?.attempts || 0) + 1
            };
            
            // Log the learning
            const intScore = parseInt(attacker.originalData?.int || 10);
            const wisScore = parseInt(attacker.originalData?.wis || 10);
            const higherMentalScore = Math.max(intScore, wisScore);
            
            if (higherMentalScore >= 12) {
                this.logMessage(`${attacker.name} remembers that ${attackName} was ineffective against ${target.name}.`);
            }
        } else {
            // Remove from ineffective list if attack was effective
            if (attacker.attackMemory[targetId][attackName]) {
                delete attacker.attackMemory[targetId][attackName];
            }
        }
    }

    // Check if an attack is remembered as ineffective against a specific target
    isAttackRememberedAsIneffective(attacker, target, attack) {
        if (!attacker.attackMemory || !attacker.attackMemory[target.id]) {
            return false;
        }
        
        const attackName = this.getAttackName(attacker, attack);
        const memory = attacker.attackMemory[target.id][attackName];
        
        if (!memory || !memory.ineffective) {
            return false;
        }
        
        // Check if memory is recent (within last 5 rounds)
        const memoryAge = Date.now() - memory.lastUsed;
        const fiveRoundsMs = 5 * 60 * 1000; // 5 minutes in milliseconds
        
        return memoryAge < fiveRoundsMs;
    }

    // Calculate total damage dealt by an attack (for learning purposes)
    calculateTotalDamageDealt(attacker, target, attack) {
        // This is a simplified calculation - in a real implementation, 
        // you'd track the actual damage dealt during the attack
        let totalDamage = 0;
        
        // For regular attacks
        if (attack.hit) {
            totalDamage += this.parseAverageDamage(attack.hit);
        }
        
        // For save-based attacks
        if (attack.save && attack.save.damage) {
            totalDamage += this.parseAverageDamage(attack.save.damage);
        }
        
        // For effects-based attacks
        if (attack.effects && Array.isArray(attack.effects)) {
            for (const effect of attack.effects) {
                if (effect['one-time damage']) {
                    totalDamage += this.parseAverageDamage(effect['one-time damage']);
                }
            }
        }
        
        return totalDamage;
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

    // Spell System (Basic)
    castSpell() {
        const currentCombatant = this.getCurrentCombatant();
        if (!currentCombatant) return;

        // Basic spell implementation - could be expanded
        this.logMessage(`${currentCombatant.name} casts a spell! (Spell system not fully implemented yet)`);
        this.endTurn();
    }

    dodgeAction() {
        const currentCombatant = this.getCurrentCombatant();
        if (!currentCombatant) return;

        currentCombatant.conditions.push('Dodging');
        this.logMessage(`${currentCombatant.name} takes the Dodge action.`);
        this.endTurn();
    }

    // Simulate the entire battle until one team is out of monsters
    simulateBattle() {
        if (!this.combatActive || this.initiativeOrder.length === 0) {
            this.logMessage('Combat must be started and initiative rolled before simulation.');
            return;
        }
        this.logMessage('Battle simulation started!', 'attack');
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
                this.logMessage(`Battle ended! Winning team: ${teams[0] || 'None'}`, 'critical');
                clearInterval(interval);
                this.combatActive = false;
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
            // Find valid targets
            const targets = this.initiativeOrder.filter(c => 
                c.id !== currentCombatant.id && !c.isDead && c.team !== currentCombatant.team
            );
            if (targets.length === 0) {
                this.logMessage(`${currentCombatant.name} (${currentCombatant.team}) has no valid targets.`);
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

    // Select an attack for simulation, prioritizing attacks with special effects
    selectAttackForSimulation(combatant, target = null) {
        if (!combatant.attacks || typeof combatant.attacks !== 'object') {
            return null; // Will use fallback in performAttack
        }
        
        const attacks = Object.values(combatant.attacks);
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

    // Utility Methods
    getCurrentCombatant() {
        if (!this.combatActive || this.initiativeOrder.length === 0) return null;
        return this.initiativeOrder[this.currentTurnIndex];
    }

    closeModals() {
        $('.modal').hide();
    }

    logMessage(message, type = 'normal') {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = $(`<div class="log-entry ${type}">[${timestamp}] ${message}</div>`);
        // Prepend so latest is at the top
        $('#combatLog').prepend(logEntry);
        // No need to scroll, newest is visible
    }

    // Display Updates
    updateDisplay() {
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
                    <span class="combatant-name">${combatant.name}</span>
                    <span class="combatant-team"> (${combatant.team})</span>
                    <button class="add-multiple-btn" style="margin-left:10px;">Add More</button>
                    <button class="remove-monster-btn" style="margin-left:5px; color:#fff; background:#e74c3c; border:none; padding:2px 8px; border-radius:3px;">Remove</button>
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

        list.forEach((combatant, index) => {
            const isCurrentTurn = this.combatActive && index === this.currentTurnIndex;
            const teamClass = combatant.team.toLowerCase().replace(' ', '-');
            const initiativeItem = $(`
                <div class="initiative-item ${isCurrentTurn ? 'current-turn' : ''} ${combatant.isDead ? 'dead' : ''} ${teamClass}">
                    <div class="name">${combatant.name} <span class="team-indicator ${teamClass}">${combatant.team}</span></div>
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
            // Get team information
            const teamInfo = this.getTeamInfo();
            
            // Copy to clipboard
            navigator.clipboard.writeText(teamInfo).then(() => {
                this.logMessage('Team information copied to clipboard!');
            }).catch(err => {
                // Fallback for older browsers
                this.fallbackCopyToClipboard(teamInfo);
            });
        } catch (err) {
            this.logMessage('Failed to copy team information to clipboard.');
            console.error('Copy error:', err);
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
    // Add Simulate Battle button to controls
    if ($('#simulateBattleBtn').length === 0) {
        $('<button id="simulateBattleBtn" class="btn btn-action" style="margin-left:10px;" disabled>Simulate Battle</button>')
            .insertAfter('#attackBtn');
    }
    combatSim = new CombatSimulator();
    
    // If external monsters didn't load, use fallback data
    if (typeof monsters === 'undefined') {
        window.monsters = FALLBACK_MONSTERS;
        console.log('Using fallback monster data');
    }
    
    // Set default team filter
    $('#switchAll').addClass('active');
});