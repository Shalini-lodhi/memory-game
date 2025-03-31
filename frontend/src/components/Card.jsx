import React from "react";

const Card = ({ card, onClick, scoreAnimation }) => {
  return (
    <div className="relative w-20 h-20 sm:w-24 sm:h-24 perspective">
      <button
        className={`relative w-full h-full transition-transform duration-500 transform 
          ${card.isFlipped ? "rotate-y-180" : ""} 
          ${card.isMatched ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}
          transform-style-preserve-3d`}
        onClick={() => onClick(card.id)}
        disabled={card.isMatched}
      >
        {/* Front Side (Hidden) */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-300 rounded-lg backface-hidden">
          <span className="text-2xl font-bold text-gray-700">?</span>
        </div>

        {/* Back Side (Revealed) */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-white rounded-lg rotate-y-180 backface-hidden">
          <img src={card.src} alt="card" className="w-full h-full object-cover rounded-lg" />
        </div>
      </button>

      {/* Score Animation (+10 or -1) */}
      {scoreAnimation?.id === card.id && (
        <div
          className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 text-lg font-bold ${scoreAnimation.color} transition-all duration-700 ease-out opacity-100 animate-fadeUp`}
        >
          {scoreAnimation.value}
        </div>
      )}
    </div>
  );
};

export default Card;
