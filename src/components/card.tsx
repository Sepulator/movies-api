import type { Movie } from '@/models/interfaces';
import { Link } from '@tanstack/react-router';

interface Props {
  movie: Movie;
}

export function Card({ movie }: Props) {
  const { Poster, Title, Year } = movie;

  return (
    <Link
      key={movie.imdbID}
      to="/details/$movieId"
      params={{ movieId: movie.imdbID.toString() }}
      activeProps={{ className: 'active-link' }}
    >
      <article>
        <img src={Poster} alt={Title} />
        <p>{Title}</p>
        <footer>
          <h3>{Year}</h3>
        </footer>
      </article>
    </Link>
  );
}
