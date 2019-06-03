 let questionNumber = 0;
let score = 0;

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
        <form class="form"> 
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
        }
    else {
        quizComplete();
        $('.updateQuestion').text(10);
    };
}

//increment questionNumber each time user presses 'submit'
function incrementQuestionNumber() {
    if(questionNumber < STORE.length) {
        questionNumber++;
    }
}

//render question in DOM
function renderQuestion() {
    $('.questionAnswerForm').html(generateQuestion());
}

//user presses 'submit', feedback is presented 
function clickSubmit () {
    $(document).on('submit', '.form', function(event) {
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
    updateScoreNumber();
    return `That\'s right! Nice job! <br>
    <button type="submit" class= "nextButton">Next</button>`;
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

// update score
function updateScoreNumber() {
    $('.updateScore').text(score+1);
    score++;
}

//update question number
function updateQuestionNumber() {
    $('.updateQuestion').text(questionNumber+1);
}


//end of quiz - total is displayed
//if they receive greater than 80%, pass
//if they receive less than 80%, fail
function quizComplete() {
    if (score >= 8) {
        $('.questionAnswerForm').html(`<h3>Congratulations! You passed! <br>
        You received a score of ${score}/10. You're ready to head to the crag!<br>
        <button class="retakeButton" type="submit">Try Again</button>`);
    }
    else if (score < 8) {
        $('.questionAnswerForm').html(`<h3>You scored a ${score}/10. <br>
        Please try again before heading to the crag.</h3><br>
        <button class="retakeButton" type="submit">Try Again</button>`);
    }
}

//on click of 'try again' button, the whole quiz is regenerated 
function retakeQuiz() {
    $(document).on('click', '.retakeButton', function(event) {
        location.reload();
    })
}


// //place all functions here that runs quiz
function createQuiz() {
    removeButtonAndTitle();
    clickSubmit();
    clickNext()
}

$(createQuiz);



//need to make sure that the number counter stops at 10 - went to 11 on last page
//need to press try again and re-load page 

