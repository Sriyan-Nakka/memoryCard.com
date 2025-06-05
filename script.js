let cardOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

let cardFlip = 0;
let cardFlipP1 = 0;
let cardFlipP2 = 0;

let foundPairs = 0;
let shape1 = "";
let shape2 = "";
let pickedCard1;
let pickedCard2;
let playMode = "";

let p1Card1;
let p1Card2;
let p2Card1;
let p2Card2;

const foundPairsSingleplayer = document.querySelector(
  "#foundPairsSingleplayer"
);
const foundPairsMultiplayer = document.querySelector("#foundPairsMultiplayer");

const pairsSingleplayer = document.querySelector("#pairsSingleplayer");
const pairsP1 = document.querySelector("#pairsP1");
const pairsP2 = document.querySelector("#pairsP2");

//singleplayer elements
const matchedDialogSingleplayer = document.querySelector(
  "#matchedPairSingleplayer"
);
const unmatchedDialogSingleplayer = document.querySelector(
  "#unmatchedPairSingleplayer"
);
const winDialogSingleplayer = document.querySelector("#winDialogSingleplayer");

//multiplayer elements
const multiplayerNames = document.querySelector("#multiplayerNames");

const matchedDialogMultiplayer = document.querySelector(
  "#matchedPairMultiplayer"
);
const unmatchedDialogMultiplayer = document.querySelector(
  "#unmatchedPairMultiplayer"
);
const winDialogMultiplayer = document.querySelector("#winDialogMultiplayer");

function cardOrderShuffle() {
  for (let rep = 1; rep <= 20; rep++) {
    let a = Math.floor(Math.random() * cardOrder.length);
    let b = Math.floor(Math.random() * cardOrder.length);

    let temp = cardOrder[a];
    cardOrder[a] = cardOrder[b];
    cardOrder[b] = temp;
  }
  console.log(cardOrder);

  for (let i = 1; i <= cardOrder.length; i++) {
    document.getElementById(`card${i}`).style.order = cardOrder[i - 1];
  }
}

function resetFlip() {
  cardFlip = 0;
}

function closeOpenCards() {
  document.querySelectorAll(".card").forEach((card) => {
    card.classList.remove("cardReveal");
  });
}

function closeModeButtons() {
  document.querySelectorAll(".modePara").forEach((para) => {
    para.style.display = "none";
  });
}

function playGame(mode) {
  playMode = mode;
  console.log(playMode);

  //pairs display for each mode
  switch (playMode) {
    case "singleplayer":
      foundPairsSingleplayer.style.display = "inline-block";
      foundPairsMultiplayer.style.display = "none";
      break;
    case "multiplayer":
      multiplayerNames.showModal();
      foundPairsMultiplayer.style.display = "inline-block";
      foundPairsSingleplayer.style.display = "none";
      break;
  }

  cardOrderShuffle();
  closeModeButtons();
  document.querySelector("#gameContainer").style.display = "block";
  cardFlip = 0;
  foundPairs = 0;
  shape1 = "";
  shape2 = "";
  p1Card1 = "";
  p1Card2 = "";
  p2Card1 = "";
  p2Card2 = "";

  pairsSingleplayer.textContent = foundPairs;
}

function resetGame() {
  closeOpenCards();
  resetFlip();
  foundPairs = 0;
  p1Card1 = "";
  p1Card2 = "";
  p2Card1 = "";
  p2Card2 = "";

  pairsSingleplayer.textContent = foundPairs;
  document.querySelectorAll(".card").forEach((card) => {
    card.style.pointerEvents = "all";
    card.style.visibility = "visible";
  });
}

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("cardReveal");
    card.style.pointerEvents = "none";
    console.log(card.dataset.shape);
    cardFlip++;
    if (cardFlip === 1) {
      pickedCard1 = card;
      shape1 = card.dataset.shape;
    } else if (cardFlip === 2) {
      pickedCard2 = card;
      shape2 = card.dataset.shape;
      document.querySelectorAll(".card").forEach((card) => {
        card.style.pointerEvents = "none";
      });
      //pair matched dialog timeout function
      setTimeout(() => {
        if (shape1 === shape2) {
          foundPairs++;
          pairsSingleplayer.textContent = foundPairs;
          if (foundPairs === 6) {
          } else {
            matchedDialogSingleplayer.showModal();
          }
          closeOpenCards();

          checkWin();
        } else {
          closeOpenCards();
          unmatchedDialogSingleplayer.showModal();
        }
      }, 1000);
      //matched pair cards hiding timeout function
      setTimeout(() => {
        if (shape1 === shape2) {
          pickedCard1.style.visibility = "hidden";
          pickedCard2.style.visibility = "hidden";
        }
      }, 250);
    }
  });
});

document.querySelectorAll(".closeModal").forEach((button) => {
  button.onclick = () => {
    matchedDialogSingleplayer.close();
    unmatchedDialogSingleplayer.close();
    winDialogSingleplayer.close();

    matchedDialogMultiplayer.close();
    unmatchedDialogMultiplayer.close();
    winDialogMultiplayer.close();

    cardFlip = 0;
    shape1 = "";
    shape2 = "";
    document.querySelectorAll(".card").forEach((card) => {
      card.style.pointerEvents = "auto";
    });
    if (foundPairs === 6) {
      document.querySelector("#gameContainer").style.display = "none";
      document.querySelectorAll(".modePara").forEach((para) => {
        para.style.display = "block";
      });
    }
  };
});

function checkWin() {
  switch (playMode) {
    case "singleplayer":
      if (foundPairs === 6) {
        document.querySelector("#gameContainer").style.display = "none";
        console.log("Win! Found all pairs...");
        winDialogSingleplayer.showModal();
        document.querySelectorAll(".card").forEach((card) => {
          card.style.visibility = "visible";
        });
      } else {
        console.log("Not win yet...");
      }
      break;
    case "multiplayer":
      //todo: write this after working singleplayer multiplayer card pairs function
      break;
  }
}
