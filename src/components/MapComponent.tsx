'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LocationMarker {
  lat: number;
  lng: number;
  title: string;
}

const originIcon = L.divIcon({
  html: `<div style="background:#1a365d;color:white;padding:8px 12px;border-radius:20px;font-weight:bold;box-shadow:0 2px 8px rgba(0,0,0,0.3)">Origin</div>`,
  className: 'custom-marker',
  iconSize: [80, 30],
  iconAnchor: [40, 15]
});

const destIcon = L.divIcon({
  html: `<div style="background:#ea580c;color:white;padding:8px 12px;border-radius:20px;font-weight:bold;box-shadow:0 2px 8px rgba(0,0,0,0.3)">Destination</div>`,
  className: 'custom-marker',
  iconSize: [100, 30],
  iconAnchor: [50, 15]
});

const currentIcon = L.divIcon({
  html: `<div style="background:#2c5282;color:white;padding:6px 10px;border-radius:20px;font-size:12px;font-weight:bold;box-shadow:0 2px 8px rgba(0,0,0,0.3);animation:pulse 2s infinite">Current</div>`,
  className: 'custom-marker',
  iconSize: [80, 26],
  iconAnchor: [40, 13]
});

interface MapComponentProps {
  origin: LocationMarker;
  destination: LocationMarker;
  currentLocation?: LocationMarker | null;
}

export default function MapComponent({ origin, destination, currentLocation }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      
      setLoading(true);

      const originCoords: L.LatLngExpression = [origin.lat, origin.lng];
      const destCoords: L.LatLngExpression = [destination.lat, destination.lng];
      const currentCoords: L.LatLngExpression | null = currentLocation ? [currentLocation.lat, currentLocation.lng] : null;

      const map = L.map(mapRef.current!);
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      const originMarker = L.marker(originCoords, { icon: originIcon }).addTo(map).bindPopup(`<b>Origin:</b><br>${origin.title}`);
      const destMarker = L.marker(destCoords, { icon: destIcon }).addTo(map).bindPopup(`<b>Destination:</b><br>${destination.title}`);

      if (currentCoords && currentLocation) {
        const currentMarker = L.marker(currentCoords, { icon: currentIcon }).addTo(map).bindPopup(`<b>Current Location:</b><br>${currentLocation.title}`);
        
        const latlngs: L.LatLngExpression[] = [originCoords, currentCoords, destCoords];
        L.polyline(latlngs, {
          color: '#ea580c',
          weight: 4,
          opacity: 0.8,
          dashArray: '10, 10',
        }).addTo(map);
        
        const bounds = L.latLngBounds(latlngs as [number, number][]);
        map.fitBounds(bounds, { padding: [60, 60], maxZoom: 12 });
      } else {
        const latlngs: L.LatLngExpression[] = [originCoords, destCoords];
        L.polyline(latlngs, {
          color: '#ea580c',
          weight: 4,
          opacity: 0.8,
          dashArray: '10, 10',
        }).addTo(map);
        
        const bounds = L.latLngBounds(latlngs as [number, number][]);
        map.fitBounds(bounds, { padding: [60, 60], maxZoom: 12 });
      }

      setLoading(false);
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [origin, destination, currentLocation]);

  return (
    <>
      <style>{`
        .custom-marker { background: transparent; border: none; }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
      <div className="relative w-full h-80 md:h-96 rounded-xl z-0">
        {loading && (
          <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-4 border-[#ea580c] border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-gray-500">Loading map...</p>
            </div>
          </div>
        )}
        <div ref={mapRef} className="w-full h-full rounded-xl" />
      </div>
    </>
  );
}