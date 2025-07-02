import React, { useState } from 'react';
import Confetti from 'react-confetti';

function EmojiGuessGame() {
  const [puzzle, setPuzzle] = useState(null);
  const [guess, setGuess] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const fetchPuzzle = async () => {
    setShowAnswer(false);
    setGuess('');
    const res = await fetch('http://localhost:8000/emoji-guess');
    const data = await res.json();
    setPuzzle(data);
  };

  React.useEffect(() => { fetchPuzzle(); }, []);

  React.useEffect(() => {
    if (!puzzle || !guess) return;
    if (guess.trim().toLowerCase() === puzzle.answer.trim().toLowerCase()) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1800);
    }
  }, [guess, puzzle]);

  return (
    <div className="flex flex-col items-center justify-center px-4">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={500}
          recycle={false}
          gravity={0.6}
          initialVelocityY={20}
          confettiSource={{ x: 0, y: 0, w: window.innerWidth, h: 0 }}
          tweenDuration={800}
        />
      )}
      <h2 className="text-3xl font-extrabold mb-6 text-center" style={{ letterSpacing: '-1px' }}>
        Emoji Guess Game
      </h2>
      <div className="w-full flex justify-center items-center mb-4">
        <div
          className="select-none"
          style={{
            fontSize: '8rem',
            fontFamily: 'Segoe UI Emoji, Apple Color Emoji, sans-serif',
            lineHeight: 1,
          }}
        >
          {puzzle?.emoji}
        </div>
      </div>
      <div className="flex flex-col items-center w-full max-w-xl">
        <input
          className="px-6 sm:px-8 py-4 sm:py-6 rounded bg-gray-600 text-white text-lg sm:text-xl shadow-lg mb-10 text-center font-bold border-2 border-gray-500 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none w-full"
          placeholder="Your guess..."
          value={guess}
          onChange={e => setGuess(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-6 justify-center items-center w-full">
          <button
            className="bg-black rounded text-white font-bold text-lg sm:text-xl shadow-lg w-full sm:w-[120px] h-[56px] sm:h-[64px]"
            onClick={() => setShowAnswer(true)}
          >
            Reveal Answer
          </button>
          <button
            className="bg-black rounded text-white font-bold text-lg sm:text-xl shadow-lg w-full sm:w-[120px] h-[56px] sm:h-[64px]"
            onClick={fetchPuzzle}
          >
            Next Emoji
          </button>
        </div>
      </div>
      {showAnswer && puzzle && (
        <div className="mt-8 text-2xl sm:text-3xl font-extrabold text-green-500 bg-white/80 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-lg border-2 border-green-200 text-center">
          Answer: {puzzle.answer}
        </div>
      )}
    </div>
  );
}

export default EmojiGuessGame;
