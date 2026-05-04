import { Component } from 'react';

interface State {
  isError: boolean;
}

export class Header extends Component<unknown, State> {
  state: State = { isError: false };

  handleClick = () => {
    this.setState({ isError: true });
  };

  render() {
    if (this.state.isError) {
      throw new Error('Error boundary tested!');
    }

    return (
      <header>
        <a href="/">
          <h1>Movie API</h1>
        </a>
        <button type="button" secondary="true" onClick={this.handleClick}>
          Error Button
        </button>
      </header>
    );
  }
}
