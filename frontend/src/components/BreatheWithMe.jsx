import React, { useState, useEffect, useRef } from 'react';

function BreatheWithMe({ totalDuration = 60 }) {
  const [phase, setPhase] = useState('Inhale');
  const [scale, setScale] = useState(1);
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(totalDuration);
  const timerRef = useRef();
  const breathDuration = 4; // hardcoded to 4 seconds
  const audioRef = useRef(null); // Ref for background music

  // Handle breathing phase cycling
  useEffect(() => {
    if (!running) return;
    
    setTimeLeft(totalDuration);
    setPhase('Inhale');
    setScale(1.6); // Start with inhale
    
    const phaseInterval = setInterval(() => {
      setPhase(prevPhase => prevPhase === 'Inhale' ? 'Exhale' : 'Inhale');
    }, breathDuration * 1000);
    
    return () => clearInterval(phaseInterval);
  }, [running, totalDuration]);

  // New effect: set scale when phase changes
  useEffect(() => {
    if (!running) return;
    if (phase === 'Inhale') {
      setScale(1.6); // Grow big for inhale
    } else if (phase === 'Exhale') {
      setScale(0.8); // Shrink smaller for exhale
    }
  }, [phase, running]);

  // Countdown timer
  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      setRunning(false);
      setScale(1); // Reset to normal size when stopped
      return;
    }
    
    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setRunning(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [running]);

  // Play/pause background music based on running state
  useEffect(() => {
    if (!audioRef.current) return;
    if (running) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [running]);

  const handleStart = () => {
    setTimeLeft(totalDuration);
    setRunning(true);
  };
  
  const handleStop = () => {
    setRunning(false);
    setTimeLeft(totalDuration);
    setScale(1); // Reset to normal size
  };

  return (
    <div className="w-full flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center justify-center w-full mt-8">
        {/* Background music audio element */}
        <audio ref={audioRef} src="/music/meditation-music-368634.mp3" loop preload="auto" />
        <div className="mb-4 text-lg font-semibold text-center">
          {running ? (phase === 'Inhale' ? 'Breathe in slowly...' : 'Breathe out gently...') : 'Set your preferences and start!'}
        </div>
        <div className="flex items-center justify-center w-full" style={{ minHeight: 220 }}>
          {/* Circle is always visible - static when not running, animated when running */}
          <div
            style={{
              width: '40vw',
              maxWidth: 200,
              height: '40vw',
              maxHeight: 200,
              borderRadius: '50%',
              background: 'radial-gradient(circle, #a0c1ff 60%, #ff7eb3 100%)',
              transition: running ? `transform ${breathDuration}s cubic-bezier(0.4,0,0.2,1)` : 'transform 0.3s ease',
              transform: `scale(${scale})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 40px 10px #a0c1ff55',
              margin: '0 auto',
            }}
          >
            <span className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">
              {running ? phase : 'Ready'}
            </span>
          </div>
        </div>
        {/* Start/Stop buttons and timer */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 mb-2">
          {!running ? (
            <button className="bg-pink-500 px-6 py-2 rounded text-white font-bold text-lg w-40" onClick={handleStart}>
              Start
            </button>
          ) : (
            <button className="bg-gray-700 px-6 py-2 rounded text-white font-bold text-lg w-40" onClick={handleStop}>
              Stop
            </button>
          )}
          {running && <span className="text-pink-400 font-bold text-lg">{timeLeft}s left</span>}
        </div>
        <div className="text-gray-300 mt-2 text-sm text-center px-2">Follow the circle and breathe with the rhythm.</div>
      </div>
    </div>
  );
}

export default BreatheWithMe;
