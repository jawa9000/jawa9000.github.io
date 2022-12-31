var gemTypes = {
    10: ['Azurite (opaque mottled deep blue)', 'Banded agate (translucent striped brown, blue, white, or red)', 'Blue quartz (transparent pale blue)', 'Eye agate (translucent circles of gray, white, brown, blue, or green)', 'Hematite (opaque gray-black)', 'Lapis lazuli (opaque light and dark blue with yellow flecks)', 'Malachite (opaque striated light and dark green)', 'Moss agate (translucent pink or yellow-white with mossy gray or green markings)', 'Obsidian (opaque black)', 'Rhodochrosite (opaque light pink)', 'Tiger eye (translucent brown with golden center)', 'Turquoise (opaque light blue-green)', 'pearl freshwater'],
    50: ['Bloodstone (opaque dark gray with red flecks)', 'Carnelian (opaque orange to red-brown)', 'Chalcedony (opaque white)', 'Chrysoprase (translucent green)', 'Citrine (transparent pale yellow-brown)', 'Jasper (opaque blue, black, or brown)', 'Moonstone (translucent white with pale blue glow)', 'Onyx (opaque bands of black and white, or pure black or white)', 'Quartz (transparent white, smoky gray, or yellow)', 'Sardonyx (opaque bands of red and white)', 'Star rose quartz (translucent rosy stone with white star-shaped center)', 'Zircon (transparent pale blue-green)','Iolite', 'Peridot', 'rock crystal (clear quartz)'],
    100: ['Amber (transparent watery gold to rich gold)', 'Amethyst (transparent deep purple)', 'Chrysoberyl (transparent yellow-green to pale green)', 'Coral (opaque crimson)', 'Garnet (transparent red, brown-green, or violet)', 'jade (translucent light green, deep green , or white)', 'jet (opaque deep black)', 'Pearl (opaque lustrous white , yellow, or pink)', 'Spinel (transparent red, red-brown, or deep green)', 'Tourmaline (transparent pale green , blue, brown , or red)'],
    500: ['Alexandrite (transparent dark green)', 'Aquamarine (transparent pale blue-green)', 'Black pearl (opaque pure black)', 'Blue spinel (transparent deep blue)', 'Peridot (transparent rich olive green)', 'Topaz (transparent golden yellow)', 'garnet (violet)'],
    1000: ['Black opal (translucent dark green with black mottling and golden flecks)', 'Blue sapphire (transparent blue-white to medium blue)', 'Emerald (transparent deep bright green)', 'Fire opal (translucent fiery red)', 'Opal (translucent pale blue with green and golden mottling)', 'Star ruby (translucent ruby with white star-shaped center)', 'Star sapphire (translucent blue sapphire with white star-shaped center)', 'Yellow sapphire (transparent fiery yellow or yellow-green)', 'Corundum (fiery yellow or rich purple)'],
    5000: ['Black sapphire (translucent lustrous black with glowing highlights)', 'Diamond (transparent blue-white , canary, pink, brown, or blue)', 'Jacinth (transparent fiery orange)', 'Ruby (transparent clear red to deep crimson)', 'Emerald (clearest bright green)',]
}

var artTypes = {
    25: ['Silver ewer', 'Carved bone statuette', 'Small gold bracelet', 'Cloth-of-gold vestments', 'Black velvet mask stitched with silver thread', 'Copper chalice with silver filigree', 'Pair of engraved bone dice', 'Small mirror set in a painted wooden frame', 'Embroidered silk handkerchief', 'Gold locket with a painted portrait inside'],
    250: ['Gold ring set with bloodstones', 'Carved ivory statuette', 'Large gold bracelet', 'Silver necklace with a gemstone pendant', 'Bronze crown', 'Silk robe with gold embroidery', 'Large well-made tapestry', 'Brass mug with jade inlay', 'Box of turquoise animal figurines', 'Gold bird cage with electrum filigree'],
    750: ['Silver chalice set with moonstones', 'Silver-plated steellongsword with jet set in hilt', 'Carved harp of exotic wood with ivory inlay and zircon gems', 'Small gold idol', 'Gold dragon comb set with red garnets as eyes', 'Bottle stopper cork embossed with gold leaf and set with amethysts', 'Ceremonial electrum dagger with a black pearl in the pommel', 'Silver and gold brooch', 'Obsidian statuette with gold fittings and inlay', 'Painted gold war mask'],
    2500: ['Fine gold chain set with a fire opal', 'Old masterpiece painting', 'Embroidered silk and velvet mantle set with numerous moonstones', 'Platinum bracelet set with a sapphire', 'Embroidered glove set with jewel chips', 'jeweled anklet', 'Gold music box', 'Gold circlet set with four aquamarines', 'Eye patch with a mock eye set in blue sapphire and moonstone', 'A necklace string of small pink pearls'],
    7500: ['Jeweled gold crown', 'Jeweled platinum ring', 'Small gold statuette set with rubies', 'Gold cup set with emeralds', 'Gold jewelry box with platinum filigree', 'Painted gold child\'s sarcophagus', 'jade game board with solid gold playing pieces', 'Bejeweled ivory drinking horn with gold filigree']
}

var coins = ['cp', 'sp', 'ep', 'gp', 'pp'];

