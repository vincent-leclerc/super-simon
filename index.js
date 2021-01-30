const help = document.querySelector("#help");
const helpModal = document.querySelector(".help-modal");

const closeModal = document.querySelector(".close");

// Affiche la modal au clique de l'icone information
help.addEventListener("click", () => {
    helpModal.style.display = "flex";
});

// Ferme la modal au clique de l'icone de fermeture
closeModal.addEventListener("click", () => {
    helpModal.style.display = "none";
});