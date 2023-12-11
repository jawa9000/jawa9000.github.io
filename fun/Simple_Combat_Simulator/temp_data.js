  // ** temporary data to be used to build the combat system
  let fighters = {
    "Row 2": {
        "name": {
            "0": "Thor"
        },
        "charType": "hero",
        "count": {
            "1": "1"
        },
        "armorClass": {
            "2": "15"
        },
        "health": {
            "3": "100"
        },
        "initiative": {
            "4": "2"
        },
        "speed": {
            "5": "30"
        },
        "distance": {
            "6": "5"
        },
        "attacks": {
            "7": "3"
        },
        "weapons": {
            "8": [
                "Axe"
            ]
        },
        "weaponsDamage": {
            "9": [{
                    "diceCount": "3",
                    "dieValue": "6"
                }
            ]
        }
    },
    "Row 3": {
        "name": {
            "0": "Jane"
        },
        "charType": "hero",
        "count": {
            "1": "1"
        },
        "armorClass": {
            "2": "13"
        },
        "health": {
            "3": "85"
        },
        "initiative": {
            "4": "1"
        },
        "speed": {
            "5": "30"
        },
        "distance": {
            "6": "5"
        },
        "attacks": {
            "7": "2"
        },
        "weapons": {
            "8": [
                "Hammer"
            ]
        },
        "weaponsDamage": {
            "9": [
                {
                    "diceCount": "3",
                    "dieValue": "8"
                }
            ]
        }
    },
    "Row 4": {
        "name": {
            "0": "Ogre"
        },
        "charType": "monster",
        "count": {
            "1": "2"
        },
        "armorClass": {
            "2": "12"
        },
        "health": {
            "3": "50"
        },
        "initiative": {
            "4": "0"
        },
        "speed": {
            "5": "25"
        },
        "distance": {
            "6": "5"
        },
        "attacks": {
            "7": "2"
        },
        "weapons": {
            "8": [
                "Club"
            ]
        },
        "weaponsDamage": {
            "9": [
                {
                    "diceCount": "2",
                    "dieValue": "6"
                }
            ]
        }
    },
    "Row 5": {
        "name": {
            "0": "Orc"
        },
        "charType": "monster",
        "count": {
            "1": "5"
        },
        "armorClass": {
            "2": "10"
        },
        "health": {
            "3": "10"
        },
        "initiative": {
            "4": "0"
        },
        "speed": {
            "5": "20"
        },
        "distance": {
            "6": "10"
        },
        "attacks": {
            "7": "1"
        },
        "weapons": {
            "8": [
                "Club"
            ]
        },
        "weaponsDamage": {
            "9": [
                {
                    "diceCount": "1",
                    "dieValue": "6"
                }
            ]
        }
    },
    "Row 6": {
        "name": {
            "0": "Goblin"
        },
        "charType": "monster",
        "count": {
            "1": "3"
        },
        "armorClass": {
            "2": "10"
        },
        "health": {
            "3": "10"
        },
        "initiative": {
            "4": "0"
        },
        "speed": {
            "5": "20"
        },
        "distance": {
            "6": "25"
        },
        "attacks": {
            "7": "1"
        },
        "weapons": {
            "8": [
                "Sword"
            ]
        },
        "weaponsDamage": {
            "9": [
                {
                    "diceCount": "1",
                    "dieValue": "6"
                }
            ]
        }
    }
}

