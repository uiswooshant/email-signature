import React from 'react';
import './CreativeTemplate.css';

function CreativeTemplate({ data }) {
  const { name, profession, email, phone, website, borderColor = '#ff6b6b', backgroundColor = '#fff5e6' } = data;

  // Helper for cleaner code
  const linkStyle = {
    color: '#2d3436',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '13px'
  };

  return (
    <table cellPadding="0" cellSpacing="0" border="0" style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      fontSize: '14px',
      color: '#2d3436',
      lineHeight: '1.6',
      width: '100%',
      maxWidth: '450px',
      backgroundColor: backgroundColor,
      borderRadius: '12px',
      borderCollapse: 'separate', // Needed for border-radius in some clients
      overflow: 'hidden', // Clips the accent bar corners
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' // Won't show in Outlook, but lovely where supported
    }}>
      <tbody>
        {/* Accent Bar */}
        <tr>
          <td style={{
            backgroundColor: borderColor,
            height: '6px',
            fontSize: '0px',
            lineHeight: '0px'
          }}>&nbsp;</td>
        </tr>

        {/* Content Area */}
        <tr>
          <td style={{ padding: '24px' }}>
            {/* Name */}
            <div style={{
              fontSize: '22px',
              fontWeight: '700',
              color: '#2d3436',
              marginBottom: '4px',
              letterSpacing: '0.5px'
            }}>
              {name}
            </div>

            {/* Profession */}
            <div style={{
              fontSize: '13px',
              color: '#636e72',
              marginBottom: '16px',
              fontWeight: '500',
              borderBottom: '2px dotted #b2bec3', // Hex color is safer than rgba
              paddingBottom: '12px',
              display: 'block' // Ensures block behavior
            }}>
              {profession}
            </div>

            {/* Contact Details - Nested Table for Alignment */}
            <table cellPadding="0" cellSpacing="0" border="0" width="100%">
              <tbody>
                <tr>
                  <td width="28" valign="middle" style={{ paddingBottom: '8px' }}>
                    <img
                      src="/icons/email.png"
                      alt="Email"
                      style={{
                        width: '20px',
                        height: '20px',
                        display: 'block'
                      }}
                    />
                  </td>
                  <td valign="middle" style={{ paddingBottom: '8px' }}>
                    <a href={`mailto:${email}`} style={linkStyle}>{email}</a>
                  </td>
                </tr>
                <tr>
                  <td width="28" valign="middle" style={{ paddingBottom: '8px' }}>
                    <img
                      src="/icons/phone.png"
                      alt="Phone"
                      style={{
                        width: '20px',
                        height: '20px',
                        display: 'block'
                      }}
                    />
                  </td>
                  <td valign="middle" style={{ paddingBottom: '8px' }}>
                    <a href={`tel:${phone}`} style={linkStyle}>{phone}</a>
                  </td>
                </tr>
                {website && (
                  <tr>
                    <td width="28" valign="middle" style={{ paddingBottom: '8px' }}>
                      <img
                        src="/icons/website.png"
                        alt="Website"
                        style={{
                          width: '20px',
                          height: '20px',
                          display: 'block'
                        }}
                      />
                    </td>
                    <td valign="middle" style={{ paddingBottom: '8px' }}>
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

export default CreativeTemplate;
