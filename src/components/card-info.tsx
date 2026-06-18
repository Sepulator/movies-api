'use client';

import Image from 'next/image';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import type { MovieInfo } from '@/models/interfaces';

interface Props {
  data: MovieInfo;
}

export function CardInfo({ data }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const t = useTranslations('Buttons');
  const { Poster, Title, Released, imdbRating, Genre, Response, Error } = data;

  if (Response === 'False') {
    return <h2 style={{ textAlign: 'center' }}>{Error || 'Select movie card from list.'}</h2>;
  }

  const closeParams = new URLSearchParams(searchParams);
  closeParams.delete('detailsId');

  return (
    <article className="card-info">
      <Image src={Poster} alt={Title} width={266} height={393} style={{ width: '266px', height: '393px' }} />
      <p>{Title}</p>
      <footer className="table">
        <span>Release date</span>
        <h3>{Released}</h3>
        <span>Genres</span>
        <h3>{Genre}</h3>
        <span>IMDB rating</span>
        <h3>{imdbRating}</h3>
      </footer>

      <Link href={{ pathname, query: closeParams.toString() }}>{t('close')}</Link>
    </article>
  );
}
