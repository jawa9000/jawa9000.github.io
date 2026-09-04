// Engine tests. Run with: npm test   (node --test)
//
// These target the places character builders actually get things wrong: multiclass
// spell slots, proficiency bonus off total level, and expertise stacking.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

import { abilityModifier, proficiencyBonus, pointBuyTotal } from '../engine/abilities.js';
import { casterLevel, spellSlots, pactSlots } from '../engine/spellcasting.js';
import { deriveCharacter } from '../engine/rules.js';
import { loadContent } from '../server/content.js';

const content = await loadContent();

const BASE_ABILITIES = { str: 15, dex: 13, con: 14, int: 10, wis: 12, cha: 8 };

function fighter(overrides = {}) {
    return {
        name: 'Test Fighter',
        speciesId: 'hill-dwarf',
        backgroundId: 'soldier',
        classes: [{ classId: 'fighter', level: 1 }],
        abilities: { ...BASE_ABILITIES },
        choices: { 'soldier:asi': ['str2-con1'] },
        equipment: {},
        ...overrides
    };
}

describe('ability math', () => {
    test('modifiers match the published table', () => {
        assert.equal(abilityModifier(1), -5);
        assert.equal(abilityModifier(8), -1);
        assert.equal(abilityModifier(10), 0);
        assert.equal(abilityModifier(11), 0);
        assert.equal(abilityModifier(15), 2);
        assert.equal(abilityModifier(20), 5);
        assert.equal(abilityModifier(30), 10);
    });

    test('proficiency bonus steps at 5/9/13/17', () => {
        assert.deepEqual([1, 4, 5, 8, 9, 12, 13, 16, 17, 20].map(proficiencyBonus), [2, 2, 3, 3, 4, 4, 5, 5, 6, 6]);
    });

    test('standard array costs exactly the point-buy budget minus nothing it cannot buy', () => {
        // 15/14/13/12/10/8 = 9+7+5+4+2+0 = 27, the full budget.
        assert.equal(pointBuyTotal({ str: 15, dex: 14, con: 13, int: 12, wis: 10, cha: 8 }), 27);
    });
});

describe('multiclass spell slots', () => {
    test('Wizard 3 / Cleric 2 yields caster level 5 and 4/3/2 slots', () => {
        const classes = [
            { casterProgression: 'full', level: 3 },
            { casterProgression: 'full', level: 2 }
        ];
        assert.equal(casterLevel(classes), 5);
        assert.deepEqual(spellSlots(classes), [4, 3, 2]);
    });

    test('each progression rounds down separately, so Paladin 1 / Ranger 1 gets nothing', () => {
        const classes = [
            { casterProgression: 'half', level: 1 },
            { casterProgression: 'half', level: 1 }
        ];
        // Summing first would give 1 and wrongly award a slot.
        assert.equal(casterLevel(classes), 0);
        assert.deepEqual(spellSlots(classes), []);
    });

    test('a third-caster contributes only every third level', () => {
        assert.equal(casterLevel([{ casterProgression: 'third', level: 2 }]), 0);
        assert.equal(casterLevel([{ casterProgression: 'third', level: 3 }]), 1);
        assert.equal(casterLevel([{ casterProgression: 'third', level: 8 }]), 2);
    });

    test('non-casters contribute nothing', () => {
        assert.equal(casterLevel([{ casterProgression: 'none', level: 20 }]), 0);
    });

    test('full caster at 20 gets the top row', () => {
        assert.deepEqual(spellSlots([{ casterProgression: 'full', level: 20 }]), [4, 3, 3, 3, 3, 2, 2, 1, 1]);
    });

    test('pact magic is a separate pool', () => {
        assert.deepEqual(pactSlots(1), { count: 1, level: 1 });
        assert.deepEqual(pactSlots(5), { count: 2, level: 3 });
        assert.deepEqual(pactSlots(11), { count: 3, level: 5 });
        assert.equal(pactSlots(0), null);
    });

    test('halfRoundUp (2024 Paladin/Ranger) has slots from level 1, unlike the classic half-caster', () => {
        // Matches the published 2024 Paladin table exactly: 2 slots at level 1-2, 3 at
        // level 3, 4+2 at level 5 — verified against the real sourcebook, not derived.
        const at = (level) => spellSlots([{ casterProgression: 'halfRoundUp', level }]);
        assert.deepEqual(at(1), [2]);
        assert.deepEqual(at(2), [2]);
        assert.deepEqual(at(3), [3]);
        assert.deepEqual(at(5), [4, 2]);
    });

    test('halfRoundUp still rounds each class separately before summing', () => {
        const classes = [
            { casterProgression: 'halfRoundUp', level: 1 },
            { casterProgression: 'halfRoundUp', level: 1 }
        ];
        // ceil(1/2) + ceil(1/2) = 1 + 1 = 2, not ceil(2/2) = 1.
        assert.equal(casterLevel(classes), 2);
    });
});

