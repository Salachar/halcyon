import { ATTRIBUTES, ATTRIBUTE_IDS } from '@data/character/attributes';

// Reuses .sr-skill-card's existing CSS — same shape as SpellCard/
// PowerCard/ComplexFormCard, no new stylesheet needed. Reused between
// CreationModal's Attribute Info section and Shadowrunners > Metatypes.
export default function AttributeInfo() {
  return (
    <>
      {ATTRIBUTE_IDS.map((id) => {
        const attr = ATTRIBUTES[id];
        return (
          <div className="sr-skill-card" key={id}>
            <div className="sr-skill-card-identity">
              <div className="sr-skill-card-name">{attr.label}</div>
            </div>
            <div className="sr-skill-card-body">
              <p className="sr-skill-card-description">{attr.description}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}
