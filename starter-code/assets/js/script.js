const textField = document.getElementById("passwordValue");
const copyButton = document.getElementById("copy-button");
const value = document.querySelector("#password-length-value");
const input = document.querySelector("#password-length");
const checkboxes = document.querySelectorAll("input[type='checkbox']");


// Function to copy to clipboard
copyButton.addEventListener("click", () => {
    if (textField.value) {
        navigator.clipboard.writeText(textField.value)
            .then(() => {
                alert("¡Texto copiado al portapapeles!");
            })
            .catch(err => {
                console.error("Error al copiar texto:", err);
            });
    } else {
        alert("El campo está vacío, no hay nada que copiar.");
    }
});

// Password length value
value.textContent = input.value;
input.addEventListener("input", (event) => {
    value.textContent = event.target.value;
});

function handleCheckbox() {
    // Obtaining checked items
    const checkedItems = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    // Update strength bar
    updateStrength(checkedItems.length);
}

// Agregar un evento change a cada checkbox
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', handleCheckbox);
});

// Strength bar value
function updateStrength(strength) {
    const bars = document.querySelectorAll('.bar');
    const strengthText = document.getElementById('strengthLabel');

    // Reset all bars
    bars.forEach(bar => bar.classList.remove('filled'));

    // Fill bars according to strength
    for (let i = 0; i < strength; i++) {
        bars[i].classList.add('filled');
    }

    // Update strength text
    let text = '';
    let className = 'too-weak';
    if (strength === 1) {
        text = 'Too weak';
        className = 'too-weak';
    } else if (strength === 2) {
        text = 'Weak';
        className = 'weak';
    } else if (strength === 3) {
        text = 'Medium';
        className = 'medium';
    } else if (strength === 4) {
        text = 'Strong';
        className = 'strong';
    }
    strengthText.textContent = text;
    strengthText.className = `strength-label ${className}`;
}

const generatePassword = () => {
    const includeLowercase = document.getElementById('lowercase-letters').checked;
    const includeUppercase = document.getElementById('uppercase-letters').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSpecial = document.getElementById('symbols').checked;

    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const specialChars = "!@#$%^&*()_+[]{}|;:',.<>?/`~";

    let charPool = "";

    if (includeLowercase) charPool += lowercaseChars;
    if (includeUppercase) charPool += uppercaseChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSpecial) charPool += specialChars;

    const passwordLength = value.textContent; // Puedes ajustar el tamaño de la contraseña
    let password = "";

    if (charPool.length > 0) {
      for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randomIndex];
      }
    } else {
      password = "Select at least one option!";
    }

    document.getElementById('passwordValue').value = password;
}

document.getElementById('generatePassword').addEventListener('click', generatePassword);

