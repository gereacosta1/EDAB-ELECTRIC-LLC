// netlify/functions/affirm-health.ts
import type { Handler } from "@netlify/functions";

function safeInfo(v?: string) {
  const s = String(v || "");
  return {
    present: !!s,
    length: s.length,
    last4: s.slice(-4),
    hasWhitespace: /\s/.test(s), // espacios, tabs, \n
    startsWith: s.slice(0, 4),
  };
}

export const handler: Handler = async () => {
  const pub = process.env.AFFIRM_PUBLIC_KEY || "";
  const priv = process.env.AFFIRM_PRIVATE_KEY || "";
  const base = (process.env.AFFIRM_BASE_URL || "https://api.affirm.com").replace(/\/$/, "");
  const site = (process.env.SITE_URL || "").replace(/\/$/, "");

  return {
    statusCode: 200,
    body: JSON.stringify({
      ok: true,
      affirm_base_url: base,
      site_url: site,
      affirm_public_key: safeInfo(pub),
      affirm_private_key: safeInfo(priv),
      note: "If hasWhitespace=true or length looks wrong, re-paste keys in Netlify env vars (no spaces/newlines).",
    }),
  };
};