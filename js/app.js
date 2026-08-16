const pokeApi = "https://pokeapi.co/api/v2/";

// Create a list of cards for both players
let playerDeck = [];
let computerDeck = [];

// Locate the html elements to changed
const playerCountTxt = document.querySelector("#player-count");
const computerCountTxt = document.querySelector("#computer-count");
const gameStatus = document.querySelector("#game-status");
const startBtn = document.querySelector("#start-btn");

async function multiplePokemons() {
  gameStatus.textContent = "Handing out Pokemons from the API";
  // Dactivate the button before start
  startBtn.disabled = true;
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

  // Deal out the cards -- 20 card then split them into 10 card each
  playerCountTxt.textContent = playerDeck.length;
  computerCountTxt.textContent = computerDeck.lenght;

  // Start btn getting prepared
  gameStatus.textContent = "Players have their Pokemonss! Lets get ready to rumble!";
  startBtn.textContent = "Play a round!";
  startBtn.disabled = false;
}

multiplePokemons();
