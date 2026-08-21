import { useState, useEffect } from 'react';

import {
  Divider,
  InsetBox,
  Line,
  Section,
  Spacer,
} from '@shadowsea/ShadowSeaComponents';

import { formatCredits } from '@utils/general';
import { getWallet, saveWallet } from '@utils/localStorage';

import { searchAllItems } from '@data';
import CharacterManager from '@data/characterManager';

import ConfirmationModal from '@components/ConfirmationModal';

// ─── TerminalWallet ───────────────────────────────────────────────────────────

const hydrateWalletItems = (items) => {
  return items.map(item => {
    const found = searchAllItems(item.id);
    if (!found) return item;
    return {
      ...found.entry,
      ...item,
      value: item.value ?? found.entry.value ?? null,
    };
  });
};

export default function Wallet() {
  const [wallet, setWallet] = useState(() => {
    const saved = getWallet();
    return {
      ...saved,
      items: hydrateWalletItems(saved.items),
    };
  });

  // Modal state: { type: 'sell'|'transfer'|'clear', index?, character? } | null
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    const loadWallet = () => {
      const saved = getWallet();
      setWallet({
        ...saved,
        items: hydrateWalletItems(saved.items),
      });
    };
    window.addEventListener('walletUpdated', loadWallet);
    return () => window.removeEventListener('walletUpdated', loadWallet);
  }, []);

  const handleConfirm = () => {
    if (!pendingAction) return;

    if (pendingAction.type === 'sell') {
      const current = getWallet();
      const item = current.items[pendingAction.index];
      if (!item?.value) return;
      const updated = {
        credits: current.credits + item.value,
        items: current.items.filter((_, idx) => idx !== pendingAction.index),
      };
      saveWallet(updated);
      setWallet(updated);
    }

    if (pendingAction.type === 'transfer') {
      const { character } = pendingAction;
      wallet.items.forEach(item => character.addItemToGear(item));
      character.credits += wallet.credits;
      CharacterManager.save();
      saveWallet({ credits: 0, items: [] });
      setWallet({ credits: 0, items: [] });
    }

    if (pendingAction.type === 'clear') {
      saveWallet({ credits: 0, items: [] });
      setWallet({ credits: 0, items: [] });
    }

    setPendingAction(null);
  };

  const modalProps = (() => {
    if (!pendingAction) return null;
    if (pendingAction.type === 'sell') return {
      title: 'Sell Item',
      message: `Sell this item for ${formatCredits(pendingAction.value)}? It will be removed from the wallet.`,
      confirmLabel: 'Sell',
    };
    if (pendingAction.type === 'transfer') return {
      title: 'Transfer to Character',
      message: `Transfer all wallet contents to ${pendingAction.character?.name || 'this character'}?`,
      confirmLabel: 'Transfer',
    };
    if (pendingAction.type === 'clear') return {
      title: 'Clear Wallet',
      message: 'Wipe the wallet without transferring? Extracted items remain extracted.',
      confirmLabel: 'Clear',
    };
    return null;
  })();

  const totalItems = wallet.items.length;
  const isEmpty = wallet.credits === 0 && totalItems === 0;

  const lastId = CharacterManager.lastSelectedId;
  const allChars = Object.values(CharacterManager.characters);
  const sortedChars = [
    ...allChars.filter(c => c.id === lastId),
    ...allChars.filter(c => c.id !== lastId),
  ];

  return (
    <div
      style={{
        border: '2px solid rgb(251, 191, 36)',
        borderRadius: '4px',
        backgroundColor: 'rgba(30, 41, 59, 0.5)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: 'rgb(51, 65, 85)',
          padding: '0.75rem 1rem',
          borderBottom: '1px solid rgb(251, 191, 36)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <div>
          <Line smoke style={{ margin: 0, fontSize: '0.75rem', opacity: 0.7 }}>TERMINAL WALLET</Line>
          <Line yellow large bold style={{ margin: 0 }}>EXTRACTED ASSETS</Line>
        </div>
        <div
          style={{
            padding: '0.35rem 0.75rem', borderRadius: '3px',
            backgroundColor: 'rgba(251, 191, 36, 0.2)',
            border: '1px solid rgb(251, 191, 36)',
            textAlign: 'center', flexShrink: 0,
          }}
        >
          <div style={{ fontSize: '0.7rem', color: 'rgb(148, 163, 184)', marginBottom: '0.15rem' }}>TOTAL CREDITS</div>
          <div style={{ fontSize: 'clamp(1rem, 4vw, 1.5rem)', fontWeight: 'bold', color: 'rgb(251, 191, 36)', fontFamily: 'monospace' }}>
            {formatCredits(wallet.credits)}
          </div>
        </div>
      </div>

      <div style={{ padding: '1rem' }}>
        {isEmpty ? (
          <div
            style={{
              textAlign: 'center', padding: '3rem 1rem',
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgb(71, 85, 105)', borderRadius: '3px',
            }}
          >
            <Line smoke style={{ margin: 0, fontSize: '1rem', opacity: 0.5 }}>No extracted items or credits</Line>
            <Line smoke style={{ margin: 0, fontSize: '0.875rem', opacity: 0.4, marginTop: '0.5rem' }}>
              Extract items from safes, wallets, and other devices
            </Line>
          </div>
        ) : (
          <>
            <Section title={`ITEMS EXTRACTED: (${totalItems})`} color="cyan">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {wallet.items.map((item, i) => {
                  const found = searchAllItems(item.id);
                  const display = found ? { ...found.entry, quantity: item.quantity || 1 } : item;
                  return (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
                      padding: '0.5rem 0.75rem',
                      backgroundColor: 'rgba(15, 23, 42, 0.6)',
                      border: '1px solid rgb(71, 85, 105)', borderRadius: '3px',
                    }}>
                      <span style={{ color: 'rgb(79, 209, 197)', fontSize: '0.875rem', flexShrink: 0 }}>→</span>
                      <div style={{ flex: 1 }}>
                        <Line cyan bold style={{ margin: 0, fontSize: '0.875rem' }}>
                          {display.label}
                          {display.quantity > 1 && (
                            <span style={{ color: 'rgb(148, 163, 184)', fontWeight: 'normal', marginLeft: '0.4rem' }}>×{display.quantity}</span>
                          )}
                          {display.die && (
                            <span style={{ fontFamily: 'monospace', marginLeft: '0.4rem', opacity: 0.8, fontWeight: 'normal' }}>{display.die}</span>
                          )}
                          {display.cost && (
                            <span style={{ color: 'rgb(34, 197, 94)', marginLeft: '0.4rem', fontWeight: 'normal', fontSize: '0.8rem' }}>{display.cost}</span>
                          )}
                        </Line>
                        {display.description && (
                          <Line smoke style={{ margin: 0, fontSize: '0.8rem', marginTop: '0.15rem' }}>{display.description}</Line>
                        )}
                        {item.value && (
                          <Line style={{ margin: 0, fontSize: '0.75rem', marginTop: '0.15rem', color: 'rgb(34, 197, 94)' }}>
                            ~{formatCredits(item.value)}
                          </Line>
                        )}
                      </div>

                      {item.value && (
                        <button
                          onClick={() => setPendingAction({ type: 'sell', index: i, value: item.value })}
                          style={{
                            padding: '0.2rem 0.5rem', fontSize: '0.62rem', fontWeight: 'bold',
                            backgroundColor: 'rgba(34, 197, 94, 0.08)', color: 'rgb(34, 197, 94)',
                            border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '3px',
                            cursor: 'pointer', fontFamily: 'monospace', flexShrink: 0,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          SELL ({formatCredits(item.value)})
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </Section>

            <Spacer />

            <Section title="TRANSFER TO CHARACTER:" color="green">
              {sortedChars.length === 0 ? (
                <Line smoke style={{ margin: 0, fontSize: '0.8rem', opacity: 0.5 }}>No characters found</Line>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {sortedChars.map((character) => {
                    const isLast = character.id === lastId;
                    return (
                      <div
                        key={character.id}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.75rem',
                          padding: '0.5rem 0.75rem',
                          backgroundColor: isLast ? 'rgba(34, 197, 94, 0.07)' : 'rgba(15, 23, 42, 0.4)',
                          border: `1px solid ${isLast ? 'rgba(34, 197, 94, 0.3)' : 'rgb(71, 85, 105)'}`,
                          borderRadius: '3px',
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '0.6rem', color: character.color, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {character.class}
                            {isLast && <span style={{ color: 'rgb(34, 197, 94)', marginLeft: '0.4rem' }}>● ACTIVE</span>}
                          </div>
                          <div style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'rgb(226, 232, 240)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {character.name || 'No Name'}
                          </div>
                        </div>
                        <div style={{ flexShrink: 0, minWidth: '150px' }}>
                          <button
                            onClick={() => setPendingAction({ type: 'transfer', character })}
                            style={{
                              width: '100%', padding: '0.35rem 0.5rem', fontSize: '0.65rem', fontWeight: 'bold',
                              backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'rgb(34, 197, 94)',
                              border: '1px solid rgba(34, 197, 94, 0.35)', borderRadius: '3px',
                              cursor: 'pointer', fontFamily: 'monospace',
                            }}
                          >
                            TRANSFER
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Section>

            <Spacer />
            <Divider />
            <InsetBox color="yellow" title="Clearing the Wallet">
              <Line style={{ fontSize: '0.65rem' }}>Clearing will wipe the wallet without transferring to a character. Extracted items remain extracted.</Line>
            </InsetBox>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setPendingAction({ type: 'clear' })}
                style={{
                  padding: '0.35rem 0.5rem', fontSize: '0.65rem', fontWeight: 'bold',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'rgb(239, 68, 68)',
                  border: '1px solid rgba(239, 68, 68, 0.35)', borderRadius: '3px',
                  cursor: 'pointer', fontFamily: 'monospace',
                }}
              >
                CLEAR
              </button>
            </div>
          </>
        )}
      </div>

      {modalProps && (
        <ConfirmationModal
          open={Boolean(pendingAction)}
          title={modalProps.title}
          message={modalProps.message}
          confirmLabel={modalProps.confirmLabel}
          onConfirm={handleConfirm}
          onCancel={() => setPendingAction(null)}
        />
      )}
    </div>
  );
}
