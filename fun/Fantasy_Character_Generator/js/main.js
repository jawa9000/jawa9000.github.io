/*
 * Purpose of page: To help players roll characters with multiple dice rolling methods and see character race bonuses
 * Created by Brian Immel on 9/14/2014
 */

/* ** output message area does not get cleared when switching to a different die roller */

var abilityTypes = ["Strength", "Constitution", "Dexterity", "Intelligence", "Wisdom", "Charisma"]; // ability types
var abilityCells = ["Name","Rolls","Buttons","Race","RaceButtons","Total"]; // list of ability cells to generate for each ability
var abilityMods = ["Up","Down","Plus","Minus"]; // list of ability modifier button suffix
var abilityScores = []; // array to store ability scores
var raceBonus = [0,0,0,0,0,0]; // variable for race bonus
var points = 12; // points used for 12 point system
var message = ""; // generic variable to hold the output string for rendering to an element
var rollType = "";
var rollTypes = ["3d6","4d6-6","4d6-low","18-8","12points"];
var pips = [ // pip class values
		[["empty","pipSpacer","empty","pipSpacer","empty"],["empty","pipSpacer","empty","pipSpacer","empty"],["empty","pipSpacer","empty","pipSpacer","empty"]], // 0
		[["empty","pipSpacer","empty","pipSpacer","empty"],["empty","pipSpacer","pip","pipSpacer","empty"],["empty","pipSpacer","empty","pipSpacer","empty"]], // d1
		[["pip","pipSpacer","empty","pipSpacer","empty"],["empty","pipSpacer","empty","pipSpacer","empty"],	["empty","pipSpacer","empty","pipSpacer","pip"]], // d2
		[["pip","pipSpacer","empty","pipSpacer","empty"],["empty","pipSpacer","pip","pipSpacer","empty"],["empty","pipSpacer","empty","pipSpacer","pip"]], // d3
		[["pip","pipSpacer","empty","pipSpacer","pip"],["empty","pipSpacer","empty","pipSpacer","empty"],["pip","pipSpacer","empty","pipSpacer","pip"]], // d4
		[["pip","pipSpacer","empty","pipSpacer","pip"],	["empty","pipSpacer","pip","pipSpacer","empty"],["pip","pipSpacer","empty","pipSpacer","pip"]], // d5
		[["pip","pipSpacer","pip","pipSpacer","pip"],["empty","pipSpacer","empty","pipSpacer","empty"],["pip","pipSpacer","pip","pipSpacer","pip"]] // d6
	];
var classHighlights = []; // placeholder for toggling the highlights of the ability rows	
var races = ["Dragonborn","Dwarf","Eldarin","Elf","Half-Elf","Halfling","Human","Tiefling"];
var racesButtons = ["dragonbornRace","dwarfRace","eldarinRace","elfRace","halfElfRace","halflingRace","humanRace","tieflingRace"];
var classes = ["Cleric","Fighter","Paladin","Ranger","Rogue","Warlock","Warlord","Wizard"];
var classesButtons = ["clericClass","fighterClass","paladinClass","rangerClass","rogueClass","warlockClass","warlordClass","wizardClass"];
var genders = ["Female","Male"];
var gendersButtons = ["femaleGender","maleGender"];
var alignments = ["Lawful-good","Good","Unaligned","Evil","Chaotic-evil"];
var alignmentsButtons = ["lawfulGoodAlignment","goodAlignment","unalignedAlignment","evilAlignment","chaoticEvilAlignment"];
var types = ["race","class","gender","alignment"];
var typesButton = ["racesButtons","classesButtons","gendersButtons","alignmentsButtons"];


for (i in abilityTypes) { // set all abilityScores to 0 at load
	var temp = [];
	for (var j = 0; j < 6; j++) {
		temp.push(0);
	}
	abilityScores.push(temp);
	for (var j = 0; j < 4; j++) {
		message += abilityScores[i][j] + " ";
	}
	document.getElementById(abilityTypes[i] + abilityCells[1]).innerHTML = message; // dice
	document.getElementById(abilityTypes[i] + abilityCells[3]).innerHTML = abilityScores[i][4]; // race
	document.getElementById(abilityTypes[i] + abilityCells[5]).innerHTML = abilityScores[i][5]; // total
	message = "";
}
for (i in abilityTypes) {
	displayDice(abilityTypes[i] + "Rolls",rollTypes[1]);
}

displayModButtons("clear"); // hide all ability score modifier buttons at launch time

for (i in abilityTypes) { // build the up/down and +/- buttons for each ability
	var modButtonMessage = "";
	modButtonMessage += "<div class='table'><div class='row'>";
	modButtonMessage += "<div class='subCell'><div id='" + abilityTypes[i] + "Up' class='modButtonHidden' title='Move " + abilityTypes[i] + " up'><div class='arrowUp'></div></div></div>";
	modButtonMessage += "<div class='subCell'><div id='" + abilityTypes[i] + "Down' class='modButtonHidden' title='Move " + abilityTypes[i] + " down'><div class='arrowDown'></div></div></div>";
	modButtonMessage += "<div class='subCell'><div id='" + abilityTypes[i] + "Plus' class='modButtonHidden' title='Add one to " + abilityTypes[i] + "'>+</div></div>";
	modButtonMessage += "<div class='subCell'><div id='" + abilityTypes[i] + "Minus' class='modButtonHidden' title='Subtract one from " + abilityTypes[i] + "'>-</div></div>";
	modButtonMessage += "</div></div>";
	document.getElementById(abilityTypes[i] +"Buttons").innerHTML = modButtonMessage;
}

