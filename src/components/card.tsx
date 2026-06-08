import type { FormItem } from '@/models/interfaces';

interface Props extends FormItem {
  className?: string;
}

export function Card({ age, image, name, country, email, gender, className }: Props) {
  return (
    <article className={className || ''}>
      <img src={image}></img>

      <label style={{ paddingTop: '1rem' }}>
        Name: <b>{name}</b>
      </label>
      <label>
        Age: <b>{age}</b>
      </label>
      <label>
        Gender: <b>{gender}</b>
      </label>
      <label>
        Country: <b>{country}</b>
      </label>
      <p>{email}</p>
    </article>
  );
}
