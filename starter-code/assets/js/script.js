const textField = document.getElementById("passwordValue");
const copyButton = document.getElementById("copy-button");
const value = document.querySelector("#password-length-value");
const input = document.querySelector("#password-length");
const checkboxes = document.querySelectorAll("input[type='checkbox']");
const generateButton = document.getElementById("generatePassword");
const bars = document.querySelectorAll('.bar');
const strengthText = document.getElementById('strengthLabel');
const copiedText = document.getElementById('copiedText');

const CHAR_SETS = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+[]{}|;:',.<>?/`~",
};

// Password length value
const updateLengthDisplay = (length) => value.textContent = length;
updateLengthDisplay(input.value);

input.addEventListener("input", (event) => updateLengthDisplay(event.target.value));

// Function to copy to clipboard
const copytoClipboard = () => {
    if (textField.value) {
        navigator.clipboard.writeText(textField.value)
            .then(() => {
                copiedText.textContent = "COPIED";
                setTimeout(() => copiedText.textContent = "", 1000);
            })
            .catch(err => console.error("Error al copiar texto:", err));
    } else {
        alert("El campo está vacío, no hay nada que copiar.");
    }
};

copyButton.addEventListener('click', copytoClipboard);

// Get checked options
const getCheckedOptions = () => Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

// Strength bar value
function updateStrength(strength) {

    const strengthLevels = ["TOO WEAK", "WEAK", "MEDIUM", "STRONG"];
    const classNames = ["too-weak", "weak", "medium", "strong"];

    // Reset strength bar and text
    bars.forEach(bar => bar.classList.remove('filled'));
    for (let i = 0; i < strength; i++) {
        bars[i].classList.add('filled');
    }

    strengthText.textContent = strengthLevels[strength - 1] || "";
    strengthText.className = `strength-label ${classNames[strength - 1] || ""}`;
};

// Update strength bar
const handleCheckbox = () => {
    updateStrength(getCheckedOptions().length);
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', handleCheckbox);
});

const generatePassword = () => {

    const selectedOptions = getCheckedOptions();
    const passwordLength = parseInt(value.textContent, 10); // You can adjust the password size

    if (selectedOptions.length === 0) {
        textField.value = "Select at least one option!";
        return;
    }

    if (passwordLength === 0) {
        alert("La longitud de la contraseña no puede ser cero. Por favor, aumenta el valor.");
        textField.value = "";
        return;
    }

    if (passwordLength < selectedOptions.length) {
        alert(`La longitud de la contraseña (${passwordLength}) es menor que las opciones seleccionadas (${selectedOptions.length}). Generando con las primeras ${passwordLength} opciones.`);
        selectedOptions.splice(passwordLength); // Reduce to first 'passwordLength' options
    }

    let password = "";
    let charPool = "";

    // Add at least one character from each selected option
    selectedOptions.forEach(option => {
        const charSet = CHAR_SETS[option.toLowerCase()];
        password += charSet[Math.floor(Math.random() * charSet.length)];
        charPool += charSet; // Add all characters to the pool
    });

    while (password.length < passwordLength) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randomIndex];
    }

    // Shuffle the password
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    textField.value = password;
}

generateButton.addEventListener('click', generatePassword);

