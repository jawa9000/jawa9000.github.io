Go through all the other PDF sources in this notebook to generate a JSON object using this template. Be sure to include each monster in all the PDF sources:

{  
  “name”: Data type is a string.  "Monster Name",  
  ”size”: Data type is a string. "Size (e.g., Medium, Large)",  
  ”type”: Data type is a string. "Type (e.g., Humanoid, Beast, Fiend)",  
  ”alignment”: Data type is a string. "Alignment (e.g., Lawful Evil, Unaligned)",  
  ”environments”: Data type is an array. (e.g. "Forest", "Grassland", "Jungle", "Mountain"),  
 ” associates”: Data type is an array.(e.g. "Emerald Dragon", "Rock Gnome", "Deep Gnome"),  
  "armor class": Data type is a number. "AC Value (Source, e.g., 15)",  
  "hit points": Data type is a string. "HP (Hit Dice, e.g., 100 (10d10 \+ 45))",  
  ”speed”: Data type is an object with nested objects for each movement type. { (e.g., surface is normal movement when the speed type isn’t specified (30 ft.), fly 60 ft. etc.)  
        "surface": { "movement": 40 },  
        "fly": { "movement": 80 },  
        "swim": { "movement": 40 }  
    },  
  ”str”: Data type is a number. "Strength Score",  
  ”dex”: Data type is a number. "Dexterity Score",  
  ”con”: Data type is a number. "Constitution Score",  
  ”int”: Data type is a number. "Intelligence Score",  
  ”wis”: Data type is a number. "Wisdom Score",  
  ”cha”: Data type is a number. "Charisma Score",  
  "saving throws": Data type is a string. "Saving Throws (e.g., CON \+6, INT \+8)",  
  skills: Data type is a string. "Skills (e.g., Perception \+5, Stealth \+7)",  
  "damage vulnerabilities": Data type is a string. "Damage Vulnerabilities (e.g., Fire, Bludgeoning)",  
  "damage resistances": Data type is a string. "Damage Resistances (e.g., Cold; Bludgeoning from nonmagical attacks)",  
  "damage immunities": Data type is an array.  "Damage Immunities (e.g., \["Poison", “Fire”, "Nonmagical Bludgeoning, Piercing, and Slashing from nonsilvered weapons"\],)  
  "condition immunities": Data type is a string. "Condition Immunities (e.g., Charmed, Frightened)",  
  ”senses”: { Data type is an object with nested objects for each sense type. { (e.g., Darkvision, Passive Perception)  
    “Blindsight” : { range: Data type is a number. (e.g., 60\) },   
    “Darkvision”: { range: Data type is a number. (e.g., 120\) }  
  },  
  ”languages”: Data type is a string. (e.g., "Common", "Draconic", "Telepathy 120 ft",),  
  ”challenge”: Data type is a string. "CR (XP Value, e.g., 5 (1,800 XP))",  
  ”traits”: Data type is a string. "\<p\>\<em\>\<strong\>Trait Name.\</strong\>\</em\> Trait description in HTML.\</p\>\<p\>\<em\>\<strong\>Another Trait.\</strong\>\</em\> Description.\</p\>",  
  "number of attacks": Data type is a number. number of attacks (found in the actions description),  
”attacks”: Data type is an object with nested objects for each attack type from the actions description {   
    “name of attack” (e.g “Bite”, “Longsword”, etc.): {  
      “type” Data type is a string. (e.g. "type": "Melee Weapon Attack"),   
      “to hit” Data type is a string. (e.g. "to hit": "+9"},   
      “reach” Data type is a string. (e.g. "reach": "10 ft."),   
      “target” Data type is a string. (e.g. "target": "one target"),   
      “hit” Data type is a string. (e.g. "hit": "12 (2d6 \+ 5)"),   
      “damage type” Data type is a string. (e.g., "damage type": "bludgeoning, slashing")   
      “magical”: Data type is boolean. (e.g., true or false),  
      “silvered”: Data type is boolean. (e.g., true or false),  
      "effects": Data type is an array with nested objects. \[  
                {  
                "type": Data type is a string. (e.g., “type”: "Thunder", “Lightning”, “Fire”),  
                "condition": Data type is a string. (e.g., “condition”: "Target must make a Dexterity saving throw, taking Thunder damage on a failed save, or half as much damage on a successful one."),  
                "dc": Data type is a number. (e.g., “dc”: 11),  
                "ability": Data type is a string. (e.g., “ability”: "Dexterity"),  
                "one-time damage": Data type is a string. (e.g., "one-time damage": "9 (2d8)")  
                }  
            \],  
},  
    },  
  ”actions”: Data type is a string. "\<p\>\<em\>\<strong\>Multiattack.\</strong\>\</em\> Action description.\</p\>\<p\>\<em\>\<strong\>Action Name.\</strong\>\</em\> \<em\>Melee or Ranged Weapon Attack:\</em\> \+X to hit, reach Y ft or range A/B ft, one target. \<em\>Hit:\</em\> Z (XdY \+ M) damage type.\</p\>",  
  ”reactions”: Data type is a string. "\<p\>\<em\>\<strong\>Reaction Name.\</strong\>\</em\> Reaction description in HTML.\</p\>",  
  "bonus actions": Data type is a string. "\<p\>\<em\>\<strong\>Bonus Action Name.\</strong\>\</em\> Bonus Action description in HTML.\</p\>",  
  "legendary actions": Data type is a string. "\<p\>Legendary action intro.\</p\>\<p\>\<em\>\<strong\>Action Name.\</strong\>\</em\> Description.\</p\>\<p\>\<em\>\<strong\>Another Action (Costs 2 Actions).\</strong\>\</em\> Description.\</p\>",   
  "lair actions": Data type is a string. "\<p\>Lair action description\</p\>\<p\>\<strong\>Lair action name.\</strong\> Description\</p\>,  
"regional effects": Data type is a string. \<p\>Regional effects description.\</p\>  
"img url": Data type is a string. "URL to monster image",  
”notes”: Data type is a string. "\<p\>Notes about the monster.\</p\>",  
”description”: Data type is a string. "\<p\>Description of the monster.\</p\>"  
}

If languages has "—", list the language property as "N/A".  
If “img url” isn’t found, leave out that property. Don’t use the value of “The URL for the monster image is not provided in the source material” for the “img url” property.  
If a property doesn't have a value, don't add it to the JSON object.

For the "environments" property, try to use the following environment types:

* Arctic  
* Coastal  
* Desert  
* Forest  
* Grassland  
* Hill  
* Jungle  
* Mountain  
* Swamp  
* Underdark  
* Underwater  
* Urban  
* Wasteland  
* Dungeon

If the monster doesn't have a strongly defined environment, add "Dungeon" to the environment list. Sometimes, like undead, it won't list an environment either. In that case, add "Varies" to the environment list.

When choosing from options for type property, using this list:

* Aberration  
* Beast  
* Celestial  
* Construct  
* Dragon  
* Elemental  
* Fey  
* Fiend  
* Giant  
* Humanoid  
* Monstrosity  
* Ooze  
* Plant  
* Undead

Don't put anything after the type property value like things in parenthesis. For example, use "Fiend" instead of "Fiend (Demon)".

When choosing from alignment properties, use the following options:

* Any  
* Any Evil Alignment  
* Chaotic Evil  
* Chaotic Good  
* Chaotic Neutral  
* Lawful Evil  
* Lawful Good  
* Lawful Neutral  
* Neutral  
* Neutral Evil  
* Neutral Good  
* Unaligned

If the description of alignment includes “Typical”, remove that part.

Leave out any citation.

Don't use all uppercase letters for the name property values. Use title case.

If you find associates, use the singular name for each one. Use title case.

If actions include a numbered list, use the numbered list HTML elements.

Exclude items like citations and sources. For example:

\~\~\~

\`\`\` \[1-7, 95-103\]

\`\`\`json

\~\~\~

