import { useState } from 'react';

import { ALL_GEAR } from '@data/gear';
import { useCharacterManager } from '@hooks/useCharacterManager';
import { panCategoryOf, panSortComparator, compositePersonaStats, PAN_CATEGORY_LABELS } from '@utils/panGrouping';
import CapacityAttachModal from '@components/CapacityAttachModal';
import ConfirmationModal from '@components/ConfirmationModal';

import PersonaHeader from './PersonaHeader';
import PersonaStatsBlock from './PersonaStatsBlock';
import MatrixDevicesList from './MatrixDevicesList';
import CategorySection from './CategorySection';
import SlaveToVehicleModal from './SlaveToVehicleModal';

import './networkPanel.css';

// PAN — Persona header, then (if a Primary is set) a read-only
// composited-stats block anchored by the Primary's name, then Matrix
// Devices (Primary always first, per-device controls live here, not
// in the stats block above) as its own zone ahead of Cyberware/
// Weapons/Gear, for both Slaved and Slavable. Wireless on/off is fully
// independent of slaved/unslaved — see GearManager.isEffectivelyWireless.
export default function NetworkPanel({ character }) {
  const { touch } = useCharacterManager();
  const [expandedId, setExpandedId] = useState(null);
  const [attachContext, setAttachContext] = useState(null); // { instanceId, pool }
  const [pendingSlave, setPendingSlave] = useState(null); // instanceId — awaiting Living Network confirmation
  const [slaveToVehicleOpen, setSlaveToVehicleOpen] = useState(false);

  const gear = character.gearManager.gear;
  const pan = character.gearManager.pan;
  const primaryEntry = pan.masterId ? gear[pan.masterId] : null;
  const primaryItem = primaryEntry ? ALL_GEAR[primaryEntry.itemId] : null;

  const comparator = panSortComparator(ALL_GEAR);

  const allSlavedEntries = pan.slaved
    .map((id) => [id, gear[id]])
    .filter(([, e]) => e && !e.attachedTo) // attachments render nested under their housing, never as their own top-level entry, even if independently slaved
    .sort(comparator);
  const allSlavableEntries = Object.entries(gear)
    .filter(([id, entry]) => {
      if (id === pan.masterId || pan.slaved.includes(id)) return false;
      if (entry.attachedTo) return false; // attachments render nested under their housing
      return ALL_GEAR[entry.itemId]?.wireless === true;
    })
    .sort(comparator);

  // Split matrix-category (commlink/cyberdeck) entries out from
  // everything else, for both lists.
  const matrixSlavedEntries = allSlavedEntries.filter(([, e]) => panCategoryOf(ALL_GEAR[e.itemId]) === 'matrix');
  const otherSlavedEntries = allSlavedEntries.filter(([, e]) => panCategoryOf(ALL_GEAR[e.itemId]) !== 'matrix');
  const matrixSlavableEntries = allSlavableEntries.filter(([, e]) => panCategoryOf(ALL_GEAR[e.itemId]) === 'matrix');
  const otherSlavableEntries = allSlavableEntries.filter(([, e]) => panCategoryOf(ALL_GEAR[e.itemId]) !== 'matrix');

  // Primary prepended for BOTH the composited-stat computation and
  // MatrixDevicesList's display — it's not in pan.slaved, so it has to
  // be added explicitly rather than falling out of the filter above.
  const primaryPlusMatrixSlaved = primaryEntry ? [[pan.masterId, primaryEntry], ...matrixSlavedEntries] : matrixSlavedEntries;

  const groupByCategory = (entries) => ({
    cyberware: entries.filter(([, e]) => panCategoryOf(ALL_GEAR[e.itemId]) === 'cyberware'),
    weapons: entries.filter(([, e]) => panCategoryOf(ALL_GEAR[e.itemId]) === 'weapons'),
    gear: entries.filter(([, e]) => panCategoryOf(ALL_GEAR[e.itemId]) === 'gear'),
  });
  const slavedByCategory = groupByCategory(otherSlavedEntries);
  const slavableByCategory = groupByCategory(otherSlavableEntries);

  const handlePromote = (instanceId) => {
    character.gearManager.setPanMaster(instanceId);
    touch();
  };
  // Confirmed via errata/FAQ: without the Living Network Echo, a
  // technomancer's Living Persona can only ever be a SLAVE in someone
  // else's PAN, never a master with anything subordinated to it —
  // "Until you have the Living Network echo, [technomancers and RCCs]
  // don't [interact]." Soft-gated, not hard-blocked, matching the same
  // confirm-then-proceed pattern used for Capacity overflow — this is
  // a real mechanical prerequisite, but the app still trusts the
  // player to decide (a homebrew table, a GM exception, etc.).
  const primaryIsUnlicensedLivingPersona =
    primaryItem?.id === 'living_persona' &&
    !character.echoes.some((e) => e.echoId === 'living_network');

  const handleSlave = (instanceId) => {
    if (primaryIsUnlicensedLivingPersona) {
      setPendingSlave(instanceId);
      return;
    }
    character.gearManager.addSlavedDevice(instanceId);
    touch();
  };
  const handleUnslave = (instanceId) => {
    character.gearManager.removeSlavedDevice(instanceId);
    touch();
  };
  const handleAttachRequest = (instanceId, pool) => {
    setAttachContext({ instanceId, pool });
  };

  const compositedStats = primaryItem
    ? compositePersonaStats(character, primaryPlusMatrixSlaved, ALL_GEAR)
    : null;

  return (
    <div className="sr-pan">
      <PersonaHeader character={character} touch={touch} />

      {primaryItem ? (
        <PersonaStatsBlock
          primaryLabel={primaryItem.label}
          compositedStats={compositedStats}
          totalSlavedCount={allSlavedEntries.length}
        />
      ) : (
        <p className="sr-pan-hint">No Primary device set — promote a commlink or cyberdeck from Slavable below.</p>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="sr-pan-section-title">Slaved ({allSlavedEntries.length})</span>
        <button className="sr-btn sr-btn--secondary" onClick={() => setSlaveToVehicleOpen(true)}>Slave to Vehicle</button>
      </div>
      {allSlavedEntries.length === 0 && !primaryItem ? (
        <p className="sr-pan-hint">Nothing slaved yet.</p>
      ) : (
        <>
          <MatrixDevicesList
            character={character}
            entries={primaryPlusMatrixSlaved}
            showStatus
            primaryId={pan.masterId}
            onPromote={handlePromote}
            secondaryLabel="Unslave"
            onSecondary={handleUnslave}
            onAttachRequest={handleAttachRequest}
            expandedId={expandedId}
            setExpandedId={setExpandedId}
            touch={touch}
          />
          {['cyberware', 'weapons', 'gear'].map((cat) => (
            <CategorySection
              key={cat}
              category={cat}
              entries={slavedByCategory[cat]}
              character={character}
              showStatus
              onPromote={handlePromote}
              secondaryLabel="Unslave"
              onSecondary={handleUnslave}
              onAttachRequest={handleAttachRequest}
              expandedId={expandedId}
              setExpandedId={setExpandedId}
              touch={touch}
            />
          ))}
        </>
      )}

      <div className="sr-pan-section-title">Slavable</div>
      {allSlavableEntries.length === 0 ? (
        <p className="sr-pan-hint">No wireless devices available to slave.</p>
      ) : (
        <>
          <MatrixDevicesList
            character={character}
            entries={matrixSlavableEntries}
            showStatus={false}
            onPromote={handlePromote}
            secondaryLabel="Slave"
            onSecondary={handleSlave}
            onAttachRequest={handleAttachRequest}
            expandedId={expandedId}
            setExpandedId={setExpandedId}
            touch={touch}
          />
          {['cyberware', 'weapons', 'gear'].map((cat) => (
            <CategorySection
              key={cat}
              category={cat}
              entries={slavableByCategory[cat]}
              character={character}
              showStatus={false}
              onPromote={handlePromote}
              secondaryLabel="Slave"
              onSecondary={handleSlave}
              onAttachRequest={handleAttachRequest}
              expandedId={expandedId}
              setExpandedId={setExpandedId}
              touch={touch}
            />
          ))}
        </>
      )}

      {attachContext && (
        <CapacityAttachModal
          character={character}
          housingInstanceId={attachContext.instanceId}
          pool={attachContext.pool}
          onClose={() => setAttachContext(null)}
        />
      )}

      {pendingSlave && (
        <ConfirmationModal
          open
          title="No Living Network Echo"
          message="Without the Living Network Echo, your Living Persona can only ever be a slave in someone else's PAN — it isn't supposed to subordinate devices to itself. Slave anyway?"
          confirmLabel="Slave Anyway"
          cancelLabel="Cancel"
          onConfirm={() => {
            character.gearManager.addSlavedDevice(pendingSlave);
            touch();
            setPendingSlave(null);
          }}
          onCancel={() => setPendingSlave(null)}
        />
      )}

      {slaveToVehicleOpen && (
        <SlaveToVehicleModal
          character={character}
          onSlave={(arrayInstanceId) => {
            character.gearManager.addSlavedDevice(arrayInstanceId);
            touch();
            setSlaveToVehicleOpen(false);
          }}
          onClose={() => setSlaveToVehicleOpen(false)}
        />
      )}
    </div>
  );
}
