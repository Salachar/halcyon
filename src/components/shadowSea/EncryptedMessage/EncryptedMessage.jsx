import './encryptedMessage.css';

/**
 * EncryptedMessage - Sleek encrypted message display
 *
 * Shows encrypted lock screen when locked, reveals message lines when unlocked.
 * Generic - no sender/recipient info, just pure message content.
 *
 * Props:
 * - messages: Array of strings (message lines to display)
 * - isLocked: Boolean (shows locked screen vs message content)
 */
export default function EncryptedMessage({
  messages = [],
}) {
  const isLocked = !messages.length;

  return (
    <div className={`encrypted-message ${isLocked ? 'encrypted-message-locked' : ''}`}>
      {isLocked ? (
        /* Locked state - sleek encrypted banner */
        <div className="encrypted-lock-screen">
          <div className="encrypted-lock-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="10" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="2"/>
              <path d="M8 10V7C8 4.79086 9.79086 3 12 3V3C14.2091 3 16 4.79086 16 7V10" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="15" r="1.5" fill="currentColor"/>
            </svg>
            <span className="encrypted-lock-title">ENCRYPTED MESSAGE</span>
          </div>

          <div className="encrypted-scramble">
            <div className="encrypted-scramble-line">7f 4a 9c 2e 8b d1 3a 6f 5e a2 c8 4d</div>
            <div className="encrypted-scramble-line">b3 1f 7e 9a 4c d6 2b 8e f1 a5 3c 6d</div>
            <div className="encrypted-scramble-line">5a c2 8f 1d 6b e4 9a 3f 7c d8 2e a1</div>
          </div>

          <div className="encrypted-lock-footer">
            DECRYPTION KEY REQUIRED
          </div>
        </div>
      ) : (
        /* Unlocked state - message content */
        <div className="encrypted-message-content">
          <div className="encrypted-message-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span className="encrypted-message-title">DECRYPTED MESSAGE</span>
          </div>

          <div className="encrypted-message-body">
            {messages.map((line, i) => (
              <div key={i} className="encrypted-message-line">
                {line}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
