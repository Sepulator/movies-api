import { url } from '@/consts';
import { http, HttpResponse } from 'msw';
import { mockMovie } from './mocks';

export const handlers = [
  http.get(url, () => {
    return HttpResponse.json(mockMovie);
  }),
];
