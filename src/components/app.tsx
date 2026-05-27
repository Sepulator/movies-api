import { ErrorBoundary } from './error-boundary';
import { ErrorInfo } from './error-info';
import { Footer } from './footer';
import { Header } from './header';
import { Main } from './main';
import { ThemeProvider } from './theme-provider';

export function App() {
  return (
    <ErrorBoundary Fallback={ErrorInfo}>
      <ThemeProvider>
        <Header />
        <Main />
        <Footer />
      </ThemeProvider>
    </ErrorBoundary>
  );
}
