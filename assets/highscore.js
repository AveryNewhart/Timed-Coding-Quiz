const highScoreList = document.getElementById("highScoreList-HS")
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

highScoreList.innerHTML = highScores //creating the list and saying the content inside
    .map(score => {
    return `<li class="high-score">${score.name} = ${score.score}</li>`
    })
    .join('')


function clearHighScores() { // clears the highscores in local storage
    localStorage.clear();
}