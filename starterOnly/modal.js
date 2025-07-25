// Fonction pour rendre le menu responsive (mobile)
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Sélection des éléments du DOM nécessaires pour la gestion des modales et du formulaire
const modalbg = document.getElementById("formModal"); // Modale du formulaire
const modalBtn = document.querySelectorAll(".modal-btn"); // Boutons pour ouvrir la modale
const closeModal = document.querySelector(".close"); // Bouton pour fermer la modale formulaire
const form = document.forms["reserve"]; // Formulaire de réservation
const formData = document.querySelectorAll(".formData"); // Champs du formulaire

const confirmationModal = document.getElementById("confirmationModal"); // Modale de confirmation
const confirmClose = document.getElementById("confirmClose"); // Bouton pour fermer la modale de confirmation
const confirmBtn = document.getElementById("confirmBtn"); // Autre bouton pour fermer la modale de confirmation

// Ouvre la modale du formulaire quand on clique sur un bouton d'ouverture
modalBtn.forEach((btn) =>
  btn.addEventListener("click", () => {
    modalbg.style.display = "block";
  })
);

// Ferme la modale du formulaire
closeModal.addEventListener("click", () => {
  modalbg.style.display = "none";
});
// Ferme la modale de confirmation (croix ou bouton)
confirmClose.addEventListener("click", () => {
  confirmationModal.style.display = "none";
});
confirmBtn.addEventListener("click", () => {
  confirmationModal.style.display = "none";
});

// Validation du formulaire à la soumission
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Empêche l'envoi du formulaire par défaut
  let valid = true;

  // Réinitialise l'affichage des erreurs
  formData.forEach((field) => {
    field.removeAttribute("data-error-visible");
  });

  // Vérifie chaque champ et affiche une erreur si besoin
  if (form.first.value.trim().length < 2) {
    setError("first", "Veuillez entrer 2 caractères minimum.");
    valid = false;
  }
  if (form.last.value.trim().length < 2) {
    setError("last", "Veuillez entrer 2 caractères minimum.");
    valid = false;
  }
  if (!validateEmail(form.email.value)) {
    setError("email", "Veuillez entrer un email valide.");
    valid = false;
  }
  if (form.birthdate.value === "") {
    setError("birthdate", "Veuillez entrer votre date de naissance.");
    valid = false;
  }
  if (form.quantity.value === "" || form.quantity.value < 0) {
    setError("quantity", "Veuillez entrer un nombre valide.");
    valid = false;
  }
  if (!form.location.value) {
    setError("locationGroup", "Veuillez choisir un tournoi.");
    valid = false;
  }
  if (!document.getElementById("checkbox1").checked) {
    setError("checkboxGroup", "Vous devez accepter les conditions.");
    valid = false;
  }

  // Si tout est valide, ferme la modale formulaire, réinitialise le formulaire et affiche la confirmation
  if (valid) {
    modalbg.style.display = "none";
    form.reset();
    confirmationModal.style.display = "block";
  }
});

// Affiche une erreur sur un champ donné
function setError(id, message) {
  const input = document.getElementById(id);
  const field = input.closest(".formData") || input;
  field.setAttribute("data-error-visible", "true");
  field.setAttribute("data-error", message);
}

// Vérifie si l'email est valide avec une expression régulière
function validateEmail(email) {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
  return regex.test(email);
}

// Efface l'erreur d'un champ donné
function clearError(id) {
  const input = document.getElementById(id);
  const field = input.closest(".formData") || input;
  field.removeAttribute("data-error-visible");
}

// Validation en direct (live) sur chaque champ du formulaire
form.first.addEventListener("input", () => {
  if (form.first.value.trim().length >= 2) clearError("first");
});
form.last.addEventListener("input", () => {
  if (form.last.value.trim().length >= 2) clearError("last");
});
form.email.addEventListener("input", () => {
  if (validateEmail(form.email.value)) clearError("email");
});
form.birthdate.addEventListener("input", () => {
  if (form.birthdate.value) clearError("birthdate");
});
form.quantity.addEventListener("input", () => {
  if (form.quantity.value !== "" && form.quantity.value >= 0)
    clearError("quantity");
});
const locations = document.querySelectorAll('input[name="location"]');
locations.forEach((loc) =>
  loc.addEventListener("change", () => {
    if (form.location.value) clearError("locationGroup");
  })
);
document.getElementById("checkbox1").addEventListener("change", function () {
  if (this.checked) clearError("checkboxGroup");
});
