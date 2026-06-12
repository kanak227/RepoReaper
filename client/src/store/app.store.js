import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set) => ({
      mode: 'reaper', // 'reaper' or 'sweeper'
      setMode: (mode) => set({ mode }),
      safeList: [],
      toggleSafeRepo: (repoFullName) =>
        set((state) => ({
          safeList: state.safeList.includes(repoFullName)
            ? state.safeList.filter((name) => name !== repoFullName)
            : [...state.safeList, repoFullName],
        })),
    }),
    {
      name: 'app-storage', // name of the item in the storage (must be unique)
    }
  )
);
