'use client';

import { use } from 'react';
import { useSearchParams } from 'next/navigation';
import useSWR from 'swr';

import { Card } from './card';
import cs from './card-list.module.css';
import type { Result } from '@/models/interfaces';
import { Pagination } from '@/components/pagination';
import { fetchMoviesAction } from '@/app/actions/movies-actions';

interface Props {
  dataPromise: Promise<Result>;
  page: number;
}

export function CardList({ dataPromise, page }: Props) {
  const initialData = use(dataPromise);

  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const isDetailsOpen = searchParams.has('detailsId');

  const { data } = useSWR<Result>(
    ['movies', search, page],
    ([_, q, p]) => fetchMoviesAction(q as string, p as number),
    {
      fallbackData: initialData,
      revalidateOnFocus: false,
    }
  );

  const currentData = data || initialData;

  if (!currentData || currentData.Response === 'False') {
    return <h2 style={{ textAlign: 'center' }}>{currentData?.Error || 'Failed to fetch'}</h2>;
  }

  return (
    <>
      <div className="card-list">
        <ul className={`${cs.gallery} ${isDetailsOpen && cs.details}`}>
          {currentData.Search.map((movie) => (
            <Card key={movie.imdbID} movie={movie} />
          ))}
        </ul>
      </div>
      <Pagination totalResults={currentData.totalResults} page={page} />
    </>
  );
}
