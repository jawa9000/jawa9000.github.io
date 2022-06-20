var size = 0; // number of questions in quiz (used for scoring)
var score = 0; // final score
var answers = []; // answers supplied by player
var output = ''; // hold generated HTML to render the questions

const displayQuestion = async (s, target, delay) => { // function to "type out" the question with a time delay
    for (const c of s) {
        $(target).append(c);
        await sleep(delay);
    }
}

const sleep = (ms) => { // delay function
    return new Promise(resolve => setTimeout(resolve, ms));
}

for (key in questions) { // generate questions
    size = questions[key].number; // collect the question count to be used with calculating the final score

    var number = questions[key].number; // variable for the specific question id

    output += '<form class="questionForm" id="q' + number + '" data-question="' + number + '" question="' + key + '">'; // generate form
    output += '<p>Category: ' + questions[key].category + '</p>';
    output += '<h3 id="q' + number + '"></h3><ul>'; // generate question placeholder
    
    for (j in questions[key].answers) { // generate possible answers
        output += '<li><input type="radio" name="q' + number + '" value="' + j + '" />' + questions[key].answers[j] + '</li>';
    }

    output += '</ul><button type="submit" id="submit' + number + '" disabled>Submit</button></form>'; // generate submit button
}

$('header').html(questions.quizname); // display name of quiz
$('main').html(output); // render all questions in the document
$('span#total').html(size); // display the number of questions

$('document').ready(function() {
    $('.questionForm').hide(); // hide all questions

    $('#q1').show(); // show the first question
    displayQuestion(questions.question1.number + '. ' + questions.question1.question, 'h3#q1', 100);

    $('input[type=radio]').on('click', function() { // grab user's answer and enable the next question
        var number = parseInt($(this).attr('name').substring($(this).attr('name').length - 1)); // get question number
        var value = $(this).val(); // get the answer of the clicked radio button

        answers[number - 1] = value; // assign answer to the answers array and allow overwriting of previously clicked answer before submitting
        
        $('button#submit' + number).attr('disabled', false); // enable submit button
    });

    $('button[id^="submit"]').on('click', function(e) {
        e.preventDefault();

        var next = parseInt(parseInt($(this).attr('id').substring(6, $(this).attr('id').length)) + 1); // get the id for the next question

        if (next > size) { // if there are no more questions, figure out scoring
            $('.questionForm').hide(); // hide all questions

            var correctAnswers = [];

            for (key in questions) { // push all correct answers to an array for comparison
                correctAnswers.push(questions[key].correct);
            }

            for (i in correctAnswers) { // check supplied answers to correct answers
                if (correctAnswers[i] == answers[i]) {
                    score++;
                }
            }

            $('span#correct').html('Correct answers: ' + score + ' (' + (score / size).toFixed(2) * 100 + '%)'); // display score           
        } else { // show next question
            $('.questionForm').hide(); // hide all questions
            $('#q' + next).show(); // show the next question

            for (key in questions) { // generate next question
                if (questions[key].number == next) {
                    var question = questions[key].number + '. ' + questions[key].question
                    break;
                }
            }
            
            displayQuestion(question, 'h3#q' + next, 100); // display question by typing out each character after a 100 millisecond delay
        }
    });
});
