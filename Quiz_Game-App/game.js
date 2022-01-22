const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What is 5 + 3 ?",
        choice1: "2",
        choice2: "4",
        choice3: "8",
        choice4: "10",
        answer: 3
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<p>",
        choice3: "<body>",
        choice4: "html",
        answer: 1

    },
    {
        question: "Which type of language is JavaScript?",
        choice1: "Object-Oriented",
        choice2: "Object-based",
        choice3: "Assembly-Language",
        choice4: "High-Level",
        answer: 2
    },

    {
        question: "Which one of the following also known as Conditional Expression:",
        choice1: "Alternative to if-else",
        choice2: "Switch statement",
        choice3: "If-then-else statement",
        choice4: "immediate if",
        answer: 4
    }
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS =4;

//Game Start Here
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

//Get Questions
getNewQuestion = function(){
    if(availableQuestions.length ===0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('/end.html');
    }

    //progress Part - Question count
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    // console.log(progressText);
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    //Choose the answer
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice'+number];
    });

    //Remove the Chosen question
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

//Check Answer correct or not
choices.forEach(choice => {
    choice.addEventListener('click', (e) => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        console.log(selectedChoice,selectedAnswer);

        //apply in css
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS);
        }
        selectedChoice.parentElement.classList.add(classToApply);

        //remove from css
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },1000);      
    });
});

//Increment the Score
incrementScore = function(num){
    score += num;
    scoreText.innerText = score;
}

//Instintiate the Game
startGame();