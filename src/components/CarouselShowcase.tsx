import React, { useEffect, useMemo, useState } from "react";
import type { Product } from "../data/products";
import { formatUSD } from "../data/products";
import { useCart } from "../context/CartContext";

export default function CarouselShowcase({ products }: { products: Product[] }) {
  const { add } = useCart();
  const slides = useMemo(() => products, [products]);
  const [idx, setIdx] = useState(0);
  const active = slides[idx] ?? slides[0];

  useEffect(() => {
    if (!slides.length) return;
    const t = window.setInterval(() => {
      setIdx((v) => (v + 1) % slides.length);
    }, 10_000);
    return () => window.clearInterval(t);
  }, [slides.length]);

  if (!active) return null;

  return (
    <section className="carousel-block section-shell" aria-label="Product showcase">
      <div className="carousel-shell">
        <div className="carousel-media">
          <img src={active.image} alt={active.name} />
          <div className="carousel-overlay">
            <p className="carousel-kicker">{active.category}</p>
            <h3 className="carousel-title">{active.name}</h3>
            <p className="carousel-price">{formatUSD(active.price)}</p>
            <p className="carousel-desc">{active.description}</p>

            <div className="carousel-actions">
              <button className="btn btn-primary" type="button" onClick={() => add(active)}>
                Add to cart
              </button>
              <a className="btn btn-outline" href="#catalog">
                View in catalog
              </a>
            </div>
          </div>
        </div>

        <div className="carousel-thumbs" aria-label="All models">
          {slides.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={`carousel-thumb ${i === idx ? "active" : ""}`}
              onClick={() => setIdx(i)}
              aria-label={`Show ${p.name}`}
            >
              <img src={p.image} alt={p.name} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}