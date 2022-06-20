var mineralNames = ["x", "y", "z", "v", "t", "u", "a", "s", "c", "b", "r", "w", "q", "d", "e"];

var canvasWidth = 800;
var canvasHeight = 500;
$(document).ready(function(e) {
    $("canvas").width(canvasWidth).height(canvasHeight);
});
						
// generate x number of asteroids
var asteroidCount = Math.floor(Math.random() * 9) + 1;

// generate x,y,z coords for each asteroid
var asteroidLocations = [];
for (var i = 0; i < asteroidCount; i++) {
	var tempArray = [];
	for (var j = 0; j < 2; j++) {
		//var rndPos = Math.floor(Math.random() * 100);
		var rndPos = Math.floor(Math.random() * 100) * 5;
		/* temporarily disabled
		var coinFlip = Math.floor(Math.random() * 100);
		if (coinFlip >= 50) {
			rndPos = rndPos - 100;
		}
		*/
		tempArray.push(rndPos);
	}
	asteroidLocations.push(tempArray);
}
//console.log(asteroidLocations);
//asteroidList
var temp1 = "<ol>";
for (i in asteroidLocations) {
	temp1 += "<li>" + asteroidLocations[i][0] + "," + asteroidLocations[i][1] + "</li>";
}
temp1 += "</ol>";
$(document).ready(function(e) {
   $("#asteroidList").html(temp1); 
});

// ship's location
var shipLocation = [0,0];

// draw canvas
// display asteroids based on the their x,y positions


// functions
function calcDistance(asteroid,ship) {
	var xd = ship[0] - asteroid[0];
	var yd = ship[1] - asteroid[1];
	var distance = Math.sqrt((xd * xd) + (yd * yd)).toFixed(2);
	console.log(distance);
	return distance;
}

calcDistance(asteroidLocations[0],shipLocation);

// build an asteroid's 6 character name
function asteroidName() {
	var numbers = ["0","1","2","3","4","5","6","7","8","9"];
	var letters = ["q","a","z","w","s","x","e","d","c","r","f","v","t","g","b","y","h","n","u","j","m","i","k","o","l","p"];
	var asteroidName = "";
	var nameLength = Math.floor(Math.random() * 5) + 4;
	for (var i = 0; i < nameLength; i++) {
		var coinFlip = Math.floor(Math.random() * 100);
		if (coinFlip > 15) { // pick a number
			var rndnumber = Math.floor(Math.random() * numbers.length);
			asteroidName += numbers[rndnumber];
		} else { // pick a letter
			var rndnumber = Math.floor(Math.random() * letters.length);
			asteroidName += letters[rndnumber];
		}
	}
	return asteroidName;
}

var myName = asteroidName();
// an asteroid should have the following properties:
/*
	* name
	* size (scale)
	* rotation speed
	* reserved array
	* mineral array
	* coordinates
	
	asteroids = [
		[
			name,
			size,
			[ //minerals
				["x",2],
				["y",10],
				["z",5]
			], 
			[10,22,-32], //coordinates
			[
				8-12 x,y values
			] // shape
		],
	];
*/

// ** note all asteroid's points should be 10 points apart. That way, I can use +/-5 for all for directions of a point **

var asteroidArray = [];

var asteroidTemplates = [
	[[25,0],[35,5],[45,15],[50,25],[45,35],[25,50],[15,45],[5,35],[0,25],[5,15],[10,5]],
	[[25,0],[35,5],[45,15],[50,25],[45,35],[25,50],[15,45],[5,35],[0,25],[5,15],[10,5]],
];

