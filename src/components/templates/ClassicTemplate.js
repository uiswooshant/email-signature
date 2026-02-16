import React from 'react';
import './ClassicTemplate.css';
import { normalizeWebsiteUrl, formatWebsiteDisplay } from '../../utils/contact';

function ClassicTemplate({ data }) {
  const { name, profession, email, phone, website, borderColor = '#1a1a1a', backgroundColor = '#ffffff', textColor = '#1a1a1a' } = data;

  // Derive a muted text color for secondary elements
  const secondaryTextColor = textColor === '#ffffff' ? 'rgba(255,255,255,0.65)' : '#666666';

  const websiteUrl = normalizeWebsiteUrl(website);
  const websiteDisplay = formatWebsiteDisplay(website);

  const linkStyle = {
    color: textColor,
    textDecoration: 'none',
    fontSize: '12px'
  };

  return (
    <table cellPadding="0" cellSpacing="0" border="0" style={{
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      color: textColor,
      lineHeight: '1.6',
      width: '100%',
      maxWidth: '400px',
      backgroundColor: backgroundColor,
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
    }}>
      <tbody>
        <tr>
          <td style={{ padding: '24px' }}>
            {/* Name */}
            <div style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: textColor,
              marginBottom: '2px'
            }}>
              {name}
            </div>

            {/* Profession */}
            <div style={{
              fontSize: '13px',
              color: secondaryTextColor,
              marginBottom: '8px'
            }}>
              {profession}
            </div>

            {/* Divider */}
            <div style={{
              borderTop: `2px solid ${borderColor}`,
              margin: '8px 0',
              width: '60px',
              height: '0px' // Explicit height for outlook
            }}></div>

            {/* Contact Info */}
            <table cellPadding="0" cellSpacing="0" border="0" width="100%" style={{ marginTop: '8px' }}>
              <tbody>
                <tr>
                  <td style={{ paddingBottom: '4px' }}>
                    <a href={`mailto:${email}`} style={linkStyle}>{email}</a>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingBottom: '4px' }}>
                    <a href={`tel:${phone}`} style={linkStyle}>{phone}</a>
                  </td>
                </tr>
                {websiteUrl && (
                  <tr>
                    <td style={{ paddingBottom: '4px' }}>
                      <a
                        href={websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={linkStyle}
                      >
                        {websiteDisplay}
                      </a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default ClassicTemplate;
