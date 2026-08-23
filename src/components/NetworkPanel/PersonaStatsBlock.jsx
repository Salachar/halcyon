import { PanStat, SignalGauge } from './PanPrimitives';
import { REMOTE_DEVICE_LIMIT_MULTIPLIER } from '@utils/houseRules';

import './personaStatsBlock.css';

// Pure aggregate display — the Primary's name anchors it as a heading,
// but the four stats below are COMPUTED (see compositePersonaStats in
// panGrouping.js), rotating each attribute independently across every
// effectively-wireless Matrix-category device, not read straight off
// Primary alone. This is the actual fix for attributes not bubbling up
// from slaved commlinks/decks. Read-only — the interactive controls for
// any contributing device (wireless toggle, status, MCM) live on that
// device's own row in MatrixDevicesList below, not duplicated here.
// The gauge measures the WHOLE PAN's slaved count against the
// composited Data Processing limit, not just Matrix-category devices —
// Remote Device Limit governs everything slaved, regardless of category.
// The limit itself runs through REMOTE_DEVICE_LIMIT_MULTIPLIER
// (houseRules.js) — RAW is a flat 1x (Remote Device Limit = Data
// Processing), currently overridden to 2x. Doesn't touch anything
// Device-Rating-based (RCC's slavedDroneCapacity stays exactly RAW,
// unrelated formula).
export default function PersonaStatsBlock({ primaryLabel, compositedStats, totalSlavedCount }) {
  const remoteDeviceLimit = (compositedStats.dataProcessing ?? 0) * REMOTE_DEVICE_LIMIT_MULTIPLIER;
  return (
    <div className="sr-pan-stats-block">
      <div className="sr-pan-header-name">{primaryLabel}</div>
      <div className="sr-pan-header-role">Primary Device</div>

      <div className="sr-pan-header-stats">
        <PanStat label="Attack" value={compositedStats.attack} />
        <PanStat label="Sleaze" value={compositedStats.sleaze} />
        <PanStat label="Data Proc" value={compositedStats.dataProcessing} />
        <PanStat label="Firewall" value={compositedStats.firewall} />
      </div>

      <SignalGauge used={totalSlavedCount} limit={remoteDeviceLimit} />
    </div>
  );
}