describe('Fighter — the vertical slice', () => {
    test('level 1 derives correctly end to end', () => {
        const sheet = deriveCharacter(fighter(), content);

        assert.deepEqual(sheet.problems, []);
        assert.equal(sheet.totalLevel, 1);
        assert.equal(sheet.proficiencyBonus, 2);

        // Soldier's +2 Str / +1 Con applies on top of the base scores. Ability scores come
        // entirely from the background, not the species — the merged content pool kept
        // that convention (see data/backgrounds.json / README).
        assert.equal(sheet.scores.str, 17);
        assert.equal(sheet.scores.con, 15);
        assert.equal(sheet.modifiers.str, 3);

        // d10 + Con 2 + Dwarven Toughness 1.
        assert.equal(sheet.hitPoints, 13);

        // Fighter grants Str and Con saves, and only those.
        assert.equal(sheet.saves.str.modifier, 5);
        assert.equal(sheet.saves.con.modifier, 4);
        assert.equal(sheet.saves.dex.proficient, false);

        assert.equal(sheet.armorClass.value, 11); // unarmored, Dex +1
        assert.equal(sheet.darkvision, 60);
        assert.equal(sheet.speed, 30);
    });

    test('features appear only at the levels that grant them', () => {
        const atOne = deriveCharacter(fighter(), content);
        const names1 = atOne.features.map((f) => f.name);
        assert.ok(names1.includes('Second Wind'));
        assert.ok(!names1.includes('Action Surge'));
        assert.ok(!names1.includes('Extra Attack'));

        const atFive = deriveCharacter(
            fighter({ classes: [{ classId: 'fighter', level: 5, subclassId: 'champion' }] }),
            content
        );
        const names5 = atFive.features.map((f) => f.name);
        assert.ok(names5.includes('Action Surge'));
        assert.ok(names5.includes('Extra Attack'));
        assert.ok(names5.includes('Weapon Mastery')); // confirms the merge kept the newer Fighter mechanics
        assert.ok(names5.includes('Improved Critical')); // from the Champion subclass
        assert.equal(atFive.proficiencyBonus, 3);
        assert.equal(atFive.hitPoints, 49); // 10 + 4*6 + (2+1)*5
    });

    test('unspent choices are reported rather than silently ignored', () => {
        const sheet = deriveCharacter(fighter(), content);
        const skills = sheet.pendingChoices.find((c) => c.id === 'fighter:skills');
        assert.ok(skills, 'fighter skill choice should be surfaced');
        assert.equal(skills.count, 2);
        assert.equal(skills.satisfied, false);
    });

    test('chosen skills become proficiencies', () => {
        const sheet = deriveCharacter(
            fighter({ choices: { 'soldier:asi': ['str2-con1'], 'fighter:skills': ['athletics', 'perception'] } }),
            content
        );
        assert.equal(sheet.skills.athletics.proficient, true);
        assert.equal(sheet.skills.perception.proficient, true);
        assert.equal(sheet.skills.stealth.proficient, false);
        // Athletics is Str 3 + prof 2.
        assert.equal(sheet.skills.athletics.modifier, 5);
        assert.equal(sheet.passivePerception, 10 + sheet.skills.perception.modifier);
    });

    test('a choice only consumes as many selections as it allows', () => {
        const sheet = deriveCharacter(
            fighter({
                choices: {
                    'soldier:asi': ['str2-con1'],
                    'fighter:skills': ['athletics', 'perception', 'stealth', 'survival']
                }
            }),
            content
        );
        // count is 2, so the third and fourth picks are discarded.
        assert.equal(sheet.skills.stealth.proficient, false);
        assert.equal(sheet.skills.survival.proficient, false);
    });
});

