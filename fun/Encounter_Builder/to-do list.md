## task
>> grab the monster sheets in https://drive.google.com/drive/folders/1grk6JaWnyaJoS6jWxtbJV78_RxgxrfpH?ths=true and add them to monsters.js using the Gemini Gem called "D&D Monster Sheet Object Generator".

## Gemini Gem
Use https://gemini.google.com/gem/77b2f643d48c "D&D Monster Sheet Object Generator" (a Gemini Gem) to automatically covert downloaded monster sheet PDFs into JSON objects so it can be added to monsters.js.
Using this PDF, generate a json object using this template:

If you have the stats for [], generate a JSONobject using this template. If you don't, response with "I don't have the stats for the monster."
{
  "name": "Monster Name",
  "size": "Size (e.g., Medium, Large)",
  "type": "Type (e.g., humanoid, beast, fiend)",
  "alignment": "Alignment (e.g., lawful evil, unaligned)",
  "environments": ["Environment1", "Environment2"],
  "associates": ["Associate1", "Associate2"],
  "armor_class": "AC Value (Source, e.g., 15 (Natural Armor))",
  "hit_points": "HP (Hit Dice, e.g., 100 (10d10 + 45))",
  "speed": "Speed (e.g., 30 ft, fly 60 ft)",
  "str": "Strength Score",
  "dex": "Dexterity Score",
  "con": "Constitution Score",
  "int": "Intelligence Score",
  "wis": "Wisdom Score",
  "cha": "Charisma Score",
  "saving_throws": "Saving Throws (e.g., CON +6, INT +8)",
  "skills": "Skills (e.g., Perception +5, Stealth +7)",
  "damage_vulnerabilities": "Damage Vulnerabilities (e.g., Fire, Bludgeoning)",
  "damage_resistances": "Damage Resistances (e.g., Cold; Bludgeoning from nonmagical attacks)",
  "damage_immunities": "Damage Immunities (e.g., Poison, Fire)",
  "condition_immunities": "Condition Immunities (e.g., Charmed, Frightened)",
  "senses": "Senses (e.g., Darkvision 60 ft, Passive Perception 12)",
  "languages": "Languages (e.g., Common, Draconic, Telepathy 120 ft)",
  "challenge": "CR (XP Value, e.g., 5 (1,800 XP))",
  "traits": "<p><em><strong>Trait Name.</strong></em> Trait description in HTML.</p><p><em><strong>Another Trait.</strong></em> Description.</p>",
  "actions": "<p><em><strong>Multiattack.</strong></em> Action description.</p><p><em><strong>Action Name.</strong></em> <em>Melee or Ranged Weapon Attack:</em> +X to hit, reach Y ft or range A/B ft, one target. <em>Hit:</em> Z (XdY + M) damage type.</p>",
  "reactions": "<p><em><strong>Reaction Name.</strong></em> Reaction description in HTML.</p>",
  "legendary_actions": "<p>Legendary action intro.</p><p><em><strong>Action Name.</strong></em> Description.</p><p><em><strong>Another Action (Costs 2 Actions).</strong></em> Description.</p>",  "img_url": "URL to monster image"
}

For the "environments", try to use the following environment types: 
Arctic
Coastal
Desert
Forest
Grassland
Hill
Jungle
Mountain
Swamp
Underdark
Underwater
Urban
Wasteland
Dungeon
If the monster doesn't have a strongly defined envirnoment, add "Dungeon" to the environment list. Sometimes, like undead, it won't list an enviroment either. In that case, add "Varies" to the environment list.
Leave out any citation links.
Don't guess on anything. If you don't know, add a note to that property.
If a property has no value, don't add it to the JSON object.

## generating list of known associates
Use the following prompt, with this NotebookLM (https://notebooklm.google.com/notebook/223209c0-31b1-4d76-890a-e6f5dc0719a1?pli=1) to generate a list of known monster associates with the associated prompt therein.

## fix non-reciprocal associates
Write a script that will take the list of non-reciprocal associates and update the appropriate monster's associate property values.