"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LinkNext from "next/link";
import { Mail, Lock, User, Eye, EyeOff, Check } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();
  const { login, signup, isLoading } = useAuth();

  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const pwdRules = [
    { label: "Min 6 characters", met: password.length >= 6 },
    { label: "One uppercase (A-Z)", met: /[A-Z]/.test(password) },
    { label: "One lowercase (a-z)", met: /[a-z]/.test(password) },
    { label: "One number (0-9)", met: /[0-9]/.test(password) },
    {
      label: "One special character",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  const metCount = pwdRules.filter((r) => r.met).length;

  const getStrength = () => {
    if (!password)
      return { label: "None", color: "w-0 bg-gray-200", text: "text-gray-400" };
    if (metCount <= 2)
      return { label: "Weak", color: "w-1/3 bg-red-500", text: "text-red-500" };
    if (metCount <= 4)
      return {
        label: "Medium",
        color: "w-2/3 bg-amber-500",
        text: "text-amber-500",
      };
    return {
      label: "Strong",
      color: "w-full bg-emerald-500",
      text: "text-emerald-500",
    };
  };

  const strength = getStrength();

  const validateForm = (): boolean => {
    const tempErrors: typeof errors = {};
    let isValid = true;

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      tempErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    if (isSignUp) {
      if (name.trim().length < 3) {
        tempErrors.name = "Name must be at least 3 characters";
        isValid = false;
      }
      if (metCount < 5) {
        tempErrors.password =
          "Password does not meet all security requirements";
        isValid = false;
      }
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});

    if (!validateForm()) {
      toast.warn("Please check the form for errors.");
      return;
    }

    let success = false;
    if (isSignUp) {
      success = await signup(name, email, password); // Call signup
    } else {
      success = await login(email, password); // Call login
    }
    if (success) {
      router.push("/");
    }
  };

  // Reset inputs and errors when switching between Sign In and Sign Up
  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setErrors({});
    setName("");
    setEmail("");
    setPassword("");
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
        <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
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
                {/* Inline Error Message */}
                {errors.name && (
                  <p className="mt-1 text-xs font-semibold text-red-500">
                    {errors.name}
                  </p>
                )}
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
              {/* Inline Error Message */}
              {errors.email && (
                <p className="mt-1 text-xs font-semibold text-red-500">
                  {errors.email}
                </p>
              )}
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
                  className={`block w-full rounded-md border bg-gray-50 py-2.5 pl-10 pr-10 text-sm text-gray-900 placeholder-gray-400 transition focus:outline-none focus:ring-1 ${
                    errors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-200 focus:border-pink-500 focus:bg-white focus:ring-pink-500"
                  }`}
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
              {/* Inline Error Message */}
              {errors.password && (
                <p className="mt-1 text-xs font-semibold text-red-500">
                  {errors.password}
                </p>
              )}
            </div>

            {/* 2. Real-time Password Strength indicator (Only for Sign Up) */}
            {isSignUp && password && (
              <div className="space-y-2 mt-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-gray-500">Strength:</span>
                  <span className={strength.text}>{strength.label}</span>
                </div>
                <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${strength.color}`}
                  />
                </div>
                {/* Dynamic Rules checklist */}
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs bg-gray-50 p-3 rounded-md">
                  {pwdRules.map((rule, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5">
                      <Check
                        className={`h-3.5 w-3.5 ${rule.met ? "text-emerald-500" : "text-gray-300"}`}
                      />
                      <span
                        className={
                          rule.met
                            ? "text-emerald-600 font-medium"
                            : "text-gray-400"
                        }
                      >
                        {rule.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Large Main CTA Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center rounded-md bg-pink-600 py-3 text-sm font-bold text-white transition hover:bg-pink-700 shadow-md focus:outline-none disabled:bg-pink-400 cursor-pointer disabled:cursor-not-allowed"
            >
              {isLoading
                ? "PLEASE WAIT..."
                : isSignUp
                  ? "CREATE ACCOUNT"
                  : "CONTINUE"}
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
            onClick={toggleMode}
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
