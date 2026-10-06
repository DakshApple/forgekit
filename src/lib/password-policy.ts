/** Shared by the admin account script and tests. Pure, no dependencies. */

const COMMON = new Set([
  "password1234", "password12345", "qwerty123456", "letmein12345",
  "administrator", "welcome12345", "iloveyou1234", "123456789012",
]);

export function passwordProblems(password: string, email = ""): string[] {
  const problems: string[] = [];
  if (password.length < 12) problems.push("at least 12 characters");
  if (password.length > 128) problems.push("at most 128 characters");
  if (!/[a-z]/.test(password)) problems.push("a lowercase letter");
  if (!/[A-Z]/.test(password)) problems.push("an uppercase letter");
  if (!/[0-9]/.test(password)) problems.push("a digit");
  if (!/[^A-Za-z0-9]/.test(password)) problems.push("a symbol");
  const lower = password.toLowerCase();
  if (COMMON.has(lower) || /^(.)\1+$/.test(password)) problems.push("not a common password");
  const local = email.split("@")[0]?.toLowerCase() ?? "";
  if (local.length >= 4 && lower.includes(local)) problems.push("not contain your email name");
  return problems;
}
