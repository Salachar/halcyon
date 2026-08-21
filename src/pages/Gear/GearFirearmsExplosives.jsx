import { useState } from 'react';

import { Section, GearTable, Callout } from '@components/PageComponents';
import { CollapsibleSection } from '@components/CollapsibleSection';
import PurchaseModal from '@components/PurchaseModal';
import { useCharacterManager } from '@hooks/useCharacterManager';
import { commitPurchase, commitFreeGrab, canAffordItem } from '@utils/gearPurchase';

import {
  GEAR_FIREARMS_EXPLOSIVES as g,
  AMMO_TYPES,
  EXPLOSIVE_RATING_BANDS,
  MISSILE_VARIANT_MODIFIER,
} from '@data/gear/firearms_explosives';

import { formatDamageValue, formatAttackRatings, formatAvailability, formatCost } from '@utils/gearFormat';
import { gearByTag } from '@utils/gearTags';
import './gearBuyButton.css';

export default function GearFirearmsExplosives({ character }) {
  const [purchaseItem, setPurchaseItem] = useState(null);
  const { touch } = useCharacterManager();

  const buyColumn = {
    label: '',
    render: (item) => {
      const owned = character?.gearManager?.countOf(item.id) ?? 0;
      const affordable = canAffordItem(character, item);
      return (
        <div className="sr-gear-buy-cell">
          <button
            className={affordable ? 'sr-buy-btn' : 'sr-buy-btn sr-buy-btn--unaffordable'}
            onClick={() => setPurchaseItem(item)}
            title={`Buy ${item.label}`}
          >
            $
          </button>
          {owned > 0 && <span className="sr-gear-owned-badge">×{owned}</span>}
        </div>
      );
    },
  };

  const firearmColumns = [
    { label: 'Weapon', render: (i) => i.label },
    { label: 'DV', render: formatDamageValue },
    { label: 'Modes', render: (i) => i.stats.modes?.join('/') ?? '—' },
    { label: 'Attack Ratings (C/N/M/F/E)', render: formatAttackRatings },
    { label: 'Ammo', render: (i) => i.stats.ammo?.options
        ? i.stats.ammo.options.map((o) => `${o.capacity}(${o.container})`).join(' or ')
        : i.stats.ammo ? `${i.stats.ammo.capacity}(${i.stats.ammo.container})` : '—' },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];
  const accessoryColumns = [
    { label: 'Accessory', render: (i) => i.label },
    { label: 'Mount', render: (i) => i.mount ?? '—' },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];
  const ammoColumns = [
    { label: 'Item', render: (i) => i.label },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];
  const explosiveColumns = [
    { label: 'Item', render: (i) => i.label },
    { label: 'DV (GZ/Close/Near)', render: (i) => i.stats.damageValue ?? '—' },
    { label: 'Blast', render: (i) => (i.stats.blast != null ? `${i.stats.blast}m` : '—') },
    { label: 'Avail', render: formatAvailability },
    { label: 'Cost', render: formatCost },
    buyColumn,
  ];

  return (
    <>
      <CollapsibleSection id="gear-fa-tasers" title="Tasers"><GearTable items={gearByTag('taser')} columns={firearmColumns} /></CollapsibleSection>
      <CollapsibleSection id="gear-fa-holdouts" title="Hold-outs"><GearTable items={gearByTag('holdout')} columns={firearmColumns} /></CollapsibleSection>
      <CollapsibleSection id="gear-fa-light-pistols" title="Light Pistols"><GearTable items={gearByTag('light_pistol')} columns={firearmColumns} /></CollapsibleSection>
      <CollapsibleSection id="gear-fa-machine-pistols" title="Machine Pistols"><GearTable items={gearByTag('machine_pistol')} columns={firearmColumns} /></CollapsibleSection>
      <CollapsibleSection id="gear-fa-heavy-pistols" title="Heavy Pistols"><GearTable items={gearByTag('heavy_pistol')} columns={firearmColumns} /></CollapsibleSection>
      <CollapsibleSection id="gear-fa-smgs" title="Submachine Guns"><GearTable items={gearByTag('smg')} columns={firearmColumns} /></CollapsibleSection>
      <CollapsibleSection id="gear-fa-shotguns" title="Shotguns"><GearTable items={gearByTag('shotgun')} columns={firearmColumns} /></CollapsibleSection>
      <CollapsibleSection id="gear-fa-rifles" title="Rifles">
        <GearTable items={gearByTag('rifle')} columns={firearmColumns} />
        <Callout title="Integrated Weapons" variant="note">
          Ares Alpha and Yamaha Raiden each carry a built-in second (or third) weapon — a grenade launcher, and for the Raiden an underbarrel shotgun too. Not separately purchasable; see each rifle's own entry.
        </Callout>
      </CollapsibleSection>
      <CollapsibleSection id="gear-fa-mg" title="Machine Guns / Assault Cannons"><GearTable items={gearByTag('machine_gun')} columns={firearmColumns} /></CollapsibleSection>
      <CollapsibleSection id="gear-fa-special" title="Special Weapons (Exotic)"><GearTable items={gearByTag('special_weapon')} columns={firearmColumns} /></CollapsibleSection>
      <CollapsibleSection id="gear-fa-launchers" title="Launchers"><GearTable items={gearByTag('launcher')} columns={firearmColumns} /></CollapsibleSection>

      <CollapsibleSection id="gear-fa-accessories" title="Accessories">
        <GearTable items={gearByTag('weapon_accessory')} columns={accessoryColumns} />
      </CollapsibleSection>

      <CollapsibleSection id="gear-fa-ammo" title="Ammo">
        <Section title="Regular Ammo by Weapon Class">
          <GearTable items={gearByTag('ammo')} columns={ammoColumns} />
        </Section>
        <Section title="Ammo Type Modifiers">
          <table className="sr-table">
            <thead><tr><th>Type</th><th>AR Mod</th><th>DV Mod</th><th>Cost ×</th></tr></thead>
            <tbody>
              {AMMO_TYPES.map((t) => (
                <tr key={t.label}><td>{t.label}</td><td>{t.attackRatingModifier}</td><td>{String(t.damageValueModifier)}</td><td>{t.costMultiplier}</td></tr>
              ))}
            </tbody>
          </table>
        </Section>
        <Callout title="Applying a Modifier" variant="note">
          Regular ammo above is the base case. Any other type multiplies the base cost per 10 rounds and applies its AR/DV modifier to the weapon's own ratings — e.g. APDS Rifle ammo is (20¥ × 3) with +2 AR and −1 DV, not a separately stocked item.
        </Callout>
      </CollapsibleSection>

      <CollapsibleSection id="gear-fa-grenades" title="Grenades">
        <GearTable items={gearByTag('grenade')} columns={explosiveColumns} />
      </CollapsibleSection>

      <CollapsibleSection id="gear-fa-rockets" title="Rockets and Missiles">
        <GearTable items={gearByTag('rocket')} columns={explosiveColumns} />
        <Callout title="Missile Variant" variant="note">{MISSILE_VARIANT_MODIFIER.description}</Callout>
      </CollapsibleSection>

      <CollapsibleSection id="gear-fa-conventional" title="Conventional Explosives">
        <Section>
          <GearTable items={gearByTag('conventional_explosive')} columns={ammoColumns} />
        </Section>
        <Section title="Rating Bands (Plastic / Foam Packages)">
          <table className="sr-table">
            <thead><tr><th>Rating</th><th>Availability</th><th>Cost per Rating</th></tr></thead>
            <tbody>
              {EXPLOSIVE_RATING_BANDS.map((b) => (
                <tr key={b.ratingRange.join('-')}>
                  <td>{b.ratingRange[0]}–{b.ratingRange[1]}</td>
                  <td>{b.availability}(I)</td>
                  <td>{b.costPerRating}¥</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      </CollapsibleSection>

      {purchaseItem && (
        <PurchaseModal
          item={purchaseItem}
          character={character}
          onClose={() => setPurchaseItem(null)}
          onPurchase={(purchase) => {
            commitPurchase(character, purchaseItem, purchase);
            touch();
            setPurchaseItem(null);
          }}
          onFreeGrab={(purchase) => {
            commitFreeGrab(character, purchaseItem, purchase);
            touch();
            setPurchaseItem(null);
          }}
        />
      )}
    </>
  );
}