let fightingFighters = {
  "Row 2": {
      "name": {
          "0": "Ogre"
      },
      "charType": "monster",
      "count": {
          "1": "2"
      },
      "armorClass": {
          "2": "12"
      },
      "health": {
          "3": "50"
      },
      "initiative": {
          "4": "0"
      },
      "speed": {
          "5": "25"
      },
      "distance": {
          "6": "5"
      },
      "attacks": {
          "7": "2"
      },
      "weapons": {
          "8": [
              "Club"
          ]
      },
      "weaponsDamage": {
          "9": [
              {
                  "diceCount": "2",
                  "dieValue": "6"
              }
          ]
      },
      "status": "alive",
      "initiativeRoll": 19,
      "initiativeOrder": 1,
      "target": "Thor",
      "action": "moving"
  },
  "Row 3": {
      "name": {
          "0": "Orc"
      },
      "charType": "monster",
      "count": {
          "1": "5"
      },
      "armorClass": {
          "2": "10"
      },
      "health": {
          "3": "10"
      },
      "initiative": {
          "4": "0"
      },
      "speed": {
          "5": "20"
      },
      "distance": {
          "6": "10"
      },
      "attacks": {
          "7": "1"
      },
      "weapons": {
          "8": [
              "Club"
          ]
      },
      "weaponsDamage": {
          "9": [
              {
                  "diceCount": "1",
                  "dieValue": "6"
              }
          ]
      },
      "status": "alive",
      "initiativeRoll": 18,
      "initiativeOrder": 2,
      "target": "Thor",
      "action": "attacking"
  },
  "Row 4": {
      "name": {
          "0": "Ogre"
      },
      "charType": "monster",
      "count": {
          "1": "2"
      },
      "armorClass": {
          "2": "12"
      },
      "health": {
          "3": "50"
      },
      "initiative": {
          "4": "0"
      },
      "speed": {
          "5": "25"
      },
      "distance": {
          "6": "5"
      },
      "attacks": {
          "7": "2"
      },
      "weapons": {
          "8": [
              "Club"
          ]
      },
      "weaponsDamage": {
          "9": [
              {
                  "diceCount": "2",
                  "dieValue": "6"
              }
          ]
      },
      "status": "alive",
      "initiativeRoll": 17,
      "initiativeOrder": 3,
      "target": "Thor",
      "action": "moving"
  },
  "Row 5": {
      "name": {
          "0": "Thor"
      },
      "charType": "hero",
      "count": {
          "1": "1"
      },
      "armorClass": {
          "2": "15"
      },
      "health": {
          "3": "100"
      },
      "initiative": {
          "4": "2"
      },
      "speed": {
          "5": "30"
      },
      "distance": {
          "6": "5"
      },
      "attacks": {
          "7": "3"
      },
      "weapons": {
          "8": [
              "Axe"
          ]
      },
      "weaponsDamage": {
          "9": [
              {
                  "diceCount": "3",
                  "dieValue": "6"
              }
          ]
      },
      "status": "alive",
      "initiativeRoll": 15,
      "initiativeOrder": 4,
      "target": "Orc",
      "action": "moving"
  },
  "Row 6": {
      "name": {
          "0": "Orc"
      },
      "charType": "monster",
      "count": {
          "1": "5"
      },
      "armorClass": {
          "2": "10"
      },
      "health": {
          "3": "10"
      },
      "initiative": {
          "4": "0"
      },
      "speed": {
          "5": "20"
      },
      "distance": {
          "6": "10"
      },
      "attacks": {
          "7": "1"
      },
      "weapons": {
          "8": [
              "Club"
          ]
      },
      "weaponsDamage": {
          "9": [
              {
                  "diceCount": "1",
                  "dieValue": "6"
              }
          ]
      },
      "status": "alive",
      "initiativeRoll": 15,
      "initiativeOrder": 5,
      "target": "Thor",
      "action": "attacking"
  },
  "Row 7": {
      "name": {
          "0": "Orc"
      },
      "charType": "monster",
      "count": {
          "1": "5"
      },
      "armorClass": {
          "2": "10"
      },
      "health": {
          "3": "10"
      },
      "initiative": {
          "4": "0"
      },
      "speed": {
          "5": "20"
      },
      "distance": {
          "6": "10"
      },
      "attacks": {
          "7": "1"
      },
      "weapons": {
          "8": [
              "Club"
          ]
      },
      "weaponsDamage": {
          "9": [
              {
                  "diceCount": "1",
                  "dieValue": "6"
              }
          ]
      },
      "status": "alive",
      "initiativeRoll": 13,
      "initiativeOrder": 6,
      "target": "Thor",
      "action": "attacking"
  },
  "Row 8": {
      "name": {
          "0": "Goblin"
      },
      "charType": "monster",
      "count": {
          "1": "3"
      },
      "armorClass": {
          "2": "10"
      },
      "health": {
          "3": "10"
      },
      "initiative": {
          "4": "0"
      },
      "speed": {
          "5": "20"
      },
      "distance": {
          "6": "25"
      },
      "attacks": {
          "7": "1"
      },
      "weapons": {
          "8": [
              "Sword"
          ]
      },
      "weaponsDamage": {
          "9": [
              {
                  "diceCount": "1",
                  "dieValue": "6"
              }
          ]
      },
      "status": "alive",
      "initiativeRoll": 11,
      "initiativeOrder": 7,
      "target": "Thor",
      "action": "moving"
  },
  "Row 9": {
      "name": {
          "0": "Goblin"
      },
      "charType": "monster",
      "count": {
          "1": "3"
      },
      "armorClass": {
          "2": "10"
      },
      "health": {
          "3": "10"
      },
      "initiative": {
          "4": "0"
      },
      "speed": {
          "5": "20"
      },
      "distance": {
          "6": "25"
      },
      "attacks": {
          "7": "1"
      },
      "weapons": {
          "8": [
              "Sword"
          ]
      },
      "weaponsDamage": {
          "9": [
              {
                  "diceCount": "1",
                  "dieValue": "6"
              }
          ]
      },
      "status": "alive",
      "initiativeRoll": 11,
      "initiativeOrder": 8,
      "target": "Jane",
      "action": "moving"
  },
  "Row 10": {
      "name": {
          "0": "Orc"
      },
      "charType": "monster",
      "count": {
          "1": "5"
      },
      "armorClass": {
          "2": "10"
      },
      "health": {
          "3": "10"
      },
      "initiative": {
          "4": "0"
      },
      "speed": {
          "5": "20"
      },
      "distance": {
          "6": "10"
      },
      "attacks": {
          "7": "1"
      },
      "weapons": {
          "8": [
              "Club"
          ]
      },
      "weaponsDamage": {
          "9": [
              {
                  "diceCount": "1",
                  "dieValue": "6"
              }
          ]
      },
      "status": "alive",
      "initiativeRoll": 9,
      "initiativeOrder": 9,
      "target": "Jane",
      "action": "attacking"
  },
  "Row 11": {
      "name": {
          "0": "Jane"
      },
      "charType": "hero",
      "count": {
          "1": "1"
      },
      "armorClass": {
          "2": "13"
      },
      "health": {
          "3": "85"
      },
      "initiative": {
          "4": "1"
      },
      "speed": {
          "5": "30"
      },
      "distance": {
          "6": "5"
      },
      "attacks": {
          "7": "2"
      },
      "weapons": {
          "8": [
              "Hammer"
          ]
      },
      "weaponsDamage": {
          "9": [
              {
                  "diceCount": "3",
                  "dieValue": "8"
              }
          ]
      },
      "status": "alive",
      "initiativeRoll": 5,
      "initiativeOrder": 10,
      "target": "Orc",
      "action": "moving"
  },
  "Row 12": {
      "name": {
          "0": "Orc"
      },
      "charType": "monster",
      "count": {
          "1": "5"
      },
      "armorClass": {
          "2": "10"
      },
      "health": {
          "3": "10"
      },
      "initiative": {
          "4": "0"
      },
      "speed": {
          "5": "20"
      },
      "distance": {
          "6": "10"
      },
      "attacks": {
          "7": "1"
      },
      "weapons": {
          "8": [
              "Club"
          ]
      },
      "weaponsDamage": {
          "9": [
              {
                  "diceCount": "1",
                  "dieValue": "6"
              }
          ]
      },
      "status": "alive",
      "initiativeRoll": 3,
      "initiativeOrder": 11,
      "target": "Jane",
      "action": "attacking"
  },
  "Row 13": {
      "name": {
          "0": "Goblin"
      },
      "charType": "monster",
      "count": {
          "1": "3"
      },
      "armorClass": {
          "2": "10"
      },
      "health": {
          "3": "10"
      },
      "initiative": {
          "4": "0"
      },
      "speed": {
          "5": "20"
      },
      "distance": {
          "6": "25"
      },
      "attacks": {
          "7": "1"
      },
      "weapons": {
          "8": [
              "Sword"
          ]
      },
      "weaponsDamage": {
          "9": [
              {
                  "diceCount": "1",
                  "dieValue": "6"
              }
          ]
      },
      "status": "alive",
      "initiativeRoll": 2,
      "initiativeOrder": 12,
      "target": "Thor",
      "action": "moving"
  }
}