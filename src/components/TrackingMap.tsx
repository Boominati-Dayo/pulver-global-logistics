'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { FaMapPin, FaSpinner } from 'react-icons/fa';
import { geocodeAddress } from '@/services/geocodingService';

const MapComponent = dynamic(() => import('./MapComponent'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-64 md:h-80 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
      <FaSpinner className="animate-spin text-gray-400 text-2xl" />
    </div>
  )
});

interface LocationMarker {
  lat: number;
  lng: number;
  title: string;
}

interface MapProps {
  origin: string;
  destination: string;
  currentLocation?: string;
}

export default function TrackingMap({ origin, destination, currentLocation }: MapProps) {
  const [locations, setLocations] = useState<{
    origin: LocationMarker | null;
    destination: LocationMarker | null;
    currentLocation: LocationMarker | null;
  }>({ origin: null, destination: null, currentLocation: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const geocodeLocations = async () => {
      try {
        setLoading(true);
        
        const addresses = [origin, destination];
        if (currentLocation) addresses.push(currentLocation);
        
        const results = await Promise.all(addresses.map(addr => geocodeAddress(addr)));
        
        setLocations({
          origin: {
            lat: results[0].coordinates.lat,
            lng: results[0].coordinates.lng,
            title: results[0].formattedAddress
          },
          destination: {
            lat: results[1].coordinates.lat,
            lng: results[1].coordinates.lng,
            title: results[1].formattedAddress
          },
          currentLocation: currentLocation ? {
            lat: results[2].coordinates.lat,
            lng: results[2].coordinates.lng,
            title: results[2].formattedAddress
          } : null
        });
      } catch (error) {
        console.error('Geocoding failed:', error);
      } finally {
        setLoading(false);
      }
    };

    geocodeLocations();
  }, [origin, destination, currentLocation]);

  if (loading) {
    return (
      <div className="w-full h-64 md:h-80 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-gray-400 text-2xl mx-auto mb-2" />
          <p className="text-sm text-gray-500">Loading map...</p>
        </div>
      </div>
    );
  }

  if (!locations.origin || !locations.destination) {
    return (
      <div className="w-full h-64 md:h-80 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Unable to load map</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <MapComponent 
        origin={locations.origin} 
        destination={locations.destination} 
        currentLocation={locations.currentLocation} 
      />
    </div>
  );
}