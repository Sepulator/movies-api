import type { MovieInfo } from '@/models/interfaces';
import { Link } from '@tanstack/react-router';

interface Props {
  data: MovieInfo;
}

export function CardInfo({ data }: Props) {
  const { Poster, Title, Released, imdbRating, Genre, Response, Error } = data;

  if (Response === 'False') {
    return <h2 style={{ textAlign: 'center' }}>{Error ?? 'Select movie card from list.'}</h2>;
  }

  return (
    <article className="card-info">
      <img src={Poster} alt={Title} />
      <p>{Title}</p>
      <footer className="table">
        <span>Release date</span>
        <h3>{Released}</h3>
        <span>Genres</span>
        <h3>{Genre}</h3>
        <span>IMDB rating</span>
        <h3>{imdbRating}</h3>
      </footer>

      <Link
        to="/"
        search={(prev) => ({
          search: prev.search ?? '',
          page: prev.page ?? 1,
        })}
      >
        Close
      </Link>
    </article>
  );
}
