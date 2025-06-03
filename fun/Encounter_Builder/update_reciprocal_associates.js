const fs = require('fs');
const path = require('path');

const MONSTERS_FILE = path.join(__dirname, 'monsters.js');
const NON_RECIPROCAL_FILE = path.join(__dirname, 'non_reciprocal_associates.txt');

// Helper: Load monsters.js as an array of objects
function loadMonsters() {
    let monstersRaw = fs.readFileSync(MONSTERS_FILE, 'utf8');
    // Detect and preserve module.exports wrapper
    let prefix = '', suffix = '';
    const exportMatch = monstersRaw.match(/^(.*module\.exports\s*=\s*)/);
    if (exportMatch) {
        prefix = exportMatch[1];
        monstersRaw = monstersRaw.slice(prefix.length);
    }
    // Remove trailing semicolon or whitespace
    monstersRaw = monstersRaw.replace(/;\s*$/, '');
    // Remove trailing comments or whitespace
    monstersRaw = monstersRaw.replace(/\n*\s*$/, '');
    // Try to parse as JS array
    let monsters;
    try {
        monsters = eval(monstersRaw); // monsters.js should be an array
    } catch (e) {
        // Try to parse as JSON
        monsters = JSON.parse(monstersRaw);
    }
    // Save prefix for later
    monsters._prefix = prefix;
    return monsters;
}

// Helper: Save monsters.js (preserve module.exports if present)
function saveMonsters(monsters) {
    let prefix = '';
    if (monsters._prefix) {
        prefix = monsters._prefix;
        delete monsters._prefix;
    }
    const out = prefix + JSON.stringify(monsters, null, 2) + '\n';
    fs.writeFileSync(MONSTERS_FILE, out, 'utf8');
    console.log('Updated monsters.js with reciprocal associates.');
}

// Main logic
function main() {
    const monsters = loadMonsters();
    const monsterMap = {};
    monsters.forEach(m => { if (m.name) monsterMap[m.name.toLowerCase()] = m; });

    const lines = fs.readFileSync(NON_RECIPROCAL_FILE, 'utf8').split(/\r?\n/);
    lines.forEach(line => {
        const match = line.match(/^("?)([^"]+)\1 lists ("?)([^"]+)\3 as an associate/i);
        if (!match) return;
        const fromName = match[2].trim().toLowerCase();
        const toName = match[4].trim();
        const toNameLower = toName.toLowerCase();
        const fromMonster = monsterMap[fromName];
        const toMonster = monsterMap[toNameLower];
        if (!fromMonster || !toMonster) {
            console.warn(`Monster not found: ${fromName} or ${toName}`);
            return;
        }
        // Only update associates property of existing monster objects
        if (!Array.isArray(toMonster.associates)) toMonster.associates = [];
        if (!toMonster.associates.includes(fromMonster.name)) {
            toMonster.associates.push(fromMonster.name);
            console.log(`Added reciprocal associate: ${fromMonster.name} -> ${toMonster.name}`);
        }
    });
    saveMonsters(monsters);
}

main();