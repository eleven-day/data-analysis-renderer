import React, { useState, useEffect, useRef } from 'react';
import Split from 'react-split';
import { renderMarkdown } from './utils/markdownRenderer';
import { renderHtmlContent } from './utils/htmlRenderer';
import { exportToTxt, exportToPdf } from './utils/exportUtils';
import './App.css';
import ApiIntegration from './components/ApiIntegration';
import * as d3 from 'd3';

// 声明全局d3
declare global {
  interface Window {
    d3: any;
  }
}

function App() {
  const [rawText, setRawText] = useState<string>('');
  const [renderedHtml, setRenderedHtml] = useState<string>('');
  const previewRef = useRef<HTMLDivElement>(null);

  // 保证d3总是全局挂载（防止脚本提前执行）
  useEffect(() => {
    window.d3 = d3;
  }, []);

  useEffect(() => {
    // 1. 渲染markdown to an HTML string
    const html = renderMarkdown(rawText);
    setRenderedHtml(html);
  }, [rawText]);

  // Add a new useEffect hook to handle HTML rendering after the DOM updates
  useEffect(() => {
    if (previewRef.current) {
      renderHtmlContent(previewRef.current);
    }
  }, [renderedHtml]);

  const handleApiTextInput = async (text: string) => {
    setRawText(text);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRawText(e.target.value);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Data Analysis Renderer</h1>
        <div className="button-group">
          <button onClick={() => exportToTxt(rawText)}>Export Raw Text</button>
          <button onClick={() => {
            if (previewRef.current) {
              exportToPdf(previewRef);
            }
          }}>Export as PDF</button>
        </div>
      </header>
      <ApiIntegration onTextReceived={handleApiTextInput} />

      <Split className="split-container" sizes={[50, 50]} minSize={200}>
        <div className="editor-container">
          <h2>Raw Text</h2>
          <textarea
            value={rawText}
            onChange={handleTextChange}
            placeholder="Enter markdown and HTML chart code here..."
          />
        </div>
        <div className="preview-container">
          <h2>Preview</h2>
          <div
            ref={previewRef}
            className="preview-content"
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />
        </div>
      </Split>
    </div>
  );
}

export default App;