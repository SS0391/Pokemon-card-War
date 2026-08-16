const pokeApi = "https://pokeapi.co/api/v2/";

// Create a list of cards for both players
let playerDeck = [];
let computerDeck = [];

// Locate the html elements to changed
const playerCountTxt = document.querySelector("#player-count");
const computerCountTxt = document.querySelector("#computer-count");
const gameStatus = document.querySelector("#loading");
const startBtn = document.querySelector("#start-btn");

const playerCardSlot = document.querySelector("#player-card");
const computerCardSlot = document.querySelector("#computer-card");
// Function to make it possible to render Pokemon cards

const renderPokemonCard = (pokemon, cardSlotsE) => {
  // This emptys the deck before new cards arrive
  cardSlotsE.textContent = "";

  // Collect data from the PokeApi like : name -- stats

  let mainType = "unknown";
  if (pokemon.types && pokemon.types[0] && pokemon.types[0].type) {
    mainType = pokemon.types[0].type.name;
  }

  const cardInner = document.createElement("div");
  cardInner.classList.add("pokemon-card-inner");

  const pokemonID = document.createElement("div");
  pokemonID.classList.add("pokemon-id");
  pokemonID.textContent = `#${pokemon.id}`;

  const cardTitle = document.createElement("h3");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = pokemon.name;

  const typeOfPokemon = document.createElement("span");
  typeOfPokemon.classList.add("type-of-pokemon");
  typeOfPokemon.textContent = mainType;

  const imgOfPokemon = document.createElement("img");
  imgOfPokemon.src = pokemon.sprites.other["official-artwork"].front_default;
  imgOfPokemon.alt = pokemon.name;
  imgOfPokemon.classList.add("pokemon-card-image");

  const pokeStats = document.createElement("div");
  pokeStats.classList.add("pokemon-stats");

  const xpStats = document.createElement("div");
  xpStats.classList.add("stat-line", "xp-line");

  const xpLabel = document.createElement("span");
  xpLabel.textContent = "Base XP:";

  const xpVal = document.createElement("span");
  xpVal.textContent = pokemon.base_experience;

  xpStats.appendChild(xpLabel);
  xpStats.appendChild(xpVal);
  pokeStats.appendChild(xpStats);

  cardInner.appendChild(pokemonID);
  cardInner.appendChild(cardTitle);
  cardInner.appendChild(typeOfPokemon);
  cardInner.appendChild(imgOfPokemon);
  cardInner.appendChild(pokeStats);

  cardSlotsE.appendChild(cardInner);
};

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
  startBtn.textContent = "Start Game";
  startBtn.disabled = false;

  // check if I get a pictures and stats from the api
}

const playRound = () => {
  if (playerDeck.length === 0 || computerDeck.length === 0) {
    if (playerDeck.length > computerDeck.length) {
      gameStatus.textContent = "You won! lets go!";
    } else {
      gameStatus.textContent = "You lost! try again!";
    }
    startBtn.textContent = "Play New Game!";
    playerCardSlot.textContent = "Player 1 Card";
    computerCardSlot.textContent = "Player 2 card";
    return;
  }

  // remove the top card in every deck

  const playerCard = playerDeck.shift();
  const computerCard = computerDeck.shift();

  renderPokemonCard(playerCard, playerCardSlot);
  renderPokemonCard(computerCard, computerCardSlot);

  const playerXp = playerCard.base_experience || 0;
  const computerXp = computerCard.base_experience || 0;

  if (playerXp > computerXp) {
    gameStatus.textContent = `You won this round! ${playerCard.name.toUpperCase()} (${playerXp} XP) beat ${computerCard.name.toUpperCase()} (${computerXp} XP)!`;
    playerDeck.push(playerCard, computerCard);
  } else if (computerXp > playerXp) {
    gameStatus.textContent = `The computer won this round... auch! ${computerCard.name.toUpperCase()} (${computerXp} XP) beat ${playerCard.name.toUpperCase()} (${playerXp} XP).`;
    computerDeck.push(playerCard, computerCard);
  } else {
    gameStatus.textContent = `Its a tie! Both players had ${playerXp} XPP. The cards were discarded! `;
  }

  playerCountTxt.textContent = playerDeck.length;
  computerCountTxt.textContent = computerDeck.length;
};

multiplePokemons();

startBtn.addEventListener("click", () => {
  if (startBtn.textContent === "Play a Round!") {
    multiplePokemons();
  } else {
    playRound();
  }
});
