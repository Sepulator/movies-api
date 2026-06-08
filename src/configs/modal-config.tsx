import { ReactHookForm } from '@/components/react-hook-form';
import { UncontrolledForm } from '@/components/uncontrolled-form';
import type { ModalForm } from '@/models/interfaces';
import type { JSX } from 'react';

export const modalFormDescriptions: Record<ModalForm, string> = {
  none: 'Form hidden',
  uncontolled: 'Uncontrolled Form',
  contolled: 'React Hook Form',
};

export const modalFormComponents: Record<ModalForm, null | (() => JSX.Element)> = {
  none: null,
  uncontolled: UncontrolledForm,
  contolled: ReactHookForm,
};
