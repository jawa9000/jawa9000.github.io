let ingredients = [
  {
    "Name": "Aasimar Heart (cooked)",
    "Description": "Consuming it might grant temporary divine resilience and might allow one to radiate a faint, protective light.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Any"
    ],
    "Effects": [
      "When the consumer takes radiant damage, they can use a reaction to reduce it by 1d8.",
      "Additionally, the consumer gains a +3 bonus to Charisma (Persuasion) checks.",
      "As an action, the consumer can cast cure wounds (using their Intelligence for the spellcasting ability), expending additional uses to increase the spell's level.",
      "Alternatively, they can use an action to expend two uses to cast lesser restoration.",
      "If prepared by an expert, the consumer gains temporary benefits: when using a healing spell or potion, they restore an amount of hit points equal to their proficiency bonus to the maximum possible value on the die."
    ],
    "Purchase Price": "50 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Knife (Enchanted)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Aboleth Brain Matter (cooked)",
    "Description": "Consuming a small, cooked portion is rumored to grant brief glimpses of ancient knowledge.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underdark"
    ],
    "Effects": [
      "When the consumer takes psychic damage, they can use a reaction to reduce it by 1d8.",
      "Additionally, they can speak telepathically to any creature within 30 feet who also consumed the same meal.",
      "When the consumer deals damage to a creature within 20 feet for the first time in a turn, they can deal an additional 3 psychic damage to the target (no action required).",
      "If prepared by an expert, the consumer gains temporary benefits: they gain proficiency in one Intelligence skill they are not proficient with (or expertise if already proficient), OR they gain darkvision to a range of 30 feet, allowing them to see through magical darkness.",
      "Based on other aberration brains, it might also temporarily enhance psychic abilities or grant minor psionic resistance."
    ],
    "Purchase Price": "50 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Aboleth Tentacle (prepared)",
    "Description": "It is highly exotic and potentially mind-altering. Consuming it is rumored to grant brief psychic insights. It can grant fleeting, unsettling insights.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Coastal",
      "Jungle",
      "Swamp",
      "Underwater"
    ],
    "Effects": [
      "When the consumer takes psychic damage, they can use a reaction to reduce it by 1d8.",
      "Additionally, they can speak telepathically to any creature within 30 feet who also consumed the same meal, provided they share a language.",
      "When the consumer deals damage to a creature within 20 feet for the first first time in a turn, they can deal an additional 3 psychic damage to the target (no action required).",
      "If prepared by an expert, the consumer gains temporary benefits: they gain proficiency in one Intelligence skill they are not proficient with (or expertise if already proficient), OR they gain darkvision to a range of 30 feet, allowing them to see through magical darkness."
    ],
    "Purchase Price": "15 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Abominable Slime Mold (processed)",
    "Description": "Consuming a small, processed amount is said to enhance adaptability. As a general ooze, it is described as \"nutritious\". Other oozes, if eaten raw, can cause various negative effects including instant death, internal consumption over days, or gaining unwanted symbiotic effects; however, if properly cooked, they can become a nutritious stew with no unusual properties. Given it's \"processed,\" it likely mitigates these raw risks.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Wasteland"
    ],
    "Effects": [
      "The consumer reduces any acid or poison damage they take by 1d4.",
      "Additionally, they have a 1d4 bonus to any check or saving throw against becoming grappled or restrained.",
      "When the consumer makes an ability check or saving throw to end an effect that renders them grappled or restrained, they can use a reaction to automatically succeed on the check or save."
    ],
    "Purchase Price": "20 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Abyssal Flesh (Corrupted & Purified)",
    "Description": "Extremely noxious raw, but if purified through dark magic or alchemical processes, it might provide fleeting strength or temporary resistance to certain damage types. Consuming it often comes at a moral cost or with unsettling dreams.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Any"
    ],
    "Effects": [
      "When a creature within 20 feet of the consumer makes an attack or saving throw, the consumer can use their reaction to reduce that creature’s roll by 1d4.",
      "When a creature within 10 feet of the consumer hits them with an attack, the consumer can use a reaction to deal cold or fire damage (their choice) equal to 1d8 + their Intelligence modifier to the attacker."
    ],
    "Purchase Price": "50 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Butcher's Tools",
        "Alchemist's Kit"
      ]
    },
    "Preparation": {
      "Method": "purified through dark magic or alchemical processes"
    },
    "Cooking": {
      "Method": "If purified, it can be cooked.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "Consuming it often comes at a moral cost or with unsettling dreams."
  },
  {
    "Name": "Abyssal Tube Worm (mineral extract)",
    "Description": "Its unique mineral-rich secretions or exoskeletal fragments could be a non-biological ingredient. The worm itself (not the extract) is described as highly nutritious and possessing a unique, mineral taste.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Underwater"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Acorns (prepared)",
    "Description": "They are edible after leaching out tannins. They are highly nutritious.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest",
      "Grassland",
      "Hill",
      "Urban"
    ],
    "Effects": [
      "The consumer gains a +1 bonus to any Constitution saving throw they make."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Herbalism Kit"
      ],
      "Seasons": [
        "Autumn"
      ]
    },
    "Cooking": {
      "Method": "Prepared.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Aeglos",
    "Description": "The roots are used as a stimulant.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Coastal",
      "Forest"
    ],
    "Effects": [
      "When prepared as an infusion and ingested: At the beginning of the consumer's next turn, they gain a +1 bonus to Armor Class if they are wearing no armor or light armor. This bonus lasts for 10 rounds.",
      "This herb has no effect when used again on the same creature until that creature completes a short rest."
    ],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ]
    },
    "Cooking": {
      "Method": "Not applicable, as this is an herbal preparation."
    }
  },
  {
    "Name": "Agave (hearts/flowers)",
    "Description": "The hearts can be roasted. The flowers are edible. The core of the agave plant can be roasted for a sweet, fibrous food.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Desert"
    ],
    "Effects": [
      "The consumer gains a +1 bonus to any Constitution saving throw they make."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Herbalism Kit"
      ],
      "Seasons": [
        "Late Spring",
        "Early Summer"
      ]
    },
    "Cooking": {
      "Method": "Roasted.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Alfirin",
    "Description": "Nectar from a bell-like flower of many colors that grows on the tombs.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Desert"
    ],
    "Effects": [
      "When applied as a syrup to a willing creature using a Use an Object action, the creature gains resistance to force, lightning, and radiant damage for 1 hour.",
      "Simultaneously, the creature must make a DC 10 Constitution saving throw. On a failed save, the creature gains vulnerability to necrotic and psychic damage for 1 hour.",
      "This herb has no effect if used again on the same creature before it completes a short rest."
    ],
    "Purchase Price": "1 sp per flower",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Poisoner's Kit"
      ]
    },
    "Cooking": {
      "Method": "Not applicable, as this is an herbal preparation."
    }
  },
  {
    "Name": "Alley Mushroom",
    "Description": "This is a surprisingly robust mushroom that thrives in damp, dark alleyways.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Urban"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Alligator/Crocodile Meat",
    "Description": "This meat is described as white, flaky, and somewhat fishy, and is considered a delicacy.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Swamp"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife"
      ]
    },
    "Cooking": {
      "Method": "Cooked.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Alpine Sorrel",
    "Description": "These are tart leaves that are noted as being \"good for refreshing\".",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Mountain"
    ],
    "Purchase Price": "1 sp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Herbalism Kit"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Alpine Wormwood",
    "Description": "This is described as a bitter herb. It is specifically used for \"medicinal purposes, particularly for digestive issues\".",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Mountain"
    ],
    "Purchase Price": "1 sp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Amalion",
    "Description": "An elusive and rare tree herb characterized by yellow-petaled blossoms and clusters of red berries.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Grassland"
    ],
    "Effects": [
      "Upon ingesting its powder, starting at the beginning of the creature's next turn, their next spell cast will require spending one less spell level. This effect lasts for 30 minutes.",
      "This herb's effect cannot be used again on the same creature until they complete a long rest."
    ],
    "Purchase Price": "1 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Late Summer",
        "Early Autumn"
      ]
    },
    "Cooking": {
      "Method": "Not applicable (herbal preparation)"
    }
  },
  {
    "Name": "Amnizu Brain (Crystallized Nightmare)",
    "Description": "A crystallized fragment from the brain of an Amnizu, possessing a taste of pure despair.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Any"
    ],
    "Effects": [
      "Consuming this can temporarily grant insights into the fears of others or induce crippling psychic visions."
    ],
    "Purchase Price": "50 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Ankheg Meat",
    "Description": "The meat, particularly from the abdomen, is described as tender and succulent with a slightly nutty flavor. However, \"Anhkheg\" is also listed in a broader category as \"Bitter and crunchy, sharp aftertaste of vinegar\".",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Desert",
      "Grassland"
    ],
    "Effects": [
      "It provides sustenance.",
      "The Ankheg Ichor, derived from it, causes a creature in contact with it to make a DC 13 Constitution saving throw or be Poisoned and Paralyzed for 1 minute, repeating the save at the end of each turn."
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Poisoner's Kit",
        "Knife",
        "Cook's Utensils"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Apple",
    "Description": "Common, round, edible fruit typically with red or green skin and crisp, juicy flesh. It's known for its sweet or tart flavor and is a versatile ingredient, often enjoyed raw or used in various culinary preparations like pies, sauces, and ciders.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Grassland"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Herbalism Kit"
      ],
      "Seasons": [
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Apple Bark",
    "Description": "Bark from the apple tree taken in Early Spring.",
    "Ingredient Type": "Plant-based",
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Method": "Not applicable, as this is an herbal preparation."
    }
  },
  {
    "Name": "Arctic Poppy (petals/seeds)",
    "Description": "Petals can be consumed, seeds are very small.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Arctic"
    ],
    "Purchase Price": "1 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Herbalism Kit"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Arctic Root",
    "Description": "A bitter root that, when boiled, provides warmth and a slight temporary resistance to cold damage.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Arctic"
    ],
    "Effects": [
      "Provides warmth and a slight temporary resistance to cold damage."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Herbalism Kit"
      ],
      "Seasons": [
        "Late Summer",
        "Early Autumn"
      ]
    },
    "Cooking": {
      "Method": "Boiled",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Arctic Willow (shoots/leaves)",
    "Description": "Young shoots and leaves can be eaten.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Arctic"
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Herbalism Kit"
      ],
      "Seasons": [
        "Spring",
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Arrowhead (tubers)",
    "Description": "Starchy tubers from a wetland plant.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Swamp"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Herbalism Kit"
      ],
      "Seasons": [
        "Late Summer",
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Ash Bloom Crystals",
    "Description": "Crystalline formations found in areas constantly exposed to volcanic ash or magical fallout. They glow faintly and impart a bitter, smoky flavor with stimulating properties.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Wasteland"
    ],
    "Purchase Price": "1 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Pick"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Ash Elemental Residue",
    "Description": "Solidified ash from a defeated Ash Elemental, found in areas scarred by fire or magical fallout.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Wasteland"
    ],
    "Effects": [
      "Provides a dry, smoky taste and minor fire resistance."
    ],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Ash Gourds",
    "Description": "Tough, ash-covered gourds that survive in desolated landscapes, relatively nutritious.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Wasteland"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Herbalism Kit"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Seasons": [
      "Autumn"
    ]
  },
  {
    "Name": "Asphodel",
    "Description": "The leaves from these yellow-and-white flowers usually found in Ithilien have a pungent odor.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest"
    ],
    "Effects": [
      "After applying this to the skin or clothes, the creature takes on an odor for 1 hour which repels insects, vermin, and beasts with a good sense of smell.",
      "Beasts of these types that approach within 15 feet of the creature must make a DC 15 Constitution check; on a failed save, they have the frightened condition.",
      "In addition, the creature has disadvantage to Wisdom (Animal Handling) checks with beasts of these types."
    ],
    "Purchase Price": "5 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Poisoner's Kit"
      ]
    },
    "Cooking": {
      "Method": "Not applicable, as this is an herbal preparation."
    },
    "Seasons": [
      "Spring"
    ]
  },
  {
    "Name": "Athelas",
    "Description": "A famous weed.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Coastal"
    ],
    "Effects": [
      "Infusion (ingested): At the beginning of the creature's next turn, the charmed, frightened, and stunned conditions are removed from the creature. This herb has no effect when used again on the creature until the creature completes a long rest.",
      "Inhalant (inhaled): After smoking for five minutes, the creature gains 5 (1d10) temporary hit points which last for 30 minutes. This effect cannot be combined with any other effect that grants temporary hit points. This herb has no effect when used again on the creature until the creature completes a long rest.",
      "Poultice (contact): When prepared and applied to a creature's wounds for 2 minutes, the creature has all poison effects neutralized, the poisoned condition is removed, all normal diseases are cured, all curses are removed, all spells affecting the creature are dispelled, all ability scores are restored, and the creature is restored to half their maximum hit points if they have less than that amount. This herb has no effect when used again on the creature until the creature completes a long rest."
    ],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ]
    },
    "Cooking": {
      "Method": "Not applicable, as this is an herbal preparation."
    }
  },
  {
    "Name": "Atomic Honey",
    "Description": "Tastes like sugar, metal, and miniature firecrackers. Your hair stands on end, your teeth buzz. It is completely incompatible with your biology but that sure as hell isn’t going to stop it.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Underdark",
      "Wasteland"
    ],
    "Effects": [
      "Transcendence Rejected: You explode (1d10x10' radius, 2d20 damage, all gear and items lost). You die happy.",
      "My Body!: Gain your Hit Dice (HD) in random mutations. You are convinced the horrible results are great.",
      "Eyes of Light: Your eyes glow like torches. You can see through time, space, rock, souls, and smoke. You must Save vs. Wisdom to focus on anything useful and always go last in initiative.",
      "Hemi Apotheosis: As Eyes of Light, but selective, allowing normal vision and ignoring the Wisdom Save requirement. Gain +2 to all Stats, +10 HP, and an ironclad ego, becoming \"almost among the gods\".",
      "Apotheosis: As Hemi Apotheosis, plus you glow like a candle and hover 2 inches off the ground. You learn the command spell."
    ],
    "Purchase Price": "20 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Alchemist's Kit",
        "Apothecary's Kit"
      ]
    },
    "Notes": "Anyone watching someone taste atomic honey is instantly aware they should run."
  },
  {
    "Name": "Bamboo Shoots",
    "Description": "Very common in many jungle biomes and a significant food source.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Jungle"
    ],
    "Effects": [
      "A significant food source."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife"
      ],
      "Seasons": [
        "Spring",
        "Early Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Banana (wild varieties)",
    "Description": "Smaller, seeded varieties.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Jungle"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Barlgura Heart (Primal Rage Core)",
    "Description": "The large, bestial heart of a defeated Barlgura. When ritually consumed, it is rumored to grant a temporary surge of bestial rage and incredible strength, often leaving the consumer exhausted or prone to uncontrolled violence.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Any"
    ],
    "Effects": [
      "If prepared by an expert:",
      "When a creature within 20 feet of the consumer makes an attack or saving throw, the consumer can use their reaction to reduce that creature’s roll by 1d4.",
      "When a creature within 10 feet of the consumer hits them with an attack, the consumer can use a reaction to deal cold or fire damage (their choice) equal to 1d8 + their Intelligence modifier to the attacker."
    ],
    "Purchase Price": "50 gp per unit",
    "Harvesting": {
      "Required Kit": []
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Barnacle Bloom",
    "Description": "A crusty, edible fungus that grows symbiotically with barnacles on rocky shorelines, tasting faintly of salt and brine.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Coastal"
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Barrel Cactus Fruit",
    "Description": "Tart, yellow fruit.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Desert"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Gloves, Thick"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Beach Plum",
    "Description": "Small, tart, purplish fruit of a coastal shrub.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Coastal"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Late Summer",
        "Early Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Bear Meat",
    "Description": "Rich, fatty, often somewhat sweet. Also described as \"Oily, extremely fatty, but also faintly bitter pork\".",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Forest"
    ],
    "Effects": [
      "Highly nutritious.",
      "When consumed, it generally has \"No extra effect\" (2-5 on a d6 roll).",
      "Can cause queasiness and gassiness (1 on d6, Save vs. Constitution).",
      "Can heal 1 HP or 1 additional HP (6 on d6, \"Delicious!\").",
      "If prepared by an expert:",
      "Gains a +1 bonus to Strength checks.",
      "As a bonus action, Strength attack and damage rolls gain a +1 bonus until the start of their next turn."
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "Add +1 to the roll if properly cooked and prepared."
  },
  {
    "Name": "Bioluminescent Veil Fungus",
    "Description": "A delicate, glowing fungus that drapes like a veil over jungle plants or decaying logs.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Jungle"
    ],
    "Effects": [
      "Eating it provides a subtle, temporary, internal glow or highlights bioluminescent features for a short time."
    ],
    "Purchase Price": "1 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Birch Catkins/Inner Bark",
    "Description": "Edible components of the birch tree, often foraged for their nutritional value. The catkins, the tree's flowers, can be eaten raw or cooked, while the inner bark (cambium) can be dried and ground into a flour substitute, providing carbohydrates and some minerals.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Arctic"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Spring"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Bison Heart (cooked)",
    "Description": "A highly nutritious and filling meal.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Grassland"
    ],
    "Effects": [
      "Highly nutritious and filling.",
      "When consumed, it generally has \"No extra effect\" (2-5 on a d6 roll).",
      "Can cause queasiness and gassiness (1 on d6, Save vs. Constitution).",
      "Can heal 1 HP or 1 additional HP (6 on d6, \"Delicious!\").",
      "If prepared by an expert:",
      "Gains a +1 bonus to Strength checks."
    ],
    "Purchase Price": "1 sp per unit",
    "Harvesting": {
      "Required Kit": [
        "Knife"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "Add +1 to the roll if properly cooked and prepared."
  },
  {
    "Name": "Bison Steak",
    "Description": "Rich, lean, and very flavorful, a staple of prairie diets.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Grassland",
      "Hill"
    ],
    "Effects": [
      "Rich, lean, and very flavorful.",
      "When consumed, it generally has \"No extra effect\" (2-5 on a d6 roll).",
      "Can cause queasiness and gassiness (1 on d6, Save vs. Constitution).",
      "Can heal 1 HP or 1 additional HP (6 on d6, \"Delicious!\").",
      "If prepared by an expert:",
      "Gains a +1 bonus to Strength checks."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "Add +1 to the roll if properly cooked and prepared."
  },
  {
    "Name": "Black Dragon Flesh",
    "Description": "Acidic, tough, and gamey.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Swamp",
      "Underdark"
    ],
    "Effects": [
      "Consuming it can be unpleasant but may grant a brief resistance to acid damage.",
      "If prepared by an expert:",
      "Gains a +2 bonus to Intimidation (Charisma) checks and saving throws against becoming frightened.",
      "Damage reduced by 2 when taking Acid damage."
    ],
    "Purchase Price": "3 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "Eating dragon parts, raw or cooked, is \"almost sacrilegious\" due to their value to wizards and alchemists."
  },
  {
    "Name": "Black Pudding (meat/cells/spore)",
    "Description": "Individual cells of black pudding can grow into new black puddings. If cooked in lye, they become a delicious stew without unusual properties. If frozen solid, they can be made into pudding popsicles.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Forest",
      "Swamp",
      "Underdark",
      "Wasteland"
    ],
    "Effects": [
      "If eaten raw: Can cause instant death if cells enter the lungs. It may also lead to a slower death over 1d6 days as the pudding consumes the consumer internally. If stomach acid dissolves it, there is no extra effect. In some cases, it can form a permanent symbiote, granting immunity to non-magical diseases and doubling natural lifespan, while making bodily fluids acidic and causing the corpse to dissolve into a new black pudding upon death.",
      "If prepared by an expert:",
      "Reduces any acid or poison damage taken by 1d4 (increasing to 1d6 at 15th level).",
      "Grants a 1d4 bonus to any check or saving throw against being grappled or restrained.",
      "The consumer can use a reaction to automatically succeed on an ability check or saving throw to end an effect that renders them grappled or restrained."
    ],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "It is highly acidic."
  },
  {
    "Name": "Black Pudding Spore",
    "Description": "A microscopic amount can be used to add a unique, slightly corrosive tang to food. It is highly dangerous if not handled with extreme care.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Mountain"
    ],
    "Purchase Price": "1 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Container(s)"
      ],
      "Seasons": [
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "Requires extreme care."
  },
  {
    "Name": "Blue Dragon Meat",
    "Description": "Dry, sandy, and faintly electric.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Coastal",
      "Desert"
    ],
    "Effects": [
      "Known to improve alertness and provide a brief resistance to lightning.",
      "If prepared by an expert:",
      "Gains resistance to the dragon's damage type (Lightning for Blue Dragon).",
      "Alternatively, it can grant a fly speed equal to current walking speed.",
      "Or the ability to exhale a 15-foot cone of elemental damage (Lightning damage for Blue Dragon) as a bonus action, requiring a Dexterity saving throw (taking a number of d6 equal to proficiency bonus on a failed save, half on a success).",
      "Heart consumption:",
      "Shattered Frame: Save versus deth, exploding on death with 10' radius d6 damage; on a successful Save, gain 1 random dragon-themed mutation.",
      "Dragon Revitalization: Heal fully, cured of non-magical diseases, regrow missing limbs with a loud pop.",
      "Raw Power: Failure reduces to 0 HP. Success grants +1 to two random abilities.",
      "Hoard: Ability to uniquely smell and covet the dragon's hoard.",
      "Scaleskin: Tough, segmented skin, cannot wear armor, AC or Defense like chainmail.",
      "Dragon Vision: Gain Darkvision and ability to hypnotize small mammals by staring."
    ],
    "Purchase Price": "3 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools (Enchanted)",
        "Arcane Focus",
        "Preservation Salts",
        "Container(s), Large"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils (Enchanted)",
        "Alchemist's Kit",
        "Magical Heat Source"
      ]
    },
    "Notes": "Eating dragon parts, raw or cooked, is \"almost sacrilegious\" due to their value to wizards and alchemists."
  },
  {
    "Name": "Boar/Wild Pig Meat",
    "Description": "Rich, fatty, and flavorful, especially wild varieties. Arctic variants are tougher and fattier due to cold adaptation.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Forest",
      "Jungle"
    ],
    "Effects": [
      "On a d6 roll of 1: Save vs. Constitution or lose any benefit from the meal and spend the rest of the day queasy and gassy.",
      "On a d6 roll of 2-5: No extra effect.",
      "On a d6 roll of 6: \"Delicious!\" Heal 1 HP, or 1 additional HP."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "If properly cooked and prepared, add +1 to the effects roll; if rotten, apply -4."
  },
  {
    "Name": "Bog Iron Sediment",
    "Description": "Edible iron-rich sediment found in certain bogs, offering a metallic taste and vital minerals.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Swamp"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Bog Lily Pad (cooked)",
    "Description": "Edible after proper preparation to remove bitterness.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Mountain",
      "Swamp"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "Requires proper preparation to remove bitterness."
  },
  {
    "Name": "Bramble of the Hills",
    "Description": "Bramble with foot-long thorns and shriveled, brownish leaves.",
    "Ingredient Type": "Plant-based",
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Poisoner's Kit"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Brass Dragon Meat",
    "Description": "Warm, slightly metallic.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Desert"
    ],
    "Effects": [
      "Provides a comforting warmth and can enhance social charm.",
      "If prepared by an expert:",
      "Grants resistance to the dragon's damage type (Fire for Brass Dragon).",
      "Alternatively, it can grant a fly speed equal to current walking speed.",
      "Or the ability to exhale a 15-foot cone of elemental damage as a bonus action (Dexterity saving throw DC, damage equals proficiency bonus in d6s).",
      "Heart consumption:",
      "Shattered Frame: Death saving throw: exploding on death with 10' radius d6 damage. On a successful Save, gain 1 random dragon-themed mutation.",
      "Dragon Revitalization: Heal fully, cured of non-magical diseases, regrow missing limbs with a loud pop.",
      "Raw Power: Failure reduces to 0 HP; success grants +1 to two random abilities.",
      "Hoard: Ability to uniquely smell and covet the dragon's hoard.",
      "Scaleskin: Tough, segmented skin, cannot wear armor, AC is the same as chainmail.",
      "Dragon Vision: Gain darkvision and ability to hypnotize small mammals by staring."
    ],
    "Purchase Price": "3 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools (Enchanted)",
        "Arcane Focus",
        "Preservation Salts",
        "Container(s), Large"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils (Enchanted)",
        "Alchemist's Kit",
        "Magical Heat Source"
      ]
    },
    "Notes": "Eating dragon parts, raw or cooked, is \"almost sacrilegious\" due to their value to wizards and alchemists."
  },
  {
    "Name": "Breadfruit",
    "Description": "Starchy fruit, a staple food in some tropical regions.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Jungle"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Brethil",
    "Description": "Bark harvested from the brethil (alder) tree during the late spring or early summer.",
    "Ingredient Type": "Plant-based",
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ]
    },
    "Preparation": {
      "Method": "Infusion"
    }
  },
  {
    "Name": "Brewery Yeast",
    "Description": "A byproduct of brewing, highly nutritious, and can be used as a thickener or flavoring agent.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Urban"
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Bromeliad Cup Fungus",
    "Description": "A small, cup-shaped fungus that grows within the water-filled reservoirs of bromeliads, often tasting faintly of the water it collects.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Jungle"
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Bronze Dragon Meat",
    "Description": "Salty, slightly fishy, with a metallic tang.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Coastal",
      "Underwater"
    ],
    "Effects": [
      "Said to enhance fortitude in aquatic environments.",
      "If prepared by an expert:",
      "Grants resistance to the dragon's damage type (Lightning for Bronze Dragon).",
      "Alternatively, it can grant a fly speed equal to current walking speed.",
      "Ability to exhale a 15-foot cone of elemental damage as a bonus action (Dexterity saving throw DC, damage equals proficiency bonus in d6s).",
      "Heart consumption:",
      "Shattered Frame: Save versus death, exploding on death with 10' radius d6 damage; on a successful Save, gain 1 random dragon-themed mutation.",
      "Dragon Revitalization: Heal fully, cured of non-magical diseases, regrow missing limbs with a loud pop.",
      "Raw Power: Failure reduces to 0 HP; success grants +1 to two random abilities.",
      "Hoard: Ability to uniquely smell and covet the dragon's hoard.",
      "Scaleskin: Tough, segmented skin, cannot wear armor, AC similar to chainmail.",
      "Dragon Vision: Gain darkvision and ability to hypnotize small mammals by staring."
    ],
    "Purchase Price": "3 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "Eating dragon parts, raw or cooked, is \"almost sacrilegious\" due to their value to wizards and alchemists."
  },
  {
    "Name": "Bugbear Loin",
    "Description": "Large, muscular, and gamey, somewhat resembling tough bear meat. Also described as \"Really bad mutton\".",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Forest",
      "Hill",
      "Mountain"
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Bulette Meat",
    "Description": "Surprisingly tender and rich, almost like very good beef, due to its tunneling diet. It is described as \"Beef that burns like a pepper,\" which might make \"uncultured people\" think they are dying, but beneath the heat, there is a mild, smoky flavor that pairs well with yogurt or cheese.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Desert",
      "Hill"
    ],
    "Effects": [
      "The spicy flavor might cause panic.",
      "This ingredient has no other special effects."
    ],
    "Purchase Price": "3 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Burdock (roots/stalks)",
    "Description": "Burdock is a common \"weed\" with edible roots, especially when young, and stalks. The plant features unusual, purplish, spine-covered spheres that appear to be thoroughly wrapped in cobwebs.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest",
      "Grassland",
      "Hill",
      "Urban",
      "Wasteland"
    ],
    "Effects": [
      "When prepared as a salve, it provides healing.",
      "It provides 4d4 + 4 hit points when used as a salve."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Spring",
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Cabbage",
    "Description": "The young leaves of this tasty and nutritious treat.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Grassland"
    ],
    "Effects": [
      "When ingested, it provides the effect of an antitoxin and a +1 bonus to Constitution saving throws against mushroom-based poisons for the next 5 minutes.",
      "When applied to the eyes, it removes the blinded condition."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Late Summer",
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "This herb has no effect if used again on the same creature until they complete a long rest."
  },
  {
    "Name": "Cacao (beans)",
    "Description": "The beans from which chocolate is made.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Jungle"
    ],
    "Effects": [
      "This ingredient has no special effects beyond its stimulating quality."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "It is described as a stimulating nut, similar to Kola Nut."
  },
  {
    "Name": "Cactus Fruit",
    "Description": "Sweet, hydrating fruit from various cactus species.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Desert"
    ],
    "Effects": [
      "Provides hydration."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "mid Summer"
      ]
    }
  },
  {
    "Name": "Cambrimen (jelly-like cells)",
    "Description": "These creatures have \"jelly-like cells\" that can be boiled in salt water to form a delicious broth. Their non-flesh, gelatinous consistency distinguishes them from typical animal, plant, or fungal matter. The energy required to turn them into food deters most predators. When boiled in salt water for 6 hours, their cells form a delicious broth.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Underwater",
      "Swamp",
      "Underdark"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Camel Hump Meat",
    "Description": "Fatty and flavorful, a vital source of energy.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Desert"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Carrion Crawler Tentacle (cooked)",
    "Description": "Slimy and strong-smelling, but surprisingly edible and filling after proper preparation. Its flavor is like old socks, mouldy bread, and rotten meat.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Forest",
      "Swamp",
      "Wasteland"
    ],
    "Effects": [
      "Surprisingly edible and filling.",
      "If dried or salted, it counts as 2 rations, though it still smells awful.",
      "There's a 1-in-10 chance to find 1d10 copper pieces or jewelry of equivalent value in a cyst-like sack, with a 10% chance of finding 1d10 gold pieces instead when harvesting.",
      "There's also a 50% chance that consumption causes queasiness and gassiness, losing any meal benefits."
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Poisoner's Kit"
      ]
    },
    "Cooking": {
      "Method": "Must be cooked.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Cattail (shoots/roots/pollen)",
    "Description": "Many parts are edible depending on the season. It is described as a starchy, edible root found in shallow swamp waters.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Grassland",
      "Swamp",
      "Underwater",
      "Urban",
      "Wasteland"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Spring",
        "early Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Cave Moss",
    "Description": "A basic, stringy moss that can be scraped off walls for sustenance.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Underdark"
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year-round"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "Source classifies moss as both plant and fungal depending on context."
  },
  {
    "Name": "Cave Mushroom (various edible fungi)",
    "Description": "A wide variety of fungi adapted to dark, damp conditions.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Underdark"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Cave Root/Tuber (various geophytes)",
    "Description": "Hardy roots adapted to subterranean environments.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Underdark"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Cavern Oyster",
    "Description": "A large, broad fungus that grows in shelf-like clusters on cave walls, resembling an oyster. It is described as meaty and savory, and a good staple.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Underdark"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Celestial Tear Gem",
    "Description": "A rare, solidified tear from a celestial being, often found in sacred sites or places of great sorrow/joy. It dissolves into a sweet, inspiring liquid upon consumption.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Any",
      "Coastal",
      "Desert",
      "Forest",
      "Hill",
      "Jungle",
      "Mountain",
      "Swamp",
      "Underdark",
      "Urban",
      "Wasteland"
    ],
    "Effects": [
      "Grants a surge of courage and clarity upon consumption."
    ],
    "Purchase Price": "50 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Mortar and Pestle"
      ]
    }
  },
  {
    "Name": "Centaur Heart (cooked)",
    "Description": "Considered a taboo but powerful food.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Grassland",
      "Hill"
    ],
    "Effects": [
      "Rumored to grant temporary speed or endurance."
    ],
    "Purchase Price": "15 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Cerebral Parasite (meat/essence)",
    "Description": "Very faint, like eating a lightly salted ball of cotton wool. It can produce \"magic sparks\" when sneezed out.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Jungle",
      "Underdark"
    ],
    "Effects": [
      "On consumption, roll 1d10:",
      "1-2: Produces 1d6 more parasites that are sneezed out as \"magic sparks\" and flee, hatching in 1d6 days.",
      "3-4: Inflicts a \"Strong Negative Emotion\" (Rage, Sorrow, Fear, Unnatural Lust, Jealousy, or Greed) for 1 minute.",
      "5-7: Causes a \"Spellburst,\" requiring a Save versus Wis.On failure, the consumer takes 1 damage.",
      "8-10: Inflicts a \"Strong Positive Emotion\" (Joy, Hope, Excitement, Friendship, True Love, or Charity) for 1 minute."
    ],
    "Purchase Price": "20 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "Described as a \"magical or ethereal essence\" rather than conventional biological material. It is consumable and \"harmless\" beyond its listed effects."
  },
  {
    "Name": "Chameleon Mushroom",
    "Description": "A mushroom that can subtly change its color to blend in.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Jungle"
    ],
    "Effects": [
      "Eating it can grant a minor, temporary camouflaging effect."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Chicken (Farm-raised)",
    "Description": "Mild, tender, and widely available poultry meat.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Forest",
      "Grassland",
      "Urban"
    ],
    "Effects": [
      "If properly cooked and prepared (add +1 to roll):",
      "On a d6 roll of 1: Consumer must make a Constitution saving throw or lose any benefit from the meal and spend the rest of the day queasy and gassy.",
      "On a d6 roll of 2-5: No extra effect.",
      "On a d6 roll of 6: \"Delicious!\" Heal 1 HP."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Plucking Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Chicken (Wild Fowl)",
    "Description": "Small, lean, and somewhat gamey meat from wild populations that have returned to a feral state.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Forest",
      "Grassland"
    ],
    "Effects": [
      "If properly cooked and prepared (add +1 to roll):",
      "On a d6 roll of 1: Consumer must make a Constitution saving throw or lose any benefit from the meal and spend the rest of the day queasy and gassy.",
      "On a d6 roll of 2-5: No extra effect.",
      "On a d6 roll of 6: \"Delicious!\" Heal 1 HP."
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Plucking Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Chickweed",
    "Description": "Delicate greens found in shady, moist spots.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Mountain",
      "Urban"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Spring",
        "Autumn",
        "Winter"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Chillberry",
    "Description": "Small, tart berries.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Arctic"
    ],
    "Effects": [
      "Provide a refreshing, cooling sensation."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Late Autumn",
        "early Winter"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Chiltepin (wild chili)",
    "Description": "Tiny, intensely hot peppers.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Desert"
    ],
    "Effects": [
      "Imparts intense heat/spice."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Late Summer",
        "Early Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Chimera Smoke Dust",
    "Description": "Fine, iridescent dust found near the lairs of chimeras that have adapted to urban ruins.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Urban"
    ],
    "Effects": [
      "Ingesting it can provide a fleeting burst of a specific elemental energy (fire, lightning, or acid)."
    ],
    "Purchase Price": "1 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Chitine Meat",
    "Description": "Small, stringy, but edible meat from chitinous creatures found in the Underdark.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underdark"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Cholla Buds",
    "Description": "Edible flower buds of the cholla cactus.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Desert"
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "mid Spring"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "Must be prepared carefully."
  },
  {
    "Name": "Cinder Root",
    "Description": "A blackened, charred root that remains edible after extensive cleaning and cooking.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Wasteland"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "Requires extensive cleaning and cooking."
  },
  {
    "Name": "Clay Golem \"Flesh\" (alchemically rendered)",
    "Description": "Normally heavy clay and inedible, but extreme alchemical processes can render small, concentrated portions palatable and nourishing. It is a non-biological material. When soaked in water, it becomes very squishy, but otherwise it is hard enough to crack molars. It tastes of dust and residual magic.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Desert",
      "Underdark",
      "Urban",
      "Wasteland"
    ],
    "Effects": [
      "If 2 lbs or more are ingested, the consumer must make a Constitution saving throw. On a failed save, the creature is bedridden for 1 week. On a successful save, the creature is fully healed and gains +2 permanent hit points.",
      "If a second meal of 2 lbs or more is attempted, the consumer must make a Death saving throw. On a successful save for the second meal, the consumer permanently gains +2 Strength and +2 Constitution, their weight triples, and they can no longer swim or run."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "Can be used to make walking ovens or smeared on the face to remove wrinkles. Requires extreme alchemical processes. Soaking in water is part of preparation."
  },
  {
    "Name": "Clockwork Sap",
    "Description": "A strange, slightly metallic-tasting sap from trees growing near magically imbued clockwork devices.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Urban"
    ],
    "Effects": [
      "Said to improve precision."
    ],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Cloud Giant Loin",
    "Description": "Exceptionally rare, said to be surprisingly tender and almost ethereal in taste, with subtle notes of ozone.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Mountain"
    ],
    "Effects": [
      "Nutritional Value: The consumer gains a 1d4 bonus to Strength checks and saving throws. Additionally, they can use a bonus action to gain a 1d6 bonus to their next attack and damage roll before the start of their next turn."
    ],
    "Purchase Price": "50 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Cloudberry",
    "Description": "A sweet, tart berry that grows in alpine meadows. Also described as a small, amber-colored berry, often found in boggy areas of the tundra.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Arctic",
      "Mountain"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Late Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Clover (leaves/flowers)",
    "Description": "Common in lawns and public spaces. The leaves and flowers are edible, particularly when young.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest",
      "Grassland",
      "Hill",
      "Coastal",
      "Urban"
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Spring",
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Coastal Strawberry",
    "Description": "Small, sweet wild strawberries found near the coast.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Coastal"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "late Spring",
        "early Summer"
      ]
    }
  },
  {
    "Name": "Cocoa Pod (raw)",
    "Description": "Contains beans that can be roasted and ground.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Jungle"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "Beans can be roasted and ground."
  },
  {
    "Name": "Coltsfoot",
    "Description": "A small, flowering plant frequently found on roadsides.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Desert"
    ],
    "Effects": [
      "Upon ingestion, the creature gains the effect of an antitoxin for 2 minutes. It grants advantage to all saving throws against disease for 1 hour."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Early Spring"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Expiration": "Expires after 1 year.",
    "Notes": "This herb cannot be used again on the same creature until they complete a short rest."
  },
  {
    "Name": "Common Sorrel",
    "Description": "Tart, lemony leaves used in salads or cooking.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest",
      "Grassland",
      "Hill",
      "Coastal",
      "Urban"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Spring",
        "Summer",
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "Used in salads or cooking."
  },
  {
    "Name": "Construct (parts/oil/energy cores)",
    "Description": "These are non-biological components harvested from constructs, such as oil and energy cores. Purified construct oil is a potent, energizing, and highly viscous liquid. An energy core shard is a tiny, inert splinter. Golem runestone powder provides a grounding sensation or aids mental focus. Infused stone golem grit provides mineral sustenance and enhances physical endurance.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Hill",
      "Mountain",
      "Underdark",
      "Urban",
      "Wasteland"
    ],
    "Effects": [
      "Provides \"perfect nutrients for focus and mental clarity\".",
      "If the consumer misses an attack roll or fails an ability check, they can use their reaction to add a +2 bonus to the roll, potentially turning a miss into a hit or a failed check into a success.",
      "If the construct is made of edible materials, consuming it grants temporary hit points equal to the consumer's proficiency bonus and resistance to bludgeoning, piercing, and slashing damage from nonmagical attacks."
    ],
    "Purchase Price": "1 sp per part/ounce/core",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Alchemist's Kit"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "Culinarists view oil and energy cores as culinary components. Harvesting is a complicated process."
  },
  {
    "Name": "Copper Dragon Meat",
    "Description": "This meat has an earthy taste, sometimes accompanied by a faint sour or acidic aftertaste. Dragon meat generally offers diverse flavors based on the dragon's color and is said to surpass the taste of even the finest aged beef.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Mountain"
    ],
    "Effects": [
      "Consuming it is said to inspire witty thoughts.",
      "It can provide resistance to acid damage.",
      "The meal can also grant a fly speed equal to the consumer's walking speed, or allow the consumer to exhale a 15-foot cone of acid damage as a bonus action. This breath weapon deals a number of d6s equal to the consumer's proficiency bonus on a failed Dexterity saving throw, or half as much on a success."
    ],
    "Purchase Price": "3 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools (Enchanted)",
        "Arcane Focus",
        "Preservation Salts",
        "Container(s), Large"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils (Enchanted)",
        "Alchemist's Kit",
        "Magical Heat Source"
      ]
    },
    "Notes": "Dragon harvesting is not easy, requiring appropriate knowledge, tools, and storage."
  },
  {
    "Name": "Coral Sponge (edible)",
    "Description": "Certain types of coral sponge are edible once prepared.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Underwater"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "Requires \"preparation\"."
  },
  {
    "Name": "Corrosive Slime Residue",
    "Description": "This is a dried or partially congealed residue from highly acidic or corrosive slimes. It is extremely dangerous when raw.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Wasteland"
    ],
    "Effects": [
      "When highly diluted or properly processed, it can be used as a potent, searing seasoning in food."
    ],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "Requires \"highly diluted or processed\" preparation."
  },
  {
    "Name": "Corrupted Celestial Tear (crystallized)",
    "Description": "This is a rare, solidified tear from a celestial being that has endured immense agony or corruption, often found in the Underdark. When ingested, it offers a chilling sweetness and fleeting, dark revelations.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underdark"
    ],
    "Effects": [
      "Imparts \"chilling sweetness and fleeting, dark revelations\".",
      "It can also potentially result in a \"minor curse or unsettling aura\".",
      "Allows the consumer, as a reaction to taking radiant damage, to reduce that damage by 1d8. It also grants a +3 bonus to Charisma (Persuasion) checks.",
      "Allows the consumer to cast cure wounds as an action (using their Intelligence for spellcasting.",
      "Healing: Can reduce radiant damage taken, and can provide cure wounds or lesser restoration effects."
    ],
    "Purchase Price": "50 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Couatl Scale (ground)",
    "Description": "A rare, iridescent scale shed by a Couatl. When meticulously ground and consumed, it is rumored to grant fleeting insights or minor protective wards. It possesses \"Arcane\" and \"Vitality\" crafting tags.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Forest",
      "Jungle"
    ],
    "Effects": [
      "Rumored to provide \"fleeting insights or minor protective wards\".",
      "Grants a reaction to reduce radiant damage taken by 1d8, and a +3 bonus to Charisma (Persuasion) checks."
    ],
    "Purchase Price": "5 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "Requires \"meticulously ground\" preparation."
  },
  {
    "Name": "Cow/Bull (Farm-raised)",
    "Description": "Rich, versatile, and abundant beef, serving as a staple meat source.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Forest",
      "Grassland",
      "Urban"
    ],
    "Effects": [
      "On a d6 roll of 1: The consumer must make a Constitution saving throw or lose any benefit from the meal and spend the rest of the day queasy and gassy.",
      "On a d6 roll of 2-5: No extra effect.",
      "On a d6 roll of 6: \"Delicious!\" The consumer heals 1 HP, or 1 additional HP."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Cow/Bull (Wild Variant)",
    "Description": "Lean, tough, and gamey meat from feral cattle found in wild forested areas.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Forest"
    ],
    "Effects": [
      "On a d6 roll of 1: The consumer must make a Constitution saving throw or lose any benefit from the meal and spend the rest of the day queasy and gassy.",
      "On a d6 roll of 2-5: No extra effect.",
      "On a d6 roll of 6: \"Delicious!\" The consumer heals 1 HP, or 1 additional HP."
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Method": "Requires 12+ hours of boiling.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Crab Apples",
    "Description": "Small, tart apples that grow near shorelines and are often salt-kissed. They are also found in forests and urban areas.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Coastal",
      "Forest",
      "Hill",
      "Urban"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "early Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Crab Meat",
    "Description": "Sweet, tender white meat. Giant crab meat is described as faintly fishy and rubbery.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Coastal",
      "Underwater"
    ],
    "Effects": [
      "On a d6 roll of 1: The consumer must make a Constitution saving throw or lose any benefit from the meal and spend the rest of the day queasy and gassy.",
      "On a d6 roll of 2-5: No extra effect.",
      "On a d6 roll of 6: \"Delicious!\" The consumer heals 1 HP, or 1 additional HP."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "Titanskull hermit crab meat can be dried in sunlight for preservation."
  },
  {
    "Name": "Cranberry (wild)",
    "Description": "Grows in acidic bogs.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Swamp"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Late Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Creosote Bush (leaves)",
    "Description": "The leaves are bitter.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Wasteland"
    ],
    "Effects": [
      "Can be steeped for medicinal purposes in dire situations. The exact medicinal effect is not specified."
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "Can be \"steeped\"."
  },
  {
    "Name": "Crisp chondrus",
    "Description": "Red algae with flattened branching fronds.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Coastal"
    ],
    "Effects": [
      "When ingested as an infusion, the creature regains 5 (2d4) hit points at the beginning of their next turn.",
      "After ingesting the infusion, the creature must make a DC 10 Constitution saving throw. On a failed save, the creature is charmed by the first creature that speaks to it in a language it is proficient with."
    ],
    "Purchase Price": "1 sp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Poisoner's Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Expiration": "The prepared herb expires after 1 week."
  },
  {
    "Name": "Crocodile Tail Meat",
    "Description": "White, flaky, and somewhat fishy, considered a delicacy.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Jungle"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Crowberry",
    "Description": "Small, black, somewhat bland berry that is very hardy.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Arctic"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "mid Summer",
        "Late Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Crystal Bloom",
    "Description": "A flower made of delicate ice crystals.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Arctic"
    ],
    "Effects": [
      "When consumed, it provides a brief burst of clarity and awareness."
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ]
    }
  },
  {
    "Name": "Crystal Cauliflower",
    "Description": "A crystalline, edible vegetable that grows in mineral-rich caverns, crunchy and slightly metallic-tasting.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Underdark"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Crystalized Mineral Growth (edible salts)",
    "Description": "Naturally occurring mineral deposits that are palatable.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Desert",
      "Hill",
      "Mountain",
      "Underdark",
      "Wasteland"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Culumalda",
    "Description": "Bark from the culumalda tree, which has golden-red foliage and is most often found in North Ithilien.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest"
    ],
    "Effects": [
      "When applied liberally to the skin and clothes, the creature takes on the mild scent of fresh earth. For 2 hours, other creatures have disadvantage of detecting the creature by scent."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ]
    },
    "Expiration": "The prepared herb expires after 1 month."
  },
  {
    "Name": "Dandelion (leaves/roots/flowers)",
    "Description": "Ubiquitous and entirely edible, prolific in cracks, lawns, and disturbed soil. The flowerheads are bright yellow, and the seed orbs are fluffy.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest",
      "Grassland",
      "Hill",
      "Urban",
      "Wasteland"
    ],
    "Effects": [
      "Roots can be prepared as a Tonic to provide 2d4 + 2 hit points of healing."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year-round"
      ]
    },
    "Cooking": {
      "Method": "Generally edible."
    }
  },
  {
    "Name": "Dark Spore",
    "Description": "A fine, dark powder.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Underdark"
    ],
    "Effects": [
      "When inhaled, it can cause minor hallucinations. When cooked, it imparts a deep, earthy flavor."
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ]
    },
    "Cooking": {
      "Method": "Can be cooked."
    }
  },
  {
    "Name": "Death Cap",
    "Description": "An unassuming white mushroom that can be easily misidentified. It is also described as sweet-smelling, growing at the base of hardwood trees with rounded or flat heads, brown in the center and paling at the fringes.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Forest",
      "Swamp"
    ],
    "Effects": [
      "Poison (Ingested/Injury): A creature subjected to this poison must make a DC 17 Constitution saving throw 12 hours after ingestion. On a failed save, the creature is poisoned, takes 2d8 poison damage, and suffers severe stomach aches and cramps for 24 hours. If an antitoxin is not taken during this period, the creature's liver degrades, resulting in jaundice and 1d10 poison damage at midday until a Greater Restoration or Regenerate spell is performed or an elixir of health is consumed.",
      "Poison (Inhaled): Causes 2d6 damage per round.",
      "Ingested: Can cause 1 level of exhaustion every 12 hours."
    ],
    "Purchase Price": "1 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Autumn",
        "Winter"
      ]
    },
    "Notes": "Can be easily misidentified."
  },
  {
    "Name": "Deep Earth Root",
    "Description": "A tough, fibrous root that grows deep underground.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Underdark"
    ],
    "Effects": [
      "Provides good sustenance."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Deep Sea Mushroom",
    "Description": "A strange, pressurized mushroom that grows in the abyssal depths, with a unique, savory taste.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Underwater"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Deer/Elk/Moose Meat",
    "Description": "Lean, gamey, classic forest fare. Peryton meat, a type of venison, is described as very dry.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Forest"
    ],
    "Effects": [
      "Provides sustenance.",
      "Peryton meat has specific magical effects:",
      "If cooked over a pure coal fire, gain a +2 bonus to the special roll.",
      "If the heart is eaten, roll 3 times on the special table without the coal fire bonus.",
      "Special Table Results (Peryton):",
      "1-4: Hideous Rebirth: Save versus death or die of a heart attack; a newborn peryton bursts from your chest in 1d6 rounds.",
      "5-7: Delicious! Heal 1 HP, or 1 additional HP.",
      "8-10: Parasitic Antlers: Two antlers grow from the top of your head, usable as improvised weapons."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Method": "Peryton meat can be cooked over a pure coal fire."
    }
  },
  {
    "Name": "Demon's Trumpet",
    "Description": "A rare, dark-colored fungus that resembles a trumpet.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Underdark"
    ],
    "Effects": [
      "Consuming it can briefly enhance one's intimidation."
    ],
    "Purchase Price": "5 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ]
    },
    "Cooking": {
      "Method": "Consumed directly."
    }
  },
  {
    "Name": "Derro Flesh",
    "Description": "Unpleasant and disturbing.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underdark"
    ],
    "Effects": [
      "Edible in extreme desperation, provides sustenance despite being unpleasant and disturbing."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Desert Bloom",
    "Description": "A resilient desert flower.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Desert"
    ],
    "Effects": [
      "When brewed as a tea, it helps alleviate dehydration."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "mid Spring"
      ]
    },
    "Cooking": {
      "Method": "Brewed as a tea."
    }
  },
  {
    "Name": "Desert Cobra Meat",
    "Description": "Lean, white meat.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Desert"
    ],
    "Effects": [
      "Provides sustenance."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Method": "Often pan-fried."
    }
  },
  {
    "Name": "Desert Glass Shard (edible variant)",
    "Description": "A naturally occurring, smooth volcanic glass shard found in specific desert regions.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Desert"
    ],
    "Effects": [
      "When dissolved slowly, it offers a sharp, metallic taste and trace minerals."
    ],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit"
      ]
    },
    "Cooking": {
      "Method": "Dissolved slowly.",
      "Required Kit": [
        "Alchemist's Kit"
      ]
    }
  },
  {
    "Name": "Desert Truffle",
    "Description": "A rare, subterranean fungus that grows in sandy, arid soils, often near specific desert plants. It is highly prized for its strong, musky flavor.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Desert"
    ],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Autumn",
        "Winter"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Deva's Blood (purified & congealed)",
    "Description": "This substance is obtainable only from a Deva that has willingly sacrificed itself or been slain by powerful magic. It is purified and congealed.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Any",
      "Arctic",
      "Coastal",
      "Desert",
      "Forest",
      "Hill",
      "Jungle",
      "Mountain",
      "Swamp",
      "Underdark",
      "Urban",
      "Wasteland"
    ],
    "Effects": [
      "When consumed, it is said to grant temporary radiant energy to attacks or a brief moment of prophetic insight.",
      "When used as an ingredient, the consumer can use a reaction to reduce radiant damage taken by 1d8. Additionally, the consumer gains a +3 bonus to Charisma (Persuasion) checks."
    ],
    "Purchase Price": "50 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Alchemist's Kit"
      ]
    }
  },
  {
    "Name": "Dinosaur Meat (various)",
    "Description": "Generally tough but very nutritious. Specific types include Velociraptor thigh and Triceratops flank. It can also be described as a cross between chicken and fish, and very dense.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Jungle"
    ],
    "Effects": [
      "Provides sustenance."
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Dire Wolf Loin",
    "Description": "Lean, tough, but highly energizing meat.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Forest",
      "Mountain"
    ],
    "Effects": [
      "Provides sustenance and is highly energizing."
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Discarded Orchard Apple",
    "Description": "An apple from a neglected or forgotten urban orchard tree, often bruised but still edible.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Urban"
    ],
    "Effects": [
      "Edible, provides sustenance."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife"
      ],
      "Seasons": [
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Displacer Beast Tentacle (cooked)",
    "Description": "Strange, iridescent meat that causes mild visual distortion for a short time after consumption. It is described as rubbery, buzzing mutton, and its meat appears 3 feet away from its actual position, but slowly slides back to its real position, losing all unusual properties within 1 hour. The easiest way to eat it is to close your eyes.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Forest"
    ],
    "Effects": [
      "Causes mild visual distortion for a short time after consumption.",
      "When consumed, roll on a d10 table:",
      "1-9: No extra effect.",
      "10: Displaced. The consumer permanently appears 3 feet from their actual position. If this means they are inside another object, they must Save vs Constitution or take 1d6 damage per minute until no longer inside the object. When casting a spell, they must Save vs Constitution or the spell manifests 3 feet away in a random direction, potentially causing it to fail."
    ],
    "Purchase Price": "3 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Method": "Must be cooked.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "The meat loses its unusual properties within 1 hour of the creature's death."
  },
  {
    "Name": "Dog/Cat Meat",
    "Description": "Culturally taboo, but potentially a last resort food source. Dog meat is described as stringy mutton.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Urban"
    ],
    "Effects": [
      "Provides sustenance."
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Dragon Heart (cooked)",
    "Description": "An incredibly potent and dangerous ingredient, rumored to grant immense power or elemental resistance. It tastes of \"raw magic,\" feels heavy but flakes like fish. Eating it is said to improve dental health, breath, eyesight, and reverse baldness. Dragon parts are highly valuable to wizards and alchemists, making consumption almost sacrilegious.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Mountain"
    ],
    "Effects": [
      "Consuming the heart (a meal for one) allows the consumer to roll three times on the Dragon table:",
      "1-2: Aneurysm. Save versus death.",
      "3-4: Spellsight. For 1d6 hours, you can smell any magic items or creatures within 100 feet, even through walls.",
      "5-6: Regeneration. Heal 1d6 hit points per round for 1d6 hours.",
      "7-8: Breath Weapon. Gain a dragon’s breath weapon (1d6 damage, 3 uses) for 1d6 hours.",
      "9: Scaleskin. Your skin becomes tough and segmented. You cannot wear armor, but your AC or Defense is as good as chainmail.",
      "10: Dragon Vision. Save versus Constitution. On a success, gain \"Wizard Vision\" (ability to see in the dark, hypnotize small mammals by staring).",
      "Specific dragon hearts/meat effects:",
      "Red Dragon Heart: The \"ultimate fiery delicacy,\" rumored to grant immense power and significant fire resistance.",
      "Silver Dragon Meat: Said to soothe the mind and provide a brief resistance to cold.",
      "White Dragon Meat: Causes a chilling sensation and can grant a fleeting resistance to cold damage.",
      "Brass Dragon Meat: Provides a comforting warmth and can enhance social charm.",
      "Blue Dragon Meat: Improves alertness and provides a brief resistance to lightning.",
      "Copper Dragon Meat: Said to inspire witty thoughts and provide minor resistance to acid.",
      "Green Dragon Meat: May cause discomfort but can provide a fleeting resistance to acid.",
      "Gold Dragon Meat: Possesses purifying and restorative properties, potentially healing wounds or removing minor ailments."
    ],
    "Purchase Price": "50 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools (Enchanted)",
        "Arcane Focus",
        "Preservation Salts",
        "Container(s), Large"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils (Enchanted)",
        "Alchemist's Kit",
        "Magical Heat Source"
      ]
    },
    "Notes": "Eating dragon parts, raw or cooked, is \"almost sacrilegious\" due to their value to wizards and alchemists."
  },
  {
    "Name": "Dragon Turtle Meat",
    "Description": "Immense quantities of tough, often briny, but highly nutritious meat. Described as \"Utterly delicious. Beyond description. Rapturous\". It is considered \"Normal Meat\".",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Coastal",
      "Underdark"
    ],
    "Effects": [
      "Provides substantial sustenance and minor aquatic adaptation.",
      "A soup made from Dragon Turtle bonds everyone who eats it together in friendship, preventing serious arguments and promoting compromises for 1 week."
    ],
    "Purchase Price": "3 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Dragon's Breath Cactus",
    "Description": "A rare cactus whose fruit, when consumed, imbues a temporary resistance to fire.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Desert"
    ],
    "Effects": [
      "Imbues a temporary resistance to fire."
    ],
    "Purchase Price": "5 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "mid Summer"
      ]
    },
    "Cooking": {
      "Method": "Consumed directly."
    }
  },
  {
    "Name": "Dragon's Breath Chili",
    "Description": "An incredibly hot chili pepper that grows near volcanic vents.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Mountain"
    ],
    "Effects": [
      "Imparts intense heat/spice."
    ],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Late Summer",
        "Early Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Dragon's Tooth Asparagus",
    "Description": "Tough, spear-like asparagus that grows in rocky crevices, rumored to have strengthening properties.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Hill"
    ],
    "Effects": [
      "Rumored to have strengthening properties."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "mid Spring"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Drider's Venom Gland (diluted)",
    "Description": "This substance is extremely dangerous. A highly diluted and properly prepared amount can be used as a powerful, temporary paralyzing agent in food.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Underdark"
    ],
    "Effects": [
      "When properly prepared and diluted, it can act as a temporary paralyzing agent in food.",
      "Drider Poison is an ingredient for:",
      "Drow Poison: Requires a DC 13 Constitution saving throw; on a failed save, the creature is poisoned for 1 hour. If failed by 5 or more, the creature is also unconscious.",
      "Fire Plague: A rose-orange powder baked into bread/pastry. Eating it requires a DC 14 Constitution saving throw. On a failed save, the consumer takes 1d6 fire and 1d6 necrotic damage, becomes poisoned, and gets necrotic skin patches. While poisoned, they have vivid hallucinations concerning death.",
      "Magic's Bane: A clear, colorless potion that, when it contacts a creature's blood, forces a DC 14 Wisdom saving throw. On a failed save, the creature's ability to cast spells is disrupted for 1 minute, requiring a DC 10 Arcana check to use spells."
    ],
    "Purchase Price": "5 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Poisoner's Kit"
      ]
    },
    "Cooking": {
      "Method": "Can be used as an agent in food."
    },
    "Notes": "Highly dangerous if not properly prepared."
  },
  {
    "Name": "Drow Flesh",
    "Description": "Generally considered taboo by surface dwellers, but edible by desperate adventurers or monstrous humanoids.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underdark"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Drowlight Dew",
    "Description": "A faintly glowing, viscous dew found in specific cavern ecosystems where Drow presence is strong.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Underdark"
    ],
    "Effects": [
      "Provides minimal sustenance.",
      "Can temporarily enhance darkvision or grant a brief resistance to psychic charm."
    ],
    "Purchase Price": "5 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Container(s)",
        "Alchemist's Kit"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Alchemist's Kit"
      ]
    }
  },
  {
    "Name": "Dryad Bark Essence (crystallized)",
    "Description": "A rare, crystallized sap or essence collected from a Dryad's bonded tree after its demise.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest"
    ],
    "Effects": [
      "When consumed, it is said to temporarily connect one to nature and potentially grant minor plant manipulation abilities."
    ],
    "Purchase Price": "5 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Alchemist's Kit"
      ]
    }
  },
  {
    "Name": "Dryad's Blessing Leaf",
    "Description": "A rare leaf from a tree touched by a dryad.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest"
    ],
    "Effects": [
      "Consuming it provides a brief, minor healing effect."
    ],
    "Purchase Price": "5 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ]
    },
    "Cooking": {
      "Method": "Consumed directly."
    }
  },
  {
    "Name": "Duergar Flesh",
    "Description": "Tough, dense, and gamey. Edible but often gritty from their subterranean environment.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underdark"
    ],
    "Effects": [
      "Provides sustenance."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Dulse",
    "Description": "A red seaweed with a savory, almost smoky flavor, good for drying.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Coastal"
    ],
    "Effects": [
      "Edible, provides sustenance, and is good for drying."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Dune Lizard Tail",
    "Description": "Lean, somewhat bland meat, but a reliable protein source.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Desert"
    ],
    "Effects": [
      "Provides sustenance and is a reliable protein source."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Dune Tuber",
    "Description": "A starchy root that grows deep beneath the sand, highly nutritious.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Desert"
    ],
    "Effects": [
      "Provides sustenance and is highly nutritious."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Digging Tools"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Durian",
    "Description": "This fruit is described as delicious but incredibly pungent. This is a large, pungent fruit.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Jungle"
    ],
    "Effects": [
      "Provides sustenance."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Dust Devil Root",
    "Description": "This is a gnarled, tough root that grows in arid, windswept areas. It is difficult to chew.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Wasteland"
    ],
    "Effects": [
      "Provides sustenance."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Trowel",
        "Herbalism Kit"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Dust Elemental Core (trace)",
    "Description": "This is a tiny, inert core found after a Dust Elemental disperses in arid winds.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Desert"
    ],
    "Effects": [
      "When consumed, it provides a faint sense of weightlessness or quiet."
    ],
    "Purchase Price": "1 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Alchemist's Kit"
      ]
    }
  },
  {
    "Name": "Earth Elemental Shard",
    "Description": "A raw, crystalline fragment of an Earth Elemental's core, found within deep mountain caves or fissures. It offers a strong mineral taste and grounding sensation.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Mountain",
      "Underdark"
    ],
    "Effects": [
      "Offers a strong mineral taste and grounding sensation. It can provide mineral sustenance and enhance physical endurance when infused as grit."
    ],
    "Purchase Price": "1 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Earthstar Fungus",
    "Description": "A distinctive, star-shaped puffball fungus. It appears as small fungal stars on the forest floor, tracing tree roots, or clinging to damp boulders in caves.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Forest"
    ],
    "Effects": [
      "The inner spore mass can be used as a mild anesthetic or for minor wound dressing.",
      "When used as a \"Salve\" (whole fungus), it provides healing (4d4 + 4 hit points).",
      "When processed into \"Powder\" (whole fungus), it can stabilize the dying."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Apothecary's kit"
      ],
      "Seasons": [
        "Summer",
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Echo Bloom",
    "Description": "A flower that grows in areas with natural echoes.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Hill"
    ],
    "Effects": [
      "Consuming its petals is said to improve hearing temporarily."
    ],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Edible Mushrooms (various)",
    "Description": "Includes varieties like Portobello, shiitake, oyster mushrooms, etc..",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Forest",
      "Grassland",
      "Hill",
      "Swamp",
      "Underdark",
      "Urban"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Spring",
        "Summer",
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Eelgrass (certain species)",
    "Description": "Some species of eelgrass have edible seeds.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Underwater"
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Eglantine",
    "Description": "Buds from a wild rose, typically found in hilly regions.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Grassland"
    ],
    "Effects": [
      "After ingesting the infusion, at the beginning of the creature's next turn they gain a +1 bonus to initiative and a -1 penalty to all Intelligence checks.",
      "This herb is used to heighten awareness and has no effect if used again on the same creature until they complete a short rest."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Summer"
      ]
    }
  },
  {
    "Name": "Elderberry / Elderberry (Coastal variety)",
    "Description": "Berries are edible when cooked.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Coastal",
      "Forest",
      "Grassland",
      "Hill",
      "Urban"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Late Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Energy Core Shard (trace)",
    "Description": "A tiny, inert splinter from a construct's energy core.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Desert",
      "Mountain",
      "Underdark",
      "Urban",
      "Wasteland"
    ],
    "Effects": [
      "Consumed for a brief mental clarity or alertness. As a ingredient, it can provide temporary hit points (equal to proficiency bonus) and resistance to non-magical bludgeoning, piercing, and slashing damage. It also offers a +2 bonus to missed attack rolls or failed ability checks."
    ],
    "Purchase Price": "1 sp per unit",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Erinyes Hair (Woven & Infused)",
    "Description": "A strand of hair from an Erinyes, magically woven and infused.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Any"
    ],
    "Effects": [
      "Consuming it might grant a brief, unsettling aura of justice or a temporary resistance to charm, but can also instill a sense of righteous fury."
    ],
    "Purchase Price": "50 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Fine Clippers"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Evergreen Needles",
    "Description": "Needles from evergreen trees. Can be brewed into a vitamin-rich tea.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Arctic",
      "Forest",
      "Hill",
      "Mountain"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year-round"
      ]
    }
  },
  {
    "Name": "Faerie Dust (trace)",
    "Description": "A sparkling, ethereal residue left behind by fae creatures.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Forest"
    ],
    "Effects": [
      "Ingesting a tiny amount of this dust can cause minor, temporary illusions or a sense of whimsical detachment.",
      "When consumed, it provides a fleeting sensation of levity or a minor, temporary illusionary ability."
    ],
    "Purchase Price": "5 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Faerie Ring Mushroom",
    "Description": "This is a rare mushroom that grows in perfect circles.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Forest"
    ],
    "Effects": [
      "When consumed, it is said to have minor illusionary properties."
    ],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Fairy Stool",
    "Description": "These are small, delicate mushrooms often found in rings. They are generally bland or slightly toxic if raw, but some varieties are edible when cooked. They are considered good for adding a \"fantasy\" aesthetic. They are also described as bright red toadstools with white polka dots that mark a circle on the forest floor.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Grassland"
    ],
    "Effects": [
      "Ingestion (raw): Ingesting it causes blindness for 1 minute on a failed DC 20 Constitution saving throw, along with vivid hallucinations.",
      "It can also cause a creature to be \"Poisoned, Sleep in 5 min\".",
      "Ingestion (raw): Can cause 1d6 poison damage."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Autumn",
        "Winter"
      ]
    },
    "Cooking": {
      "Method": "Edible when cooked.",
      "Required Kit": []
    }
  },
  {
    "Name": "Fallen Celestial Ember (solidified)",
    "Description": "This is a cold, solidified ember found where a celestial has perished or been defeated in a cataclysmic event. When crushed and consumed, it offers a fleeting, paradoxical taste of creation and destruction.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Wasteland"
    ],
    "Effects": [
      "Potentially grants temporary fortitude against elemental damage."
    ],
    "Purchase Price": "20 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Gloves, Heat-Resistant",
        "Chisel"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Mortar and Pestle",
        "Crucible",
        "Magical Heat Source"
      ]
    }
  },
  {
    "Name": "Feathered Serpent's Bloom",
    "Description": "This is a vibrant, fragrant flower found in a high jungle canopy.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Jungle"
    ],
    "Effects": [
      "It is rumored to grant brief levitation."
    ],
    "Purchase Price": "20 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Feral Cherry/Plum (fruits)",
    "Description": "These are small, often tart fruits from wild or escaped trees.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Urban"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Feral Hog Tusk (ground)",
    "Description": "Can be used as a gritty, toughening seasoning, or for its sharp edges.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Wasteland"
    ],
    "Effects": [
      "As a seasoning, it imparts a \"gritty, toughening\" quality.",
      "It is also noted for its \"sharp edges,\" implying potential use as an improvised weapon."
    ],
    "Purchase Price": "1 sp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Bone Saw"
      ]
    },
    "Cooking": {
      "Method": "Used as a seasoning",
      "Required Kit": [
        "Cook's Utensils",
        "Mortar and Pestle"
      ]
    }
  },
  {
    "Name": "Fetid Bloom",
    "Description": "This is a beautiful but foul-smelling flower.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Mountain",
      "Swamp"
    ],
    "Effects": [
      "Its petals, when dried and powdered, can be used as a powerful, but off-putting, seasoning."
    ],
    "Purchase Price": "1 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Drying Rack",
        "Mortar and Pestle"
      ]
    }
  },
  {
    "Name": "Fiddlehead Ferns",
    "Description": "These are young, coiled shoots of certain ferns (e.g., Ostrich Fern).",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "mid Spring"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Fig (fruits)",
    "Description": "These are fruits from escaped or neglected fig trees.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Urban"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Late Summer",
        "Early Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Fire Elemental Ember (solidified)",
    "Description": "This is a cold, hard ember from a defeated Fire Elemental, typically found near volcanic vents or intensely hot areas.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Desert",
      "Mountain",
      "Wasteland"
    ],
    "Effects": [
      "Direct consumption: It provides a burst of heat and mild fire resistance when crushed.",
      "As ingredient: Can be used to brew a Potion of Fire Breath, which allows the user to exhale fire for damage. It can also be used to craft a Potion of Resistance (Fire), granting fire resistance."
    ],
    "Purchase Price": "1 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit"
      ]
    },
    "Cooking": {
      "Method": "Consumed as a crushed ember or brewed into a potion.",
      "Required Kit": [
        "Alchemist's Kit"
      ]
    }
  },
  {
    "Name": "Fire Giant Flank",
    "Description": "Incredibly tough and hot to the touch even when raw, often with a smoky or sulfurous taste.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Mountain"
    ],
    "Effects": [
      "Provides extreme internal warmth when consumed."
    ],
    "Purchase Price": "3 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Flax",
    "Description": "Seeds from a pale blue flower with five petals.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Coastal"
    ],
    "Effects": [
      "A creature subjected to this poison must make a DC 10 Constitution saving throw at the beginning of their next turn. On a failed save, the creature is paralyzed."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Method": "Not applicable, used to create an oil (injury)."
    }
  },
  {
    "Name": "Foraging Herbs (various)",
    "Description": "Includes herbs like thyme, oregano, wild garlic, and mint.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Spring",
        "Summer",
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Forbidden Fruit",
    "Description": "A dangerously beautiful fruit rumored to grant immense knowledge or madness, guarded by magical traps or creatures.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Jungle"
    ],
    "Purchase Price": "20 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Forest Nettle",
    "Description": "A plant that needs to be cooked to remove its sting, but is highly nutritious.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest"
    ],
    "Effects": [
      "Highly nutritious."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Gloves, Thick"
      ],
      "Seasons": [
        "Spring",
        "Summer",
        "Autumn"
      ]
    },
    "Cooking": {
      "Method": "Needs to be cooked to remove the sting.",
      "Required Kit": [
        "Cook's Utensils",
        "Pot, Large"
      ]
    }
  },
  {
    "Name": "Fox/Rabbit Meat",
    "Description": "Small, lean, common prey meat.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Forest"
    ],
    "Effects": [
      "Provides sustenance.",
      "On a d6 roll of 1, a creature must Save vs Constitution or lose any benefit from the meal, and spend the rest of the day queasy and gassy.",
      "On a d6 roll of 2-5, there is no extra effect.",
      "On a d6 roll of 6, the meal is delicious."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Frost Giant Steak",
    "Description": "Massive cuts of meat that are surprisingly palatable, often retaining a subtle coolness even when cooked. Known for being incredibly filling.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Arctic",
      "Mountain"
    ],
    "Effects": [
      "Incredibly filling.",
      "Retains a subtle coolness even when cooked."
    ],
    "Purchase Price": "15 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Frost Lichen",
    "Description": "A hardy lichen that can be scraped off rocks and eaten, providing minimal sustenance but helping with cold. It is an eye blindingly white lichen that grows on rocks in regions with year-long freezing temperatures.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Arctic"
    ],
    "Effects": [
      "Provides minimal sustenance and helps with cold."
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Winter"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Mortar and Pestle"
      ]
    }
  },
  {
    "Name": "Frozen Drake Scale (ground)",
    "Description": "Can be used as a seasoning, imparting a subtly spicy, numbing flavor.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Arctic"
    ],
    "Effects": [
      "Imparts a subtly spicy, numbing flavor when used as seasoning."
    ],
    "Purchase Price": "1 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Chisel"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Fumellar",
    "Description": "Seeds from a red flower known as the \"flowers of sleep\".",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Grassland"
    ],
    "Effects": [
      "After ingesting the oil, at the beginning of the creature's next turn, they must make a DC 10 Constitution check. On a failed save, the creature falls unconscious for 2 (1d4) minutes. This herb has no effect when used again on the creature until the creature completes a short rest."
    ],
    "Purchase Price": "1 sp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Autumn"
      ]
    },
    "Cooking": {
      "Method": "Not applicable, used to create an oil (ingested)."
    }
  },
  {
    "Name": "Fungal Bloom (various)",
    "Description": "A wide variety of edible, and sometimes poisonous, fungi that grow in the Underdark (e.g., Trillimac, Ripplewit).",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Underdark"
    ],
    "Effects": [
      "Can be edible or poisonous."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Fungal Spores (non-magical)",
    "Description": "Mundane fungal spores that can be used as thickeners or minor food additives.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Underdark"
    ],
    "Effects": [
      "Can be used as thickeners or minor food additives."
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Container(s)"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Method": "Used as thickeners or minor food additives.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Fungal Sprouts/Shoots",
    "Description": "Young growths of larger fungal structures.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Underdark"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Fungus Slime",
    "Description": "A strange, gelatinous fungus that can be used as a thickener or as a last-resort food source.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Mountain",
      "Swamp",
      "Underdark",
      "Urban"
    ],
    "Effects": [
      "Can be used as a thickener or as a last-resort food source."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Scoop",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Method": "Used as a thickener or a last-resort food source.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Galeb Duhr Core (trace)",
    "Description": "While mostly stone, rare instances of a small, soft, mineral-rich core might be found.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Mountain",
      "Underdark"
    ],
    "Effects": [
      "Provides a grounding sensation."
    ],
    "Purchase Price": "1 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit"
      ]
    }
  },
  {
    "Name": "Gargoyle Droppings (crystallized)",
    "Description": "A strangely sweet crystalline substance.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Urban"
    ],
    "Effects": [
      "Rumored to provide minor strength."
    ],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Pick",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Mortar and Pestle",
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Gargoyle Gourd",
    "Description": "A tough, knobbly gourd that grows in high, rocky areas.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Mountain"
    ],
    "Effects": [
      "Surprisingly nutritious when cooked."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Mason's Tools"
      ]
    },
    "Cooking": {
      "Method": "Requires cooking.",
      "Required Kit": [
        "Mortar and Pestle",
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Gargoyle Stone Meat (prepared)",
    "Description": "Though made of stone. One source states that in its setting, gargoyles are stone elementals and cannot truly be eaten.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Hill",
      "Mountain",
      "Urban"
    ],
    "Effects": [
      "Provides sustenance and resilience."
    ],
    "Purchase Price": "3 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Chisel",
        "Arcane Dissection Kit"
      ]
    },
    "Cooking": {
      "Method": "Requires specific magical preparation to render it into a palatable, gritty substance.",
      "Required Kit": [
        "Cook's Utensils",
        "Mortar and Pestle"
      ]
    }
  },
  {
    "Name": "Gargoyle Wing Meat (cooked)",
    "Description": "Leathery and surprisingly bland.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Hill"
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Mason's Tools"
      ]
    },
    "Cooking": {
      "Method": "Requires cooking.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Gargoyle's Tear Cap",
    "Description": "A small, grey mushroom that often grows on rocky outcrops or near gargoyle roosts. When broken, it releases a clear, tear-like liquid.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Mountain"
    ],
    "Effects": [
      "Can temporarily enhance stone-shaping abilities or resist petrification."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Garlic Mustard",
    "Description": "Pungent leaves and flowers. It is exceptionally common in urban disturbed areas.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest",
      "Urban"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Early Spring",
        "mid Spring"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Gator Pear",
    "Description": "A tough-skinned fruit that grows in swamp trees.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Mountain",
      "Swamp"
    ],
    "Effects": [
      "Edible and nutritious."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife"
      ],
      "Seasons": [
        "Summer",
        "early Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Mortar and Pestle"
      ]
    }
  },
  {
    "Name": "Gelatinous Cube (ooze)",
    "Description": "An ooze creature with a flavor of \"battery acid and slowly spreading numbness\".",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Underdark",
      "Urban"
    ],
    "Effects": [
      "If eaten raw, a handful can remove the sting of any wound, and a small bite can numb an aching tooth.",
      "If used as a soup base, it pre-digests tough meats and vegetables, making them more palatable.",
      "Raw, it can revitalize from stomach acid, melting you from the inside (make a death saving throw or die in agony); on a successful save, permanently lose 1d6 Constitution and HP.",
      "Raw, it might stay in your stomach, eventually growing so large you burst or starve (1d6 weeks); you might not even know it's inside you.",
      "Raw, your stomach might dissolve the ooze with no extra effect.",
      "Raw, it might infiltrate your digestive tract, becoming part of you, gaining +1 Constitution and +4 to Save vs. Poison; your skin becomes waxy and slightly tacky.",
      "Raw, as the previous effect, plus the ooze consumes your organs and replaces their functions, leaving you mostly hollow inside (only bones and nerves remain); you Regenerate 1 HP per round but permanently lose 2 Strength.",
      "Raw, as the previous effect, plus once per day, you can cast Command with 2 magic dice on an ooze or slime; Oozes will not harm you unless you attack first.",
      "As an ooze ingredient, the consumer reduces any acid or poison damage they take by 1d4. Additionally, they have a 1d4 bonus to any check or saving throw against becoming grappled or restrained.",
      "When the consumer makes an ability check or saving throw to end an effect that renders them grappled or restrained, they can use a reaction to automatically succeed on the check or save."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Container(s)"
      ]
    },
    "Cooking": {
      "Method": "Can be eaten raw or used as a soup base. If cooked, it can be cooked into a soup.",
      "Required Kit": [
        "Pot",
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Ghost Barnacle",
    "Description": "A barnacle that glows faintly.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Coastal"
    ],
    "Effects": [
      "Offers minor magical resistance for a short duration when consumed."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Alchemist's Kit"
      ]
    }
  },
  {
    "Name": "Ghoul Flesh (Necrotically Prepared)",
    "Description": "The putrid flesh of a ghoul, rendered \"safe\" through specific, dark rituals.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underdark",
      "Urban",
      "Wasteland"
    ],
    "Effects": [
      "Provides vile sustenance and a fleeting resistance to paralysis. Carries a high risk of disease and moral corruption.",
      "If eaten raw, the consumer must make a saving throw versus Con (DC of monster’s DC + 5) or begin to crave the flesh of the dead and become a ghoul in 24 hours (no cure)."
    ],
    "Purchase Price": "50 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Knife",
        "Ritual Components"
      ]
    },
    "Cooking": {
      "Method": "Requires specific, dark rituals to be rendered \"safe\".",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Ghoul Flesh (prepared)",
    "Description": "Dangerous to harvest and prepare (risk of disease/necrosis).",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underdark",
      "Wasteland"
    ],
    "Effects": [
      "Can provide sustenance in desperate times."
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Knife",
        "Ritual Components"
      ]
    },
    "Cooking": {
      "Method": "Requires preparation.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Ghoul's Gullet Fungus",
    "Description": "A repulsive-looking fungus that grows in areas frequented by undead.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Wasteland"
    ],
    "Effects": [
      "Said to provide a brief boost of necrotic energy if consumed."
    ],
    "Purchase Price": "5 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Gloves, Thick"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Giant Ape Loin",
    "Description": "Strong, gamey flavor.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Jungle"
    ],
    "Effects": [
      "Very filling."
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Bone Saw"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot, Large"
      ]
    }
  },
  {
    "Name": "Giant Badger Ham",
    "Description": "Fatty and musky.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Forest",
      "Grassland",
      "Hill",
      "Underdark"
    ],
    "Effects": [
      "Very filling."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Bone Saw"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Curing Salt",
        "Smoker/Curing Chamber"
      ]
    }
  },
  {
    "Name": "Giant Bat Meat",
    "Description": "Lean, dark, and gamey.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underdark"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Knife",
        "Bag, Large"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Roasting Pan"
      ]
    }
  },
  {
    "Name": "Giant Boar Meat",
    "Description": "Rich, fatty, and flavorful. Jungle varieties are smaller and leaner, but still flavorful.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Arctic",
      "Hill"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Bone Saw"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot, Large"
      ]
    }
  },
  {
    "Name": "Giant Cave Badger Ham",
    "Description": "Fatty and musky. Very filling.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underdark"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Bone Saw"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Curing Salt",
        "Smoker/Curing Chamber"
      ]
    }
  },
  {
    "Name": "Giant Cave Bear Meat",
    "Description": "Rich, fatty, and flavorful.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underdark"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Bone Saw"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot, Large"
      ]
    }
  },
  {
    "Name": "Giant Centipede Meat (cooked)",
    "Description": "Rubbery and slightly bitter. Edible in desperation.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underdark"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot, Large"
      ]
    }
  },
  {
    "Name": "Giant Constrictor Snake Meat",
    "Description": "White, tender, and somewhat bland.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Jungle",
      "Swamp"
    ],
    "Effects": [
      "Very filling."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Giant Crab Leg",
    "Description": "Substantial, sweet meat from larger crustacean monsters.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Coastal"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Shell Cracker",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot, Large"
      ]
    }
  },
  {
    "Name": "Giant Crab Meat",
    "Description": "Substantial, sweet meat.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underwater"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Shell Cracker",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot, Large"
      ]
    }
  },
  {
    "Name": "Giant Eagle Breast",
    "Description": "Lean, dense, gamey meat.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Grassland",
      "Hill",
      "Mountain"
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Knife",
        "Plucking Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Roasting Pan"
      ]
    }
  },
  {
    "Name": "Giant Eel Meat",
    "Description": "Oily and strong-flavored. Very tender when cooked properly.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underwater"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
      ]
    },
    "Cooking": {
      "Method": "Must be cooked properly.",
      "Required Kit": [
        "Cook's Utensils",
        "Grilling Rack", "Smoking Kit"
      ]
    }
  },
  {
    "Name": "Giant Frog Legs",
    "Description": "Tender and mild, good for cooking, a classic swamp delicacy. They are larger and more substantial than common frog legs.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Forest",
      "Jungle",
      "Swamp"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Knife",
        "Bag, Large"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Frying Pan"
      ]
    }
  },
  {
    "Name": "Giant Lizard Meat",
    "Description": "Lean and somewhat stringy.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Swamp"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Giant Octopus/Squid Meat",
    "Description": "Chewy and flavorful, a staple in marine diets.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underwater"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot, Large"
      ]
    }
  },
  {
    "Name": "Giant Owl Breast",
    "Description": "Lean, somewhat gamey, but nutritious meat.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Arctic"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Knife",
        "Plucking Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Roasting Pan"
      ]
    }
  },
  {
    "Name": "Giant Piranha Meat",
    "Description": "A larger, more substantial fish.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underwater"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Frying Pan"
      ]
    }
  },
  {
    "Name": "Giant Rat Meat",
    "Description": "Very stringy pork with many bones. It is larger, tougher, and more substantial than common rat meat.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underdark",
      "Wasteland"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Bag, Large"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Roasting Pan"
      ]
    }
  },
  {
    "Name": "Giant Scorpion Meat",
    "Description": "Tough.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Wasteland"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Shell Cracker",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Method": "Edible after careful preparation.",
      "Required Kit": [
        "Cook's Utensils",
        "Pot, Large"
      ]
    }
  },
  {
    "Name": "Giant Scorpion Tail Meat (prepared)",
    "Description": "Tough, and tastes faintly of shellfish.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Desert"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Shell Cracker",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Method": "Edible after removing venom glands.",
      "Required Kit": [
        "Cook's Utensils",
        "Pot, Large"
      ]
    }
  },
  {
    "Name": "Giant Sea Turtle Steak",
    "Description": "Large cuts of fatty, somewhat chewy meat. It is utterly delicious and unique, beyond description, and rapturous.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Coastal"
    ],
    "Purchase Price": "3 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Bone Saw",
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot, Large"
      ]
    }
  },
  {
    "Name": "Giant Seasnake Meat",
    "Description": "Lean, white meat, similar to terrestrial snakes.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underwater"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Grilling Rack", "Smoking Kit"
      ]
    }
  },
  {
    "Name": "Giant Sewer Rat Meat",
    "Description": "Larger, tougher, and more substantial than common rat meat.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Urban"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Bag, Large",
        "Disinfectant"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot, Large",
        "Purifying Agents"
      ]
    }
  },
  {
    "Name": "Giant Shark Meat",
    "Description": "Tough and often pungent. It is fishy and crunchy.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underwater"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Grilling Rack", "Smoking Kit"
      ]
    }
  },
  {
    "Name": "Giant Spider Leg (Urban variant; cooked)",
    "Description": "Meaty and somewhat stringy.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Urban"
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Method": "Must be cooked.",
      "Required Kit": [
        "Cook's Utensils",
        "Pot, Large"
      ]
    }
  },
  {
    "Name": "Giant Spider Leg (cooked - Underdark variant)",
    "Description": "Meaty and somewhat stringy, often with a faintly metallic or earthy flavor.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Forest",
      "Hill",
      "Mountain",
      "Swamp",
      "Underdark"
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Container(s)",
      ]
    },
    "Cooking": {
      "Method": "Must be cooked.",
      "Required Kit": [
        "Cook's Utensils",
        "Pot, Large"
      ]
    }
  },
  {
    "Name": "Giant Starfish Flesh",
    "Description": "Rubbery and briny.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Coastal"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Scoop",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Method": "Edible after extensive pounding and boiling.",
      "Required Kit": [
        "Cook's Utensils",
        "Pot, Large"
      ]
    }
  },
  {
    "Name": "Giant Vulture Meat",
    "Description": "Tough and gamey.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Hill",
      "Wasteland"
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Knife",
        "Plucking Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot"
      ]
    }
  },
  {
    "Name": "Giant Worm Steak",
    "Description": "Meaty, often slimy, and very filling.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Desert"
    ],
    "Effects": [
      "Very filling."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot, Large"
      ]
    }
  },
  {
    "Name": "Giant's Stalk Cabbage",
    "Description": "A large, tough cabbage-like plant found in areas where giants roam.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Grassland"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Bag, Large"
      ],
      "Seasons": [
        "Summer",
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot, Large"
      ]
    },
    "Notes": "Requires significant effort to harvest and prepare."
  },
  {
    "Name": "Ginger (wild rhizomes)",
    "Description": "Pungent root.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Jungle"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Trowel",
        "Brush"
      ],
      "Seasons": [
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Mortar and Pestle"
      ]
    }
  },
  {
    "Name": "Glabrezu Essence (Whispering Crystal)",
    "Description": "A shard of solidified chaotic essence from a Glabrezu, tasting of forbidden knowledge and promises.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Any"
    ],
    "Effects": [
      "Consuming it can temporarily boost intelligence or charisma, but may whisper insidious suggestions into the mind.",
      "If prepared by an expert, when a creature within 20 feet of the consumer makes an attack or saving throw, the consumer can use their reaction to reduce that creature’s roll by 1d4. When a creature within 10 feet of the consumer hits them with an attack, the consumer can use a reaction to deal cold or fire damage (their choice) equal to 1d8 + their Intelligence modifier to the attacker."
    ],
    "Purchase Price": "50 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Alchemist's Kit"
      ]
    }
  },
  {
    "Name": "Glacial Brine",
    "Description": "A super-saline, mineral-rich water trapped beneath glaciers, often containing unique, palatable mineral deposits.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Arctic"
    ],
    "Effects": [
      "Provides sustenance and hydration."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Container(s)",
        "Scoop"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Evaporation Dish"
      ]
    }
  },
  {
    "Name": "Glacial Seaweed",
    "Description": "A nutrient-rich seaweed found in icy waters, good for stews.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Arctic"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife",
        "Bag"
      ],
      "Seasons": [
        "Winter"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Drying Rack"
      ]
    }
  },
  {
    "Name": "Glasswort (Salicornia/Pickleweed)",
    "Description": "Crunchy, salty, succulent stems.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Coastal",
      "Underwater"
    ],
    "Effects": [
      "Edible"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Shears",
        "Basket"
      ],
      "Seasons": [
        "Late Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Glimmer Kelp",
    "Description": "A bioluminescent kelp that, when eaten, provides a subtle, temporary glow and minor resistance to pressure.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Underwater"
    ],
    "Effects": [
      "Provides a subtle, temporary glow and minor resistance to pressure."
    ],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Fine Net",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Non-Reactive Cookware"
      ]
    }
  },
  {
    "Name": "Gloomspore",
    "Description": "A fungi found in dark, damp parts of the forest.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Forest"
    ],
    "Effects": [
      "Causes mild disorientation but can be used as a hallucinogenic seasoning."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife",
        "Container(s)",
        "Mask"
      ]
    },
    "Cooking": {
      "Method": "Can be used as a hallucinogenic seasoning.",
      "Required Kit": [
        "Cook's Utensils",
        "Mortar and Pestle",
        "Non-Reactive Cookware"
      ]
    }
  },
  {
    "Name": "Gloomstone Shard",
    "Description": "A shard of rock infused with the gloom of a dark forest.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Forest"
    ],
    "Effects": [
      "Consuming it can induce minor disorientation but also offer a brief sense of hidden knowledge."
    ],
    "Purchase Price": "1 sp per unit",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Chisel",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Alchemist's Kit",
        "Mortar and Pestle",
        "Non-Reactive Cookware"
      ]
    }
  },
  {
    "Name": "Glow Cap Mushroom",
    "Description": "A bioluminescent mushroom that provides a small amount of light and is edible.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Underdark"
    ],
    "Effects": [
      "Provides a small amount of light and is edible."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife",
        "Basket"
      ],
      "Seasons": [
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Glow-in-the-Dark Mushroom (bioluminescent edible fungi)",
    "Description": "Some edible fungi are bioluminescent.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Underdark"
    ],
    "Effects": [
      "Edible and bioluminescent."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife",
        "Basket"
      ],
      "Seasons": [
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Gnoll Flesh",
    "Description": "Rank, stringy, and unpleasant due to their scavenging diet.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Desert",
      "Forest",
      "Hill",
      "Wasteland"
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Knife",
        "Bag, Large"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot"
      ]
    }
  },
  {
    "Name": "Gnome Garnish (Mineral Dust)",
    "Description": "A fine, colorful mineral dust found near gnome mining operations or settlements. It is used as a vibrant, tangy seasoning.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Hill"
    ],
    "Effects": [
      "Primarily functions as a vibrant, tangy seasoning."
    ],
    "Purchase Price": "1 sp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Scoop",
        "Bag",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Method": "Used as a seasoning.",
      "Required Kit": [
        "Cook's Utensils",
        "Mortar and Pestle"
      ]
    }
  },
  {
    "Name": "Goat Meat",
    "Description": "Lean, tough, with a distinctive flavor. It is a common food source in hilly terrain.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Hill"
    ],
    "Effects": [
      "On a d6 roll of 1, the consumer must make a Constitution saving throw or lose any benefit from the meal, and spend the rest of the day queasy and gassy.",
      "On a d6 roll of 2-5, there is no extra effect.",
      "On a d6 roll of 6, it is delicious and heals 1 HP, or 1 additional HP."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Knife",
        "Bag, Large"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Roasting Pan"
      ]
    }
  },
  {
    "Name": "Goat's Beard (plant)",
    "Description": "A dandelion-like plant.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest",
      "Grassland",
      "Hill",
      "Urban"
    ],
    "Effects": [
      "Edible when young."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Trowel",
        "Basket"
      ],
      "Seasons": [
        "mid Summer"
      ]
    },
    "Cooking": {
      "Method": "Edible when young.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Goblin Ear Fungus",
    "Description": "A leathery, ear-shaped fungus found on dead wood or rocks.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Hill"
    ],
    "Effects": [
      "While not particularly tasty, it is a reliable source of sustenance."
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Goblin Flesh",
    "Description": "Stringy, lean, and often gamey. It is a very common, albeit unappetizing, source of sustenance. The \"Urban Variant\" is found in city sewers or derelict districts. The \"Mountain Variant\" is stringy, lean, and often tough due to harsh living conditions. The \"Underdark Variant\" is stringy, lean, and often gamey, adapted to cave diets. The \"Wasteland Variant\" is tough and lean due to harsh conditions. It has an \"acidic aftertaste\".",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Forest",
      "Hill",
      "Mountain",
      "Underdark",
      "Urban",
      "Wasteland"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Knife",
        "Bag, Large"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot"
      ]
    }
  },
  {
    "Name": "Goblin Fruit",
    "Description": "A strange, often misshapen fruit found in goblin-infested areas.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest"
    ],
    "Effects": [
      "Sometimes edible, sometimes mildly poisonous."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Basket",
        "Bag",
        "Poisoner's Kit"
      ],
    "Seasons": [
        "Late Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Detoxification Agents"
      ]
    }
  },
  {
    "Name": "Goblinoid Flesh (Arctic Variant)",
    "Description": "Stringy, tough, and often lean due to harsh living conditions.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Arctic"
    ],
    "Effects": [
      "Primarily a sustenance source for monstrous humanoids or in dire survival."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Knife",
        "Bag"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot"
      ]
    }
  },
  {
    "Name": "Gold Dragon Meat",
    "Description": "Incredibly rare and highly prized. Its flesh is said to possess purifying and restorative properties. It tastes of \"raw magic,\" feels heavy but flakes like fish, and consuming it can result in cosmetic improvements like no cavities, better breath, vanishing bald spots, and improved eyesight, making one feel like \"the 'after' picture in a thousand internet ads\".",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Any"
    ],
    "Effects": [
      "Possesses purifying and restorative properties, potentially healing wounds or removing minor ailments.",
      "Provides permanent positive cosmetic changes.",
      "As a ingredient, it grants resistance to the dragon's damage type, a fly speed equal to walking speed, or the ability to exhale a 15-foot cone of elemental damage as a bonus action, requiring a Dexterity saving throw (taking a number of d6 equal to proficiency bonus on a failed save, half on a success)."
    ],
    "Purchase Price": "50 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools (Enchanted)",
        "Arcane Focus",
        "Preservation Salts",
        "Container(s), Large"
      ]
    },
    "Cooking": {
      "Method": "Can be cooked, boiled, fried, or dried.",
      "Required Kit": [
        "Cook's Utensils (Enchanted)",
        "Alchemist's Kit",
        "Magical Heat Source"
      ]
    },
    "Notes": "Dragon parts are highly valuable to wizards and alchemists, making eating them, raw or cooked, \"almost sacrilegious\"."
  },
  {
    "Name": "Golem Runestone Powder",
    "Description": "Ground from an inert golem runestone.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Mountain",
      "Underdark",
      "Urban"
    ],
    "Effects": [
      "Said to provide a grounding sensation or aid in mental focus.",
      "As an ingredient, if the consumer misses an attack roll or fails an ability check, they can use their reaction to add a +2 bonus to the roll, potentially turning a miss into a hit or a failed check into a success. Lasts for one hour.",
      "When the consumer rolls below 10 on an attack roll, ability check, or saving throw, they can use a reaction to instead get a 10. Lasts for one hour.",
      "It can provide temporary hit points equal to the consumer's proficiency bonus and resistance to bludgeoning, piercing, and slashing damage from non-magical attacks for 1 hour."
    ],
    "Purchase Price": "1 sp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Mason's Tools",
        "Mortar and Pestle",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Mortar and Pestle",
        "Non-Reactive Cookware"
      ]
    }
  },
  {
    "Name": "Gorgon Meat",
    "Description": "Extremely tough and sinewy, tasting strongly of minerals and earth. It is described as \"High-quality beef with opalescent fat\". Gorgons can be farmed.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Desert",
      "Hill",
      "Mountain",
      "Wasteland"
    ],
    "Effects": [
      "Requires extensive cooking to be palatable. Gorgon steaks are \"Normal Meat,\" which means they can potentially heal 1 HP or an additional HP (on a d6 roll of 6), or cause queasiness and gassiness (on a d6 roll of 1 with a failed Constitution save).",
      "Gorgon milk (not the meat) is very nutritious and provides total immunity to poison for 1 hour after ingestion."
    ],
    "Purchase Price": "3 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Bone Saw",
      ]
    },
    "Cooking": {
      "Method": "Requires extensive cooking to be palatable.",
      "Required Kit": [
        "Cook's Utensils",
        "Pot, Large"
      ]
    }
  },
  {
    "Name": "Goristro Blood (Congealed Brute Force)",
    "Description": "This is congealed, dark blood from a Goristro. Its consumption is described as a \"ritual\".",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Any"
    ],
    "Effects": [
      "Drinking it is said to temporarily grant immense physical resilience and destructive power, but at the cost of refined thought.",
      "If prepared by an expert: when a creature within 20 feet of the consumer makes an attack or saving throw, the consumer can use their reaction to reduce that creature’s roll by 1d4; when a creature within 10 feet of the consumer hits them with an attack, the consumer can use a reaction to deal cold or fire damage (their choice) equal to 1d8 + their Intelligence modifier to the attacker."
    ],
    "Purchase Price": "50 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Method": "This ingredient is said to be \"ritually consumed\".",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Gray Ooze (ooze)",
    "Description": "This is an ooze creature. It is similar to Gelatinous Cube, and if eaten raw, it may taste like \"battery acid and slowly spreading numbness\" and can numb an aching tooth. Its matter can be consumed.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Forest",
      "Swamp",
      "Underdark",
      "Urban"
    ],
    "Effects": [
      "This ingredient If eaten raw, a handful can remove the sting of any wound, and a small bite can numb an aching tooth.",
      "If used as a soup base, it pre-digests tough meats and vegetables, making them more palatable.",
      "If prepared by an expert, the consumer reduces any acid or poison damage they take by 1dThey also gain a 1d4 bonus to any check or saving throw against becoming grappled or restrained.",
      "When the consumer makes an ability check or saving throw to end an effect that renders them grappled or restrained, they can use a reaction to automatically succeed on the check or save."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Container(s)",
        "Scoop"
      ]
    },
    "Cooking": {
      "Method": "It can be eaten raw or used as a soup base.",
      "Required Kit": [
        "Cook's Utensils",
        "Pot, Large",
        "Fine Strainer"
      ]
    },
    "Notes": "This ingredient dissipates or degrades after 1 minute if not collected."
  },
  {
    "Name": "Green Dragon Meat",
    "Description": "This meat is bitter, earthy, and has a strong acidic component. It tastes of \"raw magic,\" feels heavy but flakes like fish, and consuming it can result in cosmetic improvements like no cavities, better breath, vanishing bald spots, and improved eyesight, making one feel like \"the 'after' picture in a thousand internet ads\". Green dragon meat specifically tends to be sour. Eating dragon parts, raw or cooked, is \"almost sacrilegious\" due to their value to wizards and alchemists. Harvesting dragon components is not easy, requiring appropriate knowledge, tools, and storage. Dragoncrafting is \"rare and difficult\".",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Forest",
      "Swamp"
    ],
    "Effects": [
      "Consuming it might cause discomfort but can provide a fleeting resistance to acid.",
      "This ingredient can grant resistance to the dragon's damage type (Acid for Green Dragon). Alternatively, it can grant a fly speed equal to walking speed, or allow the consumer to exhale a 15-foot cone of acid damage as a bonus action, dealing a number of d6s equal to the consumer's proficiency bonus on a failed Dexterity saving throw, or half as much on a success."
    ],
    "Purchase Price": "3 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools (Enchanted)",
        "Arcane Focus",
        "Preservation Salts",
        "Container(s), Large"
      ]
    },
    "Cooking": {
      "Method": "It can be cooked, boiled, fried, or dried.",
      "Required Kit": [
        "Cook's Utensils (Enchanted)",
        "Alchemist's Kit",
        "Magical Heat Source"
      ]
    }
  },
  {
    "Name": "Green Hag Broth (purified)",
    "Description": "This is a foul-smelling but potent broth made from the flesh of a Green Hag, purified through dark rituals. Its preparation requires \"dark rituals,\" implying a difficult and specialized process.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Forest",
      "Swamp"
    ],
    "Effects": [
      "This ingredient grants fleeting knowledge of secrets or the ability to mimic voices. It"
    ],
    "Purchase Price": "50 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Alchemist's Kit",
        "Ritual Components",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot, Large",
        "Distillation Apparatus"
      ]
    }
  },
  {
    "Name": "Green Slime (slime)",
    "Description": "This is a common slime. If eaten raw, it causes an \"instant, horribly painful, and deeply shameful death\".",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Swamp",
      "Underdark",
      "Urban"
    ],
    "Effects": [
      "If properly cooked in a Pot, it becomes a \"nutritious green soup\".",
      "As a \"nutritious green soup\", it provides sustenance, and can potentially heal 1 HP or an additional HP (on a d6 roll of 6), or causing queasiness and gassiness (on a d6 roll of 1 with a failed Constitution save)."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Container(s)"
      ]
    },
    "Cooking": {
      "Method": "It must be \"properly cooked in a Pot\".",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Grell Tentacle (prepared)",
    "Description": "This ingredient is rubbery and bland.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underdark"
    ],
    "Effects": [
      "It is a source of protein and some claim it dulls sensitivity to pain temporarily."
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Grick Tentacle (cooked)",
    "Description": "This ingredient is rubbery and bland.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Forest",
      "Hill",
      "Jungle",
      "Swamp",
      "Underdark"
    ],
    "Effects": [
      "It is a reliable source of protein in dangerous subterranean environments."
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Griffin Feather Bloom",
    "Description": "This is a flower found in areas frequented by griffins.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Grassland"
    ],
    "Effects": [
      "Its petals, when eaten, are said to sharpen senses slightly."
    ],
    "Purchase Price": "1 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Fine Clippers",
        "Basket"
      ],
      "Seasons": [
        "Spring"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Griffin Thigh (cooked)",
    "Description": "This meat is lean, tough, and faintly metallic-tasting. It also whitens your teeth. The flesh tastes like \"Chicken rolled in flour or fine sand\". The meat is described as \"lean, tough\", suggesting it might require some effort to tenderize.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Grassland",
      "Hill",
      "Mountain"
    ],
    "Effects": [
      "This ingredient provides a sense of heightened awareness when consumed. It acts as \"Normal Meat,\" which means it can potentially heal 1 HP or an additional HP (on a d6 roll of 6), or conversely, to become queasy and gassy (on a d6 roll of 1 with a failed Constitution save).",
      "If cooked over a pure coal fire, it gains a +2 bonus to the roll for these effects.",
      "It also whitewashes your teeth."
    ],
    "Purchase Price": "3 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Plucking Tools"
      ]
    },
    "Cooking": {
      "Method": "It is consumed \"cooked\".",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Griffon Egg",
    "Description": "This is a large, highly nutritious egg.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Hill",
      "Mountain"
    ],
    "Effects": [
      "It is highly nutritious. This ingredient"
    ],
    "Purchase Price": "3 sp per unit",
    "Harvesting": {
      "Required Kit": [
        "Container(s)"
      ],
      "Seasons": [
        "Spring"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Grime Berry",
    "Description": "This is a tart, resilient berry that grows in cracks in pavement, often with a slightly metallic taste.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Urban"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Basket",
        "Gloves, Durable"
      ],
      "Seasons": [
        "Late Autumn"
      ]
    },
    "Cooking": {
      "Method": "It can be eaten directly as a berry.",
      "Required Kit": [
        "Cook's Utensils",
        "Pot, Large"
      ]
    }
  },
  {
    "Name": "Grimshroom",
    "Description": "This is a sickly-looking, pale mushroom that grows in highly toxic areas. Its growth in \"highly toxic areas\" and potential for \"minor poison damage\" implies that harvesting and preparing it might be risky or require careful handling.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Underdark"
    ],
    "Effects": [
      "Eating it can cause minor poison damage.",
      "It might also offer a temporary resistance to a specific poison type or a brief burst of strange energy."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Grizzly Bear Claw (ground)",
    "Description": "This is a claw from a grizzly bear that, when ground, can be used as a toughening agent in certain dishes, imparting a subtle, wild flavor.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Mountain"
    ],
    "Effects": [
      "It is used as a toughening agent in dishes.",
      "It imparts a subtle, wild flavor."
    ],
    "Purchase Price": "3 sp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Method": "It must be \"ground\" and used \"in certain dishes\".",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Grizzly Bear Loin",
    "Description": "This meat is rich, fatty, and flavorful. Bear meat in general is described as \"Oily, extremely fatty, but also faintly bitter pork\".",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Hill",
      "Mountain"
    ],
    "Effects": [
      "This ingredient It is considered \"Normal Meat\", so after consumption, there is a chance to heal 1 HP or an additional HP (on a d6 roll of 6), or conversely, to become queasy and gassy (on a d6 roll of 1 with a failed Constitution save)."
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ],
      "Seasons": [
        "Autumn"
      ]
    },
    "Cooking": {
      "Method": "It can be cooked, boiled, fried, or dried like other meats.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Ground Cherry",
    "Description": "This is a small, sweet fruit encased in a papery husk.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Grassland"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Late Summer"
      ]
    },
    "Cooking": {
      "Method": "It can be eaten raw.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Grung Flesh (Carefully Prepared)",
    "Description": "This is small, lean meat. It is highly poisonous if not prepared carefully, due to toxins in the skin. Its preparation requires \"extremely careful preparation to neutralize the toxins in their skin,\" making it a highly difficult and risky item to prepare. Grung flesh is considered Rare.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Jungle",
      "Swamp"
    ],
    "Effects": [
      "If \"carefully prepared\" to neutralize toxins, it would likely yield the effects of \"Normal Meat\": potentially healing 1 HP or an additional HP (on a d6 roll of 6), or causing queasiness and gassiness (on a d6 roll of 1 with a failed Constitution save). If not properly prepared, it is \"highly poisonous\"."
    ],
    "Purchase Price": "3 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Method": "Requires \"extremely careful preparation to neutralize the toxins in their skin\".",
      "Required Kit": [
        "Poisoner's Kit",
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Hawthorn Berries",
    "Description": "Small, tart berries, good for jams or jellies.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest",
      "Grassland",
      "Hill",
      "Urban"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife"
      ],
      "Seasons": [
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Heat Shimmer Fungus",
    "Description": "A bioluminescent fungus that grows on rock formations.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Desert"
    ],
    "Effects": [
      "Provides a cooling sensation when eaten."
    ],
    "Purchase Price": "1 sp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Hill Giant Steak",
    "Description": "Massive cuts of meat that are surprisingly palatable, often retaining a subtle coolness even when cooked. Known for being incredibly filling. It is also described as coarse, greasy, and somewhat musky, and extremely tough and sinewy, requiring long cooking.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Forest",
      "Hill"
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Knife",
        "Cook's Utensils"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Hill Giant's Nail",
    "Description": "A large, tough, hoof-shaped fungus that grows on ancient trees or massive boulders, requiring considerable effort to prepare.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Hill"
    ],
    "Effects": [
      "It is very filling.",
      "This ingredient can also be used for a Potion of Flying."
    ],
    "Purchase Price": "1 sp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Hillside Geode Water",
    "Description": "Water collected from within geodes found on hills. It's mineral-rich and often has a unique, slightly effervescent quality.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Hill"
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Container(s)"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Hillside Thyme",
    "Description": "A fragrant herb that grows abundantly on hillsides.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Hill"
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "mid Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Hobgoblin Flesh",
    "Description": "Lean and tough, with a strong, gamey flavor. One source also describes it as \"Fatty pork, acidic aftertaste.\" It is listed under \"THE MEAT IS MADE OF PEOPLE!\".",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Desert",
      "Forest",
      "Hill"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Honey Fungus",
    "Description": "A common, often parasitic fungus that grows in large clusters at the base of trees.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Forest"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Autumn"
      ]
    },
    "Cooking": {
      "Method": "Edible when cooked, though some varieties can be tough.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Hook Horror Meat",
    "Description": "Tough, stringy, but edible and very filling. Hook horrors also provide hooks that can be used for alchemy or practical purposes.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underdark"
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Horse Meat",
    "Description": "Often lean and slightly sweet. Also described as \"Stringy mutton, lots of crunchy bits\".",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Grassland",
      "Hill"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Butcher's Tools"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Humanoid Organ Meat (Generic)",
    "Description": "Sourced from criminal elements or desperate circumstances.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Urban"
    ],
    "Effects": [
      "Edible, but carries immense moral implications."
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Hydra Head (cooked)",
    "Description": "Incredibly dangerous to harvest, each head provides abundant, unique meat with lingering elemental properties. The flavor is described as acidic, fish-like, and greasy, with thick black blood coating everything. If the hydra regenerates, specific preparation (soaking the heart in saltwater and cooking it almost to dryness) is required to avoid negative effects. The DC for harvesting a hydra skull is 8, and for its heart is 15.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Jungle",
      "Swamp"
    ],
    "Effects": [
      "Provides abundant, unique meat with lingering elemental properties. Depending on preparation and whether the hydra regenerates, consuming it can lead to various outcomes:",
      "Horribly Painful Death: If its meat is not prepared by soaking the heart in saltwater and cooking it almost to dryness, the consumer risks bursting in 1 round, spraying blood and releasing 1d6 hydra larvae.",
      "Delayed Horribly Painful Death: Occurs in 1d6 days.",
      "Burst of Regeneration: The consumer heals fully, is cured of any non-magical diseases, and regrows any missing limbs or features with a loud popping sound. Missing limbs have a 1-in-10 chance of ending in mouths instead of hands or feet.",
      "Hydra’s Venom: The consumer grows 2 deadly poisonous fangs (d6 damage).",
      "Hydra’s Power: As Hydra’s Venom, and the consumer permanently gains +1 Strength and Dexterity.",
      "Hydra’s Blessing: As Hydra’s Power, and the consumer also regenerates 1d6 hit points per round. If a limb is lost, it regrows in 1d6 days (with a 1-in-10 chance of ending in mouths). If decapitated, the consumer can make a saving throw to grow two new heads."
    ],
    "Purchase Price": "50 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Method": "Must be cooked.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Hydrothermal Clay",
    "Description": "Soft, mineral-rich clay found near underwater volcanic vents. Can be used as a paste or thickener. It imparts a distinct earthy, savory flavor.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Underwater"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Trowel"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Method": "Can be used as a paste or thickener.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Hydrothermal Yam",
    "Description": "A starchy, heat-resistant yam that grows near underwater vents, surprisingly soft and sweet.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Underwater"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Autumn"
      ]
    },
    "Cooking": {
      "Method": "cooked",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Ice Cap Mushroom",
    "Description": "An edible mushroom that grows on frozen surfaces. It tastes faintly of mint.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Arctic"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife"
      ],
      "Seasons": [
        "Winter"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Ice Crystal Dust",
    "Description": "Fine, magically charged ice crystals.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Arctic"
    ],
    "Effects": [
      "Provides a fleeting burst of invigorating cold energy when consumed."
    ],
    "Purchase Price": "1 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Container(s)"
      ]
    },
    "Cooking": {
      "Method": "Consumed directly."
    }
  },
  {
    "Name": "Ice Drake Scales (flaked)",
    "Description": "Small edible flakes from the skin between scales.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Arctic"
    ],
    "Effects": [
      "Provides a cooling sensation or minor ice resistance when consumed."
    ],
    "Purchase Price": "1 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Chisel"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Ice Mephit Shard",
    "Description": "A chip of frozen essence from an Ice Mephit.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Arctic"
    ],
    "Effects": [
      "Tastes distinctly of mint and provides a temporary cooling effect when ingested."
    ],
    "Purchase Price": "1 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit"
      ]
    },
    "Cooking": {
      "Method": "Can be ingested."
    }
  },
  {
    "Name": "Ignimbrite Mite Core (Sulphur component)",
    "Description": "A mineral core associated with the mite's essence, found in volcanic regions. It is not meat, and its sulfur component can be used as a powerful, albeit pungent, seasoning. The flavor is Sulphur.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Mountain",
      "Underdark"
    ],
    "Effects": [
      "Can be used as a powerful, pungent seasoning.",
      "Eating one alive automatically inflicts the curse of the ignimbrite mite and 8 damage."
    ],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit"
      ]
    },
    "Cooking": {
      "Method": "Used as seasoning.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Imp Blood (Congealed)",
    "Description": "Congealed, dark blood from a defeated Imp, tasting of sulfur and malice.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Any"
    ],
    "Effects": [
      "Consuming it might grant minor darkvision, a brief surge of cunning, or a sense of unease.",
      "If prepared by an expert (Fiend ingredient), the consumer gains a 1d4 bonus to Strength checks and saving throws, and can use a bonus action to gain a 1d6 bonus to their next attack and damage roll before the start of their next turn."
    ],
    "Purchase Price": "15 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Method": "Can be consumed.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Infernal Brimstone Shard",
    "Description": "A shard of solidified brimstone found at the site of a defeated Devil. It leaves an acrid aftertaste.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Any"
    ],
    "Effects": [
      "Provides a burning sensation and temporary fire resistance when consumed.",
      "If prepared by an expert, the consumer gains a 1d4 bonus to Strength checks and saving throws, and can use a bonus action to gain a 1d6 bonus to their next attack and damage roll before the start of their next turn."
    ],
    "Purchase Price": "5 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Pick"
      ]
    },
    "Cooking": {
      "Method": "Can be consumed.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Intellect Devourer Brain (processed)",
    "Description": "Extremely dangerous and morally dubious brain tissue, which is highly potent. Its flavor is like fat, greasy worms in chicken soup, with not much flavor and no real texture.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underdark"
    ],
    "Effects": [
      "When processed, it might grant temporary, fleeting psionic abilities.",
      "If eaten warm and raw:",
      "1-4 chance: Madness for 1d6 days.",
      "5-6 chance: Duel for Control (Save vs Intelligence, on failure, the intellect devourer possesses you).",
      "7-8 chance: Mind’s Eye (read surface thoughts within 30 feet for 24 hours).",
      "9-10 chance: Mind Feeder (permanently gain +2 Intelligence; desire souls of powerful spellcasters and scholars; inhaling a dying person's soul fully heals and grants +2 Intelligence for 24 hours).",
      "If prepared by an expert, the consumer gains proficiency in one Intelligence skill (or expertise if already proficient) OR darkvision to 30 feet (seeing through magical darkness).",
      "Additionally, when the consumer takes psychic damage, they can use a reaction to reduce it by 1d4 points.",
      "They can also speak telepathically to any creature within 30 feet who also consumed the same meal."
    ],
    "Purchase Price": "15 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "Extremely dangerous and morally dubious to acquire. Must be eaten warm and raw for certain specific effects."
  },
  {
    "Name": "Iron Golem Rust Flakes (purified)",
    "Description": "Microscopic flakes of purified rust from an iron golem. They provide iron and a metallic tang to food. The golem's material is metal or stone, which cannot be chewed and must be swallowed whole.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Mountain",
      "Underdark",
      "Urban",
      "Wasteland"
    ],
    "Effects": [
      "Provides iron and a metallic tang to food.",
      "Provides a new save against poison or disease. The residual magic lasts for 1 month.",
      "If prepared by an expert, the consumer gains temporary hit points equal to their proficiency bonus and resistance to bludgeoning, piercing, and slashing damage from nonmagical attacks.",
      "When the consumer misses an attack roll or fails an ability check, they can use their reaction to add a +2 bonus to the roll.",
      "When the consumer rolls below 10 on an attack roll, ability check, or saving throw, they can use a reaction to instead get a 10."
    ],
    "Purchase Price": "1 sp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Mortar and Pestle",
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Irradiated Water Algae",
    "Description": "Algae that grows in contaminated water sources.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Wasteland"
    ],
    "Effects": [
      "Can be consumed for basic sustenance.",
      "Comes with risks."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Method": "Can be consumed for sustenance."
    }
  },
  {
    "Name": "Jackfruit (wild varieties)",
    "Description": "A very large, complex fruit.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Jungle"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Sunchoke",
    "Description": "A tuber, often found in disturbed soil on hills.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest",
      "Grassland",
      "Hill",
      "Urban"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Digging Tools"
      ],
      "Seasons": [
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Jungle Vine Fruit",
    "Description": "Various sweet and tangy fruits that grow on vines.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Jungle"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Juniper Berries",
    "Description": "Used as a seasoning, though technically cones. Used as a seasoning.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Arctic",
      "Forest",
      "Hill",
      "Mountain"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife"
      ],
      "Seasons": [
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Kelp Fronds",
    "Description": "Long, edible seaweed that can be used in soups or dried.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Coastal",
      "Underwater"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Ki-rin Horn Shard (ground)",
    "Description": "A minuscule shard of a Ki-rin's horn, found in a sacred, high-altitude sanctuary. When ground and consumed, it's said to briefly cleanse negative effects and bestow clarity of thought.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Mountain"
    ],
    "Effects": [
      "Said to briefly cleanse negative effects and bestow clarity of thought.",
      "If prepared from a Celestial ingredient, the consumer gains the following culinary benefits:",
      "When the consumer takes radiant damage, they can use a reaction to reduce it by 1d8.",
      "The consumer gains a +3 bonus to Charisma (Persuasion) checks. Lasts for one minute.",
      "As an action, the consumer can cast cure wounds (using their Intelligence for the spellcasting ability), expending additional uses to increase the spell's level."
    ],
    "Purchase Price": "50 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Chisel",
        "Mortar and Pestle"
      ]
    },
    "Preparation": {
      "Method": "Must be ground."
    },
    "Cooking": {
      "Method": "Consumed after being ground, implying it can be incorporated into a meal.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "The flesh of a Ki-rin is prized by alchemists because it acts as a filter to remove impurities from any liquid."
  },
  {
    "Name": "Kobold Flesh",
    "Description": "Small, scaly, and somewhat reptilian in taste.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underdark"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Kola Nut",
    "Description": "Similar to Cacao, a stimulating nut.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Jungle"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Kraken Ink Sac (prepared)",
    "Description": "When properly processed and diluted, can be used as a dark, flavorful seasoning.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Underwater"
    ],
    "Purchase Price": "1 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit"
      ]
    },
    "Cooking": {
      "Method": "Used as a seasoning.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Kraken Tentacle (cooked)",
    "Description": "Massive, tough, and chewy, but incredibly filling and rumored to grant temporary powerful strength.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underwater"
    ],
    "Effects": [
      "Incredibly filling and rumored to grant temporary powerful strength.",
      "The consumer gains blindsight up to 10 feet and darkvision up to 30 feet.",
      "As a bonus action, the consumer can gain a climb or swim speed equal to their walking speed until the end of their next turn.",
      "Effects last for one minute."
    ],
    "Purchase Price": "50 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife"
      ]
    },
    "Cooking": {
      "Method": "Must be cooked.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Kuo-Toa Flesh",
    "Description": "Slimy and fishy, generally considered unpalatable but edible.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underwater"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Lamb's Quarters (Wild Spinach)",
    "Description": "A common weed with edible leaves.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest",
      "Grassland",
      "Hill",
      "Urban",
      "Wasteland"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Lamp Post Fungus",
    "Description": "A strange, resilient fungus that grows on artificial light sources.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Urban"
    ],
    "Effects": [
      "Said to aid in alertness."
    ],
    "Purchase Price": "1 sp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Scraper",
        "Container(s)"
      ],
      "Seasons": [
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Lingonberry",
    "Description": "A tart, red berry, similar to a cranberry.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Arctic",
      "Forest",
      "Mountain"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Late Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Linquë súrisse",
    "Description": "Long grass known for its rippling waves when windy. It is consumed as a tea to embolden warriors.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Grassland"
    ],
    "Effects": [
      "When prepared as an infusion and ingested, at the beginning of the consumer's next turn, the frightened condition is removed, and the consumer gains advantage on all saving throws against being frightened for 30 minutes.",
      "This herb has no effect if used again on the same creature until they complete a short rest."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Spring"
      ]
    },
    "Cooking": {
      "Method": "Not applicable, as this is an herbal preparation."
    }
  },
  {
    "Name": "Lissuin",
    "Description": "Stems from a fragrant flower which are drunk in tea to refresh the spirit.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Desert"
    ],
    "Effects": [
      "Consumer's exhaustion level is reduced by one.",
      "This herb has no effect if used again on the creature until it completes a long rest."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Spring"
      ]
    },
    "Cooking": {
      "Method": "Not applicable, as this is an herbal preparation."
    }
  },
  {
    "Name": "Lizardfolk Flesh",
    "Description": "Stringy and gamey, often tough, but edible.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Swamp"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Cook's Utensils"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Lizardfolk Tail Meat",
    "Description": "Scaly, tough, and distinctly fishy. A common source of protein in swamps.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Coastal",
      "Jungle",
      "Swamp"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Cook's Utensils"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Lobster/Shrimp/Prawn",
    "Description": "Rich, sweet shellfish meat.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Coastal"
    ],
    "Effects": [
      "Consuming it has a 2-in-3 chance of no extra effect.",
      "There's a 1-in-6 chance of healing 1 HP, or 1 additional HP.",
      "There's also a 1-in-6 chance of becoming queasy and gassy (requiring a Constitution saving throw or losing any meal benefits)."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Fishing Net",
        "Knife",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot"
      ]
    }
  },
  {
    "Name": "Lotus Seeds",
    "Description": "Prized for their subtle, starchy sweetness and creamy texture when cooked. They can be incorporated into various dishes, from savory stir-fries and soups to sweet desserts and confections. Beyond their culinary uses, some culinarians believe they possess calming properties, aiding in focus and inner peace during stressful cooking endeavors.",
    "Ingredient Type": "Plant-based",
    "Purchase Price": "1 sp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Lotus Root",
    "Description": "The starchy rhizome of the lotus plant.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Swamp",
      "Underwater"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Lung Lichen",
    "Description": "A leaf-like lichen that is green and leathery and grows on broadleaf tree trunks.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Forest"
    ],
    "Effects": [
      "When a creature drinks the infusion, at the beginning of their next turn they regain 4 (2d4) hit points.",
      "This herb has no effect when used again on the creature until it completes a long rest."
    ],
    "Purchase Price": "1 sp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Preparation": {
      "Method": "Prepared as an infusion."
    },
    "Cooking": {
      "Method": "Not applicable, as this is an herbal preparation."
    }
  },
  {
    "Name": "Magmin Core (crystallized)",
    "Description": "A solidified, hot crystal from a Magmin's core, typically found in geothermal subterranean areas. It provides internal warmth and minor fire resistance.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Mountain",
      "Underdark"
    ],
    "Effects": [
      "Provides internal warmth and minor fire resistance."
    ],
    "Purchase Price": "1 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Mallos",
    "Description": "A golden bell flower usually found in windsweep hills that can be used for weakening the will.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Grassland"
    ],
    "Effects": [
      "After ingesting the powder, the creature must make a DC 10 Constitution saving throw. On a failed save, the creature is affected for 10 minutes as if the spell Suggestion was cast on them. This herb has no effect when used again on the same creature until the creature completes a short rest."
    ],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Preparation": {
      "Method": "Prepared as powder (ingested)."
    }
  },
  {
    "Name": "Mammoth Marrow",
    "Description": "Rich, fatty marrow found in the bones of recently deceased mammoths. It is highly nutritious.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Arctic"
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Bone Saw"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Mammoth Meat",
    "Description": "Rich, fatty, and highly nutritious. It can be tough but is very filling.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Arctic"
    ],
    "Effects": [
      "On a d6 roll of 1: Consumer must make a Constitution saving throw or lose any benefit from the meal, and spend the rest of the day queasy and gassy.",
      "On a d6 roll of 2-5: No extra effect.",
      "On a d6 roll of 6: Delicious! Consumer heals 1 HP, or 1 additional HP."
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Method": "Requires 12+ hours of boiling.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Mammoth Squash",
    "Description": "A large, tough-skinned squash that grows in rare, protected arctic valleys, and stores well.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Arctic"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Container(s)"
      ],
      "Seasons": [
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot, Large"
      ]
    }
  },
  {
    "Name": "Manes Essence (Crystallized)",
    "Description": "The vile, crystallized essence of a defeated Manes demon. Consuming it causes fleeting madness, disturbing visions, but might also reveal obscured dark truths.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Any"
    ],
    "Effects": [
      "When a creature within 20 feet of the consumer makes an attack or saving throw, the consumer can use their reaction to reduce that creature’s roll by 1d4.",
      "When a creature within 10 feet of the consumer hits them with an attack, the consumer can use a reaction to deal cold or fire damage (their choice) equal to 1d8 + their Intelligence modifier to the attacker."
    ],
    "Purchase Price": "3 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Mango (wild varieties)",
    "Description": "Smaller, fibrous, and often more intensely flavored.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Jungle"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Mangrove Apple",
    "Description": "A tart, refreshing fruit that grows in mangrove swamps within the jungle.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Jungle"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife",
        "Bag, Waterproof"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Manticore Meat",
    "Description": "Lean, gamey, and tough, often with a faint sulfuric aftertaste from its spikes.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Hill",
      "Mountain",
      "Wasteland"
    ],
    "Effects": [
      "On a d6 roll of 1: Consumer must make a Constitution saving throw or lose any benefit from the meal, and spend the rest of the day queasy and gassy.",
      "On a d6 roll of 2-5: No extra effect.",
      "On a d6 roll of 6: Delicious! Consumer heals 1 HP, or 1 additional HP.",
      "Consuming Manticore meat requires a d10 roll for additional effects:",
      "1-3: Rumours. Make up 1 rumour about each other player. Players secretly vote on 1 rumour. That rumour becomes believed, although it is not necessarily true.",
      "4-7: Spite. Make a Save or hate a random nearby person for the next 7 days. Consumers will not kill them, but would not mind seeing them die. Consumers can attempt this Save once per round.",
      "8-10: Lies. Consumers cannot tell the truth, unless the truth would be more devastating than any lie or omission. This effect ends only if the consumer spends the night in a church."
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Method": "Requires cooking",
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "Manticores are surly, hateful creatures, full of secrets and spite."
  },
  {
    "Name": "Marian",
    "Description": "Sap from a thistle plant with purple flowers and pale green leaves with white veins, used to detoxify.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Desert"
    ],
    "Effects": [
      "After ingesting this juice, at the beginning of the creature's next turn they gain the effect of drinking an antitoxin which lasts for 2 minutes.",
      "This herb has no effect when used again on the creature until the creature completes a long rest."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Spring"
      ]
    },
    "Expiration": "Expires after 1 month."
  },
  {
    "Name": "Merfolk Flesh",
    "Description": "Similar to human or fish, but often considered taboo.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underwater"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Knife",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Grilling Rack", "Smoking Kit"
      ]
    }
  },
  {
    "Name": "Merfolk's Purse",
    "Description": "A type of seaweed pod said to contain restorative properties, though often hard to open.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Coastal"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Pry Bar",
        "Chisel",
        "Bag, Waterproof"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Mortar and Pestle"
      ]
    }
  },
  {
    "Name": "Merrow Blood Coral",
    "Description": "A rare, vibrant coral that, when ground and ingested, can provide a temporary boost to swimming speed.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Underwater"
    ],
    "Effects": [
      "Can provide a temporary boost to swimming speed."
    ],
    "Purchase Price": "5 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Chisel",
        "Container(s)",
        "Underwater Breathing Apparatus"
      ]
    },
    "Preparation": {
      "Method": "ground"
    },
    "Cooking": {
      "Required Kit": [
        "Alchemist's Kit",
        "Mortar and Pestle",
        "Non-Reactive Cookware"
      ]
    }
  },
  {
    "Name": "Merrow Flesh",
    "Description": "Stringy and fishy, but edible as a last resort.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Coastal"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Knife",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot"
      ]
    }
  },
  {
    "Name": "Mesquite Pods",
    "Description": "Sweet, edible pods that can be ground into flour.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Desert",
      "Wasteland"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Mortar and Pestle"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Mezzoloth Carapace Shard",
    "Description": "A sharp, chitinous shard from a Mezzoloth's carapace. When ground and ingested, it might provide a brief, unsettling sense of inevitability or a minor, temporary resistance to poison.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Any"
    ],
    "Effects": [
      "Might provide a brief, unsettling sense of inevitability.",
      "Might provide a minor, temporary resistance to poison.",
      "If prepared by an expert (Fiend ingredient):",
      "When a creature within 20 feet of the consumer makes an attack or saving throw, the consumer can use their reaction to reduce that creature’s roll by 1d4.",
      "When a creature within 10 feet of the consumer hits them with an attack, the consumer can use a reaction to deal cold or fire damage (their choice) equal to 1d8 + their Intelligence modifier to the attacker."
    ],
    "Purchase Price": "50 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Chisel",
        "Container(s)"
      ]
    },
    "Preparation": {
      "Method": "ground"
    },
    "Cooking": {
      "Required Kit": [
        "Alchemist's Kit",
        "Mortar and Pestle",
        "Non-Reactive Cookware"
      ]
    }
  },
  {
    "Name": "Mildew Bloom",
    "Description": "A rapidly spreading, thin layer of fungus that grows on damp organic matter. While not typically eaten directly, it might be used as a minor leavening agent (like a wild yeast).",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Forest",
      "Swamp",
      "Underdark",
      "Urban"
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Scraper",
        "Container(s)"
      ],
      "Seasons": [
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Mimic Meat (cooked)",
    "Description": "When thoroughly cooked, the amorphous flesh of a mimic becomes chewy and bland, but It tastes like delicious, rubbery fish inside a hard outer shell.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Coastal",
      "Forest",
      "Urban"
    ],
    "Effects": [
      "On a d6 roll of 1: Consumer must make a Constitution saving throw or lose any benefit from the meal, and spend the rest of the day queasy and gassy.",
      "On a d6 roll of 2-5: No extra effect.",
      "On a d6 roll of 6: Delicious! Consumer heals 1 HP, or 1 additional HP."
    ],
    "Purchase Price": "3 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Method": "Must be thoroughly cooked.",
      "Required Kit": [
        "Cook's Utensils",
        "Pot, Large"
      ]
    },
    "Notes": "A large mimic served with butter is a true feast. Mimics are crustacean-like and revert to their true forms if killed."
  },
  {
    "Name": "Mind Flayer Brain (prepared)",
    "Description": "Highly prized delicacy among certain creatures, consuming it can temporarily enhance psychic abilities or grant minor psionic resistance. It is extremely rubbery, with faint hints of wine and sulphur.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underdark"
    ],
    "Effects": [
      "When processed, it might grant temporary, fleeting psionic abilities.",
      "If eaten warm and raw (Mind Flayer brain only):",
      "1-4 chance: Madness for 1d6 days.",
      "5-6 chance: Duel for Control. Make a Save vs Intelligence. On a failure, the intellect devourer possesses the consumer. On a success, no extra effect.",
      "7-8 chance: Mind’s Eye. For the next 24 hours, consumer can read the surface thoughts of anyone within 30’.",
      "9-10 chance: Mind Feeder. Consumer permanently gains +2 Intelligence; desires souls of powerful spellcasters and scholars; inhaling a dying person's soul fully heals and grants +2 Intelligence for 24 hours.",
      "If prepared by an expert:",
      "When the consumer takes psychic damage, they can use a reaction to reduce it by 1d8.",
      "The consumer can speak telepathically to any creature within 30 feet who also consumed the same meal, provided they share a language.",
      "When the consumer deals damage to a creature within 20 feet for the first time in a turn, they can deal an additional 3 psychic damage to the target (no action required)."
    ],
    "Purchase Price": "15 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Knife",
        "Vials",
        "Psychic Dampeners"
      ]
    },
    "Preparation": {
      "Method": "processed"
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Non-Reactive Cookware",
        "Alchemist's Kit"
      ]
    },
    "Notes": "Mind flayer tentacles are an acquired taste, but some people consider them a delicacy."
  },
  {
    "Name": "Miner's Moss",
    "Description": "A moss found in rocky caves and fissures on hills, said to provide a slight energy boost.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Hill"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Scraper",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Mire Mallow",
    "Description": "A soft, edible plant that grows in stagnant water, used for soothing sore throats.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Mountain",
      "Swamp"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Trowel",
        "Bag, Waterproof"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Mollusk Meat (Clams, Mussels, Oysters, Scallops)",
    "Description": "Briny, soft, often sweet.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Coastal"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Pry Bar",
        "Knife",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot"
      ]
    }
  },
  {
    "Name": "Mondmilch",
    "Description": "Explicitly described as \"light, not food,\" and tasting \"just like moonlight,\" this is an ethereal or magical substance, not a biological ingredient. The real trick is to wound it, force it into a corner, and bottle it.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Underdark"
    ],
    "Effects": [
      "Requires drinking at least one litre.",
      "1-3: Purified. Consumers are cured of any mundane or magical diseases, other than lycanthropy.",
      "8-9: Vistas. Consumers can see through 10 feet of stone as if it were glass. Consumer glows bright as a candle. Consumer is slightly sticky. This effect lasts 1d6 hours.",
      "10: Vast Vistas. Save vs Wis (DC of Mondmilch's CR) or go permanently insane. If consumer passes the saving throw, the consumer can choose to weigh as much as a feather, can only be harmed by silver weapons and magical weapons, spells targeting consumer have a 1-in-6 chance of reflecting back at their casters, the consumer does not age.",
      "All these Vast Vistas effects come at a price: Consumers will inflict terror and fear whenever possible."
    ],
    "Purchase Price": "20 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Container(s)",
        "Ethereal Net"
      ]
    },
    "Preparation": {
      "Method": "Must be purified immediately."
    },
    "Duration": "Vistas lasts 1d6 hours. Vast Vistas effects are permanent.",
    "Notes": "If you kill it, you have only killed light."
  },
  {
    "Name": "Moss (certain varieties)",
    "Description": "Some mosses are edible, though not highly nutritious.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Arctic",
      "Coastal",
      "Forest",
      "Mountain",
      "Swamp",
      "Underdark",
      "Urban",
      "Wasteland"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Scraper",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Mossheart",
    "Description": "A type of moss that grows around ancient trees, said to provide a sense of calm.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Forest"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Mountain Berry (Hill Variant)",
    "Description": "Similar to mountain berries but smaller and slightly less potent.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Hill"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Late Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Mountain Goat/Sheep Meat",
    "Description": "Lean, tough, very gamey.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Mountain"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Knife",
        "Bag, Large"
      ],
      "Seasons": [
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot"
      ]
    }
  },
  {
    "Name": "Mountain Thyme",
    "Description": "A hardy, fragrant herb that thrives in high altitudes.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Mountain"
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Shears",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "mid Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Muck Root",
    "Description": "A deep-growing root vegetable found in thick mud, very filling.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Swamp"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Trowel",
        "Bag, Waterproof"
      ],
      "Seasons": [
        "Spring"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Scrub Brush"
      ]
    }
  },
  {
    "Name": "Mud Noodle",
    "Description": "A stringy, edible plant that resembles noodles, found submerged in mud.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Mountain",
      "Swamp"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Fine Net",
        "Bag, Waterproof"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Mugwort",
    "Description": "A common urban weed with some historical culinary and medicinal uses (though can be bitter).",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Urban"
    ],
    "Effects": [
      "When prepared as a Salve, it provides healing of 4d4 + 4 hit points.",
      "When prepared as a Pill, it provides healing of 8d4 + 8 hit points.",
      "When prepared as a Decoction, it heals 1 level of exhaustion."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Autumn",
        "Winter"
      ]
    }
  },
  {
    "Name": "Mulberry (berries)",
    "Description": "Berries from urban trees (often cultivated or escaped).",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest",
      "Grassland",
      "Hill",
      "Urban"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Early Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Mummy Dust (Ritualistically Infused)",
    "Description": "Fine dust collected from an ancient mummy, often found in tombs or museums, ritually infused to remove its curse. Consuming it might provide insights into ancient secrets or brief necrotic resistance, but still carries a significant risk of Mummy Rot or eternal torment.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Desert",
      "Urban"
    ],
    "Effects": [
      "Has a 3-in-6 chance of curing any disease if alchemically prepared (10gp per dose).",
      "Might provide insights into ancient secrets or brief necrotic resistance.",
      "If eaten from dungeon-found bits, or on a roll of 6 for alchemically prepared mummy:",
      "1-2: Painful Lesions. Take 1d6 damage and lose any benefit from the meal.",
      "3-4: Mummy Visions. Make a save versus Wisdom (DC 18) or permanently lose 1d6 Wisdom. If the consumer passes the saving throw, the consumer spends the next 1d6 minutes in a swirling vision of the ancient past, where treasure and secrets may be revealed."
    ],
    "Purchase Price": "50 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Fine Brush",
        "Container(s)",
        "Ritual Components"
      ]
    },
    "Preparation": {
      "Method": "Ritually infused to remove its curse"
    },
    "Cooking": {
      "Required Kit": [
        "Alchemist's Kit",
        "Mortar and Pestle",
        "Non-Reactive Cookware"
      ]
    },
    "Notes": "Carries a significant risk of Mummy Rot or eternal torment."
  },
  {
    "Name": "Mutant Berry Bush",
    "Description": "A resilient bush producing strange, sometimes glowing berries that offer unpredictable effects, both positive and negative.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Wasteland"
    ],
    "Effects": [
      "Can cause minor mutations or strange, temporary effects."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Gloves, Thick",
        "Container(s)",
        "Poisoner's Kit"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Detoxification Agents"
      ]
    }
  },
  {
    "Name": "Mutated Boar Meat",
    "Description": "Tough, often with strange discolorations or tastes due to environmental factors, but edible.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Wasteland"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Bone Saw"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot",
        "Purifying Agents"
      ]
    }
  },
  {
    "Name": "Mutated Cactus Fruit",
    "Description": "A larger, sometimes oddly shaped cactus fruit with unpredictable flavor and effects.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Wasteland"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Gloves, Thick",
        "Tongs",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Myconid Spore Bloom",
    "Description": "A cluster of special spores from a Myconid colony; consuming them can grant minor, temporary fungal communication.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Underdark"
    ],
    "Effects": [
      "Can grant minor, temporary fungal communication."
    ],
    "Purchase Price": "1 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Fine Brush",
        "Container(s)",
        "Mask"
      ],
      "Seasons": [
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Mortar and Pestle",
        "Non-Reactive Cookware"
      ]
    }
  },
  {
    "Name": "Nettles (Stinging Nettle)",
    "Description": "Leaves are edible when cooked and are highly nutritious.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest",
      "Grassland",
      "Hill",
      "Jungle",
      "Mountain",
      "Swamp",
      "Urban"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
      ],
      "Seasons": [
        "Spring"
      ]
    },
    "Cooking": {
      "Method": "Leaves are edible when cooked.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Nettles",
    "Description": "Found in damp, sheltered areas.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest",
      "Grassland",
      "Hill",
      "Jungle",
      "Mountain",
      "Swamp",
      "Urban"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        
      ],
      "Seasons": [
        "Spring"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Nycaloth Muscle Fiber (Shadow-Twisted)",
    "Description": "A strand of muscle fiber from a Nycaloth, dark and imbued with shadows. This is a Legendary rarity ingredient.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Any"
    ],
    "Effects": [
      "Consuming it could temporarily grant limited flight or shadow-stepping abilities, but often at the cost of vitality. If prepared by an expert (as a Fiend ingredient):",
      "When a creature within 20 feet of the consumer makes an attack or saving throw, the consumer can use their reaction to reduce that creature’s roll by 1d4.",
      "When a creature within 10 feet of the consumer hits them with an attack, the consumer can use a reaction to deal cold or fire damage (their choice) equal to 1d8 + their Intelligence modifier to the attacker."
    ],
    "Purchase Price": "50 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Oasis Moss",
    "Description": "A rare moss that grows only in pristine oases, known for its ability to filter impurities from water.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Desert"
    ],
    "Effects": [
      "Ability to filter impurities from water."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Oat grass",
    "Description": "Grass from the oat crop picked in the Late Summer or early autumn.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Grassland"
    ],
    "Effects": [
      "When ingested as an infusion, at the beginning of the consumer's next turn, they regain 1 point to their Constitution ability score.",
      "This effect cannot be used again on the same creature until they complete a long rest."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Late Summer",
        "Early Autumn"
      ]
    }
  },
  {
    "Name": "Obsidian Spice",
    "Description": "Ground from specific, brittle obsidian found near volcanic vents. Imparts a sharp, smoky flavor and a slight warming sensation. Used as a spice.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Mountain"
    ],
    "Purchase Price": "1 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Pick"
      ]
    },
    "Preparation": {
      "Method": "Must be ground."
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Mortar and Pestle"
      ]
    }
  },
  {
    "Name": "Ocean Cucumber",
    "Description": "A long, fleshy sea vegetable with a refreshing, briny taste.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Coastal"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Fishing Net",
        "Knife",
        "Container(s)"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Oceanic Berry",
    "Description": "A small, firm berry found growing on underwater plants, slightly salty and sweet.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Underwater"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Bag, Waterproof"
      ],
      "Seasons": [
        "Late Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Ochre Jelly (ooze)",
    "Description": "An ooze creature whose matter can be consumed. If eaten raw, it tastes like \"battery acid and slowly spreading numbness\", and can numb an aching tooth.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Swamp",
      "Underdark",
      "Urban"
    ],
    "Effects": [
      "If eaten raw, a handful can remove the sting of any wound, and a small bite can numb an aching tooth.",
      "If used as a soup base, it pre-digests tough meats and vegetables, making them more palatable.",
      "If prepared by an expert (ooze ingredient), the consumer reduces any acid or poison damage they take by 1d4.",
      "They also gain a 1d4 bonus to any check or saving throw against becoming grappled or restrained.",
      "When the consumer makes an ability check or saving throw to end an effect that renders them grappled or restrained, they can use a reaction to automatically succeed on the check or save."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Container(s)"
      ]
    },
    "Cooking": {
      "Method": "Can be cooked into a soup.",
      "Required Kit": [
        "Pot",
        "Cook's Utensils"
      ]
    },
    "Expiration": "Degrades after 1 minute if not collected."
  },
  {
    "Name": "Ogre Meat",
    "Description": "Coarse, greasy, and somewhat musky, but very filling. It is also described as extremely tough and sinewy. Provides sustenance and is very filling.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Mountain"
    ],
    "Effects": [
      "On a d6 roll of 1: Consumer must make a Constitution saving throw or lose any benefit from the meal, and spend the rest of the day queasy and gassy.",
      "On a d6 roll of 2-5: No extra effect.",
      "On a d6 roll of 6: Delicious! Heal 1 HP, or 1 additional HP."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Ogre Root",
    "Description": "A large, tough root that is difficult to prepare but provides immense sustenance.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Hill"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Digging Tools"
      ],
      "Seasons": [
        "Spring"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Ogre Steak",
    "Description": "Coarse, greasy, and somewhat musky, but very filling.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Hill"
    ],
    "Effects": [
      "Provides sustenance and is very filling.",
      "On a d6 roll of 1: Consumer must make a DC 12 Constitution saving throw or lose any benefit from the meal, and spend the rest of the day queasy and gassy.",
      "On a d6 roll of 2-5: No extra effect.",
      "On a d6 roll of 6: Delicious! Heal 1 HP, or 1 additional HP."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Ooze Jelly",
    "Description": "The \"congealed remains of a docile ooze,\" which is surprisingly palatable and nutritious.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Underdark"
    ],
    "Effects": [
      "If prepared by an expert (ooze ingredient), the consumer reduces any acid or poison damage they take by 1d4.",
      "They gain a 1d4 bonus to any check or saving throw against becoming grappled or restrained.",
      "When the consumer makes an ability check or saving throw to end an effect that renders them grappled or restrained, they can use a reaction to automatically succeed on the check or save."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "Dissipates or degrades after 1 minute if not collected."
  },
  {
    "Name": "Orache/Saltbush",
    "Description": "Similar to Sea Beet, but often more prevalent in very salty, dry coastal areas. Its leaves are edible.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Coastal"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Orc Flesh",
    "Description": "Tough, lean, and gamey. A common source of sustenance for other monstrous humanoids. It has an \"acidic aftertaste\".",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Desert",
      "Forest",
      "Hill",
      "Mountain",
      "Urban",
      "Wasteland"
    ],
    "Effects": [
      "On a d6 roll of 1: Consumer must make a DC 10 Constitution saving throw or lose any benefit from the meal, and spend the rest of the day queasy and gassy.",
      "On a d6 roll of 2-5: No extra effect.",
      "On a d6 roll of 6: Delicious! Heal 1 HP, or 1 additional HP."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Orchid Nectar",
    "Description": "Sweet, clear nectar from various jungle orchids, can be used as a natural sweetener.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Jungle"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Container(s)"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Otyugh Flesh",
    "Description": "Pungent, gristly, and often contaminated, but edible as a last resort. It is similar to Carrion Crawler meat, which tastes like \"old socks, mouldy bread, and rotten meat\".",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underdark"
    ],
    "Effects": [
      "On a d6 roll of 1: Consumer must make a Constitution saving throw or lose any benefit from the meal, and spend the rest of the day queasy and gassy.",
      "On a d6 roll of 2-5: No extra effect.",
      "On a d6 roll of 6: Delicious! Heal 1 HP, or 1 additional HP."
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Owlbear",
    "Description": "Tougher and more aggressive, but its meat is still a source of sustenance. Owlbear meat is generally described as \"Sticky black flesh, like treacle with tendons, tinged with octarine fat deposits\".",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Forest",
      "Hill",
      "Mountain",
      "Underdark",
      "Wasteland"
    ],
    "Effects": [
      "If cooked over a pure coal fire (+2 to roll):",
      "On a 1-2: Eggs. Consumers must make a Save vs. Poison (DC 13). On a failed save, the consumer takes 1d6 permanent Con loss and vomits up a huge clot of black tar and owlbear eggs. Otherwise, takes 1d6 poison damage per minute until cured or dies in agony.",
      "On a 3-4: Sticky Meat. Consumers must make a Save vs. Con or lose any benefit from the meal, and spend the rest of the day coughing up black tar.",
      "On a 5-6: Black Teeth. Consumer's teeth are permanently stained.",
      "On a 7: Delicious! Heal 1 HP, or 1 additional HP.",
      "On an 8: Owlbear’s Sight. Consumers can see 50’ in near-total darkness for 1d6 hours. Must make a Save vs. Con against bright lights.",
      "On a 9: Owlbear’s Strength. Consumer gains +2 Strength for 1d6 hours.",
      "On a 10: Fortified. Consumer permanently gains +1 Strength and +1 HP. They also grow a few feathers or quills."
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Method": "If cooked over a pure coal fire",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Panther/Jaguar Loin",
    "Description": "This is lean, gamey, and often strong-flavored meat.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Jungle"
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Passion Fruit (wild varieties)",
    "Description": "This fruit is intensely flavored and often smaller than cultivated",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Jungle"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Summer",
        "Spring"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Pawpaw",
    "Description": "This is a tropical-tasting fruit native to forests.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest"
    ],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Peak Potato",
    "Description": "This is a small, exceptionally starchy potato that thrives in harsh mountain conditions.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Mountain"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Trowel",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Pearl Oyster (meat)",
    "Description": "This is a culinary delicacy, also valuable for pearls.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Coastal"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Pry Bar",
        "Knife",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot"
      ]
    }
  },
  {
    "Name": "Pearlweed",
    "Description": "This is a small, delicate plant that often grows near pearls. It is said to have minor healing properties.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Underwater"
    ],
    "Effects": [
      "Said to have minor healing properties."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Fine Net",
        "Container(s)"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot"
      ]
    }
  },
  {
    "Name": "Pegasus Wing Feather (crystallized essence)",
    "Description": "This is a rare, magically crystallized essence found within a shed Pegasus feather.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Hill",
      "Mountain"
    ],
    "Effects": [
      "When ingested, it's said to briefly cleanse negative effects and bestow clarity of thought. If prepared by an expert (Celestial ingredient):",
      "When the consumer takes radiant damage, they can use a reaction to reduce it by 1d8.",
      "Additionally, the consumer gains a +3 bonus to Charisma (Persuasion) checks.",
      "As an action, the consumer can cast cure wounds (using their Intelligence for the spellcasting ability)."
    ],
    "Purchase Price": "5 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit"
      ]
    },
    "Preparation": {
      "Method": "Must be ground."
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Permafrost Cap",
    "Description": "This is a mushroom with a cap that remains unnaturally cold to the touch, even in warmer conditions.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Arctic"
    ],
    "Effects": [
      "Consuming it might offer a brief cooling effect or help preserve other foods."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Winter"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Phase Spider Leg (prepared)",
    "Description": "This ingredient is ethereal and oddly textured. It is said to cause a momentary sense of disorientation upon consumption.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Desert"
    ],
    "Effects": [
      "Said to cause a momentary sense of disorientation upon consumption.",
      "If prepared by an expert: The consumer gains blindsight up to a range of 10 feet and darkvision up to a range of 30 feet.",
      "As a bonus action, the consumer can gain a climb or swim speed equal to their walking speed until the end of their next turn."
    ],
    "Purchase Price": "3 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Pickerelweed (leaves/seeds)",
    "Description": "The young leaves and seeds of this plant are edible.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Swamp"
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Pigeon Breast",
    "Description": "This meat is small, lean, and somewhat gamey.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Urban"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Pigeon Pea",
    "Description": "This is a hardy legume that grows in cracks and neglected areas of cities.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Urban",
      "Wasteland"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Pilinehtar",
    "Description": "This is a plant with stems shaped like arrows and spears which sharpens the senses.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Coastal"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Shears",
        "Drying Rack"
      ],
      "Seasons": [
        "Spring"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Pine Needles (tea)",
    "Description": "These needles from evergreen trees are a source for vitamin C rich tea.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Arctic",
      "Forest",
      "Mountain"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year-round"
      ]
    },
    "Preparation": {
      "Method": "Brewed as a tea."
    }
  },
  {
    "Name": "Piranha Flesh",
    "Description": "This is small, bony, but flavorful fish meat.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Jungle",
      "Underwater"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Butcher's Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Piranha Plant Seedpod",
    "Description": "The seeds are edible and crunchy, with a slight spicy kick.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Jungle"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Pit Fiend Scale (Infernal Iron)",
    "Description": "This is a single, blackened, and razor-sharp scale from a Pit Fiend.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Any"
    ],
    "Effects": [
      "When carefully purified and consumed (perhaps as a sliver), it's rumored to grant potent fire immunity for moments or instill incredible, but corrupting, authority.",
      "If prepared by an expert (Fiend ingredient): When a creature within 20 feet of the consumer makes an attack or saving throw, the consumer can use their reaction to reduce that creature’s roll by 1d4.",
      "When a creature within 10 feet of the consumer hits them with an attack, the consumer can use a reaction to deal cold or fire damage (their choice) equal to 1d8 + their Intelligence modifier to the attacker."
    ],
    "Purchase Price": "50 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit"
      ]
    },
    "Preparation": {
      "Method": "Requires careful purification."
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "Carries a 'corrupting' aspect."
  },
  {
    "Name": "Plantain (leaves)",
    "Description": "Broadleaf and narrowleaf plantain are common weeds with edible leaves.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest",
      "Grassland",
      "Hill",
      "Urban",
      "Wasteland"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Poison Dart Frog Extract (diluted)",
    "Description": "This extract is highly dangerous if not properly prepared, but a very diluted amount can be used as a potent, pain-numbing agent.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Jungle"
    ],
    "Effects": [
      "Can be used as a potent, pain-numbing agent.",
      "If prepared by an expert: The consumer gains a +1 bonus to Strength checks.",
      "When the consumer hits with a weapon attack and rolls for damage, they can use a reaction to reroll the damage and take the higher result."
    ],
    "Purchase Price": "5 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Poisoner's Kit",
        "Knife",
        "Sealed Vials",
        "Gloves, Thick"
      ]
    },
    "Preparation": {
      "Method": "Requires proper preparation and dilution."
    },
    "Cooking": {
      "Required Kit": [
        "Alchemist's Kit",
        "Distillation Apparatus",
        "Non-Reactive Cookware"
      ]
    },
    "Notes": "Highly dangerous if not properly prepared."
  },
  {
    "Name": "Poisonous Dart Cap",
    "Description": "This is a brightly colored, highly toxic mushroom whose cap resembles the skin patterns of certain poisonous jungle creatures.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Jungle"
    ],
    "Effects": [
      "A very diluted extract might have medicinal uses (antivenom for mild poisons, or a potent anesthetic)."
    ],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Poisoner's Kit",
        "Herbalism Kit",
        "Knife",
        "Container(s)",
        "Mask"
      ],
      "Seasons": [
        "Mid Autumn"
      ]
    },
    "Preparation": {
      "Method": "Requires dilution and extraction."
    },
    "Cooking": {
      "Required Kit": [
        "Alchemist's Kit",
        "Distillation Apparatus",
        "Non-Reactive Cookware"
      ]
    },
    "Notes": "Highly toxic, identifying it is critical."
  },
  {
    "Name": "Polar Bear Liver (Cooked)",
    "Description": "This ingredient is highly nutritious, but must be thoroughly cooked to avoid being poisoned.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Arctic"
    ],
    "Effects": [
      "Highly nutritious.",
      "If prepared by an expert: The consumer gains a +1 bonus to Strength checks.",
      "When the consumer hits with a weapon attack and rolls for damage, they can use a reaction to reroll the damage and take the higher result."
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Butcher's Tools"
      ]
    },
    "Preparation": {
      "Method": "Requires thorough cooking to avoid hypervitaminosis"
    },
    "Cooking": {
      "Method": "Must be thoroughly cooked.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Polar Bear Steak",
    "Description": "This is lean, dense meat. It requires careful cooking due to potential vitamin A toxicity if the liver is consumed. If prepared by an expert (Beast ingredient):",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Arctic"
    ],
    "Effects": [
      "The consumer gains a +1 bonus to Strength checks.",
      "When the consumer hits with a weapon attack and rolls for damage, they can use a reaction to reroll the damage and take the higher result."
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Butcher's Tools"
      ]
    },
    "Preparation": {
      "Method": "Requires careful cooking (as mentioned in description, but due to liver, not steak itself)."
    },
    "Cooking": {
      "Method": "Requires careful cooking.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Pore Cap",
    "Description": "This is a common, porous fungus that can soak up liquids. When squeezed, it can provide a small amount of filtered (or contaminated) water, or be used as a natural sponge.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Underdark"
    ],
    "Effects": [
      "Can provide a small amount of filtered (or contaminated) water, or be used as a natural sponge.",
      "This ingredient has no other special effects."
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Scoop",
        "Container(s)"
      ],
      "Seasons": [
        "mid Summer"
      ]
    },
    "Preparation": {
      "Method": "Can be squeezed."
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Potato",
    "Description": "A starchy, tuberous crop commonly grown worldwide for its edible tubers, it's a versatile and widely consumed food, often prepared baked, fried, boiled, or mashed.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Grassland"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Late Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Prairie Turnip",
    "Description": "This is a starchy root vegetable found in grasslands.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Grassland"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Trowel",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Early Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Prickly Pear Cactus (Tuna/Nopal)",
    "Description": "This cactus is extremely hardy and can survive in very harsh conditions. The fruit (\"tuna\") and pads (\"nopales\") are edible.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Desert",
      "Wasteland"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Plucking Tools"
      ],
      "Seasons": [
        "Late Summer"
      ]
    },
    "Preparation": {
      "Method": "Normal preparation, but requires handling spines."
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Puffball Mushroom (Giant)",
    "Description": "These are large, spherical fungi that release a cloud of spores when mature. Young puffballs are excellent eating; the spores can be used as a mild irritant or thickening agent.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Grassland"
    ],
    "Effects": [
      "Spores can be used as a mild irritant or thickening agent.",
      "This ingredient has no other special effects."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Mid Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Purslane",
    "Description": "Succulent leaves found in disturbed ground.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Desert",
      "Forest",
      "Grassland",
      "Hill",
      "Urban",
      "Wasteland"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "mid Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Quaggoth Flesh",
    "Description": "Bestial, hairy, and tough. It is edible but likely unappetizing.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underdark"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Quasit Heart (Ritually Prepared)",
    "Description": "The tiny, pulsating heart of a defeated Quasit. When prepared through dark ritual, it can grant temporary invisibility or a minor, fleeting familiar bond, often with a mischievous or malevolent spirit.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Any"
    ],
    "Effects": [
      "Grants temporary invisibility or a minor, fleeting familiar bond, often associated with a mischievous or malevolent spirit."
    ],
    "Purchase Price": "15 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Knife",
        "Vials",
        "Ritual Components"
      ]
    },
    "Preparation": {
      "Method": "Requires dark ritual."
    },
    "Cooking": {
      "Required Kit": [
        "Alchemist's Kit",
        "Non-Reactive Cookware",
        "Magical Heat Source"
      ]
    }
  },
  {
    "Name": "Radiation Bloom",
    "Description": "A strange, faintly glowing plant that thrives in irradiated zones; consuming it can cause minor mutations or strange, temporary effects.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Wasteland"
    ],
    "Effects": [
      "Can cause minor mutations or strange, temporary effects."
    ],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Gloves, Protective",
        "Container(s)"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Alchemist's Kit",
        "Distillation Apparatus",
        "Non-Reactive Cookware"
      ]
    }
  },
  {
    "Name": "Radiolarian",
    "Description": "While it may incorporate \"meat-engines,\" this organism is described as \"Fizzy bleach tapioca\". It requires caution and fire for preparation.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Underwater"
    ],
    "Effects": [
      "Can produce \"emergency module\" copies, where a smaller radiolarian bursts from the consumer's chest in 1d6 hours, glowing and moving fast."
    ],
    "Purchase Price": "5 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Fine Net",
        "Container(s)"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Method": "Boiling for at least 20 minutes.",
      "Required Kit": [
        "Alchemist's Kit",
        "Pot",
        "Non-Reactive Cookware"
      ]
    },
    "Notes": "A single large radiolarian can produce an almost unlimited number of smaller emergency copies."
  },
  {
    "Name": "Rainforest Resin (edible)",
    "Description": "A sweet, aromatic resin from specific jungle trees, used as a natural sweetener or binding agent.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Jungle"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Tapping Tools",
        "Container(s)"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Rambutan/Lychee (wild varieties)",
    "Description": "Sweet, juicy fruits with spiky or leathery skin.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Jungle"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "early Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Ramps (Wild Leeks)",
    "Description": "Found in forested or shaded hilly areas.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest",
      "Hill"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Trowel",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Early Spring"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Rat Meat",
    "Description": "Small, lean, and often tough, but a common source of protein in desperate times.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Urban"
    ],
    "Effects": [
      "As Normal Meat, on a d6 roll of 1, the consumer must make a Constitution saving throw or lose any benefit from the meal and spend the rest of the day queasy and gassy; on a roll of 2-5, there is no extra effect; on a roll of 6, it is delicious and heals 1 HP.",
      "If properly cooked and prepared, add a +1 bonus to the roll."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Rat Tail (cooked)",
    "Description": "A surprising source of protein in desperate urban environments.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Urban"
    ],
    "Effects": [
      "As Normal Meat, it would generally follow the same effects as Rat Meat."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife"
      ]
    },
    "Cooking": {
      "Method": "Must be cooked.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Red Dragon Heart (cooked)",
    "Description": "The ultimate fiery delicacy. It is extremely dangerous to acquire and prepare. Its flesh tastes of \"raw magic,\" feels heavy but flakes like fish, and consuming it can result in cosmetic improvements like no cavities, better breath, vanishing bald spots, and improved eyesight, making one feel like \"the 'after' picture in a thousand internet ads\".",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Mountain"
    ],
    "Effects": [
      "Rumored to grant immense power and significant fire resistance.",
      "If prepared by an expert (Fiend ingredient), the consumer gains the resistance to the dragon's damage type (Fire for Red Dragon).",
      "Alternatively, it can grant a fly speed equal to current walking speed, or the ability to exhale a 15-foot cone of elemental damage (Lightning damage for Blue Dragon) as a bonus action, requiring a Dexterity saving throw (taking a number of d6 equal to proficiency bonus on a failed save, half on a success)."
    ],
    "Purchase Price": "50 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools (Enchanted)",
        "Arcane Focus",
        "Gloves, Heat-Resistant",
        "Container(s), Large"
      ]
    },
    "Preparation": {
      "Method": "Requires extremely dangerous preparation."
    },
    "Cooking": {
      "Method": "Can be cooked, boiled, fried, or dried.",
      "Required Kit": [
        "Cook's Utensils (Enchanted)",
        "Alchemist's Kit",
        "Magical Heat Source"
      ]
    },
    "Notes": "Eating dragon parts, raw or cooked, is \"almost sacrilegious\" due to their value to wizards and alchemists."
  },
  {
    "Name": "Redcap Blood (congealed)",
    "Description": "Congealed blood from a defeated Redcap.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Forest",
      "Hill"
    ],
    "Effects": [
      "Grants temporary ferocity or brief resistance to fear."
    ],
    "Purchase Price": "15 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Sealed Vials",
        "Disinfectant"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Alchemist's Kit",
        "Non-Reactive Cookware"
      ]
    }
  },
  {
    "Name": "Reindeer/Caribou Jerky",
    "Description": "Lean, easily dried meat, a staple for arctic survival.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Arctic"
    ],
    "Effects": [
      "As Normal Meat, it would generally follow the same effects: on a d6 roll of 1, the consumer must make a Constitution saving throw or lose any benefit from the meal and spend the rest of the day queasy and gassy; on a roll of 2-5, there is no extra effect; on a roll of 6, it is delicious and heals 1 HP."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Knife",
        "Drying Rack"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Drying Rack"
      ]
    }
  },
  {
    "Name": "Remorhaz Larva (cooked)",
    "Description": "A highly sought-after, very hot-tasting delicacy found within volcanic peaks. It is prized for its internal heat and is heat-resistant.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Arctic",
      "Mountain"
    ],
    "Effects": [
      "Prized for its internal heat.",
      "As Normal Meat, it would generally follow the same effects: on a d6 roll of 1, the consumer must make a Constitution saving throw or lose any benefit from the meal and spend the rest of the day queasy and gassy; on a roll of 2-5, there is no extra effect; on a roll of 6, it is delicious and heals 1 HP."
    ],
    "Purchase Price": "3 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Freezing Agents",
        "Container(s)"
      ]
    },
    "Preparation": {
      "Method": "Cannot be cooked by heat; must be frozen into slices to make jerky."
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Chilling Apparatus"
      ]
    },
    "Notes": "A slain remorhaz's spine glows red-hot for days and can be used as a cooking surface or impromptu forge."
  },
  {
    "Name": "Rock Barnacle",
    "Description": "A shelled creature that clings to cave walls, edible when pried open.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underdark"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Pry Bar",
        "Knife",
        "Container(s)"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot"
      ]
    }
  },
  {
    "Name": "Rock Lichen",
    "Description": "Similar to frost lichen, but grows on rocky surfaces, provides basic sustenance.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Arctic",
      "Mountain",
      "Underdark",
      "Wasteland"
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Scraper",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Rooftop Herbs (various)",
    "Description": "Thyme, oregano, basil, cultivated in rooftop gardens.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Urban"
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Shears",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Rooftop Moss (mineral-rich)",
    "Description": "Moss growing on ancient stone or brick rooftops, absorbing trace minerals from urban runoff. Provides basic sustenance or a source of unique minerals.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Urban"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Scraper",
        "Container(s)"
      ],
      "Seasons": [
        "Year-round"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Root Vegetable Medley (Wild)",
    "Description": "Wild carrots, parsnips, and potatoes, often smaller and more fibrous.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Trowel",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Mid Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Roper Tendril (cooked)",
    "Description": "Rubbery and fibrous, but surprisingly nutritious. It tastes like gritty beef with strange crunchy lumps. When properly prepared, it can impart a very minor, fleeting sense of grip or adherence.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Mountain",
      "Underdark"
    ],
    "Effects": [
      "Surprisingly nutritious.",
      "Can impart a very minor, fleeting sense of grip or adherence."
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
      ]
    },
    "Preparation": {
      "Method": "Requires proper preparation."
    },
    "Cooking": {
      "Method": "Must be cooked.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "Dungeon explorers might mistakenly assume it tastes like piercer meat."
  },
  {
    "Name": "Rose Hips",
    "Description": "The fruit of rose bushes, high in Vitamin C, found in many mountain/alpine regions.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest",
      "Grassland",
      "Hill",
      "Mountain",
      "Urban"
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Shears",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Late Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Tumbleweed, young shoots",
    "Description": "Young, tender shoots are edible before they become woody.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Wasteland"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Shears",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Spring"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Rust Blossom",
    "Description": "A metallic-tasting flower that grows near iron deposits, said to impart a slight toughening effect.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Wasteland"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife",
        "Container(s)"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Rust Monster Shell Flesh",
    "Description": "The soft, inner flesh of a rust monster's shell, edible but metallic-tasting and mildly abrasive.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Wasteland"
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Non-Reactive Cookware"
      ]
    }
  },
  {
    "Name": "Saguaro Cactus Fruit",
    "Description": "A sweet, red fruit from the iconic saguaro.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Desert"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Tongs",
        "Gloves, Thick",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "mid Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Sahuagin Flesh",
    "Description": "Scaly, unpleasant, and very fishy. It is highly unappetizing to most but edible in desperation.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Coastal"
    ],
    "Effects": [
      "On a d6 roll of 1, the consumer must make a Constitution saving throw or lose any benefit from the meal and spend the rest of the day queasy and gassy.",
      "On a roll of 2-5, there is no extra effect; on a roll of 6",
      "It is delicious and heals 1 HP."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Cook's Utensils"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Duration": "Queasiness and gassiness last for \"the rest of the day.\" Healing is instantaneous."
  },
  {
    "Name": "Sahuagin Meat",
    "Description": "Scaly, fishy, and somewhat unpleasant, but edible.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underwater"
    ],
    "Effects": [
      "On a d6 roll of 1, the consumer must make a Constitution saving throw or lose any benefit from the meal and spend the rest of the day queasy and gassy.",
      "On a roll of 2-5, there is no extra effect.",
      "On a roll of 6, it is delicious and heals 1 HP."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Knife",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot"
      ]
    }
  },
  {
    "Name": "Salamander Fillet (cooked)",
    "Description": "Very hot to the touch and spicy to taste, providing some warmth.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Desert"
    ],
    "Effects": [
      "Provides some warmth.",
      "If prepared by an expert (Fiend ingredient), the consumer gains the following culinary benefit: When a creature within 20 feet of the consumer makes an attack or saving throw, the consumer can use their reaction to reduce that creature’s roll by 1d4. This effect lasts until the creature finishes a long rest or after 24 hours, whichever comes first."
    ],
    "Purchase Price": "3 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife",
        "Cook's Utensils"
      ]
    },
    "Cooking": {
      "Method": "Must be cooked properly.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Salamander Skin (crisped)",
    "Description": "The superheated skin of a Salamander, rendered crispy and incredibly spicy. It provides internal warmth and minor fire resistance.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Desert",
      "Mountain",
      "Underdark"
    ],
    "Effects": [
      "Provides internal warmth and minor fire resistance."
    ],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Gloves, Heat-Resistant",
        "Knife",
        "Container(s)"
      ]
    },
    "Preparation": {
      "Method": "Rendered crispy."
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Duration": "Fire resistance lasts for 1d4 hours."
  },
  {
    "Name": "Saltbush (leaves)",
    "Description": "Salt-tolerant leaves that can be used as a seasoning.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Coastal",
      "Desert",
      "Wasteland"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Method": "Used as a seasoning.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Saltmarsh Eelgrass",
    "Description": "Can be woven into a crude rope or eaten as a last resort. This fibrous, briny plant, often found clinging to submerged rocks and shipwrecks, is renowned for its vibrant emerald hue and subtly metallic, umami-rich flavor, making it a sought-after delicacy among culinarians.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Coastal"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Net",
        "Bag, Waterproof"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Samphire/Sea Beans (Salicornia)",
    "Description": "Found in intertidal zones, but often submerged at high tide.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Coastal",
      "Underwater"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Shears",
        "Basket"
      ],
      "Seasons": [
        "mid Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Sand Dollar Mushroom",
    "Description": "A flat, disc-shaped mushroom that tastes faintly of shellfish.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Coastal"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "early Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Sand Squash",
    "Description": "A tough-skinned squash that can grow in dry, sandy soil, and stores water.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Desert"
    ],
    "Effects": [
      "Stores water.",
      "This ingredient has no other special effects."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Digging Tools"
      ],
      "Seasons": [
        "Late Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Sandworm Spore",
    "Description": "A fine dust found near sandworm lairs.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Desert"
    ],
    "Effects": [
      "Can be used as a potent, earthy seasoning, or cause hallucinations if overused."
    ],
    "Purchase Price": "1 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Container(s)",
        "Alchemist's Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Method": "Used as a seasoning.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Duration": "Hallucinations are temporary (1d4 hours)."
  },
  {
    "Name": "Satyr Loin (magically infused)",
    "Description": "The gamey but flavorful meat from a Satyr.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Forest",
      "Hill"
    ],
    "Effects": [
      "Said to inspire joy, alleviate despair, or grant a brief charming presence."
    ],
    "Purchase Price": "3 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Knife",
        "Ritual Components",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Magical Heat Source"
      ]
    }
  },
  {
    "Name": "Scavenger's Spore",
    "Description": "A tough, resilient mushroom that grows in contaminated areas, often found near derelict machinery.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Wasteland"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Scorched Earth Lichen",
    "Description": "A tough, resilient lichen that clings to scorched rocks, provides minimal sustenance.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Wasteland"
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Scorpion Pepper",
    "Description": "An extremely hot chili pepper that grows in arid regions. Imparts intense heat/spice.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Desert"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Gloves, Thick",
        "Container(s)"
      ],
      "Seasons": [
        "Late Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Sea Beet",
    "Description": "Wild ancestor of beetroot, chard, and spinach. Its leaves are edible.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Coastal",
      "Urban"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "mid Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Sea Cucumber (vegetable)",
    "Description": "A fleshy, often spiny creature that can be eaten, and has a mild, briny taste.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underwater"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Sea Hag Eye (preserved & consumed)",
    "Description": "A single, preserved eye from a defeated Sea Hag.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Coastal"
    ],
    "Effects": [
      "Said to grant terrifying insight into others' fears or bestow temporary amphibian qualities.",
      "If prepared by an expert, the consumer gains the following culinary benefits: Nutritional Value: The consumer gains blindsight up to a range of 10 feet and darkvision up to a range of 30 feet. This effect lasts until the creature finishes a long rest or after 24 hours, whichever comes first."
    ],
    "Purchase Price": "15 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Knife",
        "Vials",
        "Ritual Components"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Alchemist's Kit",
        "Non-Reactive Cookware"
      ]
    }
  },
  {
    "Name": "Sea Kale",
    "Description": "A hardy leafy green that grows along the coast, slightly salty.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Coastal",
      "Urban"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Early Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Sea Purslane",
    "Description": "Succulent leaves with a salty taste.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Coastal",
      "Urban"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "mid Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Sea Rocket",
    "Description": "Peppery leaves and flowers.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Coastal",
      "Urban"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Early Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Sea Salt Crystals",
    "Description": "Naturally occurring salt deposits found on rocks and driftwood.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Arctic",
      "Coastal",
      "Desert",
      "Forest",
      "Wasteland"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Scoop",
        "Container(s)"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Mortar and Pestle"
      ]
    }
  },
  {
    "Name": "Sea Serpent Steak",
    "Description": "Tough, oily, but very filling meat from smaller sea serpents.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Coastal"
    ],
    "Effects": [
      "On a d6 roll of 1, the consumer must make a Constitution saving throw or lose any benefit from the meal and spend the rest of the day queasy and gassy.",
      "On a roll of 2-5, there is no extra effect; on a roll of 6.",
      "It is delicious and heals 1 HP."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Seagrass",
    "Description": "A long, leafy underwater plant that can be eaten.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Underwater"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Net",
        "Bag, Waterproof"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Seal Meat",
    "Description": "Oily and strong-flavored, but highly nutritious.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Coastal"
    ],
    "Effects": [
      "On a d6 roll of 1, the consumer must make a Constitution saving throw or lose any benefit from the meal and spend the rest of the day queasy and gassy.",
      "On a roll of 2-5, there is no extra effect.",
      "On a roll of 6, it is delicious and heals 1 HP."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Duration": "Queasiness and gassiness last for \"the rest of the day.\" Healing is instantaneous."
  },
  {
    "Name": "Seaweed Mushroom",
    "Description": "A mushroom that grows on decaying seaweed, absorbing its briny flavors. It might have a slightly rubbery texture.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Coastal"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Seregon",
    "Description": "Blood-red flowers that grow in rocky soil.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Mountain",
      "Hill"
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Sewer Cap",
    "Description": "A tough, dark mushroom that thrives in the damp, nutrient-rich (and often unsanitary) conditions of city sewers. It is surprisingly edible after thorough cleaning and cooking.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Urban"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Preparation": {
      "Method": "Requires thorough cleaning."
    },
    "Cooking": {
      "Method": "Requires thorough cooking.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Sewer Croc Tail (cooked)",
    "Description": "A tough but edible meat source, often found in city sewers.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Urban"
    ],
    "Effects": [
      "On a d6 roll of 1, the consumer must make a Constitution saving throw or lose any benefit from the meal and spend the rest of the day queasy and gassy.",
      "On a roll of 2-5, there is no extra effect; on a d6 roll of 6.",
      "It is Delicious! and heals 1 HP or 1 additional HP."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife"
      ]
    },
    "Cooking": {
      "Method": "Must be cooked.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Duration": "Queasiness and gassiness last for \"the rest of the day.\" Healing is instantaneous."
  },
  {
    "Name": "Sewer Filtrate Crystals",
    "Description": "Naturally formed crystals from filtered (or semi-filtered) sewer runoff, possibly with unique, if questionable, mineral properties.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Urban"
    ],
    "Purchase Price": "1 sp per unit",
    "Harvesting": {
      "Required Kit": [
        "Container(s)",
        "Scoop"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Sewer Turnip",
    "Description": "A robust, oddly shaped turnip that can grow in damp, underground city environments.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Urban"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Trowel",
        "Bag",
        "Disinfectant"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Scrub Brush"
      ]
    }
  },
  {
    "Name": "Shadow Cap",
    "Description": "A mushroom that seems to absorb light, making the area around it slightly dimmer.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Underdark"
    ],
    "Effects": [
      "Eating it can grant a brief, minor proficiency in Stealth checks in dim light or darkness. The effect lasts 1 hour."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Duration": "The effect lasts 1 hour."
  },
  {
    "Name": "Shelf Fungus / Bracket Fungus",
    "Description": "Tough, woody fungi growing in shelf-like layers on trees (alive or dead). It is edible when young and tender. Older ones can be ground into powder for thickening or flavor, or used as tinder.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Forest",
      "Hill",
      "Swamp",
      "Urban"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Preparation": {
      "Method": "Normal preparation (if eaten directly); can be ground into powder."
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Shepherd's Delight",
    "Description": "A small, sweet root vegetable found in pastures.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Hill"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Trowel",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "mid Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Shepherd's Purse (herb)",
    "Description": "A common herb used for minor wound healing.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest",
      "Grassland",
      "Hill",
      "Urban",
      "Wasteland"
    ],
    "Effects": [
      "Used for minor wound healing."
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "mid Spring"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Silver Dragon Meat",
    "Description": "Cool, ethereal, and often with a hint of ozone.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Arctic",
      "Mountain"
    ],
    "Effects": [
      "Said to soothe the mind and provide a brief resistance to cold.",
      "If prepared by an expert (Dragon ingredient), the consumer gains the following culinary benefits:",
      "Gains resistance to the dragon's damage type (Cold for Silver Dragon) for one hour.",
      "Alternatively, it can grant a fly speed equal to current walking speed, or the ability to exhale a 15-foot cone of elemental damage (Cold damage for Silver Dragon) as a bonus action, requiring a Dexterity saving throw (taking a number of d6 equal to proficiency bonus on a failed save, half on a success). Can only be used once."
    ],
    "Purchase Price": "3 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools (Enchanted)",
        "Arcane Focus",
        "Preservation Salts",
        "Container(s), Large"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Alchemist's Kit",
        "Magical Heat Source"
      ]
    },
    "Duration": "Gains resistance to the dragon's damage type (Cold for Silver Dragon) for one hour.",
    "Notes": "Eating dragon parts, raw or cooked, is \"almost sacrilegious\" due to their value to wizards and alchemists."
  },
  {
    "Name": "Siren's Tear (shell)",
    "Description": "A rare, iridescent shell.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Coastal"
    ],
    "Effects": [
      "When ground into a powder, it can be used as a powerful, but temporary, vocal enhancer."
    ],
    "Purchase Price": "5 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Chisel",
        "Mortar and Pestle",
        "Container(s)"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Preparation": {
      "Method": "Ground into a powder."
    },
    "Cooking": {
      "Required Kit": [
        "Alchemist's Kit",
        "Non-Reactive Cookware"
      ]
    }
  },
  {
    "Name": "Sky-Dew Grass",
    "Description": "A rare grass that collects morning dew in its blades, providing a refreshing drink.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Grassland"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Fine Net",
        "Container(s)"
      ],
      "Seasons": [
        "mid Spring"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Skyflower",
    "Description": "A delicate flower that grows at extreme altitudes.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Mountain"
    ],
    "Effects": [
      "Said to aid in breathing at high elevations."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Early Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Sleek Meat",
    "Description": "A surprisingly palatable and juicy meat from a large worm-like monstrosity. It is known for its good texture and satisfying richness.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Jungle",
      "Swamp",
      "Underdark"
    ],
    "Effects": [
      "If prepared by an expert, the consumer gains the following culinary benefit:",
      "The consumer gains blindsight up to a range of 10 feet and darkvision up to a range of 30 feet.",
      "This effect lasts until the creature finishes a long rest or after 24 hours, whichever comes first."
    ],
    "Purchase Price": "3 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Duration": "This effect lasts until the creature finishes a long rest or after 24 hours, whichever comes first."
  },
  {
    "Name": "Slime Mold Gourd",
    "Description": "A large, warty gourd that grows in particularly boggy areas, its flesh is surprisingly sweet but slimy.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Swamp"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Scoop",
        "Container(s)"
      ],
      "Seasons": [
        "Mid Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Snow Turnip",
    "Description": "A small, hardy root vegetable that can survive in frosty soil.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Arctic"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Trowel",
        "Bag"
      ],
      "Seasons": [
        "Mid Winter"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Spider Silk (edible, prepared)",
    "Description": "When properly processed, certain spider silks can be surprisingly nutritious and have a subtle, nutty flavor.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Underdark"
    ],
    "Purchase Price": "1 sp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Weaver's Tools",
        "Knife",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Sprite Dust (congealed)",
    "Description": "Rare clumps of congealed magical dust found in enchanted urban gardens or neglected Feywild crossings.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Forest",
      "Urban"
    ],
    "Effects": [
      "Provides a fleeting sensation of levity or a minor, temporary illusionary ability."
    ],
    "Purchase Price": "1 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Brush",
        "Sealed Vials",
        "Delicate Net"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Alchemist's Kit",
        "Bag",
        "Non-Reactive Cookware"
      ]
    }
  },
  {
    "Name": "Steam Mephit Condensate (gel)",
    "Description": "Congealed, hot water vapor from a Steam Mephit, forms a gelatinous substance that provides internal warmth and hydration, often found near city sewers or hot springs.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Mountain",
      "Swamp",
      "Urban"
    ],
    "Effects": [
      "Provides internal warmth and hydration."
    ],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Stone Giant's Meat",
    "Description": "Extremely tough and fibrous, difficult to chew but highly nutritious.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Mountain",
      "Underdark"
    ],
    "Effects": [
      "On a d6 roll of 1, the consumer must make a Constitution saving throw or lose any benefit from the meal and spend the rest of the day queasy and gassy.",
      "On a roll of 2-5, there is no extra effect; on a roll of 6.",
      "It is delicious and heals 1 HP."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Knife"
      ]
    },
    "Cooking": {
      "Method": "Requires long cooking (1.5 hours).",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Stone Giant's Milk (fermented)",
    "Description": "A thick, potent, and somewhat magical fermented milk, distinct from normal dairy.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Mountain"
    ],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Container(s)"
      ]
    },
    "Preparation": {
      "Method": "Fermented."
    }
  },
  {
    "Name": "Stone Golem Grit (infused)",
    "Description": "Fine grit from a stone golem, found in petrified landscapes.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Mountain",
      "Underdark",
      "Urban",
      "Wasteland"
    ],
    "Effects": [
      "Provides mineral sustenance and enhances physical endurance.",
      "If prepared by an expert (Construct ingredient), the consumer gains the following culinary benefits:",
      "1-3 on d6: If the consumer misses an attack roll or fails an ability check, they can use their reaction to add a +2 bonus to the roll, potentially turning a miss into a hit or a failed check into a success. This effect lasts until the creature finishes a long rest or after 24 hours, whichever comes first.",
      "4-6 on d6: The consumer gains temporary hit points equal to their proficiency bonus and resistance to bludgeoning, piercing, and slashing damage from non-magical attacks for 1 hour."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Mason's Tools",
        "Mortar and Pestle",
        "Container(s)"
      ]
    },
    "Preparation": {
      "Method": "Magically infused."
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Mortar and Pestle",
        "Non-Reactive Cookware"
      ]
    }
  },
  {
    "Name": "Stonecap (Deeper Variety)",
    "Description": "A tougher, denser version of the Stonecap Mushroom, often found in deeper fissures or at higher altitudes.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Mountain",
      "Underdark"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Stonecap Mushroom",
    "Description": "A tough, earthy mushroom that grows on rocky outcrops.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Hill"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Mid Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Storm Giant Heart (Ritually Prepared)",
    "Description": "The pinnacle of giant-derived ingredients. It is extremely rare and dangerous to acquire.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Mountain"
    ],
    "Effects": [
      "Rumored to grant immense elemental power or control over storms for a brief period.",
      "If prepared by an expert (Giant ingredient), the consumer gains the following culinary benefits:",
      "The consumer gains a 1d4 bonus to Strength checks and saving throws.",
      "Consumer can use a bonus action to gain a 1d6 bonus to their next attack and damage roll before the start of their next turn. This effect lasts until the creature finishes a long rest or after 24 hours, whichever comes first."
    ],
    "Purchase Price": "50 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools (Enchanted)",
        "Arcane Focus",
        "Ritual Components",
        "Container(s), Large"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils (Enchanted)",
        "Alchemist's Kit",
        "Magical Heat Source"
      ]
    }
  },
  {
    "Name": "Strawberry Leaves",
    "Description": "Leaves from the strawberry plant taken just as the berries have turned from green to white, which can be used as a purifying tea.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Grassland"
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Late Spring",
        "Early Summer"
      ]
    },
    "Preparation": {
      "Method": "Prepared as a tea."
    }
  },
  {
    "Name": "Street Sprout",
    "Description": "Any small, edible sprout growing unexpectedly in cracks or planters.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Urban"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Trowel",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Subterranean Squash",
    "Description": "A pale, thick-skinned squash that grows in underground chambers, often cultivated by denizens.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Underdark"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Trowel",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Succubus/Incubus Kiss (Congealed Essence)",
    "Description": "A highly potent, solidified residue of their corrupted charm and lust, often found at the site of their defeat or a place they frequented.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Any"
    ],
    "Effects": [
      "Can temporarily enhance charisma or manipulative abilities, but at a severe moral or psychological cost.",
      "If prepared by an expert (Fiend ingredient), the consumer gains the following culinary benefits: Nutritional Value: When a creature within 20 feet of the consumer makes an attack or saving throw, the consumer can use their reaction to reduce that creature’s roll by 1d4. This effect lasts until the creature finishes a long rest or after 24 hours, whichever comes first."
    ],
    "Purchase Price": "50 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Sealed Vials"
      ]
    },
    "Preparation": {
      "Method": "Congealed."
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    },
    "Notes": "Carries a severe moral or psychological cost."
  },
  {
    "Name": "Sugarcane",
    "Description": "A tall, perennial grass primarily cultivated in tropical and subtropical regions for its sweet, fibrous stalks. These stalks are the main source of sugar, and their juice can also be fermented to produce alcoholic beverages like rum or distilled into ethanol. In a culinary context, it can be used fresh for its subtly sweet flavor or processed into various forms of sugar for a wide range of dishes.",
    "Ingredient Type": "Plant-based",
    "Locations": [],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Late Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Sulfur Crystals (edible variant)",
    "Description": "Bright yellow crystals found near volcanic vents or geysers, with a pungent, fiery taste.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible",
    "Locations": [
      "Underdark"
    ],
    "Effects": [
      "Can be used as a powerful seasoning, but too much is toxic."
    ],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Chisel",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Mortar and Pestle"
      ]
    }
  },
  {
    "Name": "Sun-Baked Spore",
    "Description": "A tough, dry fungal growth found on sun-drenched rocks.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Desert"
    ],
    "Effects": [
      "Offers minimal nutrition.",
      "It can be rehydrated or ground into a thickening agent.",
      "This ingredient has no other special effects."
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "mid Summer"
      ]
    },
    "Preparation": {
      "Method": "Can be rehydrated or ground into a thickening agent."
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Sun-Kissed Clover",
    "Description": "A common clover with a slightly sweet taste.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Grassland"
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Early Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Sun-Kissed Quartz",
    "Description": "Small, naturally occurring quartz crystals found in sun-drenched grasslands.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Grassland"
    ],
    "Effects": [
      "Chewing on them provides a subtle, refreshing effervescence and mineral boost."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Container(s)",
        "Scoop"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {}
  },
  {
    "Name": "Sunken Temple Algae",
    "Description": "A strange, glowing algae found in ancient, flooded jungle ruins.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Jungle"
    ],
    "Effects": [
      "Said to possess minor restorative properties."
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Fine Net",
        "Bag, Waterproof",
        "Underwater Breathing Apparatus"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Sunpetal Flower",
    "Description": "A bright, sun-loving flower.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest"
    ],
    "Effects": [
      "When brewed as a tea, it can help with fatigue."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "mid Spring"
      ]
    },
    "Preparation": {
      "Method": "Brewed as a tea."
    }
  },
  {
    "Name": "Sunstone Orchid Nectar",
    "Description": "A rare orchid that absorbs sunlight and glows faintly.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Desert"
    ],
    "Effects": [
      "Eating its petals provides a minor boost to endurance in hot environments, or its concentrated nectar can be extracted."
    ],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Container(s)"
      ],
      "Seasons": [
        "Early Summer"
      ]
    },
    "Preparation": {
      "Method": "Concentrated nectar can be extracted."
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Sunstone Orchid",
    "Description": "A rare orchid that absorbs sunlight and glows faintly.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Desert"
    ],
    "Effects": [
      "Eating its petals provides a minor boost to endurance in hot environments."
    ],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit"
      ],
      "Seasons": [
        "Early Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Swamp Cabbage",
    "Description": "A leafy vegetable that grows in wet, marshy areas.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Jungle",
      "Swamp"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife",
        "Bag, Waterproof"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Swamp Gas Bloom (crystallized)",
    "Description": "A rare, crystallized residue left when highly potent swamp gas interacts with specific minerals.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Swamp"
    ],
    "Effects": [
      "It can be crushed and sprinkled as a pungent, mind-altering seasoning."
    ],
    "Purchase Price": "1 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Container(s)",
        "Alchemist's Kit"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Preparation": {
      "Method": "Crushed."
    },
    "Cooking": {
      "Method": "Used as a seasoning.",
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Tangle Root",
    "Description": "A tough, fibrous root that, when boiled for a long time, becomes edible and nutritious.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Jungle"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Trowel",
        "Knife"
      ],
      "Seasons": [
        "Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot"
      ]
    }
  },
  {
    "Name": "Taro (corms)",
    "Description": "Starchy root vegetable that thrives in wet jungle conditions.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Jungle"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Trowel",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Late Summer/Early Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Tepary Beans",
    "Description": "Drought-resistant beans, a staple in some desert cultures.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Desert"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Late Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Thistle (stems/roots)",
    "Description": "Young stems and roots of certain thistles are edible after preparation.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest",
      "Grassland",
      "Hill",
      "Urban",
      "Wasteland"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Gloves, Thick",
        "Knife"
      ],
      "Seasons": [
        "Spring/Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot"
      ]
    }
  },
  {
    "Name": "Thistlebloom",
    "Description": "A prickly plant, but its inner stalks can be cooked and eaten, providing a good source of fiber.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Grassland",
      "Hill",
      "Wasteland"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Gloves, Thick",
        "Knife"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Thunderstone Dust",
    "Description": "Fine dust from stones struck by lightning on mountaintops.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Mountain"
    ],
    "Effects": [
      "Can cause a temporary \"buzz\" of static energy, useful for minor electrical effects."
    ],
    "Purchase Price": "1 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Chisel",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Alchemist's Kit",
        "Mortar and Pestle",
        "Non-Reactive Cookware"
      ]
    }
  },
  {
    "Name": "Tidal Foam Jelly",
    "Description": "A naturally occurring, somewhat elastic jelly formed by specific coastal algae and mineral interactions, tasting faintly of iodine and seaweed.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Coastal"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Scoop",
        "Container(s)",
        "Bag, Waterproof"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Non-Reactive Cookware"
      ]
    }
  },
  {
    "Name": "Tidepool Bloom",
    "Description": "A vibrant, gelatinous plant found in tidepools that, when consumed, can help with minor cuts and scrapes.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Coastal"
    ],
    "Effects": [
      "When consumed, can help with minor cuts and scrapes."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife",
        "Bag, Waterproof"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Tomato",
    "Description": "Leaves from the tomato plant picked in the summer season.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Grassland"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Knife",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Tree Sap",
    "Description": "Sweet, clear sap from certain trees, good for energy and a natural sweetener.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Arctic",
      "Coastal",
      "Forest",
      "Grassland",
      "Hill",
      "Jungle",
      "Mountain",
      "Urban"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Tapping Tools",
        "Container(s)"
      ],
      "Seasons": [
        "Early Spring"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Evaporation Dish"
      ]
    }
  },
  {
    "Name": "Triton Roe",
    "Description": "Small, briny eggs from aquatic humanoids, sometimes traded.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Coastal",
      "Underwater"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Fishing Net",
        "Scoop",
        "Container(s)"
      ],
      "Seasons": [
        "Spring"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Triton's Breath Algae",
    "Description": "A glowing algae found in deep-sea currents, rumored to allow temporary water breathing.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Underwater"
    ],
    "Effects": [
      "Rumored to allow temporary water breathing."
    ],
    "Purchase Price": "5 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Fine Net",
        "Bag, Waterproof",
        "Underwater Breathing Apparatus"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Troglodyte Flesh",
    "Description": "Extremely foul-smelling, tough, and repulsive, but edible in dire circumstances.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Jungle",
      "Swamp",
      "Underdark"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Knife",
        "Bag, Large",
        "Disinfectant"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot",
        "Purifying Agents"
      ]
    }
  },
  {
    "Name": "Troll Meat (prepared)",
    "Description": "Regenerating flesh, tough and stringy, but potentially infinite if managed carefully.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Wasteland"
    ],
    "Effects": [
      "If cooked properly, roll a 1d6. If a 1 is rolled, specific results apply. This can include:",
      "1-3. Crush: Take 1d6 damage and develop a splitting headache.",
      "4-6. Blast: Flung 1d4x10 feet in a random direction, taking 1d6 damage per 10 feet traveled.",
      "7-8. Burst: Swap Intelligence characteristics with the nearest adjacent living creature larger than a dog for 1d6 days. On a failed save, the effect is permanent.",
      "9. Troll Sprouts: Permanently gain +1 Strength and +1 HP, hair falls out and is replaced by repulsive black bristles; if a limb is lost, there is a 1-in-6 chance it will crawl away and grow into a troll-like version of you.",
      "10. Troll Ascendance: Permanently gain +1 Strength and +1 HP, and regeneration (1 HP/turn), but slowly become a ravenous troll over 1d6 days. The effect of becoming a troll can be cured by using a Remove Curse spell."
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Fire Source",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Heat Source",
        "Alchemist's Kit"
      ]
    }
  },
  {
    "Name": "Truffle (various species)",
    "Description": "Highly prized subterranean fungi, often found near tree roots.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Underdark"
    ],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Trowel",
        "Fine Brush",
        "Basket"
      ],
      "Seasons": [
        "Autumn/Winter"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Tundra Blueberry",
    "Description": "Smaller, hardier varieties of blueberries.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Arctic"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Basket",
        "Bag",
        "Gloves, Insulated"
      ],
      "Seasons": [
        "Late Summer"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Turkey (Farm-raised)",
    "Description": "Mild, tender poultry meat, common on farms.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Grassland",
      "Urban"
    ],
    "Effects": [
      "On a d6 roll of 1, the consumer must make a Constitution saving throw or lose any benefit from the meal and spend the rest of the day queasy and gassy",
      "On a roll of 2-5, there is no extra effect.",
      "On a roll of 6, it is delicious and heals 1 HP."
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Knife",
        "Plucking Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Roasting Pan"
      ]
    }
  },
  {
    "Name": "Turkey (Wild Fowl)",
    "Description": "Lean, distinctively gamey meat from native wild populations.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Forest",
      "Grassland"
    ],
    "Effects": [
      "On a d6 roll of 1, the consumer must make a Constitution saving throw or lose any benefit from the meal and spend the rest of the day queasy and gassy",
      "On a roll of 2-5, there is no extra effect.",
      "On a roll of 6, it is delicious and heals 1 HP."
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Knife",
        "Plucking Tools"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Roasting Pan"
      ]
    }
  },
  {
    "Name": "Ulmus",
    "Description": "Bark from the ulmus (elm).",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Forest"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Drying Rack"
      ],
      "Seasons": [
        "Early Spring"
      ]
    },
    "Cooking": {}
  },
  {
    "Name": "Umber Hulk Meat",
    "Description": "Dense, dark, and earthy, often leaving a strange aftertaste. It is described as smooth, mottled fish with an acidic aftertaste. When roasted in its shell, it is traditionally served with cabbage and wine.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Underdark"
    ],
    "Effects": [
      "When roasted in its shell, it is considered Normal Meat.",
      "If the eyes are eaten, the consumer must make a saving throw or permanently lose 1d6 Intelligence."
    ],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Bone Saw",
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot, Large"
      ]
    },
    "Notes": "Considered a \"dungeon delicacy\"."
  },
  {
    "Name": "Underdark Geode Syrup",
    "Description": "A thick, sweet syrup extracted from crystal geodes found deep underground, infused with mineral flavors.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Underdark"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Chisel",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Alchemist's Kit"
      ]
    }
  },
  {
    "Name": "Unicorn Horn (ground)",
    "Description": "While typically non-edible, a small amount of ground horn could provide healing or purification properties when mixed with food or drink, according to some lore. Comes with a moral effect of consuming a pure creature.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Forest"
    ],
    "Effects": [
      "Provides healing or purification properties when mixed with food/drink."
    ],
    "Purchase Price": "50 gp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Chisel",
        "Mortar and Pestle",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Alchemist's Kit",
        "Non-Reactive Cookware"
      ]
    }
  },
  {
    "Name": "Vampire Heart (Desecrated & Consumed)",
    "Description": "The still, cold heart of a slain vampire. If consumed in a ritual of dark power, it is rumored to grant temporary divine resilience and might allow one to radiate a faint, protective light.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Any"
    ],
    "Effects": [
      "If consumed in a ritual of dark power, it is rumored to grant temporary regeneration or a boost to Charisma (Intimidation), but almost guarantees vampiric urges, a profound curse, or spiritual corruption."
    ],
    "Purchase Price": "50 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Knife",
        "Ritual Components",
        "Container(s)"
      ]
    },
    "Cooking": {},
    "Notes": "If consumed in a ritual of dark power, it is rumored to grant temporary divine resilience and might allow one to radiate a faint, protective light."
  },
  {
    "Name": "Vrock Plume (Foul Essence)",
    "Description": "A feather from a Vrock, infused with its abyssal stench. When purified and consumed, it can temporarily grant immunity to its spores or a brief, intoxicating sense of freedom.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Any"
    ],
    "Effects": [
      "When purified and consumed, it can temporarily grant immunity to its spores or a brief, intoxicating sense of freedom."
    ],
    "Purchase Price": "50 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Fine Clippers",
        "Sealed Vials",
        "Mask"
      ]
    },
    "Preparation": {
      "Method": "Requires purification."
    },
    "Cooking": {
      "Required Kit": [
        "Alchemist's Kit",
        "Distillation Apparatus",
        "Non-Reactive Cookware"
      ]
    }
  },
  {
    "Name": "Vulture Gizzard",
    "Description": "Tough, but a usable organ meat for desperate adventurers.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Desert"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Knife",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot"
      ]
    }
  },
  {
    "Name": "Wall Lichen (Urban)",
    "Description": "Similar to rock lichen but adapted to grow on brick, concrete, or stone walls in damp, shaded urban spots.",
    "Ingredient Type": "Fungal",
    "Locations": [
      "Urban"
    ],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Scraper",
        "Basket",
        "Bag"
      ],
      "Seasons": [
        "Year around"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Walrus Blubber",
    "Description": "Extremely fatty, high-calorie food source, essential for warmth in cold climates.",
    "Ingredient Type": "Meat-based",
    "Locations": [
      "Arctic",
      "Coastal"
    ],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": [
        "Butcher's Tools",
        "Knife",
        "Container(s)"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils",
        "Pot, Large"
      ]
    }
  },
  {
    "Name": "Water Chestnuts",
    "Description": "Crunchy corms from an aquatic plant.",
    "Ingredient Type": "Plant-based",
    "Locations": [
      "Underwater"
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": [
        "Herbalism Kit",
        "Scoop",
        "Bag, Waterproof"
      ],
      "Seasons": [
        "Late Summer/Early Autumn"
      ]
    },
    "Cooking": {
      "Required Kit": [
        "Cook's Utensils"
      ]
    }
  },
  {
    "Name": "Water Elemental Core (trace)",
    "Description": "A small, gelatinous remnant from a defeated Water Elemental, found in frigid waters. Refreshing and hydrating.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": [
      "Arctic",
      "Coastal",
      "Swamp",
      "Underwater"
    ],
    "Effects": [
      "Refreshing and hydrating."
    ],
    "Purchase Price": "1 gp per unit",
    "Harvesting": {
      "Required Kit": [
        "Alchemist's Kit",
        "Fine Net",
        "Sealed Vials",
        "Container(s)"
      ]
    },
    "Cooking": {}
  },
  {
    "Name": "Water Lily (roots/seeds)",
    "Description": "Roots (rhizomes) and seeds are edible.",
    "Ingredient Type": "Plant-based",
    "Locations": ["Underwater", "Swamp"],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Scoop", "Bag, Waterproof"]
    },
    "Seasons": ["Summer", "Early Autumn"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "Water Spinach (Kangkong)",
    "Description": "Leafy green found in wet areas.",
    "Ingredient Type": "Plant-based",
    "Locations": ["Jungle", "Underwater"],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Knife", "Bag, Waterproof"]
    },
    "Seasons": ["Summer"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "Watercress",
    "Description": "Peppery aquatic green.",
    "Ingredient Type": "Plant-based",
    "Locations": ["Coastal", "Forest", "Grassland", "Urban", "Underwater"],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Knife", "Bag, Waterproof"]
    },
    "Seasons": ["Spring", "Summer"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "Whisperwood Sap",
    "Description": "Sweet, clear sap from certain ancient trees, good for energy.",
    "Ingredient Type": "Plant-based",
    "Locations": ["Forest"],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Tapping Tools", "Container(s)"]
    },
    "Seasons": ["Early Spring"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "White Dragon Meat",
    "Description": "Icy, tough, and gamey. Consuming it causes a chilling sensation and can grant a fleeting resistance to cold damage. Its flesh tastes of \"raw magic,\" feels heavy but flakes like fish, and consuming it can result in cosmetic improvements like no cavities, better breath, vanishing bald spots, and improved eyesight, making one feel like \"the 'after' picture in a thousand internet ads\".",
    "Ingredient Type": "Meat-based",
    "Locations": ["Arctic", "Mountain"],
    "Effects": [
      "Can grant a fleeting resistance to cold damage.",
      "Causes a chilling sensation.",
      "If prepared by an expert, it can grant resistance to the dragon's damage type (Cold for White Dragon).",
      "Cosmetic improvements: no cavities, better breath, vanishing bald spots, and improved eyesight."
    ],
    "Purchase Price": "3 gp per pound",
    "Harvesting": {
      "Required Kit": ["Butcher's Tools (Enchanted)", "Arcane Focus", "Gloves, Insulated", "Container(s), Large"]
    },
    "Cooking": {
      "Method": "Can be cooked, boiled, fried, or dried.",
      "Required Kit": ["Cook's Utensils (Enchanted)", "Alchemist's Kit", "Magical Heat Source"]
    },
    "Duration": "Culinary benefits from expert preparation last until the creature finishes a long rest or after 24 hours, whichever comes first.",
    "Notes": "Its flesh tastes of 'raw magic,' feels heavy but flakes like fish, and consuming it can result in cosmetic improvements like no cavities, better breath, vanishing bald spots, and improved eyesight, making one feel like 'the after picture in a thousand internet ads'. Eating dragon parts, raw or cooked, is 'almost sacrilegious' due to their value to wizards and alchemists."
  },
  {
    "Name": "Wight Essence (Congealed Shadow)",
    "Description": "A rare, ephemeral fragment of shadow essence congealed from a defeated Wight.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": ["Any"],
    "Effects": [
      "Has a 15% chance of briefly granting necrotic resistance or a chilling aura.",
      "Has a 40% chance of inflicting soul-draining effects and a lasting connection to death."
    ],
    "Purchase Price": "15 gp per ounce",
    "Harvesting": {
      "Required Kit": ["Alchemist's Kit"]
    }
  },
  {
    "Name": "Wild Amaranth (leaves/seeds)",
    "Description": "Leaves are edible greens, seeds are grain-like.",
    "Ingredient Type": "Plant-based",
    "Locations": ["Grassland", "Urban", "Wasteland"],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Shears", "Basket",
        "Bag"]
    },
    "Seasons": ["Summer", "Early Autumn"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "Wild Apple",
    "Description": "Smaller and tarter than cultivated apples, but edible.",
    "Ingredient Type": "Plant-based",
    "Locations": ["Forest", "Hill", "Urban"],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Basket",
        "Bag"]
    },
    "Seasons": ["Autumn"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "Wild Asparagus",
    "Description": "Can be found on sunny slopes.",
    "Ingredient Type": "Plant-based",
    "Locations": ["Coastal", "Forest", "Grassland", "Hill"],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Knife", "Basket",
        "Bag"]
    },
    "Seasons": ["Spring"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "Wild Berries (various)",
    "Description": "Blueberries, huckleberries, raspberries, blackberries, strawberries, lingonberries, cloudberries, elderberries, hawthorn berries, etc. common to many hillside habitats.",
    "Ingredient Type": "Plant-based",
    "Locations": ["Arctic", "Coastal", "Forest", "Grassland", "Hill", "Jungle", "Mountain", "Swamp", "Urban"],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Basket",
        "Bag"]
    },
    "Seasons": ["Summer", "Late Summer"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "Wild Caraway (roots/seeds)",
    "Description": "Roots are edible, seeds used for flavor.",
    "Ingredient Type": "Plant-based",
    "Locations": ["Mountain"],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Trowel", "Basket",
        "Bag"]
    },
    "Seasons": ["Summer"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "Wild Carrot/Queen Anne's Lace (root)",
    "Description": "The wild ancestor of the carrot, the root is edible (though smaller and woodier).",
    "Ingredient Type": "Plant-based",
    "Locations": ["Coastal", "Forest", "Grassland", "Hill", "Jungle", "Swamp", "Urban", "Wasteland"],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Trowel", "Basket",
        "Bag"]
    },
    "Seasons": ["Autumn"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "Wild Grains (various)",
    "Description": "Wild wheat, barley, oats, etc..",
    "Ingredient Type": "Plant-based",
    "Locations": ["Grassland"],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Shears", "Bag"]
    },
    "Seasons": ["Late Summer"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils", "Grain Mill"]
    }
  },
  {
    "Name": "Wild Grapes",
    "Description": "Often found climbing on trees and shrubs on hillsides.",
    "Ingredient Type": "Plant-based",
    "Locations": ["Forest", "Grassland", "Hill", "Urban"],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Shears", "Basket",
        "Bag"]
    },
    "Seasons": ["Late Summer", "Early Autumn"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "Wild Leeks",
    "Description": "A pungent, flavorful wild onion found in rocky soil.",
    "Ingredient Type": "Plant-based",
    "Locations": ["Hill"],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Trowel", "Basket",
        "Bag"]
    },
    "Seasons": ["Early Spring"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "Wild Lettuce",
    "Description": "Various species of wild lettuce, some bitter but edible.",
    "Ingredient Type": "Plant-based",
    "Locations": ["Forest", "Grassland", "Urban", "Wasteland"],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Knife", "Basket",
        "Bag"]
    },
    "Seasons": ["Summer"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "Wild Mushrooms (various edible species)",
    "Description": "Morels, Chanterelles, Bolete species, Oyster mushrooms (identification is critical).",
    "Ingredient Type": "Fungal",
    "Locations": ["Forest"],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Knife", "Basket"]
    },
    "Seasons": ["Spring", "Autumn"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils", "Non-Reactive Cookware"]
    },
    "Notes": "identification is critical"
  },
  {
    "Name": "Wild Mustard (Coastal varieties)",
    "Description": "Some species thrive in coastal conditions.",
    "Ingredient Type": "Plant-based",
    "Locations": ["Coastal"],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Knife", "Basket",
        "Bag"]
    },
    "Seasons": ["Spring"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "Wild Mustard Greens",
    "Description": "Pungent greens.",
    "Ingredient Type": "Plant-based",
    "Locations": ["Hill"],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Knife", "Basket",
        "Bag"]
    },
    "Seasons": ["Spring", "Autumn"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "Wild Mustard/Garlic Mustard",
    "Description": "Pungent leaves and flowers.",
    "Ingredient Type": "Plant-based",
    "Locations": ["Forest", "Grassland", "Hill", "Urban"],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Knife", "Basket",
        "Bag"]
    },
    "Seasons": ["Spring"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "Wild Onion/Garlic",
    "Description": "Various wild species with onion or garlic flavors.",
    "Ingredient Type": "Plant-based",
    "Locations": ["Grassland", "Urban", "Wasteland"],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Trowel", "Basket",
        "Bag"]
    },
    "Seasons": ["Spring"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "Wild Onions/Leeks",
    "Description": "Growing in rocky or well-drained soil.",
    "Ingredient Type": "Plant-based",
    "Locations": ["Hill"],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Trowel", "Basket",
        "Bag"]
    },
    "Seasons": ["Spring"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "Wild Potato (Andean varieties)",
    "Description": "Ancestral forms of potatoes found in high altitudes.",
    "Ingredient Type": "Plant-based",
    "Locations": ["Mountain"],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Trowel", "Basket",
        "Bag"]
    },
    "Seasons": ["Late Summer", "Early Autumn"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "Wild Rhubarb",
    "Description": "Tart stalks that can be cooked into dishes.",
    "Ingredient Type": "Plant-based",
    "Locations": ["Arctic", "Grassland", "Hill", "Mountain"],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Knife", "Basket",
        "Bag"]
    },
    "Seasons": ["Spring"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "Wild Rice (grains)",
    "Description": "Grains from aquatic grass (grown in shallow water).",
    "Ingredient Type": "Plant-based",
    "Locations": ["Swamp", "Underwater"],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Shears", "Bag"]
    },
    "Seasons": ["Late Summer"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils", "Grain Mill"]
    }
  },
  {
    "Name": "Wild Sheep Meat",
    "Description": "Lean, mild, and common.",
    "Ingredient Type": "Meat-based",
    "Locations": ["Hill"],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": ["Butcher's Tools", "Knife", "Bag, Large"]
    },
    "Cooking": {
      "Required Kit": ["Cook's Utensils", "Roasting Pan"]
    }
  },
  {
    "Name": "Wild Vetch (peas/pods)",
    "Description": "Various species of vetch produce small pea-like pods.",
    "Ingredient Type": "Plant-based",
    "Locations": ["Forest", "Grassland", "Urban"],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Shears", "Basket",
        "Bag"]
    },
    "Seasons": ["Summer"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "Will-o'-wisp Smoke (congealed)",
    "Description": "A very rare occurrence where a Will-o'-wisp's ethereal smoke congeals into a stable, edible form in eerie, magically charged bogs. Must be stored in light-proof vials to prevent it from dissipating.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": ["Forest", "Swamp"],
    "Effects": [
      "Might offer a fleeting, unsettling glow and temporary stealth benefits in darkness."
    ],
    "Purchase Price": "5 gp per unit",
    "Harvesting": {
      "Required Kit": ["Alchemist's Kit", "Fine Net", "Sealed Vials", "Ritual Components"]
    },
    "Preparation": {
      "Method": "Congealed."
    },
    "Cooking": {
      "Required Kit": ["Alchemist's Kit", "Non-Reactive Cookware"]
    }
  },
  {
    "Name": "Willo' the Wisp Bloom",
    "Description": "A bioluminescent flower that glows faintly in the dark, said to improve night vision for a short time if consumed.",
    "Ingredient Type": "Plant-based",
    "Locations": ["Mountain", "Swamp"],
    "Effects": [
      "Improved night vision for a short time when consumed."
    ],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Knife", "Container(s)"]
    },
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "Willow",
    "Description": "Bark from a tree with long drooping branches and small leaves that grows in wet ground.",
    "Ingredient Type": "Plant-based",
    "Locations": ["Coastal", "Swamp"],
    "Effects": [
      "When ingested as an infusion, at the beginning of the consumer's next turn, the creature regains 5 (2d4) hit points."
    ],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Drying Rack"]
    },
    "Seasons": ["Autumn", "Winter", "Spring"],
    "Preparation": {
      "Method": "Prepared as an infusion."
    },
    "Expiration": "Expires after 1 week."
  },
  {
    "Name": "Wind Elemental Residue",
    "Description": "A faint, almost imperceptible residue left after a powerful gust or a minor wind elemental has passed.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": ["Grassland"],
    "Effects": [
      "Provides a brief burst of speed or lightness."
    ],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": ["Alchemist's Kit", "Fine Net", "Sealed Vials", "Brush"]
    }
  },
  {
    "Name": "Wind-Swept Onion",
    "Description": "A wild onion with a strong, pungent flavor.",
    "Ingredient Type": "Plant-based",
    "Locations": ["Grassland"],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Trowel", "Basket",
        "Bag"]
    },
    "Seasons": ["Spring"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "Winter cherry",
    "Description": "A shrub with small, green flowers and an orange-red fruit which can be toxic. If improperly prepared, it can be toxic.",
    "Ingredient Type": "Plant-based",
    "Locations": ["Forest"],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Gloves, Thick", "Container(s)"]
    },
    "Seasons": ["Late Autumn", "Early Winter"]
  },
  {
    "Name": "Winter Wolf Steak",
    "Description": "Lean, tough, but flavorful meat.",
    "Ingredient Type": "Meat-based",
    "Locations": ["Arctic"],
    "Purchase Price": "3 sp per pound",
    "Harvesting": {
      "Required Kit": ["Butcher's Tools", "Knife", "Bag"]
    },
    "Cooking": {
      "Required Kit": ["Cook's Utensils", "Roasting Pan"]
    }
  },
  {
    "Name": "Witch's Butter",
    "Description": "A gelatinous, orange-yellow fungus that grows on dead wood. Edible but bland, primarily used for its unusual texture or as a base for flavorings.",
    "Ingredient Type": "Fungal",
    "Locations": ["Forest"],
    "Purchase Price": "5 cp per ounce",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Scoop", "Container(s)"]
    },
    "Seasons": ["Autumn", "Winter"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "Wolf Flank",
    "Description": "Tough, gamey, but provides good sustenance.",
    "Ingredient Type": "Meat-based",
    "Locations": ["Grassland", "Hill"],
    "Purchase Price": "1 sp per pound",
    "Harvesting": {
      "Required Kit": ["Butcher's Tools", "Knife", "Bag, Large"]
    },
    "Cooking": {
      "Required Kit": ["Cook's Utensils", "Roasting Pan"]
    }
  },
  {
    "Name": "Wolfberry (Goji Berry)",
    "Description": "Small, orange-red berries.",
    "Ingredient Type": "Plant-based",
    "Locations": ["Desert", "Hill", "Wasteland"],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Basket",
        "Bag"]
    },
    "Seasons": ["Summer", "Autumn"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "Wolfsbane",
    "Description": "A tall plant with large, purple flowers.",
    "Ingredient Type": "Plant-based",
    "Locations": ["Mountain"],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": ["Poisoner's Kit", "Herbalism Kit", "Gloves, Thick", "Container(s)"]
    },
    "Seasons": ["Autumn"]
  },
  {
    "Name": "Wyvern Steak",
    "Description": "Gamey, tough, often infused with a faint sulfurous taste. Provides substantial sustenance.",
    "Ingredient Type": "Meat-based",
    "Locations": ["Arctic", "Desert", "Forest", "Jungle", "Mountain", "Swamp", "Underdark", "Wasteland"],
    "Purchase Price": "3 gp per pound",
    "Harvesting": {
      "Required Kit": ["Butcher's Tools"]
    },
    "Cooking": {
      "Required Kit": ["Cook's Utensils", "Pot"]
    }
  },
  {
    "Name": "Wyvern's Tear Crystal",
    "Description": "Small, luminous crystals found in wyvern lairs, rumored to enhance stamina when dissolved in water.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": ["Mountain", "Forest", "Hill", "Wasteland"],
    "Effects": [
      "Rumored to enhance stamina when dissolved in water."
    ],
    "Purchase Price": "1 gp per unit",
    "Harvesting": {
      "Required Kit": ["Alchemist's Kit", "Chisel", "Container(s)"]
    },
    "Preparation": {
      "Method": "Must be dissolved in water."
    },
    "Cooking": {
      "Required Kit": ["Alchemist's Kit", "Mortar and Pestle", "Non-Reactive Cookware"]
    }
  },
  {
    "Name": "Xorn (stone chips)",
    "Description": "While the Xorn creature itself is stone, fine, edible stone chips or mineral secretions might be harvested from it, offering a taste of pure earth and grounding properties.",
    "Ingredient Type": "Non-Meat and Non-Plant Edible Ingredients",
    "Locations": ["Underdark"],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": ["Alchemist's Kit", "Mason's Tools", "Mortar and Pestle", "Container(s)"]
    },
    "Cooking": {
      "Required Kit": ["Alchemist's Kit", "Non-Reactive Cookware"]
    }
  },
  {
    "Name": "Xorn Organ Meat",
    "Description": "Specific internal organs from a Xorn might be edible after careful extraction, providing a distinct mineral flavor and grounding properties.",
    "Ingredient Type": "Meat-based",
    "Locations": ["Mountain", "Underdark"],
    "Purchase Price": "3 gp per pound",
    "Harvesting": {
      "Required Kit": ["Butcher's Tools (Enchanted)", "Container(s)"]
    },
    "Cooking": {
      "Required Kit": ["Cook's Utensils", "Pot"]
    }
  },
  {
    "Name": "Yam (wild varieties)",
    "Description": "Various starchy tubers.",
    "Ingredient Type": "Plant-based",
    "Locations": ["Jungle"],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Digging Tools"]
    },
    "Seasons": ["Autumn"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "Yeti Heart (cooked)",
    "Description": "A rare delicacy, said to provide temporary resistance to cold and a surge of primal strength when properly prepared.",
    "Ingredient Type": "Meat-based",
    "Locations": ["Arctic"],
    "Effects": [
      "Said to provide temporary resistance to cold and a surge of primal strength when properly prepared."
    ],
    "Purchase Price": "15 gp per unit",
    "Harvesting": {
      "Required Kit": ["Butcher's Tools", "Gloves, Insulated", "Knife", "Container(s)"]
    },
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "Yeti's Breath Fungus",
    "Description": "A rare, bluish-white fungus that grows in icy caves. When broken open, it releases a cloud of frosty spores that can momentarily disorient or lightly frost creatures. Eating it might grant a slight breath-holding boost in cold water.",
    "Ingredient Type": "Fungal",
    "Locations": ["Arctic"],
    "Effects": [
      "When broken open, it releases a cloud of frosty spores that can momentarily disorient or lightly frost creatures.",
      "Eating it might grant a slight breath-holding boost in cold water."
    ],
    "Purchase Price": "1 gp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Gloves, Insulated", "Container(s)", "Mask"]
    },
    "Seasons": ["Winter"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "Yucca (flowers/pods/stalks)",
    "Description": "Various edible parts, very drought-tolerant.",
    "Ingredient Type": "Plant-based",
    "Locations": ["Wasteland"],
    "Purchase Price": "5 cp per pound",
    "Harvesting": {
      "Required Kit": ["Herbalism Kit", "Knife", "Basket",
        "Bag"]
    },
    "Seasons": ["Summer"],
    "Cooking": {
      "Required Kit": ["Cook's Utensils"]
    }
  },
  {
    "Name": "Zombie Brain (Morbidly Cooked)",
    "Description": "A brain from a freshly slain zombie, morbidly cooked to theoretically \"sterilize\" it.",
    "Ingredient Type": "Meat-based",
    "Locations": ["Any", "Wasteland"],
    "Effects": [
      "Vile sustenance provided in extreme desperation.",
      "Carries a high risk of disease (such as Zombie Rot), madness, or necromantic contamination.",
      "On consumption (equivalent to a d6 roll of 1): The consumer must make a Constitution saving throw or lose any benefit from the meal, and spend the rest of the day queasy and gassy. Due to the -4 penalty, this is a very likely outcome.",
      "On consumption (equivalent to a d6 roll of 2): There is no extra effect. Due to the -4 penalty, this is the only other possible outcome, meaning no healing benefits are gained.",
      "May need to make a saving throw to avoid becoming a ghoul if several meals of it are consumed."
    ],
    "Purchase Price": "15 gp per unit",
    "Harvesting": {
      "Required Kit": ["Butcher's Tools", "Disinfectant", "Container(s)", "Gloves, Protective"]
    },
    "Cooking": {
      "Method": "Morbidly cooked to theoretically \"sterilize\" it.",
      "Required Kit": ["Cook's Utensils", "Pot", "Purifying Agents"]
    },
    "Duration": "Queasiness and gassiness: Lasts \"the rest of the day\".",
    "Notes": "It is \"morbidly cooked to theoretically 'sterilize' it\". The raw zombie flesh is described as \"disgusting, rotting pork\"."
  }
]