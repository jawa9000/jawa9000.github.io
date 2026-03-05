// ===== BUSINESS TIER DEFINITIONS =====
const businessTiers = {
    'Common': { 
        minProfit: 10, 
        maxProfit: 25, 
        costMultiplier: 1,
        description: 'Common business found in villages'
    },
    'Uncommon': { 
        minProfit: 30, 
        maxProfit: 60, 
        costMultiplier: 2,
        description: 'Specialized business found in cities'
    },
    'Rare': { 
        minProfit: 100, 
        maxProfit: 300, 
        costMultiplier: 5,
        description: 'High-end specialized business in metropolises'
    }
};

// ===== BUSINESS-SPECIFIC MAINTENANCE COSTS =====
const businessMaintenanceCosts = {
    // Common Businesses
    'Inn / Tavern': 2.5,
    'General Store': 2.0,
    'Smithy': 2.5,
    'Shrine / Chapel': 1.0,
    'Market Square': 3.0,
    'Stables': 3.0,
    // Uncommon Businesses
    'Apothecary': 4.0,
    'Armorer / Weaponsmith': 5.0,
    'Bank / Moneychanger': 3.5,
    'Bowyer / Fletcher': 3.5,
    'Jeweler / Gemcutter': 6.0,
    'Leatherworker': 3.0,
    'Scribe / Cartographer': 2.5,
    'Tailor / Clothier': 3.0,
    'Wainwright / Wheelwright': 4.0,
    'Tattoo Parlor': 2.0,
    'Auction House': 4.0,
    // Rare Businesses
    'Arcane Shop / Magic Shop': 10.0,
    'Alchemist\'s Laboratory': 12.0,
    'University / Great Library': 8.0
};

// ===== RPG BUSINESSES DATABASE =====
const rpgBusinesses = {
    'Inn / Tavern': { tier: 'Common', quirk: 'High volume, low margin', hasAppraisal: false },
    'General Store': { tier: 'Common', quirk: 'Steady foot traffic', hasAppraisal: false },
    'Smithy': { tier: 'Common', quirk: 'Reliable craftwork', hasAppraisal: false },
    'Shrine / Chapel': { tier: 'Common', quirk: 'Donations variable', hasAppraisal: false },
    'Market Square': { tier: 'Common', quirk: 'High volume, low margin', hasAppraisal: false },
    'Stables': { tier: 'Common', quirk: 'Steady income', hasAppraisal: false },
    'Apothecary': { tier: 'Uncommon', quirk: 'High profit on utility items', hasAppraisal: false },
    'Armorer / Weaponsmith': { tier: 'Uncommon', quirk: 'Custom orders', hasAppraisal: true },
    'Bank / Moneychanger': { tier: 'Uncommon', quirk: 'Fees and interest', hasAppraisal: false },
    'Bowyer / Fletcher': { tier: 'Uncommon', quirk: 'Niche demand', hasAppraisal: true },
    'Jeweler / Gemcutter': { tier: 'Uncommon', quirk: 'High value transactions', hasAppraisal: true },
    'Leatherworker': { tier: 'Uncommon', quirk: 'Reliable craftsmanship', hasAppraisal: false },
    'Scribe / Cartographer': { tier: 'Uncommon', quirk: 'Specialized knowledge', hasAppraisal: false },
    'Tailor / Clothier': { tier: 'Uncommon', quirk: 'Fashion driven', hasAppraisal: false },
    'Arcane Shop / Magic Shop': { tier: 'Rare', quirk: 'High risk, high overhead', hasAppraisal: true },
    'Alchemist\'s Laboratory': { tier: 'Rare', quirk: 'Volatile, valuable', hasAppraisal: true },
    'Wainwright / Wheelwright': { tier: 'Uncommon', quirk: 'Specialized crafts', hasAppraisal: false },
    'Tattoo Parlor': { tier: 'Uncommon', quirk: 'Variable clientele', hasAppraisal: false },
    'University / Great Library': { tier: 'Rare', quirk: 'Gate fees and donations', hasAppraisal: false },
    'Auction House': { tier: 'Uncommon', quirk: 'Commission based', hasAppraisal: false }
};

// ===== EVENT OUTCOMES BASED ON TIERS =====
const businessEventOutcomes = [
    { name: 'catastrophic', range: [1, 10], description: 'Catastrophic - Pay 1.5x maintenance' },
    { name: 'loss', range: [11, 20], description: 'Loss - Pay full maintenance' },
    { name: 'reduced', range: [21, 30], description: 'Reduced - Pay half maintenance' },
    { name: 'breakeven', range: [31, 50], description: 'Breakeven - No change' },
    { name: 'profit', range: [51, 100], description: 'Profit - Earn based on tier' }
];