describe('armor class', () => {
    test('medium armor caps the Dexterity contribution at +2', () => {
        const sheet = deriveCharacter(
            fighter({ abilities: { ...BASE_ABILITIES, dex: 18 }, equipment: { armor: 'half-plate' } }),
            content
        );
        // Half plate is 15 base; Dex +4 is capped to +2.
        assert.equal(sheet.armorClass.value, 17);
    });

    test('heavy armor ignores Dexterity entirely', () => {
        const sheet = deriveCharacter(
            fighter({ abilities: { ...BASE_ABILITIES, dex: 18 }, equipment: { armor: 'plate' } }),
            content
        );
        assert.equal(sheet.armorClass.value, 18);
    });

    test('a shield adds 2', () => {
        const sheet = deriveCharacter(fighter({ equipment: { armor: 'plate', shield: true } }), content);
        assert.equal(sheet.armorClass.value, 20);
    });

    test('the Defense fighting style applies only while armored', () => {
        const choices = { 'soldier:asi': ['str2-con1'], 'fighter:fighting-style': ['defense'] };

        const armored = deriveCharacter(fighter({ choices, equipment: { armor: 'plate' } }), content);
        assert.equal(armored.armorClass.value, 19); // 18 + 1

        const unarmored = deriveCharacter(fighter({ choices, equipment: {} }), content);
        assert.equal(unarmored.armorClass.value, 11); // 10 + Dex 1, no Defense bonus
    });

    test('wearing armor below its Strength requirement is flagged', () => {
        const sheet = deriveCharacter(
            fighter({ abilities: { ...BASE_ABILITIES, str: 8 }, choices: {}, equipment: { armor: 'plate' } }),
            content
        );
        assert.ok(sheet.problems.some((p) => p.includes('Strength 15')));
    });
});

describe('multiclassing', () => {
    test('proficiency bonus uses total level, not the highest class level', () => {
        const sheet = deriveCharacter(
            fighter({
                classes: [
                    { classId: 'fighter', level: 3 },
                    { classId: 'wizard', level: 2 }
                ]
            }),
            content
        );
        assert.equal(sheet.totalLevel, 5);
        assert.equal(sheet.proficiencyBonus, 3); // not 2, which level 3 alone would give
    });

    test('only the first class grants saving throw proficiencies', () => {
        const sheet = deriveCharacter(
            fighter({
                classes: [
                    { classId: 'fighter', level: 1 },
                    { classId: 'wizard', level: 1 }
                ]
            }),
            content
        );
        assert.equal(sheet.saves.str.proficient, true);
        assert.equal(sheet.saves.con.proficient, true);
        // Wizard's Int/Wis saves are NOT granted on the multiclass side.
        assert.equal(sheet.saves.int.proficient, false);
        assert.equal(sheet.saves.wis.proficient, false);
    });

    test('hit points sum each class die with Con applied per character level', () => {
        const sheet = deriveCharacter(
            fighter({
                speciesId: 'human', // drop Dwarven Toughness to isolate the die math
                classes: [
                    { classId: 'fighter', level: 2 },
                    { classId: 'wizard', level: 2 }
                ]
            }),
            content
        );
        // Fighter: 10 + 6. Wizard: 2 * 4. Con +2 across 4 levels.
        assert.equal(sheet.hitPoints, 10 + 6 + 8 + 8);
    });

    test('a Fighter/Wizard gets spell slots from the Wizard side only', () => {
        const sheet = deriveCharacter(
            fighter({
                classes: [
                    { classId: 'fighter', level: 4 },
                    { classId: 'wizard', level: 3 }
                ]
            }),
            content
        );
        assert.deepEqual(sheet.spellSlots, [4, 2]); // caster level 3
        assert.equal(sheet.spellcasting.length, 1);
        assert.equal(sheet.spellcasting[0].classId, 'wizard');
    });
});

describe('resilience', () => {
    test('unknown ids are reported instead of throwing', () => {
        const sheet = deriveCharacter(
            fighter({ speciesId: 'nonexistent', classes: [{ classId: 'alsoFake', level: 1 }] }),
            content
        );
        assert.ok(sheet.problems.some((p) => p.includes('nonexistent')));
        assert.ok(sheet.problems.some((p) => p.includes('alsoFake')));
    });

    test('a stale choice referencing a removed option is ignored, not fatal', () => {
        const sheet = deriveCharacter(
            fighter({ choices: { 'soldier:asi': ['option-that-no-longer-exists'] } }),
            content
        );
        assert.equal(sheet.scores.str, 15); // base score, no bonus applied
        assert.deepEqual(sheet.problems, []);
    });

    test('an empty character derives without throwing', () => {
        const sheet = deriveCharacter({}, content);
        assert.equal(sheet.totalLevel, 0);
        assert.equal(sheet.proficiencyBonus, 2);
    });
});
