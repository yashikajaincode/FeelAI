import React, { useState } from 'react';
import VoiceChatbot from './components/VoiceChatbot.jsx';
import BreatheWithMe from './components/BreatheWithMe';
import DailyAffirmation from './components/DailyAffirmation.jsx';
import WouldYouRather from './components/WouldYouRather.jsx';
import EmojiGuessGame from './components/EmojiGuessGame.jsx';
import WriteToFutureSelf from './components/WriteToFutureSelf.jsx';
import './App.css';

const features = [
  { label: 'Voice Chatbot', component: VoiceChatbot },
  { label: 'Breathe with Me', component: BreatheWithMe },
  { label: 'Daily Affirmation', component: DailyAffirmation },
  { label: 'Would You Rather?', component: WouldYouRather },
  { label: 'Emoji Guess Game', component: EmojiGuessGame },
  { label: 'Write to Your Future Self', component: WriteToFutureSelf },
];

function App() {
  const [selected, setSelected] = useState(0);
  const [listening, setListening] = useState(false);

  const [breathDuration, setBreathDuration] = useState(4);
  const [totalDuration, setTotalDuration] = useState(60);

  const FeatureComponent = features[selected].component;
  const featureProps =
    selected === 0
      ? { setListening, listening }
      : selected === 1
      ? { breathDuration, setBreathDuration, totalDuration, setTotalDuration }
      : {};

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-pink-300 via-purple-200 to-blue-300">
      {/* Gradient Animation */}
      <style>
        {`
          @keyframes gradientMove {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}
      </style>

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background: 'linear-gradient(120deg, #ff7eb3, #ff758c, #a0c1ff, #ff7eb3)',
          backgroundSize: '200% 200%',
          animation: 'gradientMove 8s ease-in-out infinite',
        }}
      />

      {/* Foreground Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Navbar */}
        <nav
          className="w-full flex flex-wrap items-center justify-between p-2 sm:p-4 bg-black bg-opacity-20 backdrop-blur-md border-b border-white/20 shadow-lg"
        >
          <div className="flex flex-wrap items-center gap-1 sm:gap-2 w-full sm:w-auto">
            {features.map((f, i) => (
              <button
                key={f.label}
                onClick={() => setSelected(i)}
                className={`px-3 sm:px-4 py-2 font-semibold text-xs sm:text-base rounded-md transition duration-200
                  ${selected === i
                    ? 'bg-pink-500 text-white'
                    : 'bg-transparent text-white hover:bg-pink-600 hover:text-white'}
                `}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Listening Indicator */}
          {listening && (
            <div className="flex items-center gap-2 text-sm sm:text-base text-pink-300 font-bold animate-pulse ml-auto mt-2 sm:mt-0">
              <span className="w-3 h-3 bg-pink-400 rounded-full inline-block" />
              Listening...
            </div>
          )}
        </nav>

        {/* Main Section */}
        {selected === 1 ? (
          <div className="flex flex-col items-center justify-center pt-8 px-2 sm:px-6">
            <div className="w-full max-w-2xl mt-6 bg-gray-900 bg-opacity-95 rounded-xl p-6 shadow-2xl border border-white/20">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-white mb-6">FeelAI</h1>

              {/* Timer Buttons */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-6">
                {[30, 60, 90, 120, 180, 300].map((time) => (
                  <button
                    key={time}
                    onClick={() => setTotalDuration(time)}
                    className={`text-white text-lg font-bold rounded-lg px-6 py-3 border transition duration-200
                      ${
                        totalDuration === time
                          ? 'bg-pink-600 border-white'
                          : 'bg-black border-gray-600 hover:bg-pink-500'
                      }`}
                  >
                    {time}s
                  </button>
                ))}
              </div>

              <BreatheWithMe breathDuration={breathDuration} totalDuration={totalDuration} />
            </div>
          </div>
        ) : (
          <div className="relative z-10 min-h-screen flex flex-col items-center justify-start pt-32 sm:pt-36 px-2">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-center text-white drop-shadow-md mb-4">
              FeelAI
            </h1>
            <div className="w-full max-w-3xl bg-gray-900 bg-opacity-95 rounded-xl p-4 sm:p-6 shadow-2xl border border-white/20">
              {FeatureComponent ? (
                <FeatureComponent {...featureProps} />
              ) : (
                <div className="text-red-500">Feature not found!</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
