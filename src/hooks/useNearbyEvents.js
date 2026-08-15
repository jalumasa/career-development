import { useMemo } from 'react';
import { distanceMiles } from '../utils/geo';

export const NEARBY_RADIUS_MILES = 500;

/**
 * Annotates events with their distance from `coords` and, when `nearbyOnly`
 * is set, keeps only those within `radius` — then orders in-person events
 * nearest-first with online events after them.
 *
 * Online events have no coordinates, so "how far away is it" doesn't apply to
 * them: they're always considered in range. That rule lives here alone rather
 * than being restated in the filter, the sort, and the distance calculation.
 */
const useNearbyEvents = (events, coords, { nearbyOnly = false, radius = NEARBY_RADIUS_MILES } = {}) =>
  useMemo(() => {
    const canMeasure = (event) => !event.isOnline && event.lat != null && event.lng != null;

    const annotated = events.map((event) => ({
      ...event,
      distance: coords && canMeasure(event)
        ? distanceMiles(coords.lat, coords.lng, event.lat, event.lng)
        : null,
    }));

    if (!nearbyOnly || !coords) return annotated;

    return annotated
      .filter((event) => event.isOnline || (event.distance != null && event.distance <= radius))
      .sort((a, b) => {
        if (a.isOnline !== b.isOnline) return a.isOnline ? 1 : -1;
        return (a.distance ?? Infinity) - (b.distance ?? Infinity);
      });
  }, [events, coords, nearbyOnly, radius]);

export default useNearbyEvents;
