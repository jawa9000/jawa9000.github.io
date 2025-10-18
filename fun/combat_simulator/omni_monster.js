const monsters = [
{
    name: "Omni Monster",
    size: "Medium",
    type: "Omni",
    alignment: "Neutral",
    environments: ["Any"],
    associates: [],
    "armor class": 15,
    "hit points": "50 (10d10)",
    speed: "40 ft. fly 80 ft. swim 40ft.",
    str: 12,
    dex: 12,
    con: 12,
    int: 12,
    wis: 12,
    cha: 12,
    "saving throws": "DEX +7, CON +10, WIS +6, CHA +8",
    skills: "Perception +11, Stealth +7",
    "damage immunities": "None",
    "damage resistances": "None",
    senses: "Blindsight 60 ft. Darkvision 120 ft. Passive Perception 21",
    languages: ["Common", "Draconic"],
    challenge: "14 (11,500 XP)",
    traits:
      "<p><em><strong>Amphibious.</strong></em> The dragon can breathe air and water.</p><p><em><strong>Legendary Resistance (3/Day).</strong></em> If the dragon fails a saving throw, it can choose to succeed instead.</p>",
    "number of attacks": 2, 
    attacks: {
        "Thunder": {
            "type": "Action (Save)",
            "reach": "10 ft.",
            "target": "one creature",
            "damage type": "Thunder",
            "effects": [
                {
                "type": "Thunder",
                "condition": "Target must make a Dexterity saving throw, taking Thunder damage on a failed save, or half as much damage on a successful one.",
                "dc": 11,
                "ability": "Dexterity",
                "one-time damage": "9 (2d8)"
                }
            ]
        }, 
        // "Spit Poison": {
        //     "type": "Action (Save)",
        //     "reach": "10 ft.",
        //     "target": "one creature",
        //     "damage type": "poison",
        //     "effects": [
        //         {
        //         "type": "Poison",
        //         "condition": "Target must make a Dexterity saving throw, taking poison damage on a failed save, or half as much damage on a successful one.",
        //         "dc": 11,
        //         "ability": "Constitution",
        //         "one-time damage": "9 (2d8)"
        //         }
        //     ]
        // }, 
        // "Spit Fire": {
        //     "type": "Action (Save)",
        //     "reach": "10 ft.",
        //     "target": "one creature",
        //     "damage type": "fire",
        //     "effects": [
        //         {
        //         "type": "Fire",
        //         "condition": "Target must make a Dexterity saving throw, taking fire damage on a failed save, or half as much damage on a successful one.",
        //         "dc": 11,
        //         "ability": "Dexterity",
        //         "one-time damage": "9 (2d8)"
        //         }
        //     ]
        // },
        // "Engulf": {
        //     type: "Other",
        //     target: "Large or smaller creatures",
        //     effects: [
        //         {
        //         type: "Engulf",
        //         dc: 12,
        //         ability: "Dexterity",
        //         "one-time damage": "10 (3d6)",
        //         condition: "The creature takes the damage and is engulfed. The engulfed creature can't breathe, is restrained, and takes ongoing damage at the start of each of the cube's turns.",
        //         "ongoing damage": "21 (6d6)",
        //         "ongoing damage type": "acid"
        //         },
        //     ],
        // },
    //   "Bite": {
    //     type: "Melee Weapon Attack",
    //     "to hit": "+11",
    //     "reach": "10 ft.",
    //     "target": "one target",
    //     "hit": "17 (2d10 + 6)",
    //     "hit plus": "4 (1d8)",
    //     "damage type": "piercing and acid"
    //   },
    //   "Claw": {
    //     type: "Melee Weapon Attack",
    //     "to hit": "+11",
    //     "reach": "5 ft.",
    //     "target": "one target",
    //     "hit": "13 (2d6 + 6)",
    //     "damage type": "slashing"
    //   },
    //   "Tail": {
    //     type: "Melee Weapon Attack",
    //     "to hit": "+11",
    //     "reach": "15 ft.",
    //     "target": "one target",
    //     "hit": "15 (2d8 + 6)",
    //     "damage type": "bludgeoning"
    //   },
    //   "Frightful Presence": {
    //     type: "Frightful Presence",
    //     "description": "Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 16 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours."
    //   },
    //   "Acid Breath": {
    //     type: "Acid Breath",
    //     "recharge": "5–6",
    //     "dc": 18,
    //     "damage": "54 (12d8)",
    //     "description": "The dragon exhales acid in a 60-foot line that is 5 feet wide. Each creature in that line must make a DC 18 Dexterity saving throw, taking 54 (12d8) acid damage on a failed save, or half as much damage on a successful one."
    //   }
    },
    actions:
      "<p><em><strong>Multiattack.</strong></em> The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.</p><p><em><strong>Bite.</strong></em> <em>Melee Weapon Attack:</em> +11 to hit, reach 10 ft. one target. <em>Hit:</em> 17 (2d10 + 6) piercing damage plus 4 (1d8) acid damage.</p><p><em><strong>Claw.</strong></em> <em>Melee Weapon Attack:</em> +11 to hit, reach 5 ft. one target. <em>Hit:</em> 13 (2d6 + 6) slashing damage.</p><p><em><strong>Tail.</strong></em> <em>Melee Weapon Attack:</em> +11 to hit, reach 15 ft. one target. <em>Hit:</em> 15 (2d8 + 6) bludgeoning damage.</p><p><em><strong>Frightful Presence.</strong></em> Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 16 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.</p><p><em><strong>Acid Breath (Recharge 5–6).</strong></em> The dragon exhales acid in a 60-­foot line that is 5 feet wide. Each creature in that line must make a DC 18 Dexterity saving throw, taking 54 (12d8) acid damage on a failed save, or half as much damage on a successful one.</p>",
    // "legendary actions":"<p>The dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The dragon regains spent legendary actions at the start of its turn.</p><p><em><strong>Detect.</strong></em> The dragon makes a Wisdom (Perception) check.</p><p><em><strong>Tail Attack.</strong></em> The dragon makes a tail attack.</p><p><em><strong>Wing Attack (Costs 2 Actions).</strong></em> The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.</p>",
    // "lair actions": "<p><strong>Filth Burst</strong>: The dragon chooses a point on the ground it can see within 120 feet of it. A 20-foot-radius, 20-foot-high cylinder of watery filth centered on that point erupts from the ground until initiative count 20 on the next round. Each creature in the cylinder when it appears or that ends its turn there must make a DC 15 Constitution saving throw, taking 10 (3d6) poison damage on a failed save, or half as much damage on a successful one. The cylinder is difficult terrain.</p><p><strong>Grasping Muck</strong>: Tendrils of roiling muck extend from the dragon's lair to grasp up to three creatures of the dragon's choice that it can see within the lair. A targeted creature must succeed on a DC 15 Strength saving throw or be restrained until initiative count 20 on the next round.</p><p><strong>Noxious Gas</strong>: A bubble of swamp gas erupts in a 20-foot-radius sphere centered on a point the dragon can see within its lair. Each creature in the area must succeed on a DC 15 Constitution saving throw or be poisoned for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.</p><p><strong>Additional Lair Actions</strong></p><p>At your discretion, a legendary (adult or ancient) black dragon can use one or more of the following additional lair actions while in its lair:</p><p><strong>Filth Burst</strong>. The dragon chooses a point on the ground it can see within 120 feet of it. A 20-foot-radius, 20-foot-high cylinder of watery filth centered on that point erupts from the ground until initiative count 20 on the next round. Each creature in the cylinder when it appears or that ends its turn there must make a DC 15 Constitution saving throw, taking 10 (3d6) poison damage on a failed save, or half as much damage on a successful one. The cylinder is difficult terrain.</p><p><strong>Grasping Muck</strong>. Tendrils of roiling muck extend from the dragon's lair to grasp up to three creatures of the dragon's choice that it can see within the lair. A targeted creature must succeed on a DC 15 Strength saving throw or be restrained until initiative count 20 on the next round.</p><p><strong>Noxious Gas</strong>. A bubble of swamp gas erupts in a 20-foot-radius sphere centered on a point the dragon can see within its lair. Each creature in the area must succeed on a DC 15 Constitution saving throw or be poisoned for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.</p>",
    // "regional effects": "<p>The region containing a legendary black dragon's lair is warped by the dragon's magic, which creates one or more of the following effects:</p><p><ul><li>The land within 6 miles of the lair takes twice as long as normal to traverse, since the plants grow thick and twisted, and the swamps are thick with reeking mud.</li><li>Water sources within 1 mile of the lair are supernaturally fouled. Enemies of the dragon that drink such water regurgitate it within minutes.</li><li>Fog lightly obscures the land within 6 miles of the lair.</li></ul></p><p>If the dragon dies, vegetation remains as it has grown, but other effects fade over 1d10 days.</p><p><strong>Additional Regional Effects</strong></p><p>Any of these effects might appear in the area around a black dragon's lair, in addition to or instead of the effects described in the Monster Manual:</p><p><strong>Ennui</strong>. Creatures that spend a year within 10 miles of the dragon's lair are filled with listless despair.</p><p><strong>Grating Spies</strong>. Trilling, obnoxious birds, bugs, and reptiles follow any Humanoid creatures unknown to the dragon within 6 miles of the lair, imposing disadvantage on Dexterity (Stealth) checks. The dragon can suppress this effect at will.</p><p><strong>Rotting Domain</strong>. Stinging bugs are aggressive and the air is heavy with the odor of rot within 6 miles of the lair.</p>",
    // "notes": "<p><strong>Variant: Dragons as Innate Spellcasters</strong></p><p>This dragon can innately cast three spells, once per day each, requiring no material components. Each spell's level can be no higher than 4th. The dragon's spell save DC is DC 16, and it has +8 to hit with spell attacks.</p><p>A suggested spell list is shown below, but you can also choose spells to reflect the dragon's character. A dragon who innately casts druid spells feels different from one who casts warlock spells. You can also give a dragon spells of a higher level than this rule allows, but such a tweak might increase the dragon's challenge rating—especially if those spells deal damage or impose conditions on targets.</p><p><ul><li>blindness/deafness</li><li>create or destroy water</li><li>plant growth</li></ul></p><p><strong>Variant: Dragons as Innate Spellcasters</strong></p><p>Dragons are innately magical creatures that can master a few spells as they age, using this variant.</p><p>A young or older dragon can innately cast a number of spells equal to its Charisma modifier. Each spell can be cast once per day, requiring no material components, and the spell's level can be no higher than one-third the dragon's challenge rating (rounded down). The dragon's bonus to hit with spell attacks is equal to its proficiency bonus + its Charisma bonus. The dragon's spell save DC equals 8 + its proficiency bonus + its Charisma modifier.</p><p><em>This dragon can innately cast three spells, once per day each, requiring no material components. Each spell's level can be no higher than 4th. The dragon's spell save DC is DC 16, and it has +8 to hit with spell attacks. See the spell page for a list of spells the dragon is capable of casting. A selection of examples are shown below:</em></p><p><ul><li>vitriolic sphere</li><li>sickening radiance</li><li>Evard's black tentacles</li><li>blight</li><li>hunger of Hadar</li></ul></p>",
    // "description": "<p>Adult black dragons are cunning and cruel, with a love for destruction and chaos. They are known for their acidic breath and their ability to manipulate the environment around their lairs, creating treacherous swamps and murky waters.</p>",
    // "img url": "https://media-waterdeep.cursecdn.com/avatars/thumbnails/0/13/1000/1000/636238871029832086.jpeg",
  }
];