const $help = document.querySelector("#help");
const $helpModal = document.querySelector(".help-modal");

const $closeModal = document.querySelector(".close");

const $playButton = document.querySelector(".start-btn");
const $reinitButton = document.querySelector(".reinit-btn");

const $gameButtons = document.querySelectorAll(".btn");
const $buttonColour = ["green", "red", "yellow", "blue"];

const $scoreLvl = document.querySelector("#lvl-score");
const $scoreButtons = document.querySelector("#button-score");

let gameColourPattern = [];
let userColourPattern = [];

let isSarted = false;
let lvl = 0;
let buttonsScore = 0;

// scoreLvl.innerHTML = "Tours : " +  lvl;
// scoreButtons.innerHTML = "Touches : " + buttonsScore;

// Affiche la modal au clique de l'icone information
$help.addEventListener("click", () => {
  $helpModal.style.display = "flex";
});

// Ferme la modal au clique de l'icone de fermeture
$closeModal.addEventListener("click", () => {
  $helpModal.style.display = "none";
});

$playButton.addEventListener("click", () => {
  if (!isSarted) {
    isSarted = true;
    console.log(isSarted);

    newLevel();
  } else {
    console.log("Game already started");
  }
});

$reinitButton.addEventListener("click", () => {
  reinitialize();
});

for (button of $gameButtons) {
  button.addEventListener("click", (ev) => {
    if (isSarted) {
      let userChoice = ev.target.value;
      console.log("User choice : " + userChoice);

      userColourPattern.push(userChoice);

      const colorIndex = userColourPattern.length - 1;

      let $activatedButton = document.querySelector(".btn--" + userChoice);

      buttonAnimation($activatedButton, userChoice);
      comparePatterns(colorIndex);
    } else {
      console.log("Veuillez cliquer sur 'Lancer une partie' pour jouer");
    }
  });
}

function newLevel() {
  let number = Math.floor(Math.random() * 4);
  let colour = $buttonColour[number];

  gameColourPattern.push(colour);

  // Séquence d'affichage des boutons
  gameColourPattern.forEach((colour, i) => {
    setTimeout(() => {
      $activatedButton = document.querySelector(".btn--" + colour);
      buttonAnimation($activatedButton, colour);
    }, 400 * i);
  });

  console.log("Game colour pattern : " + gameColourPattern);
  $scoreLvl.innerHTML = "Tours : " + lvl;
  lvl++;
}

function comparePatterns(i) {
  const currentGameColor = gameColourPattern[i];
  const currentUserColor = userColourPattern[i];

  console.log("Current game pattern : " + currentGameColor);
  console.log("Current user pattern : " + currentUserColor);

  if (currentUserColor === currentGameColor) {
    buttonsScore++;

    $scoreButtons.innerHTML = "Touches : " + buttonsScore;

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
  buttonsScore = 0;
  gameColourPattern = [];
  userColourPattern = [];
  isSarted = false;

  $scoreLvl.innerHTML = "Tours : " + lvl;
  $scoreButtons.innerHTML = "Touches : " + buttonsScore;
}

function buttonAnimation(b, color) {
  b.classList.add("flash");

  if (color === "green") b.innerHTML = "DO";
  if (color === "red") b.innerHTML = "RE";
  if (color === "yellow") b.innerHTML = "MI";
  if (color === "blue") b.innerHTML = "FA";

  setTimeout(() => {
    b.classList.remove("flash");
    b.innerHTML = "";
  }, 400);
}
