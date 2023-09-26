const cardsArray = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"];
let cardsChosen = [];
let cardsChosenId = [];
let cardsMatched = [];

function createBoard() {
    const gameBoard = document.getElementById("game-board");

    cardsArray.sort(() => 0.5 - Math.random());

    for (let i = 0; i < cardsArray.length; i++) {
        const card = document.createElement("div");
        card.classList.add("card", "face-down"); // Adicione a classe "face-down" aqui
        card.setAttribute("data-id", i);
        card.textContent = cardsArray[i];
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
    }
}



function checkForMatch() {
    const [id1, id2] = cardsChosenId;

    if (cardsChosen[0] === cardsChosen[1]) {
        cardsMatched.push(cardsChosenId);
        const matchedCards = document.querySelectorAll(`[data-id="${id1}"], [data-id="${id2}"]`);
        matchedCards.forEach(card => card.classList.add("matched"));
    } else {
        const [card1, card2] = cardsChosenId.map(id => document.querySelector(`[data-id="${id}"]`));
        setTimeout(() => {
            card1.textContent = "";
            card2.textContent = "";
        }, 1000);
    }

    cardsChosen = [];
    cardsChosenId = [];

    if (cardsMatched.length === cardsArray.length / 2) {
        alert("Parabéns! Você encontrou todos os pares.");
    }
}

function flipCard() {
    const cardId = this.getAttribute("data-id");

    if (cardsChosenId.length === 2 || this.classList.contains("matched")) {
        return;
    }

    this.classList.remove("face-down"); // Remova a classe "face-down"
    this.classList.add("flip");
    cardsChosen.push(cardsArray[cardId]);
    cardsChosenId.push(cardId);

    if (cardsChosenId.length === 2) {
        setTimeout(checkForMatch, 500);
    }
}


createBoard();


document.addEventListener("DOMContentLoaded", () => {
    const shuffleButton = document.getElementById("shuffle-button");
    shuffleButton.addEventListener("click", shuffleCards);
});

function shuffleCards() {
    const gameBoard = document.getElementById("game-board");
    const cards = Array.from(gameBoard.getElementsByClassName("card"));
    cards.forEach(card => {
        card.classList.remove("matched");
        card.classList.remove("flip");
        card.classList.add("face-down"); // Adicione a classe "face-down" aqui
        card.textContent = "";
    });
    cardsArray.sort(() => 0.5 - Math.random());
    cardsArray.forEach((value, index) => {
        const card = cards[index];
        card.textContent = value;
        card.setAttribute("data-id", index);
    });
}

