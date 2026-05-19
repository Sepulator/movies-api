import type { StoreApi, UseBoundStore } from 'zustand';
import { useMoviesStoreBase } from './store';

type WithSelectors<S> = S extends { getState: () => infer T } ? S & { use: { [K in keyof T]: () => T[K] } } : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
  const store = _store as WithSelectors<S>;
  store.use = {};

  for (const k of Object.keys(store.getState())) {
    Object.defineProperty(store.use, k, {
      get: () => () => store((state) => state[k as keyof typeof state]),
      enumerable: true,
      configurable: true,
    });
  }

  return store;
};

const useMoviesStore = createSelectors(useMoviesStoreBase);

const useMovies = useMoviesStore.use.movies;
const useAddMovie = useMoviesStore.use.addMovie;
const useRemoveMovie = useMoviesStore.use.removeMovie;
const useResetMovies = useMoviesStore.use.reset;

export { useMovies, useAddMovie, useRemoveMovie, useResetMovies };
