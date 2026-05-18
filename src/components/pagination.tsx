import { Link } from '@tanstack/react-router';

import type { MovieSearch } from '@/models/interfaces';

interface Props {
  totalResults: string;
  page: number;
}

const limit = 10;

export function Pagination({ totalResults, page }: Props) {
  const totalPages = Math.ceil(Number(totalResults) / limit);

  return (
    <nav className="pagination">
      <Link from="/" search={(prev: MovieSearch) => ({ ...prev, page: Math.max(1, page - 1) })} disabled={page <= 1}>
        Prev
      </Link>
      <span>
        <strong>{page}</strong>
      </span>
      <Link from="/" search={(prev: MovieSearch) => ({ ...prev, page: page + 1 })} disabled={page >= totalPages}>
        Next
      </Link>
    </nav>
  );
}
