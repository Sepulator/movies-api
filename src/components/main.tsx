import { Component } from 'react';
import { Search } from './search';
import { CardList } from './card-list';
import type { Result } from '@/models/interfaces';
import { getApiKey } from '@/utils/convert';

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
        `https://www.omdbapi.com/?s=${this.state.query || 'batman'}&apikey=${getApiKey()}`,
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
    this.fetchMovies().catch(() => {});
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
    if (this.state.data.Response === 'False')
      return (
        <main>
          <Search onSearch={this.onSearch} placeholder="Search..." />
          <hr role="separator" />
          <h2>{this.state.data.Error}</h2>
        </main>
      );

    return (
      <main>
        <Search onSearch={this.onSearch} placeholder="Search..." />
        <hr role="separator" />
        <CardList movies={this.state.data.Search} />
      </main>
    );
  }
}
