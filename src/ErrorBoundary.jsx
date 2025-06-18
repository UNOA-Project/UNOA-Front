import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    console.log("ErrorBoundary - error", error);

    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 로깅
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "20px",
            margin: "20px",
            border: "1px solid #ff6b6b",
            borderRadius: "8px",
            backgroundColor: "#fff5f5",
            color: "#d63031",
          }}
        >
          <h2>🚨 애플리케이션 오류가 발생했습니다</h2>
          <details style={{ whiteSpace: "pre-wrap", marginTop: "16px" }}>
            <summary>오류 세부사항 보기</summary>
            <div style={{ marginTop: "10px", fontSize: "14px" }}>
              <strong>Error:</strong>
              <pre>{this.state.error && this.state.error.toString()}</pre>

              <strong>Component Stack:</strong>
              <pre>
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </div>
          </details>

          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "16px",
              padding: "8px 16px",
              backgroundColor: "#667eea",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            페이지 새로고침
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
