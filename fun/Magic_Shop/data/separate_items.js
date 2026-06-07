const fs = require('fs');

// Read the file
const data = JSON.parse(fs.readFileSync('items_scribe.json', 'utf8'));

// Function to split items that have multiple spells
function separateItems(items) {
  const separated = [];
  
  items.forEach(item => {
    // Check if it's a scroll with multiple items
    const scrollMatch = item.match(/^(Arcane|Divine)\s+Scroll\s*\((.+)\)$/);
    
    if (scrollMatch) {
      const type = scrollMatch[1];
      const content = scrollMatch[2];
      
      // Split by comma, but be careful with nested parentheses
      const spells = [];
      let current = '';
      let parenCount = 0;
      
      for (let char of content) {
        if (char === '(') parenCount++;
        if (char === ')') parenCount--;
        
        if (char === ',' && parenCount === 0) {
          spells.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      if (current.trim()) spells.push(current.trim());
      
      // Create individual scroll entries
      if (spells.length > 1) {
        spells.forEach(spell => {
          separated.push(`${type} Scroll (${spell})`);
        });
      } else {
        separated.push(item);
      }
    } else {
      separated.push(item);
    }
  });
  
  return separated;
}

const separated = separateItems(data);

// Write back with proper formatting
fs.writeFileSync('items_scribe.json', JSON.stringify(separated, null, 4));
console.log(`Separated ${data.length} items into ${separated.length} items`);
