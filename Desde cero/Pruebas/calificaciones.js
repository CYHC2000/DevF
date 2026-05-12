let calificacion = Number(prompt("Ingresa tu calificación:"));

if (calificacion >= 90) {
    console.log("Excelente");
} 
else if (calificacion > 75 && calificacion <= 89) {
    console.log("Bien");
} 
else if (calificacion > 60 && calificacion <= 75) {
    console.log("Suficiente");
} 
else {
    console.log("El estudiante no aprueba");
}

