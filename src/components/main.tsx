import { Component } from 'react';
import { Search } from './search';
import { CardList } from './card-list';
import type { Result } from '@/models/interfaces';

interface State {
  query: string;
  abort: AbortController | null;
  data: Result;
}

export class Main extends Component<unknown, State> {
  state: State = {
    query: '',
    abort: null,
    data: { Search: [], totalResults: '0', Response: 'True', Error: '' },
  };

  onSearch = (value: string) => {
    this.setState({ query: value });
  };

  fetchMovies = async () => {
    const currentAbortController = new AbortController();
    this.setState({ abort: currentAbortController });

    try {
      const fetched = await fetch(
        `https://www.omdbapi.com/?s=${this.state.query}&apikey=a8b80072`,
        { signal: currentAbortController.signal },
      );

      if (currentAbortController.signal.aborted) {
        return;
      }
      const data = (await fetched.json()) as unknown as Result;
      this.setState({ data });
    } catch (err) {
      const error =
        err instanceof Error
          ? err.message
          : 'An unexpected non-error exception occurred.';
      this.setState({
        data: {
          Search: [],
          totalResults: '0',
          Response: 'False',
          Error: error,
        },
      });
    }
  };

  componentDidMount() {
    if (this.state.query) {
      this.fetchMovies().catch(() => {});
    }
  }

  componentDidUpdate(
    _prevProps: Readonly<unknown>,
    prevState: Readonly<State>,
  ) {
    if (prevState.query !== this.state.query) {
      this.fetchMovies().catch(() => {});
    }
  }

  componentWillUnmount(): void {
    this.state.abort?.abort();
  }

  render() {
    if (this.state.data.Search.length > 0)
      return (
        <main>
          <Search onSearch={this.onSearch} placeholder="Search..." />
          <CardList movies={this.state.data.Search} />
        </main>
      );

    return (
      <main>
        <Search onSearch={this.onSearch} placeholder="Search..." />
      </main>
    );
  }
}
