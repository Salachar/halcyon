/**
 * RetComImage - Reusable retcom-style image with scanline + scan-beam effects
 *
 * Extracted from BountyCard's image block. Drop it anywhere you need that
 * green-tinted terminal-camera look.
 *
 * Props:
 * - src: String (image URL or imported image path). Required unless you want the silhouette.
 * - alt: String (alt text, defaults to "retcom image")
 * - height: Number | String (container height, default 250)
 * - theme: 'green' | 'cyan' | 'amber' | 'red' | 'purple'
 *     green  → the classic BountyCard look (sepia + green scanlines)
 *     cyan   → cooler security-camera feel
 *     amber  → warm, degraded-feed vibe
 *     red    → threat/alert state
 *     purple → corrupted / anomaly state
 * - borderColor: String (CSS color, overrides the theme border if provided)
 * - style: Object (extra styles merged onto the outer container)
 */

const THEMES = {
  blue: {
    scanline: 'rgba(59, 130, 246, 0.04)',
    beam: 'rgba(147, 197, 253, 0.9)',
    beamShadow: 'rgba(59, 130, 246, 0.7)',
    tint: 'rgba(30, 93, 175, 0.12)',
    border: 'rgba(147, 197, 253, 0.6)',
  },
  green: {
    scanline: 'rgba(0, 255, 136, 0.03)',
    beam: 'rgba(0, 255, 136, 0.8)',
    beamShadow: 'rgba(0, 255, 136, 0.6)',
    tint: 'rgba(0, 255, 136, 0.08)',
    border: 'rgba(0, 255, 136, 0.5)',
  },
  cyan: {
    scanline: 'rgba(79, 209, 197, 0.03)',
    beam: 'rgba(79, 209, 197, 0.8)',
    beamShadow: 'rgba(79, 209, 197, 0.6)',
    tint: 'rgba(79, 209, 197, 0.07)',
    border: 'rgba(79, 209, 197, 0.5)',
  },
  amber: {
    scanline: 'rgba(251, 191, 36, 0.03)',
    beam: 'rgba(251, 191, 36, 0.7)',
    beamShadow: 'rgba(251, 191, 36, 0.5)',
    tint: 'rgba(251, 191, 36, 0.06)',
    border: 'rgba(251, 191, 36, 0.5)',
  },
  red: {
    scanline: 'rgba(239, 68, 68, 0.03)',
    beam: 'rgba(239, 68, 68, 0.7)',
    beamShadow: 'rgba(239, 68, 68, 0.5)',
    tint: 'rgba(239, 68, 68, 0.07)',
    border: 'rgba(239, 68, 68, 0.5)',
  },
  purple: {
    scanline: 'rgba(168, 85, 247, 0.03)',
    beam: 'rgba(168, 85, 247, 0.7)',
    beamShadow: 'rgba(168, 85, 247, 0.5)',
    tint: 'rgba(168, 85, 247, 0.07)',
    border: 'rgba(168, 85, 247, 0.5)',
  },
};

export default function RetComImage({
  src,
  alt = 'retcom image',
  theme = 'green',
  borderColor,
  style = {},
}) {
  const t = THEMES[theme] || THEMES.green;
  const border = borderColor || t.border;

  return (
    <div
      style={{
        border: `2px solid ${border}`,
        borderRadius: '6px',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        ...style,
      }}
    >
      {/* Image or silhouette fallback */}
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{
            imageRendering: 'crisp-edges',
            boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            opacity: 0.3,
          }}
        >
          <div style={{ width: 60, height: 60, backgroundColor: 'rgb(148, 163, 184)', borderRadius: '50%' }} />
          <div style={{ width: 100, height: 80, backgroundColor: 'rgb(148, 163, 184)', borderRadius: '50% 50% 0 0' }} />
        </div>
      )}

      {/* Static scanlines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `repeating-linear-gradient(
            0deg,
            ${t.scanline} 0px,
            transparent 1px,
            transparent 2px,
            ${t.scanline} 3px
          )`,
          pointerEvents: 'none',
        }}
      />

      {/* Moving scan beam */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${t.beam}, transparent)`,
          boxShadow: `0 0 8px ${t.beamShadow}`,
          pointerEvents: 'none',
        }}
      />

      {/* Color tint overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: t.tint,
          pointerEvents: 'none',
        }}
      />

      {/* Keyframes — scoped animation */}
      <style>{`
        @keyframes retcom-scan {
          0%   { top: 0%;   opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
