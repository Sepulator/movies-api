import { url } from '@/consts';
import type { Movie } from '@/models/interfaces';
import { http, HttpResponse } from 'msw';

export const mockMovie: Movie = {
  Title: 'Terminator 2: Judgment Day',
  Year: '1991',
  imdbID: 'tt0103064',
  Type: 'movie',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BNGMyMGNkMDUtMjc2Ni00NWFlLTgyODEtZTY2MzBiZTg0OWZiXkEyXkFqcGc@._V1_QL75_UX380_CR0,1,380,562_.jpg',
};

export const handlers = [
  http.get(url, () => {
    return HttpResponse.json(mockMovie);
  }),
];
