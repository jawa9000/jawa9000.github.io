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


Aberrant Zealot

Albino Dwarf Spirit Warrior
Albino Dwarf Warrior
Aldani (Lobsterfolk)
Altisaur
Ambitious Assassin

Amethyst Greatwyrm


Animated Armor Detention Drone
Animated Ballista

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


## Other notes
"damage resistances" is a text string that has content typically separated by commas. For example, '"damage resistances": "Force, Psychic",'. But then, there are values for this property like this: '"damage resistances": "Bludgeoning, Piercing, and Slashing from nonmagical attacks",'. In order for me to implement damage resistance into the fight system, I'm gonna need to normalize these values or write a very robust routine for handling this data.
This too:
* '"damage resistances": "Fire, Radiant; Bludgeoning, Piercing, and Slashing from nonmagical attacks that aren't silvered",'
* '"damage resistances": "Bludgeoning, Piercing, and Slashing while in dim light or darkness",'
* '"damage resistances": "damage of the type matching the animated breath's form (acid, cold, fire, lightning, or poison)",'

Conditions:
This list can be used for condition immunities and resistances in addition to identifying properties of attacks
* Blinded
* Charmed
* Deafened
* Exhaustion
* Frightened
* Grappled
* Incapacitated
* Invisible
* Paralysis
* Paralyzed
* Petrified
* Poisoned
* Prone
* Restrained
* Stunned
* Unconscious





Damage Immunities: Acid, Bludgeoning, Cold, Fire, Force, Lightning, Necrotic, Piercing, Poison, Psychic, Radiant, Slashing, Thunder, and Force

Physical Damage:
* Bludgeoning
* Piercing
* Slashing
Magical Damage:
* Acid
* Cold
* Fire
* Force
* Lightning
* Necrotic
* Poison
* Psychic
* Radiant
* Thunder

Attack properties that extend beyond normal damage:
* 

Looking through all the monster's properties in "damage resistances", "damage immunities", and "condition immunities", process the values of these keys as strings. Separate and identify the values by a comma. If an attack was successful against a target, and it doesn't have damage or condition immunities, then that target must make a saving throw


Looking at the following JSON data, provide a suggestion how this code can include attack hit effects. In this case, if the monster hits with it's Pseudopod attack, the target could be grappled and must make a DC 15 saving throw to escape. It also has acid damage as well too on a successful hit. It has another attack called Slime Breath that requires targets to make a Dexterity saving throw of 14 that gives 4d10 acid damage or half on a successful saving throw.

JSON code
:::
attacks: {
      "Pseudopod": {
"type": "Melee Weapon Attack",
"to hit": "+7",
"reach": "10 ft.",
"target": "one target",
"hit": "9 (1d10 + 4)",
"damage type": "bludgeoning plus acid"
}
    },
    actions:
      "<p><em><strong>Multiattack.</strong></em> The ooze makes two Pseudopod attacks. The ooze can replace one Pseudopod attack with its Slime Breath, if available.</p><p><em><strong>Pseudopod.</strong></em> <em>Melee Weapon Attack:</em> +7 to hit, reach 10 ft. one target. <em>Hit:</em> 9 (1d10 + 4) bludgeoning damage plus 14 (4d6) acid damage. If the target is a Large or smaller creature, it is grappled (escape DC 15). Until this grapple ends, the target takes 7 (2d6) acid damage at the start of each of its turns.</p><p><em><strong>Slime Breath (Recharge 6).</strong></em> The ooze expels a spray of its gelatinous mass in a 30-foot cone. Each creature in that area must make a DC 14 Dexterity saving throw. On a failed save, the creature takes 22 (4d10) acid damage and is pulled up to 30 feet straight toward the ooze. On a successful save, the creature takes half as much damage and isn't pulled.</p>",
:::


"effects": [
  {
    "type": "grapple",
    "condition": "If the target is a Large or smaller creature",
    "escape_dc": 15,
    "ability": "Dexterity",
    "ongoing damage": "7 (2d6)",
    "ongoing damage type": "acid",
    "ongoing damage timing": "start of each of its turns"
  }
]