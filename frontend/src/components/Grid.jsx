import React from "react";
import Card from "./Card";

const Grid = ({ cards, onCardClick, scoreAnimation }) => {
  return (
    <div className="mt-8 grid grid-cols-6 gap-2 p-4 gap-4 ${gridClass}">
      {cards.map((card, index) => (
        <Card key={index} card={card} onClick={onCardClick} scoreAnimation={scoreAnimation} />
      ))}
    </div>
  );
};

export default Grid;
