// import React, { useState, useEffect, useContext } from "react";
// import { getThemes } from "../api/themeApi";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import {
//   getUserScores,
//   getHighestScore,
//   getLeaderboard,
// } from "../api/scoreApi";
// import Leaderboard from "./Leaderboard";

// const Home = () => {
//   const [themes, setThemes] = useState([]);
//   const [selectedTheme, setSelectedTheme] = useState("Animals");
//   const [userHighScore, setUserHighScore] = useState(0);
//   const [overallHighScore, setOverallHighScore] = useState(0);
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [isLeaderboardOpen, setLeaderboardOpen] = useState(false);

//   // Handle theme selection
//   useEffect(() => {
//     getThemes()
//       .then((data) => {
//         setThemes(data);
//         // If no theme is saved in localStorage, set the default 'Animals'
//         if (!localStorage.getItem("theme")) {
//           localStorage.setItem("theme", "Animals");
//         }
//       })
//       .catch((error) => console.error("Error fetching themes:", error));
//   }, []);
//   const handleThemeChange = (e) => {
//     const newTheme = e.target.value;
//     setSelectedTheme(newTheme); // Update the selected theme state
//     localStorage.setItem("theme", newTheme); // Save the new theme to localStorage
//   };

//   // Fetch user-score & highest score
//   useEffect(() => {
//     if (user) {
//       getUserScores(user._id, selectedTheme).then((data) => {
//         setUserHighScore(data); // Best score (least moves, least time)
//       });

//       getHighestScore(selectedTheme).then((data) => {
//         setOverallHighScore(data); // Best overall score
//       });
//     }
//   }, [user, selectedTheme]);

//   // handle start game
//   const handleStartGame = (event) => {
//     event.preventDefault();
//     if (!selectedTheme) {
//       alert("Please select a theme.");
//       return;
//     }

//     const themeObj = themes.find((theme) => theme.name === selectedTheme);
//     if (!themeObj) {
//       alert("Selected theme not found.");
//       return;
//     }

//     const imagesArray = themeObj.images || [];
//     const encodedImages = encodeURIComponent(JSON.stringify(imagesArray));

//     navigate(
//       `/game?theme=${selectedTheme}&player=${
//         user?.username || "Guest"
//       }&userId=${user?._id}&images=${encodedImages}`
//     );
//   };

//   // handle logout
//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <div className="relative flex min-h-screen bg-gray-100">
//       {/* Logout Button (Top Right) */}
//       <button
//         onClick={handleLogout}
//         className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
//       >
//         Logout
//       </button>

//       {/* Left Side: Scoreboard */}
//       <div className="w-1/2 flex flex-col items-center justify-center bg-gray-200 p-6">
//         <h2 className="text-3xl font-bold text-gray-800 mb-4">Scoreboard</h2>

//         {/* Your Best Score */}
//         <div className="bg-white shadow-md rounded-lg p-6 w-2/3 text-center">
//           <div className="text-gray-700 text-lg font-semibold">
//             Your Best Score
//           </div>
//           {userHighScore ? (
//             <div className="mt-2">
//               <div className="text-lg font-semibold text-green-500">
//                 Score: {userHighScore.score || "--"}
//               </div>
//               <div className="text-lg font-semibold text-blue-500">
//                 Moves: {userHighScore.moves || "--"}
//               </div>
//               <div className="text-lg font-semibold text-gray-600">
//                 Time(s): {userHighScore.timeTaken || "-- "}
//               </div>
//             </div>
//           ) : (
//             <div className="text-gray-500">No score yet</div>
//           )}
//         </div>

//         {/* Highest Score (Least Moves & Time) */}
//         <div className="bg-white shadow-md rounded-lg p-6 w-2/3 text-center mt-4">
//           <div className="text-gray-700 text-lg font-semibold">
//             Highest Score
//           </div>
//           {overallHighScore ? (
//             <div className="mt-2">
//               <div className="text-lg font-semibold text-green-500">
//                 Score: {overallHighScore.score || "--"}
//               </div>
//               <div className="text-lg font-semibold text-blue-500">
//                 Moves: {overallHighScore.moves || "--"}
//               </div>
//               <div className="text-lg font-semibold text-gray-600">
//                 Time(s): {overallHighScore.timeTaken || "-- "}
//               </div>
//             </div>
//           ) : (
//             <div className="text-gray-500">No scores available</div>
//           )}
//         </div>
//         {/* Leaderboard Button */}
//         <button
//           onClick={() => setLeaderboardOpen(true)}
//           className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-md"
//         >
//           View Leaderboard
//         </button>
//       </div>

//       {/* Right Side: Welcome Message & Theme Selection */}
//       <div className="w-1/2 flex flex-col items-center justify-center p-6 bg-white shadow-lg">
//         <h1 className="text-3xl font-bold text-gray-800">
//           Welcome, {user?.username || "Guest"}!
//         </h1>

//         {/* Theme Selection */}
//         <label className="mt-6 flex flex-col w-2/3">
//           <span className="text-gray-700 font-medium">Select a Theme:</span>
//           <select
//             value={selectedTheme}
//             onChange={handleThemeChange}
//             className="mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//           >
//             {themes.length > 0 ? (
//               themes.map((theme) => (
//                 <option key={theme._id} value={theme.name}>
//                   {theme.name}
//                 </option>
//               ))
//             ) : (
//               <option disabled>Loading themes...</option>
//             )}
//           </select>
//         </label>

