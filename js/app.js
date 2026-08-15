const pokeApi = "https://pokeapi.co/api/v2/";

async function multiplePokemons() {
  // Create a empty string to gather the Pokemons
  const cards = [];
  const numberOfPokemons = 20;

  for (let i = 0; i < numberOfPokemons; i++) {
    const randomPokemon = Math.floor(Math.random() * 151 + 1);
    const poke = await fetch(pokeApi + `pokemon/${randomPokemon}`);
    const data = await poke.json();

    cards.push(data);
  }

  console.log("Here is your cards!", cards);
  console.log(`Numbers of cards ${cards.length}`);
}

multiplePokemons();
