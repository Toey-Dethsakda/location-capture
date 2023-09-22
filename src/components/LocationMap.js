// src/components/LocationMap.js
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

function LocationMap({ latitude, longitude }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      const initialLatLng = [latitude, longitude];

      // Initialize the map when the component is mounted
      if (!mapRef.current) {
        mapRef.current = L.map('map').setView(initialLatLng, 15);

        // Add a tile layer (you can use your preferred tile provider)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapRef.current);

        // Add a marker to the map
        L.marker(initialLatLng).addTo(mapRef.current)
          .bindPopup('Your location')
          .openPopup();
      }
    }
  }, [latitude, longitude]);

  return (
    <div id="map" style={{ height: '400px' }}></div>
  );
}

export default LocationMap;
