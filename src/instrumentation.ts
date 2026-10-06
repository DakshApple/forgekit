export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (process.env.NEXT_PHASE === "phase-production-build") return;
  // Fail fast at server start if configuration is wrong.
  const { getEnv } = await import("@/server/env");
  getEnv();
}
