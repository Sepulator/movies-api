import { Main } from './main';
import { Header } from './header';
import { Footer } from './footer';
import { ErrorInfo } from './error-info';
import { ErrorBoundary } from './error-boundary';

export function App() {
  return (
    <ErrorBoundary Fallback={ErrorInfo}>
      <Header />
      <Main />
      <Footer />
    </ErrorBoundary>
  );
}
