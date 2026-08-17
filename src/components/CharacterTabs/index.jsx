import { useRef, useState } from 'react';

import { useCharacterManager } from '@hooks/useCharacterManager';
import Character from '@data/Character';
import ConfirmationModal from '@components/ConfirmationModal';

import './characterTabs.css';

// Outer shell — list of saved characters, switch/add/delete/import.
// Export dropped here on purpose: app-wide backup (DataModal, in the
// connection bar) already covers exporting characters along with
// everything else — no need for a second, narrower export surface here.
// Import stays, since it's a genuinely different operation (adds one
// character, doesn't touch anything else) from DataModal's full restore.
export default function CharacterTabs({ onCreateNew }) {
  const { characters, currentCharacter, selectCharacter, addCharacter, deleteCharacter } = useCharacterManager();
  const fileInputRef = useRef(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const characterList = Object.values(characters);
  const pendingDeleteCharacter = pendingDeleteId ? characters[pendingDeleteId] : null;

  const handleImportClick = () => fileInputRef.current?.click();

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        delete data.id; // Character's constructor will generate a fresh one
        const character = new Character(data);
        addCharacter(character);
        selectCharacter(character.id);
      } catch (err) {
        console.error('Failed to import character:', err);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleConfirmDelete = () => {
    if (pendingDeleteId) deleteCharacter(pendingDeleteId);
    setPendingDeleteId(null);
  };

  return (
    <>
      <div className="sr-char-tabs">
        {characterList.map((character) => (
          <div
            key={character.id}
            className={character.id === currentCharacter?.id ? 'sr-char-tab sr-char-tab--active' : 'sr-char-tab'}
            onClick={() => selectCharacter(character.id)}
          >
            <span className="sr-char-tab-name">{character.name || 'Unnamed'}</span>
            <button
              className="sr-char-tab-delete"
              onClick={(e) => { e.stopPropagation(); setPendingDeleteId(character.id); }}
              title="Delete"
            >
              ×
            </button>
          </div>
        ))}

        <button className="sr-btn sr-btn--primary sr-char-tab-new" onClick={onCreateNew}>+ New</button>
        <button className="sr-btn sr-btn--secondary" onClick={handleImportClick}>Import</button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          style={{ display: 'none' }}
          onChange={handleImportFile}
        />
      </div>

      <ConfirmationModal
        open={Boolean(pendingDeleteId)}
        title="Delete Character"
        message={pendingDeleteCharacter ? `Delete "${pendingDeleteCharacter.name || 'Unnamed'}"? This cannot be undone.` : ''}
        confirmLabel="Delete"
        danger
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDeleteId(null)}
      />
    </>
  );
}
