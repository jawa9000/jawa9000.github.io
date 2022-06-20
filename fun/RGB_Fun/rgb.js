var colors = generateRndColors(6);
var squares = document.querySelectorAll('.square');
var pickedColor = pickColor();
var colorDisplay = document.querySelector('#colorDisplay');
var messageDisplay = document.querySelector('#message');
var h1 = document.querySelector('h1');
var resetButton = document.querySelector('#reset');
var modeButtons = document.querySelectorAll('.mode');
var difficulty = 6;

colorDisplay.textContent = pickedColor.toUpperCase();

for (var i = 0; i < modeButtons.length; i++) {
  modeButtons[i].addEventListener('click', function() {
    modeButtons[0].classList.remove('selected');
    modeButtons[1].classList.remove('selected');
    this.classList.add('selected');
    if (this.textContent == "Easy") {
      difficulty = 3;
    } else {
      difficulty = 6;
    }
    pickDifficulty(difficulty);
  });
}

function pickDifficulty(num) {
  if (num == 3) { // hide the bottom 3 div elements
    for (var i = 3; i < squares.length; i++) {
      squares[i].style.display = 'none';
    }
  } else {
    for (var i = 0; i < squares.length; i++) {
      squares[i].style.display = 'block';
    }
  }
  colors = generateRndColors(num);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i]; // add init colors to squares
  }
  h1.style.backgroundColor = "steelblue";
  messageDisplay.textContent = "";
}

resetButton.addEventListener('click', function() {
  pickDifficulty(difficulty);
  resetButton.textContent = "New Colors";
  h1.style.backgroundColor = "steelblue";
  messageDisplay.textContent = "";
});

for (var i = 0; i < squares.length; i++) {
  squares[i].style.backgroundColor = colors[i]; // add init colors to squares
  squares[i].addEventListener('click', function() { // add event listener to each squares
    var clickedColor = this.style.backgroundColor;
    clickedColor = clickedColor.replace(/ /g, ''); // remove whitespaces from the clicked rgb values
    if (clickedColor === pickedColor) {
      resetButton.textContent = "Play again?"
      messageDisplay.textContent = "Correct!";
      changeColors(clickedColor);
      h1.style.backgroundColor = clickedColor;
    } else {
      this.style.backgroundColor = "#232323";
      messageDisplay.textContent = "Try again";
    }
  });
}

function changeColors(color) {
  for (var i = 0; i < colors.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  var rndNum = Math.floor(Math.random() * colors.length);
  return colors[rndNum];
}

function generateRndColors(num) {
  var array = [];
  for (var i = 0; i < num; i++) {
    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);
    array.push("rgb(" + red + "," + green + "," + blue + ")");
  }
  return array;
}
