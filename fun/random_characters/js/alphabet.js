$('#nav a').click(function (e) { // Bootstrap Navigation
  e.preventDefault()
  $(this).tab('show')
});

// Alphabet game
var letters = ["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m"];
var letterKeypress = [81,87,69,82,84,89,85,73,79,80,65,83,68,70,71,72,74,75,76,90,88,67,86,66,78,77];
var numbers = [0,1,2,3,4,5,6,7,8,9];
var numbersKeypress = [48,49,50,51,52,53,54,55,56,57];
var both = ["q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m",0,1,2,3,4,5,6,7,8,9];
var bothKeypress = [81,87,69,82,84,89,85,73,79,80,65,83,68,70,71,72,74,75,76,90,88,67,86,66,78,77,48,49,50,51,52,53,54,55,56,57];
var size = 50; // default size of 'hit box'
var fields = ['#alphabet','#numbers','#both']; // game fields
var toggle = true; // toggle the random or static location of the characters

for (i in fields) { // Set 'hit box' size for all games
  $(fields[i]).css({
    width: size + 'px',
    height: size + 'px'
  })
}

pickLetter(); // game defaults to the alphabet first

// On click of the navigation, active the different game
$("ul#nav").on('click',function() {
  if ($('li.active').text() == "Alphabet") { // alphabet
    pickLetter();
  }
  if ($('li.active').text() == "Numbers") { // numbers
    pickNumber();
  }
  if ($('li.active').text() == "Both") { // both alphabet and numbers
    pickBoth();
  }
})

function pickLetter() { // pick a random letter, display it, and randomly position it
  var rnd = Math.floor(Math.random() * letters.length);
  // randomly pick between upper and lower case
  if (Math.floor(Math.random() * 100) <= 50) { // set character to uppercase
    $("#alphabet").text(letters[rnd].toUpperCase());
  } else { // set character to lowercase
    $("#alphabet").text(letters[rnd]);
  }
  setCSS('alphabet',toggle);
  //playSound();
}

function pickBoth() {
  var rnd = Math.floor(Math.random() * both.length);
  if (typeof(both[rnd]) != 'number') {
    if (Math.floor(Math.random() * 100) <= 50) { // randomly pick between upper and lower case
      $("#both").text(both[rnd].toUpperCase()); // display random uppercase letter
    } else {
      $("#both").text(both[rnd]); // display random lowercase letter
    }
  } else { // display random lowercase character
    $("#both").text(both[rnd]);
  }
  setCSS('both',toggle);
  //playSound();
}

function pickNumber() { // pick a random letter, display it, and randomly position it
  var rnd = Math.floor(Math.random() * numbers.length);
  $("#number").text(numbers[rnd]);
  setCSS('number',toggle);
  //playSound();
}

function setCSS(target,toggle) {
  if (toggle) { // if toggle is set to random location
    $('#' + target).css({ // position the alphabet div
      top: Math.floor(Math.random() * (Math.round($(window).height() * 0.9) - size)) + 'px', // randomly place the leter on the screen on x
      left: Math.floor(Math.random() * (Math.round($(window).width() * 0.9) - size)) + 'px' // randomly place the leter on the screen on y
    });
  } else { // if toggle is set to center of screen
    $('#' + target).css({ // get and set center of screen for characters
      top: Math.round($(window).height()) / 2 + 'px',
      left: Math.round($(window).width()) / 2 + 'px'
    });
  }
}

/*
function playSound() {
  // **play audio of selected letter
  //new Audio('http://www.soundjay.com/button/beep-01a.mp3').play();
  //new Audio('../audio/' + letters[rnd] + '.mp3').play();
  //new Audio('audio/0-9_Male_Vocalized-Mike_Koenig-1919515312.mp3').play();
}

function muteMe(elem) {
  elem.muted = true;
  elem.pause();
}

function mutePage() {
  var audios = $('audio');
  [].forEach.call(audios, function(audio) {
    muteMe(audio);
  });
}
*/

$(document).ready(function() {
  // ** preload mp3 files
  //$.ajax({url: "file1.mp3", success: function() {$("#play_button").show();}});

  $('#alphabet').on('click', function() { // pick a new letter on click
    pickLetter();
  });
  $('#number').on('click', function() { // pick a new number on click
    pickNumber();
  });
  $('#both').on('click', function() { // pick a new character on click
    pickBoth();
  });

/* ** audio component is on hold until further notice
  $('span#audio').on('click', function() { // toggle audio
    if ($('#audio').hasClass('glyphicon-volume-up')) { // disable audio
      $(this).removeClass('glyphicon-volume-up').addClass('glyphicon-volume-off');
      $('#audioText').text(' Audio disabled');
      // ** function to toggle audio
      // element.muted = true
      //$('audio').attr('muted',true);
      mutePage();
    } else { // enable audio
      $(this).removeClass('glyphicon-volume-off').addClass('glyphicon-volume-up');
      $('#audioText').text(' Audio enabled');
      // ** function to toggle audio
      // element.muted = false
      //$('audio').attr('muted',false);
    }
  });
*/
  $('span#location').on('click', function() { // toggle random location
    if ($('#location').hasClass('glyphicon-plus')) {
      $(this).removeClass('glyphicon-plus').addClass('glyphicon-minus'); // swap toggle icon
      $('#locationText').text(' Random location disabled'); // swap toggle text
      toggle = false;
    } else {
      $(this).removeClass('glyphicon-minus').addClass('glyphicon-plus'); // swap toggle icon
      $('#locationText').text(' Random location enabled'); // swap toggle text
      toggle = true;
    }
  });

  $('span#version').text($('meta[name="version"]').attr('content'));

  function getKeypress(keyArray,array,target,input) {
    var key = $(target).text(); // get the value of the displayed text
    if (target != '#number') {
      key = key.toLowerCase(); // convert letter to lower case
    }
    for (i in keyArray) { // loop through kerpress array looking to match e.which
      if (keyArray[i] == input) {
        if (array[i] == key) {
          switch (target) {
            case '#alphabet':
              pickLetter();
              break;
            case '#number':
              pickNumber();
              break;
            case '#both':
              pickBoth();
              break;
            default:
              pickLetter();
          }
          break;
        }
      }
    }
  }

  $(window).on('keydown',function(e) {
    getKeypress(letterKeypress,letters,'#alphabet',e.which);
    getKeypress(bothKeypress,both,'#both',e.which);
    getKeypress(numbersKeypress,numbers,'#number',e.which);
  })
});
