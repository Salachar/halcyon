// Base layout primitives for the Shadowrun app.
// Plain CSS (see theme.css), no Tailwind, no responsive breakpoints.
// Every page (Home, Rules, Combat, ...) should build on these rather than
// hand-rolling section/panel markup, so the whole app stays visually consistent.

import { useState } from 'react';

export const Page = ({ children }) => {
  return <div className="sr-page">{children}</div>;
};

export const PageHeader = ({ title = "", subtitle = "" }) => {
  return (
    <div className="sr-page-header">
      <h1 className="sr-page-header-title">{title}</h1>
      {subtitle && <p className="sr-page-header-subtitle">{subtitle}</p>}
    </div>
  );
};

// Wraps a chunk of the page with a consistent heading + spacing.
// Use this instead of ad-hoc <h2 className="..."> per page.
export const Section = ({ title = "", children }) => {
  return (
    <section className="sr-section">
      {title && <h2 className="sr-section-title">{title}</h2>}
      {children}
    </section>
  );
};

// Generic bordered content box. `solid` swaps the translucent panel bg
// for a solid one — use solid when panels stack on top of other panels.
export const Panel = ({ solid = false, children, style }) => {
  return (
    <div className={solid ? "sr-panel-solid" : "sr-panel"} style={style}>
      {children}
    </div>
  );
};

// variant: "note" (muted amber, default) | "critical" (bright orange) | "danger" (red)
export const Callout = ({ title = "", variant = "note", children }) => {
  const variantClass =
    variant === "critical"
      ? "sr-callout sr-callout--critical"
      : variant === "danger"
      ? "sr-callout sr-callout--danger"
      : "sr-callout";

  return (
    <div className={variantClass}>
      {title && <div className="sr-callout-title">{title}</div>}
      {children}
    </div>
  );
};

// Small grid-item card — corp entries, district entries, list rows, etc.
// `columns` controls the grid (2 or 3); pass children as <Card /> instances.
export const CardGrid = ({ columns = 2, children }) => {
  return (
    <div className={columns === 3 ? "sr-card-grid sr-card-grid--3" : "sr-card-grid"}>
      {children}
    </div>
  );
};

export const Card = ({ title = "", tagline = "", detail = "" }) => {
  return (
    <div className="sr-card">
      <div className="sr-card-title">{title}</div>
      {tagline && <div className="sr-card-tagline">{tagline}</div>}
      {detail && <div className="sr-card-detail">{detail}</div>}
    </div>
  );
};

// variant: "primary" (bright orange fill) | "secondary" (blue outline, default)
//          | "subtle" (amber outline) | "danger" (red outline)
export const Button = ({ variant = "secondary", children, ...props }) => {
  return (
    <button className={`sr-btn sr-btn--${variant}`} {...props}>
      {children}
    </button>
  );
};

export const Divider = () => <hr className="sr-divider" />;

// Generic tabular renderer for gear/reference data — given items and a
// column spec ({ label, render(item) }), it just builds the table. No
// data-file imports here on purpose; the columns/data are supplied by
// whoever's using it, same reasoning as Card/CardGrid staying generic.
export const GearTable = ({ items, columns }) => {
  return (
    <table className="sr-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.label}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            {columns.map((col) => (
              <td key={col.label}>{col.render(item)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Plain vertical timeline — a line with a dot per event. Reuses Card's
// existing hierarchy rather than inventing a new one: date reads like a
// tagline (amber), title like a heading (blue-bright), description like
// body text (muted). `events`: [{ date, title, description }].
export const Timeline = ({ events }) => {
  return (
    <div className="sr-timeline">
      {events.map((event, i) => (
        <div className="sr-timeline-event" key={i}>
          <span className="sr-timeline-dot" />
          <div className="sr-timeline-date">{event.date}</div>
          <div className="sr-timeline-title">{event.title}</div>
          <p className="sr-timeline-description">{event.description}</p>
        </div>
      ))}
    </div>
  );
};

// Sub-navigation within a page — e.g. switching between setting regions
// on Home. Parent owns the active state; Tabs just renders + reports clicks.
export const Tabs = ({ tabs, active, onChange }) => {
  return (
    <div className="sr-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={active === tab.key ? 'sr-tab sr-tab--active' : 'sr-tab'}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
