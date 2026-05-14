import { Component } from "react";
import OfflineScreen from "@components/OfflineScreen";

/**
 * Catches render errors in the tree (e.g. failed lazy chunks). Retry reloads the app.
 */
export default class AppErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("AppErrorBoundary:", error, info);
  }

  handleRetry = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <OfflineScreen
          variant="error"
          onRetry={this.handleRetry}
          detail={this.state.error?.message}
        />
      );
    }
    return this.props.children;
  }
}
