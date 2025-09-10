'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error for debugging but don't crash the app
    console.warn('Error boundary caught an error:', error, errorInfo);
    
    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Track error with fallback analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      try {
        window.gtag('event', 'exception', {
          description: error.toString(),
          fatal: false,
        });
      } catch (trackingError) {
        console.warn('Error tracking failed:', trackingError);
      }
    }
  }

  render() {
    if (this.state.hasError) {
      // Return fallback UI or just continue rendering children
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Silent fallback - don't show error to users, just continue
      return null;
    }

    return this.props.children;
  }
}

// Script Error Boundary - specifically for handling external script failures
interface ScriptErrorBoundaryProps {
  children: React.ReactNode;
  scriptName?: string;
}

export function ScriptErrorBoundary({ children, scriptName = 'external script' }: ScriptErrorBoundaryProps) {
  return (
    <ErrorBoundary
      onError={(error) => {
        console.info(`${scriptName} failed to load, continuing without it:`, error.message);
      }}
      fallback={null} // Silent failure
    >
      {children}
    </ErrorBoundary>
  );
}

// Network-aware component wrapper
export function NetworkResilientComponent({ 
  children, 
  fallback 
}: { 
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const [isOnline, setIsOnline] = React.useState(true);
  
  React.useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    // Check initial status
    updateOnlineStatus();

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  if (!isOnline && fallback) {
    return <>{fallback}</>;
  }

  return <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>;
}