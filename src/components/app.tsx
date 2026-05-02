import { Component } from 'react';
import { Main } from './main';
import { Header } from './header';
import { Footer } from './footer';
import { ErrorInfo } from './error-info';
import { ErrorBoundary } from './error-boundary';

export class App extends Component<unknown, unknown> {
  render() {
    return (
      <ErrorBoundary Fallback={ErrorInfo}>
        <Header />
        <Main />
        <Footer />
      </ErrorBoundary>
    );
  }
}

export default App;
