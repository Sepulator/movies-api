import type { Result } from '@/models/interfaces';
import { Card } from './card';
import cs from './card-list.module.css';

interface Props {
  data: Result | null;
  loading: boolean;
}

export function CardList({ data, loading }: Props) {
  if (loading || !data) {
    return <section role="alert" aria-busy="true" aria-details="spinner" style={{ textAlign: 'center' }}></section>;
  }

  if (data.Response === 'False') {
    return <h2 style={{ textAlign: 'center' }}>{data.Error}</h2>;
  }

  return (
    <section id="gallery">
      <ul className={cs.gallery}>
        {data.Search.map((movie) => (
          <Card key={movie.imdbID} movie={movie} />
        ))}
      </ul>
    </section>
  );
}
