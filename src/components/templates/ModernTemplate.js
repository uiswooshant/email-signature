import React from 'react';
import './ModernTemplate.css';

function ModernTemplate({ data }) {
  const { name, profession, email, phone, website, borderColor = '#667eea', backgroundColor = '#f8f9fa' } = data;

  const linkStyle = {
    color: '#2c3e50',
    textDecoration: 'none',
    fontSize: '12px'
  };

  return (
    <table cellPadding="0" cellSpacing="0" border="0" style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      fontSize: '14px',
      color: '#2c3e50',
      lineHeight: '1.6',
      width: '100%',
      maxWidth: '400px',
      backgroundColor: backgroundColor,
      borderLeft: `4px solid ${borderColor}`,
      borderRadius: '4px', // simplified radius for tables
    }}>
      <tbody>
        <tr>
          <td style={{ padding: '24px' }}>
            {/* Header Section */}
            <table cellPadding="0" cellSpacing="0" border="0" width="100%" style={{ borderBottom: '1px solid #e0e0e0', marginBottom: '16px' }}>
              <tbody>
                <tr>
                  <td style={{ paddingBottom: '12px' }}>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: borderColor,
                      marginBottom: '4px',
                      letterSpacing: '0.5px'
                    }}>
                      {name}
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: '#7f8c8d',
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      {profession}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Contact Section */}
            <table cellPadding="0" cellSpacing="0" border="0" width="100%">
              <tbody>
                <tr>
                  <td style={{ paddingBottom: '6px' }}>
                    <a href={`mailto:${email}`} style={linkStyle}>{email}</a>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingBottom: '6px' }}>
                    <a href={`tel:${phone}`} style={linkStyle}>{phone}</a>
                  </td>
                </tr>
                {website && (
                  <tr>
                    <td style={{ paddingBottom: '6px' }}>
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

export default ModernTemplate;
