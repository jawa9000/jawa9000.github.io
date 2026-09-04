// Character-advancement XP thresholds. Unchanged between the 2014 and 2024 rules, so this
// lives alongside the engine rather than in a per-edition content pack — no edition
// branching needed here either. Pure functions, no I/O, runs identically in the browser
// and the server (see engine/rules.js for why that matters).

// Index i = XP required to REACH character level i+1. Index 0 (level 1) is 0 XP.
export const XP_THRESHOLDS = [
    0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000,
    85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000
];

export const MAX_LEVEL = XP_THRESHOLDS.length; // 20

/** Highest character level a given XP total qualifies for, capped at MAX_LEVEL. */
export function levelForXp(xp) {
    let level = 1;
    for (let i = 0; i < XP_THRESHOLDS.length; i++) {
        if (xp >= XP_THRESHOLDS[i]) level = i + 1;
    }
    return level;
}

/** XP still needed to reach the next level, or null if already at MAX_LEVEL. */
export function xpToNextLevel(xp) {
    const current = levelForXp(xp);
    if (current >= MAX_LEVEL) return null;
    return XP_THRESHOLDS[current] - xp; // XP_THRESHOLDS[current] = threshold for (current + 1)
}
