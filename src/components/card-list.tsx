import type { Result } from '@/models/interfaces';
import { Card } from './card';
import cs from './card-list.module.css';
import { use } from 'react';

interface Props {
  data: Promise<Result>;
  loading?: boolean;
}

export function CardList({ data }: Props) {
  const { Error, Response, Search } = use(data);

  if (Response === 'False') {
    return <h2 style={{ textAlign: 'center' }}>{Error}</h2>;
  }

  return (
    <section id="gallery">
      <ul className={cs.gallery}>
        {Search.map((movie) => (
          <Card key={movie.imdbID} movie={movie} />
        ))}
      </ul>
    </section>
  );
}
