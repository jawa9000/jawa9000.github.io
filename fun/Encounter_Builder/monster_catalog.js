$(() => { // jQuery's DOM ready shorthand
    const $statBlockContainer = $('#stat-block-container');
    const $monsterListUl = $('#monster-list ol'); // Fix: use ol, not ul

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

    function getUniqueLanguages() {
        const values = new Set();
        let hasTelepathy = false;
        let hasNA = false;
        monsters.forEach(monster => {
            if (monster.languages) {
                // Handle both array (legacy) and string (new format)
                let langList = [];
                if (Array.isArray(monster.languages)) {
                    langList = monster.languages;
                } else if (typeof monster.languages === 'string') {
                    // Split by comma and clean up
                    langList = monster.languages.split(',').map(l => l.trim()).filter(l => l);
                }
                
                langList.forEach(l => {
                    if (/telepathy/i.test(l)) {
                        hasTelepathy = true;
                    }
                    if (/^N\/A$/i.test(l)) {
                        hasNA = true;
                    }
                    if (l && !/^Any/i.test(l) && !/^All/i.test(l) && !/^The languages/i.test(l) && !/^Understands/i.test(l) && !/telepathy/i.test(l) && !/^N\/A$/i.test(l)) {
                        values.add(l);
                    }
                });
            }
        });
        if (hasTelepathy) values.add('Telepathy');
        if (hasNA) values.add('N/A');
        return Array.from(values).sort();
    }

    function populateFilterOptions() {
        // Do not touch #filter-environment, it's static in HTML now
        const types = getUniqueValues('type');
        const sizes = getUniqueValues('size');
        const crs = getUniqueCrValues();
        const aligns = getUniqueValues('alignment');
        const languages = getUniqueLanguages();
        types.forEach(t => $('#filter-type').append(`<option value="${t}">${t}</option>`));
        sizes.forEach(s => $('#filter-size').append(`<option value="${s}">${s}</option>`));
        crs.forEach(c => $('#filter-cr').append(`<option value="${c}">${c}</option>`));
        aligns.forEach(a => $('#filter-alignment').append(`<option value="${a}">${a}</option>`));
        languages.forEach(lang => $('#filter-language').append(`<option value="${lang}">${lang}</option>`));
    }

    function filterAndSortMonsters() {
        let filtered = [...monsters];
        const env = $('#filter-environment').val();
        const type = $('#filter-type').val();
        const size = $('#filter-size').val();
        const cr = $('#filter-cr').val();
        const align = $('#filter-alignment').val();
        const language = $('#filter-language').val();
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
        if (language) {
            filtered = filtered.filter(m => {
                if (!m.languages) return false;
                // Handle both array (legacy) and string (new format)
                if (Array.isArray(m.languages)) {
                    return m.languages.some(l => l.toLowerCase() === language.toLowerCase());
                } else if (typeof m.languages === 'string') {
                    // Split by comma and check each language
                    const langList = m.languages.split(',').map(l => l.trim());
                    return langList.some(l => l.toLowerCase() === language.toLowerCase());
                }
                return false;
            });
        }
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

    function hasProp(monster, prop) {
        // Case-insensitive property check for stat block fields
        return Object.keys(monster).some(k => k.toLowerCase() === prop.toLowerCase() && monster[k] && monster[k].toString().trim() !== '');
    }

    function renderMonsterList() {
        $monsterListUl.empty();
        let filtered = filterAndSortMonsters();
        const sort = $('#sort-monsters').val();
        if (filtered.length === 0) {
            $monsterListUl.html('<li>No monsters found.</li>');
            $statBlockContainer.html('<p>No monsters available to display.</p>');
            return;
        }
        // New: filter by stat block features
        if ($('#filter-reactions').is(':checked')) {
            filtered = filtered.filter(m => hasProp(m, 'reactions'));
        }
        if ($('#filter-bonus-actions').is(':checked')) {
            filtered = filtered.filter(m => hasProp(m, 'bonus actions'));
        }
        if ($('#filter-legendary-actions').is(':checked')) {
            filtered = filtered.filter(m => hasProp(m, 'legendary actions'));
        }
        if ($('#filter-lair-actions').is(':checked')) {
            filtered = filtered.filter(m => hasProp(m, 'lair actions'));
        }
        filtered.forEach((monster) => {
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
            // Remove manual numbering, let <ol> handle it
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

    // Helper: Get property value case-insensitively
    function getProp(obj, propName) {
        if (!obj || !propName) return undefined;
        if (obj.hasOwnProperty(propName)) return obj[propName];
        const lower = propName.toLowerCase();
        for (const key in obj) {
            if (key.toLowerCase() === lower) return obj[key];
        }
        return undefined;
    }

    // Helper: Format speed object to string
    function formatSpeed(speed) {
        if (!speed) return '';
        if (typeof speed === 'string') return speed; // Legacy format support
        if (typeof speed !== 'object') return '';
        
        const parts = [];
        if (speed.surface && speed.surface.movement) {
            parts.push(`${speed.surface.movement} ft.`);
        }
        if (speed.fly && speed.fly.movement) {
            parts.push(`fly ${speed.fly.movement} ft.`);
        }
        if (speed.swim && speed.swim.movement) {
            parts.push(`swim ${speed.swim.movement} ft.`);
        }
        if (speed.burrow && speed.burrow.movement) {
            parts.push(`burrow ${speed.burrow.movement} ft.`);
        }
        if (speed.climb && speed.climb.movement) {
            parts.push(`climb ${speed.climb.movement} ft.`);
        }
        if (speed.hover && speed.hover.movement) {
            parts.push(`hover ${speed.hover.movement} ft.`);
        }
        
        return parts.join(', ') || '';
    }

    // Helper: Format senses object to string
    function formatSenses(senses) {
        if (!senses) return '';
        if (typeof senses === 'string') return senses; // Legacy format support
        if (typeof senses !== 'object') return '';
        
        const parts = [];
        if (senses.Blindsight && senses.Blindsight.range) {
            parts.push(`Blindsight ${senses.Blindsight.range} ft.`);
        }
        if (senses.Darkvision && senses.Darkvision.range) {
            parts.push(`Darkvision ${senses.Darkvision.range} ft.`);
        }
        if (senses.Tremorsense && senses.Tremorsense.range) {
            parts.push(`Tremorsense ${senses.Tremorsense.range} ft.`);
        }
        if (senses.Truesight && senses.Truesight.range) {
            parts.push(`Truesight ${senses.Truesight.range} ft.`);
        }
        
        return parts.join(', ') || '';
    }

    // Helper: Format damage immunities array to string
    function formatDamageImmunities(immunities) {
        if (!immunities) return '';
        if (typeof immunities === 'string') return immunities; // Legacy format support
        if (Array.isArray(immunities)) {
            return immunities.join(', ');
        }
        return '';
    }

    function displayMonsterStats(monster) {
        $statBlockContainer.empty(); // Clear previous stats
        const $monsterDiv = $('<div></div>').addClass('stat-block');

        // Description at the top if present, using section formatting
        const description = getProp(monster, 'description');
        let descriptionSection = '';
        if (description) {
            descriptionSection = `<hr>${createHtmlSection('Description', description)}`;
        }

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

        // Show languages - handle both array (legacy) and string (new format)
        let languagesDisplay = '';
        if (monster.languages) {
            if (Array.isArray(monster.languages)) {
                languagesDisplay = monster.languages.join(', ');
            } else {
                languagesDisplay = monster.languages;
            }
        }

        $monsterDiv.html(`
            <h2>${monster.name}</h2>
            <p><em>${monster.size} ${monster.type}, ${monster.alignment}</em></p>
            ${descriptionSection}
            <hr>
            ${createPropertyHtml('Armor Class', getProp(monster, 'armor class'))}
            ${createPropertyHtml('Hit Points', getProp(monster, 'hit points'))}
            ${createPropertyHtml('Speed', formatSpeed(monster.speed))}
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
            ${createPropertyHtml('Saving Throws', getProp(monster, 'saving throws'))}
            ${createPropertyHtml('Skills', monster.skills)}
            ${createPropertyHtml('Damage Vulnerabilities', getProp(monster, 'damage vulnerabilities'))}
            ${createPropertyHtml('Damage Resistances', getProp(monster, 'damage resistances'))}
            ${createPropertyHtml('Damage Immunities', formatDamageImmunities(getProp(monster, 'damage immunities')))}
            ${createPropertyHtml('Condition Immunities', getProp(monster, 'condition immunities'))}
            ${createPropertyHtml('Senses', formatSenses(monster.senses))}
            ${createPropertyHtml('Languages', languagesDisplay)}
            ${createPropertyHtml('Challenge', monster.challenge)}
            ${createPropertyHtml('Environments', Array.isArray(monster.environments) ? monster.environments.join(', ') : monster.environments)}
            <p><span class="property-label">Associates:</span> ${associatesHtml}</p>
            ${monster.traits ? `<hr>${createHtmlSection('Traits', monster.traits)}` : ''}
            ${monster.actions ? `<hr>${createHtmlSection('Actions', monster.actions)}` : ''}
            ${monster.reactions ? `<hr>${createHtmlSection('Reactions', monster.reactions)}` : ''}
            ${getProp(monster, 'legendary actions') ? `<hr>${createHtmlSection('Legendary Actions', getProp(monster, 'legendary actions'))}` : ''}
            ${getProp(monster, 'bonus actions') ? `<hr>${createHtmlSection('Bonus Actions', getProp(monster, 'bonus actions'))}` : ''}
            ${getProp(monster, 'lair actions') ? `<hr>${createHtmlSection('Lair Actions', getProp(monster, 'lair actions'))}` : ''}
            ${getProp(monster, 'regional effects') ? `<hr>${createHtmlSection('Regional Effects', getProp(monster, 'regional effects'))}` : ''}
            ${getProp(monster, 'notes') ? `<hr>${createHtmlSection('Notes', getProp(monster, 'notes'))}` : ''}
        `);
        
        // Update all references from 'img_url' to 'img url' for monster images
        // Use getProp(monster, 'img url') instead of monster.img_url or monster["img_url"]
        const imgUrl = getProp(monster, 'img url');
        if (imgUrl) {
            const $img = $('<img>')
                            .attr('src', imgUrl)
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
    // Add event listeners for new filter checkboxes
    $(document).ready(function() {
        $('#filter-reactions, #filter-bonus-actions, #filter-legendary-actions, #filter-lair-actions').on('change', function() {
            renderMonsterList();
        });
    });
    renderMonsterList();
});