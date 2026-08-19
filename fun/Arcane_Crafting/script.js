const rarities = [
    { name: 'Common', effect: '+1 to damage only; glows in the dark', mass: 'A pinch (1-2 grams)', value: '50-100 gp', time: '1 hour (Short Rest)', dc: 10, yield: 'A tiny dusting', yieldValue: 25 },
    { name: 'Uncommon', effect: 'Full +1 weapon; Weapon of Warning', mass: 'Small vial (1 ounce)', value: '200-500 gp', time: '8 hours (1 full day)', dc: 13, yield: '1/2 ounce', yieldValue: 125 },
    { name: 'Rare', effect: 'Full +2 weapon; Flametongue', mass: 'Large pouch (1/2 pound)', value: '2,000-5,000 gp', time: '3 days (Downtime)', dc: 15, yield: '1/4 pound', yieldValue: 1000 },
    { name: 'Very Rare', effect: 'Full +3 weapon; Dancing Sword', mass: 'Small brick (2 pounds)', value: '20,000-50,000 gp', time: '1 week (7 days)', dc: 18, yield: '1 pound', yieldValue: 10000 },
    { name: 'Legendary', effect: 'Holy Avenger; Luck Blade', mass: 'Large ingot (5 pounds)', value: '100,000-200,000 gp', time: '1 month (30 days)', dc: 22, yield: '2.5-pound ingot', yieldValue: 50000 },
    { name: 'Artifact', effect: 'Campaign-defining items', mass: 'Impossibly dense cosmic shard', value: '500,000+ gp / Priceless', time: '1 year (or Celestial Event)', dc: 26, yield: 'Cannot be safely disenchanted', yieldValue: null }
];

const mishaps = [
    [1, 5, 'Arcane Sputter', 'The process fails. Half the Residuum/Crystal is ruined. The item is unharmed.'],
    [6, 10, 'Flawed Attunement', 'The item becomes a +1 item but gains a Minor Flaw.'],
    [11, 15, 'Volatile Backfire', 'The crystal explodes. The wizard takes 1d6 force damage per rarity tier; all Residuum is lost.'],
    [16, 20, 'Arcane Bleed', 'The item succeeds but the wielder cannot regain their lowest-level expended spell slot during long rests.'],
    [21, 25, 'Cursed Binding', 'The enchantment succeeds but gains a Major Curse.'],
    [26, Infinity, 'Structural Collapse', 'The Residuum detonates for 6d6 force damage in a 10-foot radius and destroys the base item.']
];

const flaws = [
    'Loud - Hums when an enemy is within 120 feet; disadvantage on Stealth checks.', 'Gluttonous - Requires 10 gp of gems every 7 days or loses its +1 bonus.', 'Heavy - Weight triples; Strength under 13 means disadvantage on attacks.', 'Sentient Echo - A trapped fragment of the wizard complains when the wielder misses.', 'Glowbug - Sheds bright light 20 feet and dim light another 20 feet.', 'Allergic - Touching mud, sewage, or grime suppresses its bonuses for 1 hour.', 'Hydrophobic - Loses its magic while submerged in water.', "Pacifist's Sigh - Groans audibly whenever it deals damage.", 'Temperamental - A 2-5 attack roll shuts off its +1 bonus for 1 minute.', 'Melodramatic - Screams when it clashes with another weapon or shield.', 'Lecherous Glow - Glows neon pink or bright green during Charisma checks.', 'Magnetic Pull - Small metal objects within 5 feet stick to it.', 'Drowsy Matrix - DC 10 Wisdom save or -2 initiative.', 'Arcane Static - Radio-like static gives -2 passive Perception.', 'Xenophobic - Works perfectly for its creator; others find it greasy and slick.', 'Rust Bait - Rust monsters, oozes, and metal-eaters prioritize its wielder.', 'Clumsy Attunement - Takes 1 hour of concentration to draw or sheathe.', 'Weather Sensitive - Bonus drops to +0 during active precipitation.', 'Sparks Fly - A hit gives the wielder -1 to their next attack.', 'Prideful - Refuses to be stored; must be carried openly in hand.'
];