var MagicItemTableA = [
    [1, 50, 'Potion of healing'],
    [51, 60, 'Spell scroll (cantrip)'],
    [61, 70, 'Potion of climbing'],
    [71, 90, 'Spell scroll (1st level)'],
    [91, 94, 'Spell scroll (2nd leve l)'],
    [95, 98, 'Potion of greater healing'],
    [99, 99, 'Bag of holding'],
    [0, 0, 'Driftglobe']
]
var MagicItemTableB = [
    [1, 15, 'Potion of greater healing'], 
    [16, 22, 'Potion of fire breath'],
    [23, 29, 'Potion of resistance'],
    [30, 34, 'Ammunition , +1'],
    [35, 39, 'Potion of animal friendship'],
    [40, 44, 'Potion of hill giant strength'],
    [45, 49, 'Potion of growth'],
    [50, 54, 'Potion of water breathing'],
    [55, 59, 'Spell scroll (2nd level)'],
    [60, 64, 'Spell scroll (3rd leve l)'],
    [65, 67, 'Bag of holding'],
    [68, 70, 'Keoghtom\'s ointment'],
    [71, 73, 'Oil of slipperiness'],
    [74, 75, 'Dust of disappearance'],
    [76, 77, 'Dust of dryness'],
    [78, 79, 'Dust of sneezing and choking'],
    [80, 81, 'Elemental gem'],
    [82, 83, 'Philter of love'],
    [84, 84, 'Alchemy jug'],
    [85, 85, 'Cap of water breathing'],
    [86, 85, 'Cloak of the manta ray'],
    [87, 87, 'Driftglobe'],
    [88, 88, 'Goggles of night'],
    [89, 89, 'Helm of comprehending languages'],
    [90, 90, 'Immovable rod'],
    [91, 91, 'Lantern of revealing'],
    [92, 92, 'Mariner\'s armor'],
    [93, 93, 'Mithral armor'],
    [94, 94, 'Potion of poison'],
    [95, 95, 'Ring of swimming'],
    [96, 96, 'Robe of useful items'],
    [97, 97, 'Rope of climbing'],
    [98, 98, 'Saddle of the cavalier'],
    [99, 99, 'Wand of magic detection'],
    [0, 0, 'Wand of secrets'],
];

var MagicItemTableC = [
    [01, 15, 'Potion of superior healing'],
    [16, 22, 'Spell scroll (4th level)'],
    [23, 27, 'Ammunition, +2'],
    [28, 32, 'Potion of clairvoyance'],
    [33, 37, 'Potion of diminution'],
    [38, 42, 'Potion of gaseous form'],
    [43, 47, 'Potion of frost giant strength'],
    [48, 52, 'Potion of stone giant strength'],
    [53, 57, 'Potion of heroism'],
    [58, 62, 'Potion of invulnerability'],
    [63, 67, 'Potion of mind reading'],
    [68, 72, 'Spell scroll (5th level)'],
    [73, 75, 'Elixir of health'],
    [76, 78, 'Oil of etherealness'],
    [79, 81, 'Potion of fire giant strength'],
    [82, 84, 'Quaal\'s feather token'],
    [85, 87, 'Scroll of protection'],
    [88, 89, 'Bag of beans'],
    [90, 91, 'Bead of force'],
    [92, 92, 'Chime of opening'],
    [93, 93, 'Decanter of endless water'],
    [94, 94, 'Eyes of minute seeing'],
    [95, 95, 'Folding boat'],
    [96, 96, 'Heward\'s handy haversack'],
    [97, 97, 'Horseshoes of speed'],
    [98, 98, 'Necklace of fireballs'],
    [99, 99, 'Periapt of health'],
    [0, 0, 'Sending stones']
];

var MagicItemTableD = [
    [1, 20, 'Potion of supreme healing'],
    [21, 30, 'Potion of invisibility'],
    [31, 40, 'Potion of speed'],
    [41, 50, 'Spell scroll (6th level)'],
    [51, 57, 'Spell scroll (7th level)'],
    [58, 62, 'Ammunition, +3'],
    [63, 67, 'Oil of sharpness'],
    [68, 72, 'Potion of flying'],
    [73, 77, 'Potion of cloud giant strength'],
    [78, 82, 'Potion of longevity'],
    [83, 87, 'Potion of vitality'],
    [88, 92, 'Spell scroll (8th level)'],
    [93, 95, 'Horseshoes of a zephyr'],
    [96, 98, 'Nolzur\'s marvelous pigments'],
    [99, 99, 'Bag of devouring'],
    [0, 0, 'Portable hole']
];

var MagicItemTableE = [
    [1, 30, 'Spell scroll (8th level)'],
    [31, 55, 'Potion of storm giant strength'],
    [56, 70, 'Potion of supreme healing'],
    [71, 85, 'Spell scroll (9th level)'],
    [86, 93, 'Universal solvent'],
    [94, 98, 'Arrow of slaying'],
    [99, 0, 'Sovereign glue']
];

