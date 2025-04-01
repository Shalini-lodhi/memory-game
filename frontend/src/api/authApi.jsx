import axios from "axios";

const API_URL = "/api/auth";

export const registerUser = async (userData) => {
  try {
    // Register the user
    const response = await axios.post(`${API_URL}/register`, userData);

    // After successful registration, automatically log in
    return await loginUser({ email: userData.email, password: userData.password });
  } catch (error) {
    console.error("Registration failed:", error.response?.data || error.message);
    throw error;
  }
};

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