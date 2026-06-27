"use client";
import React, { useState } from "react";
import LinkNext from "next/link";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      alert(`Sign Up Clicked!\nName: ${name}\nEmail: ${email}`);
    } else {
      alert(`Sign In Clicked!\nEmail: ${email}`);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-16 sm:px-6 lg:px-8 bg-gray-50">
      {/* Centered Login/Signup White Card */}
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        {/* Header Section */}
        <div className="text-center">
          <LinkNext
            href="/"
            className="text-3xl font-black tracking-tight text-gray-900"
          >
            FASHION<span className="text-pink-600">HUB</span>
          </LinkNext>
          <h2 className="mt-6 text-xl font-bold tracking-tight text-gray-900">
            {isSignUp ? "Create your account" : "Sign in to your account"}
          </h2>
          <p className="mt-2 text-xs text-gray-500">
            {isSignUp
              ? "Get access to coupons and fast delivery"
              : "Welcome back! Enter your details below"}
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* FULL NAME INPUT (Only shown in Sign Up mode) */}
            {isSignUp && (
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                  Full Name
                </label>
                <div className="relative mt-1 text-gray-400 focus-within:text-gray-600">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="block w-full rounded-md border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-400 transition focus:border-pink-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-pink-500"
                  />
                </div>
              </div>
            )}

            {/* EMAIL ADDRESS INPUT */}
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative mt-1 text-gray-400 focus-within:text-gray-600">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="block w-full rounded-md border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder-gray-400 transition focus:border-pink-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-pink-500"
                />
              </div>
            </div>
            {/* PASSWORD INPUT */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                  Password
                </label>
                {!isSignUp && (
                  <a
                    href="#"
                    className="text-xs font-bold text-pink-600 hover:text-pink-700"
                  >
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative mt-1 text-gray-400 focus-within:text-gray-600">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full rounded-md border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-10 text-sm text-gray-900 placeholder-gray-400 transition focus:border-pink-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-pink-500"
                />
                {/* Eyeball Password Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Large Main CTA Button */}
          <div>
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-md bg-pink-600 py-3 text-sm font-bold text-white transition hover:bg-pink-700 shadow-md focus:outline-none"
            >
              {isSignUp ? "CREATE ACCOUNT" : "CONTINUE"}
            </button>
          </div>
        </form>
        {/* Separator */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="flex items-center justify-center rounded-md border border-gray-300 bg-white py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
          >
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center rounded-md border border-gray-300 bg-white py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition"
          >
            Facebook
          </button>
        </div>

        {/* Card View Switch Toggle */}
        <div className="mt-8 text-center text-sm">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="font-bold text-pink-600 hover:text-pink-700 transition"
          >
            {isSignUp
              ? "Already have an account? Log In"
              : "New to Fashion Hub? Create an Account"}
          </button>
        </div>
      </div>
    </div>
  );
}