// ## start ability point button listeners ##

// ** idea for another dice roller: high-low
// first score is 18, last is 6, rest is random

dice3d6.addEventListener("click", function() { // roll 3d6 dice
	document.getElementById("outputMessage").innerHTML = ""; // reset user message area
	points = 12; // reset 12 points system
	updateTwelvePointsButton(points);
	rollType = 0;
	abilityScores = []; // empty ability array
	for (i in abilityTypes) {
		var temp = [];
		for (var j = 0; j < 6; j++) {
			if (j < 3) { // roll dice for first three abilityScore slots
				var rndNumb = Math.floor(Math.random() * 6) + 1; // pick a number between 1 and 6
				temp.push(rndNumb); // store random number
			}
			if (j == 3) { // 3d6 doesn't have a fourth die roll; apply 0. Then sort rolls by highest values
				temp.push(0);
				temp.sort(function(a,b){return b-a;}); // sort from highest to lowest
			}
			if (j == 4) { // check for race bonus
				if (raceBonus == 0) { // if raceBonus hasn't be determined yet, push 0
					temp.push(0);
				} else { // if it does exist, get it and push it
					temp.push(raceBonus[i]);
				}
			} 
			if (j == 5) { //get all 5 values, add them up, and push into the last array slot
				temp.push(temp[0] + temp[1] + temp[2] + temp[3] + temp[4]);
			}
		}
		abilityScores.push(temp); // collect all values generated and push into abilityType array slot
	}
	resetTotalDisplay(rollType);
	displayRoll(rollType,points);
	for (i in abilityTypes) {
		displayDice(abilityTypes[i] + "Rolls","3d6");
	}
}, false);

dice4d6minus6.addEventListener("click", function() {
	document.getElementById("outputMessage").innerHTML = ""; // reset user message area
	var message = "";
	points = 12; // reset 12 points system
	updateTwelvePointsButton(points);
	rollType = 1;
	abilityScores = []; // empty ability array
	for (i in abilityTypes) {
		var temp = [];
		for (var j = 0; j < 6; j++) {
			var tempRndNumb = 0;
			if (j < 4) { // dice rolls
				var rndNumb = Math.floor(Math.random() * 6) + 1; // pick a number between 1 and 6
				temp.push(rndNumb); // store random number
			}
			if (j == 4) { // get raceBonus
				temp.sort(function(a,b){return b-a;}); // sort from highest to lowest
				if (raceBonus == 0) { // if raceBonus hasn't be determined yet, push 0
					temp.push(0);
				} else { // if it does exist, get it and push it
					temp.push(raceBonus[i]);
				}
			}
			if (j == 5) { //get all 5 values, add them up, and push into the last array slot
				var secondaryClass = document.getElementById(abilityTypes[i] + abilityCells[5]).className;
				var tempTotal = (temp[0] + temp[1] + temp[2] + temp[3]) - 6;
				var characterClass = document.getElementById("classDropDown").innerHTML;
				var classHighlights = [];
				switch (characterClass) {
					case "Cleric":
						classHighlights = ["secondaryAbility","noHigh","noHigh","noHigh","primaryAbility","secondaryAbility"];
						break;
					case "Fighter":
						classHighlights = ["primaryAbility","secondaryAbility","secondaryAbility","noHigh","secondaryAbility","noHigh"];
						break;
					case "Paladin":
						classHighlights = ["primaryAbility","noHigh","noHigh","noHigh","secondaryAbility","secondaryAbility"];
						break;
					case "Ranger":
						classHighlights = ["primaryAbility","noHigh","secondaryAbility","noHigh","secondaryAbility","noHigh"];
						break;
					case "Rogue":
						classHighlights = ["secondaryAbility","noHigh","primaryAbility","noHigh","noHigh","secondaryAbility"];
						break;
					case "Warlock":
						classHighlights = ["noHigh","secondaryAbility","noHigh","secondaryAbility","noHigh","primaryAbility"];
						break;
					case "Warlord":
						classHighlights = ["primaryAbility","noHigh","noHigh","secondaryAbility","noHigh","secondaryAbility"];
						break;
					case "Wizard":
						classHighlights = ["noHigh","noHigh","secondaryAbility","primaryAbility","secondaryAbility","noHigh"];
						break;
					case "Class":
						classHighlights = ["noHigh","noHigh","noHigh","noHigh","noHigh","noHigh"];
						break;
					default: 
						console.log("bad selection of class.");
						classHighlights = ["noHigh","noHigh","noHigh","noHigh","noHigh","noHigh"];
				}
				if (tempTotal < 3) { // if the total dice rolls - 6 < 3
					temp.push(3);
					message += " " + abilityTypes[i] + "'s total roll score was below 3. Setting roll total to 3."; // output message to user
					document.getElementById(abilityTypes[i] + abilityCells[5]).setAttribute("title",message); // warn user that the score was too low
					document.getElementById(abilityTypes[i] + abilityCells[5]).className = ""; // reset class for total
					document.getElementById(abilityTypes[i] + abilityCells[5]).className = "cell tooLow " + classHighlights[i]; // set class to italize score for total
				} else { // if the total dice rolls - 6 > 3
					temp.push(tempTotal);
					document.getElementById(abilityTypes[i] + abilityCells[5]).className = ""; // reset class for total
					document.getElementById(abilityTypes[i] + abilityCells[5]).className = "cell " + classHighlights[i]; // set class to default for total
				}
			}
		}
		abilityScores.push(temp); // collect all values generated and push into abilityType array slot
	}
	document.getElementById("outputMessage").innerHTML = message;
	resetTotalDisplay(rollType);
	displayRoll(rollType,points);
	for (i in abilityTypes) {
		displayDice(abilityTypes[i] + "Rolls","4d6-6");
	}
}, false);

