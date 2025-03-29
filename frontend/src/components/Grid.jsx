import React from "react";
import Card from "./Card";

const Grid = ({ cards, onCardClick }) => {
  return (
    <div className="grid grid-cols-6 gap-2 p-4">
      {cards.map((card, index) => (
        <Card key={index} card={card} onClick={onCardClick} />
      ))}
    </div>
  );
};

export default Grid;
