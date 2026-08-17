import React, { useState, useEffect } from 'react';
import Locked from "./Locked/Locked";
import { SHADOWSEA_PASSWORD_ATTEMPTS_KEY } from '@utils/localStorage';

const IS_LOCALHOST = window.location.hostname === 'localhost';

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const getUniqueKeysWithFrequency = (password) => {
  const freq = {};
  for (const char of password.toUpperCase()) {
    freq[char] = (freq[char] || 0) + 1;
  }
  return freq;
};

const loadAttempts = () => {
  try {
    const saved = localStorage.getItem(SHADOWSEA_PASSWORD_ATTEMPTS_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (e) {
    return {};
  }
};

const saveAttempt = (command, attempt) => {
  try {
    const all = loadAttempts();
    const existing = all[command] || [];
    const updated = { ...all, [command]: [...existing, attempt] };
    localStorage.setItem(SHADOWSEA_PASSWORD_ATTEMPTS_KEY, JSON.stringify(updated));
    return updated[command];
  } catch (e) {
    return [];
  }
};

// RCD-style intel block
function RCDIntel({ hint, showFirst, password, showFrequency, hasDecoys, decoyCount, passwordHasSpaces, showCount, targetLength, attempts }) {
  const hasAnything = hint || showFirst || showFrequency || hasDecoys || passwordHasSpaces || showCount || attempts.length > 0;
  if (!hasAnything) return null;

  return (
    <div style={{
      margin: '0.75rem 0',
      backgroundColor: 'rgba(168, 85, 247, 0.07)',
      border: '1px solid rgba(168, 85, 247, 0.25)',
      borderLeft: '3px solid rgb(168, 85, 247)',
      borderRadius: '0 4px 4px 0',
      padding: '0.6rem 0.75rem',
      fontFamily: 'monospace',
    }}>
      <div style={{
        fontSize: '0.58rem',
        fontWeight: 'bold',
        letterSpacing: '0.14em',
        color: 'rgb(168, 85, 247)',
        marginBottom: '0.5rem',
        textShadow: '0 0 8px rgba(168, 85, 247, 0.4)',
      }}>
        ◈ RCD-7 INTERCEPT — NODE PARTIAL DATA
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>

        {/* Always show keys rule */}
        <div style={{ fontSize: '0.72rem', color: 'rgba(203, 213, 225, 0.6)' }}>
          <span style={{ color: 'rgba(168, 85, 247, 0.7)', marginRight: '0.4rem' }}>KEYS</span>
          {hasDecoys
            ? `${decoyCount} decoy ${decoyCount === 1 ? 'key' : 'keys'} present — not all keys are used`
            : 'Keys shown are the only characters in the password'
          }
        </div>

        {passwordHasSpaces && (
          <div style={{ fontSize: '0.72rem', color: 'rgb(251, 191, 36)' }}>
            <span style={{ color: 'rgb(168, 85, 247)', marginRight: '0.4rem' }}>NOTE</span>
            Password contains spaces
          </div>
        )}

        {showCount && (
          <div style={{ fontSize: '0.72rem', color: 'rgb(203, 213, 225)' }}>
            <span style={{ color: 'rgb(168, 85, 247)', marginRight: '0.4rem' }}>LENGTH</span>
            {targetLength} characters
          </div>
        )}

        {showFrequency && (
          <div style={{ fontSize: '0.72rem', color: 'rgb(203, 213, 225)' }}>
            <span style={{ color: 'rgb(168, 85, 247)', marginRight: '0.4rem' }}>FREQ</span>
            Character frequency shown on keys
          </div>
        )}

        {showFirst && (
          <div style={{ fontSize: '0.72rem', color: 'rgb(203, 213, 225)' }}>
            <span style={{ color: 'rgb(168, 85, 247)', marginRight: '0.4rem' }}>FIRST</span>
            {password.charAt(0).toUpperCase()}
          </div>
        )}

        {hint && (
          <div style={{ fontSize: '0.72rem', color: 'rgb(203, 213, 225)' }}>
            <span style={{ color: 'rgb(168, 85, 247)', marginRight: '0.4rem' }}>HINT</span>
            {hint}
          </div>
        )}

        {attempts.length > 0 && (
          <div style={{ marginTop: '0.35rem', paddingTop: '0.35rem', borderTop: '1px solid rgba(168, 85, 247, 0.2)' }}>
            <div style={{ fontSize: '0.58rem', fontWeight: 'bold', color: 'rgba(252, 129, 129, 0.7)', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
              FAILED ATTEMPTS ({attempts.length})
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
              {attempts.map((a, i) => (
                <div key={i} style={{ fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '0.08em', color: 'rgb(252, 129, 129)' }}>
                  {a || '(empty)'}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PasswordPrompt({
  command,
  commandDef,
  password,
  hint = "",
  showCount = false,
  showFirst = false,
  showFrequency = false,
  decoyLetters = "",
  onSubmit,
  children,
  lockType,
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [shuffledKeys, setShuffledKeys] = useState([]);
  const [keyFrequency, setKeyFrequency] = useState({});
  const [hasDecoys, setHasDecoys] = useState(false);
  const [decoyCount, setDecoyCount] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [clickedKey, setClickedKey] = useState(null);
  const [attempts, setAttempts] = useState(() => {
    const all = loadAttempts();
    return all[command] || [];
  });

  const passwordHasSpaces = password.includes(' ');

  useEffect(() => {
    const freq = getUniqueKeysWithFrequency(password);
    setKeyFrequency(freq);

    let keysToShuffle = Object.keys(freq);
    const spaceIndex = keysToShuffle.indexOf(' ');
    if (spaceIndex !== -1) keysToShuffle.splice(spaceIndex, 1);

    if (decoyLetters) {
      const decoyArray = decoyLetters.split(',').map(l => l.trim().toUpperCase()).filter(Boolean);
      keysToShuffle = [...keysToShuffle, ...decoyArray];
      setHasDecoys(decoyArray.length > 0);
      setDecoyCount(decoyArray.length);
    } else {
      setHasDecoys(false);
      setDecoyCount(0);
    }

    setShuffledKeys(shuffleArray(keysToShuffle));
  }, [password, decoyLetters]);

  const handleKeyClick = (key) => {
    setCurrentPassword(prev => prev + key);
    setFeedback("");
    setClickedKey(key);
    setTimeout(() => setClickedKey(null), 150);
  };

  const handleSpace = () => {
    setCurrentPassword(prev => prev + ' ');
    setFeedback("");
    setClickedKey('SPACE');
    setTimeout(() => setClickedKey(null), 150);
  };

  const handleBackspace = () => {
    setCurrentPassword(prev => prev.slice(0, -1));
    setFeedback("");
  };

  const handleClear = () => {
    setCurrentPassword("");
    setFeedback("");
  };

  const handleSubmit = () => {
    if (currentPassword.toUpperCase() === password.toUpperCase()) {
      onSubmit(command, commandDef, password);
    } else {
      const updated = saveAttempt(command, currentPassword);
      setAttempts(updated);
      setFeedback("INCORRECT PASSWORD");
    }
  };

  const handleOverride = () => {
    onSubmit(command, commandDef, password);
  };

  return (
    <div
      className="border-2 rounded-lg p-2 md:p-4 font-mono"
      style={{
        borderColor: 'rgb(77, 167, 188)',
        backgroundColor: 'rgba(29, 35, 50, 0.9)',
      }}
    >
      {/* Header */}
      <div
        className="mb-4 pb-2 border-b font-bold text-md"
        style={{
          borderColor: 'rgba(77, 167, 188, 0.5)',
          color: 'rgb(133, 175, 231)',
        }}
      >
        ENTER PASSWORD
        {feedback && (
          <div className="ml-2 text-md inline-block" style={{
            color: 'rgb(252, 129, 129)',
          }}>
            {" - "}{feedback}
          </div>
        )}
      </div>

      {Boolean(lockType) && (
        <div className="mb-4">
          <Locked theme={lockType} />
        </div>
      )}

      {/* Current Password Display */}
      <div className="mb-4">
        <div
          className="text-xl md:text-2xl font-bold tracking-wider mb-1"
          style={{ color: 'rgb(79, 209, 197)', minHeight: '2rem' }}
        >
          {currentPassword.replace(/ /g, '·') || ''}
          <span style={{ animation: 'pw-cursor 1s step-end infinite' }}>▌</span>
        </div>
        {(showCount || showFrequency) && (
          <div className="text-sm" style={{ color: 'rgb(148, 163, 184)' }}>
            {currentPassword.length}/{password.length} characters
          </div>
        )}
      </div>

      {/* Virtual Keyboard */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {shuffledKeys.map((key, idx) => (
            <button
              key={`${key}-${idx}`}
              onClick={() => handleKeyClick(key)}
              className="relative font-bold text-lg rounded transition-all duration-150"
              style={{
                backgroundColor: clickedKey === key ? 'rgb(56, 178, 172)' : 'rgb(45, 53, 72)',
                color: 'rgb(133, 175, 231)',
                border: '2px solid rgb(77, 167, 188)',
                fontSize: '1.5rem',
                padding: '0.5rem 1rem',
                marginRight: '0.5rem',
              }}
            >
              {key}
              {showFrequency && keyFrequency[key] > 0 && (
                <span className="absolute top-0 right-1 text-xs" style={{ color: 'rgb(251, 191, 36)' }}>
                  {keyFrequency[key]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {Boolean(children) && (
        <div className="mb-4">{children}</div>
      )}

      {/* RCD Intel block — below keyboard */}
      <RCDIntel
        hint={hint}
        showFirst={showFirst}
        password={password}
        showFrequency={showFrequency}
        hasDecoys={hasDecoys}
        decoyCount={decoyCount}
        passwordHasSpaces={passwordHasSpaces}
        showCount={showCount}
        targetLength={password.length}
        attempts={attempts}
      />

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleBackspace}
          className="px-2 md:px-4 py-2 font-bold rounded"
          style={{
            backgroundColor: 'rgb(45, 53, 72)',
            color: 'rgb(133, 175, 231)',
            border: '2px solid rgb(77, 167, 188)',
            fontSize: '0.75rem',
          }}
        >
          BACK
        </button>
        <button
          onClick={handleClear}
          className="px-2 md:px-4 py-2 font-bold rounded"
          style={{
            backgroundColor: 'rgb(45, 53, 72)',
            color: 'rgb(133, 175, 231)',
            border: '2px solid rgb(77, 167, 188)',
            fontSize: '0.75rem',
          }}
        >
          CLEAR
        </button>

        <div style={{ flex: 1, minWidth: '140px', display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handleSpace}
            className="font-bold rounded transition-all duration-150"
            style={{
              flex: 1,
              backgroundColor: clickedKey === 'SPACE' ? 'rgb(56, 178, 172)' : 'rgb(45, 53, 72)',
              color: 'rgb(133, 175, 231)',
              border: '2px solid rgb(77, 167, 188)',
              letterSpacing: '0.1em',
              fontSize: '0.75rem',
            }}
          >
            SPACE
          </button>
          <button
            onClick={handleSubmit}
            className="font-bold rounded"
            style={{
              flex: 1,
              backgroundColor: 'rgb(79, 209, 197)',
              color: 'rgb(19, 23, 34)',
              border: '2px solid rgb(79, 209, 197)',
              fontSize: '0.75rem',
            }}
          >
            SUBMIT
          </button>
        </div>

        {IS_LOCALHOST && (
          <button
            onClick={handleOverride}
            className="px-4 py-2 font-bold rounded"
            style={{
              backgroundColor: 'rgba(252, 129, 129, 0.2)',
              color: 'rgb(252, 129, 129)',
              border: '2px solid rgb(252, 129, 129)',
              fontSize: '0.75rem',
            }}
          >
            OVERRIDE
          </button>
        )}
      </div>
    </div>
  );
}
