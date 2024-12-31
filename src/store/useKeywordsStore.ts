import { create } from 'zustand';

interface KeywordsState {
  keywords1: string[];
  keywords2: string[];
  setKeywords1: (keywords1: string[]) => void;
  setKeywords2: (keywords2: string[]) => void;
  resetKeywords: () => void;
}

const useKeywordsStore = create<KeywordsState>((set) => ({
  keywords1: [],
  keywords2: [],
  setKeywords1: (keywords1) => set({ keywords1 }),
  setKeywords2: (keywords2) => set({ keywords2 }),
  resetKeywords: () => set({ keywords1: [], keywords2: [] }),
}));
