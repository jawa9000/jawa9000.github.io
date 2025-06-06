// 5e Army Combat Simulator - Core Structure
// This is a starter file. Core logic and UI rendering will be added in future steps.

// $(function() {
//     // --- Scenario Setup ---
//     // Placeholder: Render army editors and terrain editor
//     $('#army1-editor').html('<em>Army 1 setup coming soon...</em>');
//     $('#army2-editor').html('<em>Army 2 setup coming soon...</em>');
//     $('#terrain-editor').html('<em>Terrain setup coming soon...</em>');

//     // --- Simulation Controls ---
//     $('#start-sim-btn').on('click', function() {
//         $('#scenario-setup').hide();
//         $('#battlefield-section').show();
//         $('#battle-log-section').show();
//         $('#stats-section').hide();
//         $('#pause-sim-btn').show();
//         $('#end-sim-btn').show();
//         // TODO: Start simulation logic
//         $('#battle-log').append('<div>Simulation started...</div>');
//     });
//     $('#pause-sim-btn').on('click', function() {
//         // TODO: Pause simulation logic
//         $('#battle-log').append('<div>Simulation paused.</div>');
//     });
//     $('#end-sim-btn').on('click', function() {
//         // TODO: End simulation logic and show stats
//         $('#battlefield-section').hide();
//         $('#battle-log-section').show();
//         $('#stats-section').show();
//         $('#battle-log').append('<div>Simulation ended.</div>');
//         $('#battle-stats').html('<em>Post-battle statistics coming soon...</em>');
//     });
// });

// --- Core Simulation Logic ---

// 5e Stat Block Example (minimal for demo, expand as needed)
function createUnit(options) {
    return {
        id: options.id,
        name: options.name,
        hp: options.hp,
        maxHp: options.hp,
        ac: options.ac,
        stats: options.stats, // { str, dex, con, int, wis, cha }
        attacks: options.attacks, // [{name, bonus, damage, type}]
        abilities: options.abilities || [], // e.g. ['Darkvision', 'Pack Tactics']
        conditions: [], // e.g. ['prone', 'restrained']
        morale: options.morale || 10, // for morale checks
        formation: options.formation || 'line',
        position: options.position || { x: 0, y: 0 },
        alive: true,
        isCommander: !!options.isCommander,
        team: options.team,
        // Add more as needed
    };
}

// Mob Rules Scaling (DMG):
function mobAttackRoll(numAttackers, attackBonus, targetAC) {
    // Returns number of hits using mob rules (DMG p.250)
    let hits = 0;
    for (let i = 0; i < numAttackers; i++) {
        const roll = Math.floor(Math.random() * 20) + 1 + attackBonus;
        if (roll >= targetAC) hits++;
    }
    return hits;
}

// Initiative: single order for all units
function rollInitiative(units) {
    // Each unit gets an initiative, then sort
    units.forEach(u => {
        u.initiative = Math.floor(Math.random() * 20) + 1 + (u.stats.dex || 0);
    });
    units.sort((a, b) => b.initiative - a.initiative);
    return units;
}

// AoE: affects multiple units
function applyAoE(units, saveDC, saveType, damage, damageType) {
    units.forEach(u => {
        if (!u.alive) return;
        const save = Math.floor(Math.random() * 20) + 1 + (u.stats[saveType] || 0);
        if (save >= saveDC) {
            u.hp -= Math.floor(damage / 2); // half on save
        } else {
            u.hp -= damage;
        }
        if (u.hp <= 0) u.alive = false;
    });
}

// Conditions
function applyCondition(unit, condition) {
    if (!unit.conditions.includes(condition)) {
        unit.conditions.push(condition);
    }
}
function removeCondition(unit, condition) {
    unit.conditions = unit.conditions.filter(c => c !== condition);
}

// Morale Check (simple DC 10 Wis save, see prompt for modifiers)
function moraleCheck(unit, alliesNearby, alliesRouted, enemyCommanderNearby, friendlyCommanderNearby) {
    let dc = 10;
    let mod = 0;
    mod += 2 * alliesNearby;
    mod -= 2 * alliesRouted;
    if (enemyCommanderNearby) mod -= 5;
    if (friendlyCommanderNearby) mod += 2;
    if (unit.hp < unit.maxHp * 0.5) mod -= 2;
    if (unit.hp < unit.maxHp * 0.25) mod -= 5;
    const roll = Math.floor(Math.random() * 20) + 1 + (unit.stats.wis || 0) + mod;
    if (roll < dc) {
        if (roll >= dc - 4) {
            applyCondition(unit, 'shaken');
        } else {
            applyCondition(unit, 'broken');
        }
        return false;
    } else {
        removeCondition(unit, 'shaken');
        removeCondition(unit, 'broken');
        return true;
    }
}

