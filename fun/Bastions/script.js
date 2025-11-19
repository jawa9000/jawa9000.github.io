// --- State ---
let character = null;
let bastion = null;
let facilities = [];
let bp = 0;
let turnLog = [];

function updateCharacterSummary() {
    if (!character) {
        $('#characterSummary').html('<em>No character loaded. Import a Bastion JSON file.</em>');
        $('#charName').val('');
        $('#charLevel').val('');
        $('#charGold').val('');
        $('#charBP').val('');
        return;
    }
    $('#characterSummary').html(
        `<strong>${character.name}</strong> (Level ${character.level})<br>Gold: ${character.gold} gp<br>Bastion Points: ${bp}`
    );
    $('#charName').val(character.name || '');
    $('#charLevel').val(character.level ?? '');
    $('#charGold').val(character.gold ?? '');
    $('#charBP').val(bp ?? '');
}

function updateBastionSummary() {
    if (!bastion) {
        $('#bastionSummary').html('<em>No bastion loaded. Import a Bastion JSON file.</em>');
        $('#bastionName').val('');
        $('#bastionType').val('Castle');
        $('#bastionSize').val('');
        $('#bastionQuality').val('Frugal');
        $('#bastionTraits').val('');
        return;
    }
    $('#bastionSummary').html(
        `<strong>${bastion.name}</strong> (${bastion.type})<br>Size Grade: ${bastion.size}, Quality: ${bastion.quality}<br>Traits: ${bastion.traits.join(', ') || 'None'}`
    );
    $('#bastionName').val(bastion.name || '');
    $('#bastionType').val(bastion.type || 'Castle');
    $('#bastionSize').val(bastion.size ?? '');
    $('#bastionQuality').val(bastion.quality || 'Frugal');
    $('#bastionTraits').val((bastion.traits || []).join(', '));
}

// --- Facility Management ---
const BASIC_FACILITIES = [
    'Bedroom', 'Courtyard', 'Dining Room', 'Kitchen', 'Parlor', 'Storage', 'Washroom'
];
const SPECIAL_FACILITIES = [
    // Level 5
    { name: 'Arcane Study', level: 5, desc: 'Craft Arcane Foci, blank books, cast Identify (1/long rest)' },
    { name: 'Armory', level: 5, desc: 'Stock armor/weapons, makes Defenders harder to kill' },
    { name: 'Barracks', level: 5, desc: 'Recruit Bastion Defenders (4/Recruit, 25 if Vast)' },
    { name: 'Garden', level: 5, desc: 'Decorative, Food, Herb, or Poison; harvests potions/poisons' },
    { name: 'Library', level: 5, desc: 'Research topics for information' },
    { name: 'Sanctuary', level: 5, desc: 'Craft Holy Symbols/Druidic Foci, cast Healing Word (1/long rest)' },
    { name: 'Smithy', level: 5, desc: 'Craft weapons, ammo, equipment' },
    { name: 'Storehouse', level: 5, desc: 'Procure/sell nonmagical items' },
    // Level 9
    { name: 'Gaming Hall', level: 9, desc: 'Gambling den, earn winnings' },
    { name: 'Greenhouse', level: 9, desc: 'Grow rare plants, magical fruits, poisons' },
    { name: 'Laboratory', level: 9, desc: 'Craft potions, poisons, alchemical items' },
    { name: 'Sacristy', level: 9, desc: 'Regain spell slot, craft Holy Water, temp magic items' },
    { name: 'Scriptorium', level: 9, desc: 'Craft book replicas, paperwork, scrolls' },
    { name: 'Stable', level: 9, desc: 'House/buy/sell mounts' },
    { name: 'Teleportation Circle', level: 9, desc: 'Permanent circle, invite mages' },
    { name: 'Theater', level: 9, desc: 'Performances, earn Theater die' },
    { name: 'Training Area', level: 9, desc: 'Battle/Skills/Weapon Expert training' },
    { name: 'Trophy Room', level: 9, desc: 'Lore research, trinkets with temp magic' },
    // Level 13
    { name: 'Archive', level: 13, desc: 'Advantage on INT checks, lore research (Legend Lore)' },
    { name: 'Meditation Chamber', level: 13, desc: 'Extra order, Adv. on 2 saves after 7 days' },
    { name: 'Menagerie', level: 13, desc: 'Keep creatures as Defenders, can recruit' },
    { name: 'Observatory', level: 13, desc: 'Cast Contact Other Plane, bestow charms' },
    { name: 'Pub', level: 13, desc: 'Gather info, magical beverages' },
    { name: 'Reliquary', level: 13, desc: 'Cast Greater Restoration, sacred talismans' },
    // Level 17
    { name: 'Demiplane', level: 17, desc: 'Extradimensional space, temp HP, create magic objects' },
    { name: 'Guildhall', level: 17, desc: 'Establish guild, perform assignments' },
    { name: 'Sanctum', level: 17, desc: 'Solace/healing, temp HP, cast Heal/Word of Recall' },
    { name: 'War Room', level: 17, desc: 'Plan military actions, muster armies with Lieutenants' }
];
const FACILITY_SIZES = [
    { name: 'Cramped', maxSquares: 4, cost: 500, time: 20 },
    { name: 'Roomy', maxSquares: 16, cost: 1000, time: 45 },
    { name: 'Vast', maxSquares: 36, cost: 3000, time: 125 }
];

