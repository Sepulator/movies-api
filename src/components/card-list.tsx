'use client';

import { use } from 'react';
import { useSearchParams } from 'next/navigation';

import { Card } from './card';
import cs from './card-list.module.css';
import type { Result } from '@/models/interfaces';
import { Pagination } from '@/components/pagination';

interface Props {
  dataPromise: Promise<Result>;
  page: number;
}

export function CardList({ dataPromise, page }: Props) {
  const data = use(dataPromise);

  const searchParams = useSearchParams();
  const isDetailsOpen = searchParams.has('detailsId');

  if (!data || data.Response === 'False') {
    return <h2 style={{ textAlign: 'center' }}>{data?.Error || 'Failed to fetch'}</h2>;
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
