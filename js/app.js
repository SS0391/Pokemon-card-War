const pokeApi = "https://pokeapi.co/api/v2/";

// Create a list of cards for both players
let playerDeck = [];
let computerDeck = [];

// Locate the html elements to changed
const playerCountTxt = document.querySelector("#player-count");
const computerCountTxt = document.querySelector("#computer-count");
const gameStatus = document.querySelector("#loading");
const startBtn = document.querySelector("#start-btn");

async function multiplePokemons() {
  gameStatus.textContent = "Handing out Pokemons from the API";
  // Dactivate the button before start
  startBtn.disabled = true;
  // Create a empty string to gather the Pokemons
  const cards = [];
  const numberOfPokemons = 20;

  for (let i = 0; i < numberOfPokemons; i++) {
    // Only using the first 151 pokemons
    const randomPokemon = Math.floor(Math.random() * 151 + 1);
    const poke = await fetch(pokeApi + `pokemon/${randomPokemon}`);
    const data = await poke.json();

    cards.push(data);
  }

  console.log("Here is your cards!", cards);

  playerDeck = cards.slice(0, 10);
  computerDeck = cards.slice(10, 20);
  // Deal out the cards -- 20 card then split them into 10 card each
  playerCountTxt.textContent = playerDeck.length;
  computerCountTxt.textContent = computerDeck.length;

  // Start btn getting prepared
  gameStatus.textContent = "Players have their Pokemonss! Lets get ready to rumble!";
  startBtn.textContent = "Play a round!";
  startBtn.disabled = false;
}

multiplePokemons();

startBtn.addEventListener("click", () => {
  if (startBtn.textContent === "Start Game") {
    multiplePokemons();
  } else {
    gameStatus.textContent = "New will soon start";
  }
});