function renderFacilityCheckboxes() {
    const container = document.getElementById('facilityCheckboxes');
    if (!container) return;
    const effectiveLevel = getEffectiveBastionLevel();
    const hasLevelInfo = (bastion && Number.isFinite(bastion.level)) || (character && Number.isFinite(character.level));
    sanitizeFacilitiesForLevel(effectiveLevel);
    // Basic Facilities
    let html = '';
    if (!hasLevelInfo) {
        html += '<em>No bastion level specified; showing full facility list.</em><br>';
    }
    html += '<strong>Basic Facilities:</strong><br>';
    BASIC_FACILITIES.forEach(name => {
        const checked = facilities.some(f => f.name === name && f.type === 'Basic');
        html += `<label><input type="checkbox" class="basic-facility" value="${name}" ${checked ? 'checked' : ''}> ${name}</label> `;
    });
    html += '<br><strong>Special Facilities:</strong><br>';
    // Special Facilities (only those eligible by level)
    SPECIAL_FACILITIES.filter(f => f.level <= effectiveLevel).forEach(fac => {
        const checked = facilities.some(f => f.name === fac.name && f.type === 'Special');
        html += `<label><input type="checkbox" class="special-facility" value="${fac.name}" ${checked ? 'checked' : ''}> ${fac.name} <span title="${fac.desc}" class="info-icon">ⓘ</span></label> `;
    });
    container.innerHTML = html;
    // Add event listeners
    container.querySelectorAll('.basic-facility').forEach(cb => {
        cb.addEventListener('change', function() {
            if (this.checked) {
                if (!facilities.some(f => f.name === this.value && f.type === 'Basic')) {
                    facilities.push({ name: this.value, type: 'Basic', size: 'Roomy', status: 'Active' });
                    updateFacilitiesList();
                }
            } else {
                facilities = facilities.filter(f => !(f.name === this.value && f.type === 'Basic'));
                updateFacilitiesList();
            }
        });
    });
    container.querySelectorAll('.special-facility').forEach(cb => {
        cb.addEventListener('change', function() {
            const currentLevel = getEffectiveBastionLevel();
            const allowed = currentLevel >= 5 ? (currentLevel >= 17 ? 6 : currentLevel >= 13 ? 5 : currentLevel >= 9 ? 4 : 2) : 0;
            const specialCount = facilities.filter(f => f.type === 'Special').length;
            if (this.checked) {
                if (specialCount >= allowed) {
                    alert(`You may only have ${allowed} special facilities at your level.`);
                    this.checked = false;
                    return;
                }
                if (!facilities.some(f => f.name === this.value && f.type === 'Special')) {
                    const facObj = SPECIAL_FACILITIES.find(f => f.name === this.value);
                    facilities.push({ name: facObj.name, type: 'Special', status: 'Active', order: null, desc: facObj.desc });
                    updateFacilitiesList();
                }
            } else {
                facilities = facilities.filter(f => !(f.name === this.value && f.type === 'Special'));
                updateFacilitiesList();
            }
        });
    });
}
// Call renderFacilityCheckboxes after character save and on load