var MagicItemTableF = [
    [1, 15, 'Weapon, +1'],
    [16, 18, 'Shield, +1'],
    [19, 21, 'Sentinel shield'],
    [22, 23, 'Amulet of proof against detection and location'],
    [24, 25, 'Boots of elvenkind'],
    [26, 27, 'Boots of striding and springing'],
    [28, 29, 'Bracers of archery'],
    [30, 31, 'Brooch of shielding'],
    [32, 33, 'Broom of flying'],
    [34, 35, 'Cloak of elvenkind'],
    [36, 37, 'Cloak of protection'],
    [38, 39, 'Gauntlets of ogre power'],
    [40, 41, 'Hat of disguise'],
    [42, 43, 'Javelin of lightning'],
    [44, 45, 'Pearl of power'],
    [46, 47, 'Rod of the pact keeper, + 1'],
    [48, 49, 'Slippers of spider climbing'],
    [50, 51, 'Staff of the adder'],
    [52, 53, 'Staff of the python'],
    [54, 55, 'Sword of vengeance'],
    [56, 57, 'Trident of fish command'],
    [58, 59, 'Wand of magic missiles'],
    [60, 61, 'Wand of the war mage, + 1'],
    [62, 63, 'Wand of web'],
    [64, 65, 'Weapon of warning'],
    [67, 67, 'Adamantine armor (chain mail)'],
    [67, 67, 'Adamantine armor (chain shirt)'],
    [68, 68, 'Adamantine armor (scale mail)'],
    [69, 69, 'Bag of tricks (gray)'],
    [70, 70, 'Bag of tricks (rust)'],
    [71, 71, 'Bag of tricks (tan)'],
    [72, 72, 'Boots of the winterlands'],
    [73, 73, 'Circlet of blasting'],
    [74, 74, 'Deck of illusions'],
    [75, 75, 'Eversmoking bottle'],
    [76, 76, 'Eyes of charming'],
    [77, 77, 'Eyes of the eagle'],
    [78, 78, 'Figurine of wondrous power (silver raven)'],
    [79, 79, 'Gem of brightness'],
    [80, 80, 'Gloves of missile snaring'],
    [81, 81, 'Gloves of swimming and climbing'],
    [82, 82, 'Gloves of thievery'],
    [83, 83, 'Headband of intellect'],
    [84, 84, 'Helm of telepathy'],
    [85, 85, 'Instrument of the bards (Doss lute)'],
    [86, 86, 'Instrument of the bards (Fochlucan bandore)'],
    [87, 87, 'Instrument of the bards (Mac-Fuimidh cittern)'],
    [88, 88, 'Medallion of thoughts'],
    [89, 89, 'Necklace of adaptation'],
    [90, 90, 'Periapt of wound closure'],
    [91, 91, 'Pipes of haunting'],
    [92, 92, 'Pipes of the sewers'],
    [93, 93, 'Ring of jumping'],
    [94, 94, 'Ring of mind shielding'],
    [95, 95, 'Ring of warmth'],
    [96, 96, 'Ring of water walking'],
    [97, 97, 'Quiver of Ehlonna'],
    [98, 98, 'Stone of good luck'],
    [99, 99, 'Wind fan'],
    [0, 0, 'Winged boots']
];

var MagicItemTableG = [
    [1, 11, 'Weapon, +2'],
    [12, 14, 'Figurine of wondrous power (see DMG 147, 169)'],
    [15, 15, 'Adamantine armor (breastplate)'],
    [16, 16, 'Adamantine armor (splint)'],
    [17, 17, 'Amulet of health'],
    [18, 18, 'Armor of vulnerability'],
    [19, 19, 'Arrow-catching shield'],
    [20, 20, 'Belt of dwarvenkind'],
    [21, 21, 'Belt of hill giant strength'],
    [22, 22, 'Berserker axe'],
    [23, 23, 'Boots of levitation'],
    [24, 24, 'Boots of speed'],
    [26, 26, 'Bracers of defense'],
    [27, 27, 'Brazier of commanding fire elementals'],
    [28, 28, 'Cape of the mountebank'],
    [29, 29, 'Censer of controlling air elementals'],
    [30, 30, 'Armor, +1 chain mail'],
    [31, 31, 'Armor of resistance (chain mail)'],
    [32, 32, 'Armor,+ 1 chain shirt'],
    [33, 33, 'Armor of resistance (chain shirt)'],
    [34, 34, 'Cloak of displacement'],
    [35, 35, 'Cloak of the bat'],
    [36, 36, 'Cube afforce'],
    [37, 37, 'Daern\'s instant fortress'],
    [38, 38, 'Dagger of venom'],
    [39, 39, 'Dimensional shackles'],
    [40, 40, 'Dragon slayer'],
    [41, 41, 'Elven chain'],
    [42, 42, 'Flame tongue'],
    [43, 43, 'Gem of seeing'],
    [44, 44, 'Giant slayer'],
    [45, 45, 'Clamoured studded leather'],
    [46, 46, 'Helm of teleportation'],
    [47, 47, 'Horn of blasting'],
    [48, 48, 'Horn of Valhalla (silver or brass)'],
    [49, 49, 'Instrument of the bards (Canaith mandolin)'],
    [50, 50, 'Instrument ofthe bards (Cli lyre)'],
    [51, 51, 'Ioun stone (awareness)'],
    [52, 52, 'Ioun stone (protection)'],
    [53, 53, 'Ioun stone (reserve)'],
    [54, 54, 'Ioun stone (sustenance)'],
    [55, 55, 'Iron bands of Bilarro'],
    [56, 56, 'Armor, + 1 leather'],
    [57, 57, 'Armor of resistance (leather)'],
    [58, 58, 'Mace of disruption'],
    [59, 59, 'Mace of smiting'],
    [60, 60, 'Mace of terror'],
    [61, 61, 'Mantle of spell resistance'],
    [62, 62, 'Necklace of prayer beads'],
    [63, 63, 'Periapt of proof against poison'],
    [64, 64, 'Ring of animal influence'],
    [65, 65, 'Ring of evasion'],
    [66, 66, 'Ring of feather falling'],
    [67, 67, 'Ring of free action'],
    [68, 68, 'Ring of protection'],
    [69, 69, 'Ring of resistance'],
    [70, 70, 'Ring of spell storing'],
    [71, 71, 'Ring of the ram'],
    [72, 72, 'Ring of X-ray vision'],
    [73, 73, 'Robe of eyes'],
    [74, 74, 'Rod of rulership'],
    [75, 75, 'Rod of the pact keeper, +2'],
    [76, 76, 'Rope of entanglement'],
    [77, 77, 'Armor, +1 scale mail'],
    [78, 78, 'Armor of resistance (scale mail)'],
    [79, 79, 'Shield, +2'],
    [80, 80, 'Shield of missile attraction'],
    [81, 81, 'Staff of charming'],
    [82, 82, 'Staff of healing'],
    [83, 83, 'Staff of swarming insects'],
    [84, 84, 'Staff of the woodlands'],
    [85, 85, 'Staff of withering'],
    [86, 86, 'Stone of controlling earth elementals'],
    [87, 87, 'Sun blade'],
    [88, 88, 'Sword of life stealing'],
    [89, 89, 'Sword of wounding'],
    [90, 90, 'Tentacle rod'],
    [91, 91, 'Vicious weapon'],
    [92, 92, 'Wand of binding'],
    [93, 93, 'Wand of enemy detection'],
    [94, 94, 'Wand of fear'],
    [95, 95, 'Wand of fireballs'],
    [96, 96, 'Wand of lightning bolts'],
    [97, 97, 'Wand of paralysis'],
    [98, 98, 'Wand of the war mage, +2'],
    [99, 99, 'Wand of wonder'],
    [0, 0, 'Wings of flying']
];

