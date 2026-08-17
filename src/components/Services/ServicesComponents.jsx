import React from "react";

const BORDER_COLOR_MAP = {
  cyan: "border-cy-cyan text-cy-cyan",
  yellow: "border-cy-yellow text-cy-yellow",
  pink: "border-cy-pink text-cy-pink",
  purple: "border-purple-500 text-purple-400",
};

const HEADER_BORDER_MAP = {
  cyan: "border-cy-cyan/50",
  yellow: "border-cy-yellow/50",
  pink: "border-cy-pink/50",
  purple: "border-purple-500/50",
};

export function ServiceCategory({ title, color = "cyan", children }) {
  return (
    <div>
      <div className={`border-l-4 ${BORDER_COLOR_MAP[color]} pl-4 py-2 mb-3`}>
        <h3 className="text-xl font-black uppercase tracking-wide">
          {title}
        </h3>
      </div>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}

// Column header row for a 3-price comparison table (used above a stack of
// ServiceItemMultiPrice rows). primaryLabel is the leftmost column (usually
// "Service" or "Vehicle"); col1-3Label are the right-aligned price columns.
export function ServiceTableHeader({ primaryLabel = "Service", col1Label, col2Label, col3Label, color = "cyan" }) {
  return (
    <div className={`py-2 px-3 bg-gray-800/50 border-b-2 ${HEADER_BORDER_MAP[color]} mb-1`}>
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-bold text-gray-400 uppercase flex-1">{primaryLabel}</span>
        <div className="flex gap-6 text-xs font-bold text-gray-400 uppercase">
          <div className="text-right min-w-[80px]">{col1Label}</div>
          <div className="text-right min-w-[80px]">{col2Label}</div>
          <div className="text-right min-w-[100px]">{col3Label}</div>
        </div>
      </div>
    </div>
  );
}

// A row with a name plus up to 3 right-aligned price columns (e.g.
// one-time / monthly / own-it). Any column showing "—" or falsy renders
// dimmed instead of colored, matching Services.jsx's original behavior.
export function ServiceItemMultiPrice({ name, col1, col2, col3 }) {
  return (
    <div className="py-2 px-3 bg-gray-900/20 hover:bg-gray-800/40 border-b border-gray-800/50 transition-colors">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm text-gray-300 flex-1">{name}</span>
        <div className="flex gap-6 text-sm font-mono tabular-nums">
          <div className="text-right min-w-[80px]">
            {col1 && col1 !== "—" ? (
              <span className="text-green-400 font-bold">{col1}</span>
            ) : (
              <span className="text-gray-700">—</span>
            )}
          </div>
          <div className="text-right min-w-[80px]">
            {col2 && col2 !== "—" ? (
              <span className="text-cy-yellow font-bold">{col2}</span>
            ) : (
              <span className="text-gray-700">—</span>
            )}
          </div>
          <div className="text-right min-w-[100px]">
            {col3 && col3 !== "—" ? (
              <span className="text-cy-cyan font-bold">{col3}</span>
            ) : (
              <span className="text-gray-700">—</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// A simple name + single price row, with optional detail text and an
// "ILLEGAL" tag.
export function ServiceItem({ name, price, detail, illegal }) {
  return (
    <div className="flex items-start justify-between py-2 px-3 bg-gray-900/20 hover:bg-gray-900/40 border-l-2 border-transparent hover:border-gray-700 transition-all">
      <div className="flex-1">
        <span className="text-sm text-gray-300">{name}</span>
        {detail && (
          <span className="ml-2 text-xs text-gray-500 italic">({detail})</span>
        )}
        {illegal && (
          <span className="ml-2 text-xs text-cy-pink italic">ILLEGAL</span>
        )}
      </div>
      <span className="text-sm font-mono font-bold text-green-400 ml-4 whitespace-nowrap">
        {price}
      </span>
    </div>
  );
}
