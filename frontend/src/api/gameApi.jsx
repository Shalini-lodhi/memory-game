// import axios from "axios";

// const API_URL = "http://localhost:5000/api/game"; // Ensure this matches your backend

// export const startGame = async (themeId) => {
//   return axios.post(`${API_URL}/start`, { theme_id: themeId });
// };

// export const makeMove = async (gameId, cardId) => {
//   return axios.post(`${API_URL}/move`, { game_id: gameId, card_id: cardId });
// };

const BASE_URL = "http://localhost:5000/api/games";

export const startGame = async (themeId) => {
  const response = await fetch(`${BASE_URL}/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ themeId }),
  });
  return response.json();
};

export const makeMove = async (gameId, cardId) => {
  const response = await fetch(`${BASE_URL}/move`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ gameId, cardId }),
  });
  return response.json();
};
