// The reference compendium: /api/compendium/:type reading data/compendium/<type>.json directly.
//
// This is deliberately separate from content.js (which loads the edition-scoped species/
// classes/backgrounds packs that FEED the rules engine's grant system). The compendium is
// flat, un-merged, reference-only data — spells, feats, magic items — for lookup and for
// the level-up UI to browse, not for the engine to compute from. Keeping them apart means
// dropping a new spells.json in here can't accidentally change how a saved character derives.
//
// Files are plain JSON on disk so other local tools can read or edit them directly, per the
// original design brief. data/compendium-private/ overlays data/compendium/ the same way
// packs-private overlays the edition packs, for non-SRD reference content that can't be
// published in this public repo.

import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = join(ROOT, 'data', 'compendium');
const PRIVATE_DIR = join(ROOT, 'data', 'compendium-private');

const VALID_TYPE = /^[a-z0-9_-]+$/i;

/**
 * @param {string} type e.g. "spells", "feats", "classes"
 * @returns {Promise<any|null>} parsed JSON (private overrides public), or null if neither exists
 */
export async function readCompendium(type) {
    if (!VALID_TYPE.test(type)) return null;

    const privatePath = join(PRIVATE_DIR, `${type}.json`);
    const publicPath = join(PUBLIC_DIR, `${type}.json`);
    const path = existsSync(privatePath) ? privatePath : existsSync(publicPath) ? publicPath : null;
    if (!path) return null;

    return JSON.parse(await readFile(path, 'utf8'));
}

/** Which compendium types currently have a file, for a "what's available" listing in the UI. */
export async function listCompendiumTypes() {
    const names = new Set();
    for (const dir of [PUBLIC_DIR, PRIVATE_DIR]) {
        if (!existsSync(dir)) continue;
        for (const f of await readdir(dir)) {
            if (f.endsWith('.json')) names.add(f.slice(0, -'.json'.length));
        }
    }
    return [...names].sort();
}
