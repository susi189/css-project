const section = document.querySelector("section");
const header = document.querySelector(".header");
const title = document.querySelector(".title");
const round = document.querySelector(".rounds");
const game = document.querySelector(".main");
const items = document.querySelectorAll(".item");
const rounds = document.querySelector(".rounds");
const score = document.querySelector(".score");
const selectedItem = game.querySelectorAll(".item-c");

const computerPlay = function () {
  const elem = ["rock", "paper", "scissors"];
  let randomIndex = Math.floor(Math.random() * Math.floor(elem.length));
  selectedItem.forEach((e) => {
    if (e.id === elem[randomIndex]) {
      e.classList.add("selected");
    }
  });
  return elem[randomIndex];
};

let playerScore = 0;
let computerScore = 0;
let roundCount = 0;

function play(playerSelection, computerPlay) {
  if (roundCount < 10) {
    if (
      (playerSelection === "rock" && computerPlay === "paper") ||
      (playerSelection === "paper" && computerPlay === "scissors") ||
      (playerSelection === "scissors" && computerPlay === "rock")
    ) {
      computerScore++;
      title.innerText = "Score for the computer";
      selectedItem.forEach((e) => {
        if (e.classList.contains("selected")) {
          e.classList.add("won");
        }
      });
    } else if (
      (playerSelection === "paper" && computerPlay === "rock") ||
      (playerSelection === "scissors" && computerPlay === "paper") ||
      (playerSelection === "rock" && computerPlay === "scissors")
    ) {
      playerScore++;
      title.innerText = "Score for you!";
      items.forEach((e) => {
        if (e.classList.contains("selected")) {
          e.classList.add("won");
        }
      });
    } else if (
      (playerSelection === "paper" && computerPlay === "paper") ||
      (playerSelection === "scissors" && computerPlay === "scissors") ||
      (playerSelection === "rock" && computerPlay === "rock")
    ) {
      title.innerText = "Tie!";
    }
    roundCount++;
    rounds.innerText = "Round: " + roundCount;
    score.innerText = playerScore + ":" + computerScore;
  }
}

function endOfGame() {
  if (playerScore > computerScore) {
    title.innerText = "You are the winner!";
  } else {
    title.innerText = "Sorry, no luck this time";
  }
}

items.forEach((item) => {
  item.addEventListener("click", (event) => {
    //remove class selected from other items
    items.forEach((e) => e.classList.remove("selected", "won"));
    selectedItem.forEach((e) => e.classList.remove("selected", "won"));
    //add class selected to the selected item
    item.classList.add("selected");
    play(event.target.alt, computerPlay());
    if (roundCount === 10) {
      endOfGame();
      items.forEach((e) => e.removeEventListener());
      // setTimeout(() => {
      //   item.removeEventListener();
      // }, 500);
    }
  });
});
