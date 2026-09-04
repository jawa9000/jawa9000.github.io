// D&D Character Manager — Alpine.js frontend.
//
// The rules engine is imported directly from /engine/ — the same ES modules the server
// runs — so the live preview while building/leveling can never drift from what gets saved.
//
// Two distinct "shapes" of data flow through here, matching the versioned data model:
//   draft    - choices being edited in the Build panel (species/background/class/level/
//              abilities/selections). Not persisted until Create or Confirm Level Up.
//   version  - the loaded, persisted version: { choices, sheetData: { derived, play } }.
//              `play` is what the Play panel edits and auto-saves; `derived` is read-only
//              here and only changes when a new version is created.

import { deriveCharacter } from '/engine/rules.js';
import { ABILITIES, ABILITY_NAMES, SKILLS, skillLabel, formatModifier } from '/engine/abilities.js';
import { levelForXp, xpToNextLevel } from '/engine/experience.js';

function debounce(fn, ms) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
}

function blankDraft() {
    return {
        name: 'New Character',
        speciesId: '',
        backgroundId: '',
        classes: [{ classId: '', level: 1, subclassId: '' }],
        abilities: { str: 15, dex: 14, con: 13, int: 12, wis: 10, cha: 8 },
        choices: {},
        equipment: { armor: '', shield: false },
        gear: [] // starting gear, only edited/sent during character creation — see confirmCreate()
    };
}

function rollD20() {
    return 1 + Math.floor(Math.random() * 20);
}

function rollD6() {
    return 1 + Math.floor(Math.random() * 6);
}

/**
 * Standard ability-score generation: roll 4d6, drop the lowest, sum the rest.
 * `dropIndex` identifies WHICH die was dropped by position, not by value — tracking the
 * value alone would strike through every die that happens to match it when two dice tie
 * for lowest, not just the one actually discarded.
 */
function roll4d6DropLowest() {
    const dice = [rollD6(), rollD6(), rollD6(), rollD6()];
    let dropIndex = 0;
    for (let i = 1; i < dice.length; i++) {
        if (dice[i] < dice[dropIndex]) dropIndex = i;
    }
    const total = dice.reduce((sum, d, i) => (i === dropIndex ? sum : sum + d), 0);
    return { dice, dropIndex, total };
}

