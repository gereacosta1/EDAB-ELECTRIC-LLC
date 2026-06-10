// src/App.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { PRODUCTS, categories, formatUSD, type Product, type ProductCategory } from "./data/products";
import { useCart } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";
import CarouselShowcase from "./components/CarouselShowcase";

export default function App() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "All">("All");

  const { open: openCart, count: cartCount, add: addToCart, clear } = useCart();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let changed = false;

    if (params.get("success") === "1") {
      clear();
      alert("Payment successful ✅");
      params.delete("success");
      changed = true;
    }

    if (params.get("canceled") === "1") {
      alert("Payment canceled.");
      params.delete("canceled");
      changed = true;
    }

    if (params.get("affirm") === "confirm") {
      clear();
      alert("Affirm payment started ✅");
      params.delete("affirm");
      changed = true;
    }

    if (params.get("affirm") === "cancel") {
      alert("Affirm payment canceled.");
      params.delete("affirm");
      changed = true;
    }

    if (changed) {
      const newQuery = params.toString();
      const newUrl = `${window.location.pathname}${newQuery ? `?${newQuery}` : ""}${window.location.hash || ""}`;
      window.history.replaceState({}, "", newUrl);
    }
  }, [clear]);

  const [detailsProduct, setDetailsProduct] = useState<Product | null>(null);
  const detailsOpen = !!detailsProduct;
  const detailsCloseBtnRef = useRef<HTMLButtonElement | null>(null);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const catalogFeature = filteredProducts[0] ?? PRODUCTS[0];
  const catalogGridProducts = filteredProducts.slice(1);

  const closeDetails = () => setDetailsProduct(null);

  const openDetails = (p: Product) => setDetailsProduct(p);

  const askForModel = (p: Product) => {
    closeDetails();
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  return (
    <div className="edab-app">
      <header className="topbar">
        <a href="#home" className="brand">
          <div className="brand-mark logo-mark">
            <img src="/img/hitech-bg.jpeg" alt="HITECH AUTO SALES" />
          </div>

          <div className="brand-copy">
            <strong>HITECH AUTO SALES</strong>
            <small>Hollywood, FL • Auto Sales</small>
          </div>
        </a>

        <nav className="nav nav-inline">
          <a href="#home">Home</a>
          <a href="#catalog">Inventory</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <button className="nav-cta" type="button" onClick={() => openCart(true)}>
          Selection ({cartCount})
        </button>
      </header>

      <CartDrawer />

      <main>
        <section id="home" className="premier-hero">
          <div className="premier-hero-content">
            <p className="eyebrow">HITECH AUTO SALES</p>

            <h1>
              Quality vehicles for
              <br />
              South Florida drivers
            </h1>

            <p className="premier-hero-text">
              Explore our vehicle inventory and contact us for availability, pricing, and financing options in Hollywood, Florida.
            </p>

            <div className="premier-hero-actions">
              <a href="#catalog" className="btn btn-primary">
                View Inventory
              </a>

              <a href="#contact" className="btn btn-outline">
                Contact Us
              </a>
            </div>

            <div className="premier-hero-info">
              <div>
                <span>Phone</span>
                <strong>954-239-8159</strong>
              </div>

              <div>
                <span>Location</span>
                <strong>1100 S State Road 7 Hollywood, FL 33023</strong>
              </div>
            </div>
          </div>

          <div className="premier-hero-visual">
            <img src="/img/hitech-bg.jpeg" alt="HITECH AUTO SALES dealership location" />
          </div>
        </section>

        <section id="catalog" className="catalog-block section-shell">
          <div className="section-header">
            <div>
              <p className="eyebrow">INVENTORY</p>
              <h2>
                Featured vehicles <span>available in Hollywood</span>
              </h2>
            </div>

            <div className="catalog-filters">
              <button className={activeCategory === "All" ? "active" : ""} type="button" onClick={() => setActiveCategory("All")}>
                All
              </button>

              {categories.map((cat) => (
                <button
                  key={cat}
                  className={activeCategory === cat ? "active" : ""}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {catalogFeature && (
            <article className="catalog-featured">
              <div className="catalog-featured-media">
                <img src={catalogFeature.image} alt={catalogFeature.name} />
                {catalogFeature.badge ? <span className="badge">{catalogFeature.badge}</span> : null}
              </div>

              <div className="catalog-featured-info">
                <span className="catalog-featured-category">{catalogFeature.category}</span>

                <h3>{catalogFeature.name}</h3>

                <strong>{formatUSD(catalogFeature.price)}</strong>

                <p>{catalogFeature.description}</p>

                <ul className="spec-list">
                  {catalogFeature.specs.slice(0, 3).map((spec) => (
                    <li key={`${catalogFeature.id}-${spec}`}>{spec}</li>
                  ))}
                </ul>

                <div className="product-actions">
                  <button className="btn btn-primary" type="button" onClick={() => addToCart(catalogFeature)}>
                    Add to selection
                  </button>

                  <button className="btn btn-outline" type="button" onClick={() => openDetails(catalogFeature)}>
                    View details
                  </button>
                </div>
              </div>
            </article>
          )}

          <div className="catalog-grid">
            {catalogGridProducts.map((p) => (
              <article key={p.id} className="product-card">
                <div className="product-media">
                  <img src={p.image} alt={p.name} />
                  {p.badge ? <span className="badge">{p.badge}</span> : null}
                  <span className="chip">{p.category}</span>
                </div>

                <div className="product-body">
                  <div className="product-title-row">
                    <h3>{p.name}</h3>
                    <strong>{formatUSD(p.price)}</strong>
                  </div>

                  <p className="product-desc">
                    {p.description.length > 90 ? `${p.description.slice(0, 90)}...` : p.description}
                  </p>

                  <ul className="spec-list">
                    {p.specs.slice(0, 2).map((spec) => (
                      <li key={`${p.id}-${spec}`}>{spec}</li>
                    ))}
                  </ul>

                  <div className="product-actions">
                    <button className="btn btn-small btn-primary" type="button" onClick={() => addToCart(p)}>
                      Add to selection
                    </button>

                    <button className="btn btn-small btn-outline" type="button" onClick={() => openDetails(p)}>
                      Details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <CarouselShowcase products={PRODUCTS} />

        <section id="about" className="about-block section-shell">
          <div className="about-panel">
            <p className="eyebrow">ABOUT</p>

            <h2>HITECH AUTO SALES</h2>

            <p>
              HITECH AUTO SALES offers quality vehicles and financing options for customers looking for reliable transportation
              in South Florida.
            </p>

            <div className="about-stats">
              <div>
                <span>Focus</span>
                <strong>Auto Sales</strong>
              </div>

              <div>
                <span>Location</span>
                <strong>Hollywood, FL</strong>
              </div>

              <div>
                <span>Inventory</span>
                <strong>Cars • SUVs • Trucks</strong>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-block section-shell">
          <div className="contact-panel">
            <div>
              <p className="eyebrow">CONTACT</p>

              <h2>Call or visit us</h2>

              <p>Contact us for availability, pricing, financing options, and vehicle details.</p>
            </div>

            <div className="contact-list">
              <a href="tel:+19542398159">954-239-8159</a>
              <p>1100 S State Road 7 Hollywood, FL 33023</p>
              <p>Hollywood, FL • Auto Sales</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer section-shell">
        <div className="footer-brand">
          <h3>HITECH AUTO SALES</h3>
          <p>Quality vehicles and financing options in Hollywood, Florida.</p>
        </div>

        <p className="footer-copy">© {new Date().getFullYear()} HITECH AUTO SALES. All rights reserved.</p>
      </footer>

      <div className={`details-modal ${detailsOpen ? "open" : ""}`} aria-hidden={!detailsOpen} onClick={closeDetails}>
        <div
          className="details-panel"
          role="dialog"
          aria-modal="true"
          aria-label={detailsProduct ? `Details for ${detailsProduct.name}` : "Vehicle details"}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="details-top">
            <div>
              <p className="details-kicker">Vehicle details</p>
              <h3 className="details-title">{detailsProduct?.name ?? ""}</h3>
            </div>

            <button ref={detailsCloseBtnRef} className="details-close" type="button" onClick={closeDetails} aria-label="Close details">
              <span />
              <span />
            </button>
          </div>

          {detailsProduct ? (
            <div className="details-body">
              <div className="details-media">
                <img src={detailsProduct.image} alt={detailsProduct.name} />
                <span className="details-chip">{detailsProduct.category}</span>
                {detailsProduct.badge ? <span className="details-badge">{detailsProduct.badge}</span> : null}
              </div>

              <div className="details-content">
                <div className="details-price-row">
                  <strong className="details-price">{formatUSD(detailsProduct.price)}</strong>
                  <span className="details-sub">Hollywood, FL • In-store visit / local inquiry</span>
                </div>

                <p className="details-desc">{detailsProduct.description}</p>

                <div className="details-specs">
                  <p className="details-specs-title">Highlights</p>
                  <ul>
                    {detailsProduct.specs.map((s) => (
                      <li key={`${detailsProduct.id}-${s}`}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="details-actions">
                  <button className="btn btn-primary" type="button" onClick={() => addToCart(detailsProduct)}>
                    Add to selection
                  </button>
                  <button className="btn btn-outline" type="button" onClick={() => askForModel(detailsProduct)}>
                    Ask about it
                  </button>
                </div>

                <p className="details-footnote">Tip: press ESC to close.</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}