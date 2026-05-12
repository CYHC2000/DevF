const slider = document.getElementById("lengthSlider");
const lengthNumber = document.getElementById("lengthNumber");
const generateBtn = document.getElementById("generateBtn");
const passwordText = document.getElementById("passwordText");
const copyBtn = document.getElementById("copyBtn");

const uppercaseCheck = document.getElementById("uppercase");
const lowcaseCheck = document.getElementById("lowcase");
const numbersCheck = document.getElementById("numbers");
const symbolsCheck = document.getElementById("symbols");

const container = document.querySelector(".back");

const strengthText = document.querySelector(".strength");
const bars = document.querySelectorAll(".bar");


function updateStrength() {

    const length = parseInt(slider.value);

    const hasUpper = uppercaseCheck.checked;
    const hasLower = lowcaseCheck.checked;
    const hasNumber = numbersCheck.checked;
    const hasSymbol = symbolsCheck.checked;

    const typesSelected = [hasUpper, hasLower, hasNumber, hasSymbol]
        .filter(Boolean).length;

    let level = 1;
    let label = "LOW";

    // =========================
    // STRONG (Muy Alta)
    // =========================
    if (
        (length >= 18 && typesSelected === 4) ||
        (length >= 16 && typesSelected === 4)
    ) {
        level = 4;
        label = "STRONG";
    }

    // =========================
    // HARD (Alta)
    // =========================
    else if (
        (length >= 16 && length <= 17 && typesSelected >= 3) ||
        (hasNumber && hasSymbol && typesSelected >= 3)
    ) {
        level = 3;
        label = "HARD";
    }

    // =========================
    // MEDIUM (Media)
    // =========================
    else if (
        (length >= 12 && length <= 15 && typesSelected >= 2) ||
        (typesSelected === 2 && length > 8)
    ) {
        level = 2;
        label = "MEDIUM";
    }

    // =========================
    // LOW (Baja)
    // =========================
    else if (
        (length >= 8 && length <= 11) ||
        typesSelected === 1
    ) {
        level = 1;
        label = "LOW";
    }

    strengthText.textContent = label;

    // Reset bars
    bars.forEach(bar => {
        bar.style.backgroundColor = "transparent";
        bar.style.borderColor = "#c7e0e7";
    });

    // Pintar barras
    for (let i = 0; i < level; i++) {
        bars[i].style.backgroundColor = "#f5d742";
        bars[i].style.borderColor = "#f5d742";
    }
}

// =========================
// SLIDER LOGIC
// =========================

// Mostrar valor inicial
lengthNumber.textContent = slider.value;

// Actualizar número y fondo dinámico
function updateSlider() {
    const min = slider.min;
    const max = slider.max;
    const val = slider.value;

    const percentage = ((val - min) / (max - min)) * 100;

    slider.style.background = `linear-gradient(
        to right,
        #a3e9a8 0%,
        #a3e9a8 ${percentage}%,
        #131216 ${percentage}%,
        #131216 100%
    )`;

    // Fondo negro cuando esté al mínimo
    if (val == min) {
        container.style.backgroundColor = "#000";
    } else {
        container.style.backgroundColor = "#131216";
    }
}

// Ejecutar al cargar
updateSlider();

// Escuchar cambios
slider.addEventListener("input", () => {
    lengthNumber.textContent = slider.value;
    updateSlider();
});

// =========================
// GENERATE PASSWORD
// =========================

generateBtn.addEventListener("click", () => {

    let length = slider.value;
    let characters = "";

    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowcase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+{}[]<>?/";

    if (uppercaseCheck.checked) characters += uppercase;
    if (lowcaseCheck.checked) characters += lowcase;
    if (numbersCheck.checked) characters += numbers;
    if (symbolsCheck.checked) characters += symbols;

    if (characters === "") {
        alert("Selecciona al menos una opción");
        return;
    }

    let password = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    passwordText.textContent = password;
});

// =========================
// COPY BUTTON
// =========================

copyBtn.addEventListener("click", async () => {
    const password = passwordText.textContent;

    if (password === "Password") return;

    try {
        await navigator.clipboard.writeText(password);
        alert("Contraseña copiada");
    } catch (err) {
        alert("Error al copiar");
    }
});


updateStrength();
[uppercaseCheck, lowcaseCheck, numbersCheck, symbolsCheck].forEach(input => {
    input.addEventListener("change", updateStrength);
});
slider.addEventListener("input", () => {
    lengthNumber.textContent = slider.value;
    updateSlider();
    updateStrength();
});