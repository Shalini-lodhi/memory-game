import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [gameHistory, setGameHistory] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    // Fetch user's game history from backend
    const fetchGameHistory = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/game/history/${user._id}`);
        setGameHistory(res.data);
      } catch (err) {
        console.error("Error fetching game history:", err);
      }
    };

    fetchGameHistory();
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Profile</h2>
        <p className="mt-2 text-center text-gray-600">Welcome, {user?.username}!</p>
        <p className="text-center text-gray-500">{user?.email}</p>

        <h3 className="mt-6 text-lg font-semibold">Game History</h3>
        {gameHistory.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {gameHistory.map((game, index) => (
              <li key={index} className="p-2 bg-gray-200 rounded-lg">
                <p><strong>Score:</strong> {game.score}</p>
                <p><strong>Moves:</strong> {game.total_moves}</p>
                <p><strong>Time:</strong> {game.time_taken} sec</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-2">No games played yet.</p>
        )}

        <button
          className="w-full mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
