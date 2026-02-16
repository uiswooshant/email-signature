export const SOCIAL_PLATFORMS = [
  { key: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/username' },
  { key: 'twitter', label: 'X / Twitter', placeholder: 'x.com/username' },
  { key: 'instagram', label: 'Instagram', placeholder: 'instagram.com/username' },
  { key: 'facebook', label: 'Facebook', placeholder: 'facebook.com/username' },
  { key: 'github', label: 'GitHub', placeholder: 'github.com/username' },
];

export const SOCIAL_ICON_SOURCES = {
  linkedin: '/icons/linkedin.png',
  twitter: '/icons/x.png',
  instagram: '/icons/instagram.png',
  facebook: '/icons/facebook.png',
  github: '/icons/github.png',
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
