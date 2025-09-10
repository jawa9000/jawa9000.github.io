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

## Spreadsheet of monsters

Refer to https://docs.google.com/spreadsheets/d/1ZVJW2zXbkYIeUqFKx-oLDwcJhrJtN3HYDvLDz0sDExI/edit?gid=0#gid=0 for a full list of monsters and their known associates.

## monsters to be added
The following is a list of monsters that are not currently in the above list, but are known to exist in the game. They need their stats added to the above list and their associates updated.

Once all these monsters are added, generate a PDF and add it back to this NotebookLM (https://notebooklm.google.com/notebook/223209c0-31b1-4d76-890a-e6f5dc0719a1?pli=1).

## convert to arrays
The following properties need to be converted to arrays. Then update main.js, monster_catalog.js, and prompt in Gemini.
"damage immunities"
"condition immunities"
"senses"
"damage vulnerabilities"

## Monster list
Check monsters.js to see if the following monsters are listed. If they are not, use a Google search "5e [monster name]" to find it, download a PDF of it, and use this Gemini Gem (https://gemini.google.com/gem/77b2f643d48c) to batch convert up to 10 monsters at a time. Use this prompt: "Convert these PDFs into a JSON object." Then, copy/paste into monsters.js at the end, remove the array brackets, and clean up anything that is amiss (like remove "[cite:...]", add associates, and check the newly added monsters in the monster_catalog.html list).

>> about 100 monsters are missing their associates property.

Aarakocra Aeromancer
Aarakocra Simulacrum
Aarakocra Skirmisher
Aarakocra Spelljammer
Aartuk Elder
Aartuk Starhorror
Aartuk Weedling
Aberrant Cultist
Aberrant Spirit
Aberrant Zealot
Aberrant Zealot (Tentacled)
Abhorrent Overlord
Abyssal Chicken
Abyssal Wretch
Adult Oblex
Advanced Detention Drone
Aerosaur
Air
Air  Myrmidon
Akroan Hoplite
Albino Dwarf Spirit Warrior
Albino Dwarf Warrior
Aldani (Lobsterfolk)
Almiraj
Alseid
Altisaur
Amber Golem
Ambitious Assassin
Ambush Drake
Amethyst Greatwyrm
Amphisbaena
Anchorite of Talos
Animated Armor Detention Drone
Animated Ballista
Animated Broom
Animated Chained Library
Animated Drow Statue
Animated Flying Sword
Animated Halberd
Animated Jade Serpent
Animated Object
Animated Rug of Shering
Animated Staff
Animated Statue of Lolth
Animated Stove
Animated Table
Animated Tile Chimera
Animated Wand
Animatronic Allosaurus
Ankylosaurus Zombie
Anvilwrought Raptor
Aphemia
Apprentice
Aquatic Ghoul
Aquatic Troll
Arasta
Archaic
Archelon
Armored Saber-Toothed Tiger
Art  Mascot
Ashen Animated Armor
Ashen Flying Sword
Ashen Heir Anarchist
Ashen Heir Assassin
Ashen Heir Mage
Ashen Heir Veteran
Ashen Knight
Ashen Rider
Ashen Shambling Mound
Ashen Veteran
Ashen Warhorse
Aspirant of the Comet
Assassin Vine
Asteria
Astral Blight
Astral Elf Aristocrat
Astral Elf Commander
Astral Elf Honor Guard
Astral Elf Star Priest
Astral Elf Warrior
Athar Null
Atropal
Aurak Draconian
Aurnozci
Aurumach Rilmani
Aurumvorax
Aurumvorax Den Leader
Autognome
Avatar of Death
Avoral Guardinal
Awakened  Wasp
Awakened Brown Bear
Awakened Elk
Awakened Rat
Awakened White Moose
Awakened Zurkhwood
Axe of Mirabar Soldier
Azer Pyromancer
Azer Sentinel
B'rohg
Baaz Draconian
Baernaloth
Bag Jelly
Bakunawa
Bandit Crime Lord
Bandit Deceiver
Bariaur Wanderer
Barkburr
Barlgura
Barovian Commoner
Barovian Scout
Barovian Witch
Barrowghast
Battlehammer Dwarf
Beder
Beder Zombie
Belashyrra
Beledros Witherbloom
Berserker Commander
Bestial Spirit
Big Xorn
bjurer
Black Earth Guard
Black Earth Priest
Black Gauntlet of Bane
Black Greatwyrm
Black Rose Bearer
Blade Lieutenant
Blade Scout
Blazebear
Bleak Cabal Void Soother
Blistercoil Weird
Blob of Annihilation
Blood-Toll Harpy
Bloodfray
Blue Greatwyrm
Blue slaad
Bodytaker
Boggle
Bone Knight
Bone Roc
Bone Whelk
Boneless
Booyahg Booyahg Booyahg
Booyahg Caster
Booyahg Slave of the
Booyahg Slave of the Arch
Booyahg Slave of the Great Old One
Booyahg Whip
Booyahg Wielder
Borborygmos
Bore Worm
Borthak
Boss Augustus
Boss Delour
Bozak Draconian
Brackish Trudge
Brain Breaker
Brain in a Jar
Brass Greatwyrm
Braxat
Brazen Gorgon
Breath Drinker
Bridesmaid of Zuggtmoy
Brigganock
Broken King Antigonos
Bronze Greatwyrm
Bronze Sable
Bronze scout
Broom of Animated Attack
Brown Scavver
Brusipha
Bugbear Gardener
Bugbear Lieutenant
Bugbear Stalker
Bulette Pup
Bulezau
Bullywug
Bullywug Bog Sage
Bullywug Croaker
Bullywug Knight
Bullywug Royal
Bullywug Warrior
Burnished Hart
Burrowshark
Cackler
Cadaver Collector
Cairnwight
Cambion
Campestri
Canary
Canoloth
Canopic Golem
Carnivorous Flower
Carrion Crawler
Carrion Ogre
Carrionette
Cataclysm
Category 1 Krasis
Category 2 Krasis
Category 3 Krasis
Catoblepas
Cave Badger
Cave Bear
Cave Fisher
Cdrith
Centaur Mummy
Centaur Trooper
Centaur Warden
Centipede
Ceratops
Chamberlain of Zuggtmoy
Champion
Champion of Gorm
Champion of Madarua
Champion of Usamigaras
Changeling
Chaos Quadrapod
Chardalyn Berserker
Chasme
Chemister
Child
Chimeric Baboon
Chimeric Cat
Chimeric Fox
Chimeric Hare
Chimeric Rat
Chimeric Weasel
Chitine
Choldrith
Chuul Spore Servant
Chwinga
Chwinga Astronaut
Cinder Hulk
Citadel Spider
Clawfoot
Clay Gladiator
Cleric
Cloaker Mutate
Clockwork Behir
Clockwork Defender
Clockwork Mule
Clockwork Observer
Clockwork Stone Defender
Cloud
Cloud  Destiny Gambler
Cloud  Ghost
Cloud  Noble
Cloud  of Evil Air
Cloud  Smiling One
Cockatrice Regent
Cogwork Archivist
Coldlight Walker
Colossus
Colossus of Akros
Combat Robot
Conservatory Student
Copper Greatwyrm
Coral Snake
Corpse Flower
Corrupted Avatar of Lurue
Cosmotronic Blastseeker
Couatls
Cougar
Counterflux Blastseeker
Cradle of the Cloud Scion
Cradle of the Fire Scion
Cradle of the Frost Scion
Cradle of the Hill Scion
Cradle of the Stone Scion
Cradle of the Storm Scion
Crag Cat
Cranium Rat
Cranium Rat Squeaker
Cranium Rat Squeaker Swarm
Crawling Claw
Crayfish
Crimson Helmed Horror
Crocodile
Crow
Crushing Wave Priest
Crushing Wave Reaver
Crystal Battleaxe
Crystal Golem
Crystal Greatwyrm
Cultist Hierophant
Cuprilach Rilmani
Cyclops Oracle
Cyclops Sentry
Dabus
Daelkyr
Daelkyr (Belashyrra, Dyrrn)
Daemogoth
Daemogoth Titan
Dancing Item
Dao
Dark Tide Knight
Darkweaver
Deadbark Dryad
Deadstone Cleft Stone
Death  Reaper
Death  Shrouded One
Death Cultist
Death Knight Aspirant
Death Slaad
Death's Head
Death's Head of Bhaal
Deathwolf
Decaton Modron
Deck Defender
Deep Crow
Deep hé
Deep rothe
Deep Sashelas
Deep Scion
Degloth
Deinonychus
Demon
Demos Magen
Derro
Derro Apprentice
Derro Raider
Derro Savant
Detached Shadow
Devas
Devil
Devkarin
Devkarin Lich
Devourer
Dhergoloth
Diatryma
Dignitary
Dining Table Mimic
Dinosaur Skeleton
Dinosaurs (Clawfoot, Fastieth)
Dire Worg
Disciple
Displacer  Kitten
Distended Corpse
Dohwar
Dolgrim
Dolphin
Dolphin Delighter
Doomguard  Blade
Doomguard Doom Lord
Doomwake
Draconian Dreadnought
Draconian Foot Soldier
Draconian Infiltrator
Draconian Mage
Draconian Mastermind
Draconians (various types listed in list, but stat blocks not specified which types)
Draconic Shard
Draconic Spirit
Dracophage Subject
Drake Companion
Dread Warrior
Drow Acolyte
Drow Bandit
Drow Commander
Drow Commoner
Drow Cultist
Drow Gunslinger
Drow Noble
Drow Scout
Drow Spore Servant
Drow Spy
Drowned Ascetic
Drowned Assassin
Drowned Blade
Drowned Master
Dryad Spirit
Duergar Alchemist
Duergar Darkhaft
Duergar Keeper of the Flame
Duergar Spore Servant
Duergar Spy
Dullahan
Dust Hulk
Dwarf explorer
Dwarf prospector
Dwarf Skeleton
Dybbuk
Dyrrn
Earth  Myrmidon
Earth Elemental
Eater of Hope
Eater of Knowledge
Eblis
Echo of Demogorgon
Egg hunter (hatchling, adult)
Egg Hunter Adult
Egg Hunter Hatchling
Eidolon
Elder  Lizard
Elder Black Pudding
Elder Brain
Elder Oblex
Eldritch Horror Hatchling
Elemental General
Elemental Myrmidon, Earth
Elemental Myrmidon, Fire
Elemental Myrmidon, Water
Elemental Prince of Evil Fire
Elise
Emberhorn Minotaur
Emerald Enclave Scout
Emerald Greatwyrm
Empyrean Iota
Encephalon Cluster
Encephalon Gemmule
Enchanting Infiltrator
Engineer
Enormous Tentacle
Enslaved Goblin
Enslaved Troll
Equinal Guardinal
Esthetic
Eternal Flame Guardian
Eternal Flame Priest
Ettin Ceremorph
Euryale
Evil Mage
Evoker
Evoker Wizard
Expeditious Messenger
Expert
Eye Monger
Eyedrake
Eyestalk of Gzemnid
Falcon
False Lich
Farastu Demodand
Fastieth
Fate Hag
Fated Shaker
Fathomer
Feathergale Knight
Felbarren Dwarf
Felidar
Female Steeder
Fensir Devourer
Fensir Skirmisher
Feral Ashenwight
Ferrumach Rilmani
Fey
Fiend
Fighter
Firbolg Primeval Warden
Firbolg Wanderer
First-Year Student
Fish
Fly
Flying Dagger
Flying Horror
Flying Monkey
Flying Rocking Horse
Flying Shield
Flying Spider
Flying Staff
Flying Trident
Fox
Froghemoth
Frost  Ice Shaper
Frost  of Evil Water
Frost  Servant
Frost  Skeleton
Frost Salamander
Frost spider
Frost wyrm
Frostmourn
Fume Drake
Fungal Servant
Gargantua
Gauth
Gazer
Geryon
Giant Poisonous Snakes
Giant raven
Giant seahorse
Giant skeleton
Giant Spiders
Giant squid
Giant Strider
Gibberling
Giff Shock Trooper
Giff Warlord
Gigant
Gingwatzim
Girallon
Girallon Zombie
Githyanki Buccaneer
Githyanki Dracomancer
Githyanki Star Seer
Githyanki Xenomancer
Githzerai Futurist
Githzerai Psion
Githzerai Traveler
Githzerai Uniter
Glass Pegasus
Glasswork Golem
Gloamwing
Gloom weaver
Gnoll Demoniac
Gnoll Fang of Yeenoghu
Gnoll Flesh Gnawer
Gnoll Hunter
Gnoll Pack Lord
Gnoll Tribal Shaman
Gnoll Vampire
Gnoll Warrior
Gnoll Witherling
Gnome Ceremorph
Gnome Squidling
Goblin Boss Archer
Goblin Commoner
Goblin Gang Member
Goblin Hexer
Goblin Minion
Goblin Psi Brawler
Goblin Psi Commander
Goblin warlock
Goblinoids
Gold Greatwyrm
Gold-Forged Sentinel
Golden Stag
Golgari
Golgari agent
Golgari Shaman
Golgari Swarm
Golgari troll
Goliath -Kin
Goliath Warrior
Goliath Werebear
Goose
Goristro
Gorodan Ashford
Gorzil's Gang Troglodyte
Granite Juggernaut
Graveyard Revenant
Gray
Gray Render
Gray Scavver
Gray Slaad
Graz'zt

Greater Devil
Greater Star Spawn Emissary
Greater Zombie
Green Greatwyrm
Green Slaad
Grell Psychic
Gremishka
Gremorly's Ghost
Grick
Grick alpha
Grick Ancient
Grick Broodmother
Grick Hatchling
Grick Hunter
Grick Matriarch
Grick Youngling
Grick Zookeeper
Gruul
Gruul Anarch
Gruul Batterboar
Gruul Berserker
Gruul Clans
Gruul Cyclops
Gruul Druid of the Old Ways
Gruul Elemental (earth)
Gruul Elemental (fire)
Gruul Ettin
Gruul Fomorian
Gruul Half-ogre
Gruul Hill giant
Gruul Huge batterboar
Gruul Hydra
Gruul Maaka
Gruul Ogre
Gruul Rubblebelt stalker
Gruul Stone giant
Gruul Sunder shaman
Gruul Trog
Gruul Viashino
Guard (Thrall)
Guard Captain
Guard Drake
Guardian
Guardian giant
Guardian of Gorm
Guardian Portrait
Guardinals
Gulthias Blight
Hadozee Explorer
Hadozee Shipmate
Hadozee Warrior
Hadrosaurus
Hag
Hag (Annis, Bheur, Dusk, Green, Night)
Hag Minion
Hag of the Fetid Gaze
Hag Servant
Hare
Hashalaq Quori
Haunting Revenant
Hazvongel
Hellfire Engine
Hellwasp
Hellwasp Grub
Helmed Horror
Helmed Horror Detention Drone
Heralds of Dust Remnant
Herder
Hertilod
Hexton Modron
Hierophant Medusa
Hippocamp
Hippomus
Hoard Mimic
Hoard Scarab
Hoard Scarab (base, Swarm)
Huge  Crab
Huge Gray
Huge Ochre Jelly
Huge Polar Bear
Huge Stone Golem
Hungry Sorrowsworn
Ice mephits
Ice Piercer
Ice Spider
Ice Spider Queen
Ice Troll
Illithid
Illithid Arcanist
Illithid Elder Brain
Illithid Lich
Illithid Mind Flayer
Illithid Psion
Illithid Sorcerer
Illithid Warlock
Illithilich
Illusionist
Illusionist Wizard
Isolde
Isperia
Istarian Drone
Iuz
Ixitxachitl
Ixitxachitl Cleric
Jarad Vod Savo
Koalinth
Koalinth Sergeant
Kobold Commoner
Kobold Elite
Kobold Tinkerer
Kobold Vampire Spawn
Koi Prawn
Kolyarut
Korred
Kraken Hatchling
Kraken Priest
Kraken Priestess
Kraken Spawn
Krasis (Category 1, 2, 3)
Kraul
Kraul Death Priest
Kraul Warrior
Krenko
Krovod
Kruthik
Kruthik Adult
Kruthik Hive Lord
Kruthik Young
Kuo- Archpriest
Kuo- Monitor
Kuo- Whip
Kuo-toa
Kuo-toa archpriest
Kuo-toa monitor
Kuo-toa whip
Lacedon
Lacedon Ghoul
Lady Illmarrow
Lampad
Large Mimic
Larloch
Larva
Lava Child
Lawmage
Lazav
Leonin Iconoclast
Leprechaun
Lesser Mummy Lord
Lesser Star Spawn Emissary
Leucrotta
Leucta
Leviathan
Levistus
Lichen Lich
Lightning Eel
Lightning Golem
Lightning Hulk
Liondrake
Living Bigby's Hand
Living Blade of Disaster
Living Burning Hands
Living Cloudkill
Living Demiplane
Living Doll
Living Iron Statue
Living Lightning Bolt
Living Portent
Living Unseen Servant
Lizard king/queen
Lizardfolk (Viashino)
Lizardfolk champion
Lizardfolk Commoner
Lizardfolk Geomancer
Lizardfolk priest
Lizardfolk Queen
Lizardfolk Render
Lizardfolk Scaleshield
Lizardfolk scout
Lizardfolk shaman
Lizardfolk Sovereign
Lizardfolk Subchief
Lizardfolk tribe leader
Lizardfolk warrior
Locathah
Locathah Hunter
Lonely Sorrowsworn
Lonelywood Banshee
Lord of Blades
Lords of Dust
Lords' Alliance Guard
Lords' Alliance Spy
Lored Apprentice
Lored Pledgemage
Lored Professor of Chaos
Lored Professor of Order
Lost Sorrowsworn
Lost spirits
Loup Garou
Lycanthrope
Lynx
lyphant
Mad Golem
Maelephant
Mage Apprentice
Mage Hunter
Mage of Usamigaras
Magewright
Malaxxix
Male Steeder
Malformed Kraken
Mamh
Mammon
Mane
Manes
Manes Vaporspawn
Mantrap
Marid
Martial Arts Adept
Marut
Maschin-i-Bozorg
Master of Cruelties
Master of Souls
Master Sage
Master Thief
Maurezhi
Maw Demon
Maw of Yeenoghu
Meazel
Mechachimera
Mechanical Bird
Meenlock
Megapede
Meletian Hoplite
Memory Web
Mephit (Mud, Smoke)
Mephit swarm
Mercane
Mercenary
Mercykiller Bloodhound
Merfolk Salvager
Merfolk Scout
Merfolk Skirmisher
Merfolk Wavebender
Merregon
Merrenoloth
Merrow
Merrow Extortionist
Metal Wasp
Metallic Dragons
Metallic Greatwyrm
Metallic Peacekeeper
Metallic Sentinels (various types listed in list, but stat blocks not specified which types)
Metallic Warbler
Mezzoloth
Mighty Servant of Leuk-o
Mimic
Mimic Chair
Mind Drinker Vampire
Mind Flayer Arcanist
Mind Flayer Clairvoyant
Mind flayer lich (alhoon variant)
Mind Flayer Nothic
Mind Flayer Prophet
Mind Flayer Psion
Mind Mage
Mind's Eye Matter Smith
Mindwitness
Minotaur Archaeologist
Minotaur Infiltrator
Minotaur Living Crystal Statue
Minotaur of Baphomet
Mirror Shade
Mist Hulk
Modron Duodrone
Modron Monodrone
Modron Pentadrone
Modron Planar Incarnate
Modron Quadrone
Modron Tridrone
Modrons
Moloch
Molten Magma Roper
Molydeus
Mongrelfolk
Monk
Monstrous Peryton
Moonlight Guardian
Mordakhesh
Morkoth
Mountain Goat
Mouth of Grolantor
Mud Hulk
Mud mephit
Murder Comet
Murgaxor
Musteval Guardinal
Mutate
Mutated Drow
Myconid
Myconid Adult
Myconid Colony
Myconid mushroom
Myconid Sovereign
Myconid Spore Servant
Myconid Sprout
Nabassu
Naga
Naga Bone
Nagpa
Naiad
Narzugon
Nature caster
Nature Spirit
Necic Centipede
Necrichor
Necromancer
Necromancer Wizard
Necromite of Myrkul
Needle Blight
Neh-thalggu
Neogi
Neogi Hatchling
Neogi Hatchling Swarm
Neogi Master
Neogi Pirate
Neogi Void Hunter
Neothelid
Nereid
Night Blade
Night Scavver
Nightmare Shepherd
Nightsea Chil-liren
Nightveil Specter
Nightwalker
Nilbog
Nimblewright
Niv-Mizzet
Nivix Cyclops
Noble Prodigy
Nomad
Nonaton Modron
Nosferatu
Nupperibo
Nycaloth
Nymph
Nyx-Fleece Ram
Oaken bolter
Oblex (Adult, Elder)
Oblex Spawn
Obzedat Ghost
Octon Modron
Oculorb
Oddlewin
Ogre Battering Ram
Ogre Bolt Launcher
Ogre Chain Brute
Ogre Goblin Hucker
Ogre Howdah
Ogre Skeleton
Ogrillon Ogre
Oinoloth
Old Troglodyte
One-Eyed Shiver
Ooze
Oracle
Oracle of Strixhaven
Orc Claw of Luthic
Orc Commoner
Oread
Oriq Blood Mage
Oriq Recruiter
Orthon
Orzhov
Orzhov Giant
Otherworldly Corrupter
Otherworldly Steed
Otyugh Mutate
Ox
Paladin
Panopticus Wizard
Paper Bird
Paper Whirlwind
Parasite-infested Behir
Pari
Pazrodine
Peacock
Pech
Peddler
Pegasi
Performer
Performer Legend
Performer Maestro
Peryton
Pest Mascot
Phantom Warrior
Phantom Warrior (Archer)
Phisarazu Spyder-
Phoenix
Phylaskia
Piercer
Pig
Piranha
Piranha beetles
Pirate
Pirate Admiral
Pirate Bosun
Pirate Captain
Pirate Deck Wizard
Pirate First Mate
Pit
Pit Spawn
Pixie Wonderbringer
Planar Incarnate
Planetar
Plasmoid Boss
Plasmoid Explorer
Plasmoid Warrior
Podling
Poison Weird
Poltergeist
Polukranos
Precognitive Mage
Priest Acolyte
Priest of Osybus
Priest of the Forgotten God
Priest of the Old Faith
Primeval Owlbear
Primus
Prismari Apprentice
Prismari Pledgemage
Prismari Professor of Expression
Prismari Professor of Perfection
Prophetess Dran
Psionic Ashenwight
Psionic Shambling Mound
Psurlon
Psurlon Leader
Psurlon Ringer
Psychic Gray
Pterafolk
Purple Wormling
Quadrone
Quadrone Detention Drone
Quaggoth
Quaggoth Spore Servant
Quaggoth Thonot
Quandrix Apprentice
Quandrix Pledgemage
Quandrix Professor of Substance
Quandrix Professor of Theory
Quavilithku Spyder-
Questing Knight
Quetzalcoatlus
Quickling
Radiant Idol
Rak Tulkhesh
Rakdos
Rakdos Giant
Rakdos Lampooner
Rakdos One Eye
Rakdos Performer
Rakdos Performer, Blade Juggler
Rakdos Performer, Fire Eater
Rakdos Performer, High-Wire Acrobat
Raklupis Spyder-
Raktusk
Ram
Ranger
Ravnica Guildless
Razerblast
Razorvine Blight
Reaper of Bhaal
Reaper Spirit
Reckoner
Remorhaz (Young)
Replica Duodrone
Replica Monodrone
Replica Pentadrone
Replica Quadrone
Replica Tridrone
Returned Drifter
Returned Kakomantis
Returned Palamnite
Returned Sentry
Revenant
Riffler
Rime Hulk
Rip Tide Priest
Riverine
Rock Gnome Recluse
Rocktopus
Rogue
ronic Blastseeker
Rooster
Rot troll
Rowboat Mimic
Rubblebelt Stalker
Ruin Grinder
Ruin Spider
Runed Behir
Runic Colossus
Rutterkin
Salamander Fire Snake
Salamanders
Scaladar
Scarecrow
Sea Elf
Sea Elf Scout
Sea Lion
Sea Mare
Sea Serpent
Sea Serpents (Ancient, Young)
Sea Spawn
Seahorse
Seal
Sergeant
Serra angel
Servitor Thrull
Setessan Hoplite
Shark
Shark Skeleton
Shator Demodand
Sheep
Shell Shark
Shifter
Shoosuva
Shrieker Fungus
Sibriex
Sigil
Skyjek Roc
Slaad (any, Blue, Death, Gray, Green, Red, Tadpole)
Sled Dog
Slithering Tracker
Smoke Mephit
Snail
Snake
Snake Horror
Snapping Turtle
Sneak
Soldier
Sorcerer
Space Guppy
Space Hamster
Space Mollymawk
Space Swine
Spawn of Kyuss
Spellcaster
Spellcaster vampire
Sperm Whale
Sphinx
Sphinx of Judgment
Sphinx of Lore
Sphinx of Secrets
Sphinx of Valor
Sphinx of Wonder
Spider Swarm
Spiderwebs
Spirit
Spirit Statue Mascot
Spirit Troll
Splugoth the Returned
Spore Servant Octopus
Spotted Lion
Spring eladrin
Spy Master
Squid
Squire
Ssurran Defiler
Ssurran Poisoner
Stalker of Baphomet
Star Angler
Star moth
Star Spawn Grue
Star Spawn Hulk
Star Spawn Larva Mage
Star Spawn Mangler
Star Spawn Seer
Starlight Apparition
Statue of Talos
Statue of Vergadain
Steaurus
Steeder, Female
Steeder, Male
Steel Defender
Steel Predator
Subterranean Lizard
Succubus
Sul Khatesh
Sunder Shaman
Sunfly
Surtur
Svirfneblin
Svirfneblin scout
Svirfneblin Wererat
Swamp-bred chimera
Swan
Swarm of giant Grubs
Swarm of Animated Books
Swarm of Books
Swarm of Campestris
Swarm of Cranium Rats
Swarm of Crawling Claws
Swarm of Dretches
Swarm of Gibberlings
Swarm of Gremishkas
Swarm of Hoard Scarabs
Swarm of Larvae
Swarm of Lemures
Swarm of Maggots
Swarm of Mechanical Spiders
Swarm of Piranhas
Swarm of Rot Grubs
Swarm of Scarabs
Swarm of spiders
Swarm of Stirges
Swarm of Sunflies
Swarm of Tiny Monstrosities
Swarm of Venomous Snakes
Swarm of Zombie Limbs
Swarmkeeper ranger
Swashbuckler
Tabaxi
Tabaxi Hunter
Tabaxi Minstrel
Tainted Servant of Tsathogga
Talon
Tanarukk
Tanazir Quandrix
Tarkanan Assassin
Tattooed Pit Champion
Telepathic Pentacle
Tempest Spirit
Terracotta Warrior
Tharizdun
Thayan Apprentice
Thayan Warrior
The Bagman
The Lord of Blades
The Transient
The Wretched
Theran Chimera
Theurgist
Thief
Thief Lord
Thorn Slinger
Thorny Vegepygmy
Thought Spy
Thri-keen
Thri-kreen Gladiator
Thri-kreen Hunter
Thri-kreen Marauder
Thri-kreen Mystic
Thri-kreen Psion
Thunder Skeleton
Tiamat
Tick
Tidal Sorcerer
Tiefling
Tiefling Acrobat
Tin Soldier
Tiny Servant
Titanothere
Titivilus
Tlacatecolo
Tlexolotl
Tlincalli
Tomb Dwarf
Tomb Guardian
Tomb Tapper
Topaz Greatwyrm
Tortle
Tortle Druid
Tough
Tough Boss
Tower Hand
Tower Sage
Townsfolk
Trained Rust Monster
Transcendent Order Conduit
Transcendent Order Instinct
Transmuter
Transmuter Wizard
Trapper
Tree
Tressym
Tri-flower Frond
Tribal Warrior
Tribal Warrior Spore Servant
Tridrone
Triton
Triton Master of Waves
Triton Shorestalker
Troll Limb
Troll Mutate
Tromokratis
Trostani
Tsucora Quori
Typhon
Tyrannosaurus Zombie
Ulitharid
Ultroloth
Undercity Medusa
Underworld Cerberus
Undying Councilor
Undying Soldier
Unspeakable Horror
Urbane Magician
Uthgardt Barbarian Leader
Vampiric Ixitxachitl
Vampiric Ixitxachitl Cleric
Vargouille
Vargouille Reflection
Vecna Impersonator
Verbeeg Longstrider
Verbeeg Marauder
Veteran of the Gauntlet
Viashino
Violet Fungus Necrohulk
Vistana Assassin
Vistana Bandit
Vistana Bandit Captain
Vistana Commoner
Vistana Guard
Vistana Spy
Vistana Thug
Vlazok
Void Scavver
Walking Corpse
Walking Statue of Waterdeep
Wizard

## Add these monster's attacks properties to monsters.js
BTW, there are several attacks properties that use arrays instead of objects. The property attacks property should use objects with the type of attack as the name of the attack property. See "Frost Giant Everlasting One" as a valid example of what the attacks property should look like.

>> Update the attacks property to include a subproperty of the attack type with something like the following to handle saving throws from certain types of attacks (i.e. poison, fear, fire, cold, etc.):
* "saving throw required": true/false,
* "saving throw ability": str, dex, int, etc.,
* "saving throw dc": <the number of the DC>,
* "attack effect": "condition effect", // poisoned, paralyzed, etc.
* "effect damage": "3d6" // or whatever the damage dice are.

These two are missing their attacks properties:
  "Giant Centipede" 
  "Adult Red Dragon"

  "Mule": {
    "attacks": 
  },
  "Mummy": {
    "attacks": {
      "Rotting Fist": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "10 (2d6 + 3)",
        "damage type": "bludgeoning, necrotic"
      }
    }
  },
  "Mummy Lord": {
    "attacks": {
      "Rotting Fist": {
        "type": "Melee Weapon Attack",
        "to hit": "+9",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "14 (3d6 + 4)",
        "damage type": "bludgeoning, necrotic"
      }
    }
  },
  "Nalfeshnee": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+10",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "32 (5d10 + 5)",
        "damage type": "piercing"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+10",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "15 (3d6 + 5)",
        "damage type": "slashing"
      }
    }
  },
  "Night Hag": {
    "attacks": {
      "Claws": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "13 (2d8 + 4)",
        "damage type": "slashing"
      }
    }
  },
  "Nightmare": {
    "attacks": {
      "Hooves": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "13 (2d8 + 4)",
        "damage type": "bludgeoning, fire"
      }
    }
  },
  "Noble": {
    "attacks": {
      "Rapier": {
        "type": "Melee Weapon Attack",
        "to hit": "+3",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "5 (1d8 + 1)",
        "damage type": "piercing"
      }
    }
  },
  "Nothic": {
    "attacks": {
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "6 (1d6 + 3)",
        "damage type": "slashing"
      }
    }
  },
  "Ochre Jelly": {
    "attacks": {
      "Pseudopod": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "9 (2d6 + 2)",
        "damage type": "bludgeoning, acid"
      }
    }
  },
  "Octopus": {
    "attacks": {
      "Tentacles": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "1",
        "damage type": "bludgeoning"
      }
    }
  },
  "Ogre": {
    "attacks": {
      "Greatclub": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "13 (2d8 + 4)",
        "damage type": "bludgeoning"
      },
      "Javelin": {
        "type": "Melee or Ranged Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.or range 30/120 ft.",
        "target": "one target",
        "hit": "11 (2d6 + 4)",
        "damage type": "piercing"
      }
    }
  },
  "Ogre Zombie": {
    "attacks": {
      "Morningstar": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "13 (2d8 + 4)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Oni": {
    "attacks": {
      "Claw (Oni Form Only)": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "8 (1d8 + 4)",
        "damage type": "slashing"
      },
      "Glaive": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "15 (2d10 + 4)",
        "damage type": "slashing"
      }
    }
  },
  "Otyugh": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "12 (2d8 + 3)",
        "damage type": "piercing"
      },
      "Tentacle": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "7 (1d8 + 3)",
        "damage type": "bludgeoning, piercing"
      }
    }
  },
  "Owl": {
    "attacks": {
      "Talons": {
        "type": "Melee Weapon Attack",
        "to hit": "+3",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "1",
        "damage type": "slashing"
      }
    }
  },
  "Owlbear": {
    "attacks": {
      "Beak": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one creature",
        "hit": "10 (1d10 + 5)",
        "damage type": "piercing"
      },
      "Claws": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "14 (2d8 + 5)",
        "damage type": "slashing"
      }
    }
  },
  "Panther": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "5 (1d6 + 2)",
        "damage type": "piercing"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "4 (1d4 + 2)",
        "damage type": "slashing"
      }
    }
  },
  "Pegasus": {
    "attacks": {
      "Hooves": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "11 (2d6 + 4)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Phase Spider": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one creature",
        "hit": "7 (1d10 + 2)",
        "damage type": "piercing, poison"
      }
    }
  },
  "Pit Fiend": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+14",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "22 (4d6 + 8)",
        "damage type": "piercing"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+14",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "17 (2d8 + 8)",
        "damage type": "slashing"
      },
      "Mace": {
        "type": "Melee Weapon Attack",
        "to hit": "+14",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "15 (2d6 + 8)",
        "damage type": "bludgeoning, fire"
      },
      "Tail": {
        "type": "Melee Weapon Attack",
        "to hit": "+14",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "24 (3d10 + 8)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Planetar": {
    "attacks": {
      "Greatsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+12",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "21 (4d6 + 7)",
        "damage type": "slashing, radiant"
      }
    }
  },
  "Plesiosaurus": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "14 (3d6 + 4)",
        "damage type": "piercing"
      }
    }
  },
  "Poisonous Snake": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "1",
        "damage type": "piercing, poison"
      }
    }
  },
  "Polar Bear": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "9 (1d8 + 5)",
        "damage type": "piercing"
      },
      "Claws": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "12 (2d6 + 5)",
        "damage type": "slashing"
      }
    }
  },
  "Pony": {
    "attacks": {
      "Hooves": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "7 (2d4 + 2)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Priest": {
    "attacks": {
      "Mace": {
        "type": "Melee Weapon Attack",
        "to hit": "+2",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "3 (1d6)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Pseudodragon": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "4 (1d4 + 2)",
        "damage type": "piercing"
      },
      "Sting": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one creature",
        "hit": "4 (1d4 + 2)",
        "damage type": "piercing"
      }
    }
  },
  "Pteranodon": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+3",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "6 (2d4 + 1)",
        "damage type": "piercing"
      }
    }
  },
  "Purple Worm": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+9",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "22 (3d8 + 9)",
        "damage type": "piercing"
      },
      "Tail Stinger": {
        "type": "Melee Weapon Attack",
        "to hit": "+9",
        "reach": "10 ft.",
        "target": "one creature",
        "hit": "19 (3d6 + 9)",
        "damage type": "piercing, poison"
      }
    }
  },
  "Quasit": {
    "attacks": {
      "Claws (Bite in Beast Form)": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "5 (1d4 + 3)",
        "damage type": "piercing, poison"
      }
    }
  },
  "Quipper": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "1",
        "damage type": "piercing"
      }
    }
  },
  "Rakshasa": {
    "attacks": {
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "9 (2d6 + 2)",
        "damage type": "slashing"
      }
    }
  },
  "Rat": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+0",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "1",
        "damage type": "piercing"
      }
    }
  },
  "Raven": {
    "attacks": {
      "Beak": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "1",
        "damage type": "piercing"
      }
    }
  },
  "Red Dragon Wyrmling": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "9 (1d10 + 4)",
        "damage type": "piercing, fire"
      }
    }
  },
  "Reef Shark": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "6 (1d8 + 2)",
        "damage type": "piercing"
      }
    }
  },
  "Remorhaz": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+11",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "40 (6d10 + 7)",
        "damage type": "piercing, fire"
      }
    }
  },
  "Rhinoceros": {
    "attacks": {
      "Gore": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "14 (2d8 + 5)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Riding Horse": {
    "attacks": {
      "Hooves": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "8 (2d4 + 3)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Roc": {
    "attacks": {
      "Beak": {
        "type": "Melee Weapon Attack",
        "to hit": "+13",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "27 (4d8 + 9)",
        "damage type": "piercing"
      },
      "Talons": {
        "type": "Melee Weapon Attack",
        "to hit": "+13",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "23 (4d6 + 9)",
        "damage type": "slashing"
      }
    }
  },
  "Roper": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "22 (4d8 + 4)",
        "damage type": "piercing"
      },
      "Tendril": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "50 ft.",
        "target": "one creature",
        "hit": "The target is grappled (escape DC 15)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Rug of Smothering": {
    "attacks": {
      "Smother": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one Medium or smaller creature",
        "hit": "The creature is grappled (escape DC 13)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Rust Monster": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+3",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "5 (1d8 + 1)",
        "damage type": "piercing"
      }
    }
  },
  "Saber-Toothed Tiger": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "10 (1d10 + 5)",
        "damage type": "piercing"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "12 (2d6 + 5)",
        "damage type": "slashing"
      }
    }
  },
  "Sahuagin": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+3",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "3 (1d4 + 1)",
        "damage type": "piercing"
      },
      "Claws": {
        "type": "Melee Weapon Attack",
        "to hit": "+3",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "3 (1d4 + 1)",
        "damage type": "slashing"
      },
      "Spear": {
        "type": "Melee or Ranged Weapon Attack",
        "to hit": "+3",
        "reach": "5 ft.or range 20/60 ft.",
        "target": "one target",
        "hit": "4 (1d6 + 1)",
        "damage type": "piercing"
      }
    }
  },
  "Salamander": {
    "attacks": {
      "Spear": {
        "type": "Melee or Ranged Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.or range 20 ft.60 ft.",
        "target": "one target",
        "hit": "11 (2d6 + 4)",
        "damage type": "piercing, fire"
      },
      "Tail": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "11 (2d6 + 4)",
        "damage type": "bludgeoning, fire"
      }
    }
  },
  "Satyr": {
    "attacks": {
      "Ram": {
        "type": "Melee Weapon Attack",
        "to hit": "+3",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "6 (2d4 + 1)",
        "damage type": "bludgeoning"
      },
      "Shortsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "6 (1d6 + 3)",
        "damage type": "piercing"
      },
      "Shortbow": {
        "type": "Ranged Weapon Attack",
        "to hit": "+5",
        "reach": "80/320 ft.",
        "target": "one target",
        "hit": "6 (1d6 + 3)",
        "damage type": "piercing"
      }
    }
  },
  "Scorpion": {
    "attacks": {
      "Sting": {
        "type": "Melee Weapon Attack",
        "to hit": "+2",
        "reach": "5 ft.",
        "target": "one creature",
        "hit": "1",
        "damage type": "piercing, poison"
      }
    }
  },
  "Scout": {
    "attacks": {
      "Shortsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "5 (1d6 + 2)",
        "damage type": "piercing"
      },
      "Longbow": {
        "type": "Ranged Weapon Attack",
        "to hit": "+4",
        "reach": "150/600 ft.",
        "target": "one target",
        "hit": "6 (1d8 + 2)",
        "damage type": "piercing"
      }
    }
  },
  "Sea Hag": {
    "attacks": {
      "Claws": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "10 (2d6 + 3)",
        "damage type": "slashing"
      }
    }
  },
  "Sea Horse": {
    "attacks": {}
  },
  "Shadow": {
    "attacks": {
      "Strength Drain": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one creature",
        "hit": "9 (2d6 + 2)",
        "damage type": "necrotic"
      }
    }
  },
  "Shambling Mound": {
    "attacks": {
      "Slam": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "13 (2d8 + 4)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Shield Guardian": {
    "attacks": {
      "Fist": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "11 (2d6 + 4)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Shrieker": {
    "attacks": {}
  },
  "Silver Dragon Wyrmling": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "9 (1d10 + 4)",
        "damage type": "piercing"
      }
    }
  },
  "Skeleton": {
    "attacks": {
      "Shortsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "5 (1d6 + 2)",
        "damage type": "piercing"
      },
      "Shortbow": {
        "type": "Ranged Weapon Attack",
        "to hit": "+4",
        "reach": "80/320 ft.",
        "target": "one target",
        "hit": "5 (1d6 + 2)",
        "damage type": "piercing"
      }
    }
  },
  "Solar": {
    "attacks": {
      "Greatsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+15",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "22 (4d6 + 8)",
        "damage type": "slashing, radiant"
      },
      "Slaying Longbow": {
        "type": "Ranged Weapon Attack",
        "to hit": "+13",
        "reach": "150/600 ft.",
        "target": "one target",
        "hit": "15 (2d8 + 6)",
        "damage type": "piercing, radiant"
      }
    }
  },
  "Spectator": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+1",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "2 (1d6 − 1)",
        "damage type": "piercing"
      }
    }
  },
  "Specter": {
    "attacks": {
      "Life Drain": {
        "type": "Melee Spell Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one creature",
        "hit": "10 (3d6)",
        "damage type": "necrotic"
      }
    }
  },
  "Spider": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one creature",
        "hit": "1",
        "damage type": "piercing, poison"
      }
    }
  }
}
```json
{
  "Spirit Naga": {
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+7",
      "reach": "10 ft.",
      "target": "one creature",
      "hit": "7 (1d6 + 4)",
      "damage type": "piercing"
    }
  },
  "Sprite": {
    "Longsword": {
      "type": "Melee Weapon Attack",
      "to hit": "+2",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "1",
      "damage type": "slashing"
    },
    "Shortbow": {
      "type": "Ranged Weapon Attack",
      "to hit": "+6",
      "range": "40/160 ft.",
      "target": "one target",
      "hit": "1",
      "damage type": "piercing"
    }
  },
  "Spy": {
    "Shortsword": {
      "type": "Melee Weapon Attack",
      "to hit": "+4",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "5 (1d6 + 2)",
      "damage type": "piercing"
    },
    "Hand Crossbow": {
      "type": "Ranged Weapon Attack",
      "to hit": "+4",
      "range": "30/120 ft.",
      "target": "one target",
      "hit": "5 (1d6 + 2)",
      "damage type": "piercing"
    }
  },
  "Steam Mephit": {
    "Claws": {
      "type": "Melee Weapon Attack",
      "to hit": "+2",
      "reach": "5 ft.",
      "target": "one creature",
      "hit": "2 (1d4)",
      "damage type": "slashing, fire"
    }
  },
  "Stirge": {
    "Blood Drain": {
      "type": "Melee Weapon Attack",
      "to hit": "+5",
      "reach": "5 ft.",
      "target": "one creature",
      "hit": "5 (1d4 + 3)",
      "damage type": "piercing"
    }
  },
  "Stone Giant": {
    "Greatclub": {
      "type": "Melee Weapon Attack",
      "to hit": "+9",
      "reach": "15 ft.",
      "target": "one target",
      "hit": "19 (3d8 + 6)",
      "damage type": "bludgeoning"
    },
    "Rock": {
      "type": "Ranged Weapon Attack",
      "to hit": "+9",
      "range": "60/240 ft.",
      "target": "one target",
      "hit": "28 (4d10 + 6)",
      "damage type": "bludgeoning"
    }
  },
  "Stone Golem": {
    "Slam": {
      "type": "Melee Weapon Attack",
      "to hit": "+10",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "19 (3d8 + 6)",
      "damage type": "bludgeoning"
    }
  },
  "Storm Giant": {
    "Greatsword": {
      "type": "Melee Weapon Attack",
      "to hit": "+14",
      "reach": "10 ft.",
      "target": "one target",
      "hit": "30 (6d6 + 9)",
      "damage type": "slashing"
    },
    "Rock": {
      "type": "Ranged Weapon Attack",
      "to hit": "+14",
      "range": "60/240 ft.",
      "target": "one target",
      "hit": "35 (4d12 + 9)",
      "damage type": "bludgeoning"
    }
  },
  "Succubus/Incubus": {
    "Claw": {
      "type": "Melee Weapon Attack",
      "to hit": "+5",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "6 (1d6 + 3)",
      "damage type": "slashing"
    }
  },
  "Swarm of Bats": {
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+4",
      "reach": "0 ft.",
      "target": "one creature in the swarm's space",
      "hit": "5 (2d4)",
      "damage type": "piercing"
    }
  },
  "Swarm of Insects": {
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+3",
      "reach": "0 ft.",
      "target": "one target in the swarm's space",
      "hit": "10 (4d4)",
      "damage type": "piercing"
    }
  },
  "Swarm of Poisonous Snakes": {
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+6",
      "reach": "0 ft.",
      "target": "one creature in the swarm's space",
      "hit": "7 (2d6)",
      "damage type": "piercing"
    }
  },
  "Swarm of Quippers": {
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+5",
      "reach": "0 ft.",
      "target": "one creature in the swarm's space",
      "hit": "14 (4d6)",
      "damage type": "piercing"
    }
  },
  "Swarm of Rats": {
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+2",
      "reach": "0 ft.",
      "target": "one target in the swarm's space",
      "hit": "7 (2d6)",
      "damage type": "piercing"
    }
  },
  "Swarm of Ravens": {
    "Beaks": {
      "type": "Melee Weapon Attack",
      "to hit": "+4",
      "reach": "5 ft.",
      "target": "one target in the swarm's space",
      "hit": "7 (2d6)",
      "damage type": "piercing"
    }
  },
  "Tarrasque": {
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+19",
      "reach": "10 ft.",
      "target": "one target",
      "hit": "36 (4d12 + 10)",
      "damage type": "piercing"
    },
    "Claw": {
      "type": "Melee Weapon Attack",
      "to hit": "+19",
      "reach": "15ft",
      "target": "one target",
      "hit": "28 (4d8 + 10)",
      "damage type": "slashing"
    },
    "Horns": {
      "type": "Melee Weapon Attack",
      "to hit": "+19",
      "reach": "10 ft.",
      "target": "one target",
      "hit": "32 (4d10 + 10)",
      "damage type": "piercing"
    },
    "Tail": {
      "type": "Melee Weapon Attack",
      "to hit": "+19",
      "reach": "20ft",
      "target": "one target",
      "hit": "24 (4d6 + 10)",
      "damage type": "bludgeoning"
    }
  },
  "Thug": {
    "Mace": {
      "type": "Melee Weapon Attack",
      "to hit": "+4",
      "reach": "5 ft.",
      "target": "one creature",
      "hit": "5 (1d6 + 2)",
      "damage type": "bludgeoning"
    },
    "Heavy Crossbow": {
      "type": "Ranged Weapon Attack",
      "to hit": "+2",
      "range": "100/400 ft.",
      "target": "one target",
      "hit": "5 (1d10)",
      "damage type": "piercing"
    }
  },
  "Tiger": {
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+5",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "8 (1d10 + 3)",
      "damage type": "piercing"
    },
    "Claw": {
      "type": "Melee Weapon Attack",
      "to hit": "+5",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "7 (1d8 + 3)",
      "damage type": "slashing"
    }
  },
  "Treant": {
    "Slam": {
      "type": "Melee Weapon Attack",
      "to hit": "+10",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "16 (3d6 + 6)",
      "damage type": "bludgeoning"
    },
    "Rock": {
      "type": "Ranged Weapon Attack",
      "to hit": "+10",
      "range": "60/180 ft.",
      "target": "one target",
      "hit": "28 (4d10 + 6)",
      "damage type": "bludgeoning"
    }
  },
  "Triceratops": {
    "Gore": {
      "type": "Melee Weapon Attack",
      "to hit": "+9",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "24 (4d8 + 6)",
      "damage type": "piercing"
    },
    "Stomp": {
      "type": "Melee Weapon Attack",
      "to hit": "+9",
      "reach": "5 ft.",
      "target": "one prone creature",
      "hit": "22 (3d10 + 6)",
      "damage type": "bludgeoning"
    }
  },
  "Troll": {
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+7",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "7 (1d6 + 4)",
      "damage type": "piercing"
    },
    "Claw": {
      "type": "Melee Weapon Attack",
      "to hit": "+7",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "11 (2d6 + 4)",
      "damage type": "slashing"
    }
  },
  "Twig Blight": {
    "Claws": {
      "type": "Melee Weapon Attack",
      "to hit": "+3",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "3 (1d4 + 1)",
      "damage type": "piercing"
    }
  },
  "Tyrannosaurus Rex": {
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+10",
      "reach": "10 ft.",
      "target": "one target",
      "hit": "33 (4d12 + 7)",
      "damage type": "piercing"
    },
    "Tail": {
      "type": "Melee Weapon Attack",
      "to hit": "+10",
      "reach": "10 ft.",
      "target": "one target",
      "hit": "20 (3d8 + 7)",
      "damage type": "bludgeoning"
    }
  },
  "Unicorn": {
    "Hooves": {
      "type": "Melee Weapon Attack",
      "to hit": "+7",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "11 (2d6 + 4)",
      "damage type": "bludgeoning"
    },
    "Horn": {
      "type": "Melee Weapon Attack",
      "to hit": "+7",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "8 (1d8 + 4)",
      "damage type": "piercing"
    }
  },
  "Vampire": {
    "Unarmed Strike": {
      "type": "Melee Weapon Attack",
      "to hit": "+9",
      "reach": "5 ft.",
      "target": "one creature",
      "hit": "8 (1d8 + 4)",
      "damage type": "bludgeoning"
    },
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+9",
      "reach": "5 ft.",
      "target": "one willing creature, or a creature that is grappled by the vampire, incapacitated, or restrained",
      "hit": "7 (1d6 + 4)",
      "damage type": "piercing, necrotic"
    }
  },
  "Vampire Spawn": {
    "Claws": {
      "type": "Melee Weapon Attack",
      "to hit": "+6",
      "reach": "5 ft.",
      "target": "one creature",
      "hit": "8 (2d4 + 3)",
      "damage type": "slashing"
    },
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+6",
      "reach": "5 ft.",
      "target": "one willing creature, or a creature that is grappled by the vampire, incapacitated, or restrained",
      "hit": "6 (1d6 + 3)",
      "damage type": "piercing, necrotic"
    }
  },
  "Veteran": {
    "Longsword": {
      "type": "Melee Weapon Attack",
      "to hit": "+5",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "7 (1d8 + 3)",
      "damage type": "slashing"
    },
    "Shortsword": {
      "type": "Melee Weapon Attack",
      "to hit": "+5",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "6 (1d6 + 3)",
      "damage type": "piercing"
    },
    "Heavy Crossbow": {
      "type": "Ranged Weapon Attack",
      "to hit": "+3",
      "range": "100/400 ft.",
      "target": "one target",
      "hit": "6 (1d10 + 1)",
      "damage type": "piercing"
    }
  },
  "Violet Fungus": {
    "Rotting Touch": {
      "type": "Melee Weapon Attack",
      "to hit": "+2",
      "reach": "10 ft.",
      "target": "one creature",
      "hit": "4 (1d8)",
      "damage type": "necrotic"
    }
  },
  "Vrock": {
    "Beak": {
      "type": "Melee Weapon Attack",
      "to hit": "+6",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "10 (2d6 + 3)",
      "damage type": "piercing"
    },
    "Talons": {
      "type": "Melee Weapon Attack",
      "to hit": "+6",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "14 (2d10 + 3)",
      "damage type": "slashing"
    }
  },
  "Vulture": {
    "Beak": {
      "type": "Melee Weapon Attack",
      "to hit": "+2",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "2 (1d4)",
      "damage type": "piercing"
    }
  },
  "Warhorse": {
    "Hooves": {
      "type": "Melee Weapon Attack",
      "to hit": "+6",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "11 (2d6 + 4)",
      "damage type": "bludgeoning"
    }
  },
  "Warhorse Skeleton": {
    "Hooves": {
      "type": "Melee Weapon Attack",
      "to hit": "+6",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "11 (2d6 + 4)",
      "damage type": "bludgeoning"
    }
  },
  "Water Elemental": {
    "Slam": {
      "type": "Melee Weapon Attack",
      "to hit": "+7",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "13 (2d8 + 4)",
      "damage type": "bludgeoning"
    }
  },
  "Weasel": {
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+5",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "1",
      "damage type": "piercing"
    }
  },
  "Werebear": {
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+7",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "15 (2d10 + 4)",
      "damage type": "piercing"
    },
    "Claw": {
      "type": "Melee Weapon Attack",
      "to hit": "+7",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "13 (2d8 + 4)",
      "damage type": "slashing"
    },
    "Greataxe": {
      "type": "Melee Weapon Attack",
      "to hit": "+7",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "10 (1d12 + 4)",
      "damage type": "slashing"
    }
  },
  "Wereboar": {
    "Maul": {
      "type": "Melee Weapon Attack",
      "to hit": "+5",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "10 (2d6 + 3)",
      "damage type": "bludgeoning"
    },
    "Tusks": {
      "type": "Melee Weapon Attack",
      "to hit": "+5",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "10 (2d6 + 3)",
      "damage type": "slashing"
    }
  },
  "Wererat": {
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+4",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "4 (1d4 + 2)",
      "damage type": "piercing"
    },
    "Shortsword": {
      "type": "Melee Weapon Attack",
      "to hit": "+4",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "5 (1d6 + 2)",
      "damage type": "piercing"
    },
    "Hand Crossbow": {
      "type": "Ranged Weapon Attack",
      "to hit": "+4",
      "range": "30/120 ft.",
      "target": "one target",
      "hit": "5 (1d6 + 2)",
      "damage type": "piercing"
    }
  },
  "Weretiger": {
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+5",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "8 (1d10 + 3)",
      "damage type": "piercing"
    },
    "Claw": {
      "type": "Melee Weapon Attack",
      "to hit": "+5",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "7 (1d8 + 3)",
      "damage type": "slashing"
    },
    "Scimitar": {
      "type": "Melee Weapon Attack",
      "to hit": "+5",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "6 (1d6 + 3)",
      "damage type": "slashing"
    },
    "Longbow": {
      "type": "Ranged Weapon Attack",
      "to hit": "+4",
      "range": "150/600 ft.",
      "target": "one target",
      "hit": "6 (1d8 + 2)",
      "damage type": "piercing"
    }
  },
  "Werewolf": {
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+4",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "6 (1d8 + 2)",
      "damage type": "piercing"
    },
    "Claws": {
      "type": "Melee Weapon Attack",
      "to hit": "+4",
      "reach": "5 ft.",
      "target": "one creature",
      "hit": "7 (2d4 + 2)",
      "damage type": "slashing"
    },
    "Spear": {
      "type": "Melee Weapon Attack",
      "to hit": "+4",
      "reach": "5 ft.",
      "target": "one creature",
      "hit": "5 (1d6 + 2)",
      "damage type": "piercing"
    }
  },
  "White Dragon Wyrmling": {
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+4",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "7 (1d10 + 2)",
      "damage type": "piercing, cold"
    }
  },
  "Wight": {
    "Life Drain": {
      "type": "Melee Weapon Attack",
      "to hit": "+4",
      "reach": "5 ft.",
      "target": "one creature",
      "hit": "5 (1d6 + 2)",
      "damage type": "necrotic"
    },
    "Longsword": {
      "type": "Melee Weapon Attack",
      "to hit": "+4",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "6 (1d8 + 2)",
      "damage type": "slashing"
    },
    "Longbow": {
      "type": "Ranged Weapon Attack",
      "to hit": "+4",
      "range": "150/600 ft.",
      "target": "one target",
      "hit": "6 (1d8 + 2)",
      "damage type": "piercing"
    }
  },
  "Will-o'-Wisp": {
    "Shock": {
      "type": "Melee Spell Attack",
      "to hit": "+4",
      "reach": "5 ft.",
      "target": "one creature",
      "hit": "9 (2d8)",
      "damage type": "lightning"
    }
  },
  "Winter Wolf": {
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+6",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "11 (2d6 + 4)",
      "damage type": "piercing"
    }
  },
  "Wolf": {
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+4",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "7 (2d4 + 2)",
      "damage type": "piercing"
    }
  },
  "Worg": {
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+5",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "10 (2d6 + 3)",
      "damage type": "piercing"
    }
  },
  "Wraith": {
    "Life Drain": {
      "type": "Melee Weapon Attack",
      "to hit": "+6",
      "reach": "5 ft.",
      "target": "one creature",
      "hit": "21 (4d8 + 3)",
      "damage type": "necrotic"
    }
  },
  "Wyvern": {
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+7",
      "reach": "10 ft.",
      "target": "one creature",
      "hit": "11 (2d6 + 4)",
      "damage type": "piercing"
    },
    "Claws": {
      "type": "Melee Weapon Attack",
      "to hit": "+7",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "13 (2d8 + 4)",
      "damage type": "slashing"
    },
    "Stinger": {
      "type": "Melee Weapon Attack",
      "to hit": "+7",
      "reach": "10 ft.",
      "target": "one creature",
      "hit": "11 (2d6 + 4)",
      "damage type": "piercing"
    }
  },
  "Xorn": {
    "Claw": {
      "type": "Melee Weapon Attack",
      "to hit": "+6",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "6 (1d6 + 3)",
      "damage type": "slashing"
    },
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+6",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "13 (3d6 + 3)",
      "damage type": "piercing"
    }
  },
  "Yeti": {
    "Claw": {
      "type": "Melee Weapon Attack",
      "to hit": "+6",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "7 (1d6 + 4)",
      "damage type": "slashing, cold"
    }
  },
  "Young Black Dragon": {
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+7",
      "reach": "10 ft.",
      "target": "one target",
      "hit": "15 (2d10 + 4)",
      "damage type": "piercing, acid"
    },
    "Claw": {
      "type": "Melee Weapon Attack",
      "to hit": "+7",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "11 (2d6 + 4)",
      "damage type": "slashing"
    }
  },
  "Young Blue Dragon": {
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+9",
      "reach": "10 ft.",
      "target": "one target",
      "hit": "16 (2d10 + 5)",
      "damage type": "piercing, lightning"
    },
    "Claw": {
      "type": "Melee Weapon Attack",
      "to hit": "+9",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "12 (2d6 + 5)",
      "damage type": "slashing"
    }
  },
  "Young Brass Dragon": {
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+7",
      "reach": "10 ft.",
      "target": "one target",
      "hit": "15 (2d10 + 4)",
      "damage type": "piercing"
    },
    "Claw": {
      "type": "Melee Weapon Attack",
      "to hit": "+7",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "11 (2d6 + 4)",
      "damage type": "slashing"
    }
  },
  "Young Bronze Dragon": {
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+8",
      "reach": "10 ft.",
      "target": "one target",
      "hit": "16 (2d10 + 5)",
      "damage type": "piercing"
    },
    "Claw": {
      "type": "Melee Weapon Attack",
      "to hit": "+8",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "12 (2d6 + 5)",
      "damage type": "slashing"
    }
  },
  "Young Copper Dragon": {
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+7",
      "reach": "10 ft.",
      "target": "one target",
      "hit": "15 (2d10 + 4)",
      "damage type": "piercing"
    },
    "Claw": {
      "type": "Melee Weapon Attack",
      "to hit": "+7",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "11 (2d6 + 4)",
      "damage type": "slashing"
    }
  },
  "Young Gold Dragon": {
    "Bite": {
      "type": "Melee Weapon Attack",
      "to hit": "+10",
      "reach": "10 ft.",
      "target": "one target",
      "hit": "17 (2d10 + 6)",
      "damage type": "piercing"
    },
    "Claw": {
      "type": "Melee Weapon Attack",
      "to hit": "+10",
      "reach": "5 ft.",
      "target": "one target",
      "hit": "13 (2d6 + 6)",
      "damage type": "slashing"
    }
  }
}
```json
{
  "Young Green Dragon": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "15 (2d10 + 4)",
        "damage type": "piercing, poison"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "11 (2d6 + 4)",
        "damage type": "slashing"
      }
    }
  },
  "Young Red Dragon": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+10",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "17 (2d10 + 6)",
        "damage type": "piercing, fire"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+10",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "13 (2d6 + 6)",
        "damage type": "slashing"
      }
    }
  },
  "Young Silver Dragon": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+10",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "17 (2d10 + 6)",
        "damage type": "piercing"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+10",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "13 (2d6 + 6)",
        "damage type": "slashing"
      }
    }
  },
  "Young White Dragon": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "15 (2d10 + 4)",
        "damage type": "piercing, cold"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "11 (2d6 + 4)",
        "damage type": "slashing"
      }
    }
  },
  "Zombie": {
    "attacks": {
      "Slam": {
        "type": "Melee Weapon Attack",
        "to hit": "+3",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "4 (1d6 + 1)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Deathless Rider": {
    "attacks": {
      "Axe": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "13 (2d8+4)",
        "damage type": "slashing"
      }
    }
  },
  "Goblin Warrior": {
    "attacks": {
      "Scimitar": {
        "type": "Melee Attack Roll",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "5 (1d6+2)",
        "damage type": "slashing"
      },
      "Shortbow": {
        "type": "Ranged Attack Roll",
        "to hit": "+4",
        "reach": "80/320 ft.",
        "target": "one target",
        "hit": "5 (1d6+2)",
        "damage type": "piercing"
      }
    }
  },
  "Goblin Boss": {
    "attacks": {
      "Scimitar": {
        "type": "Melee Attack Roll",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "5 (1d6+2)",
        "damage type": "slashing"
      },
      "Shortbow": {
        "type": "Ranged Attack Roll",
        "to hit": "+4",
        "reach": "80/320 ft.",
        "target": "one target",
        "hit": "5 (1d6+2)",
        "damage type": "piercing"
      }
    }
  },
  "Orc War Chief": {
    "attacks": {
      "Greataxe": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "15 (1d12+4 plus 1d8)",
        "damage type": "slashing"
      },
      "Spear": {
        "type": "Melee or Ranged Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.or range 20/60 ft.",
        "target": "one target",
        "hit": "12 (1d6 + 4 plus 1d8)",
        "damage type": "piercing"
      }
    }
  },
  "Black Abishai": {
    "attacks": {
      "Scimitar": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "6 (1d6 + 3)",
        "damage type": "slashing"
      },
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "8 (1d10 + 3)",
        "damage type": "piercing, acid"
      }
    }
  },
  "Blue Abishai": {
    "attacks": {}
  },
  "Apprentice Wizard": {
    "attacks": {
      "Arcane Burst": {
        "type": "Melee or Ranged Spell Attack",
        "to hit": "+4",
        "reach": "5 ft.or range 120 ft.",
        "target": "one target",
        "hit": "7 (1d10 + 2)",
        "damage type": "force"
      }
    }
  },
  "Green Abishai": {
    "attacks": {}
  },
  "Orc Nurtured One of Yurtrus": {
    "attacks": {
      "Claws": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "4 (1d4 + 2)",
        "damage type": "slashing, necrotic"
      }
    }
  },
  "Orc Red Fang of Shargaas": {
    "attacks": {
      "Scimitar": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "13 (3d6 + 3)",
        "damage type": "slashing"
      },
      "Dart": {
        "type": "Ranged Weapon Attack",
        "to hit": "+5",
        "reach": "20/60 ft.",
        "target": "one target",
        "hit": "10 (3d4 + 3)",
        "damage type": "piercing"
      }
    }
  },
  "Pixie": {
    "attacks": {
      "Shortsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "8 (1d6 + 5)",
        "damage type": "piercing"
      },
      "Shortbow": {
        "type": "Ranged Weapon Attack",
        "to hit": "+7",
        "reach": "80/320 ft.",
        "target": "one target",
        "hit": "8 (1d6 + 5)",
        "damage type": "piercing"
      }
    }
  },
  "Sacred Statue": {
    "attacks": {
      "Slam": {
        "type": "Melee Weapon Attack",
        "to hit": "+8",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "43 (6d12 + 4)",
        "damage type": "bludgeoning"
      },
      "Rock": {
        "type": "Ranged Weapon Attack",
        "to hit": "+8",
        "reach": "60 ft.240 ft.",
        "target": "one target",
        "hit": "37 (6d10 + 4)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Sage": {
    "attacks": {}
  },
  "Shadow Dragon": {
    "attacks": {
      "Rend": {
        "type": "Melee Attack Roll",
        "to hit": "+10",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "12 (2d6 + 5)",
        "damage type": "slashing, necrotic"
      }
    }
  },
  "Shadow Demon": {
    "attacks": {
      "Claws": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one creature",
        "hit": "10 (2d6 + 3)",
        "damage type": "psychic"
      }
    }
  },
  "Demogorgon": {
    "attacks": {
      "Tentacle": {
        "type": "Melee Weapon Attack",
        "to hit": "+17",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "28 (3d12 + 9)",
        "damage type": "bludgeoning"
      }
    }
  },
  "White Abishai": {
    "attacks": {
      "Longsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "7 (1d8 + 3)",
        "damage type": "slashing"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "8 (1d10 + 3)",
        "damage type": "slashing"
      },
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "5 (1d4 + 3)",
        "damage type": "piercing, cold"
      }
    }
  },
  "Troglodyte": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "4 (1d4 + 2)",
        "damage type": "piercing"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "4 (1d4 + 2)",
        "damage type": "slashing"
      }
    }
  },
  "Topaz Dragon Wyrmling": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "7 (1d10 + 2)",
        "damage type": "piercing, necrotic"
      }
    }
  },
  "Young Topaz Dragon": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "14 (2d10 + 3)",
        "damage type": "piercing, necrotic"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "6 (1d6 + 3)",
        "damage type": "slashing"
      }
    }
  },
  "Adult Topaz Dragon": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+9",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "15 (2d10 + 4)",
        "damage type": "piercing, necrotic"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+9",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "8 (1d8 + 4)",
        "damage type": "slashing"
      }
    }
  },
  "Ancient Topaz Dragon": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+12",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "17 (2d10 + 6)",
        "damage type": "piercing, necrotic"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+12",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "13 (2d6 + 6)",
        "damage type": "slashing"
      }
    }
  },
  "Sword Wraith Warrior": {
    "attacks": {
      "Longsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "8 (1d8 + 4)",
        "damage type": "slashing"
      },
      "Longbow": {
        "type": "Ranged Weapon Attack",
        "to hit": "+3",
        "reach": "150/600 ft.",
        "target": "one target",
        "hit": "5 (1d8 + 1)",
        "damage type": "piercing"
      }
    }
  },
  "Sword Wraith Commander": {
    "attacks": {
      "Longsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "8 (1d8 + 4)",
        "damage type": "slashing"
      },
      "Longbow": {
        "type": "Ranged Weapon Attack",
        "to hit": "+5",
        "reach": "150/600 ft.",
        "target": "one target",
        "hit": "6 (1d8 + 2)",
        "damage type": "piercing"
      }
    }
  },
  "Soul Monger": {
    "attacks": {
      "Phantasmal Dagger": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "13 (4d4 + 3)",
        "damage type": "piercing, necrotic"
      }
    }
  },
  "Skull Lord": {
    "attacks": {
      "Bone Staff": {
        "type": "Melee Weapon Attack",
        "to hit": "+8",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "7 (1d8 + 3)",
        "damage type": "bludgeoning, necrotic"
      }
    }
  },
  "Skulk": {
    "attacks": {
      "Claws": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "6 (1d4 + 4)",
        "damage type": "slashing"
      }
    }
  },
  "Umber Hulk": {
    "attacks": {
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+8",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "9 (1d8+5)",
        "damage type": "slashing"
      },
      "Mandibles": {
        "type": "Melee Weapon Attack",
        "to hit": "+8",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "14 (2d8 + 5)",
        "damage type": "slashing"
      }
    }
  },
  "Warforged Colossus": {
    "attacks": {
      "Slam": {
        "type": "Melee Weapon Attack",
        "to hit": "+18",
        "reach": "20 ft.",
        "target": "one target",
        "hit": "N/A",
        "damage type": "N/A"
      }
    }
  },
  "Warlord": {
    "attacks": {
      "Greatsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+9",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "12 (2d6 + 5)",
        "damage type": "slashing"
      },
      "Shortbow": {
        "type": "Ranged Weapon Attack",
        "to hit": "+7",
        "reach": "20/60 ft.",
        "target": "one target",
        "hit": "6 (1d6 + 3)",
        "damage type": "piercing"
      }
    }
  },
  "Orc Hand of Yurtrus": {
    "attacks": {
      "Touch of the White Hand": {
        "type": "Melee Spell Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one creature",
        "hit": "9 (2d8)",
        "damage type": "necrotic"
      }
    }
  },
  "Orc, Gray": {
    "attacks": {
      "Claws": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "5 (1d4 + 3)",
        "damage type": "slashing"
      }
    }
  },
  "Orc Eye of Gruumsh": {
    "attacks": {
      "Spear": {
        "type": "Melee or Ranged Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft. or range 20/60 ft.",
        "target": "one target",
        "hit": "11 (1d6 + 3 plus 1d8)",
        "damage type": "piercing"
      }
    }
  },
  "Orc Blade of Ilneval": {
    "attacks": {
      "Longsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "12 (2d8 + 3)",
        "damage type": "slashing"
      },
      "Javelin": {
        "type": "Melee or Ranged Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft. or range 30/120 ft.",
        "target": "one target",
        "hit": "6 (1d6 + 3)",
        "damage type": "piercing"
      }
    }
  },
  "Kobold Scale Sorcerer": {
    "attacks": {
      "Dagger": {
        "type": "Melee or Ranged Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft. or range 20/60 ft.",
        "target": "one target",
        "hit": "4 (1d4 + 2)",
        "damage type": "piercing"
      },
      "Chromatic Bolt": {
        "type": "Ranged Spell Attack",
        "to hit": "+4",
        "reach": "90 ft.",
        "target": "one target",
        "hit": "7 (2d6)",
        "damage type": "acid, cold, fire, lightning, poison, thunder"
      }
    }
  },
  "Kobold Inventor": {
    "attacks": {
      "Dagger": {
        "type": "Melee or Ranged Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft. or range 20/60 ft.",
        "target": "one target",
        "hit": "4 (1d4 + 2)",
        "damage type": "piercing"
      },
      "Sling": {
        "type": "Ranged Weapon Attack",
        "to hit": "+4",
        "reach": "30/120 ft.",
        "target": "one target",
        "hit": "4 (1d4 + 2)",
        "damage type": "bludgeoning"
      },
      "Acid": {
        "type": "Ranged Weapon Attack",
        "to hit": "+4",
        "reach": "5/20 ft.",
        "target": "one target",
        "hit": "7 (2d6)",
        "damage type": "acid"
      },
      "Alchemist's fire": {
        "type": "Ranged Weapon Attack",
        "to hit": "+4",
        "reach": "5/20 ft.",
        "target": "one target",
        "hit": "7 (2d6)",
        "damage type": "fire"
      },
      "Net": {
        "type": "Ranged Weapon Attack",
        "to hit": "+4",
        "reach": "5/15 ft.",
        "target": "one Large or smaller creature",
        "hit": "The target is restrained",
        "damage type": "N/A"
      },
      "Poisoned Darts": {
        "type": "Ranged Weapon Attack",
        "to hit": "+4",
        "reach": "20/60 ft.",
        "target": "two targets",
        "hit": "2 (1d4)",
        "damage type": "piercing, poison"
      }
    }
  },
  "Kobold Dragonshield": {
    "attacks": {
      "Spear": {
        "type": "Melee or Ranged Weapon Attack",
        "to hit": "+3",
        "reach": "5 ft. or range 20/60 ft.",
        "target": "one target",
        "hit": "4 (1d6 + 1)",
        "damage type": "piercing"
      }
    }
  },
  "Ghost Dragon": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+11",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "16 (2d10 + 5)",
        "damage type": "necrotic"
      },
      "Ghostly Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+11",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "12 (2d6 + 5)",
        "damage type": "force"
      }
    }
  },
  "Orcus": {
    "attacks": {
      "Wand of Orcus": {
        "type": "Melee Weapon Attack",
        "to hit": "+19",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "21 (3d8+8)",
        "damage type": "bludgeoning, necrotic"
      },
      "Tail": {
        "type": "Melee Weapon Attack",
        "to hit": "+16",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "21 (3d8+8)",
        "damage type": "piercing, poison"
      }
    }
  },
  "Yeenoghu": {
    "attacks": {
      "Flail": {
        "type": "Melee Weapon Attack",
        "to hit": "+16",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "15 (1d12+9)",
        "damage type": "bludgeoning"
      },
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+16",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "14 (1d10+9)",
        "damage type": "piercing"
      }
    }
  },
  "Orog": {
    "attacks": {
      "Greataxe": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "10 (1d12+4)",
        "damage type": "slashing"
      },
      "Javelin": {
        "type": "Melee or Ranged Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft. or range 30/120 ft.",
        "target": "one target",
        "hit": "7 (1d6+4)",
        "damage type": "piercing"
      }
    }
  },
  "Beholder": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "14 (4d6)",
        "damage type": "piercing"
      }
    }
  },
  "Mind Flayer": {
    "attacks": {
      "Tentacles": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one creature",
        "hit": "15 (2d10+4)",
        "damage type": "psychic"
      },
      "Extract Brain": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one incapacitated humanoid grappled by the mind flayer",
        "hit": "55 (10d10)",
        "damage type": "piercing"
      }
    }
  },
  "Githyanki Supreme Commander": {
    "attacks": {
      "Silver Greatsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+12",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "14 (2d6 + 7)",
        "damage type": "slashing, psychic"
      }
    }
  },
  "Githyanki Knight": {
    "attacks": {
      "Silver Greatsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+9",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "13 (2d6 + 6)",
        "damage type": "slashing, psychic"
      }
    }
  },
  "Githyanki Kith'rak": {
    "attacks": {
      "Greatsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+8",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "11 (2d6 + 4)",
        "damage type": "slashing, psychic"
      }
    }
  },
  "Githyanki Gish": {
    "attacks": {
      "Longsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "7 (1d8 + 3)",
        "damage type": "slashing, psychic"
      }
    }
  },
  "Githyanki Warrior": {
    "attacks": {
      "Greatsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "9 (2d6 + 2)",
        "damage type": "slashing, psychic"
      }
    }
  },
  "Hobgoblin Soldier": {
    "attacks": {
      "Shortsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "6 (1d6 + 3)",
        "damage type": "slashing"
      },
      "Spear": {
        "type": "Melee or Ranged Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft. or range 30/60 ft.",
        "target": "one target",
        "hit": "6 (1d6 + 3)",
        "damage type": "piercing"
      },
      "Dagger": {
        "type": "Melee or Ranged Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft. or range 20/60 ft.",
        "target": "one target",
        "hit": "5 (1d4 + 3)",
        "damage type": "piercing"
      }
    }
  },
  "Githzerai Monk": {
    "attacks": {
      "Unarmed Strike": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "6 (1d8 + 2)",
        "damage type": "bludgeoning, psychic"
      }
    }
  },
  "Githzerai Enlightened": {
    "attacks": {
      "Unarmed Strike": {
        "type": "Melee Weapon Attack",
        "to hit": "+8",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "13 (2d8 + 4)",
        "damage type": "bludgeoning, psychic"
      },
      "Temporal Strike": {
        "type": "Melee Weapon Attack",
        "to hit": "+8",
        "reach": "5 ft.",
        "target": "one creature",
        "hit": "13 (2d8 + 4)",
        "damage type": "bludgeoning, psychic"
      }
    }
  }
}
```json
[
  {
    "name": "Githzerai Zerth",
    "attacks": {
      "Unarmed Strike": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "11 (2d6 + 4) bludgeoning damage plus 13 (3d8) psychic damage",
        "damage type": "bludgeoning, psychic"
      }
    }
  },
  {
    "name": "Githzerai Anarch",
    "attacks": {
      "Unarmed Strike": {
        "type": "Melee Weapon Attack",
        "to hit": "+10",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "14 (2d8 + 5) bludgeoning damage plus 18 (4d8) psychic damage",
        "damage type": "bludgeoning, psychic"
      }
    }
  },
  {
    "name": "Adult Oblex",
    "attacks": {
      "Pseudopod": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "7 (1d6 + 4) bludgeoning damage plus 5 (2d4) psychic damage",
        "damage type": "bludgeoning, psychic"
      }
    }
  },
  {
    "name": "Adult Kruthik",
    "attacks": {
      "Stab": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "6 (1d6 + 3)",
        "damage type": "piercing"
      },
      "Spike": {
        "type": "Ranged Weapon Attack",
        "to hit": "+5",
        "reach": "20/60 ft.",
        "target": "one target",
        "hit": "5 (1d4 + 3)",
        "damage type": "piercing"
      }
    }
  },
  {
    "name": "Abyssal Wretch",
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+3",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "5 (1d8 + 1)",
        "damage type": "slashing"
      }
    }
  },
  {
    "name": "Abominable Yeti",
    "attacks": {
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+11",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "14 (2d6 + 7) slashing damage plus 7 (2d6) cold damage",
        "damage type": "slashing, cold"
      }
    }
  },
  {
    "name": "Abjurer Wizard",
    "attacks": {
      "Arcane Burst": {
        "type": "Melee or Ranged Spell Attack",
        "to hit": "+6",
        "reach": "5 ft. or range 120 ft.",
        "target": "one target",
        "hit": "20 (3d10 + 4)",
        "damage type": "force"
      }
    }
  },
  {
    "name": "Amethyst Dragon Wyrmling",
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "9 (1d10 + 4) piercing damage plus 4 (1d8) force damage",
        "damage type": "piercing, force"
      }
    }
  },
  {
    "name": "Allip",
    "attacks": {
      "Maddening Touch": {
        "type": "Melee Spell Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "17 (4d6+3)",
        "damage type": "psychic"
      }
    }
  },
  {
    "name": "Alkilith",
    "attacks": {
      "Tentacle": {
        "type": "Melee Weapon Attack",
        "to hit": "+8",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "18 (4d6+ 4)",
        "damage type": "acid"
      }
    }
  },
  {
    "name": "Alhoon",
    "attacks": {
      "Chilling Grasp": {
        "type": "Melee Spell Attack",
        "to hit": "+8",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "10 (3d6)",
        "damage type": "cold"
      }
    }
  },
  {
    "name": "Adult Red Dracolich",
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+14",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "19 (2d10+8) piercing damage plus 7 (2d6) fire damage",
        "damage type": "piercing, fire"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+14",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "15 (2d6+8)",
        "damage type": "slashing"
      },
      "Tail": {
        "type": "Melee Weapon Attack",
        "to hit": "+14",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "17 (2d8+8)",
        "damage type": "bludgeoning"
      }
    }
  },
  {
    "name": "Moonstone Dragon Wyrmling",
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "12 (2d8 + 3) piercing damage plus 3 (1d6) radiant damage",
        "damage type": "piercing, radiant"
      }
    }
  },
  {
    "name": "Young Moonstone Dragon",
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "15 (2d10 + 4) piercing damage plus 5 (1d10) radiant damage",
        "damage type": "piercing, radiant"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "11 (2d6 + 4)",
        "damage type": "slashing"
      }
    }
  },
  {
    "name": "Ancient Moonstone Dragon",
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+13",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "17 (2d10 + 6) piercing damage plus 11 (2d10) radiant damage",
        "damage type": "piercing, radiant"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+13",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "13 (2d6 + 6)",
        "damage type": "slashing"
      },
      "Tail": {
        "type": "Melee Weapon Attack",
        "to hit": "+13",
        "reach": "20 ft.",
        "target": "one target",
        "hit": "10 (1d8 + 6)",
        "damage type": "bludgeoning"
      }
    }
  },
  {
    "name": "Winged Kobold",
    "attacks": {
      "Dagger": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "5 (1d4 + 3)",
        "damage type": "piercing"
      },
      "Dropped Rock": {
        "type": "Ranged Weapon Attack",
        "to hit": "+5",
        "target": "one target directly below the kobold",
        "hit": "6 (1d6 + 3)",
        "damage type": "bludgeoning"
      }
    }
  },
  {
    "name": "Dusk Hag",
    "attacks": {
      "Claws": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "5 (1d6 + 2)",
        "damage type": "slashing"
      },
      "Nightmare Touch": {
        "type": "Melee Spell Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one creature",
        "hit": "18 (4d6 + 4)",
        "damage type": "psychic"
      }
    }
  },
  {
    "name": "Fey Noble",
    "attacks": {
      "Fey Weapon": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "5 (1d6 + 2)",
        "damage type": "N/A"
      }
    }
  },
  {
    "name": "Gas Spore",
    "attacks": {
      "Touch": {
        "type": "Melee Weapon Attack",
        "to hit": "+0",
        "reach": "5 ft.",
        "target": "one creature",
        "hit": "1 poison damage",
        "damage type": "poison"
      }
    }
  },
  {
    "name": "Frost Giant Zombie",
    "attacks": {
      "Greataxe": {
        "type": "Melee Weapon Attack",
        "to hit": "+10",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "25 (3d12 + 6)",
        "damage type": "slashing"
      },
      "Hurl Rock": {
        "type": "Ranged Weapon Attack",
        "to hit": "+10",
        "reach": "60/240 ft.",
        "target": "one target",
        "hit": "28 (4d10 + 6)",
        "damage type": "bludgeoning"
      }
    }
  },
  {
    "name": "Grell",
    "attacks": {
      "Tentacles": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "10 ft.",
        "target": "one creature",
        "hit": "7 (1d10 + 2)",
        "damage type": "piercing"
      },
      "Beak": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "7 (2d4 + 2)",
        "damage type": "piercing"
      }
    }
  },
  {
    "name": "Hollow Dragon",
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+12",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "17 (2d10 + 6) piercing damage plus 9 (2d8) radiant damage",
        "damage type": "piercing, radiant"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+12",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "13 (2d6 + 6)",
        "damage type": "slashing"
      }
    }
  },
  {
    "name": "Lich King",
    "attacks": {
      "Frostmourne Strike": {
        "type": "Melee Weapon Attack",
        "to hit": "+13",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "2 (2d12 + 4)",
        "damage type": "Slashing"
      },
      "Scourge Strike": {
        "type": "Melee Weapon Attack",
        "to hit": "+12",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "3 (4d6 + 4)",
        "damage type": "Necrotic"
      }
    }
  },
  {
    "name": "Zombie Lord",
    "attacks": {
      "Slam": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "7 (1d8 + 3)",
        "damage type": "bludgeoning"
      },
      "Life Drain": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one creature",
        "hit": "6 (1d6 + 3)",
        "damage type": "necrotic"
      }
    }
  },
  {
    "name": "Yuan-ti Pureblood",
    "attacks": {
      "Scimitar": {
        "type": "Melee Weapon Attack",
        "to hit": "+3",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "4 (1d6 + 1)",
        "damage type": "slashing"
      },
      "Shortbow": {
        "type": "Ranged Weapon Attack",
        "to hit": "+3",
        "reach": "80/320 ft.",
        "target": "one target",
        "hit": "4 (1d6 + 1) piercing damage plus 7 (2d6) poison damage",
        "damage type": "piercing, poison"
      }
    }
  },
  {
    "name": "Hobgoblin Archer",
    "attacks": {
      "Longbow": {
        "type": "Ranged Weapon Attack",
        "to hit": "+6",
        "reach": "200/700 ft.",
        "target": "one target",
        "hit": "13 (2d8 + 4)",
        "damage type": "piercing"
      }
    }
  },
  {
    "name": "Hobgoblin Captain",
    "attacks": {
      "Greatsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "9 (2d6 + 2)",
        "damage type": "slashing"
      },
      "Javelin": {
        "type": "Melee or Ranged Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft. or range 30/120 ft.",
        "target": "one target",
        "hit": "5 (1d6 + 2)",
        "damage type": "piercing"
      }
    }
  },
  {
    "name": "Hobgoblin Devastator",
    "attacks": {
      "Quarterstaff": {
        "type": "Melee Weapon Attack",
        "to hit": "+3",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "4 (1d6 + 1) bludgeoning damage, or 5 (1d8 + 1) bludgeoning damage if used with two hands",
        "damage type": "bludgeoning"
      }
    }
  },
  {
    "name": "Hobgoblin Elite Guard",
    "attacks": {
      "Longsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "8 (1d8 + 4) slashing damage, or 9 (1d10 + 4) slashing damage if used with two hands",
        "damage type": "slashing"
      },
      "Shield Bash": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "9 (2d4 + 4)",
        "damage type": "bludgeoning"
      },
      "Javelin": {
        "type": "Melee or Ranged Weapon Attack",
        "to hit": "+7",
        "reach": "30/120 ft.",
        "target": "one target",
        "hit": "7 (1d6 + 4)",
        "damage type": "piercing"
      }
    }
  },
  {
    "name": "Hobgoblin Iron Shadow",
    "attacks": {
      "Unarmed Strike": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "5 (1d4 + 3)",
        "damage type": "bludgeoning"
      },
      "Dart": {
        "type": "Ranged Weapon Attack",
        "to hit": "+5",
        "reach": "20/60 ft.",
        "target": "one target",
        "hit": "5 (1d4 + 3)",
        "damage type": "piercing"
      }
    }
  },
  {
    "name": "Hobgoblin Lieutenant",
    "attacks": {
      "Longsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage if used with two hands",
        "damage type": "slashing"
      },
      "Shield Bash": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "5 (1d4 + 3)",
        "damage type": "bludgeoning"
      },
      "Javelin": {
        "type": "Melee or Ranged Weapon Attack",
        "to hit": "+5",
        "reach": "30/120 ft.",
        "target": "one target",
        "hit": "6 (1d6 + 3)",
        "damage type": "piercing"
      }
    }
  },
  {
    "name": "Hobgoblin Warlord",
    "attacks": {
      "Longsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+9",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage if used with two hands",
        "damage type": "slashing"
      },
      "Shield Bash": {
        "type": "Melee Weapon Attack",
        "to hit": "+9",
        "reach": "5 ft.",
        "target": "one creature",
        "hit": "5 (1d4 + 3)",
        "damage type": "bludgeoning"
      },
      "Javelin": {
        "type": "Melee or Ranged Weapon Attack",
        "to hit": "+9",
        "reach": "5 ft. or range 30/120 ft.",
        "target": "one target",
        "hit": "6 (1d6 + 3)",
        "damage type": "piercing"
      }
    }
  },
  {
    "name": "Hobgoblin Warrior",
    "attacks": {
      "Longsword": {
        "type": "Melee Attack Roll",
        "to hit": "+3",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "12 (2d10 + 1)",
        "damage type": "Slashing"
      },
      "Longbow": {
        "type": "Ranged Attack Roll",
        "to hit": "+3",
        "reach": "150/600 ft.",
        "target": "one target",
        "hit": "5 (1d8 + 1) Piercing damage plus 7 (3d4) Poison damage",
        "damage type": "Piercing, Poison"
      }
    }
  },
  {
    "name": "Beholder Zombie",
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+3",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "14 (4d6)",
        "damage type": "piercing"
      }
    }
  },
  {
    "name": "Aspect of Tiamat",
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+19",
        "reach": "20 ft.",
        "target": "one target",
        "hit": "23 (2d12 + 10) piercing damage plus 11 (2d10) force damage",
        "damage type": "piercing, force"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+19",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "21 (2d10 + 10)",
        "damage type": "slashing"
      },
      "Tail": {
        "type": "Melee Weapon Attack",
        "to hit": "+19",
        "reach": "20 ft.",
        "target": "one target",
        "hit": "25 (3d10 + 10)",
        "damage type": "bludgeoning"
      }
    }
  },
  {
    "name": "Archdruid",
    "attacks": {
      "Scimitar": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "5 (1d6 + 2)",
        "damage type": "slashing"
      }
    }
  },
  {
    "name": "Choker",
    "attacks": {
      "Tentacle": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "5 (1d4+3) bludgeoning damage plus 3 (1d6) piercing damage",
        "damage type": "bludgeoning, piercing"
      }
    }
  },
  {
    "name": "Carrion Crawler",
    "attacks": {
      "Tentacles": {
        "type": "Attack",
        "to hit": "+8",
        "reach": "10 ft.",
        "target": "one creature",
        "hit": "4 (1d4+2)",
        "damage type": "poison"
      },
      "Bite": {
        "type": "Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "7 (2d4+2)",
        "damage type": "piercing"
      }
    }
  },
  {
    "name": "Bugbear Warrior",
    "attacks": {
      "Grab": {
        "type": "Melee Attack Roll",
        "to hit": "+4",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "9 (2d6+2)",
        "damage type": "Bludgeoning"
      },
      "Light Hammer": {
        "type": "Melee or Ranged Attack Roll",
        "to hit": "+4",
        "reach": "10 ft. or range 20/60 ft.",
        "target": "one target",
        "hit": "9 (3d4+2)",
        "damage type": "Bludgeoning"
      }
    }
  },
  {
    "name": "Boneclaw",
    "attacks": {
      "Piercing Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+8",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "20 (3d10 + 4)",
        "damage type": "piercing"
      }
    }
  },
  {
    "name": "Bugbear Chief",
    "attacks": {
      "Morningstar": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "11 (2d8+3)",
        "damage type": "piercing"
      },
      "Javelin": {
        "type": "Melee or Ranged Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft. or range 30/120 ft.",
        "target": "one target",
        "hit": "9 (2d6+3) piercing damage in melee or 5 (1d6+3) piercing damage at range",
        "damage type": "piercing"
      }
    }
  },
  {
    "name": "Cloud Giant Smiling One",
    "attacks": {
      "Slam": {
        "type": "Melee Weapon Attack",
        "to hit": "+12",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "21 (3d8+8) bludgeoning damage plus 5 (1d10) psychic damage",
        "damage type": "bludgeoning, psychic"
      }
    }
  },
  {
    "name": "Conclave Dryad",
    "attacks": {
      "Longbow": {
        "type": "Ranged Weapon Attack",
        "to hit": "+8",
        "reach": "150/600 ft.",
        "target": "one target",
        "hit": "12 (2d8 + 3)",
        "damage type": "piercing"
      }
    }
  },
  {
    "name": "Clockwork Stone Defender",
    "attacks": {
      "Slam": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "11 (2d6 + 4)",
        "damage type": "bludgeoning"
      }
    }
  }
```json
{
"Clockwork Oaken Bolter": {
"attacks": {
"Lancing Bolt": {
"type": "Melee or Ranged Weapon Attack",
"to hit": "+7",
"reach": "5 ft. or range 100/400 ft.",
"target": "one target",
"hit": "15 (2d10+4)",
"damage type": "piercing"
},
"Harpoon": {
"type": "Ranged Weapon Attack",
"to hit": "+7",
"reach": "50/200 ft.",
"target": "one target",
"hit": "9 (1d10 + 4)",
"damage type": "piercing"
}
}
},
"Iron Cobra": {
"attacks": {
"Bite": {
"type": "Melee Weapon Attack",
"to hit": "+5",
"reach": "5 ft.",
"target": "one target",
"hit": "6 (1d6+3)",
"damage type": "piercing"
}
}
},
"Clockwork Iron Cobra": {
"attacks": {
"Bite": {
"type": "Melee Weapon Attack",
"to hit": "+5",
"reach": "5 ft.",
"target": "one target",
"hit": "6 (1d6+3)",
"damage type": "piercing"
}
}
},
"Clockwork Bronze Scout": {
"attacks": {
"Bite": {
"type": "Melee Weapon Attack",
"to hit": "+5",
"reach": "5 ft.",
"target": "one target",
"hit": "5 (1d4 + 3)",
"damage type": "piercing plus lightning"
}
}
},
"Chromatic Greatwyrm": {
"attacks": {
"Bite": {
"type": "Melee Weapon Attack",
"to hit": "+18",
"reach": "15 ft.",
"target": "one target",
"hit": "21 (2d10 + 10)",
"damage type": "piercing plus acid, cold, fire, lightning, or poison"
},
"Claw": {
"type": "Melee Weapon Attack",
"to hit": "+18",
"reach": "10 ft.",
"target": "one target",
"hit": "17 (2d6 + 10)",
"damage type": "slashing"
},
"Tail": {
"type": "Melee Weapon Attack",
"to hit": "+18",
"reach": "20 ft.",
"target": "one target",
"hit": "19 (2d8 + 10)",
"damage type": "bludgeoning"
}
}
},
"Aspect Of Bahamut": {
"attacks": {
"Bite": {
"type": "Melee Weapon Attack",
"to hit": "+19",
"reach": "20 ft.",
"target": "one target",
"hit": "21 (2d10 + 10)",
"damage type": "piercing plus radiant"
},
"Claw": {
"type": "Melee Weapon Attack",
"to hit": "+19",
"reach": "15 ft.",
"target": "one target",
"hit": "17 (2d6 + 10)",
"damage type": "slashing"
},
"Tail": {
"type": "Melee Weapon Attack",
"to hit": "+19",
"reach": "25 ft.",
"target": "one target",
"hit": "19 (2d8 + 10)",
"damage type": "bludgeoning"
}
}
},
"Bheur Hag": {
"attacks": {
"Slam": {
"type": "Melee Weapon Attack",
"to hit": "+4",
"reach": "5 ft.",
"target": "one target",
"hit": "10 (2d8 + 1)",
"damage type": "bludgeoning plus cold"
}
}
},
"Young Deep Dragon": {
"attacks": {
"Bite": {
"type": "Melee Weapon Attack",
"to hit": "+7",
"reach": "10 ft.",
"target": "one target",
"hit": "9 (1d10 + 4)",
"damage type": "piercing plus poison"
},
"Claw": {
"type": "Melee Weapon Attack",
"to hit": "+7",
"reach": "5 ft.",
"target": "one target",
"hit": "7 (1d6 + 4)",
"damage type": "slashing"
}
}
},
"Adult Deep Dragon": {
"attacks": {
"Bite": {
"type": "Melee Weapon Attack",
"to hit": "+9",
"reach": "10 ft.",
"target": "one target",
"hit": "16 (2d10+5)",
"damage type": "piercing plus poison"
},
"Claw": {
"type": "Melee Weapon Attack",
"to hit": "+9",
"reach": "5 ft.",
"target": "one target",
"hit": "9 (1d8+5)",
"damage type": "slashing"
}
}
},
"Ancient Deep Dragon": {
"attacks": {
"Bite": {
"type": "Melee Weapon Attack",
"to hit": "+12",
"reach": "10 ft.",
"target": "one target",
"hit": "17 (2d10+6)",
"damage type": "piercing plus poison"
},
"Claw": {
"type": "Melee Weapon Attack",
"to hit": "+12",
"reach": "5 ft.",
"target": "one target",
"hit": "13 (2d6+6)",
"damage type": "slashing"
},
"Tail": {
"type": "Melee Weapon Attack",
"to hit": "+12",
"reach": "15 ft.",
"target": "one target",
"hit": "10 (1d8+6)",
"damage type": "bludgeoning"
}
}
},
"Death Knight": {
"attacks": {
"Dread Blade": {
"type": "Melee Weapon Attack",
"to hit": "+10",
"reach": "5 ft.",
"target": "one target",
"hit": "12 (2d6 + 5)",
"damage type": "slashing plus necrotic"
}
}
},
"Death Kiss": {
"attacks": {
"Tentacle": {
"type": "Melee Weapon Attack",
"to hit": "+8",
"reach": "20 ft.",
"target": "one target",
"hit": "14 (3d6+4)",
"damage type": "piercing"
}
}
},
"Crystal Dragon Wyrmling": {
"attacks": {
"Bite": {
"type": "Melee Weapon Attack",
"to hit": "+4",
"reach": "10 ft.",
"target": "one target",
"hit": "7 (1d10 + 2)",
"damage type": "piercing plus radiant"
}
}
},
"Young Crystal Dragon": {
"attacks": {
"Bite": {
"type": "Melee Weapon Attack",
"to hit": "+6",
"reach": "10 ft.",
"target": "one target",
"hit": "14 (2d10+3)",
"damage type": "piercing plus radiant"
},
"Claw": {
"type": "Melee Weapon Attack",
"to hit": "+6",
"reach": "5 ft.",
"target": "one target",
"hit": "6 (1d6+3)",
"damage type": "slashing"
}
}
},
"Adult Crystal Dragon": {
"attacks": {
"Bite": {
"type": "Melee Weapon Attack",
"to hit": "+9",
"reach": "10 ft.",
"target": "one target",
"hit": "16 (2d10+5)",
"damage type": "piercing plus radiant"
},
"Claw": {
"type": "Melee Weapon Attack",
"to hit": "+9",
"reach": "5 ft.",
"target": "one target",
"hit": "9 (1d8+5)",
"damage type": "slashing"
}
}
},
"Ancient Crystal Dragon": {
"attacks": {
"Bite": {
"type": "Melee Weapon Attack",
"to hit": "+13",
"reach": "15 ft.",
"target": "one target",
"hit": "18 (2d10+7)",
"damage type": "piercing plus radiant"
},
"Claw": {
"type": "Melee Weapon Attack",
"to hit": "+13",
"reach": "10 ft.",
"target": "one target",
"hit": "14 (2d6+7)",
"damage type": "slashing"
}
}
},
"Conjurer Wizard": {
"attacks": {
"Arcane Burst": {
"type": "Melee or Ranged Spell Attack",
"to hit": "+8",
"reach": "5 ft. or range 120 ft.",
"target": "one target",
"hit": "19 (3d10 + 3)",
"damage type": "force"
}
}
},
"Druid of the Old Ways": {
"attacks": {
"Quarterstaff": {
"type": "Melee Weapon Attack",
"to hit": "+3",
"reach": "5 ft.",
"target": "one target",
"hit": "3 (1d6)",
"damage type": "bludgeoning"
}
}
},
"Dracohydra": {
"attacks": {
"Bite": {
"type": "Melee Weapon Attack",
"to hit": "+9",
"reach": "10 ft.",
"target": "one target",
"hit": "10 (1d10 + 5)",
"damage type": "acid, cold, fire, lightning, or poison"
}
}
},
"Dracolich": {
"attacks": {
"Rend": {
"type": "Melee Attack Roll",
"to hit": "+13",
"reach": "10 ft.",
"target": "one target",
"hit": "18 (2d10 + 7)",
"damage type": "Slashing plus Necrotic"
}
}
},
"Draegloth": {
"attacks": {
"Bite": {
"type": "Melee Weapon Attack",
"to hit": "+8",
"reach": "5 ft.",
"target": "one creature",
"hit": "16 (2d10+5)",
"damage type": "piercing"
},
"Claws": {
"type": "Melee Weapon Attack",
"to hit": "+8",
"reach": "5 ft.",
"target": "one target",
"hit": "12 (2d6+5)",
"damage type": "slashing"
}
}
},
"Dragonblood Ooze": {
"attacks": {
"Pseudopod": {
"type": "Melee Weapon Attack",
"to hit": "+7",
"reach": "10 ft.",
"target": "one target",
"hit": "9 (1d10 + 4)",
"damage type": "bludgeoning plus acid"
}
}
},
"Dragon Speaker": {
"attacks": {
"Thunder Bolt": {
"type": "Melee or Ranged Spell Attack",
"to hit": "+5",
"reach": "5 ft. or range 60 ft.",
"target": "one target",
"hit": "13 (3d8)",
"damage type": "thunder"
}
}
},
"Dragon Hatchling": {
"attacks": {
"Bite": {
"type": "Melee Weapon Attack",
"to hit": "+2",
"reach": "5 ft.",
"target": "one target",
"hit": "4 (1d8)",
"damage type": "piercing plus draconic heritage"
}
}
},
"Dragon Hatchling, Red Dragon": {
"attacks": {
"Bite": {
"type": "Melee Weapon Attack",
"to hit": "+4",
"reach": "5 ft.",
"target": "one target",
"hit": "5 (1d6+2)",
"damage type": "piercing"
}
}
},
"Dragon Chosen": {
"attacks": {
"Handaxe": {
"type": "Melee or Ranged Weapon Attack",
"to hit": "+6",
"reach": "5 ft. or range 20/60 ft.",
"target": "one target",
"hit": "7 (1d6 + 4)",
"damage type": "slashing"
},
"Shortsword": {
"type": "Melee Weapon Attack",
"to hit": "+6",
"reach": "5 ft.",
"target": "one target",
"hit": "7 (1d6 + 4)",
"damage type": "piercing"
}
}
},
"Dragon Blessed": {
"attacks": {
"Mace": {
"type": "Melee Weapon Attack",
"to hit": "+4",
"reach": "5 ft.",
"target": "one target",
"hit": "4 (1d6+1)",
"damage type": "bludgeoning"
},
"Radiant Bolt": {
"type": "Ranged Spell Attack",
"to hit": "+6",
"reach": "120 ft.",
"target": "one target",
"hit": "22 (5d8)",
"damage type": "radiant"
}
}
},
"Drow Arachnomancer": {
"attacks": {
"Bite (Spider Form Only)": {
"type": "Melee Weapon Attack",
"to hit": "+8",
"reach": "5 ft.",
"target": "one target",
"hit": "12 (2d8 + 3)",
"damage type": "piercing plus poison"
},
"Poisonous Touch (Humanoid Form Only)": {
"type": "Melee Weapon Attack",
"to hit": "+8",
"reach": "5 ft.",
"target": "one target",
"hit": "35 (10d6)",
"damage type": "poison"
},
"Web (Spider Form Only)": {
"type": "Ranged Weapon Attack",
"to hit": "+8",
"reach": "30/60 ft.",
"target": "one target",
"hit": "The target is restrained by webbing.",
"damage type": "N/A"
}
}
},
"Drow Matron Mother": {
"attacks": {
"Demon Staff": {
"type": "Melee Weapon Attack",
"to hit": "+10",
"reach": "5 ft.",
"target": "one target",
"hit": "7 (1d6 + 4)",
"damage type": "bludgeoning plus psychic"
},
"Tentacle Rod": {
"type": "Melee Weapon Attack",
"to hit": "+9",
"reach": "15 ft.",
"target": "one creature",
"hit": "3 (1d6)",
"damage type": "bludgeoning"
}
}
},
"Drow Shadowblade": {
"attacks": {
"Shortsword": {
"type": "Melee Weapon Attack",
"to hit": "+9",
"reach": "5 ft.",
"target": "one target",
"hit": "8 (1d6 + 5)",
"damage type": "piercing plus poison"
},
"Hand Crossbow": {
"type": "Ranged Weapon Attack",
"to hit": "+9",
"reach": "30/120 ft.",
"target": "one target",
"hit": "8 (1d6 + 5)",
"damage type": "piercing"
}
}
},
"Junior Drow Priestess of Lolth": {
"attacks": {
"Mace": {
"type": "Melee Weapon Attack",
"to hit": "+2",
"reach": "5 ft.",
"target": "one target",
"hit": "3 (1d6)",
"damage type": "bludgeoning"
}
}
},
"Drow Priestess of Lolth": {
"attacks": {
"Scourge": {
"type": "Melee Weapon Attack",
"to hit": "+5",
"reach": "5 ft.",
"target": "one target",
"hit": "5 (1d6 + 2)",
"damage type": "piercing plus poison"
}
}
},
"Drow Mage": {
"attacks": {
"Staff": {
"type": "Melee Weapon Attack",
"to hit": "+2",
"reach": "5 ft.",
"target": "one target",
"hit": "2 (1d6 - 1)",
"damage type": "bludgeoning plus poison"
}
}
},
"Drow Inquisitor": {
"attacks": {
"Death Lance": {
"type": "Melee Weapon Attack",
"to hit": "+10",
"reach": "5 ft.",
"target": "one target",
"hit": "8 (1d6 + 5)",
"damage type": "piercing plus necrotic"
}
}
},
"Drow House Captain": {
"attacks": {
"Scimitar": {
"type": "Melee Weapon Attack",
"to hit": "+8",
"reach": "5 ft.",
"target": "one target",
"hit": "7 (1d6 + 4)",
"damage type": "slashing plus poison"
},
"Whip": {
"type": "Melee Weapon Attack",
"to hit": "+8",
"reach": "10 ft.",
"target": "one target",
"hit": "6 (1d4 + 4)",
"damage type": "slashing"
},
"Hand Crossbow": {
"type": "Ranged Weapon Attack",
"to hit": "+8",
"reach": "30/120 ft.",
"target": "one target",
"hit": "7 (1d6 + 4)",
"damage type": "piercing"
}
}
},
"Drow Guard": {
"attacks": {
"Spear": {
"type": "Melee or Ranged Weapon Attack",
"to hit": "+3",
"reach": "5 ft. or range 20/60 ft.",
"target": "one target",
"hit": "4 (1d6 + 1)",
"damage type": "piercing"
}
}
},
"Drow Favored Consort": {
"attacks": {
"Scimitar": {
"type": "Melee Weapon Attack",
"to hit": "+11",
"reach": "5 ft.",
"target": "one target",
"hit": "8 (1d6 + 5)",
"damage type": "slashing plus poison"
},
"Arcane Eruption": {
"type": "Ranged Spell Attack",
"to hit": "+10",
"reach": "120 ft.",
"target": "one target",
"hit": "36 (8d8)",
"damage type": "force"
}
}
},
"Drow Elite Warrior": {
"attacks": {
"Shortsword": {
"type": "Melee Weapon Attack",
"to hit": "+7",
"reach": "5 ft.",
"target": "one target",
"hit": "7 (1d6 + 4)",
"damage type": "piercing plus poison"
},
"Hand Crossbow": {
"type": "Ranged Weapon Attack",
"to hit": "+7",
"reach": "30/120 ft.",
"target": "one target",
"hit": "7 (1d6 + 4)",
"damage type": "piercing"
}
}
},
"Dragonnel": {
"attacks": {
"Rend": {
"type": "Melee Weapon Attack",
"to hit": "+5",
"reach": "5 ft.",
"target": "one target",
"hit": "10 (2d6 + 3)",
"damage type": "slashing"
}
}
},
"Duergar Xarrorn": {
"attacks": {
"Fire Lance": {
"type": "Melee Weapon Attack",
"to hit": "+5",
"reach": "10 ft.",
"target": "one target",
"hit": "9 (1d12 + 3)",
"damage type": "piercing plus fire"
}
}
},
"Duergar Warlord": {
"attacks": {
"Psychic-Attuned Hammer": {
"type": "Melee Weapon Attack",
"to hit": "+7",
"reach": "5 ft.",
"target": "one target",
"hit": "9 (1d10 + 4)",
"damage type": "bludgeoning plus psychic"
},
"Javelin": {
"type": "Melee or Ranged Weapon Attack",
"to hit": "+7",
"reach": "5 ft. or range 30/120 ft.",
"target": "one target",
"hit": "7 (1d6 + 4)",
"damage type": "piercing"
}
}
},
"Duergar Stone Guard": {
"attacks": {
"Shortsword": {
"type": "Melee Weapon Attack",
"to hit": "+6",
"reach": "5 ft.",
"target": "one target",
"hit": "7 (1d6 + 4)",
"damage type": "piercing"
},
"Javelin": {
"type": "Melee or Ranged Weapon Attack",
"to hit": "+6",
"reach": "5 ft. or range 30/120 ft.",
"target": "one target",
"hit": "7 (1d6 + 4)",
"damage type": "piercing"
}
}
},
"Duergar Soulblade": {
"attacks": {
"Soulblade": {
"type": "Melee Spell Attack",
"to hit": "+5",
"reach": "5 ft.",
"target": "one target",
"hit": "10 (2d6 + 3)",
"damage type": "force"
}
}
}
}

