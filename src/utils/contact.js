export function normalizeWebsiteUrl(website = '') {
  const trimmed = website.trim();

  if (!trimmed) {
    return '';
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export function formatWebsiteDisplay(website = '') {
  return website.trim().replace(/^https?:\/\//i, '');
}
