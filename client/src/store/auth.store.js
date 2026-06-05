import { create } from "zustand";
import api from "../utils/api"; 
const BACKEND_URL = import.meta.env.VITE_API_URL || import.meta.env.API_URL || 'http://localhost:3000';

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,

  loginwithGithub: () => {
    window.location.href = `${BACKEND_URL}/auth/github`;
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("token");
      set({ isAuthenticated: false, user: null });
    } catch (e) {
      console.error("Logout failed:", e);
    }
  },

 checkAuth: async () => {
  set({ isLoading: true });
  try {
    const res = await api.get("/auth/me", { withCredentials: true }); 
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


