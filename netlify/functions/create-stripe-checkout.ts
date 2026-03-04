import type { Handler } from "@netlify/functions";
import Stripe from "stripe";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image?: string;
  qty: number;
};

const stripeSecret = process.env.STRIPE_SECRET_KEY;

export const handler: Handler = async (event) => {
  try {
    if (!stripeSecret) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing STRIPE_SECRET_KEY env var" }),
      };
    }

    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const stripe = new Stripe(stripeSecret, { apiVersion: "2024-06-20" });

    const parsed = JSON.parse(event.body || "{}");
    const items: CartItem[] = Array.isArray(parsed.items) ? parsed.items : [];

    if (!items.length) {
      return { statusCode: 400, body: JSON.stringify({ error: "Cart is empty" }) };
    }

    // Detect site origin (Netlify headers)
    const proto = event.headers["x-forwarded-proto"] || "https";
    const host = event.headers["x-forwarded-host"] || event.headers.host;
    const origin = `${proto}://${host}`;

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((it) => ({
      quantity: it.qty,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(it.price * 100),
        product_data: {
          name: it.name,
          images: it.image ? [`${origin}${it.image}`] : undefined,
        },
      },
    }));

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