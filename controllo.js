document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    form.addEventListener("submit", function (event) {
        let valid = true;

        // Controllo email
        const emailValue = emailInput.value.trim();
        if (!emailValue.endsWith("@studenti.unical.it")) {
            alert("❌ L'email deve essere del dominio @studenti.unical.it.");
            valid = false;
        }

        // Controllo password (minimo 8 caratteri, una maiuscola, una minuscola, un numero e un carattere speciale)
        const passwordValue = passwordInput.value;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

        if (!passwordRegex.test(passwordValue)) {
            alert("❌ La password deve avere almeno 8 caratteri, una lettera maiuscola, una minuscola, un numero e un carattere speciale.");
            valid = false;
        }

        // Controllo conferma password
        if (passwordValue !== confirmPasswordInput.value) {
            alert("❌ Le password non coincidono.");
            valid = false;
        }

        // Se ci sono errori, impedisci l'invio del form
        if (!valid) {
            event.preventDefault();
        }
    });
});