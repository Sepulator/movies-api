import { create } from 'zustand';

interface MoviesState {
  items: string[];
  reset: () => void;
}

export const useMoviesStoreBase = create<MoviesState>()((set) => ({
  items: [],
  reset: () =>
    set(() => {
      return { items: [] };
    }),
}));