//         {/* Start Game Button */}
//         <button
//           onClick={handleStartGame}
//           className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-md transition duration-300"
//         >
//           Start Game
//         </button>
//       </div>
//       {/* Leaderboard Modal (Placed Here) */}
//       {isLeaderboardOpen && (
//         <Leaderboard
//           theme={selectedTheme}
//           onClose={() => setLeaderboardOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect, useContext } from "react";
import { getThemes } from "../api/themeApi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  getUserScores,
  getHighestScore,
  getLeaderboard,
} from "../api/scoreApi";
import Leaderboard from "./Leaderboard";

const Home = () => {
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState("Animals");
  const [userHighScore, setUserHighScore] = useState(0);
  const [overallHighScore, setOverallHighScore] = useState(0);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLeaderboardOpen, setLeaderboardOpen] = useState(false);

  // Handle theme selection
  useEffect(() => {
    getThemes()
      .then((data) => {
        setThemes(data);
        // If no theme is saved in localStorage, set the default 'Animals'
        if (!localStorage.getItem("theme")) {
          localStorage.setItem("theme", "Animals");
        }
      })
      .catch((error) => console.error("Error fetching themes:", error));
  }, []);
  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setSelectedTheme(newTheme); // Update the selected theme state
    localStorage.setItem("theme", newTheme); // Save the new theme to localStorage
  };

  // Fetch user-score & highest score
  useEffect(() => {
    if (user) {
      getUserScores(user._id, selectedTheme).then((data) => {
        setUserHighScore(data); // Best score (least moves, least time)
      });

      getHighestScore(selectedTheme).then((data) => {
        setOverallHighScore(data); // Best overall score
      });
    }
  }, [user, selectedTheme]);

  // handle start game
  const handleStartGame = (event) => {
    event.preventDefault();
    if (!selectedTheme) {
      alert("Please select a theme.");
      return;
    }

    const themeObj = themes.find((theme) => theme.name === selectedTheme);
    if (!themeObj) {
      alert("Selected theme not found.");
      return;
    }

    const imagesArray = themeObj.images || [];
    const encodedImages = encodeURIComponent(JSON.stringify(imagesArray));

    navigate(
      `/game?theme=${selectedTheme}&player=${
        user?.username || "Guest"
      }&userId=${user?._id}&images=${encodedImages}`
    );
  };

  // handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="relative flex min-h-screen bg-gray-100">
      {/* Logout Button (Top Right) */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
      >
        Logout
      </button>

      {/* Left Side: Scoreboard */}
      <div className="w-full sm:w-1/2 flex flex-col items-center justify-center bg-gray-200 p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Scoreboard</h2>

        {/* Your Best Score */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full sm:w-2/3 text-center">
          <div className="text-gray-700 text-lg font-semibold">
            Your Best Score
          </div>
          {userHighScore ? (
            <div className="mt-2">
              <div className="text-lg font-semibold text-green-500">
                Score: {userHighScore.score || "--"}
              </div>
              <div className="text-lg font-semibold text-blue-500">
                Moves: {userHighScore.moves || "--"}
              </div>
              <div className="text-lg font-semibold text-gray-600">
                Time(s): {userHighScore.timeTaken || "-- "}
              </div>
            </div>
          ) : (
            <div className="text-gray-500">No score yet. Let's fix that! 😏</div>
          )}
        </div>

        {/* Highest Score (Least Moves & Time) */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full sm:w-2/3 text-center mt-4">
          <div className="text-gray-700 text-lg font-semibold">
            Highest Score (Overall)
          </div>
          {overallHighScore ? (
            <div className="mt-2">
              <div className="text-lg font-semibold text-green-500">
                Score: {overallHighScore.score || "--"}
              </div>
              <div className="text-lg font-semibold text-blue-500">
                Moves: {overallHighScore.moves || "--"}
              </div>
              <div className="text-lg font-semibold text-gray-600">
                Time(s): {overallHighScore.timeTaken || "-- "}
              </div>
            </div>
          ) : (
            <div className="text-gray-500">No scores available yet. 🧐</div>
          )}
        </div>

        {/* Leaderboard Button */}
        <button
          onClick={() => setLeaderboardOpen(true)}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-md"
        >
          View Leaderboard
        </button>
      </div>

      {/* Right Side: Welcome Message & Theme Selection */}
      <div className="w-full sm:w-1/2 flex flex-col items-center justify-center p-6 bg-white shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome, {user?.username || "Guest"}! 🧠
        </h1>

        {/* Theme Selection */}
         {/* Witty Message */}
         <p className="mt-4 text-center text-gray-600">
          Ready to test your memory? Choose a theme and let the challenge begin!  
        </p>
        <label className="mt-6 flex flex-col w-2/3">
          <span className="text-gray-700 font-medium">Select a Theme:</span>
          <select
            value={selectedTheme}
            onChange={handleThemeChange}
            className="mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            {themes.length > 0 ? (
              themes.map((theme) => (
                <option key={theme._id} value={theme.name}>
                  {theme.name}
                </option>
              ))
            ) : (
              <option disabled>Loading themes...</option>
            )}
          </select>
        </label>

        {/* Start Game Button */}
        <button
          onClick={handleStartGame}
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-md transition duration-300"
        >
          Start Game 
        </button>
      </div>

      {/* Leaderboard Modal (Placed Here) */}
      {isLeaderboardOpen && (
        <Leaderboard
          theme={selectedTheme}
          onClose={() => setLeaderboardOpen(false)}
        />
      )}
    </div>
  );
};

export default Home;
