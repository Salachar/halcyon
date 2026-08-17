import './hoursBanner.css';

export default function HoursBanner({
  name,
  hours,
  days = "Daily",
  location,
  note,
  theme = "default",
  children,
}) {
  const fancy = theme === "fancy";

  return (
    <div className={`hours-banner${fancy ? ' hours-banner-fancy' : ''}`}>
      {Boolean(name) && (
        <div className="hours-banner-header">
          <div className="hours-banner-business">{name}</div>
        </div>
      )}
      <div className="hours-banner-main">
        <div className="hours-banner-label">HOURS OF OPERATION</div>
        <div className="hours-banner-hours">{hours}</div>
        <div className="hours-banner-days">{days}</div>
      </div>
      {Boolean(location) && (
        <div className="hours-banner-location">
          <span className="hours-banner-location-label">LOCATION:</span>
          <span>{location}</span>
        </div>
      )}
      {Boolean(children) && (
        <div style={{ margin: '0.75rem 0' }}>
          {children}
        </div>
      )}
      {Boolean(note) && (
        <div className="hours-banner-note">
          {note}
        </div>
      )}
    </div>
  );
}
