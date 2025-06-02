let cardOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let cardFlip = 0;
let foundPairs = 0;
let shape1 = "";
let shape2 = "";
let pickedCard1;
let pickedCard2;

const pairsSpan = document.querySelector("#pairsSpan");
const matchedDialog = document.querySelector("#matchedPair");
const unmatchedDialog = document.querySelector("#unmatchedPair");
const winDialog = document.querySelector("#winDialog");

//cardOrder array Shuffle
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

function resetFlip() {
  cardFlip = 0;
}

function closeOpenCards() {
  document.querySelectorAll(".card").forEach((card) => {
    card.classList.remove("cardReveal");
  });
}
function playGame() {
  document.querySelector("#gameContainer").style.display = "block";
  document.querySelector("#playButton").style.display = "none";
  cardFlip = 0;
  foundPairs = 0;
  shape1 = "";
  shape2 = "";
  pairsSpan.textContent = foundPairs;
  resetFlip();
}

function resetGame() {
  closeOpenCards();
  resetFlip();
  foundPairs = 0;
  pairsSpan.textContent = foundPairs;
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
          pairsSpan.textContent = foundPairs;
          if (foundPairs === 6) {
          } else {
            matchedDialog.showModal();
          }
          closeOpenCards();

          checkWin();
        } else {
          closeOpenCards();
          unmatchedDialog.showModal();
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
    matchedPair.close();
    unmatchedPair.close();
    winDialog.close();
    cardFlip = 0;
    shape1 = "";
    shape2 = "";
    document.querySelectorAll(".card").forEach((card) => {
      card.style.pointerEvents = "auto";
    });
    if (foundPairs === 6) {
      document.querySelector("#gameContainer").style.display = "none";
      document.querySelector("#playButton").style.display = "inline-block";
    }
  };
});

function checkWin() {
  if (foundPairs === 6) {
    document.querySelector("#gameContainer").style.display = "none";
    console.log("Win! Found all pairs...");
    winDialog.showModal();
    document.querySelectorAll(".card").forEach((card) => {
      card.style.visibility = "visible";
    });
  } else {
    console.log("Not win yet...");
  }
}
