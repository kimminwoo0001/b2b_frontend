import React from "react";
import { goHome } from "../lib/pagePath";
export default class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: { message: "", stack: "" },
    info: { componentStack: "" }
  };

  static getDerivedStateFromError = (error) => {
    return { hasError: false };
  };

  componentDidCatch = (error, info) => {
    this.setState({ error, info });
  };

  render() {
    const { hasError, error, info } = this.state;
    const { children } = this.props;
    if (this.state.hasError) {
      console.log("error:");
      sessionStorage.clear();
      this.props.history.push(goHome);
    }
    return this.props.children;
  }
}
