import Extractable from '../Extractable/Extractable';
import './digitalWallet.css';

/**
 * DigitalWallet - Compact banner-style digital wallet
 *
 * Props:
 * - id: String (required for Extractable)
 * - accountNumber: String
 * - credits: Number
 * - accountHolder: String
 * - lastTransaction: String
 * - isLocked: Boolean
 */
export default function DigitalWallet({
  id,
  accountNumber,
  credits = 0,
  accountHolder,
  lastTransaction,
  label,
  description,
  isLocked = false,
}) {
  return (
    <div className={`digital-wallet ${isLocked ? 'digital-wallet-locked' : ''}`}>
      <div className="wallet-header">
        {/* Left: title + lock label */}
        <div className="wallet-title">
          <span className="wallet-title-text">DIGITAL WALLET</span>
          {isLocked && (
            <div className="wallet-title-lock-ui">
              <span className="wallet-lock-title">AUTHENTICATION REQUIRED</span>
            </div>
          )}
        </div>

        {/* Right: details (unlocked) or lock icon (locked) */}
        {isLocked ? (
          <div className="wallet-lock-visual">
            <svg width="20" height="20" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="16" y="28" width="32" height="28" rx="2" stroke="currentColor" strokeWidth="4"/>
              <path d="M20 28V20C20 14.4772 24.4772 10 30 10H34C39.5228 10 44 14.4772 44 20V28" stroke="currentColor" strokeWidth="4"/>
              <circle cx="32" cy="42" r="4" fill="currentColor"/>
              <rect x="30" y="42" width="4" height="8" fill="currentColor"/>
            </svg>
            <div className="wallet-lock-ring" />
          </div>
        ) : (
          <div className="wallet-details">
            {accountNumber && (
              <div className="wallet-detail-item">
                <span className="wallet-detail-label">ACCT</span>
                <span className="wallet-detail-value">{accountNumber}</span>
              </div>
            )}
            {accountHolder && (
              <div className="wallet-detail-item">
                <span className="wallet-detail-label">HOLDER</span>
                <span className="wallet-detail-value">{accountHolder}</span>
              </div>
            )}
            {lastTransaction && (
              <div className="wallet-detail-item">
                <span className="wallet-detail-label">LAST TX</span>
                <span className="wallet-detail-value">{lastTransaction}</span>
              </div>
            )}
          </div>
        )}

      </div>

      {!isLocked && (
        <div className="wallet-extract-area">
          <Extractable
            id={`${id}-digital-wallet-extractable`}
            creditsOnly
            compact
            digitalItems={[
              {
                id: `${id}-digital-wallet-credits-item`,
                label: label || 'Digital Credits',
                description, // : description || `${credits.toLocaleString()}¤ available balance`,
                value: credits,
                isCredits: true,
              }
            ]}
          />
        </div>
      )}

    </div>
  );
}
