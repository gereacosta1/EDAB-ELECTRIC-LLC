// src/data/products.ts

export type ProductCategory = "Cars" | "SUVs" | "Trucks";

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
    name: "2018 Nissan Altima",
    category: "Cars",
    price: 8990,
    badge: "Value",
    image: "/img/moto1.png",
    description: "Reliable sedan with a comfortable ride, great fuel economy, and practical everyday features.",
    specs: ["Automatic transmission", "Fuel efficient", "Great daily driver"],
  },
  {
    id: 2,
    name: "2017 Toyota Corolla",
    category: "Cars",
    price: 9490,
    badge: "Popular",
    image: "/img/moto2.jpg",
    description: "Dependable compact sedan known for low maintenance costs, comfort, and long-term reliability.",
    specs: ["Excellent reliability", "Gas saver", "Clean interior"],
  },
  {
    id: 3,
    name: "2019 Honda Civic",
    category: "Cars",
    price: 12990,
    badge: "Featured",
    image: "/img/moto2.png",
    description: "Stylish and efficient sedan with a sporty feel, modern design, and strong resale value.",
    specs: ["Sporty design", "Modern features", "Fuel efficient"],
  },
  {
    id: 4,
    name: "2018 Hyundai Elantra",
    category: "Cars",
    price: 8490,
    badge: "Budget Friendly",
    image: "/img/moto3.png",
    description: "Affordable sedan with a smooth drive, comfortable cabin, and practical features for daily use.",
    specs: ["Affordable option", "Comfortable ride", "Easy to maintain"],
  },
  {
    id: 5,
    name: "2020 Kia Forte",
    category: "Cars",
    price: 11990,
    badge: "New Arrival",
    image: "/img/scooter1.png",
    description: "Clean and modern sedan with sharp styling, efficient performance, and everyday practicality.",
    specs: ["Modern look", "Great value", "Daily commuter"],
  },
  {
    id: 6,
    name: "2018 Chevrolet Malibu",
    category: "Cars",
    price: 10990,
    image: "/img/scooter2.png",
    description: "Spacious midsize sedan with a smooth ride, comfortable seating, and solid road presence.",
    specs: ["Spacious cabin", "Smooth drive", "Midsize comfort"],
  },
  {
    id: 7,
    name: "2017 Ford Fusion",
    category: "Cars",
    price: 9990,
    image: "/img/scooter3.png",
    description: "Comfortable sedan with a refined look, practical features, and a confident driving feel.",
    specs: ["Comfort focused", "Strong road feel", "Great value"],
  },
  {
    id: 8,
    name: "2019 Toyota Camry",
    category: "Cars",
    price: 15990,
    badge: "Best Seller",
    image: "/img/ebike-new (1).jpeg",
    description: "Popular midsize sedan with strong reliability, excellent comfort, and a premium everyday feel.",
    specs: ["Reliable choice", "Spacious interior", "Excellent comfort"],
  },
  {
    id: 9,
    name: "2018 Nissan Rogue",
    category: "SUVs",
    price: 12990,
    badge: "SUV Deal",
    image: "/img/ebike-new (2).jpeg",
    description: "Practical SUV with good cargo space, comfortable seating, and a smooth daily driving experience.",
    specs: ["Roomy interior", "Great cargo space", "Family friendly"],
  },
  {
    id: 10,
    name: "2017 Honda CR-V",
    category: "SUVs",
    price: 14990,
    badge: "Popular SUV",
    image: "/img/ebike-new (3).jpeg",
    description: "Reliable SUV with excellent practicality, strong comfort, and a reputation for long-term value.",
    specs: ["Reliable SUV", "Comfortable cabin", "Great daily option"],
  },
  {
    id: 11,
    name: "2019 Hyundai Tucson",
    category: "SUVs",
    price: 13990,
    image: "/img/ebike-new (4).jpeg",
    description: "Compact SUV with modern styling, comfortable ride quality, and useful everyday features.",
    specs: ["Compact SUV", "Modern design", "Comfort ride"],
  },
  {
    id: 12,
    name: "2020 Kia Sportage",
    category: "SUVs",
    price: 15990,
    badge: "Featured SUV",
    image: "/img/ebike-new (5).jpeg",
    description: "Clean SUV with a strong look, comfortable cabin, and practical space for daily driving.",
    specs: ["Clean condition", "Practical space", "Modern features"],
  },
  {
    id: 13,
    name: "2018 Ford Escape",
    category: "SUVs",
    price: 11990,
    image: "/img/ebike-new (6).jpeg",
    description: "Versatile SUV with easy handling, comfortable seating, and useful cargo space.",
    specs: ["Easy to drive", "Versatile", "Good cargo room"],
  },
  {
    id: 14,
    name: "2017 Ford F-150",
    category: "Trucks",
    price: 18990,
    badge: "Truck Deal",
    image: "/img/E-BIKE-DIRT.jpeg",
    description: "Strong pickup truck with practical capability, bold styling, and everyday utility.",
    specs: ["Pickup truck", "Strong utility", "Work ready"],
  },
  {
    id: 15,
    name: "2018 Chevrolet Silverado",
    category: "Trucks",
    price: 20990,
    badge: "Powerful",
    image: "/img/E-BIKE-SUPER-73.jpeg",
    description: "Capable full-size truck with strong presence, useful bed space, and reliable performance.",
    specs: ["Full-size truck", "Strong presence", "Useful bed space"],
  },
  {
    id: 16,
    name: "2019 Ram 1500",
    category: "Trucks",
    price: 22990,
    badge: "Premium Truck",
    image: "/img/E-BIKE-BEN.jpeg",
    description: "Comfortable and capable truck with a refined feel, strong performance, and practical utility.",
    specs: ["Comfortable truck", "Strong performance", "Premium feel"],
  },
];

export const categories: ProductCategory[] = ["Cars", "SUVs", "Trucks"];

export function formatUSD(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}