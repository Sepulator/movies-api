import { Component } from 'react';
import { Search } from './search';
import { CardList } from './card-list';
import type { Result } from '@/models/interfaces';
import { getApiKey } from '@/utils/convert';

interface State {
  query: string;
  abort: AbortController | null;
  loading: boolean;
  data: Result;
}

export class Main extends Component<unknown, State> {
  state: State = {
    query: '',
    abort: null,
    loading: false,
    data: { Search: [], totalResults: '0', Response: 'True', Error: '' },
  };

  constructor(props: unknown) {
    super(props);
    this.state.query = localStorage.getItem('query') || '';
  }

  onSearch = (value: string) => {
    this.setState({ query: value });
  };

  fetchMovies = async () => {
    const currentAbortController = new AbortController();
    this.setState({ abort: currentAbortController });
    this.setState({ loading: true });
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
      this.setState({ loading: false });
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
      this.setState({ loading: false });
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
    return (
      <main>
        <Search
          onSearch={this.onSearch}
          placeholder="Search..."
          initialValue={this.state.query}
        />
        <hr role="separator" />
        <CardList data={this.state.data} loading={this.state.loading} />
      </main>
    );
  }
}
