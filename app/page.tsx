"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Subtitles } from "lucide-react";
import { products } from "../data/products";
import { ProductCard } from "@/components/ProductCard";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      id: 1,
      image: "/assets/banners/banner-img-1.jpg",
      title: "SUMMER COLLECTION",
      subtitle: "Comfort meets style. Up to 50% OFF",
      link: "/products?category=Men",
    },
    {
      id: 2,
      image: "/assets/banners/banner-img-2.jpg",
      title: "ELEGANT ETHNIC WEAR",
      subtitle: "Celebrate traditions in designer outfits",
      link: "/products?category=Women",
    },
    {
      id: 3,
      image: "/assets/banners/banner-img-3.jpg",
      title: "ACTIVEWEAR SALE",
      subtitle: "Step into motion. Gear up for fitness",
      link: "/products?category=Activewear",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const categoriesList = [
    { name: "Men", image: "/assets/categories/men.png" },
    { name: "Women", image: "/assets/categories/women.png" },
    { name: "Kids", image: "/assets/categories/kids.png" },
    { name: "Activewear", image: "/assets/categories/activewear.png" },
    { name: "Footwear", image: "/assets/categories/footwear.png" },
  ];

  // Take the first 4 products from database as "Featured"
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="pb-16 bg-gray-50">
      {/* SECTION 1: Interactive Hero Banner Slider */}
      <section className="relative w-full overflow-hidden bg-gray-100 h-[240px] sm:h-[350px] md:h-[450px]">
        {/* Banner Image wrap */}
        <div
          className="flex h-full w-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="relative h-full w-full flex-shrink-0"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="h-full w-full object-cover object-center"
              />
              {/* Dynamic text overlaid in code instead of image */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent flex items-center px-8 sm:px-16 md:px-24">
                <div className="max-w-md text-white">
                  <h2 className="text-xl sm:text-3xl md:text-5xl font-black leading-tight tracking-tight uppercase">
                    {banner.title}
                  </h2>
                  <p className="mt-1 sm:mt-3 text-xs sm:text-base md:text-lg font-medium text-gray-200">
                    {banner.subtitle}
                  </p>
                  <Link
                    href={banner.link}
                    className="inline-block mt-3 sm:mt-6 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs sm:text-sm px-4 sm:px-6 py-2 rounded-md transition shadow-md"
                  >
                    SHOP NOW
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Left Arrow Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/40 p-2 text-gray-800 hover:bg-white/80 transition backdrop-blur-sm shadow"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        {/* Right Arrow Controls */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/40 p-2 text-gray-800 hover:bg-white/80 transition backdrop-blur-sm shadow"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-pink-600 w-6" : "bg-white/65"
              }`}
            />
          ))}
        </div>
      </section>

      {/* SECTION 2: Top Categories Circular Tiles */}
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-widest text-gray-900 text-center">
          Categories To Bag
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {categoriesList.map((cat) => (
            <Link
              key={cat.name}
              href={`/products?category=${cat.name}`}
              className="group flex flex-col items-center"
            >
              {/* Category Circle Image with glow hover */}
              <div className="relative h-52 w-52 sm:h-48 sm:w-48 overflow-hidden rounded-full border-2 border-gray-100 bg-white transition duration-300 group-hover:border-pink-500 group-hover:shadow-md">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                />
              </div>
              <span className="mt-3 text-xs sm:text-sm font-extrabold text-gray-800 group-hover:text-pink-600 transition uppercase tracking-wider">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>
      {/* SECTION 3: Featured Products Grid */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-gray-200 pb-5">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-widest text-gray-900">
            Trending Items
          </h2>
          <Link
            href="/products"
            className="text-sm font-bold text-pink-600 hover:text-pink-700 transition"
          >
            See All Products ➔
          </Link>
        </div>
        {/* 4-Column Responsive Grid */}
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-x-6 sm:gap-y-10">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
