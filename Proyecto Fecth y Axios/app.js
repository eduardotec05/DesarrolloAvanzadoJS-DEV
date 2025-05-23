// Implementa las Solicitudes con Fetch
const fetchBtn = document.getElementById("fetch-btn");
const axiosBtn = document.getElementById("axios-btn");
const dataContainer = document.getElementById("data-container");

// Fetch mejorado
fetchBtn.addEventListener("click", async () => {
  try {
    dataContainer.innerHTML = '<p class="loading">Cargando con Fetch...</p>';
    const response = await fetch("https://rickandmortyapi.com/api/character");

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    renderCharacters(data.results);
  } catch (error) {
    handleError(error);
  }
});

// Axios mejorado
axiosBtn.addEventListener("click", async () => {
  try {
    dataContainer.innerHTML = '<p class="loading">Cargando con Axios...</p>';
    const response = await axios.get(
      "https://rickandmortyapi.com/api/character"
    );
    renderCharacters(response.data.results);
  } catch (error) {
    handleError(error);
  }
});


function renderCharacters(characters) {
  dataContainer.innerHTML = ""; 
  characters.forEach((character) => {
    const characterElement = document.createElement("div");
    characterElement.className = "character-card";
    characterElement.innerHTML = `
        <h3>${character.name}</h3>
        <img src="${character.image}" alt="${character.name}" loading="lazy">
        <p>Status: ${character.status}</p>
        <p>Species: ${character.species}</p>
      `;
    dataContainer.appendChild(characterElement);
  });
}

// Manejo de errores centralizado
function handleError(error) {
  console.error("Error:", error);
  dataContainer.innerHTML = `
      <div class="error-message">
        <p>Hubo un error al obtener los datos.</p>
        <p>${error.message}</p>
      </div>
    `;
}

