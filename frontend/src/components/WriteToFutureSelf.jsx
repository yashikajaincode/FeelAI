import React, { useState } from 'react'; 

function WriteToFutureSelf() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const saveLetter = async () => {
    if (!message.trim()) {
      setStatus('Please write a message!');
      return;
    }
    const res = await fetch('http://localhost:8000/save-letter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, message })
    });
    const data = await res.json();
    setStatus(`Letter saved as ${data.filename}! (We'll deliver it... someday!)`);
    setMessage('');
    setEmail('');
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6 w-full">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Write to Your Future Self</h2>
      
      <div className="flex flex-col items-center w-full" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <textarea
          className="px-6 py-5 rounded bg-gray-600 text-white text-lg sm:text-xl shadow-lg mb-4 font-semibold border-2 border-gray-500 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none w-full resize-y"
          placeholder="Write your message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          style={{ minHeight: '200px', width: '100%' }}
        />
        
        <button
          className="bg-pink-500 hover:bg-pink-600 px-6 py-3 sm:px-8 sm:py-4 rounded text-white font-bold text-lg sm:text-xl shadow-md mb-2 mt-2 w-full transition-all"
          style={{ maxWidth: '220px', height: '56px' }}
          onClick={saveLetter}
        >
          Save Letter
        </button>

        {status && (
          <div className="bg-green-700 text-white font-medium text-sm sm:text-base rounded p-3 mt-3 w-full shadow" style={{ maxWidth: '600px' }}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
}

export default WriteToFutureSelf;
