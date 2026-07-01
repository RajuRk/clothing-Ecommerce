"use client";

import React, { useEffect, useState } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";

export const CartDrawer = () => {
  // 1. Add a mount state to prevent Next.js server-vs-client hydration crashes
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 2. Select specific states from Zustand to optimize re-renders
  const cart = useCartStore((state) => state.cart);
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getCartTotal = useCartStore((state) => state.getCartTotal());
  const getCartCount = useCartStore((state) => state.getCartCount());

  // Prevent background scrolling when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  // If not fully mounted on client or not open, render nothing
  if (!isMounted || !isCartOpen) return null;

  // Price calculations
  const totalMRP = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0,
  );
  const totalDiscount = totalMRP - getCartTotal;
  const shippingCharges = getCartTotal >= 999 || getCartTotal === 0 ? 0 : 99;
  const finalAmount = getCartTotal + shippingCharges;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop Backdrop Overlay */}
      <div
        onClick={() => toggleCart(false)}
        className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-300 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      />

      {/* Drawer Container */}
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md transform bg-white shadow-xl flex flex-col h-full transition-transform duration-300">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
            <h2 className="text-lg font-bold text-gray-900 flex items-center">
              Shopping Bag ({getCartCount})
            </h2>
            <button
              onClick={() => toggleCart(false)}
              className="text-gray-400 hover:text-gray-500 focus:outline-none cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Drawer Body (Scrollable List) */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cart.length === 0 ? (
              // Empty State
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-pink-50 text-pink-600">
                  <ShoppingBag className="h-10 w-10" />
                </div>
                <h3 className="mt-6 text-base font-bold text-gray-900">
                  Your bag is empty
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Add items to get started on your shopping journey.
                </p>
                <button
                  onClick={() => toggleCart(false)}
                  className="mt-8 rounded-md bg-pink-600 px-6 py-3 text-xs font-bold text-white tracking-widest hover:bg-pink-700 transition cursor-pointer"
                >
                  START SHOPPING
                </button>
              </div>
            ) : (
              // Items List
              <div className="space-y-6">
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="flex py-4 border-b border-gray-100 last:border-0"
                  >
                    {/* Item Image */}
                    <div className="h-28 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    {/* Specifications */}
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-sm font-extrabold text-gray-900 uppercase">
                          <h3>{item.brand}</h3>
                          <p className="ml-4">
                            ₹
                            {(item.discountPrice ?? item.price) * item.quantity}
                          </p>
                        </div>
                        <p className="mt-1 text-xs text-gray-500 line-clamp-1">
                          {item.name}
                        </p>
                        <p className="mt-2 text-xs font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded w-max">
                          Size: {item.size}
                        </p>
                      </div>

                      {/* Controls */}
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center border border-gray-200 rounded-md">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.size,
                                item.quantity - 1,
                              )
                            }
                            className="p-1 px-2.5 hover:bg-gray-50 text-gray-500 cursor-pointer"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.size,
                                item.quantity + 1,
                              )
                            }
                            className="p-1 px-2.5 hover:bg-gray-50 text-gray-500 cursor-pointer"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id, item.size)}
                          className="flex items-center text-xs font-bold text-red-500 hover:text-red-700 cursor-pointer"
                        >
                          <Trash2 className="mr-1 h-4 w-4" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Summary */}
          {cart.length > 0 && (
            <div className="border-t border-gray-100 px-6 py-6 bg-gray-50 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900">
                Price Details
              </h3>

              <div className="space-y-2.5 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Total MRP</span>
                  <span>₹{totalMRP}</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount on MRP</span>
                  <span>-₹{totalDiscount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Convenience Fee / Shipping</span>
                  <span>
                    {shippingCharges === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `₹${shippingCharges}`
                    )}
                  </span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-base font-black text-gray-900">
                  <span>Total Amount</span>
                  <span>₹{finalAmount}</span>
                </div>
              </div>

              <Link
                href="/cart"
                onClick={() => toggleCart(false)}
                className="mt-6 flex items-center justify-center rounded-md bg-pink-600 py-3.5 text-sm font-bold text-white transition hover:bg-pink-700 shadow-md cursor-pointer"
              >
                PLACE ORDER
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
