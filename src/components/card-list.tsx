import { use } from 'react';
import { useMatch } from '@tanstack/react-router';

import type { Result } from '@/models/interfaces';
import { Card } from './card';
import cs from './card-list.module.css';

interface Props {
  data: Promise<Result>;
  loading?: boolean;
}

export function CardList({ data }: Props) {
  const { Error, Response, Search } = use(data);
  const isDetailsOpen = useMatch({
    from: '/_layout/details/$movieId',
    shouldThrow: false,
  });

  if (Response === 'False') {
    return <h2 style={{ textAlign: 'center' }}>{Error}</h2>;
  }

  return (
    <aside>
      <ul className={`${cs.gallery} ${isDetailsOpen && cs.details}`}>
        {Search.map((movie) => (
          <Card key={movie.imdbID} movie={movie} />
        ))}
      </ul>
    </aside>
  );
}
