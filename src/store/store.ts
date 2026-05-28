import type { ModalForm } from '@/models/interfaces';
import { create } from 'zustand';

interface FormsState {
  items: string[];
  showModal: ModalForm;
  reset: () => void;
  toggleModal: (form: ModalForm) => void;
}

export const useFormsStoreBase = create<FormsState>()((set) => ({
  items: [],
  showModal: 'none',
  reset: () =>
    set(() => {
      return { items: [] };
    }),
  toggleModal: (form) => set(() => ({ showModal: form })),
}));
