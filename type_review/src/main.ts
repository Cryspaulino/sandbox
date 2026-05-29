const pokemonList = document.querySelector("#pokemon-list");
const pokemonDetails = document.querySelector("#pokemon-details");
const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=40";

function pokemonListTemplate(item) {
  return `<li><button data-url="${item.url}">${item.name}</button></li>`;
}

function pokemonDetailsTemplate(item) {
  return `
    <h2>${item.name}</h2>
    <p>Height: ${item.height}</p>
    <p>Weight: ${item.weight}</p>
    <img src="${item.sprites.front_default}" alt="${item.name}">
    `;
}

interface Pokemon{
  name: string;
  url: string;
}

function renderPokemonList(pokemon: Pokemon) {
  // const pokemonList = new Map<string, Pokemon>();
  // const pokemonListHTML: Pokemon[]s
  const pokemonListHtml = pokemon.map(pokemonListTemplate).join("");
  pokemonList.insertAdjacentHTML('afterbegin', pokemonListHtml);
}

async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function pokeListHandler(event: Event) {
  const target = event.target as HTMLElement;
  const pokemonUrl = target.dataset.url;
  if(!pokemonUrl) return;

  const list = await getData(pokemonUrl);
  const detailsHtml = pokemonDetailsTemplate(list);

  if(pokemonDetails) {
    pokemonDetails.innerHTML = '';
    pokemonDetails.insertAdjacentHTML('afterbegin', detailsHtml);
  }
}

async function init() {
  const data = await getData(apiUrl);
  const pokemon = data.results;
  renderPokemonList(pokemon);
}

if(pokemonList) {
  pokemonList.addEventListener('click', pokeListHandler)
}
init();