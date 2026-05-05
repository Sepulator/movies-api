export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface Result {
  Search: Movie[];
  totalResults: string;
  Response: 'True' | 'False';
  Error: string;
}
