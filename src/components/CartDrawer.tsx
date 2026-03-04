// src/components/CartDrawer.tsx
import React, { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../context/CartContext";
import { formatUSD } from "../data/products";

async function startStripeCheckout(items: CartItem[]) {
  const res = await fetch("/.netlify/functions/create-stripe-checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });

  // Be defensive: function might not return JSON on errors
  let data: any = null;
  const text = await res.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { error: text || "Unknown error" };
  }

  if (!res.ok) throw new Error(data?.error || "Stripe checkout failed");
  if (!data?.url) throw new Error("Missing Stripe session url");

  // redirect
  window.location.href = data.url as string;
}

export default function CartDrawer() {
  const { state, open, remove, setQty, subtotal, clear } = useCart();
  const [loading, setLoading] = useState(false);

  const canCheckout = useMemo(() => state.items.length > 0 && !loading, [state.items.length, loading]);

  const checkoutStripe = async () => {
    if (!state.items.length || loading) return;

    try {
      setLoading(true);

      // Optional UX: close cart immediately so it feels responsive
      open(false);

      await startStripeCheckout(state.items);
      // NOTE: redirect happens inside startStripeCheckout
    } catch (e: any) {
      // Re-open cart so user can try again
      open(true);
      alert(e?.message || "Checkout error");
      setLoading(false);
    }
  };

  const checkoutAffirm = () => {
    alert("Affirm is not enabled yet. We can activate it once your Affirm merchant account is ready.");
  };

  return (
    <div className={`cart-drawer ${state.isOpen ? "open" : ""}`} aria-hidden={!state.isOpen} onClick={() => open(false)}>
      <div className="cart-panel" role="dialog" aria-modal="true" aria-label="Cart" onClick={(e) => e.stopPropagation()}>
        <div className="cart-top">
          <div>
            <p className="cart-kicker">Cart</p>
            <h3 className="cart-title">Your items</h3>
          </div>
          <button className="details-close" type="button" onClick={() => open(false)} aria-label="Close cart">
            <span />
            <span />
          </button>
        </div>

        <div className="cart-body">
          {state.items.length === 0 ? (
            <p className="cart-empty">Your cart is empty.</p>
          ) : (
            <div className="cart-items">
              {state.items.map((it) => (
                <div className="cart-item" key={it.id}>
                  <div className="cart-item-media">
                    <img src={it.image || ""} alt={it.name} />
                  </div>

                  <div className="cart-item-main">
                    <div className="cart-item-head">
                      <strong>{it.name}</strong>
                      <span className="cart-item-price">{formatUSD(it.price)}</span>
                    </div>

                    <div className="cart-item-controls">
                      <label className="cart-qty">
                        Qty
                        <input
                          type="number"
                          min={1}
                          max={99}
                          value={it.qty}
                          onChange={(e) => setQty(it.id, Number(e.target.value))}
                        />
                      </label>

                      <button className="cart-remove" type="button" onClick={() => remove(it.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="cart-bottom">
          <div className="cart-subtotal">
            <span>Subtotal</span>
            <strong>{formatUSD(subtotal)}</strong>
          </div>

          <div className="cart-actions">
            <button className="btn btn-primary" type="button" disabled={!canCheckout} onClick={checkoutStripe}>
              {loading ? "Redirecting..." : "Pay with Stripe"}
            </button>

            <button className="btn btn-outline" type="button" disabled={state.items.length === 0} onClick={checkoutAffirm}>
              Pay with Affirm (soon)
            </button>

            <button className="btn btn-small btn-outline" type="button" disabled={state.items.length === 0} onClick={clear}>
              Clear cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}