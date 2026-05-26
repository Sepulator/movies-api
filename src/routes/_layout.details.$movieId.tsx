import { createFileRoute } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { fetchMovie } from '@/services/api';
import { CardInfo } from '@/components/card-info';

const getMovieDetailsQueryOptions = (movieId: string) => ({
  queryKey: ['movie', movieId] as const,
  queryFn: () => fetchMovie(movieId),
});

export const Route = createFileRoute('/_layout/details/$movieId')({
  component: DetailsView,
});

export function DetailsView() {
  const { movieId } = Route.useParams();
  const { data, error } = useSuspenseQuery(getMovieDetailsQueryOptions(movieId));

  if (error || !data || data.Response === 'False') {
    return <h2 style={{ textAlign: 'center' }}>{error?.message || data?.Error || 'Failed to fetch'}</h2>;
  }

  return <CardInfo data={data} />;
}
