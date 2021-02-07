const $help = document.querySelector("#help");
const $helpModal = document.querySelector(".help-modal");
const $closeHelpModal = document.querySelector(".close");

const $gameOverModal = document.querySelector(".game-over-modal");
const $closeGameOverModal = document.querySelector(".close-go");
const $restartButton = document.querySelector(".restart-btn");

const $playButton = document.querySelector(".start-btn");
const $reinitButton = document.querySelector(".reinit-btn");

const $gameButtons = document.querySelectorAll(".btn");
const $buttonColour = ["green", "red", "yellow", "blue"];

const $scoreLvl = document.querySelectorAll(".lvl-score");
const $scoreButtons = document.querySelectorAll(".button-score");

let gameColourPattern = [];
let userColourPattern = [];

let isSarted = false;
let lvl = 0;
let buttonsScore = 0;

// Affiche la modal au clique de l'icone information
$help.addEventListener("click", () => {
  $helpModal.style.display = "flex";
});

// Ferme la modal au clique de l'icone de fermeture
$closeHelpModal.addEventListener("click", () => {
  $helpModal.style.display = "none";
});

// Ferme la modal au clique de l'icone de fermeture
$closeGameOverModal.addEventListener("click", () => {
  $gameOverModal.style.display = "none";
});

// Lance la partie si pas déjà lancée
$playButton.addEventListener("click", () => {
  if (!isSarted) {
    isSarted = true;
    newLevel();
  } else {
    alert("La partie est déjà lancée !");
  }
});

$reinitButton.addEventListener("click", () => {
  reinitialize();
});

// Bouton redémarrer de la modale game over
$restartButton.addEventListener("click", () => {
  $gameOverModal.style.display = "none";

  if (!isSarted) {
    isSarted = true;
    newLevel();
  } else {
    alert("La partie est déjà lancée !");
  }
});

// Ecoute le bouton activé par l'utilisateur
for (button of $gameButtons) {
  button.addEventListener("click", (ev) => {
    if (isSarted) {
      let userChoice = ev.target.value;
      userColourPattern.push(userChoice);

      const colorIndex = userColourPattern.length - 1;

      let $activatedButton = document.querySelector(".btn--" + userChoice);

      playNote(userChoice);
      buttonAnimation($activatedButton, userChoice);
      comparePatterns(colorIndex);
    } else {
      alert("Veuillez cliquer sur 'Lancer une partie' pour jouer");
    }
  });
}

function newLevel() {
  let number = Math.floor(Math.random() * 4);
  let colour = $buttonColour[number];
  let speed = 2000;

  gameColourPattern.push(colour);

  if (lvl === 1) speed = 1500;
  if (lvl === 2) speed = 1300;
  if (lvl === 3) speed = 1100;
  if (lvl === 4) speed = 900;
  if (lvl === 5) speed = 700;
  if (lvl === 6) speed = 600;
  if (lvl === 7) speed = 500;

  // Séquence d'affichage des boutons, i permet de 'séquencer' l'affichage
  gameColourPattern.forEach((colour, i) => {
    setTimeout(() => {
      $activatedButton = document.querySelector(".btn--" + colour);

      playNote(colour);
      buttonAnimation($activatedButton, colour);
    }, speed * i);
  });

  for (score of $scoreLvl) {
    score.innerHTML = "Tours : " + lvl;
  }

  lvl++;
}

// Compare chaque couleur utilisateur / jeu d'une séquence grâce à l'index correspondant
function comparePatterns(i) {
  const currentGameColor = gameColourPattern[i];
  const currentUserColor = userColourPattern[i];

  if (currentUserColor === currentGameColor) {
    buttonsScore++;

    for (score of $scoreButtons) {
      score.innerHTML = "Touches : " + buttonsScore;
    }

    if (gameColourPattern.length === userColourPattern.length) {
      userColourPattern = [];

      setTimeout(() => {
        newLevel();
      }, 1000);
    }
  } else {
    $gameOverModal.style.display = "flex";
    reinitialize();
  }
}

// Réinitialise toutes les stats ainsi que l'affichage des scores
function reinitialize() {
  lvl = 0;
  buttonsScore = 0;
  gameColourPattern = [];
  userColourPattern = [];
  isSarted = false;

  $scoreLvl.innerHTML = "Tours : " + lvl;
  $scoreButtons.innerHTML = "Touches : " + buttonsScore;
}

// Affiche un 'flash' et la note correspondante au bouton
function buttonAnimation(b, color) {
  b.classList.add("flash");

  if (color === "green") b.innerHTML = "DO";
  if (color === "red") b.innerHTML = "RE";
  if (color === "yellow") b.innerHTML = "MI";
  if (color === "blue") b.innerHTML = "FA";

  setTimeout(() => {
    b.classList.remove("flash");
    b.innerHTML = "";
  }, 500);
}

// Joue la note correspondant au bouton
function playNote(colour) {
  let note;

  if (colour === "green") note = "do";
  if (colour === "red") note = "re";
  if (colour === "yellow") note = "mi";
  if (colour === "blue") note = "fa";

  let sound = new Audio("sounds/" + note + ".mp3");
  sound.play();
}
