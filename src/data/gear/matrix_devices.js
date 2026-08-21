// Commlinks and cyberdecks — unlike almost everything else in Gear,
// these are named, pre-built products with fixed Matrix stats baked
// into a fixed price, not a flat-cost or rating-scaled item. The D/F
// (Data Processing/Firewall) and A/S (Attack/Sleaze) pairs are two of
// the four Matrix Attributes everything Matrix-mechanical is built on
// — a decker's whole capability in a hack comes from whatever device
// they're carrying. That's the actual reason this needed its own file
// instead of fitting the usual costPerRating shape.

function commlinkDevice(overrides) {
  return { wireless: true, category: 'commlink', legality: null, tags: ['commlink'], ...overrides };
}
function cyberdeckDevice(overrides) {
  return { wireless: true, category: 'cyberdeck', legality: 'illegal', tags: ['cyberdeck'], ...overrides };
}

const meta_link = commlinkDevice({
  id: 'meta_link', label: 'Meta Link', cost: 100, availability: 2,
  description: 'Entry-level commlink.',
  stats: { deviceRating: 1, dataProcessing: 1, firewall: 0, programSlots: 0 },
});
const sony_emperor = commlinkDevice({
  id: 'sony_emperor', label: 'Sony Emperor', cost: 700, availability: 2,
  description: 'Mid-range commlink.',
  stats: { deviceRating: 2, dataProcessing: 1, firewall: 1, programSlots: 1 },
});
const renraku_sensei = commlinkDevice({
  id: 'renraku_sensei', label: 'Renraku Sensei', cost: 1000, availability: 2,
  description: 'Mid-range commlink, Data Processing-favored.',
  stats: { deviceRating: 3, dataProcessing: 2, firewall: 0, programSlots: 1 },
});
const erika_elite = commlinkDevice({
  id: 'erika_elite', label: 'Erika Elite', cost: 2500, availability: 2,
  description: 'Upper-mid commlink.',
  stats: { deviceRating: 4, dataProcessing: 2, firewall: 1, programSlots: 2 },
});
const hermes_ikon = commlinkDevice({
  id: 'hermes_ikon', label: 'Hermes Ikon', cost: 5000, availability: 3,
  description: 'High-end commlink, Data Processing-favored.',
  stats: { deviceRating: 5, dataProcessing: 3, firewall: 0, programSlots: 2 },
});
const transys_avalon = commlinkDevice({
  id: 'transys_avalon', label: 'Transys Avalon', cost: 8000, availability: 3,
  description: 'Top-tier commlink.',
  stats: { deviceRating: 6, dataProcessing: 3, firewall: 1, programSlots: 3 },
});

const erika_mcd6 = cyberdeckDevice({
  id: 'erika_mcd6', label: 'Erika MCD-6', cost: 24750, availability: 3,
  description: 'Entry-level cyberdeck.',
  stats: { deviceRating: 1, attack: 4, sleaze: 3, programSlots: 2 },
});
const spinrad_falcon = cyberdeckDevice({
  id: 'spinrad_falcon', label: 'Spinrad Falcon', cost: 61500, availability: 3,
  description: 'Mid-range cyberdeck.',
  stats: { deviceRating: 2, attack: 5, sleaze: 4, programSlots: 4 },
});
const mct_360 = cyberdeckDevice({
  id: 'mct_360', label: 'MCT 360', cost: 95000, availability: 3,
  description: 'Mid-range cyberdeck.',
  stats: { deviceRating: 3, attack: 6, sleaze: 5, programSlots: 6 },
});
const renraku_kitsune = cyberdeckDevice({
  id: 'renraku_kitsune', label: 'Renraku Kitsune', cost: 107000, availability: 4,
  description: 'Upper-mid cyberdeck.',
  stats: { deviceRating: 4, attack: 7, sleaze: 6, programSlots: 8 },
});
const shiawase_cyber6 = cyberdeckDevice({
  id: 'shiawase_cyber6', label: 'Shiawase Cyber-6', cost: 172500, availability: 5,
  description: 'High-end cyberdeck.',
  stats: { deviceRating: 5, attack: 8, sleaze: 7, programSlots: 10 },
});
const fairlight_excalibur = cyberdeckDevice({
  id: 'fairlight_excalibur', label: 'Fairlight Excalibur', cost: 410600, availability: 6,
  description: 'Top-tier cyberdeck.',
  stats: { deviceRating: 6, attack: 9, sleaze: 8, programSlots: 12 },
});

export const GEAR_MATRIX_DEVICES = {
  meta_link, sony_emperor, renraku_sensei, erika_elite, hermes_ikon, transys_avalon,
  erika_mcd6, spinrad_falcon, mct_360, renraku_kitsune, shiawase_cyber6, fairlight_excalibur,
};
