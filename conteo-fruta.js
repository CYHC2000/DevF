let frutas = [
  "Kiwi",
  "Manzana",
  "Uva",
  "Piña",
  "Fresa",
  "Mango",
  "Naranja",
  "Sandía",
  "Durazno",
  "Plátano",
  "Uva",
  "Kiwi",
  "Cereza",
  "Manzana",
  "Mango",
  "Papaya",
  "Fresa",
  "Granada",
  "Naranja",
  "Pera"
];


let conteo = {};

for (let i = 0; i < frutas.length; i++) {
    let fruta = frutas[i];
    
    if (conteo[fruta]) {
        conteo[fruta]++;
    } else {
        conteo[fruta] = 1;
    }
}

console.log(conteo)