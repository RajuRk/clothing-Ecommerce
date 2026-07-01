import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Providers } from "./providers";
import { CartDrawer } from "../components/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fashion Hub | Online Clothing, Footwear & Accessories",
  description:
    "Shop the latest fashion trends at Fashion Hub. Discover premium clothing, activewear, and footwear collections for Men, Women, and Kids with amazing discounts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* 2. Added a light gray background and default text color to body */}
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900">
        {/* 1. Global Navigation Bar */}
        <Providers>
          <Navbar />
          {/* 2. Main Page Content (Changes based on URL path) */}
          <main className="flex-grow">{children}</main>
          {/* 3. Global Footer */}
          <Footer />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
