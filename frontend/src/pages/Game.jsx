import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Grid from "../components/Grid";
import Summary from "../components/Summary";

const Game = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const imagesParam = queryParams.get("images");
  const images = imagesParam ? JSON.parse(decodeURIComponent(imagesParam)) : [];

  const playerName = queryParams.get("player") || "Player";
  const theme = queryParams.get("theme") || "Theme";

  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);

  // Timer Effect
  useEffect(() => {
    if (!timerActive || gameOver) return;
    const timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, [timerActive, gameOver]);

  // Load and Shuffle Cards
  const loadCards = () => {
    if (!images || images.length === 0) {
      console.error("No images available for theme:", theme);
      return [];
    }

    // Create 4 copies of each image, each with a unique ID
    const allCards = images.flatMap((image, index) =>
      Array.from({ length: 4 }, (_, copyIndex) => ({
        id: `${index}-${copyIndex}`, // Unique ID for each card
        src: image,
        isFlipped: false, // Force all cards to be flipped
        isMatched: false,
      }))
    );

    return allCards.sort(() => Math.random() - 0.5); // Shuffle
  };

  // Initialize Game
  useEffect(() => {
    setCards(loadCards());
    setGameOver(false);
    setTimerActive(true);
    setTime(0); // Reset timer on theme change
    setScore(0);
    setMoves(0);
    setSelectedCards([]);
  }, [theme]);

  // Handle Card Click
  const handleCardClick = (cardId) => {
    if (gameOver || selectedCards.length === 2) return; // Prevent clicking more than 2

    // Flip the selected card
    const updatedCards = cards.map((card) =>
      card.id === cardId ? { ...card, isFlipped: true } : card
    );

    setCards(updatedCards);
    const newSelectedCards = [
      ...selectedCards,
      updatedCards.find((c) => c.id === cardId),
    ];
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      setMoves((prev) => prev + 1);
      checkMatch(newSelectedCards);
    }
  };

  const checkMatch = ([firstCard, secondCard]) => {
    if (firstCard.src === secondCard.src && firstCard.id !== secondCard.id) {
      setTimeout(() => {
        setCards((prevCards) => {
          const updatedCards = prevCards.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isMatched: true }
              : card
          );
          if (updatedCards.every((card) => card.isMatched)) {
            setGameOver(true); // ✅ Now checking game over condition on updated state
          }
          return updatedCards;
        });
        setScore((prev) => prev + 10);
        setSelectedCards([]);
      }, 500);
    } else {
      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isFlipped: false }
              : card
          )
        );
        setSelectedCards([]);
      }, 1000);
    }
  };

  // Restart Game
  const handleRestart = () => {
    setScore(0);
    setMoves(0);
    setSelectedCards([]);
    setGameOver(false);
    setTime(0); // Reset timer to 0
    setTimerActive(false); // Stop the timer
    setCards(loadCards());

    // Restart the timer after resetting state
    setTimeout(() => setTimerActive(true), 100);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-gray-200 min-h-screen flex flex-col items-center p-6">
      {/* Header */}
      <header className="w-full max-w-4xl flex justify-between items-center bg-white p-4 rounded-xl shadow-lg backdrop-blur-lg">
        <div className="text-lg font-semibold">
          Memory Game <span className="text-blue-600">{theme}</span>
        </div>
        <div className="text-lg font-semibold">
          ⏳ Time:{" "}
          <span className="text-red-500">
            {Math.floor(time / 60)}m {time % 60}s
          </span>
        </div>
        <div className="text-lg font-semibold">
          👤 Player: <span className="text-green-600">{playerName}</span>
        </div>
      </header>

      {/* Scoreboard */}
      <div className="w-full max-w-4xl flex justify-between bg-white p-4 rounded-xl shadow-lg mt-6">
        <div className="text-lg font-semibold text-gray-700">
          🎯 Moves: {moves}
        </div>
        <div className="text-lg font-semibold text-gray-700">
          🏆 Score: {score}
        </div>
      </div>

      {/* Grid */}
      <Grid cards={cards} onCardClick={handleCardClick} />

      {/* Restart Button */}
      <button
        onClick={handleRestart}
        className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-red-600 transition"
      >
        🔄 Restart Game
      </button>

      {/* Game Over Popup */}
      {gameOver && (
        <Summary
          theme={theme}
          player={playerName}
          score={score}
          moves={moves}
          time={time}
          onRestart={handleRestart}
        />
      )}

      {/* Footer */}
      <footer className="mt-8 text-gray-600 text-sm">
        &copy; 2025 Memory Game. All rights reserved.
      </footer>
    </div>
  );
};

export default Game;
