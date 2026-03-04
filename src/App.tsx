// src/App.tsx
import React, { useEffect, useMemo, useState } from "react";

type ProductCategory = "Scooters" | "E-Bikes";

type Product = {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  badge?: string;
  image: string;
  description: string;
  specs: string[];
};

const PRODUCTS: Product[] = [
  // =========================
  // E-BIKES (tus fotos nuevas)
  // =========================
  {
    id: 1,
    name: "E Bike Vogy",
    category: "E-Bikes",
    price: 1000,
    badge: "Value",
    image: "/img/E-bike-Vogy.jpeg",
    description: "Affordable e-bike option for everyday city riding and quick errands.",
    specs: ["Great starter model", "City-friendly ride", "Budget focused"],
  },
  {
    id: 2,
    name: "E Bike Ben",
    category: "E-Bikes",
    price: 2000,
    badge: "Popular",
    image: "/img/E-BIKE-BEN.jpeg",
    description: "Balanced e-bike with solid performance for daily commuting around Miami.",
    specs: ["Daily commuter", "Comfort + power", "Reliable build"],
  },
  {
    id: 3,
    name: "E Bike EVYBIKE",
    category: "E-Bikes",
    price: 1750,
    image: "/img/E-BIKE-EVYBIKE.jpeg",
    description: "Practical e-bike with a clean look and a smooth ride for city use.",
    specs: ["Smooth ride", "Great for city", "Good mid-range choice"],
  },
  {
    id: 4,
    name: "E Bike Super R",
    category: "E-Bikes",
    price: 2800,
    badge: "Best Seller",
    image: "/img/E-bike-super-R.jpeg",
    description: "Premium style e-bike built for comfort, presence, and everyday performance.",
    specs: ["Premium style", "Comfort ride", "Strong presence"],
  },
  {
    id: 5,
    name: "E Bike Super 73",
    category: "E-Bikes",
    price: 3500,
    badge: "Featured",
    image: "/img/E-BIKE-SUPER-73.jpeg",
    description: "Iconic Super 73 style e-bike with a bold look and premium feel.",
    specs: ["Iconic design", "Premium feel", "Street-ready"],
  },
  {
    id: 6,
    name: "E Bike Solar",
    category: "E-Bikes",
    price: 4000,
    badge: "Premium",
    image: "/img/E-BIKE-SOLAR.jpeg",
    description: "High-end e-bike option with a standout design and premium positioning.",
    specs: ["High-end", "Premium design", "Top tier option"],
  },
  {
    id: 7,
    name: "E Bike Dirt",
    category: "E-Bikes",
    price: 4500,
    badge: "Top Tier",
    image: "/img/E-BIKE-DIRT.jpeg",
    description: "Off-road oriented, premium e-bike build with aggressive styling and performance.",
    specs: ["Off-road oriented", "Premium build", "High performance"],
  },

  // =========================
  // SCOOTERS (tus fotos nuevas)
  // =========================
  {
    id: 8,
    name: "Electric Scooter Segway",
    category: "Scooters",
    price: 600,
    badge: "Best Value",
    image: "/img/Electric-scooter-segway.jpeg",
    description: "Simple and reliable Segway scooter option for commuting and short trips.",
    specs: ["Easy to use", "Reliable option", "Great value"],
  },
  {
    id: 9,
    name: "Electric Scooter Hiboy S2 Pro",
    category: "Scooters",
    price: 800,
    badge: "Popular",
    image: "/img/Electric-scooter-hiboy-s2-pro.jpeg",
    description: "Comfortable commuter scooter with a solid balance of speed and ride feel.",
    specs: ["Commuter friendly", "Comfort ride", "Strong value"],
  },
  {
    id: 10,
    name: "Electric Scooter E-Rev Off Road",
    category: "Scooters",
    price: 1500,
    badge: "Off Road",
    image: "/img/Electric-scooter-e-rev-off-Road.jpeg",
    description: "Off-road scooter built for tougher rides and stronger presence.",
    specs: ["Off-road ready", "Stronger build", "Premium scooter"],
  },
];

const categories: ProductCategory[] = ["Scooters", "E-Bikes"];

