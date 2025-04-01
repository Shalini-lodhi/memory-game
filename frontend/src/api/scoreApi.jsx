import axios from "axios";

const API_BASE_URL = "/api/scores";

export const saveScore = async (scoreData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Error: No token found. User not authenticated.");
    return; // Stop execution if there's no token
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/save`, scoreData, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json", // Ensure correct content type
      },
    });
    return response.data; // Return response for further use
  } catch (error) {
    console.error(
      "Error saving score:",
      error.response?.data || error.message
    );
  }
};

export const getUserScores = async (userId, theme) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found. User not authenticated.");
    return;
  }

  try {
    const response = await axios.get(
      `${API_BASE_URL}/user-scores?userId=${userId}&theme=${theme}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user score:",
      error.response?.data || error.message
    );
    return { score: 0 };
  }
};

export const getHighestScore = async (theme) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/highest-score`, {
      params: { theme }, // Send theme as query param
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching highest score:", error);
    return { highestScore: null };
  }
};


export const getLeaderboard = async (theme) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/leaderboard`, { params: { theme } });
    return response.data;
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
};