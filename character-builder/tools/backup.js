// Back up the character database.
//
//   node tools/backup.js [destination-dir]
//
// Uses SQLite's VACUUM INTO rather than copying the file. A plain file copy of a live
// WAL-mode database can capture a torn state — the .db without its .db-wal — which
// restores as silently stale data. VACUUM INTO produces a consistent, compacted snapshot
// while the server keeps running.
//
// Character data is the one thing here that isn't reproducible from git, so schedule this.
// Windows Task Scheduler, nightly:
//   node E:\jawa9000.github.io\character-builder\tools\backup.js
// Then copy the output off this machine — a backup on the same disk is not a backup.

import Database from 'better-sqlite3';
import { mkdirSync, existsSync, readdirSync, statSync, unlinkSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = process.env.CB_DB || join(ROOT, 'data', 'characters.db');
const DEST_DIR = process.argv[2] || join(ROOT, 'backups');
const KEEP = Number(process.env.CB_BACKUP_KEEP || 30);

if (!existsSync(SOURCE)) {
    console.error(`No database at ${SOURCE} — nothing to back up.`);
    process.exit(1);
}

mkdirSync(DEST_DIR, { recursive: true });

const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const dest = join(DEST_DIR, `characters-${stamp}.db`);

const db = new Database(SOURCE, { readonly: true });
try {
    // Single-quoted SQL string literal; the path is ours, not user input.
    db.exec(`VACUUM INTO '${dest.replace(/'/g, "''")}'`);
} finally {
    db.close();
}

const { size } = statSync(dest);
console.log(`Backed up ${SOURCE} -> ${dest} (${(size / 1024).toFixed(1)} KB)`);

// Retain the most recent KEEP snapshots.
const snapshots = readdirSync(DEST_DIR)
    .filter((f) => /^characters-.*\.db$/.test(f))
    .sort()
    .reverse();

for (const stale of snapshots.slice(KEEP)) {
    unlinkSync(join(DEST_DIR, stale));
    console.log(`Pruned old backup: ${stale}`);
}
