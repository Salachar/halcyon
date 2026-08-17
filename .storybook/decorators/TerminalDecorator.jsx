import { useState } from 'react';
// import HistoryEntryWrapper from "../../src/components/terminal/retcomdevice/Basic/HistoryEntryWrapper/HistoryEntryWrapper";

const COLORS = {
  bg: {
    panel: 'rgb(29, 35, 50, 0.7)',
  },
  border: {
    default: 'rgb(77, 167, 188)',
  },
  text: {
    terminal: 'rgb(0, 255, 65)',
  },
};

export const TerminalDecorator = (Story, context) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Generate unique entry ID based on story
  const entryId = `story-${context.id}`;
  const commandPath = context.title || 'Component Preview';

  return (
    <div
      className="flex-1 rounded-lg p-4 m-4 overflow-y-auto border"
      style={{
        height: '100vh',
        textShadow: '0 0 5px rgba(0, 255, 65, 0.5)',
        backgroundColor: COLORS.bg.panel,
        borderColor: COLORS.border.default,
        color: COLORS.text.terminal,
      }}
    >
      <Story />
    </div>
  );
};
