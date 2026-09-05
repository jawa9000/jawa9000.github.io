// Bridges the rules engine (engine/rules.js) to the versioned-sheet persistence model.
//
// A version's sheetData has two parts with different lifecycles:
//   derived - the engine's output at the moment this version was created. Static capability
//             (max HP, AC, spell slots, saves). Not touched again until the NEXT level-up.
//   play    - session state: current HP, resources spent, gear, notes. This is what the
//             auto-save loop and rest actions mutate, in place, on the CURRENT version only.
//
// Pure functions, no I/O — easy to test without a database.

import { XP_THRESHOLDS } from '../engine/experience.js';

/**
 * @param {Array} [startingGear] gear picked during character creation — see sanitizeGear
 *   for the {name, qty, weight} shape. Defaults to empty for level-ups and imports that
 *   don't supply one.
 * @param {string} [startingNotes] notes typed during character creation. Defaults to
 *   empty for level-ups and imports that don't supply one.
 */
export function initialPlayState(derived, startingGear, startingNotes) {
    return {
        currentHp: derived.hitPoints,
        tempHp: 0,
        hitDiceUsed: 0,
        spellSlotsUsed: derived.spellSlots.map(() => 0),
        pactSlotsUsed: 0,
        inspiration: false,
        exhaustion: 0,
        conditions: [],
        deathSaves: { successes: 0, failures: 0 },
        gear: sanitizeGear(startingGear),
        notes: typeof startingNotes === 'string' ? startingNotes : '',
        // A character created straight at, say, level 5 starts with that level's minimum
        // XP rather than 0 — otherwise the XP tracker would claim they're still level 1.
        xp: XP_THRESHOLDS[derived.totalLevel - 1] ?? 0
    };
}

/** Normalize a gear list to {name, qty, weight} entries with sane defaults. Blank rows
 *  (no name typed yet) are kept as-is rather than dropped, since the player is often
 *  still filling the row in when this runs on every auto-save keystroke. */
export function sanitizeGear(gear) {
    if (!Array.isArray(gear)) return [];
    return gear.map((item) => ({
        name: typeof item?.name === 'string' ? item.name : '',
        qty: Math.max(0, Number(item?.qty) || 0),
        weight: Math.max(0, Number(item?.weight) || 0)
    }));
}

export function buildSheetData(derived, play) {
    return { derived, play };
}

/**
 * Carry play state forward across a level-up. Gear, notes, inspiration, conditions, and
 * exhaustion persist as-is. HP increases by the max-HP delta rather than resetting to full,
 * so mid-level damage isn't erased by leveling. Resources reset to full — leveling up is
 * assumed to follow a long rest, per the standard 5e rule that XP/level advancement happens
 * between sessions. XP itself is raised to the new level's minimum threshold if it isn't
 * there already (e.g. a manual level-up with no XP tracked), but never lowered.
 */
export function carryForwardPlayState(oldPlay, oldDerived, newDerived) {
    const hpGain = Math.max(0, newDerived.hitPoints - oldDerived.hitPoints);
    // A level-up never lowers XP, but if the character is now sitting above a level its own
    // XP wouldn't justify (added manually, or via a big multiclass jump), it's bumped up to
    // that level's minimum — the XP tracker should never claim a lower level than the sheet.
    const minXp = XP_THRESHOLDS[newDerived.totalLevel - 1] ?? 0;
    return {
        ...oldPlay,
        currentHp: Math.min(newDerived.hitPoints, Math.max(0, oldPlay.currentHp) + hpGain),
        tempHp: oldPlay.tempHp,
        hitDiceUsed: 0,
        spellSlotsUsed: newDerived.spellSlots.map(() => 0),
        pactSlotsUsed: 0,
        deathSaves: { successes: 0, failures: 0 },
        xp: Math.max(oldPlay.xp || 0, minXp)
    };
}

/** Short rest: Warlocks regain pact slots. Everything else in 5e requires spending hit dice,
 *  which is a player choice made through the hit-dice endpoint, not automatic. */
export function applyShortRest(sheetData) {
    return { ...sheetData, play: { ...sheetData.play, pactSlotsUsed: 0 } };
}

/** Long rest: full HP, full spell slots, half your hit dice back (min 1), one exhaustion
 *  level removed, death saves cleared. */
export function applyLongRest(sheetData) {
    const { derived, play } = sheetData;
    const hitDiceMax = derived.totalLevel || 0;
    const hitDiceRecovered = Math.max(1, Math.floor(hitDiceMax / 2));

    return {
        derived,
        play: {
            ...play,
            currentHp: derived.hitPoints,
            tempHp: 0,
            spellSlotsUsed: derived.spellSlots.map(() => 0),
            pactSlotsUsed: 0,
            hitDiceUsed: Math.max(0, play.hitDiceUsed - hitDiceRecovered),
            exhaustion: Math.max(0, play.exhaustion - 1),
            deathSaves: { successes: 0, failures: 0 }
        }
    };
}

/** Clamp values a client PATCH might set out of range (negative HP, more slots spent than exist). */
export function sanitizePlayState(play, derived) {
    const maxSlots = derived.spellSlots;
    return {
        ...play,
        currentHp: clamp(play.currentHp, 0, derived.hitPoints + (play.tempHp || 0)),
        tempHp: Math.max(0, play.tempHp || 0),
        hitDiceUsed: clamp(play.hitDiceUsed, 0, derived.totalLevel || 0),
        exhaustion: clamp(play.exhaustion, 0, 6),
        spellSlotsUsed: maxSlots.map((max, i) => clamp(play.spellSlotsUsed?.[i] ?? 0, 0, max)),
        pactSlotsUsed: derived.pactMagic ? clamp(play.pactSlotsUsed, 0, derived.pactMagic.count) : 0,
        gear: sanitizeGear(play.gear),
        xp: Math.max(0, Math.trunc(Number(play.xp) || 0))
    };
}

function clamp(n, lo, hi) {
    const v = Number(n);
    if (Number.isNaN(v)) return lo;
    return Math.max(lo, Math.min(hi, v));
}
