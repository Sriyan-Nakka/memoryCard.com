let cardOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let cardFlip = 0;

//cardOrder array Shuffle
for (let rep = 1; rep <= 20; rep++) {
  let a = Math.floor(Math.random() * cardOrder.length);
  let b = Math.floor(Math.random() * cardOrder.length);

  let temp = cardOrder[a];
  cardOrder[a] = cardOrder[b];
  cardOrder[b] = temp;
}
console.log(cardOrder);

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("cardReveal");
    card.style.pointerEvents = "none";
    console.log(card.dataset.shape);
    cardFlip++;
    //todo: add when you reach 2 of a variable name, results show.
  });
});
function closeOpenCards() {
  document.querySelectorAll(".card").forEach((card) => {
    card.classList.remove("cardReveal");
  });
}
