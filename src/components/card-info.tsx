'use client';

import Link from 'next/link';
import Image from 'next/image';

import type { MovieInfo } from '@/models/interfaces';
import { useSearchParams } from 'next/navigation';

interface Props {
  data: MovieInfo;
}

export function CardInfo({ data }: Props) {
  const searchParams = useSearchParams();
  const { Poster, Title, Released, imdbRating, Genre, Response, Error } = data;

  if (Response === 'False') {
    return <h2 style={{ textAlign: 'center' }}>{Error || 'Select movie card from list.'}</h2>;
  }

  return (
    <article className="card-info">
      <Image src={Poster} alt={Title} width={266} height={393} />
      <p>{Title}</p>
      <footer className="table">
        <span>Release date</span>
        <h3>{Released}</h3>
        <span>Genres</span>
        <h3>{Genre}</h3>
        <span>IMDB rating</span>
        <h3>{imdbRating}</h3>
      </footer>

      <Link href={`/?${searchParams.toString()}`}>Close</Link>
    </article>
  );
}
