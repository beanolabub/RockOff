/*

ouline:
declare QS constants

class result
  constructors
  check storage
  decideResult function
  resultmessage function
  call decideResult function
  Timers to change bg colour

click event listener
if target is an img inside tag
add suspense message
get id of your chosen img
select random image
delay function
  call class
Call class to set leaderboard
*/

const listOfImages = document.querySelector(".listOfImages");
const usChoice = document.querySelector("#usChoice");
const themChoice = document.querySelector("#themChoice");
themChoice.src = "./src/img/blank.svg";
const choices = document.querySelector(".choices");
const message = document.querySelector("#message");
const showScores = document.querySelector("#showScores");
const us = document.querySelector("#us");
const them = document.querySelector("#them");
const round = document.querySelector("#round");

class Result {
  constructor(user, opponent) {
    this.user = user;
    this.opponent = opponent;
  }

  decideResult(user, opponent) {
    if (user == opponent) {
      return 0;
    } else {
      if (user == 1 && opponent == 2) return -1;
      if (user == 1 && opponent == 3) return 1;
      if (user == 2 && opponent == 1) return 1;
      if (user == 2 && opponent == 3) return -1;
      if (user == 3 && opponent == 1) return -1;
      if (user == 3 && opponent == 2) return 1;
    }
  }
  checkStorage() {
    if (localStorage.getItem("scores") === null) {
      const newScores = {
        yourScore: 0,
        opponentScore: 0,
        count: 0,
      };
      localStorage.setItem("scores", JSON.stringify(newScores));
    }
  }
  showResult() {
    this.checkStorage();
    const scores = JSON.parse(localStorage.getItem("scores"));
    let yourScoreVar = scores.yourScore;
    let opponentScoreVar = scores.opponentScore;
    let count = scores.count;
    us.innerHTML = " Us: " + yourScoreVar;
    them.innerHTML = " Them: " + opponentScoreVar;
    round.innerHTML = " Round: " + count;
  }
  storeResult(score) {
    const scores = JSON.parse(localStorage.getItem("scores"));
    let yourScoreVar = scores.yourScore;
    let opponentScoreVar = scores.opponentScore;
    let count = scores.count;
    if (score == 1) yourScoreVar++;
    if (score == -1) opponentScoreVar++;
    count++;
    const newScores = {
      yourScore: yourScoreVar,
      opponentScore: opponentScoreVar,
      count: count,
    };
    localStorage.setItem("scores", JSON.stringify(newScores));
    this.showResult();
  }
  scoreMessage(score) {
    let scoreMessage = "";
    if (score == 0) {
      scoreMessage = "It's a draw";
    } else if (score == 1) {
      scoreMessage = "You win";
    } else if (score == -1) {
      scoreMessage = "You lose";
    }
    return scoreMessage;
  }
}

listOfImages.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    idOfYourChoseImage = e.target.getAttribute("id");
    usChoice.src = `./src/img/${idOfYourChoseImage}.svg`;
    let opponentsRandomNumber = Math.floor(Math.random() * 3) + 1;
    themChoice.setAttribute("src", "./src/img/blank.svg");
    const chosenRandomImage = `src/img/pic${opponentsRandomNumber}.svg`;
    const user = idOfYourChoseImage.replace("pic", "");
    const opponent = opponentsRandomNumber;

    themChoice.setAttribute("src", chosenRandomImage);
    const result = new Result();
    const score = result.decideResult(user, opponent);
    const storeResult = result.storeResult(score);
    const scoreMessage = result.scoreMessage(score);
    message.innerHTML = scoreMessage;

    // set bg colors
    setTimeout(function () {
      round.style.backgroundColor = "yellow";
      score == 1 ? (us.style.backgroundColor = "yellow") : null;
      score == -1 ? (them.style.backgroundColor = "yellow") : null;
    }, 1000);

    setTimeout(function () {
      round.style.backgroundColor = "#efefef";
      us.style.backgroundColor = "#efefef";
      them.style.backgroundColor = "#efefef";
    }, 2000);

    setTimeout(function () {
      message.style.backgroundColor = "#efefef";
    }, 5000);

    // end set bg colors

    setTimeout(function () {
      if (score == 0) {
        list = listDraw;
      } else if (score == 1) {
        list = listUs;
      } else if (score == -1) {
        list = listThem;
      }

      const length = list.length;
      const randomChoice = Math.floor(Math.random() * length);
      const listMessage = list[randomChoice];
      message.innerHTML = listMessage;
      usChoice.src = `./src/img/blank.svg`;
      themChoice.setAttribute("src", "./src/img/blank.svg");
      message.style.backgroundColor = "yellow";
    }, 3000);
  }
});

const result = new Result();
const showResult = result.showResult();
