import { useCharacterManager } from '@hooks/useCharacterManager';

import './conditionMonitor.css';

// Boxes render in real rows of 3 — matching the actual rule ("for every
// 3 boxes of damage on any one track, -1 dice pool") rather than an
// incidental flex-wrap that happened to look like rows. Click a box to
// mark up to it, click the last filled box again to clear it, or use
// the +/- buttons — both stay valid ways to adjust the same value.
function DamageTrack({ label, current, max, filledClass, onChange }) {
  const rowSizes = [];
  for (let i = 0; i < max; i += 3) rowSizes.push(Math.min(3, max - i));

  return (
    <div className="sr-cm-track">
      <div className="sr-cm-track-header">
        <span className="sr-cm-track-label">{label}</span>
        <div className="sr-cm-track-controls">
          <button className="sr-icon-btn" onClick={() => onChange(Math.max(0, current - 1))}>−</button>
          <span className="sr-cm-track-count">{current}/{max}</span>
          <button className="sr-icon-btn" onClick={() => onChange(Math.min(max, current + 1))}>+</button>
        </div>
      </div>
      <div className="sr-cm-rows">
        {rowSizes.map((rowSize, rowIdx) => (
          <div className="sr-cm-row" key={rowIdx}>
            {Array.from({ length: rowSize }, (_, colIdx) => {
              const i = rowIdx * 3 + colIdx;
              const filled = i < current;
              const isLastFilled = filled && i === current - 1;
              return (
                <button
                  key={i}
                  className={filled ? `sr-cm-box ${filledClass}` : 'sr-cm-box'}
                  onClick={() => onChange(isLastFilled ? current - 1 : i + 1)}
                  title={`Mark up to box ${i + 1}`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// Wound penalty (-1 per 3 boxes, cumulative within and across both
// tracks, exempt from Damage Resistance) is now a real computed value
// on Character — shown prominently here, and actually subtracted in
// buildSkillPool.
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
    <div className="sr-condition-monitor">
      <div className="sr-cm-tracks">
        <DamageTrack
          label="Physical"
          current={character.physicalDamage}
          max={character.physicalMonitorMax}
          filledClass="sr-cm-box--physical-filled"
          onChange={setPhysical}
        />
        <DamageTrack
          label="Stun"
          current={character.stunDamage}
          max={character.stunMonitorMax}
          filledClass="sr-cm-box--stun-filled"
          onChange={setStun}
        />
      </div>

      {penalty > 0 && (
        <div className="sr-cm-penalty">
          Wound Penalty: −{penalty} <span className="sr-cm-penalty-note">(not Damage Resistance)</span>
        </div>
      )}
    </div>
  );
}
