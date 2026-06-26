"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { products, Product } from "@/data/products";
import { ProductCard } from "../../components/ProductCard";

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read URL search params
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search");

  // Local state for filters
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParam,
  );
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(10000);

  // Sync state with URL changes (e.g., if a user clicks a Category in the Navbar)
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  // Extract all unique brands from our mock database dynamically for the sidebar filter
  const allBrands = Array.from(new Set(products.map((p) => p.brand)));

  const filteredProducts = products.filter((product) => {
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }

    if (selectedBrand && product.brand !== selectedBrand) {
      return false;
    }

    const activePrice = product.discountPrice ?? product.price;

    if (activePrice > maxPrice) {
      return false;
    }

    if (searchParam) {
      const query = searchParam.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(query);
      const matchesBrand = product.brand.toLowerCase().includes(query);
      const matchesSub = product.subcategory.toLowerCase().includes(query);

      if (!matchesName && !matchesBrand && !matchesSub) {
        return false;
      }
    }
    return true;
  });

  // Updates the browser URL query string when category filters are toggled
  const updateUrlParams = (category: string | null) => {};

  const handleCategoryChange = (category: string) => {};

  const handleBrandChange = (brand: string) => {};

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-black tracking-tight text-gray-900 uppercase">
          {searchParam
            ? `Search Results for "${searchParam}"`
            : selectedCategory
              ? `${selectedCategory} Clothing`
              : "All Collections"}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          {filteredProducts.length} items found matching your selections
        </p>
      </div>

      <div className="mt-8 flex flex-col lg:flex-row gap-8">
        {/* SIDEBAR FILTERS PANEL */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-28 rounded-lg border border-gray-200 bg-white p-6 shadow-sm space-y-8">
            {/* Category selection list */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2">
                Categories
              </h3>
              <div className="mt-4 space-y-3">
                {["Men", "Women", "Kids", "Activewear", "Footwear"].map(
                  (cat) => (
                    <label
                      key={cat}
                      className="flex items-center space-x-3 text-sm text-gray-600 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategory === cat}
                        onChange={() => handleCategoryChange(cat)}
                        className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                      />
                      <span
                        className={
                          selectedCategory === cat
                            ? "font-bold text-pink-600"
                            : ""
                        }
                      >
                        {cat}
                      </span>
                    </label>
                  ),
                )}
              </div>
            </div>

            {/* Brand selection checklist */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2">
                Brands
              </h3>
              <div className="mt-4 space-y-3 max-h-48 overflow-y-auto pr-2">
                {allBrands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center space-x-3 text-sm text-gray-600 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrand === brand}
                      onChange={() => handleBrandChange(brand)}
                      className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                    />
                    <span
                      className={
                        selectedBrand === brand ? "font-bold text-pink-600" : ""
                      }
                    >
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Max Price Range Slider */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-2">
                Max Price (₹{maxPrice})
              </h3>
              <div className="mt-4">
                <input
                  type="range"
                  min="400"
                  max="10000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-600"
                />
                <div className="mt-2 flex justify-between text-xs text-gray-400">
                  <span>₹400</span>
                  <span>₹10,000</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* PRODUCTS LISTING GRID */}
        <div className="flex-grow">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 py-24 text-center">
              <p className="text-lg font-semibold text-gray-900">
                No items found
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your filters or search terms.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedBrand(null);
                  setMaxPrice(10000);
                  router.push("/products");
                }}
                className="mt-6 rounded-md bg-pink-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-pink-700"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
