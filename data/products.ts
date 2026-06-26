export interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number; // Original Price (MRP)
  discountPrice: number; // Discounted Price
  discountPercent: number; // Discount Percentage (e.g., 40% OFF)
  category: "Men" | "Women" | "Kids" | "Activewear" | "Footwear";
  subcategory: string;
  images: string[]; // Array of image URLs for galleries
  sizes: string[]; // Available sizes: ["S", "M", "L", "XL"]
  ratings: number; // Rating out of 5 (e.g., 4.2)
  reviewsCount: number; // Total reviews (e.g., 840)
  inStock: boolean;
}

export const products: Product[] = [
  // Men's Wear
  {
    id: 1,
    name: "Men Slim Fit Cotton Casual Shirt",
    brand: "Roadster",
    description:
      "Pure cotton solid casual shirt, has a spread collar, long sleeves, button placket, curved hem, and one patch pocket. Perfect for casual outings and semi-formal wear.",
    price: 1499,
    discountPrice: 899,
    discountPercent: 40,
    category: "Men",
    subcategory: "Shirts",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600",
      "https://images.unsplash.com/photo-1588359348347-9bc6cbaa689f?q=80&w=600",
    ],
    sizes: ["S", "M", "L", "XL"],
    ratings: 4.2,
    reviewsCount: 1450,
    inStock: true,
  },
  {
    id: 2,
    name: "Men Regular Fit Denim Jacket",
    brand: "WROGN",
    description:
      "Blue solid denim jacket, has a spread collar, 4 pockets, button closures, long sleeves, straight hem. High-quality heavy denim made to last.",
    price: 3499,
    discountPrice: 1899,
    discountPercent: 45,
    category: "Men",
    subcategory: "Jackets",
    images: [
      "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?q=80&w=600",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=600",
    ],
    sizes: ["M", "L", "XL"],
    ratings: 4.5,
    reviewsCount: 890,
    inStock: true,
  },
  {
    id: 3,
    name: "Men Crew Neck Fitted T-Shirt",
    brand: "HRX by Hrithik Roshan",
    description:
      "Lightweight, breathable sportswear t-shirt with Rapid-Dry technology to wick away sweat during workouts or casual summer days.",
    price: 999,
    discountPrice: 499,
    discountPercent: 50,
    category: "Men",
    subcategory: "Tshirts",
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600",
    ],
    sizes: ["S", "M", "L", "XL"],
    ratings: 4.1,
    reviewsCount: 2310,
    inStock: true,
  },
  // Women's Wear
  {
    id: 4,
    name: "Women A-Line Floral Printed Dress",
    brand: "Tokyo Talkies",
    description:
      "Red floral print A-line dress, has a V-neck, short sleeves, flared hemline. Perfect summer outfit for outdoor gatherings.",
    price: 2199,
    discountPrice: 1099,
    discountPercent: 50,
    category: "Women",
    subcategory: "Dresses",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=600",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600",
    ],
    sizes: ["XS", "S", "M", "L"],
    ratings: 4.4,
    reviewsCount: 1020,
    inStock: true,
  },
  {
    id: 5,
    name: "Women Cotton Linen Casual Top",
    brand: "Here&Now",
    description:
      "Sage green solid casual top with regular fit, round neck, drop-shoulder short sleeves, and tie-up details at the back.",
    price: 1299,
    discountPrice: 779,
    discountPercent: 40,
    category: "Women",
    subcategory: "Tops",
    images: [
      "https://images.unsplash.com/photo-1534126511673-b6899657816a?q=80&w=600",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600",
    ],
    sizes: ["S", "M", "L"],
    ratings: 4.3,
    reviewsCount: 680,
    inStock: true,
  },
  // Kids' Wear
  {
    id: 6,
    name: "Boys Printed Cotton Sweatshirt",
    brand: "H&M Kids",
    description:
      "Long-sleeved sweatshirt in lightweight cotton fabric with a printed graphic pattern on the front. Ribbing around the neckline, cuffs, and hem.",
    price: 1199,
    discountPrice: 719,
    discountPercent: 40,
    category: "Kids",
    subcategory: "Sweatshirts",
    images: [
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=600",
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=600",
    ],
    sizes: ["2-3Y", "3-4Y", "5-6Y", "7-8Y"],
    ratings: 4.6,
    reviewsCount: 320,
    inStock: true,
  },
  {
    id: 7,
    name: "Girls Denim Dungarees set",
    brand: "Gini & Jony",
    description:
      "A pair of denim dungarees paired with a striped cotton t-shirt. Dungarees feature adjustable shoulder straps, multiple pockets, and button sides.",
    price: 2499,
    discountPrice: 1499,
    discountPercent: 40,
    category: "Kids",
    subcategory: "Dungarees",
    images: [
      "https://images.unsplash.com/photo-1622295057285-ed0f380da7a8?q=80&w=600",
      "https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?q=80&w=600",
    ],
    sizes: ["3-4Y", "5-6Y", "7-8Y"],
    ratings: 4.2,
    reviewsCount: 150,
    inStock: true,
  },
  // Activewear
  {
    id: 8,
    name: "Men Dynamic Training Tracksuit",
    brand: "Puma",
    description:
      "Fully athletic training tracksuit. Jacket features a full zip, stand-up collar, and side pockets. Pants feature an elastic waistband with drawcord.",
    price: 4999,
    discountPrice: 2999,
    discountPercent: 40,
    category: "Activewear",
    subcategory: "Tracksuits",
    images: [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600",
      "https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=600",
    ],
    sizes: ["S", "M", "L", "XL"],
    ratings: 4.7,
    reviewsCount: 512,
    inStock: true,
  },
  // Footwear
  {
    id: 9,
    name: "Air Max Red Cushioned Sneakers",
    brand: "Nike",
    description:
      "Iconic Air Max cushioning provides responsive bounce during walking and running. Breathable mesh upper with premium leather overlays.",
    price: 8999,
    discountPrice: 5399,
    discountPercent: 40,
    category: "Footwear",
    subcategory: "Sports Shoes",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=600",
    ],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
    ratings: 4.8,
    reviewsCount: 3840,
    inStock: true,
  },
  {
    id: 10,
    name: "Unisex Classic White Sneakers",
    brand: "Puma",
    description:
      "A retro court style made of durable synthetic leather. Clean white silhouette with signature Puma stripe detail.",
    price: 3999,
    discountPrice: 2399,
    discountPercent: 40,
    category: "Footwear",
    subcategory: "Sneakers",
    images: [
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=600",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600",
    ],
    sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"],
    ratings: 4.3,
    reviewsCount: 1980,
    inStock: true,
  },
];
