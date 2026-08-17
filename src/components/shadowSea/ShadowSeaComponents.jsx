// Terminal UI Helper Components

export const COLOR_MAP = {
  cyan: 'rgb(0, 255, 255)',
  smoke: 'rgb(133, 175, 231)',
  neon: 'rgb(0, 170, 40)',
  yellow: 'rgb(250, 204, 21)',
  pink: 'rgb(255, 0, 128)',
  red: 'rgb(239, 68, 68)',
  teal: 'rgb(79, 209, 197)',
}

export const Spacer = () => {
  return (
    <div
      style={{
        height: '1rem',
      }}
    />
  );
}

// Text styling components
export const Line = ({
  className = "",
  styles = {},
  inline,
  cyan = false,
  smoke = false,
  neon = false,
  yellow = false,
  pink = false,
  red = false,
  teal = false,
  top = false,
  bottom = false,
  left = false,
  bold = false,
  xsmall = false,
  small = false,
  large = false,
  color = "",
  pulse,
  loading = false,
  style = {},
  span = false,
  br = false,
  bullet = false,
  children,
}) => {
  let appliedClassname = className;
  let appliedStyles = {
    ...styles,
    ...style,
  };

  if (inline) appliedStyles.display = "inline-block";

  if (color && COLOR_MAP[color]) {
    appliedStyles.color = COLOR_MAP[color];
  } else {
    if (cyan) appliedStyles.color = COLOR_MAP.cyan;
    if (smoke) appliedStyles.color = COLOR_MAP.smoke;
    if (neon)  appliedStyles.color = COLOR_MAP.neon;
    if (yellow)  appliedStyles.color = COLOR_MAP.yellow;
    if (pink)  appliedStyles.color = COLOR_MAP.pink;
    if (red) appliedStyles.color = COLOR_MAP.red;
    if (teal) appliedStyles.color = COLOR_MAP.teal;
  }

  if (top) appliedStyles.marginTop = "0.5rem";
  if (bottom) appliedStyles.marginBottom = "0.5rem";
  if (left) appliedStyles.marginLeft = "0.5rem";

  if (bold) appliedClassname += " font-bold";
  if (pulse) appliedStyles.animation = 'pulse-text 2s ease-in-out infinite';
  if (xsmall) appliedClassname += " text-xs";
  if (small) appliedClassname += " text-sm";
  if (large) appliedClassname += " text-lg";

  if (span) {
    return (
      <>
        <span className={appliedClassname} style={appliedStyles}>{bullet && " · "}{children}{loading ? "..." : ""}</span>
        {br && <br />}
      </>
    );
  } else {
    return (
      <>
        <div className={appliedClassname} style={appliedStyles}>{bullet && " · "}{children}{loading ? "..." : ""}</div>
        {br && <br />}
      </>
    );
  }
};

export const NodePreview = ({ children }) => {
  return (
    <div
      style={{
        fontFamily: 'monospace',
        fontSize: '0.72rem',
        color: 'rgb(148, 163, 184)',
      }}
    >
      {children}
    </div>
  );
};

// Section components
export const Section = ({ title, center = false, children, color = "yellow" }) => {
  let appliedStyles = {
    marginTop: "0.5rem"
  };
  if (center) appliedStyles.textAlign = "center";
  return (
    <div style={appliedStyles}>
      <div style={{
        color: COLOR_MAP[color],
        fontWeight: "bold"
      }}>
        {title}
      </div>
      {children}
    </div>
  );
};

// Box/Border components
export const Box = ({ children, color = "cyan", className = "" }) => {
  return (
    <div
      className={className}
      style={{
        border: `2px solid ${COLOR_MAP[color]}`,
        padding: "1rem"
      }}
    >
      {children}
    </div>
  );
};

export const InsetBox = ({ children, title, color = "cyan", className = "", style = {} }) => {
  return (
    <div
      className={className}
      style={{
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        border: '1px solid rgb(71, 85, 105)',
        borderRadius: '3px',
        margin: "0.75rem 0",
        ...style,
      }}
    >
      <div className="p-2 md:p-3">
        {Boolean(title) && (
          <div className="text-sm font-bold mb-2" style={{ color: COLOR_MAP[color] }}>
            {title}
          </div>
        )}
        <div className="text-sm">
          {children}
        </div>
      </div>
    </div>
  );
};

// Divider
export const Divider = ({ color = "cyan", style }) => {
  return (
    <div style={{
      borderTop: `1px solid ${COLOR_MAP[color]}`,
      marginTop: "0.5rem",
      marginBottom: "0.5rem",
      ...style,
    }} />
  );
};

// List item component
export const ListItem = ({ children, indent = false }) => {
  return (
    <div style={{
      color: COLOR_MAP.neon,
      marginLeft: indent ? "1rem" : "0"
    }}>
      → {children}
    </div>
  );
};

// Warning/Alert component
export const Warning = ({ children }) => {
  return (
    <div style={{
      color: COLOR_MAP.red,
      fontWeight: "bold",
      marginTop: "0.5rem"
    }}>
      ⚠ {children}
    </div>
  );
};

// Header component
export const Header = ({ children, color = "cyan" }) => {
  return (
    <div style={{
      color: COLOR_MAP[color],
      fontWeight: "bold"
    }}>
      {children}
    </div>
  );
};

export const DataTable = ({ data }) => {
  return (
    <div className="flex flex-col gap-1">
      {data.map((row, index) => (
        <div key={index} className="flex flex-wrap gap-x-4 gap-y-0.5">
          <span className="text-xs md:text-sm shrink-0" style={{ color: COLOR_MAP.yellow, minWidth: '80px' }}>{row.label}:</span>
          <span className="text-xs md:text-sm" style={{ color: COLOR_MAP.neon }}>{row.value}</span>
        </div>
      ))}
    </div>
  );
};

export const ProgressBar = ({ percent = 100, label = "" }) => {
  const filled = Math.round(percent / 4);
  const empty = 25 - filled;

  return (
    <div className="text-xs md:text-sm overflow-hidden break-all" style={{ color: COLOR_MAP.neon }}>
      {label && <span style={{ color: COLOR_MAP.yellow }}>{label}: </span>}
      [{'█'.repeat(filled)}{'░'.repeat(empty)}] {percent}%
    </div>
  );
};

export const KeyValue = ({ label, value, valueColor = "neon" }) => {
  return (
    <div className="flex flex-wrap gap-x-2 gap-y-0.5">
      <span className="text-xs md:text-sm shrink-0" style={{ color: COLOR_MAP.yellow }}>{label}:</span>
      <span className="text-xs md:text-sm" style={{ color: COLOR_MAP[valueColor] }}>{value}</span>
    </div>
  );
};

