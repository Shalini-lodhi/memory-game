import React from "react";

const Card = ({ card, onClick }) => {
  return (
    <div className="w-20 h-20 sm:w-24 sm:h-24 perspective">
      <button
        className={`relative w-full h-full transition-transform duration-500 transform 
        ${card.isFlipped ? "rotate-y-180" : ""} 
        ${card.isMatched ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}`}
        onClick={() => onClick(card.id)}
        disabled={card.isMatched}
      >
        {/* Front Side (Hidden) */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-300 rounded-lg">
          <span className="text-2xl font-bold text-gray-700">?</span>
        </div>

        {/* Back Side (Revealed) */}
        {card.isFlipped && (
          <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-white rounded-lg rotate-y-180">
            <img src={card.src} alt="card" className="w-full h-full object-cover rounded-lg" />
          </div>
        )}
      </button>
    </div>
  );
};

export default Card;
