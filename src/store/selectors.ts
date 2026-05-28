import type { StoreApi, UseBoundStore } from 'zustand';
import { useFormsStoreBase } from './store';

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

const useFormsStore = createSelectors(useFormsStoreBase);

export const useResetMovies = useFormsStore.use.reset;
export const useShowModal = useFormsStore.use.showModal;
export const useItems = useFormsStore.use.items;
export const useToggleModal = useFormsStore.use.toggleModal;
