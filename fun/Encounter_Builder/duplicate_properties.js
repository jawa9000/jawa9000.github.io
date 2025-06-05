const fs = require('fs');
const path = require('path');

const MONSTERS_FILE = path.join(__dirname, 'monsters.js');
const monstersRaw = fs.readFileSync(MONSTERS_FILE, 'utf8');

// Extract the array part (remove assignment if present)
const arrayMatch = monstersRaw.match(/\[\s*{[\s\S]*}\s*\]/);
if (!arrayMatch) {
  console.error('Could not find array of monsters in monsters.js');
  process.exit(1);
}
const arrayText = arrayMatch[0];

// Use a regex to split into individual monster objects
const objectRegex = /{[\s\S]*?}/g;
const objects = arrayText.match(objectRegex);

let foundDuplicates = false;

objects.forEach((objText, idx) => {
  const propRegex = /["']?([\w\s]+)["']?\s*:/g;
  const props = {};
  let match;
  while ((match = propRegex.exec(objText)) !== null) {
    const prop = match[1].trim();
    props[prop] = (props[prop] || 0) + 1;
  }
  const duplicates = Object.entries(props).filter(([k, v]) => v > 1);
  if (duplicates.length > 0) {
    foundDuplicates = true;
    console.log(`Monster object #${idx + 1} has duplicate properties:`);
    duplicates.forEach(([k, v]) => {
      console.log(`  - ${k}: ${v} times`);
    });
    console.log();
  }
});

if (!foundDuplicates) {
  console.log('No duplicate properties found in any monster object.');
}