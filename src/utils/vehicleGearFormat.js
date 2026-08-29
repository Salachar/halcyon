// Shared display formatting for Vehicles/Watercraft/Drones Market
// tables — split out so all three (GearVehicles, GearWatercraft,
// GearDrones) format identically without duplicating the logic three
// times. buyColumn itself stays local to each component (needs a
// setPurchaseItem closure), matching how every other GearXXX.jsx
// already builds its own — this only extracts the pure formatters.

export function formatHandling(item) {
  const h = item.stats.handling;
  return h.offRoad != null ? `${h.onRoad}/${h.offRoad}` : String(h.onRoad);
}

function altStat(key) {
  return (i) => {
    const alt = i.stats.altMode;
    const base = i.stats[key];
    return alt?.[key] != null ? `${base}/${alt[key]}` : String(base);
  };
}

export function formatSeats(item) {
  const s = item.stats.seats;
  if (s == null) return '—';
  if (typeof s === 'object') return `${s.crew} / ${s.total}`;
  return String(s);
}

// Generic "primary/secondary" formatter — same pattern formatHandling
// already used for onRoad/offRoad, generalized for any stat that might
// carry a variant value. Currently only the Zodiac Whisper (rowed vs.
// powered operation) needs this, via accelerationRowed/
// speedIntervalRowed/topSpeedRowed — everything else just shows its
// plain value since the variant field won't exist on it.
function formatWithVariant(primary, variant) {
  if (primary == null) return '—';
  return variant != null ? `${primary}/${variant}` : String(primary);
}

export function formatAcceleration(item) {
  return formatWithVariant(item.stats.acceleration, item.stats.accelerationRowed);
}
export function formatSpeedInterval(item) {
  return formatWithVariant(item.stats.speedInterval, item.stats.speedIntervalRowed);
}
export function formatTopSpeed(item) {
  return formatWithVariant(item.stats.topSpeed, item.stats.topSpeedRowed);
}

export function formatLength(item) {
  return item.stats.length ?? '—';
}
