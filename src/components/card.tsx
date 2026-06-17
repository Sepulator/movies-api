'use client';

import Link from 'next/link';
import Image from 'next/image';

import type { Movie } from '@/models/interfaces';
import { useIsFavorite, useToggleFavorite } from '@/store/selectors';
import { useSearchParams } from 'next/navigation';

interface Props {
  movie: Movie;
}

export function Card({ movie }: Props) {
  const searchParams = useSearchParams();
  const { Poster, Title, Year, imdbID } = movie;
  const isFavorite = useIsFavorite(imdbID);
  const toggleFavorite = useToggleFavorite();

  const image =
    Poster === 'N/A' ? (
      <svg role="presentation" aria-hidden="true">
        <use href="/icons.svg#image-off"></use>
      </svg>
    ) : (
      <Image
        src={Poster}
        alt={Title}
        width={203}
        height={300}
        style={{ width: '203px', height: '300px' }}
        loading="eager"
      />
    );

  return (
    <article id="article">
      <Link href={`/details/${imdbID}?${searchParams.toString()}`}>
        <div className="card-link">
          {image}
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
