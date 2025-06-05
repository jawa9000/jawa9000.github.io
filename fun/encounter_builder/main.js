/**
 * @file Main JavaScript file for the Monster Encounter Generator application.
 * Handles user interactions, fetches data, generates encounter options, and displays results.
 */

let pcCount = 1;
let pcLevel = 1; // sum of all PC levels
let difficulty = "Any";
let environment = "Any";

/**
 * @function
 * @name $(document).ready
 * @description Executes when the DOM is fully loaded. Initializes the application by:
 * 1. Displaying the total count of available monsters.
 * 2. Setting up event listeners for user input changes (pcCount, pcLevels, difficulty, environment)
 *    and button clicks, all of which trigger the encounter generation process.
 *
 * @param {function} callback - The function to execute once the DOM is ready.
 *
 * @listens {change} on `input, select` elements - Triggers `generatePcLevelInputs`.
 * @listens {click} on `button` elements - Triggers `generatePcLevelInputs`.
 *
 * @careful_modification
 * - Modifying the event listeners or the functions they call (`generatePcLevelInputs`) can break the core user interaction flow and prevent encounters from being generated or updated.
 * - Ensure that any new interactive elements that should trigger encounter regeneration are also bound here.
 * - The initial monster count display relies on the `monsters` global variable being available.
 */
