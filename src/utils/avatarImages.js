// Resolves all 68 avatar PNGs (src/images/avatar/1.png ... 68.png) once,
// via Vite's import.meta.glob rather than 68 hand-written import
// statements. eager: true means they're bundled up front, not lazy —
// fine for 68 small thumbnails; revisit if the set grows much larger.
//
// The glob path below assumes src/images/avatar/ — adjust if the
// project's actual alias/folder setup resolves differently; this
// wasn't verified against the live vite config.
const modules = import.meta.glob('/src/images/avatars/*.png', { eager: true, import: 'default' });

export const AVATAR_IDS = [];
export const AVATAR_URLS = {};

for (const path in modules) {
  const match = path.match(/(\d+)\.png$/);
  if (match) {
    const id = Number(match[1]);
    AVATAR_IDS.push(id);
    AVATAR_URLS[id] = modules[path];
  }
}

AVATAR_IDS.sort((a, b) => a - b);
