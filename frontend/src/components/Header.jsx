import './Header.css';

function Header({ onAnalyze, onClear, loading, hasCode }) {
  return (
    <header className="header" id="app-header">
      <div className="header-inner">
        <div className="header-brand">
          <div className="header-logo">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="28" height="28" rx="6" fill="var(--accent)" fillOpacity="0.15"/>
              <text x="14" y="19" textAnchor="middle" fill="var(--accent)" fontSize="15" fontWeight="700" fontFamily="var(--font-mono)">C</text>
            </svg>
          </div>
          <div className="header-text">
            <h1 className="header-title">C Lexical Analyzer</h1>
            <p className="header-subtitle">Token-level analysis of C source code &middot; Powered by Flex</p>
          </div>
        </div>

        <div className="header-actions">
          <button
            id="clear-button"
            className="btn btn-ghost"
            onClick={onClear}
            disabled={loading}
            title="Clear editor and results"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 01.708.708L8.707 8l2.647 2.646a.5.5 0 01-.708.708L8 8.707l-2.646 2.647a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708z" fill="currentColor"/>
            </svg>
            Clear
          </button>

          <button
            id="analyze-button"
            className="btn btn-primary"
            onClick={onAnalyze}
            disabled={loading || !hasCode}
            title="Analyze code (Ctrl+Enter)"
          >
            {loading ? (
              <>
                <span className="spinner" />
                Analyzing…
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.251.068a.5.5 0 01.227.58L9.677 6.5H13a.5.5 0 01.364.843l-8 8.5a.5.5 0 01-.842-.49L6.323 9.5H3a.5.5 0 01-.364-.843l8-8.5a.5.5 0 01.615-.089z" fill="currentColor"/>
                </svg>
                Analyze
              </>
            )}
          </button>
        </div>
      </div>

      <div className="header-shortcut-hint">
        <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to analyze
      </div>
    </header>
  );
}

export default Header;