// ===== SEASONAL MODIFIERS =====
const seasonalModifiers = {
    'Spring': 1.1,      // 10% boost
    'Summer': 1.15,     // 15% boost (peak season)
    'Fall': 1.0,        // Normal
    'Winter': 0.85      // 15% penalty (tough season)
};

// ===== RANDOM EVENTS =====
const randomEvents = [
    { name: 'Festival', chance: 8, profitMod: 0.5, description: 'Local festival boosts sales!' },
    { name: 'Inspection', chance: 5, profitMod: -0.3, description: 'Tax inspector visits, extra costs!' },
    { name: 'Competitor', chance: 7, profitMod: -0.2, description: 'New competitor opens nearby.' },
    { name: 'Shipment Delay', chance: 10, profitMod: -0.4, description: 'Supplier delayed, increased costs!' },
    { name: 'Good Reputation', chance: 6, profitMod: 0.3, description: 'Your reputation spreads, more customers!' },
    { name: 'Theft', chance: 4, profitMod: -0.6, description: 'Break-in! Significant losses.' }
];

// ===== WEATHER EFFECTS =====
const weatherEffects = [
    { name: 'Clear', chance: 40, profitMod: 1.0, description: 'Clear skies.' },
    { name: 'Cloudy', chance: 25, profitMod: 1.0, description: 'Cloudy day.' },
    { name: 'Rain', chance: 20, profitMod: 0.85, description: 'Rainy weather reduces foot traffic.' },
    { name: 'Snow/Storm', chance: 10, profitMod: 0.7, description: 'Severe weather hurts business!' },
    { name: 'Perfect', chance: 5, profitMod: 1.15, description: 'Perfect weather boosts sales!' }
];

// ===== EMPLOYEE MORALE =====
const moraleEvents = [
    { name: 'Great Morale', chance: 30, modifier: 1.15 },
    { name: 'Good Morale', chance: 35, modifier: 1.05 },
    { name: 'Average Morale', chance: 25, modifier: 1.0 },
    { name: 'Poor Morale', chance: 8, modifier: 0.9 },
    { name: 'Terrible Morale', chance: 2, modifier: 0.7 }
];

// ===== SUPPLY COST VOLATILITY =====
function getSupplyCostMultiplier() {
    // Random 0.8x to 1.3x variance in supply costs
    return (Math.random() * 0.5) + 0.8;
}

// ===== WEATHER SYSTEM =====
function getWeather() {
    const roll = rndNum(100);
    let cumulativeChance = 0;
    for (let weather of weatherEffects) {
        cumulativeChance += weather.chance;
        if (roll <= cumulativeChance) {
            return weather;
        }
    }
    return weatherEffects[0];
}

// ===== MORALE SYSTEM =====
function getMorale() {
    const roll = rndNum(100);
    let cumulativeChance = 0;
    for (let morale of moraleEvents) {
        cumulativeChance += morale.chance;
        if (roll <= cumulativeChance) {
            return morale;
        }
    }
    return moraleEvents[2];
}

// ===== EVENT TRACKING =====
let eventTracker = {
    'Festival': 0,
    'Inspection': 0,
    'Competitor': 0,
    'Shipment Delay': 0,
    'Good Reputation': 0,
    'Theft': 0
};

function resetEventTracker() {
    eventTracker = {
        'Festival': 0,
        'Inspection': 0,
        'Competitor': 0,
        'Shipment Delay': 0,
        'Good Reputation': 0,
        'Theft': 0
    };
}

function logEventTracker() {
    let summary = '<div class="event-summary"><h3>Event Summary</h3><ul>';
    let totalEvents = 0;
    
    for (let [eventName, count] of Object.entries(eventTracker)) {
        if (count > 0) {
            summary += `<li><strong>${eventName}:</strong> ${count} occurrence(s)</li>`;
            totalEvents += count;
        }
    }
    
    summary += `</ul><p><strong>Total Events:</strong> ${totalEvents}</p></div>`;
    return summary;
}

// ===== EVENT HANDLER =====
$('#businessType').on('change', function() {
    const businessType = $(this).val();
    if (businessType && rpgBusinesses[businessType]) {
        const tier = rpgBusinesses[businessType].tier;
        updateTierDisplay(tier, businessType);
        updateDailyCosts(tier, businessType);
    } else {
        $('#tierDisplay').text('-- Select a business --');
    }
});

