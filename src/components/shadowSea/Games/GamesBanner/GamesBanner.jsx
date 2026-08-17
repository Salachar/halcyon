import './gamesBanner.css';

/**
 * GamesBanner - Fancy header for the minigames menu
 *
 * Displays a retro arcade-style banner with glowing text and disclaimer.
 */
export default function GamesBanner() {
  return (
    <div className="games-banner">
      {/* Top border */}
      <div className="games-banner-border top">
        ═══════════════════════════════════════════════════════════════
      </div>

      {/* Main title */}
      <div className="games-banner-title">
        <div className="games-banner-icon">⚡</div>
        <div className="games-banner-text">
          <div className="games-banner-main">NEURAL ARCADE</div>
          <div className="games-banner-sub">Entertainment Protocols</div>
        </div>
        <div className="games-banner-icon">⚡</div>
      </div>

      {/* Disclaimer */}
      <div className="games-banner-disclaimer">
        <span className="games-banner-disclaimer-icon">⚠</span>
        NOTICE: Credits are non-transferable simulation tokens only
        <span className="games-banner-disclaimer-icon">⚠</span>
      </div>

      {/* Flavor text */}
      <div className="games-banner-flavor">
        ┌─ Approved by CY Board of Entertainment ─┐
      </div>

      {/* Bottom border */}
      <div className="games-banner-border bottom">
        ═══════════════════════════════════════════════════════════════
      </div>
    </div>
  );
}
