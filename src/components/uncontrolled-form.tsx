import { useRef, useState, type SyntheticEvent } from 'react';

import { useAddItem, useCountries, useToggleModal } from '@/store/selectors';
import { checkPasswordStrength } from '@/services/check-password';
import { formSchemaUncontrolled } from '@/services/form-schema';
import { convertImageToBase64 } from '@/services/convert-image';
import type { FormItem } from '@/models/interfaces';

export function UncontrolledForm() {
  const countries = useCountries();
  const addItem = useAddItem();
  const toggleModal = useToggleModal();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const passwordRef = useRef<HTMLInputElement>(null);

  const validate = (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      age: Number(formData.get('age')),
      email: formData.get('email'),
      gender: formData.get('gender'),
      termsAndConditions: formData.get('termsAndConditions') === 'on',
      image: formData.get('image'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      country: formData.get('country'),
    };

    const result = formSchemaUncontrolled.safeParse(data);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        if (!newErrors[path]) {
          newErrors[path] = issue.message;
        }
      });
      setErrors(newErrors);
      return null;
    }
    setErrors({});
    return result.data;
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const validatedData = validate(formData);
    if (!validatedData) return;

    const image = await convertImageToBase64(validatedData.image);
    const newItem: FormItem = { ...validatedData, image, id: crypto.randomUUID() };
    addItem(newItem);
    toggleModal('none');
  };

  const passwordStrength = checkPasswordStrength(passwordRef.current?.value || '');

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name:
        <input id="name" name="name" type="text" aria-invalid={!!errors.name} />
        <small>{errors.name}</small>
      </label>

      <label htmlFor="age">
        Age:
        <input id="age" name="age" type="number" aria-invalid={!!errors.age} />
        <small>{errors.age}</small>
      </label>

      <label htmlFor="email">
        Email:
        <input id="email" name="email" type="email" aria-invalid={!!errors.email} />
        <small>{errors.email}</small>
      </label>

      <fieldset>
        <legend>Gender</legend>
        <input type="radio" id="male" name="gender" value="male" />
        <label htmlFor="male">Male</label>
        <input type="radio" id="female" name="gender" value="female" />
        <label htmlFor="female">Female</label>
        <input type="radio" id="other" name="gender" value="other" />
        <label htmlFor="other">Other</label>
      </fieldset>
      <small className="error">{errors.gender}</small>

      <label htmlFor="termsAndConditions" style={{ marginTop: '0.6rem' }}>
        <input id="termsAndConditions" name="termsAndConditions" type="checkbox" />I accept the Terms and Conditions
        <small style={{ marginTop: '0.5rem' }} className="error">
          {errors.termsAndConditions}
        </small>
      </label>

      <label htmlFor="image">Profile Image:</label>
      <input id="image" name="image" type="file" accept=".jpg,.jpeg,.png" aria-invalid={!!errors.image} />
      <small>{errors.image}</small>

      <label htmlFor="country" style={{ marginTop: '0.6rem' }}>
        Country
        <input
          id="country"
          name="country"
          list="countries"
          placeholder="Select or type country"
          autoComplete="off"
          aria-invalid={!!errors.country}
        />
        <small>{errors.country}</small>
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
      </label>

      <label htmlFor="password">
        Password:
        <input id="password" name="password" ref={passwordRef} type="password" aria-invalid={!!errors.password} />
        <small className="error">{errors.password}</small>
        <meter max={4} value={passwordStrength}></meter>
      </label>

      <label htmlFor="confirmPassword">
        Confirm Password:
        <input id="confirmPassword" name="confirmPassword" type="password" aria-invalid={!!errors.confirmPassword} />
        <small>{errors.confirmPassword}</small>
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}
