import Icons from '@utils/icons';

import {
  Line,
  InsetBox,
  NodePreview,
} from '@shadowsea/ShadowSeaComponents';

import Node from "../components/Node";
import Wallet from '../components/Wallet';

import GamesBanner from '@shadowsea/Games/GamesBanner/GamesBanner';
import MinesweeperGame from '@shadowsea/Games/MinesweeperGame/MinesweeperGame';
import MemoryGame from '@shadowsea/Games/MemoryGame/MemoryGame';
import CyberPoker from '@shadowsea/Games/CyberPoker/CyberPoker';

export const SHADOWSEA_BBS_BASE_NODES = {
  // "Wallet": {
  //   favicon: <Icons.Wallet />,
  //   preview: (
  //     <NodePreview>
  //       <Line smoke> · Keeps track of all collected credits and items in the RetComDevice</Line>
  //       <Line smoke> · Extracted credits/items are transferable to characters here</Line>
  //     </NodePreview>
  //   ),
  //   content: <TerminalWallet />,
  // },
  "Halcyon District Network": {
    favicon: <Icons.Map />,
    preview: (
      <NodePreview>
        <Line smoke> · TBD</Line>
      </NodePreview>
    ),
    related_commands: {
    },
  },
  "ShadowSea": {
    favicon: <Icons.City />,
    preview: (
      <NodePreview>
        <Line smoke> · TBD</Line>
      </NodePreview>
    ),
    content: (
      <div
        style={{
          border: '1.5px solid rgba(239,68,68,0.4)',
          borderRadius: 'var(--border-radius-lg)',
          overflow: 'hidden',
          fontFamily: 'var(--font-mono)',
        }}
      >
        ShadowSea
      </div>
    ),
    related_commands: {
    },
  },
  "Games": {
    favicon: <Icons.Games />,
    preview: (
      <NodePreview>
        <Line smoke> · 3 games available — Nanobomb Defusal, Runner Memory Deck, and Cyber Poker.</Line>
        <Line smoke> · Games are not small tablet/phone friendly at the moment</Line>
      </NodePreview>
    ),
    content: (
      <GamesBanner />
    ),
    related_commands: {
      "Play Nanobomb Defusal": {
        type: "component",
        content: <MinesweeperGame width={20} height={10} tileSize={2} />,
        preview: (
          <NodePreview>
            <Line smoke> · Minesweeper</Line>
          </NodePreview>
        ),
      },

      "Play Netrunner Memory Deck": {
        type: "component",
        content: <MemoryGame gridSize={4} tileSize={4} />,
        preview: (
          <NodePreview>
            <Line smoke> · Memory match </Line>
          </NodePreview>
        ),
      },

      "Play Netrunner Memory Deck (Hard)": {
        type: "component",
        content: <MemoryGame gridSize={6} tileSize={3.5} />,
      },

      "Play Cyber Poker": {
        type: "component",
        content: <CyberPoker />,
        preview: (
          <NodePreview>
            <Line smoke> · Luigi Picture Poker clone</Line>
          </NodePreview>
        ),
      },
    }
  },
  "Help": {
    favicon: <Icons.Help />,
    preview: (
      <NodePreview>
        <Line smoke> · Tips and guidance for navigating the ShadowSea Network</Line>
      </NodePreview>
    ),
    content: (
      <Node
        title="SHADOWSEA - QUICK REFERENCE"
        subtitle="ShadowSea Network User Guide"
      >
        <InsetBox title="NAVIGATION">
          <Line cyan>• Tap any node to expand or collapse it</Line>
          <Line cyan>• Nodes with ▶ contain sub-nodes inside</Line>
          <Line cyan>• Eye icon toggles content visibility without closing</Line>
          <Line cyan>• Double-tap any content panel to expand from partial to full</Line>
        </InsetBox>
        <InsetBox title="WALLET">
          <Line yellow>• Tracks all extracted credits and items</Line>
          <Line yellow>• TAKE / CLAIM items individually or use the section button for all</Line>
          <Line yellow>• Open Wallet and TRANSFER to move assets into a character's inventory</Line>
          <Line yellow>• CLEAR wipes the wallet without transferring</Line>
        </InsetBox>
      </Node>
    ),
  },
};

export default SHADOWSEA_BBS_BASE_NODES;