function createAsteroid() {
	// create a new asteroid and add it to the asteroidArray array
	var temp = [];
	temp.push(asteroidName());	// name of asteroid
	var asteroidSize = Math.floor(Math.random() * 9) + 1;
	temp.push(asteroidSize); // size of asteroid (1-10)
	temp.push(Math.floor(Math.random() * 10)); // rotation speed of asteroid (0-10)
	var emptyArray = []; // reserved array (empty; future use)
	temp.push(emptyArray);
	
	// minerals (** create this later as this will be very complex **)
		// create a mineral rarity selection method for both the mineral type and quantity
	//mineralNames array
	var numMinerals = Math.floor(Math.random() * asteroidSize) + 1;
	var tempMineral = [];
	for (var i = 0; i < numMinerals; i++) {
		var rndMineralName = Math.floor(Math.random() * mineralNames.length);
		//console.log("rndMineralName: " + mineralNames[rndMineralName]);
		//console.log("asteroidSize: " + asteroidSize);
		var rndMineralQuantity = (Math.floor(Math.random() * asteroidSize) + 1) * 10 + (Math.floor(Math.random() * asteroidSize));
		//console.log("rndMineralQuantity: " + rndMineralQuantity);
		tempMineral.push(mineralNames[rndMineralName]);
		tempMineral.push(rndMineralQuantity);
	}
	var minerals = [];
	minerals.push(tempMineral);
	//console.log(minerals);
	// merge duplicate minerals in tempMineral array
	temp.push(minerals);
	
	// coordinates of asteroid
	var rndX = Math.floor(Math.random() * canvasWidth);
	var rndY = Math.floor(Math.random() * canvasHeight);
	var coordinates = [rndX,rndY];
	temp.push(coordinates);
	
	// ** use this in a later function **
	var xCenter = canvasWidth / 2; // x center of canvas
	var displayX = rndX - xCenter; // "spatial" location of x
	var yCenter = canvasHeight / 2; // y center of canvas
	var displayY = rndY - yCenter; // "spatial" location of y
	//console.log("xCenter: " + xCenter + " rndX: " + rndX + " Display x: " + displayX);
	//console.log("yCenter: " + yCenter + " rndY: " + rndY + " Display y: " + displayY);
	
	// build shape of asteroid
	// pick a random template for the asteroid's shape
	var rndTemplate = Math.floor(Math.random() * asteroidTemplates.length);
	//console.log("template selected: " + rndTemplate);
	//console.log(asteroidTemplates[rndTemplate]);
	var shape = [];
	for (i in asteroidTemplates[rndTemplate]) { // loop through the template and apply an offset to each coordinate to create an unique asteroid shape
		//console.log(asteroidTemplates[rndTemplate][i]);
		var rndDirection = Math.floor(Math.random() * 5);
		var rndOffset = Math.floor(Math.random() * 4) + 1; // offset of coordinate point
		// randomly select a random offset direction (up,down,left,right,none) as much as 1-5
		if (rndDirection == 0) { // up
			//console.log("up by " + rndOffset);
			var tempCoord = [asteroidTemplates[rndTemplate][i][0],asteroidTemplates[rndTemplate][i][1] + rndOffset]
		} else if (rndDirection == 1) { // down
			//console.log("down by " + rndOffset);
			var tempCoord = [asteroidTemplates[rndTemplate][i][0],asteroidTemplates[rndTemplate][i][1] - rndOffset]
		} else if (rndDirection == 2) { // left
			//console.log("left by " + rndOffset);
			var tempCoord = [asteroidTemplates[rndTemplate][i][0] + rndOffset,asteroidTemplates[rndTemplate][i][1]]
		} else if (rndDirection == 3) { // right
			//console.log("right by " + rndOffset);
			var tempCoord = [asteroidTemplates[rndTemplate][i][0] - rndOffset,asteroidTemplates[rndTemplate][i][1]]
		} else {
			//console.log("no offset");
		}
		shape.push(tempCoord);
	}
	//console.log(shape);
	temp.push(shape);
	
	asteroidArray.push(temp);
}
createAsteroid();



var myAsteroid = [
	myName, // asteroid name
	5, // size
	10, // rotation speed
	[], // reserved array
	[ // minerals
		["x",2],["y",10],["z",12]
	],
	[10,22,-32], // coordinates
	[ // shape
		[25,0],[35,5],[45,15],[50,25],[45,35],[25,50],[15,45],[5,35],[0,25],[5,15],[10,5]
	]
];

