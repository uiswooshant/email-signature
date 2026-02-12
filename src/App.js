import React, { useState, useRef, useEffect, useCallback } from 'react';
import './App.css';
import EmailSignatureForm from './components/EmailSignatureForm';
import EmailSignature from './components/EmailSignature';

const TEMPLATE_COLOR_DEFAULTS = {
  classic: { borderColor: '#1a1a1a', backgroundColor: '#ffffff' },
  modern: { borderColor: '#667eea', backgroundColor: '#f8f9fa' },
  creative: { borderColor: '#ff6b6b', backgroundColor: '#fff5e6' },
};

// Compute contrasting text color based on background luminance
function getContrastColor(hexColor) {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // sRGB to linear
  const toLinear = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const luminance = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);

  return luminance > 0.179 ? '#1a1a1a' : '#ffffff';
}

const BORDER_COLOR_LABELS = {
  classic: 'Divider Color',
  modern: 'Border Color',
  creative: 'Accent Color',
};

function App() {
  const [signatureData, setSignatureData] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [borderColor, setBorderColor] = useState('#1a1a1a');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const signatureRef = useRef(null);
  const prevTemplateRef = useRef(null);

  // Reset colors when template changes
  const resetColorsForTemplate = useCallback((template) => {
    const defaults = TEMPLATE_COLOR_DEFAULTS[template];
    if (defaults) {
      setBorderColor(defaults.borderColor);
      setBackgroundColor(defaults.backgroundColor);
    }
  }, []);

  useEffect(() => {
    if (signatureData && signatureData.template !== prevTemplateRef.current) {
      prevTemplateRef.current = signatureData.template;
      resetColorsForTemplate(signatureData.template);
    }
  }, [signatureData, resetColorsForTemplate]);

  const handleFormSubmit = (data) => {
    setSignatureData(data);
    setCopySuccess(false);
  };

  const handleCopyToClipboard = async () => {
    if (!signatureRef.current) return;

    try {
      // Get the HTML content
      const signatureHTML = signatureRef.current.innerHTML;

      // Create a temporary container to hold both HTML and plain text
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = signatureHTML;
      const plainText = tempDiv.innerText;

      // Use the Clipboard API to copy both HTML and plain text
      const clipboardItem = new ClipboardItem({
        'text/html': new Blob([signatureHTML], { type: 'text/html' }),
        'text/plain': new Blob([plainText], { type: 'text/plain' })
      });

      await navigator.clipboard.write([clipboardItem]);
      setCopySuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setCopySuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for browsers that don't support ClipboardItem
      fallbackCopy();
    }
  };

  const fallbackCopy = () => {
    if (!signatureRef.current) return;

    const range = document.createRange();
    range.selectNode(signatureRef.current);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    try {
      document.execCommand('copy');
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 3000);
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }

    window.getSelection().removeAllRanges();
  };

  const handleDownloadHTML = () => {
    if (!signatureRef.current) return;

    // Get the signature HTML with inline styles
    const signatureHTML = signatureRef.current.innerHTML;

    // Create a complete HTML document with the signature
    const fullHTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <title>Email Signature - ${signatureData.name}</title>
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif;">
    ${signatureHTML}
</body>
</html>`;

    // Create a Blob with the HTML content
    const blob = new Blob([fullHTML], { type: 'text/html' });

    // Create a temporary download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `email-signature-${signatureData.name.replace(/\s+/g, '-').toLowerCase()}.html`;

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="App">
      <div className="App-content">
        <div className="form-section">
          <EmailSignatureForm onSubmit={handleFormSubmit} />
        </div>

        {signatureData && (
          <div className="signature-section">
            <div className="signature-header">
              <h2>Your Email Signature</h2>
              <div className="action-buttons">
                <button
                  className={`copy-btn ${copySuccess ? 'copied' : ''}`}
                  onClick={handleCopyToClipboard}
                >
                  {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
                </button>
                <button
                  className="download-btn"
                  onClick={handleDownloadHTML}
                >
                  Download HTML
                </button>
              </div>
            </div>
            <div ref={signatureRef}>
              <EmailSignature data={{ ...signatureData, borderColor, backgroundColor, textColor: getContrastColor(backgroundColor) }} />
            </div>

            <div className="color-pickers-group">
              <h3 className="color-pickers-title">Customize Colors</h3>
              <div className="color-pickers">
                <div className="color-picker-item">
                  <label htmlFor="borderColor">{BORDER_COLOR_LABELS[signatureData.template] || 'Border Color'}</label>
                  <div className="color-input-wrapper">
                    <input
                      type="color"
                      id="borderColor"
                      name="borderColor"
                      value={borderColor}
                      onChange={(e) => setBorderColor(e.target.value)}
                    />
                    <span className="color-value">{borderColor}</span>
                  </div>
                </div>
                <div className="color-picker-item">
                  <label htmlFor="backgroundColor">Background Color</label>
                  <div className="color-input-wrapper">
                    <input
                      type="color"
                      id="backgroundColor"
                      name="backgroundColor"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                    />
                    <span className="color-value">{backgroundColor}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="copy-instructions">
              <p>To use this signature:</p>
              <ol>
                <li>Click the "Copy to Clipboard" button above</li>
                <li>Open your email client's signature settings</li>
                <li>Paste the signature (Ctrl+V or Cmd+V)</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
