// Diagnostic endpoint — returns whether the chat env var is visible to this
// function instance. Safe to expose: only reveals presence/length, never the key.

export async function GET() {
  const key = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;
  return Response.json({
    hasKey: Boolean(key),
    keyLength: key ? key.length : 0,
    keyStartsWith: key ? key.slice(0, 4) : null,
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV ?? null,
    region: process.env.VERCEL_REGION ?? null,
    deploymentUrl: process.env.VERCEL_URL ?? null,
    timestamp: new Date().toISOString(),
  });
}
