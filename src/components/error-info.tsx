import { Component } from 'react';
import { Header } from './header';

interface Props {
  err: Error;
  reset: () => void;
}

export class ErrorInfo extends Component<Props, unknown> {
  render() {
    return (
      <>
        <Header />
        <main>
          <h2>Something went wrong!</h2>
          <article style={{ border: '1px solid red' }}>
            <p style={{ color: 'red' }}>{this.props.err.message}</p>
            <footer>
              <button type="button" onClick={this.props.reset}>
                Reset UI
              </button>
            </footer>
          </article>
        </main>
      </>
    );
  }
}