dice4d6minuslow.addEventListener("click", function() {
	document.getElementById("outputMessage").innerHTML = ""; // reset user message area
	points = 12; // reset 12 points system
	updateTwelvePointsButton(points);
	rollType = 2;
	abilityScores = [];
	for (i in abilityTypes) {
	var temp = [];
	for (var j = 0; j < 6; j++) {
		var tempRndNumb = 0;
		if (j < 4) {
			var rndNumb = Math.floor(Math.random() * 6) + 1; // pick a number between 1 and 6
			temp.push(rndNumb); // store random number
		}
		if (j == 4) {
			temp.sort(function(a,b){return b-a;}); // sort from highest to lowest
			if (raceBonus == 0) { // if raceBonus hasn't be determined yet, push 0
				temp.push(0);
			} else { // if it does exist, get it and push it
				temp.push(raceBonus[i]);
			}
		}
		if (j == 5) { // skip the temp[3] slot as it will be lowest value rolled
			temp.push(temp[0] + temp[1] + temp[2] + temp[4]);
		}
	}
	abilityScores.push(temp); // collect all values generated and push into abilityType array slot
	}
	resetTotalDisplay(rollType);
	displayRoll(rollType,points);
	for (i in abilityTypes) {
		displayDice(abilityTypes[i] + "Rolls","4d6-low");
	}
}, false);

eighteenToEight.addEventListener("click", function() {
	document.getElementById("outputMessage").innerHTML = ""; // reset user message area
	points = 12; // reset 12 points system
	updateTwelvePointsButton(points);
	rollType = 3;
	abilityScores = [
		[6,6,6,0,raceBonus[0],18], //18
		[6,5,5,0,raceBonus[1],16], //16
		[5,5,4,0,raceBonus[2],14], //14
		[4,4,4,0,raceBonus[3],12], //12
		[4,3,3,0,raceBonus[4],10], //10
		[3,3,2,0,raceBonus[5],8] //8
	];
	resetTotalDisplay(rollType);
	displayRoll(rollType,points);
	for (i in abilityTypes) {
		displayDice(abilityTypes[i] + "Rolls","18-8");
	}
}, false);

twelvePoints.addEventListener("click", function() {
	document.getElementById("outputMessage").innerHTML = ""; // reset user message area
	points = 12; // reset 12 points system
	updateTwelvePointsButton(points);
	rollType = 4;
	abilityScores = [];
	abilityScores = [
		[4,4,4,0,raceBonus[0],12], //12
		[4,4,4,0,raceBonus[1],12], //12
		[4,4,4,0,raceBonus[2],12], //12
		[4,4,4,0,raceBonus[3],12], //12
		[4,4,4,0,raceBonus[4],12], //12
		[4,4,4,0,raceBonus[5],12] //12
	];
	resetTotalDisplay(rollType);
	displayRoll(rollType,points);
	for (i in abilityTypes) {
		displayDice(abilityTypes[i] + "Rolls","12points");
	}
}, false);
// ## end ability point button listeners ##

function removeTooLow() {
	var tempClass = "cell ";
	if (classHighlights == "") {
		classHighlights = ["noHigh","noHigh","noHigh","noHigh","noHigh","noHigh"];
	}
	for (i in abilityTypes) { // set the highlights based on the classHighlight array's values
		for (j in abilityCells) {
			document.getElementById(abilityTypes[i] + abilityCells[j]).className = ""; // reset class
			document.getElementById(abilityTypes[i] + abilityCells[j]).className = "cell " + classHighlights[i]; // set highlight to proper ability type
			if (classHighlights[i] == "primaryAbility") { //set popup tip to "Primary Ability"
				document.getElementById(abilityTypes[i] + abilityCells[j]).setAttribute("title",abilityTypes[i] + "'s primary ability");
			}
			else if (classHighlights[i] == "secondaryAbility") { // set popup tip to "Secondary Ability"
				document.getElementById(abilityTypes[i] + abilityCells[j]).setAttribute("title",abilityTypes[i] + "'s secondary ability");
			} else { // set popup tip to null
				document.getElementById(abilityTypes[i] + abilityCells[j]).setAttribute("title","");
			}	
		}
	}
}

function resetTotalDisplay(rollType) { // reset too low italized totals and empty user output message
	var tempClass = "cell ";
	switch (rollType) {
		case 1: // 4d6-6
			// do nothing as the 4d6-6 function takes care of it
			break;
		case 0: //3d6
		case 2: // 4d6-low
		case 3: // 18-8
		case 4: // twelve points
			removeTooLow();
			break;
		default:
			console.log("Bad choice for resetTotalDisplay function");	
	}
}