// --- Bastion Turn & Orders ---
let maintainOptionsDiv;
document.addEventListener('DOMContentLoaded', () => {
    maintainOptionsDiv = document.getElementById('maintainOptions');
    const bastionOrderInput = document.getElementById('bastionOrder');
    const spendGoldLabel = document.getElementById('spendGoldLabel');
    const charLevelInput = document.getElementById('charLevel');
    const updateOrderUi = () => {
        const order = bastionOrderInput.value;
        if (maintainOptionsDiv) {
            maintainOptionsDiv.style.display = order === 'Maintain' ? 'block' : 'none';
        }
        if (spendGoldLabel) {
            spendGoldLabel.style.display = order === 'Maintain' ? 'none' : 'inline-block';
        }
    };
    bastionOrderInput.addEventListener('change', updateOrderUi);
    updateOrderUi();
    if (charLevelInput) {
        charLevelInput.addEventListener('input', () => {
            syncStateFromForms();
            renderFacilityCheckboxes();
        });
    }
    renderFacilityCheckboxes();
    updateFacilitiesList();
    renderTurnLog();
    updateBPButtons();
    initializeImportExportControls();
});
document.getElementById('turnForm').addEventListener('submit', function(e) {
    e.preventDefault();
    resolveBastionTurn();
});
function resolveBastionTurn() {
    const orderInput = document.getElementById('bastionOrder');
    const order = orderInput.value;
    const turnResults = document.getElementById('turnResults');
    let result = '';
    if (!facilities.length) {
        turnResults.innerHTML = '<span style="color:red">Add facilities first!</span>';
        return;
    }
    if (order === 'Maintain') {
        // 1d4 BP per special facility
        const numSpecial = facilities.filter(f => f.type === 'Special' && f.status === 'Active').length;
        let rolls = [];
        let total = 0;
        for (let i = 0; i < numSpecial; i++) {
            const roll = Math.floor(Math.random()*4)+1;
            rolls.push(roll);
            total += roll;
        }
        bp += total;
        result += `<b>Maintain Order:</b> ${numSpecial} special facilities generated <b>${total} BP</b> (Rolls: ${rolls.join(', ')})<br>`;
        // Check for Bastion Event
        const eventText = resolveBastionEvent();
        result += eventText;
        // If event is an attack, append detailed attack resolution info
        if (eventText.includes('Attack!')) {
            result += `<div class="bastion-attack-info">
<strong>Bastion Attack Resolution:</strong><br>
<ul>
<li><b>Hostile Force Defeated</b>: A hostile force attacks your Bastion but is ultimately defeated.</li>
<li><b>Bastion Defender Losses</b>: DM rolls <b>6d6</b>. For each die that rolls a 1, one Bastion Defender dies and is removed from your roster.
    <ul>
        <li>If your Bastion has an <b>Armory</b> that is stocked, roll <b>d8</b> instead of d6 for losses.</li>
        <li>If your Bastion is <b>completely enclosed by defensive walls</b>, reduce the number of dice by 2.</li>
        <li>If you have a <b>War Room</b> with Lieutenants, each Lieutenant reduces the number of dice by 1.</li>
    </ul>
</li>
<li><b>Special Facility Damage</b>: One special facility (randomly) is damaged and shut down.
    <ul>
        <li>If you have <b>no Bastion Defenders</b> or all are lost, a <b>second</b> special facility is also shut down.</li>
        <li>Shut-down facilities cannot be used or generate BP next turn, but are repaired for free after that.</li>
    </ul>
</li>
<li><b>Combining Bastions</b>: If Bastions are combined, other players can take on losses to protect special facilities.</li>
<li><b>Roleplaying Opportunity</b>: Players can roleplay as hirelings to resolve the attack, or use the event as a story hook.</li>
</ul>
</div>`;
        }
        // Add details for each special facility
        facilities.filter(f => f.type === 'Special').forEach(fac => {
            result += `<br><b>${fac.name}:</b> ${getOrderDetails('Maintain', fac.name)}`;
        });
    } else {
        // Order to all special facilities
        const spendGold = document.getElementById('spendGold').checked;
        let orderFacilities = facilities.filter(f => f.type === 'Special' && f.status === 'Active');
        if (!orderFacilities.length) {
            turnResults.innerHTML = '<span style="color:red">No active special facilities for this order.</span>';
            return;
        }
        let orderResults = [];
        orderFacilities.forEach(fac => {
            let die = 4; // Default, could be 6/8/10 for advanced logic
            let roll1 = Math.floor(Math.random()*die)+1;
            let roll2 = Math.floor(Math.random()*die)+1;
            let bpGain = spendGold ? Math.max(roll1, roll2) : roll1;
            bp += bpGain;
            fac.order = order;
            let details = getOrderDetails(order, fac.name);
            orderResults.push(`${fac.name}: +${bpGain} BP${spendGold ? ` (rolls: ${roll1}, ${roll2}, used highest)` : ` (roll: ${roll1})`}<br><em>${details}</em>`);
        });
        if (spendGold && character) character.gold -= 25;
        result += `<b>${order} Order:</b><br>${orderResults.join('<br>')}`;
    }
    if (character) character.bp = bp;
    updateCharacterSummary();
    updateFacilitiesList();
    turnResults.innerHTML = result;
    // --- Add to turn log ---
    const now = new Date();
    turnLog.push({
        date: now.toLocaleString(),
        result: result
    });
    if (turnLog.length > 50) turnLog = turnLog.slice(-50); // keep last 50
    renderTurnLog();
    // --- Clear BP results ---
    document.getElementById('bpResults').innerHTML = '';
    updateBPButtons();
}
function resolveBastionEvent() {
    // Simple event table
    const roll = Math.floor(Math.random()*20)+1;
    let text = `<br><b>Bastion Event (d20: ${roll}):</b> `;
    if (roll <= 9) text += 'Nothing significant happens.';
    else if (roll === 10) text += 'Attack! Defenders may be lost, and a facility is shut down.';
    else if (roll <= 12) text += 'Lost Hirelings. A facility is shut down for a turn.';
    else if (roll <= 14) text += 'Refugees arrive, offering gold for shelter.';
    else if (roll === 15) text += 'Friendly Visitors offer gold for facility use.';
    else if (roll === 16) text += 'Request for Aid: Send defenders for a reward.';
    else if (roll === 17) text += 'Honored Guest: Special visitor arrives.';
    else if (roll === 18) text += 'Extraordinary Opportunity: Spend gold for extra BP.';
    else if (roll === 19) text += 'Criminal Hireling: Pay bribe or lose hireling.';
    else if (roll === 20) text += 'Magical Discovery: Temporary magic item found!';
    return text;
}
// --- BP Spending ---
document.getElementById('spendMagicItemBtn').addEventListener('click', function() {
    if (bp < 20) { alert('Not enough BP!'); return; }
    bp -= 20;
    if (character) character.bp = bp;
    updateCharacterSummary();
    document.getElementById('bpResults').innerHTML = 'You spent 20 BP for a magic item!';
    // --- Add to turn log ---
    const now = new Date();
    turnLog.push({
        date: now.toLocaleString(),
        result: 'Spent 20 BP for a magic item.'
    });
    if (turnLog.length > 50) turnLog = turnLog.slice(-50);
    renderTurnLog();
    updateBPButtons();
});

