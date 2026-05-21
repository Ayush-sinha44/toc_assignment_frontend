import { useRef, useEffect, useCallback } from 'react';
import './CodeEditor.css';

function CodeEditor({ code, onChange, onAnalyze }) {
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);

  const lines = code.split('\n');
  const lineCount = lines.length;
  const charCount = code.length;

  // Sync scroll between textarea and line numbers
  const handleScroll = useCallback(() => {
    if (lineNumbersRef.current && textareaRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, []);

  // Keyboard shortcut: Ctrl/Cmd+Enter to analyze
  const handleKeyDown = useCallback((e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onAnalyze();
    }
    // Allow Tab key for indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      onChange(newCode);
      // Restore cursor position
      requestAnimationFrame(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4;
      });
    }
  }, [code, onChange, onAnalyze]);

  // Keep line numbers scroll synced
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.addEventListener('scroll', handleScroll);
      return () => textarea.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return (
    <div className="code-editor" id="code-editor">
      <div className="editor-body">
        <div className="line-numbers" ref={lineNumbersRef} aria-hidden="true">
          {Array.from({ length: lineCount }, (_, i) => (
            <span key={i + 1} className="line-number">{i + 1}</span>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          id="code-input"
          className="editor-textarea"
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          placeholder={`// Enter your C source code here...\n#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`}
        />
      </div>
      <div className="editor-footer">
        <span className="editor-stat">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 2.5A.5.5 0 012 2h12a.5.5 0 010 1H2a.5.5 0 01-.5-.5zm0 4A.5.5 0 012 6h12a.5.5 0 010 1H2a.5.5 0 01-.5-.5zm0 4A.5.5 0 012 10h8a.5.5 0 010 1H2a.5.5 0 01-.5-.5zm0 4A.5.5 0 012 14h4a.5.5 0 010 1H2a.5.5 0 01-.5-.5z" fill="currentColor"/>
          </svg>
          {lineCount} {lineCount === 1 ? 'line' : 'lines'}
        </span>
        <span className="editor-stat">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 1.5a.5.5 0 01.5-.5h7A1.5 1.5 0 0113 2.5v11a1.5 1.5 0 01-1.5 1.5h-7A1.5 1.5 0 013 13.5v-11A.5.5 0 013.5 2h.5V1.5zM4.5 2H4v11.5a.5.5 0 00.5.5h7a.5.5 0 00.5-.5v-11a.5.5 0 00-.5-.5h-7z" fill="currentColor"/>
          </svg>
          {charCount.toLocaleString()} {charCount === 1 ? 'char' : 'chars'}
        </span>
        {charCount > 90000 && (
          <span className="editor-stat editor-stat-warn">
            ⚠ Approaching 100K limit
          </span>
        )}
      </div>
    </div>
  );
}

export default CodeEditor;
