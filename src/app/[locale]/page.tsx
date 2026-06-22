import { Suspense } from 'react';

import { CardList } from '@/components/card-list';
import { fetchMoviesAction, fetchMovieAction } from '@/app/actions/movies-actions';
import { CardInfo } from '@/components/card-info';
import { Search } from '@/components/search';
import { Flyout } from '@/components/flyout';

interface Props {
  searchParams: Promise<{ search?: string; page?: string; detailsId?: string }>;
}

export default async function Page({ searchParams }: Props) {
  const { page: pageParam = '1', search = '', detailsId } = await searchParams;

  const parsedPage = parseInt(pageParam, 10);
  const page = !isNaN(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const dataPromise = fetchMoviesAction(search, page);
  const moviePromise = detailsId ? fetchMovieAction(detailsId) : null;

  const spinner = <section role="alert" aria-busy="spinner" aria-details="spinner" style={{ textAlign: 'center' }} />;

  return (
    <>
      <Search />
      <hr role="separator" />
      <section className="split-view">
        <Suspense fallback={spinner}>
          <CardList dataPromise={dataPromise} page={page} />
        </Suspense>
        {moviePromise && (
          <Suspense fallback={spinner}>
            <CardInfo dataPromise={moviePromise} />
          </Suspense>
        )}
      </section>
      <Flyout />
    </>
  );
}
