// netlify/functions/affirm-health.ts
import type { Handler } from "@netlify/functions";

function has(name: string) {
  return !!process.env[name];
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
      envCheck: {
        has_AFFIRM_PUBLIC_KEY: has("AFFIRM_PUBLIC_KEY"),
        has_AFFIRM_PRIVATE_KEY: has("AFFIRM_PRIVATE_KEY"),
        affirm_public_key_last4: pub.slice(-4),
        affirm_private_key_last4: priv.slice(-4),
        affirm_base_url: base,
        site_url: site,
      },
      note: "If checkout fails, check Netlify Function logs for affirm-create-checkout.",
    }),
  };
};