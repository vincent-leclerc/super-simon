const help = document.querySelector("#help");
const helpModal = document.querySelector(".help-modal");

const closeModal = document.querySelector(".close");

const playInput = document.querySelector(".start-btn");
const gameButtons = document.querySelectorAll(".btn");

const buttonColour = ["green", "red", "yellow", "blue"];
const gameColourPattern = [];
const userColourPattern = [];

let isSarted = false;
let lvl = 0;

// Affiche la modal au clique de l'icone information
help.addEventListener("click", () => {
    helpModal.style.display = "flex";
});

// Ferme la modal au clique de l'icone de fermeture
closeModal.addEventListener("click", () => {
    helpModal.style.display = "none";
});

playInput.addEventListener("click", () => {
    isSarted = true;
    startGame();
});

function startGame() {
    console.log(isSarted);

    for (button of gameButtons) {
        button.addEventListener("click", (ev) => {
            let userChoice = ev.target.value;
            console.log(userChoice);
    
            userColourPattern.push(userChoice);
    
            console.log(userColourPattern);
        });
    }
    // newLevel();
    // console.log(gameColourPattern);
}

function newLevel() {
    let number = Math.floor(Math.random() * 4);
    let colour = buttonColour[number];

    gameColourPattern.push(colour);

    lvl++;
}