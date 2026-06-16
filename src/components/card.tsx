'use client';

import Link from 'next/link';
import Image from 'next/image';

import type { Movie } from '@/models/interfaces';
import { useIsFavorite, useToggleFavorite } from '@/store/selectors';

interface Props {
  movie: Movie;
}

export function Card({ movie }: Props) {
  const { Poster, Title, Year, imdbID } = movie;
  const isFavorite = useIsFavorite(imdbID);
  const toggleFavorite = useToggleFavorite();

  return (
    <article id="article">
      <Link href={`/details/${imdbID}`}>
        <div className="card-link">
          <Image src={Poster} alt={Title} width={203} height={300} loading="eager" />
          <footer>
            <p>{Title}</p>
            <h3>{Year}</h3>
          </footer>
        </div>
      </Link>
      <button type="button" onClick={() => toggleFavorite(movie)}>
        {isFavorite ? 'Remove movie' : 'Add movie'}
      </button>
    </article>
  );
}
