// src/data/products.ts
export type ProductCategory = "Scooters" | "E-Bikes";

export type Product = {
  id: number;
  name: string;
  category: ProductCategory;
  price: number; // USD (ej 1000, 1999.99)
  badge?: string;
  image: string; // preferiblemente "/img/..."
  description: string;
  specs: string[];
};

export const PRODUCTS: Product[] = [
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
    price: 4500,
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

export const categories: ProductCategory[] = ["Scooters", "E-Bikes"];

export function formatUSD(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    // Si mañana ponés 1299.99, se va a ver bien.
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}