## Features to add:

* Ability to add customer armor with stats
* Encumbered system
* Update the character sheet layout to mirror E:\jawa9000.github.io\character-builder\5E_CharacterSheet_Fillable.pdf. Everything should still be reactive for multiple screen sizes.
* Adjust the display of the character sheet to better match a traditional character sheet
    * input fields for coins
    * Ability saving throws
    * Passive Insight
    * Passive Perception
    * Proficiencies with armor, weapons, expertise, tools, etc.
    * Languages
    * Number of attacks
    * Death saves (success (3) failure (3)) as checkboxes
    * Hit dice (sorted by class)
    * Status if the character is encumbered or unencumbered.
    * Alignment input field
    * Diety input field
    * Background input field (drop down)
    * Features/Abilities (which is clickable if it is rollable)
    * In a separate tab:
        * Appearance
        * Personality Traits
        * Ideals
        * Bonds
        * Flaws

* Allow for mastery of skills.
* Confirm that
* The gear inputs should include range and notes inputs.
* Spell sheet page
* Clicking on a weapon or spell name in the Gear or Spell list rolls the dice, damage, and displays the effect.
* A button that will create a completely random character (picks everything!)
* The ability to add a custom background.
The item in the gear area should include damage type, damage dice, modifiers, etc.
* Add a button (sword icon or wand or scroll or whatever is appropriate for the item type) that rolls the attack, damage, and displays the effect/result in the Roll Log (which should be renamed to Activity Log).
* Update the appearance so it better matches my other D&D apps.
* When picking a background, the gear should be added to the Gear list automatically.
* The armor needs to add to the total weight.
* Add a tab for Bag of Holding (based on the structure and formalus found in https://docs.google.com/spreadsheets/d/1ITYUVlq_18Gg-a4mnczVDSFXkl33ndqjnMQmRQjOJvc/edit)

Since every background allows you to distribute ability score increases (+2 to one and +1 to another, OR +1 to three distinct scores), add system to track how many points were spent and where.

## Things to fix

* Leveling up or editing a character, it doesn't show the current stats of the character. When going into this edit mode, the system should load the current stats.
* For much later: tailwind.js:64 cdn.tailwindcss.com should not be used in production. To use Tailwind CSS in production, install it as a PostCSS plugin or use the Tailwind CLI: https://tailwindcss.com/docs/installation
To the Start Gear area, create and add a catalog of gear. Start with armor. Once an armor has been selected from the filter list, it updates the AC automatically.
* Get rid of the Shield toggle. That should be an inventory item.
* When editing an existing character, the character sheet should be populated with the current character stats. Right now, when I hit the edit button, it treats the existing character sheet as if it was blank.

## Things to figure out

* Do the buttons for short rest and long rest do anything? If not what would it take to add the features to regain a character's abilities upon this rest.
* Build and add a library of standard gear and magical gear. I think there is a JSON that has the magical gear but it may not have damage, effects, etc. that this system can use.
* Add a feature that allows you to create a subclass.
* Add a feature that allows you to create a feat.
* Add a feature that allows you to create a background.
* Add the ability to lock a property so when rolling random character generation, that locked property doesn't get regenerated.
* When picking a background, that background's gear should be added to the new character.