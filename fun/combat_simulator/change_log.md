Use the [PDF2JSON Prompt](https://docs.google.com/document/d/1-5uHuy5nKEDAXTc-61rxaPQYgDpTNQ08-MPI6YULu-4/edit?pli=1&tab=t.0) to generate monster JSON data.

## Change Log

* 11/7/25: 0.36.6
  * Implemented the combat map with placement of monsters.
  * Implemented a system for centering the monsters on the opposite side of the map and grouped by teams (clustered positioning).
  * Implemented a system for spacing the monsters on the map. This can be toggled on and off.
  * Implemented a system for layout of the monsters on the map. This can be toggled between clustered, columns, and random.
  * Fixed issue where the numbering of the monsters was not appearing in the Combat Map.
  * Added a keyboard shortcut (Ctrl+Shift+3) to add 3 monsters to each team.
  * Fixed issue where the heading of div.character-panel heading was disappearing.
  * Added position logging to the combat log.
* 11/6/25: 0.35.2
  * Implemented immunity to normal and non-silvered weapon damage.
  * Fixed issue with ongoing effects not working.
  * Fixed issue where attack names were not being displayed correctly.
* 11/2/25: 0.34.20
  * Fixed badge issue when it does it should say "[DEAD]".
  * When clicking the #newCombat button, the combat log history is cleared out.
  * Added clear combat log button and it's functionality to clear the combat log.
* 10/27/25: 0.34.17
  * Minor tweaks to remove unnecessary items from the modal for monster selection.
  * Renamed a few headings.
  * Hid the Add Character button.
* 10/26/25: 0.34.16
  * More UI fixes to align with new color scheme.
  * Implemented Intimidation action and logic.
  * Updated the UI for Team A and Team B in the div.character-panel element and the team view buttons.
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

>> Trying to debug the implementation of "Multidimensional Strike" attack and the condition of "disoriented". Nothing has worked so far.

### Features
* consider an option (toggle) make the placement of monsters interactive by the user.

### Bugs
* There seems to be a lot of CSS code in script.js. This should be moved to and handled by styles.css. There should be no style decisions made in any JS file.

### Maintenance
* Separate the functionality of script.js into different JavaScript files that is logical and is easier to maintain.

Note: Cursor's default model is "composer-1". Using Windsurf's SWE-1 has been troublesome.

### Next sprint

Consider refactoring the code to break it into several separate files.

## Do-to List

* In monsters.js, update the speed, skills, saving throws, senses properties to use an object instead of a string and then update script.js and Encounter_Builder/main.js to handle this change. Also, update the prompt that is used to generate monster JSON data to reflect this change.

* Consider building a test suite.

Add the following mechanics and/or features:
* Update the prompt JSON template to include templates for legendary resistance, recharge, frightful presence, condition effects, ongoing effects, and one-time effect.

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
* keep track of saves versus spells (TBD) and effects (done)
* decision engine to choose actions for monsters/NPCs based on their spells, attacks, conditions, and abilities
* dropping to 0 HP and dying state
* opportunity attacks (after movement has been implemented.)
* Consider how the size of the monster has a longer attack radius. (after movement has been implemented.)
* Death saving throws
* dropping to 0 hp and regenation
* bonus actions (spells, abilities)
* using aura effects (after movement has been implemented)
* Spellcasting (with a few example spells)
* More detailed spell effects (e.g., healing, buffs, debuffs)
* Saving throws for spells and effects
* flying movement and effects
* Ranged vs. melee attacks with range considerations
* Cover mechanics for ranged attacks?
* regeneration and healing between rounds
* Monster special abilities (e.g., breath weapons (done), spellcasting)
* Monster lair actions and environmental effects
* using int and/or wis to pick attack options (different spells, abilities)
* Flanking bonuses (after movement has been implemented)
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
* maybe use "traits" property as part of the monster's decision making process?
* Update monster picker app JS to allow for arrays to be read from the "damage immunities" property.
* Conditions (e.g., stunned, poisoned) that affect combatants
  * Unconscious - skipping this one for now.
  * Hidden - this may be difficult to implement as the encounter doesn't take into account terrain or other out of combat setup factors.
  * Surprised - this may be difficult to implement as the encounter doesn't take into account terrain or other out of combat setup factors.


  The following is the raw markdown code for the development sprint division, formatted to be copied directly into your `change_log.md` file.

## SprintsDo-to List

### Sprint 1: Core Combat Logic (Spatial & Advanced Actions)

**Goal:** Implement spatial combat mechanics and support for powerful monster abilities that require saving throws or affect multiple targets.

| Feature | Notes & Implementation Focus |
| :--- | :--- |
| **Ranged vs. melee attacks with range considerations** | Introduce a simple distance/range model (e.g., close, medium, long) to attacks. |
| **Cover mechanics for ranged attacks** | Implement basic cover rules (Half-Cover, Three-Quarters Cover) that provide AC and saving throw bonuses based on the target. |
| **Flanking bonuses** | Add logic to grant attack roll advantage (or a bonus) based on a simple positional assumption or toggle. |
| **Monster special effects (breath weapons, spellcasting)** | Develop a generic action/damage handler for Area-of-Effect (AoE) and Save-based attacks (e.g., `rollSavingThrow` is already available). |
| **Hiding versus perception** | Implement the **Hidden** condition and logic to restrict targeting based on a successful Perception check or lack of Blindsight/Tremorsense. |
| **Implement Unconscious condition** | The core conditions system is in place; this requires adding the effects (auto-fail STR/DEX saves, attacks against are at advantage, attacks from 5ft are critical hits). |

### Sprint 2: Advanced AI & Team Structure

**Goal:** Significantly improve monster intelligence and decision-making, and expand the combat model to support more than two teams.

| Feature | Notes & Implementation Focus |
| :--- | :--- |
| **AI for monsters to choose actions based on situation** | Overhaul the decision-making logic (`selectAttackForSimulation`) to choose between attack, Dodge, Help, or special monster actions/spells based on current HP, conditions, and targets. |
| **Using INT and/or WIS to pick attack options** | Incorporate the monster's **Intelligence** and **Wisdom** scores into the decision algorithm to simulate smarter choices and target prioritization. |
| **If there more than two monsters, decide who attacks who** | Improve target selection to allow monsters to focus fire, choose the most vulnerable target, or distribute damage. |
| **More than two teams (up to 5?)** | Refactor all team-related logic (`this.currentTeamFilter`, win/loss condition checks) to handle a dynamic number of teams instead of only 'Team A' and 'Team B'. |
| **Team-based combat with team-specific actions** | Allow for a team-level action (e.g., a leader's buff or coordinated movement). |
| **Environment effects / Monster lair actions** | Add logic for environmental features (e.g., difficult terrain, hazard zones) and implement a new phase in the combat round logic to process Lair Actions. |
| **Use "traits" property as part of the monster's decision making** | Incorporate passive traits (e.g., *Pack Tactics*, *Evasion*) into the AI's calculation of attack effectiveness and defense. |

### Sprint 3: System & UI Improvements

**Goal:** Focus on quality-of-life enhancements, data management, and the overall application experience.

| Feature | Notes & Implementation Focus |
| :--- | :--- |
| **Save/load combat sessions** | Implement functionality to serialize the `CombatSimulator` state (including `combatants`, `initiativeOrder`, `combatRound`, etc.) to local storage or a file. |
| **Export combat logs** | Enhance the existing `copyTeamInfoToClipboard` function to export the combat log to a more structured format (e.g., JSON or a downloadable text file). |
| **Customizable dice roller for different dice types and modifiers** | Create a separate, modular dice rolling utility that can be configured by the user. |
| **Inventory and equipment for characters** | Add data structure and UI elements to track simple character equipment that may modify AC, damage, or grant new abilities. |
| **User interface improvements (better modals, animations)** | Refine the look and feel, update modal designs for better usability, and add minor animations to turns/actions. |
| **Update monster picker app JS to allow for arrays to be read from the "damage immunities" property** | A quick fix to ensure data parsing (e.g., the `parseCommaList` method) correctly handles properties that may be stored as an array of strings. |