import { useState } from 'react';

// Requests the user's approximate location on demand (never automatically)
// and reverse-geocodes it to a human-readable label via OpenStreetMap's
// Nominatim service. Coordinates only ever live in component state — they
// are not persisted to Firestore or sent anywhere besides the geocoding
// lookup needed to show a location label.
const useGeolocation = () => {
  const [status, setStatus] = useState('idle'); // idle | loading | granted | denied | error
  const [coords, setCoords] = useState(null);
  const [label, setLabel] = useState(null);

  const requestLocation = () => {
    if (!('geolocation' in navigator)) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
        setStatus('granted');

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=10`,
            { headers: { Accept: 'application/json' } }
          );
          const data = await response.json();
          const address = data.address || {};
          const city = address.city || address.town || address.village || address.county;
          const region = address.state || address.country;
          setLabel([city, region].filter(Boolean).join(', ') || 'your location');
        } catch (error) {
          console.error('Reverse geocoding failed:', error);
          setLabel('your location');
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        setStatus(error.code === error.PERMISSION_DENIED ? 'denied' : 'error');
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 5 * 60 * 1000 }
    );
  };

  return { status, coords, label, requestLocation };
};

export default useGeolocation;
