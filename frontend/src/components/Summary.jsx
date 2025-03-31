import React from "react";

const Summary = ({ theme, player, score, moves, time, onRestart }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-96 text-center transform transition-all scale-105">
        <h2 className="text-3xl font-extrabold text-blue-600 mb-4">Memory Game</h2>

        <div className="text-lg text-gray-800 space-y-4">
          <p className="font-semibold text-gray-700">
            <span className="text-blue-500">Theme:</span> {theme}
          </p>
          <p className="font-semibold text-gray-700">
            <span className="text-blue-500">Player:</span> {player}
          </p>
          <p className="font-semibold text-gray-700">
            <span className="text-blue-500">Score:</span> {score}
          </p>
          <p className="font-semibold text-gray-700">
            <span className="text-blue-500">Moves:</span> {moves}
          </p>
          <p className="font-semibold text-gray-700">
            <span className="text-blue-500">Time Taken:</span>{" "}
            {Math.floor(time / 60)}m {time % 60}s
          </p>
        </div>

        <button
          onClick={onRestart}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all ease-in-out duration-300"
        >
          Try Again ?
        </button>
      </div>
    </div>
  );
};

export default Summary;