var MagicItemTableH = [
    [01, 10, 'Weapon, +3'], 
    [11, 12, 'Amulet of the planes'],
    [13, 14, 'Carpet of flying'],
    [15, 16, 'Crystal ball (very rare version)'],
    [17, 18, 'Ring of regeneration'],
    [19, 20, 'Ring of shooting stars'],
    [21, 22, 'Ring of telekinesis'],
    [23, 24, 'Robe of scintillating colors'],
    [25, 26, 'Robe of stars'],
    [27, 28, 'Rod of absorption'],
    [29, 30, 'Rod of alertness'],
    [31, 32, 'Rod of security'],
    [33, 34, 'Rod of the pact keeper, +3'],
    [35, 36, 'Scimitar of speed'],
    [37, 38, 'Shield, +3'],
    [39, 40, 'Staff of fire'],
    [41, 42, 'Staff of frost'],
    [43, 44, 'Staff of power'],
    [45, 46, 'Staff of striking'],
    [47, 48, 'Staff of thunder and lightning'],
    [49, 50, 'Sword of sharpness'],
    [51, 52, 'Wand of polymorph'],
    [53, 54, 'Wand of the war mage, +3'],
    [55, 55, 'Adamantine armor (half plate)'],
    [56, 56, 'Adamantine armor (plate)'],
    [57, 57, 'Animated shield'],
    [58, 58, 'Belt of fire giant strength'],
    [59, 59, 'Belt of frost (or stone) giant strength'],
    [60, 60, 'Armor, +1 breastplate'],
    [61, 61, 'Armor of resistance (breastplate)'],
    [62, 62, 'Candle of invocation'],
    [63, 63, 'Armor, +2 chain mail'],
    [64, 64, 'Armor, +2 chain shirt'],
    [65, 65, 'Cloak of arachnida'],
    [66, 66, 'Dancing sword'],
    [67, 67, 'Demon armor'],
    [68, 68, 'Dragon scale mail'],
    [69, 69, 'Dwarven plate'],
    [70, 70, 'Dwarven thrower'],
    [71, 71, 'Efreeti bottle'],
    [72, 72, 'Figurine of wondrous power (obsidian steed)'],
    [73, 73, 'Frost brand'],
    [74, 74, 'Helm of brilliance'],
    [75, 75, 'Horn of Valhalla (bronze)'],
    [76, 76, 'Instrument of the bards (Anstruth harp)'],
    [77, 77, 'Ioun stone (absorption)'],
    [78, 78, 'Ioun stone (agility)'],
    [79, 79, 'Ioun stone (fortitude)'],
    [80, 80, 'Ioun stone (insight)'],
    [81, 81, 'Ioun stone (intellect)'],
    [82, 82, 'Ioun stone (leadership)'],
    [83, 83, 'Ioun stone (strength)'],
    [84, 84, 'Armor, +2 leather'],
    [85, 85, 'Manual of bodily health'],
    [86, 86, 'Manual of gainful exercise'],
    [87, 87, 'Manual of golems'],
    [88, 88, 'Manual of quickness of action'],
    [89, 89, 'Mirror of life trapping'],
    [90, 90, 'Nine lives stealer'],
    [91, 91, 'Oath bow'],
    [92, 92, 'Armor, +2 scale mail'],
    [93, 93, 'Spellguard shield'],
    [94, 94, 'Armor, +1 splint'],
    [95, 95, 'Armor of resistance (splint)'],
    [96, 96, 'Armor, +1 studded leather'],
    [97, 97, 'Armor of resistance (studded leather)'],
    [98, 98, 'Tome of clear thought'],
    [99, 99, 'Tome of leadership and influence'],
    [0, 0, 'Tome of understanding']
];