$(document).ready(function() { // listeners
    // Count monsters and update the display
    const monsterCount = monsters.length;
    $("span#monsterCount").text(monsterCount);

    // Reset the URL for each user action
    function resetUrl() {
        if (window.history && window.history.replaceState) {
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }

    $("input, select").change(function() {
        resetUrl();
        generatePcLevelInputs();
    });

    $("button").on('click', function() {
        resetUrl();
        generatePcLevelInputs();
    });

    // Attach plus/minus handlers for monster count adjustment
    function recalcEncounter(encounterIdx) {
        var encounterList = $("#encounterList").find("h4:contains('Encounter Option " + (encounterIdx+1) + "')").nextAll('ol').first();
        var monstersList = [];
        encounterList.find("li").each(function() {
            var count = parseInt($(this).find('.monster-count').text(), 10);
            var monster = $(this).find('a.monsterLink').text();
            for (var i=0; i<count; i++) monstersList.push(monster);
        });
        var totalXP = 0;
        monstersList.forEach(function(monsterName) {
            var xp = 0;
            var m = monsters.find(m => m.name === monsterName);
            if (m && m.challenge) {
                var parts = m.challenge.split(' ');
                if (parts.length > 1 && parts[1]) xp = parseInt(parts[1].replace(/[(),]/g, ""), 10);
            }
            totalXP += xp;
        });
        var xpMultiplier = getEncounterXpMultiplier(monstersList.length);
        var adjustedXP = Math.floor(totalXP * xpMultiplier);
        var pcCount = $("input#pcCount").val();
        var pcLevel = $("input#pcLevels").val();
        var difficulty = $("select#difficulty").val().toLowerCase();
        var singlePcXpThresholds = null;
        var numericPcLevel = parseInt(pcLevel, 10);
        if (numericPcLevel >= 1 && numericPcLevel <= 20) {
            singlePcXpThresholds = xp_thresholds.encounterDifficulty[pcLevel];
        } else if (numericPcLevel > 20 && numericPcLevel <= 50) {
            singlePcXpThresholds = xp_thresholds[pcLevel];
        }
        var encounterDifficultyRating = "Trivial";
        if (singlePcXpThresholds) {
            var partyEasyThreshold = singlePcXpThresholds.easy * parseInt(pcCount, 10);
            var partyMediumThreshold = singlePcXpThresholds.medium * parseInt(pcCount, 10);
            var partyHardThreshold = singlePcXpThresholds.hard * parseInt(pcCount, 10);
            var partyDeadlyThreshold = singlePcXpThresholds.deadly * parseInt(pcCount, 10);
            if (adjustedXP >= partyDeadlyThreshold) {
                encounterDifficultyRating = "Deadly";
            } else if (adjustedXP >= partyHardThreshold) {
                encounterDifficultyRating = "Hard";
            } else if (adjustedXP >= partyMediumThreshold) {
                encounterDifficultyRating = "Medium";
            } else if (adjustedXP >= partyEasyThreshold) {
                encounterDifficultyRating = "Easy";
            }
        }
        var h4 = $("#encounterList").find("h4:contains('Encounter Option " + (encounterIdx+1) + "')");
        h4.html(`Encounter Option ${encounterIdx+1} (Raw XP: ${formatNumberWithCommas(totalXP)}, Adjusted XP: ${formatNumberWithCommas(adjustedXP)}, Party Difficulty: ${encounterDifficultyRating})`);
    }
    $(document).off('click', '.monster-add-count').on('click', '.monster-add-count', function() {
        var encounterIdx = parseInt($(this).data('encounter'), 10);
        var monster = $(this).data('monster');
        var slug = window.createMonsterSlug(monster);
        var countSpan = $("#monster-count-"+encounterIdx+"-"+slug);
        var count = parseInt(countSpan.text(), 10);
        countSpan.text(count+1);
        recalcEncounter(encounterIdx);
    });
    $(document).off('click', '.monster-remove-count').on('click', '.monster-remove-count', function() {
        var encounterIdx = parseInt($(this).data('encounter'), 10);
        var monster = $(this).data('monster');
        var slug = createMonsterSlug(monster);
        var countSpan = $("#monster-count-"+encounterIdx+"-"+slug);
        var count = parseInt(countSpan.text(), 10);
        if (count > 1) {
            countSpan.text(count-1);
            recalcEncounter(encounterIdx);
        } else if (count === 1) {
            // Remove the entire <li> for this monster
            countSpan.closest('li').remove();
            recalcEncounter(encounterIdx);
        }
    });
});

// functions

/**
 * @function formatNumberWithCommas
 * @description Formats a given number by adding commas as thousands separators.
 * If the input is null or undefined, it returns an empty string.
 *
 * @param {number|null|undefined} number - The number to format.
 * @returns {string} The formatted number as a string, or an empty string if the input is invalid.
 *
 * @careful_modification
 * - This is a display utility function. Incorrect modifications could lead to misleading XP values or counts for the user.
 * - While relatively isolated, ensure any changes to the regex or logic correctly handle various numeric inputs (integers, potentially decimals if requirements change, negative numbers though not expected here).
 */
function formatNumberWithCommas(number) {
  if (number === null || number === undefined) {
    return '';
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * @function createMonsterSlug
 * @description Converts a monster name into a URL-friendly slug.
 * This involves converting the name to lowercase, replacing spaces with hyphens,
 * and removing any characters that are not alphanumeric or hyphens.
 * This slug is primarily used for creating anchor links to monster stat blocks.
 *
 * @param {string} monsterName - The name of the monster.
 * @returns {string} A URL-friendly slug. Returns an empty string if `monsterName` is falsy.
 *
 * @careful_modification
 * - This function is critical for linking encounter options to their detailed stat blocks.
 * - If the slug generation logic is changed, it must also be updated wherever these slugs are used as `id` attributes for the stat block divs (e.g., in `generatePcLevelInputs`).
 * - Inconsistency will break the in-page navigation to monster details.
 */
function createMonsterSlug(monsterName) {
    if (!monsterName) return '';
    return monsterName.toLowerCase()
                      .replace(/\s+/g, '-') // Replace spaces with hyphens
                      .replace(/[^a-z0-9-]/g, ''); // Remove non-alphanumeric characters except hyphens
}

/**
 * @function getEncounterXpMultiplier
 * @description Calculates the XP multiplier for an encounter based on the number of monsters.
 * This multiplier is used to determine the adjusted XP value of an encounter, which reflects its true difficulty.
 * The multipliers are based on a popular RPG rule set.
 *
 * @param {number} monsterCount - The total number of monsters in the encounter.
 * @returns {number} The XP multiplier. Returns 0 if monsterCount is non-positive,
 *                   and 1 as a fallback for unexpected positive counts not covered by specific rules.
 *
 * @careful_modification
 * - This function implements a core RPG game mechanic for encounter balancing.
 * - Modifying these multiplier values or the conditions under which they apply will directly impact the accuracy of the calculated encounter difficulty.
 * - Ensure any changes align with official RPG rules or clearly documented house rules if intended.
 * - This function's logic should correspond to the data structure in `encounter_multiplier.js` if that file were to be used directly (though currently, the logic is hardcoded here).
 */
function getEncounterXpMultiplier(monsterCount) {
    if (monsterCount <= 0) return 0; // No monsters, no XP multiplier.
    if (monsterCount === 1) return 1;
    if (monsterCount === 2) return 1.5;
    if (monsterCount >= 3 && monsterCount <= 6) return 2;
    if (monsterCount >= 7 && monsterCount <= 10) return 2.5;
    if (monsterCount >= 11 && monsterCount <= 14) return 3;
    if (monsterCount >= 15) return 4;
    // Should ideally not be reached if monsterCount is positive,
    // but as a fallback for unexpected counts > 0.
    return 1;
}

/**
 * @function generatePcLevelInputs
 * @description Main function to generate and display encounter options based on user inputs.
 * It reads PC count, average PC level, desired difficulty, and environment.
 * It calculates the target XP, filters available monsters, generates encounter suggestions,
 * and then renders these suggestions along with detailed monster stat blocks.
 *
 * @param {number} [pcCount_param] - (Note: Parameter is named with _param to avoid conflict with global `pcCount`, but the function actually reads from DOM) The number of player characters.
 * @param {number} [pcLevel_param] - (Note: Parameter is named with _param to avoid conflict with global `pcLevel`, but the function actually reads from DOM) The average level of player characters.
 * @param {string} [difficulty_param] - (Note: Parameter is named with _param to avoid conflict with global `difficulty`, but the function actually reads from DOM) The desired encounter difficulty (e.g., "easy", "medium", "hard", "deadly", "any").
 * @param {string} [environment_param] - (Note: Parameter is named with _param to avoid conflict with global `environment`, but the function actually reads from DOM) The desired encounter environment (e.g., "Forest", "Arctic", "Any").
 *
 * @outputs HTML content to `div#encounterList` and `div#monsterStats`.
 *
 * @depends_on_globals `monsters`, `xp_thresholds`, `environments`, `ability_score_modifier`.
 * @calls `formatNumberWithCommas`, `createMonsterSlug`, `getEncounterXpMultiplier`, `generateEncounterOptionsImproved`.
 *
 * @careful_modification
 * - **Core Logic**: This is the central function of the application. Changes can have widespread effects.
 * - **Input Reading**: Altering how `currentPcCount`, `pcLevel`, `difficulty`, or `environmentSelected` are read from the DOM will break input processing.
 * - **XP Calculation**: Relies heavily on the structure and content of the `xp_thresholds` global object. If `xp_thresholds` changes, this function's logic for accessing XP values might need updates. Incorrect XP calculation will lead to poorly balanced encounters.
 * - **Randomization**: The logic for handling "Any" difficulty or "Any" environment involves random selection. Changes here could affect the variety or predictability of suggestions.
 * - **Monster Filtering**: The process of creating `availableMonstersForEnvironment` is crucial. Modifying the filtering criteria (e.g., how monster XP is extracted or how monsters are matched to environments) can drastically change the pool of monsters available for encounter generation, potentially leading to no options or irrelevant options.
 * - **HTML Generation**: The dynamic HTML generation for encounter options and monster stats is complex. Changes require careful testing to ensure layout, links (using `createMonsterSlug`), and data display remain correct.
 * - **Error Handling**: The current error handling for missing XP thresholds is basic. More robust error handling might be needed if the data sources (`xp_thresholds`, `monsters`, `environments`) become unreliable or if user inputs lead to unexpected states.
 * - **Performance**: For very large datasets or extremely complex filtering, performance could become a concern, though current pre-filtering helps.
 */
function generatePcLevelInputs(pcCount, pcLevel, difficulty, environment) {
    let currentPcCount = $("input#pcCount").val();
    pcLevel = $("input#pcLevels").val();
    difficulty = $("select#difficulty").val().toLowerCase();
    environmentSelected = $("select#environment").val();
    let crMin = $('#crMin').val();
    let crMax = $('#crMax').val();
    let selectedMonsterType = $('#monsterType').val();
    // Helper to convert CR string to numeric value for comparison
    function crToNumber(cr) {
        if (typeof cr === 'number') return cr;
        if (cr === '0') return 0;
        if (cr === '1/8') return 0.125;
        if (cr === '1/4') return 0.25;
        if (cr === '1/2') return 0.5;
        let n = Number(cr);
        return isNaN(n) ? 0 : n;
    }
    let crMinNum = crToNumber(crMin);
    let crMaxNum = crToNumber(crMax);

    // Clear previous monster stats display
    $('div#monsterStats').html('');
    let monsterStatsContent = "";
    const displayedMonsterStats = new Set(); // To track monsters whose stats have been added
    if (pcCount < 1) { // prevent zero enteries
        pcCount = 1;
    }

    if (pcLevel < 1) { // prevent zero enteries
        pcLevel = 1;
    }

    let xpTally = 0;
    const numericPcLevel = parseInt(pcLevel, 10);

    if (difficulty == 'any') { // if difficulty == any, randomly pick a difficulty level
        let randomDifficulty = ["easy", "medium", "hard", "deadly"];
        let randomIndex = Math.floor(Math.random() * randomDifficulty.length);

        difficulty = randomDifficulty[randomIndex];
    }

    if (environmentSelected == 'Any') { // if environment == any, randomly pick an environment.
        const allPossibleEnvironments = new Set();
        monsters.forEach(monster => {
            if (monster.environments && Array.isArray(monster.environments)) {
                monster.environments.forEach(env => {
                    if (env && typeof env === 'string') { // Ensure env is a valid string
                        allPossibleEnvironments.add(env);
                    }
                });
            }
        });
        const environmentOptions = Array.from(allPossibleEnvironments);

        if (environmentOptions.length > 0) {
            let randomIndex = Math.floor(Math.random() * environmentOptions.length);
            environmentSelected = environmentOptions[randomIndex];
        } else {
            console.warn("No environments found in monsters.js to pick from for 'Any' environment selection. 'Any' will mean no environment filter.");
            // environmentSelected remains "Any", implying no specific environment filter if no options found
        }
    }

    // Calculate the XP threshold total
    let singlePcXpThresholds;
    if (numericPcLevel >= 1 && numericPcLevel <= 20) {
        singlePcXpThresholds = xp_thresholds.encounterDifficulty[pcLevel];
    } else if (numericPcLevel > 20 && numericPcLevel <= 50) {
        singlePcXpThresholds = xp_thresholds[pcLevel];
    }

    if (singlePcXpThresholds && singlePcXpThresholds[difficulty]) {
        xpTally = singlePcXpThresholds[difficulty] * parseInt(currentPcCount, 10);
    } else {
        console.error(`XP threshold not found for level ${pcLevel} (numeric: ${numericPcLevel}) and difficulty ${difficulty}`);
        $('div#encounterList').html('<p>Error: Could not determine XP threshold for the selected PC level and difficulty. Please ensure the level is between 1 and 50.</p>');
        $('div#monsterStats').html(''); // Also clear monster stats on error
        return; // Exit if no valid XP threshold
    }


    // Generate a list of possible monsters for the selected environment that fall within the xpTally limit (as a pre-filter)
    let availableMonstersForEnvironment = {};
    for (const monsterData of monsters) {
        let isMonsterInEnvironment = false;
        if (environmentSelected === "Any") {
            isMonsterInEnvironment = true;
        } else if (monsterData.environments && Array.isArray(monsterData.environments)) {
            isMonsterInEnvironment = monsterData.environments.includes(environmentSelected);
        }
        // Filter by monster type if not 'Any'
        let isMonsterOfType = true;
        if (selectedMonsterType && selectedMonsterType !== 'Any') {
            isMonsterOfType = (monsterData.type && monsterData.type.toLowerCase() === selectedMonsterType.toLowerCase());
        }
        if (isMonsterInEnvironment && isMonsterOfType) {
            const challengeString = monsterData.challenge;
            if (!challengeString) {
                console.warn(`Monster ${monsterData.name} is missing Challenge information.`);
                continue;
            }
            // Extract CR value (first part of challenge string)
            const crString = challengeString.split(' ')[0];
            const crNum = crToNumber(crString);
            // Only include monsters within CR min/max
            if (crNum < crMinNum || crNum > crMaxNum) continue;
            const challengeParts = challengeString.split(' ');
            let monsterXpString = "0";
            if (challengeParts.length > 1 && challengeParts[1]) {
                monsterXpString = challengeParts[1].replace(/[(),]/g, "");
            }
            const monsterXp = parseInt(monsterXpString, 10);

            // Only include monsters whose XP is within the XP budget for the selected difficulty
            if (monsterXp > 0 && monsterXp <= xpTally) { // Ensure monsterXP is positive and within budget
                availableMonstersForEnvironment[monsterData.name] = monsterXp;
            }
        }
    }
    // display list of possible encounters
    if (xpTally > 0) {
        let outputHTML = `<p>Target XP for ${currentPcCount} PC(s) of average level  of ${pcLevel} for a ${difficulty} encounter in a ${environmentSelected.toLowerCase()} environment is ${formatNumberWithCommas(xpTally)}.</p>`;

        if (Object.keys(availableMonstersForEnvironment).length > 0) {
            const encounterOptionsImproved = generateEncounterOptionsImproved(xpTally, availableMonstersForEnvironment);

            outputHTML += "<h3>Suggested Encounters:</h3>";
            if (encounterOptionsImproved.length > 0 && encounterOptionsImproved.some(option => option.monsters.length > 0)) {
                encounterOptionsImproved.forEach((option, index) => {
                    if (option.monsters.length > 0) {
                        const monsterCounts = option.monsters.reduce((acc, monster) => {
                            acc[monster] = (acc[monster] || 0) + 1;
                            return acc;
                        }, {});

                        const numMonstersInOption = option.monsters.length;
                        const xpMultiplier = getEncounterXpMultiplier(numMonstersInOption);
                        const adjustedXP = Math.floor(option.totalXP * xpMultiplier);

                        let encounterDifficultyRating = "Trivial"; // Default if below easy
                        // singlePcXpThresholds is already defined and holds {easy, medium, hard, deadly} for one PC of the party's level
                        if (singlePcXpThresholds) {
                            const partyEasyThreshold = singlePcXpThresholds.easy * parseInt(currentPcCount, 10);
                            const partyMediumThreshold = singlePcXpThresholds.medium * parseInt(currentPcCount, 10);
                            const partyHardThreshold = singlePcXpThresholds.hard * parseInt(currentPcCount, 10);
                            const partyDeadlyThreshold = singlePcXpThresholds.deadly * parseInt(currentPcCount, 10);

                            if (adjustedXP >= partyDeadlyThreshold) {
                                encounterDifficultyRating = "Deadly";
                            } else if (adjustedXP >= partyHardThreshold) {
                                encounterDifficultyRating = "Hard";
                            } else if (adjustedXP >= partyMediumThreshold) {
                                encounterDifficultyRating = "Medium";
                            } else if (adjustedXP >= partyEasyThreshold) {
                                encounterDifficultyRating = "Easy";
                            }
                        }

                        outputHTML += `<h4>Encounter Option ${index + 1} (Raw XP: ${formatNumberWithCommas(option.totalXP)}, Adjusted XP: ${formatNumberWithCommas(adjustedXP)}, Party Difficulty: ${encounterDifficultyRating})</h4>`;
                        outputHTML += `<button class="copy-encounter-list" data-encounter="${index}" data-party-xp="${adjustedXP}">Copy List</button>`;
                        outputHTML += "<ol>";
                        for (const monsterNameInOption in monsterCounts) {
                            const fullMonsterData = monsters.find(m => m.name === monsterNameInOption);
                            const monsterSlugForLink = createMonsterSlug(monsterNameInOption);
                            let crString = "CR N/A";
                            let monsterXpDisplayString = "XP N/A"; // Renamed to avoid conflict
                            if (fullMonsterData && fullMonsterData.challenge) { // Use lowercase 'challenge'
                                crString = fullMonsterData.challenge.split(' ')[0];
                                const challengeParts = fullMonsterData.challenge.split('(');
                                if (challengeParts.length > 1 && challengeParts[1]) {
                                    monsterXpDisplayString = challengeParts[1].replace(/[(),]/g, "").replace("XP", "").trim();
                                }
                            }
                            // Add plus and minus buttons for each monster
                            outputHTML += `<li>
                                <span class="monster-count" id="monster-count-${index}-${monsterSlugForLink}">${monsterCounts[monsterNameInOption]}</span>x
                                <a href="#monster-stat-${monsterSlugForLink}" class="monsterLink">${monsterNameInOption}</a> (CR: ${crString}, XP: ${formatNumberWithCommas(parseInt(monsterXpDisplayString, 10))})
                                <button class="monster-add-count" data-encounter="${index}" data-monster="${monsterNameInOption}">+</button>
                                <button class="monster-remove-count" data-encounter="${index}" data-monster="${monsterNameInOption}">-</button>
                            </li>`;
                        }
                        outputHTML += "</ol>";

                        // Add monster stats to #monsterStats section for unique monsters
                        option.monsters.forEach(monsterNameInStatBlock => {
                            if (!displayedMonsterStats.has(monsterNameInStatBlock)) {
                                const monsterDetails = monsters.find(m => m.name === monsterNameInStatBlock);
                                if (monsterDetails) {
                                    const monsterStatSlug = createMonsterSlug(monsterDetails.name);
                                    monsterStatsContent += `<div class="monster-stat-block" id="monster-stat-${monsterStatSlug}">`;
                                    monsterStatsContent += `<h3>${monsterDetails.name}</h3>`;
                                    monsterStatsContent += `<p><em>${monsterDetails.size} ${monsterDetails.type}, ${monsterDetails.alignment}</em></p>`; // Using available fields for meta
                                    if (getProp(monsterDetails, "armor class")) monsterStatsContent += `<p><strong>Armor Class:</strong> ${getProp(monsterDetails, "armor class")}</p>`;
                                    if (getProp(monsterDetails, "hit points")) monsterStatsContent += `<p><strong>Hit Points:</strong> ${getProp(monsterDetails, "hit points")}</p>`;
                                    if (monsterDetails.speed) monsterStatsContent += `<p><strong>Speed:</strong> ${monsterDetails.speed}</p>`; // lowercase 'speed'
                                    monsterStatsContent += `<hr>`;
                                    monsterStatsContent += `<p><strong>STR:</strong> ${monsterDetails.str} (${abilityScoreModifiers[0][String(monsterDetails.str)] ?? 'N/A'}) | ` +
                                                           `<strong>DEX:</strong> ${monsterDetails.dex} (${abilityScoreModifiers[0][String(monsterDetails.dex)] ?? 'N/A'}) | ` +
                                                           `<strong>CON:</strong> ${monsterDetails.con} (${abilityScoreModifiers[0][String(monsterDetails.con)] ?? 'N/A'}) | ` +
                                                           `<strong>INT:</strong> ${monsterDetails.int} (${abilityScoreModifiers[0][String(monsterDetails.int)] ?? 'N/A'}) | ` +
                                                           `<strong>WIS:</strong> ${monsterDetails.wis} (${abilityScoreModifiers[0][String(monsterDetails.wis)] ?? 'N/A'}) | ` +
                                                           `<strong>CHA:</strong> ${monsterDetails.cha} (${abilityScoreModifiers[0][String(monsterDetails.cha)] ?? 'N/A'})</p>`;
                                    monsterStatsContent += `<hr>`;
                                    if (monsterDetails["Saving Throws"]) monsterStatsContent += `<p><strong>Saving Throws:</strong> ${monsterDetails["Saving Throws"]}</p>`;
                                    if (monsterDetails.skills) monsterStatsContent += `<p><strong>Skills:</strong> ${monsterDetails.skills}</p>`; // lowercase 'skills'
                                    if (monsterDetails["Damage Vulnerabilities"]) monsterStatsContent += `<p><strong>Damage Vulnerabilities:</strong> ${monsterDetails["Damage Vulnerabilities"]}</p>`;
                                    if (monsterDetails["Damage Resistances"]) monsterStatsContent += `<p><strong>Damage Resistances:</strong> ${monsterDetails["Damage Resistances"]}</p>`;
                                    if (monsterDetails["damage immunities"]) monsterStatsContent += `<p><strong>Damage Immunities:</strong> ${monsterDetails["damage immunities"]}</p>`; // lowercase 'damage immunities'
                                    if (monsterDetails["condition immunities"]) monsterStatsContent += `<p><strong>Condition Immunities:</strong> ${monsterDetails["condition immunities"]}</p>`; // lowercase 'condition immunities'
                                    if (monsterDetails.senses) monsterStatsContent += `<p><strong>Senses:</strong> ${monsterDetails.senses}</p>`; // lowercase 'senses'
                                    if (monsterDetails.languages && Array.isArray(monsterDetails.languages)) {
                                        monsterStatsContent += `<p><strong>Languages:</strong> ${monsterDetails.languages.join(', ')}</p>`;
                                    } else if (monsterDetails.languages) {
                                        monsterStatsContent += `<p><strong>Languages:</strong> ${monsterDetails.languages}</p>`;
                                    }
                                    if (monsterDetails.challenge) monsterStatsContent += `<p><strong>Challenge:</strong> ${monsterDetails.challenge}</p>`; // lowercase 'challenge'
                                    if (monsterDetails.environments && monsterDetails.environments.length > 0) monsterStatsContent += `<p><strong>Environments:</strong> ${monsterDetails.environments.join(', ')}</p>`;
                                    if (monsterDetails.traits) monsterStatsContent += `<h4>Traits</h4>${monsterDetails.traits}`; // lowercase 'traits'
                                    if (monsterDetails.actions) monsterStatsContent += `<h4>Actions</h4>${monsterDetails.actions}`; // lowercase 'actions'
                                    if (monsterDetails["legendary actions"]) monsterStatsContent += `<h4>Legendary Actions</h4>${getProp(monsterDetails, "legendary actions")}`; // lowercase 'legendary actions'
                                    if (getProp(monsterDetails, "bonus actions")) monsterStatsContent += `<h4>Bonus Actions</h4>${getProp(monsterDetails, "bonus actions")}`;
                                    if (getProp(monsterDetails, "lair actions")) monsterStatsContent += `<h4>Lair Actions</h4>${getProp(monsterDetails, "lair actions")}`;
                                    // Update all references from 'img_url' to 'img url' for monster images
                                    // Use getProp(monster, 'img url') instead of monster.img_url or monster["img_url"]
                                    const imgUrl = getProp(monsterDetails, 'img url');
                                    if (imgUrl) monsterStatsContent += `<img src="${imgUrl}" alt="${monsterDetails.name}" class="monster-image">`;
                                    monsterStatsContent += `<p class="back-to-list-paragraph"><a href="#encounterList" class="monsterLink">Back to Encounter List</a></p>`;
                                    monsterStatsContent += `</div><hr class="monster-separator">`;
                                    displayedMonsterStats.add(monsterNameInStatBlock);
                                }
                            }
                        });
                    }
                });
            } else {
                outputHTML += "<p>No suitable encounter options could be generated with the current criteria. Try a higher XP budget or different environment/difficulty.</p>";
            }
        } else {
            outputHTML += "<p>No monsters found for the selected environment that fit the XP budget. Cannot generate encounter options.</p>";
        }
        $('div#encounterList').html(outputHTML);
        // Attach copy button handler after HTML is set
        $('.copy-encounter-list').off('click').on('click', function() {
            // Find the <ol> that immediately follows this button
            var encounterList = $(this).next('ol');
            if (!encounterList.length) {
                // Fallback: find the next <ol> anywhere after this button
                encounterList = $(this).nextAll('ol').first();
            }
            var lines = [];
            encounterList.find('li').each(function() {
                var count = $(this).find('.monster-count').text();
                var name = $(this).find('a.monsterLink').text();
                var crMatch = $(this).html().match(/CR: ([^,)<]+)/);
                var xpMatch = $(this).html().match(/XP: ([^)<]+)/);
                var cr = crMatch ? crMatch[1] : 'N/A';
                var xp = xpMatch ? xpMatch[1].replace(/,/g, '') : 'N/A';
                lines.push(`${count}x ${name} (CR ${cr}, XP ${xp})`);
            });
            var text = lines.join('\n');
            if (text.trim().length === 0) {
                alert('No monsters to copy in this encounter.');
                return;
            }
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text).then(function() {
                    alert('Encounter list copied!');
                }, function() {
                    alert('Failed to copy encounter list.');
                });
            } else {
                // Fallback for older browsers or insecure context
                var temp = $('<textarea>');
                $('body').append(temp);
                temp.val(text).select();
                try {
                    document.execCommand('copy');
                    alert('Encounter list copied!');
                } catch (e) {
                    alert('Failed to copy encounter list.');
                }
                temp.remove();
            }
        });
    } else {
        $('div#encounterList').html('<p>No XP budget calculated. Please check PC level and difficulty settings.</p>');
    }

    // Populate the monster stats section if any stats were generated
    if (displayedMonsterStats.size > 0) {
        $('div#monsterStats').html('<h2>Monster Stats</h2>' + monsterStatsContent);
    }
}

