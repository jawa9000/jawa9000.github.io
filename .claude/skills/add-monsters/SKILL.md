---
name: add-monsters
description: Add official D&D 5e monster stat blocks to fun/Encounter_Builder/monsters.js from a list of monster names, sourced from real published books via 5etools' data repo.
---

# Add Monsters to the Encounter Builder

You will be given a list of monster names (in chat, or pulled from
`fun/Encounter_Builder/to-do list.md`). For each one, find its official D&D 5e stat block and add
it to `fun/Encounter_Builder/monsters.js` in this repo's existing schema. Follow every step below —
do not skip steps or shortcut with guessed stats.

## 0. Setup
Use the session scratchpad directory for all intermediate files (downloaded bestiary JSON,
conversion scripts, scratch copies of monsters.js). Never edit files outside the repo except
scratch/temp files.

## 1. Scope the batch
Take the requested names as given. If a name is grouped or plural (e.g. "Sea Serpents (Ancient,
Young)"), split it into the individual real monster names it implies.

## 2. Check for existing duplicates FIRST
Before any research, run:
  Grep pattern: "?name"?:\s*"(Name1|Name2|...)"   against fun/Encounter_Builder/monsters.js
Anything that already exists — even under different casing, pluralization, or spacing — is
already done. Skip it. Never create a second entry for the same monster.

## 3. Identify the source book for each remaining name
Use WebSearch with queries shaped like:
  "<Monster Name>" 5e.tools bestiary site:5e.tools
The 5e.tools URL slug encodes the source book abbreviation (e.g. flying-shield-tftyp.html →
TftYP). Do NOT trust a search engine's prose summary of the monster's stats — those are
frequently wrong, hallucinated, or based on the wrong edition/printing. At this stage you only
need the correct SOURCE ABBREVIATION, not the stats themselves.

If a name doesn't turn up a 5e.tools page under a plausible spelling after 2-3 search variations,
it may not be an official monster at all (a common outcome — some user-provided lists include
homebrew names, generic template creatures like "Fish" or "Fly" that were never given their own
stat block, or grouped/synonym names). Do not fabricate a stat block for these. Note them as
unresolved and move on — you'll report them at the end.

## 4. Download the real data — do not rely on WebFetch for this
For every distinct source abbreviation you found, download the actual machine-readable bestiary
file:
  curl -sL "https://raw.githubusercontent.com/5etools-mirror-3/5etools-src/main/data/bestiary/bestiary-<abbr-lowercase>.json" -o bestiary-<abbr>.json
(into the scratchpad). This is the authoritative 5etools dataset that powers the actual site.
WebFetch on these files is unreliable — for anything but the smallest files it silently
summarizes/truncates before reaching entries later in the alphabet, producing wrong or missing
data with no warning. Downloading and grepping/parsing locally is the only reliable method for
files over ~100KB.
If you don't know the abbreviation-to-filename mapping, fetch
  https://raw.githubusercontent.com/5etools-mirror-3/5etools-src/main/data/bestiary/index.json
which lists every official source abbreviation and its file name.

## 5. Extract each monster's raw JSON object
Write a short Node script (in the scratchpad) that JSON.parses each downloaded file and finds
the object whose "name" matches (case-insensitive), saving each to its own OUT_<name>.json.

Watch for `_copy`: some monsters are defined only as "this is <Other Monster> from <Source>, with
these text-substitution/field patches" (5etools' reprint/reskin mechanism — e.g. "Flying Shield"
is "Flying Sword" with every occurrence of "sword" replaced by "shield"). These need the BASE
monster's full stats too (check fun/Encounter_Builder/monsters.js first — the base is very often
already there) before you can construct the final entry by hand; they can't go through the
generic converter in step 6.

## 6. Convert each non-_copy monster into this project's schema
This project's monster objects look like (see any existing entry in monsters.js for a live
example):
  {
    "name": ..., "size": ..., "type": ..., "alignment": ...,
    "environments": [...], "associates": [...],
    "armor class": <number>, "hit points": "<avg> (<formula>)",
    "speed": { "surface": {"movement": N}, "fly": {...}, "swim": {...}, ... },
    "str": N, "dex": N, "con": N, "int": N, "wis": N, "cha": N,
    "saving throws": "STR +X, DEX +Y, ...", "skills": "Skill +X, ...",
    "damage immunities": [...], "damage resistances": [...], "damage vulnerabilities": [...],
    "condition immunities": "A, B, C", "senses": {"Darkvision": {"range": 60}},
    "languages": "...", "challenge": "<cr> (<xp> XP)",
    "traits": "<p><em><strong>Name.</strong></em> body</p>...",
    "actions": "<p>...same pattern...</p>",
    "bonus actions": "...", "reactions": "...", "legendary actions": "...",
    "description": "<p>...</p>"
  }
