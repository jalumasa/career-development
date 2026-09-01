import { formatEventDateRange, formatEventLocation } from './events';

describe('formatEventLocation', () => {
  it('labels online events without touching the location fields', () => {
    expect(formatEventLocation({ isOnline: true, city: 'Nairobi' })).toBe('Online');
  });

  it('joins the parts that are present', () => {
    expect(formatEventLocation({ city: 'Austin', region: 'TX', country: 'USA' })).toBe('Austin, TX, USA');
  });

  it('skips missing parts rather than leaving stray commas', () => {
    expect(formatEventLocation({ city: 'Berlin', country: 'Germany' })).toBe('Berlin, Germany');
  });

  it('falls back when an in-person event has no location at all', () => {
    expect(formatEventLocation({ isOnline: false })).toBe('Location TBA');
  });
});

describe('formatEventDateRange', () => {
  it('shows a single date when start and end match', () => {
    expect(formatEventDateRange({ startDate: '2026-08-09', endDate: '2026-08-09' })).toBe('Aug 9, 2026');
  });

  it('shows a range when they differ', () => {
    expect(formatEventDateRange({ startDate: '2026-08-09', endDate: '2026-08-11' })).toBe('Aug 9, 2026 – Aug 11, 2026');
  });

  it('falls back to the start date when there is no end date', () => {
    expect(formatEventDateRange({ startDate: '2026-08-09' })).toBe('Aug 9, 2026');
  });

  it('returns empty string when there is no start date', () => {
    expect(formatEventDateRange({})).toBe('');
  });

  // Regression guard: `new Date('2026-08-09')` parses as UTC midnight, which
  // renders as Aug 8 anywhere behind UTC. Dates are stored as plain
  // 'YYYY-MM-DD' strings, so they have to be parsed as local.
  it('does not shift a day for viewers behind UTC', () => {
    expect(formatEventDateRange({ startDate: '2026-01-01', endDate: '2026-01-01' })).toBe('Jan 1, 2026');
  });
});
