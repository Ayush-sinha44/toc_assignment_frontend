import { useState, useCallback } from 'react';
import Header from './components/Header.jsx';
import CodeEditor from './components/CodeEditor.jsx';
import TokenTable from './components/TokenTable.jsx';
import TokenSummary from './components/TokenSummary.jsx';
import './App.css';

const API_BASE = import.meta.env.VITE_API_URL;

const DEFAULT_CODE = `
// Developed By Ayush Sinha,Department of computer science and engineering @ Tezpur University
#include <stdio.h>

int main() {
    int x = 42;
    float pi = 3.14;
    char *msg = "Hello, World!";
    
    // Print the message
    if (x > 0) {
        printf("%s\\n", msg);
    }
    
    return 0;
  

    //if you will type random gibberish then it will still consider it as an identifer because In C, an identifier is defined as any sequence matching [a-zA-Z_][a-zA-Z0-9_]* that's the lexical rule.
    // random gibberish like ayushsinha43532u2ou wil be considered as an identifier too.
}`;

function App() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [tokens, setTokens] = useState([]);
  const [summary, setSummary] = useState({});
  const [totalTokens, setTotalTokens] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  const analyzeCode = useCallback(async () => {
    if (!code.trim()) {
      setError('Please enter some C code to analyze.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Analysis failed');
      }

      const data = await response.json();
      setTokens(data.tokens);
      setSummary(data.summary);
      setTotalTokens(data.totalTokens);
      setHasAnalyzed(true);
    } catch (err) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError('Cannot connect to the backend server. Make sure it is running on http://localhost:3000');
      } else {
        setError(err.message || 'An unexpected error occurred.');
      }
      setTokens([]);
      setSummary({});
      setTotalTokens(0);
    } finally {
      setLoading(false);
    }
  }, [code]);

  const handleClear = useCallback(() => {
    setCode('');
    setTokens([]);
    setSummary({});
    setTotalTokens(0);
    setError(null);
    setHasAnalyzed(false);
  }, []);

  return (
    <div className="app">
      <Header
        onAnalyze={analyzeCode}
        onClear={handleClear}
        loading={loading}
        hasCode={code.trim().length > 0}
      />

      <main className="app-main">
        <div className="panels">
          <div className="panel panel-left">
            <div className="panel-header">
              <span className="panel-title">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 3.5A1.5 1.5 0 013.5 2h9A1.5 1.5 0 0114 3.5v9a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 012 12.5v-9zM3.5 3a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5h-9z" fill="currentColor"/>
                  <path d="M5 5.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5zM5.5 7.5a.5.5 0 000 1h3a.5.5 0 000-1h-3z" fill="currentColor"/>
                </svg>
                Source Code
              </span>
              <span className="panel-badge">C</span>
            </div>
            <CodeEditor
              code={code}
              onChange={setCode}
              onAnalyze={analyzeCode}
            />
          </div>

          <div className="panel panel-right">
            <div className="panel-header">
              <span className="panel-title">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 2A1.5 1.5 0 013 .5h10A1.5 1.5 0 0114.5 2v12a1.5 1.5 0 01-1.5 1.5H3A1.5 1.5 0 011.5 14V2zM3 1.5a.5.5 0 00-.5.5v12a.5.5 0 00.5.5h10a.5.5 0 00.5-.5V2a.5.5 0 00-.5-.5H3z" fill="currentColor"/>
                  <path d="M4 4h8v1H4V4zM4 7h8v1H4V7zM4 10h5v1H4v-1z" fill="currentColor"/>
                </svg>
                Token Output
              </span>
              {hasAnalyzed && (
                <span className="panel-badge accent">{totalTokens} tokens</span>
              )}
            </div>
            <TokenTable
              tokens={tokens}
              loading={loading}
              error={error}
              hasAnalyzed={hasAnalyzed}
            />
          </div>
        </div>

        {hasAnalyzed && Object.keys(summary).length > 0 && (
          <TokenSummary summary={summary} totalTokens={totalTokens} />
        )}
      </main>
    </div>
  );
}

export default App;
