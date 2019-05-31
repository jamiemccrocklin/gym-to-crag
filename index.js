 let questionNumber = 0;
// let score = 0;

//when user presses 'Let's find out' button, button and title are removed from page and generateQuestion function
//is ran
function removeButtonAndTitle() {
    $('.findOutButton').on('click', function(event) {
        event.preventDefault();
        $('.findOutButton').remove();
        $('.titleQ').remove();
        renderQuestion();
        updateQuestionNumber();
    });
}

// generate question
function generateQuestion() {
    if (questionNumber < STORE.length) {
    return `<div class="question_${questionNumber}">
    <h2>${STORE[questionNumber].question}</h2>
    <form> 
    <fieldset>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
            <span> ${STORE[questionNumber].answers[0]} </span>  
        </label><br>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer">
            <span> ${STORE[questionNumber].answers[1]} </span>  
        </label><br>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer">
            <span> ${STORE[questionNumber].answers[2]} </span>  
        </label><br>
        <label class="answerOption">
        <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer">
            <span> ${STORE[questionNumber].answers[3]} </span>  
        </label><br>
        <button type="submit" class="submitButton">Submit</button>
        </fieldset>
    </form>
    </div>`
    };
}

//increment questionNumber each time user presses 'submit'
function incrementQuestionNumber() {
    questionNumber++;
}

//render question in DOM
function renderQuestion() {
    $('.questionAnswerForm').html(generateQuestion());
}

//user presses 'submit', feedback is presented 
function clickSubmit () {
    $(document).on('click', '.submitButton', function(event) {
        event.preventDefault();
        let checked = $('input:checked');
        let answer = checked.val();
        let correctAnswer = STORE[questionNumber].correctAnswer;
        if (answer === correctAnswer) {
            $('.questionAnswerForm').html(answerCorrect());
        }
        else {
            $('.questionAnswerForm').html(answerIncorrect());
        }
    incrementQuestionNumber();
    });
}

//if answer is correct, present this feedback
function answerCorrect() {
    return `That\'s right! Nice job! <br>
    <button type="submit" class= "nextButton">Next</button>`
}
//if answer is incorrect, present this feedback
function answerIncorrect() {
    return `Sorry, that\'s incorrect. The correct answer was: <br> "${STORE[questionNumber].correctAnswer}" <br>
    <button type="submit" class= "nextButton">Next</button>`
    
}

//user presses 'next', generates next question 
function clickNext() {
    $(document).on('click', '.nextButton', function(event) {
        generateQuestion();
        renderQuestion();
        updateQuestionNumber();
    })
}

// // update score
// function updateScoreNumber() {

// }

//update question number
function updateQuestionNumber() {
    console.log('updateQuestionNumber running');
    $('.updateQuestion').text(questionNumber+1);
}



// //after the 10th and final question, the total is displayed to the user. 
// //if the user gets 80% or beter one message, if less than 80% a different message is presented 
// //generate message for less than 80%
// function fail() {

// }

// //generate message for more than 80%
// function pass() {

// }
// //on click of 're-take' button, the whole quiz is regenerated 
// function retakeQuiz() {

// }
// //place all functions here that runs quiz

function createQuiz() {
    removeButtonAndTitle();
    clickSubmit();
    clickNext()
}

$(createQuiz);