// Helper functions for thematic matching
function isTypeSimilar(typeA, typeB) {
    if (!typeA || !typeB) return false;
    typeA = typeA.toLowerCase();
    typeB = typeB.toLowerCase();
    // Partial match: substring or plural/singular
    return typeA === typeB || typeA.includes(typeB) || typeB.includes(typeA);
}

function isAlignmentSimilar(alignA, alignB) {
    if (!alignA || !alignB) return false;
    alignA = alignA.toLowerCase();
    alignB = alignB.toLowerCase();
    // Partial match: substring or major axis (e.g. 'chaotic', 'evil')
    const axes = ['lawful', 'chaotic', 'neutral', 'good', 'evil'];
    for (let axis of axes) {
        if (alignA.includes(axis) && alignB.includes(axis)) return true;
    }
    // Fallback: substring
    return alignA === alignB || alignA.includes(alignB) || alignB.includes(alignA);
}

function hasEnvironmentOverlap(envsA, envsB) {
    if (!Array.isArray(envsA) || !Array.isArray(envsB)) return false;
    return envsA.some(env => envsB.includes(env));
}

function hasAssociationOverlap(assocA, assocB) {
    if (!assocA || !assocB) return false;
    // Associations may be string or array
    let arrA = Array.isArray(assocA) ? assocA : [assocA];
    let arrB = Array.isArray(assocB) ? assocB : [assocB];
    return arrA.some(a => arrB.includes(a));
}

