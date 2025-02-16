// console.log(monsters)

// for (const monsterName in monsters) {
//     if (monsters.hasOwnProperty(monsterName)) { // Check if it's the object's own property
//       console.log(monsters[monsterName].name);
//       // ** Note: monsters[monsterName].Challenge needs be turned into an array. Use split(' ') to create separate values in the array. For example: '1/4 (50 XP)' becomes ['1/4', '(50 XP)']
//     }
//   }

// for (i in environments) {
//     console.log(environments[i])
// }

let pcCount = 1;
let pcLevel = 1; // sum of all PC levels
let difficulty = "Any";
let environment = "Any";

$(document).ready(function() { // listeners
    $("input, select").change(function() { // gather all data and generate encounter
        generatePcLevelInputs();
    });

    $("button").on('click', function() { // gather all data and generate encounter
        generatePcLevelInputs();
    });
});

// functions

function generatePcLevelInputs(pcCount, pcLevel, difficulty, environment) {
    pcCount = $("input#pcCount").val();
    pcLevel = $("input#pcLevels").val();
    difficulty = $("select#difficulty").val().toLowerCase();
    environmentSelected = $("select#environment").val();

    let xpTally = 0;
    let monsterNames = [];
    let monsterChallenges = [];
    let monsterOutput = "";

    if (pcCount < 1) { // prevent zero enteries
        pcCount = 1;
    }

    if (pcLevel < 1) { // prevent zero enteries
        pcLevel = 1;
    }

    // console.log(pcCount, pcLevel, difficulty, environment);

    if (difficulty == 'any') { // if difficulty == any, randomly pick a difficulty level
        let randomDifficulty = ["easy", "medium", "hard", "deadly"];
        let randomIndex = Math.floor(Math.random() * randomDifficulty.length);

        difficulty = randomDifficulty[randomIndex];
    }

    if (environmentSelected == 'Any') { // if environment == any, randomly pick an environment.
        var environmentOptions = [];
        
        Object.entries(environments).forEach(([environment, creatures]) => { // return an array of all the possible environments
            environmentOptions.push(environment);
        });
        
        let randomIndex = Math.floor(Math.random() * environmentOptions.length);

        environmentSelected = environmentOptions[randomIndex];
    }

    // Calculate the xp threshold total
    for (var i = 0; i < pcCount; i++) { // loop the the xp tallying system for the number of PCs
        for (levels in xp_thresholds.encounterDifficulty) {
            let level = xp_thresholds.encounterDifficulty[levels].level;
            
            if (level == pcLevel) { // match the difficulty and add the value to the xpTally
                Object.entries(xp_thresholds.encounterDifficulty[levels]).forEach(([key, value]) => {
                    if (key == difficulty) {
                        xpTally += value;
                    }
                });
            }
        }
    }

    Object.entries(environments).forEach(([environment, creatures]) => { // Generate a list of possible monsters that fall within the xpTally limit
        if (environmentSelected == environment) {
            for (i in monsters) { // Look up the list of monsters in monsters.js and match them to the monsters listed in the environment[creatures] array
                for (j in creatures) {
                    if (monsters[i].name == creatures[j]) {
                        let challenge = monsters[i].Challenge.split(' ')[1].replace(/[(),]/g, ""); // Returns the XP for a monster (e.g. "1100")

                        if (challenge <= xpTally) { // Create a pair of arrays to collect the possible monster names and their respective XP
                            monsterNames.push(monsters[i].name);
                            monsterChallenges.push(challenge);
                        }
                    }
                }
            }

            monsterOutput += "<ul>"; // Generate the HTML elements to list all the monsters and their XP
            
            for (i in monsterNames) {
                monsterOutput += "<li>" + monsterNames[i] + ": " + monsterChallenges[i] + "</li>";
            }
            
            monsterOutput += "</ul>";

            // ** come up with a way to generate a series of suggestions based on the number of monsters listed in monsterNames based on the combined limit of their total XP
        }
    });

    
    // display list of possible encounters
    if (xpTally > 0) {
        var output = "<p>The total XP for the " + pcCount + " PCs of level " + pcLevel + " of a " + environmentSelected.toLowerCase() + " " + difficulty + " encounter is " + xpTally + ".";
        output += monsterOutput;
    

        $('div#output').html(output);
    } else {
        $('div#output').html('');
    }
    
}

// for (const monsterName in monsters) {
//     if (monsters.hasOwnProperty(monsterName)) { // Important: Check own properties
//       console.log(monsters[monsterName].name);
//     }
//   }

