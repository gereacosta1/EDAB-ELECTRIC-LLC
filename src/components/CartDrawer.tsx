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

  let data: any = null;
  const text = await res.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { error: text || "Unknown error" };
  }

  if (!res.ok) throw new Error(data?.error || "Stripe checkout failed");
  if (!data?.url) throw new Error("Missing Stripe session url");

  window.location.href = data.url as string;
}

async function startAffirmCheckout(items: CartItem[]) {
  const res = await fetch("/.netlify/functions/affirm-create-checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });

  let data: any = null;
  const text = await res.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { error: text || "Unknown error" };
  }

  if (!res.ok) {
    const msg =
      data?.affirm?.code === "public-api-key-invalid"
        ? "public-api-key-invalid"
        : data?.affirm?.message || data?.affirm?.details || data?.error || "Affirm checkout failed";
    throw new Error(msg);
  }

  if (!data?.redirect_url) throw new Error("Missing Affirm redirect_url");

  window.location.href = data.redirect_url as string;
}

export default function CartDrawer() {
  const { state, open, remove, setQty, subtotal, clear } = useCart();
  const [loading, setLoading] = useState(false);

  const canCheckout = useMemo(() => state.items.length > 0 && !loading, [state.items.length, loading]);

  const checkoutStripe = async () => {
    if (!state.items.length || loading) return;

    try {
      setLoading(true);
      open(false);
      await startStripeCheckout(state.items);
    } catch (e: any) {
      open(true);
      alert(e?.message || "Checkout error");
      setLoading(false);
    }
  };

  const checkoutAffirm = async () => {
    if (!state.items.length || loading) return;

    try {
      setLoading(true);
      open(false);
      await startAffirmCheckout(state.items);
    } catch (e: any) {
      open(true);

      const msg = String(e?.message || "");
      if (msg.includes("public-api-key-invalid")) {
        alert("Affirm is not fully activated yet. Please use Stripe for now.");
      } else {
        alert(msg || "Affirm checkout error");
      }

      setLoading(false);
    }
  };

  return (
    <div className={`cart-drawer ${state.isOpen ? "open" : ""}`} aria-hidden={!state.isOpen} onClick={() => open(false)}>
      <div className="cart-panel" role="dialog" aria-modal="true" aria-label="Cart" onClick={(e) => e.stopPropagation()}>
        
        <div className="cart-top">
          <div>
            <p className="cart-kicker">Your Cart</p>
            <h3 className="cart-title">Selected items</h3>
          </div>
          <button className="details-close" type="button" onClick={() => open(false)} aria-label="Close cart">
            <span />
            <span />
          </button>
        </div>

        <div className="cart-body">
          {state.items.length === 0 ? (
            <p className="cart-empty">No items yet.</p>
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
            
            <button
              className="btn btn-primary"
              type="button"
              disabled={!canCheckout}
              onClick={checkoutStripe}
            >
              {loading ? "Redirecting..." : "Checkout"}
            </button>

            <button
              className="btn btn-outline"
              type="button"
              disabled={!canCheckout}
              onClick={checkoutAffirm}
            >
              {loading ? "Redirecting..." : "Pay with Affirm"}
            </button>

            <button
              className="btn btn-small btn-outline"
              type="button"
              disabled={state.items.length === 0}
              onClick={clear}
            >
              Clear cart
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}