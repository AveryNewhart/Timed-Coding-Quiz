// selecting all of the elements
const viewScore = document.getElementById("score-link")
const mainQuizContainer = document.getElementById("quiz");
const startButton = document.getElementById("startQuiz");
const submitScreen = document.getElementById("submit-screen");
const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer-btns");
const nextBtn = document.getElementById("nxt-btn");
const timer = document.getElementById("timer");
const highScore = document.getElementById("highScoreList");
const highScoreItem = document.getElementById("highScoreItem");
const scoreText = document.getElementsByClassName("score")
const mainCard = document.getElementById("main-div-card");

let score = 0; 

let shuffledQuestions, currentQuestionNum; //let allows them to be redefined later

// Creating the questions
const questions = [
    {
        question : "What would you put BEFORE xxx.js to link it into the HTML file?",
        answers : [
            {text: '<script src=', correct: true},
            {text: '<script name=', correct: false},
            {text: '<script href=', correct: false},
            {text: '<script file=', correct: false},
        ]
    },
    {
        question : "How do you create a function in JavaScript?",
        answers : [
            {text: 'function = myFunction()', correct: false},
            {text: 'function:myFunction()', correct: false},
            {text: 'function myFucntion()', correct: true},
            {text: 'function - myFunction()', correct: false},
        ]
    },
    {
        question : "How do you comment in JavaScript?",
        answers : [
            {text: '#This is my comment#', correct: false},
            {text: '*This is my comment*', correct: false},
            {text: '<!--This is my comment-->', correct: false},
            {text: '//This is my comment', correct: true},
        ]
    },
    {
        question : "When a button is clicked on, what event handler is invoked?",
        answers : [
            {text: 'onSubmit()', correct: false},
            {text: 'onClick()', correct: true},
            {text: 'onPress()', correct: false},
            {text: 'onHover()', correct: false},
        ]
    },
];


function startTest () { // what happens when you click the start button
    console.log("started")
    startButton.classList.add('hide');
    mainQuizContainer.classList.remove('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5); // completly random array
    currentQuestionNum = 0; // starts questions at 0
    setNextQuestion()
}

function setNextQuestion () { // setting the next question function
    resetState() // resets everything back to default state everytime a new question is set.
    showQuestion(shuffledQuestions[currentQuestionNum]) //shows the next question and selects it randomly.
}

function showQuestion(question) { // selects the question insidde the array of questions
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button') // creating button element
        button.innerText = answer.text
        button.classList.add('btn') // add button class
        if (answer.correct) {
            button.dataset.correct = answer.correct // adds data attribute
        }
        button.addEventListener('click', selectAnswer) // allows us to add the selectAnswer function as a parameter
        answerElement.appendChild(button) // allows us to append the button we just created
    })
}

function resetState () {
    nextBtn.classList.add('hide')
    while (answerElement.firstChild) { //selects the answer element and removes them.
        answerElement.removeChild(answerElement.firstChild)
    }
}

function selectAnswer (e) {
    const selectedButton = e.target // targeting whichever button we click on.
    const correct = selectedButton.dataset.correct // checking if it is correct.
    setStatusClass(document.body, correct)
    Array.from(answerElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })  // creating array from answerElement, setting the status with the setStatusClass function, and checks if the button is correct.
    if (shuffledQuestions.length > currentQuestionNum + 1) { // have more questions than the one you are currently on.
        nextBtn.classList.remove("hide");
    } else {
        submitScreen.innerText = "To submit page"
        submitScreen.classList.remove('hide')
        stopTimer();
        score = time;
        localStorage.setItem("mostRecentScore", score);
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element) //making new function and taking the element that we clearned on.
    if (correct) {
        element.classList.add('correct') // if this is correct, we want to add the correct class.
        setTimeout(hideResultText, 1000);
    } else {
        element.classList.add('wrong') // if wrong, it will add the wrong class.
        setTimeout(hideResultText, 1000);
        if ('wrong') {
            time = time - 1;
            displayCount();
        }
    }
}

function displayCount() { // displays the current time
    timer.textContent = time;
} 

function hideResultText () {
    display = "none";
}


function clearStatusClass(element) { // removes styling when going to next question.
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function appearHighScores() { //removes the hidden attribute on highScore
    highScore.removeAttribute("hidden");
}

// event listeners
startButton.addEventListener('click', startTest)
nextBtn.addEventListener('click', () => {
    currentQuestionNum++
    setNextQuestion()
})
viewScore.addEventListener('click', appearHighScores)

//Setting the time
var time = 60;
    var timeIntervalUp;

    function startTimer() {
        timeIntervalUp = setInterval(function(){countTimer()}, 1000);
    }

    function countTimer() {
        document.getElementById("timer").innerHTML = "Time Left: " + time;
        time--;

        if (time == 0) {
            clearInterval(timeIntervalUp);
            endTimer();
        }
    }

    function endTimer() {
        document.getElementById("timer").innerHTML = "Times up!";
    }

    //stopping the timer
    function stopTimer() {
        clearInterval(timeIntervalUp);
        document.getElementById("timer").innerHTML = "Final Score: " + time;
    }
