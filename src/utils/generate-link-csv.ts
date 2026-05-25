import type { Movie } from '@/models/interfaces';

export const generateCSV = (movies: Movie[]) =>
  movies.reduce((accum, movie) => {
    return accum + `${movie.imdbID}; ${movie.Title}; ${movie.Year}; ${movie.Type} \n`;
  }, 'IMDB; Title; Release; Type \n');

export const getDownloadURL = (movies: Movie[]) => {
  const data = generateCSV(movies);
  const blob = new Blob([data], { type: 'text/csv; charset=utf-8' });
  const url = URL.createObjectURL(blob);

  return url;
};
