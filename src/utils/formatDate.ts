export const formatDateTime = (pubDate: Date): string => {
  const date = new Date(pubDate);
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: tz,
  });
};

export const formatDate = (pubDate: Date): string => {
  const date = new Date(pubDate);
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    timeZone: tz,
  });
};
