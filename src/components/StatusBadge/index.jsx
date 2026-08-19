import './statusBadge.css';

// Small Complete/Incomplete pill for a CollapsibleSection's header,
// reused wherever a creation section wants one — Qualities today,
// Magic once that gets the same creation/advancement split.
export default function StatusBadge({ complete }) {
  return (
    <span className={complete ? 'sr-status-badge sr-status-badge--complete' : 'sr-status-badge sr-status-badge--incomplete'}>
      {complete ? 'Complete' : 'Incomplete'}
    </span>
  );
}