document.getElementById('spendCharismaBtn').addEventListener('click', function() {
    if (bp < 10) { alert('Not enough BP!'); return; }
    bp -= 10;
    if (character) character.bp = bp;
    updateCharacterSummary();
    document.getElementById('bpResults').innerHTML = 'You spent 10 BP for Charisma advantage!';
    // --- Add to turn log ---
    const now = new Date();
    turnLog.push({
        date: now.toLocaleString(),
        result: 'Spent 10 BP for Charisma advantage.'
    });
    if (turnLog.length > 50) turnLog = turnLog.slice(-50);
    renderTurnLog();
    updateBPButtons();
});

document.getElementById('spendResurrectBtn').addEventListener('click', function() {
    if (bp < 100) { alert('Not enough BP!'); return; }
    bp -= 100;
    if (character) character.bp = bp;
    updateCharacterSummary();
    document.getElementById('bpResults').innerHTML = 'You spent 100 BP to return to life!';
    // --- Add to turn log ---
    const now = new Date();
    turnLog.push({
        date: now.toLocaleString(),
        result: 'Spent 100 BP to return to life.'
    });
    if (turnLog.length > 50) turnLog = turnLog.slice(-50);
    renderTurnLog();
    updateBPButtons();
});
function updateFacilitiesList() {
    const list = document.getElementById('facilitiesList');
    if (!facilities.length) { list.innerHTML = '<em>No facilities yet.</em>'; return; }
    list.innerHTML = facilities.map(f =>
        `<div><strong>${f.name}</strong> (${f.type}${f.size ? ', ' + f.size : ''}) - ${f.status}${f.desc ? '<br><em>' + f.desc + '</em>' : ''}${f.type === 'Special' && f.order ? ' | Last Order: ' + f.order : ''}</div>`
    ).join('');
}
function renderTurnLog() {
    const logDiv = document.getElementById('turnLog');
    if (!turnLog.length) {
        logDiv.innerHTML = '<em>No turns resolved yet.</em>';
        return;
    }
    logDiv.innerHTML = turnLog.map(entry => `<div style="margin-bottom:1em;"><span style="font-weight:bold;">[${entry.date}]</span><br>${entry.result}</div>`).reverse().join('');
}

