import { ModalMedium as Modal } from '@components/Modal';
import { PrimaryButton, SecondaryButton, IconButton } from '@components/Buttons';
import { useCharacterManager } from '@hooks/useCharacterManager';
import { EDGE_BOOSTS } from '@data/character/edge_boosts';
import { MATRIX_EDGE_ACTIONS } from '@data/character/matrix_actions';

import {
  HeaderRow, HeaderControls, EdgeValue, ActionsGroup, GroupTitle, GroupNote,
  ActionRow, ActionInfo, ActionName, ActionCost, ActionDescription,
} from './EdgeModal.styles';

// One shared row shape for both Edge Boosts and Matrix Edge Actions —
// the two source components (Edge.jsx, MatrixEdgeActions.jsx) already
// rendered identical name/cost/description/Use rows independently;
// this is that same shape written once.
function EdgeActionRow({ action, currentEdge, onUse }) {
  const affordable = currentEdge >= action.cost;
  return (
    <ActionRow $affordable={affordable}>
      <ActionInfo>
        <ActionName>{action.label} <ActionCost>({action.cost})</ActionCost></ActionName>
        <ActionDescription>{action.description}</ActionDescription>
      </ActionInfo>
      <PrimaryButton disabled={!affordable} onClick={() => onUse(action)}>
        Use
      </PrimaryButton>
    </ActionRow>
  );
}

// Consolidates the old standalone Edge component and MatrixEdgeActions
// into one modal — the real home for the Edge token in CharacterHeader.
// Also fixes a real gap from the tab restructuring: Edge itself had
// been dropped from the sheet entirely (never relocated into any of
// the new sub-tabs) — this modal is that section's actual new home.
//
// Fully off the old sr-modal-*/sr-btn/sr-icon-btn className system now
// — uses the new shared Modal (Medium size — the row-list content here
// doesn't need Large's width, and Small's 420px felt cramped next to
// the header controls) and Buttons components instead. First real
// proof those two generic pieces work end to end.
//
// Both action lists spend from the exact same character.currentEdge
// pool Edge.jsx already used — no new character-level state, just a
// consolidated UI surface. Both groups always show, including Matrix
// Edge Actions for a character with no Matrix capability — the note
// beneath it already says as much, matching this app's "show real
// inapplicable state, don't hide it" instinct elsewhere.
//
// Deliberately decoupled from Dice, same as the original Edge
// component — spending a boost here doesn't touch any roll, and
// Dice's own reroll button doesn't check Edge.
export default function EdgeModal({ open, character, onClose }) {
  const { touch } = useCharacterManager();

  const adjust = (delta) => {
    character.currentEdge = character.currentEdge + delta;
    touch();
  };

  const useAction = (action) => {
    if (!character.spendEdge(action.cost)) return;
    touch();
  };

  const endConfrontation = () => {
    character.resetEdge();
    touch();
  };

  return (
    <Modal open={open} onClose={onClose} title="Edge">
      <HeaderRow>
        <HeaderControls>
          <IconButton onClick={() => adjust(-1)}>−</IconButton>
          <EdgeValue>{character.currentEdge}</EdgeValue>
          <IconButton onClick={() => adjust(1)}>+</IconButton>
        </HeaderControls>
        <SecondaryButton onClick={endConfrontation}>
          End Confrontation
        </SecondaryButton>
      </HeaderRow>

      <ActionsGroup>
        <GroupTitle>Edge Boosts</GroupTitle>
        {EDGE_BOOSTS.map((boost) => (
          <EdgeActionRow key={boost.id} action={boost} currentEdge={character.currentEdge} onUse={useAction} />
        ))}
      </ActionsGroup>

      <ActionsGroup>
        <GroupTitle>Matrix Edge Actions</GroupTitle>
        <GroupNote>Requires a cyberjack or Resonance rating to use.</GroupNote>
        {MATRIX_EDGE_ACTIONS.map((action) => (
          <EdgeActionRow key={action.id} action={action} currentEdge={character.currentEdge} onUse={useAction} />
        ))}
      </ActionsGroup>
    </Modal>
  );
}
