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

function grouped(arr){
    const alphabeticOrder = Object.groupBy(gifts, (letter) => letter[0].toUpperCase());

    return{
        alphabeticOrder
    }
}


function findGift(arr,gift){
    let i = 0
    let j = 0
    let flag = false
    let find = false
    let giftLetters = gift.toUpperCase().split('')

    while(i < arr.length || flag == true ){

        if(giftLetters.includes(arr[i])){
            flag = true
            while(j < arr[i].length || find == true){
                if(arr[i][j] == gift)
            }
        } else{
            i++
        }

    }
}

console.log(grouped(gifts).alphabeticOrder)