function formatUSD(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function App() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "All">("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuPanelOpen, setMenuPanelOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const featured = PRODUCTS.slice(0, 4);

  const heroCards = [
    PRODUCTS[4] ?? PRODUCTS[0],
    PRODUCTS[1] ?? PRODUCTS[0],
    PRODUCTS[7] ?? PRODUCTS[0],
  ];

  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setMenuPanelOpen(false);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuPanelOpen(false);
        setMobileMenuOpen(false);
      }
    };

    if (menuPanelOpen || mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuPanelOpen, mobileMenuOpen]);

  return (
    <div className="edab-app">
      <div className="noise-layer" aria-hidden="true" />
      <div className="mesh mesh-a" aria-hidden="true" />
      <div className="mesh mesh-b" aria-hidden="true" />
      <div className="rings" aria-hidden="true" />

      <header className="topbar">
        <a href="#home" className="brand" aria-label="EDAB Electric LLC home" onClick={closeAllMenus}>
          <div className="brand-mark logo-mark">
            <img src="/img/edab-only-logo.PNG" alt="EDAB Electric LLC logo" />
          </div>
          <div className="brand-copy">
            <strong>EDAB ELECTRIC LLC</strong>
            <small>Electric Mobility • Miami</small>
          </div>
        </a>

        <nav className="nav nav-inline" aria-label="Primary navigation">
          <a href="#home">Home</a>
          <a href="#catalog">Catalog</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="topbar-actions">
          <button
            className={`nav-menu-pill ${menuPanelOpen ? "active" : ""}`}
            type="button"
            aria-expanded={menuPanelOpen}
            aria-controls="edab-overlay-menu"
            onClick={() => {
              setMenuPanelOpen((v) => !v);
              setMobileMenuOpen(false);
            }}
          >
            <span className="nav-menu-pill-label">{menuPanelOpen ? "Close" : "Menu"}</span>
            <span className="nav-menu-pill-icon" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>

          <a href="#catalog" className="nav-cta desktop-only" onClick={closeAllMenus}>
            View Products
          </a>

          <button
            className="mobile-menu-btn"
            onClick={() => {
              setMobileMenuOpen((v) => !v);
              setMenuPanelOpen(false);
            }}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className={`nav mobile-quick-nav ${mobileMenuOpen ? "open" : ""}`}>
          <a href="#home" onClick={closeAllMenus}>
            Home
          </a>
          <a href="#catalog" onClick={closeAllMenus}>
            Catalog
          </a>
          <a href="#about" onClick={closeAllMenus}>
            About
          </a>
          <a href="#contact" onClick={closeAllMenus}>
            Contact
          </a>
          <a href="#catalog" className="nav-cta" onClick={closeAllMenus}>
            View Products
          </a>
        </div>
      </header>

      <div
        className={`nav-overlay ${menuPanelOpen ? "open" : ""}`}
        aria-hidden={!menuPanelOpen}
        onClick={() => setMenuPanelOpen(false)}
      >
        <div
          id="edab-overlay-menu"
          className="nav-overlay-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="nav-overlay-left">
            <p className="nav-overlay-kicker">Menu</p>
            <h2>
              Electric
              <br />
              Mobility
              <br />
              Navigation
            </h2>
            <p className="nav-overlay-copy">
              Clean navigation with a bolder editorial layout inspired by studio-style menus and modern
              product brands.
            </p>

            <div className="nav-overlay-capsules" aria-hidden="true">
              <span>Miami</span>
              <span>EDAB Electric LLC</span>
              <span>Green Mobility</span>
            </div>

            <div className="nav-overlay-mini-card">
              <img src={heroCards[0].image} alt={heroCards[0].name} />
              <div>
                <small>Featured</small>
                <strong>{heroCards[0].name}</strong>
                <p>{formatUSD(heroCards[0].price)}</p>
              </div>
            </div>
          </div>

          <div className="nav-overlay-right">
            <div className="nav-overlay-top">
              <p>Navigation</p>
              <button
                type="button"
                className="nav-overlay-close"
                onClick={() => setMenuPanelOpen(false)}
                aria-label="Close menu"
              >
                <span />
                <span />
              </button>
            </div>

            <div className="nav-overlay-links">
              <a href="#home" onClick={closeAllMenus}>
                <span>01</span>
                Home
              </a>
              <a href="#catalog" onClick={closeAllMenus}>
                <span>02</span>
                Catalog
              </a>
              <a href="#about" onClick={closeAllMenus}>
                <span>03</span>
                About
              </a>
              <a href="#contact" onClick={closeAllMenus}>
                <span>04</span>
                Contact
              </a>
            </div>

            <div className="nav-overlay-bottom">
              <div className="nav-overlay-contact">
                <small>Contact</small>
                <a href="tel:+17869354994">(786) 935-4994</a>
                <p>765 NE 79th St, Miami FL 33138</p>
              </div>

              <a href="#catalog" className="nav-overlay-cta" onClick={closeAllMenus}>
                View Products →
              </a>
            </div>
          </div>
        </div>
      </div>

      <main>
        {/* HERO */}
        <section id="home" className="hero-shell section-shell">
          <div className="hero-stage">
            <div className="hero-backdrop">
              <img src="/img/edab-logo.PNG" alt="EDAB electric mobility hero visual" />
              <div className="hero-backdrop-gradient" />
            </div>

            <div className="hero-ui-row">
              <p className="hero-mini-label">// EDAB ELECTRIC LLC</p>
              <div className="hero-ui-links">
                <a href="#about">ABOUT</a>
                <a href="#catalog">WORKS</a>
                <a href="#catalog">PRODUCTS</a>
                <a href="#contact">CONTACT</a>
              </div>
            </div>

            <div className="hero-content">
              <div className="hero-content-left">
                <p className="eyebrow light">{`{ ELECTRIC MOBILITY }`}</p>

                <h1 className="hero-title">
                  BOLD
                  <br />
                  ELECTRIC
                  <br />
                  VISION
                </h1>

                <div className="hero-kicker">
                  <h2>
                    Scooters + E-Bikes
                    <br />
                    <span>Built for Miami streets.</span>
                  </h2>
                </div>
              </div>

              <div className="hero-content-right">
                <p className="hero-description">
                  EDAB ELECTRIC LLC offers electric scooters and e-bikes with a stronger visual identity
                  and a premium browsing experience designed for modern customers.
                </p>

                <div className="hero-actions">
                  <a href="#catalog" className="btn btn-primary">
                    Explore Catalog
                  </a>
                  <a href="#contact" className="btn btn-outline">
                    Contact Us
                  </a>
                </div>

                <div className="hero-contact-grid">
                  <div className="hero-contact-card">
                    <span>PHONE</span>
                    <strong>(786) 935-4994</strong>
                  </div>
                  <div className="hero-contact-card">
                    <span>HOURS</span>
                    <strong>10:30 AM – 5:00 PM</strong>
                  </div>
                  <div className="hero-contact-card">
                    <span>LOCATION</span>
                    <strong>765 NE 79th St, Miami FL 33138</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-bottom-strip">
              <p>
                <span className="dot" />
                Electric scooters • E-bikes
              </p>
              <a href="#catalog">BROWSE PRODUCTS →</a>
            </div>
          </div>
        </section>

        {/* VISUAL MOSAIC */}
        <section className="visual-lab section-shell">
          <div className="visual-lab-head">
            <p className="eyebrow">{`{ FEATURED COLLECTION }`}</p>
            <h2>
              A sharper identity
              <span> for electric mobility retail.</span>
            </h2>
          </div>

          <div className="visual-lab-grid">
            <article className="visual-card visual-card-main">
              <img src={heroCards[0].image} alt={heroCards[0].name} />
              <div className="visual-card-overlay">
                <p className="visual-card-tag">Featured</p>
                <h3>{heroCards[0].name}</h3>
                <p>{heroCards[0].description}</p>
              </div>
            </article>

            <article className="visual-card visual-card-side">
              <img src={heroCards[1].image} alt={heroCards[1].name} />
              <div className="visual-mini-meta">
                <span>{heroCards[1].category}</span>
                <strong>{heroCards[1].name}</strong>
              </div>
            </article>

            <article className="visual-card visual-card-side">
              <img src={heroCards[2].image} alt={heroCards[2].name} />
              <div className="visual-mini-meta">
                <span>{heroCards[2].category}</span>
                <strong>{heroCards[2].name}</strong>
              </div>
            </article>

            <div className="visual-statement">
              <p className="eyebrow">{`{ OUR WORK / CATALOG DIRECTION }`}</p>
              <h3>
                CLEAN
                <br />
                GREEN
                <br />
                IMPACT.
              </h3>
              <p>Premium, bold, and product-focused layout that feels different from the usual ecommerce templates.</p>
              <a href="#catalog">View catalog →</a>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="categories-block section-shell">
          <div className="section-header">
            <div>
              <p className="eyebrow">{`{ CATEGORIES }`}</p>
              <h2>
                What we sell <span>at EDAB</span>
              </h2>
            </div>
            <a href="#catalog" className="section-link">
              All Products
            </a>
          </div>

          <div className="category-grid">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-card ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
                type="button"
              >
                <span className="category-index">{String(categories.indexOf(cat) + 1).padStart(2, "0")}</span>

                <div className="category-copy">
                  <h3>{cat}</h3>
                  <p>
                    {cat === "Scooters" && "Compact, practical, and easy for city commuting."}
                    {cat === "E-Bikes" && "Comfortable electric bicycles for everyday rides."}
                  </p>
                </div>

                <span className="category-arrow">↗</span>
              </button>
            ))}
          </div>
        </section>

        {/* FEATURED */}
        <section className="featured-block section-shell">
          <div className="section-header">
            <div>
              <p className="eyebrow">{`{ FEATURED MODELS }`}</p>
              <h2>
                Highlighted products <span>with strong visual presence</span>
              </h2>
            </div>
          </div>

          <div className="featured-grid">
            {featured.map((item, i) => (
              <article key={`featured-${item.id}`} className={`featured-card f-${i + 1}`}>
                <div className="featured-image">
                  <img src={item.image} alt={item.name} />
                  {item.badge ? <span className="badge">{item.badge}</span> : null}
                </div>

                <div className="featured-content">
                  <p className="featured-category">{item.category}</p>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>

                  <div className="featured-bottom">
                    <strong>{formatUSD(item.price)}</strong>
                    <a href="#contact">Inquire →</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="impact-block section-shell">
          <div className="impact-shell">
            <div className="impact-grid-lines" aria-hidden="true" />

            <div className="impact-top">
              <p className="eyebrow light">{`{ ABOUT US }`}</p>
            </div>

            <h2 className="impact-title">
              POWERING MIAMI
              <br />
              WITH ELECTRIC
              <br />
              STYLE & MOTION.
            </h2>

            <div className="impact-center-orb" aria-hidden="true" />

            <div className="impact-bottom">
              <p>
                EDAB ELECTRIC LLC combines practical electric mobility options with a cleaner, stronger visual presence.
                The goal is simple: help customers discover the right scooter or e-bike faster, with a premium and modern
                browsing experience.
              </p>

              <div className="impact-stats">
                <div className="stat-box">
                  <span>Focus</span>
                  <strong>Electric Mobility</strong>
                </div>
                <div className="stat-box">
                  <span>Location</span>
                  <strong>Miami, FL</strong>
                </div>
                <div className="stat-box">
                  <span>Products</span>
                  <strong>Scooters • E-Bikes</strong>
                </div>
                <div className="stat-box">
                  <span>Support</span>
                  <strong>Catalog inquiries & local guidance</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CATALOG */}
        <section id="catalog" className="catalog-block section-shell">
          <div className="section-header catalog-header">
            <div>
              <p className="eyebrow">{`{ CATALOG }`}</p>
              <h2>
                Product catalog <span>for EDAB Electric LLC</span>
              </h2>
            </div>

            <div className="catalog-filters" role="tablist" aria-label="Product categories">
              <button className={activeCategory === "All" ? "active" : ""} onClick={() => setActiveCategory("All")} type="button">
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={`filter-${cat}`}
                  className={activeCategory === cat ? "active" : ""}
                  onClick={() => setActiveCategory(cat)}
                  type="button"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="catalog-grid">
            {filteredProducts.map((product) => (
              <article key={product.id} className="product-card">
                <div className="product-media">
                  <img src={product.image} alt={product.name} />
                  {product.badge ? <span className="badge">{product.badge}</span> : null}
                  <span className="chip">{product.category}</span>
                </div>

                <div className="product-body">
                  <div className="product-title-row">
                    <h3>{product.name}</h3>
                    <strong>{formatUSD(product.price)}</strong>
                  </div>

                  <p>{product.description}</p>

                  <ul className="spec-list">
                    {product.specs.map((spec) => (
                      <li key={`${product.id}-${spec}`}>{spec}</li>
                    ))}
                  </ul>

                  <div className="product-actions">
                    <a href="#contact" className="btn btn-small btn-primary">
                      Ask for this model
                    </a>
                    <button type="button" className="btn btn-small btn-outline">
                      Details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact-block section-shell">
          <div className="contact-panel">
            <div className="contact-copy">
              <p className="eyebrow">{`{ CONTACT }`}</p>
              <h2>
                Ready to find the
                <br />
                right electric ride?
              </h2>

              <p>
                Contact EDAB ELECTRIC LLC for pricing, availability, and model details. We can help you choose the best option
                based on your daily use, range, and budget.
              </p>

              <div className="contact-list">
                <a href="tel:+17869354994">(786) 935-4994</a>
                <p>765 NE 79th St Miami FL 33138</p>
                <p>Mon–Sat • 10:30 AM – 5:00 PM</p>
              </div>

              <div className="contact-visual-capsule">
                <span>MIAMI</span>
                <span>EDAB ELECTRIC LLC</span>
                <span>ELECTRIC MOBILITY</span>
              </div>
            </div>

            <form
              className="contact-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Form demo only. Later we can connect this to Netlify Forms or WhatsApp.");
              }}
            >
              <label>
                Name
                <input type="text" placeholder="Your name" />
              </label>

              <label>
                Phone or Email
                <input type="text" placeholder="How can we contact you?" />
              </label>

              <label>
                Interested In
                <select defaultValue="">
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option>Scooters</option>
                  <option>E-Bikes</option>
                </select>
              </label>

              <label>
                Message
                <textarea rows={4} placeholder="I’m interested in pricing / availability for..." />
              </label>

              <button type="submit" className="btn btn-primary form-submit">
                Send Inquiry
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer section-shell">
        <div className="footer-brand">
          <h3>EDAB ELECTRIC LLC</h3>
          <p>Electric scooters and e-bikes in Miami.</p>
        </div>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#catalog">Catalog</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <p className="footer-copy">© {new Date().getFullYear()} EDAB ELECTRIC LLC. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;