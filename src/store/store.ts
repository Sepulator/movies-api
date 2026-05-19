import type { Movie } from '@/models/interfaces';
import { create } from 'zustand';

interface MoviesState {
  movies: Movie[];
  addMovie: (movie: Movie) => void;
  removeMovie: (id: string) => void;
  reset: () => void;
}

export const useMoviesStoreBase = create<MoviesState>()((set) => ({
  movies: [],
  addMovie: (newMovie) =>
    set((state) => {
      const isDuplicated = state.movies.some((movie) => movie.imdbID === newMovie.imdbID);
      if (isDuplicated) {
        return {};
      }
      return { movies: [...state.movies, newMovie] };
    }),
  removeMovie: (id) =>
    set((state) => {
      const isFound = state.movies.some((movie) => movie.imdbID === id);

      if (isFound) {
        return { movies: [...state.movies.filter((movie) => movie.imdbID !== id)] };
      }

      return {};
    }),
  reset: () =>
    set(() => {
      return { movies: [] };
    }),
}));
