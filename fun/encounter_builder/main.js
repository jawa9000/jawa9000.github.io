// console.log(monsters)

// for (const monsterName in monsters) {
//     if (monsters.hasOwnProperty(monsterName)) { // Check if it's the object's own property
//       console.log(monsters[monsterName].name);
//       // ** Note: monsters[monsterName].Challenge needs be turned into an array. Use split(' ') to create separate values in the array. For example: '1/4 (50 XP)' becomes ['1/4', '(50 XP)']
//     }
//   }

// for (i in envirnoments) {
//     console.log(envirnoments[i])
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

function generatePcLevelInputs(pcCount, pcLevel, difficulty, envirnoment) {
    pcCount = $("input#pcCount").val();
    pcLevel = $("input#pcLevels").val();
    difficulty = $("select#difficulty").val().toLowerCase();
    environment = $("select#environment").val();

    let xpTally = 0;

    if (pcCount < 1) { // prevent zero enteries
        pcCount = 1;
    }

    if (pcLevel < 1) { // prevent zero enteries
        pcLevel = 1;
    }

    // console.log(pcCount, pcLevel, difficulty, environment);

    if (difficulty == 'any') { // if difficulty == any, randomly pick a difficulty level
        console.log('any')

        let randomDifficulty = ["easy", "medium", "hard", "deadly"];

        const randomIndex = Math.floor(Math.random() * randomDifficulty.length);

        difficulty = randomDifficulty[randomIndex];

    }

    // Calculate the xp threshold total
    for (var i = 0; i < pcCount; i++) { // loop the the xp tallying system for the number of PCs
        for (levels in xp_thresholds.encounterDifficulty) {
            let level = xp_thresholds.encounterDifficulty[levels].level;
            // ** add routine to handle any encounter level
            
            if (level == pcLevel) { // match the difficulty and add the value to the xpTally
                Object.entries(xp_thresholds.encounterDifficulty[levels]).forEach(([key, value]) => {
                    if (key == difficulty) {
                        xpTally += value;
                    }
                });
            }
        }
    }

    // console.log(xpTally)

    // the total XP for this dif encounter for a party of level x of n PCs is 

    
    // display list of possible encounters
    if (xpTally > 0) {
        var output = "<p>The total XP for a party of level " + pcLevel + " of " + pcCount + " PCs " + difficulty + " encounter is " + xpTally + ".";

    

        $('div#output').html(output);
    } else {
        $('div#output').html('');
    }
    
}