import React, { useState, useEffect, useContext } from "react";
import { getThemes } from "../api/themeApi";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const [playerName, setPlayerName] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [themes, setThemes] = useState([]); // Store array of themes
  const [selectedThemeValue, setSelectedThemeValue] = useState(""); // Store selected theme name
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  // Fetch themes from backend
  useEffect(() => {
    getThemes()
      .then((data) => {
        setThemes(data); // Store the themes array

        if (data.length > 0) {
          setSelectedThemeValue(data[0].name); // Default selection to first theme name
        }
      })
      .catch((error) => console.error("Error fetching themes:", error));
  }, []);

  const handleStartGame = (event) => {
    event.preventDefault();
    if (!playerName || !passwordValue) {
      alert("Please enter your name and password.");
      return;
    }

    const selectedTheme = themes.find(
      (theme) => theme.name === selectedThemeValue
    );
    if (!selectedTheme) {
      alert("Selected theme not found.");
      return;
    }

    // Ensure images are correctly extracted
    const imagesArray = selectedTheme.images || []; // Fix potential undefined issue
    const encodedImages = encodeURIComponent(JSON.stringify(imagesArray)); // Encode safely

    navigate(
      `/game?theme=${selectedThemeValue}&player=${playerName}&images=${encodedImages}`
    );
  };
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      {/* Logout Button in the top-right corner */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
      >
        Logout
      </button>
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <DotLottieReact
          src="https://lottie.host/001f3da0-ba23-4664-a9b8-37983596a1c6/0X8jBj6mit.lottie"
          loop
          autoplay
        />
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Memory Game
        </h1>

        <form onSubmit={handleStartGame} className="flex flex-col space-y-4">
          {/* Name Input */}
          <label className="flex flex-col">
            <span className="text-gray-700 font-medium">Name:</span>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your name"
            />
          </label>

          {/* Password Input */}
          <label className="flex flex-col">
            <span className="text-gray-700 font-medium">Password:</span>
            <input
              type="password"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              className="mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter password"
            />
          </label>

          {/* Theme Selector */}
          <label className="flex flex-col">
            <span className="text-gray-700 font-medium">Theme:</span>
            <select
              value={selectedThemeValue}
              onChange={(e) => setSelectedThemeValue(e.target.value)}
              className="mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              {themes.length > 0 ? (
                themes.map((theme) => (
                  <option key={theme._id} value={theme.name}>
                    {theme.name} {/* ✅ Show theme names */}
                  </option>
                ))
              ) : (
                <option disabled>Loading themes...</option>
              )}
            </select>
          </label>

          {/* Start Game Button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-md transition duration-300"
          >
            Let's Start
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
