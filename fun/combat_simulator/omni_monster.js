// Make monsters available globally
window.monsters = window.monsters || [];
window.omniMonsters = [
{
    name: string (e.g., "Omni Monster"),
    size: string (e.g., "Medium"),
    type: string (e.g., "Omni"),
    alignment: string (e.g., "Neutral"),
    environments: array (e.g., ["Environment1", "Environment2"]),
    associates: [],
    "armor class": 15,
    "hit points": "50 (10d10)",
    speed: {
        "surface": { "movement": 40 },
        "fly": { "movement": 80 },
        "swim": { "movement": 40 }
    },
    str: 12,
    dex: 12,
    con: 12,
    int: 12,
    wis: 12,
    cha: 12,
    "saving throws": "DEX +2, CON +2, WIS +2, CHA +2",
    skills: "Perception +11, Stealth +7, Intimation +10",
    "Damage Vulnerabilities": "Cold",
    "damage immunities": [
        "Poison", "Nonmagical Bludgeoning, Piercing, and Slashing from nonsilvered weapons"
    ],
    "damage resistances": "Fire",
    legendary_resistances: 3,
    "legendaryActionsPerRound": 3,
    frightful_presence: {
        dc: 18,
        save_ability: "WIS", // or "CHA"
        range: 120, // in feet
    },
    regeneration: {
        hp_amount: 10,        // Amount of HP to heal
        disable_type: ["Acid", "Fire"]  // ARRAY of damage types that prevent regeneration
    },
    senses: {
        "Blindsight": { range: 60 },
        "Darkvision": { range: 120 },
        "Tremorsense": { range: 60 },
        "Passive Perception": { value: 21 }
    },
    languages: ["Common", "Draconic"],
    challenge: "14 (11,500 XP)",
    traits: "<p><em><strong>Amphibious.</strong></em> The dragon can breathe air and water.</p><p><em><strong>Legendary Resistance (3/Day).</strong></em> If the dragon fails a saving throw, it can choose to succeed instead.</p>",
    "number of attacks": 2,
    rechargeable_attack: {
        "Fire Breath (Recharge 5-6)": { // Recharge properties (must be at the top level for recharge logic)
            recharge: "5-6", // The criteria (d6 roll of 5 or 6)
            used: false, // Initial state: ready to use
            "effects": [
                {
                    "type": "Fire",
                    "condition": "Target must make a DC 17 Dexterity saving throw, taking 49 (14d6) Fire damage on a failed save, or half as much damage on a successful one.",
                    "dc": 17,
                    "ability": "Dexterity",
                    "one-time damage": "29 (7d6)"
                }
            ]
        }
    },
    attacks: {
        "Greataxe": {
            "type": "Melee Weapon Attack",
            "to hit": "+6",
            "reach": "5 ft.",
            "target": "one target",
            magical: false,
            silvered: false,
            "hit": "2d12 + 4",
            "damage type": "slashing"
        },
        "Booming Axe": {
            "type": "Action (Save)",
            "reach": "10 ft.",
            "target": "one creature",
            magical: true,
            silvered: true,
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
        "frightful_presence": {
            "action_type": "Action",
            "description": "Each creature of the dragon's choice that is within 120 ft of the dragon and aware of it must succeed on a DC 16 Wisdom saving throw or become Frightened for 1 minute.",
            "dc": 16,
            "save_ability": "WIS",
            "range": 120, // in feet
            "duration_rounds": 10, // 1 minute = 10 rounds
            "recharge": "Once per combat",
            "target_type": "AoE"
        },
        "Gorgon's Gaze": {
            "to hit": "Auto-Hit (Gaze)", // Gaze attacks usually don't require an attack roll
            "hit": "0 (No damage)", 
            "range": "30 ft.",
            "condition_effect": {
                "save_ability": "CON",   // Constitution save to resist the transmuting magic
                "save_dc": 19,           // Extremely high DC for a deadly condition
                "condition_name": "Petrified",
                "duration": "Until cured", // Condition typically lasts until cured by magic
                // This condition often requires a success/failure tracking
                "effect_on_save": "Failed save is instantly Petrified" 
            }
        },
        "Tail Sweep": {
            "to hit": "+5", // Uses the monster's standard attack bonus
            "hit": "6 (1d8 + 2) bludgeoning damage", 
            "condition_effect": {
                // The prone condition is often resisted with a physical save
                "save_ability": "STR", 
                "save_dc": 15,          // A moderate difficulty class
                "condition_name": "Prone",
                "duration": "until stand up" // Prone lasts until the creature uses movement to stand
            }
        },
        "Flame Breath": { // Attack that applies the ongoing effect
            "to hit": "DC 15 DEX Save", // Initial Save to avoid damage/effect
            hit: "21 (6d6) Fire damage on a failed save, half on a success.",
            ongoing_effect: {
                name: "Burning", // Damage the target takes each turn
                damage: "3 (1d6) Fire", // The ability and DC required to end the effect
                save_ability: "Dex", 
                save_dc: 15, // When the save is attempted
            "effects": [
                {
                "type": "Poison",
                "condition": "Target must make a Dexterity saving throw, taking poison damage on a failed save, or half as much damage on a successful one.",
                "dc": 11,
                dc: 12,
                ability: "Dexterity",
                "one-time damage": "10 (3d6)",
                condition: "The creature takes the damage and is engulfed. The engulfed creature can't breathe, is restrained, and takes ongoing damage at the start of each of the cube's turns.",
                "ongoing damage": "21 (6d6)",
                "ongoing damage type": "acid"
                },
            ],
        }
    },
    actions:
      "<p><em><strong>Multiattack.</strong></em> The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.</p><p><em><strong>Bite.</strong></em> <em>Melee Weapon Attack:</em> +11 to hit, reach 10 ft. one target. <em>Hit:</em> 17 (2d10 + 6) piercing damage plus 4 (1d8) acid damage.</p><p><em><strong>Claw.</strong></em> <em>Melee Weapon Attack:</em> +11 to hit, reach 5 ft. one target. <em>Hit:</em> 13 (2d6 + 6) slashing damage.</p><p><em><strong>Tail.</strong></em> <em>Melee Weapon Attack:</em> +11 to hit, reach 15 ft. one target. <em>Hit:</em> 15 (2d8 + 6) bludgeoning damage.</p><p><em><strong>Frightful Presence.</strong></em> Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 16 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.</p><p><em><strong>Acid Breath (Recharge 5–6).</strong></em> The dragon exhales acid in a 60-­foot line that is 5 feet wide. Each creature in that line must make a DC 18 Dexterity saving throw, taking 54 (12d8) acid damage on a failed save, or half as much damage on a successful one.</p>",
     "legendary actions":"<p>The dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The dragon regains spent legendary actions at the start of its turn.</p><p><em><strong>Detect.</strong></em> The dragon makes a Wisdom (Perception) check.</p><p><em><strong>Tail Attack.</strong></em> The dragon makes a tail attack.</p><p><em><strong>Wing Attack (Costs 2 Actions).</strong></em> The dragon beats its wings. Each creature within 10 feet of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.</p>"
  }
];