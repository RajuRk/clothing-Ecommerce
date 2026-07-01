"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { POST } from "../app/api/products/route";

// 1. Define the User type structure (including the new "role" parameter)
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  avatar?: string;
}

// 2. Define what states and functions our authentication context shares
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, name: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  // Updated: logout and signup now properly accept a `role` parameter
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync session on browser reload
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("fashionhub_user");
      if (savedUser && savedUser !== "undefined") {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Failed to parse saved user session:", error);
      // Clean up corrupt storage if parsing fails
      localStorage.removeItem("fashionhub_user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Real backend call: sends a POST request to `/api/auth/login`
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUser(data.user);
        localStorage.setItem("fashionhub_user", JSON.stringify(data.user));
        setIsLoading(false);
        toast.success(`Welcome back, ${data.user.name}!`); // Success Toast!
        return true;
      } else {
        toast.error(data.error || "Login failed"); // Error Toast!
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Login API Error:", error);
      toast.error("Failed to connect to the login server."); // Error Toast!
      setIsLoading(false);
      return false;
    }
  };

  // 2. Added Signup (passes name, email, and password to /api/auth/signup)
  const signup = async (
    name: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUser(data.user);
        localStorage.setItem("fashionhub_user", JSON.stringify(data.user));
        setIsLoading(false);
        toast.success(
          `Account created successfully! Welcome, ${data.user.name}!`,
        );
        return true;
      } else {
        toast.error(data.error || "Signup failed");
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Signup API Error:", error);
      toast.error("Failed to connect to the registration server.");
      setIsLoading(false);
      return false;
    }
  };

  // Real backend call: sends a POST request to `/api/auth/logout`
  const logout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (response.ok) {
        setUser(null);
        localStorage.removeItem("fashionhub_user");
        toast.info("Logged out successfully."); // Info Toast!
      }
    } catch (error) {
      console.error("Logout API Error:", error);
      toast.error("Failed to logout cleanly.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// 4. Create the custom useAuth hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
