// var browserSync = require("browser-sync").create();
// browserSync.init({
//   watch: true,
//   server: "./css-project",
// });

const elem = ["rock", "paper", "scissors"];
const computerPlay = function () {
  let randomIndex = Math.floor(Math.random() * Math.floor(elem.length));
  return elem[randomIndex];
};

let playerScore = 0;
let computerScore = 0;

function playRound(playerSelection, computerPlay) {
  if (
    (playerSelection === "rock" && computerPlay === "paper") ||
    (playerSelection === "paper" && computerPlay === "scissors") ||
    (playerSelection === "scissors" && computerPlay === "rock")
  ) {
    computerScore++;
    message.textContent =
      "Sorry, no luck this time! " +
      computerPlay[0].toUpperCase() +
      computerPlay.slice(1) +
      " beats " +
      playerSelection[0].toUpperCase() +
      playerSelection.slice(1) +
      ". Try again!";
    return message;
  } else if (
    (playerSelection === "paper" && computerPlay === "rock") ||
    (playerSelection === "scissors" && computerPlay === "paper") ||
    (playerSelection === "rock" && computerPlay === "scissors")
  ) {
    playerScore++;
    message.textContent =
      "You win this round! " +
      playerSelection[0].toUpperCase() +
      playerSelection.slice(1) +
      " beats " +
      computerPlay[0].toUpperCase() +
      computerPlay.slice(1) +
      ". Next round!";
    return message;
  } else if (
    (playerSelection === "paper" && computerPlay === "paper") ||
    (playerSelection === "scissors" && computerPlay === "scissors") ||
    (playerSelection === "rock" && computerPlay === "rock")
  ) {
    message.textContent = "Even! Try again.";
    return message;
  }
}

// const paperButton = document.getElementById('btn-paper');

// paperButton.addEventListener('click', () => {
//     playRound('paper', computerPlay());
// });

const body = document.querySelector("body");
const section = document.querySelector("section");

const selectionButtons = document.querySelectorAll("button");

const message = document.createElement("div");
message.classList.add("message");

const score = document.createElement("div");
score.id = "score";

const finalResult = document.createElement("div");
finalResult.classList.add("finalResult");

const image = document.createElement("div");
image.id = "imageSection";

const congratsImage = document.createElement("IMG");
congratsImage.id = "congratsImage";
congratsImage.setAttribute("src", "giphy.gif");
congratsImage.setAttribute("width", "304");
congratsImage.setAttribute("height", "228");
congratsImage.setAttribute("alt", "The Flower Dance");

const sorryImage = document.createElement("IMG");
sorryImage.id = "congratsImage";
sorryImage.setAttribute("src", "giphy-sad.gif");
sorryImage.setAttribute("width", "304");
sorryImage.setAttribute("height", "250");
sorryImage.setAttribute("alt", "Maybe next time");

const reloadButton = document.createElement("button");
reloadButton.id = "reloadButton";
reloadButton.textContent = "Start a new game";

reloadButton.addEventListener("click", () => {
  location.reload();
});

selectionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    playRound(button.id, computerPlay());
    score.textContent = "You: " + playerScore + " Computer: " + computerScore;
    if (playerScore == 5 || computerScore == 5) {
      body.removeChild(section);
      if (playerScore > computerScore) {
        finalResult.textContent = "Congratulations!";
        image.appendChild(congratsImage);
      } else {
        finalResult.textContent = "Sorry, try your luck next time!";
        image.appendChild(sorryImage);
      }
      body.appendChild(image);
      body.appendChild(reloadButton);
    }
  });
  section.appendChild(message);
  section.appendChild(score);
});

body.appendChild(finalResult);
