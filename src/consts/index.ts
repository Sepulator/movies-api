import type { MovieInfo, Result } from '@/models/interfaces';
import { getApiKey } from '@/utils/convert';

const defaultTerm = 'terminator';
const apiKey = getApiKey();

export const url = 'https://www.omdbapi.com/';
export const getUrl = (searchTerm: string) => `${url}?s=${searchTerm || defaultTerm}&apikey=${apiKey}`;
export const getMovie = (id: string) => `${url}?i=${id}&apikey=${apiKey}`;

export const emptyResult: Result = { Search: [], totalResults: '', Response: 'True' };
export const emptyMovie: MovieInfo = {
  Poster: '',
  Title: '',
  Genre: '',
  Released: '',
  imdbID: '',
  imdbRating: '',
  Response: 'True',
};
