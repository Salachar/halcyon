import Radio from './Radio';

export default {
  title: 'Terminal/Radio',
  component: Radio,
};

export const BlankProps = {
  args: {},
};

// Default radio - starts on jazz
export const JazzChannel = {
  args: {
    id: 'radio-jazz',
    initialChannel: 'jazz',
    model: 'CR-2077',
  },
};

// Cyberpunk channel
export const CyberpunkChannel = {
  args: {
    id: 'radio-cyberpunk',
    initialChannel: 'cyberpunk',
    model: 'CR-2077',
  },
};

// Electronic/club music
export const ElectronicChannel = {
  args: {
    id: 'radio-electronic',
    initialChannel: 'electronic',
    model: 'CR-X9 Pro',
  },
};

// Rock station
export const RockChannel = {
  args: {
    id: 'radio-rock',
    initialChannel: 'rock',
    model: 'CR-Metal',
  },
};

// Synthwave/80s vibes
export const SynthwaveChannel = {
  args: {
    id: 'radio-synthwave',
    initialChannel: 'synthwave',
    model: 'CR-Retro 85',
  },
};

// Punk station
export const PunkChannel = {
  args: {
    id: 'radio-punk',
    initialChannel: 'punk',
    model: 'CR-Anarchy',
  },
};

// Lounge/casino music
export const LoungeChannel = {
  args: {
    id: 'radio-lounge',
    initialChannel: 'lounge',
    model: 'CR-Royal',
  },
};

// Hip-hop station
export const HipHopChannel = {
  args: {
    id: 'radio-hiphop',
    initialChannel: 'hiphop',
    model: 'CR-Street',
  },
};

// Ambient/chill
export const AmbientChannel = {
  args: {
    id: 'radio-ambient',
    initialChannel: 'ambient',
    model: 'CR-Zen',
  },
};

// Classical station
export const ClassicalChannel = {
  args: {
    id: 'radio-classical',
    initialChannel: 'classical',
    model: 'CR-Prestige',
  },
};

// Retro/diner music
export const RetroChannel = {
  args: {
    id: 'radio-retro',
    initialChannel: 'retro',
    model: 'CR-505 Classic',
  },
};

// Default (no initial channel, starts at first in list)
export const DefaultRadio = {
  args: {
    id: 'radio-default',
    model: 'CR-2077',
  },
};

// Cave Club radio
export const CaveClubRadio = {
  args: {
    id: 'cave-club-radio',
    initialChannel: 'electronic',
    model: 'CR-Club Edition',
  },
};

// Bodega radio
export const BodegaRadio = {
  args: {
    id: 'bodega-radio',
    initialChannel: 'hiphop',
    model: 'CR-99 Budget',
  },
};

// Underground bar radio
export const UndergroundRadio = {
  args: {
    id: 'underground-radio',
    initialChannel: 'cyberpunk',
    model: 'CR-Glitch',
  },
};
