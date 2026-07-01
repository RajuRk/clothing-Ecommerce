"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, Plus, Minus, ShoppingBag, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "react-toastify";

export default function CartPage() {
  const router = useRouter();

  // Extract states and methods from Zustand
  const cart = useCartStore((state) => state.cart);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getCartTotal = useCartStore((state) => state.getCartTotal());

  // Pricing calculations
  const totalMRP = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0,
  );
  const totalDiscount = totalMRP - getCartTotal;
  const shippingCharges = getCartTotal >= 999 || getCartTotal === 0 ? 0 : 99;
  const finalAmount = getCartTotal + shippingCharges;

  // Checkout order submission
  const handlePlaceOrder = () => {
    toast.success("Order placed successfully! Thank you for shopping with us.");
    clearCart(); // Empty the cart
    router.push("/"); // Redirect to homepage
  };

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 bg-gray-50 flex flex-col items-center justify-center text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-pink-50 text-pink-600">
          <ShoppingBag className="h-12 w-12" />
        </div>
        <h2 className="mt-6 text-2xl font-black text-gray-900">
          Your shopping bag is empty!
        </h2>
        <p className="mt-2 text-sm text-gray-500 max-w-sm">
          There are no items added to your bag. Browse our trending collections
          and add your favorite styles.
        </p>
        <Link
          href="/products"
          className="mt-8 rounded-md bg-pink-600 px-8 py-3 text-sm font-bold text-white tracking-widest hover:bg-pink-700 transition"
        >
          START SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-gray-50">
      <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8">
        Shopping Bag
      </h1>

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
        {/* LEFT COLUMN: List of Items (Takes 7 of 12 grid spaces) */}
        <div className="lg:col-span-7 space-y-4">
          {cart.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
            >
              {/* Product Image */}
              <div className="h-32 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-100 bg-gray-50">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>

              {/* Product Description details */}
              <div className="ml-5 flex flex-1 flex-col">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-gray-900 uppercase">
                      {item.brand}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500 line-clamp-1">
                      {item.name}
                    </p>
                    <p className="mt-2 text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded w-max">
                      Size: {item.size}
                    </p>
                  </div>

                  {/* Prices */}
                  <div className="text-right">
                    <span className="text-sm font-bold text-gray-900">
                      ₹{(item.discountPrice ?? item.price) * item.quantity}
                    </span>
                    {item.discountPrice && (
                      <p className="text-[10px] text-gray-400 line-through">
                        ₹{item.price * item.quantity}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bottom Row: Quantity Controls & Delete Action */}
                <div className="flex flex-1 items-end justify-between mt-4">
                  <div className="flex items-center border border-gray-200 rounded-md bg-white">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity - 1)
                      }
                      className="p-1 px-3 hover:bg-gray-50 text-gray-500 cursor-pointer"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-2 text-xs font-bold text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.size, item.quantity + 1)
                      }
                      className="p-1 px-3 hover:bg-gray-50 text-gray-500 cursor-pointer"
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

        {/* RIGHT COLUMN: Bill Summary (Takes 5 of 12 grid spaces) */}
        <div className="lg:col-span-5">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900">
              Price Details ({cart.length}{" "}
              {cart.length === 1 ? "Item" : "Items"})
            </h2>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Total MRP</span>
                <span>₹{totalMRP}</span>
              </div>
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount on MRP</span>
                <span>-₹{totalDiscount}</span>
              </div>
              <div className="flex justify-between">
                <span>Convenience / Shipping Fee</span>
                <span>
                  {shippingCharges === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    `₹${shippingCharges}`
                  )}
                </span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between text-lg font-black text-gray-900">
                <span>Total Amount</span>
                <span>₹{finalAmount}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full flex items-center justify-center rounded-md bg-pink-600 py-4 font-bold text-white transition hover:bg-pink-700 shadow-md cursor-pointer"
            >
              PLACE ORDER
            </button>

            {/* Security Guarantee Badge */}
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 border-t border-gray-100 pt-4">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>100% Secure Payments | Safe Ordering Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
