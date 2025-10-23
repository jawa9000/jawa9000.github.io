Use the [PDF2JSON Prompt](https://docs.google.com/document/d/1-5uHuy5nKEDAXTc-61rxaPQYgDpTNQ08-MPI6YULu-4/edit?pli=1&tab=t.0) to generate monster JSON data.

## Change Log

* 10/23/25: 0.2.7
    * Implemented the legendary action system.
    * Implemented rechargeable monster abilities and attacks.

* 10/22/25: 0.2.5
    * Implemented the Legendary Resistance system.
    * Implemented the frightful presence system.
    * Implemented the regeneration system.

* 10/21/25: 0.2.2
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

Separate the functionality of script.js into different JavaScript files that is logical and is easier to maintain.

## Do-to List

In monsters.js, update the speed, skills, saving throws, senses properties to use an object instead of a string and then update script.js and Encounter_Builder/main.js to handle this change. Also, update the prompt that is used to generate monster JSON data to reflect this change.

Figure out a system for attacks that use recharge.


Add the following mechanics:
* sense could offset some effects (like darkness or magical darkeness doesn't work against blindsight)
* Advantage/Disadvantage on attack rolls
* Initiative bonuses from feats or abilities
* Conditions (e.g., stunned, poisoned) that affect combatants
* keep track of used reactions (e.g., opportunity attacks)
* keep track of spell slots for monsters
* keep track of effect durations (e.g., buffs, debuffs)
* keep track of effects that trigger at the start/end of turns
* keep track of saves versus spells and effects
* decision engine to choose actions for monsters/NPCs based on their spells, attacks, conditions, and abilities
* dropping to 0 HP and dying state
* opportunity attacks
* Death saving throws
* dropping to 0 hp and regenation
* bonus actions (attacks, spells, abilities)
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
* Morale system for NPCs/monsters
* Reactions (e.g., opportunity attacks)
* Legendary Resistance
* pick between multiple attack options for monsters
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