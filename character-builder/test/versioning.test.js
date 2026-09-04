import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

import {
    initialPlayState,
    carryForwardPlayState,
    applyShortRest,
    applyLongRest,
    sanitizePlayState,
    sanitizeGear
} from '../server/versioning.js';

function fakeDerived(overrides = {}) {
    return {
        hitPoints: 20,
        totalLevel: 4,
        spellSlots: [4, 3],
        pactMagic: null,
        ...overrides
    };
}

describe('initialPlayState', () => {
    test('starts at full HP with all resources unspent', () => {
        const play = initialPlayState(fakeDerived());
        assert.equal(play.currentHp, 20);
        assert.deepEqual(play.spellSlotsUsed, [0, 0]);
        assert.equal(play.hitDiceUsed, 0);
        assert.equal(play.exhaustion, 0);
    });
});

describe('carryForwardPlayState', () => {
    test('HP increases by the max-HP delta rather than resetting to full', () => {
        const oldDerived = fakeDerived({ hitPoints: 20 });
        const newDerived = fakeDerived({ hitPoints: 27, spellSlots: [4, 3, 2] });
        const damaged = { ...initialPlayState(oldDerived), currentHp: 12, gear: [{ name: 'Rope', qty: 1 }] };

        const carried = carryForwardPlayState(damaged, oldDerived, newDerived);

        // 12 HP with 20 max, gained 7 max HP -> 19, not reset to 27.
        assert.equal(carried.currentHp, 19);
        assert.deepEqual(carried.gear, [{ name: 'Rope', qty: 1 }]); // preserved
    });

    test('HP is capped at the new max even from a small delta', () => {
        const oldDerived = fakeDerived({ hitPoints: 20 });
        const newDerived = fakeDerived({ hitPoints: 21 });
        const full = { ...initialPlayState(oldDerived), currentHp: 20 };
        const carried = carryForwardPlayState(full, oldDerived, newDerived);
        assert.equal(carried.currentHp, 21);
    });

    test('XP carries forward untouched — leveling up never spends or resets it', () => {
        const derived = fakeDerived();
        const withXp = { ...initialPlayState(derived), xp: 2700 };
        const carried = carryForwardPlayState(withXp, derived, fakeDerived({ hitPoints: 27 }));
        assert.equal(carried.xp, 2700);
    });

    test('resources reset to the new maximums', () => {
        const oldDerived = fakeDerived({ spellSlots: [4, 3] });
        const newDerived = fakeDerived({ spellSlots: [4, 3, 2] });
        const spent = { ...initialPlayState(oldDerived), spellSlotsUsed: [4, 2], pactSlotsUsed: 1 };
        const carried = carryForwardPlayState(spent, oldDerived, newDerived);
        assert.deepEqual(carried.spellSlotsUsed, [0, 0, 0]);
        assert.equal(carried.pactSlotsUsed, 0);
    });
});

describe('rests', () => {
    test('short rest only resets pact slots', () => {
        const derived = fakeDerived();
        const sheet = { derived, play: { ...initialPlayState(derived), currentHp: 5, spellSlotsUsed: [3, 1], pactSlotsUsed: 2 } };
        const rested = applyShortRest(sheet);
        assert.equal(rested.play.currentHp, 5); // unchanged
        assert.deepEqual(rested.play.spellSlotsUsed, [3, 1]); // unchanged
        assert.equal(rested.play.pactSlotsUsed, 0);
    });

    test('long rest restores HP, slots, half hit dice, and one exhaustion level', () => {
        const derived = fakeDerived({ hitPoints: 30, totalLevel: 8, spellSlots: [4, 3] });
        const sheet = {
            derived,
            play: { ...initialPlayState(derived), currentHp: 3, spellSlotsUsed: [4, 3], hitDiceUsed: 6, exhaustion: 2 }
        };
        const rested = applyLongRest(sheet);
        assert.equal(rested.play.currentHp, 30);
        assert.deepEqual(rested.play.spellSlotsUsed, [0, 0]);
        assert.equal(rested.play.hitDiceUsed, 2); // 6 used - 4 recovered (half of 8)
        assert.equal(rested.play.exhaustion, 1);
        assert.deepEqual(rested.play.deathSaves, { successes: 0, failures: 0 });
    });

    test('long rest recovers at least 1 hit die even at low level', () => {
        const derived = fakeDerived({ totalLevel: 1 });
        const sheet = { derived, play: { ...initialPlayState(derived), hitDiceUsed: 1 } };
        const rested = applyLongRest(sheet);
        assert.equal(rested.play.hitDiceUsed, 0);
    });
});

