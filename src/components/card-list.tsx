import { Component } from 'react';

interface Props {
  query: string;
}

export class CardList extends Component<Props, unknown> {
  render() {
    return (
      <section>
        <h2>{this.props.query}</h2>
      </section>
    );
  }
}
