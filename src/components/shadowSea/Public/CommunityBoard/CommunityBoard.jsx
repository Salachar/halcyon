import { Line, Divider, Section, ListItem } from '@shadowsea/ShadowSeaComponents';

/**
 * CommunityBoard Component - Physical bulletin board scanner
 *
 * Props:
 * - id: String
 * - name: String
 * - posts: Array of { text, color }
 * - services: Array of strings
 * - warnings: Array of { text, severity: "high"|"medium"|"low" }
 * - vibe: String
 * - sections: Array of { title, color, items: [{ text, color }] }
 */
export default function CommunityBoard({
  id = "",
  name = "COMMUNITY BULLETIN BOARD",
  posts = [],
  services = [],
  warnings = [],
  vibe,
  sections = null,
}) {
  const postColors = {
    pink:   { text: 'rgb(244, 114, 182)', bg: 'rgba(244, 114, 182, 0.06)', border: 'rgba(244, 114, 182, 0.25)' },
    yellow: { text: 'rgb(251, 191, 36)',  bg: 'rgba(251, 191, 36, 0.06)',  border: 'rgba(251, 191, 36, 0.25)'  },
    red:    { text: 'rgb(239, 68, 68)',   bg: 'rgba(239, 68, 68, 0.06)',   border: 'rgba(239, 68, 68, 0.25)'   },
    neon:   { text: 'rgb(34, 197, 94)',   bg: 'rgba(34, 197, 94, 0.06)',   border: 'rgba(34, 197, 94, 0.25)'   },
    cyan:   { text: 'rgb(79, 209, 197)',  bg: 'rgba(79, 209, 197, 0.06)',  border: 'rgba(79, 209, 197, 0.25)'  },
    smoke:  { text: 'rgb(148, 163, 184)', bg: 'rgba(148, 163, 184, 0.04)', border: 'rgba(148, 163, 184, 0.15)' },
  };

  const severityColors = {
    high:   postColors.red,
    medium: postColors.yellow,
    low:    postColors.pink,
  };

  const sectionAccents = {
    smoke: 'rgb(100, 116, 139)',
    cyan:  'rgb(79, 209, 197)',
    yellow:'rgb(251, 191, 36)',
    red:   'rgb(239, 68, 68)',
    pink:  'rgb(244, 114, 182)',
    neon:  'rgb(34, 197, 94)',
  };

  // Total post count for header
  const totalPosts = sections
    ? sections.reduce((acc, s) => acc + s.items.length, 0)
    : posts.length + warnings.length + services.length;

  const PostItem = ({ text, color = 'smoke' }) => {
    const c = postColors[color] || postColors.smoke;
    return (
      <div style={{
        display: 'flex',
        gap: '0.6rem',
        padding: '0.35rem 0.6rem',
        backgroundColor: c.bg,
        borderLeft: `2px solid ${c.border}`,
        borderRadius: '0 3px 3px 0',
        marginBottom: '0.3rem',
      }}>
        <span style={{
          color: c.border,
          fontSize: '0.7rem',
          flexShrink: 0,
          marginTop: '0.1rem',
          fontFamily: 'monospace',
        }}>›</span>
        <span style={{
          color: c.text,
          fontSize: '0.8rem',
          fontFamily: 'monospace',
          lineHeight: '1.5',
        }}>{text}</span>
      </div>
    );
  };

  const SectionBlock = ({ title, color = 'smoke', items = [] }) => {
    const accent = sectionAccents[color] || sectionAccents.smoke;
    return (
      <div style={{ marginBottom: '0.85rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '0.4rem',
        }}>
          <div style={{
            width: '3px',
            height: '0.7rem',
            backgroundColor: accent,
            borderRadius: '2px',
            flexShrink: 0,
          }} />
          <span style={{
            color: accent,
            fontSize: '0.6rem',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            letterSpacing: '0.2em',
          }}>{title}</span>
        </div>
        {items.map((item, i) => (
          <PostItem key={i} text={item.text} color={item.color || color} />
        ))}
      </div>
    );
  };

  return (
    <div style={{
      border: '1px solid rgba(0, 187, 255, 0.3)',
      borderRadius: '6px',
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      overflow: 'hidden',
    }}>

      {/* Header bar */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(0, 187, 255, 0.12), rgba(0, 187, 255, 0.05))',
        borderBottom: '1px solid rgba(0, 187, 255, 0.2)',
        padding: '0.65rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {/* Pin icon */}
          <div style={{ position: 'relative', width: '14px', height: '14px', flexShrink: 0 }}>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'rgb(239, 68, 68)',
              boxShadow: '0 0 6px rgba(239, 68, 68, 0.6)',
              position: 'absolute',
              top: 0,
              left: '2px',
            }} />
            <div style={{
              width: '2px',
              height: '7px',
              backgroundColor: 'rgba(239, 68, 68, 0.6)',
              position: 'absolute',
              bottom: 0,
              left: '6px',
              borderRadius: '1px',
            }} />
          </div>
          <span style={{
            color: 'rgb(148, 163, 184)',
            fontSize: '0.75rem',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            letterSpacing: '0.08em',
          }}>
            {name}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{
            color: 'rgba(0, 187, 255, 0.5)',
            fontSize: '0.6rem',
            fontFamily: 'monospace',
            letterSpacing: '0.1em',
          }}>{totalPosts} POSTS</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '0.85rem 1rem' }}>

        {sections ? (
          sections.map((section, i) => (
            <SectionBlock
              key={i}
              title={section.title}
              color={section.color}
              items={section.items}
            />
          ))
        ) : (
          <>
            {posts.length > 0 && (
              <SectionBlock
                title="RECENT POSTS"
                color="smoke"
                items={posts}
              />
            )}

            {warnings.length > 0 && (
              <SectionBlock
                title="WARNINGS"
                color="red"
                items={warnings.map(w => ({ text: w.text, color: severityColors[w.severity]?.text ? w.severity === 'high' ? 'red' : w.severity === 'medium' ? 'yellow' : 'pink' : 'yellow' }))}
              />
            )}

            {services.length > 0 && (
              <SectionBlock
                title="SERVICES"
                color="yellow"
                items={services.map(s => ({ text: s, color: 'yellow' }))}
              />
            )}
          </>
        )}

        {/* Vibe footer */}
        {vibe && (
          <div style={{
            marginTop: '0.25rem',
            paddingTop: '0.65rem',
            borderTop: '1px solid rgba(148, 163, 184, 0.1)',
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'flex-start',
          }}>
            <span style={{
              color: 'rgba(251, 191, 36, 0.4)',
              fontSize: '0.65rem',
              fontFamily: 'monospace',
              letterSpacing: '0.15em',
              flexShrink: 0,
              paddingTop: '0.05rem',
            }}>LOCALCAST AUTO-ASSESSMENT:</span>
            <span style={{
              color: 'rgb(251, 191, 36)',
              fontSize: '0.78rem',
              fontFamily: 'monospace',
              lineHeight: '1.5',
              fontStyle: 'italic',
            }}>{vibe}</span>
          </div>
        )}

      </div>
    </div>
  );
}
