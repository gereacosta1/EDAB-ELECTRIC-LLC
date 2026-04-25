// src/components/CarouselShowcase.tsx
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

    const timer = window.setInterval(() => {
      setIdx((current) => (current + 1) % slides.length);
    }, 9000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (!active) return null;

  return (
    <section className="carousel-block section-shell" aria-label="Featured product showcase">
      <div className="carousel-header">
        <div>
          <p className="eyebrow">SHOWCASE</p>
          <h2>
            Explore more <span>featured models</span>
          </h2>
        </div>

        <a href="#catalog" className="section-link">
          View all inventory
        </a>
      </div>

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
                Buy now
              </button>

              <a className="btn btn-outline" href="#catalog">
                View in catalog
              </a>
            </div>
          </div>
        </div>

        <div className="carousel-thumbs" aria-label="All featured models">
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