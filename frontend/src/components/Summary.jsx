import React from "react";

const Summary = ({ theme, player, score, moves, time, onRestart }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center transform transition-all scale-105">
        <h2 className="text-3xl font-extrabold text-blue-600 mb-4">🎉 Memory Game 🎉</h2>

        <div className="text-lg text-gray-800 space-y-2">
          <p><span className="font-semibold">🖼️ Theme:</span> {theme}</p>
          <p><span className="font-semibold">👤 Player:</span> {player}</p>
          <p><span className="font-semibold">🏆 Score:</span> {score}</p>
          <p><span className="font-semibold">🎯 Moves:</span> {moves}</p>
          <p><span className="font-semibold">⏳ Time Taken:</span> {Math.floor(time / 60)}m {time % 60}s</p>
        </div>

        <button
          onClick={onRestart}
          className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
        >
          🔄 Play Again
        </button>
      </div>
    </div>
  );
};

export default Summary;
