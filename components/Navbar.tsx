"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  LogOut,
  ShieldAlert,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCartStore } from "@/store/useCartStore";

export const Navbar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // 2. Destructure real user and logout action from AuthContext
  const { user, logout } = useAuth();

  // Temporary mock values for cart and wishlist (we will connect Zustand next!)
  const cartCount = useCartStore((state) => state.getCartCount());
  const toggleCart = useCartStore((state) => state.toggleCart);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push(`/products`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* 1. Brand Logo */}
        <div className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-gray-900"
          >
            FASHION<span className="text-pink-600">HUB</span>
          </Link>
        </div>

        {/* 2. Navigation Links */}
        <nav className="hidden md:ml-6 md:flex md:space-x-8">
          {["Men", "Women", "Kids", "Activewear", "Footwear"].map(
            (category) => (
              <Link
                key={category}
                href={`/products?category=${category}`}
                className="relative inline-flex items-center px-1 pt-1 text-sm font-semibold tracking-wide text-gray-700 transition hover:text-pink-600 after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:scale-x-0 after:bg-pink-600 after:transition-transform after:duration-200 hover:after:scale-x-100"
              >
                {category.toUpperCase()}
              </Link>
            ),
          )}
        </nav>

        {/* 3. Search Bar */}
        <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
          <form className="w-full max-w-lg lg:max-w-xs">
            <div className="relative text-gray-400 focus-within:text-gray-600">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5" />
              </div>
              <input
                className="block w-full rounded-md border border-gray-200 bg-gray-50 py-2 pl-10 pr-3 text-sm placeholder-gray-500 transition focus:border-pink-500 focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-1 focus:ring-pink-500"
                placeholder="Search styles..."
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>

        {/* 4. Actions (Profile, Wishlist, Bag) */}
        <div className="flex items-center space-x-6 ml-4">
          {/* Profile Button */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex flex-col items-center justify-center text-gray-700 hover:text-pink-600 transition"
            >
              <User className="h-6 w-6" />
              {/* Show the user's first name if logged in, otherwise "Profile" */}
              <span className="hidden sm:block text-[10px] font-bold mt-0.5 max-w-[60px] truncate text-center">
                {user ? user.name.split(" ")[0] : "Profile"}
              </span>
            </button>
            {/* Profile Dropdown (Static Toggle) */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-3 w-52 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                {user ? (
                  // Logged In Options
                  <>
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide">
                        Logged in as ({user.role})
                      </p>
                      <p className="text-sm font-semibold text-gray-900 truncate mt-0.5">
                        {user.email}
                      </p>
                    </div>
                    {/* Admin Dashboard link (Only visible to admin role) */}
                    {user.role === "admin" && (
                      <Link
                        href="/admin"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex w-full items-center px-4 py-2 text-sm text-pink-600 hover:bg-pink-50 font-bold"
                      >
                        <ShieldAlert className="mr-2 h-4 w-4" /> Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileMenuOpen(false);
                      }}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-50 font-semibold"
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsProfileMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-semibold"
                  >
                    Log In / Sign Up
                  </Link>
                )}
              </div>
            )}
          </div>
          {/* Wishlist Icon */}
          <Link
            href="/products"
            className="hidden sm:flex flex-col items-center justify-center text-gray-700 hover:text-pink-600 transition"
          >
            <Heart className="h-6 w-6" />
            <span className="text-[10px] font-bold mt-0.5">Wishlist</span>
          </Link>
          {/* Shopping Bag Icon */}
          <button
            onClick={() => toggleCart(true)}
            className="relative flex flex-col items-center justify-center text-gray-700 hover:text-pink-600 transition"
          >
            <div className="relative">
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:block text-[10px] font-bold mt-0.5">
              Bag
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
