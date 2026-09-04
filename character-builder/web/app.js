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

function debounce(fn, ms) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
}

function blankDraft(edition = '2024') {
    return {
        name: 'New Character',
        edition,
        speciesId: '',
        backgroundId: '',
        classes: [{ classId: '', level: 1, subclassId: '' }],
        abilities: { str: 15, dex: 14, con: 13, int: 12, wis: 10, cha: 8 },
        choices: {},
        equipment: { armor: '', shield: false }
    };
}

function rollD20() {
    return 1 + Math.floor(Math.random() * 20);
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

        // Content packs, cached per edition. contentByEdition[edition] = { raw, speciesList, ... }.
        contentByEdition: {},

        // 'play' (session sheet) or 'build' (creating or leveling up).
        mode: 'play',
        isNewCharacter: false,
        draft: blankDraft(),
        draftSheet: null,

        saveStatus: 'Saved',
        error: '',
        rollLog: [],

        get content() {
            return this.contentByEdition[this.draft.edition] || null;
        },

        get playContent() {
            return this.contentByEdition[this.activeMeta?.edition] || null;
        },

        // --- Boot ----------------------------------------------------------------------

        async init() {
            this.autoSaveDebounced = debounce(() => this.autoSave(), 500);
            try {
                await this.loadContentFor('2024');
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

        async loadContentFor(edition) {
            if (this.contentByEdition[edition]) return this.contentByEdition[edition];
            const raw = await this.api(`/api/content/detail?edition=${encodeURIComponent(edition)}`);
            const entry = {
                raw,
                speciesList: Object.values(raw.species),
                backgroundList: Object.values(raw.backgrounds),
                classList: Object.values(raw.classes),
                armorList: Object.values(raw.armor)
            };
            this.contentByEdition = { ...this.contentByEdition, [edition]: entry };
            return entry;
        },

        async fetchCharacterList() {
            const { characters } = await this.api('/api/characters');
            this.characterList = characters;
        },

        // --- Roster actions --------------------------------------------------------------

        async loadCharacter(id) {
            try {
                const { character, versions } = await this.api(`/api/characters/${id}/versions`);
                await this.loadContentFor(character.edition);
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
            this.draft = blankDraft(this.activeMeta?.edition || '2024');
            this.loadContentFor(this.draft.edition).then(() => this.refreshDraftPreview());
        },

        startLevelUp() {
            this.mode = 'build';
            this.isNewCharacter = false;
            const base = structuredClone(this.version.choices);
            if (base.classes?.[0]) base.classes[0].level = Math.min(20, (base.classes[0].level || 1) + 1);
            this.draft = { ...blankDraft(this.activeMeta.edition), ...base, edition: this.activeMeta.edition };
            this.refreshDraftPreview();
        },

        cancelBuild() {
            this.mode = 'play';
            this.error = '';
        },

        async onEditionChange() {
            this.draft.speciesId = '';
            this.draft.backgroundId = '';
            this.draft.classes = [{ classId: '', level: 1, subclassId: '' }];
            this.draft.choices = {};
            await this.loadContentFor(this.draft.edition);
            this.refreshDraftPreview();
        },

        refreshDraftPreview() {
            if (!this.content) return;
            this.draftSheet = deriveCharacter(this.draft, this.content.raw);
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
                    body: JSON.stringify({ name: this.draft.name, edition: this.draft.edition, choices: this.draft })
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
                const toLevel = this.draft.classes.reduce((sum, c) => sum + (Number(c.level) || 0), 0);
                await this.api(`/api/characters/${this.activeCharacterId}/levelup`, {
                    method: 'POST',
                    body: JSON.stringify({ fromLevel: this.activeLevel, toLevel, choices: this.draft })
                });
                await this.loadCharacter(this.activeCharacterId);
                await this.switchLevel(toLevel);
            } catch (err) {
                this.error = err.message;
            }
        },

        get selectedClass() {
            return this.content?.raw.classes[this.draft.classes[0]?.classId];
        },

        get availableSubclasses() {
            return Object.values(this.selectedClass?.subclasses || {});
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
            this.version.sheetData.play.gear.push({ name: '', qty: 1 });
            this.autoSaveDebounced();
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
                edition: this.activeMeta.edition,
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