// ## create eventlisteners for mod buttons ##
for (i in abilityTypes) { // run through all possible button types and combinations and add eventlisteners to them for the mod buttons
	for (j in abilityMods) {
		addEventListeners(abilityTypes[i] + abilityMods[j],"mod");
	}
	addEventListeners(abilityTypes[i] + "RacePlus","human");
	addEventListeners(abilityTypes[i] + "RaceMinus","human");
}

function addEventListeners(id,type) { // add eventlisteners to mod button via it's id
    var obj = document.getElementById(id);
    if (type == "mod") { // all mod buttons except human race bonus
    	obj.addEventListener("click", function() {
	    	modAbilityScore(id); 
	    }, true);
    } else if (type == "human") { // mod buttons for human race bonus
    	obj.addEventListener("click", function() {
	    	humanPlusMinus(id); 
	    }, true);
    }
}

function modAbilityScore(id) { // detect mod button click and pass it to the appropriate ability modifier function
	if (id.indexOf("Up") > 0) { // if an up button has been clicked
		abilityScoreUp(id);
	} else if (id.indexOf("Down") > 0) { // if an down button has been clicked
		abilityScoreDown(id);
	} else if (id.indexOf("Plus") > 0) { // if an plus button has been clicked
		abilityScorePlus(id);
	} else if (id.indexOf("Minus") > 0) { // if an minus button has been clicked
		abilityScoreMinus(id);
	}
	
}
// ## end create eventlisteners for mod buttons ##

function updateTwelvePointsButton(points) { // update the display of the 12 points button
	if (points > 1 || points == 0) {
		document.getElementById("twelvePoints").innerHTML = "<span>" + points + " Points</span><span class='arrowRight'></span>";
	} else if (points == 1) {
		document.getElementById("twelvePoints").innerHTML = "<span>" + points + " Point</span><span class='arrowRight'></span>";
	}
}

function abilityScorePlus(id) { // add one point to clicked ability
	var count = 0;
	for (i in abilityTypes) {
		message = "";
		count = 0;
		for (j in abilityMods) {
			if (id == abilityTypes[i] + abilityMods[j]) {
				if (abilityScores[i][0] < 6) {
					abilityScores[i][0]++;
				} else if (abilityScores[i][1] < 6) {
					abilityScores[i][1]++;
				} else if (abilityScores[i][2] < 6) {
					abilityScores[i][2]++;
				}
				abilityScores[i][5]++; // update abilityScore total
				if (count <= 2) {
					message += abilityScores[i][j] + " ";
				}
				document.getElementById(abilityTypes[i] + abilityCells[1]).innerHTML = abilityScores[i][0] + " " + abilityScores[i][1] + " " + abilityScores[i][2];
				document.getElementById(abilityTypes[i] + abilityCells[5]).innerHTML = abilityScores[i][5];
				points--;
				togglePlusMinus(abilityScores[i][5],abilityTypes[i]);
				displayRaceBonus(); // refresh the totals section and the 12 points button
				updateTwelvePointsButton(points);
			}
		}
		count++;
	}
	for (i in abilityTypes) {
		displayDice(abilityTypes[i] + "Rolls","12points");
	}
}

function abilityScoreMinus(id) { // subtract one point to clicked ablity
	var count = 0;
	for (i in abilityTypes) {
		for (j in abilityMods) {
			if (id == abilityTypes[i] + abilityMods[j]) {
				if (abilityScores[i][0] > 1) {
					abilityScores[i][0]--;
				} else if (abilityScores[i][1] > 1) {
					abilityScores[i][1]--;
				} else if (abilityScores[i][2] > 1) {
					abilityScores[i][2]--;
				}
				abilityScores[i][5]--; // update abilityScore total
				if (count <= 2) {
					message += abilityScores[i][j] + " ";
				}
				document.getElementById(abilityTypes[i] + abilityCells[1]).innerHTML = abilityScores[i][0] + " " + abilityScores[i][1] + " " + abilityScores[i][2];
				document.getElementById(abilityTypes[i] + abilityCells[5]).innerHTML = abilityScores[i][5];
				points++;
				togglePlusMinus(abilityScores[i][5],abilityTypes[i]);
				displayRaceBonus(); // refresh the totals section and the 12 points button
				updateTwelvePointsButton(points);
			}
		}
		count++;
	}
	for (i in abilityTypes) {
		displayDice(abilityTypes[i] + "Rolls","12points");
	}
}

function togglePlusMinus(total,abilityType) { // toggle the display of the plus button
	for (i in abilityTypes) {
		if (abilityType == abilityTypes[i]) {
			total -= abilityScores[i][4];
			break;		
		}
	}
	if (total >= 18) { // if total > 18, hide plus button
		document.getElementById(abilityType + "Plus").className = "";
		document.getElementById(abilityType + "Plus").className = "modButtonHidden";
	}
	if (total <= 17 && points > 0) { // if total < 17, show plus button
		document.getElementById(abilityType + "Plus").className = "";
		document.getElementById(abilityType + "Plus").className = "modButton";
	}
	// toggle the display of the minus button
	if (total <= 3) { // if total < 4, hide minus button
		document.getElementById(abilityType + "Minus").className = "";
		document.getElementById(abilityType + "Minus").className = "modButtonHidden";
	}
	if (total >= 4) { // if total > 3, show minus button
		document.getElementById(abilityType + "Minus").className = "";
		document.getElementById(abilityType + "Minus").className = "modButton";
	}
	// if points are 0, hide all plus buttons
	if (points == 0) {
		for (i in abilityTypes) {
			document.getElementById(abilityTypes[i] + "Plus").className = "";
			document.getElementById(abilityTypes[i] + "Plus").className = "modButtonHidden";
		}
	}
	if (points > 0) { // if points are > 0, show all plus buttons with exception to those who's scores are maxed out
		for (i in abilityTypes) {
			if (abilityScores[i][5] <= 17) {
				document.getElementById(abilityTypes[i] + "Plus").className = "";
				document.getElementById(abilityTypes[i] + "Plus").className = "modButton";
			}
		}
	}
}

