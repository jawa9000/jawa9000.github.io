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

// console.log(fighters)

  /* Functions */

  function simulate(data) {
    data = fightingFighters; // ** temporary setup for testing;
    // console.log(data)

    const sortedFighters = addInitiativeOrderAndRandomInitiative(fightingFighters); // Call the function to add initiativeRoll and random initiative to each nested object

    let updatedFighters = selectNearestTarget(sortedFighters); // select nearest target, target it, and set action to either move towards it or attack it
    console.log(updatedFighters);

    addIdToFighters(updatedFighters); // create unique id for each fighter

    $(document).ready(function() {
      $('div#history').empty();
      var output = '<p>Initiatize combat and select target and attack or move towards target.</p><ol>';

      for (const key in updatedFighters) {
        if (updatedFighters.hasOwnProperty(key)) {
          const fighter = updatedFighters[key];

          if (fighter.action === 'moving') {
            if (fighter.charType === 'hero') {
              output += '<li>' + fighter.id.split('_')[0] + ' is moving towards a ' + fighter.target.split('_')[0] + '(' + fighter.target.split('_')[1] + ').';
            } else {
              output += '<li>' + fighter.id.replace('_','(') + ') is moving towards a ' + fighter.target.split('_')[0] + '.';
            }
          } else {
            if (fighter.charType === 'hero') {
              output += '<li>' + fighter.id.split('_')[0] + ' has targeted and is attacking ' + fighter.target.split('_')[0] + '(' + fighter.target.split('_')[1] + ').';
            } else {
              output += '<li>' + fighter.id.replace('_','(') + ') has targeted and is attacking ' + fighter.target.split('_')[0] + '.';
            }
          }
        } 
      }
      
      output += '</ol>';
      
      $('div#history').html(output); // display the initial actions of all heroes and monsters
    });

    // simulateAttacks(fightingFighters);

          
    // With the initiatve and targets sorted out now, figure out the fighting system
    
    // ** pick up here
    /*
        * attack oponent and track health
        * report all activity

        * add status of each character of 'dead' or 'alive' and have the fight engine determine who to fight after killing a character
    */
  }

  function addIdToFighters(fighters) { // add an unique id to each fighter
    Object.keys(fighters).forEach(key => {
      const fighter = fighters[key];
      const name = fighter.name['0'];
      const id = `${name}_${key.replace('Row ', '')}`;
      fighter.id = id;
    });
  }

  function simulateAttacks(fighters) {
    // console.log(fighters)
    const aliveFighters = Object.values(fighters).filter(fighter => fighter.status === 'alive');

    // console.log(aliveFighters)
    
    aliveFighters.forEach(attacker => {
      const targetName = attacker.target;

      // how many attacks does the attacker get?
      const attackCount = attacker.attacks['7']; 

      // console.log(attacker)
      for (var i = 0; i < attackCount; i++) {
        // ** loop through each weapon attack
      }
      // console.log(targetName)
      // console.log(fighters[targetName].status)
      // console.log(targetName, fighters[targetName]); // 'Thor' 'undefined'
      // console.log(targetName)
      
      // if (targetName && fighters[targetName] && fighters[targetName].status === 'alive') {
      //   console.log('yeah')
      //   const attackRoll = rollrndNumber(20) + (attacker.attacks['7'] || 0);
      //   const targetAC = parseInt(fighters[targetName].armorClass['2']) || 0;
      //   // console.log(attackRoll, targetAC)
  
      //   console.log(`${attacker.name['0']} is attacking ${targetName} with an attack roll of ${attackRoll}.`);
  
      //   if (attackRoll >= targetAC) {
      //     console.log(`The attack hits!`);
      //     // You can add code here to deduct health points from the target, update statuses, etc.
      //   } else {
      //     console.log(`The attack misses!`);
      //   }
      // }
    });
  }

  function selectNearestTarget(fighters) { // select nearest target, target it, and set action to either move towards it or attack it
    const fightersArray = Object.values(fighters); // Convert the object to an array for easier processing
      
    for (const fighter of fightersArray) { // Iterate through each fighter
      if (fighter.status === 'alive') { // Only process alive fighters
  
        // Get the coordinates of the current fighter
        const fighterDistance = parseInt(fighter.distance['6']);
        const fighterSpeed = parseInt(fighter.speed['5']);
        const isHero = fighter.charType === 'hero';
  
        // Filter the fighters to exclude the current fighter and dead fighters
        const eligibleTargets = fightersArray.filter(target =>
          target.id !== fighter.id && target.status === 'alive' && (isHero ? target.charType === 'monster' : target.charType === 'hero')
        );
  
        // Find the nearest target
        let nearestTarget = null;
        let nearestDistance = Infinity;
  
        for (const target of eligibleTargets) {
          const targetDistance = parseInt(target.distance['6']);
          const targetSpeed = parseInt(target.speed['5']);
          const distanceDiff = Math.abs(fighterDistance - targetDistance);
  
          if (distanceDiff <= fighterSpeed && distanceDiff < nearestDistance) { // Check if the target is within the fighter's movement range
            nearestTarget = target;
            nearestDistance = distanceDiff;
          }
        }
  
        if (nearestTarget) { // Update the fighter's target and action properties
          fighter.target = nearestTarget.id;
          fighter.action = nearestDistance <= parseInt(nearestTarget.distance['6']) ? 'attacking' : 'moving';
        } else {
          // If no eligible targets, set target to null and action to 'moving'
          fighter.target = null;
          fighter.action = 'moving';
        }
      }
    }
  
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
    // output += '<td><input type="text" placeholder="name" title="Name of fighter(s)" id="name_' + formCounter + '" /></td>';
    // output += '<td><input type="number" min="0" step="1" placeholder="1" title="Number of fighters" id="count_' + formCounter + '" /></td>';
    // output += '<td><input type="number" min="1" step="1" placeholder="1" title="Armor class" id="armorClass_' + formCounter + '" /></td>';
    // output += '<td><input type="number" min="1" step="1" placeholder="1" title="Health of each figthter" id="health_' + formCounter + '" /></td>';
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
