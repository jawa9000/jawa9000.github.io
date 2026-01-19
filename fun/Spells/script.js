let allSpells = [];

// 1. Fetch Data
async function loadSpells() {
    try {
        const response = await fetch('spells.json');
        allSpells = await response.json();
        filterSpells(); // Display initial list
    } catch (error) {
        console.error("Error loading spells:", error);
        document.getElementById('spellList').innerHTML = "<p>Error loading spell data.</p>";
    }
}

// 2. Filter and Sort Logic
function filterSpells() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const selectedClass = document.getElementById('classFilter').value;
    const selectedLevel = document.getElementById('levelFilter').value;
    const selectedSchool = document.getElementById('schoolFilter').value;
    const isRitualOnly = document.getElementById('ritualFilter').checked;
    
    const vReq = document.getElementById('vComp').checked;
    const sReq = document.getElementById('sComp').checked;
    const mReq = document.getElementById('mComp').checked;

    const filtered = allSpells.filter(spell => {
        const matchesSearch = spell.name.toLowerCase().includes(searchTerm);
        const matchesClass = selectedClass === 'all' || spell.classes.includes(selectedClass);
        const matchesLevel = selectedLevel === 'all' || spell.level.toString() === selectedLevel;
        const matchesSchool = selectedSchool === 'all' || spell.school === selectedSchool;
        const matchesRitual = !isRitualOnly || spell.ritual === true;
        
        const matchesV = !vReq || spell.components.includes('V');
        const matchesS = !sReq || spell.components.includes('S');
        const matchesM = !mReq || spell.components.includes('M');

        return matchesSearch && matchesClass && matchesLevel && 
               matchesSchool && matchesRitual && matchesV && matchesS && matchesM;
    });

    // Sort by Level, then Alphabetically
    filtered.sort((a, b) => {
        if (a.level !== b.level) return a.level - b.level;
        return a.name.localeCompare(b.name);
    });

    displaySpells(filtered);
}

// 3. Reset All Logic
function resetFilters() {
    document.getElementById('searchBar').value = '';
    document.getElementById('classFilter').value = 'all';
    document.getElementById('levelFilter').value = 'all';
    document.getElementById('schoolFilter').value = 'all';
    document.getElementById('ritualFilter').checked = false;
    document.getElementById('vComp').checked = false;
    document.getElementById('sComp').checked = false;
    document.getElementById('mComp').checked = false;
    filterSpells();
}

// 4. Render to HTML
function displaySpells(spells) {
    const container = document.getElementById('spellList');
    
    if (spells.length === 0) {
        container.innerHTML = "<p class='no-results'>No spells match your filters.</p>";
        return;
    }

    container.innerHTML = spells.map(spell => {
        // Handle Concentration Badge
        const conBadge = spell.concentration ? '<span class="badge concentration">C</span>' : '';
        const ritualBadge = spell.ritual ? '<span class="badge ritual">R</span>' : '';
        
        // Optional Save Type section
        const saveSection = spell.save_type 
            ? `<span class="save-tag">Save: ${spell.save_type}</span>` 
            : '';

        // Optional Higher Levels section
        const higherLevelsSection = spell.higher_levels 
            ? `<div class="higher-levels"><strong>At Higher Levels:</strong> ${spell.higher_levels}</div>` 
            : '';

        // Format classes for display
        const classList = spell.classes.join(', ');

        return `
            <div class="spell-card">
                <div class="spell-header">
                    <div>
                        <h3>${spell.name}</h3>
                        <div class="spell-meta">Level ${spell.level === 0 ? 'Cantrip' : spell.level} • ${spell.school}</div>
                    </div>
                    <div class="badges">
                        ${conBadge}
                        ${ritualBadge}
                    </div>
                </div>

                <div class="spell-stats">
                    <p><strong>Casting Time:</strong> ${spell.casting_time}</p>
                    <p><strong>Range:</strong> ${spell.range}</p>
                    <p><strong>Duration:</strong> ${spell.duration}</p>
                    <p><strong>Components:</strong> ${spell.components}</p>
                </div>

                ${saveSection}

                <hr>

                <div class="description">
                    ${spell.description}
                </div>

                ${higherLevelsSection}

                <div class="spell-footer">
                    <strong>Classes:</strong> ${classList}
                </div>
            </div>
        `;
    }).join('');
}

// Event Listeners
document.querySelectorAll('input, select').forEach(el => {
    el.addEventListener(el.type === 'text' ? 'input' : 'change', filterSpells);
});
document.getElementById('clearFilters').addEventListener('click', resetFilters);

// Start
loadSpells();