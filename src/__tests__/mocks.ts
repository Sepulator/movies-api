import type { Movie, MovieInfo, Result } from '@/models/interfaces';

export const mockMovie: Movie = {
  Title: 'Terminator 2: Judgment Day',
  Year: '1991',
  imdbID: 'tt0103064',
  Type: 'movie',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BNGMyMGNkMDUtMjc2Ni00NWFlLTgyODEtZTY2MzBiZTg0OWZiXkEyXkFqcGc@._V1_QL75_UX380_CR0,1,380,562_.jpg',
};

export const mockMovie2: Movie = {
  Title: 'The Terminator',
  Year: '1984',
  imdbID: 'tt0088247',
  Type: 'movie',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BZmE0YzIxM2QtMGNlMi00MjRmLWE3MWMtOWQzMGVjMmU0YTFmXkEyXkFqcGc@._V1_SX300.jpg',
};

export const mockMovies: Movie[] = [mockMovie, mockMovie2];

export const mockResult: Result = {
  Response: 'True',
  Search: mockMovies,
  totalResults: '2',
  Error: '',
};

export const mockNoResult: Result = {
  Response: 'False',
  Search: [],
  totalResults: '0',
  Error: 'Movie not found!',
};

export const mockMovieInfo: MovieInfo = {
  Title: 'Terminator 2: Judgment Day',
  Released: '03 Jul 1991',
  Genre: 'Action, Adventure, Sci-Fi',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BNGMyMGNkMDUtMjc2Ni00NWFlLTgyODEtZTY2MzBiZTg0OWZiXkEyXkFqcGc@._V1_QL75_UX380_CR0,1,380,562_.jpg',
  imdbRating: '8.6',
  imdbID: 'tt0103064',
  Response: 'True',
};

export const mockMovieInfoError: MovieInfo = {
  Poster: '',
  Title: '',
  Released: '',
  imdbRating: '',
  imdbID: '',
  Genre: '',
  Response: 'False',
  Error: 'Movie not found!',
};

export const mockNoMovie: MovieInfo = {
  Poster: '',
  Title: '',
  Released: '',
  imdbRating: '',
  imdbID: 'no-error',
  Genre: '',
  Response: 'False',
  Error: '',
};
