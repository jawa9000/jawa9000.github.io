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

        {
            "name": "Balor",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+14",
                    "reach": "10 ft.",
                    "target": "one target",
                    "hit": "21 (3d8 + 8)",
                    "damage type": "slashing, lightning"
                },
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+14",
                    "reach": "30 ft.",
                    "target": "one target",
                    "hit": "15 (2d6 + 8)",
                    "damage type": "slashing, fire"
                }
            ]
        },
        {
            "name": "Bandit",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+3",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "4 (1d6 + 1)",
                    "damage type": "slashing"
                },
                {
                    "type": "Ranged Weapon Attack",
                    "to hit": "+3",
                    "reach": "N/A",
                    "target": "one target",
                    "hit": "5 (1d8 + 1)",
                    "damage type": "piercing"
                }
            ]
        },
        {
            "name": "Bandit Captain",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+5",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "6 (1d6 + 3)",
                    "damage type": "slashing"
                },
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+5",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "5 (1d4 + 3)",
                    "damage type": "piercing"
                },
                {
                    "type": "Ranged Weapon Attack",
                    "to hit": "+5",
                    "reach": "N/A",
                    "target": "one target",
                    "hit": "5 (1d4 + 3)",
                    "damage type": "piercing"
                }
            ]
        },
        {
            "name": "Banshee",
            attacks: [
                {
                    "type": "Melee Spell Attack",
                    "to hit": "+4",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "12 (3d6 + 2)",
                    "damage type": "necrotic"
                }
            ]
        },
        {
            "name": "Barbed Devil",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+6",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "6 (1d6 + 3)",
                    "damage type": "piercing"
                },
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+6",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "10 (2d6 + 3)",
                    "damage type": "piercing"
                },
                {
                    "type": "Ranged Spell Attack",
                    "to hit": "+5",
                    "reach": "N/A",
                    "target": "one target",
                    "hit": "10 (3d6)",
                    "damage type": "fire"
                }
            ]
        },
        {
            "name": "Basilisk",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+5",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "10 (2d6 + 3)",
                    "damage type": "piercing, poison"
                }
            ]
        },
        {
            "name": "Bat",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+0",
                    "reach": "5 ft.",
                    "target": "one creature",
                    "hit": "1",
                    "damage type": "piercing"
                }
            ]
        },
        {
            "name": "Bearded Devil",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+5",
                    "reach": "5 ft.",
                    "target": "one creature",
                    "hit": "6 (1d8 + 2)",
                    "damage type": "piercing"
                },
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+5",
                    "reach": "10 ft.",
                    "target": "one target",
                    "hit": "8 (1d10 + 3)",
                    "damage type": "slashing"
                }
            ]
        },
        {
            "name": "Behir",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+10",
                    "reach": "10 ft.",
                    "target": "one target",
                    "hit": "22 (3d10 + 6)",
                    "damage type": "piercing"
                },
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+10",
                    "reach": "5 ft.",
                    "target": "one Large or smaller creature",
                    "hit": "17 (2d10 + 6)",
                    "damage type": "bludgeoning, slashing"
                }
            ]
        },
        {
            "name": "Berserker",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+5",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "9 (1d12 + 3)",
                    "damage type": "slashing"
                }
            ]
        },
        {
            "name": "Black Bear",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+3",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "5 (1d6 + 2)",
                    "damage type": "piercing"
                },
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+3",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "7 (2d4 + 2)",
                    "damage type": "slashing"
                }
            ]
        },
        {
            "name": "Black Dragon Wyrmling",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+4",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "7 (1d10 + 2)",
                    "damage type": "piercing, acid"
                }
            ]
        },
        {
            "name": "Black Pudding",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+5",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "6 (1d6 + 3)",
                    "damage type": "bludgeoning, acid"
                }
            ]
        },
        {
            "name": "Blink Dog",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+3",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "4 (1d6 + 1)",
                    "damage type": "piercing"
                }
            ]
        },
        {
            "name": "Blood Hawk",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+4",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "4 (1d4 + 2)",
                    "damage type": "piercing"
                }
            ]
        },
        {
            "name": "Blue Dragon Wyrmling",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+5",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "8 (1d10 + 3)",
                    "damage type": "piercing, lightning"
                }
            ]
        },
        {
            "name": "Boar",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+3",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "4 (1d6 + 1)",
                    "damage type": "slashing"
                }
            ]
        },
        {
            "name": "Bone Devil",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+8",
                    "reach": "10 ft.",
                    "target": "one target",
                    "hit": "8 (1d8 + 4)",
                    "damage type": "slashing"
                },
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+8",
                    "reach": "10 ft.",
                    "target": "one target",
                    "hit": "13 (2d8 + 4)",
                    "damage type": "piercing, poison"
                }
            ]
        },
        {
            "name": "Brass Dragon Wyrmling",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+4",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "7 (1d10 + 2)",
                    "damage type": "piercing"
                }
            ]
        },
        {
            "name": "Bronze Dragon Wyrmling",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+5",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "8 (1d10 + 3)",
                    "damage type": "piercing"
                }
            ]
        },
        {
            "name": "Brown Bear",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+5",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "8 (1d8 + 4)",
                    "damage type": "piercing"
                },
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+5",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "11 (2d6 + 4)",
                    "damage type": "slashing"
                }
            ]
        },
        {
            "name": "Bugbear",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+4",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "11 (2d8 + 2)",
                    "damage type": "piercing"
                },
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+4",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "9 (2d6 + 2)",
                    "damage type": "piercing"
                },
                {
                    "type": "Ranged Weapon Attack",
                    "to hit": "+4",
                    "reach": "N/A",
                    "target": "one target",
                    "hit": "5 (1d6 + 2)",
                    "damage type": "piercing"
                }
            ]
        },
        {
            "name": "Bulette",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+7",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "30 (4d12 + 4)",
                    "damage type": "piercing"
                }
            ]
        },
        {
            "name": "Camel",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+5",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "2 (1d4)",
                    "damage type": "bludgeoning"
                }
            ]
        },
        {
            "name": "Cat",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+0",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "1",
                    "damage type": "slashing"
                }
            ]
        },
        {
            "name": "Centaur",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+6",
                    "reach": "10 ft.",
                    "target": "one target",
                    "hit": "9 (1d10 + 4)",
                    "damage type": "piercing"
                },
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+6",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "11 (2d6 + 4)",
                    "damage type": "bludgeoning"
                },
                {
                    "type": "Ranged Weapon Attack",
                    "to hit": "+4",
                    "reach": "N/A",
                    "target": "one target",
                    "hit": "6 (1d8 + 2)",
                    "damage type": "piercing"
                }
            ]
        },
        {
            "name": "Chain Devil",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+8",
                    "reach": "10 ft.",
                    "target": "one target",
                    "hit": "11 (2d6 + 4)",
                    "damage type": "slashing"
                }
            ]
        },
        {
            "name": "Chimera",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+7",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "11 (2d6 + 4)",
                    "damage type": "piercing"
                },
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+7",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "10 (1d12 + 4)",
                    "damage type": "bludgeoning"
                },
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+7",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "11 (2d6 + 4)",
                    "damage type": "slashing"
                }
            ]
        },
        {
            "name": "Chuul",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+6",
                    "reach": "10 ft.",
                    "target": "one target",
                    "hit": "11 (2d6 + 4)",
                    "damage type": "bludgeoning"
                }
            ]
        },
        {
            "name": "Clay Golem",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+8",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "16 (2d10 + 5)",
                    "damage type": "bludgeoning"
                }
            ]
        },
        {
            "name": "Cloaker",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+6",
                    "reach": "5 ft.",
                    "target": "one creature",
                    "hit": "10 (2d6 + 3)",
                    "damage type": "piercing"
                },
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+6",
                    "reach": "10 ft.",
                    "target": "one creature",
                    "hit": "7 (1d8 + 3)",
                    "damage type": "slashing"
                }
            ]
        },
        {
            "name": "Cloud Giant",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+12",
                    "reach": "10 ft.",
                    "target": "one target",
                    "hit": "21 (3d8 + 8)",
                    "damage type": "piercing"
                },
                {
                    "type": "Ranged Weapon Attack",
                    "to hit": "+12",
                    "reach": "N/A",
                    "target": "one target",
                    "hit": "30 (4d10 + 8)",
                    "damage type": "bludgeoning"
                }
            ]
        },
        {
            "name": "Cockatrice",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+3",
                    "reach": "5 ft.",
                    "target": "one creature",
                    "hit": "3 (1d4 + 1)",
                    "damage type": "piercing"
                }
            ]
        },
        {
            "name": "Commoner",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+2",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "2 (1d4)",
                    "damage type": "bludgeoning"
                }
            ]
        },
        {
            "name": "Constrictor Snake",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+4",
                    "reach": "5 ft.",
                    "target": "one creature",
                    "hit": "5 (1d6 + 2)",
                    "damage type": "piercing"
                },
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+4",
                    "reach": "5 ft.",
                    "target": "one creature",
                    "hit": "6 (1d8 + 2)",
                    "damage type": "bludgeoning"
                }
            ]
        },
        {
            "name": "Copper Dragon Wyrmling",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+4",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "7 (1d10 + 2)",
                    "damage type": "piercing"
                }
            ]
        },
        {
            "name": "Couatl",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+8",
                    "reach": "5 ft.",
                    "target": "one creature",
                    "hit": "8 (1d6 + 5)",
                    "damage type": "piercing"
                },
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+6",
                    "reach": "10 ft.",
                    "target": "one Medium or smaller creature",
                    "hit": "10 (2d6 + 3)",
                    "damage type": "bludgeoning"
                }
            ]
        },
        {
            "name": "Crab",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+0",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "1",
                    "damage type": "bludgeoning"
                }
            ]
        },
        {
            "name": "Crocodile",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+4",
                    "reach": "5 ft.",
                    "target": "one creature",
                    "hit": "7 (1d10 + 2)",
                    "damage type": "piercing"
                }
            ]
        },
        {
            "name": "Cult Fanatic",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+4",
                    "reach": "5 ft.",
                    "target": "one creature",
                    "hit": "4 (1d4 + 2)",
                    "damage type": "piercing"
                },
                {
                    "type": "Ranged Weapon Attack",
                    "to hit": "+4",
                    "reach": "N/A",
                    "target": "one creature",
                    "hit": "4 (1d4 + 2)",
                    "damage type": "piercing"
                }
            ]
        },
        {
            "name": "Cultist",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+3",
                    "reach": "5 ft.",
                    "target": "one creature",
                    "hit": "4 (1d6 + 1)",
                    "damage type": "slashing"
                }
            ]
        },
        {
            "name": "Cyclops",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+9",
                    "reach": "10 ft.",
                    "target": "one target",
                    "hit": "19 (3d8 + 6)",
                    "damage type": "bludgeoning"
                },
                {
                    "type": "Ranged Weapon Attack",
                    "to hit": "+9",
                    "reach": "N/A",
                    "target": "one target",
                    "hit": "28 (4d10 + 6)",
                    "damage type": "bludgeoning"
                }
            ]
        },
        {
            "name": "Darkmantle",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+5",
                    "reach": "5 ft.",
                    "target": "one creature",
                    "hit": "6 (1d6 + 3)",
                    "damage type": "bludgeoning"
                }
            ]
        },
        {
            "name": "Death Dog",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+4",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "5 (1d6 + 2)",
                    "damage type": "piercing"
                }
            ]
        },
        {
            "name": "Deep Gnome (Svirfneblin)",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+4",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "6 (1d8 + 2)",
                    "damage type": "piercing"
                },
                {
                    "type": "Ranged Weapon Attack",
                    "to hit": "+4",
                    "reach": "N/A",
                    "target": "one creature",
                    "hit": "4 (1d4 + 2)",
                    "damage type": "piercing"
                }
            ]
        },
        {
            "name": "Deer",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+2",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "2 (1d4)",
                    "damage type": "piercing"
                }
            ]
        },
        {
            "name": "Deva",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+8",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "7 (1d6 + 4)",
                    "damage type": "bludgeoning, radiant"
                }
            ]
        },
        {
            "name": "Dire Wolf",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+5",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "10 (2d6 + 3)",
                    "damage type": "piercing"
                }
            ]
        },
        {
            "name": "Djinni",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+9",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "12 (2d6 + 5)",
                    "damage type": "slashing, lightning or thunder"
                }
            ]
        },
        {
            "name": "Doppelganger",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+6",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "7 (1d6 + 4)",
                    "damage type": "bludgeoning"
                }
            ]
        },
        {
            "name": "Draft Horse",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+6",
                    "reach": "5 ft.",
                    "target": "one target",
                    "hit": "9 (2d4 + 4)",
                    "damage type": "bludgeoning"
                }
            ]
        },
        {
            "name": "Dragon Turtle",
            attacks: [
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+13",
                    "reach": "15 ft.",
                    "target": "one target",
                    "hit": "26 (3d12 + 7)",
                    "damage type": "piercing"
                },
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+13",
                    "reach": "10 ft.",
                    "target": "one target",
                    "hit": "16 (2d8 + 7)",
                    "damage type": "slashing"
                },
                {
                    "type": "Melee Weapon Attack",
                    "to hit": "+13",
                    "reach": "15 ft.",
                    "target": "one target",
                    "hit": "26 (3d12 + 7)",
                    "damage type": "bludgeoning"
                }
            ]
        },
        [
            {
                "name": "Dretch",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+2",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "3 (1d6)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+2",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "5 (2d4)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Drider",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.",
                        "target": "one creature",
                        "hit": "2 (1d4) piercing damage plus 9 (2d8) poison damage",
                        "damage type": "piercing, poison"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "7 (1d8 + 3)",
                        "damage type": "slashing"
                    },
                    {
                        "type": "Ranged Weapon Attack",
                        "to hit": "+6",
                        "reach": "150/600 ft.",
                        "target": "one target",
                        "hit": "7 (1d8 + 3) piercing damage plus 4 (1d8) poison damage",
                        "damage type": "piercing, poison"
                    }
                ]
            },
            {
                "name": "Drow",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "5 (1d6 + 2)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Ranged Weapon Attack",
                        "to hit": "+4",
                        "reach": "30/120 ft.",
                        "target": "one target",
                        "hit": "5 (1d6 + 2) piercing damage",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Druid",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+2",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "3 (1d6)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Dryad",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+2",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "2 (1d4)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Duergar",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "6 (1d8 + 2)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee or Ranged Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.or range 30/120 ft.",
                        "target": "one target",
                        "hit": "5 (1d6 + 2)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Dust Mephit",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one creature",
                        "hit": "4 (1d4 + 2)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Eagle",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "4 (1d4 + 2)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Earth Elemental",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+8",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "14 (2d8 + 5)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Efreeti",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+10",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "13 (2d6 + 6) slashing damage plus 7 (2d6) fire damage",
                        "damage type": "slashing, fire"
                    },
                    {
                        "type": "Ranged Spell Attack",
                        "to hit": "+7",
                        "reach": "120 ft.",
                        "target": "one target",
                        "hit": "17 (5d6)",
                        "damage type": "fire"
                    }
                ]
            },
            {
                "name": "Elephant",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+8",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "19 (3d8 + 6)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+8",
                        "reach": "5 ft.",
                        "target": "one prone creature",
                        "hit": "22 (3d10 + 6)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Elk",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "6 (1d6 + 3)",
                        "damage type": "bludgeoning"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one prone creature",
                        "hit": "8 (2d4 + 3)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Erinyes",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+8",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "8 (1d8 + 4) slashing damage, or 9 (1d10 + 4) slashing damage if used with two hands, plus 13 (3d8) poison damage",
                        "damage type": "slashing, poison"
                    },
                    {
                        "type": "Ranged Weapon Attack",
                        "to hit": "+7",
                        "reach": "150/600 ft.",
                        "target": "one target",
                        "hit": "7 (1d8 + 3) piercing damage plus 13 (3d8) poison damage",
                        "damage type": "piercing, poison"
                    }
                ]
            },
            {
                "name": "Ettercap",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one creature",
                        "hit": "6 (1d8 + 2) piercing damage plus 4 (1d8) poison damage",
                        "damage type": "piercing, poison"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "7 (2d4 + 2)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Ettin",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+7",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "14 (2d8 + 5)",
                        "damage type": "slashing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+7",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "14 (2d8 + 5)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Fire Elemental",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "10 (2d6 + 3)",
                        "damage type": "fire"
                    }
                ]
            },
            {
                "name": "Fire Giant",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+11",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "28 (6d6 + 7)",
                        "damage type": "slashing"
                    },
                    {
                        "type": "Ranged Weapon Attack",
                        "to hit": "+11",
                        "reach": "60/240 ft.",
                        "target": "one target",
                        "hit": "29 (4d10 + 7)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Flameskull",
                attacks: [
                    {
                        "type": "Ranged Spell Attack",
                        "to hit": "+5",
                        "reach": "30 ft.",
                        "target": "one target",
                        "hit": "10 (3d6)",
                        "damage type": "fire"
                    }
                ]
            },
            {
                "name": "Flesh Golem",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+7",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "13 (2d8 + 4)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Flying Snake",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "1 piercing damage plus 7 (3d4) poison damage",
                        "damage type": "piercing, poison"
                    }
                ]
            },
            {
                "name": "Flying Sword",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+3",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "5 (1d8 + 1)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Frost Giant",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+9",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "25 (3d12 + 6)",
                        "damage type": "slashing"
                    },
                    {
                        "type": "Ranged Weapon Attack",
                        "to hit": "+9",
                        "reach": "60/240 ft.",
                        "target": "one target",
                        "hit": "28 (4d10 + 6)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Gargoyle",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "5 (1d6 + 2)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "5 (1d6 + 2)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Gelatinous Cube",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one creature",
                        "hit": "10 (3d6)",
                        "damage type": "acid"
                    }
                ]
            },
            {
                "name": "Ghast",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+3",
                        "reach": "5 ft.",
                        "target": "one creature",
                        "hit": "12 (2d8 + 3)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "10 (2d6 + 3)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Ghost",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "17 (4d6 + 3)",
                        "damage type": "necrotic"
                    }
                ]
            },
            {
                "name": "Ghoul",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+2",
                        "reach": "5 ft.",
                        "target": "one creature",
                        "hit": "9 (2d6 + 2)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "7 (2d4 + 2)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Giant Ape",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+9",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "22 (3d10 + 6)",
                        "damage type": "bludgeoning"
                    },
                    {
                        "type": "Ranged Weapon Attack",
                        "to hit": "+9",
                        "reach": "50/100 ft.",
                        "target": "one target",
                        "hit": "30 (7d6 + 6)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Giant Badger",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+3",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "4 (1d6 + 1)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+3",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "6 (2d4 + 1)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Giant Bat",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one creature",
                        "hit": "5 (1d6 + 2)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Giant Boar",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "10 (2d6 + 3)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Giant Centipede",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one creature",
                        "hit": "4 (1d4 + 2) piercing damage",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Giant Constrictor Snake",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "10 ft.",
                        "target": "one creature",
                        "hit": "11 (2d6 + 4)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.",
                        "target": "one creature",
                        "hit": "13 (2d8 + 4)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Giant Crab",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+3",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "4 (1d6 + 1)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Giant Crocodile",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+8",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "21 (3d10 + 5)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+8",
                        "reach": "10 ft.",
                        "target": "one target not grappled by the crocodile",
                        "hit": "14 (2d8 + 5)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Giant Eagle",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "6 (1d6 + 3)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "10 (2d6 + 3)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Giant Elk",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "11 (2d6 + 4)",
                        "damage type": "bludgeoning"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.",
                        "target": "one prone creature",
                        "hit": "22 (4d8 + 4)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Giant Fire Beetle",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+1",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "2 (1d6 − 1)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Giant Frog",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+3",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "4 (1d6 + 1)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Giant Goat",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "8 (2d4 + 3)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Giant Hyena",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "10 (2d6 + 3)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Giant Lizard",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "6 (1d8 + 2)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Giant Octopus",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "15 ft.",
                        "target": "one target",
                        "hit": "10 (2d6 + 3)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Giant Owl",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+3",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "8 (2d6 + 1)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Giant Poisonous Snake",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "6 (1d4 + 4) piercing damage",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Giant Rat",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "4 (1d4 + 2)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Giant Scorpion",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "6 (1d8 + 2)",
                        "damage type": "bludgeoning"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one creature",
                        "hit": "7 (1d10 + 2)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Giant Sea Horse",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+3",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "4 (1d6 + 1)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Giant Shark",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+9",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "22 (3d10 + 6)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Giant Spider",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one creature",
                        "hit": "7 (1d8 + 3) piercing damage",
                        "damage type": "piercing"
                    }
                ]
            }
        ]
