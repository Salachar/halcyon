// Whole-app backup — export/import everything in localStorage as one
// file. Pulled out of DataModal so the actual data logic (collect,
// serialize, validate, restore) lives in one place, independent of
// whatever UI ends up calling it. DataModal is the only consumer today,
// but this shouldn't need to change if something else wants "back up
// everything" later.

const BACKUP_TYPE = 'halcyon_full_backup';
const APP_VERSION = '1.0.0';

export function collectAppData() {
  const appData = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    appData[key] = localStorage.getItem(key);
  }
  return appData;
}

// Triggers the download directly (file save is a real side effect, not
// something worth trying to keep "pure") — returns the payload anyway,
// in case a caller wants it (e.g. to also send over the socket).
export function buildBackupPayload() {
  return {
    appData: collectAppData(),
    _meta: {
      exportDate: new Date().toISOString(),
      appVersion: APP_VERSION,
      type: BACKUP_TYPE,
    },
  };
}

export function exportAppData() {
  const exportPayload = buildBackupPayload();

  const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `halcyon_backup_${Date.now()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return exportPayload;
}

// Promise-based rather than callback-based, so DataModal can await it
// and keep its own state handling simple (try/catch instead of nested
// onload/onerror callbacks).
export function parseImportFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (!imported._meta || imported._meta.type !== BACKUP_TYPE) {
          reject(new Error('Invalid backup file format.'));
          return;
        }
        if (!imported.appData) {
          reject(new Error('No app data found in backup file.'));
          return;
        }
        resolve({ data: imported.appData, exportDate: imported._meta.exportDate });
      } catch (err) {
        console.error('Import parse error:', err);
        reject(new Error('Failed to read file. Invalid or corrupted backup.'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsText(file);
  });
}

// Full replace, not a merge — matches the destructive nature this
// already had in the Cy_Borg version. This is genuinely different from
// CharacterTabs' per-character import, which only adds one character
// and never touches anything else.
export function restoreAppData(data) {
  localStorage.clear();
  Object.keys(data).forEach((key) => {
    localStorage.setItem(key, data[key]);
  });
}

export function formatExportDate(iso) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: 'numeric', minute: '2-digit',
    });
  } catch {
    return iso;
  }
}