function updateTierDisplay(tier, businessName) {
    const tierInfo = businessTiers[tier];
    const tierElement = $('#tierDisplay');
    tierElement.text(`${tier}: ${tierInfo.description}`);
    tierElement.removeClass('common uncommon rare');
    tierElement.addClass(tier.toLowerCase());
}

function updateDailyCosts(tier, businessType) {
    let calculatedCost;
    
    if (businessType && businessMaintenanceCosts[businessType]) {
        // Use business-specific cost
        calculatedCost = businessMaintenanceCosts[businessType].toFixed(1);
    } else {
        // Fall back to tier-based calculation
        const baseCost = 2; // 2 gp per day baseline (Skilled Hireling)
        const multiplier = businessTiers[tier].costMultiplier;
        calculatedCost = (baseCost * multiplier).toFixed(1);
    }
    
    $('#dailyCosts').val(calculatedCost);
}

// ===== MAIN SIMULATION CLICK HANDLER =====
$('button').on('click', function () {
    const businessType = $('#businessType').val();
    
    if (!businessType) {
        alert('Please select a business type');
        return;
    }

    $('div#output').html('');
    
    const tier = rpgBusinesses[businessType].tier;
    const hasAppraisal = rpgBusinesses[businessType].hasAppraisal;
    const ownerAdventuring = $('#ownerAdventuring').is(':checked');
    const selectedSeason = $('#season').val();
    const taxRate = parseFloat($('#taxRate').val()) / 100;
    
    let days = parseInt($('input#days').val());
    if (days > 365) {
        days = 365;
        $('input#days').val(365);
    }

    let worth = parseInt($('input#balance').val());
    const initWorth = worth;
    let dailyCosts = parseFloat($('input#dailyCosts').val());
    let output = '';
    let totals = [];
    let totalTaxesPaid = 0;
    resetEventTracker();

    for (let i = 0; i < days; i++) {
        const roll = rndNum(100);
        let dayResult = '';
        let dayProfitLoss = 0;

        if (ownerAdventuring) {
            // Owner is adventuring: only pay maintenance costs, no profit
            worth -= dailyCosts;
            const dailyLoss = -dailyCosts;
            let dayReport = `<details class="day-report">`;
            dayReport += `<summary class="day-summary">Day ${i + 1} (${selectedSeason}) - Loss: ${dailyLoss.toFixed(2)}gp</summary>`;
            dayReport += `<div class="day-log">`;
            dayReport += `<span class="owner-absent">Owner Absent - Unable to oversee business operations.</span><br>`;
            dayReport += `Maintenance Paid: ${dailyCosts.toFixed(2)}gp<br>`;
            dayReport += `<strong>Balance: ${worth.toFixed(2)}gp</strong>`;
            dayReport += `</div></details>`;
            output += dayReport;
        } else {
            // Determine outcome based on d100 roll
            if (roll >= 1 && roll <= 10) {
                // Catastrophic
                dayProfitLoss = -(dailyCosts * 1.5);
                worth += dayProfitLoss;
                let dayReport = `<details class="day-report">`;
                dayReport += `<summary class="day-summary">Day ${i + 1} (${selectedSeason}) - CATASTROPHIC Loss: ${dayProfitLoss.toFixed(2)}gp</summary>`;
                dayReport += `<div class="day-log">`;
                dayReport += `<span class="catastrophic-event">CATASTROPHIC EVENT</span><br>`;
                dayReport += `Disaster strikes! Major losses incurred.<br>`;
                dayReport += `<strong class="loss-amount">Lost: ${Math.abs(dayProfitLoss).toFixed(2)}gp</strong><br>`;
                dayReport += `<strong>Balance: ${worth.toFixed(2)}gp</strong>`;
                dayReport += `</div></details>`;
                output += dayReport;
            } else if (roll >= 11 && roll <= 20) {
                // Loss
                dayProfitLoss = -dailyCosts;
                worth += dayProfitLoss;
                let dayReport = `<details class="day-report">`;
                dayReport += `<summary class="day-summary">Day ${i + 1} (${selectedSeason}) - Loss: ${dayProfitLoss.toFixed(2)}gp</summary>`;
                dayReport += `<div class="day-log">`;
                dayReport += `<span class="loss-event">Loss Day</span><br>`;
                dayReport += `Business struggles to cover maintenance costs.<br>`;
                dayReport += `<strong class="loss-amount">Lost: ${Math.abs(dayProfitLoss).toFixed(2)}gp</strong><br>`;
                dayReport += `<strong>Balance: ${worth.toFixed(2)}gp</strong>`;
                dayReport += `</div></details>`;
                output += dayReport;
            } else if (roll >= 21 && roll <= 30) {
                // Reduced
                dayProfitLoss = -(dailyCosts * 0.5);
                worth += dayProfitLoss;
                let dayReport = `<details class="day-report">`;
                dayReport += `<summary class="day-summary">Day ${i + 1} (${selectedSeason}) - Reduced: ${dayProfitLoss.toFixed(2)}gp</summary>`;
                dayReport += `<div class="day-log">`;
                dayReport += `<span class="reduced-event">Reduced Income</span><br>`;
                dayReport += `Business operates at reduced capacity.<br>`;
                dayReport += `<strong class="loss-amount">Lost: ${Math.abs(dayProfitLoss).toFixed(2)}gp</strong><br>`;
                dayReport += `<strong>Balance: ${worth.toFixed(2)}gp</strong>`;
                dayReport += `</div></details>`;
                output += dayReport;
            } else if (roll >= 31 && roll <= 50) {
                // Breakeven
                let dayReport = `<details class="day-report">`;
                dayReport += `<summary class="day-summary">Day ${i + 1} (${selectedSeason}) - Breakeven: 0.00gp</summary>`;
                dayReport += `<div class="day-log">`;
                dayReport += `<span class="breakeven-event">Breakeven Day</span><br>`;
                dayReport += `Business covers maintenance costs with no profit or loss.<br>`;
                dayReport += `<strong>Balance: ${worth.toFixed(2)}gp</strong>`;
                dayReport += `</div></details>`;
                output += dayReport;
            } else {
                // Profit based on tier
                const tierData = businessTiers[tier];
                const baseProfit = rndNum(tierData.maxProfit - tierData.minProfit + 1) + tierData.minProfit - 1;
                
                // Apply seasonal modifier based on selected season
                const seasonMod = getSeasonModifierByName(selectedSeason);
                let seasonalProfit = baseProfit * seasonMod;
                
                // Get weather
                const weather = getWeather();
                seasonalProfit *= weather.profitMod;
                
                // Get employee morale
                const morale = getMorale();
                seasonalProfit *= morale.modifier;
                
                // Apply supply cost volatility to maintenance
                const supplyCostMod = getSupplyCostMultiplier();
                const adjustedDailyCosts = dailyCosts * supplyCostMod;
                const costVariance = adjustedDailyCosts - dailyCosts;
                
                // Check for random events
                let eventBonus = 0;
                let eventName = 'None';
                const event = checkRandomEvent();
                
                if (event) {
                    eventTracker[event.name]++;
                    eventBonus = seasonalProfit * event.profitMod;
                    eventName = event.name;
                }
                
                // Apply appraisal fee occasionally for specialty shops
                let appraisalBonus = 0;
                if (hasAppraisal && rndNum(100) <= 20) {
                    appraisalBonus = rndNum(41) + 9; // 10-50 gp
                }
                
                // Calculate taxes
                const taxableIncome = seasonalProfit + eventBonus + appraisalBonus;
                const taxAmount = Math.round((taxableIncome * taxRate) * 100) / 100;
                totalTaxesPaid += taxAmount;
                dayProfitLoss = Math.round((taxableIncome - taxAmount) * 100) / 100;
                worth += dayProfitLoss;
                
                const season = getSeason(i);
                
                // Build detailed day log
                let dayReport = `<details class="day-report">`;
                dayReport += `<summary class="day-summary">Day ${i + 1} (${selectedSeason}) - Net Profit: +${dayProfitLoss.toFixed(2)}gp</summary>`;
                let dayLog = `<div class="day-log">`;
                dayLog += `<strong>Day ${i + 1} (${selectedSeason})</strong><br>`;
                dayLog += `Base Profit: ${baseProfit.toFixed(2)}gp<br>`;
                dayLog += `Weather: ${weather.name} (${(weather.profitMod * 100).toFixed(0)}%)<br>`;
                dayLog += `Morale: ${morale.name} (${(morale.modifier * 100).toFixed(0)}%)<br>`;
                dayLog += `Seasonal Modifier: ${(seasonMod * 100).toFixed(0)}%<br>`;
                dayLog += `After Modifiers: ${seasonalProfit.toFixed(2)}gp<br>`;
                
                if (costVariance !== 0) {
                    dayLog += `<span class="cost-variance">Supply Costs: ${dailyCosts.toFixed(2)}gp → ${adjustedDailyCosts.toFixed(2)}gp (${costVariance > 0 ? '+' : ''}${costVariance.toFixed(2)})</span><br>`;
                }
                
                if (eventName !== 'None') {
                    dayLog += `<span class="event-triggered">Event: ${eventName} - ${event.description} (${eventBonus > 0 ? '+' : ''}${eventBonus.toFixed(2)}gp)</span><br>`;
                }
                
                if (appraisalBonus > 0) {
                    dayLog += `<span class="appraisal-bonus">Appraisal Fee: +${appraisalBonus.toFixed(2)}gp</span><br>`;
                }
                
                dayLog += `Subtotal: ${taxableIncome.toFixed(2)}gp<br>`;
                
                if (taxRate > 0) {
                    dayLog += `<span class="tax-amount">Taxes (${(taxRate * 100).toFixed(2)}%): -${taxAmount.toFixed(2)}gp</span><br>`;
                }
                
                dayLog += `<strong class="net-profit">Net Profit: +${dayProfitLoss.toFixed(2)}gp</strong><br>`;
                dayLog += `<strong>Balance: ${worth.toFixed(2)}gp</strong>`;
                dayLog += `</div></details>`;
                
                output += dayReport + dayLog;
            }
        }

        totals.push(worth);
    }

    drawGraph(totals);

    // Add event summary
    output += logEventTracker();

    // Generate summary
    let summary;
    const taxSummary = taxRate > 0 ? `<br>Total Taxes Paid: ${numberWithCommas(totalTaxesPaid.toFixed(2))}gp` : '';
    if (initWorth > worth) {
        const loss = Math.abs(worth - initWorth);
        summary = `<h4>Business: ${businessType} (${tier}) | Season: ${selectedSeason}<br>Starting: ${numberWithCommas(initWorth)}gp | Net Loss: ${numberWithCommas(loss.toFixed(2))}gp over ${days} days | Final Balance: ${numberWithCommas(worth.toFixed(2))}gp${taxSummary}</h4>`;
    } else if (initWorth === worth) {
        summary = `<h4>Business: ${businessType} (${tier}) | Season: ${selectedSeason}<br>Your business broke even over ${days} days. Balance: ${numberWithCommas(worth)}gp${taxSummary}</h4>`;
    } else {
        const gain = worth - initWorth;
        summary = `<h4>Business: ${businessType} (${tier}) | Season: ${selectedSeason}<br>Starting: ${numberWithCommas(initWorth)}gp | Net Gain: ${numberWithCommas(gain.toFixed(2))}gp over ${days} days | Final Balance: ${numberWithCommas(worth.toFixed(2))}gp${taxSummary}</h4>`;
    }

    $('div#output').append(output);
    $('div#output').prepend(summary);
});