// --- Order Descriptions by Facility ---
const ORDER_DETAILS = {
    Craft: {
        'Arcane Study': 'Craft Arcane Focus (7 days, no cost, sell for 10 GP) or blank Book (7 days, 10 GP, sell for 25 GP). Cast Identify (1/long rest).',
        'Laboratory': 'Craft Acid, Alchemist\'s Fire, Ink, Basic Poison, rare poisons, or magic potions (cost/rarity varies).',
        'Sacristy': 'Craft Holy Water (7 days, no cost, +1d6 dmg per 100 GP up to 500 GP), temp magic items (7 days, 200 GP), regain spell slot (5th or lower) after Short Rest.',
        'Sanctuary': 'Craft Druidic Focus or Holy Symbol (7 days, no cost, sell for 5 GP). Cast Healing Word (1/long rest, half level).',
        'Scriptorium': 'Copy nonmagical book (7 days), paperwork (7 days, 1 GP/copy), craft magic scrolls (cost/rarity varies).',
        'Smithy': 'Craft ammo (20), simple/martial weapons, masterwork weapons, armor, shields, etc. (7-21 days, half cost).',
        'Workshop': 'Craft Tiny nonmagical object (7 days, free if <10 GP, else half cost). Grants Heroic Advantage after Short Rest.'
    },
    Empower: {
        'Demiplane': 'Arcane Resilience (temp HP, 5x level after Long Rest), Fabrication (create object, 5 ft cube, 5 GP, 1/long rest).',
        'Meditation Chamber': 'Inner Peace (extra Bastion order), Fortify Self (Advantage on 2 saves for 7 days after 7 days meditation).',
        'Observatory': 'Cast Contact Other Plane (1/7 days), bestow supernatural charm (Darkvision, Heroism, Vitality).',
        'Sanctum': 'Daily rites (temp HP = level after Long Rest), cast Heal (1/long rest), Word of Recall destination.',
        'Theater': 'Theatrical production (14 days rehearsal, 7+ days performance), earn Theater die (d6/d8/d10 by level).',
        'Training Area': 'Training (7 days): Battle/Skills/Weapon Expert benefits.'
    },
    Harvest: {
        'Garden': 'Produce: Decorative (bouquets/perfume), Food (mushrooms/veg), Herb (Potion of Healing), Poison (Antitoxin/Basic Poison). Vast: 2 harvests.',
        'Greenhouse': '3 magical fruits (Lesser Restoration) daily, Potion of Healing (Greater), or rare poison.',
        'Reliquary': 'Prepare talisman (spell focus, ignore components <1,000 GP, 1 use), cast Greater Restoration (1/long rest).'
    },
    Maintain: {
        'default': 'All hirelings focus on maintenance. Each special facility generates 1d4 BP. Bastion Event occurs.'
    },
    Recruit: {
        'Barracks': 'Recruit up to 4 Bastion Defenders. Vast: up to 25.',
        'Guildhall': 'Commission guild members for assignments (track Beasts, add walls, infiltrate, etc).',
        'Menagerie': 'Add creature (Ape, Bear, Owlbear, etc.) as Defender (cost).',
        'Teleportation Circle': 'Invite Mage/Archmage for 7 days, can cast spell (up to 4th/8th level).',
        'War Room': 'Recruit Lieutenants (up to 10), muster armies (100 Guards/Lieutenant, 20 mounted, 1 GP/day each).'
    },
    Research: {
        'Archive': 'Search for lore (Legend Lore), gain Advantage on INT checks with reference book. Vast: 2 extra books.',
        'Library': 'Research topic, gain up to 3 unknown facts.',
        'Pub': 'Spymaster collects info on events (10 mi) and creatures (50 mi, 7 days). Pub Specials grant magical effects. Vast: 2 specials, +3 hirelings.',
        'Trophy Room': 'Research topic (3 facts) or find Trinket Trophy (temp magic, cast spell once).'
    },
    Trade: {
        'Armory': 'Stock with armor/weapons (100 GP + 100/Defender, half if Smithy). Defenders harder to kill (d8 for losses).',
        'Gaming Hall': 'Gambling den (7 days), earn winnings (3d6 GP to 10d6x10 GP).',
        'Stable': 'Buy/sell mounts, 14 days = Adv. Animal Handling. Sell profit: +20%/+50%/+100% by level. Vast: 6 Large animals.',
        'Storehouse': 'Procure items (500/2,000/5,000 GP by level) or sell goods (+10%/+20%/+50%/+100% profit by level).'
    }
};

