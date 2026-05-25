import { useMatch } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Card } from './card';
import cs from './card-list.module.css';
import type { Result } from '@/models/interfaces';
import { Pagination } from '@/components/pagination';

interface Props {
  queryOptions: {
    queryKey: [string, string, number];
    queryFn: () => Promise<Result>;
  };
  page: number;
}

export function CardList({ queryOptions, page }: Props) {
  const { data, error } = useSuspenseQuery(queryOptions);

  const isDetailsOpen = useMatch({
    from: '/_layout/details/$movieId',
    shouldThrow: false,
  });

  if (error || !data || data.Response === 'False') {
    return <h2 style={{ textAlign: 'center' }}>{error?.message || data?.Error || 'Failed to fetch'}</h2>;
  }

  return (
    <>
      <div className="card-list">
        <ul className={`${cs.gallery} ${isDetailsOpen && cs.details}`}>
          {data.Search.map((movie) => (
            <Card key={movie.imdbID} movie={movie} />
          ))}
        </ul>
      </div>
      <Pagination totalResults={data.totalResults} page={page} />
    </>
  );
}
