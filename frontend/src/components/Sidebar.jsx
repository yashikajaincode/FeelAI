import React, { useState } from 'react';

function Sidebar({ features, selected, setSelected }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className={`bg-gray-800 p-4 sm:p-6 flex flex-col min-h-screen sm:w-64 w-full ${isOpen ? 'block' : 'hidden'} sm:block`}>
      {/* Toggle button for mobile */}
      <div className="sm:hidden flex justify-end mb-4">
        <button
          className="text-pink-400 font-bold"
          onClick={() => setIsOpen(false)}
        >
          ✖ Close
        </button>
      </div>

      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-green-400 text-center sm:text-left">
        FeelAI Activities
      </h2>
      <div className="space-y-2 sm:space-y-3">
        {features.map((f, i) => (
          <button
            key={f.label}
            className={`w-full text-left px-4 py-2 rounded-lg transition font-semibold ${
              selected === i
                ? 'bg-pink-600 text-white'
                : 'bg-gray-700 text-gray-200 hover:bg-pink-700'
            }`}
            onClick={() => setSelected(i)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
