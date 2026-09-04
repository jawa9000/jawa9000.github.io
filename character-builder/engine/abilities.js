// Ability score math. Pure functions, no I/O — everything here is unit-testable.

export const ABILITIES = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

export const ABILITY_NAMES = {
    str: 'Strength',
    dex: 'Dexterity',
    con: 'Constitution',
    int: 'Intelligence',
    wis: 'Wisdom',
    cha: 'Charisma'
};

// Skill -> governing ability. Identical in the 2014 and 2024 rules.
export const SKILLS = {
    acrobatics: 'dex',
    'animal-handling': 'wis',
    arcana: 'int',
    athletics: 'str',
    deception: 'cha',
    history: 'int',
    insight: 'wis',
    intimidation: 'cha',
    investigation: 'int',
    medicine: 'wis',
    nature: 'int',
    perception: 'wis',
    performance: 'cha',
    persuasion: 'cha',
    religion: 'int',
    'sleight-of-hand': 'dex',
    stealth: 'dex',
    survival: 'wis'
};

export function skillLabel(id) {
    return id.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
}

// The published table is just this formula; the Encounter Builder's lookup object
// (fun/Encounter_Builder/ability_score_modifier.js) computes the same values for 1-30.
export function abilityModifier(score) {
    return Math.floor((score - 10) / 2);
}

// 2 at levels 1-4, 3 at 5-8, ... 6 at 17-20. Based on total character level,
// not class level — this is the classic multiclassing trap.
export function proficiencyBonus(totalLevel) {
    return 2 + Math.floor((Math.max(1, totalLevel) - 1) / 4);
}

export function formatModifier(n) {
    return n >= 0 ? `+${n}` : `${n}`;
}

// Standard array and point-buy.
export const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

const POINT_BUY_COST = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };
export const POINT_BUY_BUDGET = 27;

export function pointBuyCost(score) {
    return POINT_BUY_COST[score];
}

export function pointBuyTotal(scores) {
    return ABILITIES.reduce((sum, a) => {
        const cost = POINT_BUY_COST[scores[a]];
        return sum + (cost === undefined ? Infinity : cost);
    }, 0);
}
