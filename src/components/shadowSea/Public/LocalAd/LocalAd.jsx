import React from 'react';

export default function LocalAd({
  name,           // Business name
  tagline,        // Main tagline
  subtitle,       // Secondary subtitle (optional)
  products = [],  // Array of Products/offerings
  cta,            // Call to action text (optional)
  theme = 'warm', // Visual theme
  children,       // Optional custom content (placed mid-section)
}) {
  const themes = {
    warm: {
      bg: '#1e3a5f',
      border: '#ff8c42',
      accent: '#ffd93d',
      text: '#6bc9ff',
      textBright: '#ffffff',
    },
    cozy: {
      bg: '#2a1810',
      border: '#d4a574',
      accent: '#ff8c42',
      text: '#e5c399',
      textBright: '#ffefd5',
    },
    vibrant: {
      bg: '#1a1a2e',
      border: '#ff006e',
      accent: '#00d9ff',
      text: '#b39ddb',
      textBright: '#ffffff',
    },
    earthy: {
      bg: '#1a2820',
      border: '#52b788',
      accent: '#95d5b2',
      text: '#d8f3dc',
      textBright: '#ffffff',
    },
    neon: {
      bg: '#0a0a0a',
      border: '#00ff41',
      accent: '#00ff41',
      text: '#88ff88',
      textBright: '#ffffff',
    },
    retro: {
      bg: '#2d1b4e',
      border: '#ff6b9d',
      accent: '#ffd93d',
      text: '#c8b7e0',
      textBright: '#ffffff',
    },
    industrial: {
      bg: '#1a1a1a',
      border: '#ff8800',
      accent: '#ffbb00',
      text: '#cccccc',
      textBright: '#ffffff',
    },
  };

  const t = themes[theme] || themes.warm;

  return (
    <div style={{
      position: 'relative',
      backgroundColor: t.bg,
      border: `3px solid ${t.border}`,
      borderRadius: '6px',
      padding: '1.25rem 1.5rem',
      overflow: 'hidden',
      boxShadow: '0 3px 10px rgba(0, 0, 0, 0.4)',
    }}>
      {/* Decorative stripe pattern (slight texture) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          repeating-linear-gradient(
            45deg,
            transparent,
            transparent 30px,
            ${t.border}08 30px,
            ${t.border}08 31px
          )
        `,
        pointerEvents: 'none',
      }} />

      {/* Top decorative bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        backgroundColor: t.accent,
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '1.25rem',
      }}>
        {/* Main content */}
        <div style={{ flex: 1 }}>
          {/* Business name */}
          <h3 style={{
            fontSize: '1.75rem',
            fontWeight: 900,
            color: t.border,
            marginBottom: '0.25rem',
            letterSpacing: '1px',
            lineHeight: 1.1,
            textShadow: `2px 2px 0px rgba(0, 0, 0, 0.3)`,
          }}>
            {name}
          </h3>

          {/* Tagline */}
          {tagline && (
            <p style={{
              fontSize: '0.875rem',
              color: t.accent,
              fontStyle: 'italic',
              marginBottom: subtitle || products.length > 0 ? '0.4rem' : 0,
            }}>
              "{tagline}"
            </p>
          )}

          {/* Subtitle */}
          {subtitle && (
            <p style={{
              fontSize: '0.75rem',
              color: t.text,
              marginBottom: products.length > 0 ? '0.5rem' : 0,
            }}>
              {subtitle}
            </p>
          )}

          {/* Products - simpler list style */}
          {products.length > 0 && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              marginTop: '0.5rem',
            }}>
              {products.slice(0, 3).map((feature, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: '0.75rem',
                    color: t.text,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span style={{ color: t.accent, fontSize: '1rem' }}>•</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          )}

          {/* Children content (mid-section) */}
          {children && (
            <div style={{
              marginTop: '0.75rem',
              fontSize: '0.75rem',
              color: t.text,
            }}>
              {children}
            </div>
          )}

          {/* Call to action */}
          {cta && (
            <div style={{
              marginTop: '0.75rem',
              fontSize: '0.7rem',
              color: t.accent,
              fontWeight: 'bold',
            }}>
              {cta}
            </div>
          )}
        </div>
      </div>

      {/* Corner stars (friendlier than brackets) */}
      {/* <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        width: '10px',
        height: '10px',
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(45deg)',
          width: '8px',
          height: '8px',
          backgroundColor: t.accent,
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '5px',
          height: '5px',
          backgroundColor: t.accent,
        }} />
      </div>

      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        width: '10px',
        height: '10px',
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(45deg)',
          width: '8px',
          height: '8px',
          backgroundColor: t.accent,
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '5px',
          height: '5px',
          backgroundColor: t.accent,
        }} />
      </div> */}
    </div>
  );
}
