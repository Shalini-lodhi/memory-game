import React from "react";

const Scoreboard = ({ score, moves }) => {
  return (
    <div className="flex justify-between p-4 bg-gray-800 text-white">
      <p>Score: {score}</p>
      <p>Moves: {moves}</p>
    </div>
  );
};

export default Scoreboard;
