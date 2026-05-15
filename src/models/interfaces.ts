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
  Error?: string;
}

export interface MovieInfo {
  Title: string;
  Released: string;
  Genre: string;
  Poster: string;
  imdbID: string;
  imdbRating: string;
  Response: 'True' | 'False';
  Error?: string;
  // Rated: string;
  // Runtime: string;
  // Director: string;
  // Writer: string;
  // Actors: string;
  // Plot: string;
  // Language: string;
  // Country: string;
  // Awards: string;
  // Ratings: { Source: string; Value: string }[];
  // Metascore: string;
  // imdbVotes: string;
  // Type: string;
  // DVD: string;
  // BoxOffice: string;
  // Production: string;
  // Website: string;
}

export type MovieSearch = {
  search: string;
  page: number;
};
