import { randomInt } from "node:crypto";

// 32 symbols. No 0, O, 1 or I so keys are easy to read out and type.
export const KEY_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const GROUPS = 3;
const GROUP_LEN = 4;

/** PREFIX-XXXX-XXXX-XXXX from a cryptographically secure source. */
export function generateLicenseKey(prefix: string): string {
  const groups: string[] = [];
  for (let g = 0; g < GROUPS; g++) {
    let part = "";
    for (let i = 0; i < GROUP_LEN; i++) part += KEY_ALPHABET[randomInt(KEY_ALPHABET.length)];
    groups.push(part);
  }
  return `${prefix}-${groups.join("-")}`;
}

export function normalizeKey(raw: string): string {
  return raw.trim().toUpperCase();
}
