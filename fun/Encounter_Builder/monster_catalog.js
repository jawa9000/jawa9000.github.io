$(() => { // jQuery's DOM ready shorthand
    const $statBlockContainer = $('#stat-block-container');
    const $monsterListUl = $('#monster-list ul');

    if (typeof monsters === 'undefined' || !Array.isArray(monsters)) {
        console.error('Error: `monsters` array not found. Ensure monsters.js is loaded and defines `monsters`.');
        $statBlockContainer.html('<p>Error loading monster data. Check console.</p>');
        $monsterListUl.html('<li>Error loading monster data.</li>');
        return;
    }
    // Correctly check for the plural 'abilityScoreModifiers' and ensure it's a non-empty array
    if (typeof abilityScoreModifiers === 'undefined' || 
        !Array.isArray(abilityScoreModifiers) || 
        abilityScoreModifiers.length === 0 ||
        typeof abilityScoreModifiers[0] !== 'object' ||
        abilityScoreModifiers[0] === null) {
        console.error('Error: `abilityScoreModifiers` array not found, is empty, or not structured as expected. Ensure ability_score_modifier.js is loaded correctly.');
        // Depending on desired behavior, you might want to show an error or proceed without modifiers.
    }

    // --- FILTER AND SORT SUPPORT ---
    function getUniqueValues(key, isArray) {
        const values = new Set();
        monsters.forEach(monster => {
            if (isArray && Array.isArray(monster[key])) {
                monster[key].forEach(v => v && values.add(v));
            } else if (monster[key]) {
                values.add(monster[key]);
            }
        });
        return Array.from(values).sort();
    }

    function getCrSortValue(crString) {
        if (!crString) return 0;
        // Extract the CR value (e.g., '1/4', '2', '10') from the challenge string
        let cr = String(crString).split(' ')[0].trim();
        if (cr === '0') return 0;
        if (cr === '1/8') return 0.125;
        if (cr === '1/4') return 0.25;
        if (cr === '1/2') return 0.5;
        let n = parseFloat(cr);
        return isNaN(n) ? 0 : n;
    }

    function getUniqueCrValues() {
        const values = new Set();
        monsters.forEach(monster => {
            if (monster.challenge) {
                let cr = String(monster.challenge).split(' ')[0].trim();
                values.add(cr);
            }
        });
        // Sort by numeric value using getCrSortValue
        return Array.from(values).sort((a, b) => getCrSortValue(a) - getCrSortValue(b));
    }

    function populateFilterOptions() {
        // Do not touch #filter-environment, it's static in HTML now
        const types = getUniqueValues('type');
        const sizes = getUniqueValues('size');
        const crs = getUniqueCrValues();
        const aligns = getUniqueValues('alignment');
        types.forEach(t => $('#filter-type').append(`<option value="${t}">${t}</option>`));
        sizes.forEach(s => $('#filter-size').append(`<option value="${s}">${s}</option>`));
        crs.forEach(c => $('#filter-cr').append(`<option value="${c}">${c}</option>`));
        aligns.forEach(a => $('#filter-alignment').append(`<option value="${a}">${a}</option>`));
    }

    function filterAndSortMonsters() {
        let filtered = [...monsters];
        const env = $('#filter-environment').val();
        const type = $('#filter-type').val();
        const size = $('#filter-size').val();
        const cr = $('#filter-cr').val();
        const align = $('#filter-alignment').val();
        const sort = $('#sort-monsters').val();
        // Only filter by environment if not 'Any' (or blank)
        if (env && env !== 'Any') filtered = filtered.filter(m => Array.isArray(m.environments) && m.environments.includes(env));
        if (type) filtered = filtered.filter(m => m.type === type);
        if (size) filtered = filtered.filter(m => m.size === size);
        if (cr) filtered = filtered.filter(m => {
            if (!m.challenge) return false;
            let mCr = String(m.challenge).split(' ')[0].trim();
            return mCr === cr;
        });
        if (align) filtered = filtered.filter(m => m.alignment === align);
        filtered.sort((a, b) => {
            if (sort === 'cr') {
                const crA = getCrSortValue(a.challenge);
                const crB = getCrSortValue(b.challenge);
                return crA - crB;
            }
            return String(a[sort] || '').localeCompare(String(b[sort] || ''));
        });
        return filtered;
    }

    function renderMonsterList() {
        $monsterListUl.empty();
        const filtered = filterAndSortMonsters();
        const sort = $('#sort-monsters').val();
        if (filtered.length === 0) {
            $monsterListUl.html('<li>No monsters found.</li>');
            $statBlockContainer.html('<p>No monsters available to display.</p>');
            return;
        }
        filtered.forEach(monster => {
            let displayName = monster.name;
            if (sort && sort !== 'name') {
                let sortValue = '';
                if (sort === 'cr') {
                    sortValue = String(monster.challenge || '');
                } else {
                    sortValue = monster[sort] || '';
                }
                if (sortValue) {
                    displayName += ` [${sortValue}]`;
                }
            }
            // Only show monster name in the index, no associates
            const $listItem = $('<li></li>');
            const $nameSpan = $('<span></span>').addClass('monster-name').text(displayName).css('cursor', 'pointer');
            $nameSpan.on('click', () => displayMonsterStats(monster));
            $listItem.append($nameSpan);
            $monsterListUl.append($listItem);
        });
        // Remove associates from the index list, keep click handler for monster name only
    }

    function getAbilityScoreDisplay(scoreValue) {
        // Handles cases where scoreValue is undefined, null, or an empty/whitespace string
        if (scoreValue === null || scoreValue === undefined || String(scoreValue).trim() === "") {
            return '-';
        }

        const scoreString = String(scoreValue); // Ensure we're working with a string
        let modifierFormatted = '(?)'; // Default if modifier not found

        // Use the correctly named 'abilityScoreModifiers' global variable
        if (typeof abilityScoreModifiers !== 'undefined' &&
            Array.isArray(abilityScoreModifiers) &&
            abilityScoreModifiers.length > 0 &&
            typeof abilityScoreModifiers[0] === 'object' &&
            abilityScoreModifiers[0] !== null &&
            abilityScoreModifiers[0].hasOwnProperty(scoreString) // Check if the score (as a string key) exists
        ) {
            const modifier = abilityScoreModifiers[0][scoreString];
            if (modifier >= 0) {
                modifierFormatted = `(+${modifier})`;
            } else {
                modifierFormatted = `(${modifier})`;
            }
        }
        return `${scoreString} ${modifierFormatted}`;
    }


    function displayMonsterStats(monster) {
        $statBlockContainer.empty(); // Clear previous stats
        const $monsterDiv = $('<div></div>').addClass('stat-block');

        // Associates clickable comma-separated list
        let associatesHtml = '';
        if (monster.associates && Array.isArray(monster.associates) && monster.associates.length > 0) {
            associatesHtml = monster.associates.map((name, idx) => {
                const exists = monsters.some(m => m.name === name);
                if (exists) {
                    return `<span class="associate-link associate-present" data-monster="${name}">${name}</span>`;
                } else {
                    return `<span class="associate-not-present" title="Associate currently not found">${name}</span>`;
                }
            }).join(', ');
        } else if (monster.associates) {
            associatesHtml = `<span>${monster.associates}</span>`;
        } else {
            associatesHtml = '<span>None</span>';
        }

        $monsterDiv.html(`
            <h2>${monster.name}</h2>
            <p><em>${monster.size} ${monster.type}, ${monster.alignment}</em></p>
            <hr>
            ${createPropertyHtml('Armor Class', monster.armor_class)}
            ${createPropertyHtml('Hit Points', monster.hit_points)}
            ${createPropertyHtml('Speed', monster.speed)}
            <hr>
            <table class="stats-table">
                <tr><th>STR</th><th>DEX</th><th>CON</th><th>INT</th><th>WIS</th><th>CHA</th></tr>
                <tr>
                    <td>${getAbilityScoreDisplay(monster.str)}</td>
                    <td>${getAbilityScoreDisplay(monster.dex)}</td>
                    <td>${getAbilityScoreDisplay(monster.con)}</td>
                    <td>${getAbilityScoreDisplay(monster.int)}</td>
                    <td>${getAbilityScoreDisplay(monster.wis)}</td>
                    <td>${getAbilityScoreDisplay(monster.cha)}</td>
                    </tr>
            </table>
            <hr>
            ${createPropertyHtml('Saving Throws', monster.saving_throws)}
            ${createPropertyHtml('Skills', monster.skills)}
            ${createPropertyHtml('Damage Vulnerabilities', monster.damage_vulnerabilities)}
            ${createPropertyHtml('Damage Resistances', monster.damage_resistances)}
            ${createPropertyHtml('Damage Immunities', monster.damage_immunities)}
            ${createPropertyHtml('Condition Immunities', monster.condition_immunities)}
            ${createPropertyHtml('Senses', monster.senses)}
            ${createPropertyHtml('Languages', monster.languages)}
            ${createPropertyHtml('Challenge', monster.challenge)}
            ${createPropertyHtml('Environments', Array.isArray(monster.environments) ? monster.environments.join(', ') : monster.environments)}
            <p><span class="property-label">Associates:</span> ${associatesHtml}</p>
            ${monster.traits ? `<hr>${createHtmlSection('Traits', monster.traits)}` : ''}
            ${monster.actions ? `<hr>${createHtmlSection('Actions', monster.actions)}` : ''}
            ${monster.reactions ? `<hr>${createHtmlSection('Reactions', monster.reactions)}` : ''}
            ${monster.legendary_actions ? `<hr>${createHtmlSection('Legendary Actions', monster.legendary_actions)}` : ''}
        `);
        
        if (monster.img_url) {
            const $img = $('<img>')
                            .attr('src', monster.img_url)
                            .attr('alt', monster.name)
                            .css({
                                'maxWidth': '200px',
                                'maxHeight': '200px',
                                'marginTop': '10px',
                                'display': 'block'
                            });
            $monsterDiv.append($img);
        }

        $statBlockContainer.append($monsterDiv);
        $('html, body').scrollTop(0); // Scroll the entire page to the top

        // Attach click handler for associates (span version)
        $monsterDiv.find('.associate-link').off('click').on('click', function() {
            const name = $(this).data('monster');
            const assocMonster = monsters.find(m => m.name === name);
            if (assocMonster) {
                displayMonsterStats(assocMonster);
            }
        });
    }

    function createPropertyHtml(label, value) {
        if (value === undefined || value === null || String(value).trim() === "") return '';
        return `<p><span class="property-label">${label}:</span> ${value}</p>`;
    }

    function createHtmlSection(title, htmlContent) {
        if (htmlContent === undefined || htmlContent === null || String(htmlContent).trim() === "") return '';
        return `
            <div>
                <h3 class="section-title">${title}</h3>
                <div class="html-content">${htmlContent}</div>
            </div>
        `;
    }

    // Populate filter options and bind events
    populateFilterOptions();
    $('#monster-filters select').on('change', renderMonsterList);
    renderMonsterList();
});