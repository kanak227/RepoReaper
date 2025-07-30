import { create } from "zustand";
import api from "../utils/api";

export const useAuthStore = create((set) => ({
    isAuthenticated: false,
    user: null,

    Authentication : async () => {
        try{
            const res = await api.get('/auth/github');
            set({ isAuthenticated: true, user: res.data });
            
        }
        catch(err){
            set({ isAuthenticated: false, user: null });
        }
        finally{
            set({ isLoading: false });
        }
    }


    }));