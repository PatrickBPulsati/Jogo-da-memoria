//so gambiarra

// Array que contém os valores das cartas do jogo
const cardsArray = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"];

// Arrays para rastrear as cartas escolhidas e as correspondentes IDs
let cardsChosen = [];
let cardsChosenId = [];

// Array para rastrear as cartas que já foram correspondidas
let cardsMatched = [];

// Função para criar o jogo
function createBoard() {
    // Obtém o elemento div com o id "game-board"
    const gameBoard = document.getElementById("game-board");

    // Embaralha as cartas
    cardsArray.sort(() => 0.5 - Math.random());

    // Loop para criar elementos div para cada carta no tabuleiro
    for (let i = 0; i < cardsArray.length; i++) {
        const card = document.createElement("div");
        card.classList.add("card", "face-down"); // Adiciona classes CSS às cartas
        card.setAttribute("data-id", i); // Define o atributo data-id com o índice atual
        card.textContent = cardsArray[i]; // Define o texto do elemento com o valor da carta
        card.addEventListener("click", flipCard); // Adiciona um ouvinte de evento de clique para virar a carta
        gameBoard.appendChild(card); // Adiciona a carta ao tabuleiro
    }
}

// Função para verificar se duas cartas escolhidas são iguais
function checkForMatch() {
    if (cardsChosen[0] === cardsChosen[1]) {
        // Se as duas cartas escolhidas forem iguais, adicione a classe "matched" a ambas
        const [card1, card2] = cardsChosenId.map(id => document.querySelector(`[data-id="${id}"]`));
        card1.classList.add("matched");
        card2.classList.add("matched");
    
        // Limpa as listas de cartas escolhidas
        cardsChosen = [];
        cardsChosenId = [];
    
        if (document.querySelectorAll(".matched").length === cardsArray.length) {
            alert("Parabéns! Você encontrou todos os pares.");
        }
    } else {
        // Caso contrário, vira as cartas novamente após um tempo
        const [card1, card2] = cardsChosenId.map(id => document.querySelector(`[data-id="${id}"]`));
        setTimeout(() => {
            card1.classList.add("face-down");
            card1.classList.remove("flipped");
            card2.classList.add("face-down");
            card2.classList.remove("flipped");
        }, 1000);
    
        // Limpa as listas de cartas escolhidas
        cardsChosen = [];
        cardsChosenId = [];
    }
}    

// Função para virar uma carta quando clicada
function flipCard() {
    const cardId = this.getAttribute("data-id");

    // Verifica se já foram escolhidas duas cartas ou se a carta já está correspondida
    if (cardsChosenId.length === 2 || this.classList.contains("matched")) {
        return;
    }

    // Remove a classe "face-down" e adiciona a classe "flipped" para virar a carta
    this.classList.remove("face-down");
    this.classList.add("flipped");
    
    // Adiciona a carta escolhida as listas de cartas escolhidas e IDs
    cardsChosen.push(cardsArray[cardId]);
    cardsChosenId.push(cardId);

    // Quando duas cartas foram escolhidas, verifica se elas correspondem
    if (cardsChosenId.length === 2) {
        setTimeout(checkForMatch, 500);
    }
}

// Chama a função para criar o tabuleiro
createBoard();

document.addEventListener("DOMContentLoaded", () => {
    const shuffleButton = document.getElementById("shuffle-button");
    shuffleButton.addEventListener("click", shuffleCards);
});

function shuffleCards() {
    const gameBoard = document.getElementById("game-board");
    const cards = Array.from(gameBoard.getElementsByClassName("card"));
    
    // Remove as classes "matched" e "flipped" e redefine o texto das cartas
    cards.forEach(card => {
        card.classList.remove("matched");
        card.classList.remove("flipped");
        card.classList.add("face-down");
        card.textContent = "";
    });
    
    // Embaralha as cartas no array cardsArray e atualiza os atributos data-id
    cardsArray.sort(() => 0.5 - Math.random());
    cardsArray.forEach((value, index) => {
        const card = cards[index];
        card.textContent = value;
        card.setAttribute("data-id", index);
    });
}
