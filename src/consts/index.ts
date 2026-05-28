import type { ModalForm } from '@/models/interfaces';

export const modalFormDescriptions = {
  none: 'Form hiiden',
  uncontolled: 'Reac Hook Form',
  contolled: 'Controlled Form',
} satisfies Record<ModalForm, string>;
