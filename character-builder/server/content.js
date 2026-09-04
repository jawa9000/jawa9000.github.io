// Content pack loading.
//
// A single unified content pool — species, classes, backgrounds, armor — with no edition
// split. Non-SRD packs land in `data/packs-private/` and are merged on top; that
// directory is gitignored because this repo is public.

import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(ROOT, 'data');
const PRIVATE = join(DATA, 'packs-private');

let cache = null;

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

/** Load and cache the merged content index. Private packs override public ones on key collision. */
export async function loadContent() {
    if (cache) return cache;

    const [species, classes, backgrounds, armor, pSpecies, pClasses, pBackgrounds] = await Promise.all([
        readJson(join(DATA, 'species.json')),
        readJson(join(DATA, 'classes.json')),
        readJson(join(DATA, 'backgrounds.json')),
        readJson(join(DATA, 'armor.json')),
        readIfPresent(join(PRIVATE, 'species.json')),
        readIfPresent(join(PRIVATE, 'classes.json')),
        readIfPresent(join(PRIVATE, 'backgrounds.json'))
    ]);

    cache = {
        species: { ...species, ...pSpecies },
        classes: { ...classes, ...pClasses },
        backgrounds: { ...backgrounds, ...pBackgrounds },
        armor
    };
    return cache;
}

/** Drop the cache so edits to the JSON packs show up without a restart. */
export function invalidateContent() {
    cache = null;
}

/** Compact listing for the builder UI — ids and names only, not full grant trees. */
export async function contentSummary() {
    const content = await loadContent();
    const brief = (map) => Object.values(map).map((e) => ({ id: e.id, name: e.name, source: e.source }));

    return {
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
