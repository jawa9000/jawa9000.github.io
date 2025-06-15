/*
    https://angrygolem-games.com/dwarves-mining-4-dd-mining-guide-mining-output/
*/

// mine.js - rewritten for clarity and robust UI/logic
$(function () {
    // --- State ---
    let minedOutputTotal = {};
    let grandTotal = 0;

    // --- Event Handlers ---
    $('#mine').on('click', function () {
        generateResources();
    });

    $('#toggle').on('click', function () {
        const enable = $(this).val() === 'Enable';
        $('#output input[type="checkbox"]').prop('checked', enable);
        $(this).val(enable ? 'Disable' : 'Enable').text(enable ? 'Disable' : 'Enable');
        updateSummary();
        saveCheckboxStates();
    });

    $('#showHide').on('click', function () {
        const show = $(this).val() === 'Show';
        $('#output input[type="checkbox"]').each(function () {
            if (!$(this).is(':checked')) {
                $(this).closest('p').toggle(show);
            }
        });
        $(this).val(show ? 'Hide' : 'Show').text(show ? 'Hide' : 'Show');
    });

    $('#output').on('change', 'input[type="checkbox"]', function () {
        updateSummary();
        saveCheckboxStates();
    });

    // Auto-update on input changes
    $("#percentage_dragonTip, #percentage_minerTip, #percentage_mineUpkeep, #percentage_miscExpenses, #percentage_mineExpansion, #days, #minerCount, #mineQuality, #mineOwnerCount").on('input change', function() {
        generateResources();
    });

    // --- Core Functions ---
    function generateResources() {
        // Get input values
        const days = Math.max(1, Math.min(365, parseInt($('#days').val()) || 1));
        const minerCount = Math.max(1, Math.min(1000, parseInt($('#minerCount').val()) || 1));
        const mineQuality = $('#mineQuality').val();
        const mineOwnerCount = Math.max(1, parseInt($('#mineOwnerCount').val()) || 1);
        // Percentages
        const dragonPct = parseInt($('#percentage_dragonTip').val()) || 0;
        const minerPct = parseInt($('#percentage_minerTip').val()) || 0;
        const upkeepPct = parseInt($('#percentage_mineUpkeep').val()) || 0;
        const miscPct = parseInt($('#percentage_miscExpenses').val()) || 0;
        const expansionPct = parseInt($('#percentage_mineExpansion').val()) || 0;
        const partyPct = 100 - (dragonPct + minerPct + upkeepPct + miscPct + expansionPct);

        // Reset tallies
        minedOutputTotal = {};
        grandTotal = 0;
        // Prepare all possible materials for tallying
        function initTally(obj) {
            Object.keys(obj).forEach(key => {
                minedOutputTotal[key] = { id: key, name: obj[key].name, count: 0, tally: 0 };
            });
        }
        initTally(stones);
        initTally(metals);
        initTally(exotics);
        initTally(gemstones);

        // Mining simulation
        for (let d = 0; d < days; d++) {
            for (let m = 0; m < minerCount; m++) {
                // 1. Pick mining product category
                const catRoll = Math.floor(Math.random() * 100);
                let category = null;
                for (const k in miningProducts) {
                    const prod = miningProducts[k];
                    if (catRoll >= prod.first && catRoll <= prod.second) {
                        category = prod.name;
                        break;
                    }
                }
                // 2. Pick material within category
                let group = null;
                if (category === 'stones') group = stones;
                else if (category === 'metals') group = metals;
                else if (category === 'exotics') group = exotics;
                else if (category === 'gemstones') group = gemstones;
                if (group) {
                    const matRoll = Math.floor(Math.random() * 100);
                    for (const key in group) {
                        const mat = group[key];
                        if (matRoll >= mat.first && matRoll <= mat.second) {
                            // 3. Pick output from gpOutput
                            const output = mat.gpOutput[Math.floor(Math.random() * mat.gpOutput.length)];
                            minedOutputTotal[key].tally += output;
                            minedOutputTotal[key].count++;
                            grandTotal += output;
                            break;
                        }
                    }
                }
            }
        }

        // Mining events (excluding sabotage)
        const miningEvents = [
            {
                name: 'Cave-In',
                effect: function(context) {
                    // Lose 30% of total output
                    Object.values(context.minedOutputTotal).forEach(res => {
                        res.tally = Math.round(res.tally * 0.7);
                        res.count = Math.round(res.count * 0.7);
                    });
                    context.grandTotal = Math.round(context.grandTotal * 0.7);
                    return 'Cave-In! Mining is interrupted and 30% of the output is lost.';
                }
            },
            {
                name: 'Rich Vein Discovered',
                effect: function(context) {
                    // Double output for one random material
                    const keys = Object.keys(context.minedOutputTotal).filter(k => context.minedOutputTotal[k].count > 0);
                    if (keys.length > 0) {
                        const key = keys[Math.floor(Math.random() * keys.length)];
                        context.minedOutputTotal[key].tally *= 2;
                        context.minedOutputTotal[key].count *= 2;
                        context.grandTotal *= 1.2; // Slight boost to total
                        return `Rich Vein Discovered! Output for ${context.minedOutputTotal[key].name} is doubled.`;
                    }
                    return '';
                }
            },
            {
                name: 'Monster Attack',
                effect: function(context) {
                    // Lose 20% of miners for this run
                    context.minerCount = Math.max(1, Math.round(context.minerCount * 0.8));
                    return 'Monster Attack! Some miners are lost, reducing output.';
                }
            },
            {
                name: 'Equipment Failure',
                effect: function(context) {
                    // Reduce total output by 20%
                    Object.values(context.minedOutputTotal).forEach(res => {
                        res.tally = Math.round(res.tally * 0.8);
                        res.count = Math.round(res.count * 0.8);
                    });
                    context.grandTotal = Math.round(context.grandTotal * 0.8);
                    return 'Equipment Failure! Output is reduced by 20%.';
                }
            },
            {
                name: 'Ancient Artifact Found',
                effect: function(context) {
                    // Add a valuable artifact
                    context.artifact = true;
                    context.grandTotal += 1000;
                    return 'Ancient Artifact Found! A rare item worth 1,000gp is added to the output.';
                }
            },
            {
                name: 'Flooded Shaft',
                effect: function(context) {
                    // Output is zero
                    Object.values(context.minedOutputTotal).forEach(res => {
                        res.tally = 0;
                        res.count = 0;
                    });
                    context.grandTotal = 0;
                    return 'Flooded Shaft! Mining is halted and no output is generated.';
                }
            },
            {
                name: 'Miner Strike',
                effect: function(context) {
                    // Reduce miner cut by 5%, increase output by 10%
                    context.minerPct = Math.max(0, context.minerPct - 5);
                    Object.values(context.minedOutputTotal).forEach(res => {
                        res.tally = Math.round(res.tally * 1.1);
                    });
                    context.grandTotal = Math.round(context.grandTotal * 1.1);
                    return 'Miner Strike! Miners demand higher pay, but output increases by 10%.';
                }
            },
            {
                name: 'Lucky Day',
                effect: function(context) {
                    // All outputs +10%
                    Object.values(context.minedOutputTotal).forEach(res => {
                        res.tally = Math.round(res.tally * 1.1);
                    });
                    context.grandTotal = Math.round(context.grandTotal * 1.1);
                    return 'Lucky Day! All outputs are increased by 10%.';
                }
            },
            {
                name: 'Toxic Gas Leak',
                effect: function(context) {
                    // Reduce output by 15%
                    Object.values(context.minedOutputTotal).forEach(res => {
                        res.tally = Math.round(res.tally * 0.85);
                        res.count = Math.round(res.count * 0.85);
                    });
                    context.grandTotal = Math.round(context.grandTotal * 0.85);
                    return 'Toxic Gas Leak! Some miners are incapacitated, reducing output by 15%.';
                }
            },
            {
                name: 'Dragon Visit',
                effect: function(context) {
                    // Dragon takes an extra 10%
                    context.dragonPct = (context.dragonPct || 0) + 10;
                    return 'Dragon Visit! The dragon takes an extra 10% cut this run.';
                }
            },
            {
                name: 'Gem Rush',
                effect: function(context) {
                    // Double all gemstones
                    Object.keys(context.minedOutputTotal).forEach(key => {
                        if (/gem|spinel|diamond|ruby|sapphire|emerald|opal|topaz|garnet|aquamarine|jade|turquoise|amethyst|quartz|agate|bloodstone|citrine|jasper|moonstone|onyx|tourmaline|zircon|fluorite|obsidian|peridot|jacinth|alexandrite|malachite|azurite|carnelian|chrysopidate|lapis/i.test(key)) {
                            context.minedOutputTotal[key].tally *= 2;
                            context.minedOutputTotal[key].count *= 2;
                        }
                    });
                    context.grandTotal = Math.round(context.grandTotal * 1.2);
                    return 'Gem Rush! All gemstones found are doubled.';
                }
            },
            {
                name: 'New Tunnel Opened',
                effect: function(context) {
                    // Add a bonus material (e.g., platinum)
                    if (context.minedOutputTotal['platinum']) {
                        context.minedOutputTotal['platinum'].tally += 100;
                        context.minedOutputTotal['platinum'].count += 1;
                        context.grandTotal += 100;
                        return 'New Tunnel Opened! Extra platinum is found.';
                    }
                    return '';
                }
            },
            {
                name: 'Legendary Discovery',
                effect: function(context) {
                    context.grandTotal += 5000;
                    return 'Legendary Discovery! A legendary gem or ore worth 5,000gp is found!';
                }
            }
        ];

        // Mining event logic
        let eventMsg = '';
        const daysForEvent = days; // days is already defined in this scope
        // Define which events are positive/helpful
        const positiveEvents = [
            'Rich Vein Discovered',
            'Ancient Artifact Found',
            'Lucky Day',
            'Gem Rush',
            'New Tunnel Opened',
            'Legendary Discovery'
        ];
        let eligibleEvents = miningEvents;
        if (daysForEvent < 7) {
            // Exclude positive events if days < 7
            eligibleEvents = miningEvents.filter(e => !positiveEvents.includes(e.name));
        }
        if (Math.random() < 0.1 && eligibleEvents.length > 0) { // 10% chance
            const event = eligibleEvents[Math.floor(Math.random() * eligibleEvents.length)];
            // Prepare context for event
            const context = {
                minedOutputTotal,
                grandTotal,
                minerCount,
                minerPct,
                dragonPct
            };
            eventMsg = event.effect(context);
            // Sync back any changed values
            grandTotal = context.grandTotal;
            if (context.minerPct !== undefined) $('#percentage_minerTip').val(context.minerPct);
            if (context.dragonPct !== undefined) $('#percentage_dragonTip').val(context.dragonPct);
        }
        // Render output checkboxes, sorted by most value
        let outputHtml = '';
        Object.values(minedOutputTotal)
            .filter(res => res.count > 0)
            .sort((a, b) => b.tally - a.tally)
            .forEach(res => {
                outputHtml += `<p class="indented"><input type="checkbox" class="mined" id="${res.id}" checked> ${res.name}: <span>${numberWithCommas(Math.round(res.tally))} gp (${numberWithCommas(res.count)} units)</span></p>`;
            });
        $('#output').html(outputHtml);
        $('#toggle, #showHide').prop('disabled', false);
        updateSummary();
        restoreCheckboxStates();
        // Show event message if any
        if (eventMsg) {
            $('.event-message').remove(); // Remove any previous event message
            $('#summary').prepend(`<div class="event-message" style="color:#b52b27;font-weight:bold;">${eventMsg}</div>`);
        } else {
            $('.event-message').remove(); // Remove previous event message if no event this run
        }
    }

    function updateSummary() {
        // Get checked resources
        let total = 0;
        Object.keys(minedOutputTotal).forEach(id => {
            if ($(`#${id}`).is(':checked')) {
                total += minedOutputTotal[id].tally;
            }
        });
        const days = parseInt($('#days').val()) || 1;
        const dragonPct = parseInt($('#percentage_dragonTip').val()) || 0;
        const minerPct = parseInt($('#percentage_minerTip').val()) || 0;
        const upkeepPct = parseInt($('#percentage_mineUpkeep').val()) || 0;
        const miscPct = parseInt($('#percentage_miscExpenses').val()) || 0;
        const expansionPct = parseInt($('#percentage_mineExpansion').val()) || 0;
        const mineOwnerCount = Math.max(1, parseInt($('#mineOwnerCount').val()) || 1);
        const partyPct = 100 - (dragonPct + minerPct + upkeepPct + miscPct + expansionPct);
        const mineName = $('#mineName').val() ? `<strong>${$('#mineName').val()}</strong>: ` : '';
        $('#summary').html(
            `<br/><p>${mineName}<strong>The mine generated <span id="grandTotal">${numberWithCommas(total)}</span>gp worth of materials from ${numberWithCommas(days)} days of labor from the miners</strong>.</p>` +
            `<p>The dragon gets <span id="dragonTipInput">${numberWithCommas(Math.round(total * (dragonPct / 100)))}</span>gp.</p>` +
            `<p>The miners get <span id="minersBonus">${numberWithCommas(Math.round(total * (minerPct / 100)))}</span>gp.</p>` +
            `<p>${numberWithCommas(Math.round(total * (upkeepPct + miscPct) / 100))}gp goes to mine upkeep and misc expenses.</p>` +
            `<p>${numberWithCommas(Math.round(total * (expansionPct) / 100))}gp for mine expansion and facility upgrades.</p>` +
            `<p>And the mine owner${mineOwnerCount > 1 ? 's get' : ' gets'} ${numberWithCommas(Math.round(total * (partyPct / 100) / mineOwnerCount))}gp${mineOwnerCount > 1 ? ' each' : ''}.</p>`
        );
    }

    function saveCheckboxStates() {
        const states = {};
        $('#output input[type="checkbox"]').each(function () {
            states[$(this).attr('id')] = $(this).is(':checked');
        });
        localStorage.setItem('checkboxStates', JSON.stringify(states));
    }
    function restoreCheckboxStates() {
        const states = JSON.parse(localStorage.getItem('checkboxStates') || '{}');
        $('#output input[type="checkbox"]').each(function () {
            const id = $(this).attr('id');
            if (typeof states[id] !== 'undefined') {
                $(this).prop('checked', states[id]);
            }
        });
    }

    // Save all input values and output checkbox states to localStorage under mineName_fantasy_mine
    function saveMineSettings() {
        const mineName = $('#mineName').val().trim();
        if (!mineName) return;
        const data = {};
        $('input, select').each(function() {
            const id = $(this).attr('id');
            if (id) data[id] = $(this).val();
        });
        // Save output checkbox states
        data.outputCheckboxStates = {};
        $('#output input[type="checkbox"]').each(function() {
            const id = $(this).attr('id');
            data.outputCheckboxStates[id] = $(this).is(':checked');
        });
        localStorage.setItem(mineName + '_fantasy_mine', JSON.stringify(data));
        updateMineDropdown();
    }

    // Load all input values and output checkbox states from localStorage for a given key
    function loadMineSettings(key) {
        const data = JSON.parse(localStorage.getItem(key) || '{}');
        Object.keys(data).forEach(id => {
            if (id !== 'outputCheckboxStates') {
                $('#' + id).val(data[id]);
            }
        });
        generateResources();
        // Restore output checkbox states after output is generated
        if (data.outputCheckboxStates) {
            Object.keys(data.outputCheckboxStates).forEach(id => {
                const checked = data.outputCheckboxStates[id];
                $('#' + id).prop('checked', checked);
            });
        }
    }

    // Populate dropdown with all saved mines
    function updateMineDropdown() {
        const $dropdown = $('#mineLoadDropdown');
        $dropdown.empty();
        $dropdown.append('<option value="">-- Load Saved Mine --</option>');
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (/_fantasy_mine$/.test(key)) {
                $dropdown.append(`<option value="${key}">${key.replace('_fantasy_mine','')}</option>`);
            }
        }
    }

    // Save on mineName mouseout only
    $('#mineName').on('mouseout blur', function() {
        saveMineSettings();
    });

    // Load selected mine from dropdown
    $('#mineLoadDropdown').on('change', function() {
        const key = $(this).val();
        if (key) loadMineSettings(key);
    });

    // Erase all *_fantasy_mine keys from localStorage
    $('#eraseMines').on('click', function() {
        if (!confirm('Are you sure you want to permanently erase all saved mines? This cannot be undone.')) return;
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (/_fantasy_mine$/.test(key)) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
        updateMineDropdown();
        alert('All saved mines have been erased.');
    });

    // Initial dropdown population
    $(function() {
        updateMineDropdown();
    });

    // Format a number with commas (e.g., 1234567 -> 1,234,567)
    function numberWithCommas(x) {
        if (isNaN(x)) return x;
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
});