function generateEncounterOptionsImproved(xpLimit, monsterData, numOptions = 5) {
    const monsterNames = Object.keys(monsterData).filter(name => monsterData[name] > 0);
    const encounterOptions = [];
    const generatedOptionSignatures = new Set();
    // Get maxMonstersInEncounter from the #maxMonsters input
    let maxMonstersInEncounter = 15;
    const maxMonstersInput = document.getElementById('maxMonsters');
    if (maxMonstersInput && !isNaN(parseInt(maxMonstersInput.value, 10))) {
        maxMonstersInEncounter = parseInt(maxMonstersInput.value, 10);
    }
    if (monsterNames.length === 0) {
        return [{ monsters: [], totalXP: 0 }];
    }
    let maxTotalAttempts = 1000;
    for (let attempt = 0; attempt < maxTotalAttempts; attempt++) {
        let remainingXp = xpLimit;
        let optionMonsters = [];
        let usedMonsterNames = new Set();
        let numMonstersInEncounter = 0;
        let firstMonsterAdded = false;
        let firstMonsterData = null;
        while (remainingXp > 0 && numMonstersInEncounter < maxMonstersInEncounter) {
            let fittingMonsters;
            if (!firstMonsterAdded) {
                // First monster: any fitting
                fittingMonsters = monsterNames.filter(name => {
                    const monsterXp = monsterData[name];
                    return !usedMonsterNames.has(name) && monsterXp <= remainingXp;
                });
            } else {
                // 1. Try associates
                fittingMonsters = monsterNames.filter(name => {
                    if (usedMonsterNames.has(name)) return false;
                    const monsterXp = monsterData[name];
                    if (monsterXp > remainingXp) return false;
                    const m = typeof monsters !== 'undefined' ? monsters.find(mon => mon.name === name) : null;
                    if (!m || !firstMonsterData) return false;
                    // Associates
                    if (hasAssociationOverlap(m.associates, firstMonsterData.associates)) return true;
                    return false;
                });
                // 2. If not enough, try alignment
                if (fittingMonsters.length === 0) {
                    fittingMonsters = monsterNames.filter(name => {
                        if (usedMonsterNames.has(name)) return false;
                        const monsterXp = monsterData[name];
                        if (monsterXp > remainingXp) return false;
                        const m = typeof monsters !== 'undefined' ? monsters.find(mon => mon.name === name) : null;
                        if (!m || !firstMonsterData) return false;
                        if (isAlignmentSimilar(m.alignment, firstMonsterData.alignment)) return true;
                        return false;
                    });
                }
                // 3. If still not enough, try environment
                if (fittingMonsters.length === 0) {
                    fittingMonsters = monsterNames.filter(name => {
                        if (usedMonsterNames.has(name)) return false;
                        const monsterXp = monsterData[name];
                        if (monsterXp > remainingXp) return false;
                        const m = typeof monsters !== 'undefined' ? monsters.find(mon => mon.name === name) : null;
                        if (!m || !firstMonsterData) return false;
                        if (hasEnvironmentOverlap(m.environments, firstMonsterData.environments)) return true;
                        return false;
                    });
                }
                // 4. If still not enough, try type
                if (fittingMonsters.length === 0) {
                    fittingMonsters = monsterNames.filter(name => {
                        if (usedMonsterNames.has(name)) return false;
                        const monsterXp = monsterData[name];
                        if (monsterXp > remainingXp) return false;
                        const m = typeof monsters !== 'undefined' ? monsters.find(mon => mon.name === name) : null;
                        if (!m || !firstMonsterData) return false;
                        if (isTypeSimilar(m.type, firstMonsterData.type)) return true;
                        return false;
                    });
                }
            }
            if (fittingMonsters.length === 0) {
                break;
            }
            let selectedMonster = fittingMonsters[Math.floor(Math.random() * fittingMonsters.length)];
            optionMonsters.push(selectedMonster);
            usedMonsterNames.add(selectedMonster);
            remainingXp -= monsterData[selectedMonster];
            numMonstersInEncounter++;
            if (!firstMonsterAdded) {
                firstMonsterAdded = true;
                firstMonsterData = typeof monsters !== 'undefined' ? monsters.find(mon => mon.name === selectedMonster) : null;
            }
        }
        if (!firstMonsterAdded) {
            break;
        }
        optionMonsters.sort();
        let optionSignature = optionMonsters.join(',');
        if (!generatedOptionSignatures.has(optionSignature)) {
            generatedOptionSignatures.add(optionSignature);
            encounterOptions.push({ monsters: optionMonsters, totalXP: xpLimit - remainingXp });
        }
        if (encounterOptions.length >= numOptions) {
            break;
        }
    }
    if (encounterOptions.length < numOptions) {
        let minXpMonster = monsterNames[0];
        for (let i = 1; i < monsterNames.length; i++) {
            if (monsterData[monsterNames[i]] < monsterData[minXpMonster]) {
                minXpMonster = monsterNames[i];
            }
        }
        // Only fill up to maxMonstersInEncounter
        for (let i = encounterOptions.length; i < numOptions; i++) {
            let monsterCount = Math.min(i + 1, maxMonstersInEncounter);
            encounterOptions.push({
                monsters: Array(monsterCount).fill(minXpMonster),
                totalXP: monsterData[minXpMonster] * monsterCount
            });
        }
    }
    return encounterOptions;
  }

