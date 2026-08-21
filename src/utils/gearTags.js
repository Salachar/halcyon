import { ALL_GEAR } from '@data/gear';

// OR semantics: matches if an item has ANY of the given tags. Grouping
// use is almost always a single tag ("blades"); OR lets a caller
// combine a couple ("eyeware", "earware") without needing AND logic
// nobody's asked for yet.
export function gearByTag(...tags) {
  return Object.values(ALL_GEAR).filter((item) => tags.some((t) => item.tags?.includes(t)));
}
