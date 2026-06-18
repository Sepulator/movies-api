'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';

import type { Movie } from '@/models/interfaces';
import { useIsFavorite, useToggleFavorite } from '@/store/selectors';

interface Props {
  movie: Movie;
}

export function Card({ movie }: Props) {
  const searchParams = useSearchParams();
  const { Poster, Title, Year, imdbID } = movie;
  const isFavorite = useIsFavorite(imdbID);
  const toggleFavorite = useToggleFavorite();
  const t = useTranslations('Card');

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
        {isFavorite ? t('remove') : t('add')}
      </button>
    </article>
  );
}
