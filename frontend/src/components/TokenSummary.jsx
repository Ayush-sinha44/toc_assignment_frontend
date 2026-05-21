import './TokenSummary.css';

const TOKEN_COLORS = {
  KEYWORD:      '#6CB6FF',
  IDENTIFIER:   '#7EE787',
  NUMBER:       '#E3B341',
  OPERATOR:     '#BC8CFF',
  DELIMITER:    '#8B949E',
  PARENTHESIS:  '#D2B45A',
  BRACKET:      '#D2B45A',
  BRACE:        '#D2B45A',
  STRING:       '#56D4CF',
  CHARACTER:    '#56D4CF',
  COMMENT:      '#6E7681',
  PREPROCESSOR: '#F778BA',
  INVALID:      '#FF7B72',
};

function getColor(type) {
  return TOKEN_COLORS[type] || '#8B949E';
}

function TokenSummary({ summary, totalTokens }) {
  const entries = Object.entries(summary).filter(([, count]) => count > 0);

  if (entries.length === 0) return null;

  return (
    <div className="token-summary fade-in-up" id="token-summary">
      <div className="summary-header">
        <h2 className="summary-title">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 3a1 1 0 011-1h12a1 1 0 011 1v10a1 1 0 01-1 1H2a1 1 0 01-1-1V3zm1 0v10h12V3H2z" fill="currentColor"/>
            <path d="M4 5.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-2z" fill="currentColor"/>
          </svg>
          Token Summary
        </h2>
        <div className="summary-total">
          <span className="total-count">{totalTokens}</span>
          <span className="total-label">total tokens</span>
        </div>
      </div>

      <div className="summary-badges">
        {entries.map(([type, count]) => (
          <div
            key={type}
            className="summary-badge"
            style={{
              borderColor: `${getColor(type)}33`,
              backgroundColor: `${getColor(type)}0D`,
            }}
          >
            <span
              className="badge-dot"
              style={{ backgroundColor: getColor(type) }}
            />
            <span className="badge-type">{type}</span>
            <span
              className="badge-count"
              style={{ color: getColor(type) }}
            >
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TokenSummary;