const curses = [
    'Bloodthirsty - DC 13 Wisdom save or cannot sheathe it until it draws blood.', 'Vulnerability - Wielder gains vulnerability to one random damage type.', 'Jealous Blade - Breaks all other item attunements and prevents new ones.', 'Symbiotic Drain - A natural 1 deals necrotic damage equal to the weapon\'s max damage die.', 'Withering Grip - Wielder cannot be healed by magical means.', 'Ghostly Call - Damage alerts all Undead within 1 mile to the wielder\'s location.', 'Coward\'s Curse - Below half HP, wielder is Frightened of all enemies for 1 minute.', 'Arcane Parasite - Each morning, roll a d6 and lose a spell slot of that level.', 'Brittle Soul - Each hit taken subtracts 1d4 from AC until the next turn.', 'Shadow Weight - Movement speed is permanently reduced by 10 feet.', 'Frail Frame - Maximum HP is reduced by twice character level.', 'Feeble Hands - DC 13 Strength save or drop it after physical damage.', 'Mind Fracturer - Disadvantage on Intelligence, Wisdom, and Charisma saves.', 'Berserker\'s Rage - DC 15 Wisdom save after damage or attack the nearest creature.', 'Solar Anemia - Disadvantage on attacks and ability checks in direct sunlight.', 'Curse of Misery - Critical hits are downgraded to normal hits.', 'Paranoia Matrix - Cannot benefit from Help and has disadvantage near an ally.', 'Heavy Soul - Automatically fails Swim checks and takes double falling damage.', 'Blinding Flash - A natural 20 blinds the wielder for 1 round.', 'The Soul Bound - If the wielder dies attuned, their soul is pulled into the crystal and the weapon is destroyed.'
];

const rarityOptions = rarities.map((rarity, index) => `<option value="${index}">${rarity.name}</option>`).join('');
document.getElementById('raritySelect').innerHTML = rarityOptions;
document.getElementById('disenchantRarity').innerHTML = rarityOptions;

function showResult(id, html, failure = false) {
    const element = document.getElementById(id);
    element.innerHTML = html;
    element.classList.remove('result-hidden', 'failure');
    if (failure) element.classList.add('failure');
}

function renderCraftDetails() {
    const rarity = rarities[Number(document.getElementById('raritySelect').value)];
    document.getElementById('craftDetails').innerHTML = `<strong>${rarity.name}:</strong> ${rarity.effect}<br>Materials: ${rarity.mass} (${rarity.value})<br>Time: ${rarity.time} | Crafting DC: <strong>DC ${rarity.dc}</strong>`;
    document.getElementById('craftDc').value = rarity.dc;
}

function getAdjustedBonus(bonusId, proficiencyId) {
    return Number(document.getElementById(bonusId).value) * Number(document.getElementById(proficiencyId).value);
}

function rollD20() {
    return Math.floor(Math.random() * 20) + 1;
}

function rollTableEntry(entries) {
    const roll = rollD20();
    const parts = entries[roll - 1].split(' - ');
    return { roll, name: parts[0], description: parts.slice(1).join(' - ') };
}

