import React, { useState, useEffect } from "react";
import { getLeaderboard } from "../api/scoreApi";

const Leaderboard = ({ theme, onClose }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    getLeaderboard(theme).then((data) => {
      setLeaderboard(data);
    });
  }, [theme]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-xl font-bold mb-4 text-center">Leaderboard</h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                <th className="border border-gray-300 px-3 py-2 w-12">#</th>
                <th className="border border-gray-300 px-3 py-2 w-32">Player</th>
                <th className="border border-gray-300 px-3 py-2 w-20">Score</th>
                <th className="border border-gray-300 px-3 py-2 w-20">Moves</th>
                <th className="border border-gray-300 px-3 py-2 w-24">Time (s)</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length > 0 ? (
                leaderboard.map((player, index) => (
                  <tr
                    key={index}
                    className={`text-center ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                  >
                    <td className="border border-gray-300 px-3 py-2">{index + 1}</td>
                    <td className="border border-gray-300 px-3 py-2 font-semibold">{player.user}</td>
                    <td className="border border-gray-300 px-3 py-2 text-blue-500">{player.score}</td>
                    <td className="border border-gray-300 px-3 py-2">{player.moves}</td>
                    <td className="border border-gray-300 px-3 py-2 text-gray-600">{player.timeTaken}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="border border-gray-300 px-4 py-2 text-gray-500 text-center">
                    No leaderboard data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
