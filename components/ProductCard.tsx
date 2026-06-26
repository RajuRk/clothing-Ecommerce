"use client";

import React from "react";
import Link from "next/link";
import { Star, ShoppingBag } from "lucide-react";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const handleAddToBag = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents clicking the button from navigating to the details page

    // Temporary alert until we build the Zustand cart store
    alert(
      `Added ${product.brand} - ${product.name} (Size: ${product.sizes[0]}) to your Bag!`,
    );
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white transition-all duration-300 hover:shadow-md hover:border-pink-100">
      {/* Product Link wrap */}
      <Link href={`/products/${product.id}`} className="flex-grow">
        {/* Product Image Section */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />

          {/* Rating Badge (overlayed on image) */}
          <div className="absolute bottom-2.5 left-2.5 flex items-center space-x-1 rounded bg-white/90 px-2 py-0.5 text-xs font-bold text-gray-800 backdrop-blur-sm shadow-sm">
            <span className="flex items-center">
              {product.ratings}{" "}
              <Star className="ml-0.5 h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            </span>
            <span className="text-gray-400 border-l border-gray-200 pl-1">
              {product.reviewsCount >= 1000
                ? `${(product.reviewsCount / 1000).toFixed(1)}k`
                : product.reviewsCount}
            </span>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col p-4">
          {/* Brand name */}
          <h3 className="text-sm font-extrabold tracking-tight text-gray-900 uppercase">
            {product.brand}
          </h3>

          {/* Product short description */}
          <p className="mt-1 text-xs text-gray-500 line-clamp-1">
            {product.name}
          </p>

          {/* Pricing Row */}
          <div className="mt-2.5 flex items-baseline space-x-1.5 text-sm">
            <span className="font-extrabold text-gray-900">
              ₹{product.discountPrice}
            </span>
            <span className="text-xs text-gray-400 line-through">
              ₹{product.price}
            </span>
            <span className="text-xs font-bold text-pink-600">
              ({product.discountPercent}% OFF)
            </span>
          </div>
        </div>
      </Link>

      {/* Add to Bag Button */}
      <div className="p-4 pt-0">
        <button
          onClick={handleAddToBag}
          className="flex w-full items-center justify-center space-x-2 rounded-md bg-pink-600 py-2 text-xs font-bold text-white transition hover:bg-pink-700 shadow-sm focus:outline-none"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>ADD TO BAG</span>
        </button>
      </div>
    </div>
  );
};
