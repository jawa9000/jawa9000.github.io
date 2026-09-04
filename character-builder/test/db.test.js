// Tests the thing the whole redesign is for: leveling up must never mutate an older
// version, and every past level must stay independently readable and editable forever.

import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

import {
    openDatabase,
    createCharacter,
    listVersionMeta,
    getVersion,
    getHighestLevel,
    updateVersionSheet,
    insertVersion,
    deleteVersion,
    deleteCharacter,
    listCharacters,
    renameCharacter
} from '../server/db.js';

beforeEach(() => {
    openDatabase(':memory:');
});

function sheet(hp, extra = {}) {
    return { derived: { hitPoints: hp }, play: { currentHp: hp, ...extra } };
}

describe('level history is independent and permanent', () => {
    test('a level-up snapshot does not alter the version it was cloned from', () => {
        const { id } = createCharacter({
            name: 'Durgan',
            className: 'Fighter 1',
            edition: '2024',
            choices: { classes: [{ classId: 'fighter', level: 1 }] },
            sheetData: sheet(12)
        });

        insertVersion(id, 2, { classes: [{ classId: 'fighter', level: 2 }] }, sheet(19));

        const level1 = getVersion(id, 1);
        const level2 = getVersion(id, 2);
        assert.equal(level1.sheetData.derived.hitPoints, 12);
        assert.equal(level2.sheetData.derived.hitPoints, 19);

        // Editing the play state at level 2 (the auto-save path) must not touch level 1.
        updateVersionSheet(id, 2, sheet(19, { currentHp: 4 })); // took damage at level 2
        assert.equal(getVersion(id, 1).sheetData.play.currentHp, 12, 'level 1 must be unaffected by a level 2 edit');
        assert.equal(getVersion(id, 2).sheetData.play.currentHp, 4);
    });

    test('every level stays listed and independently fetchable after several level-ups', () => {
        const { id } = createCharacter({ name: 'X', edition: '2024', choices: {}, sheetData: sheet(10) });
        insertVersion(id, 2, {}, sheet(17));
        insertVersion(id, 3, {}, sheet(24));

        const versions = listVersionMeta(id);
        assert.deepEqual(versions.map((v) => v.level), [1, 2, 3]);
        assert.equal(getHighestLevel(id), 3);

        // Levels 1 and 2 remain browsable even though the character has since reached 3.
        assert.equal(getVersion(id, 1).sheetData.derived.hitPoints, 10);
        assert.equal(getVersion(id, 2).sheetData.derived.hitPoints, 17);
    });

    test('inserting a level that already exists is rejected, not silently overwritten', () => {
        const { id } = createCharacter({ name: 'X', edition: '2024', choices: {}, sheetData: sheet(10) });
        assert.throws(() => insertVersion(id, 1, {}, sheet(999)));
        assert.equal(getVersion(id, 1).sheetData.derived.hitPoints, 10, 'the original level 1 must survive the rejected insert');
    });

    test('deleting the only remaining version is refused', () => {
        const { id } = createCharacter({ name: 'X', edition: '2024', choices: {}, sheetData: sheet(10) });
        assert.equal(deleteVersion(id, 1), false);
        assert.ok(getVersion(id, 1));
    });

    test('deleting one historical version leaves the others intact', () => {
        const { id } = createCharacter({ name: 'X', edition: '2024', choices: {}, sheetData: sheet(10) });
        insertVersion(id, 2, {}, sheet(17));
        assert.equal(deleteVersion(id, 1), true);
        assert.equal(getVersion(id, 1), null);
        assert.equal(getVersion(id, 2).sheetData.derived.hitPoints, 17);
    });

    test('deleting a character cascades to all of its versions', () => {
        const { id } = createCharacter({ name: 'X', edition: '2024', choices: {}, sheetData: sheet(10) });
        insertVersion(id, 2, {}, sheet(17));
        deleteCharacter(id);
        assert.equal(getVersion(id, 1), null);
        assert.equal(getVersion(id, 2), null);
        assert.equal(listCharacters().length, 0);
    });

    test('renaming updates the roster listing without touching version data', () => {
        const { id } = createCharacter({ name: 'Old Name', className: 'Fighter 1', edition: '2024', choices: {}, sheetData: sheet(10) });
        renameCharacter(id, { name: 'New Name', className: 'Fighter 2' });
        const roster = listCharacters();
        assert.equal(roster[0].name, 'New Name');
        assert.equal(getVersion(id, 1).sheetData.derived.hitPoints, 10);
    });
});

describe('import at an arbitrary starting level', () => {
    test('a character can be created directly at level 5, not just level 1', () => {
        const { id } = createCharacter({ name: 'Imported', edition: '2024', choices: {}, sheetData: sheet(40), level: 5 });
        assert.deepEqual(listVersionMeta(id).map((v) => v.level), [5]);
        assert.equal(getHighestLevel(id), 5);
    });
});
