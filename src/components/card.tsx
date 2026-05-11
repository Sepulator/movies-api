import type { Movie } from '@/models/interfaces';
import { Component } from 'react';

interface Props {
  movie: Movie;
}

export class Card extends Component<Props, unknown> {
  render() {
    const { Poster, Title, Year } = this.props.movie;
    return (
      <li>
        <article>
          <img src={Poster} alt={Title} />
          <p>{Title}</p>
          <footer>
            <h3>{Year}</h3>
          </footer>
        </article>
      </li>
    );
  }
}
