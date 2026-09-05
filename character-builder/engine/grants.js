// The grant system.
//
// Every benefit a character receives — from a species, a background, a class feature,
// a feat — is expressed in the content packs as a "grant". The engine interprets grants;
// it never hardcodes what a specific species or class does. This is what let the old
// 2014/2024 content split live entirely in data before it was merged into one pool
// (see README's "The content merge") — different content shipped different grants, no
// branching in the engine either way.
//
// Grant types:
//   { type: 'ability',           ability: 'str', value: 2 }
//   { type: 'skillProficiency',  skill: 'athletics' }
//   { type: 'saveProficiency',   ability: 'str' }
//   { type: 'armorProficiency',  value: 'heavy' }
//   { type: 'weaponProficiency', value: 'martial' }
//   { type: 'toolProficiency',   value: 'smiths-tools' }
//   { type: 'expertise',         skill: 'stealth' }
//   { type: 'language',          value: 'common' }
//   { type: 'speed',             value: 30 }
//   { type: 'darkvision',        value: 60 }
//   { type: 'hpPerLevel',        value: 1 }
//   { type: 'initiativeBonus',   value: 2 }
//   { type: 'acBonus',           value: 1, requiresArmor: true }
//   { type: 'feature',           name: '...', text: '...' }
//   { type: 'choice',            id: 'fighter:fighting-style', count: 1, from: [...] }
//
// A 'choice' grant is a hole the player fills. The character record stores
// choices[id] = [optionId, ...]; resolving replaces the choice with the chosen
// options' own grants, recursively.

import { ABILITIES } from './abilities.js';

export function emptyAccumulator() {
    return {
        abilityBonuses: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 },
        // Per-ability list of { source, value } — lets the UI show WHERE a bonus came
        // from (species, background, a feat...), not just the summed total above.
        abilityBonusSources: { str: [], dex: [], con: [], int: [], wis: [], cha: [] },
        skillProficiencies: new Set(),
        saveProficiencies: new Set(),
        armorProficiencies: new Set(),
        weaponProficiencies: new Set(),
        toolProficiencies: new Set(),
        expertise: new Set(),
        languages: new Set(),
        speed: 30,
        darkvision: 0,
        hpPerLevel: 0,
        initiativeBonus: 0,
        // Split because some AC bonuses (the Defense fighting style) only apply while
        // wearing armor; rules.js decides which pool counts based on what's equipped.
        acBonus: 0,
        acBonusWhenArmored: 0,
        features: [],
        // Choices the player still needs to make, surfaced to the UI.
        pendingChoices: []
    };
}

/**
 * Flatten a grant list, resolving 'choice' grants against the player's selections.
 *
 * @param {Array} grants        grants to resolve
 * @param {Object} choices      character.choices — { [choiceId]: [optionId, ...] }
 * @param {Object} out          accumulator from emptyAccumulator()
 * @param {string} sourceLabel  human-readable origin, for display and debugging
 */
export function applyGrants(grants, choices, out, sourceLabel = '') {
    if (!Array.isArray(grants)) return out;

    for (const grant of grants) {
        if (!grant || !grant.type) continue;

        if (grant.type === 'choice') {
            const selected = choices?.[grant.id] ?? [];
            const options = grant.from || [];

            // Record the choice so the UI can render it, whether or not it's filled in.
            out.pendingChoices.push({
                id: grant.id,
                label: grant.label || grant.id,
                count: grant.count ?? 1,
                source: sourceLabel,
                options: options.map((o) => ({ id: o.id, name: o.name, text: o.text })),
                selected,
                satisfied: selected.length >= (grant.count ?? 1)
            });

            // Only selections that match a real option are applied. A stale choice left
            // over from a since-edited content pack is ignored rather than crashing.
            for (const pickedId of selected.slice(0, grant.count ?? 1)) {
                const option = options.find((o) => o.id === pickedId);
                if (option) applyGrants(option.grants, choices, out, sourceLabel);
            }
            continue;
        }

        applyOne(grant, out, sourceLabel);
    }

    return out;
}

function applyOne(grant, out, sourceLabel) {
    switch (grant.type) {
        case 'ability':
            if (ABILITIES.includes(grant.ability) && grant.value) {
                out.abilityBonuses[grant.ability] += grant.value;
                out.abilityBonusSources[grant.ability].push({ source: sourceLabel, value: grant.value });
            }
            break;
        case 'skillProficiency':
            out.skillProficiencies.add(grant.skill);
            break;
        case 'saveProficiency':
            out.saveProficiencies.add(grant.ability);
            break;
        case 'armorProficiency':
            out.armorProficiencies.add(grant.value);
            break;
        case 'weaponProficiency':
            out.weaponProficiencies.add(grant.value);
            break;
        case 'toolProficiency':
            out.toolProficiencies.add(grant.value);
            break;
        case 'expertise':
            out.expertise.add(grant.skill);
            break;
        case 'language':
            out.languages.add(grant.value);
            break;
        case 'speed':
            // Highest wins rather than stacking — walking speeds replace, not add.
            out.speed = Math.max(out.speed, grant.value || 0);
            break;
        case 'darkvision':
            out.darkvision = Math.max(out.darkvision, grant.value || 0);
            break;
        case 'hpPerLevel':
            out.hpPerLevel += grant.value || 0;
            break;
        case 'initiativeBonus':
            out.initiativeBonus += grant.value || 0;
            break;
        case 'acBonus':
            if (grant.requiresArmor) out.acBonusWhenArmored += grant.value || 0;
            else out.acBonus += grant.value || 0;
            break;
        case 'feature':
            out.features.push({
                name: grant.name,
                text: grant.text || '',
                source: sourceLabel,
                level: grant.level
            });
            break;
        default:
            // Unknown grant types are ignored on purpose: a newer content pack can
            // introduce a type an older engine doesn't understand without breaking
            // every character that references it.
            break;
    }
}