var MagicItemTableI = [
    [1, 5, 'Defender'],
    [6, 10, 'Hammer of thunderbolts'],
    [11, 15, 'Luck blade'],
    [16, 20, 'Sword of answering'],
    [21, 23, 'Holy avenger'],
    [24, 26, 'Ring of djinni summoning'],
    [27, 29, 'Ring of invisibility'],
    [30, 32, 'Ring of spell turning'],
    [33, 35, 'Rod of lordly might'],
    [36, 38, 'Staff of the magi'],
    [39, 41, 'Vorpal sword'],
    [42, 43, 'Belt of cloud giant strength'],
    [44, 45, 'Armor, +2 breastplate'],
    [46, 47, 'Armor, +3 chain mail'],
    [48, 49, 'Armor, +3 chain shirt'],
    [50, 51, 'Cloak of invisibility'],
    [52, 53, 'Crystal ball (legendary version)'],
    [54, 55, 'Armor, + 1 half plate'],
    [56, 57, 'Iron flask'],
    [58, 59, 'Armor, +3 leather'],
    [60, 61, 'Armor, +1 plate'],
    [62, 63, 'Robe of the archmagi'],
    [64, 65, 'Rod of resurrection'],
    [66, 67, 'Armor, +1 scale mail'],
    [68, 69, 'Scarab of protection'],
    [70, 71, 'Armor, +2 splint'],
    [72, 73, 'Armor, +2 studded leather'],
    [74, 75, 'Well of many worlds'],
    [76, 76, 'Magic armor (see DMG 149)'],
    [77, 77, 'Apparatus of Kwalish'],
    [78, 78, 'Armor of invulnerability'],
    [79, 79, 'Belt of storm giant strength'],
    [80, 80, 'Cubic gate'],
    [81, 81, 'Deck of many things'],
    [82, 82, 'Efreeti chain'],
    [83, 83, 'Armor of resistance (half plate)'],
    [84, 84, 'Horn of Valhalla (iron)'],
    [85, 85, 'Instrument of the bards (Oilamh harp)'],
    [86, 86, 'Ioun stone (greater absorption)'],
    [87, 87, 'Ioun stone (mastery)'],
    [88, 88, 'Ioun stone (regeneration)'],
    [89, 89, 'Plate armor of etherealness'],
    [90, 90, 'Plate armor of resistance'],
    [91, 91, 'Ring of air elemental command'],
    [92, 92, 'Ring of earth elemental command'],
    [93, 93, 'Ring of fire elemental command'],
    [94, 94, 'Ring of three wishes'],
    [95, 95, 'Ring of water elemental command'],
    [96, 96, 'Sphere of annihilation'],
    [97, 97, 'Talisman of pure good'],
    [98, 98, 'Talisman of the sphere'],
    [99, 99, 'Talisman of ultimate evil'],
    [0, 0, 'Tome of the stilled tongue']
];

var hoardFirstChallenge0_4 = [1, 7, 17, 27, 37, 45, 53, 61, 66, 71, 76, 79, 81, 86, 93, 98, 0];
var hoardSecondChallenge0_4 = [6, 17, 26, 36, 44, 52, 60, 65, 70, 75, 78, 80, 85, 92, 97, 99, 0];
var hoardGemsChallenge0_4 = ['', '2d6_10', '', '2d6_50', '2d6_10', '', '2d6_50', '2d6_10', '', '2d6_50', '2d6_10', '','2d6_50', '', '2d6_50','', '2d6_50'];
var hoardArtChallenge0_4 = ['', '', '2d4_25', '', '', '2d4_25', '', '', '2d4_25', '', '', '2d4_25','', '2d4_25', '', '2d4_25', ''];
var hoardMagicChallenge0_4 = ['', '', '', '', '1d6_A', '1d6_A', '1d6_A', '1d6_B', '1d6_B', '1d6_B', '1d6_C', '1d6_C', '1d6_C', '1d6_F', '1d6_F', '1d6_G', '1d6_G'];
var hoardFirstChallenge5_10 = [1, 5, 6, 17, 23, 29, 33, 37, 41, 45, 50, 55, 60, 64, 67, 70, 73, 75, 77, 79, 80, 81, 85, 89, 92, 95, 97, 99, 0];
var hoardSecondChallenge5_10 = [4, 10, 16, 22, 28, 32, 36, 40, 44, 49, 54, 59, 63, 66, 69, 72, 74, 76, 78, 79, 80, 84, 88, 91, 94, 96, 98, 99, 0];
var hoardGemsChallenge5_10 = ['', '','3d6_50', '3d6_100', '', '', '3d6_50', '3d6_100', '', '', '3d6_50', '3d6_100', '', '', '3d6_50', '3d6_100', '', '', '3d6_50', '3d6_100', '', '', '3d6_50', '3d6_100', '', '3d6_100', '', '3d6_100', ''];
var hoardArtChallenge5_10 = ['','2d4_25', '', '', '2d4_250', '2d4_25', '', '', '2d4_250', '2d4_25', '', '', '2d4_250', '2d4_25', '', '', '2d4_250', '2d4_250', '', '', '2d4_250', '2d4_25', '', '', '2d4_250', '', '2d4_250', '', '2d4_250'];
var hoardMagicChallenge5_10 = ['', '', '', '', '', '1d6_A', '1d6_A', '1d6_A', '1d6_A', '1d6_B', '1d6_B', '1d6_B', '1d6_B', '1d6_C', '1d6_C', '1d6_C', '1d6_C', '1d6_D', '1d6_D', '1d6_D', '1d6_D', '1d6_F', '1d6_F', '1d6_F', '1d6_F', '1d6_G', '1d6_G', '1d6_H', '1d6_H'];

