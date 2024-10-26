// Build a BlackJack Game

// variables representing two cards 
let firstCard = 10;
let secondCard = 4;
let cards = [firstCard, secondCard];
let hasBlackJack = false;
let isAlive = false;
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");
let playerName = localStorage.getItem("playerName");
let playerBalance = localStorage.getItem("playerBalance");

//challenge #1
//create a new variable and set it to the sum of the two cards 
let sum = firstCard + secondCard;

//chalenge #2 
// code the statements below based on the conditions shown in blackjack.png from the images folder
// your output should work in the browser's console based on changing the values assigned to the cards

//starter code
let message = "";

if (!playerName || !playerBalance) {
    playerName = prompt("Enter your name:");
    playerBalance = 100;
    localStorage.setItem("playerName", playerName);
    localStorage.setItem("playerBalance", playerBalance);
} else {
    playerBalance = parseInt(playerBalance);
}

function updatePlayerDisplay() {
    playerEl.textContent = `${playerName}: $${playerBalance}`;
}

updatePlayerDisplay();

function savePlayerData() {
    localStorage.setItem("playerBalance", playerBalance);
}

function playerWins() {
    playerBalance += 100;
    savePlayerData();
    updatePlayerDisplay();
}

function playerLoses() {
    playerBalance -= 50;
    savePlayerData();
    updatePlayerDisplay();
}

function renderGame() {
    cardsEl.textContent = "Cards: " + cards.join(" ");
    sumEl.textContent = "Sum: " + sum;
    if (sum < 21) {
        message = "Do you want to draw a new card? 🙂";
    } else if (sum === 21) {
        message = "Wohoo! You've got Blackjack! 🥳";
        hasBlackJack = true;
        playerBalance += 100;
    } else {
        message = "You're out of the game! 😭";
        isAlive = false;
        playerBalance -= 50;
    }
    messageEl.textContent = message;
    playerEl.textContent = `${playerName}: $${playerBalance}`;
    localStorage.setItem("playerBalance", playerBalance);
}

function newCard() {
    if (isAlive && !hasBlackJack) {
        let card = getRandomCard();
        sum += card;
        cards.push(card);
        renderGame();
    }
}

function startGame() {
    isAlive = true;
    firstCard = getRandomCard();
    secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame();
}

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    if (randomNumber === 1) {
        return 11;
    } else if (randomNumber > 9) {
        return 10;
    } else {
        return randomNumber;
    }
}

function updateBalance(amount) {
    playerBalance += amount;
    localStorage.setItem("playerBalance", playerBalance);
    updatePlayerDisplay();
}

function checkWinCondition() {
    if (sum === 21) {
        updateBalance(100);
    } else if (sum > 21) {
        updateBalance(-50);
    }
}