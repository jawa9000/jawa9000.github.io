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

    $("input, select").change(function() { // gather all data and generate encounter
        generatePcLevelInputs();
    });

    $("button").on('click', function() { // gather all data and generate encounter
        generatePcLevelInputs();
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
        if (environmentSelected === "Any") { // True if "Any" was selected and no specific environment could be derived
            isMonsterInEnvironment = true; // No environment filter
        } else if (monsterData.environments && Array.isArray(monsterData.environments)) {
            isMonsterInEnvironment = monsterData.environments.includes(environmentSelected);
        }

        if (isMonsterInEnvironment) {
            const challengeString = monsterData.challenge; // Use lowercase 'challenge' as in monsters.js
            if (!challengeString) {
                console.warn(`Monster ${monsterData.name} is missing Challenge information.`);
                continue;
            }
            const challengeParts = challengeString.split(' ');
            let monsterXpString = "0";
            if (challengeParts.length > 1 && challengeParts[1]) {
                monsterXpString = challengeParts[1].replace(/[(),]/g, "");
            }
            const monsterXp = parseInt(monsterXpString, 10);

            // Pre-filter: only consider monsters whose individual XP is not more than the total budget
            // This helps in not considering extremely high CR monsters if the budget is low.
            if (monsterXp > 0 && monsterXp <= xpTally) { // Ensure monsterXP is positive
                availableMonstersForEnvironment[monsterData.name] = monsterXp;
            } else if (monsterXp > 0 && Object.keys(availableMonstersForEnvironment).length < 200) {
                // Fallback: if budget is very low, still add some monsters to allow combinations
                // This limit (200) is arbitrary to prevent excessively large lists for generateEncounterOptionsImproved
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

                        outputHTML += `<h4>Encounter Option ${index + 1} (Raw XP: ${formatNumberWithCommas(option.totalXP)}, Adjusted XP: ${formatNumberWithCommas(adjustedXP)}, Party Difficulty: ${encounterDifficultyRating})</h4><ol>`;
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
                            outputHTML += `<li>${monsterCounts[monsterNameInOption]}x <a href="#monster-stat-${monsterSlugForLink}" class="monsterLink">${monsterNameInOption}</a> (CR: ${crString}, XP: ${formatNumberWithCommas(parseInt(monsterXpDisplayString, 10))})</li>`;
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
                                    if (monsterDetails["Armor Class"]) monsterStatsContent += `<p><strong>Armor Class:</strong> ${monsterDetails["Armor Class"]}</p>`;
                                    if (monsterDetails["Hit Points"]) monsterStatsContent += `<p><strong>Hit Points:</strong> ${monsterDetails["Hit Points"]}</p>`;
                                    if (monsterDetails.speed) monsterStatsContent += `<p><strong>Speed:</strong> ${monsterDetails.speed}</p>`; // lowercase 'speed'
                                    monsterStatsContent += `<hr>`;
                                    monsterStatsContent += `<p><strong>STR:</strong> ${monsterDetails.str} (${abilityScoreModifier[0][String(monsterDetails.str)] ?? 'N/A'}) | ` +
                                                           `<strong>DEX:</strong> ${monsterDetails.dex} (${abilityScoreModifier[0][String(monsterDetails.dex)] ?? 'N/A'}) | ` +
                                                           `<strong>CON:</strong> ${monsterDetails.con} (${abilityScoreModifier[0][String(monsterDetails.con)] ?? 'N/A'}) | ` +
                                                           `<strong>INT:</strong> ${monsterDetails.int} (${abilityScoreModifier[0][String(monsterDetails.int)] ?? 'N/A'}) | ` +
                                                           `<strong>WIS:</strong> ${monsterDetails.wis} (${abilityScoreModifier[0][String(monsterDetails.wis)] ?? 'N/A'}) | ` +
                                                           `<strong>CHA:</strong> ${monsterDetails.cha} (${abilityScoreModifier[0][String(monsterDetails.cha)] ?? 'N/A'})</p>`;
                                    monsterStatsContent += `<hr>`;
                                    if (monsterDetails["Saving Throws"]) monsterStatsContent += `<p><strong>Saving Throws:</strong> ${monsterDetails["Saving Throws"]}</p>`;
                                    if (monsterDetails.skills) monsterStatsContent += `<p><strong>Skills:</strong> ${monsterDetails.skills}</p>`; // lowercase 'skills'
                                    if (monsterDetails["Damage Vulnerabilities"]) monsterStatsContent += `<p><strong>Damage Vulnerabilities:</strong> ${monsterDetails["Damage Vulnerabilities"]}</p>`;
                                    if (monsterDetails["Damage Resistances"]) monsterStatsContent += `<p><strong>Damage Resistances:</strong> ${monsterDetails["Damage Resistances"]}</p>`;
                                    if (monsterDetails["damage immunities"]) monsterStatsContent += `<p><strong>Damage Immunities:</strong> ${monsterDetails["damage immunities"]}</p>`; // lowercase 'damage immunities'
                                    if (monsterDetails["condition immunities"]) monsterStatsContent += `<p><strong>Condition Immunities:</strong> ${monsterDetails["condition immunities"]}</p>`; // lowercase 'condition immunities'
                                    if (monsterDetails.senses) monsterStatsContent += `<p><strong>Senses:</strong> ${monsterDetails.senses}</p>`; // lowercase 'senses'
                                    if (monsterDetails.languages) monsterStatsContent += `<p><strong>Languages:</strong> ${monsterDetails.languages}</p>`; // lowercase 'languages'
                                    if (monsterDetails.challenge) monsterStatsContent += `<p><strong>Challenge:</strong> ${monsterDetails.challenge}</p>`; // lowercase 'challenge'
                                    if (monsterDetails.traits) monsterStatsContent += `<h4>Traits</h4>${monsterDetails.traits}`; // lowercase 'traits'
                                    if (monsterDetails.actions) monsterStatsContent += `<h4>Actions</h4>${monsterDetails.actions}`; // lowercase 'actions'
                                    if (monsterDetails["legendary actions"]) monsterStatsContent += `<h4>Legendary Actions</h4>${monsterDetails["legendary actions"]}`; // lowercase 'legendary actions'
                                    if (monsterDetails.img_url) monsterStatsContent += `<img src="${monsterDetails.img_url}" alt="${monsterDetails.name}" class="monster-image">`;
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
    } else {
        $('div#encounterList').html('<p>No XP budget calculated. Please check PC level and difficulty settings.</p>');
    }

    // Populate the monster stats section if any stats were generated
    if (displayedMonsterStats.size > 0) {
        $('div#monsterStats').html('<h2>Monster Stats</h2>' + monsterStatsContent);
    }
}

/**
 * @function generateEncounterOptionsImproved
 * @description Generates a specified number of unique encounter options that fit within a given XP limit,
 * using a provided dataset of monsters and their XP values. It aims for variety and tries to get close
 * to the XP limit.
 *
 * @param {number} xpLimit - The maximum total raw XP for an encounter.
 * @param {Object.<string, number>} monsterData - An object where keys are monster names and values are their XP. It's expected that monsters with 0 XP are pre-filtered out.
 * @param {number} [numOptions=5] - The desired number of unique encounter options to generate.
 * @returns {Array<Object>} An array of encounter options. Each option is an object with:
 *                          `monsters`: An array of monster names in the encounter.
 *                          `totalXP`: The sum of raw XP for all monsters in that encounter.
 *                          Returns an array with a single empty option `[{ monsters: [], totalXP: 0 }]`
 *                          if no monsters are available or no suitable encounters can be formed.
 *
 * @careful_modification
 * - **Algorithm Complexity & Performance**: This function uses a heuristic, randomized approach. Changes to the iteration limits (`maxTotalAttempts`, `fillAttempts`, `maxMonstersInEncounter`), monster selection logic, or the shuffling/sorting can significantly impact performance and the quality/variety of generated encounters. Test thoroughly with various `xpLimit` values and `monsterData` sizes.
 * - **Encounter Quality**: The definition of a "good" encounter is subjective. This algorithm prioritizes getting close to the `xpLimit` and providing some variety. Modifying how `numTryAdd` is calculated or how `fittingMonsters` are chosen will change the composition of suggested encounters.
 * - **Uniqueness**: The `generatedOptionSignatures` Set is used to avoid duplicate encounter suggestions (based on the exact multiset of monsters). If this logic is altered, users might see redundant options.
 * - **Fallback Logic**: The fallback mechanism (filling with the smallest XP monster) is crucial for cases where the main generation loop fails to produce enough unique options. Ensure this fallback remains robust.
 * - **Zero XP Monsters**: The function expects `monsterData` to contain monsters with positive XP values. The initial filter `filter(name => monsterData[name] > 0)` handles this. If 0 XP monsters were to be included for some reason, the logic for `numToAdd` in the fallback might need adjustment to prevent infinite loops or division by zero.
 * - **`maxMonstersInEncounter`**: This limit prevents excessively large (in terms of monster count) encounters. Adjusting it can change the nature of generated encounters.
 */
  function generateEncounterOptionsImproved(xpLimit, monsterData, numOptions = 5) {
    const monsterNames = Object.keys(monsterData).filter(name => monsterData[name] > 0); // Ensure monsters have XP
    const encounterOptions = [];
    const generatedOptionSignatures = new Set(); // To store signatures of generated options
    const maxMonstersInEncounter = 15; // Arbitrary limit to prevent overly crowded encounters

    if (monsterNames.length === 0) {
        return [{ monsters: [], totalXP: 0 }]; // Return empty if no monsters available
    }

    // Max attempts to find numOptions unique encounters
    const maxTotalAttempts = numOptions * 25; // Increased attempts for uniqueness
    let attempts = 0;

    while (encounterOptions.length < numOptions && attempts < maxTotalAttempts) {
        attempts++;
        let currentEncounter = [];
        let currentXP = 0;

        // --- Build one candidate encounter ---
        // Shuffle available monsters for variety in each attempt
        let availableForBuild = [...monsterNames].sort(() => 0.5 - Math.random());

        // First pass: try to add a few different types of monsters that fit
        for (let k = 0; k < availableForBuild.length && currentEncounter.length < maxMonstersInEncounter; k++) {
            const monsterName = availableForBuild[k];
            const monsterXPValue = monsterData[monsterName];

            // Decide how many of this monster to try adding
            let numTryAdd = 1;
            // If it's a relatively small XP monster and we have budget, consider adding more than one
            if (monsterXPValue <= xpLimit / 3 && Math.random() > 0.3) {
                let maxCanAdd = Math.floor((xpLimit - currentXP) / monsterXPValue) || 0;
                if (maxCanAdd > 0) {
                    numTryAdd = Math.min(maxCanAdd, Math.floor(Math.random() * 3) + 1); // Add 1 to 3, if budget allows
                }
            }

            for (let m = 0; m < numTryAdd; m++) {
                if (currentXP + monsterXPValue <= xpLimit && currentEncounter.length < maxMonstersInEncounter) {
                    currentEncounter.push(monsterName);
                    currentXP += monsterXPValue;
                } else {
                    break; // Stop adding this specific monster if budget or count exceeded
                }
            }
            if (currentXP / xpLimit > 0.90) break; // If very close to budget, stop this pass
        }

        // Optional: One more pass for random fill if under budget and under monster count
        let fillAttempts = 0;
        while (currentXP < xpLimit && fillAttempts < 30 && currentEncounter.length < maxMonstersInEncounter) {
            const fittingMonsters = monsterNames.filter(name => monsterData[name] <= (xpLimit - currentXP));
            if (fittingMonsters.length === 0) break;
            const randomPick = fittingMonsters[Math.floor(Math.random() * fittingMonsters.length)];
            currentEncounter.push(randomPick);
            currentXP += monsterData[randomPick];
            fillAttempts++;
        }

        if (currentEncounter.length > 0) {
            // Canonical signature: sorted list of monster names, joined by a comma
            const signature = [...currentEncounter].sort().join(',');
            if (!generatedOptionSignatures.has(signature)) {
                encounterOptions.push({ monsters: currentEncounter, totalXP: currentXP });
                generatedOptionSignatures.add(signature);
            }
        }
    }

    // Fallback if no unique options were generated by the main loop
    if (encounterOptions.length === 0 && monsterNames.length > 0) {
        const smallestMonsterName = monsterNames.sort((a, b) => monsterData[a] - monsterData[b])[0];
        const smallestMonsterXp = monsterData[smallestMonsterName];
        if (smallestMonsterXp <= xpLimit) { // Check if the smallest monster itself fits
            let numToAdd = Math.floor(xpLimit / smallestMonsterXp);
            numToAdd = Math.min(numToAdd, maxMonstersInEncounter); // Respect max monster count
            numToAdd = Math.max(numToAdd, 1); // Ensure at least one is added if it fits

            const monstersList = Array(numToAdd).fill(smallestMonsterName);
            encounterOptions.push({
                monsters: monstersList,
                totalXP: numToAdd * smallestMonsterXp
            });
        }
    }

    if (encounterOptions.length === 0) { // Final safety net if still no options
        return [{ monsters: [], totalXP: 0 }];
    }

    return encounterOptions;
}
