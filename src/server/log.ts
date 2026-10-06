import "server-only";
import pino from "pino";

/**
 * Structured JSON logger. Never pass secrets, license keys, signatures or
 * whole webhook payloads to it. Log ids and outcomes only.
 */
export const log = pino({
  level: process.env.LOG_LEVEL ?? "info",
  base: { service: "forgekit" },
  redact: ["req.headers.authorization", "req.headers.cookie", "*.key", "*.licenseKey", "*.password", "*.signature"],
});
