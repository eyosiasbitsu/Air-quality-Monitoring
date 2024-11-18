// MyMap.js
import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function LocationMarker({ position, onMapClick }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo([position.lat, position.lng], 13);
    }
  }, [position, map]);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onMapClick(lat, lng); // Pass the lat/lng to the parent component
    },
  });

  return position ? <Marker position={position} /> : null;
}

function MyMap2({ setLat, setLng, setShowMap }) {
  const [position, setPosition] = useState(null);

  const handleMapClick = (lat, lng) => {
    setLat(lat);
    setLng(lng);
    setShowMap(false);
    setPosition({ lat, lng });
  };

  return (
    <MapContainer
      center={[8.979, 38.769]}
      zoom={13}
      style={{ height: "90vh", width: "100%" }}
      className="shadow-xl rounded-lg overflow-hidden"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker position={position} onMapClick={handleMapClick} />
    </MapContainer>
  );
}

export default MyMap2;
