let libros = [
  "Cien años de soledad",
  "El principito",
  "1984",
  "Don Quijote de la Mancha",
  "Orgullo y prejuicio",
  "Crónica de una muerte anunciada",
  "Fahrenheit 451",
  "El señor de los anillos",
  "Rayuela",
  "Los juegos del hambre"
];

let lectura = {
  "Cien años de soledad": 2,
  "El principito": 1,
  "1984": 0,
  "Don Quijote de la Mancha": 2,
  "Orgullo y prejuicio": 1,
  "Crónica de una muerte anunciada": 0,
  "Fahrenheit 451": 1,
  "El señor de los anillos": 2,
  "Rayuela": 0,
  "Los juegos del hambre": 1
};


function obtenerLibrosLeidos(libros, lectura) {
    let leidos = [];

    for (let i = 0; i < libros.length; i++) {
        let libro = libros[i];

        if (lectura[libro] === 2) {
            leidos.push(libro);
        }
    }

    return leidos;
}

function obtenerLibrosPendientes(libros, lectura) {
    let pendientes = [];

    for (let i = 0; i < libros.length; i++) {
        let libro = libros[i];

        if (lectura[libro] !== 2) {
            pendientes.push(libro);
        }
    }

    return pendientes;
}

let leidos = obtenerLibrosLeidos(libros, lectura);
let pendientes = obtenerLibrosPendientes(libros, lectura);

console.log("Libros leídos:", leidos);
console.log("Libros pendientes:", pendientes);
