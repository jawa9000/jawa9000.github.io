import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

import { XP_THRESHOLDS, MAX_LEVEL, levelForXp, xpToNextLevel } from '../engine/experience.js';

describe('levelForXp', () => {
    test('0 XP is level 1', () => {
        assert.equal(levelForXp(0), 1);
    });

    test('exactly on a threshold reaches that level', () => {
        assert.equal(levelForXp(300), 2);
        assert.equal(levelForXp(355000), 20);
    });

    test('one XP short of a threshold stays at the lower level', () => {
        assert.equal(levelForXp(299), 1);
        assert.equal(levelForXp(2699), 3);
    });

    test('XP between thresholds resolves to the level already reached', () => {
        assert.equal(levelForXp(1500), 3); // between the level-3 (900) and level-4 (2700) thresholds
    });

    test('XP beyond the level-20 threshold still caps at 20', () => {
        assert.equal(levelForXp(999999), 20);
    });
});

describe('xpToNextLevel', () => {
    test('reports the exact gap to the next threshold', () => {
        assert.equal(xpToNextLevel(0), 300);
        assert.equal(xpToNextLevel(250), 50);
        assert.equal(xpToNextLevel(900), 1800); // just hit level 3, level 4 needs 2700
    });

    test('returns null at max level — there is no next threshold', () => {
        assert.equal(xpToNextLevel(355000), null);
        assert.equal(xpToNextLevel(999999), null);
    });
});

describe('table shape', () => {
    test('has exactly MAX_LEVEL entries, starting at 0 and strictly increasing', () => {
        assert.equal(XP_THRESHOLDS.length, MAX_LEVEL);
        assert.equal(XP_THRESHOLDS[0], 0);
        for (let i = 1; i < XP_THRESHOLDS.length; i++) {
            assert.ok(XP_THRESHOLDS[i] > XP_THRESHOLDS[i - 1], `threshold ${i} must exceed threshold ${i - 1}`);
        }
    });
});
