// Persistence, using better-sqlite3.
//
// Schema follows the level-versioning design: `characters` is the roster entry, and
// `character_versions` holds one INDEPENDENT, permanently browsable row per level. Leveling
// up clones forward and inserts a new row — it never rewrites an old one. That's what lets
// you flip back to "what was this character like at level 3" after they've reached level 8.
//
// Each version row carries two JSON columns with different lifecycles:
//   choices    - the rules-engine INPUT that produced this version (species, background,
//                classes, ability scores, selections). Re-derivable, used to seed the next
//                level-up's defaults. Not hand-edited by players.
//   sheetData  - the OUTPUT: engine-derived stats at creation time, plus a `play` block
//                (current HP, spent spell slots, gear, notes, conditions). This is what
//                auto-save writes to during a session, and it drifts from `choices` on
//                purpose as the player plays — that's the whole point of the doc's design.

import Database from 'better-sqlite3';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdirSync } from 'node:fs';
import { randomUUID } from 'node:crypto';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

let db;

export function openDatabase(file = process.env.CB_DB || join(ROOT, 'data', 'characters.db')) {
    mkdirSync(dirname(file), { recursive: true });
    db = new Database(file);

    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');

    db.exec(`
        CREATE TABLE IF NOT EXISTS characters (
            id          TEXT PRIMARY KEY,
            name        TEXT NOT NULL,
            className   TEXT,
            edition     TEXT NOT NULL DEFAULT '2024',
            createdAt   TEXT NOT NULL DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS character_versions (
            id           INTEGER PRIMARY KEY AUTOINCREMENT,
            characterId  TEXT NOT NULL,
            level        INTEGER NOT NULL,
            choices      TEXT NOT NULL,
            sheetData    TEXT NOT NULL,
            createdAt    TEXT NOT NULL DEFAULT (datetime('now')),
            updatedAt    TEXT NOT NULL DEFAULT (datetime('now')),
            FOREIGN KEY (characterId) REFERENCES characters(id) ON DELETE CASCADE,
            UNIQUE(characterId, level)
        );

        CREATE INDEX IF NOT EXISTS idx_versions_character ON character_versions(characterId);
    `);

    return db;
}

function requireDb() {
    if (!db) throw new Error('Database not opened — call openDatabase() first.');
    return db;
}

function rowToVersion(row) {
    if (!row) return null;
    return {
        characterId: row.characterId,
        level: row.level,
        choices: JSON.parse(row.choices),
        sheetData: JSON.parse(row.sheetData),
        createdAt: row.createdAt,
        updatedAt: row.updatedAt
    };
}

// --- Roster --------------------------------------------------------------------------

export function listCharacters() {
    return requireDb().prepare('SELECT * FROM characters ORDER BY createdAt DESC').all();
}

export function getCharacterMeta(id) {
    return requireDb().prepare('SELECT * FROM characters WHERE id = ?').get(id) || null;
}

/**
 * Create a character and its first version in one transaction. `level` defaults to 1 for
 * normal character creation; the JSON import flow passes whatever level was exported, since
 * an imported character may already be well into its career.
 * @param {{name: string, className?: string, edition: string, choices: object, sheetData: object, level?: number}} args
 */
export function createCharacter({ name, className, edition, choices, sheetData, level = 1 }) {
    const id = randomUUID();
    const db = requireDb();

    const tx = db.transaction(() => {
        db.prepare('INSERT INTO characters (id, name, className, edition) VALUES (?, ?, ?, ?)').run(
            id,
            name,
            className || null,
            edition
        );
        db.prepare(
            `INSERT INTO character_versions (characterId, level, choices, sheetData)
             VALUES (?, ?, ?, ?)`
        ).run(id, level, JSON.stringify(choices), JSON.stringify(sheetData));
    });
    tx();

    return { id, versions: listVersionMeta(id) };
}

export function renameCharacter(id, { name, className }) {
    const result = requireDb()
        .prepare('UPDATE characters SET name = ?, className = ? WHERE id = ?')
        .run(name, className || null, id);
    return result.changes > 0;
}

export function deleteCharacter(id) {
    return requireDb().prepare('DELETE FROM characters WHERE id = ?').run(id).changes > 0;
}

// --- Versions --------------------------------------------------------------------------

export function listVersionMeta(characterId) {
    return requireDb()
        .prepare('SELECT level, createdAt, updatedAt FROM character_versions WHERE characterId = ? ORDER BY level ASC')
        .all(characterId);
}

export function getVersion(characterId, level) {
    return rowToVersion(
        requireDb()
            .prepare('SELECT * FROM character_versions WHERE characterId = ? AND level = ?')
            .get(characterId, Number(level))
    );
}

export function getHighestLevel(characterId) {
    const row = requireDb()
        .prepare('SELECT MAX(level) AS lvl FROM character_versions WHERE characterId = ?')
        .get(characterId);
    return row?.lvl ?? null;
}

/** Auto-save target: overwrite THIS version's sheetData in place. Never touches other levels. */
export function updateVersionSheet(characterId, level, sheetData) {
    const result = requireDb()
        .prepare(
            `UPDATE character_versions SET sheetData = ?, updatedAt = datetime('now')
             WHERE characterId = ? AND level = ?`
        )
        .run(JSON.stringify(sheetData), characterId, Number(level));
    return result.changes > 0;
}

/**
 * Level up: insert a brand-new row. Never mutates the version it was cloned from.
 * Throws (via the UNIQUE constraint) if that level already exists for this character.
 */
export function insertVersion(characterId, level, choices, sheetData) {
    requireDb()
        .prepare(
            `INSERT INTO character_versions (characterId, level, choices, sheetData) VALUES (?, ?, ?, ?)`
        )
        .run(characterId, level, JSON.stringify(choices), JSON.stringify(sheetData));
    return getVersion(characterId, level);
}

/** Delete a single historical version (not the whole character). Keeps at least one behind. */
export function deleteVersion(characterId, level) {
    const remaining = listVersionMeta(characterId).length;
    if (remaining <= 1) return false; // a character must always have at least one version
    return requireDb()
        .prepare('DELETE FROM character_versions WHERE characterId = ? AND level = ?')
        .run(characterId, Number(level)).changes > 0;
}
