import { Component } from 'react';
import { Search } from './search';
import { CardList } from './card-list';

interface State {
  query: string;
}

export class Main extends Component<unknown, State> {
  state: State = {
    query: '',
  };

  onSearch = (value: string) => {
    this.setState({ query: value });
  };

  render() {
    return (
      <main>
        <Search onSearch={this.onSearch} placeholder="Search..." />
        <CardList query={this.state.query} />
      </main>
    );
  }
}
