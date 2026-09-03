import TableRowsIcon from '@mui/icons-material/TableRows';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';

// Finder-style segmented control — MUI icons chosen for a direct
// visual match rather than an approximation: ViewAgenda already
// renders as two stacked wide rectangles (a near-exact match for
// full-width banner cards), ViewCarousel is named for exactly this use.
const VIEW_MODES = [
  { key: 'table', label: 'Table', Icon: TableRowsIcon },
  { key: 'card', label: 'Card', Icon: ViewAgendaIcon },
  { key: 'carousel', label: 'Carousel', Icon: ViewCarouselIcon },
];

// Blacklist-based (excludedViewModes) rather than an allowlist —
// exclusion is meant to be the uncommon case, so a section only ever
// has to name what it's explicitly opting OUT of. Renders nothing at
// all if excluding modes leaves only one real choice — no point
// toggling between one option.
export default function ViewModeToggle({ mode, onChange, excludedViewModes = [] }) {
  const available = VIEW_MODES.filter((m) => !excludedViewModes.includes(m.key));
  if (available.length <= 1) return null;

  return (
    <div className="sr-view-mode-toggle">
      {available.map(({ key, label, Icon }) => (
        <button
          key={key}
          className={mode === key ? 'sr-view-mode-btn sr-view-mode-btn--active' : 'sr-view-mode-btn'}
          onClick={() => onChange(key)}
          title={label}
          aria-label={label}
        >
          <Icon fontSize="small" />
        </button>
      ))}
    </div>
  );
}