// read the asteroid's properties
function readAsteroid(asteroid) {
	var asteroidName = asteroid[0];
	var asteroidSize = asteroid[1];
	var asteroidRotation = asteroid[2];
	var reservedArray = asteroid[3];
	//console.log("asteroidName: " + asteroidName);
	//console.log("asteroidSize: " + asteroidSize);
	var message = "";
	message += "asteroid name: " + asteroidName + "<br/>";
	message += "asteroid size: " + asteroidSize + "<br/>";
	message += "asteroid rotation: " + asteroidRotation + "<br/>";
	message += "reserved array: " + reservedArray + "<br/>";
	message += "minerals:<br/>";
	for (i in asteroid[4]) {
		for (j in asteroid[4][i]) {
			if (j % 2 == 0) {
				message += asteroid[4][i][j] + ": ";
			} else {
				message += asteroid[4][i][j] + "<br/>";
			}
		}
	}
	var temp = "location: ";
	for (i in asteroid[5]) {
		if (i > 0) {
			temp += ",";
		}
		temp += asteroid[5][i];
	}
	message += temp + "<br/>";
	message += "shape: ";
	console.log(asteroid[6].length);
	for (i in asteroid[6]) {
		for (j in asteroid[6][i]) {
			message += asteroid[6][i][j] + ",";
		}
	}
	message = message.substring(0, message.length -1); // remove the last comma from the shape of the asteroid; this isn't the best solution as I will need to access this info later
	
	// ** volume of asteroid? **
	$("#asteroidProperties").html(message);
}

$(document).ready(function(e) {
   readAsteroid(myAsteroid); 
   readAsteroid(asteroidArray[0]);
});




var home = [0,0];
var position = [];
var temp = [];
var newOffsets = [
	[25,0],
	[35,5],
	[45,15],
	[50,25],
	[45,35],
	[25,50],
	[15,45],
	[5,35],
	[0,25],
	[5,15],
	[10,5]
];

// build canvas
$(document).ready(function() {
	// draw quadrants
	// get size of canvas
	//var width = $("canvas").width();
	//var height = $("canvas").height();
	//console.log(width,height);
	
	
	// draw asteroids
	var canvas = $("#myCanvas");
	var context = canvas.get(0).getContext("2d");
	
	/*
	// draw border
	context.stroke();
	context.beginPath();
	context.strokeStyle = "rgb(255,255,255)";
	context.moveTo(0,0);
	context.lineTo(0,width);
	context.lineTo(height,width);
	context.lineTo(height,0);
	context.closePath();
	context.stroke();
	*/
	// draw quadrants
	context.stroke();
	context.beginPath();
	context.strokeStyle = "rgb(255,255,255)";
	context.moveTo(canvasWidth/3,0);
	context.lineTo(canvasWidth/3,canvasHeight);
	context.moveTo(canvasWidth/3 + canvasWidth/3,0);
	context.lineTo(canvasWidth/3 + canvasWidth/3,canvasHeight);
	context.moveTo(0,canvasHeight/3);
	context.lineTo(canvasWidth,canvasHeight/3);
	context.moveTo(0,canvasHeight/3 + canvasHeight/3);
	context.lineTo(canvasWidth,canvasHeight/3 + canvasHeight/3);
	context.closePath();
	context.stroke();
	
	/*
	context.strokeStyle = "rgb(0,255,0)";
	context.beginPath();
	context.moveTo(asteroidLocations[0][0],asteroidLocations[0][1]);
	context.lineTo(asteroidLocations[0][0]+10,asteroidLocations[0][1]);
	context.lineTo(asteroidLocations[0][0]+10,asteroidLocations[0][1]+10);
	context.lineTo(asteroidLocations[0][0],asteroidLocations[0][1]+10);
	context.closePath();
	*/
	
	context.stroke();
	context.strokeStyle = "rgb(0,0,255)";
	context.beginPath();
	for (i in newOffsets) {
		var x = newOffsets[i][0] + asteroidLocations[0][0];
		var y = newOffsets[i][1] + asteroidLocations[0][1];
		if (i == 0) {
			//context.moveTo(newOffsets[i][0],newOffsets[i][1]);
			context.moveTo(x,y);
		} else {
			//context.lineTo(newOffsets[i][0],newOffsets[i][1]);
			context.lineTo(x,y);
		}
	}
	context.closePath();
	context.stroke();
});