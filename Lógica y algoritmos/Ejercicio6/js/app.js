const gifts = [
    "Libro",
    "Flores",
    "Chocolates",
    "Perfume",
    "Reloj",
    "Cafetera",
    "Auriculares",
    "Mochila",
    "Bufanda",
    "Juego de mesa",
    "Tarjeta regalo",
    "Planta",
    "Vino",
    "Camiseta",
    "Zapatos",
    "Pulsera",
    "Collar",
    "Cuadro",
    "Velas aromáticas",
    "Taza personalizada",
    "Mochila térmica",
    "Cámara fotográfica",
    "Altavoz bluetooth",
    "Patines",
    "Bicicleta",
    "Set de maquillaje",
    "Corbata",
    "Gafas de sol",
    "Diario",
    "Bolígrafo elegante",
    "Manta",
    "Almohada",
    "Lámpara",
    "Suscripción a revista",
    "Entradas para concierto",
    "Set de té",
    "Robot de cocina",
    "Cojín decorativo",
    "Juguete",
    "Rompecabezas",
    "Pinturas",
    "Instrumento musical",
    "Póster",
    "Carátula para móvil",
    "Power bank",
    "Tostadora",
    "Libreta",
    "Set de jabones",
    "Zapatillas de casa",
    "Bolso"
];

// Crear un Map para búsqueda rápida
const giftMap = new Map();
gifts.forEach(gift => giftMap.set(gift, true));

function findGiftMap(gift) {
    if (giftMap.has(gift)) {
        return "Regalo encontrado: " + gift + ".\nPuedes regalarlo";
    } else {
        return "Lo siento, no puedes darle ese regalo";
    }
}

const searchBtn = document.getElementById('searchBtn');
const giftInput = document.getElementById('giftInput');
const resultMessage = document.getElementById('resultMessage');

function handleSearch() {
    const giftName = giftInput.value.trim();
    
    if (giftName === "") {
        resultMessage.textContent = "Por favor, ingresa el nombre de un regalo";
        resultMessage.className = "result-message error";
        return;
    }
    
    const result = findGiftMap(giftName);
    resultMessage.textContent = result;
    
    if (result.includes("encontrado")) {
        resultMessage.className = "result-message success";
    } else {
        resultMessage.className = "result-message error";
    }
    
    giftInput.value = "";
}

searchBtn.addEventListener('click', handleSearch);

giftInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        handleSearch();
    }
});