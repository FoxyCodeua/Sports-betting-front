"use client";

import { create } from "zustand";

import { API_URL } from "@/lib/config";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
}

const AUTH_KEY = "betanalytics-auth";

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  error: null,

  login: async (password: string) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch(
        `${API_URL}/api/auth/verify`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        },
      );

      if (!response.ok) {
        set({ isLoading: false, error: "Invalid password" });
        return false;
      }

      localStorage.setItem(AUTH_KEY, "true");
      set({ isAuthenticated: true, isLoading: false, error: null });
      return true;
    } catch {
      set({ isLoading: false, error: "Connection error" });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem(AUTH_KEY);
    set({ isAuthenticated: false, error: null });
  },

  checkAuth: () => {
    set({
      isAuthenticated: localStorage.getItem(AUTH_KEY) === "true",
      isLoading: false,
    });
  },
}));
