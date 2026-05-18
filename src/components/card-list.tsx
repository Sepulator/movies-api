import { use } from 'react';
import { useMatch } from '@tanstack/react-router';

import { Card } from './card';
import cs from './card-list.module.css';
import type { Result } from '@/models/interfaces';
import { Pagination } from '@/components/pagination';

interface Props {
  data: Promise<Result>;
  page: number;
}

export function CardList({ data, page }: Props) {
  const { Error, Response, Search, totalResults } = use(data);

  const isDetailsOpen = useMatch({
    from: '/_layout/details/$movieId',
    shouldThrow: false,
  });

  if (Response === 'False') {
    return <h2 style={{ textAlign: 'center' }}>{Error}</h2>;
  }

  return (
    <>
      <aside className="card-list">
        <ul className={`${cs.gallery} ${isDetailsOpen && cs.details}`}>
          {Search.map((movie) => (
            <Card key={movie.imdbID} movie={movie} />
          ))}
        </ul>
      </aside>
      <Pagination totalResults={totalResults} page={page} />
    </>
  );
}
