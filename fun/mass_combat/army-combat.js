// army-combat.js
// Core combat simulation logic for 5e Army Combat Simulator
// This file is intended to be loaded after scenario setup and unit selection.
// Relies on global allUnits, currentTurn, and utility functions from army-sim.js

// --- Initiative and Turn Order ---
function rollInitiative(units) {
    units.forEach(u => {
        u.initiative = Math.floor(Math.random() * 20) + 1 + (u.stats.dex || 0);
    });
    units.sort((a, b) => b.initiative - a.initiative);
    return units;
}

// --- Morale System (Simple, see guide.md for expansion) ---
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

// --- Main Combat Turn Logic ---
function runCombatTurn() {
    if (window.simulationPaused) return;
    if (window.currentTurn >= window.allUnits.length) window.currentTurn = 0;
    let unit = window.allUnits[window.currentTurn];
    if (unit && unit.alive) {
        // Morale check
        let alliesNearby = window.allUnits.filter(u => u.team === unit.team && u !== unit && u.alive).length;
        let alliesRouted = window.allUnits.filter(u => u.team === unit.team && !u.alive).length;
        let enemyCommanderNearby = window.allUnits.some(u => u.team !== unit.team && u.isCommander && u.alive);
        let friendlyCommanderNearby = window.allUnits.some(u => u.team === unit.team && u.isCommander && u.alive);
        let moraleOk = moraleCheck(unit, alliesNearby, alliesRouted, enemyCommanderNearby, friendlyCommanderNearby);
        if (!moraleOk && unit.conditions.includes('broken')) {
            $('#battle-log').append(`<div><b>${unit.name}</b> (${unit.team}) is broken and does not act.</div>`);
            window.currentTurn++;
            return;
        }
        // Target selection (closest or random for now)
        let enemies = window.allUnits.filter(u => u.team !== unit.team && u.alive);
        if (enemies.length) {
            let target = enemies[Math.floor(Math.random() * enemies.length)];
            let attack = unit.attacks[0];
            if (attack) {
                let roll = Math.floor(Math.random() * 20) + 1 + attack.bonus;
                let hit = roll >= target.ac;
                let dmg = hit ? (typeof attack.damage === 'function' ? attack.damage() : attack.damage) : 0;
                if (hit) applyDamage(target, dmg);
                $('#battle-log').append(`<div><b>${unit.name}</b> (${unit.team}) attacks <b>${target.name}</b> (${target.team}): ${hit ? 'Hit' : 'Miss'} (${roll} vs AC ${target.ac})${hit ? ', ' + dmg + ' dmg' : ''}</div>`);
            } else {
                $('#battle-log').append(`<div><b>${unit.name}</b> (${unit.team}) has no attacks and does nothing.</div>`);
            }
        } else {
            $('#battle-log').append(`<div><b>${unit.name}</b> (${unit.team}) has no enemies left to attack.</div>`);
        }
        // (Future: AoE, abilities, movement, formations, advanced morale, etc.)
    }
    window.currentTurn++;
    // End simulation if only one team remains
    let teamsAlive = [...new Set(window.allUnits.filter(u => u.alive).map(u => u.team))];
    if (teamsAlive.length <= 1) {
        endSimulation();
    }
}

// --- Export for use in army-sim.js ---
window.rollInitiative = rollInitiative;
window.runCombatTurn = runCombatTurn;
window.moraleCheck = moraleCheck;
// ...add more exports as needed for future features...

function getMonsterByKey(key) {
    // Try to find the monster by name in the monsters array, case-insensitive and trimmed
    if (Array.isArray(window.monsters) && window.monsters.length > 0) {
        return window.monsters.find(m => m.name && m.name.trim().toLowerCase() === key.trim().toLowerCase());
    }
    // fallback: try monsterCatalog
    if (window.monsterCatalog && window.monsterCatalog[key]) {
        return window.monsterCatalog[key];
    }
    return null;
}
