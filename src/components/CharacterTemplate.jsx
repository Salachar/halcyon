import Definitions from "./Definitions";
import RollableTable from "./RollableTable";
import ClassArtwork from "./ClassArtwork";

import { Callout } from "./PageComponents";

import Stats from "./character/Stats";
import HealthBar from "./character/HealthBar";
import Name from "./character/Name";
import CreditsTracker from "./character/Credits";
import GlitchesTracker from "./character/Glitches";
import Inventory from "./character/Inventory";
import Market from "./character/Market";
import Flavor from "./character/Flavor";
import StartingItems from "./character/StartingItems";
import NanoPowers from "./character/NanoPowers";
import Infestations from "./character/Infestations";
import Apps from "./character/Apps";
import Cyberware from "./character/Cyberware";
import Cyberdeck from "./character/Cyberdeck";
import Services from "./character/Services";
import Debt from "./character/Debt";

import {
  CYBERTECH,
  APPS,
  STYLES,
  FEATURES,
  WANTS,
  QUIRKS,
  CURRENT_OBSESSIONS,
  NANO_POWERS,
  NANO_INFESTATIONS,
  STARTING_ITEMS_1,
  STARTING_ITEMS_2,
  STARTING_ITEMS_3,
  DEBT_TO_WHOM,
  DEBT_URGENCY,
  GEAR_SECTIONS,
} from "../data/tables";

export default function CharacterTemplate({
  builder = false,
  character = null,
  onUpdate = () => {},
}) {
  if (!character) return null;

  // Render a component based on its type
  const renderComponent = (component, index) => {
    const {
      preview = true,
      type,
      name,
    } = component;

    if (!builder && !preview) return null;

    const key = `${type}_${name}_${index}`;

    switch (component.type) {
      case "definitions":
        return (
          <Definitions
            key={key}
            h3={component.h3}
            definitions={component.entries}
            before={component.before}
            after={component.after}
            builder={builder}
          />
        );

      case "rollable":
        const selections = character.getTableSelections(component.name);
        return (
          <RollableTable
            key={key}
            character_id={character.id}
            locked={character.locked}
            selectable={builder}
            label={component.label}
            note={component.note}
            entries={component.entries}
            selected={selections}
            select_mode={component.select_mode}
            onClick={(entry) => {
              if (character.locked) return;
              if (component.select_mode === "none") return;
              if (!entry || !builder) return;
              character.setTableSelection(component.name, entry, component.select_mode);
              onUpdate();
            }}
            before={component.before}
            after={component.after}
          />
        );

      case "custom":
        // Render custom component
        const CustomComponent = component.component;
        return (
          <div key={key}>
            {component.before}
            <CustomComponent character={character} onUpdate={onUpdate} />
            {component.after}
          </div>
        );

      default:
        console.warn(`Unknown component type: ${component.type}`);
        return null;
    }
  };

  return (
    <div className="relative">
      {!builder && (
        <>
          <div className="mb-8 p-6 bg-gray-900/50 border border-gray-800 space-y-3">
            {character.description.map((paragraph, index) => (
              <p key={`${character.class}_desc_${index}`} className="text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          <ClassArtwork character={character} />
        </>
      )}

      <Name
        character={character}
        builder={builder}
        locked={character.locked}
        onUpdate={onUpdate}
      />

      {builder && (
        <div className="divider" />
      )}

      <Definitions
        h3={"Class Uniques"}
        definitions={character.class_uniques}
        builder={builder}
      />

      {builder && !character.locked && (
        <>
          <div className="divider" />
          <StartingItems
            character={character}
            sections={[
              { name: "d8", label: "Starting Items", entries: STARTING_ITEMS_1 },
              { name: "d12_1", label: "Starting Items", entries: STARTING_ITEMS_2 },
              { name: "d12_2", label: "Starting Items", entries: STARTING_ITEMS_3 },
            ]}
            onUpdate={onUpdate}
          />
        </>
      )}

      {/* Character Stats (builder mode) */}
      {builder && (
        <>
          <div className="divider" />
          <Stats
            character={character}
            locked={character.locked}
            onUpdate={onUpdate}
          />
          <div className="divider" />
          <HealthBar
            character={character}
            locked={character.locked}
            onUpdate={onUpdate}
          />
          <div className="divider" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <CreditsTracker
              character={character}
              locked={character.locked}
              onUpdate={onUpdate}
            />
            <GlitchesTracker
              character={character}
              locked={character.locked}
              onUpdate={onUpdate}
            />
          </div>
        </>
      )}

      {/* Render all class components */}
      {character.constructor.components && character.constructor.components.map((component, index) =>
        renderComponent(component, index)
      )}

      {builder && (
        <>
          <div className="divider" />
          <Debt
            character={character}
            creditorsList={DEBT_TO_WHOM}
            urgencyList={DEBT_URGENCY}
            onUpdate={onUpdate}
          />
          <div className="divider" />
          <Inventory
            character={character}
            sections={GEAR_SECTIONS}
            onUpdate={onUpdate}
          />
          <Market
            character={character}
            sections={GEAR_SECTIONS}
            onUpdate={onUpdate}
          />
          <Services
            character={character}
          />
          <div className="divider" />

          {!character.locked && (
            <>
              <Callout title="NanoPowers, Infestations, Cyberdeck, Cybertech">
                <p className="text-gray-300 leading-relaxed">
                  You don't start with these unless your class uniques explicity state so. Any class can acquire them during gameplay though, and some in the market.
                </p>
              </Callout>
              <div className="divider" />
            </>
          )}

          <NanoPowers
            character={character}
            allPowers={NANO_POWERS}
            allInfestations={NANO_INFESTATIONS}
            onUpdate={onUpdate}
          />
          <div className="divider" />
          <Infestations
            character={character}
            allInfestations={NANO_INFESTATIONS}
            onUpdate={onUpdate}
          />
          <div className="divider" />
          <Apps
            character={character}
            allApps={APPS}
            onUpdate={onUpdate}
          />
          <Cyberdeck
            character={character}
            allApps={APPS}
            onUpdate={onUpdate}
          />
          <div className="divider" />
          <Cyberware
            character={character}
            allCyberware={CYBERTECH}
            onUpdate={onUpdate}
          />
          <div className="divider" />
          <Flavor
            character={character}
            sections={[
              { name: "style", label: "Style", entries: STYLES },
              { name: "feature", label: "Feature", entries: FEATURES },
              { name: "wants", label: "Wants", entries: WANTS },
              { name: "quirk", label: "Quirk", entries: QUIRKS },
              { name: "obsession", label: "Obsession", entries: CURRENT_OBSESSIONS },
            ]}
            onUpdate={onUpdate}
          />
        </>
      )}
    </div>
  );
}
