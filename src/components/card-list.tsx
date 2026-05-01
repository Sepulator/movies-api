import type { Movie } from '@/models/interfaces';
import { Component } from 'react';
import { Card } from './card';
import cs from './card-list.module.css';

interface Props {
  movies: Movie[];
}

export class CardList extends Component<Props, unknown> {
  render() {
    return (
      <section id="gallery">
        <ul className={cs.gallery}>
          {this.props.movies.map((movie) => (
            <Card key={movie.imdbID} movie={movie} />
          ))}
        </ul>
      </section>
    );
  }
}
