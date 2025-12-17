export const gameState = {
  characters: [],
  day: 1,
  logs: [],
  affectionMode: false,
  isDarkMode: false
};

export function setCharacters(newCharacters) {
  gameState.characters = newCharacters;
}

export function resetLogs() {
  gameState.logs = [];
}