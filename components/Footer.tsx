import React from "react";
import Link from "next/link";
import { ShieldCheck, RefreshCw } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-gray-50 text-gray-600">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* 1. Grid Links Columns */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {/* Column A: Online Shopping */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900">
              Online Shopping
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {["Men", "Women", "Kids", "Activewear", "Footwear"].map(
                (category) => (
                  <li key={category}>
                    <Link
                      href={`/products?category=${category}`}
                      className="transition hover:text-gray-900"
                    >
                      {category} Wear
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Column B: Customer Policies */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900">
              Customer Policies
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                "Contact Us",
                "FAQ",
                "T&C",
                "Terms Of Use",
                "Track Orders",
                "Shipping",
                "Cancellation",
                "Returns",
              ].map((policy) => (
                <li key={policy}>
                  <Link href="#" className="transition hover:text-gray-900">
                    {policy}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column C: Useful Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900">
              Useful Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                "Blog",
                "Careers",
                "Site Map",
                "Whitehat",
                "Cleartrip",
                "Corporate Info",
              ].map((link) => (
                <li key={link}>
                  <Link href="#" className="transition hover:text-gray-900">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column D: App Download Promotion */}
          <div className="sm:col-span-2 md:col-span-1 lg:col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900">
              Experience App On Mobile
            </h3>
            <div className="mt-4 flex flex-col space-y-3">
              {/* Google Play Button */}
              <a
                href="#"
                className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50 transition"
              >
                <span className="text-left">
                  <p className="text-[10px] text-gray-500 uppercase leading-none font-bold">
                    Get it on
                  </p>
                  <p className="text-xs text-gray-900 font-bold leading-tight mt-0.5">
                    Google Play
                  </p>
                </span>
              </a>
              {/* App Store Button */}
              <a
                href="#"
                className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50 transition"
              >
                <span className="text-left">
                  <p className="text-[10px] text-gray-500 uppercase leading-none font-bold">
                    Download on the
                  </p>
                  <p className="text-xs text-gray-900 font-bold leading-tight mt-0.5">
                    App Store
                  </p>
                </span>
              </a>
            </div>
          </div>

          {/* Column E: Trust Promises (Myntra-style badges) */}
          <div className="sm:col-span-2 md:col-span-2 lg:col-span-1 flex flex-col space-y-6">
            <div className="flex items-start space-x-3">
              <ShieldCheck className="h-9 w-9 text-gray-900 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm text-gray-900 font-bold">
                  100% ORIGINAL
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  guarantee for all products at fashionhub.com
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <RefreshCw className="h-8 w-8 text-gray-900 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-sm text-gray-900 font-bold">
                  Return within 14days
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  of receiving your order with easy return policies
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Copyright & Bottom Bar */}
        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>© 2026 www.fashionhub.com. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Developed as a Premium E-Commerce Website with Next.js & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
