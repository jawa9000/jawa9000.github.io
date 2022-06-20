// guessing numbers game for toddlers

// how many [item] do you see?
// generate a random number
// randomly pick an object
// display rnd number of object ([object].png)
// display buttons 1-10
// if player guesses right, congratulate and start again
// if guess is wrong, try again, remove button

var rndNumber = 0;
var items = ["airplane","balloon","bear","chicken","boat","crayon","dinosaur","drum","horse","kite","rabbit","robot","horn","ball","duck","car","rocket","train","truck","worm"];
var rndItem = "";
var guessImage = "";
var buttonNumbers = [1,2,3,4,5,6,7,8,9,10];


pickItem();
buildButtons();

$(document).ready(function() {
    $("body").on("click","div[id^='button-']", function() {
    	var clickedNumber = $(this).attr("number");
        //console.log(clickedNumber);
        if (clickedNumber == rndNumber) {
            $("#correct").addClass("block").removeClass("none");
        } else {
        	//$( "p" ).fadeOut( "slow" );
        	$("#message").show().html("try again").delay(2000).fadeOut("slow"); // ** rebuild this **
            $("#button-" + clickedNumber).remove();
        }
    });

    $("#correct").click(function() { // reset game
        $("#correct").addClass("none").removeClass("block");
        $("#buttonRow").remove();
        pickItem();
        buildButtons();
        $("#message").html("");
    });

    $("body").on("click","span", function() {
    	$("#buttonRow").remove();
        pickItem();
        buildButtons();
        $("#message").html("");
    });

   	$("*").click(function(event) {
   		var temp = event.target.nodeName;
   		var thisId = $(this).attr("id");
   		//console.log(temp + ":" + thisId);
   	});
});



function pickItem() { // pick random item
	rndNumber = Math.floor(Math.random() * 10) + 1;
	var rndItemNumber = Math.floor(Math.random() * items.length);
	rndItem = items[rndItemNumber];

    $("#question").html("How many <span>" + rndItem + "s</span> do you see?");

	guessImage = rndItem + ".png";

	var outputImage = "";
	for (var i = 0; i < rndNumber; i++) {
		outputImage += "<img class='img' src=images/" + rndItem + ".png />";
	}
    $("#output").html(outputImage);
}

function buildButtons() {
	$("#buttons").html("");
	var buttons = "";
    buttons += "<div id='buttonRow'>";
    for (i in buttonNumbers) {
        buttons += "<div class='inline chalk' number='" + buttonNumbers[i] + "' id='button-" + buttonNumbers[i] + "'>" + buttonNumbers[i] + "</div>";
    }
    buttons += "</div>";
    $("#buttons").html(buttons);
}

$.preloadImages = function() {
  for (var i = 0; i < arguments.length; i++) {
    $("<img />").attr("src", arguments[i]);
  }
};

for (i in items) {
	$.preloadImages("images/" + items[i] + ".png");
}
