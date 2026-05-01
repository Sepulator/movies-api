import { Component } from 'react';
import { Header } from './header';
import { Main } from './main';

export class App extends Component<unknown, unknown> {
  render() {
    return (
      <>
        <Header />
        <Main />
      </>
    );
  }
}

export default App;
