import { useCharacterManager } from '@hooks/useCharacterManager';

import {
  Monitor, TrackBlock, TrackLabel, CurrentInput, MaxLabel,
  BoxesColumn, ThresholdRow, ThresholdCell, BoxRow, Box, Penalty, PenaltyNote,
} from './ConditionMonitor.styles';

// Single continuous row per track now (Physical above Stun), replacing
// the old row-of-3 wrapping — a real header-width row reads better
// than stacked groups once there's room for it. The current value is
// a real editable number input rather than a plain "current/max"
// label; clicking a box still works too, both stay valid ways to set
// the same value. Threshold markers (-1/-2/-3...) sit above the actual
// every-3rd-box position, computed off the real rule rather than
// eyeballed spacing.
function DamageTrack({ label, current, max, trackType, onChange }) {
  const gridStyle = { gridTemplateColumns: `repeat(${max}, 1.15rem)` };

  return (
    <TrackBlock>
      <TrackLabel>{label}</TrackLabel>
      <CurrentInput
        type="number"
        min={0}
        max={max}
        value={current}
        onChange={(e) => onChange(Math.max(0, Math.min(max, Number(e.target.value) || 0)))}
      />
      <MaxLabel>/ {max}</MaxLabel>

      <BoxesColumn>
        <ThresholdRow style={gridStyle}>
          {Array.from({ length: max }, (_, i) => {
            const boxNum = i + 1;
            const isThreshold = boxNum % 3 === 0;
            return (
              <ThresholdCell key={i}>
                {isThreshold ? `-${boxNum / 3}` : ''}
              </ThresholdCell>
            );
          })}
        </ThresholdRow>
        <BoxRow style={gridStyle}>
          {Array.from({ length: max }, (_, i) => {
            const filled = i < current;
            const isLastFilled = filled && i === current - 1;
            return (
              <Box
                key={i}
                $filled={filled}
                $trackType={trackType}
                onClick={() => onChange(isLastFilled ? current - 1 : i + 1)}
                title={`Mark up to box ${i + 1}`}
              />
            );
          })}
        </BoxRow>
      </BoxesColumn>
    </TrackBlock>
  );
}

// Wound penalty (-1 per 3 boxes, cumulative within and across both
// tracks, exempt from Damage Resistance) is a real computed value on
// Character — shown prominently here, and actually subtracted in
// buildOpenPool.
export default function ConditionMonitor({ character }) {
  const { touch } = useCharacterManager();
  const penalty = character.woundPenalty;

  const setPhysical = (value) => {
    character.physicalDamage = value;
    touch();
  };

  const setStun = (value) => {
    character.stunDamage = value;
    touch();
  };

  return (
    <Monitor>
      <DamageTrack
        label="Physical"
        current={character.physicalDamage}
        max={character.physicalMonitorMax}
        trackType="physical"
        onChange={setPhysical}
      />
      <DamageTrack
        label="Stun"
        current={character.stunDamage}
        max={character.stunMonitorMax}
        trackType="stun"
        onChange={setStun}
      />

      {penalty > 0 && (
        <Penalty>
          Wound Penalty: −{penalty} <PenaltyNote>(not Damage Resistance)</PenaltyNote>
        </Penalty>
      )}
    </Monitor>
  );
}
