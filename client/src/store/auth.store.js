import { create } from "zustand";
import api from "../utils/api"; 
const BACKEND_URL = import.meta.env.VITE_API_URL;

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,

  // Redirect user to GitHub auth route on backend
  loginwithGithub: () => {
    window.location.href = `${BACKEND_URL}/auth/github`;
  },

  // Check if user is authenticated by calling backend
  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get("/auth/me");
      set({
        isAuthenticated: !!res.data?.user,
        user: res.data?.user || null,
      });
    } catch (e) {
      console.error("Auth check failed:", e);
      set({ isAuthenticated: false, user: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));
