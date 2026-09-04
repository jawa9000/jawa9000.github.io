// Content pack loading.
//
// Packs are plain JSON on disk, indexed by edition. `data/common/` holds anything the
// two editions genuinely share (armor, for instance). Later, non-SRD packs land in
// `data/packs-private/<edition>/` and are merged on top — that directory is gitignored
// because this repo is public.

import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(ROOT, 'data');
const PRIVATE = join(DATA, 'packs-private');

export const EDITIONS = ['2024', '2014'];

const cache = new Map();

async function readJson(path) {
    const raw = await readFile(path, 'utf8');
    const parsed = JSON.parse(raw);
    // Keys starting with "_" are editorial notes for humans reading the pack, not content.
    for (const key of Object.keys(parsed)) {
        if (key.startsWith('_')) delete parsed[key];
    }
    return parsed;
}

async function readIfPresent(path) {
    return existsSync(path) ? readJson(path) : {};
}

/**
 * Load and cache the merged content index for one edition.
 * Private packs override public ones on key collision.
 */
export async function loadContent(edition) {
    if (!EDITIONS.includes(edition)) throw new Error(`Unknown edition: ${edition}`);
    if (cache.has(edition)) return cache.get(edition);

    const pub = join(DATA, edition);
    const priv = join(PRIVATE, edition);

    const [species, classes, backgrounds, armor, pSpecies, pClasses, pBackgrounds] = await Promise.all([
        readJson(join(pub, 'species.json')),
        readJson(join(pub, 'classes.json')),
        readJson(join(pub, 'backgrounds.json')),
        readJson(join(DATA, 'common', 'armor.json')),
        readIfPresent(join(priv, 'species.json')),
        readIfPresent(join(priv, 'classes.json')),
        readIfPresent(join(priv, 'backgrounds.json'))
    ]);

    const content = {
        edition,
        species: { ...species, ...pSpecies },
        classes: { ...classes, ...pClasses },
        backgrounds: { ...backgrounds, ...pBackgrounds },
        armor
    };

    cache.set(edition, content);
    return content;
}

/** Drop the cache so edits to the JSON packs show up without a restart. */
export function invalidateContent() {
    cache.clear();
}

/** Compact listing for the builder UI — ids and names only, not full grant trees. */
export async function contentSummary(edition) {
    const content = await loadContent(edition);
    const brief = (map) => Object.values(map).map((e) => ({ id: e.id, name: e.name, source: e.source }));

    return {
        edition,
        species: brief(content.species),
        backgrounds: brief(content.backgrounds),
        classes: Object.values(content.classes).map((c) => ({
            id: c.id,
            name: c.name,
            source: c.source,
            hitDie: c.hitDie,
            subclasses: Object.values(c.subclasses || {}).map((s) => ({ id: s.id, name: s.name }))
        })),
        armor: Object.values(content.armor).map((a) => ({
            id: a.id,
            name: a.name,
            category: a.category,
            baseAC: a.baseAC
        }))
    };
}