[
            {
                "name": "Giant Toad",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "7 (1d10 + 2)",
                        "damage type": "piercing plus poison"
                    }
                ]
            },
            {
                "name": "Giant Vulture",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "7 (2d4 + 2)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "9 (2d6 + 2)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Giant Wasp",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one creature",
                        "hit": "5 (1d6 + 2)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Giant Weasel",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "5 (1d4 + 3)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Giant Wolf Spider",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+3",
                        "reach": "5 ft.",
                        "target": "one creature",
                        "hit": "4 (1d6 + 1)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Gibbering Mouther",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+2",
                        "reach": "5 ft.",
                        "target": "one creature",
                        "hit": "17 (5d6)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Glabrezu",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+9",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "16 (2d10 + 5)",
                        "damage type": "bludgeoning"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+9",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "7 (2d4 + 2)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Gladiator",
                attacks: [
                    {
                        "type": "Melee or Ranged Weapon Attack",
                        "to hit": "+7",
                        "reach": "5 ft.and range 20/60 ft.",
                        "target": "one target",
                        "hit": "11 (2d6 + 4)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+7",
                        "reach": "5 ft.",
                        "target": "one creature",
                        "hit": "9 (2d4 + 4)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Gnoll",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one creature",
                        "hit": "4 (1d4 + 2)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee or Ranged Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.or range 20/60 ft.",
                        "target": "one target",
                        "hit": "5 (1d6 + 2)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Ranged Weapon Attack",
                        "to hit": "+3",
                        "reach": "150/600 ft.",
                        "target": "one target",
                        "hit": "5 (1d8 + 1)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Goat",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+3",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "3 (1d4 + 1)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Goblin",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "5 (1d6 + 2)",
                        "damage type": "slashing"
                    },
                    {
                        "type": "Ranged Weapon Attack",
                        "to hit": "+4",
                        "reach": "80/320 ft.",
                        "target": "one target",
                        "hit": "5 (1d6 + 2)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Gold Dragon Wyrmling",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "9 (1d10 + 4)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Gorgon",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+8",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "18 (2d12 + 5)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+8",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "16 (2d10 + 5)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Gray Ooze",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+3",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "4 (1d6 + 1)",
                        "damage type": "bludgeoning plus acid"
                    }
                ]
            },
            {
                "name": "Green Dragon Wyrmling",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "7 (1d10 + 2)",
                        "damage type": "piercing plus poison"
                    }
                ]
            },
            {
                "name": "Green Hag",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "13 (2d8 + 4)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Grick",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "9 (2d6 + 2)",
                        "damage type": "slashing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "5 (1d6 + 2)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Griffon",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "8 (1d8 + 4)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "11 (2d6 + 4)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Grimlock",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "5 (1d4 + 3)",
                        "damage type": "bludgeoning plus piercing"
                    }
                ]
            },
            {
                "name": "Guard",
                attacks: [
                    {
                        "type": "Melee or Ranged Weapon Attack",
                        "to hit": "+3",
                        "reach": "5 ft.or range 20/60 ft.",
                        "target": "one target",
                        "hit": "4 (1d6 + 1)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Guardian Naga",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+8",
                        "reach": "10 ft.",
                        "target": "one creature",
                        "hit": "8 (1d8 + 4)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Ranged Weapon Attack",
                        "to hit": "+8",
                        "reach": "15/30 ft.",
                        "target": "one creature"
                    }
                ]
            },
            {
                "name": "Gynosphinx",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+8",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "13 (2d8 + 4)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Half-Red Dragon Veteran",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "7 (1d8 + 3)",
                        "damage type": "slashing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "6 (1d6 + 3)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Ranged Weapon Attack",
                        "to hit": "+3",
                        "reach": "100/400 ft.",
                        "target": "one target",
                        "hit": "6 (1d10 + 1)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Harpy",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+3",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "6 (2d4 + 1)",
                        "damage type": "slashing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+3",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "3 (1d4 + 1)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Hawk",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "1",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Hell Hound",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "7 (1d8 + 3)",
                        "damage type": "piercing plus fire"
                    }
                ]
            },
            {
                "name": "Hezrou",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+7",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "15 (2d10 + 4)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+7",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "11 (2d6 + 4)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Hill Giant",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+8",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "18 (3d8 + 5)",
                        "damage type": "bludgeoning"
                    },
                    {
                        "type": "Ranged Weapon Attack",
                        "to hit": "+8",
                        "reach": "60/240 ft.",
                        "target": "one target",
                        "hit": "21 (3d10 + 5)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Hippogriff",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "8 (1d10 + 3)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "10 (2d6 + 3)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Hobgoblin",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+3",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "5 (1d8 + 1)",
                        "damage type": "slashing"
                    },
                    {
                        "type": "Ranged Weapon Attack",
                        "to hit": "+3",
                        "reach": "150/600 ft.",
                        "target": "one target",
                        "hit": "5 (1d8 + 1)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Homunculus",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one creature",
                        "hit": "1",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Horned Devil",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+10",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "15 (2d8 + 6)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+10",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "10 (1d8 + 6)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Ranged Spell Attack",
                        "to hit": "+7",
                        "reach": "150 ft.",
                        "target": "one target",
                        "hit": "14 (4d6)",
                        "damage type": "fire"
                    }
                ]
            },
            {
                "name": "Hunter Shark",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "13 (2d8 + 4)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Hydra",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+8",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "10 (1d10 + 5)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Hyena",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+2",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "3 (1d6)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Ice Devil",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+10",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "12 (2d6 + 5)",
                        "damage type": "piercing plus cold"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+10",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "10 (2d4 + 5)",
                        "damage type": "slashing plus cold"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+10",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "12 (2d6 + 5)",
                        "damage type": "bludgeoning plus cold"
                    }
                ]
            },
            {
                "name": "Ice Mephit",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+3",
                        "reach": "5 ft.",
                        "target": "one creature",
                        "hit": "3 (1d4 + 1)",
                        "damage type": "slashing plus cold"
                    }
                ]
            },
            {
                "name": "Imp",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "5 (1d4 + 3)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Invisible Stalker",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "10 (2d6 + 3)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Iron Golem",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+13",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "20 (3d8 + 7)",
                        "damage type": "bludgeoning"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+13",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "23 (3d10 + 7)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Jackal",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+1",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "1 (1d4 – 1)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Killer Whale",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "21 (5d6 + 4)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Knight",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "10 (2d6 + 3)",
                        "damage type": "slashing"
                    },
                    {
                        "type": "Ranged Weapon Attack",
                        "to hit": "+2",
                        "reach": "100/400 ft.",
                        "target": "one target",
                        "hit": "5 (1d10)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Kobold",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "4 (1d4 + 2)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Ranged Weapon Attack",
                        "to hit": "+4",
                        "reach": "30/120 ft.",
                        "target": "one target",
                        "hit": "4 (1d4 + 2)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Kraken",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+17",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "23 (3d8 + 10)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+17",
                        "reach": "30 ft.",
                        "target": "one target",
                        "hit": "20 (3d6 + 10)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Lamia",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "14 (2d10 + 3)",
                        "damage type": "slashing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "5 (1d4 + 3)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Spell Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one creature"
                    }
                ]
            },
            {
                "name": "Lemure",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+3",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "2 (1d4)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Lich",
                attacks: [
                    {
                        "type": "Melee Spell Attack",
                        "to hit": "+12",
                        "reach": "5 ft.",
                        "target": "one creature",
                        "hit": "10 (3d6)",
                        "damage type": "cold"
                    }
                ]
            },
            {
                "name": "Lion",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "7 (1d8 + 3)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "6 (1d6 + 3)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Lizard",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+0",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "1",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Lizardfolk",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "5 (1d6 + 2)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "5 (1d6 + 2)",
                        "damage type": "bludgeoning"
                    },
                    {
                        "type": "Melee or Ranged Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.or range 30/120 ft.",
                        "target": "one target",
                        "hit": "5 (1d6 + 2)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "5 (1d6 + 2)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Mage",
                attacks: [
                    {
                        "type": "Melee or Ranged Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.or range 20/60 ft.",
                        "target": "one target",
                        "hit": "4 (1d4 + 2)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Magma Mephit",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+3",
                        "reach": "5 ft.",
                        "target": "one creature",
                        "hit": "3 (1d4 + 1)",
                        "damage type": "slashing plus fire"
                    }
                ]
            },
            {
                "name": "Magmin",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "7 (2d6)",
                        "damage type": "fire"
                    }
                ]
            },
            {
                "name": "Mammoth",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+10",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "25 (4d8 + 7)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+10",
                        "reach": "5 ft.",
                        "target": "one prone creature",
                        "hit": "29 (4d10 + 7)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Manticore",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "7 (1d8 + 3)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "6 (1d6 + 3)",
                        "damage type": "slashing"
                    },
                    {
                        "type": "Ranged Weapon Attack",
                        "to hit": "+5",
                        "reach": "100/200 ft.",
                        "target": "one target",
                        "hit": "7 (1d8 + 3)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Marilith",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+9",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "13 (2d8 + 4)",
                        "damage type": "slashing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+9",
                        "reach": "10 ft.",
                        "target": "one creature",
                        "hit": "15 (2d10 + 4)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Mastiff",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+3",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "4 (1d6 + 1)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Medusa",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one creature",
                        "hit": "4 (1d4 + 2)",
                        "damage type": "piercing plus poison"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "5 (1d6 + 2)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Ranged Weapon Attack",
                        "to hit": "+5",
                        "reach": "150/600 ft.",
                        "target": "one target",
                        "hit": "6 (1d8 + 2)",
                        "damage type": "piercing plus poison"
                    }
                ]
            },
            {
                "name": "Merfolk",
                attacks: [
                    {
                        "type": "Melee or Ranged Weapon Attack",
                        "to hit": "+2",
                        "reach": "5 ft.or range 20/60 ft.",
                        "target": "one target",
                        "hit": "3 (1d6)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Merrow",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "8 (1d8 + 4)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "9 (2d4 + 4)",
                        "damage type": "slashing"
                    },
                    {
                        "type": "Melee or Ranged Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.or range 20/60 ft.",
                        "target": "one target",
                        "hit": "11 (2d6 + 4)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Mimic",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "7 (1d8 + 3)",
                        "damage type": "bludgeoning"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "7 (1d8 + 3)",
                        "damage type": "piercing plus acid"
                    }
                ]
            },
            {
                "name": "Minotaur",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "17 (2d12 + 4)",
                        "damage type": "slashing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "13 (2d8 + 4)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Minotaur Skeleton",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "17 (2d12 + 4)",
                        "damage type": "slashing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "13 (2d8 + 4)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Mule",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+2",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "4 (1d4 + 2)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Mummy",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "10 (2d6 + 3)",
                        "damage type": "bludgeoning plus necrotic"
                    }
                ]
            },
            {
                "name": "Mummy Lord",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+9",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "14 (3d6 + 4)",
                        "damage type": "bludgeoning plus necrotic"
                    }
                ]
            },
            {
                "name": "Nalfeshnee",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+10",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "32 (5d10 + 5)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+10",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "15 (3d6 + 5)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Night Hag",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+7",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "13 (2d8 + 4)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Nightmare",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "13 (2d8 + 4)",
                        "damage type": "bludgeoning plus fire"
                    }
                ]
            },
            {
                "name": "Noble",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+3",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "5 (1d8 + 1)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Nothic",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "6 (1d6 + 3)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Ochre Jelly",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "9 (2d6 + 2)",
                        "damage type": "bludgeoning plus acid"
                    }
                ]
            },
            {
                "name": "Octopus",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "1",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Ogre",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "13 (2d8 + 4)",
                        "damage type": "bludgeoning"
                    },
                    {
                        "type": "Melee or Ranged Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.or range 30/120 ft.",
                        "target": "one target",
                        "hit": "11 (2d6 + 4)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Ogre Zombie",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "13 (2d8 + 4)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Oni",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+7",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "8 (1d8 + 4)",
                        "damage type": "slashing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+7",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "15 (2d10 + 4)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Orc",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "9 (1d12 + 3)",
                        "damage type": "slashing"
                    },
                    {
                        "type": "Melee or Ranged Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.or range 30/120 ft.",
                        "target": "one target",
                        "hit": "6 (1d6 + 3)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Otyugh",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "12 (2d8 + 3)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "7 (1d8 + 3)",
                        "damage type": "bludgeoning plus piercing"
                    }
                ]
            },
            {
                "name": "Owl",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+3",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "1",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Owlbear",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+7",
                        "reach": "5 ft.",
                        "target": "one creature",
                        "hit": "10 (1d10 + 5)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+7",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "14 (2d8 + 5)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Panther",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "5 (1d6 + 2)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "4 (1d4 + 2)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Pegasus",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "11 (2d6 + 4)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Phase Spider",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one creature",
                        "hit": "7 (1d10 + 2)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Pit Fiend",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+14",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "22 (4d6 + 8)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+14",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "17 (2d8 + 8)",
                        "damage type": "slashing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+14",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "15 (2d6 + 8)",
                        "damage type": "bludgeoning plus fire"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+14",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "24 (3d10 + 8)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Planetar",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+12",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "21 (4d6 + 7)",
                        "damage type": "slashing plus radiant"
                    }
                ]
            },
            {
                "name": "Plesiosaurus",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "14 (3d6 + 4)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Poisonous Snake",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "1",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Polar Bear",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+7",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "9 (1d8 + 5)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+7",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "12 (2d6 + 5)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Pony",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "7 (2d4 + 2)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Priest",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+2",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "3 (1d6)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Pseudodragon",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "4 (1d4 + 2)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one creature",
                        "hit": "4 (1d4 + 2)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Pteranodon",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+3",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "6 (2d4 + 1)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Purple Worm",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+9",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "22 (3d8 + 9)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+9",
                        "reach": "10 ft.",
                        "target": "one creature",
                        "hit": "19 (3d6 + 9)",
                        "damage type": "piercing"
                    }
                ]
            }
        ]
