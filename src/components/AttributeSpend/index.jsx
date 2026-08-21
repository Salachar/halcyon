import { ATTRIBUTES } from '@data/character/attributes';

import './attributeSpend.css';

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Fully bespoke, no shared components. Two distinct markers, not one:
//  - MAX badge: this attribute is genuinely at its own metatype ceiling.
//  - Asterisk on the max number: this attribute is blocked from ever
//    reaching its own max, because a DIFFERENT Physical/Mental attribute
//    already holds the one "at max" slot. This applies the instant any
//    attribute becomes maxed — every other non-maxed Physical/Mental
//    attribute is affected right away, not just whichever one happens
//    to be sitting closest to its own ceiling.
// Edge is exempt from the asterisk case (the one-max rule doesn't apply
// to it) but can still show the MAX badge if it's genuinely maxed.
export default function AttributeSpend({ attrs, values, ranges, maxedAttr, pointsRemaining, attributeBudget, onAdjust }) {
  return (
    <>
      <div className="sr-attr-spend-header">
        <span className="sr-attr-spend-points">
          <strong>{pointsRemaining}</strong> of {attributeBudget} attribute points remaining
        </span>
      </div>

      <div className="sr-attr-spend-list">
        {attrs.map((attr) => {
          const [min, max] = ranges[attr];
          const value = values[attr];
          const isPhysicalMental = attr !== 'edge';
          const atOwnMax = value === max;
          const blockedByMaxRule = isPhysicalMental && !atOwnMax && Boolean(maxedAttr) && maxedAttr !== attr;
          const info = ATTRIBUTES[attr];

          return (
            <div className="sr-attr-spend-row" key={attr}>
              <div className="sr-attr-spend-info">
                <div className="sr-attr-spend-name">{capitalize(attr)}</div>
                <p className="sr-attr-spend-description">{info?.description}</p>
              </div>

              <div className="sr-attr-spend-control">
                <span className="sr-attr-spend-bound">{min}</span>
                <button className="sr-icon-btn" onClick={() => onAdjust(attr, -1)}>−</button>
                <span className="sr-dice-count">{value}</span>
                <button className="sr-icon-btn" onClick={() => onAdjust(attr, 1)}>+</button>
                <span className="sr-attr-spend-bound">
                  {max}
                  {blockedByMaxRule && (
                    <span
                      className="sr-attr-spend-asterisk"
                      title={`Only one Physical or Mental attribute may sit at its max — ${capitalize(maxedAttr)} already does.`}
                    >
                      *
                    </span>
                  )}
                </span>
              </div>

              {atOwnMax && <span className="sr-attr-spend-max-badge">MAX</span>}
            </div>
          );
        })}
      </div>
    </>
  );
}
