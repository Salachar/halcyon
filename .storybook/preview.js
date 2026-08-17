import { TerminalDecorator } from './decorators/TerminalDecorator';
import '../src/index.css'; // Your app's CSS if needed

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },

    // Terminal background
    backgrounds: {
      default: 'terminal',
      values: [
        { name: 'terminal', value: 'rgb(19, 23, 34)' },
        { name: 'dark', value: '#000000' },
      ],
    },

    // Default to fullscreen layout for terminal
    layout: 'fullscreen',
  },

  // Apply terminal decorator globally
  decorators: [TerminalDecorator],
};

export default preview;