// Helper: Get property value case-insensitively
function getProp(obj, propName) {
    if (!obj || !propName) return undefined;
    // Try exact match first
    if (obj.hasOwnProperty(propName)) return obj[propName];
    // Try case-insensitive match
    const lower = propName.toLowerCase();
    for (const key in obj) {
        if (key.toLowerCase() === lower) return obj[key];
    }
    return undefined;
}

// Attach copy button handler after HTML is set
$('.copy-encounter-list').off('click').on('click', function() {
    var encounterIdx = parseInt($(this).data('encounter'), 10);
    var adjustedXP = $(this).attr('data-party-xp');
    if (typeof adjustedXP === 'undefined' || adjustedXP === null || adjustedXP === '') {
        // fallback: try to extract from the header
        var h4 = $(this).prevAll('h4').first();
        var match = h4.text().match(/Adjusted XP: ([\d,]+)/i);
        if (match && match[1]) {
            adjustedXP = match[1];
        }
    }
    var encounterList = $(this).next('ol');
    if (!encounterList.length) {
        encounterList = $(this).parent().find('ol').first();
    }
    var lines = [];
    if (adjustedXP && adjustedXP !== 'undefined') {
        lines.push(`Adjusted XP: ${formatNumberWithCommas(adjustedXP)}`);
    }
    encounterList.find('li').each(function() {
        var count = $(this).find('.monster-count').text();
        var name = $(this).find('a.monsterLink').text();
        var crMatch = $(this).html().match(/CR: ([^,)<]+)/);
        var xpMatch = $(this).html().match(/XP: ([^)<]+)/);
        var cr = crMatch ? crMatch[1] : 'N/A';
        var xp = xpMatch ? xpMatch[1].replace(/,/g, '') : 'N/A';
        lines.push(`${count}x ${name} (CR ${cr}, XP ${xp})`);
    });
    var text = lines.join('\n');
    if (text.trim().length === 0) {
        alert('No monsters to copy in this encounter.');
        return;
    }
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function() {
            alert('Encounter list copied!');
        }, function() {
            alert('Failed to copy encounter list.');
        });
    } else {
        var temp = $('<textarea>');
        $('body').append(temp);
        temp.val(text).select();
        try {
            document.execCommand('copy');
            alert('Encounter list copied!');
        } catch (e) {
            alert('Failed to copy encounter list.');
        }
        temp.remove();
    }
});

