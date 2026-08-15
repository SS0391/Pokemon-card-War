const pokeApi = "https://pokeapi.co/api/v2/";

async function fetchAPokemon() {
  const poke = await fetch(pokeApi + "pokemon/9");
  const data = await poke.json();
  console.log("Data from API", data);
  console.log("Name on the pokemon is", data.name);
}

fetchAPokemon();
