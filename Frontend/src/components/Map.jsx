import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useQuery } from '@tanstack/react-query';
import { getSensorDataBYLocation } from '../../services/sensorsApi';

function LocationMarker({ position, onMapClick }) {
  const map = useMap();

  function handleDataFetch(){
   
  
  }

  // Fly to the clicked position
  useEffect(() => {
    if (position) {
      map.flyTo([position.lat, position.lng], 13);
    }
  }, [position, map]);

  // Handle clicks on the map
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onMapClick(lat, lng); // Pass the lat/lng to the parent component for reverse geocoding
    }
  });

  return position ? <Marker position={position} /> : null;
}

function MyMap() {
  const [position, setPosition] = useState(null);
  const [searchText, setSearchText] = useState('');
console.log(position)
  // Fetch the name of a location based on latitude and longitude (reverse geocoding)
  const fetchLocationName = (lat, lng) => {
    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
      .then(response => response.json())
      .then(data => {
        if (data && data.display_name) {
          setSearchText(data.display_name); // Update the input field with the location name
          setPosition({ lat, lng }); // Update the map position
        } else {
          console.error('Location name not found');
        }
      })
      .catch(error => console.error('Error during reverse geocoding:', error));
  };

  const handleSearch = () => {
    if (!searchText) return;

    // Fetch the geocode for the search text (using OpenStreetMap's Nominatim API)
    fetch(`https://nominatim.openstreetmap.org/search?q=${searchText}&format=json&limit=1`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const { lat, lon } = data[0];
          setPosition({ lat: parseFloat(lat), lng: parseFloat(lon) });
        } else {
          console.error('Location not found');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const { data: sensorData, isLoading, error } = useQuery({
    queryKey: ['sensorDataMap', position], // Pass query key in the object
    queryFn: () => getSensorDataBYLocation(position), // Define the query function
    enabled: !!position, // Enable the query when 'position' is available
    retry: false, // Optionally disable retrying on failure
  });
  

  const handleMapClick = (lat, lng) => {
    fetchLocationName(lat, lng); // Reverse geocode to get the name of the location
  };

  return (
    <div className='bg-inherit flex flex-row items-center justify-start w-full gap-3'>
      <div className="flex flex-col gap-2 mt-4">
        <input
          type="text"
          placeholder="Search location..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="py-2 px-4 border border-gray-300 rounded focus:outline-none"
        />
        <button onClick={handleSearch} className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400 transition-colors">
          Search
        </button>
      </div>
      <div className=' w-screen h-screen '>
      <MapContainer center={[8.979, 38.769]} zoom={13} style={{ height: '90vh', width: '80%' }} className="shadow-xl rounded-lg overflow-hidden">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} onMapClick={handleMapClick} />
      </MapContainer>
      </div>
    </div>
  );
}

export default MyMap;
