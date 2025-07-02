import React, { useState, useRef, useEffect } from 'react';

// Custom questions, options, and highlights
const customQuestions = [
  {
    question: "Would you rather remember every detail of your past or be able to forget pain instantly?",
    optionA: "Total recall 🧠",
    optionB: "Instant healing 💫",
    highlight: "Trauma processing, emotional resilience",
    dimensions: [1, 0, 1, 0, 1], // empathy, decisiveness, openness, risk, reflection
  },
  {
    question: "Would you rather pursue a dream with no guarantee of success or choose a safe but unfulfilling path?",
    optionA: "Chase uncertainty 🚀",
    optionB: "Choose security 🔐",
    highlight: "Risk appetite, intrinsic motivation",
    dimensions: [0, 1, 1, 1, 0],
  },
  {
    question: "Would you rather hear hard truths or comforting lies?",
    optionA: "Brutal honesty ⚡",
    optionB: "Gentle fiction ☁️",
    highlight: "Truth-seeking, cognitive openness",
    dimensions: [1, 1, 1, 0, 1],
  },
  {
    question: "Would you rather work 80 hours on something meaningful or 30 hours on something easy?",
    optionA: "Meaningful grind 💪",
    optionB: "Easy balance 🛋️",
    highlight: "Grit, sense of purpose",
    dimensions: [1, 1, 0, 1, 1],
  },
  {
    question: "Would you rather feel everything deeply or feel very little at all?",
    optionA: "Deeply feel 💓",
    optionB: "Emotionally neutral 🧊",
    highlight: "Empathy, emotional intensity",
    dimensions: [1, 0, 1, 0, 1],
  },
  {
    question: "Would you rather be misunderstood forever or never fully express yourself?",
    optionA: "Misunderstood 📢",
    optionB: "Silenced forever 🤐",
    highlight: "Identity expression, communication drive",
    dimensions: [1, 1, 1, 0, 1],
  },
  {
    question: "Would you rather constantly self-reflect or never doubt your choices?",
    optionA: "Introspective spiral 🔄",
    optionB: "Unshakable certainty 🛡️",
    highlight: "Self-awareness vs decisiveness",
    dimensions: [1, 1, 0, 0, 1],
  },
  {
    question: "Would you rather fix the past or see the future?",
    optionA: "Fix the past 🕰️",
    optionB: "See the future 🔮",
    highlight: "Regret orientation vs vision orientation",
    dimensions: [1, 0, 1, 1, 1],
  },
  {
    question: "Would you rather sacrifice your needs for others or let others sacrifice for you?",
    optionA: "Self-sacrifice 💔",
    optionB: "Accept help 👐",
    highlight: "Altruism, boundary awareness",
    dimensions: [1, 1, 0, 0, 1],
  },
  {
    question: "Would you rather feel joy alone or share sadness with someone else?",
    optionA: "Solitary joy 🌞",
    optionB: "Shared sadness 🌧️",
    highlight: "Connection seeking, emotional depth",
    dimensions: [1, 0, 1, 0, 1],
  },
];

const dimensionLabels = ["Empathy", "Decisiveness", "Openness", "Risk", "Reflection"];
const clusterProfiles = [
  {
    name: "Empathetic Idealist",
    centroid: [1, 0, 1, 0, 1],
    description: "You lead with your heart, value deep connections, and are open to new experiences."
  },
  {
    name: "Rational Explorer",
    centroid: [0, 1, 1, 1, 0],
    description: "You are logical, decisive, and love exploring new possibilities."
  },
  {
    name: "Balanced Realist",
    centroid: [1, 1, 1, 1, 1],
    description: "You balance empathy, decisiveness, and openness, adapting to situations with wisdom."
  },
];


function euclideanDistance(a, b) {
  return Math.sqrt(a.reduce((sum, v, i) => sum + (v - b[i]) ** 2, 0));
}

function getClusterProfile(vector) {
  let minDist = Infinity;
  let best = clusterProfiles[0];
  for (const profile of clusterProfiles) {
    const dist = euclideanDistance(vector, profile.centroid);
    if (dist < minDist) {
      minDist = dist;
      best = profile;
    }
  }
  return best;
}

