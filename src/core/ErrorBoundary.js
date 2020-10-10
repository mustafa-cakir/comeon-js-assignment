import React, { PureComponent } from 'react';

class ErrorBoundary extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        // console.log(error);
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // log the error to an error reporting service
        // logErrorToMyService(error, errorInfo);
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            // Render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }

        return children;
    }
}

export default ErrorBoundary;
