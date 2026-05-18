import { Link, useSearch } from '@tanstack/react-router';
import type { Movie } from '@/models/interfaces';

interface Props {
  movie: Movie;
}

export function Card({ movie }: Props) {
  const { Poster, Title, Year } = movie;
  const currentSearch = useSearch({ from: '/_layout' });

  return (
    <Link
      key={movie.imdbID}
      search={currentSearch}
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
