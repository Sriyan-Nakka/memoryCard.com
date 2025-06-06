let cardOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

let cardFlip = 0;
let cardFlipP1 = 0;
let cardFlipP2 = 0;

let foundPairs = 0;
let p1FoundPairs = 0;
let p2FoundPairs = 0;

let shape1 = "";
let shape2 = "";
let pickedCard1;
let pickedCard2;
let playMode = "";

let p1Turn = true;
let turnName = document.querySelector("#turnName");

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

function multiplayerNamesSubmit(e) {
  e.preventDefault();
  multiplayerNames.close();
  document.querySelector("#p1Name").textContent =
    document.querySelector("#enteredP1Name").value;
  document.querySelector("#p2Name").textContent =
    document.querySelector("#enteredP2Name").value;
  document.querySelector("#turnNameDiv").style.display = "block";
  turnName.textContent = document.querySelector("#enteredP1Name").value;
  foundPairsMultiplayer.style.display = "inline-block";
  foundPairsSingleplayer.style.display = "none";
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

  switch (playMode) {
    case "singleplayer":
      document.querySelector("#turnNameDiv").style.display = "none";
      foundPairsSingleplayer.style.display = "inline-block";
      foundPairsMultiplayer.style.display = "none";
      break;
    case "multiplayer":
      p1Turn = true;
      multiplayerNames.showModal();
      break;
  }

  cardOrderShuffle();
  closeModeButtons();
  document.querySelector("#gameContainer").style.display = "block";
  cardFlip = 0;
  foundPairs = 0;
  p1FoundPairs = 0;
  p2FoundPairs = 0;

  shape1 = "";
  shape2 = "";

  pairsSingleplayer.textContent = foundPairs;
}

function resetGame() {
  cardOrderShuffle();
  closeOpenCards();
  resetFlip();
  p1FoundPairs = 0;
  p2FoundPairs = 0;

  pairsP1.textContent = p1FoundPairs;
  pairsP2.textContent = p2FoundPairs;

  p1Card1 = "";
  p1Card2 = "";
  p2Card1 = "";
  p2Card2 = "";

  p1Turn = true;
  turnName.textContent = p1Name.textContent;

  foundPairs = 0;
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
    switch (playMode) {
      case "singleplayer":
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
        break;
      case "multiplayer":
        if (p1Turn) {
          cardFlipP1++;
          if (cardFlipP1 === 1) {
            shape1 = card.dataset.shape;
            pickedCard1 = card;
          } else if (cardFlipP1 === 2) {
            cardFlipP1 = 0;
            shape2 = card.dataset.shape;
            pickedCard2 = card;
            document.querySelectorAll(".card").forEach((card) => {
              card.style.pointerEvents = "none";
            });
            //pair matched dialog timeout function
            setTimeout(() => {
              turnName.textContent = p2Name.textContent;

              if (shape1 === shape2) {
                foundPairs++;
                p1FoundPairs++;
                pairsP1.textContent = p1FoundPairs;
                if (foundPairs === 6) {
                } else {
                  document.querySelector("#matchedPlayerName").textContent =
                    p1Name.textContent;
                  matchedDialogMultiplayer.showModal();
                }
                closeOpenCards();

                checkWin();
              } else {
                closeOpenCards();
                document.querySelector("#unmatchedPlayerName").textContent =
                  p1Name.textContent;
                unmatchedDialogMultiplayer.showModal();
              }
            }, 1000);
            //matched pair cards hiding timeout function
            setTimeout(() => {
              if (shape1 === shape2) {
                pickedCard1.style.visibility = "hidden";
                pickedCard2.style.visibility = "hidden";
              }
            }, 250);

            p1Turn = false;
          }
        } else if (!p1Turn) {
          cardFlipP2++;
          if (cardFlipP2 === 1) {
            shape1 = card.dataset.shape;
            pickedCard1 = card;
          } else if (cardFlipP2 === 2) {
            cardFlipP2 = 0;
            shape2 = card.dataset.shape;
            pickedCard2 = card;
            document.querySelectorAll(".card").forEach((card) => {
              card.style.pointerEvents = "none";
            });
            //pair matched dialog timeout function
            setTimeout(() => {
              turnName.textContent = p1Name.textContent;

              if (shape1 === shape2) {
                foundPairs++;
                p2FoundPairs++;
                pairsP2.textContent = p2FoundPairs;
                if (foundPairs === 6) {
                } else {
                  document.querySelector("#matchedPlayerName").textContent =
                    p2Name.textContent;
                  matchedDialogMultiplayer.showModal();
                }
                closeOpenCards();

                checkWin();
              } else {
                closeOpenCards();
                document.querySelector("#unmatchedPlayerName").textContent =
                  p2Name.textContent;
                unmatchedDialogMultiplayer.showModal();
              }
            }, 1000);
            //matched pair cards hiding timeout function
            setTimeout(() => {
              if (shape1 === shape2) {
                pickedCard1.style.visibility = "hidden";
                pickedCard2.style.visibility = "hidden";
              }
            }, 250);

            p1Turn = true;
          }
        }
        break;
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
      if (foundPairs === 6) {
        winDialogMultiplayer.showModal();
      }
      break;
  }
}
