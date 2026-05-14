import { fetchMovie } from '@/services/api';
import { useParams } from '@tanstack/react-router';
import { use } from 'react';

export function CardInfo() {
  const { movieId } = useParams({ from: '/_layout/details/$movieId' });

  if (!movieId) {
    return <p>Select movie card from list.</p>;
  }

  const { Poster, Title, Released, imdbRating, Genre } = use(fetchMovie(movieId));

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
    </article>
  );
}