function RadarChart({ values, labels, max = 1, size }) {
  const [chartSize, setChartSize] = useState(() => window.innerWidth < 640 ? 250 : (size || 320));

  useEffect(() => {
    const handleResize = () => {
      setChartSize(window.innerWidth < 640 ? 250 : (size || 320));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [size]);

  const cx = chartSize / 2, cy = chartSize / 2, r = chartSize / 2 - 60;
  const N = values.length;
  const angle = (2 * Math.PI) / N;
  const points = values.map((v, i) => {
    const theta = i * angle - Math.PI / 2;
    const x = cx + r * (v / max) * Math.cos(theta);
    const y = cy + r * (v / max) * Math.sin(theta);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="flex justify-center">
      <svg width={chartSize} height={chartSize} className="drop-shadow-lg">
        {[0.2, 0.4, 0.6, 0.8, 1.0].map(scale => (
          <circle key={scale} cx={cx} cy={cy} r={r * scale} fill="none" stroke="#e5e7eb" strokeWidth={1} opacity={0.5} />
        ))}
        {labels.map((lbl, i) => {
          const theta = i * angle - Math.PI / 2;
          const x = cx + r * Math.cos(theta);
          const y = cy + r * Math.sin(theta);
          return <line key={lbl} x1={cx} y1={cy} x2={x} y2={y} stroke="#d1d5db" strokeWidth={1.5} />;
        })}
        <polygon points={points} fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth={3} />
        {values.map((v, i) => {
          const theta = i * angle - Math.PI / 2;
          const x = cx + r * (v / max) * Math.cos(theta);
          const y = cy + r * (v / max) * Math.sin(theta);
          return (
            <circle key={i} cx={x} cy={y} r={5} fill="#3b82f6" stroke="white" strokeWidth={2} />
          );
        })}
        {labels.map((lbl, i) => {
          const theta = i * angle - Math.PI / 2;
          const lx = cx + (r + 35) * Math.cos(theta);
          const ly = cy + (r + 35) * Math.sin(theta);
          return (
            <text 
              key={i} 
              x={lx} 
              y={ly} 
              textAnchor="middle" 
              dominantBaseline="central"
              className="text-sm font-semibold fill-gray-700"
            >
              {lbl}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

// Flip animation CSS
const flipCardStyle = `
  .flip-card-animate {
    transition: transform 0.6s cubic-bezier(0.4,0.2,0.2,1);
    transform-style: preserve-3d;
    will-change: transform;
    perspective: 1200px;
    backface-visibility: hidden;
    transform: rotateY(180deg);
  }
`;

function WouldYouRather() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [explanation, setExplanation] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const flipTimeout = useRef(null);
  const currentQ = customQuestions[step];

  function handlePick(choice) {
    setIsFlipping(true);
    clearTimeout(flipTimeout.current);
    flipTimeout.current = setTimeout(() => {
      setAnswers(prev => [...prev, { choice, explanation }]);
      setExplanation("");
      setIsFlipping(false);
      if (step < customQuestions.length - 1) {
        setStep(step + 1);
      } else {
        setShowProfile(true);
      }
    }, 600);
  }

  let profile = null, featureVector = null;
  if (showProfile) {
    featureVector = Array(dimensionLabels.length).fill(0);
    answers.forEach((ans, i) => {
      const dims = customQuestions[i].dimensions;
      for (let j = 0; j < dims.length; j++) {
        featureVector[j] += ans.choice === 'A' ? dims[j] : 1 - dims[j];
      }
    });
    featureVector = featureVector.map(v => v / answers.length);
    profile = getClusterProfile(featureVector);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-8 px-4">
      <style>{flipCardStyle}</style>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-extrabold drop-shadow-lg text-black">
            Would You Rather?
          </h1>
        </div>

        {!showProfile ? (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 border border-gray-100">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-extrabold leading-relaxed mb-4 text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-800">
                  {currentQ.question}
                </h3>
                <p className="text-base font-bold px-4 py-2 rounded-full inline-block border border-white/30 text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-800">
                  Exploring: {currentQ.highlight}
                </p>
              </div>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '2rem',
                marginBottom: '2rem',
                background: 'rgba(255,255,255,0.7)',
                borderRadius: '1rem',
                border: '2px solid #a5b4fc',
                boxShadow: '0 4px 24px 0 #a5b4fc22',
                padding: '1rem 0',
                perspective: '1200px',
                width: '100%',
                maxWidth: '900px'
              }}
                className={isFlipping ? 'flip-card-animate' : ''}
              >
                <button
                  style={{
                    minWidth: '250px',
                    maxWidth: '100%',
                    width: '100%',
                    background: 'linear-gradient(to right, #2563eb, #1e40af)',
                    color: 'white',
                    padding: '2rem',
                    borderRadius: '1rem',
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    border: '2px solid #2563eb',
                    boxShadow: '0 2px 8px #2563eb44',
                    transition: 'transform 0.2s',
                    cursor: 'pointer'
                  }}
                  onClick={() => handlePick('A')}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{currentQ.optionA}</div>
                  <div style={{ fontSize: '1rem', opacity: 0.9, fontWeight: 500 }}>Option A</div>
                </button>

                <div
                  style={{
                    fontWeight: 'bold',
                    color: '#6366f1',
                    fontSize: '1.25rem',
                    background: 'rgba(255,255,255,0.5)',
                    borderRadius: '999px',
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #a5b4fc'
                  }}
                >
                  OR
                </div>

                <button
                  style={{
                    minWidth: '250px',
                    maxWidth: '100%',
                    width: '100%',
                    background: 'linear-gradient(to right, #a21caf, #7c3aed)',
                    color: 'white',
                    padding: '2rem',
                    borderRadius: '1rem',
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    border: '2px solid #a21caf',
                    boxShadow: '0 2px 8px #a21caf44',
                    transition: 'transform 0.2s',
                    cursor: 'pointer'
                  }}
                  onClick={() => handlePick('B')}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{currentQ.optionB}</div>
                  <div style={{ fontSize: '1rem', opacity: 0.9, fontWeight: 500 }}>Option B</div>
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Share your thoughts (optional):
                </label>
                <textarea
                  className="w-full h-24 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none text-gray-800 placeholder-gray-500"
                  placeholder="What influenced your choice?"
                  value={explanation}
                  onChange={e => setExplanation(e.target.value)}
                />
              </div>

              <div className="text-center">
                <div className="inline-flex items-center bg-gray-100 px-4 py-2 rounded-full border border-gray-200">
                  <span className="text-sm font-bold text-gray-700">
                    Question {step + 1} of {customQuestions.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((step + 1) / customQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-[80vh] w-full">
            <div className="w-full max-w-3xl bg-white/90 rounded-3xl shadow-2xl p-10 border border-gray-200 flex flex-col items-center">
              <div className="text-center mb-8">
                <div className="text-4xl font-extrabold text-black mb-2 flex items-center justify-center gap-3 tracking-tight">
                  <span style={{ fontSize: '2rem' }}>🧠</span> Your Behavioral Profile
                </div>
                <div className="text-3xl font-extrabold mb-2 text-black tracking-tight">
                  {profile.name}
                </div>
                <p className="text-lg text-black max-w-2xl mx-auto leading-relaxed font-medium mb-6">
                  {profile.description}
                </p>
              </div>

              <div className="mb-10 flex justify-center w-full">
                <RadarChart values={featureVector} labels={dimensionLabels} />
              </div>

              {answers.some(ans => ans.explanation) && (
                <div className="bg-gray-50 rounded-2xl p-8 w-full mb-8 shadow-inner">
                  <h3 className="text-2xl font-bold text-indigo-700 mb-4 flex items-center gap-2">
                    💭 Your Insights
                  </h3>
                  <div className="space-y-4">
                    {answers.map((ans, i) => ans.explanation && (
                      <div key={i} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <div className="text-sm font-semibold text-indigo-600 mb-1">
                          Question {i + 1}:
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          {ans.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-center mt-6">
                <button 
                  onClick={() => {
                    setStep(0);
                    setAnswers([]);
                    setExplanation("");
                    setShowProfile(false);
                  }}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg"
                >
                  Take Quiz Again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WouldYouRather;