// ===== UTILITY FUNCTIONS =====
function rndNum(x) {
    return Math.floor(Math.random() * x) + 1;
}

function drawGraph(dataArr) {
    const canvas = document.getElementById("balanceCanvas");
    const context = canvas.getContext("2d");
    const GRAPH_TOP = 25;
    const GRAPH_BOTTOM = 375;
    const GRAPH_LEFT = 25;
    const GRAPH_RIGHT = 475;
    const GRAPH_HEIGHT = 350;
    const GRAPH_WIDTH = 450;
    let largest = 0;

    for (let i = 0; i < dataArr.length; i++) {
        if (dataArr[i] > largest) {
            largest = dataArr[i];
        }
    }

    context.clearRect(0, 0, 500, 400);
    context.font = "12px Arial";
    context.beginPath();
    context.lineJoin = "round";
    context.strokeStyle = "black";
    context.moveTo(GRAPH_LEFT, (GRAPH_HEIGHT - dataArr[0] / largest * GRAPH_HEIGHT) + GRAPH_TOP);
    context.fillText("1", 15, GRAPH_BOTTOM + 25);

    for (let i = 1; i < dataArr.length; i++) {
        context.lineTo(GRAPH_RIGHT / dataArr.length * i + GRAPH_LEFT, (GRAPH_HEIGHT - dataArr[i] / largest * GRAPH_HEIGHT) + GRAPH_TOP);
        context.fillText((i + 1), GRAPH_RIGHT / dataArr.length * i, GRAPH_BOTTOM + 25);
    }

    context.stroke();
}

function numberWithCommas(x) {
    const parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function getSeason(dayNumber) {
    const dayOfYear = dayNumber % 365;
    if (dayOfYear < 91) return 'Spring';
    if (dayOfYear < 182) return 'Summer';
    if (dayOfYear < 273) return 'Fall';
    return 'Winter';
}

function getSeasonModifier(dayNumber) {
    const season = getSeason(dayNumber);
    return seasonalModifiers[season];
}

function getSeasonModifierByName(seasonName) {
    return seasonalModifiers[seasonName] || 1.0;
}

function checkRandomEvent() {
    const roll = rndNum(100);
    for (let event of randomEvents) {
        if (roll <= event.chance) {
            return event;
        }
    }
    return null;
}