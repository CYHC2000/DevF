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

const formAgregar = document.getElementById("formAgregar");

const formActualizar = document.getElementById("formActualizar");

document
  .getElementById("mostrarAgregar")
  .addEventListener("click", () => {
    formAgregar.classList.toggle(
      "oculto"
    );

  });

document
  .getElementById("mostrarActualizar")
  .addEventListener("click", () => {
    formActualizar.classList.toggle(
      "oculto"
    );
  });

const librosContainer =
  document.getElementById("librosContainer");

function leerDatos(callback){

  setTimeout(() => {

    callback(biblioteca);

  }, 500);

}

function escribirDatos(datos, callback){

  setTimeout(() => {

    callback("Datos guardados");

  }, 500);

}

function renderizarLibros(datos){

  librosContainer.innerHTML = "";

  datos.libros.forEach((libro) => {

    const card =
      document.createElement("div");

    card.classList.add("card");

    card.innerHTML = `
      <h3>${libro.titulo}</h3>

      <p>
        <strong>Autor:</strong>
        ${libro.autor}
      </p>

      <p>
        <strong>Género:</strong>
        ${libro.genero}
      </p>

      <p>
        <strong>Disponible:</strong>

        <span class="${
          libro.disponible
            ? "disponible"
            : "no-disponible"
        }">

          ${
            libro.disponible
              ? "Sí"
              : "No"
          }

        </span>
      </p>
    `;

    librosContainer.appendChild(card);

  });

}

function mostrarLibros(){

  leerDatos((datos) => {

    renderizarLibros(datos);

  });

}

function agregarLibro(
  titulo,
  autor,
  genero,
  disponible
){

  const nuevoLibro = {
    titulo,
    autor,
    genero,
    disponible
  };

  leerDatos((datos) => {

    datos.libros.push(nuevoLibro);

    escribirDatos(datos, () => {

      mostrarLibros();

    });

  });

}

function actualizarDisponibilidad(
  titulo,
  estado
){

  leerDatos((datos) => {

    const libro =
      datos.libros.find(
        libro => libro.titulo === titulo
      );

    if(!libro){

      alert("Libro no encontrado");

      return;
    }

    libro.disponible = estado;

    escribirDatos(datos, () => {

      mostrarLibros();

    });

  });

}

document
  .getElementById("mostrarBtn")
  .addEventListener(
    "click",
    mostrarLibros
  );

document
  .getElementById("agregarBtn")
  .addEventListener("click", () => {

    const titulo =
      document.getElementById("titulo").value;

    const autor =
      document.getElementById("autor").value;

    const genero =
      document.getElementById("genero").value;

    const disponible =
      document.getElementById("disponible").value
      === "true";

    agregarLibro(
      titulo,
      autor,
      genero,
      disponible
    );

  });

document
  .getElementById("actualizarBtn")
  .addEventListener("click", () => {

    const titulo =
      document.getElementById(
        "tituloActualizar"
      ).value;

    const estado =
      document.getElementById(
        "nuevoEstado"
      ).value === "true";

    actualizarDisponibilidad(
      titulo,
      estado
    );

  });
