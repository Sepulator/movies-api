import type { Movie } from '@/models/interfaces';
import { create } from 'zustand';

interface MoviesState {
  movies: Movie[];
  reset: () => void;
  toggleFavorite: (newMovie: Movie) => void;
}

export const useMoviesStoreBase = create<MoviesState>()((set) => ({
  movies: [],
  reset: () =>
    set(() => {
      return { movies: [] };
    }),
  toggleFavorite: (newMovie) =>
    set((state) => {
      const isFavorites = state.movies.some((movie) => movie.imdbID === newMovie.imdbID);

      return {
        movies: isFavorites
          ? state.movies.filter((movie) => movie.imdbID !== newMovie.imdbID)
          : [...state.movies, newMovie],
      };
    }),
}));