window.appState = function appState() {
    return {
        // Constants exposed to the template.
        ABILITIES,
        ABILITY_NAMES,
        SKILL_IDS: Object.keys(SKILLS),
        skillLabel,
        fmt: formatModifier,

        // Roster.
        characterList: [],
        activeCharacterId: null,
        activeMeta: null,
        availableVersions: [],
        activeLevel: null,

        // The loaded, persisted version.
        version: null,

        // The unified content pack — { raw, speciesList, backgroundList, classList, armorList }.
        // Loaded once at boot; there's a single content pool, no per-edition split.
        content: null,

        // 'play' (session sheet) or 'build' (creating, leveling up, or editing in place).
        mode: 'play',
        isNewCharacter: false,
        isEditingInPlace: false, // true = confirming PUTs choices to the CURRENT level, no new version
        draft: blankDraft(),
        draftSheet: null,
        abilityRolls: {}, // { str: {dice:[..], dropIndex, total}, ... } — last 4d6-drop-lowest roll shown per ability
        dragSource: null, // ability id currently being dragged for a score swap, or null

        saveStatus: 'Saved',
        error: '',
        rollLog: [],

        // --- Boot ----------------------------------------------------------------------

        async init() {
            this.autoSaveDebounced = debounce(() => this.autoSave(), 500);
            try {
                await this.loadContent();
                await this.fetchCharacterList();
                if (this.characterList.length) {
                    await this.loadCharacter(this.characterList[0].id);
                } else {
                    this.startNewCharacter();
                }
            } catch (err) {
                this.error = err.message;
            }
        },

        async api(path, options = {}) {
            const res = await fetch(path, { headers: { 'content-type': 'application/json' }, ...options });
            if (res.status === 204) return null;
            const body = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(body.error || `Request failed (${res.status})`);
            return body;
        },

        async loadContent() {
            if (this.content) return this.content;
            const raw = await this.api('/api/content/detail');
            const byName = (a, b) => a.name.localeCompare(b.name);
            this.content = {
                raw,
                speciesList: Object.values(raw.species).sort(byName),
                backgroundList: Object.values(raw.backgrounds).sort(byName),
                classList: Object.values(raw.classes).sort(byName),
                armorList: Object.values(raw.armor).sort(byName)
            };
            return this.content;
        },

        async fetchCharacterList() {
            const { characters } = await this.api('/api/characters');
            this.characterList = characters;
        },

        // --- Roster actions --------------------------------------------------------------

        async loadCharacter(id) {
            try {
                const { character, versions } = await this.api(`/api/characters/${id}/versions`);
                this.activeCharacterId = id;
                this.activeMeta = character;
                this.availableVersions = versions;
                const highest = Math.max(...versions.map((v) => v.level));
                await this.switchLevel(highest);
                this.mode = 'play';
            } catch (err) {
                this.error = err.message;
            }
        },

        async switchLevel(level) {
            this.version = await this.api(`/api/characters/${this.activeCharacterId}/version/${level}`);
            this.activeLevel = level;
            // A version saved before XP tracking existed has no `xp` field — default it to
            // 0 so the input shows a number immediately rather than blank until first edit.
            if (this.version.sheetData.play.xp == null) this.version.sheetData.play.xp = 0;
        },

        // XP still needed to reach the next level, or null at max level.
        get xpToNext() {
            return this.version ? xpToNextLevel(this.version.sheetData.play.xp) : null;
        },

        // The level this character's CURRENT XP qualifies for, if it's higher than the
        // level they're actually filed at — i.e. "you have enough XP, go click Level Up."
        // XP never levels a character up automatically; it's just a notice.
        get xpLevelUpAvailable() {
            if (!this.version) return null;
            const qualifies = levelForXp(this.version.sheetData.play.xp);
            const current = this.version.sheetData.derived.totalLevel;
            return qualifies > current ? qualifies : null;
        },

        async deleteCharacter() {
            if (!this.activeCharacterId) return;
            if (!confirm(`Delete "${this.activeMeta.name}" and ALL its levels? This cannot be undone.`)) return;
            await this.api(`/api/characters/${this.activeCharacterId}`, { method: 'DELETE' });
            this.activeCharacterId = null;
            this.version = null;
            await this.fetchCharacterList();
            if (this.characterList.length) await this.loadCharacter(this.characterList[0].id);
            else this.startNewCharacter();
        },

        async deleteThisVersion() {
            if (this.availableVersions.length <= 1) {
                this.error = 'Cannot delete the only remaining version — delete the character instead.';
                return;
            }
            if (!confirm(`Delete level ${this.activeLevel}? Other levels are unaffected.`)) return;
            await this.api(`/api/characters/${this.activeCharacterId}/version/${this.activeLevel}`, { method: 'DELETE' });
            await this.loadCharacter(this.activeCharacterId);
        },

        // --- Build mode (create or level up) ----------------------------------------------

        startNewCharacter() {
            this.mode = 'build';
            this.isNewCharacter = true;
            this.isEditingInPlace = false;
            this.abilityRolls = {};
            this.draft = blankDraft();
            this.refreshDraftPreview();
        },

        startLevelUp() {
            this.mode = 'build';
            this.isNewCharacter = false;
            this.isEditingInPlace = false;
            this.abilityRolls = {};
            const base = structuredClone(this.version.choices);
            if (base.classes?.[0]) base.classes[0].level = Math.min(20, (base.classes[0].level || 1) + 1);
            this.draft = { ...blankDraft(), ...base };
            this.refreshDraftPreview();
        },

        // Fix a mistake at the CURRENT level — a mis-picked skill, a typo'd ability score
        // — without it counting as a level gain. Unlike startLevelUp, the class level is
        // NOT bumped, and confirming PUTs to this same version instead of inserting a new one.
        startEditChoices() {
            this.mode = 'build';
            this.isNewCharacter = false;
            this.isEditingInPlace = true;
            this.abilityRolls = {};
            const base = structuredClone(this.version.choices);
            this.draft = { ...blankDraft(), ...base };
            this.refreshDraftPreview();
        },

        cancelBuild() {
            this.mode = 'play';
            this.error = '';
        },

        // Standard 4d6-drop-lowest ability generation, rolled per-ability so the player can
        // reroll just one score without redoing the whole array.
        rollAbilityScore(ability) {
            const result = roll4d6DropLowest();
            this.draft.abilities[ability] = result.total;
            this.abilityRolls = { ...this.abilityRolls, [ability]: result };
            this.refreshDraftPreview();
        },

        // Roll all six at once. Builds the whole batch before a single state assignment and
        // a single preview refresh, rather than calling rollAbilityScore() six times, so
        // Alpine doesn't re-render the form (and the derived sheet doesn't re-derive) six
        // times over for one click.
        rollAllAbilityScores() {
            const rolls = {};
            for (const ability of this.ABILITIES) {
                const result = roll4d6DropLowest();
                this.draft.abilities[ability] = result.total;
                rolls[ability] = result;
            }
            this.abilityRolls = rolls;
            this.refreshDraftPreview();
        },

        // --- Drag-and-drop reassignment of ability scores ---------------------------------
        // Dragging one ability's LABEL onto another's box SWAPS their scores (and whichever
        // dice breakdown goes with each), which is the "roll six numbers, then decide who
        // gets what" workflow. The label is the only draggable element — the number input
        // and die button stay normal, so dragging never fights with typing or clicking them.

        startDragAbility(ability) {
            this.dragSource = ability;
        },

        endDragAbility() {
            this.dragSource = null;
        },

        dropAbilityScore(target) {
            const source = this.dragSource;
            this.dragSource = null;
            if (!source || source === target) return;

            const abilities = this.draft.abilities;
            [abilities[source], abilities[target]] = [abilities[target], abilities[source]];

            // The dice-roll breakdown shown under a score belongs to that VALUE, so it
            // has to travel with the swap too, or the struck-through die would end up
            // labeled under the wrong ability.
            const rolls = { ...this.abilityRolls };
            const sourceRoll = rolls[source];
            const targetRoll = rolls[target];
            if (targetRoll) rolls[source] = targetRoll; else delete rolls[source];
            if (sourceRoll) rolls[target] = sourceRoll; else delete rolls[target];
            this.abilityRolls = rolls;

            this.refreshDraftPreview();
        },

        refreshDraftPreview() {
            if (!this.content) return;
            this.draftSheet = deriveCharacter(this.draft, this.content.raw);
        },

        // Starting gear, edited only while creating a new character (draft.gear has no
        // effect during Level Up / Edit Choices — see blankDraft()). Once a character
        // exists, gear is managed in Play mode via addGear()/removeGear() below instead.
        addDraftGear() {
            this.draft.gear.push({ name: '', qty: 1, weight: 0 });
        },

        removeDraftGear(index) {
            this.draft.gear.splice(index, 1);
        },

        applyChoice(choiceId, optionId, isMulti, max) {
            const current = new Set(this.draft.choices[choiceId] || []);
            if (isMulti) {
                if (current.has(optionId)) current.delete(optionId);
                else {
                    current.add(optionId);
                    while (current.size > max) current.delete([...current][0]);
                }
            } else {
                current.clear();
                current.add(optionId);
            }
            this.draft.choices = { ...this.draft.choices, [choiceId]: [...current] };
            this.refreshDraftPreview();
        },

        isChoicePicked(choiceId, optionId) {
            return (this.draft.choices[choiceId] || []).includes(optionId);
        },

        async confirmCreate() {
            try {
                this.error = '';
                const result = await this.api('/api/characters', {
                    method: 'POST',
                    body: JSON.stringify({
                        name: this.draft.name,
                        choices: this.draft,
                        gear: this.draft.gear
                    })
                });
                await this.fetchCharacterList();
                await this.loadCharacter(result.id);
            } catch (err) {
                this.error = err.message;
            }
        },

        async confirmLevelUp() {
            try {
                this.error = '';
                // The server derives the new level from `choices` itself (the total of every
                // class's level) — it's the single source of truth, so we don't compute or
                // send it here and then have to trust our own copy matches.
                const result = await this.api(`/api/characters/${this.activeCharacterId}/levelup`, {
                    method: 'POST',
                    body: JSON.stringify({ fromLevel: this.activeLevel, choices: this.draft })
                });
                await this.fetchCharacterList(); // the sidebar shows name/className — refresh it too
                await this.loadCharacter(this.activeCharacterId);
                await this.switchLevel(result.level);
            } catch (err) {
                this.error = err.message;
            }
        },

        // Save an edit to the CURRENT version's choices — no new version is inserted. If the
        // total level you set differs from what this version was filed under, the server
        // RE-KEYS this same row to the new level (rejecting it with an error if another
        // version already occupies that level) — so this is how you freely retarget a
        // version's level without going through the history-preserving Level Up flow.
        async confirmEditChoices() {
            const editedLevel = this.activeLevel; // capture before loadCharacter() below can change it
            try {
                this.error = '';
                const result = await this.api(`/api/characters/${this.activeCharacterId}/version/${editedLevel}/choices`, {
                    method: 'PUT',
                    body: JSON.stringify({ choices: this.draft })
                });
                await this.fetchCharacterList(); // the sidebar shows name/className — refresh it too
                await this.loadCharacter(this.activeCharacterId);
                await this.switchLevel(result.level); // may differ from editedLevel if it was re-keyed
            } catch (err) {
                this.error = err.message;
            }
        },

        // --- Multiclassing: draft.classes is a list, one entry per class taken -------------

        addClass() {
            this.draft.classes.push({ classId: '', level: 1, subclassId: '' });
            this.refreshDraftPreview();
        },

        removeClass(index) {
            if (this.draft.classes.length <= 1) return; // always keep at least one row
            this.draft.classes.splice(index, 1);
            this.refreshDraftPreview();
        },

        classDefAt(index) {
            return this.content?.raw.classes[this.draft.classes[index]?.classId];
        },

        subclassesAt(index) {
            return Object.values(this.classDefAt(index)?.subclasses || {}).sort((a, b) => a.name.localeCompare(b.name));
        },

        get draftTotalLevel() {
            return this.draft.classes.reduce((sum, c) => sum + (Number(c.level) || 0), 0);
        },

        // --- Play mode: auto-save session state -------------------------------------------

        async autoSave() {
            if (!this.version) return;
            this.saveStatus = 'Saving…';
            try {
                const result = await this.api(
                    `/api/characters/${this.activeCharacterId}/version/${this.activeLevel}`,
                    { method: 'PUT', body: JSON.stringify({ play: this.version.sheetData.play }) }
                );
                this.version.sheetData = result.sheetData; // pick up server-side clamping
                this.saveStatus = 'Saved';
            } catch (err) {
                this.saveStatus = 'Error saving';
                this.error = err.message;
            }
        },

        adjustHp(delta) {
            const play = this.version.sheetData.play;
            const cap = this.version.sheetData.derived.hitPoints + (play.tempHp || 0);
            play.currentHp = Math.max(0, Math.min(cap, play.currentHp + delta));
            this.autoSaveDebounced();
        },

        toggleSlot(levelIndex) {
            const play = this.version.sheetData.play;
            const max = this.version.sheetData.derived.spellSlots[levelIndex];
            const used = play.spellSlotsUsed[levelIndex] || 0;
            play.spellSlotsUsed[levelIndex] = used >= max ? 0 : used + 1;
            this.autoSaveDebounced();
        },

        togglePactSlot() {
            const play = this.version.sheetData.play;
            const max = this.version.sheetData.derived.pactMagic?.count || 0;
            play.pactSlotsUsed = play.pactSlotsUsed >= max ? 0 : play.pactSlotsUsed + 1;
            this.autoSaveDebounced();
        },

        addGear() {
            this.version.sheetData.play.gear.push({ name: '', qty: 1, weight: 0 });
            this.autoSaveDebounced();
        },

        get totalGearWeight() {
            return (this.version?.sheetData.play.gear || []).reduce(
                (sum, item) => sum + (Number(item.qty) || 0) * (Number(item.weight) || 0),
                0
            );
        },

        removeGear(index) {
            this.version.sheetData.play.gear.splice(index, 1);
            this.autoSaveDebounced();
        },

        async applyRest(type) {
            const result = await this.api(
                `/api/characters/${this.activeCharacterId}/version/${this.activeLevel}/rest`,
                { method: 'POST', body: JSON.stringify({ type }) }
            );
            this.version.sheetData = result.sheetData;
            this.saveStatus = 'Saved';
        },

        // --- Dice roller ------------------------------------------------------------------

        roll(label, modifier = 0) {
            const die = rollD20();
            const total = die + modifier;
            this.rollLog.unshift({
                id: crypto.randomUUID(),
                label,
                die,
                modifier,
                total,
                crit: die === 20,
                fumble: die === 1,
                time: new Date().toLocaleTimeString()
            });
            this.rollLog = this.rollLog.slice(0, 12);
        },

        // --- Export / import ---------------------------------------------------------------

        exportVersion() {
            const payload = {
                name: this.activeMeta.name,
                level: this.activeLevel,
                choices: this.version.choices,
                play: this.version.sheetData.play
            };
            const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${this.activeMeta.name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-lvl${this.activeLevel}.json`;
            a.click();
            URL.revokeObjectURL(url);
        },

        async importFile(event) {
            const file = event.target.files[0];
            if (!file) return;
            try {
                this.error = '';
                const payload = JSON.parse(await file.text());
                const result = await this.api('/api/characters/import', { method: 'POST', body: JSON.stringify(payload) });
                await this.fetchCharacterList();
                await this.loadCharacter(result.id);
            } catch (err) {
                this.error = `Import failed: ${err.message}`;
            } finally {
                event.target.value = '';
            }
        }
    };
};
