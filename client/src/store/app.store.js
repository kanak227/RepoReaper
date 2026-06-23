import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set) => ({
      // Your existing states
      mode: 'reaper', // 'reaper' or 'sweeper'
      setMode: (mode) => set({ mode }),
      safeList: [],
      toggleSafeRepo: (repoFullName) =>
        set((state) => ({
          safeList: state.safeList.includes(repoFullName)
            ? state.safeList.filter((name) => name !== repoFullName)
            : [...state.safeList, repoFullName],
        })),

        // New rate limiting Tracking States
        isThrottled: false,
        cooldownSeconds: 0,
         /** 
          *  Activates the banner and locks down the bulk actions visually
          */
         initateSystemCooldown: (seconds) => set({ 
          isThrottled: true, 
          cooldownSeconds: seconds
         }),

          /**
           * Clears the throttling locks completely
           */
          terminateSystemCooldown: () => set({
            isThrottled: false,
            cooldownSeconds: 0
          }),
          
          /** 
           * Visual timer lock decrement functiom
           */
          decrementCooldownClock: () => set((state) => { 
        
            if (state.cooldownSeconds <= 1) {
              return { isThrottled: false, cooldownSeconds: 0 };
            }
            return { cooldownSeconds: state.cooldownSeconds - 1 };
          }),
    }),
    {
      name: 'app-storage', // name of the item in the storage (must be unique)
    }
  )
);
