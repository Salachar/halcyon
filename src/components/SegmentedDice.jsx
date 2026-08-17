import React, { useEffect, useState } from "react";
import { rollDie } from "@utils/dice";

/**
 * SegmentedDice - Connected terminal display with operators on seams
 *
 * Visual: | ROLL | 4 | 3 | 6 | = 13 |
 *              +   +   +
 */
export default function SegmentedDice({
  label = "",
  dice = "1d6",
  mod = 0,
  multiplier = 1,
  dropLowest = 0,
  dropHighest = 0,
  allowIndividualReroll = true,
  rollable = true,
  displayFormat = null,
  onRollComplete = null,
  character_id = "",
}) {
  const [currentId, setCurrentId] = useState(character_id);
  const [diceStates, setDiceStates] = useState([]);
  const [dieMax, setDieMax] = useState(6);
  const [diceCount, setDiceCount] = useState(1);
  const [rolled, setRolled] = useState(false);
  const [rolling, setRolling] = useState(false);
  const [rollingIndices, setRollingIndices] = useState(new Set());
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    let amount = 1;
    let max = 6;

    if (typeof dice === "string" && dice.includes("d")) {
      const [count, sides] = dice.split("d").map(Number);
      amount = !count ? 1 : count;
      max = !sides ? 6 : sides;
    }

    setDiceCount(amount);
    setDieMax(max);
    setDiceStates(Array.from({ length: amount }, () => null));
  }, [dice]);

  useEffect(() => {
    if (character_id === currentId) return;
    setCurrentId(character_id);
    setRolled(false);
    setDiceStates(Array.from({ length: diceCount }, () => null));
  }, [character_id]);

  useEffect(() => {
    if (!rolling && rolled && onRollComplete) {
      const total = getTotal();
      if (total !== null) {
        onRollComplete(total * multiplier);
      }
    }
  }, [rolling, rolled]);

  const animateDie = async (index) => {
    if (!rolled) setRolled(true);

    setRolling(true);
    setRollingIndices(prev => new Set(prev).add(index));

    const duration = 400;
    const interval = 60;
    let elapsed = 0;

    return new Promise(resolve => {
      const intervalId = setInterval(() => {
        elapsed += interval;

        setDiceStates(prev => {
          const copy = [...prev];
          copy[index] = rollDie(dieMax);
          return copy;
        });

        if (elapsed >= duration) {
          clearInterval(intervalId);
          const finalValue = rollDie(dieMax);
          setDiceStates(prev => {
            const copy = [...prev];
            copy[index] = finalValue;
            return copy;
          });

          setRollingIndices(prev => {
            const next = new Set(prev);
            next.delete(index);
            return next;
          });

          resolve();
        }
      }, interval);
    });
  };

  const rerollAll = async () => {
    setRolling(true);
    const promises = [];
    for (let i = 0; i < diceStates.length; i++) {
      promises.push(animateDie(i));
    }
    await Promise.all(promises);
    setRolling(false);
  };

  const rerollDie = async (index) => {
    if (!allowIndividualReroll) return;
    setRolling(true);
    await animateDie(index);
    setRolling(false);
  };

  const getActiveDice = () => {
    if (!rolled || diceStates.some(d => d === null)) return [];

    let activeDice = diceStates.map((value, index) => ({ value, index }));

    if (dropLowest > 0) {
      const sorted = [...activeDice].sort((a, b) => a.value - b.value);
      const toDrop = sorted.slice(0, dropLowest).map(d => d.index);
      activeDice = activeDice.filter(d => !toDrop.includes(d.index));
    }

    if (dropHighest > 0) {
      const sorted = [...activeDice].sort((a, b) => b.value - a.value);
      const toDrop = sorted.slice(0, dropHighest).map(d => d.index);
      activeDice = activeDice.filter(d => !toDrop.includes(d.index));
    }

    return activeDice;
  };

  const isDropped = (index) => {
    if (!rolled) return false;
    const activeDice = getActiveDice();
    return !activeDice.some(d => d.index === index);
  };

  const getTotal = () => {
    const activeDice = getActiveDice();
    if (activeDice.length === 0) return null;

    const sum = activeDice.reduce((total, die) => total + die.value, 0);
    return sum + mod;
  };

  const formatTotal = (value) => {
    if (displayFormat) {
      return displayFormat(value);
    }
    return value;
  };

  if (!rollable) return null;

  const total = getTotal();

  // Calculate total segment width for positioning
  const dieSegmentWidth = 3; // rem
  const rollButtonWidth = 5; // rem

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <div className="text-xs font-bold text-cy-cyan uppercase tracking-wide">
          {label}
        </div>
      )}

      <div className="relative inline-flex border-2 border-gray-700 bg-black max-w-fit">
        {/* Roll Button Segment */}
        <button
          onClick={rerollAll}
          disabled={rolling}
          className="relative px-4 h-12 bg-gray-900 hover:bg-gray-800 disabled:opacity-50 transition-colors border-r-2 border-gray-700 w-20 flex-shrink-0"
        >
          <span className="text-xs font-bold text-cy-cyan uppercase tracking-wider">
            {rolling ? "..." : "Roll"}
          </span>
        </button>

        {/* Operator on seam */}
        <div className="absolute left-[calc(5rem+1px)] top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <div className="bg-black px-1">
            <span className="text-cy-cyan font-bold text-base" style={{
              textShadow: '0 0 8px rgba(0, 255, 255, 0.8), 0 0 4px rgba(0, 255, 255, 0.6)'
            }}>
              →
            </span>
          </div>
        </div>

        {/* Die Segments */}
        {diceStates.map((value, idx) => {
          const isRolling = rollingIndices.has(idx);
          const dropped = isDropped(idx);
          const isHovered = hoveredIndex === idx;

          return (
            <React.Fragment key={idx}>
              {/* Operator on seam between dice */}
              {idx !== 0 && (
                <div
                  className="absolute top-1/2 -translate-y-1/2 z-10 pointer-events-none"
                  style={{ left: `calc(5rem + ${idx * 3}rem + 1px)` }}
                >
                  <div className="bg-black px-1 -translate-x-1/2">
                    <span className="text-cy-cyan font-bold text-base" style={{
                      textShadow: '0 0 8px rgba(0, 255, 255, 0.8), 0 0 4px rgba(0, 255, 255, 0.6)'
                    }}>
                      +
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={() => rerollDie(idx)}
                disabled={!allowIndividualReroll || rolling}
                className={`
                  relative w-12 h-12 font-mono font-bold text-xl flex-shrink-0
                  border-r-2 border-gray-700 transition-all
                  ${dropped
                    ? 'bg-gray-950 text-gray-700'
                    : isHovered
                      ? 'bg-gray-800 text-cy-yellow'
                      : 'bg-black text-cy-yellow hover:bg-gray-900'
                  }
                  ${!allowIndividualReroll ? 'cursor-default' : 'cursor-pointer'}
                  ${isRolling ? 'animate-pulse' : ''}
                  disabled:opacity-50
                `}
              >
                <span className={dropped ? 'line-through' : ''}>
                  {rolled && value !== null ? (
                    value
                  ) : (
                    <span className="text-gray-700 text-sm">d{dieMax}</span>
                  )}
                </span>

                {isRolling && (
                  <div className="absolute inset-0 bg-cy-cyan/20" />
                )}
              </button>
            </React.Fragment>
          );
        })}

        {/* Modifier Segment */}
        {mod !== 0 && (
          <>
            {/* + operator on seam */}
            <div
              className="absolute top-1/2 -translate-y-1/2 z-10 pointer-events-none"
              style={{ left: `calc(5rem + ${diceCount * 3}rem + 1px)` }}
            >
              <div className="bg-black px-1 -translate-x-1/2">
                <span className="text-cy-cyan font-bold text-base" style={{
                  textShadow: '0 0 8px rgba(0, 255, 255, 0.8), 0 0 4px rgba(0, 255, 255, 0.6)'
                }}>
                  +
                </span>
              </div>
            </div>

            <div className="px-3 h-12 flex items-center justify-center bg-black border-r-2 border-gray-700 min-w-[3rem] flex-shrink-0">
              <span className={`text-base font-mono ${rolled ? 'text-gray-400' : 'text-gray-600'}`}>
                {mod}
              </span>
            </div>
          </>
        )}

        {/* Multiplier Segment */}
        {multiplier !== 1 && (
          <>
            {/* × operator on seam */}
            <div
              className="absolute top-1/2 -translate-y-1/2 z-10 pointer-events-none"
              style={{
                left: mod !== 0
                  ? `calc(5rem + ${diceCount * 3}rem + 3rem + 1px)`
                  : `calc(5rem + ${diceCount * 3}rem + 1px)`
              }}
            >
              <div className="bg-black px-1 -translate-x-1/2">
                <span className="text-cy-cyan font-bold text-base" style={{
                  textShadow: '0 0 8px rgba(0, 255, 255, 0.8), 0 0 4px rgba(0, 255, 255, 0.6)'
                }}>
                  ×
                </span>
              </div>
            </div>

            <div className="px-3 h-12 flex items-center justify-center bg-black border-r-2 border-gray-700 min-w-[3rem] flex-shrink-0">
              <span className={`text-base font-mono ${rolled ? 'text-gray-400' : 'text-gray-600'}`}>
                {multiplier}
              </span>
            </div>
          </>
        )}

        {/* Equals operator and Total (always shown) */}
        <>
          {/* = operator on seam */}
          <div
            className="absolute top-1/2 -translate-y-1/2 z-10 pointer-events-none"
            style={{ right: `calc(5rem + 1px)` }}
          >
            <div className="bg-black px-1 translate-x-1/2">
              <span className="text-cy-cyan font-bold text-xl" style={{
                textShadow: '0 0 8px rgba(0, 255, 255, 0.8), 0 0 4px rgba(0, 255, 255, 0.6)'
              }}>
                =
              </span>
            </div>
          </div>

          <div className="px-4 h-12 flex items-center justify-center bg-gray-900 w-20 flex-shrink-0">
            <span className="text-2xl font-bold text-cy-cyan font-mono tabular-nums">
              {rolled && total !== null ? formatTotal(total * multiplier) : "—"}
            </span>
          </div>
        </>
      </div>

      {/* Info text */}
      {rolled && (dropLowest > 0 || dropHighest > 0) && (
        <div className="text-xs text-gray-500 font-mono">
          {dropLowest > 0 && `Dropped lowest ${dropLowest}`}
          {dropHighest > 0 && `Dropped highest ${dropHighest}`}
        </div>
      )}
    </div>
  );
}
