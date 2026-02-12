import React from 'react';
import './ClassicTemplate.css';

function ClassicTemplate({ data }) {
  const { name, profession, email, phone, website } = data;

  const linkStyle = {
    color: '#1a1a1a',
    textDecoration: 'none',
    fontSize: '12px'
  };

  return (
    <table cellPadding="0" cellSpacing="0" border="0" style={{
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      color: '#333333',
      lineHeight: '1.6',
      width: '100%',
      maxWidth: '400px',
      backgroundColor: '#ffffff',
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
              color: '#1a1a1a',
              marginBottom: '2px'
            }}>
              {name}
            </div>

            {/* Profession */}
            <div style={{
              fontSize: '13px',
              color: '#666666',
              marginBottom: '8px'
            }}>
              {profession}
            </div>

            {/* Divider */}
            <div style={{
              borderTop: '2px solid #1a1a1a',
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
                {website && (
                  <tr>
                    <td style={{ paddingBottom: '4px' }}>
                      <a
                        href={website.startsWith('http') ? website : `https://${website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={linkStyle}
                      >
                        {website.replace(/^https?:\/\//, '')}
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
