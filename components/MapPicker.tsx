'use client';

import { MapContainer, Marker, TileLayer, useMapEvents, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet-control-geocoder/Control.Geocoder.css'
import '@/app/globals.css'

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationMarker({ onSelect }: { onSelect: (latlng: { lat: number; lng: number }) => void }) {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onSelect(e.latlng);
    },
  });

  return position === null ? null : <Marker position={position} icon={markerIcon} />;
}

function GeocoderControl({ onSelect }: { onSelect: (latlng: { lat: number; lng: number }) => void }) {
  const map = useMap();

  useEffect(() => {
    const geocoder = L.Control.geocoder({
        geocoder: L.Control.Geocoder.nominatim(),
      defaultMarkGeocode: false,
    })
      .on('markgeocode', function (e: any) {
        const latlng = e.geocode.center;
        map.setView(latlng, 16);
        onSelect(latlng);
      })
      .addTo(map);

    return () => {
      geocoder.remove();
    };
  }, [map, onSelect]);

  return null;
}

export default function MapPicker({ onSelect }: { onSelect: (latlng: { lat: number; lng: number }) => void }) {
  return (
    <MapContainer center={[4.05, 9.7]} zoom={13} className="w-full h-full rounded z-0">
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeocoderControl onSelect={onSelect} />
      <LocationMarker onSelect={onSelect} />
    </MapContainer>
  );
}
