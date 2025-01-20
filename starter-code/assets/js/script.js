const textField = document.getElementById("passwordValue");
const copyButton = document.getElementById("copy-button");
const value = document.querySelector("#password-length-value");
const input = document.querySelector("#password-length");
const checkboxes = document.querySelectorAll("input[type='checkbox']");
const generateButton = document.getElementById("generatePassword");
const bars = document.querySelectorAll('.bar');
const strengthText = document.getElementById('strengthLabel');

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
            .then(() => alert("¡Texto copiado al portapapeles!"))
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

    const strengthLevels = ["Too weak", "Weak", "Medium", "Strong"];
    const classNames = ["too-weak", "weak", "medium", "strong"];

    // Reset strength bar and text
    bars.forEach(bar => bar.classList.remove('filled'));
    for (let i = 0; i < strength; i++) {
        bars[i].classList.add('filled');
    }

    strengthText.textContent = strengthLevels[strength - 1] || "";
    strengthText.className = `strength-label ${classNames[strength - 1] || ""}`;
};

// Agregar un evento change a cada checkbox
const handleCheckbox = () => {
    // Update strength bar
    updateStrength(getCheckedOptions().length);
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', handleCheckbox);
});

const generatePassword = () => {

    const selectedOptions = getCheckedOptions();
    let charPool = selectedOptions.map(option => CHAR_SETS[option.toLowerCase()]).join('');

    const passwordLength = parseInt(value.textContent, 10); // You can adjust the password size
    let password = "";

    if (charPool.length > 0) {
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * charPool.length);
            password += charPool[randomIndex];
        }
    } else {
        password = "Select at least one option!";
    }

    textField.value = password;
}

generateButton.addEventListener('click', generatePassword);

