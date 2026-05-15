import { use } from 'react';
import { Link, useLocation, useMatch } from '@tanstack/react-router';

import { Card } from './card';
import cs from './card-list.module.css';
import type { MovieSearch, Result } from '@/models/interfaces';

interface Props {
  data: Promise<Result>;
  page: number;
}

const limit = 10;

export function CardList({ data, page }: Props) {
  const { Error, Response, Search, totalResults } = use(data);
  const pathname = useLocation().pathname;

  const isDetailsOpen = useMatch({
    from: '/_layout/details/$movieId',
    shouldThrow: false,
  });

  if (Response === 'False') {
    return <h2 style={{ textAlign: 'center' }}>{Error}</h2>;
  }

  const totalPages = Math.ceil(Number(totalResults) / limit);

  return (
    <>
      <aside>
        <ul className={`${cs.gallery} ${isDetailsOpen && cs.details}`}>
          {Search.map((movie) => (
            <Card key={movie.imdbID} movie={movie} />
          ))}
        </ul>
      </aside>
      <nav>
        <Link
          from={pathname}
          search={(prev: MovieSearch) => ({ ...prev, page: Math.max(1, page - 1) })}
          disabled={page <= 1}
        >
          Prev
        </Link>
        <span>
          Page <strong>{page}</strong>
        </span>
        <Link
          from={pathname}
          search={(prev: MovieSearch) => ({ ...prev, page: page + 1 })}
          disabled={page >= totalPages}
        >
          Next
        </Link>
      </nav>
    </>
  );
}
