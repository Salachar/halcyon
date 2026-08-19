// Edge Boosts — the same table from Rules > Core Mechanics, finally as
// real data instead of prose in a page component. Cost is what a single
// use deducts from current Edge; nothing here tracks "already used this
// scene" — boosts are repeatable as many times as Edge allows, gated
// purely by cost vs. available Edge, same as any other spend in this app.

export const EDGE_BOOSTS = [
  {
    id: 'reroll_one_die',
    cost: 1,
    label: 'Reroll One Die',
    description: "Reroll one die (yours or the target's), applied after the roll.",
  },
  {
    id: 'plus_one_die',
    cost: 2,
    label: '+1 to a Die',
    description: 'Add 1 to the result of a single die.',
  },
  {
    id: 'buy_hit',
    cost: 3,
    label: 'Buy One Hit',
    description: 'Add one automatic hit to your total — not an automatic success.',
  },
  {
    id: 'bonus_dice_or_reroll_failed',
    cost: 4,
    label: 'Bonus Dice or Reroll Failed',
    description: "Add your full Edge as bonus dice with exploding 6s, or reroll all failed dice (not usable if you've already glitched).",
  },
  {
    id: 'glitch_opponent_or_effect',
    cost: 5,
    label: "Opponent's 2s Glitch, or Special Effect",
    description: "Count 2s as glitches on the opponent's defense roll, or invent a special effect with GM buy-in.",
  },
];
