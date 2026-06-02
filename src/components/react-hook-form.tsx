import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAddItem, useCountries, useToggleModal } from '@/store/selectors';
import { checkPasswordStrength } from '@/services/check-password';
import { formSchema, type FormSchema } from '@/services/form-schema';
import { convertImageToBase64 } from '@/services/convert-iamge';
import type { FormItem } from '@/models/interfaces';

export function ReactHookForm() {
  const countries = useCountries();
  const addItem = useAddItem();
  const toggleModal = useToggleModal();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'all',
  });

  const password = watch('password', '');
  const passwordStrength = checkPasswordStrength(password);

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    const image = await convertImageToBase64(data.image[0]);
    const newItem: FormItem = { ...data, image, id: crypto.randomUUID() };
    addItem(newItem);
    toggleModal('none');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">
        Name:
        <input id="name" type="text" {...register('name')} aria-invalid={!!errors.name} />
        <small>{errors.name?.message}</small>
      </label>

      <label htmlFor="age">
        Age:
        <input id="age" type="number" {...register('age', { valueAsNumber: true })} aria-invalid={!!errors.age} />
        <small>{errors.age?.message}</small>
      </label>

      <label htmlFor="email">
        Email:
        <input id="email" type="email" {...register('email')} aria-invalid={!!errors.email} />
        <small>{errors.email?.message}</small>
      </label>

      <fieldset>
        <legend>Gender</legend>
        <input type="radio" id="male" value="male" {...register('gender')} aria-invalid={!!errors.gender} />
        <label htmlFor="male">Male</label>
        <input type="radio" id="female" value="female" {...register('gender')} aria-invalid={!!errors.gender} />
        <label htmlFor="female">Female</label>
        <input type="radio" id="other" value="other" {...register('gender')} aria-invalid={!!errors.gender} />
        <label htmlFor="other">Other</label>
      </fieldset>
      <small className="error">{errors.gender?.message}</small>

      <label htmlFor="termsAndConditions" style={{ marginBottom: '1.2rem' }}>
        <input id="termsAndConditions" type="checkbox" {...register('termsAndConditions')} />I accept the Terms and
        Conditions
        <small style={{ marginTop: '0.5rem' }} className="error">
          {errors.termsAndConditions?.message}
        </small>
      </label>

      <label htmlFor="image">Profile Image:</label>
      <input id="image" type="file" accept=".jpg,.jpeg,.png" {...register('image')} aria-invalid={!!errors.image} />
      <small>{errors.image?.message}</small>

      <label htmlFor="password">
        Password:
        <input
          style={{ marginBottom: '1rem' }}
          id="password"
          type="password"
          {...register('password')}
          aria-invalid={!!errors.password}
        />
        <small className="error" style={{ paddingTop: '0.5em' }}>
          {errors.password?.message}
        </small>
        <meter max={4} value={passwordStrength}></meter>
      </label>

      <label htmlFor="confirmPassword">
        Confirm Password:
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          aria-invalid={!!errors.confirmPassword}
        />
        <small>{errors.confirmPassword?.message}</small>
      </label>

      <label htmlFor="country">
        Country
        <input
          id="country"
          list="countries"
          placeholder="Select or type country"
          autoComplete="off"
          {...register('country')}
          aria-invalid={!!errors.country}
        />
        <small>{errors.country?.message}</small>
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
      </label>

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
