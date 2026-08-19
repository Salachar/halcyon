import { useState, useEffect, useCallback } from 'react';

import characterManager from '@data/characterManager';

// Any component that needs to know "who's selected" (Gear, Skills,
// Combat, Matrix, Characters) calls this directly — no Provider needed,
// since characterManager is already a true app-wide singleton. This hook
// just gives React a reason to re-render when it changes.
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

  // Call after mutating a character in place (character.nuyen -= cost,
  // character.name = value, etc.) — see the touch() doc comment on
  // CharacterManager itself for why this is needed at all.
  const touch = useCallback(() => {
    characterManager.touch();
  }, []);

  return {
    characters: characterManager.characters,
    currentCharacter: characterManager.currentCharacter,
    selectCharacter,
    addCharacter,
    deleteCharacter,
    touch,
  };
}

// Convenience hook for consumers that just want to read the currently
// selected character reactively without pulling in the selection/
// mutation actions.
export function useSelectedCharacter() {
  return useCharacterManager().currentCharacter;
}
