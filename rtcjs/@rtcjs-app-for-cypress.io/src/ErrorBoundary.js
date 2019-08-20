import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, info: '', error: '' };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log('ERROR', error);
    console.log('INFO', info);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1 id="dom-error">Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