var hoardFirstChallenge11_16 = [1, 4, 7, 10, 13, 16, 20, 24, 27, 30, 36, 41, 46, 51, 55, 59, 63, 67, 69, 71, 73, 75, 77, 79, 81, 83, 86, 89, 91, 93, 95, 97, 99];
var hoardSecondChallenge11_16 = [3, 6, 9, 12, 15, 19, 23, 26, 29, 35, 40, 45, 50, 54, 58, 62, 66, 68, 70, 72, 74, 76, 78, 80, 82, 85, 88, 90, 92, 94, 96, 98, 0];
var hoardGemsChallenge11_16 = ['', '', '', '3d6_500', '3d6_1000', '', '', '2d6_500', '3d6_1000', '', '', '3d6_500', '3d6_1000', '', '', '3d6_500', '3d6_1000', '', '', '3d6_500', '3d6_1000', '', '', '3d6_500', '3d6_1000', '', '', '3d6_500', '3d6_1000', '', '', '3d6_500', '3d6_1000'];
var hoardArtChallenge11_16 = ['', '2d4_250', '2d4_750', '', '', '2d4_750', '2d4_750', '', '', '2d4_250', '2d4_750', '', '', '2d4_250', '2d4_750', '', '', '2d4_250', '2d4_750', '', '', '2d4_250', '2d4_750', '', '', '3d4_250', '2d4_750', '', '', '2d4_250', '2d4_750', '', ''];
var hoardMagicChallenge11_16 = ['', '', '', '', '', '1d4_B', '1d4_B', '1d4_B', '1d4_B', '1d6_C', '1d6_C', '1d6_C', '1d6_C', '1d4_D', '1d4_D', '1d4_D', '1d4_D', '1d1_E', '1d1_E', '1d1_E', '1d1_E', '1d1_F:1d4_G', '1d1_F:1d4_G', '1d1_F:1d4_G', '1d1_F:1d4_G', '1d4_H', '1d4_H', '1d4_H', , '1d4_H', '1d1_I', '1d1_I', '1d1_I', '1d1_I'];

var hoardFirstChallenge17 = [1, 3, 6, 9, 12, 15, 23, 31, 39, 47, 53, 59, 64, 69, 70, 71, 72, 73, 75, 77, 79, 81, 86, 91, 96];
var hoardSecondChallenge17 = [2, 5, 8, 11, 14, 22, 30, 38, 46, 52, 58, 63, 68, 69, 70, 71, 72, 74, 76, 78, 80, 85, 90, 95, 0];
var hoardGemsChallenge17 = ['', '3d6_1000', '', '', '1d8_5000', '3d6_1000', '', '', '1d8_5000', '3d6_1000', '', '', '1d8_5000', '3d6_1000', '', '', '1d8_5000', '3d6_1000', '', '', '1d8_5000', '3d6_1000', '', '', '1d8_5000'];
var hoardArtChallenge17 = ['', '', '1d10_2500', '1d4_7500', '', '', '1d10_2500', '1d4_7500', '', '', '1d10_2500', '1d4_7500', '', '', '1d10_2500', '1d4_7500', '', '', '1d10_2500', '1d4_7500', '', '', '1d10_2500', '1d4_7500', ''];
var hoardMagicChallenge17 = ['', '1d8_C', '1d8_C', '1d8_C', '1d8_C', '1d6_D', '1d6_D', '1d6_D', '1d6_E', '1d6_E', '1d6_E', '1d6_E', '1d6_E', '1d4_G', '1d4_G', '1d4_G', '1d4_G', '1d4_H', '1d4_H', '1d4_H', '1d4_H', '1d4_I', '1d4_I', '1d4_I', '1d4_I'];

