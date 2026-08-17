import './locked.css';

export default function Locked({
  theme = "terminal",
  title = "LOCKED",
  message = "AUTHENTICATION REQUIRED",
}) {
  const themeConfig = {
    wallet: {
      icon: (
        <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
          <rect x="16" y="28" width="32" height="28" rx="2" stroke="currentColor" strokeWidth="3"/>
          <path d="M20 28V20C20 14.4772 24.4772 10 30 10H34C39.5228 10 44 14.4772 44 20V28" stroke="currentColor" strokeWidth="3"/>
          <circle cx="32" cy="42" r="4" fill="currentColor"/>
          <rect x="30" y="42" width="4" height="8" fill="currentColor"/>
        </svg>
      ),
      accentColor: 'rgb(239, 68, 68)',
      borderColor: 'rgba(239, 68, 68, 0.4)',
      glowColor: 'rgba(239, 68, 68, 0.5)',
    },
    safe: {
      icon: (
        <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
          <rect x="12" y="12" width="40" height="40" rx="2" stroke="currentColor" strokeWidth="3"/>
          <circle cx="32" cy="32" r="10" stroke="currentColor" strokeWidth="3"/>
          <circle cx="32" cy="32" r="3" fill="currentColor"/>
          <line x1="32" y1="22" x2="32" y2="18" stroke="currentColor" strokeWidth="2"/>
          <line x1="42" y1="32" x2="46" y2="32" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      accentColor: 'rgb(251, 191, 36)',
      borderColor: 'rgba(251, 191, 36, 0.4)',
      glowColor: 'rgba(251, 191, 36, 0.5)',
    },
    vending: {
      icon: (
        <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
          <rect x="16" y="8" width="32" height="48" rx="2" stroke="currentColor" strokeWidth="3"/>
          <rect x="20" y="12" width="24" height="16" rx="1" stroke="currentColor" strokeWidth="2"/>
          <rect x="22" y="32" width="8" height="6" rx="1" fill="currentColor"/>
          <rect x="34" y="32" width="8" height="6" rx="1" fill="currentColor"/>
          <rect x="22" y="42" width="8" height="6" rx="1" fill="currentColor"/>
          <rect x="34" y="42" width="8" height="6" rx="1" fill="currentColor"/>
        </svg>
      ),
      accentColor: 'rgb(34, 197, 94)',
      borderColor: 'rgba(34, 197, 94, 0.4)',
      glowColor: 'rgba(34, 197, 94, 0.5)',
    },
    terminal: {
      icon: (
        <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
          <rect x="12" y="16" width="40" height="32" rx="2" stroke="currentColor" strokeWidth="3"/>
          <path d="M20 26L26 32L20 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="32" y1="38" x2="44" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      accentColor: 'rgb(79, 209, 197)',
      borderColor: 'rgba(79, 209, 197, 0.4)',
      glowColor: 'rgba(79, 209, 197, 0.5)',
    },
    vault: {
      icon: (
        <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
          <rect x="8" y="8" width="48" height="48" rx="2" stroke="currentColor" strokeWidth="3"/>
          <circle cx="32" cy="32" r="14" stroke="currentColor" strokeWidth="3"/>
          <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="2"/>
          <circle cx="32" cy="32" r="3" fill="currentColor"/>
          <rect x="28" y="44" width="8" height="4" fill="currentColor"/>
        </svg>
      ),
      accentColor: 'rgb(168, 85, 247)',
      borderColor: 'rgba(168, 85, 247, 0.4)',
      glowColor: 'rgba(168, 85, 247, 0.5)',
    },
    locker: {
      icon: (
        <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
          <rect x="18" y="12" width="28" height="40" rx="2" stroke="currentColor" strokeWidth="3"/>
          <circle cx="32" cy="28" r="4" stroke="currentColor" strokeWidth="2"/>
          <line x1="32" y1="32" x2="32" y2="40" stroke="currentColor" strokeWidth="2"/>
          <rect x="28" y="40" width="8" height="4" rx="1" fill="currentColor"/>
        </svg>
      ),
      accentColor: 'rgb(59, 130, 246)',
      borderColor: 'rgba(59, 130, 246, 0.4)',
      glowColor: 'rgba(59, 130, 246, 0.5)',
    },
    home: {
      icon: (
        <svg width="48" height="48" viewBox="0 0 64 64" fill="none">
          <path d="M12 28L32 10L52 28V54H38V40H26V54H12V28Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
          <rect x="28" y="40" width="8" height="14" rx="1" fill="currentColor" opacity="0.3"/>
          <circle cx="32" cy="32" r="4" stroke="currentColor" strokeWidth="2"/>
          <line x1="32" y1="36" x2="32" y2="42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      accentColor: 'rgb(251, 146, 60)',
      borderColor: 'rgba(251, 146, 60, 0.4)',
      glowColor: 'rgba(251, 146, 60, 0.5)',
    },
  };

  const config = themeConfig[theme] || themeConfig.terminal;

  return (
    <div
      className="locked-banner"
      style={{
        '--accent-color': config.accentColor,
        '--border-color': config.borderColor,
        '--glow-color': config.glowColor,
      }}
    >
      <div className="locked-content">
        <div className="locked-visual">
          {config.icon}
        </div>
        <div className="locked-text">
          <div className="locked-title">{title}</div>
          <div className="locked-message">{message}</div>
        </div>
      </div>
    </div>
  );
}
