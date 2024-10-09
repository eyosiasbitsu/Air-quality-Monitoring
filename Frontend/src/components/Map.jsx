import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function LocationMarker({ onLocationSelected }) {
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onLocationSelected(lat, lng);
      map.flyTo(e.latlng, map.getZoom());
    }
  });

  return null; // No need to return a Marker here since we handle it in MyMap
}

function MyMap() {
  const [position, setPosition] = useState(null);

  const handleLocationSelected = (lat, lng) => {
    setPosition({ lat, lng });
  };

  const handleRequestLocationInfo = () => {
    if (!position) return;

    fetch('YOUR_BACKEND_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude: position.lat,
        longitude: position.lng
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Data received:', data);
      // Handle the data here (e.g., show it on the UI)
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className='bg-inherit flex flex-row items-start justify-center w-full gap-3'>
      <button onClick={handleRequestLocationInfo} className="mt-4 bg-inherit backdrop-blur-3xl text-gray-900 py-2 px-4 rounded backdrop-brightness-90 hover:bg-gray-300 transition-colors">
        Get Location Info
      </button>
      <MapContainer center={[8.979, 38.769]} zoom={13} style={{ height: '90vh', width: '80%' }} className="shadow-xl rounded-lg overflow-hidden">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onLocationSelected={handleLocationSelected} />
        {position && <Marker position={position} />}
      </MapContainer>
    </div>
  );
}

export default MyMap;
