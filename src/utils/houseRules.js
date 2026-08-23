// House rules — hardcoded, app-wide, not user-toggleable and not
// per-character. Changing a value here means editing this file and
// shipping a new build; everyone using the app gets the same number.
// Deliberately not a settings system — just named constants formulas
// can import, since this isn't expected to grow into anything larger.
// Each entry notes the RAW value it's overriding, so reverting to
// stock rules is just changing the number back.

// RAW: Remote Device Limit = Data Processing (multiplier 1). House
// rule doubles it. Applies ONLY to the general Remote Device Limit —
// does NOT touch RCC slavedDroneCapacity, which is its own separate
// Device-Rating-based formula (x3) and stays exactly RAW.
export const REMOTE_DEVICE_LIMIT_MULTIPLIER = 2;
