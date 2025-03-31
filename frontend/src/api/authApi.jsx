import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const registerUser = async (userData) =>
  axios.post(`${API_URL}/register`, userData);

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token); // Save JWT token
    }

    return response;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};