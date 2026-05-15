import { createFileRoute, useLoaderData, useParams } from '@tanstack/react-router';
import { CardInfo } from '@/components/card-info';
import { fetchMovie } from '@/services/api';

export const Route = createFileRoute('/_layout/details/$movieId')({
  loader: ({ params }: { params: { movieId: string } }) => fetchMovie(params.movieId),
  component: DetailsView,
  pendingMs: 0,
});

export function DetailsView() {
  const movie = useLoaderData({ from: '/_layout/details/$movieId' });
  const { movieId } = useParams({ from: '/_layout/details/$movieId' });

  if (!movieId) {
    return <p>Select movie card from list.</p>;
  }

  return <CardInfo data={movie} />;
}
