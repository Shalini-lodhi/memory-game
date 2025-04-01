import axios from "axios";

const API_BASE_URL = "/api/games";

// Save game details when the game ends
export const saveGameDetails = async (gameData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/save`, gameData);
    return response.data;
  } catch (error) {
    console.error("Error saving game details:", error);
    throw error;
  }
};
   