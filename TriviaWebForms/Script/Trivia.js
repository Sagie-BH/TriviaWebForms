import Quiz from './Models/Quiz.js';
import QuestionObj from './Models/Question.js';
import Animation from './Animation.js?';

const btnGrid = document.getElementById('btn-grid');
const progress = document.getElementById('progress');
const elementQuestion = document.getElementById('question');
const choiceButtons = document.getElementsByClassName('choiceBtn');
const sendBackBtn = document.getElementById('sendBackBtn');

document.getElementById('goNext').addEventListener('click', goToNextQuestion);
document.getElementById('goBack').addEventListener('click', goToPrevQeustion);

sendBackBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.replace('Login.aspx')
})
// Quiz Object
let quiz = new Quiz();

// Dom Loaded Event
document.addEventListener("DOMContentLoaded", () => {
    let storedQuiz = JSON.parse(sessionStorage.getItem('quiz'))
    if (document.cookie == null || document.cookie == '') {
        document.getElementById('trivia-form').classList.add('hide');
        document.getElementById('sendBack').classList.remove('hide');

    }
    // Displaying Last Chosen Quiz
    else if (storedQuiz != null) {
        quiz = storedQuiz;
        Animation.startQuiz();
        populateQuiz();
    }
});


// Fetch Category list from Trivia Api
const fetchCategories = async () => {
    const res = await fetch('https://opentdb.com/api_category.php');
    const data = await res.json();
    //console.log(data);
    const categoryDropDown = document.getElementById('trivia-category');
    data['trivia_categories'].forEach(category => {
        let categoryOption = new Option(category.name, category.id)
        categoryDropDown.appendChild(categoryOption);
    })
}
fetchCategories();

// Fetching quiz from API - Fixing URL - Creating quiz according to values   =>  Returns Quiz 
const fetchTrivia = async (amount, selectedCategory, selectedDifficulty, selectedType) => {
    let apiCategory = '&category=';
    if (selectedCategory == 'any') {
        apiCategory = '';
        selectedCategory = '';
    }
    let apiDifficulty = '&difficulty=';
    if (selectedDifficulty == 'any') {
        apiDifficulty = '';
        selectedDifficulty = '';
    }
    let apiType = '&type=';
    if (selectedType == 'any') {
        apiType = '';
        selectedType = '';
    }

    const res = await fetch(`https://opentdb.com/api.php?amount=${amount}${apiCategory}${selectedCategory}${apiDifficulty}${selectedDifficulty}${apiType}${selectedType}`);
    const data = await res.json();
    let triviaQArray = [];
    let triviaQuiz = {};
    data.results.forEach(fetchedQuestionObj => {
        let triviaQ = new QuestionObj();
        triviaQ.answer = fetchedQuestionObj['correct_answer'];
        triviaQ.choices = fetchedQuestionObj['incorrect_answers'];
        triviaQ.choices.push(fetchedQuestionObj['correct_answer']);
        triviaQ.text = fetchedQuestionObj['question'];
        triviaQArray.push(triviaQ);
    })
    triviaQuiz = new Quiz(triviaQArray);
    return triviaQuiz;
}

// Creating quiz according to user selected values   =>  Returns Quiz 
const getQuizByOptions = async () => {
    const amount = document.getElementById('trivia-amount').value;
    const categoryElement = document.getElementById('trivia-category');
    const category = categoryElement[categoryElement.selectedIndex].value;
    const difficultyElement = document.getElementById('trivia-difficulty');
    const difficulty = difficultyElement[difficultyElement.selectedIndex].value;
    const typeElement = document.getElementById('trivia-type');
    const type = typeElement[typeElement.selectedIndex].value;

    const quiz = await fetchTrivia(amount, category, difficulty, type);
    console.log(quiz);
    return quiz;
}

// Start Btn Click Event
document.getElementById('startBtn').addEventListener('click', async (e) => {
    e.preventDefault();
    quiz = await getQuizByOptions();
    Animation.startQuiz();
    populateQuiz();
    sessionStorage.setItem('quiz', JSON.stringify(quiz));
});

// Populate questions and choices
const setQuestionDisplay = (question) => {
    elementQuestion.innerHTML = `${question.text}`;
    document.getElementById('answer').innerHTML = question.guess;
    createAnswerButtons(question);
    guessClickEvent(question);
    Animation.pulseBtn();
}

