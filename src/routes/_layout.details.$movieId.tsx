import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { CardInfo } from '@/components/card-info';
import { fetchMovie } from '@/services/api';

export const Route = createFileRoute('/_layout/details/$movieId')({
  loader: async ({ params }) => fetchMovie(params.movieId),
  component: DetailsView,
  pendingComponent: DetailsPending,
  pendingMs: 0,
});

export function DetailsView() {
  const movie = useLoaderData({ from: '/_layout/details/$movieId' });

  return <CardInfo data={movie} />;
}

function DetailsPending() {
  return <section role="alert" aria-busy="true" aria-details="spinner" style={{ textAlign: 'center' }}></section>;
}
