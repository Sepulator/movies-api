import { url } from '@/consts';
import { http, HttpResponse } from 'msw';
import { mockNoResult, mockResult } from './mocks';

export const handlers = [
  http.get(url, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('s');

    if (query === 'not-found') {
      return HttpResponse.json(mockNoResult);
    }

    if (query === 'terminator') {
      return HttpResponse.json(mockResult);
    }

    return HttpResponse.json(mockResult);
  }),
];
