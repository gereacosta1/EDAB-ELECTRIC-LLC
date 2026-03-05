// netlify/functions/affirm-create-checkout.ts
import type { Handler } from "@netlify/functions";

type CartItem = {
  id: number;
  name: string;
  price: number; // USD
  image?: string;
  qty: number;
};

function toCents(n: any) {
  const num = Number(n);
  if (!Number.isFinite(num)) return 0;
  return Math.max(0, Math.round(num * 100));
}

function clampQty(qty: any) {
  const n = Number(qty);
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.min(99, Math.floor(n)));
}

function requiredEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function normalizeBaseUrl(url: string) {
  return String(url || "").trim().replace(/\/$/, "");
}

function absoluteImageUrl(siteUrl: string, image?: string) {
  if (!image) return `${siteUrl}/`;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  if (image.startsWith("/")) return `${siteUrl}${image}`;
  return `${siteUrl}/${image}`;
}

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const AFFIRM_PUBLIC_KEY = requiredEnv("AFFIRM_PUBLIC_KEY");
    const AFFIRM_PRIVATE_KEY = requiredEnv("AFFIRM_PRIVATE_KEY");

    // PROD
    const AFFIRM_BASE_URL = normalizeBaseUrl(process.env.AFFIRM_BASE_URL || "https://api.affirm.com");
    const SITE_URL = normalizeBaseUrl(process.env.SITE_URL || "https://edab-electric.com");

    const body = event.body ? JSON.parse(event.body) : null;
    const items = (body?.items || []) as CartItem[];

    if (!Array.isArray(items) || items.length === 0) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing items" }) };
    }

    const affirmItems = items.map((it) => {
      const unit_price = toCents(it.price);
      const qty = clampQty(it.qty);

      return {
        display_name: String(it.name || `Item ${it.id}`),
        sku: String(it.id),
        unit_price,
        qty,
        item_url: `${SITE_URL}/#catalog`,
        item_image_url: absoluteImageUrl(SITE_URL, it.image),
      };
    });

    const subtotal = affirmItems.reduce((s: number, it: any) => s + it.unit_price * it.qty, 0);

    // Ajustables a futuro:
    const shipping_amount = 0;
    const tax_amount = 0;
    const total = subtotal + shipping_amount + tax_amount;

    // SPA-friendly
    const confirmUrl = `${SITE_URL}/?affirm=confirm`;
    const cancelUrl = `${SITE_URL}/?affirm=cancel`;

    const payload = {
      checkout: {
        merchant: {
          name: "EDAB ELECTRIC LLC",
          user_confirmation_url: confirmUrl,
          user_cancel_url: cancelUrl,
          user_confirmation_url_action: "GET",
        },
        items: affirmItems,
        currency: "USD",
        shipping_amount,
        tax_amount,
        total,
      },
    };

    const auth = Buffer.from(`${AFFIRM_PUBLIC_KEY}:${AFFIRM_PRIVATE_KEY}`).toString("base64");

    const res = await fetch(`${AFFIRM_BASE_URL}/api/v2/checkout/direct`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let data: any = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { raw: text };
    }

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({
          error: "Affirm checkout failed",
          affirm: data,
        }),
      };
    }

    const redirectUrl = data?.redirect_url || data?.redirect_url_checkout || data?.url;

    if (!redirectUrl) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Affirm response missing redirect_url",
          affirm: data,
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true,
        redirect_url: redirectUrl,
        checkout_token: data?.checkout_token,
      }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err?.message || "Server error" }),
    };
  }
};