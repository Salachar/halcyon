import { Line, Divider, Section } from '@shadowsea/ShadowSeaComponents';

export default function Menu({
  title,
  subtitle,
  signType,
  categories = [],
  footer,
}) {
  // Neon sign designs
  const getNeonSign = () => {
    const styling = {
      position: 'relative',
      width: '60px',
      height: '60px',
      // margin: '0 auto 1rem',
    };

    switch (signType) {
      case 'cocktail':
        return (
          <div style={styling}>
            {/* Martini glass */}
            <svg width="60" height="60" viewBox="0 0 60 60">
              {/* Glass bowl (triangle) */}
              <path
                d="M 15 15 L 45 15 L 30 40 Z"
                fill="none"
                stroke="rgb(251, 146, 60)"
                strokeWidth="2"
                style={{
                  filter: 'drop-shadow(0 0 4px rgb(251, 146, 60))',
                }}
              />
              {/* Stem */}
              <line
                x1="30"
                y1="40"
                x2="30"
                y2="52"
                stroke="rgb(251, 146, 60)"
                strokeWidth="2"
                style={{
                  filter: 'drop-shadow(0 0 4px rgb(251, 146, 60))',
                }}
              />
              {/* Base */}
              <line
                x1="24"
                y1="52"
                x2="36"
                y2="52"
                stroke="rgb(251, 146, 60)"
                strokeWidth="2"
                style={{
                  filter: 'drop-shadow(0 0 4px rgb(251, 146, 60))',
                }}
              />
              {/* Olive on pick */}
              <circle
                cx="32"
                cy="22"
                r="3"
                fill="rgb(34, 197, 94)"
                style={{
                  filter: 'drop-shadow(0 0 3px rgb(34, 197, 94))',
                }}
              />
              <line
                x1="32"
                y1="18"
                x2="38"
                y2="12"
                stroke="rgb(148, 163, 184)"
                strokeWidth="1"
              />
            </svg>
          </div>
        );

      case 'sandwich':
        return (
          <div style={styling}>
            <svg width="60" height="60" viewBox="0 0 60 60">
              {/* Top bun */}
              <path
                d="M 15 20 Q 30 15 45 20"
                fill="none"
                stroke="rgb(251, 191, 36)"
                strokeWidth="3"
                style={{
                  filter: 'drop-shadow(0 0 4px rgb(251, 191, 36))',
                }}
              />
              {/* Lettuce */}
              <path
                d="M 15 28 L 45 28"
                stroke="rgb(34, 197, 94)"
                strokeWidth="2"
                style={{
                  filter: 'drop-shadow(0 0 3px rgb(34, 197, 94))',
                }}
              />
              {/* Meat */}
              <rect
                x="16"
                y="32"
                width="28"
                height="4"
                fill="none"
                stroke="rgb(239, 68, 68)"
                strokeWidth="2"
                style={{
                  filter: 'drop-shadow(0 0 3px rgb(239, 68, 68))',
                }}
              />
              {/* Bottom bun */}
              <line
                x1="15"
                y1="40"
                x2="45"
                y2="40"
                stroke="rgb(251, 191, 36)"
                strokeWidth="3"
                style={{
                  filter: 'drop-shadow(0 0 4px rgb(251, 191, 36))',
                }}
              />
            </svg>
          </div>
        );

      case 'coffee':
        return (
          <div style={styling}>
            <svg width="60" height="60" viewBox="0 0 60 60">
              {/* Cup */}
              <path
                d="M 20 25 L 22 45 L 38 45 L 40 25 Z"
                fill="none"
                stroke="rgb(251, 191, 36)"
                strokeWidth="2"
                style={{
                  filter: 'drop-shadow(0 0 4px rgb(251, 191, 36))',
                }}
              />
              {/* Handle */}
              <path
                d="M 40 30 Q 48 35 40 40"
                fill="none"
                stroke="rgb(251, 191, 36)"
                strokeWidth="2"
                style={{
                  filter: 'drop-shadow(0 0 4px rgb(251, 191, 36))',
                }}
              />
              {/* Steam 1 */}
              <path
                d="M 25 20 Q 23 15 25 10"
                fill="none"
                stroke="rgb(148, 163, 184)"
                strokeWidth="1.5"
                opacity="0.7"
                // style={{
                //   animation: 'steam 2s infinite',
                // }}
              />
              {/* Steam 2 */}
              <path
                d="M 30 22 Q 32 17 30 12"
                fill="none"
                stroke="rgb(148, 163, 184)"
                strokeWidth="1.5"
                opacity="0.7"
                // style={{
                //   animation: 'steam 2s 0.3s infinite',
                // }}
              />
              {/* Steam 3 */}
              <path
                d="M 35 20 Q 37 15 35 10"
                fill="none"
                stroke="rgb(148, 163, 184)"
                strokeWidth="1.5"
                opacity="0.7"
                // style={{
                //   animation: 'steam 2s 0.6s infinite',
                // }}
              />
            </svg>
          </div>
        );

      case 'burger':
        return (
          <div style={styling}>
            <svg width="60" height="60" viewBox="0 0 60 60">
              {/* Top bun */}
              <ellipse
                cx="30"
                cy="22"
                rx="16"
                ry="8"
                fill="none"
                stroke="rgb(251, 191, 36)"
                strokeWidth="2"
                style={{
                  filter: 'drop-shadow(0 0 4px rgb(251, 191, 36))',
                }}
              />
              {/* Cheese */}
              <path
                d="M 14 30 L 46 30 L 44 34 L 16 34 Z"
                fill="none"
                stroke="rgb(251, 146, 60)"
                strokeWidth="2"
                style={{
                  filter: 'drop-shadow(0 0 3px rgb(251, 146, 60))',
                }}
              />
              {/* Patty */}
              <rect
                x="16"
                y="36"
                width="28"
                height="5"
                fill="none"
                stroke="rgb(120, 53, 15)"
                strokeWidth="2"
                style={{
                  filter: 'drop-shadow(0 0 3px rgb(120, 53, 15))',
                }}
              />
              {/* Bottom bun */}
              <line
                x1="14"
                y1="43"
                x2="46"
                y2="43"
                stroke="rgb(251, 191, 36)"
                strokeWidth="3"
                style={{
                  filter: 'drop-shadow(0 0 4px rgb(251, 191, 36))',
                }}
              />
            </svg>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Menu container */}
      <div
        style={{
          border: '2px solid rgb(251, 146, 60)',
          borderRadius: '4px',
          padding: '1.5rem',
          backgroundColor: 'rgba(29, 35, 50, 0.3)',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            marginBottom: '1rem',
          }}
        >
          {/* Neon sign */}
          {signType && (
            <div style={{ marginRight: '1rem' }}>
              {getNeonSign()}
            </div>
          )}

          {/* Title */}
          <div>
            <Line
              style={{
                margin: 0,
                fontSize: '1.3rem',
                fontWeight: 'bold',
                color: 'rgb(251, 146, 60)',
                textShadow: '0 0 8px rgb(251, 146, 60)',
                letterSpacing: '0.1em',
              }}
            >
              {title}
            </Line>
            {subtitle && (
              <Line cyan style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {subtitle}
              </Line>
            )}
          </div>
        </div>


        <Divider />

        {/* Categories */}
        {categories.map((category, catIndex) => (
          <div key={catIndex}>
            <Section title={category.name}>
              {category.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.25rem 0',
                    borderBottom: itemIndex < category.items.length - 1 ? '1px dotted rgba(148, 163, 184, 0.2)' : 'none',
                  }}
                >
                  <span
                    style={{
                      color: 'rgb(79, 209, 197)',
                      fontSize: '0.875rem',
                      fontFamily: 'monospace',
                    }}
                  >
                    {item.name}
                  </span>
                  <span
                    style={{
                      color: 'rgb(251, 191, 36)',
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      fontFamily: 'monospace',
                      marginLeft: '1rem',
                    }}
                  >
                    {item.price}
                  </span>
                </div>
              ))}
            </Section>
            {catIndex < categories.length - 1 && <Divider />}
          </div>
        ))}

        {/* Footer */}
        {footer && (
          <>
            <Divider />
            <div style={{ textAlign: 'center' }}>
              <Line
                style={{
                  color: 'rgb(251, 146, 60)',
                  fontSize: '0.875rem',
                  fontStyle: 'italic',
                }}
              >
                {footer}
              </Line>
            </div>
          </>
        )}
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes steam {
          0% { opacity: 0.7; transform: translateY(0); }
          50% { opacity: 0.3; }
          100% { opacity: 0; transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}
