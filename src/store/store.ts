import { create } from 'zustand';

import { countriesList } from '@/consts';
import type { FormItem, ModalForm } from '@/models/interfaces';

interface FormsState {
  items: FormItem[];
  countries: string[];
  showModal: ModalForm;
  reset: () => void;
  toggleModal: (form: ModalForm) => void;
  addItem: (item: FormItem) => void;
}

export const useFormsStoreBase = create<FormsState>()((set) => ({
  items: [],
  countries: countriesList,
  showModal: 'none',
  reset: () =>
    set(() => {
      return { items: [] };
    }),
  toggleModal: (form) => set(() => ({ showModal: form })),
  addItem: (item) => set((store) => ({ items: [item, ...store.items] })),
}));
