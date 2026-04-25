// src/data/products.ts

export type ProductCategory = "Scooters" | "E-Bikes";

export type Product = {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  badge?: string;
  image: string;
  description: string;
  specs: string[];
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Vogy E-Bike",
    category: "E-Bikes",
    price: 1000,
    badge: "Value",
    image: "/img/E-bike-Vogy.jpeg",
    description: "Affordable electric bike ideal for everyday city riding and quick errands.",
    specs: ["Great entry-level option", "City-friendly", "Budget focused"],
  },
  {
    id: 2,
    name: "Ben E-Bike",
    category: "E-Bikes",
    price: 2000,
    badge: "Popular",
    image: "/img/E-BIKE-BEN.jpeg",
    description: "Well-balanced e-bike with solid performance for daily commuting in Miami.",
    specs: ["Daily commuter", "Comfort + power", "Reliable build"],
  },
  {
    id: 3,
    name: "EVYBIKE E-Bike",
    category: "E-Bikes",
    price: 1750,
    image: "/img/E-BIKE-EVYBIKE.jpeg",
    description: "Clean design and smooth ride, perfect for practical city use.",
    specs: ["Smooth ride", "Urban friendly", "Mid-range performance"],
  },
  {
    id: 4,
    name: "Super R E-Bike",
    category: "E-Bikes",
    price: 2800,
    badge: "Best Seller",
    image: "/img/E-bike-super-R.jpeg",
    description: "Premium-style e-bike built for comfort, presence, and everyday performance.",
    specs: ["Premium design", "Comfort ride", "Strong presence"],
  },
  {
    id: 5,
    name: "Super 73 E-Bike",
    category: "E-Bikes",
    price: 3500,
    badge: "Featured",
    image: "/img/E-BIKE-SUPER-73.jpeg",
    description: "Iconic Super 73-style e-bike with a bold look and premium feel.",
    specs: ["Iconic design", "Premium feel", "Street-ready"],
  },
  {
    id: 6,
    name: "Solar E-Bike",
    category: "E-Bikes",
    price: 4500,
    badge: "Premium",
    image: "/img/E-BIKE-SOLAR.jpeg",
    description: "High-end electric bike with standout design and top-tier positioning.",
    specs: ["High-end", "Premium design", "Top tier option"],
  },
  {
    id: 7,
    name: "Dirt E-Bike",
    category: "E-Bikes",
    price: 4500,
    badge: "Top Tier",
    image: "/img/E-BIKE-DIRT.jpeg",
    description: "Off-road oriented e-bike with aggressive styling and strong performance.",
    specs: ["Off-road ready", "Premium build", "High performance"],
  },

  // 🔥 NUEVAS E-BIKES

  {
    id: 11,
    name: "Urban E-Bike X",
    category: "E-Bikes",
    price: 2500,
    badge: "New",
    image: "/img/ebike-new (1).jpeg",
    description: "Modern urban e-bike designed for smooth daily commuting and comfort.",
    specs: ["Urban design", "Smooth ride", "Reliable performance"],
  },
  {
    id: 12,
    name: "Street E-Bike Pro",
    category: "E-Bikes",
    price: 2600,
    badge: "New",
    image: "/img/ebike-new (2).jpeg",
    description: "Stylish e-bike with strong presence and balanced power for city use.",
    specs: ["Stylish build", "Balanced power", "Daily use"],
  },
  {
    id: 13,
    name: "Performance E-Bike R",
    category: "E-Bikes",
    price: 2700,
    badge: "New",
    image: "/img/ebike-new (3).jpeg",
    description: "High-performance e-bike with aggressive look and responsive ride.",
    specs: ["High performance", "Responsive", "Sport design"],
  },
  {
    id: 14,
    name: "Comfort E-Bike Plus",
    category: "E-Bikes",
    price: 2800,
    badge: "New",
    image: "/img/ebike-new (4).jpeg",
    description: "Comfort-focused e-bike ideal for longer rides and daily commuting.",
    specs: ["Comfort ride", "Long distance", "Stable"],
  },
  {
    id: 15,
    name: "Premium E-Bike S",
    category: "E-Bikes",
    price: 3000,
    badge: "New",
    image: "/img/ebike-new (5).jpeg",
    description: "Premium electric bike with powerful performance and refined design.",
    specs: ["Premium feel", "Powerful motor", "Modern design"],
  },
  {
    id: 16,
    name: "Elite E-Bike Max",
    category: "E-Bikes",
    price: 3200,
    badge: "New",
    image: "/img/ebike-new (6).jpeg",
    description: "Top-tier e-bike with strong presence and high-end performance.",
    specs: ["Top tier", "High power", "Elite build"],
  },

  // 🛴 SCOOTERS

  {
    id: 8,
    name: "Segway Electric Scooter",
    category: "Scooters",
    price: 600,
    badge: "Best Value",
    image: "/img/Electric-scooter-segway.jpeg",
    description: "Simple and reliable scooter for commuting and short-distance travel.",
    specs: ["Easy to use", "Reliable", "Great value"],
  },
  {
    id: 9,
    name: "Hiboy S2 Pro Scooter",
    category: "Scooters",
    price: 800,
    badge: "Popular",
    image: "/img/Electric-scooter-hiboy-s2-pro.jpeg",
    description: "Comfortable commuter scooter with a great balance of speed and ride quality.",
    specs: ["Commuter friendly", "Comfort ride", "Strong value"],
  },
  {
    id: 10,
    name: "E-Rev Off-Road Scooter",
    category: "Scooters",
    price: 1500,
    badge: "Off Road",
    image: "/img/Electric-scooter-e-rev-off-Road.jpeg",
    description: "Off-road scooter designed for tougher terrain and stronger performance.",
    specs: ["Off-road ready", "Durable build", "Premium performance"],
  },
];

export const categories: ProductCategory[] = ["Scooters", "E-Bikes"];

export function formatUSD(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}