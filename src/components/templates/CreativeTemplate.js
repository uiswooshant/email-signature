import React from 'react';
import './CreativeTemplate.css';
import { normalizeWebsiteUrl, formatWebsiteDisplay } from '../../utils/contact';
import { useRecoloredIcons } from '../../hooks/useRecoloredIcons';
import SocialLinks from '../SocialLinks';
import { getSocialLinks } from '../../utils/socialLinks';

const ICON_SOURCES = {
  email: '/icons/email.png',
  phone: '/icons/phone.png',
  website: '/icons/website.png',
};

function CreativeTemplate({ data }) {
  const { name, profession, email, phone, website, borderColor = '#ff6b6b', backgroundColor = '#fff5e6', textColor = '#1a1a1a' } = data;

  const secondaryTextColor = textColor === '#ffffff' ? 'rgba(255,255,255,0.6)' : '#636e72';
  const dividerColor = textColor === '#ffffff' ? 'rgba(255,255,255,0.25)' : '#b2bec3';
  const socialLinks = getSocialLinks(data);

  // Recolor icons to match accent/border color
  const icons = useRecoloredIcons(ICON_SOURCES, borderColor);

  // Helper for cleaner code
  const websiteUrl = normalizeWebsiteUrl(website);
  const websiteDisplay = formatWebsiteDisplay(website);

  const linkStyle = {
    color: textColor,
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '13px'
  };

  return (
    <table cellPadding="0" cellSpacing="0" border="0" style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      fontSize: '14px',
      color: textColor,
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
              color: textColor,
              marginBottom: '4px',
              letterSpacing: '0.5px'
            }}>
              {name}
            </div>

            {/* Profession */}
            <div style={{
              fontSize: '13px',
              color: secondaryTextColor,
              marginBottom: '16px',
              fontWeight: '500',
              borderBottom: `2px dotted ${dividerColor}`,
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
                      src={icons.email}
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
                      src={icons.phone}
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
                {websiteUrl && (
                  <tr>
                    <td width="28" valign="middle" style={{ paddingBottom: '8px' }}>
                      <img
                        src={icons.website}
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

            <SocialLinks links={socialLinks} iconColor={borderColor} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default CreativeTemplate;
