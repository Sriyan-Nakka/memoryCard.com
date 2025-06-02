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

//cardOrder array Shuffle
for (let rep = 1; rep <= 20; rep++) {
  let a = Math.floor(Math.random() * cardOrder.length);
  let b = Math.floor(Math.random() * cardOrder.length);

  let temp = cardOrder[a];
  cardOrder[a] = cardOrder[b];
  cardOrder[b] = temp;
}
console.log(cardOrder);

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
      console.log(pickedCard1);
      shape1 = card.dataset.shape;
    } else if (cardFlip === 2) {
      pickedCard2 = card;
      console.log(pickedCard2);
      shape2 = card.dataset.shape;
      document.querySelectorAll(".card").forEach((card) => {
        card.style.pointerEvents = "none";
      });
      //pair matched dialog timeout function
      setTimeout(() => {
        if (shape1 === shape2) {
          foundPairs++;
          pairsSpan.textContent = foundPairs;
          matchedDialog.showModal();
          closeOpenCards();
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
  checkWin();
});

document.querySelectorAll(".closeModal").forEach((button) => {
  button.onclick = () => {
    matchedPair.close();
    unmatchedPair.close();
    cardFlip = 0;
    shape1 = "";
    shape2 = "";
    document.querySelectorAll(".card").forEach((card) => {
      card.style.pointerEvents = "auto";
    });
    resetFlip();
  };
});

function checkWin() {
  //todo: write win checking function.
}
