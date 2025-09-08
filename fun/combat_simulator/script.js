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
        $('#monsterTeam').change(() => {
            this.selectedMonsterTeam = $('#monsterTeam').val();
            this.updateMonsterModalHeader();
            console.log('Monster team changed to:', this.selectedMonsterTeam); // Debug log
        });
        
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

        // Use current team filter if it's a specific team, otherwise default to Team A
        const defaultTeam = (this.currentTeamFilter !== 'All Teams') ? this.currentTeamFilter : 'Team A';
        $('#monsterTeam').val(defaultTeam);
        this.selectedMonsterTeam = defaultTeam;
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
        const header = $(`<h2>Select Monster <span class="team-indicator ${teamClass}">${this.selectedMonsterTeam}</span></h2>`);
        $('#monsterModal .modal-content h2').replaceWith(header);
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
            isDead: false,
            originalData: monsterData // Keep reference to original data
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
            originalData: null
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
        $('#monsterTeam').val('Team A');
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
            currentCombatant.attacksRemaining = currentCombatant.numberOfAttacks || 1;
            this.logMessage(`${currentCombatant.name} starts their turn with ${currentCombatant.attacksRemaining} attack${currentCombatant.attacksRemaining !== 1 ? 's' : ''} remaining.`);
        }
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
        this.performAttack(currentCombatant, targets[0]);
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

        const rawRoll = this.rollDice(20);
        const attackBonus = attack["to hit"] ? parseInt(attack["to hit"]) : 0;
        const attackRoll = rawRoll + attackBonus;
        let isCritical = false;
        let damage = this.rollDamage(attack.hit);

        // Check for critical hit (natural 20 on the d20)
        if (rawRoll === 20) {
            isCritical = true;
            damage *= 2;
            this.logMessage(`CRITICAL HIT! ${attacker.name} rolls a natural 20 against ${target.name} and deals ${damage} damage!`);
        } else {
            this.logMessage(`${attacker.name} attacks ${target.name} with ${attackRoll >= target.ac ? "a hit" : "a miss"} (roll: ${attackRoll}).`);
            if (attackRoll >= target.ac) {
                this.logMessage(`${attacker.name} deals ${damage} damage to ${target.name}.`);
            }
        }

        // Apply damage if hit
        if (attackRoll >= target.ac) {
            target.hp -= damage;
            if (target.hp <= 0) {
                target.isDead = true;
                this.logMessage(`${target.name} drops to 0 HP and is defeated!`);
            }
            this.updateDisplay();
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
                this.endTurn();
                return;
            }
            // Find valid targets
            const targets = this.initiativeOrder.filter(c => 
                c.id !== currentCombatant.id && !c.isDead && c.team !== currentCombatant.team
            );
            if (targets.length === 0) {
                this.endTurn();
                return;
            }
            // Attack first valid target
            this.performAttack(currentCombatant, targets[0]);
        }, 1200); // 1.2 seconds per turn for readability
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
        const currentCombatant = this.getCurrentCombatant();
        const hasActiveCombatant = currentCombatant !== null;
        const hasValidTargets = this.initiativeOrder.filter(c => !c.isDead).length > 1;
        const hasAttacksRemaining = currentCombatant ? currentCombatant.attacksRemaining > 0 : false;
        
        $('#attackBtn').prop('disabled', !hasActiveCombatant || !hasValidTargets || !hasAttacksRemaining);
        $('#castSpellBtn').prop('disabled', !hasActiveCombatant);
        $('#dodgeBtn').prop('disabled', !hasActiveCombatant);
        $('#endTurnBtn').prop('disabled', !hasActiveCombatant);
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