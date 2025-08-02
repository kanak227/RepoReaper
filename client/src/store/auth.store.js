import { create } from "zustand";
import api from "../utils/api";

export const useAuthStore = create((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: false,

    loginwithGithub: () => {
        // Use relative URL to work with both development and production environments
        window.location.href = '/auth/github';
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