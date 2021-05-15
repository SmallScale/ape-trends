export const escapeRegExpVariable = (string: string): string =>
  string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
