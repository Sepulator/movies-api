import type { Movie } from '@/models/interfaces';

interface Props {
  movie: Movie;
}

export function Card({ movie }: Props) {
  const { Poster, Title, Year } = movie;

  return (
    <li>
      <article>
        <img src={Poster} alt={Title} />
        <p>{Title}</p>
        <footer>
          <h3>{Year}</h3>
        </footer>
      </article>
    </li>
  );
}