describe('sanitizePlayState', () => {
    test('clamps out-of-range values a client PATCH might send', () => {
        const derived = fakeDerived({ hitPoints: 20, spellSlots: [4, 3], totalLevel: 4 });
        const dirty = { currentHp: -5, tempHp: -2, hitDiceUsed: 99, exhaustion: 12, spellSlotsUsed: [99, -1] };
        const clean = sanitizePlayState(dirty, derived);
        assert.equal(clean.currentHp, 0);
        assert.equal(clean.tempHp, 0);
        assert.equal(clean.hitDiceUsed, 4);
        assert.equal(clean.exhaustion, 6);
        assert.deepEqual(clean.spellSlotsUsed, [4, 0]);
    });

    test('currentHp can exceed max hit points by exactly the temp HP buffer', () => {
        const derived = fakeDerived({ hitPoints: 20, spellSlots: [] });
        const clean = sanitizePlayState({ currentHp: 25, tempHp: 5, spellSlotsUsed: [] }, derived);
        assert.equal(clean.currentHp, 25);
    });

    test('pact slots clamp to 0 when the character has no pact magic', () => {
        const derived = fakeDerived({ pactMagic: null, spellSlots: [] });
        const clean = sanitizePlayState({ currentHp: 10, pactSlotsUsed: 3, spellSlotsUsed: [] }, derived);
        assert.equal(clean.pactSlotsUsed, 0);
    });

    test('gear entries are normalized to {name, qty, weight}, including negative/garbage input', () => {
        const derived = fakeDerived({ spellSlots: [] });
        const clean = sanitizePlayState(
            { currentHp: 10, spellSlotsUsed: [], gear: [{ name: 'Rope', qty: -3, weight: 'heavy' }, { qty: 2, weight: 1.5 }] },
            derived
        );
        assert.deepEqual(clean.gear, [
            { name: 'Rope', qty: 0, weight: 0 },
            { name: '', qty: 2, weight: 1.5 }
        ]);
    });

    test('XP is clamped to a non-negative integer', () => {
        const derived = fakeDerived({ spellSlots: [] });
        assert.equal(sanitizePlayState({ currentHp: 10, spellSlotsUsed: [], xp: -500 }, derived).xp, 0);
        assert.equal(sanitizePlayState({ currentHp: 10, spellSlotsUsed: [], xp: 2700.9 }, derived).xp, 2700);
        assert.equal(sanitizePlayState({ currentHp: 10, spellSlotsUsed: [], xp: 'lots' }, derived).xp, 0);
        assert.equal(sanitizePlayState({ currentHp: 10, spellSlotsUsed: [], xp: 6500 }, derived).xp, 6500);
    });
});

describe('sanitizeGear', () => {
    test('a non-array input becomes an empty list rather than throwing', () => {
        assert.deepEqual(sanitizeGear(undefined), []);
        assert.deepEqual(sanitizeGear(null), []);
        assert.deepEqual(sanitizeGear('not an array'), []);
    });

    test('a blank row (still being typed) is kept, not dropped', () => {
        assert.deepEqual(sanitizeGear([{ name: '', qty: 1, weight: 0 }]), [{ name: '', qty: 1, weight: 0 }]);
    });
});

describe('initialPlayState with starting gear', () => {
    test('starting gear passed at character creation seeds the play state', () => {
        const derived = fakeDerived();
        const play = initialPlayState(derived, [{ name: 'Backpack', qty: 1, weight: 5 }]);
        assert.deepEqual(play.gear, [{ name: 'Backpack', qty: 1, weight: 5 }]);
    });

    test('no starting gear argument defaults to an empty list, as it always has', () => {
        const play = initialPlayState(fakeDerived());
        assert.deepEqual(play.gear, []);
    });
});
