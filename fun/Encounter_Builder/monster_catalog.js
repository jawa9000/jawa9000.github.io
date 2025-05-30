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

    const sortedMonsters = [...monsters].sort((a, b) => a.name.localeCompare(b.name));

    sortedMonsters.forEach(monster => {
        const $listItem = $('<li></li>')
                            .text(monster.name)
                            .on('click', () => displayMonsterStats(monster));
        $monsterListUl.append($listItem);
    });

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
            ${createPropertyHtml('Associates', Array.isArray(monster.associates) ? monster.associates.join(', ') : monster.associates)}
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

    if (sortedMonsters.length === 0) {
        $monsterListUl.html('<li>No monsters found.</li>');
        $statBlockContainer.html('<p>No monsters available to display.</p>');
    }
});