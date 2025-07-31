import { create } from "zustand";
import api from "../utils/api";

export const useAuthStore = create((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: false,

    loginwithGithub: ()=>{
        
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;
    },

    // fetchUser: async ()=>{
    //     set({ isLoading: true });
    //     try {
    //         const res = await api.get('/auth/me'); 
    //         set({ isAuthenticated: true, user: res.data, isLoading: false });
    //     } catch (err) {
    //         set({ isAuthenticated: false, user: null, isLoading: false });
    //     }
    // }


    }));