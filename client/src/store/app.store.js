import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set) => ({
      mode: 'reaper', // 'reaper' or 'sweeper'
      setMode: (mode) => set({ mode }),
      rateLimitState: null,
      setRateLimitState: (state) => set({ rateLimitState: state }),
    }),
    {
      name: 'app-storage', // name of the item in the storage (must be unique)
    }
  )
);
