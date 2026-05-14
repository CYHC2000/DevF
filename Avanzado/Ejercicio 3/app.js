const API_URL = "https://rickandmortyapi.com/api/character";

const dataContainer =
  document.getElementById("data-container");

const fetchBtn =
  document.getElementById("fetch-btn");

const axiosBtn =
  document.getElementById("axios-btn");


function displayCharacters(characters) {

  dataContainer.innerHTML = "";

  characters.forEach(character => {

    const card = document.createElement("div");

    card.classList.add("card");

    card.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <h3>${character.name}</h3>
      <p>Especie: ${character.species}</p>
      <p>Estado: ${character.status}</p>
    `;

    dataContainer.appendChild(card);

  });

}


async function getCharactersFetch() {

  try {

    dataContainer.innerHTML =
      "<p>Cargando personajes...</p>";

    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Error al obtener datos");
    }

    const data = await response.json();

    displayCharacters(data.results);

  } catch (error) {

    console.error(error);

    dataContainer.innerHTML = `
      <p>Error con Fetch</p>
    `;
  }

}


async function getCharactersAxios() {

  try {

    dataContainer.innerHTML =
      "<p>Cargando personajes...</p>";

    const response = await axios.get(API_URL);

    displayCharacters(response.data.results);

  } catch (error) {

    console.error(error);

    dataContainer.innerHTML = `
      <p>Error con Axios</p>
    `;
  }

}

fetchBtn.addEventListener(
  "click",
  getCharactersFetch
);

axiosBtn.addEventListener(
  "click",
  getCharactersAxios
);