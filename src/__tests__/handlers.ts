import { url } from '@/consts';
import { http, HttpResponse } from 'msw';
import { mockMovieInfo, mockMovieInfoError, mockNoMovie, mockNoResult, mockResult } from './mocks';

export const handlers = [
  http.get(url, ({ request }) => {
    const requestUrl = new URL(request.url);
    const query = requestUrl.searchParams.get('s');
    const movieId = requestUrl.searchParams.get('i');

    if (movieId) {
      if (movieId === mockMovieInfo.imdbID) {
        return HttpResponse.json(mockMovieInfo);
      }

      if (movieId === mockNoMovie.imdbID) {
        return HttpResponse.json(mockNoMovie);
      }

      return HttpResponse.json(mockMovieInfoError);
    }

    if (query === 'not-found') {
      return HttpResponse.json(mockNoResult);
    }

    if (query === 'terminator') {
      return HttpResponse.json(mockResult);
    }

    return HttpResponse.json(mockResult);
  }),
];
