import { Component, createRef, type ChangeEvent, type SubmitEvent } from 'react';
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
  ref = createRef<HTMLInputElement>();

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

  componentDidMount() {
    if (this.ref.current) {
      this.ref.current.focus();
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={cs.form}>
        <input
          ref={this.ref}
          type="search"
          name="search"
          aria-label={this.props.placeholder}
          value={this.state.query}
          placeholder={this.props.placeholder || ''}
          className={cs.input}
          onChange={this.handleChange}
        />
        <button type="submit" className={cs.button}>
          Search
        </button>
      </form>
    );
  }
}
