Use the [PDF2JSON Prompt](https://docs.google.com/document/d/1-5uHuy5nKEDAXTc-61rxaPQYgDpTNQ08-MPI6YULu-4/edit?pli=1&tab=t.0) to generate monster JSON data.

## Change Log

* 10/26/25: 0.34.14
    * More UI fixes to align with new color scheme.
    * Implemented Intimidation action and logic.
* 10/25/25: 0.33.13
    * Implemented petrified, charmed, restrained, frightened, grappled, incapacitated, invisibility, confused, and exhaustion conditions.
    * Updated the monster list display to include which conditions it has.
    * Added logic that a restrained monster should decide to break free from the restraint.
    * Updated decision logic so that a monster can only make one decision per round.
    * Added a temporary keybinding (Ctrl+Shift+M) to add 3 monsters to each team, roll initiative, and start combat.
    * Updated the combat logic to allow for a draw.
    * Implemented the surprise round system.
    * Implemented the time tracking system.
    * Updated the UI to disable buttons that should not be available during combat.
    * Moved inline styling of buttons to a class and added them to the CSS file.
    * Removed the buttons that were not used.
    * Changed the color of the Team A and Team B buttons and backgrounds.
    * Set up CSS variables to ensure consistency throughout the application.
    * Made some minor color changes to the UI.
    * Implemented saving throw bonuses.
    * Fixed issue where condition effects were not showing up.
    * Added the dead and survived badges to the initiative list.
    * Adjusted the UI of the team buttons.
* 10/24/25: 0.18.0
    * Implemented the stunned, poisoned, slowed, paralyzed, blinded, deafened, and prone conditions.
* 10/23/25: 0.11.2
    * Implemented the legendary action system.
    * Implemented rechargeable monster abilities and attacks.
    * Implemented ongoing effects.
    * Fixed bug where Copy Team Info wasn't copying the contents of the combat log.
    * Fixed issue where friendly fire was allowed.
* 10/22/25: 0.7.0
    * Implemented the Legendary Resistance system.
    * Implemented the frightful presence system.
    * Implemented the regeneration system.
* 10/21/25: 0.4.1
    * Implemented damage immunities across all effect damage types and paths.
    * Made minor updates to the UI of the Combat Log.
    * Implemented damage vulnerabilities across all effect damage types and paths.
* 10/18/25: 0.2.0
    * Updated attack effect damage system as it wasn't applying acid, fire, force, necrotic, psychic, radiant, cold, lightning, thunder, and poison damage during combat.
    * Added an attack decision system. Monsters with multiple attacks choose the most effective attack—calculated by attack bonus, damage potential, and special effects—with the chance of an intelligent choice being highly dependent on their Intelligence or Wisdom score.
    * Implemented damage resistance system. I also implemented a learning system where monsters remember ineffective attacks and adapt their strategy based on their intelligence or wisdom scores.
* 10/17/25: 0.1.3
    * Added functionality that handles attack effects (i.e. acid, fire, poison, etc.).
    * Added a button to the combat log that will copy the content of that element.
    * Removed the team selector from the monster selector modal.
    * Fixed an issue where the team selector was pushing all monsters into the same team.
* 9/14/25: 0.0.8
    * Fixed issue where attack data is empty.
    * Removed delay between each action (defaulted to 1.2 seconds).
    * Added element height limit and conditional scroll bar displaying the monster list in Initiative Order.
    * Added functionality to handle damage from the attacks properties.
* 9/7/25: 0.0.4
    * Made adjustments to initiative system, added critical damage to critical hits, and added system to add multiples of the same monster.
* 9/6/25: 0.0.1
    * Started creating a monster simulation combat system.

## Active Projects

* immunity to normal and non-silvered weapon damage
https://gemini.google.com/app/60f570356046a2cc
// --- PROPOSED MODIFICATION TO script.js (INSIDE CombatSimulator CLASS) ---

// 1. Add the following function inside the CombatSimulator class.
// This function must be called by the main attack processing logic (e.g., handleAttackAction).

    /**
     * Helper to process damage against a target, checking for immunities and resistances.
     * This function should be placed inside the CombatSimulator class.
     *
     * IMPORTANT: The calling function (e.g., handleAttackAction) must now pass:
     * 1. rawDamage
     * 2. damageType (e.g., 'Slashing')
     * 3. isMagical (boolean, defaults to false)
     * 4. isSilvered (boolean, defaults to false)
     *
     * @param {object} target - The combatant receiving the damage.
     * @param {number} rawDamage - The calculated damage amount before reduction.
     * @param {string} damageType - The type of damage (e.g., 'Slashing', 'Fire').
     * @param {boolean} isMagical - True if the weapon is magical.
     * @param {boolean} isSilvered - True if the weapon is silvered.
     * @returns {number} The final, adjusted damage amount.
     */
    processDamageReduction(target, rawDamage, damageType, isMagical = false, isSilvered = false) {
        let finalDamage = rawDamage;

        // Check for the specific non-silvered/non-magical physical damage immunity
        const isPhysical = ['Bludgeoning', 'Piercing', 'Slashing'].includes(damageType);
        
        // The exact string we are looking for in the monster's data
        const nonsilveredImmunity = "Nonmagical Bludgeoning, Piercing, and Slashing from nonsilvered weapons";

        // Check if the target has damage immunities defined and if it includes the specific immunity string
        if (target['damage immunities'] && target['damage immunities'].includes(nonsilveredImmunity)) {

            // Condition for triggering the full immunity (damage reduced to 0):
            // 1. The damage type is physical (B, P, or S).
            // 2. The attack is NOT magical.
            // 3. The attack is NOT silvered.
            if (isPhysical && !isMagical && !isSilvered) {
                this.logMessage(`🛡️ ${target.name} is immune to nonmagical, nonsilvered ${damageType} damage! Damage reduced to 0.`);
                return 0; // Damage reduced to zero
            }
        }

        // Handle generic immunities (like "Poison" or "Fire")
        if (target['damage immunities'] && target['damage immunities'].includes(damageType)) {
            this.logMessage(`🛡️ ${target.name} is immune to ${damageType} damage! Damage reduced to 0.`);
            return 0;
        }

        // Handle resistances (damage halved)
        if (target['damage resistances'] && target['damage resistances'].includes(damageType)) {
            this.logMessage(`⚔️ ${target.name} resists ${damageType} damage! Damage halved.`);
            finalDamage = Math.floor(finalDamage / 2);
        }

        // Handle vulnerabilities (damage doubled)
        if (target['Damage Vulnerabilities'] && target['Damage Vulnerabilities'].includes(damageType)) {
            this.logMessage(`⚠️ ${target.name} is vulnerable to ${damageType} damage! Damage doubled.`);
            finalDamage *= 2;
        }

        // Ensure final damage is non-negative
        return Math.max(0, finalDamage);
    }

// 2. Integration Point (Developer needs to find and modify this existing function)
// The function that handles the attack (e.g., handleAttackAction or similar) must be updated.

/*
// PSEUDO-CODE: Modify the existing attack handling function (e.g., handleAttackAction)

// ... inside the existing function, after calculating rawDamage ...

// *** NEW LOGIC TO DETERMINE ATTACK PROPERTIES ***
// NOTE: This assumes player/monster attacks have 'magical' and 'silvered' properties defined.
let isAttackMagical = attack.magical || false; 
let isAttackSilvered = attack.silvered || false;

// If a monster is attacking, their own attack is typically NOT silvered/magical 
// unless explicitly stated in their 'attacks' definition.
// For example, if the monster is attacking, and it's a standard Slam attack:
// isAttackMagical = false;
// isAttackSilvered = false; 

// *** APPLY REDUCTION ***
const finalDamage = this.processDamageReduction(
    target,
    rawDamage,
    attack['damage type'], // The type of damage from the attack definition
    isAttackMagical,
    isAttackSilvered
);

// *** APPLY DAMAGE ***
target.currentHp -= finalDamage;

// ... rest of the function ...
*/


* Separate the functionality of script.js into different JavaScript files that is logical and is easier to maintain.
>> conditions seems to be broken as it the monsters never pick them. Double check this later.

## Do-to List

In monsters.js, update the speed, skills, saving throws, senses properties to use an object instead of a string and then update script.js and Encounter_Builder/main.js to handle this change. Also, update the prompt that is used to generate monster JSON data to reflect this change.

Add the following mechanics and/or features:
* confused state doesn't invoke random movement as movement isn't currently implemented.
* Add functionality where a monster can use their skills as actions. They should decide if they want to use it and if it is appropriate to use it.
* Morale system for NPCs/monsters
* keep track of used reactions (e.g., opportunity attacks)
    * retaliatory strikes
    * opportunity attacks
    * area-of-effect attacks
    * teleportation
    * forced movement
    * damage mitigation
    * regeneration/healing
    * status effect application (inflict a negative status effect)
* Bonus actions (attacks)
    * pounce
    * rampage
    * trampling charge
    * aggressive (move to target)
    * Nimble escape
    * ethereal jaunt
    * spell casting
    * Battle cry
    * luring song
* Standard actions to be implemented:
  * move
  * dash
  * disengage
  * cast spell
  * dodge
  * help
  * search
  * hide
  * ready
  * use an object
  * Athletics (Grapple): As part of the Attack action, you can replace one of your attacks with a special melee attack to grapple a creature. You make a Strength (Athletics) check contested by the target's Strength (Athletics) or Dexterity (Acrobatics) check.
  * Athletics (Shove): Similar to grappling, you can replace one of your attacks with a special melee attack to shove a creature. This is a Strength (Athletics) check contested by the target's Strength (Athletics) or Dexterity (Acrobatics).
  * Stealth (Hide): When you take the Hide action, you make a Dexterity (Stealth) check to conceal yourself. The check is contested by an enemy's Perception check.
  * Investigation/Perception (Search): When you take the Search action, you use your Investigation or Perception to find something. For example, searching for a secret door or a hidden trap.
  * Performance/Intimidation (Influence): Under the Dungeons & Dragons 2024 Player's Handbook rules, monsters can use the "Influence" action, which involves Charisma (Persuasion or Intimidation) checks, to sway players who are hesitant to act. 
* AoE effects (once placement and movement have been implemented)
* Some senses could offset some effects (like darkness or magical darkeness doesn't work against blindsight; somewhat implemented)
* Advantage/Disadvantage on attack rolls
* Initiative bonuses from feats or abilities (attribute bonuses have already been implemented)
* keep track of spell slots for monsters
* keep track of effect durations (e.g., buffs, debuffs)
* keep track of effects that trigger at the start/end of turns
* keep track of saves versus spells and effects
* decision engine to choose actions for monsters/NPCs based on their spells, attacks, conditions, and abilities
* dropping to 0 HP and dying state
* opportunity attacks
* Death saving throws
* dropping to 0 hp and regenation
* bonus actions (spells, abilities)
* effects of invisibility on combat
* effects of blindness on combat
* using aura effects
* Spellcasting (with a few example spells)
* More detailed spell effects (e.g., healing, buffs, debuffs)
* Saving throws for spells and effects
* flying movement and effects
* Ranged vs. melee attacks with range considerations
* Cover mechanics for ranged attacks?
* regeneration and healing between rounds
* Monster special abilities (e.g., breath weapons, spellcasting)
* Monster lair actions and environmental effects
* using int and/or wis to pick attack options (different spells, abilities)
* Flanking bonuses
* environment effects (e.g. water-based vs land-based monsters)
* Team-based combat with team-specific actions
* AI for monsters to choose actions based on situation
* Customizable dice roller for different dice types and modifiers
* more than two teams (up to 5?)
* if there more than two monsters, decide who attacks who and keep track of it
* Inventory and equipment for characters
* User interface improvements (e.g., better modals, animations)
* Hiding versus perception
* Save/load combat sessions
* Export combat logs (beyond copy to clipboard functionality)

* Update monster picker app JS to allow for arrays to be read from the "damage immunities" property.
* Conditions (e.g., stunned, poisoned) that affect combatants
  * Unconscious - skipping this one for now.
  * Hidden - this may be difficult to implement as the encounter doesn't take into account terrain or other out of combat setup factors.
  * Surprised - this may be difficult to implement as the encounter doesn't take into account terrain or other out of combat setup factors.