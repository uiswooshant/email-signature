export const SOCIAL_PLATFORMS = [
  { key: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/username' },
  { key: 'twitter', label: 'X / Twitter', placeholder: 'x.com/username' },
  { key: 'instagram', label: 'Instagram', placeholder: 'instagram.com/username' },
  { key: 'facebook', label: 'Facebook', placeholder: 'facebook.com/username' },
  { key: 'github', label: 'GitHub', placeholder: 'github.com/username' },
];

export const SOCIAL_ICON_PATHS = {
  linkedin: 'M4.98 3.5C4.98 4.88 3.86 6 2.49 6A2.5 2.5 0 0 1 0 3.5 2.5 2.5 0 0 1 2.49 1c1.37 0 2.49 1.12 2.49 2.5ZM.5 8h4V24h-4V8Zm7 0h3.82v2.18h.05c.53-1 1.84-2.18 3.78-2.18 4.04 0 4.79 2.66 4.79 6.11V24h-4v-7.03c0-1.68-.03-3.84-2.34-3.84-2.34 0-2.7 1.83-2.7 3.72V24h-4V8Z',
  twitter: 'M18.9 2H22l-6.77 7.73L23.2 22h-6.27l-4.9-6.88L5.9 22H2.8l7.25-8.28L2.4 2h6.43l4.43 6.26L18.9 2Zm-1.1 18h1.74L7.9 3.9H6.03L17.8 20Z',
  instagram: 'M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm-.13 2A3.62 3.62 0 0 0 4 7.62v8.76A3.62 3.62 0 0 0 7.62 20h8.76A3.62 3.62 0 0 0 20 16.38V7.62A3.62 3.62 0 0 0 16.38 4H7.62Zm9.63 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
  facebook: 'M13.5 22V12h3.3l.5-3.9h-3.8V5.6c0-1.13.3-1.9 1.92-1.9h2.05V.22A27.7 27.7 0 0 0 14.45 0C11.5 0 9.5 1.8 9.5 5.1v3H6.2V12h3.3v10h4Z',
  github: 'M12 .5a12 12 0 0 0-3.8 23.4c.6.1.82-.26.82-.58v-2.17c-3.34.73-4.04-1.41-4.04-1.41-.55-1.38-1.33-1.74-1.33-1.74-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.22 1.83 1.22 1.06 1.82 2.8 1.3 3.48.99.11-.77.42-1.3.76-1.6-2.67-.3-5.48-1.33-5.48-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.16 0 0 1-.32 3.3 1.23.96-.27 1.98-.4 3-.4 1.02 0 2.04.13 3 .4 2.3-1.56 3.3-1.23 3.3-1.23.65 1.64.24 2.86.12 3.16.77.84 1.23 1.91 1.23 3.22 0 4.61-2.82 5.62-5.5 5.92.43.37.82 1.1.82 2.22v3.3c0 .32.21.7.83.58A12 12 0 0 0 12 .5Z',
};

export function normalizeUrl(url = '') {
  const trimmed = url.trim();
  if (!trimmed) return '';
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function formatSocialDisplay(url = '') {
  return url.replace(/^https?:\/\//i, '').replace(/^www\./i, '');
}

export function getSocialLinks(data) {
  return SOCIAL_PLATFORMS
    .map((platform) => {
      const rawValue = data[platform.key] || '';
      const normalized = normalizeUrl(rawValue);
      if (!normalized) return null;

      return {
        ...platform,
        url: normalized,
        displayText: formatSocialDisplay(normalized),
      };
    })
    .filter(Boolean);
}
