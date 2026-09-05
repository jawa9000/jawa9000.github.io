// Character derivation.
//
// A stored character is a set of CHOICES (species, background, classes, base ability
// scores, selections). Everything on the sheet — modifiers, AC, HP, save bonuses, spell
// slots — is DERIVED from those choices plus the content packs. Nothing derived is ever
// persisted, so a content-pack fix propagates to every existing character automatically.

import {
    ABILITIES,
    SKILLS,
    abilityModifier,
    proficiencyBonus
} from './abilities.js';
import { applyGrants, emptyAccumulator } from './grants.js';
import { spellSlots, spellSaveDC, spellAttackBonus, pactSlots } from './spellcasting.js';

/**
 * @param {Object} character  the stored character record
 * @param {Object} content    the unified content pack
 * @returns {Object} the derived sheet
 */
export function deriveCharacter(character, content) {
    const problems = [];
    const choices = character.choices || {};
    const acc = emptyAccumulator();

    const species = content.species?.[character.speciesId];
    const background = content.backgrounds?.[character.backgroundId];

    if (character.speciesId && !species) problems.push(`Unknown species: ${character.speciesId}`);
    if (character.backgroundId && !background) {
        problems.push(`Unknown background: ${character.backgroundId}`);
    }

    // Order matters only for `speed`/`darkvision` (max-wins) and feature listing.
    if (species) applyGrants(species.grants, choices, acc, species.name);
    if (background) applyGrants(background.grants, choices, acc, background.name);

    // --- Classes -----------------------------------------------------------------
    const classEntries = [];
    for (const taken of character.classes || []) {
        const def = content.classes?.[taken.classId];
        if (!def) {
            problems.push(`Unknown class: ${taken.classId}`);
            continue;
        }
        const level = clamp(taken.level, 1, 20);
        classEntries.push({ def, level, casterProgression: def.casterProgression, subclassId: taken.subclassId });

        // Only the FIRST class taken grants saving throw proficiencies and the full
        // starting proficiency list. Multiclassing grants a reduced set — that
        // reduced list is declared in the pack as `multiclassGrants`.
        const isPrimary = classEntries.length === 1;
        applyGrants(isPrimary ? def.grants : def.multiclassGrants ?? [], choices, acc, def.name);

        // Class features are gated by level in this class, not total character level.
        for (const feature of def.features || []) {
            if (feature.level <= level) {
                applyGrants(
                    [{ type: 'feature', name: feature.name, text: feature.text, level: feature.level }],
                    choices,
                    acc,
                    def.name
                );
                applyGrants(feature.grants, choices, acc, `${def.name} ${feature.level}`);
            }
        }

        const subclass = def.subclasses?.[taken.subclassId];
        if (taken.subclassId && !subclass) {
            problems.push(`Unknown subclass: ${taken.subclassId}`);
        }
        if (subclass) {
            for (const feature of subclass.features || []) {
                if (feature.level <= level) {
                    applyGrants(
                        [{ type: 'feature', name: feature.name, text: feature.text, level: feature.level }],
                        choices,
                        acc,
                        subclass.name
                    );
                    applyGrants(feature.grants, choices, acc, `${subclass.name} ${feature.level}`);
                }
            }
        }
    }

    const totalLevel = classEntries.reduce((sum, c) => sum + c.level, 0);
    const profBonus = proficiencyBonus(totalLevel);

    // --- Ability scores ----------------------------------------------------------
    const scores = {};
    const modifiers = {};
    const abilityBonuses = {};
    for (const ability of ABILITIES) {
        const base = character.abilities?.[ability] ?? 10;
        // 20 is the cap without magic; feats and ASIs cannot push past it.
        const total = Math.min(20, base + acc.abilityBonuses[ability]);
        scores[ability] = total;
        modifiers[ability] = abilityModifier(total);
        abilityBonuses[ability] = {
            value: acc.abilityBonuses[ability],
            sources: acc.abilityBonusSources[ability]
        };
    }

    // --- Hit points --------------------------------------------------------------
    // Level 1 in the first class is the full hit die; every level after uses the
    // fixed average (die/2 + 1), which is the default the rules offer instead of rolling.
    let hitPoints = 0;
    classEntries.forEach((entry, index) => {
        const die = entry.def.hitDie || 8;
        const average = Math.floor(die / 2) + 1;
        const levelsAtAverage = index === 0 ? entry.level - 1 : entry.level;
        if (index === 0) hitPoints += die;
        hitPoints += levelsAtAverage * average;
    });
    // Constitution applies per character level, not per class.
    hitPoints += (modifiers.con + acc.hpPerLevel) * totalLevel;
    hitPoints = Math.max(totalLevel, hitPoints); // never below 1 HP per level

    // --- Saves and skills --------------------------------------------------------
    const saves = {};
    for (const ability of ABILITIES) {
        const proficient = acc.saveProficiencies.has(ability);
        saves[ability] = {
            proficient,
            modifier: modifiers[ability] + (proficient ? profBonus : 0)
        };
    }

    const skills = {};
    for (const [skill, ability] of Object.entries(SKILLS)) {
        const proficient = acc.skillProficiencies.has(skill);
        const expert = acc.expertise.has(skill);
        // Expertise doubles the proficiency bonus, and only applies if already proficient.
        const bonus = expert && proficient ? profBonus * 2 : proficient ? profBonus : 0;
        skills[skill] = { ability, proficient, expertise: expert && proficient, modifier: modifiers[ability] + bonus };
    }

    // --- Armor class -------------------------------------------------------------
    const armorClass = computeArmorClass(character, content, modifiers, acc, problems);

    // --- Spellcasting ------------------------------------------------------------
    const slots = spellSlots(classEntries);
    const spellcasting = classEntries
        .filter((c) => c.def.spellcastingAbility)
        .map((c) => {
            const mod = modifiers[c.def.spellcastingAbility];
            return {
                classId: c.def.id,
                className: c.def.name,
                ability: c.def.spellcastingAbility,
                saveDC: spellSaveDC(profBonus, mod),
                attackBonus: spellAttackBonus(profBonus, mod)
            };
        });

    const warlock = classEntries.find((c) => c.def.pactMagic);

    return {
        name: character.name || 'Unnamed',
        speciesName: species?.name ?? null,
        backgroundName: background?.name ?? null,
        classLine: classEntries.map((c) => `${c.def.name} ${c.level}`).join(' / ') || '—',
        totalLevel,
        proficiencyBonus: profBonus,
        scores,
        modifiers,
        abilityBonuses,
        hitPoints,
        hitDice: classEntries.map((c) => `${c.level}d${c.def.hitDie}`),
        armorClass,
        initiative: modifiers.dex + acc.initiativeBonus,
        speed: acc.speed,
        darkvision: acc.darkvision,
        saves,
        skills,
        passivePerception: 10 + skills.perception.modifier,
        proficiencies: {
            armor: [...acc.armorProficiencies],
            weapons: [...acc.weaponProficiencies],
            tools: [...acc.toolProficiencies],
            languages: [...acc.languages]
        },
        features: acc.features.sort((a, b) => (a.level ?? 0) - (b.level ?? 0)),
        pendingChoices: acc.pendingChoices,
        spellSlots: slots,
        pactMagic: warlock ? pactSlots(warlock.level) : null,
        spellcasting,
        problems
    };
}

