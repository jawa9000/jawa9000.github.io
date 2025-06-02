const fs = require('fs');

// Load and parse the monsters.js file
const monsters = require('./monsters.js'); // Adjust path if needed

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