function abilityScoreUp(id) { // move ability score up one slot
	var count = 0;
	var tempLocation = "";
	for (i in abilityTypes) {
		for (j in abilityMods) {
			if (id == abilityTypes[i] + abilityMods[j]) {
				tempLocation = abilityScores[count];
				abilityScores[count] = abilityScores[(count-1)];
				abilityScores[(count-1)] = tempLocation;
				displayRoll(rollType,points);
				displayDice(abilityTypes[i] + "Rolls",rollTypes[rollType]); // ** this might lead to a fix **
				displayRaceBonus();
			}
		}
		count++;
	}
	for (i in abilityTypes) {
		displayDice(abilityTypes[i] + "Rolls",rollTypes[rollType]);
	}
}

function abilityScoreDown(id) { // move ability score down one slot
	var count = 0;
	var tempLocation = "";
	for (i in abilityTypes) {
		for (j in abilityMods) {
			if (id == abilityTypes[i] + abilityMods[j]) { // if id matches clicked move down button
				tempLocation = abilityScores[count];
				abilityScores[count] = abilityScores[(count+1)]; 
				abilityScores[(count+1)] = tempLocation;
				displayRoll(rollType,points);
				displayRaceBonus();
			}
		}
		count++;
	}
	for (i in abilityTypes) {
		displayDice(abilityTypes[i] + "Rolls",rollTypes[rollType]);
	}
}

function displayModButtons(type) { // toggles the display of the up, down, plus, and minus ability score modifier buttons
	for (i in abilityTypes) {
		for (j in abilityMods) { // clear all button classes
			// hide all mod buttons
			document.getElementById(abilityTypes[i] + abilityMods[j]).className = ""; // empty class
			document.getElementById(abilityTypes[i] + abilityMods[j]).className = "modButtonHidden"; // by default, hide all mod buttons
		}
		if (type == "dice") {
			if (i == 0) { // don't display up button for first instance
				document.getElementById(abilityTypes[i] + abilityMods[0]).className = "modButtonHidden"; // mod up button
				document.getElementById(abilityTypes[i] + abilityMods[1]).className = "modButton"; // mod down button
			} else if (i == 5) { // don't display down button for last instance
				document.getElementById(abilityTypes[i] + abilityMods[0]).className = "modButton"; // mod up button
				document.getElementById(abilityTypes[i] + abilityMods[1]).className = "modButtonHidden"; // mod down button
			} else {
				document.getElementById(abilityTypes[i] + abilityMods[0]).className = "modButton"; // mod up button
				document.getElementById(abilityTypes[i] + abilityMods[1]).className = "modButton"; // mod down button
			}
		} else if (type == "points") {
			document.getElementById(abilityTypes[i] + abilityMods[2]).className = "modButton"; // mod plus button
			document.getElementById(abilityTypes[i] + abilityMods[3]).className = "modButton"; // mod minus button
			
		} else if (type == "clear") {
			for (j in abilityMods) { // clear all button classes
				document.getElementById(abilityTypes[i] + abilityMods[j]).className = ""; // empty class
				document.getElementById(abilityTypes[i] + abilityMods[j]).className = "modButtonHidden"; // by default, hide all mod buttons
			}
		}
	}
}

function displayRoll(rollType,points) {
	var count = 0;
	var message = "";
	for (i in abilityTypes) {
		count = 0;
		message = "";
		for (j in abilityScores[i]) {
			switch(rollType) {
				case 0: // 3d6
					if (count <= 2) {
						message += abilityScores[i][j] + " ";
					}
					modType = "dice";
					count++;
					break;
				case 1: // 4d6-6
					if (count <= 3) {
						message += abilityScores[i][j] + " ";
					} else if (count == 5) {
						message += "-6";
					}
					count++;
					modType = "dice";
					break;
				case 2: // 4d6-low
					if (count <= 3) {
						message += abilityScores[i][j] + " ";
					} else if (count == 4) {
						message += "-" + abilityScores[i][3]; 
					}
					count++;
					modType = "dice";
					break;
				case 3: // 18-8
					if (count <= 2) {
						message += abilityScores[i][j] + " ";
					}
					count++;
					modType = "dice";
					break;
				case 4: // twelve points
					if (count <= 2) {
						message += abilityScores[i][j] + " ";
					}
					count++;
					modType = "points";
					break;
				default:
					console.log("Invalid rollType choice.");
					break;
			}
		}
		if (rollType == 1) { // 4d6-6 dice roller
			abilityScores[i][5] = abilityScores[i][0] + abilityScores[i][1] + abilityScores[i][2] + abilityScores[i][3] + abilityScores[i][4]; // get dice total and race bonus
			abilityScores[i][5] -= 6; // subtract 6 for dice roller type
			if ((abilityScores[i][5] - abilityScores[i][4])< 3) {
				abilityScores[i][5] = 3 + abilityScores[i][4];
			}
		} else if (rollType == 2) { //4d6-low roller
			abilityScores[i][5] = abilityScores[i][0] + abilityScores[i][1] + abilityScores[i][2] + abilityScores[i][3] + abilityScores[i][4]; // get dice total and race bonus
			abilityScores[i][5] -= abilityScores[i][3]; // subtract lowest die for dice roller type
		} else { // all other dice roller types
			abilityScores[i][5] = abilityScores[i][0] + abilityScores[i][1] + abilityScores[i][2] + abilityScores[i][4]; // get dice total and race bonus
		}
		document.getElementById(abilityTypes[i] + abilityCells[1]).innerHTML = message; // update display of dice rolls
		document.getElementById(abilityTypes[i] + abilityCells[3]).innerHTML = abilityScores[i][4]; // update display of abilityRace
		document.getElementById(abilityTypes[i] + abilityCells[5]).innerHTML = abilityScores[i][5]; // udpdate display of total
		displayModButtons(modType);
	}
}

