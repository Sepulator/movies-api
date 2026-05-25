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

export const useMovies = useMoviesStore.use.movies;
export const useResetMovies = useMoviesStore.use.reset;
export const useToggleFavorite = useMoviesStore.use.toggleFavorite;

export const useIsFavorite = (id: string): boolean => {
  return useMoviesStore((state) => state.movies.some((movie) => movie.imdbID === id));
};
