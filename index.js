const help = document.querySelector("#help");
const helpModal = document.querySelector(".help-modal");

const closeModal = document.querySelector(".close");

const playButton = document.querySelector(".start-btn");
const reinitButton = document.querySelector(".reinit-btn");

const gameButtons = document.querySelectorAll(".btn");
const buttonColour = ["green", "red", "yellow", "blue"];

let gameColourPattern = [];
let userColourPattern = [];

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

playButton.addEventListener("click", () => {
  //   isSarted = true;
  //   startGame();

  if (!isSarted) {
    isSarted = true;
    console.log(isSarted);

    newLevel();
  } else {
    console.log("Game already started");
  }
});

reinitButton.addEventListener("click", () => {
  reinitialize();
});

for (button of gameButtons) {
  button.addEventListener("click", (ev) => {
    if (isSarted) {
      let userChoice = ev.target.value;
      console.log("User choice : " + userChoice);

      userColourPattern.push(userChoice);

      const colorIndex = userColourPattern.length - 1;

      comparePatterns(colorIndex);
    } else {
      console.log("Veuillez cliquer sur 'Lancer une partie' pour jouer");
    }
  });
}

function newLevel() {
  let number = Math.floor(Math.random() * 4);
  let colour = buttonColour[number];

  gameColourPattern.push(colour);

  console.log("Level: " + lvl);
  console.log("Game colour pattern : " + gameColourPattern);
  lvl++;
}

function comparePatterns(i) {
  const currentGameColor = gameColourPattern[i];
  const currentUserColor = userColourPattern[i];

  console.log("Current game pattern : " + currentGameColor);
  console.log("Current user pattern : " + currentUserColor);

  if (currentUserColor === currentGameColor) {
    if (gameColourPattern.length === userColourPattern.length) {
      
      userColourPattern = [];
      console.log("Success !");
      setTimeout(() => {
        newLevel();
      }, 600);
    }
  } else {
    console.log("Game Over !");
    reinitialize();
  }
}

function reinitialize() {
  lvl = 0;
  gameColourPattern = [];
  userColourPattern = [];
  isSarted = false;

  console.log(
    "Lvl : " +
      lvl +
      "\ngame pattern : " +
      gameColourPattern +
      "\nuser pattern : " +
      userColourPattern +
      "\nstarted : " +
      isSarted
  );
}
