const rock = document.querySelector(".rock");
const paper = document.querySelector(".paper");
const scissors = document.querySelector(".scissors");
const gameEl = document.querySelector(".game");
const scoreEl = document.querySelector(".score");
const resetEl = document.querySelector(".reset");
const resultEl = document.querySelector(".result");
const autoplayEl = document.querySelector(".autoplay");
resetEl.addEventListener("click", () => {
    updateScore();
    score.wins = 0;
    score.losses = 0;
    score.tie = 0;
    localStorage.removeItem("score");
});

const score = JSON.parse(localStorage.getItem("score")) || {
    wins: 0,
    losses: 0,
    tie: 0
};
/* here you have to set a default value for score when it is null
if it is not done it will always show an error because reset button has been used to remove score on localStorage
  if(score === null){
    score{
      wins: 0,
      losses: 0,
      tie: 0
    }
  }
*/


rock.addEventListener("click", () => {
    playGame("rock");
});

paper.addEventListener("click", () => {
    playGame("paper");
});

scissors.addEventListener("click", () => {
    playGame("scissors");
})



const gameTactics = () => {
    const gameRule = Math.random();

    let computerMove = "";
    if (gameRule < 1 / 3) {
        computerMove = "rock";
    } else if (gameRule > 1 / 3 && gameRule < 2 / 3) {
        computerMove = "paper";
    } else if (gameRule > 2 / 3 && gameRule < 1) {
        computerMove = "scissors";
    }
    return computerMove;
};
gameTactics();

function playGame(playerMove) {
    const computerMove = gameTactics();
    let result = "";

    if (playerMove === "rock") {
        if (computerMove === "scissors") {
            result += "You Win";
        } else if (computerMove === "paper") {
            result += "You Lose";
        } else if (computerMove === "rock") {
            result += "Tie";
        }
    } else if (playerMove === "paper") {
        if (computerMove === "scissors") {
            result += "You Lose";
        } else if (computerMove === "paper") {
            result += "Tie";
        } else if (computerMove === "rock") {
            result += "You Win";
        }
    } else if (playerMove === "scissors") {
        if (computerMove === "scissors") {
            result += "Tie";
        } else if (computerMove === "paper") {
            result += "You Win";
        } else if (computerMove === "rock") {
            result += "You Lose";
        }
    };


    if (result === "You Win") {
        score.wins++;
    } else if (result === "You Lose") {
        score.losses++;
    } else if (result === "Tie") {
        score.tie++;
    }
    updateScore();
    gameEl.innerHTML = `Computer Picked: <img src="/images/${computerMove}.png" alt="" /> You Picked: <img src="/images/${playerMove}.png" alt="" />`;

    resultEl.innerHTML = `${result}`;

    localStorage.setItem("score", JSON.stringify(score));
    return result;
};

function updateScore() {
    scoreEl.innerHTML = `score: Wins: ${score.wins} Loses: ${score.losses} Ties: ${score.tie} `;
};

/* for autoplay*/
let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = gameTactics();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    } else {
        isAutoPlaying = false;
        clearInterval(intervalId);
    }
}

autoplayEl.addEventListener("click", () => {
    autoPlay();
})