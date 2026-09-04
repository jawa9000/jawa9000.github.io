# D&D Character Manager

A self-hosted D&D 5e character manager supporting both the 2014 and 2024 rules, designed
to run directly on a Raspberry Pi — no Docker, no build step.

- **Rules-driven creation.** A grant-based rules engine derives stats from choices
  (species, background, class, ability scores) instead of you typing HP and AC by hand.
- **Level history.** Leveling up doesn't overwrite your character — it snapshots a new,
  independent, permanently browsable version. You can flip back to "what was this
  character like at level 3" after they've reached level 8.
- **Session tools.** Current HP, spell slot tracking, short/long rest, a click-to-roll
  dice log, gear, and notes — all auto-saved as you play.

---

## Quick start

```sh
cd character-builder
npm install         # express, better-sqlite3
npm run dev          # http://localhost:3000
npm test              # 47 tests: engine, versioning, and db layers
```

`npm start` is identical to `npm run dev` right now — there's no auth yet to strip out
for development (see **Security**, below).

## How it fits together

```
engine/     Pure rules engine, zero Node-specific imports — the BROWSER RUNS THE SAME
            CODE as the server (served at /engine/). Live preview can't drift from what
            gets derived and saved. No edition branching: 2014 vs 2024 differences live
            entirely in data/ (see engine/grants.js for the grant-type catalogue).
data/       2024/, 2014/, common/ — rules-engine content packs (species, classes,
            backgrounds, armor) that FEED the engine.
            compendium/ — flat reference JSON (spells, feats, magic items) for lookup,
            served as-is via /api/compendium/:type. Deliberately separate from the
            packs above: dropping a file in here can't change how a saved character
            derives.
server/     Express app. db.js (better-sqlite3, the versioned schema), versioning.js
            (level-up/rest logic bridging the engine to persistence), content.js /
            compendium.js (loading the two data/ trees above).
web/        Alpine.js + Tailwind (CDN) single-page UI: roster, Build panel (create/level
            up, with live preview), Play panel (session sheet).
deploy/     systemd unit for running this as a service on the Pi.
tools/      backup.js
test/       engine, versioning, and db tests (node --test).
```

### The data model: choices produce a version, a version is played

A **character** is a roster entry (name, edition). A **version** is one row per level:

```
choices    the rules-engine INPUT that produced this version — species, background,
           classes, ability scores, selections. Re-derivable; feeds the next level-up.
sheetData  { derived, play }
  derived  the engine's OUTPUT at creation time — max HP, AC, saves, spell slots.
           Static. Only a NEW level-up changes this; nothing else writes to it.
  play     session state — current HP, spent slots, gear, notes. This is what
           auto-save and the rest endpoints mutate, in place, on THIS version only.
```

Leveling up (`POST /api/characters/:id/levelup`) re-derives from updated choices and
**inserts a new row** — it never rewrites the version it was cloned from. `play` state
carries forward (gear, notes, current HP adjusted by the max-HP delta, not reset to
full) while `derived` is computed fresh. See `server/versioning.js` and
`test/db.test.js` for the exact rules, including why HP carries forward as a delta
rather than resetting.

### Edition differences live in data, never in code

There is no `if (edition === '2024')` anywhere in the engine. Every benefit — an ability
score bump, a proficiency, a feature — is a *grant* the engine interprets. The 2024
rules move ability score increases from species to background; that shows up as an
`ability` grant present in `data/2024/backgrounds.json` and absent from
`data/2014/backgrounds.json`. Same engine, different JSON. A third edition means a new
directory, not new code.

## Deploying to a Raspberry Pi

```sh
sudo apt install -y nodejs npm build-essential python3   # build-essential/python3: only
                                                            # needed if better-sqlite3 has
                                                            # no prebuilt binary for your
                                                            # Pi's arch/Node version
git clone <this repo> && cd jawa9000.github.io/character-builder
npm install
sudo cp deploy/dnd-character-manager.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now dnd-character-manager
```

The app binds `0.0.0.0:3000` by default (`CB_HOST` / `CB_PORT` to change). There is
**no reverse proxy or Docker layer required** — it's a normal Node process a systemd
unit keeps alive across reboots and crashes.

### Remote access (not yet wired up)

Nothing here currently limits access beyond your LAN. If you want players reachable
from off-network, `cloudflared` installs directly on Raspberry Pi OS as a `.deb` — no
Docker needed — and can front this the same way it would in a containerized setup, with
Cloudflare Access gating who gets in. That's a network/systemd config step independent
of anything in this codebase; nothing here needs to change to add it later.

## Security

**There is none yet, on purpose** — single shared roster, no login, no per-player
isolation. It's LAN-trusted for now. When auth is added, the natural seam is a
middleware in `server/index.js` that sets `req.owner` before the route handlers run,
plus an `owner` column on `characters` — nothing in the current schema or routes
assumes single-tenant in a way that would fight that change.

## Content and copyright

`data/2024/`, `data/2014/`, `data/common/`, and `data/compendium/` hold SRD 5.1/5.2
content, licensed CC-BY-4.0 and safe to publish. **This repo is public.**

Non-SRD material — subclasses, feats, and backgrounds from Xanathar's, Tasha's,
Fizban's, and similar — belongs in `data/packs-private/<edition>/` (merged over the
rules-engine packs) or `data/compendium-private/` (merged over the reference
compendium). Both are gitignored and must never be committed.

## Backups

Character data is the only thing here git doesn't already back up.

```sh
node tools/backup.js [destination-dir]
```

Uses `VACUUM INTO`, not a file copy — copying a live WAL-mode database can capture a
torn state that restores as silently stale data. Schedule it nightly via cron and
**copy the output to another machine**; a backup on the same SD card is not a backup.

## Status

**Built and verified:** the rules engine (grant system, multiclass spell-slot math,
2014/2024 divergence — see `test/rules.test.js`), the versioned persistence layer
(independent per-level snapshots, verified in `test/db.test.js` to never mutate a prior
level), rest/resource logic (`test/versioning.test.js`), and the full HTTP API —
create, level up, auto-save, rest, export, import — smoke-tested end to end.

**Present but intentionally thin:** Wizard and Cleric carry only enough detail to
exercise multiclass spell-slot math — no feature lists or spell selection yet. The
Build form only edits a single class line; multiclassing works in the engine and via
JSON import, just not through the UI yet.

**Not built yet:** the remaining classes/subclasses/feats, equipment beyond armor,
spell selection (though `fun/Spells/spells.json` is ready to fold into
`data/compendium/spells.json`), a level-up wizard that walks new choices one at a time
instead of re-showing the whole build form, and remote access.
