// from https://www.gmbinder.com/share/-LnxbcAMGjcu9yTWKfM9
let ingredient = {
    "Bittergreen": {
        name: "Bittergreen",
        rarity: "common",
        details: "Can combine with any other Potion Effect ingredient to become a food source for 1 day. Cannot be altered by other ingredients.",
        description: "",
        DC: "0",
        ingredientType: "potion",
        GrowsIn: ["Most Terrain"]
    },
    "Emetic Wax": {
        name: "Emetic Wax",
        rarity: "common",
        details: "Delay the Effect of an ingredient this was combined with by 1d6 rounds.",
        description: "",
        DC: "+1",
        ingredientType: "potion",
        GrowsIn: ["Forest", "Swamp"]
    },
    "Fennel Silk": {
        name: "Fennel Silk",
        rarity: "common",
        details: "Stabilizes body heat to resist cold weather or wet condition penalties for 1 hour. Cannot be altered by other ingredients.",
        description: "",
        DC: "+2",
        ingredientType: "potion",
        GrowsIn: ["Arctic", "Underdark"]
    },
    "Hyancinth Nectar": {
        name: "Hyancinth Nectar",
        rarity: "common",
        details: "Removes 1d6 rounds of poison in the target's system, but cannot remove it completely. One round of poison damage will still occur at minimum.",
        description: "",
        DC: "+1",
        ingredientType: "potion",
        GrowsIn: ["Coastal", "Grasslands"]
    },
    "Lavender Sprig": {
        name: "Lavender Sprig",
        rarity: "common",
        details: "Makes the potion or toxin more stable and safer to craft.",
        description: "",
        DC: "-2",
        ingredientType: "potion",
        GrowsIn: ["Coastal", "Grasslands", "Hills"]
    },
    "Mandrake Root": {
        name: "Mandrake Root",
        rarity: "common",
        details: "Reduce any disease or poison’s potency by half for 2d12 hours. Only hinders already existing poisons or diseases in the body. Cannot be altered by other ingredients.",
        description: "",
        DC: "0",
        ingredientType: "potion",
        GrowsIn: ["Most Terrain"]
    },
    "Milkweed Seeds": {
        name: "Milkweed Seeds",
        rarity: "common",
        details: "Double the dice rolled of any healing Effect, but remove all Alchemy Modifier bonuses. This modifier can stack.",
        description: "",
        DC: "+2",
        ingredientType: "potion",
        GrowsIn: ["Most Terrain"]
    },
    "Wild Sageroot": {
        name: "Wild Sageroot",
        rarity: "common",
        details: "Heals for 2d4 + Alchemy Modifier.",
        description: "",
        DC: "0",
        ingredientType: "potion",
        GrowsIn: ["Most Terrain"]
    },
    "Dried Ephedra": {
        name: "Dried Ephedra",
        rarity: "uncommon",
        details: "Increase the dice-type by 1 size for any healing Effect. This modifier can stack.",
        description: "",
        DC: "+2",
        ingredientType: "potion",
        GrowsIn: ["Desert", "Mountain"]
    },
    "Gengko Brush": {
        name: "Gengko Brush",
        rarity: "uncommon",
        details: "Double the dice rolled of any healing Effect, but divide the total of the dice by 2 (rounding down); Then, the recipient receives that amount of healing per round for 2 rounds.",
        description: "",
        DC: "+2",
        ingredientType: "potion",
        GrowsIn: ["Hills", "Underdark"]
    },
    "Chromus Slime": {
        name: "Chromus Slime",
        rarity: "rare",
        details: "The final Effect after all other calculations is the exact opposite. This is up to the DM's discretion on the specifics per potion/poison.",
        description: "",
        DC: "+4",
        ingredientType: "potion",
        GrowsIn: ["Coastal", "Underdark"]
    },
    "Eyebright": {
        name: "Eyebright",
        rarity: "rare",
        details: "Can be turned into an ointment and applied to ones eyes before a long rest to prevent & cure the disease Sight Rot.",
        description: "",
        DC: "+2",
        ingredientType: "potion",
        GrowsIn: ["Swamp"]
    },
    "Bloodgrass": {
        name: "Bloodgrass",
        rarity: "common",
        details: "Can combine with Devil's Bloodleaf to create a potion of vitality (DMG 188).",
        description: "",
        DC: "0",
        ingredientType: "enchantment",
        GrowsIn: ["Most Terrain"]
    },
    "Scillia Beans": {
        name: "Scillia Beans",
        rarity: "common",
        details: "User creates a potion of climbing (DMG 187).",
        description: "",
        DC: "+1",
        ingredientType: "enchantment",
        GrowsIn: ["Desert", "Grasslands"]
    },
    "Arrow Root": {
        name: "Arrow Root",
        rarity: "uncommon",
        details: "+1 to attack rolls for one minute when applied to a weapon.",
        description: "",
        DC: "+2",
        ingredientType: "enchantment",
        GrowsIn: ["Desert", "Forest", "Grasslands"]
    },
    "Hydrathistle": {
        name: "Hydrathistle",
        rarity: "uncommon",
        details: "User creates a potion of water breathing (DMG 188).",
        description: "",
        DC: "+2",
        ingredientType: "enchantment",
        GrowsIn: ["Coastal", "Swamp"]
    },
    "Ironwood Heart": {
        name: "Ironwood Heart",
        rarity: "uncommon",
        details: "User creates a potion of growth (DMG 187).",
        description: "",
        DC: "+3",
        ingredientType: "enchantment",
        GrowsIn: ["Arctic", "Forest", "Hills"]
    },
    "Nightshade Berries": {
        name: "Nightshade Berries",
        rarity: "uncommon",
        details: "The effect of this “potion” is similar to the oil of slipperiness (DMG 184).",
        description: "",
        DC: "+3",
        ingredientType: "enchantment",
        GrowsIn: ["Forest", "Hills"]
    },
    "Verdant Nettle": {
        name: "Verdant Nettle",
        rarity: "uncommon",
        details: "User creates a potion of animal friendship (DMG 187).",
        description: "",
        DC: "+2",
        ingredientType: "enchantment",
        GrowsIn: ["Forest"]
    },
    "Blue Toadshade": {
        name: "Blue Toadshade",
        rarity: "rare",
        details: "User creates a potion of gaseous form (DMG 187).",
        description: "",
        DC: "+3",
        ingredientType: "enchantment",
        GrowsIn: ["Coastal", "Forest", "Swamp"]
    },
    "Cosmos Glond": {
        name: "Cosmos Glond",
        rarity: "rare",
        details: "User creates a potion of clairvoyance (DMG 187).",
        description: "",
        DC: "+3",
        ingredientType: "enchantment",
        GrowsIn: ["Coastal", "Desert"]
    },
    "Elemental Water": {
        name: "Elemental Water",
        rarity: "rare",
        details: "This is required as the base catalyst for all Enchantment ingredients.",
        description: "",
        DC: "+3",


        ingredientType: "enchantment",
        GrowsIn: ["All Environments"]
    },
    "Fiend's Ivy": {
        name: "Fiend's Ivy",
        rarity: "rare",
        details: "User creates a potion of mind reading (DMG 188).",
        description: "",
        DC: "+4",
        ingredientType: "enchantment",
        GrowsIn: ["Arctic", "Underdark"]
    },
    "Luminous Cap Dust": {
        name: "Luminous Cap Dust",
        rarity: "rare",
        details: "User creates a potion of heroism (DMG 188).",
        description: "",
        DC: "+4",
        ingredientType: "enchantment",
        GrowsIn: ["Mountain", "Underdark"]
    },
    "Primordial Balm": {
        name: "Primordial Balm",
        rarity: "rare",
        details: "User creates a potion of frost/fire/stone giant strength (DMG 187).",
        description: "",
        DC: "+4",
        ingredientType: "enchantment",
        GrowsIn: ["Mountain", "Swamp", "Underdark"]
    },
    "Rock Vine": {
        name: "Rock Vine",
        rarity: "rare",
        details: "User creates a potion of invulnerability (DMG 188).",
        description: "",
        DC: "+4",
        ingredientType: "enchantment",
        GrowsIn: ["Hills", "Mountain"]
    },
    "Silver Hibiscus": {
        name: "Silver Hibiscus",
        rarity: "rare",
        details: "When consumed by target, they can unleash a random elemental breathe weapon 3 times (PHB 34). Cannot be altered by other ingredients.",
        description: "",
        DC: "+4",
        ingredientType: "enchantment",
        GrowsIn: ["Arctic", "Underdark"]
    },
    "Wrackwort Bulbs": {
        name: "Wrackwort Bulbs",
        rarity: "rare",
        details: "User creates a potion of diminution (DMG 187).",
        description: "",
        DC: "+4",
        ingredientType: "enchantment",
        GrowsIn: ["Coastal", "Swamp"]
    },
    "Devil's Bloodleaf": {
        name: "Devil's Bloodleaf",
        rarity: "very rare",
        details: "Combined with Bloodgrass the user creates a potion of vitality (DMG 188).",
        description: "",
        DC: "+5",
        ingredientType: "enchantment",
        GrowsIn: ["Hills", "Swamp", "Underdark"]
    },
    "Mortflesh Powder": {
        name: "Mortflesh Powder",
        rarity: "very rare",
        details: "User creates a potion of longevity (DMG 188).",
        description: "",
        DC: "+5",
        ingredientType: "enchantment",
        GrowsIn: ["Arctic", "Underdark"]
    },
    "Tail Leaf": {
        name: "Tail Leaf",
        rarity: "very rare",
        details: "User creates a potion of speed (DMG 188).",
        description: "",
        DC: "+5",
        ingredientType: "enchantment",
        GrowsIn: ["Grasslands", "Hills"]
    },
    "Voidroot": {
        name: "Voidroot",
        rarity: "very rare",
        details: "User creates a potion of flying (DMG 187).",
        description: "",
        DC: "+5",
        ingredientType: "enchantment",
        GrowsIn: ["Arctic", "Desert"]
    },
    "Wisp Stalks": {
        name: "Wisp Stalks",
        rarity: "very rare",
        details: "User creates a potion of invisibility (DMG 188).",
        description: "",
        DC: "+5",
        ingredientType: "enchantment",
        GrowsIn: ["Forest", "Underdark"]
    },
    "Artic Creeper": {
        name: "Artic Creeper",
        rarity: "common",
        details: "Change poison damage to cold or necrotic damage; target is still [poisoned] for 1 minute on a failed CON saving throw; this toxin is still considered poison damage when combining with other ingredients.",
        description: "",
        DC: "+2",
        ingredientType: "poison",
        GrowsIn: ["Artic", "Mountain"]
    },
    "Amanita Cap": {
        name: "Amanita Cap",
        rarity: "common",
        details: "Changes any poison Effect to be non-lethal and only incapacitate the target.",
        description: "",
        DC: "+1",
        ingredientType: "poison",
        GrowsIn: ["Coastal", "Swamp"]
    },
    "Cactus Juice": {
        name: "Cactus Juice",
        rarity: "common",
        details: "The target will not notice any poison damage Effect in their system until they take 5 rounds of damage from the toxin.",
        description: "",
        DC: "+2",
        ingredientType: "poison",
        GrowsIn: ["Desert", "Grasslands"]
    },
    "Drakus Flower": {
        name: "Drakus Flower",
        rarity: "common",
        details: "Change poison damage to fire or acid damage; target is still [poisoned] for 1 minute on a failed CON saving throw; this toxin is still considered poison damage when combining with other ingredients.",
        description: "",
        DC: "+2",
        ingredientType: "poison",
        GrowsIn: ["Desert", "Grasslands", "Mountain"]
    },
    "Harrada Leaf": {
        name: "Harrada Leaf",
        rarity: "common",
        details: "When ingested, the target increases their strength score by 2, but decreases their intelligence and wisdom score by 2 for the duration. Cannot be altered by other ingredients.",
        description: "",
        DC: "+1",
        ingredientType: "poison",
        GrowsIn: ["Forest"]
    },
    "Wyrmtongue Petals": {
        name: "Wyrmtongue Petals",
        rarity: "common",
        details: "1d4 + Alchemy Modifier poison damage per round; target is [poisoned] for 1 minute.",
        description: "",
        DC: "0",
        ingredientType: "poison",
        GrowsIn: ["Most Terrain"]
    },
    "Quicksilver Lichen": {
        name: "Quicksilver Lichen",
        rarity: "uncommon",
        details: "ouble the dice rolled of any Toxin Effect, but reduce that Effect duration by half. This modifier can stack.",
        description: "",
        DC: "+3",
        ingredientType: "poison",
        GrowsIn: ["Most Terrain"]
    },
    "Spineflower Berries": {
        name: "Spineflower Berries",
        rarity: "uncommon",
        details: "Increase the dice-type by 1 size for any Toxin Effect.",
        description: "",
        DC: "+3",
        ingredientType: "poison",
        GrowsIn: ["Desert", "Swamp"]
    },
    "Othur Dust": {
        name: "Othur Dust",
        rarity: "uncommon",
        details: "Othur dust is a fine white powder that is created when Othur is ground up. This leads to the poison, Burnt Other Fumes.",
        description: "",
        DC: "+5",
        ingredientType: "poison",
        GrowsIn: ["Desert", "Mountain"]
    },
    "Blood Tree Sap": {
        name: "Blood Tree Sap",
        rarity: "rare",
        details: "This sap is thick, red, and poisonous. It's harvested from Blood Trees and requires only minor preparation to be made into Assassin's Blood.",
        description: "",
        DC: "+4",
        ingredientType: "poison",
        GrowsIn: ["Swamp", "Underdark"]
    },
    "Frozen Seedlings": {
        name: "Frozen Seedlings",
        rarity: "rare",
        details: "While [poisoned], target’s movement speed is reduced by 10 ft for 1 minute. Cannot be altered by other ingredients.",
        description: "",
        DC: "+4",
        ingredientType: "poison",
        GrowsIn: ["Arctic", "Mountain"]
    },
    "Radiant Synthseed": {
        name: "Radiant Synthseed",
        rarity: "rare",
        details: "Change poison damage to radiant damage; target is still [poisoned] for 1 minute on a failed CON saving throw; this toxin is still considered poison damage when combining with other ingredients.",
        description: "",
        DC: "+2",
        ingredientType: "poison",
        GrowsIn: ["Underdark"]
    },
    "Basilisk Breath": {
        name: "Basilisk Breath",
        rarity: "very rare",
        details: "Slowly paralyzes opponent. Target makes a DC 5 + Alchemy Modifier CON saving throw each turn for 4 turns. While under this affect, target is considered slowed by the slow spell. On a failed save, the target is considered [paralyzed] for 4 rounds. Cannot be modified or altered by other ingredients.",
        description: "",
        DC: "+5",
        ingredientType: "poison",
        GrowsIn: ["Mountain"]
    }
}

let ingredientTables = {
    "Most Terrain": {
        dieType: "",
        "": {
            name: "",
            dieRange: [],
            notes: ""
        }
    },

}