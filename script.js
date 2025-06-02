let cardOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let cardFlip = 0;
let foundPairs = 0;
let shape1 = "";
let shape2 = "";

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

function playFunction() {
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("cardReveal");
      card.style.pointerEvents = "none";
      console.log(card.dataset.shape);
      cardFlip++;
      if (cardFlip === 1) {
        shape1 = card.dataset.shape;
      } else if (cardFlip === 2) {
        shape2 = card.dataset.shape;
        document.querySelectorAll(".card").forEach((card) => {
          card.style.pointerEvents = "none";
        });
        setTimeout(() => {
          if (shape1 === shape2) {
            foundPairs++;
            pairsSpan.textContent = foundPairs;
            closeOpenCards();
            matchedDialog.showModal();
          } else {
            closeOpenCards();
            unmatchedDialog.showModal();
          }
        }, 1000);
      }
    });
  });
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
  pairsSpan.textContent = foundPairs;
  playFunction();
}

function resetGame() {
  closeOpenCards();
  cardFlip = 0;
  foundPairs = 0;
  pairsSpan.textContent = foundPairs;
  document.querySelectorAll(".card").forEach((card) => {
    card.style.pointerEvents = "auto";
  });
  playFunction();
}

document.querySelectorAll(".closeModal").forEach((button) => {
  button.onclick = () => {
    matchedPair.close();
    unmatchedPair.close();
    document.querySelectorAll(".card").forEach((card) => {
      card.style.pointerEvents = "auto";
      playFunction();
    });
  };
});
