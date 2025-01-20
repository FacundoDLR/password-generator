const textField = document.getElementById("password-value");
const copyButton = document.getElementById("copy-button");
const value = document.querySelector("#password-length-value");
const input = document.querySelector("#password-length");
const checkboxes = document.querySelectorAll("input[type='checkbox']");

// Test to change the value of the text field after 2 seconds
setTimeout(() => {
    textField.value = "Contenido para copiar";
}, 2000);

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