var intention = {
  'Aberration': {
    name: 'Aberration',
    first: 1,
    second: 1,
    description: 'The item was created by aberrations in ancient times, possibly for the use of favored humanoid thralls. When seen from the corner of the eye, the item seems to be moving.'
  },
  'Human': {
    name: 'Human',
    first: 2,
    second: 4,
    description: 'The item was created during the heyday of a fallen human kingdom, or it is tied to a human of legend. It might hold writing in a forgotten tongue or symbols whose significance is lost to the ages.'
  },
  'Celestial': {
    name: 'Celestial',
    first: 5,
    second: 5,
    description: 'The item is half the normal weight and inscribed with feathered wings, suns, and other symbols of good. Fiends find the item\'s presence repulsive. '
  },
  'Dragon': {
    name: 'Dragon',
    first: 6,
    second: 7,
    description: 'This item is made from scales and talons shed by a dragon. Perhaps it incorporates precious metals and gems from the dragon\'s hoard. It grows slightly warm when within 120 feet of a dragon. '
  },
  'Drow': {
    name: 'Drow',
    first: 7,
    second: 7,
    description: 'The item is half the normal weight. It is black and inscribed with spiders and webs in honor of Lolth. It might function poorly, or disintegrate, if exposed to sunlight for 1 minute or more'
  },
  'Dwarf': {
    name: 'Dwarf',
    first: 8,
    second: 9,
    description: 'The item is durable and has Dwarven runes worked into its design. It might be associated witha clan that would like to see it returned to their ancestral halls.'
  },
  'Elemental_Air': {
    name: 'Elemental Air',
    first: 10,
    second: 10,
    description: 'The item is half the normal weight and feels hollow. If it\'s made of fabric, it is diaphanous.'
  },
  'Elemental_Earth': {
    name: 'Elemental Earth',
    first: 11,
    second: 11,
    description: 'This item might be crafted from stone. Any cloth or leather elements are studded with finely polished rock'
  },
  'Elemental_Fire': {
    name: 'Elemental Fire',
    first: 12,
    second: 12,
    description: 'This item is warm to the touch, and any metal parts are crafted from black iron. Sigils of flames cover its surface. Shades of red and orange are the prominent colors.'
  },
  'Elemental_Water': {
    name: 'Elemental Water',
    first: 13,
    second: 13,
    description: 'Lustrous fish scales replace leather or cloth on this item, and metal portions are instead crafted from seashells and worked coral as hard as any metal.'
  },
  'Elf': {
    name: 'Elf',
    first: 14,
    second: 15,
    description: 'The item is half the normal weight. It is adorned with symbols of nature: leaves, vines, stars, and the like.'
  },
  'Fey': {
    name: 'Fey',
    first: 16,
    second: 16,
    description: 'The item is exquisitely crafted from the finest materials and glows with a pale radiance - moonlight, shedding dim light in a 5-foot radius. Any metal in the item is silver or mithral, rather than iron or steel.'
  },
  'Fiend': {
    name: 'Fiend',
    first: 17,
    second: 17,
    description: 'The item is made of black iron or horn inscribed with runes, and any cloth or leather components are crafted from the hide of fiends is warm to the touch and features leering faces or vile runes engraved on its surface. Celestials find the item\'s presence repulsive. '
  },
  'Giant': {
    name: 'Giant',
    first: 18,
    second: 18,
    description: 'The item is larger than normal and was crafted by giants for use by their smaller allies.'
  },
  'Gnome': {
    name: 'Gnome',
    first: 19,
    second: 19,
    description: 'The item is crafted to appear ordinary and it might look worn. It could also incorporate gears and mechanical components, even if these aren\'t essential to the item\'s function.'
  },
  'Undead': {
    name: 'Undead',
    first: 20,
    second: 20,
    description: 'The item incorporates imagery of death such as bones and skulls, and it might be crafted from parts of corpses. It feels cold to the touch.'
  }
}

var historyDetail = {
    'Arcane' : {
        name: 'Arcane',
        roll: 1,
        description: 'This item was created for an ancient order of spellcasters and bears the order\'s symbol.'
    },
    'Bane' : {
        name: 'Bane',
        roll: 2,
        description: 'This item was created by the foes of a particular culture or kind of creature. If the culture or creatures are still around, they might recognize the item and single out the bearer as an enemy.'
    },
    'Heroic' : {
        name: 'Heroic',
        roll: 3,
        description: 'A great hero once wielded this item. An yone who\'s familiar with the item\'s history expects great deeds from the new owner.'
    },
    'Ornament' : {
        name: 'Ornament',
        roll: 4,
        description: 'The item was created to honor a special occasion. Inset gemstones, gold or platinum inlays, and gold or silver filigree adorn its surface.'
    },
    'Prophecy' : {
        name: 'Prophecy',
        roll: 5,
        description: 'The item features in a prophecy: its bearer is destined to play a key role in future events. Someone else who wants to play that role might try to steal the item, or someone who wants to prevent the prophecy from being fulfilled might try to kill the item\'s bearer.'
    },
    'Religious' : {
        name: 'Religious',
        roll: 6,
        description: 'This item was used in religious ceremonies dedicated to a particular deity. It hass holy symbols worked into it. The god\'s followers might try to persuade its owner to donate it to a temple, steal the item for themselves, or celebrate its use by a cleric or paladin of the same deity.'
    },
    'Sinister' : {
        name: 'Sinister',
        roll: 7,
        description: 'This item is linked to a deed of great evil such as a massacre or an assassination. It might have a name or be closely associated with a villian who used it. Anyone familiar with the item\'s history is likely to treat it and its owner with suspicion.'
    },
    'Symbol_of_Power' : {
        name: 'Symbol of Power',
        roll: 8,
        description: 'This item was once used as part of royal regalia or as a badge of high office. Its former owner or that person\'s descendants might desire it, or someone might mistakenly assume its new owner is the item\'s legitimate inheritor.'
    }
}

