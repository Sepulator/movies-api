import { Component, type ComponentType, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  Fallback: ComponentType<{ err: Error; reset: () => void }>;
}

interface State {
  hasError: boolean;
  err: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, err: null };
  }

  static getDerivedStateFromError(err: Error) {
    return { hasError: true, err };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo.componentStack);
  }

  resetError = () => {
    this.setState({ hasError: false, err: null });
  };

  render() {
    const { Fallback } = this.props;

    if (this.state.hasError && this.state.err) {
      return <Fallback err={this.state.err} reset={this.resetError} />;
    }

    return this.props.children;
  }
}
