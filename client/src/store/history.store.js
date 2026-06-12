import { create } from 'zustand';

export const useHistoryStore = create((set) => ({
  history: [],
  
  addHistoryEntry: (entry) =>
    set((state) => ({
      history: [entry, ...state.history],
    })),
    
  clearHistory: () =>
    set({
      history: [],
    }),
}));
