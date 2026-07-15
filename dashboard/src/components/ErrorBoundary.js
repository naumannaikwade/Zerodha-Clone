import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#f8f9fa',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h2 style={{ color: '#dc3545', marginBottom: '20px' }}>Something went wrong</h2>
          <div style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '8px', 
            border: '1px solid #dee2e6',
            maxWidth: '600px',
            textAlign: 'left'
          }}>
            <p style={{ marginBottom: '10px' }}>
              <strong>Error:</strong> {this.state.error && this.state.error.toString()}
            </p>
            <details style={{ whiteSpace: 'pre-wrap', fontSize: '14px' }}>
              <summary style={{ cursor: 'pointer', marginBottom: '10px' }}>
                Error Details
              </summary>
              {this.state.errorInfo.componentStack}
            </details>
            <button 
              onClick={() => window.location.reload()} 
              style={{
                marginTop: '15px',
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;