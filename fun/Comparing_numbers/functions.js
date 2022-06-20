var totalSeconds = 0; // total time
var timer = null;
var started = false; // state for the initialization of the math problems
var backgroundColorGreen = '#04c204';
var backgroundColorRed = '#f05151';
var localStorageId = ''; // localStorage id
var negativeNumbers = false; // toggle to allow/disallow negative numbers in math problems and answers

const ar = new Array(37, 38, 39, 40); // arrow key ids
const disableArrowKeys = function(e) { // disable arrow keys
    if ($.inArray(e.keyCode, ar) >= 0) {
        e.preventDefault();
    }
}

$(document).keydown(disableArrowKeys); // disable arrow keys so users cannot guess the answer by using these keys to increment the answer values

$(document).on('change', 'input[type=radio]', function() {
    console.log($(this).attr('id'))
});

$(document).on('change', 'input.input', function() { // provide feedback on right or wrong answers or if the quiz is complete
    var id = $(this).attr('id'); // id of current input element
    var answerLength = $(this).attr('answer').length; // length of correct answer
    var givenAnswer = $('#' + id).val(); // length of user's answer

    if ($('#' + id).attr('answer') == parseInt(givenAnswer)  && answerLength == givenAnswer.length) { // if the answer is correct and the length of the answer is correct (without leading zeros), the color accordingly
        $('#' + id).css('backgroundColor', backgroundColorGreen);
        $('#' + id).attr('answered', true);
    } else { // if wrong answer is given, change bg color
        if (givenAnswer.length == 0) { // if answer is empty, change bg back to default color
            $('#' + id).css('backgroundColor','#8abcf7');
        } else {
            $('#' + id).css('backgroundColor', backgroundColorRed);
        }

        $('#' + id).attr('answered', false);
    }

    var correctTotal = 0; // total of correct answers
    
    $('input.input').each(function() { // Count the number of problems, count correct answers, and if they are equal, turn the page bg to green
        if ($(this).attr('answered') == 'true') {
            correctTotal++;
        }

        var inputCount = $('input#count').val() || $('input#count').attr('placeholder'); // grab the total number of math problems regardless if the user supplied a number or not

        if (correctTotal == inputCount) {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }

            $('#stop').attr('disabled', true).removeClass('active');
            $('#reset').attr('disabled', true).removeClass('active');

            $('input').each(function() { // disable all input elements
                $(this).attr('disabled', true).css('backgroundColor', backgroundColorGreen);
            })

            $('body').css('backgroundColor', backgroundColorGreen);
            $('.table').css('backgroundColor', backgroundColorGreen);
            $('.header').css('backgroundColor', backgroundColorGreen);

            // Store problem type, problem count, and time spent in local storage
            var localStorageObj = { // generate object to save in localStorage
                time: $('#hour').text() + ":" + $('#minute').text() + ":" + $('#second').text(),
                problemCount: inputCount,
                mathType: operation
            }

            var negativeNumber = false;

            if ($('input#negative').prop('checked')) { // determine if numbers can contain a negative value
                negativeNumber = true;   
            }

            if (negativeNumber) { // generate localStorage id
                localStorageId = operation + '-negative-' + inputCount;
            } else {
                localStorageId = operation + '-' + inputCount;
            }

            var completeMessage = '';
            
            if (localStorageId in localStorage) { // if local storage item exists, get it and compare completed time with current problem time
                var best = JSON.parse(window.localStorage.getItem(localStorageId));

                if (localStorageObj.time < best.time) { // user beat their best time
                    setLocalStorage(localStorageId, localStorageObj);

                    if (negativeNumber) {
                        completeMessage = 'Congrats on your new best time for ' + localStorageObj.problemCount + ' ' + localStorageObj.mathType + ' math problems of ' + localStorageObj.time + ' mixed with negative numbers!';
                    } else {
                        completeMessage = 'Congrats on your new best time for ' + localStorageObj.problemCount + ' ' + localStorageObj.mathType + ' math problems of ' + localStorageObj.time + '!';
                    }
                } else { // user did not beat their best time
                    if (negativeNumber) {
                        completeMessage = 'Congrats on completing your math assignment of ' + localStorageObj.mathType + '! Your best time is ' + best.time + ' for completing ' + best.problemCount + ' ' + best.mathType + ' math problems with negative numbers.';
                    } else {
                        completeMessage = 'Congrats on completing your math assignment of ' + localStorageObj.mathType + '! Your best time is ' + best.time + ' for completing ' + best.problemCount + ' ' + best.mathType + ' math problems.';
                    }
                }
            } else {
                if (negativeNumber) {
                    completeMessage = 'Congrats on your new best time for ' + localStorageObj.problemCount + ' ' + localStorageObj.mathType + ' math problems of ' + localStorageObj.time + ' mixed with negative numbers!';
                } else {
                    completeMessage = 'Congrats on your new best time for ' + localStorageObj.problemCount + ' ' + localStorageObj.mathType + ' math problems of ' + localStorageObj.time + '!';
                }
                
                setLocalStorage(localStorageId, localStorageObj);
            }

            $('#completeMessage').html(completeMessage);
        } else {
            $('body').css('backgroundColor', 'rgb(238, 238, 238)');
        }
    });
});

