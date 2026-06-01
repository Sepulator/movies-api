import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, type FormSchema } from '@/services/form-schema';

export function ReactHookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log('Form data submitted:', data);
  };

  return (
    <form onSubmit={void handleSubmit(onSubmit)}>
      <label htmlFor="name">
        Name:
        <input id="name" type="text" {...register('name')} aria-invalid={!!errors.name} />
        {errors.name && <small>{errors.name.message}</small>}
      </label>

      <label htmlFor="age">
        Age:
        <input id="age" type="number" {...register('age', { valueAsNumber: true })} aria-invalid={!!errors.age} />
        {errors.age && <small>{errors.age.message}</small>}
      </label>

      <label htmlFor="email">
        Email:
        <input id="email" type="email" {...register('email')} aria-invalid={!!errors.email} />
        {errors.email && <small>{errors.email.message}</small>}
      </label>

      <fieldset>
        <legend>Gender</legend>
        <input type="radio" id="male" value="male" {...register('gender')} aria-invalid={!!errors.gender} />
        <label htmlFor="male">Male</label>
        <input type="radio" id="female" value="female" {...register('gender')} aria-invalid={!!errors.gender} />
        <label htmlFor="female">Female</label>
        <input type="radio" id="other" value="other" {...register('gender')} aria-invalid={!!errors.gender} />
        <label htmlFor="other">Other</label>
        {errors.gender && <small className="error">{errors.gender.message}</small>}
      </fieldset>

      <label htmlFor="termsAndConditions">
        <input id="termsAndConditions" type="checkbox" {...register('termsAndConditions')} />I accept the Terms and
        Conditions
      </label>
      {errors.termsAndConditions && <small className="error">{errors.termsAndConditions.message}</small>}

      <label htmlFor="image" className="pt">
        Profile Image:
      </label>
      <input id="image" type="file" accept=".jpg,.jpeg,.png" {...register('image')} aria-invalid={!!errors.image} />
      {errors.image && <small>{errors.image.message}</small>}

      <label htmlFor="password" className="pt">
        Password:
        <input id="password" type="password" {...register('password')} aria-invalid={!!errors.password} />
        {errors.password && <small>{errors.password.message}</small>}
      </label>

      <label htmlFor="confirmPassword">
        Confirm Password:
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          aria-invalid={!!errors.confirmPassword}
        />
        {errors.confirmPassword && <small>{errors.confirmPassword.message}</small>}
      </label>

      <label htmlFor="country" style={{ paddingBottom: '1rem' }}>
        Country:
        <input id="country" type="text" {...register('country')} aria-invalid={!!errors.country} />
        {errors.country && <small>{errors.country.message}</small>}
      </label>

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
