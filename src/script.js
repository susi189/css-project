const html = document.querySelector("html");
const section = document.querySelector("section");
const header = document.querySelector(".header");
const title = document.querySelector(".title");
const round = document.querySelector(".rounds");
const main = document.querySelector(".main");
const items = document.querySelectorAll(".item");
const rounds = document.querySelector(".rounds");
const score = document.querySelector(".score");
const selectedItem = main.querySelectorAll(".item-c");
const restart = document.querySelector(".restart");

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
  if (
    (playerSelection === "rock" && computerPlay === "paper") ||
    (playerSelection === "paper" && computerPlay === "scissors") ||
    (playerSelection === "scissors" && computerPlay === "rock")
  ) {
    computerScore++;
    // title.innerText = "Sorry, not this time";
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
    // title.innerText = "Score for you!";
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
    // title.innerText = "Tie!";
  }
  roundCount++;
  rounds.innerText = "Round: " + roundCount;
  score.innerText = playerScore + ":" + computerScore;
}

function endOfGame() {
  header.appendChild(title);
  if (playerScore > computerScore) {
    title.innerText = "You are the winner!";
    title.classList.add("winner");
  } else if (playerScore === computerScore) {
    title.innerText = "No winner for this game";
  } else {
    title.innerText = "You lost the game";
  }
}

function removeAllClasses() {
  items.forEach((e) => {
    e.classList.remove("selected", "won");
  });
  selectedItem.forEach((e) => e.classList.remove("selected", "won"));
}

function handleClick(event) {
  if (roundCount === 0) {
    header.removeChild(title);
  }
  if (roundCount === 10) {
    section.removeChild(main);
    header.removeChild(round);
    return endOfGame();
  } else {
    removeAllClasses();

    let clickedItem = event.path[1];
    console.log(event);
    clickedItem.classList.add("selected");

    play(clickedItem.id, computerPlay());
  }
}

items.forEach((i) => {
  i.addEventListener("click", handleClick);
});

restart.addEventListener("click", () => {
  location.reload();
});