Write a small, disposable Node converter (fresh each run, in the scratchpad) that maps the
5etools JSON into this shape:
- size/type/alignment letter-codes → the words this project uses (T/S/M/L/H/G →
  Tiny/Small/.../Gargantuan; L/N/C/G/E/U/A → Lawful/Neutral/.../Any Alignment).
- Compute "challenge" as "<cr> (<XP> XP)" using the standard 5e CR→XP table (source JSON only
  has the bare CR).
- Strip 5etools' `{@tag ...}` markup out of every trait/action/bonus/reaction/legendary entry
  into plain prose, formatted as `<p><em><strong>Name.</strong></em> body</p>` per entry,
  concatenated. Key tags to handle: {@atk mw/rw/ms/rs} → "Melee/Ranged Weapon/Spell Attack:"
  (combine cleanly, e.g. "Melee or Ranged Weapon Attack:" not "Melee Weapon or Ranged Weapon
  Attack:"), {@atkr m/r} → 2024-style "Melee/Ranged Attack Roll:", {@hit N} → "+N", {@dc N} →
  "DC N", {@damage ...} → the dice text as-is, {@h} → "Hit: " (with the space), {@recharge N} →
  "(Recharge N-6)", {@condition}/{@status}/{@skill}/{@spell}/{@item}/{@creature}/{@variantrule} →
  their plain display text, {@actSave dex} → "Dexterity Saving Throw:", {@actSaveFail}/
  {@actSaveSuccess} → "Failure:"/"Success:" (2024-style structured actions).
- Downcase 2024-Monster-Manual-style mid-sentence capitalization that would look wrong in this
  project's 2014-style prose (e.g. "8 (2d6+2) Bludgeoning damage" → "...bludgeoning damage",
  "the Cone" → "the cone", "Grappled condition" → "grappled") — but only mid-sentence, never at
  the start of a clause.
- Fold any "variant"/optional-rule text from the source (e.g. an optional boon table) into a
  "notes" field rather than inventing separate monster entries for it, unless the user
  specifically asked for those variants by name.
- `environments`/`associates`/`description` are NOT in the source data. Infer plausible values
  (cross-link to other monsters in the same batch or existing thematically-related entries in
  monsters.js) but do not present them as verified — flag them as your own inference in the
  final report.

## 7. Never guess when something doesn't resolve
If, after steps 3-4, a requested name is confirmed to not exist as any official monster (not a
duplicate, not a source-abbreviation issue — genuinely no published stat block under that name or
a close variant of it), do NOT invent one. This project's own to-do list says it best: "Don't
guess on anything. If you don't know, add a note to that property. If a property has no value,
don't add it to the JSON object." Same principle applies here at the whole-monster level — skip
it and report it clearly instead of fabricating stats.

## 8. Splice into monsters.js safely
The file is large (tens of thousands of lines) — don't try to do a single giant Edit call.
Instead, in the scratchpad:
  head -n <N> monsters.js > part1.js      # everything up to the last existing "// >>" marker
  tail -n +<N+1> monsters.js > part2.js   # the rest (closing "]" and the module.exports line)
Build the new entries as JS object literals (JSON.stringify with 2-space indent works fine as a
JS object literal), each preceded by its own "  // >>\n" marker line (this project's convention
for "please review this specific entry"), and concatenate part1 + new-entries + part2.

## 9. Validate BEFORE touching the real file
On the scratch copy:
  node -e "const fs=require('fs'); const s=fs.readFileSync('<scratch-file>','utf8'); const m=eval(s+';monsters'); console.log(m.length); const names=m.map(x=>x.name); console.log(names.filter((n,i)=>names.indexOf(n)!==i));"
Confirm: (a) it parses without throwing, (b) the total count increased by exactly the number of
new monsters you intended to add, (c) there are zero duplicate names.
If a duplicate name turns up, that monster was already added (by you earlier in the session, by
the user, or in a prior session) — read the existing entry, and if its stats differ from what you
just built, REMOVE your new one (never silently overwrite an existing entry) and flag the
discrepancy in your final report so the user can decide which version is correct.

## 10. Only then replace the real file
Copy the validated scratch file over the real fun/Encounter_Builder/monsters.js, run the same
validation query against the real path to confirm, then delete all scratch/temp files you
created for this task.

## 11. Report back
Give a concise summary: a table of monster name → CR → source book for everything added; any
names skipped as pre-existing duplicates; and — most important — a clear, explicit list of any
requested names that did NOT resolve to a real official monster, with your best guess at what
they might actually refer to (a synonym already covered, a generic template with no dedicated
stat block, etc.) so the user can decide how to proceed rather than have it silently guessed at
or silently dropped.
