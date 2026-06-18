import { create } from 'zustand';

const MAX_HISTORY_SIZE = 100;

export const useHistoryStore = create((set) => ({
  history: [],
  
  addHistoryEntry: (entry) =>
    set((state) => ({
      history: [entry, ...state.history].slice(0, MAX_HISTORY_SIZE),
    })),
    
  clearHistory: () =>
    set({
      history: [],
    }),
}));