function displayRaceBonus() { 
	for (i in abilityTypes) {
		abilityScores[i][4] = raceBonus[i]; // update abilityScores with new raceBonus values
		document.getElementById(abilityTypes[i] + abilityCells[3]).innerHTML = abilityScores[i][4]; // ability, location, what to display (raceBonus)
	}
	displayTotals();
}

function displayTotals() {
	for (i in abilityTypes) {
		if (rollType == 1) { // 4d6-6 dice roller
			abilityScores[i][5] = abilityScores[i][0] + abilityScores[i][1] + abilityScores[i][2] + abilityScores[i][3] + abilityScores[i][4]; // get dice total and race bonus
			abilityScores[i][5] -= 6; // subtract 6 for dice roller type
			if ((abilityScores[i][5] - abilityScores[i][4]) < 3) {
				abilityScores[i][5] = 3 + abilityScores[i][4];
			}
		} else if (rollType == 2) { //4d6-low roller
			abilityScores[i][5] = abilityScores[i][0] + abilityScores[i][1] + abilityScores[i][2] + abilityScores[i][3] + abilityScores[i][4]; // get dice total and race bonus
			abilityScores[i][5] -= abilityScores[i][3]; // subtract lowest die for dice roller type
		} else { // all other dice roller types
			abilityScores[i][5] = abilityScores[i][0] + abilityScores[i][1] + abilityScores[i][2] + abilityScores[i][4]; // get dice total and race bonus
		}
		document.getElementById(abilityTypes[i] + abilityCells[5]).innerHTML = abilityScores[i][5]; // ability, location, what to display (total)
	}
}

for (i in racesButtons) { // run through all possible button types and combinations and add eventlisteners to them for the mod buttons
	raceClassGenderAlignListeners(racesButtons[i],i,"race");
}
for (i in classesButtons) {
	raceClassGenderAlignListeners(classesButtons[i],i,"class");
}
for (i in gendersButtons) {
	raceClassGenderAlignListeners(gendersButtons[i],i,"gender");
}
for (i in alignmentsButtons) {
	raceClassGenderAlignListeners(alignmentsButtons[i],i,"alignment");
}

function raceClassGenderAlignListeners(id,position,type) { // add eventlisteners to mod button via it's id
    var obj = document.getElementById(id);
    obj.addEventListener("click", function() {
    	switch(type) {
    		case "race":
    			document.getElementById("raceDropDown").innerHTML = races[position];
    			updateRaceBonus(races[position]);
    			break;
    		case "class":
    			assignHighlights(classes[position]);
    			document.getElementById("classDropDown").innerHTML = classes[position];
    			break;
    		case "gender":
    			document.getElementById("genderDropDown").innerHTML = genders[position];
    			break;
    		case "alignment":
    			document.getElementById("alignmentDropDown").innerHTML = alignments[position];
    			break;
    		default:
    			console.log("Bad choice");
    			break;
    	}
    	
    }, true);
}