document.getElementById('raritySelect').addEventListener('change', renderCraftDetails);
document.getElementById('disenchantRarity').addEventListener('change', () => {
    const rarity = rarities[Number(document.getElementById('disenchantRarity').value)];
    document.getElementById('disenchantDc').value = rarity.dc;
});
document.getElementById('craftForm').addEventListener('submit', event => {
    event.preventDefault();
    const rarity = rarities[Number(document.getElementById('raritySelect').value)];
    const bonus = getAdjustedBonus('craftBonus', 'craftProficiency');
    const checkRoll = rollD20();
    const total = checkRoll + bonus;
    if (total >= rarity.dc) showResult('craftResult', `<strong>Ritual succeeds.</strong> Check: ${checkRoll} + bonus ${bonus} = <strong>${total}</strong> (DC ${rarity.dc}). The ${rarity.name} catalyst is consumed, the spell slot is lost for the day, and the item permanently absorbs its effect.`);
    else {
        const failure = rarity.dc - total;
        const mishapRoll = rollD20();
        const mishapTotal = mishapRoll + failure;
        const mishap = mishaps.find(entry => mishapTotal >= entry[0] && mishapTotal <= entry[1]);
        let followUp = '';
        if (mishap[2] === 'Flawed Attunement') {
            const flaw = rollTableEntry(flaws);
            followUp = `<br><strong>Minor Flaw (d20 ${flaw.roll}): ${flaw.name}</strong><br>${flaw.description}`;
        } else if (mishap[2] === 'Cursed Binding') {
            const curse = rollTableEntry(curses);
            followUp = `<br><strong>Major Curse (d20 ${curse.roll}): ${curse.name}</strong><br>${curse.description}`;
        }
        showResult('craftResult', `<strong>Ritual fails by ${failure}.</strong> Check: ${checkRoll} + bonus ${bonus} = <strong>${total}</strong> (DC ${rarity.dc}).<br><strong>Mishap: ${mishap[2]}</strong><br>Mishap roll: ${mishapRoll} + failure ${failure} = <strong>${mishapTotal}</strong><br>${mishap[3]}${followUp}`, true);
    }
});

document.getElementById('disenchantForm').addEventListener('submit', event => {
    event.preventDefault();
    const rarity = rarities[Number(document.getElementById('disenchantRarity').value)];
    const bonus = getAdjustedBonus('disenchantBonus', 'disenchantProficiency');
    if (rarity.name === 'Artifact') return showResult('disenchantResult', '<strong>Unsafe:</strong> Artifact magic cannot be safely disenchanted by mortal means.', true);
    const dc = rarity.dc;
    const flawed = document.getElementById('isFlawed').checked;
    const yieldMultiplier = flawed ? 0.75 : 1;
    const cursed = document.getElementById('isCursed').checked;
    const firstRoll = rollD20();
    const secondRoll = cursed ? rollD20() : firstRoll;
    const checkRoll = cursed ? Math.min(firstRoll, secondRoll) : firstRoll;
    const total = checkRoll + bonus;
    const checkSummary = cursed ? `Checks: ${firstRoll} and ${secondRoll}; disadvantage uses ${checkRoll} + bonus ${bonus} = <strong>${total}</strong>.` : `Check: ${checkRoll} + bonus ${bonus} = <strong>${total}</strong>.`;
    if (checkRoll === 1) return showResult('disenchantResult', `<strong>Critical failure.</strong> ${checkSummary} The item is destroyed, zero Residuum is salvaged, and you must roll on the Mishap Table.`, true);
    if (total >= dc) {
        const adjustedValue = Math.floor(rarity.yieldValue * yieldMultiplier);
        showResult('disenchantResult', `<strong>Full yield:</strong> ${checkSummary} ${rarity.yield}, worth ${adjustedValue.toLocaleString()} gp.${flawed ? ' The flawed matrix reduces this yield by 25%.' : ''}`);
    } else {
        const adjustedValue = Math.floor(rarity.yieldValue * 0.5 * yieldMultiplier);
        showResult('disenchantResult', `<strong>Half yield:</strong> ${checkSummary} The item is destroyed and yields ${adjustedValue.toLocaleString()} gp worth of Residuum, but magic bleeds away inefficiently.${flawed ? ' The flawed matrix reduces this yield by another 25%.' : ''}`, true);
    }
});

renderCraftDetails();
document.getElementById('disenchantDc').value = rarities[0].dc;
