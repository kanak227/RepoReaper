import { create } from "zustand";
import api from "../utils/api";

export const useAuthStore = create((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: false,

    loginwithGithub: () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;
    },

    checkAuth: async () => {
        set({ isLoading: true });
        try {
            const res = await api.get("/auth/me");
            set({ isAuthenticated: !!res.data?.user, user: res.data?.user || null });
        } catch (e) {
            set({ isAuthenticated: false, user: null });
        } finally {
            set({ isLoading: false });
        }
    },
}));