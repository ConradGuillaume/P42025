// menu responsive
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.getElementById("formModal");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModal = document.querySelector(".close");
const form = document.forms["reserve"];
const formData = document.querySelectorAll(".formData");

const confirmationModal = document.getElementById("confirmationModal");
const confirmClose = document.getElementById("confirmClose");
const confirmBtn = document.getElementById("confirmBtn");

// open modal
modalBtn.forEach((btn) =>
  btn.addEventListener("click", () => {
    modalbg.style.display = "block";
  })
);

// close
closeModal.addEventListener("click", () => {
  modalbg.style.display = "none";
});
confirmClose.addEventListener("click", () => {
  confirmationModal.style.display = "none";
});
confirmBtn.addEventListener("click", () => {
  confirmationModal.style.display = "none";
});

// form validation
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let valid = true;

  formData.forEach((field) => {
    field.removeAttribute("data-error-visible");
  });

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

  if (valid) {
    modalbg.style.display = "none";
    form.reset();
    confirmationModal.style.display = "block";
  }
});

// utilities
function setError(id, message) {
  const input = document.getElementById(id);
  const field = input.closest(".formData") || input;
  field.setAttribute("data-error-visible", "true");
  field.setAttribute("data-error", message);
}

function validateEmail(email) {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
  return regex.test(email);
}

function clearError(id) {
  const input = document.getElementById(id);
  const field = input.closest(".formData") || input;
  field.removeAttribute("data-error-visible");
}

// live validation
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
