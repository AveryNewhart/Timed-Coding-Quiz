const highScoreList = document.getElementById("highScoreList-HS")
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

highScoreList.innerHTML = highScores
    .map(score => {
    return `<li class="high-score">${score.name} = ${score.score}</li>`
    })
    .join('')


function clearHighScores() {
    localStorage.clear();
}