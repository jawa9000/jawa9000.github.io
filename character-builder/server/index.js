// D&D Character Manager server. Express + better-sqlite3, run directly with `node
// server/index.js` on the Pi — no Docker, no reverse proxy required to function.
//
// AUTH: none yet, by design — this phase is single-shared-roster, LAN-trusted, no login.
// When auth is added later, the natural seam is a middleware here that sets `req.owner`
// before the route handlers run, plus an `owner` column on `characters`. Nothing below
// assumes single-tenant in a way that would fight that change.

import express from 'express';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
    openDatabase,
    listCharacters,
    getCharacterMeta,
    createCharacter,
    renameCharacter,
    deleteCharacter,
    listVersionMeta,
    getVersion,
    getHighestLevel,
    updateVersionSheet,
    insertVersion,
    deleteVersion
} from './db.js';
import { loadContent, contentSummary, invalidateContent, EDITIONS } from './content.js';
import { readCompendium, listCompendiumTypes } from './compendium.js';
import { deriveCharacter } from '../engine/rules.js';
import {
    initialPlayState,
    buildSheetData,
    carryForwardPlayState,
    applyShortRest,
    applyLongRest,
    sanitizePlayState
} from './versioning.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const WEB = join(ROOT, 'web');
const ENGINE = join(ROOT, 'engine');

const PORT = Number(process.env.CB_PORT || 3000);
const HOST = process.env.CB_HOST || '0.0.0.0';

const app = express();
app.use(express.json());
app.use(express.static(WEB, { cacheControl: false }));
// The engine is pure ESM with no Node-only imports, so the browser runs the exact same
// derivation code the server does — live preview can't drift from what gets saved.
app.use('/engine', express.static(ENGINE, { cacheControl: false }));

function classLineOf(sheet) {
    return sheet.classLine === '—' ? null : sheet.classLine;
}

// --- Roster ----------------------------------------------------------------------------

app.get('/api/characters', (req, res) => {
    res.json({ characters: listCharacters() });
});

app.post('/api/characters', async (req, res, next) => {
    try {
        const { name, edition = '2024', choices } = req.body || {};
        if (!name || !choices) return res.status(400).json({ error: 'name and choices are required' });
        if (!EDITIONS.includes(edition)) return res.status(400).json({ error: `Unknown edition: ${edition}` });

        const content = await loadContent(edition);
        const derived = deriveCharacter({ ...choices, name, edition }, content);
        const sheetData = buildSheetData(derived, initialPlayState(derived));

        const created = createCharacter({ name, className: classLineOf(derived), edition, choices, sheetData });
        res.status(201).json({ id: created.id, versions: created.versions, sheet: sheetData });
    } catch (err) {
        next(err);
    }
});

// Restore a single exported version JSON (see web/app.js exportVersion) as a brand-new
// character. Re-derives from the imported choices rather than trusting the imported
// `derived` block, so importing onto a since-updated content pack self-corrects instead
// of carrying forward stale math; the imported play state (HP, gear, notes) is kept as-is.
app.post('/api/characters/import', async (req, res, next) => {
    try {
        const { name, edition = '2024', level = 1, choices, play } = req.body || {};
        if (!name || !choices) return res.status(400).json({ error: 'name and choices are required' });
        if (!EDITIONS.includes(edition)) return res.status(400).json({ error: `Unknown edition: ${edition}` });

        const content = await loadContent(edition);
        const derived = deriveCharacter({ ...choices, name, edition }, content);
        const sheetData = buildSheetData(derived, sanitizePlayState(play || initialPlayState(derived), derived));

        const created = createCharacter({
            name,
            className: classLineOf(derived),
            edition,
            choices,
            sheetData,
            level: Number(level) || 1
        });
        res.status(201).json({ id: created.id, level: Number(level) || 1, sheet: sheetData });
    } catch (err) {
        next(err);
    }
});

app.put('/api/characters/:id', (req, res) => {
    const { name, className } = req.body || {};
    if (!name) return res.status(400).json({ error: 'name is required' });
    const ok = renameCharacter(req.params.id, { name, className });
    if (!ok) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
});

app.delete('/api/characters/:id', (req, res) => {
    res.status(deleteCharacter(req.params.id) ? 204 : 404).end();
});

// --- Versions ----------------------------------------------------------------------------

app.get('/api/characters/:id/versions', (req, res) => {
    const meta = getCharacterMeta(req.params.id);
    if (!meta) return res.status(404).json({ error: 'Not found' });
    res.json({ character: meta, versions: listVersionMeta(req.params.id) });
});

app.get('/api/characters/:id/version/:level', (req, res) => {
    const version = getVersion(req.params.id, req.params.level);
    if (!version) return res.status(404).json({ error: 'Version not found' });
    res.json(version);
});

// Auto-save target: overwrites THIS level's sheetData only. Debounced client-side.
app.put('/api/characters/:id/version/:level', (req, res) => {
    const existing = getVersion(req.params.id, req.params.level);
    if (!existing) return res.status(404).json({ error: 'Version not found' });

    const incoming = req.body || {};
    const sheetData = {
        derived: existing.sheetData.derived, // static capability — only a level-up changes this
        play: sanitizePlayState({ ...existing.sheetData.play, ...incoming.play }, existing.sheetData.derived)
    };

    updateVersionSheet(req.params.id, req.params.level, sheetData);
    res.json({ ok: true, sheetData });
});