function setLocalStorage(id, obj) { // set localStorage item and JSON object
    window.localStorage.setItem(id, JSON.stringify(obj));
}

$('#start').on('click', function() { // start timer and display math problems
    if (!timer) {
        timer = setInterval(setTime, 1000);
    }

    $('#reset')
        .attr('disabled', false)
        .addClass('active');
    $('#start')
        .attr('disabled', true)
        .removeClass('active');
    $('#stop')
        .attr('disabled', false)
        .addClass('active');

    if ($('input#negative').prop('checked')) {
        negativeNumbers = true;
    }

    // get operation
    var operation = $('input[type=radio]').attr('id');
    
    // ** if negative == true, set math problem with possible negative numbers and answers

    if (started == false) { // if starting the math problems for the first time, generate the math problems. Otherwise, display the existing math problems.
        displayProblems(operation); // add new problems
        started = true;
    } else {
        $('div.table').css('display', 'block');
    }
});

$('#stop').on('click', function() { // stop timer and hide math problems
    if (timer) {
        clearInterval(timer);
        timer = null;
    }

    $('#reset')
        .attr('disabled', true)
        .removeClass('active');
    $('#start')
        .attr('disabled', false)
        .addClass('active');
    $('#stop')
        .attr('disabled', true)
        .removeClass('active');
    $('div.table').css('display', 'none');
});

$('#reset').on('click', function() { // reset timer and generate new math problems
    if (timer) {
        totalSeconds = 0;
        stop();
    }

    displayProblems(); // generate new problems
});

function setTime() { // display time elapsed
    totalSeconds++;
    $('#second').text(pad(totalSeconds % 60));
    $('#minute').text(pad(parseInt(totalSeconds / 60)));
    $('#hour').text(pad(parseInt(totalSeconds / 3600)));
}

function pad(val) { // add a leading zero to time in if the time is less than a double digit
    var valString = val + '';

    if (valString.length < 2) {
        return '0' + valString;
    } else {
        return valString;
    }
}

function displayProblems(operation) { // reset body bg and input.input colors, empty the div.table element from any previous math problems, and display a new set of math problems
    $('input.input').each(function() {
        $(this).css('backgroundColor', 'rgba(255, 255, 255, 1)');
    });
    $('div.table').empty(); // clear math problem element

    var inputCount = $('input#count').val() || $('input#count').attr('placeholder'); // grab the total number of math problems regardless if the user supplied a number or not

    generateProblems(parseInt(inputCount),parseInt($('input#largest').val()), operation, negativeNumbers);

    const localStorageId = operation + '-' + inputCount;
}

function isInt(value) { // returns if a number is whole (true) or includes a fraction (false)
    return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}

function generateNumber(num, negative) { // generate random number with supplied upper limit and if it is negative or not
    var number = Math.floor(Math.random() * num) + 1;

    if (negative) {
        if (Math.floor(Math.random() * 10) > 5) {
            number = number * -1;
        }
    }

    return number;
}

function generateProblems(num, largest, operation, negativeNumbers) { // generate a "table" of subtraction problems
    if (!num) {
        num = 20;
    }

    if (!largest) {
        largest = 20;
    }

    var output = '';

    for (var i = 0; i < num; i++) {
        var rndNumberBottom = 0;
        var rndNumberTop = 0;

        if (operation != 'division') { // set the largest number of top for addition, subtraction, and multiplication
            while(rndNumberBottom >= rndNumberTop) {
                rndNumberTop = generateNumber(largest, negativeNumbers);
                rndNumberBottom = generateNumber(largest, negativeNumbers);
            }
        } else { // ensure that the division problem doesn't have any remainders
            while (!isInt(rndNumberTop / rndNumberBottom)) {
                rndNumberTop = generateNumber(largest, negativeNumbers);
                rndNumberBottom = generateNumber(largest, negativeNumbers);
            }
        }

        if (i % 10 == 0) {
            output += '</div><div class="newGroup"><div class="block">';
        } else {
            output += '<div class="block">';
        }

        if (rndNumberTop < 10) {
            output += '<div class="top singleDigitTop"> ' + rndNumberTop + '</div>';
        } else {
            output += '<div class="top"> ' + rndNumberTop + '</div>';
        }

        var operationSymbol = '';
        var answer = 0;

        if (operation == 'subtraction') {
            operationSymbol = '-';
            answer = rndNumberTop - rndNumberBottom;
        } else if (operation == 'multiplication') {
            operationSymbol = 'x';
            answer = rndNumberTop * rndNumberBottom;
        } else if (operation == 'addition') {
            operationSymbol = '+';
            answer = rndNumberTop + rndNumberBottom;
        } else if (operation == 'division') {
            operationSymbol = '/';
            answer = rndNumberTop / rndNumberBottom;
        }

        if (rndNumberBottom < 10) {
            output += '<div class="bottom singleDigitBottom">' + operationSymbol + rndNumberBottom + '</div>';
        } else {
            output += '<div class="bottom">' + operationSymbol + rndNumberBottom + '</div>';
        }

        output += '<div class="answer"><input class="input" id="answer-' + i + '" answer="' + (answer) + '" type="number"></div></div>'
    }

    $('div.table').html(output); // render math problems and input elements
}