// Spell slot derivation, including multiclassing.
//
// This is the single most error-prone part of a character builder, so it lives in its
// own module with its own tests. The rule that trips people up: a multiclassed caster
// does NOT add up each class's own slot table. You compute one combined "caster level",
// then read a single shared table.

// Slots by combined caster level, 1st through 9th. Identical table in 2014 and 2024.
const MULTICLASS_SLOTS = {
    1: [2],
    2: [3],
    3: [4, 2],
    4: [4, 3],
    5: [4, 3, 2],
    6: [4, 3, 3],
    7: [4, 3, 3, 1],
    8: [4, 3, 3, 2],
    9: [4, 3, 3, 3, 1],
    10: [4, 3, 3, 3, 2],
    11: [4, 3, 3, 3, 2, 1],
    12: [4, 3, 3, 3, 2, 1],
    13: [4, 3, 3, 3, 2, 1, 1],
    14: [4, 3, 3, 3, 2, 1, 1],
    15: [4, 3, 3, 3, 2, 1, 1, 1],
    16: [4, 3, 3, 3, 2, 1, 1, 1],
    17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
    18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
    19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
    20: [4, 3, 3, 3, 3, 2, 2, 1, 1]
};

// How much each class level contributes to the combined caster level.
// Declared per-class in the content packs as `casterProgression`.
const PROGRESSION_DIVISOR = { full: 1, half: 2, third: 3 };

/**
 * Combined caster level for a set of classes.
 *
 * Each progression is divided and rounded down SEPARATELY, then summed. Rounding the
 * sum instead would wrongly give Paladin 1 / Ranger 1 a slot.
 *
 * @param {Array<{casterProgression?: string, level: number}>} classEntries
 */
export function casterLevel(classEntries) {
    let total = 0;
    for (const entry of classEntries) {
        const divisor = PROGRESSION_DIVISOR[entry.casterProgression];
        if (!divisor) continue; // "none" or undefined — non-casters contribute nothing.

        // A single-classed half-caster has slots at level 1, but contributes 0 here.
        // That asymmetry is in the rules as written, not a bug.
        total += Math.floor(entry.level / divisor);
    }
    return total;
}

/**
 * @returns {number[]} slots indexed 0 => 1st level. Empty array if not a caster.
 */
export function spellSlots(classEntries) {
    const level = casterLevel(classEntries);
    if (level < 1) return [];
    return [...(MULTICLASS_SLOTS[Math.min(level, 20)] || [])];
}

/** Warlock Pact Magic is a separate pool and never merges into the table above. */
export function pactSlots(warlockLevel) {
    if (!warlockLevel || warlockLevel < 1) return null;
    const count = warlockLevel === 1 ? 1 : warlockLevel < 11 ? 2 : warlockLevel < 17 ? 3 : 4;
    const slotLevel = Math.min(5, Math.ceil(Math.min(warlockLevel, 9) / 2));
    return { count, level: slotLevel };
}

export function spellSaveDC(profBonus, abilityMod) {
    return 8 + profBonus + abilityMod;
}

export function spellAttackBonus(profBonus, abilityMod) {
    return profBonus + abilityMod;
}