[
            {
                "name": "Bael",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+13",
                        "reach": "20 ft.",
                        "target": "one target",
                        "hit": "16 (2d8 + 7) piercing damage plus 13 (3d8) necrotic damage",
                        "damage type": "piercing, necrotic"
                    }
                ]
            },
            {
                "name": "Balhannoth",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+7",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "25 (4d10 + 3)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+7",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "10 (2d6 + 3)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Banderhobb",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+8",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "15 (3d6 + 5)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+8",
                        "reach": "15 ft.",
                        "target": "one creature",
                        "hit": "10 (3d6)",
                        "damage type": "necrotic"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+8",
                        "reach": "5 ft.",
                        "target": "one Medium or smaller creature grappled by the banderhobb",
                        "hit": "15 (3d6 + 5)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Baphomet",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+17",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "19 (2d8 + 10)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+17",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "17 (2d6 + 10)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+17",
                        "reach": "15 ft.",
                        "target": "one target",
                        "hit": "21 (2d10 + 10)",
                        "damage type": "force"
                    }
                ]
            },
            {
                "name": "Barghest",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "13 (2d8 + 4)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "8 (1d8 + 4)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Blackguard",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+9",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "12 (2d6 + 5) slashing damage plus 7 (2d6) necrotic damage",
                        "damage type": "slashing, necrotic"
                    }
                ]
            },
            {
                "name": "Blood Drinker Vampire",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+9",
                        "reach": "5 ft.",
                        "target": "one creature",
                        "hit": "8 (1d8 + 4)",
                        "damage type": "bludgeoning"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+9",
                        "reach": "5 ft.",
                        "target": "one willing creature, or a creature that is grappled by the vampire, incapacitated, or restrained",
                        "hit": "7 (1d6 + 4) piercing damage plus 10 (3d6) necrotic damage",
                        "damage type": "piercing, necrotic"
                    }
                ]
            },
            {
                "name": "Blood Witch",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+3",
                        "reach": "5 ft.",
                        "target": "one creature",
                        "hit": "3 (1d4 + 1)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Bloodfray Giant",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+10",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "25 (3d12 + 6)",
                        "damage type": "slashing"
                    },
                    {
                        "type": "Ranged Weapon Attack",
                        "to hit": "+10",
                        "reach": "60/240 ft.",
                        "target": "one target",
                        "hit": "28 (4d10 + 6)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Bone Naga",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "7 (1d8 + 3) piercing damage plus 10 (3d6) poison damage",
                        "damage type": "piercing, poison"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one creature",
                        "hit": "6 (1d6 + 3)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Bounty Hunter",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "6 (1d6 + 3)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Ranged Weapon Attack",
                        "to hit": "+5",
                        "reach": "80/320 ft.",
                        "target": "one target",
                        "hit": "7 (1d8 + 3)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Ranged Weapon Attack",
                        "to hit": "+5",
                        "reach": "5/15 ft.",
                        "target": "one Large or smaller creature",
                        "hit": "The target is restrained",
                        "damage type": "N/A"
                    }
                ]
            },
            {
                "name": "Brontosaurus",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+8",
                        "reach": "15 ft.",
                        "target": "one target",
                        "hit": "27 (5d8 + 5)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Battleforce Angel",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+9",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "13 (2d6 + 6) slashing damage plus 18 (4d8) radiant damage",
                        "damage type": "slashing, radiant"
                    }
                ]
            },
            {
                "name": "Belial",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+14",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "17 (2d8 + 8) piercing damage plus 22 (5d8) fire damage",
                        "damage type": "piercing, fire"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+14",
                        "reach": "15 ft.",
                        "target": "one target",
                        "hit": "19 (2d10 + 8) bludgeoning damage plus 22 (5d8) fire damage",
                        "damage type": "bludgeoning, fire"
                    }
                ]
            },
            {
                "name": "Bodak",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+5",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "6 (1d6 + 3) bludgeoning damage plus 4 (1d8) necrotic damage",
                        "damage type": "bludgeoning, necrotic"
                    }
                ]
            },
            {
                "name": "Young Lunar Dragon",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+9",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "16 (2d10 + 5)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+9",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "12 (2d6 + 5)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Adult Moonstone Dragon",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+12",
                        "reach": "15 ft.",
                        "target": "one target",
                        "hit": "18 (2d10 + 7) piercing damage plus 11 (2d10) psychic damage",
                        "damage type": "piercing, psychic"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+12",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "14 (2d6 + 7)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Adult Red Dracolich",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+14",
                        "reach": "15 ft.",
                        "target": "one target",
                        "hit": "19 (2d10 + 8) piercing damage plus 14 (4d6) necrotic damage",
                        "damage type": "piercing, necrotic"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+14",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "15 (2d6 + 8)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Adult Sapphire Dragon",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+12",
                        "reach": "15 ft.",
                        "target": "one target",
                        "hit": "18 (2d10 + 7) piercing damage plus 11 (2d10) force damage",
                        "damage type": "piercing, force"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+12",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "14 (2d6 + 7)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Adult Solar Dragon",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+14",
                        "reach": "15 ft.",
                        "target": "one target",
                        "hit": "19 (2d10 + 8) piercing damage plus 7 (2d6) radiant damage",
                        "damage type": "piercing, radiant"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+14",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "15 (2d6 + 8)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Adult Time Dragon",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+13",
                        "reach": "15 ft.",
                        "target": "one target",
                        "hit": "19 (2d10 + 8) piercing damage plus 11 (2d10) force damage",
                        "damage type": "piercing, force"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+13",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "15 (2d6 + 8)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Ancient Dragon Turtle",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+16",
                        "reach": "20 ft.",
                        "target": "one target",
                        "hit": "26 (3d10 + 10)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+16",
                        "reach": "15 ft.",
                        "target": "one target",
                        "hit": "23 (3d8 + 10)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Ancient Emerald Dragon",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+16",
                        "reach": "20 ft.",
                        "target": "one target",
                        "hit": "26 (3d10 + 10) piercing damage plus 13 (2d12) psychic damage",
                        "damage type": "piercing, psychic"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+16",
                        "reach": "15 ft.",
                        "target": "one target",
                        "hit": "23 (3d8 + 10)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Bard",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+4",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "5 (1d6 + 2)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Barlgura",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+7",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "9 (1d10 + 4)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+7",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "10 (1d12 + 4)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Ancient Lunar Dragon",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+14",
                        "reach": "15 ft.",
                        "target": "one target",
                        "hit": "15 (2d6 + 8) piercing damage plus 7 (2d6) cold damage",
                        "damage type": "piercing, cold"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+14",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "15 (2d6 + 8)",
                        "damage type": "slashing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+14",
                        "reach": "20 ft.",
                        "target": "one target",
                        "hit": "15 (2d6 + 8)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Ancient Sapphire Dragon",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+15",
                        "reach": "15 ft.",
                        "target": "one target",
                        "hit": "19 (2d10 + 8) piercing damage plus 11 (2d10) thunder damage",
                        "damage type": "piercing, thunder"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+15",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "15 (2d6 + 8)",
                        "damage type": "slashing"
                    }
                ]
            },
            {
                "name": "Ancient Sea Serpent",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+12",
                        "reach": "15 ft.",
                        "target": "one target",
                        "hit": "20 (2d12 + 7) piercing damage plus 6 (1d12) cold damage",
                        "damage type": "piercing, cold"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+12",
                        "reach": "20 ft.",
                        "target": "one creature",
                        "hit": "29 (4d10 + 7)",
                        "damage type": "bludgeoning"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+12",
                        "reach": "20 ft.",
                        "target": "one target",
                        "hit": "13 (1d12 + 7)",
                        "damage type": "bludgeoning"
                    }
                ]
            },
            {
                "name": "Ancient Solar Dragon",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+16",
                        "reach": "15 ft.",
                        "target": "one target",
                        "hit": "19 (2d10 + 9) piercing damage plus 18 (4d8) radiant damage",
                        "damage type": "piercing, radiant"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+16",
                        "reach": "10 ft.",
                        "target": "one target",
                        "hit": "16 (2d6 + 9)",
                        "damage type": "slashing"
                    },
                    {
                        "type": "Ranged Spell Attack",
                        "to hit": "+11",
                        "reach": "120 ft.",
                        "target": "one target",
                        "hit": "14 (4d6)",
                        "damage type": "radiant"
                    }
                ]
            },
            {
                "name": "Anhkolox",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+10",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "17 (2d10 + 6)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+10",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "23 (5d6 + 6)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Arch-hag",
                attacks: [
                    {
                        "type": "Melee or Ranged Attack Roll",
                        "to hit": "+14",
                        "reach": "10 ft. or range 60 ft.",
                        "target": "one target",
                        "hit": "17 (3d6 + 7)",
                        "damage type": "Force"
                    }
                ]
            },
            {
                "name": "Archpriest",
                attacks: [
                    {
                        "type": "Melee or Ranged Attack Roll",
                        "to hit": "+9",
                        "reach": "5 ft. or range 60 ft.",
                        "target": "one target",
                        "hit": "27 (4d10 + 5)",
                        "damage type": "Radiant"
                    }
                ]
            },
            {
                "name": "Ancient Time Dragon",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+17",
                        "reach": "20 ft.",
                        "target": "one target",
                        "hit": "21 (2d10 + 10)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+17",
                        "reach": "15 ft.",
                        "target": "one target",
                        "hit": "17 (2d6 + 10)",
                        "damage type": "slashing"
                    },
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+17",
                        "reach": "20 ft.",
                        "target": "one target",
                        "hit": "28 (4d6 + 10)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Android",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+6",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "10 (2d6 + 3)",
                        "damage type": "bludgeoning"
                    },
                    {
                        "type": "Ranged Weapon Attack",
                        "to hit": "+5",
                        "reach": "80/320 ft.",
                        "target": "one target",
                        "hit": "9 (2d6 + 2)",
                        "damage type": "piercing"
                    }
                ]
            },
            {
                "name": "Animal Lord",
                attacks: [
                    {
                        "type": "Melee Weapon Attack",
                        "to hit": "+7",
                        "reach": "5 ft.",
                        "target": "one target",
                        "hit": "11 (2d6 + 4)",
                        "damage type": "piercing"
                    },
                    {
                        "type": "Ranged Weapon Attack",
                        "to hit": "+6",
                        "reach": "150/600 ft.",
                        "target": "one target",
                        "hit": "9 (1d8 + 3)",
                        "damage type": "piercing"
                    }
                ]
            }
        ]