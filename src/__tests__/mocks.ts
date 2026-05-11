import type { Movie, Result } from '@/models/interfaces';

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
