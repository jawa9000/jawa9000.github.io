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

## Monster list
Check monsters.js to see if the following monsters are listed. If they are not, use a Google search "5e [monster name]" to find it, download a PDF of it, and use this Gemini Gem (https://gemini.google.com/gem/77b2f643d48c) to batch convert up to 10 monsters at a time. Use this prompt: "Convert these PDFs into a JSON object." Then, copy/paste into monsters.js at the end, remove the array brackets, and clean up anything that is amiss (like remove "[cite:...]", add associates, and check the newly added monsters in the monster_catalog.html list).

Amethyst Dragon (Ancient, Adult, Young)
Amnizu
Anarch
Angry sorrowsworn
Animated Breath
Annis hag
Antelope
Apprentice
Arcana caster
Arcanaloth
Archangel of Fury
Archangel of Grace
Archangel of Hope
Archangel of Life
Archangel of Strife
Archangel of Thune
Archangel of Wrath
Archdruid
Archer
Archon of the Dawn
Archon of the Light
Archon of the Shield
Archon of the Sword
Archon of the Triumvirate
Archons
Arclight Phoenix
Armanite
Artificer
Ash
Asmodeus
Aspect of Bahamut
Aspect of Tiamat
Astral Dreadnought
Aurelia
Aurochs
Autumn eladrin
Baalzebul
Babau
Bael
Bahamut
Balhannoth
Banderhobb
Baphomet
Barbarian
Bard
Barghest
Barlgura
Battleforce Angel
Beast
Beholder Greater Minion
Beholder Pet
Beholder zombie
Beholderkin
Belial
Berbalang
Bheur Hag
Biomancer
bjurer
Blackguard
Blistercoil Weird
Blood Drinker Vampire
Blood Witch
Bloodfray Giant
Blue dragon
Blue slaad
Boar
Bodak
Boggle
Bone naga
Boneclaw
Borborygmos
Boros Legion
Boros Legionnaire
Boros Swiftblade
Bounty hunter
Brontosaurus
Bronze dragon
Bronze scout
Bugbear Boss
Bugbear Captain
Bugbear Chief
Bugbear Soldier
Bugbear Warrior
Bulezau
Bullywug
Cadaver collector
Cambion
Canoloth
Carrion Crawler
Category 1 Krasis
Category 2 Krasis
Category 3 Krasis
Catoblepas
Cave Bear
Cave Fisher
Champion
Chasme
Chemister
Chitine
Choker
Choldrith
Chromatic Greatwyrm
Cleric
Clockwork Bronze Scout
Clockwork Iron Cobra
Clockwork Oaken Bolter
Clockwork Stone Defender
Cloud Giant Smiling One
Conclave Dryad
Conjurer
Conjurer wizard
construct
Corpse Flower
Cosmotronic Blastseeker
Couatls
Cougar
Counterflux Blastseeker
Cranium Rat
Crystal Dragon (Ancient, Adult, Young)
Crystal dragon wyrmling
Cultist
Daelkyr
Daelkyr (Belashyrra, Dyrrn)
Dao
Darkling
Darkling Elder
Death Kiss
Death knight
Death Tyrant
Deathlock
Deathlock Mastermind
Deathlock Wight
Deathpact Angel
Deep Dragon (Ancient, Adult, Young, Wyrmling)
Deep gnome
Deep gnome scout
Deep rothe
Deep Sashelas
Deep Scion
Deinonychus
Demilich
Demon
Derro
Derro Savant
Devas
Devil
Devil's Ride
Devkarin
Devkarin lich
Devourer
Dhergoloth
Dignitary
Dimetrodon
Dimir
Dinosaurs (Clawfoot, Fastieth)
Dire Troll
Dispater
Displacer Beast
Diviner
Diviner wizard
Dolgaunt
Dolphin
Dolphin Delighter
Dracohydra
Dracolich
Draconians (various types listed in list, but stat blocks not specified which types)
Draegloth
Dragon Blessed
Dragon Chosen
Dragon Egg
Dragon Hatchling
Dragon Speaker
Dragon Turtles (Young, Ancient)
Dragonblood Ooze
Dragonborn
Dragonnel
Droaam
Drow arachnomancer
Drow elite warrior
Drow favored consort
Drow guard
Drow house captain
Drow inquisitor
Drow Mage
Drow matron mother
Drow priestess
Drow ranger
Drow shadowblade
Druid of the Old Ways
Duergar despot
Duergar hammerer
Duergar kavalrachni
Duergar mind master
Duergar prospector
Duergar screamer
Duergar soulblade
Duergar stone guard
Duergar warlord
Duergar xarrorn
Dusk Hag
Dwarf explorer
Dwarf prospector
Dybbuk
Egg hunter (hatchling, adult)
Eidolon
Eladrin, Spring
Eladrin, Summer
Eladrin, Winter
Elder Tempest
Elemental General
Elemental Prince of Evil Fire
Emerald Dragon
Empyrean
Enchanter
Enchanter wizard
Enslaved Goblin
Enslaved Troll
Evoker
Evoker wizard
Eyedrake
Faerie dragon
Faerie Dragon (Young)
Felidar
Female steeder
Fey
Fey noble
Fiend
Fighter
Fire Giant Dreadnought
Fire Giant Flame Lord
Fire Giant Hellbringer
Fire Giant Invoker
Fire giant lord
Fire Giant Pyre Guard
Fire Giant Rune Carver
Fire Giant Stormcaller
Fire Giant Thane
Fire Giant Thane of the Firelands
Fire Snake
Firefist
Firemane Angel
Firenewt Warlock of Imix
Firenewt Warrior
Flail Snail
Flame-kin (azer)
Flind
Flux Blastseeker
Fluxcharger
Flying Horror
Fomorian
Fraz-Urb'luu
Froghemoth
Frontline Medic
Frost drake
Frost Giant Dreadnought
Frost Giant Everlasting One
Frost Giant Flame Lord
Frost Giant Hellbringer
Frost Giant Invoker
Frost Giant Pyre Guard
Frost Giant Rune Carver
Frost Giant Stormcaller
Frost Giant Thane
Frost Giant Thane of the Frostlands
Frost Salamander
Frost spider
Frost wyrm
Fungus
Galeb duhr
Galvanic Blastseeker
Galvanice Weird
Gas Spore
Gauth
Gazer
Gem Greatwyrm
Gem Stalker
Genie
Geryon
Ghost of a Fallen Bard
Ghost of a Fallen Cleric
Ghost of a Fallen Druid
Ghost of a Fallen Paladin
Ghost of a Fallen Ranger
Ghost of a Fallen Rogue
Ghost of a Fallen Sorcerer
Ghost of a Fallen Wizard
Giant Ant
Giant eel
Topaz Dragon Ancient
Topaz Dragon Adult
Topaz Dragon Young
Giant Poisonous Snakes
Giant raven
Giant seahorse
Giant skeleton
Giant Spiders
Giant squid
Giant Strider
Giant zombie
Giff
Girallon
Gloom weaver
Gnoll Fang of Yeenoghu
Gnoll Flesh Gnawer
Gnoll Hunter
Gnoll pack lord
Gnoll Witherling
Goblin warlock
Goblinoids
Golgari
Golgari agent
Golgari shaman
Golgari Swarm
Golgari troll
Goristro
Gorodan Ashford
Gray Render
Gray Slaad
Graz'zt
Greater Devil
Grell
Grick
Grick alpha
Grick Broodmother
Grick Hatchling
Grick Hunter
Grick Matriarch
Grick Youngling
Grick Zookeeper
Griffon (Aberrant)
Griffon (Celestial)
Griffon (construct)
Griffon (Dragon)
Griffon (Elemental)
Griffon (Fey)
Griffon (Fiend)
Griffon (Monstrosity)
Griffon (Undead)
Grung
Grung Elite Warrior
Grung Wildling
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
Guard Drake
Guardian giant
Guardinals
Hag
Hag (Annis, Bheur, Dusk, Green, Night)
Hag Minion
Hag Servant
Half-ogre
Hellfire Engine
Helmed Horror
Herder
Hoard Mimic
Hoard Scarab (base, Swarm)
Hobgoblin (Elite Warrior)
Hobgoblin (Thrall)
Hobgoblin (Veteran)
Hobgoblin (Warrior)
Hobgoblin archer
Hobgoblin Captain
Hobgoblin Devastator
Hobgoblin Iron Shadow
Hobgoblin lieutenant
Hobgoblin officer
Hobgoblin scout
Hobgoblin sergeant
Hobgoblin Warlord
Hobgoblin warrior
Hollow Dragon
Homunculi
Hook horror
Howler
Huge Batterboar
Humanoid Bicuspid
Hungry sorrowsworn
Hutijin
Hybrid Brute
Hybrid Flier
Hybrid Poisoner
Hybrid Shocker
Hybrid Spy
Hydroloth
Ice mephits
Elder Oblex
Illithid
Illithid Arcanist
Illithid Elder Brain
Elder Brain
Illithid Lich
Illithid Mind Flayer
Illithid Psion
Illithid Sorcerer
Illithid Warlock
Illusionist
Illusionist wizard
Elemental Myrmidon, Earth
Elemental Myrmidon, Fire
Elemental Myrmidon, Water
Incubus
Indentured Spirit
Infernal Engine
Infernal War Machine
Intellect Devourer
Iron cobra
Isperia
Iuz
Jackalwere
Jaculis
Jarad Vod Savo
Juiblex
Karrnathi undead soldier
Kenku
Ki-rin
Korred
Kraken Hatchling
Kraken Priest
Kraken Priestess
Kraken Spawn
Krasis (Category 1, 2, 3)
Kraul
Kraul death priest
Kraul warrior
Krenko
Krovod
Kruthik
Kruthik Adult
Kruthik Hive Lord
Kruthik Young
Kuo-toa
Kuo-toa archpriest
Kuo-toa monitor
Kuo-toa whip
Lady Illmarrow
Larloch
Lawmage
Lazav
Leucrotta
Leviathan
Levistus
Lich King
Liondrake
Undying councilor
Undying soldier
Lizard king/queen
Lizardfolk (Viashino)
Lizardfolk champion
Lizardfolk priest
Lizardfolk Queen
Lizardfolk scout
Lizardfolk shaman
Lizardfolk tribe leader
Lizardfolk warrior
Lonely sorrowsworn
Lord of Blades
Lords of Dust
Lost sorrowsworn
Lost spirits
Lycanthrope
Magewright
Male steeder
Mammon
Mane
Marid
Martial Arts Adept
Marut
Master of Cruelties
Master Thief
Maurezhi
Maw Demon
Meazel
Meenlock
Mephit (Mud, Smoke)
Mephit swarm
Mercenary
Merregon
Merrenoloth
Merrow
Metallic Dragons
Metallic Greatwyrm
Metallic Sentinels (various types listed in list, but stat blocks not specified which types)
Metallic Warbler
Mimic
Mind Drinker Vampire
Mind flayer arcanist
Mind flayer lich (alhoon variant)
Mindwitness
Modrons
Moloch
Molydeus
Monk
Morkoth
Mouth of Grolantor
Mud mephit
Myconid
Myconid Adult
Myconid Colony
Myconid mushroom
Myconid sovereign
Myconid Sprout
Nabassu
Naga
Naga Bone
Nagpa
Narzugon
Nature caster
Nature Spirit
Necromancer
Necromancer wizard
Needle blight
Neogi
Neogi Hatchling
Neogi Master
Neothelid
Nightveil specter
Nightwalker
Nilbog
Niv-Mizzet
Nivix Cyclops
Nomad
Nupperibo
Nymph
Oaken bolter
Oblex (Adult, Elder)
Oblex Spawn
Obzedat Ghost
Ogre Battering Ram
Ogre Bolt Launcher
Ogre Chain Brute
Ogre howdah
Oinoloth
Ooze
Orthon
Orzhov
Orzhov Giant
Ox
Paladin
Peddler
Pegasi
Peryton
Phoenix
Piercer
Piranha beetles
Pirate captain
Pit Spawn
Vampire lord
Planetar
Precognitive Mage
Priest of the Forgotten God
Priest of the Old Faith
Primus
Quadrone
Quaggoth
Quaggoth Spore Servant
Quaggoth Thonot
Quetzalcoatlus
Quickling
Rakdos
Rakdos Giant
Rakdos Lampooner
Rakdos One Eye
Rakdos Performer
Raktusk
Ranger
Ravnica Guildless
Reckoner
Red abishai
Red Dragon
Redcap
Remorhaz (Young)
Retriever
Revenant
Rogue
Rot troll
Rubblebelt stalker
Rutterkin
Sahuagin Baron
Sahuagin champion
Sahuagin Priestess
Sahuagin sea spawn
Sahuagin shark
Salamanders
Sapphire Dragon (various types listed in list, but stat blocks not specified which types)
Scarecrow
Sea Mare
Sea Serpent
Sea Serpents (Ancient, Young)
Sea spawn
Selesnya
Selesnya initiate
Serra angel
Servitor Thrull
Shadar-kai
Shadar-kai Gloom Weaver
Shadar-kai Shadow Dancer
Shadar-kai Soul Monger
Shadow dancer
Shadow Horror
Shadow mastiff
Shadow mastiff alpha
Shifter
Shoosuva
Sibriex
Sigil
Silver dragon hatchling
Simic Hybrid
Sire of Insanity
Skein spider
Skittering Horror
Skyjek Roc
Skyswimmer
Slaad (any, Blue, Death, Gray, Green, Red, Tadpole)
Slithering Tracker
Smoke mephit
Snake
Soldier
Sorcerer
Sorrowsworn, Wretched
Spawn of Kyuss
Spellcaster
Spellcaster vampire
Sphinx
Sphinx of judgment
Spider Swarm
Spiderwebs
Spined devil
Spirit Troll
Spring eladrin
Star moth
Star Spawn Grue
Star Spawn Hulk
Star Spawn Larva Mage
Star Spawn Mangler
Star spawn seer
Steeder, Female
Steeder, Male
Steel predator
Stegosaurus
Stench kow
Stone cursed
Stone defender
Stone giant
Stone giant dreamwalker
Stone Giant Everlasting One
Stone Giant Jotun
Stone Giant Stone Guard
Stone Giant Stone Shaper
Stone Giant Stormcaller
Stone Giant Thane
Stone Giant Thane of the Earthmother
Storm Giant Quintessent
Succubus
Summer eladrin
Summoned Earth Elemental
Surtur
Svirfneblin
Svirfneblin scout
Swamp-bred chimera
Swarm of Cranium Rats
Swarm of Rot Grubs
Swarm of spiders
Swarmkeeper ranger
Tabaxi
Tanarukk
Tarkanan assassin
Tharizdun
The Wretched
Thief
Thorny vegepygmy
Thought Spy
Thri-keen
Tiamat
Tiefling
Titivilus
Tlincalli
Tortle
Tortle Druid
Townsfolk
Trained Rust Monster
Transmuter
Transmuter wizard
Trapper
Tribal Archer
Tribal Berserker
Tribal Champion
Tribal Chieftain
Tribal Defender
Tribal Elder
Tribal Guardian
Tribal Hunter
Tribal Mystic
Tribal Scout
Tribal Shaman
Tribal Warchief
Tribal Warlock
Tribal Warrior
Tridrone
Triton
Troglodyte
Troll Spirit
Troll Venom
Troll, Dire
Ulitharid
Undercity Medusa
Unicorn
Vampire mage
Vampire pontiff
Vampire spawn
Vampiric mist
Vargouille
Vegepygmy
Vegepygmy Chief
Vegepygmy Thorny
Velociraptor
Venom troll
Viashino
Vine blight
War mage
War Priest
Warforged soldier
Warlock
Warlock of the Archfey
Warlock of the Archfey/Fiend/Great Old One
Warlock of the Fiend
Warlock of the Great Old One
Warlock of the Undying
Warrior vampire
Wastrilith
Water weird
Winged kobold
Winged kobold dragonshield
Winged kobold skirmisher
Winged kobold sorcerer
Winged kobold taskmaster
Winged kobold whelp
Winged Thrull
Winter eladrin
Wizard
Wolves
Wood Woad
Wretched sorrowsworn
Wurm
Xvart
Xvart Warlock of Raxivort
Yagn
Yagnoloth
Yeth Hound
Young remorhaz
Yuan-ti
Yuan-ti abomination
Yuan-ti Anathema
Yuan-ti Broodguard
Yuan-ti guard
Yuan-ti malison
Yuan-ti malison (bugbear)
Yuan-ti malison (dragonborn)
Yuan-ti malison (gnome)
Yuan-ti malison (goblin)
Yuan-ti malison (half-elf)
Yuan-ti malison (hobgoblin)
Yuan-ti malison (human)
Yuan-ti malison (orc)
Yuan-ti malison (tiefling)
Yuan-ti Mind Whisperer
Yuan-ti Nightmare Speaker
Yuan-ti Pit Master
Yuan-ti Pureblood
Yuan-ti sorcerer
Zaeurl (elf werewolf)
Zaratan
Zariel
Zegana
Zombie lord
Zuggtmoy 
  */