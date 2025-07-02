import React, { useState, useRef } from 'react';

function VoiceChatbot({ setListening = () => {}, listening = false }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition not supported in this browser.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput('');
      setListening(false);
      autoSendMessage(transcript);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.start();
    setListening(true);
    recognitionRef.current = recognition;
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utter = new window.SpeechSynthesisUtterance(text);
      utter.lang = 'en-US';
      window.speechSynthesis.speak(utter);
    }
  };

  const autoSendMessage = async (recognizedText) => {
    if (!recognizedText.trim()) return;
    setLoading(true);
    setHistory(h => [...h, { sender: 'You', text: recognizedText }]);
    try {
      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: recognizedText })
      });
      const data = await res.json();
      setHistory(h => [...h, { sender: 'FeelAI', text: data.response }]);
      speak(data.response);
    } catch (e) {
      setHistory(h => [...h, { sender: 'FeelAI', text: 'Error: Could not reach backend.' }]);
    }
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setHistory(h => [...h, { sender: 'You', text: input }]);
    const userInput = input;
    setInput('');
    try {
      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput })
      });
      const data = await res.json();
      setHistory(h => [...h, { sender: 'FeelAI', text: data.response }]);
      speak(data.response);
    } catch (e) {
      setHistory(h => [...h, { sender: 'FeelAI', text: 'Error: Could not reach backend.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="w-full px-4">
      <h2 className="text-xl font-bold mb-2">Talk to FeelAI</h2>
      <div className="mb-4 h-48 overflow-y-auto bg-gray-700 rounded p-2">
        {history.map((msg, i) => (
          <div key={i} className={msg.sender === 'You' ? 'text-blue-300' : 'text-green-300'}>
            <b>{msg.sender}:</b> {msg.text}
          </div>
        ))}
        {loading && <div className="text-pink-400">FeelAI is thinking...</div>}
      </div>

      {/* Responsive Input and Button Group */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center items-center w-full max-w-3xl mx-auto">
        <input
          className="w-full sm:flex-1 px-4 py-4 sm:px-8 sm:py-6 rounded bg-gray-600 text-white text-base sm:text-xl shadow-lg"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type or use the mic..."
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button
          className="w-full sm:w-[120px] h-[48px] sm:h-[64px] bg-pink-500 rounded text-white font-bold text-base sm:text-xl shadow-lg"
          onClick={sendMessage}
          disabled={loading}
        >
          Send
        </button>
        <button
          className={`w-full sm:w-[120px] h-[48px] sm:h-[64px] rounded font-bold text-base sm:text-xl shadow-lg ${listening ? 'bg-red-500' : 'bg-blue-500'} text-white`}
          onClick={listening ? stopListening : startListening}
          disabled={loading}
        >
          {listening ? 'Stop 🎤' : 'Mic 🎤'}
        </button>
      </div>

      <div className="text-gray-400 text-xs text-center">
        Click the mic to speak. The bot will reply in voice!
      </div>
    </div>
  );
}

export default VoiceChatbot;