function renderStatBlock(monster) {
  let statBlockHtml = `<div class="monster-stat-block" id="monster-stat-${createMonsterSlug(monster.name)}">`;
  statBlockHtml += `<h3>${monster.name}</h3>`;
  statBlockHtml += `<p><em>${monster.size} ${monster.type}, ${monster.alignment}</em></p>`; // Using available fields for meta
  if (getProp(monster, "armor class")) statBlockHtml += `<p><strong>Armor Class:</strong> ${getProp(monster, "armor class")}</p>`;
  if (getProp(monster, "hit points")) statBlockHtml += `<p><strong>Hit Points:</strong> ${getProp(monster, "hit points")}</p>`;
  if (monster.speed) statBlockHtml += `<p><strong>Speed:</strong> ${monster.speed}</p>`; // lowercase 'speed'
  statBlockHtml += `<hr>`;
  statBlockHtml += `<p><strong>STR:</strong> ${monster.str} (${abilityScoreModifiers[0][String(monster.str)] ?? 'N/A'}) | ` +
                   `<strong>DEX:</strong> ${monster.dex} (${abilityScoreModifiers[0][String(monster.dex)] ?? 'N/A'}) | ` +
                   `<strong>CON:</strong> ${monster.con} (${abilityScoreModifiers[0][String(monster.con)] ?? 'N/A'}) | ` +
                   `<strong>INT:</strong> ${monster.int} (${abilityScoreModifiers[0][String(monster.int)] ?? 'N/A'}) | ` +
                   `<strong>WIS:</strong> ${monster.wis} (${abilityScoreModifiers[0][String(monster.wis)] ?? 'N/A'}) | ` +
                   `<strong>CHA:</strong> ${monster.cha} (${abilityScoreModifiers[0][String(monster.cha)] ?? 'N/A'})</p>`;
  statBlockHtml += `<hr>`;
  if (monster["Saving Throws"]) statBlockHtml += `<p><strong>Saving Throws:</strong> ${monster["Saving Throws"]}</p>`;
  if (monster.skills) statBlockHtml += `<p><strong>Skills:</strong> ${monster.skills}</p>`; // lowercase 'skills'
  if (monster["Damage Vulnerabilities"]) statBlockHtml += `<p><strong>Damage Vulnerabilities:</strong> ${monster["Damage Vulnerabilities"]}</p>`;
  if (monster["Damage Resistances"]) statBlockHtml += `<p><strong>Damage Resistances:</strong> ${monster["Damage Resistances"]}</p>`;
  if (monster["damage immunities"]) statBlockHtml += `<p><strong>Damage Immunities:</strong> ${monster["damage immunities"]}</p>`; // lowercase 'damage immunities'
  if (monster["condition immunities"]) statBlockHtml += `<p><strong>Condition Immunities:</strong> ${monster["condition immunities"]}</p>`; // lowercase 'condition immunities'
  if (monster.senses) statBlockHtml += `<p><strong>Senses:</strong> ${monster.senses}</p>`; // lowercase 'senses'
  if (monster.languages && Array.isArray(monster.languages)) {
      statBlockHtml += `<p><strong>Languages:</strong> ${monster.languages.join(', ')}</p>`;
  } else if (monster.languages) {
      statBlockHtml += `<p><strong>Languages:</strong> ${monster.languages}</p>`;
  }
  if (monster.challenge) statBlockHtml += `<p><strong>Challenge:</strong> ${monster.challenge}</p>`; // lowercase 'challenge'
  if (monster.environments && monster.environments.length > 0) statBlockHtml += `<p><strong>Environments:</strong> ${monster.environments.join(', ')}</p>`;
  if (monster.traits) statBlockHtml += `<h4>Traits</h4>${monster.traits}`; // lowercase 'traits'
  if (monster.actions) statBlockHtml += `<h4>Actions</h4>${monster.actions}`; // lowercase 'actions'
  if (monster["legendary actions"]) statBlockHtml += `<h4>Legendary Actions</h4>${getProp(monster, "legendary actions")}`; // lowercase 'legendary actions'
  if (getProp(monster, "bonus actions")) statBlockHtml += `<h4>Bonus Actions</h4>${getProp(monster, "bonus actions")}`;
  if (getProp(monster, "lair actions")) statBlockHtml += `<h4>Lair Actions</h4>${getProp(monster, "lair actions")}`;
  // After lair actions section
  const regionalEffects = getProp(monster, 'regional effects');
  if (regionalEffects) {
    statBlockHtml += `<h4>Regional Effects</h4><div>${regionalEffects}</div>`;
  }
  // Update all references from 'img_url' to 'img url' for monster images
  // Use getProp(monster, 'img url') instead of monster.img_url or monster["img_url"]
  const imgUrl = getProp(monster, 'img url');
  if (imgUrl) statBlockHtml += `<img src="${imgUrl}" alt="${monster.name}" class="monster-image">`;
  statBlockHtml += `<p class="back-to-list-paragraph"><a href="#encounterList" class="monsterLink">Back to Encounter List</a></p>`;
  statBlockHtml += `</div><hr class="monster-separator">`;
  return statBlockHtml;
}
