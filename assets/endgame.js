const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const endScore = document.getElementById('endScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

//getting the score which is the time remaining
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

endScore.innerText = mostRecentScore;

//can not press save unless content in box
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('./highscore.html');
};