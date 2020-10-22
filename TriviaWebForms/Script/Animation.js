export default class Animation {

    // Pulse Button Animation
    static pulseBtn() {
        const buttons = document.getElementsByClassName('choiceBtn');
        Array.from(buttons).forEach(btn => {
            btn.addEventListener('mouseover', () => {
                btn.classList.add('pulse')
            })

        });
        Array.from(buttons).forEach(btn => {
            btn.addEventListener('mouseout', () => {
                btn.classList.remove('pulse')
            })

        });
    }
    // Hides Form & Reveals Quiz
    static startQuiz() {
        const quizGrid = document.getElementById('quiz-grid');
        quizGrid.classList.add('fadeOutRight');
        setTimeout(() => {
            document.getElementById('trivia-form').classList.add('hide');
            document.getElementById('trivia-container').classList.remove('hide');
            quizGrid.classList.add('fadeInLeft');
            quizGrid.classList.remove('fadeOutRight');
            quizGrid.classList.remove('fadeInDown');
        }, 350);
    }
    // Next Page
    static nextPageAnimation() {
        const quizGrid = document.getElementById('quiz-grid');
        quizGrid.classList.remove('fadeInLeft');
        quizGrid.classList.add('rollOut');
        setTimeout(function () {
            quizGrid.classList.remove('rollOut');
            quizGrid.classList.add('rollIn');
            setTimeout(() => { quizGrid.classList.remove('rollIn'); }, 1000);
        }, 350);
    }
    // Previous Page
    static prevPageAnimation() {
        const quizGrid = document.getElementById('quiz-grid');
        quizGrid.classList.add('zoomOutUp');
        setTimeout(() => {
            quizGrid.classList.remove('zoomOutUp');
            quizGrid.classList.add('zoomInDown');
            setTimeout(() => { quizGrid.classList.remove('zoomInDown'); }, 1000);
        }, 350);
    }
}