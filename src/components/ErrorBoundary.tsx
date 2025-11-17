'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

/**
 * Props for ErrorBoundary component
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * State for ErrorBoundary component
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * Follows React Error Boundary best practices for production applications
 * 
 * @see https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  /**
   * Updates state to render fallback UI on error
   */
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  /**
   * Logs error details for monitoring and debugging
   * In production, this should send errors to a monitoring service
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error details to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error);
      console.error('Error Info:', errorInfo);
    }

    // Store error details in state
    this.setState({
      error,
      errorInfo
    });

    // In production, send to error monitoring service
    // Example: Sentry, LogRocket, Datadog, etc.
    // reportErrorToService(error, errorInfo);
  }

  /**
   * Resets the error boundary state
   */
  resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Render custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="section">
          <div className="container">
            <div className="box has-background-danger-light">
              <h1 className="title is-4 has-text-danger">
                ⚠️ Something went wrong
              </h1>
              <p className="content">
                We apologize for the inconvenience. An unexpected error has occurred.
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="message is-danger mt-4">
                  <div className="message-header">
                    <p>Error Details (Development Only)</p>
                  </div>
                  <div className="message-body">
                    <pre style={{ 
                      whiteSpace: 'pre-wrap', 
                      wordBreak: 'break-word',
                      fontSize: '0.875rem'
                    }}>
                      <strong>Error:</strong> {this.state.error.toString()}
                      {this.state.errorInfo && (
                        <>
                          {'\n\n'}
                          <strong>Component Stack:</strong>
                          {this.state.errorInfo.componentStack}
                        </>
                      )}
                    </pre>
                  </div>
                </div>
              )}

              <div className="buttons mt-4">
                <button 
                  className="button is-primary" 
                  onClick={this.resetError}
                  type="button"
                >
                  Try Again
                </button>
                <a 
                  href="/" 
                  className="button is-light"
                >
                  Go to Home
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

