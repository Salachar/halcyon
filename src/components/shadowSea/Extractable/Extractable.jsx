import { useState } from 'react';
import { Line, Divider } from '@shadowsea/ShadowSeaComponents';
import { searchAllItems } from '@data/tables';
import { getExtracted, saveExtracted, getWallet, saveWallet } from '@utils/localStorage';

const resolveItem = (item) => {
  if (typeof item === "string") item = { id: item };
  if (!item.id) return item;
  const found = searchAllItems(item.id);
  if (!found) return item;
  return {
    ...found.entry,
    section: item.section || found.section,
    quantity: item.quantity || 1,
    isCredits: item.isCredits,
    id: item.id,
  };
};

const hydrateItems = (items) => items.map(item => {
  const resolved = resolveItem(item);
  return {
    id: resolved.id,
    label: resolved.label,
    description: resolved.description || null,
    die: resolved.die || null,
    cost: resolved.cost || null,
    value: resolved.value || null,
    quantity: resolved.quantity || 1,
    section: resolved.section || null,
    isCredits: resolved.isCredits || false,
  };
});

export default function Extractable({
  id,
  credits = 0,
  physicalItems = [],
  digitalItems = [],
  disabled = false,
  onExtract,
  compact = false,
  creditsOnly = false,
}) {
  // Add the basic credts item to the digital list if there is one
  // Otherwise we could use digitalItems straight like physical
  const useDigitalItems = [
    ...digitalItems,
    ...(credits ? [{
      id: `${id}_basic_credits`,
      label: 'Available Credits',
      description: '',
      value: credits,
      isCredits: true,
    }] : []),
  ];

  // ─── State ────────────────────────────────────────────────────────────────

  const [extractedPhysicalIds, setExtractedPhysicalIds] = useState(() =>
    new Set(getExtracted()[`${id}-physical-ids`] || [])
  );

  const [extractedDigitalIds, setExtractedDigitalIds] = useState(() =>
    new Set(getExtracted()[`${id}-digital-ids`] || [])
  );

  physicalItems = hydrateItems(physicalItems);
  digitalItems = hydrateItems(digitalItems);
  const allPhysicalTaken = physicalItems.length > 0 && physicalItems.every(i => extractedPhysicalIds.has(i.id));
  const allDigitalTaken  = useDigitalItems.length > 0 && useDigitalItems.every(i => extractedDigitalIds.has(i.id));

  // ─── Persistence ──────────────────────────────────────────────────────────

  const persistIds = (sectionKey, ids) => {
    const extracted = getExtracted();
    extracted[sectionKey] = [...ids];
    saveExtracted(extracted);
  };

  // const addToWallet = (items) => {
  //   const wallet = getWallet();
  //   wallet.items.push(...items);
  //   saveWallet(wallet);
  // };

  const addToWallet = (items) => {
    const wallet = getWallet();
    items.forEach(item => {
      if (item.isCredits) {
        wallet.credits += item.value || 0;
      } else {
        wallet.items.push(item);
      }
    });
    saveWallet(wallet);
    window.dispatchEvent(new Event('walletUpdated'));
  };

  // ─── Handlers ─────────────────────────────────────────────────────────────

  const extractItem = (item, ids, setIds, sectionKey) => {
    if (disabled || ids.has(item.id)) return;
    const next = new Set([...ids, item.id]);
    setIds(next);
    persistIds(sectionKey, next);
    addToWallet([item]);
  };

  const extractAll = (items, ids, setIds, sectionKey, type) => {
    if (disabled) return;
    const remaining = items.filter(i => !ids.has(i.id));
    if (!remaining.length) return;
    const next = new Set(items.map(i => i.id));
    setIds(next);
    persistIds(sectionKey, next);
    addToWallet(remaining);
    if (onExtract) {
      const value = remaining.reduce((sum, i) => sum + (i.value || 0), 0);
      onExtract(remaining, value, type);
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {physicalItems.length > 0 && (
        <ItemSection
          compact={compact}
          creditsOnly={creditsOnly}
          label="PHYSICAL ITEMS"
          sublabel="Physical presence required"
          accentColor="rgb(251, 191, 36)"
          buttonLabel="TAKE"
          buttonLabelPast="TAKEN"
          items={physicalItems}
          extractedIds={extractedPhysicalIds}
          allTaken={allPhysicalTaken}
          disabled={disabled}
          onExtractItem={(item) => extractItem(item, extractedPhysicalIds, setExtractedPhysicalIds, `${id}-physical-ids`)}
          onExtractAll={() => extractAll(physicalItems, extractedPhysicalIds, setExtractedPhysicalIds, `${id}-physical-ids`, 'physical')}
        />
      )}

      {useDigitalItems.length > 0 && (
        <ItemSection
          compact={compact}
          creditsOnly={creditsOnly}
          label="DIGITAL ITEMS"
          sublabel="Extractable remotely via network connection"
          accentColor="rgb(79, 209, 197)"
          buttonLabel="CLAIM"
          buttonLabelPast="CLAIMED"
          items={useDigitalItems}
          extractedIds={extractedDigitalIds}
          allTaken={allDigitalTaken}
          disabled={disabled}
          onExtractItem={(item) => extractItem(item, extractedDigitalIds, setExtractedDigitalIds, `${id}-digital-ids`)}
          onExtractAll={() => extractAll(useDigitalItems, extractedDigitalIds, setExtractedDigitalIds, `${id}-digital-ids`, 'digital')}
        />
      )}
    </div>
  );
}

// ─── ItemSection ─────────────────────────────────────────────────────────────

function ItemSection({
  compact = false,
  creditsOnly = false,
  label,
  sublabel,
  accentColor,
  buttonLabel,
  buttonLabelPast,
  items,
  extractedIds,
  allTaken,
  disabled,
  onExtractItem,
  onExtractAll,
}) {
  const hasHeader = !creditsOnly;

  return (
    <div
      style={{
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        border: '1px solid rgb(71, 85, 105)',
        borderRadius: '3px',
        padding: '0.75rem',
      }}
    >
      {/* Header */}
      {hasHeader && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ flex: 1 }}>
              <Line style={{ margin: 0, color: accentColor, fontSize: '0.875rem', fontWeight: 'bold' }}>
                {label}
              </Line>
              {!allTaken && (
                <Line smoke style={{ fontSize: '0.7rem', margin: 0, marginTop: '0.25rem' }}>
                  {sublabel}
                </Line>
              )}
            </div>

            <ActionButton
              label={allTaken ? `✓ ${buttonLabelPast}` : buttonLabel}
              done={allTaken}
              disabled={disabled}
              color={accentColor}
              onClick={onExtractAll}
            />
          </div>
          <Divider />
        </>
      )}

      {/* Items list */}
      <div style={{
        marginTop: hasHeader ? '0.75rem' : '0',
      }}>
        {items.map((item, i) => {
          const taken = extractedIds.has(item.id);
          return (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                marginBottom: i < items.length - 1 ? '0.5rem' : 0,
                opacity: taken ? 0.6 : 1,
              }}
            >
              <span style={{ color: taken ? 'rgb(148, 163, 184)' : accentColor, fontSize: '0.875rem', flexShrink: 0 }}>
                {taken ? '✓' : '→'}
              </span>

              <div style={{ flex: 1 }}>
                <Line style={{ margin: 0, color: taken ? 'rgb(148, 163, 184)' : accentColor, fontSize: '0.875rem' }}>
                  <strong>{item.label}</strong>
                  {item.quantity > 1 && (
                    <span style={{ fontWeight: 'normal', opacity: 0.7, marginLeft: '0.4rem' }}>×{item.quantity}</span>
                  )}
                  {item.die && (
                    <span style={{ fontFamily: 'monospace', marginLeft: '0.4rem', opacity: 0.8 }}>{item.die}</span>
                  )}
                  {item.cost && (
                    <span style={{ color: 'rgb(34, 197, 94)', marginLeft: '0.4rem', fontWeight: 'normal', fontSize: '0.8rem' }}>{item.cost}</span>
                  )}
                </Line>
                {item.description && (
                  <Line smoke style={{ margin: 0, fontSize: '0.78rem', marginTop: '0.15rem', opacity: taken ? 0.5 : 0.8 }}>
                    {item.description}
                  </Line>
                )}
                {item.value && !item.isCredits && (
                  <Line style={{ margin: 0, fontSize: '0.75rem', marginTop: '0.15rem', color: 'rgb(34, 197, 94)', opacity: taken ? 0.5 : 1 }}>
                    ~{item.value.toLocaleString()}¤
                  </Line>
                )}
                {item.value && item.isCredits && (
                  <span style={{ color: taken ? 'rgb(148, 163, 184)' : 'rgb(229, 226, 43)', fontWeight: 'bold' }}>
                    [{item.value.toLocaleString()}¤]
                  </span>
                )}
              </div>

              {!taken && (
                <ActionButton
                  label={buttonLabel}
                  done={false}
                  disabled={disabled}
                  color={accentColor}
                  small
                  onClick={() => onExtractItem(item)}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── ActionButton ─────────────────────────────────────────────────────────────

function ActionButton({ label, done, disabled, color, small, onClick }) {
  const inactive = done || disabled;
  return (
    <button
      onClick={onClick}
      disabled={inactive}
      style={{
        padding: small ? '0.2rem 0.5rem' : '0.5rem 1rem',
        fontSize: small ? '0.65rem' : '0.75rem',
        fontWeight: 'bold',
        backgroundColor: inactive
          ? (small ? 'transparent' : 'rgb(45, 53, 72)')
          : small
            ? `${color}26`
            : color,
        color: inactive ? 'rgb(148, 163, 184)' : small ? color : 'rgb(19, 23, 34)',
        border: small ? `1px solid ${inactive ? 'transparent' : color}66` : 'none',
        borderRadius: '3px',
        cursor: inactive ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s',
        fontFamily: 'monospace',
        flexShrink: 0,
      }}
    >
      {label}
    </button>
  );
}