// Populating Quiz
const populateQuiz = () => {
    // Every day I'm Shuffling :)
    quiz.questions.sort(() => Math.random() - 0.5);
    let question = quiz.questions[0];
    setQuestionDisplay(question);
    setProgress(quiz);
    setTimeout(() => { document.getElementById('goBack').classList.add('hide') }, 150);;
}

// Dynamicly creating the Btn Grid buttons with Question object 
const createAnswerButtons = (question) => {
    btnGrid.innerHTML = '';
    let shuffledChoices = question.choices.sort(() => Math.random() - 0.5);
    shuffledChoices.forEach((choice, i) => {
        if (choice == question.guess) {
            btnGrid.innerHTML +=
                `<button class="choiceBtn animated guessed" id="btn${i}"><span>${choice}</span></button>`;
        }
        else {
            btnGrid.innerHTML +=
                `<button class="choiceBtn animated" id="btn${i}"><span>${choice}</span></button>`;
        }
    });
}

// Answering a question event
const guessClickEvent = (question) => {
    Array.from(choiceButtons).forEach(choiceBtn => choiceBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Clears previous guess
        if (question.guess != '') {
            Array.from(choiceButtons).forEach(choiceBtn => {
                choiceBtn.classList.remove('guessed');
            })
        }
        question.guess = choiceBtn.firstElementChild.innerHTML;
        document.getElementById('answer').innerHTML = question.guess;
        choiceBtn.classList.add('guessed')
        if (choiceBtn.firstElementChild.innerHTML === question.answer) {
            console.log('yipi');

        } else {
            console.log('oh-no');
        }
        Animation.pulseBtn();
        setProgress();
    }))
}

// Next Question
function goToNextQuestion() {
    if (quiz.currentIndex == quiz.questions.length - 2) {
        quiz.currentIndex++;
        Animation.nextPageAnimation();
        document.getElementById('goNext').innerText = 'Finish'
        setTimeout(() => { setQuestionDisplay(quiz.questions[quiz.currentIndex]) }, 350);
    }
    else if (quiz.currentIndex < quiz.questions.length - 1) {
        quiz.currentIndex++;
        Animation.nextPageAnimation();
        setTimeout(() => { setQuestionDisplay(quiz.questions[quiz.currentIndex]) }, 350);
    }
    else {
        // Final Page
        document.getElementById('trivia-container').classList.add('hide');
        getQuizFinalScore(quiz);
        document.getElementById('final-grid').innerHTML = `<label id='trivia-score'>Your Score Is:</label>
                                                            <label id='score-point'>${quiz.totalScore}</label> <hr />`;
        quiz.currentIndex++;
    }
    if (quiz.questions[quiz.currentIndex] === 0) {
        document.getElementById('goBack').classList.add('hide');
    }
    else {
        setTimeout(() => { document.getElementById('goBack').classList.remove('hide'); }, 350);
    }
    console.log(quiz.currentIndex);
}

// Previous Question
function goToPrevQeustion() {
    document.getElementById('goNext').classList.remove('hide');
    if (quiz.currentIndex === 1) {
        setTimeout(() => { document.getElementById('goBack').classList.add('hide'); }, 350);
    }
    if (quiz.currentIndex == quiz.questions.length) {
        document.getElementById('goNext').innerText = 'Next';
    }
    if (quiz.currentIndex > 0) {
        Animation.prevPageAnimation();
        quiz.currentIndex--;
        setTimeout(() => { setQuestionDisplay(quiz.questions[quiz.currentIndex]) }, 350);
    }
    console.log(quiz.currentIndex);
}

// Progress Bar
const setProgress = () => {
    let guesses = 0;
    quiz.questions.forEach(question => {
        if (question.guess != '') {
            guesses++;
        }
    })
    progress.innerHTML = `${guesses} / ${quiz.questions.length}`
}

// Sets Final Quiz Score
const getQuizFinalScore = () => {
    quiz.questions.forEach(question => {
        if (question.guess == question.answer) {
            quiz.totalScore += (100 / quiz.questions.length);
        }
    });
    quiz.totalScore = Math.round(quiz.totalScore);
    postScore(quiz.totalScore);
    localStorage.removeItem('quiz');
}

// Posting score with Ajax - XMLHttpRequest
const postScore = (score) => {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/ScoreHandler.ashx', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = () => {
        console.log(this.responseText);
    }
    xhr.send(score);
}

// Posting Score To Server With Axios - (check In masterpage if disabled)
//const postScore = () => {
//    axios({
//        method: 'post',
//        url: '/ScoreHandler.ashx',
//        contentType: 'application/json; charset=utf-8',
//        data: {
//            score: '70',
//        }
//    });
//}


