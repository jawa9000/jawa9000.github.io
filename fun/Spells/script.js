let allSpells = [];
let viewMode = 'card'; // 'card' or 'list'

// 1. Fetch Data
async function loadSpells() {
    try {
        const response = await fetch('spells.json');
        allSpells = await response.json();
        populateTagFilter(); // Populate tag dropdown
        filterSpells(); // Display initial list
    } catch (error) {
        console.error("Error loading spells:", error);
        document.getElementById('spellList').innerHTML = "<p>Error loading spell data.</p>";
    }
}

// Populate Tag Filter Dropdown
function populateTagFilter() {
    const allTags = new Set();
    
    allSpells.forEach(spell => {
        if (spell.tags && Array.isArray(spell.tags)) {
            spell.tags.forEach(tag => allTags.add(tag));
        }
    });

    const tagFilter = document.getElementById('tagFilter');
    const sortedTags = Array.from(allTags).sort();
    
    sortedTags.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag;
        tagFilter.appendChild(option);
    });
}

// 2. Filter and Sort Logic
function filterSpells() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const selectedClass = document.getElementById('classFilter').value;
    const selectedLevel = document.getElementById('levelFilter').value;
    const selectedSchool = document.getElementById('schoolFilter').value;
    const selectedTag = document.getElementById('tagFilter').value;
    const isRitualOnly = document.getElementById('ritualFilter').checked;
    
    const vReq = document.getElementById('vComp').checked;
    const sReq = document.getElementById('sComp').checked;
    const mReq = document.getElementById('mComp').checked;

    const filtered = allSpells.filter(spell => {
        const matchesSearch = spell.name.toLowerCase().includes(searchTerm);
        const matchesClass = selectedClass === 'all' || spell.classes.includes(selectedClass);
        const matchesLevel = selectedLevel === 'all' || spell.level.toString() === selectedLevel;
        const matchesSchool = selectedSchool === 'all' || spell.school === selectedSchool;
        const matchesTag = selectedTag === 'all' || (spell.tags && spell.tags.includes(selectedTag));
        const matchesRitual = !isRitualOnly || spell.ritual === true;
        
        const matchesV = !vReq || spell.components.includes('V');
        const matchesS = !sReq || spell.components.includes('S');
        const matchesM = !mReq || spell.components.includes('M');

        return matchesSearch && matchesClass && matchesLevel && 
               matchesSchool && matchesTag && matchesRitual && matchesV && matchesS && matchesM;
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
    document.getElementById('tagFilter').value = 'all';
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

    if (viewMode === 'card') {
        displayCardView(container, spells);
    } else {
        displayListView(container, spells);
    }
}

function displayCardView(container, spells) {
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

function displayListView(container, spells) {
    container.innerHTML = `<div class="spell-list"><ul>${spells.map((spell, index) => {
        return `
            <li class="spell-item" data-spell-name="${spell.name}">
                <a href="#" class="spell-link" data-spell-index="${index}">${spell.name}</a>
                <div class="spell-details-inline" style="display: none;"></div>
            </li>
        `;
    }).join('')}</ul></div>`;
    
    // Add event listeners to spell links
    container.querySelectorAll('.spell-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const index = this.getAttribute('data-spell-index');
            const spellItem = this.closest('.spell-item');
            const detailsDiv = spellItem.querySelector('.spell-details-inline');
            
            // Toggle display
            if (detailsDiv.style.display === 'none') {
                detailsDiv.innerHTML = createSpellDetails(spells[index]);
                detailsDiv.style.display = 'block';
            } else {
                detailsDiv.style.display = 'none';
            }
        });
    });
}

function createSpellDetails(spell) {
    const conBadge = spell.concentration ? '<span class="badge concentration">C</span>' : '';
    const ritualBadge = spell.ritual ? '<span class="badge ritual">R</span>' : '';
    const saveSection = spell.save_type 
        ? `<span class="save-tag">Save: ${spell.save_type}</span>` 
        : '';
    const higherLevelsSection = spell.higher_levels 
        ? `<div class="higher-levels"><strong>At Higher Levels:</strong> ${spell.higher_levels}</div>` 
        : '';
    const classList = spell.classes.join(', ');

    return `
        <div class="spell-details-content">
            <div class="spell-header">
                <div>
                    <h4>${spell.name}</h4>
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

            <div class="description">
                ${spell.description}
            </div>

            ${higherLevelsSection}

            <div class="spell-footer">
                <strong>Classes:</strong> ${classList}
            </div>
        </div>
    `;
}

// Event Listeners
document.querySelectorAll('input, select').forEach(el => {
    el.addEventListener(el.type === 'text' ? 'input' : 'change', filterSpells);
});
document.getElementById('clearFilters').addEventListener('click', resetFilters);

// View Toggle Event Listeners
document.getElementById('cardViewBtn').addEventListener('click', function() {
    viewMode = 'card';
    document.getElementById('cardViewBtn').classList.add('active');
    document.getElementById('listViewBtn').classList.remove('active');
    filterSpells();
});

document.getElementById('listViewBtn').addEventListener('click', function() {
    viewMode = 'list';
    document.getElementById('listViewBtn').classList.add('active');
    document.getElementById('cardViewBtn').classList.remove('active');
    filterSpells();
});

// Start
loadSpells();