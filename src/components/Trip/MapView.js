import React from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = ({ tripData }) => {
  const positions = tripData.map((point) => [point.latitude, point.longitude]);

  return (
    <MapContainer center={positions[0]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polyline positions={positions} color="blue" />
    </MapContainer>
  );
};

export default MapView;
