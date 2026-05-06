import { Component, type ChangeEvent, type SubmitEvent } from 'react';
import cs from './search.module.css';

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
      query: event.target.value,
    });
  };

  handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.props.onSearch(this.state.query.trim());
    localStorage.setItem('query', this.state.query.trim());
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={cs.form}>
        <input
          type="search"
          name="search"
          aria-label={this.props.placeholder}
          value={this.state.query}
          placeholder={this.props.placeholder || ''}
          onChange={this.handleChange}
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}
