import type { Result } from '@/models/interfaces';
import { Component } from 'react';
import { Card } from './card';
import cs from './card-list.module.css';

interface Props {
  data: Result;
  loading: boolean;
}

export class CardList extends Component<Props, unknown> {
  render() {
    if (this.props.loading) {
      return (
        <section
          aria-busy="true"
          aria-details="spinner"
          style={{ textAlign: 'center' }}
        ></section>
      );
    }

    if (this.props.data.Response === 'False') {
      return <h2 style={{ textAlign: 'center' }}>{this.props.data.Error}</h2>;
    }

    return (
      <section id="gallery">
        <ul className={cs.gallery}>
          {this.props.data.Search.map((movie) => (
            <Card key={movie.imdbID} movie={movie} />
          ))}
        </ul>
      </section>
    );
  }
}
