import React, { useState, useRef } from 'react';
import './App.css';
import EmailSignatureForm from './components/EmailSignatureForm';
import EmailSignature from './components/EmailSignature';

function App() {
  const [signatureData, setSignatureData] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const signatureRef = useRef(null);

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
              <EmailSignature data={signatureData} />
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