var minorProperty = {
    'Beacon': {
        name: 'Beacon',
        roll: 1,
        description: 'The bearer can use a bonus action to cause the item to shed bright light in a 10-foot radius and dim light for an additional 10 feet, or to extinguish the light.'
    },
    'Compass': {
        name: 'Compass',
        roll: 2,
        description: 'The wielder can use an action to learn which way is north.'
    },
    'Conscientious': {
        name: 'Conscientious',
        roll: 3,
        description: 'When the bearer of this item contemplates or undertakes a malevolent act, the item enhances pangs of conscience.'
    },
    'Gleaming': {
        name: 'Gleaming',
        roll: 4,
        description: 'This item never gets dirty.'
    },
    'Guardian': {
        name: 'Guardian',
        roll: 5,
        description: 'The item whispers warnings to its bearer, granting a +2 bonus to initiative if the bearer isn\'t incapacitated.'
    },
    'Hidden_Message': {
        name: 'Hidden Message',
        roll: 6,
        description: 'A message is hidden somewhere on the item. It might be visible only at a certain time of the year, under the light of one phase of the moon, or in a specific location.'
    },
    'Key': {
        name: 'Key',
        roll: 7,
        description: 'The item is used to unlock a container, chamber, vault, or other entryway.'
    },
    'Language': {
        name: 'Language',
        roll: 8,
        description: 'The bearer can speak and understand a language of the DM\'s choice while the item is on the bearer\'s person.'
    },
    'Sentinel': {
        name: 'Sentinel',
        roll: 9,
        description: 'Choose a kind of creature that is an enemy of the item\'s creator. This item glows faintly when such creatures are within 120 feet of it.'
    },
    'Song_Craft': {
        name: 'Song Craft',
        roll: 10,
        description: 'Whenever this item is struck or is used to strike a foe , its bearer hears a fragment of an ancient song.'
    },
    'Delver': {
        name: 'Delver',
        roll: 11,
        description: 'While underground , the bearer of this item always knows the item\'s depth below the surface and the direction to the nearest staircase, ramp, or other path leading upward.'
    },
    'Harmonious': {
        name: 'Harmonious',
        roll: 12,
        description: 'Attuning to this item takes only 1 minute.'
    },
    'Strange_Material': {
        name: 'Strange Material',
        roll: 13,
        description: 'The item was created from a material that is bizarre given its purpose. Its durability is unaffected.'
    },
    'Temperate': {
        name: 'Temperate',
        roll: 14,
        description: 'The bearer suffers no harm in temperatures as cold as -20 degrees Fahrenheit or as warm as 120 degrees Fahrenheit.'
    },
    'Unbreakable': {
        name: 'Unbreakable',
        roll: 15,
        description: 'The item can\'t be broken. Special means must be used to destroy it.'
    },
    'Waterborne': {
        name: 'Waterborne',
        roll: 16,
        description: 'This item floats on water and other liquids. Its bearer has advantage on Strength (Athletics) checks to swim.'
    },
    'Wicked': {
        name: 'Wicked',
        roll: 17,
        description: 'When the bearer is presented with an opportunity to act in a selfish or malevolent way, the item heightens the bearer\'s urge to do so.'
    },
    'Illusion': {
        name: 'Illusion',
        roll: 18,
        description: 'The item is imbued with illusion magic, allowing its bearer to alter the item\'s appearance in minor ways. Such alterations don\'t change how the item is worn , carried, or wielded, and they have no effect on its other magical properties. For example, the wearer could make a red robe appear blue, or make a gold ring look like it\'s made of ivory. The item reverts to its true appearance when no one is carrying or wearing it. '
    },
    'War_Leader': {
        name: 'War Leader',
        roll: 19,
        description: 'The bearer can use an action to cause his or her voice to carry clearly for up to 300 feet until the end of the bearer\'s next turn.'
    }
}

var quirk = {
    'Blissful': {
        name: 'Blissful',
        roll: 1,
        description: 'While in possession of the item, the bearer feels fortunate and optimistic about what the future holds. Butterflies and other harmless creatures might frolic in the item\'s presence.'
    },
    'Confident': {
        name: 'Confident',
        roll: 2,
        description: 'The item helps its bearer feel self-assured.'
    },
    'Covetous': {
        name: 'Covetous',
        roll: 3,
        description: 'The item\'s bearer becomes obsessed with material wealth.'
    },
    'Frail': {
        name: 'Frail',
        roll: 4,
        description: 'The item crumbles, frays, chips, or cracks slightly when wielded, worn, or activated. This quirk has no effect on its properties, but if the item has seen much use, it looks decrepit.'
    },
    'Hungry': {
        name: 'Hungry',
        roll: 5,
        description: 'This item\'s magical properties function only if fresh blood from a humanoid has been applied to it within the past 24 hours. It needs only a drop to activate. '
    },
    'Loud': {
        name: 'Loud',
        roll: 6,
        description: 'The item makes a loud noise-such as a clang, a shout, or a resonating gong-when used.'
    },
    'Metamorphic': {
        name: 'Metamorphic',
        roll: 7,
        description: 'The item periodically and randomly alters its appearance in slight ways. The bearer has no control over these minor alterations, which have no effect on the item\'s use.'
    },
    'Muttering': {
        name: 'Muttering',
        roll: 8,
        description: 'The item grumbles and mutters. A creature who listens carefully to the item might learn something useful.'
    },
    'Painful': {
        name: 'Painful',
        roll: 9,
        description: 'The bearer experiences a harmless flash of pain when using the item.'
    },
    'Possessive': {
        name: 'Possessive',
        roll: 10,
        description: 'The item demands attunement when first wielded or worn, and it doesn\'t allow its bearer to attune to other items. (Other items already attuned to the bearer remain so until their attunement ends.)'
    },
    'Repulsive': {
        name: 'Repulsive',
        roll: 11,
        description: 'The bearer feels a sense of distaste when in contact with the item, and continues to sense discomfort while bearing it.'
    },
    'Slothful': {
        name: 'Slothful',
        roll: 12,
        description: 'The bearer of this item feels slothful and lethargic. While attuned to the item, the bearer requires 10 hours to finish a long rest.'
    }
}

// ** add spell lists to this so the scroll can have different types from all schools of magic. Use http://dnd5e.wikidot.com/spells:wizard as a source to start from.