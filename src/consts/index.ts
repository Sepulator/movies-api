import { getApiKey } from '@/utils/convert';

const defaultTerm = 'terminator';
const apiKey = getApiKey();

export const url = 'https://www.omdbapi.com/';
export const getUrl = (searchTerm: string) => `${url}?s=${searchTerm || defaultTerm}&apikey=${apiKey}`;
