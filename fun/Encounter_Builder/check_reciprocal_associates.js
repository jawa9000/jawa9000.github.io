const fs = require('fs');

// Load and parse the monsters.js file
let monsters;
try {
  // Try to require as a variable assignment (e.g., const monsters = [...])
  monsters = require('./monsters.js');
  if (!Array.isArray(monsters)) {
    // If it's an object with a property, try to extract the array
    if (Array.isArray(monsters.monsters)) {
      monsters = monsters.monsters;
    } else if (Array.isArray(monsters.default)) {
      monsters = monsters.default;
    } else if (Array.isArray(Object.values(monsters)[0])) {
      monsters = Object.values(monsters)[0];
    } else {
      throw new Error('Could not find monsters array in monsters.js');
    }
  }
} catch (e) {
  // Fallback: try to load as a JS file with a variable assignment
  const fs = require('fs');
  const path = require('path');
  const MONSTERS_FILE = path.join(__dirname, 'monsters.js');
  let monstersRaw = fs.readFileSync(MONSTERS_FILE, 'utf8');
  // Remove variable assignment and trailing semicolon
  monstersRaw = monstersRaw.replace(/^\s*const\s+\w+\s*=\s*/, '').replace(/;\s*$/, '');
  try {
    monsters = eval(monstersRaw);
  } catch (err) {
    throw new Error('Could not parse monsters.js as an array.');
  }
}

// Build a map of monster names to their associates (case-insensitive)
const nameToAssociates = {};
monsters.forEach(monster => {
  if (monster.name && Array.isArray(monster.associates)) {
    nameToAssociates[monster.name.toLowerCase()] = monster.associates.map(a => a.toLowerCase());
  }
});

// Find non-reciprocal associations
const nonReciprocals = [];
for (const [name, associates] of Object.entries(nameToAssociates)) {
  associates.forEach(associate => {
    if (
      nameToAssociates[associate] && // The associate is a monster
      !nameToAssociates[associate].includes(name) // But doesn't list the original monster
    ) {
      nonReciprocals.push([name, associate]);
    }
  });
}

// Print results and export to a text file
const outputLines = [];
if (nonReciprocals.length === 0) {
  const msg = 'All monster associate relationships are reciprocal.';
  console.log(msg);
  outputLines.push(msg);
} else {
  const header = 'Non-reciprocal associate pairs:';
  console.log(header);
  outputLines.push(header);
  nonReciprocals.forEach(([a, b]) => {
    const line = `"${a}" lists "${b}" as an associate, but not vice versa.`;
    console.log(line);
    outputLines.push(line);
  });
}

// Write results to a text file
fs.writeFileSync('non_reciprocal_associates.txt', outputLines.join('\n'), 'utf8');