import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { CardInfo } from '@/components/card-info';
import { fetchMovie } from '@/services/api';

export const Route = createFileRoute('/_layout/details/$movieId')({
  loader: async ({ params }) => fetchMovie(params.movieId),
  component: DetailsView,
});

export function DetailsView() {
  const movie = useLoaderData({ from: '/_layout/details/$movieId' });

  return <CardInfo data={movie} />;
}