function computeArmorClass(character, content, modifiers, acc, problems) {
    const equippedId = character.equipment?.armor;
    const shieldEquipped = Boolean(character.equipment?.shield);
    const shieldBonus = shieldEquipped ? 2 : 0;

    const armor = equippedId ? content.armor?.[equippedId] : null;
    if (equippedId && !armor) problems.push(`Unknown armor: ${equippedId}`);

    if (!armor) {
        // Unarmored: 10 + Dex. Bonuses gated on wearing armor (Defense) do not apply.
        return {
            value: 10 + modifiers.dex + shieldBonus + acc.acBonus,
            source: 'Unarmored',
            shield: shieldEquipped
        };
    }

    // Light armor adds full Dex, medium caps it at +2, heavy ignores it entirely.
    let dex = modifiers.dex;
    if (armor.maxDex !== undefined && armor.maxDex !== null) dex = Math.min(dex, armor.maxDex);
    if (armor.category === 'heavy') dex = 0;

    if (armor.strengthRequirement && modifiers.str !== undefined) {
        const str = (character.abilities?.str ?? 10) + (acc.abilityBonuses.str || 0);
        if (str < armor.strengthRequirement) {
            problems.push(
                `${armor.name} requires Strength ${armor.strengthRequirement}; your speed is reduced by 10 feet.`
            );
        }
    }

    return {
        value: armor.baseAC + dex + shieldBonus + acc.acBonus + acc.acBonusWhenArmored,
        source: armor.name,
        shield: shieldEquipped
    };
}

function clamp(n, lo, hi) {
    return Math.max(lo, Math.min(hi, Number(n) || lo));
}
