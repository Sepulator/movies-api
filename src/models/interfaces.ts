export type ModalForm = 'none' | 'uncontolled' | 'contolled';

export interface FormItem {
  id: string;
  name: string;
  age: number;
  email: string;
  gender: 'male' | 'female' | 'other';
  termsAndConditions: boolean;
  image: string;
  password: string;
  confirmPassword: string;
  country: string;
}
