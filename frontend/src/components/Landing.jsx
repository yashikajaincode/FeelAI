import React from 'react';

function Landing({ onContinue }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      {/* Animated gradient background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: 'linear-gradient(120deg, #ff7eb3, #ff758c, #a0c1ff, #ff7eb3)',
          backgroundSize: '200% 200%',
          width: '100vw',
          height: '100vh',
          animation: 'gradientMove 8s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes gradientMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      {/* Centered content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          color: 'white',
          textAlign: 'center',
          width: '100%',
          maxWidth: '720px',
          margin: '0 auto',
          padding: '1rem',
        }}
      >
        <div
          style={{
            marginBottom: '1.5rem',
            fontSize: '2rem',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
          }}
        >
          FeelAI
        </div>
        <h1
          style={{
            fontSize: '2.25rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            textShadow: '0 2px 8px #0008',
            lineHeight: 1.2,
          }}
        >
          Your Virtual AI Friend
        </h1>
        <p
          style={{
            fontSize: '1.125rem',
            margin: '0 auto 2rem auto',
            maxWidth: '90%',
            textShadow: '0 2px 8px #0008',
            lineHeight: 1.6,
          }}
        >
          AI companion that cares. Have a friendly chat, play games, doodle, and grow your communication and relationship skills.
        </p>
        <button
          onClick={onContinue}
          style={{
            background: 'white',
            color: '#ff758c',
            fontWeight: 'bold',
            padding: '1rem 2.5rem',
            borderRadius: '999px',
            fontSize: '1.125rem',
            boxShadow: '0 2px 8px #0004',
            border: 'none',
            marginBottom: '2rem',
            cursor: 'pointer',
            width: '100%',
            maxWidth: '280px',
          }}
        >
          Continue
        </button>
        <footer
          style={{
            color: 'white',
            fontSize: '0.875rem',
            marginTop: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            alignItems: 'center',
          }}
        >
          © 2025 FeelAI
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#" style={{ color: '#a0c1ff' }}>Contact</a>
            <a href="#" style={{ color: '#a0c1ff' }}>Terms</a>
            <a href="#" style={{ color: '#a0c1ff' }}>Privacy</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Landing;
