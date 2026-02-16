import React from 'react';
import { useRecoloredIcons } from '../hooks/useRecoloredIcons';
import { SOCIAL_ICON_SOURCES } from '../utils/socialLinks';

function SocialLinks({ links, iconColor = '#1a1a1a' }) {
  const recoloredIcons = useRecoloredIcons(SOCIAL_ICON_SOURCES, iconColor);

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
                <img
                  src={recoloredIcons[link.key]}
                  alt={link.label}
                  width="17"
                  height="17"
                  style={{ display: 'block' }}
                />
              </a>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default SocialLinks;
