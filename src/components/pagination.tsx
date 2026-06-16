'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Props {
  totalResults: string;
  page: number;
}

const limit = 10;

export function Pagination({ totalResults, page }: Props) {
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(Number(totalResults) / limit);

  const getPageLink = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    return `/?${params.toString()}`;
  };

  return (
    <div className="pagination">
      {page > 1 ? <Link href={getPageLink(page - 1)}>Prev</Link> : <span>Prev</span>}
      <span>
        <strong>{page}</strong>
      </span>
      {page < totalPages ? <Link href={getPageLink(page + 1)}>Next</Link> : <span>Next</span>}
    </div>
  );
}
