import { countries } from '@/consts';
import { z } from 'zod';
import { checkPasswordNumber, checkPasswordUpper, checkPasswordLower, checkPasswordSpecial } from './check-password';

const isValidEmail = (email: string) => {
  const parts = email.split('@');
  const [_, domain] = parts;
  if (!domain?.includes('.')) return false;
  if (!domain?.split('.')[1]) return false;
  return true;
};

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .refine((name) => name.charAt(0) === name.charAt(0).toUpperCase(), 'Name must start with an uppercase letter'),
    age: z.number({ error: 'Age must be a number' }).int('Age must be an integer').min(0, 'Age cannot be negative'),
    email: z
      .string()
      .min(1, 'Email is required')
      .refine((val) => !(val.split('@').length !== 2), 'Exactly one @ must be in Email')
      .refine((val) => val.split('@')[0], 'Non-empty local part before @')
      .refine((val) => val.split('@')[1], 'Non-empty domain part after @')
      .refine(isValidEmail, 'At least one dot and upper domain name'),
    gender: z.enum(['male', 'female', 'other'], { message: 'Gender is required' }),
    termsAndConditions: z.boolean().refine((val) => val === true, 'You must accept the Terms and Conditions'),
    image: z
      .instanceof(FileList)
      .refine((files) => files.length > 0, 'Image is required.')
      .refine((files) => files[0]?.size <= 5_000_000, `Max image size is 5MB.`)
      .refine(
        (files) => ['image/jpeg', 'image/png'].includes(files[0]?.type),
        'Only .jpg, .jpeg, .png formats are supported.'
      ),
    password: z
      .string()
      .refine(checkPasswordNumber, 'Password must contain at least 1 number')
      .refine(checkPasswordUpper, 'Password must contain at least 1 uppercase')
      .refine(checkPasswordLower, 'Password must contain at least 1 lowercase')
      .refine(checkPasswordSpecial, 'Password must contain at least 1 special character'),
    confirmPassword: z.string().min(1, 'Confirm Password is required'),
    country: z.enum(countries, { message: 'Select country from list' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type FormSchema = z.infer<typeof formSchema>;
