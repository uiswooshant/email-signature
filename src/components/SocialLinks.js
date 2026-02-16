import React from 'react';
import { SOCIAL_ICON_PATHS } from '../utils/socialLinks';

function SocialLinks({ links, iconColor = '#1a1a1a' }) {
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <table cellPadding="0" cellSpacing="0" border="0" style={{ marginTop: '10px' }}>
      <tbody>
        <tr>
          {links.map((link) => (
            <td key={link.key} style={{ paddingRight: '8px' }}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                title={link.label}
                style={{ display: 'inline-block', lineHeight: 0 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="17"
                  height="17"
                  fill={iconColor}
                  aria-hidden="true"
                  focusable="false"
                  style={{ display: 'block' }}
                >
                  <path d={SOCIAL_ICON_PATHS[link.key]} />
                </svg>
              </a>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default SocialLinks;
