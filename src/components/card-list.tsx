import type { Movie } from '@/models/interfaces';
import { Component } from 'react';

interface Props {
  movies: Movie[];
}

export class CardList extends Component<Props, unknown> {
  render() {
    return (
      <section>
        <ul>
          {this.props.movies.map((movie) => (
            <li key={movie.imdbID}>{movie.Title}</li>
          ))}
        </ul>
      </section>
    );
  }
}
