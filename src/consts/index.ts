import { ReactHookForm } from '@/components/react-hook-form';
import type { ModalForm } from '@/models/interfaces';
import type { JSX } from 'react';

export const modalFormDescriptions = {
  none: 'Form hiiden',
  uncontolled: 'Reac Hook Form',
  contolled: 'Controlled Form',
} satisfies Record<ModalForm, string>;

export const modalFormComponents = {
  none: null,
  uncontolled: ReactHookForm,
  contolled: null,
} satisfies Record<ModalForm, null | (() => JSX.Element)>;

export const countries = [
  'Chad',
  'Benin',
  'Togo',
  'Ghana',
  'Gabon',
  'Guyana',
  'Suriname',
  'Panama',
  'Belize',
  'Jamaica',
  'Cuba',
  'Haiti',
  'Laos',
  'Brunei',
  'Palau',
  'Nauru',
  'Samoa',
  'Tuvalu',
  'Vanuatu',
  'Fiji',
];