// Movement & Positioning (abstract grid)
function moveUnit(unit, dx, dy) {
    unit.position.x += dx;
    unit.position.y += dy;
}

// Formations (affect stats, e.g. AC, attack, movement)
function setFormation(unit, formation) {
    unit.formation = formation;
    // Example: adjust stats based on formation
    if (formation === 'shield_wall') {
        unit.ac += 2;
        unit.movement = Math.max(0, (unit.movement || 30) - 10);
    } else if (formation === 'line') {
        unit.ac = unit.baseAc;
        unit.movement = unit.baseMovement;
    }
    // Add more formation logic as needed
}

// Damage & Healing
function applyDamage(unit, dmg) {
    unit.hp -= dmg;
    if (unit.hp <= 0) {
        unit.alive = false;
        unit.hp = 0;
    }
}
function healUnit(unit, amt) {
    unit.hp = Math.min(unit.maxHp, unit.hp + amt);
    if (unit.hp > 0) unit.alive = true;
}

// Casualties: represent units being reduced in size (for mobs)
function reduceUnitSize(unit, numLost) {
    unit.mobSize = Math.max(0, (unit.mobSize || 1) - numLost);
    if (unit.mobSize === 0) unit.alive = false;
}

// --- Turn Automation ---
let simulationInterval = null;
let simulationPaused = false;
let allUnits = [];
let currentTurn = 0;

function startSimulation() {
    simulationPaused = false;
    $('#battle-log').append('<div>Simulation started.</div>');
    simulationInterval = setInterval(runTurn, 500); // 500ms per turn
}
function pauseSimulation() {
    simulationPaused = true;
    clearInterval(simulationInterval);
    $('#battle-log').append('<div>Simulation paused.</div>');
}
function endSimulation() {
    simulationPaused = true;
    clearInterval(simulationInterval);
    $('#battle-log').append('<div>Simulation ended.</div>');
}

function runTurn() {
    if (simulationPaused) return;
    if (currentTurn >= allUnits.length) currentTurn = 0;
    let unit = allUnits[currentTurn];
    if (unit && unit.alive) {
        // Example: attack random enemy
        let enemies = allUnits.filter(u => u.team !== unit.team && u.alive);
        if (enemies.length) {
            let target = enemies[Math.floor(Math.random() * enemies.length)];
            let attack = unit.attacks && unit.attacks[0];
            if (!attack) {
                $('#battle-log').append(`<div>${unit.name} has no valid attacks and skips turn.</div>`);
            } else {
                let roll = Math.floor(Math.random() * 20) + 1 + attack.bonus;
                let hit = roll >= target.ac;
                let dmg = hit ? (typeof attack.damage === 'function' ? attack.damage() : attack.damage) : 0;
                if (hit) applyDamage(target, dmg);
                $('#battle-log').append(`<div>${unit.name} attacks ${target.name}: ${hit ? 'Hit' : 'Miss'} (${roll} vs AC ${target.ac})${hit ? ', ' + dmg + ' dmg' : ''}</div>`);
            }
        }
        // Morale check example
        moraleCheck(unit, 1, 0, false, false);
    }
    currentTurn++;
    // End simulation if only one team remains
    let teamsAlive = [...new Set(allUnits.filter(u => u.alive).map(u => u.team))];
    if (teamsAlive.length <= 1) {
        endSimulation();
    }
}

// --- Monster Catalog Import ---
// Assumes monster_catalog.js defines a global variable: monsterCatalog (object with monster names as keys)
// Example: monsterCatalog['Orc']