```json
{
  "Duergar Screamer": {
    "attacks": {
      "Drill": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "10 (1d12 + 4)",
        "damage type": "piercing"
      }
    }
  },
  "Duergar Mind Master": {
    "attacks": {
      "Mind-Poison Dagger": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "5 (1d4 + 3) piercing damage plus 10 (3d6) psychic damage, or 1 piercing damage plus 10 (3d6) psychic damage while under the effect of Reduce",
        "damage type": "piercing, psychic"
      }
    }
  },
  "Duergar Kavalrachni": {
    "attacks": {
      "War Pick": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "6 (1d8 + 2) piercing damage plus 5 (2d4) poison damage",
        "damage type": "piercing, poison"
      },
      "Heavy Crossbow": {
        "type": "Ranged Weapon Attack",
        "to hit": "+2",
        "reach": "100/400 ft.",
        "target": "one target",
        "hit": "5 (1d10)",
        "damage type": "piercing"
      }
    }
  },
  "Duergar Hammerer": {
    "attacks": {
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "6 (1d6 + 3)",
        "damage type": "bludgeoning"
      },
      "Hammer": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "10 (2d6 + 3)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Duergar Despot": {
    "attacks": {
      "Iron Fist": {
        "type": "Melee Weapon Attack",
        "to hit": "+9",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "14 (2d8 + 5)",
        "damage type": "bludgeoning"
      },
      "Stomping Foot": {
        "type": "Melee Weapon Attack",
        "to hit": "+9",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "9 (1d8 + 5) bludgeoning damage, or 18 (3d8 + 5) bludgeoning damage to a prone target",
        "damage type": "bludgeoning"
      }
    }
  },
  "Firemane Angel": {
    "attacks": {
      "Longsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+10",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "10 (1d8 + 6) slashing damage, or 11 (1d10 + 6) slashing damage if used with two hands, plus 22 (5d8) fire or radiant damage (angel's choice)",
        "damage type": "slashing, fire, radiant"
      }
    }
  },
  "Firefist": {
    "attacks": {
      "Greatsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "10 (2d6 + 3)",
        "damage type": "slashing"
      }
    }
  },
  "Fire Snake": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "4 (1d3+3) piercing damage plus 3 (1d6) fire damage",
        "damage type": "piercing, fire"
      }
    }
  },
  "Fire Giant Dreadnought": {
    "attacks": {
      "Fireshield": {
        "type": "Melee Weapon Attack",
        "to hit": "+13",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "22 (4d6+8) bludgeoning damage plus 7 (2d6) fire damage plus 7 (2d6) piercing damage",
        "damage type": "bludgeoning, fire, piercing"
      },
      "Rock": {
        "type": "Ranged Weapon Attack",
        "to hit": "+13",
        "reach": "60/240 ft.",
        "target": "one target",
        "hit": "30 (4d10 + 8)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Faerie Dragon (Red)": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one creature",
        "hit": "1",
        "damage type": "piercing"
      }
    }
  },
  "Demilich": {
    "attacks": {}
  },
  "Young Amethyst Dragon": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+9",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "16 (2d10 + 5) piercing damage plus 4 (1d8) force damage",
        "damage type": "piercing, force"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+9",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "9 (1d8 + 5)",
        "damage type": "slashing"
      }
    }
  },
  "Adult Amethyst Dragon": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+12",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "18 (2d10 + 7) piercing damage plus 9 (2d8) force damage",
        "damage type": "piercing, force"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+12",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "11 (1d8 + 7)",
        "damage type": "slashing"
      }
    }
  },
  "Ancient Amethyst Dragon": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+15",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "19 (2d10 + 8) piercing damage plus 13 (3d8) force damage",
        "damage type": "piercing, force"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+15",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "15 (2d6 + 8)",
        "damage type": "slashing"
      }
    }
  },
  "Gem Stalker": {
    "attacks": {
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "10 (2d6 + 3)",
        "damage type": "slashing"
      },
      "Crystal Dart": {
        "type": "Ranged Spell Attack",
        "to hit": "+5",
        "reach": "30 ft.",
        "target": "one target",
        "hit": "7 (1d10 + 2)",
        "damage type": "force"
      }
    }
  },
  "Genie, Djinni": {
    "attacks": {
      "Scimitar": {
        "type": "Melee Weapon Attack",
        "to hit": "+9",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "12 (2d6 + 5) slashing damage plus 3 (1d6) lightning or thunder damage (djinni's choice)",
        "damage type": "slashing, lightning, thunder"
      }
    }
  },
  "Giant Ant": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "6 (1d8 + 2)",
        "damage type": "bludgeoning"
      },
      "Sting": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "6 (1d8 + 2)",
        "damage type": "piercing"
      }
    }
  },
  "Sapphire Greatwyrm": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+17",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "20 (2d10 + 9) piercing damage plus 16 (3d10) force damage",
        "damage type": "piercing, force"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+17",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "18 (2d8 + 9)",
        "damage type": "slashing"
      }
    }
  },
  "Drake, Hoarfrost": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "5 (1d6 + 2) piercing damage plus 2 (1d4) cold damage",
        "damage type": "piercing, cold"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "4 (1d4 + 2)",
        "damage type": "slashing"
      }
    }
  },
  "Frontline Medic": {
    "attacks": {
      "Spear": {
        "type": "Melee or Ranged Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft. or range 20/60 ft.",
        "target": "one target",
        "hit": "5 (1d6 + 2) piercing damage, or 6 (1d8 + 2) piercing damage if used with two hands to make a melee attack",
        "damage type": "piercing"
      }
    }
  },
  "Firenewt Warrior": {
    "attacks": {
      "Scimitar": {
        "type": "Melee Weapon Attack",
        "to hit": "+3",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "4 (1d6 + 1)",
        "damage type": "slashing"
      }
    }
  },
  "Firenewt Warlock of Imix": {
    "attacks": {
      "Morningstar": {
        "type": "Melee Weapon Attack",
        "to hit": "+3",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "5 (1d8 + 1)",
        "damage type": "piercing"
      },
      "Fire Ray": {
        "type": "Ranged Spell Attack",
        "to hit": "+4",
        "reach": "120 ft.",
        "target": "one target",
        "hit": "5 (1d6 + 2)",
        "damage type": "fire"
      }
    }
  },
  "Fire Giant Forgecaller": {
    "attacks": {
      "Forge Hammer": {
        "type": "Melee Weapon Attack",
        "to hit": "+13",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "20 (3d8 + 7) bludgeoning damage plus 9 (2d8) fire damage",
        "damage type": "bludgeoning, fire"
      },
      "Heated Rock": {
        "type": "Ranged Weapon Attack",
        "to hit": "+13",
        "reach": "60/240 ft.",
        "target": "one target",
        "hit": "25 (4d8 + 7) bludgeoning damage plus 9 (2d8) fire damage",
        "damage type": "bludgeoning, fire"
      }
    }
  },
  "Fire Giant of Evil Fire": {
    "attacks": {
      "Searing Scepter": {
        "type": "Melee Weapon Attack",
        "to hit": "+11",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "17 (3d6 + 7) bludgeoning damage plus 9 (2d8) fire damage",
        "damage type": "bludgeoning, fire"
      },
      "Bolt of Imix": {
        "type": "Ranged Spell Attack",
        "to hit": "+8",
        "reach": "120 ft.",
        "target": "one target",
        "hit": "20 (3d10 + 4)",
        "damage type": "fire"
      }
    }
  },
  "Stone Defender": {
    "attacks": {
      "Slam": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "11 (2d6 + 4)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Deadstone Cleft Stone Giant": {
    "attacks": {
      "Greatclub": {
        "type": "Melee Weapon Attack",
        "to hit": "+9",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "19 (3d8 + 6)",
        "damage type": "bludgeoning"
      },
      "Rock": {
        "type": "Ranged Weapon Attack",
        "to hit": "+9",
        "reach": "60/240 ft.",
        "target": "one target",
        "hit": "28 (4d10 + 6)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Storm Giant Tempest Caller": {
    "attacks": {
      "Greatclub": {
        "type": "Melee Weapon Attack",
        "to hit": "+15",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "30 (4d10 + 9)",
        "damage type": "bludgeoning"
      },
      "Lightning Strike": {
        "type": "Ranged Spell Attack",
        "to hit": "+13",
        "reach": "600 ft.",
        "target": "one target",
        "hit": "28 (8d6)",
        "damage type": "lightning"
      }
    }
  },
  "Stench Kow": {
    "attacks": {
      "Gore": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "7 (1d6 + 4)",
        "damage type": "piercing"
      }
    }
  },
  "Summer Eladrin": {
    "attacks": {
      "Longsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+8",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "13 (2d8 + 4) slashing damage plus 4 (1d8) fire damage, or 15 (2d10 + 4) slashing damage plus 4 (1d8) fire damage if used with two hands",
        "damage type": "slashing, fire"
      },
      "Longbow": {
        "type": "Ranged Weapon Attack",
        "to hit": "+9",
        "reach": "150/600 ft.",
        "target": "one target",
        "hit": "14 (2d8 + 5) piercing damage plus 4 (1d8) fire damage",
        "damage type": "piercing, fire"
      }
    }
  },
  "Storm Giant Quintessent": {
    "attacks": {
      "Lightning Sword": {
        "type": "Melee Weapon Attack",
        "to hit": "+14",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "40 (9d6 + 9)",
        "damage type": "lightning"
      },
      "Windjavelin": {
        "type": "Ranged Weapon Attack",
        "to hit": "+14",
        "reach": "600 ft.",
        "target": "a creature it can see",
        "hit": "19 (3d6 + 9)",
        "damage type": "piercing"
      }
    }
  },
  "Stone Giant of Evil Earth": {
    "attacks": {
      "Thundering Stone Club": {
        "type": "Melee Weapon Attack",
        "to hit": "+10",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "16 (3d6 + 6) bludgeoning damage",
        "damage type": "bludgeoning, thunder"
      },
      "Boulder": {
        "type": "Ranged Weapon Attack",
        "to hit": "+10",
        "reach": "60/240 ft.",
        "target": "one target",
        "hit": "19 (3d8 + 6)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Thane Kayalithica": {
    "attacks": {
      "Adamantine Greatclub": {
        "type": "Melee Weapon Attack",
        "to hit": "+9",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "19 (3d8 + 6)",
        "damage type": "bludgeoning"
      },
      "Rock": {
        "type": "Ranged Weapon Attack",
        "to hit": "+9",
        "reach": "60/240 ft.",
        "target": "one target",
        "hit": "28 (4d10 + 6)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Warlock of the Archfey": {
    "attacks": {
      "Rapier": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "7 (1d8+3) piercing damage plus 7 (2d6) force damage",
        "damage type": "piercing, force"
      }
    }
  },
  "Warlock of the Fiend": {
    "attacks": {
      "Scimitar": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "6 (1d6+3) slashing damage plus 14 (4d6) fire damage",
        "damage type": "slashing, fire"
      }
    }
  },
  "Vampire Warrior": {
    "attacks": {
      "Unarmed Strike": {
        "type": "Melee Weapon Attack",
        "to hit": "+9",
        "reach": "5 ft.",
        "target": "one creature",
        "hit": "8 (1d8+4)",
        "damage type": "bludgeoning"
      },
      "Greatsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+9",
        "reach": "5 ft.",
        "target": "one creature",
        "hit": "11 (2d6+4)",
        "damage type": "slashing"
      },
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+9",
        "reach": "5 ft.",
        "target": "one willing creature, or a creature that is grappled by the vampire, incapacitated, or restrained",
        "hit": "7 (1d6+4) piercing damage plus 10 (3d6) necrotic damage",
        "damage type": "piercing, necrotic"
      }
    }
  },
  "Yeth Hound": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "11 (2d6 + 4) piercing damage, plus 14 (4d6) psychic damage if the target is frightened",
        "damage type": "piercing, psychic"
      }
    }
  },
  "Archduke Zariel of Avernus": {
    "attacks": {
      "Flail": {
        "type": "Melee Weapon Attack",
        "to hit": "+16",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "17 (2d8 + 8) piercing damage plus 36 (8d8) fire damage",
        "damage type": "piercing, fire"
      },
      "Matalotok (Warhammer)": {
        "type": "Melee Weapon Attack",
        "to hit": "+16",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "17 (2d8 + 8) bludgeoning, or 19 (2d10 + 8) bludgeoning damage if used with two hands, plus 36 (8d8) fire damage",
        "damage type": "bludgeoning, fire"
      }
    }
  },
  "Zaratan": {
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+17",
        "reach": "20 ft.",
        "target": "one target",
        "hit": "28 (4d8 + 10)",
        "damage type": "piercing"
      },
      "Stomp": {
        "type": "Melee Weapon Attack",
        "to hit": "+17",
        "reach": "20 ft.",
        "target": "one target",
        "hit": "26 (3d10 + 10)",
        "damage type": "bludgeoning"
      },
      "Spit Rock": {
        "type": "Ranged Weapon Attack",
        "to hit": "+17",
        "reach": "120/240 ft.",
        "target": "one target",
        "hit": "31 (6d8 + 10)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Zariel": {
    "attacks": {
      "Longsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+16",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "17 (2d8 + 8) slashing damage plus 36 (8d8) fire damage, or 19 (2d10 + 8) slashing damage plus 36 (8d8) fire damage if used with two hands",
        "damage type": "slashing, fire"
      },
      "Javelin": {
        "type": "Melee or Ranged Weapon Attack",
        "to hit": "+16",
        "reach": "10 ft. or range 30/120 ft.",
        "target": "one target",
        "hit": "15 (2d6 + 8) piercing damage plus 36 (8d8) fire damage",
        "damage type": "piercing, fire"
      }
    }
  },
  "Zegana": {
    "attacks": {
      "Prime Speaker's Trident": {
        "type": "Melee or Ranged Weapon Attack",
        "to hit": "+10",
        "reach": "5 ft. or range 20/60 ft.",
        "target": "one target",
        "hit": "12 (2d6 + 5)",
        "damage type": "piercing, thunder"
      }
    }
  },
  "Zuggtmoy": {
    "attacks": {
      "Pseudopod": {
        "type": "Melee Weapon Attack",
        "to hit": "+13",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "15 (2d8 + 6) bludgeoning damage plus 9 (2d8) poison damage",
        "damage type": "bludgeoning, poison"
      }
    }
  },
  "Warlock of the Great Old One": {
    "attacks": {
      "Dagger": {
        "type": "Melee or Ranged Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft. or range 20/60 ft.",
        "target": "one target",
        "hit": "5 (1d4 + 3) piercing damage plus 10 (3d6) psychic damage",
        "damage type": "piercing, psychic"
      }
    }
  },
  "Darkling": {
    "attacks": {
      "Dagger": {
        "type": "Melee or Ranged Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft. or range 20/60 ft.",
        "target": "one target",
        "hit": "5 (1d4+3) piercing damage plus 7 (2d6) necrotic damage",
        "damage type": "piercing, necrotic"
      }
    }
  },
  "Darkling Elder": {
    "attacks": {
      "Scimitar": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "6 (1d6 + 3) slashing damage plus 7 (2d6) necrotic damage",
        "damage type": "slashing, necrotic"
      }
    }
  },
  "Death Tyrant": {
    "attacks": {
      "Bite": {
        "type": "Melee Attack Roll",
        "to hit": "+9",
        "reach": "5 feet",
        "target": "one target",
        "hit": "13 (2d8 + 4)",
        "damage type": "piercing"
      }
    }
  },
  "Deathlock": {
    "attacks": {
      "Deathly Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "9 (2d6 + 2)",
        "damage type": "necrotic"
      }
    }
  },
  "Deathlock Mastermind": {
    "attacks": {
      "Deathly Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "13 (3d6 + 3)",
        "damage type": "necrotic"
      },
      "Grave Bolts": {
        "type": "Ranged Spell Attack",
        "to hit": "+6",
        "reach": "120 ft.",
        "target": "one or two targets",
        "hit": "18 (4d8)",
        "damage type": "necrotic"
      }
    }
  },
  "Deathlock Wight": {
    "attacks": {
      "Grave Bolt": {
        "type": "Ranged Spell Attack",
        "to hit": "+5",
        "reach": "120 ft.",
        "target": "one target",
        "hit": "7 (1d8 + 3)",
        "damage type": "necrotic"
      },
      "Life Drain": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one creature",
        "hit": "9 (2d6 + 2)",
        "damage type": "necrotic"
      }
    }
  }
}
```json
{
  "Deathpact Angel": {
    "number of attacks": 2,
    "attacks": {
      "Scythe": {
        "type": "Melee Weapon Attack",
        "to hit": "+9",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "9 (2d4 + 4) slashing damage plus 27 (6d8) necrotic damage",
        "damage type": "slashing, necrotic"
      }
    }
  },
  "Deep Gnome Scout": {
    "number of attacks": 1,
    "attacks": {
      "War Pick": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "6 (1d8 + 2)",
        "damage type": "piercing"
      }
    }
  },
  "Dimetrodon": {
    "number of attacks": 1,
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "9 (2d6 + 2)",
        "damage type": "piercing"
      }
    }
  },
  "Displacer Beast": {
    "number of attacks": 2,
    "attacks": {
      "Tentacle": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "7 (1d6 + 4) bludgeoning damage plus 3 (1d6) piercing damage",
        "damage type": "bludgeoning, piercing"
      }
    }
  },
  "Dispater": {
    "number of attacks": 4,
    "attacks": {
      "Wrought-Iron Tower": {
        "type": "Melee Weapon Attack",
        "to hit": "+20",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "21 (2d8 + 12) bludgeoning damage plus 7 (2d6) fire damage",
        "damage type": "bludgeoning, fire"
      },
      "Iron Column": {
        "type": "Ranged Spell Attack",
        "to hit": "+15",
        "reach": "60 ft.",
        "target": "one target",
        "hit": "21 (2d8 + 12) bludgeoning damage plus 7 (2d6) fire damage",
        "damage type": "bludgeoning, fire"
      }
    }
  },
  "Elder Tempest": {
    "number of attacks": 2,
    "attacks": {
      "Thunderous Slam": {
        "type": "Melee Weapon Attack",
        "to hit": "+16",
        "reach": "20 ft.",
        "target": "one target",
        "hit": "23 (4d6 + 9)",
        "damage type": "thunder"
      }
    }
  },
  "Empyrean": {
    "number of attacks": 0,
    "attacks": {}
  },
  "Enchanter Wizard": {
    "number of attacks": 0,
    "attacks": {}
  },
  "Enchanter": {
    "number of attacks": 0,
    "attacks": {}
  },
  "Archer": {
    "number of attacks": 2,
    "attacks": {
      "Shortsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "7 (1d6 + 4)",
        "damage type": "piercing"
      },
      "Longbow": {
        "type": "Ranged Weapon Attack",
        "to hit": "+6",
        "reach": "150/600 ft.",
        "target": "one target",
        "hit": "8 (1d8 + 4)",
        "damage type": "piercing"
      }
    }
  },
  "Archon of Boundaries": {
    "number of attacks": 2,
    "attacks": {
      "Hooves": {
        "type": "Melee Weapon Attack",
        "to hit": "+11",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "20 (4d6 + 6) bludgeoning damage plus 10 (3d6) radiant damage",
        "damage type": "bludgeoning, radiant"
      },
      "Radiant Lance": {
        "type": "Melee Weapon Attack",
        "to hit": "+11",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "12 (1d12 + 6) piercing damage plus 28 (8d6) radiant damage",
        "damage type": "piercing, radiant"
      }
    }
  },
  "Archon of Falling Stars": {
    "number of attacks": 2,
    "attacks": {
      "Radiant Spear": {
        "type": "Melee Weapon Attack",
        "to hit": "+9",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "12 (2d6 + 5) piercing damage plus 10 (3d6) radiant damage",
        "damage type": "piercing, radiant"
      }
    }
  },
  "Amnizu": {
    "number of attacks": 2,
    "attacks": {
      "Taskmaster Whip": {
        "type": "Melee Weapon Attack",
        "to hit": "+11",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "10 (2d4 + 5) slashing damage plus 33 (6d10) force damage",
        "damage type": "slashing, force"
      },
      "Disruptive Touch": {
        "type": "Melee Spell Attack",
        "to hit": "+11",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "44 (8d10)",
        "damage type": "necrotic"
      }
    }
  },
  "Anarch": {
    "number of attacks": 1,
    "attacks": {
      "Spiked Club": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "6 (1d8 + 2)",
        "damage type": "piercing"
      }
    }
  },
  "Angry Sorrowsworn": {
    "number of attacks": 2,
    "attacks": {
      "Hook": {
        "type": "Melee Weapon Attack",
        "to hit": "+8",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "16 (2d12 + 3)",
        "damage type": "piercing"
      }
    }
  },
  "Lantern Archon": {
    "number of attacks": 2,
    "attacks": {
      "Radiant Strike": {
        "type": "Melee or Ranged Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft. or range 60 ft.",
        "target": "one target",
        "hit": "6 (1d6 + 3)",
        "damage type": "radiant"
      }
    }
  },
  "Archon of Redemption": {
    "number of attacks": 2,
    "attacks": {
      "Sword": {
        "type": "Melee Weapon Attack",
        "to hit": "+8",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "8 (1d8 + 4) slashing damage plus 13 (3d8) radiant damage",
        "damage type": "slashing, radiant"
      },
      "Claws": {
        "type": "Melee Weapon Attack",
        "to hit": "+8",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "11 (2d6 + 4) piercing damage plus 13 (3d8) radiant damage",
        "damage type": "piercing, radiant"
      }
    }
  },
  "Archon of the Triumvirate": {
    "number of attacks": 2,
    "attacks": {
      "Hammer of Justice": {
        "type": "Melee Weapon Attack",
        "to hit": "+10",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "12 (2d6 + 5) bludgeoning damage plus 18 (4d8) force damage",
        "damage type": "bludgeoning, force"
      }
    }
  },
  "Animated Breath": {
    "number of attacks": 2,
    "attacks": {
      "Slam": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "13 (2d8 + 4) bludgeoning damage plus 11 (2d10) damage",
        "damage type": "bludgeoning"
      }
    }
  },
  "Annis Hag": {
    "number of attacks": 3,
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+8",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "15 (3d6 + 5)",
        "damage type": "piercing"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+8",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "15 (3d6 + 5)",
        "damage type": "slashing"
      },
      "Crushing Hug": {
        "type": "Melee Weapon Attack",
        "to hit": "+8",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "36 (9d6 + 5)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Antelope": {
    "number of attacks": 1,
    "attacks": {
      "Gore": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "4 (1d8)",
        "damage type": "piercing"
      },
      "Hooves": {
        "type": "Melee Weapon Attack",
        "to hit": "+2",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "3 (1d6)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Lorehold Apprentice": {
    "number of attacks": 1,
    "attacks": {
      "Scroll Bash": {
        "type": "Melee Spell Attack",
        "to hit": "+4",
        "reach": "30 ft.",
        "target": "one target",
        "hit": "7 (1d10 + 2) bludgeoning damage plus 9 (2d8) thunder damage",
        "damage type": "bludgeoning, thunder"
      }
    }
  },
  "Arcanaloth": {
    "number of attacks": 1,
    "attacks": {
      "Claws": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "8 (2d4 + 3)",
        "damage type": "slashing"
      }
    }
  },
  "Arclight Phoenix": {
    "number of attacks": 1,
    "attacks": {
      "Arclight Touch": {
        "type": "Melee Weapon Attack",
        "to hit": "+10",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "27 (6d8)",
        "damage type": "lightning"
      }
    }
  },
  "Armanite": {
    "number of attacks": 3,
    "attacks": {
      "Hooves": {
        "type": "Melee Weapon Attack",
        "to hit": "+8",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "12 (2d6 + 5)",
        "damage type": "bludgeoning"
      },
      "Claws": {
        "type": "Melee Weapon Attack",
        "to hit": "+8",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "10 (2d4 + 5)",
        "damage type": "slashing"
      },
      "Serrated Tail": {
        "type": "Melee Weapon Attack",
        "to hit": "+8",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "16 (2d10 + 5)",
        "damage type": "slashing"
      }
    }
  },
  "Ash Zombie": {
    "number of attacks": 1,
    "attacks": {
      "Slam": {
        "type": "Melee Weapon Attack",
        "to hit": "+3",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "4 (1d6 + 1)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Ash Phoenix": {
    "number of attacks": 2,
    "attacks": {
      "Ash Talons": {
        "type": "Melee Weapon Attack",
        "to hit": "+8",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "14 (2d8 + 5) slashing damage plus 7 (2d6) fire damage",
        "damage type": "slashing, fire"
      }
    }
  },
  "Asmodeus": {
    "number of attacks": 4,
    "attacks": {
      "Ruby Rod": {
        "type": "Melee Weapon Attack",
        "to hit": "+21",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "21 (2d8 + 12)",
        "damage type": "necrotic"
      },
      "Chilling Gaze": {
        "type": "Ranged Spell Attack",
        "to hit": "+16",
        "reach": "60 ft.",
        "target": "one target",
        "hit": "18 (2d10 + 7)",
        "damage type": "cold"
      }
    }
  },
  "Astral Dreadnought": {
    "number of attacks": 3,
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+16",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "36 (5d10 + 9)",
        "damage type": "piercing"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+16",
        "reach": "20 ft.",
        "target": "one target",
        "hit": "19 (3d6 + 9)",
        "damage type": "slashing"
      }
    }
  },
  "Aurelia": {
    "number of attacks": 3,
    "attacks": {
      "Longsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+15",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "12 (1d8 + 8) slashing damage, or 13 (1d10 + 8) slashing damage when used with two hands, plus 27 (6d8) radiant damage",
        "damage type": "slashing, radiant"
      }
    }
  },
  "Aurochs": {
    "number of attacks": 1,
    "attacks": {
      "Gore": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "14 (2d8 + 5)",
        "damage type": "piercing"
      }
    }
  },
  "Autumn Eladrin": {
    "number of attacks": 1,
    "attacks": {
      "Longsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "5 (1d8 + 1) slashing damage plus 18 (4d8) psychic damage, or 6 (1d10 + 1) slashing damage plus 18 (4d8) psychic damage if used with two hands",
        "damage type": "slashing, psychic"
      },
      "Longbow": {
        "type": "Ranged Weapon Attack",
        "to hit": "+7",
        "reach": "150/600 ft.",
        "target": "one target",
        "hit": "7 (1d8 + 3) piercing damage plus 18 (4d8) psychic damage",
        "damage type": "piercing, psychic"
      }
    }
  },
  "Baalzebul": {
    "number of attacks": 3,
    "attacks": {
      "Slam": {
        "type": "Melee Weapon Attack",
        "to hit": "+17",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "19 (3d6 + 9) bludgeoning damage plus 7 (2d6) necrotic damage",
        "damage type": "bludgeoning, necrotic"
      }
    }
  },
  "Babau": {
    "number of attacks": 2,
    "attacks": {
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "8 (1d8 + 4)",
        "damage type": "slashing"
      },
      "Spear": {
        "type": "Melee or Ranged Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft. or range 20/60 ft.",
        "target": "one target",
        "hit": "7 (1d6 + 4) piercing damage, or 8 (1d8 + 4) piercing damage when used with two hands to make a melee attack",
        "damage type": "piercing"
      }
    }
  },
  "Bael": {
    "number of attacks": 2,
    "attacks": {
      "Hellish Morningstar": {
        "type": "Melee Weapon Attack",
        "to hit": "+13",
        "reach": "20 ft.",
        "target": "one target",
        "hit": "16 (2d8 + 7) piercing damage plus 13 (3d8) necrotic damage",
        "damage type": "piercing, necrotic"
      }
    }
  },
  "Balhannoth": {
    "number of attacks": 4,
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "25 (4d10 + 3)",
        "damage type": "piercing"
      },
      "Tentacle": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "10 (2d6 + 3)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Banderhobb": {
    "number of attacks": 2,
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+8",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "15 (3d6 + 5)",
        "damage type": "piercing"
      },
      "Tongue": {
        "type": "Melee Weapon Attack",
        "to hit": "+8",
        "reach": "15 ft.",
        "target": "one creature",
        "hit": "10 (3d6)",
        "damage type": "necrotic"
      },
      "Swallow": {
        "type": "Melee Weapon Attack",
        "to hit": "+8",
        "reach": "5 ft.",
        "target": "one Medium or smaller creature grappled by the banderhobb",
        "hit": "15 (3d6 + 5)",
        "damage type": "piercing"
      }
    }
  },
  "Baphomet": {
    "number of attacks": 3,
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+17",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "19 (2d8 + 10)",
        "damage type": "piercing"
      },
      "Gore": {
        "type": "Melee Weapon Attack",
        "to hit": "+17",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "17 (2d6 + 10)",
        "damage type": "piercing"
      },
      "Heartcleaver": {
        "type": "Melee Weapon Attack",
        "to hit": "+17",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "21 (2d10 + 10)",
        "damage type": "force"
      }
    }
  },
  "Barghest": {
    "number of attacks": 1,
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "13 (2d8 + 4)",
        "damage type": "piercing"
      },
      "Claws": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "8 (1d8 + 4)",
        "damage type": "slashing"
      }
    }
  },
  "Blackguard": {
    "number of attacks": 2,
    "attacks": {
      "Greatsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+9",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "12 (2d6 + 5) slashing damage plus 7 (2d6) necrotic damage",
        "damage type": "slashing, necrotic"
      }
    }
  },
  "Blood Drinker Vampire": {
    "number of attacks": 2,
    "attacks": {
      "Unarmed Strike": {
        "type": "Melee Weapon Attack",
        "to hit": "+9",
        "reach": "5 ft.",
        "target": "one creature",
        "hit": "8 (1d8 + 4)",
        "damage type": "bludgeoning"
      },
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+9",
        "reach": "5 ft.",
        "target": "one willing creature, or a creature that is grappled by the vampire, incapacitated, or restrained",
        "hit": "7 (1d6 + 4) piercing damage plus 10 (3d6) necrotic damage",
        "damage type": "piercing, necrotic"
      }
    }
  },
  "Blood Witch": {
    "number of attacks": 1,
    "attacks": {
      "Dagger": {
        "type": "Melee Weapon Attack",
        "to hit": "+3",
        "reach": "5 ft.",
        "target": "one creature",
        "hit": "3 (1d4 + 1)",
        "damage type": "piercing"
      }
    }
  },
  "Bloodfray Giant": {
    "number of attacks": 2,
    "attacks": {
      "Greataxe": {
        "type": "Melee Weapon Attack",
        "to hit": "+10",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "25 (3d12 + 6)",
        "damage type": "slashing"
      },
      "Rock": {
        "type": "Ranged Weapon Attack",
        "to hit": "+10",
        "reach": "60/240 ft.",
        "target": "one target",
        "hit": "28 (4d10 + 6)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Bone Naga": {
    "number of attacks": 1,
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "7 (1d8 + 3) piercing damage plus 10 (3d6) poison damage",
        "damage type": "piercing, poison"
      },
      "Constrict": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one creature",
        "hit": "6 (1d6 + 3)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Bounty Hunter": {
    "number of attacks": 2,
    "attacks": {
      "Shortsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "6 (1d6 + 3)",
        "damage type": "piercing"
      },
      "Light Crossbow": {
        "type": "Ranged Weapon Attack",
        "to hit": "+5",
        "reach": "80/320 ft.",
        "target": "one target",
        "hit": "7 (1d8 + 3)",
        "damage type": "piercing"
      },
      "Net": {
        "type": "Ranged Weapon Attack",
        "to hit": "+5",
        "reach": "5/15 ft.",
        "target": "one Large or smaller creature",
        "hit": "The target is restrained",
        "damage type": "N/A"
      }
    }
  },
  "Brontosaurus": {
    "number of attacks": 1,
    "attacks": {
      "Stomp": {
        "type": "Melee Weapon Attack",
        "to hit": "+8",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "27 (5d8 + 5)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Battleforce Angel": {
    "number of attacks": 2,
    "attacks": {
      "Greatsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+9",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "13 (2d6 + 6) slashing damage plus 18 (4d8) radiant damage",
        "damage type": "slashing, radiant"
      }
    }
  },
  "Belial": {
    "number of attacks": 3,
    "attacks": {
      "Spear": {
        "type": "Melee Weapon Attack",
        "to hit": "+14",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "17 (2d8 + 8) piercing damage plus 22 (5d8) fire damage",
        "damage type": "piercing, fire"
      },
      "Tail": {
        "type": "Melee Weapon Attack",
        "to hit": "+14",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "19 (2d10 + 8) bludgeoning damage plus 22 (5d8) fire damage",
        "damage type": "bludgeoning, fire"
      }
    }
  },
  "Bodak": {
    "number of attacks": 1,
    "attacks": {
      "Fist": {
        "type": "Melee Weapon Attack",
        "to hit": "+5",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "6 (1d6 + 3) bludgeoning damage plus 4 (1d8) necrotic damage",
        "damage type": "bludgeoning, necrotic"
      }
    }
  },
  "Young Lunar Dragon": {
    "number of attacks": 2,
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+9",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "16 (2d10 + 5)",
        "damage type": "piercing"
      },
      "Claws": {
        "type": "Melee Weapon Attack",
        "to hit": "+9",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "12 (2d6 + 5)",
        "damage type": "slashing"
      }
    }
  },
  "Adult Moonstone Dragon": {
    "number of attacks": 3,
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+12",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "18 (2d10 + 7) piercing damage plus 11 (2d10) psychic damage",
        "damage type": "piercing, psychic"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+12",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "14 (2d6 + 7)",
        "damage type": "slashing"
      }
    }
  },
  "Adult Red Dracolich": {
    "number of attacks": 3,
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+14",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "19 (2d10 + 8) piercing damage plus 14 (4d6) necrotic damage",
        "damage type": "piercing, necrotic"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+14",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "15 (2d6 + 8)",
        "damage type": "slashing"
      }
    }
  },
  "Adult Sapphire Dragon": {
    "number of attacks": 3,
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+12",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "18 (2d10 + 7) piercing damage plus 11 (2d10) force damage",
        "damage type": "piercing, force"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+12",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "14 (2d6 + 7)",
        "damage type": "slashing"
      }
    }
  },
  "Adult Solar Dragon": {
    "number of attacks": 3,
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+14",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "19 (2d10 + 8) piercing damage plus 7 (2d6) radiant damage",
        "damage type": "piercing, radiant"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+14",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "15 (2d6 + 8)",
        "damage type": "slashing"
      }
    }
  },
  "Adult Time Dragon": {
    "number of attacks": 3,
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+13",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "19 (2d10 + 8) piercing damage plus 11 (2d10) force damage",
        "damage type": "piercing, force"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+13",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "15 (2d6 + 8)",
        "damage type": "slashing"
      }
    }
  },
  "Ancient Dragon Turtle": {
    "number of attacks": 3,
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+16",
        "reach": "20 ft.",
        "target": "one target",
        "hit": "26 (3d10 + 10)",
        "damage type": "piercing"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+16",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "23 (3d8 + 10)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Ancient Emerald Dragon": {
    "number of attacks": 3,
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+16",
        "reach": "20 ft.",
        "target": "one target",
        "hit": "26 (3d10 + 10) piercing damage plus 13 (2d12) psychic damage",
        "damage type": "piercing, psychic"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+16",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "23 (3d8 + 10)",
        "damage type": "slashing"
      }
    }
  },
  "Bard": {
    "number of attacks": 1,
    "attacks": {
      "Shortsword": {
        "type": "Melee Weapon Attack",
        "to hit": "+4",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "5 (1d6 + 2)",
        "damage type": "piercing"
      }
    }
  },
  "Barlgura": {
    "number of attacks": 2,
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "9 (1d10 + 4)",
        "damage type": "piercing"
      },
      "Fist": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "10 (1d12 + 4)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Ancient Lunar Dragon": {
    "number of attacks": 3,
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+14",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "15 (2d6 + 8) piercing damage plus 7 (2d6) cold damage",
        "damage type": "piercing, cold"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+14",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "15 (2d6 + 8)",
        "damage type": "slashing"
      },
      "Tail": {
        "type": "Melee Weapon Attack",
        "to hit": "+14",
        "reach": "20 ft.",
        "target": "one target",
        "hit": "15 (2d6 + 8)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Ancient Sapphire Dragon": {
    "number of attacks": 3,
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+15",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "19 (2d10 + 8) piercing damage plus 11 (2d10) thunder damage",
        "damage type": "piercing, thunder"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+15",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "15 (2d6 + 8)",
        "damage type": "slashing"
      }
    }
  },
  "Ancient Sea Serpent": {
    "number of attacks": 2,
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+12",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "20 (2d12 + 7) piercing damage plus 6 (1d12) cold damage",
        "damage type": "piercing, cold"
      },
      "Constrict": {
        "type": "Melee Weapon Attack",
        "to hit": "+12",
        "reach": "20 ft.",
        "target": "one creature",
        "hit": "29 (4d10 + 7)",
        "damage type": "bludgeoning"
      },
      "Tail": {
        "type": "Melee Weapon Attack",
        "to hit": "+12",
        "reach": "20 ft.",
        "target": "one target",
        "hit": "13 (1d12 + 7)",
        "damage type": "bludgeoning"
      }
    }
  },
  "Ancient Solar Dragon": {
    "number of attacks": 3,
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+16",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "19 (2d10 + 9) piercing damage plus 18 (4d8) radiant damage",
        "damage type": "piercing, radiant"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+16",
        "reach": "10 ft.",
        "target": "one target",
        "hit": "16 (2d6 + 9)",
        "damage type": "slashing"
      },
      "Radiant Beam": {
        "type": "Ranged Spell Attack",
        "to hit": "+11",
        "reach": "120 ft.",
        "target": "one target",
        "hit": "14 (4d6)",
        "damage type": "radiant"
      }
    }
  },
  "Anhkolox": {
    "number of attacks": 3,
    "attacks": {
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+10",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "17 (2d10 + 6)",
        "damage type": "piercing"
      },
      "Entrapping Rend": {
        "type": "Melee Weapon Attack",
        "to hit": "+10",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "23 (5d6 + 6)",
        "damage type": "piercing"
      }
    }
  },
  "Arch-hag": {
    "number of attacks": 2,
    "attacks": {
      "Spectral Claw": {
        "type": "Melee or Ranged Attack Roll",
        "to hit": "+14",
        "reach": "10 ft. or range 60 ft.",
        "target": "one target",
        "hit": "17 (3d6 + 7)",
        "damage type": "Force"
      }
    }
  },
  "Archpriest": {
    "number of attacks": 3,
    "attacks": {
      "Radiant Burst": {
        "type": "Melee or Ranged Attack Roll",
        "to hit": "+9",
        "reach": "5 ft. or range 60 ft.",
        "target": "one target",
        "hit": "27 (4d10 + 5)",
        "damage type": "Radiant"
      }
    }
  },
  "Ancient Time Dragon": {
    "number of attacks": 4,
    "attacks": {
      "Bite": {
        "type": "Melee Weapon Attack",
        "to hit": "+17",
        "reach": "20 ft.",
        "target": "one target",
        "hit": "21 (2d10 + 10)",
        "damage type": "piercing"
      },
      "Claw": {
        "type": "Melee Weapon Attack",
        "to hit": "+17",
        "reach": "15 ft.",
        "target": "one target",
        "hit": "17 (2d6 + 10)",
        "damage type": "slashing"
      },
      "Tail": {
        "type": "Melee Weapon Attack",
        "to hit": "+17",
        "reach": "20 ft.",
        "target": "one target",
        "hit": "28 (4d6 + 10)",
        "damage type": "piercing"
      }
    }
  },
  "Android": {
    "number of attacks": 2,
    "attacks": {
      "Integrated Weapon": {
        "type": "Melee Weapon Attack",
        "to hit": "+6",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "10 (2d6 + 3)",
        "damage type": "bludgeoning"
      },
      "Energy Pistol": {
        "type": "Ranged Weapon Attack",
        "to hit": "+5",
        "reach": "80/320 ft.",
        "target": "one target",
        "hit": "9 (2d6 + 2)",
        "damage type": "piercing"
      }
    }
  },
  "Animal Lord": {
    "number of attacks": 2,
    "attacks": {
      "Spear": {
        "type": "Melee Weapon Attack",
        "to hit": "+7",
        "reach": "5 ft.",
        "target": "one target",
        "hit": "11 (2d6 + 4)",
        "damage type": "piercing"
      },
      "Longbow": {
        "type": "Ranged Weapon Attack",
        "to hit": "+6",
        "reach": "150/600 ft.",
        "target": "one target",
        "hit": "9 (1d8 + 3)",
        "damage type": "piercing"
      }
    }
  }
}