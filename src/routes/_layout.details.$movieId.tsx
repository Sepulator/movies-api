import { fetchMovie } from '@/services/api';
import { createFileRoute, useLoaderData, useParams } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/details/$movieId')({
  loader: ({ params }: { params: { movieId: string } }) => fetchMovie(params.movieId),
  component: DetailsView,
});

export function DetailsView() {
  const movie = useLoaderData({ from: '/_layout/details/$movieId' });
  const { movieId } = useParams({ from: '/_layout/details/$movieId' });

  if (!movieId) {
    return <p>Select movie card from list.</p>;
  }

  const { Poster, Title, Released, imdbRating, Genre } = movie;

  return (
    <article>
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