function assignHighlights(className) { // when a race is selected, update the ability cells' backgrounds
	switch (className) {
		case "Cleric":
			classHighlights = ["secondaryAbility","noHigh","noHigh","noHigh","primaryAbility","secondaryAbility"];
			break;
		case "Fighter":
			classHighlights = ["primaryAbility","secondaryAbility","secondaryAbility","noHigh","secondaryAbility","noHigh"];
			break;
		case "Paladin":
			classHighlights = ["primaryAbility","noHigh","noHigh","noHigh","secondaryAbility","secondaryAbility"];
			break;
		case "Ranger":
			classHighlights = ["primaryAbility","noHigh","secondaryAbility","noHigh","secondaryAbility","noHigh"];
			break;
		case "Rogue":
			classHighlights = ["secondaryAbility","noHigh","primaryAbility","noHigh","noHigh","secondaryAbility"];
			break;
		case "Warlock":
			classHighlights = ["noHigh","secondaryAbility","noHigh","secondaryAbility","noHigh","primaryAbility"];
			break;
		case "Warlord":
			classHighlights = ["primaryAbility","noHigh","noHigh","secondaryAbility","noHigh","secondaryAbility"];
			break;
		case "Wizard":
			classHighlights = ["noHigh","noHigh","secondaryAbility","primaryAbility","secondaryAbility","noHigh"];
			break;
		default: 
			console.log("bad selection of class.");
			classHighlights = ["noHigh","noHigh","noHigh","noHigh","noHigh","noHigh"];
	}
	var tooLow = "";
	for (i in abilityTypes) { // set the highlights based on the classHighlight array's values
		var tooLowClass = document.getElementById(abilityTypes[i] + abilityCells[5]).className;
		if (tooLowClass.indexOf("tooLow") > 0) { //found tooLow class
			tooLow = "tooLow";
		} else { //did not find tooLow class
			tooLow = "";
		}
		for (j in abilityCells) {
			document.getElementById(abilityTypes[i]).className = "row"; // reset ability row's class
			document.getElementById(abilityTypes[i]).className = "row " + classHighlights[i]; // set highlight to proper ability type row
			document.getElementById(abilityTypes[i] + abilityCells[j]).className = ""; // reset class
			document.getElementById(abilityTypes[i] + abilityCells[j]).className = "cell " + classHighlights[i]; // set highlight to proper ability type
			document.getElementById(abilityTypes[i] + abilityCells[5]).className = ""; // reset class for total cell
			document.getElementById(abilityTypes[i] + abilityCells[5]).className += "cell " + tooLow + " " + classHighlights[i]; // add in tooLow class if necessary
			if (classHighlights[i] == "primaryAbility") { //set popup tip to "Primary Ability"
				document.getElementById(abilityTypes[i] + abilityCells[j]).setAttribute("title",className + "'s primary ability");
			}
			else if (classHighlights[i] == "secondaryAbility") { // set popup tip to "Secondary Ability"
				document.getElementById(abilityTypes[i] + abilityCells[j]).setAttribute("title",className + "'s secondary ability");
			} else { // set popup tip to null
				document.getElementById(abilityTypes[i] + abilityCells[j]).setAttribute("title","");
			}	
		}
	}
}

function updateRaceBonus(race) { // when a new race is selected, update the raceBonus
	switch (race) {
		case "Dragonborn": //dragonborn +2 Str, +2 Cha
			raceBonus = [2,0,0,0,0,2];
			humanPoints(race);
			displayRaceBonus();
			document.getElementById("outputMessage").innerHTML = "";
			break;
		case "Dwarf": //dwarf +2 Con, +2 Wis
			raceBonus = [0,2,0,0,2,0];
			humanPoints(race);
			displayRaceBonus();
			document.getElementById("outputMessage").innerHTML = "";
			break;
		case "Eldarin": //eldarin +2 Dex, +2 Int
			raceBonus = [0,0,2,2,0,0];
			humanPoints(race);
			displayRaceBonus();
			document.getElementById("outputMessage").innerHTML = "";
			break;
		case "Elf": //elf +2 Dex, +2 Wis
			raceBonus = [0,0,2,0,2,0];
			humanPoints(race);
			displayRaceBonus();
			document.getElementById("outputMessage").innerHTML = "";
			break;
		case "Half-Elf": //half-elf +2 Con, +2 Cha
			raceBonus = [0,2,0,0,0,2];
			humanPoints(race);
			displayRaceBonus();
			document.getElementById("outputMessage").innerHTML = "";
			break;
		case "Halfling": //halfling +2 Dex, +2 Cha
			raceBonus = [0,0,2,0,0,2];
			humanPoints(race);
			displayRaceBonus();
			document.getElementById("outputMessage").innerHTML = "";
			break;
		case "Human": //human +2 to any one
			raceHumanPoints = 2; // reset human points to two
			raceBonus = [0,0,0,0,0,0];
			humanPoints(race);
			document.getElementById("outputMessage").innerHTML = "You have 2 human race points to distribute.";;
			break;
		case "Tiefling": //tiefling +2 Int, +2 Cha
			raceBonus = [0,0,0,2,0,2];
			humanPoints(race);
			displayRaceBonus();
			document.getElementById("outputMessage").innerHTML = "";
			break;
	}
}

function humanPlusMinus(id) {
	var minus =  id.substring(0,id.indexOf("RaceMinus")); // get abilty name of race minus button
	var plus = id.substring(0,id.indexOf("RacePlus")); // get ability name of race plus button
	var points;
	// read raceBonus and total up
	if ((raceBonus[0] + raceBonus[1] + raceBonus[2] + raceBonus[3] + raceBonus[4] + raceBonus[5]) >= 2) {
		points = 0;
	} else if ((raceBonus[0] + raceBonus[1] + raceBonus[2] + raceBonus[3] + raceBonus[4] + raceBonus[5]) == 1) {
		points = 1;
	} else if ((raceBonus[0] + raceBonus[1] + raceBonus[2] + raceBonus[3] + raceBonus[4] + raceBonus[5]) == 0) {
		points = 2;
	}
	for (i in abilityTypes) {
		if (abilityTypes[i] == minus) { // if the human <ability>RacePlus minus button is pushed
			if (raceBonus[i] > 0) { // don't allow for raceBonus to go below 0
				raceBonus[i]--;
				points++;
			}
		}
		if (abilityTypes[i] == plus) { // if the human <ability>RacePlus plus button is pushed
			if (points > 0) { // if there is enough human race points
				raceBonus[i]++;
				points--;
			}
		}
	}
	// hide/show +/- buttons based on racebonus scores
	for (i in abilityTypes) { //reset the display of the human race +/- buttons
		document.getElementById(abilityTypes[i] + abilityCells[3] + "Plus").className = "";
		document.getElementById(abilityTypes[i] + abilityCells[3] + "Plus").className = "modButton";
		document.getElementById(abilityTypes[i] + abilityCells[3] + "Minus").className = "";
		document.getElementById(abilityTypes[i] + abilityCells[3] + "Minus").className = "modButtonHidden";
		
		if (raceBonus[i] == 2 || points == 0) { // if a single raceBonus value is 2 or points = 0, hide all the + buttons
			document.getElementById(abilityTypes[i] + abilityCells[3] + "Plus").className = "";
			document.getElementById(abilityTypes[i] + abilityCells[3] + "Plus").className = "modButtonHidden";
		}		
		if (raceBonus[i] == 0) { // if racebonus[i] == 0, hide all - buttons
			document.getElementById(abilityTypes[i] + abilityCells[3] + "Minus").className = "";
			document.getElementById(abilityTypes[i] + abilityCells[3] + "Minus").className = "modButtonHidden";
		} else {
			document.getElementById(abilityTypes[i] + abilityCells[3] + "Minus").className = "";
			document.getElementById(abilityTypes[i] + abilityCells[3] + "Minus").className = "modButton";
		}
	}
	
	if (points == 2) { // update display message for how many human race points are left
		document.getElementById("outputMessage").innerHTML = "You have " + points + " human race points to distribute.";
	} else if (points == 1) {
		document.getElementById("outputMessage").innerHTML = "You have " + points + " human race point to distribute.";
	} else if (points == 0) {
		document.getElementById("outputMessage").innerHTML = "You have no human race points to distribute.";
	}
	displayRaceBonus();
}

