// ** may need to invest in an image preloader **

var output = '';
var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var axis = ['y','x'];
var reverses = [true,false];

// build card display
output += '<div id="alphabet-container">';
for (i in alphabet) {
	var letter = alphabet[i].toUpperCase();
	var rndAxis = Math.floor(Math.random() * axis.length); // pick a random axis
	var rndReverse = Math.floor(Math.random() * reverses.length); // pick a random boolean
	output += '<div class="card-grid ' + axis[rndAxis] + reverses[rndReverse] + '">';
	output += '<div id="' + letter + '" class="front">' + letter + '</div>';
	output += '<div class="back"><img src="images/' + letter + '.jpg" /></div></div>';
}
output += '</div>';
$('#output').html(output);

$('.card-grid.xtrue').flip({
	axis: 'x',
	reverse: true,
	trigger: 'click'
});
$('.card-grid.xfalse').flip({
	axis: 'x',
	reverse: false,
	trigger: 'click'
});
$('.card-grid.ytrue').flip({
	axis: 'y',
	reverse: true,
	trigger: 'click'
});
$('.card-grid.yfalse').flip({
	axis: 'y',
	reverse: false,
	trigger: 'click'
});


// play sound when flipped
/*
$(document).ready(function(e) {
	$(".front").click(function() {
		var id = $(this).attr("id"); // id of clicked card
		var audioElement = document.createElement('audio');
		audioElement.setAttribute('src', id + '.mp3');
  			audioElement.setAttribute('autoplay', 'autoplay');
  			$.get();
  			audioElement.addEventListener("load", function() {
            audioElement.play();
        }, true);
	});
});
*/
//var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",];
