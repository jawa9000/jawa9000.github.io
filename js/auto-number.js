// Simple system to auto number each step in a tutorial page
var cornersElement = document.getElementsByClassName("corner").length; // get the number of elements with corner class
for (var i = 0; i < cornersElement; i++) {
	var cornerMessage = "";
	var cornerCount = i + 1;
	if (i < 9) { // add a "0" in front of numbers if < 10
		cornerMessage = "step 0" + cornerCount; // set text for title
		document.getElementsByClassName("corner")[i].innerHTML = "0" + cornerCount; // output content for corner element
	} else {
		cornerMessage = "step " + cornerCount; // set text for title
		document.getElementsByClassName("corner")[i].innerHTML = cornerCount; // output content for corner element
	}
	document.getElementsByClassName("corner")[i].setAttribute("title",cornerMessage); // output title
}