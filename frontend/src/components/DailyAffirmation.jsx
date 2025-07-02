import React, { useState } from 'react';

const moods = ["happy", "sad", "excited", "anxious", "chill", "motivated", "tired"];

function DailyAffirmation() {
  const [name, setName] = useState("");
  const [mood, setMood] = useState(moods[0]);
  const [affirmation, setAffirmation] = useState("");

  const getAffirmation = async () => {
    let msg = '';
    switch (mood) {
      case 'happy':
        msg = "Your happiness is contagious! Keep spreading joy.";
        break;
      case 'sad':
        msg = "It's okay to feel sad sometimes. Brighter days are ahead.";
        break;
      case 'excited':
        msg = "Your excitement is inspiring! Embrace the adventure.";
        break;
      case 'anxious':
        msg = "Take a deep breath. You are stronger than your anxiety, and you are not alone.";
        break;
      case 'chill':
        msg = "Your calm energy brings peace to those around you.";
        break;
      case 'motivated':
        msg = "Your motivation will take you far. Keep going!";
        break;
      case 'tired':
        msg = "Rest is important. Take care of yourself, you deserve it.";
        break;
      default:
        msg = "You are amazing just as you are!";
    }
    setAffirmation(`Hey ${name || 'friend'}, ${msg}`);
  };

  return (
    <div className="px-4 w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center sm:text-left">Get an Affirmation</h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center items-center w-full">
        <input
          className="w-full sm:flex-1 px-4 py-3 sm:px-8 sm:py-6 rounded bg-gray-600 text-white text-base sm:text-xl shadow-lg"
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <select
          className="w-full sm:flex-1 px-4 py-3 sm:px-8 sm:py-6 rounded bg-gray-600 text-white text-base sm:text-xl shadow-lg"
          value={mood}
          onChange={e => setMood(e.target.value)}
        >
          {moods.map(m => <option key={m}>{m}</option>)}
        </select>
      </div>
      <div className="flex justify-center">
        <button className="bg-pink-500 px-6 py-3 rounded text-white font-bold text-base sm:text-lg mb-2 w-full sm:w-auto" onClick={getAffirmation}>
          Give me an affirmation!
        </button>
      </div>
      {affirmation && (
        <div className="bg-green-700 rounded p-3 mt-2 text-white text-center text-base sm:text-lg">
          {affirmation}
        </div>
      )}
      {/* TODO: Add TTS playback button */}
    </div>
  );
}

export default DailyAffirmation;
