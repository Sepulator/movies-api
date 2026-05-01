import { Component, type ChangeEvent, type SubmitEvent } from 'react';

interface State {
  query: string;
}

interface Props {
  placeholder?: string;
  initialValue?: string;
  onSearch: (value: string) => void;
}

export class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      query: props.initialValue || '',
    };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: event.target.value.trim(),
    });
  };

  handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.onSearch(this.state.query);
    localStorage.setItem('query', this.state.query);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} role="search">
        <input
          type="search"
          name="search"
          value={this.state.query}
          placeholder={this.props.placeholder || ''}
          onChange={this.handleChange}
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}
