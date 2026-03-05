// netlify/functions/create-stripe-checkout.ts
import type { Handler } from "@netlify/functions";
import Stripe from "stripe";

type CartItem = {
  id: number;
  name: string;
  price: number; // USD
  image?: string;
  qty: number;
};

function clampQty(qty: any) {
  const n = Number(qty);
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.min(99, Math.floor(n)));
}

function toCents(price: any) {
  const n = Number(price);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.round(n * 100));
}

function buildAbsoluteImageUrl(origin: string, image?: string) {
  if (!image) return undefined;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;

  // Normaliza para que siempre quede con una sola "/"
  if (image.startsWith("/")) return `${origin}${image}`;
  return `${origin}/${image}`;
}

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const stripeSecret = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecret) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing STRIPE_SECRET_KEY env var" }),
      };
    }

    const stripe = new Stripe(stripeSecret, { apiVersion: "2024-06-20" });

    const parsed = event.body ? JSON.parse(event.body) : {};
    const items: CartItem[] = Array.isArray(parsed.items) ? parsed.items : [];

    if (!items.length) {
      return { statusCode: 400, body: JSON.stringify({ error: "Cart is empty" }) };
    }

    // Detect site origin (Netlify headers)
    const proto = event.headers["x-forwarded-proto"] || "https";
    const host = event.headers["x-forwarded-host"] || event.headers.host;
    const origin = `${proto}://${host}`;

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((it) => {
      const qty = clampQty(it.qty);
      const unit_amount = toCents(it.price);
      const img = buildAbsoluteImageUrl(origin, it.image);

      return {
        quantity: qty,
        price_data: {
          currency: "usd",
          unit_amount,
          product_data: {
            name: String(it.name || `Item ${it.id}`),
            images: img ? [img] : undefined,
          },
        },
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/?success=1`,
      cancel_url: `${origin}/?canceled=1`,
      billing_address_collection: "auto",
      shipping_address_collection: { allowed_countries: ["US"] },
      phone_number_collection: { enabled: true },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err?.message || "Stripe error" }),
    };
  }
};