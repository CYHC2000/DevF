// ===============================
// Base de datos JSON de libros
// ===============================

const biblioteca = {
  libros: [
    {
      titulo: "Cien Años de Soledad",
      autor: "Gabriel García Márquez",
      genero: "Realismo Mágico",
      disponible: true
    },
    {
      titulo: "1984",
      autor: "George Orwell",
      genero: "Distopía",
      disponible: false
    },
    {
      titulo: "El Principito",
      autor: "Antoine de Saint-Exupéry",
      genero: "Fantasía",
      disponible: true
    }
  ]
};


// ===============================
// Simular lectura asincrónica
// ===============================

function leerDatos(callback) {

  console.log("Leyendo datos de la biblioteca...");

  setTimeout(() => {

    callback(biblioteca);

  }, 2000);
}


// ===============================
// Simular escritura asincrónica
// ===============================

function escribirDatos(datos, callback) {

  console.log("Guardando cambios...");

  setTimeout(() => {

    callback("Datos guardados correctamente");

  }, 1500);
}


// ===============================
// Consultar inventario
// ===============================

function mostrarLibros() {

  leerDatos((datos) => {

    console.log("\n===== INVENTARIO =====");

    datos.libros.forEach((libro, index) => {

      console.log(`
Libro #${index + 1}
Título: ${libro.titulo}
Autor: ${libro.autor}
Género: ${libro.genero}
Disponible: ${libro.disponible ? "Sí" : "No"}
      `);

    });

  });

}


// ===============================
// Agregar nuevo libro
// ===============================

function agregarLibro(
  titulo,
  autor,
  genero,
  disponible
) {

  const nuevoLibro = {
    titulo,
    autor,
    genero,
    disponible
  };

  leerDatos((datos) => {

    datos.libros.push(nuevoLibro);

    escribirDatos(datos, (mensaje) => {

      console.log("\n" + mensaje);
      console.log(`Libro "${titulo}" agregado`);

    });

  });

}


// ===============================
// Actualizar disponibilidad
// ===============================

function actualizarDisponibilidad(
  titulo,
  estado
) {

  leerDatos((datos) => {

    const libro = datos.libros.find(
      libro => libro.titulo === titulo
    );

    if (!libro) {

      console.log(
        `No se encontró el libro: ${titulo}`
      );

      return;
    }

    libro.disponible = estado;

    escribirDatos(datos, (mensaje) => {

      console.log("\n" + mensaje);

      console.log(
        `Disponibilidad actualizada:
${titulo} -> ${
          estado ? "Disponible" : "Prestado"
        }`
      );

    });

  });

}


// ===============================
// Pruebas del sistema
// ===============================

// Mostrar inventario inicial
mostrarLibros();


// Agregar un nuevo libro
agregarLibro(
  "Harry Potter",
  "J.K. Rowling",
  "Fantasía",
  true
);


// Cambiar disponibilidad
actualizarDisponibilidad(
  "1984",
  true
);