function createUnitFromCatalog(name, team, id, position) {
    // Try to find the monster by name in the monsters array
    let m = null;
    if (Array.isArray(window.monsters) && window.monsters.length > 0) {
        m = window.monsters.find(mon => mon.name === name);
    }
    if (!m && window.monsterCatalog && window.monsterCatalog[name]) {
        m = window.monsterCatalog[name];
    }
    if (!m) throw new Error('Monster not found: ' + name);
    // Convert monster stat block to unit format
    return {
        id: id,
        name: m.name,
        hp: m.hp || m.hit_points || 10,
        maxHp: m.hp || m.hit_points || 10,
        ac: m.ac || m.armor_class || 10,
        stats: {
            str: m.str || 0,
            dex: m.dex || 0,
            con: m.con || 0,
            int: m.int || 0,
            wis: m.wis || 0,
            cha: m.cha || 0
        },
        attacks: (m.actions || []).filter(a => a.attack_bonus !== undefined).map(a => ({
            name: a.name,
            bonus: a.attack_bonus,
            damage: function() {
                if (a.damage_dice) {
                    const match = a.damage_dice.match(/(\d+)d(\d+)([+\-]\d+)?/);
                    if (match) {
                        let [_, num, die, mod] = match;
                        let total = 0;
                        for (let i = 0; i < parseInt(num); i++) {
                            total += Math.floor(Math.random() * parseInt(die)) + 1;
                        }
                        if (mod) total += parseInt(mod);
                        return total;
                    }
                }
                return a.damage_bonus || 0;
            },
            type: a.damage_type || 'bludgeoning'
        })),
        abilities: m.special_abilities ? m.special_abilities.map(sa => sa.name) : [],
        conditions: [],
        morale: 10,
        formation: 'line',
        position: position || { x: 0, y: 0 },
        alive: true,
        isCommander: false,
        team: team,
        // Add more as needed
    };
}

// --- UI Hookup ---
$(function() {
    // --- Simulation Controls ---
    $(document).off('click', '#start-sim-btn').on('click', '#start-sim-btn', function(e) {
        e.preventDefault();
        // Check that both armies have at least one officer with a valid monster name
        const army1Valid = army1Officers.some(off => off.monster && getMonsterByKey(off.monster));
        const army2Valid = army2Officers.some(off => off.monster && getMonsterByKey(off.monster));
        if (!army1Valid || !army2Valid) {
            alert('Both armies must have at least one valid monster before starting the battle.');
            return;
        }
        $('#scenario-setup').hide();
        $('#battlefield-section').show();
        $('#battle-log-section').show();
        $('#stats-section').hide();
        $('#pause-sim-btn').show();
        $('#end-sim-btn').show();
        allUnits = [];
        let id = 1;
        army1Officers.forEach(off => {
            allUnits.push(Object.assign(
                createUnitFromCatalogByKey(off.monster, 'A', id++, {x:0, y:0}),
                { isCommander: true, rank: off.rank }
            ));
        });
        army2Officers.forEach(off => {
            allUnits.push(Object.assign(
                createUnitFromCatalogByKey(off.monster, 'B', id++, {x:1, y:0}),
                { isCommander: true, rank: off.rank }
            ));
        });
        // Add demo units as before (use first 4 monster names if available)
        const monsterList = getMonsterNames();
        if (monsterList.length >= 4) {
            allUnits.push(createUnitFromCatalogByKey(monsterList[0], 'A', id++, {x:0, y:0}));
            allUnits.push(createUnitFromCatalogByKey(monsterList[1], 'A', id++, {x:1, y:0}));
            allUnits.push(createUnitFromCatalogByKey(monsterList[2], 'B', id++, {x:0, y:1}));
            allUnits.push(createUnitFromCatalogByKey(monsterList[3], 'B', id++, {x:1, y:1}));
        }
        rollInitiative(allUnits);
        currentTurn = 0;
        startSimulation();
        $('#pause-sim-btn').show();
        $('#end-sim-btn').show();
    });
    $('#pause-sim-btn').off('click').on('click', pauseSimulation);
    $('#end-sim-btn').off('click').on('click', endSimulation);
});

// --- Officer Management ---
const officerRanks = [
    'General', 'Captain', 'Lieutenant', 'Sergeant', 'Standard Bearer', 'War Medic/Healer', 'Soldier' 
];
let army1Officers = [];
let army2Officers = [];

function getMonsterNames() {
    // monsters.js defines 'const monsters = [...]' (array of monster objects)
    // We want to use the monster's name property for the dropdown
    if (Array.isArray(window.monsters) && window.monsters.length > 0) {
        return window.monsters.map(m => m.name).filter(Boolean).sort();
    }
    // fallback: try monsterCatalog if present
    if (window.monsterCatalog && Object.keys(window.monsterCatalog).length > 0) {
        return Object.keys(window.monsterCatalog).sort();
    }
    return [];
}

