import { z } from 'zod';

import { countriesList } from '@/consts';
import { checkPasswordNumber, checkPasswordUpper, checkPasswordLower, checkPasswordSpecial } from './check-password';

const isValidEmail = (email: string) => {
  const parts = email.split('@');
  const [_, domain] = parts;
  if (!domain?.includes('.')) return false;
  if (!domain?.split('.')[1]) return false;
  return true;
};

const formSchemaBase = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .refine((name) => name.charAt(0) === name.charAt(0).toUpperCase(), 'Name must start with an uppercase letter'),
    age: z
      .number({ error: 'Age must be a number' })
      .int('Age must be an integer')
      .min(1, 'Age must be above zero')
      .max(120, 'Age must be below 120'),
    email: z
      .string()
      .min(1, 'Email is required')
      .refine((val) => !(val.split('@').length !== 2), 'Exactly one @ must be in Email')
      .refine((val) => val.split('@')[0], 'Non-empty local part before @')
      .refine((val) => val.split('@')[1], 'Non-empty domain part after @')
      .refine(isValidEmail, 'At least one dot and upper domain name'),
    gender: z.enum(['male', 'female', 'other'], { message: 'Gender is required' }),
    termsAndConditions: z.boolean().refine((val) => val === true, 'You must accept the Terms and Conditions'),
    password: z
      .string()
      .min(1, 'Email is required')
      .refine(checkPasswordNumber, 'Password must contain at least 1 number')
      .refine(checkPasswordUpper, 'Password must contain at least 1 uppercase')
      .refine(checkPasswordLower, 'Password must contain at least 1 lowercase')
      .refine(checkPasswordSpecial, 'Password must contain at least 1 special character'),
    country: z.enum(countriesList, { message: 'Select country from list' }),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const formSchema = formSchemaBase.extend({
  image: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, 'Image is required.')
    .refine((files) => files[0]?.size <= 5_000_000, `Max image size is 5MB.`)
    .refine(
      (files) => ['image/jpeg', 'image/png'].includes(files[0]?.type),
      'Only .jpg, .jpeg, .png formats are supported.'
    ),
});

export const formSchemaUncontrolled = formSchemaBase.extend({
  image: z
    .file({ error: 'Image is required.' })
    .refine((file) => file.size <= 5_000_000, `Max image size is 5MB.`)
    .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), 'Only .jpg, .jpeg, .png formats are supported.'),
});

export type FormSchema = z.infer<typeof formSchema>;
export type FormSchemaUncontrolled = z.infer<typeof formSchemaUncontrolled>;
