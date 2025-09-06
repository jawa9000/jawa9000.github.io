# D&D 5e Combat Simulator

A comprehensive web-based combat simulation system for Dungeons & Dragons 5th Edition, built with HTML, CSS, JavaScript, and jQuery.

## Features

### Core Combat System
- **Initiative Tracking**: Automatic initiative rolling and turn order management
- **Attack System**: D20 attack rolls with critical hits/misses
- **Damage Calculation**: Support for various damage dice formats (e.g., 1d8+3)
- **Armor Class (AC)**: Hit/miss determination based on AC
- **Hit Points**: Visual HP bars and death tracking

### Character Management
- **Character Creation**: Add player characters and monsters
- **Stat Tracking**: AC, HP, initiative bonus, attack bonus, damage dice
- **Visual Indicators**: HP bars, current turn highlighting, death status
- **Healing System**: Basic healing mechanics

### Combat Actions
- **Attack**: Roll to hit and deal damage
- **Dodge**: Take defensive action
- **Cast Spell**: Basic spell casting (expandable)
- **End Turn**: Advance to next combatant

### Monster Database
- **External Monster Database**: Loads monsters from `E:\jawa9000.github.io\fun\Encounter_Builder\monsters.js`
- **Search & Filter**: Search by name and filter by creature type (Aberration, Beast, Dragon, etc.)
- **Automatic Parsing**: Converts external monster data to combat simulator format
- **Comprehensive Stats**: Includes AC, HP, attack bonuses, damage dice, and more

### User Interface
- **Modern Design**: Clean, responsive interface with glassmorphism effects
- **Real-time Updates**: Live combat log and status updates
- **Mobile Friendly**: Responsive design for all screen sizes
- **Visual Feedback**: Color-coded messages and status indicators

## How to Use

1. **Start a New Combat**: Click "New Combat" to begin
2. **Add Characters**: Use "Add Character" for PCs or "Add Monster" for NPCs
3. **Select Monsters**: Browse the comprehensive monster database with search and filter options
4. **Roll Initiative**: Click "Roll Initiative" to determine turn order
5. **Take Actions**: Use the action buttons during each character's turn
6. **Track Progress**: Monitor the combat log and character status

## Technical Details

### D&D 5e Rules Implementation
- **Initiative**: d20 + Dexterity modifier
- **Attack Rolls**: d20 + proficiency + ability modifier vs. AC
- **Critical Hits**: Natural 20 on attack roll
- **Critical Misses**: Natural 1 on attack roll
- **Damage**: Roll damage dice + modifiers

### File Structure
- `index.html` - Main HTML structure
- `styles.css` - CSS styling and responsive design
- `script.js` - JavaScript combat logic and UI management
- `README.md` - This documentation

### Dependencies
- jQuery 3.6.0 (loaded via CDN)
- Modern web browser with JavaScript enabled

## Customization

The system is designed to be easily extensible:
- Add new monsters to the `MONSTER_DATABASE`
- Implement additional spell effects
- Add more combat actions (grapple, shove, etc.)
- Create character classes with special abilities

## Browser Compatibility

Tested on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is open source and available under the MIT License.
