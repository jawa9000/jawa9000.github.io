// Engine tests. Run with: npm test   (node --test)
//
// These target the places character builders actually get things wrong: multiclass
// spell slots, proficiency bonus off total level, expertise stacking, and the
// 2014/2024 divergence.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

import { abilityModifier, proficiencyBonus, pointBuyTotal } from '../engine/abilities.js';
import { casterLevel, spellSlots, pactSlots } from '../engine/spellcasting.js';
import { deriveCharacter } from '../engine/rules.js';
import { loadContent } from '../server/content.js';

const content2024 = await loadContent('2024');
const content2014 = await loadContent('2014');

const BASE_ABILITIES = { str: 15, dex: 13, con: 14, int: 10, wis: 12, cha: 8 };

function fighter(overrides = {}) {
    return {
        name: 'Test Fighter',
        edition: '2024',
        speciesId: 'dwarf',
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
});

describe('2024 Fighter — the vertical slice', () => {
    test('level 1 derives correctly end to end', () => {
        const sheet = deriveCharacter(fighter(), content2024);

        assert.deepEqual(sheet.problems, []);
        assert.equal(sheet.totalLevel, 1);
        assert.equal(sheet.proficiencyBonus, 2);

        // Soldier's +2 Str / +1 Con applies on top of the base scores.
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
        assert.equal(sheet.darkvision, 120);
        assert.equal(sheet.speed, 30);
    });

    test('features appear only at the levels that grant them', () => {
        const atOne = deriveCharacter(fighter(), content2024);
        const names1 = atOne.features.map((f) => f.name);
        assert.ok(names1.includes('Second Wind'));
        assert.ok(!names1.includes('Action Surge'));
        assert.ok(!names1.includes('Extra Attack'));

        const atFive = deriveCharacter(
            fighter({ classes: [{ classId: 'fighter', level: 5, subclassId: 'champion' }] }),
            content2024
        );
        const names5 = atFive.features.map((f) => f.name);
        assert.ok(names5.includes('Action Surge'));
        assert.ok(names5.includes('Extra Attack'));
        assert.ok(names5.includes('Improved Critical')); // from the Champion subclass
        assert.equal(atFive.proficiencyBonus, 3);
        assert.equal(atFive.hitPoints, 49); // 10 + 4*6 + (2+1)*5
    });

    test('unspent choices are reported rather than silently ignored', () => {
        const sheet = deriveCharacter(fighter(), content2024);
        const skills = sheet.pendingChoices.find((c) => c.id === 'fighter:skills');
        assert.ok(skills, 'fighter skill choice should be surfaced');
        assert.equal(skills.count, 2);
        assert.equal(skills.satisfied, false);
    });

    test('chosen skills become proficiencies', () => {
        const sheet = deriveCharacter(
            fighter({ choices: { 'soldier:asi': ['str2-con1'], 'fighter:skills': ['athletics', 'perception'] } }),
            content2024
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
            content2024
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
            content2024
        );
        // Half plate is 15 base; Dex +4 is capped to +2.
        assert.equal(sheet.armorClass.value, 17);
    });

    test('heavy armor ignores Dexterity entirely', () => {
        const sheet = deriveCharacter(
            fighter({ abilities: { ...BASE_ABILITIES, dex: 18 }, equipment: { armor: 'plate' } }),
            content2024
        );
        assert.equal(sheet.armorClass.value, 18);
    });

    test('a shield adds 2', () => {
        const sheet = deriveCharacter(fighter({ equipment: { armor: 'plate', shield: true } }), content2024);
        assert.equal(sheet.armorClass.value, 20);
    });

    test('the Defense fighting style applies only while armored', () => {
        const choices = { 'soldier:asi': ['str2-con1'], 'fighter:fighting-style': ['defense'] };

        const armored = deriveCharacter(fighter({ choices, equipment: { armor: 'plate' } }), content2024);
        assert.equal(armored.armorClass.value, 19); // 18 + 1

        const unarmored = deriveCharacter(fighter({ choices, equipment: {} }), content2024);
        assert.equal(unarmored.armorClass.value, 11); // 10 + Dex 1, no Defense bonus
    });

    test('wearing armor below its Strength requirement is flagged', () => {
        const sheet = deriveCharacter(
            fighter({ abilities: { ...BASE_ABILITIES, str: 8 }, choices: {}, equipment: { armor: 'plate' } }),
            content2024
        );
        assert.ok(sheet.problems.some((p) => p.includes('Strength 15')));
    });
});

describe('edition divergence lives in data, not code', () => {
    // Identical concept, identical engine call — only the content pack differs.
    const flat = { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };

    test('2024 takes ability increases from the background', () => {
        const sheet = deriveCharacter(
            {
                name: 'Divergence',
                edition: '2024',
                speciesId: 'human',
                backgroundId: 'soldier',
                classes: [{ classId: 'fighter', level: 1 }],
                abilities: flat,
                choices: { 'soldier:asi': ['str2-con1'] }
            },
            content2024
        );
        assert.equal(sheet.scores.str, 12);
        assert.equal(sheet.scores.con, 11);
        assert.equal(sheet.scores.cha, 10);
    });

    test('2014 takes ability increases from the race instead', () => {
        const sheet = deriveCharacter(
            {
                name: 'Divergence',
                edition: '2014',
                speciesId: 'human',
                backgroundId: 'soldier',
                classes: [{ classId: 'fighter', level: 1 }],
                abilities: flat,
                choices: {}
            },
            content2014
        );
        // 2014 Human is +1 to everything, and the background grants no scores at all.
        for (const ability of ['str', 'dex', 'con', 'int', 'wis', 'cha']) {
            assert.equal(sheet.scores[ability], 11, `${ability} should be 11`);
        }
    });

    test('the 2024 Fighter gains Weapon Mastery at 1 and the 2014 Fighter does not', () => {
        const has = (sheet, name) => sheet.features.some((f) => f.name === name);

        const c2024 = deriveCharacter(fighter(), content2024);
        const c2014 = deriveCharacter(
            fighter({ edition: '2014', speciesId: 'hill-dwarf', choices: {} }),
            content2014
        );

        assert.ok(has(c2024, 'Weapon Mastery'));
        assert.ok(!has(c2014, 'Weapon Mastery'));
        assert.ok(has(c2024, 'Second Wind') && has(c2014, 'Second Wind'));
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
            content2024
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
            content2024
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
            content2024
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
            content2024
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
            content2024
        );
        assert.ok(sheet.problems.some((p) => p.includes('nonexistent')));
        assert.ok(sheet.problems.some((p) => p.includes('alsoFake')));
    });

    test('a stale choice referencing a removed option is ignored, not fatal', () => {
        const sheet = deriveCharacter(
            fighter({ choices: { 'soldier:asi': ['option-that-no-longer-exists'] } }),
            content2024
        );
        assert.equal(sheet.scores.str, 15); // base score, no bonus applied
        assert.deepEqual(sheet.problems, []);
    });

    test('an empty character derives without throwing', () => {
        const sheet = deriveCharacter({ edition: '2024' }, content2024);
        assert.equal(sheet.totalLevel, 0);
        assert.equal(sheet.proficiencyBonus, 2);
    });
});
