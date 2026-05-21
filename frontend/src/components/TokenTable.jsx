import './TokenTable.css';

const TOKEN_COLORS = {
  KEYWORD:      { bg: 'rgba(74, 136, 210, 0.15)',  color: '#6CB6FF' },
  IDENTIFIER:   { bg: 'rgba(63, 185, 80, 0.15)',   color: '#7EE787' },
  NUMBER:       { bg: 'rgba(210, 153, 34, 0.15)',   color: '#E3B341' },
  OPERATOR:     { bg: 'rgba(163, 113, 247, 0.15)',  color: '#BC8CFF' },
  DELIMITER:    { bg: 'rgba(139, 148, 158, 0.12)',  color: '#8B949E' },
  PARENTHESIS:  { bg: 'rgba(210, 175, 60, 0.12)',   color: '#D2B45A' },
  BRACKET:      { bg: 'rgba(210, 175, 60, 0.12)',   color: '#D2B45A' },
  BRACE:        { bg: 'rgba(210, 175, 60, 0.12)',   color: '#D2B45A' },
  STRING:       { bg: 'rgba(58, 175, 169, 0.15)',   color: '#56D4CF' },
  CHARACTER:    { bg: 'rgba(58, 175, 169, 0.15)',   color: '#56D4CF' },
  COMMENT:      { bg: 'rgba(110, 118, 129, 0.1)',   color: '#6E7681' },
  PREPROCESSOR: { bg: 'rgba(219, 97, 162, 0.15)',   color: '#F778BA' },
  INVALID:      { bg: 'rgba(248, 81, 73, 0.15)',    color: '#FF7B72' },
};

function getTokenStyle(type) {
  return TOKEN_COLORS[type] || TOKEN_COLORS.DELIMITER;
}

function TokenTable({ tokens, loading, error, hasAnalyzed }) {
  // Loading skeleton
  if (loading) {
    return (
      <div className="token-table-wrapper">
        <div className="token-loading">
          <div className="loading-indicator">
            <span className="loading-spinner" />
            <span>Analyzing tokens…</span>
          </div>
          <div className="skeleton-rows">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="skeleton-row" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="skeleton-cell skeleton-num" />
                <div className="skeleton-cell skeleton-lexeme" />
                <div className="skeleton-cell skeleton-type" />
                <div className="skeleton-cell skeleton-line" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="token-table-wrapper">
        <div className="token-error fade-in" id="error-banner">
          <div className="error-icon">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1a7 7 0 100 14A7 7 0 008 1zM7.5 4.5a.5.5 0 011 0v3.5a.5.5 0 01-1 0V4.5zM8 10a.75.75 0 100 1.5A.75.75 0 008 10z" fill="currentColor"/>
            </svg>
          </div>
          <div className="error-content">
            <strong>Analysis Failed</strong>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Empty state — no analysis yet
  if (!hasAnalyzed || tokens.length === 0) {
    return (
      <div className="token-table-wrapper">
        <div className="token-empty">
          <div className="empty-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="8" width="40" height="32" rx="4" stroke="var(--border-color)" strokeWidth="2" fill="none"/>
              <path d="M14 20l4 4-4 4" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="22" y1="28" x2="34" y2="28" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <p className="empty-title">No tokens yet</p>
          <p className="empty-subtitle">Enter C code and click <strong>Analyze</strong> to see the tokenized output</p>
        </div>
      </div>
    );
  }

  // Token table
  return (
    <div className="token-table-wrapper">
      <div className="token-table-scroll">
        <table className="token-table" id="token-table">
          <thead>
            <tr>
              <th className="col-num">#</th>
              <th className="col-lexeme">Lexeme</th>
              <th className="col-type">Type</th>
              <th className="col-line">Line</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token, index) => {
              const style = getTokenStyle(token.type);
              return (
                <tr
                  key={index}
                  className="token-row fade-in"
                  style={{ animationDelay: `${Math.min(index * 0.02, 0.5)}s` }}
                >
                  <td className="col-num">{index + 1}</td>
                  <td className="col-lexeme">
                    <code className={token.type === 'COMMENT' ? 'lexeme-comment' : ''}>
                      {token.lexeme}
                    </code>
                  </td>
                  <td className="col-type">
                    <span
                      className="token-badge"
                      style={{
                        backgroundColor: style.bg,
                        color: style.color,
                      }}
                    >
                      {token.type}
                    </span>
                  </td>
                  <td className="col-line">{token.line}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TokenTable;
