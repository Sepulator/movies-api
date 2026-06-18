'use server';

import type { Movie } from '@/models/interfaces';
import { generateCSV } from '@/utils/generate-link-csv';

/* eslint-disable-next-line */
export async function generateCsvAction(movies: Movie[]): Promise<string> {
  return generateCSV(movies);
}
