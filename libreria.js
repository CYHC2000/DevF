function Libro(titulo, autor, anio, estado) {
    this.titulo = titulo;
    this.autor = autor;
    this.anio = anio;
    this.estado = estado;

    this.descripcion = function () {
        console.log(
            `El libro titulado: '${this.titulo}', del autor: ${this.autor}, escrito en el año ${this.anio}.
Esta: ${this.estado}.`
        );
    };
}

let libreria = [];

let cantidad = Number(prompt("¿Cuántos libros vas a ingresar?"));

for (let i = 0; i < cantidad; i++) {

    let titulo = prompt("¿Cuál es el título del libro?");
    let autor = prompt("¿Cuál es su autor?");
    let anio = Number(prompt("¿En qué año fue publicado?"));
    let estado = prompt("Estado (Disponible/Prestado)");

    let libro = new Libro(titulo, autor, anio, estado);

    libreria.push(libro);
}

console.log("Libros en la librería:");

for (let i = 0; i < libreria.length; i++) {
    libreria[i].descripcion();
}