app.delete('/api/characters/:id/version/:level', (req, res) => {
    const ok = deleteVersion(req.params.id, req.params.level);
    if (!ok) return res.status(409).json({ error: 'Cannot delete the only remaining version' });
    res.status(204).end();
});

/**
 * Level up: derive a fresh sheet from updated choices, snapshot it as a new version, and
 * carry play state (gear, notes, HP-with-delta) forward. The base level and its siblings
 * are never touched — this only ever inserts.
 */
app.post('/api/characters/:id/levelup', async (req, res, next) => {
    try {
        const meta = getCharacterMeta(req.params.id);
        if (!meta) return res.status(404).json({ error: 'Not found' });

        const baseLevel = Number(req.body?.fromLevel) || getHighestLevel(req.params.id);
        const base = getVersion(req.params.id, baseLevel);
        if (!base) return res.status(404).json({ error: `Version ${baseLevel} not found` });

        // New choices: whatever the client sends (typically the base choices plus one more
        // class level and any newly-available selections), falling back to the base's own
        // choices unchanged so this endpoint also works as a "re-derive this level" tool.
        const newChoices = req.body?.choices || base.choices;
        const newLevel = req.body?.toLevel || baseLevel + 1;

        if (getVersion(req.params.id, newLevel)) {
            return res.status(409).json({ error: `Level ${newLevel} already exists for this character` });
        }

        const content = await loadContent(meta.edition);
        const newDerived = deriveCharacter({ ...newChoices, name: meta.name, edition: meta.edition }, content);
        const newPlay = carryForwardPlayState(base.sheetData.play, base.sheetData.derived, newDerived);
        const sheetData = buildSheetData(newDerived, newPlay);

        insertVersion(req.params.id, newLevel, newChoices, sheetData);
        renameCharacter(req.params.id, { name: meta.name, className: classLineOf(newDerived) });

        res.status(201).json({ level: newLevel, sheetData });
    } catch (err) {
        next(err);
    }
});

// Live preview while building/leveling, without writing anything.
app.post('/api/preview', async (req, res, next) => {
    try {
        const { edition = '2024', choices } = req.body || {};
        if (!EDITIONS.includes(edition)) return res.status(400).json({ error: `Unknown edition: ${edition}` });
        const content = await loadContent(edition);
        res.json({ sheet: deriveCharacter({ ...choices, edition }, content) });
    } catch (err) {
        next(err);
    }
});

// --- Tabletop session utilities ---------------------------------------------------------
// Dice rolling is client-side (web/app.js) — no server round trip needed for randomness.
// Rest handlers live server-side because they're the one place resource-reset RULES live,
// and rules belong next to the engine, not duplicated in the browser.

app.post('/api/characters/:id/version/:level/rest', (req, res) => {
    const version = getVersion(req.params.id, req.params.level);
    if (!version) return res.status(404).json({ error: 'Version not found' });

    const kind = req.body?.type;
    if (kind !== 'short' && kind !== 'long') return res.status(400).json({ error: 'type must be "short" or "long"' });

    const sheetData = kind === 'short' ? applyShortRest(version.sheetData) : applyLongRest(version.sheetData);
    updateVersionSheet(req.params.id, req.params.level, sheetData);
    res.json({ ok: true, sheetData });
});

// --- Content (rules-engine packs) --------------------------------------------------------

app.get('/api/content', async (req, res, next) => {
    try {
        const edition = req.query.edition || '2024';
        if (!EDITIONS.includes(edition)) return res.status(400).json({ error: `Unknown edition: ${edition}` });
        res.json(await contentSummary(edition));
    } catch (err) {
        next(err);
    }
});

app.get('/api/content/detail', async (req, res, next) => {
    try {
        const edition = req.query.edition || '2024';
        if (!EDITIONS.includes(edition)) return res.status(400).json({ error: `Unknown edition: ${edition}` });
        res.json(await loadContent(edition));
    } catch (err) {
        next(err);
    }
});

app.post('/api/content/reload', (req, res) => {
    invalidateContent();
    res.json({ reloaded: true });
});

// --- Compendium (flat reference JSON: spells, feats, magic items, ...) -------------------

app.get('/api/compendium', async (req, res) => {
    res.json({ types: await listCompendiumTypes() });
});

app.get('/api/compendium/:type', async (req, res) => {
    const data = await readCompendium(req.params.type);
    if (data === null) return res.status(404).json({ error: `No compendium dataset named "${req.params.type}"` });
    res.json(data);
});

// --- Errors ------------------------------------------------------------------------------

app.use((req, res) => res.status(404).json({ error: 'No such endpoint' }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(`${req.method} ${req.originalUrl} failed:`, err);
    res.status(500).json({ error: 'Internal error' });
});

openDatabase();

app.listen(PORT, HOST, () => {
    console.log(`D&D Character Manager listening on http://${HOST}:${PORT}`);
});
