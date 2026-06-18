import { Suspense } from 'react';

import { CardList } from '@/components/card-list';
import { fetchMovies, fetchMovie } from '@/services/api';
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

  const dataPromise = fetchMovies(search, page);
  const movie = detailsId ? await fetchMovie(detailsId) : null;

  const spinner = <section role="alert" aria-busy="spinner" aria-details="spinner" style={{ textAlign: 'center' }} />;

  return (
    <>
      <Search />
      <hr role="separator" />
      <section className="split-view">
        <Suspense fallback={spinner}>
          <CardList dataPromise={dataPromise} page={page} />
        </Suspense>
        {movie && <CardInfo data={movie} />}
      </section>
      <Flyout />
    </>
  );
}