function getMonsterByKey(key) {
    // Normalize key for name-based lookup
    if (typeof key === 'string') {
        const normKey = key.trim().toLowerCase();
        // Search monsters array by name (case-insensitive)
        if (window.monsters && Array.isArray(window.monsters) && window.monsters.length > 0) {
            const found = window.monsters.find(m => m && m.name && m.name.trim().toLowerCase() === normKey);
            if (found) return found;
        }
        // Search monsterCatalog by name (case-insensitive)
        if (window.monsterCatalog && typeof window.monsterCatalog === 'object') {
            for (const k in window.monsterCatalog) {
                if (k.trim().toLowerCase() === normKey) {
                    return window.monsterCatalog[k];
                }
                // Some catalogs use .name property
                const m = window.monsterCatalog[k];
                if (m && m.name && m.name.trim().toLowerCase() === normKey) {
                    return m;
                }
            }
        }
    }
    // Fallback: if key is a number, treat as index
    if (!isNaN(key) && window.monsters && Array.isArray(window.monsters)) {
        return window.monsters[Number(key)];
    }
    return null;
}

function renderOfficerEditor(armyNum) {
    const container = $(armyNum === 1 ? '#army1-editor' : '#army2-editor');
    const officers = armyNum === 1 ? army1Officers : army2Officers;
    const monsterNames = getMonsterNames();
    let html = '<div class="officer-list">';
    officers.forEach((off, idx) => {
        html += `<div class="officer-entry" data-idx="${idx}">
            <select class="officer-rank">${officerRanks.map(r => `<option value="${r}"${off.rank===r?' selected':''}>${r}</option>`).join('')}</select>
            <input type="text" class="officer-monster" list="monster-list-${armyNum}-${idx}" value="${off.monster || ''}" placeholder="Type monster name..." autocomplete="off" />
            <datalist id="monster-list-${armyNum}-${idx}">
                ${monsterNames.map(m => `<option value="${m}"></option>`).join('')}
            </datalist>
            <input type="number" class="officer-count" min="1" value="${off.count || 1}" style="width:60px;" title="Count" />
            <button type="button" class="remove-officer">Remove</button>
        </div>`;
    });
    html += '</div>';
    html += '<button type="button" class="add-officer">Add Unit</button>';
    container.html(html);
}

function renderArmyUnitsList(armyNum) {
    const officers = armyNum === 1 ? army1Officers : army2Officers;
    const container = $(armyNum === 1 ? '#army1-units' : '#army2-units');
    if (!officers.length) {
        container.html('<em>No units added.</em>');
        return;
    }
    let html = '<ol class="army-units-list">';
    officers.forEach((off, idx) => {
        if (off.monster && off.count) {
            html += `<li>${off.rank ? `<strong>${off.rank}:</strong> ` : ''}${off.monster} &times; ${off.count}</li>`;
        }
    });
    html += '</ol>';
    container.html(html);
}

function setupOfficerEditorEvents(armyNum) {
    const container = $(armyNum === 1 ? '#army1-editor' : '#army2-editor');
    container.off();
    container.on('click', '.add-officer', function() {
        const officers = armyNum === 1 ? army1Officers : army2Officers;
        officers.push({ rank: officerRanks[0], monster: '', count: 1 });
        renderOfficerEditor(armyNum);
        setupOfficerEditorEvents(armyNum);
        renderArmyUnitsList(armyNum);
    });
    container.on('click', '.remove-officer', function() {
        const idx = $(this).closest('.officer-entry').data('idx');
        const officers = armyNum === 1 ? army1Officers : army2Officers;
        officers.splice(idx, 1);
        renderOfficerEditor(armyNum);
        setupOfficerEditorEvents(armyNum);
        renderArmyUnitsList(armyNum);
    });
    container.on('change', '.officer-rank', function() {
        const idx = $(this).closest('.officer-entry').data('idx');
        const officers = armyNum === 1 ? army1Officers : army2Officers;
        officers[idx].rank = $(this).val();
    });
    container.on('input', '.officer-monster', function() {
        const idx = $(this).closest('.officer-entry').data('idx');
        const officers = armyNum === 1 ? army1Officers : army2Officers;
        officers[idx].monster = $(this).val();
        renderArmyUnitsList(armyNum);
    });
    container.on('input', '.officer-count', function() {
        const idx = $(this).closest('.officer-entry').data('idx');
        const officers = armyNum === 1 ? army1Officers : army2Officers;
        let val = parseInt($(this).val(), 10);
        officers[idx].count = isNaN(val) || val < 1 ? 1 : val;
        renderArmyUnitsList(armyNum);
    });
}

