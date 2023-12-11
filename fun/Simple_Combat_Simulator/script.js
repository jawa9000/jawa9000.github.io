$(document).ready(function () {
  var formCounter = 0; // Counter to create unique ids

  /* Events */
  $("#addForm").on("click", function () { // Event listener for the button click
    // ** temporarily disabled for testing reasons
    // createForm();
  });
  $("body").on("change", "input", function (e) { // listen for changes to input fields. If all input fields have a value, the enable the 'Start Simulation' button.
    // ** temporarily disabled for testing reasons
    // checkInputs();
  });

  $("#simulate").on("click", function () { // start battle simulation
    // extractTableData();
    simulate(extractTableData());
  });

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

// console.log(fighters)

  /* Functions */

  function simulate(data) {
    data = fighters; // ** temporary setup for testing;
    // console.log(data)

    const sortedFighters = addInitiativeOrderAndRandomInitiative(fighters); // Call the function to add initiativeRoll and random initiative to each nested object

    const fightersWithTargetsAndActions = addTargetAndActionBasedOnDistance(sortedFighters); // Call the function to add targets and actions based on distance

    console.log(fightersWithTargetsAndActions); // Log the modified fighters object with targets and actions
    // console.log(sortedFighters); // Log the modified and sorted fighters object

    $(document).ready(function() {
      $('div#history').empty();
      var output = '<ol>';

      for (i in fightersWithTargetsAndActions) {
        if (fightersWithTargetsAndActions[i].action == 'attacking' && fightersWithTargetsAndActions[i].target != 'none') {
          output += '<li>' + fightersWithTargetsAndActions[i].name[0] + ' is attacking ' + fightersWithTargetsAndActions[i].target + '</li>';
        } else if (fightersWithTargetsAndActions[i].action == 'attacking' && !fightersWithTargetsAndActions[i].target) {
          output += '<li class="warning">' + fightersWithTargetsAndActions[i].name[0] + ' is attacking ' + fightersWithTargetsAndActions[i].target + '</li>';
        } else if (fightersWithTargetsAndActions[i].action == 'moving' && fightersWithTargetsAndActions[i].target != 'none') {
          output += '<li>' + fightersWithTargetsAndActions[i].name[0] + ' is moving towards ' + fightersWithTargetsAndActions[i].target + '</li>';
        } else if (fightersWithTargetsAndActions[i].action == 'moving' && !fightersWithTargetsAndActions[i].target) {
          output += '<li class="warning">' + fightersWithTargetsAndActions[i].name[0] + ' is moving towards ' + fightersWithTargetsAndActions[i].target + '</li>';
        } else {
          output += '<li class="warning">' + fightersWithTargetsAndActions[i].name[0] + ' has none set for target</li>';
        }
      }
      
      output += '</ol>';
      
      $('div#history').html(output); // display the initial actions of all heroes and monsters
    })
      
    
    
    // ** pick up here
    /*
        * attack oponent and track health
        * report all activity

        * before fighting, figure out routine to determine who fights who
        * add status of each character of 'dead' or 'alive' and have the fight engine determine who to fight after killing a character
        * add property of 'target' so each character knows who to attack
    */
  }
  
  function addTargetAndActionBasedOnDistance(fighters) {
    const heroes = Object.values(fighters).filter(fighter => fighter.charType === 'hero');
    const monsters = Object.values(fighters).filter(fighter => fighter.charType === 'monster');
  
    heroes.forEach(hero => {
      const heroDistance = parseInt(hero.distance['6']);
      const eligibleMonsters = monsters.filter(monster => {
        const monsterDistance = parseInt(monster.distance['6']);
        return Math.abs(heroDistance - monsterDistance) <= 5;
      });
  
      if (eligibleMonsters.length > 0) {
        const targetMonster = eligibleMonsters[Math.floor(Math.random() * eligibleMonsters.length)];
        hero.target = targetMonster.name && targetMonster.name['0'];
  
        if (hero.distance['6'] < targetMonster.distance['6']) {
          hero.action = 'attacking';
        } else {
          hero.action = 'moving';
        }
      } else { // If no eligible monsters, set target to a random monster and action to 'moving'
        const randomMonster = monsters[Math.floor(Math.random() * monsters.length)];
        hero.target = randomMonster.name && randomMonster.name['0'];
        hero.action = 'moving';
      }
    });
  
    monsters.forEach(monster => {
      const monsterDistance = parseInt(monster.distance['6']);
      const eligibleHeroes = heroes.filter(hero => {
        const heroDistance = parseInt(hero.distance['6']);
        return Math.abs(monsterDistance - heroDistance) <= 5;
      });
  
      if (eligibleHeroes.length > 0) {
        const targetHero = eligibleHeroes[Math.floor(Math.random() * eligibleHeroes.length)];
        monster.target = targetHero.name && targetHero.name['0'];
  
        if (monster.distance['6'] < targetHero.distance['6']) {
          monster.action = 'attacking';
        } else {
          monster.action = 'moving';
        }
      } else { // If no eligible heroes, set target to a random hero and action to 'moving'
        const randomHero = heroes[Math.floor(Math.random() * heroes.length)];
        monster.target = randomHero.name && randomHero.name['0'];
        monster.action = 'moving';
      }
    });
  
    return fighters;
  }  

  function addInitiativeOrderAndRandomInitiative(fighters) {
    const result = {}; // Create a new object to store the modified fighters
  
    for (const key in fighters) {
      if (fighters.hasOwnProperty(key)) {
        const fighter = fighters[key];
  
        if (fighter.hasOwnProperty('count') && parseInt(fighter.count['1']) > 1) {
          for (let i = 1; i < parseInt(fighter.count['1']); i++) {
            const newKey = `${key}_duplicate_${i}`;
  
            // Create a shallow copy of the original nested object and add initiativeRoll
            const newFighter = { ...fighter, initiativeRoll: rollrndNumber(20) };
            result[newKey] = newFighter;
          }
        }
  
        // Create a shallow copy of the original nested object and add initiativeRoll
        const newFighter = { ...fighter, initiativeRoll: rollrndNumber(20) };
        result[key] = newFighter;
      }
    }
  
    // Sort the highest initiativeRoll values and assign initiativeOrder
    const sortedFighters = Object.values(result)
      .sort((a, b) => (b.initiativeRoll || 0) - (a.initiativeRoll || 0))
      .map((fighter, index) => {
        fighter.initiativeOrder = index + 1;
        return fighter;
      });
  
    const finalResult = {}; // Reconstruct the fighters object using the sorted array
    sortedFighters.forEach(fighter => {
      finalResult[`Row ${Object.keys(finalResult).length + 2}`] = fighter;
    });
  
    return finalResult;
  }

  function rollrndNumber(die) { //generate a random initiative value between 1 and 20
    return Math.floor(Math.random() * die) + 1;
  }


  function checkInputs() { // ensure that all the input fields have been filled out before allowing the simulate button to be usable.
    var allInputsFilled = true;

    $("#formContainer input").each(function () {
      if ($(this).val() === "") {
        allInputsFilled = false;
        return false; // Break out of the loop if an empty input is found
      }
    });

    $("#simulate").prop("disabled", !allInputsFilled); // Enable or disable the button based on the result
  }

  function createForm() {
    formCounter++;

    // Create input elements within the form with unique ids
    // ** temporarily disabled for testing reasons.
    // var output = '<tr id="row_' +formCounter +'"><td><select><option value="monster">Monster</option><option value="hero">Hero</option></select></td>';
    // output += '<td><input type="text" placeholder="name" title="Name of individual(s)" id="name_' + formCounter + '" /></td>';
    // output += '<td><input type="number" min="0" step="1" placeholder="1" title="Number of individuals" id="count_' + formCounter + '" /></td>';
    // output += '<td><input type="number" min="1" step="1" placeholder="1" title="Armor class" id="armorClass_' + formCounter + '" /></td>';
    // output += '<td><input type="number" min="1" step="1" placeholder="1" title="Health of each individual" id="health_' + formCounter + '" /></td>';
    // output += '<td><input type="number" min="0" step="1" placeholder="0" title="Initiative bonus" id="initiative_' + formCounter + '" /></td>';
    // output += '<td><input type="number" min="5" step="1" placeholder="5" title="Speed" id="speed_' + formCounter + '" /></td>';
    // output += '<td><input type="number" min="5" step="1" placeholder="5" title="Distance from target" id="distance_' + formCounter + '" /></td>';
    // output += '<td><input type="number" min="1" step="1" placeholder="1" title="Number of attacks" id="attacks_' + formCounter + '" /></td>';
    // output += '<td><input type="text" placeholder="Weapon(s)" title="Name of each weapon. Use a comma separated list." id="weapons_' + formCounter + '" /></td>';
    // output += '<td><input type="text" placeholder="Weapon(s) damage" title="Damge of each weapon. Use a comma separated list like this: 3d6, 3d6-1, 3d6+1." id="weaponsDamage_' + formCounter + '" /></td></tr>';

    $("table#formContainer").append(output); // Append input elements to the form
  }

  function extractTableData() {
    var tableData = {}; // Initialize an empty object to store the data
    
    $("#formContainer tr").each(function (rowIndex) {
        // Loop through each row
        var rowData = {}; // Initialize an object to store the data for the current row
    
        var charType = $(this).find('select').val(); // Retrieve charType for the current row
    
        $(this).find("input").each(function (columnIndex) { // Loop through each input element in the current row
        // Use the column header as the key and input value as the value
        var id = $(this).attr("id").split("_")[0]; // use the name of the id attributes to set the values
    
        // Set the object's key and value based on the value of 'id'
        if (!rowData.hasOwnProperty(id)) {
            rowData[id] = {};
        }
    
        rowData.charType = charType; // Set charType for the entire row
    
        if (id == "weapons") {
            rowData[id][columnIndex] = $(this).val().split(",");
        } else if (id == "weaponsDamage") {
            var damageDice = $(this).val().split(","); // split out the damage dice (3d6+1 or 3d6, or 3d6-1)
    
            if (!rowData[id].hasOwnProperty(columnIndex)) {
                rowData[id][columnIndex] = [];
            }
    
            damageDice.forEach((val) => {
                var diceCount = val.split("d")[0]; // number of dice to roll
                var dieValue = val.split("d")[1]; // die value (d4, d6, etc.)
        
                var damageObject = {};
        
                if (val.split("d")[1].indexOf("-") > 0) {
                    damageObject.dieRollModifierNegative = dieValue.split("-")[1];
                    dieValue = val.split("d")[1].split("-")[0]; // negative value like '3d6-1' returning negative 1
                } else if (val.split("d")[1].indexOf("+") > 0) {
                    damageObject.dieRollModifierPositive = dieValue.split("+")[1];
                    dieValue = val.split("d")[1].split("+")[0]; // positive value like '3d6+1' returning positive one
                }
        
                damageObject.diceCount = diceCount;
                damageObject.dieValue = dieValue;
        
                rowData[id][columnIndex].push(damageObject);
            });
        } else {
            rowData[id][columnIndex] = $(this).val();
        }
        });
    
        tableData["Row " + (rowIndex + 1)] = rowData; // Add the data for the current row to the main object
    });
    
    return tableData;
  }
});
