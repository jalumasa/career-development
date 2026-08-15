export const formatEventLocation = (event) => {
  if (event.isOnline) return 'Online';
  return [event.city, event.region, event.country].filter(Boolean).join(', ') || 'Location TBA';
};

const formatDate = (isoDate) => {
  if (!isoDate) return '';
  // Parse as local (not UTC) so a date like "2026-08-09" doesn't shift a day
  // depending on the viewer's timezone.
  const [year, month, day] = isoDate.split('-').map(Number);
  const date = new Date(year, (month || 1) - 1, day || 1);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const formatEventDateRange = (event) => {
  const start = formatDate(event.startDate);
  const end = formatDate(event.endDate);
  if (!start) return '';
  if (!end || start === end) return start;
  return `${start} – ${end}`;
};