// Initial render for both armies
renderArmyUnitsList(1);
renderArmyUnitsList(2);

function createUnitFromCatalogByKey(keyOrName, team, id, position) {
    const m = getMonsterByKey(keyOrName);
    if (!m) {
        console.error('Monster not found for key:', keyOrName, 'Available:', window.monsters ? window.monsters.map(mon => mon.name) : []);
        throw new Error('Monster not found for key: ' + keyOrName);
    }
    // Defensive: ensure m.actions is always an array
    let actionsArr = [];
    if (Array.isArray(m.actions)) {
        actionsArr = m.actions;
    } else if (typeof m.actions === 'string') {
        // Some monster data may have actions as a string (block of HTML/text)
        actionsArr = [];
    } else if (m.actions && typeof m.actions === 'object') {
        // Rare case: single action object
        actionsArr = [m.actions];
    }
    return {
        id: id,
        name: m.name,
        hp: m.hp || m.hit_points || 10,
        maxHp: m.hp || m.hit_points || 10,
        ac: m.ac || m.armor_class || 10,
        stats: {
            str: m.str || 0,
            dex: m.dex || 0,
            con: m.con || 0,
            int: m.int || 0,
            wis: m.wis || 0,
            cha: m.cha || 0
        },
        attacks: actionsArr.filter(a => a && typeof a === 'object' && a.attack_bonus !== undefined).map(a => ({
            name: a.name,
            bonus: a.attack_bonus,
            damage: function() {
                if (a.damage_dice) {
                    const match = a.damage_dice.match(/(\d+)d(\d+)([+\-]\d+)?/);
                    if (match) {
                        let [_, num, die, mod] = match;
                        let total = 0;
                        for (let i = 0; i < parseInt(num); i++) {
                            total += Math.floor(Math.random() * parseInt(die)) + 1;
                        }
                        if (mod) total += parseInt(mod);
                        return total;
                    }
                }
                return a.damage_bonus || 0;
            },
            type: a.damage_type || 'bludgeoning'
        })),
        abilities: m.special_abilities ? m.special_abilities.map(sa => sa.name) : [],
        conditions: [],
        morale: 10,
        formation: 'line',
        position: position || { x: 0, y: 0 },
        alive: true,
        isCommander: false,
        team: team,
    };
}

// --- Officer Management UI ---
$(function() {
    renderOfficerEditor(1);
    renderOfficerEditor(2);
    setupOfficerEditorEvents(1);
    setupOfficerEditorEvents(2);
    $('#start-sim-btn').off('click').on('click', function() {
        allUnits = [];
        let id = 1;
        army1Officers.forEach(off => {
            allUnits.push(Object.assign(
                createUnitFromCatalogByKey(off.monster, 'A', id++, {x:0, y:0}),
                { isCommander: true, rank: off.rank }
            ));
        });
        army2Officers.forEach(off => {
            allUnits.push(Object.assign(
                createUnitFromCatalogByKey(off.monster, 'B', id++, {x:1, y:0}),
                { isCommander: true, rank: off.rank }
            ));
        });
        // Add demo units as before (use first 4 monster names if available)
        const monsterList = getMonsterNames();
        if (monsterList.length >= 4) {
            allUnits.push(createUnitFromCatalogByKey(monsterList[0], 'A', id++, {x:0, y:0}));
            allUnits.push(createUnitFromCatalogByKey(monsterList[1], 'A', id++, {x:1, y:0}));
            allUnits.push(createUnitFromCatalogByKey(monsterList[2], 'B', id++, {x:0, y:1}));
            allUnits.push(createUnitFromCatalogByKey(monsterList[3], 'B', id++, {x:1, y:1}));
        }
        rollInitiative(allUnits);
        currentTurn = 0;
        startSimulation();
        $('#pause-sim-btn').show();
        $('#end-sim-btn').show();
    });
});

