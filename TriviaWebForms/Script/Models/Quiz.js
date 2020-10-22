export default class Quiz {
    constructor(questions) {
        this.totalScore = 0;
        this.questions = questions;
        this.currentIndex = 0;
        this.answers = [];
    }
    isEnded() {
        return (this.currentIndex === this.questions.length);
    }

}