function getOrderDetails(order, facility) {
    if (ORDER_DETAILS[order] && ORDER_DETAILS[order][facility]) {
        return ORDER_DETAILS[order][facility];
    }
    if (ORDER_DETAILS[order] && ORDER_DETAILS[order]['default']) {
        return ORDER_DETAILS[order]['default'];
    }
    return '';
}

// Add Clear History button event
$('#clearHistoryBtn').on('click', function() {
    if (confirm('Are you sure you want to clear all Bastion data and reset the page?')) {
        resetAllData();
    }
});

// (All localStorage-based persistence removed in favor of JSON import/export.)

function getCurrentState() {
    return {
        character,
        bastion,
        facilities,
        turnLog,
        bp
    };
}

function refreshUiFromState() {
    updateCharacterSummary();
    updateBastionSummary();
    updateFacilitiesList();
    renderFacilityCheckboxes();
    renderTurnLog();
    updateBPButtons();
}

function exportBastionState() {
    syncStateFromForms();
    const state = getCurrentState();
    const json = JSON.stringify(state, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const baseNameInput = $('#charName').val().trim();
    const baseNameState = state.character && state.character.name ? state.character.name : (state.bastion && state.bastion.name ? state.bastion.name : '');
    const baseNameRaw = baseNameInput || baseNameState || 'bastion';
    const baseName = baseNameRaw.replace(/\s+/g, '_');
    link.href = url;
    link.download = `${baseName || 'bastion'}-state.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function handleImportJsonSelection(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        try {
            const data = JSON.parse(reader.result);
            applyImportedState(data);
        } catch (err) {
            console.error('Invalid bastion JSON:', err);
            alert('Unable to load JSON file. Please ensure it was exported from this tool.');
        } finally {
            event.target.value = '';
        }
    };
    reader.readAsText(file);
}

function applyImportedState(state) {
    if (!state || typeof state !== 'object') {
        alert('Invalid bastion file format.');
        return;
    }
    character = state.character || null;
    bastion = state.bastion || null;
    facilities = Array.isArray(state.facilities) ? state.facilities : [];
    turnLog = Array.isArray(state.turnLog) ? state.turnLog : [];
    const importedBp = typeof state.bp === 'number' && !Number.isNaN(state.bp) ? state.bp : null;
    bp = importedBp !== null ? importedBp : (character && typeof character.bp === 'number' ? character.bp : 0);
    if (character) {
        character.bp = bp;
    }
    refreshUiFromState();
    if (!character) {
        $('#characterSummary').html('<em>No character data found in file.</em>');
    }
    if (!bastion) {
        $('#bastionSummary').html('<em>No bastion data found in file.</em>');
    }
    const turnResults = document.getElementById('turnResults');
    if (turnResults) turnResults.innerHTML = '';
    const bpResults = document.getElementById('bpResults');
    if (bpResults) bpResults.innerHTML = '';
}

function initializeImportExportControls() {
    const exportBtn = document.getElementById('exportJsonBtn');
    const importBtn = document.getElementById('importJsonBtn');
    const importInput = document.getElementById('importJsonInput');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportBastionState);
    }
    if (importBtn && importInput) {
        importBtn.addEventListener('click', () => importInput.click());
        importInput.addEventListener('change', handleImportJsonSelection);
    }
}

function resetAllData() {
    character = null;
    bastion = null;
    facilities = [];
    turnLog = [];
    bp = 0;
    const spendGold = document.getElementById('spendGold');
    if (spendGold) spendGold.checked = false;
    const turnResults = document.getElementById('turnResults');
    if (turnResults) turnResults.innerHTML = '';
    const bpResults = document.getElementById('bpResults');
    if (bpResults) bpResults.innerHTML = '';
    refreshUiFromState();
}

function updateBPButtons() {
    $('#spendMagicItemBtn').prop('disabled', bp < 20);
    $('#spendCharismaBtn').prop('disabled', bp < 10);
    $('#spendResurrectBtn').prop('disabled', bp < 100);
}

function getEffectiveBastionLevel() {
    if (bastion) {
        if (Number.isFinite(bastion.level)) return bastion.level;
    }
    if (character && Number.isFinite(character.level)) return character.level;
    return 20;
}

function sanitizeFacilitiesForLevel(level) {
    let changed = false;
    facilities = facilities.filter(f => {
        if (f.type !== 'Special') return true;
        const facDef = SPECIAL_FACILITIES.find(def => def.name === f.name);
        const requiredLevel = facDef ? facDef.level : Infinity;
        if (requiredLevel <= level) return true;
        changed = true;
        return false;
    });
    if (changed) {
        updateFacilitiesList();
    }
}

function collectCharacterFromForm() {
    const name = $('#charName').val().trim();
    const levelVal = parseInt($('#charLevel').val(), 10);
    const goldVal = parseInt($('#charGold').val(), 10);
    const bpVal = parseInt($('#charBP').val(), 10);
    const hasData = name || !Number.isNaN(levelVal) || !Number.isNaN(goldVal) || !Number.isNaN(bpVal);
    if (!hasData) return null;
    return {
        name,
        level: Number.isFinite(levelVal) ? levelVal : 1,
        gold: Number.isFinite(goldVal) ? goldVal : 0,
        bp: Number.isFinite(bpVal) ? bpVal : 0
    };
}

function collectBastionFromForm() {
    const name = $('#bastionName').val().trim();
    const type = $('#bastionType').val() || 'Castle';
    const sizeVal = parseInt($('#bastionSize').val(), 10);
    const quality = $('#bastionQuality').val() || 'Frugal';
    const traitsInput = $('#bastionTraits').val();
    const traits = traitsInput ? traitsInput.split(',').map(s => s.trim()).filter(Boolean) : [];
    const hasData = name || traits.length || !Number.isNaN(sizeVal);
    if (!hasData) return null;
    return {
        name,
        type,
        size: Number.isFinite(sizeVal) ? sizeVal : 1,
        quality,
        traits
    };
}

function syncStateFromForms() {
    const formCharacter = collectCharacterFromForm();
    if (formCharacter) {
        character = formCharacter;
        bp = formCharacter.bp;
    } else {
        character = null;
        const bpInput = parseInt($('#charBP').val(), 10);
        bp = Number.isFinite(bpInput) ? bpInput : 0;
    }
    const formBastion = collectBastionFromForm();
    bastion = formBastion || null;
    updateCharacterSummary();
    updateBastionSummary();
}