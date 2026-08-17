export function copy (obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function formatCredits(amount) {
  return `${amount.toLocaleString()}¤`;
}
