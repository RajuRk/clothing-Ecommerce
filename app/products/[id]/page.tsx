"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { products } from "../../../data/products";
import {
  Star,
  ShoppingBag,
  Heart,
  ShieldCheck,
  RefreshCw,
  Truck,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();

  // 1. Read the product ID from the dynamic URL (e.g. /products/2 -> params.id is "2")
  const productId = Number(params.id);

  // 2. Fetch the matching product from our database
  const product = products.find((p) => p.id === productId);

  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    product?.images[0],
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Fallback: If the user manually typed a wrong URL or ID doesn't exist
  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Product Not Found</h2>
        <p className="mt-2 text-gray-500">
          The product you are looking for does not exist.
        </p>
        <button
          onClick={() => router.push("/products")}
          className="mt-6 rounded-md bg-pink-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-pink-700"
        >
          Back to Shopping
        </button>
      </div>
    );
  }

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to the bag!");
      return;
    }
    alert(`Added to Bag! Brand: ${product.brand}, Size: ${selectedSize}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-gray-50">
      {/* 2-Column Grid: Left side for photos, Right side for purchasing details */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
        {/* COLUMN 1: Image Gallery */}
        <div className="space-y-4">
          {/* Main Display Image */}
          <div className="aspect-[3/4] w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
            <img
              src={selectedImage}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
          {/* Thumbnail list selector */}
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`aspect-square overflow-hidden rounded-md border-2 bg-white ${
                  selectedImage === img ? "border-pink-500" : "border-gray-200"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className="h-full w-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>
        {/* COLUMN 2: Specs & Add to Bag (Right) */}
        <div className="flex flex-col">
          {/* Brand Name */}
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
            {product.brand}
          </h1>
          {/* Short Description Title */}
          <p className="mt-1 text-lg text-gray-500 font-medium">
            {product.name}
          </p>
          {/* Ratings & reviews block */}
          <div className="mt-3 flex items-center space-x-2">
            <div className="flex items-center rounded border border-gray-200 bg-white px-2 py-0.5 text-sm font-bold text-gray-800">
              {product.ratings}{" "}
              <Star className="ml-1 h-4 w-4 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-sm font-semibold text-gray-400 border-l border-gray-200 pl-3">
              {product.reviewsCount} Ratings
            </span>
          </div>
          <hr className="my-5 border-gray-200" />
          {/* Price Block */}
          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-black text-gray-900">
              ₹{product.discountPrice}
            </span>
            <span className="text-lg text-gray-400 line-through">
              MRP ₹{product.price}
            </span>
            <span className="text-lg font-bold text-pink-600">
              ({product.discountPercent}% OFF)
            </span>
          </div>
          <p className="text-xs font-bold text-emerald-600 mt-1 uppercase tracking-wide">
            Inclusive of all taxes
          </p>
          {/* Interactive Size Buttons */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                Select Size
              </h2>
            </div>
            <div className="mt-3 flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex h-12 min-w-12 items-center justify-center rounded-full border px-4 text-sm font-bold transition-all focus:outline-none ${
                    selectedSize === size
                      ? "border-pink-500 bg-pink-50 text-pink-600 ring-1 ring-pink-500"
                      : "border-gray-200 bg-white text-gray-800 hover:border-gray-900"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          {/* Action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            {/* Add to Bag CTA */}
            <button
              onClick={handleAddToBag}
              className="flex flex-1 items-center justify-center space-x-2 rounded-md bg-pink-600 py-4 font-bold text-white transition hover:bg-pink-700 shadow-md focus:outline-none"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>ADD TO BAG</span>
            </button>
            {/* Wishlist CTA */}
            <button className="flex items-center justify-center space-x-2 rounded-md border border-gray-300 bg-white px-6 py-4 font-bold text-gray-700 hover:border-gray-950 transition">
              <Heart className="h-5 w-5" />
              <span>WISHLIST</span>
            </button>
          </div>
          <hr className="my-8 border-gray-200" />
          {/* Trust badges */}
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex items-center space-x-3">
              <Truck className="h-5 w-5 text-gray-900" />
              <span>Get free shipping on orders above ₹999</span>
            </div>
            <div className="flex items-center space-x-3">
              <RefreshCw className="h-5 w-5 text-gray-900" />
              <span>Easy 14 days returns and exchanges</span>
            </div>
            <div className="flex items-center space-x-3">
              <ShieldCheck className="h-5 w-5 text-gray-900" />
              <span>100% original product guarantee</span>
            </div>
          </div>
          <hr className="my-8 border-gray-200" />
          {/* Detailed Description */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
              Product Details
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
