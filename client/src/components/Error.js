import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  /*static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }*/

  componentDidCatch(error, errorInfo) {
    this.setState(() => ({ hasError: true, error, errorInfo }));
  }

  render() {
    return this.state.hasError ? (
      <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
    ) : (
      this.props.children
    );
  }
}