function humanPoints(race) { // toggle the display of the human race bonus points
	if (race == "Human") {
		for (i in abilityTypes) { // display the +/- buttons
			document.getElementById(abilityTypes[i] + "RacePlus").className = "modButton";
			document.getElementById(abilityTypes[i] + "RaceMinus").className = "modButtonHidden";
			abilityScores[i][4] = raceBonus[i]; // reset the display of the racebonus from the previous race selection
			document.getElementById(abilityTypes[i] + abilityCells[3]).innerHTML = abilityScores[i][4]; // update the display of the race bonus cell
			if (rollType == 1) { // 4d6-6 dice roller
				abilityScores[i][5] = abilityScores[i][0] + abilityScores[i][1] + abilityScores[i][2] + abilityScores[i][3] + abilityScores[i][4]; // get dice total and race bonus
				abilityScores[i][5] -= 6; // subtract 6 for dice roller type
				if ((abilityScores[i][5] - abilityScores[i][4]) < 3) {
					abilityScores[i][5] = 3 + abilityScores[i][4];
				}
			} else if (rollType == 2) { //4d6-low roller
				abilityScores[i][5] = abilityScores[i][0] + abilityScores[i][1] + abilityScores[i][2] + abilityScores[i][3] + abilityScores[i][4]; // get dice total and race bonus
				abilityScores[i][5] -= abilityScores[i][3]; // subtract lowest die for dice roller type
			} else { // all other dice roller types
				abilityScores[i][5] = abilityScores[i][0] + abilityScores[i][1] + abilityScores[i][2] + abilityScores[i][4]; // get dice total and race bonus
			}
			document.getElementById(abilityTypes[i] + abilityCells[5]).innerHTML = abilityScores[i][5]; // update the display of the total cell
		}
	} else {
		for (i in abilityTypes) { // hide the +/- buttons
			document.getElementById(abilityTypes[i] + "RacePlus").className = "modButtonHidden";
			document.getElementById(abilityTypes[i] + "RaceMinus").className = "modButtonHidden";
		}
	}
}

function displayDice(dieRolls,rollType) { // display dice rolls
	var outputMessage = ""; // empty rendering string
	
	if (rollType == "3d6" || rollType == "18-8" || rollType == "12points") { // rollTypes: 3d6, 4d6-6, 4d6-low; 18-8 and 12 points are considered 3d6 types as they display the same number of dice
		var diceCount = 3; // 3 dice display setup
	} else if (rollType == "4d6-low" || rollType == "4d6-6") {
		var diceCount = 4; // 4 dice display setup
	}
	for (i in abilityScores) {
		outputMessage += "<div>"; // set the container for die
		for (var j = 0; j < diceCount; j++) {
			if (abilityTypes[i] + abilityCells[1] == dieRolls) {
				if (j == 3 && rollType == "4d6-low") { // highlight the lowests die roll and add dropped message
					outputMessage += "<div class='d" + abilityScores[i][j] + " red' title='The roll of " + abilityScores[i][j] + " was the lowest roll for " + abilityTypes[i] + " (was not tallied up).'>"; // set up container for pips
				} else {
					outputMessage += "<div class='d" + abilityScores[i][j] + "' title='Rolled a " + abilityScores[i][j] + " for " + abilityTypes[i] + ".'>"; // set up container for pips
				}
				for (var k = 0; k < 3; k++) {
					outputMessage += "<div class='pipRow'>"; // set div for pip row
					for (var l = 0; l < 5; l++) {
						outputMessage += "<div class='" + pips[abilityScores[i][j]][k][l] + "'></div>"; // pip or empty element
					}
					outputMessage += "</div>"; // end div for pip row
				}		
				outputMessage += "</div>"; // end containter for pip
				outputMessage += "<div class='dieSpacer'></div>"; // spacer at the end of each die div element
			}
		}
		outputMessage += "</div>"; // close container for die
		document.getElementById(dieRolls).innerHTML = outputMessage;	
	}
}