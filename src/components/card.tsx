import { Link } from '@tanstack/react-router';
import type { Movie } from '@/models/interfaces';
import { useIsFavorite, useToggleFavorite } from '@/store/selectors';

interface Props {
  movie: Movie;
}

export function Card({ movie }: Props) {
  const { Poster, Title, Year, imdbID } = movie;
  const isFavorite = useIsFavorite(imdbID);
  const toggleFavorite = useToggleFavorite();

  return (
    <article id="article">
      <Link
        key={movie.imdbID}
        search={(prev) => ({
          search: prev.search ?? '',
          page: prev.page ?? 1,
        })}
        to="/details/$movieId"
        params={{ movieId: movie.imdbID.toString() }}
        activeProps={{ className: 'active-link' }}
      >
        <div>
          <img src={Poster} alt={Title} />
          <footer>
            <p>{Title}</p>
            <h3>{Year}</h3>
          </footer>
        </div>
      </Link>
      <button
        type="button"
        {...(isFavorite ? { secondary: 'true' } : { outline: 'true' })}
        onClick={() => toggleFavorite(movie)}
      >
        {isFavorite ? 'Remove movie' : 'Add movie'}
      </button>
    </article>
  );
}
