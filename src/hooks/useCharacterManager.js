import { useState, useEffect, useCallback } from 'react';

import characterManager from '@data/characterManager';

// Any component that needs to know "who's selected" (Gear, Skills,
// Combat, Matrix, Characters) calls this directly — no Provider needed,
// since characterManager is already a true app-wide singleton. This hook
// just gives React a reason to re-render when it changes.
//
// Until Character exists, load() in the manager is a no-op (its body is
// commented out) — so characters will always be {} and currentCharacter
// will always be null. That's expected, not a bug: it's exactly the
// "works with no character selected" state the purchase modal is
// already built to handle.
export function useCharacterManager() {
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    return characterManager.subscribe(() => forceUpdate((n) => n + 1));
  }, []);

  const selectCharacter = useCallback((id) => {
    characterManager.setLastSelected(id);
  }, []);

  const addCharacter = useCallback((character) => {
    characterManager.addCharacter(character);
  }, []);

  const deleteCharacter = useCallback((id) => {
    characterManager.deleteCharacter(id);
  }, []);

  return {
    characters: characterManager.characters,
    currentCharacter: characterManager.currentCharacter,
    selectCharacter,
    addCharacter,
    deleteCharacter,
  };
}
