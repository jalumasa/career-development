import { distanceMiles } from './geo';

describe('distanceMiles', () => {
  it('is zero for the same point', () => {
    expect(distanceMiles(40.7128, -74.006, 40.7128, -74.006)).toBe(0);
  });

  // New York to Los Angeles is ~2445 miles great-circle.
  it('matches a known long distance', () => {
    const miles = distanceMiles(40.7128, -74.006, 34.0522, -118.2437);
    expect(miles).toBeGreaterThan(2400);
    expect(miles).toBeLessThan(2500);
  });

  it('is symmetric', () => {
    const there = distanceMiles(51.5074, -0.1278, 48.8566, 2.3522);
    const back = distanceMiles(48.8566, 2.3522, 51.5074, -0.1278);
    expect(there).toBeCloseTo(back, 10);
  });

  // The "near me" filter uses a ~500 mile radius, so short hops are the range
  // that actually decides whether an event shows up.
  it('handles short distances', () => {
    // Upper Manhattan to south Brooklyn, ~7.4 miles.
    const miles = distanceMiles(40.7831, -73.9712, 40.6782, -73.9442);
    expect(miles).toBeGreaterThan(6);
    expect(miles).toBeLessThan(9);
  });

  it('handles crossing the antimeridian without inflating the distance', () => {
    // Two points either side of the date line are close, not half a world apart.
    const miles = distanceMiles(0, 179.5, 0, -179.5);
    expect(miles).toBeLessThan(80);
  });
});
