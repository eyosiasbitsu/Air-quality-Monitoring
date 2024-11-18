import React, { useState, useEffect } from "react";
import Graph from "./Graph";
import AirQualityGauge from "./AirQualityGauge";

function LocationSearch() {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [currentTime, setCurrentTime] = useState("");

  const newData = [
    { date: "2024-11-01", pm25: 35 },
    { date: "2024-11-02", pm25: 42 },
    { date: "2024-11-03", pm25: 30 },
    { date: "2024-11-04", pm25: 28 },
    { date: "2024-11-05", pm25: 40 },
    { date: "2024-11-06", pm25: 45 },
    { date: "2024-11-07", pm25: 50 },
    { date: "2024-11-08", pm25: 48 },
    { date: "2024-11-09", pm25: 60 },
    { date: "2024-11-10", pm25: 55 },
  ];

  // Fetch suggestions for the search input
  const fetchSuggestions = (query) => {
    fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=8`,
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setSuggestions(data); // Update suggestions list
        } else {
          setSuggestions([]);
        }
      })
      .catch((error) => console.error("Error fetching suggestions:", error));
  };

  // Handle input changes in the search bar
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value.trim()) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]); // Clear suggestions when input is empty
    }
  };

  // Handle selection of a suggestion
  const handleSuggestionClick = (suggestion) => {
    const { lat, lon } = suggestion;
    setSelectedPosition({ lat: parseFloat(lat), lng: parseFloat(lon) });
    setSearchText(suggestion.display_name); // Update search bar with the selected name
    setSuggestions([]); // Clear suggestions after selection

    // Send request with the selected position
    sendRequest({ lat: parseFloat(lat), lng: parseFloat(lon) });
  };

  // Mock function to send a request
  const sendRequest = (position) => {
    console.log("Sending request with position:", position);
    // Replace with actual API call
  };

  // Update the current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        `${now.toLocaleDateString()} ${now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`,
      );
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="flex gap-4 relative">
      {/* Left Panel */}
      <div className="flex flex-col gap-6 border rounded-3xl backdrop-blur-md bg-white/10 h-fit p-6 w-full md:w-1/2">
        {/* Search Bar */}
        <div className="relative">
          <div className="flex items-center gap-3 border border-gray-500/50 rounded-full px-4 py-2 backdrop-brightness-75 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2a7.5 7.5 0 100-15 7.5 7.5 0 000 15zm-7 6l4.5-4.5"
              />
            </svg>
            <input
              type="text"
              value={searchText}
              onChange={handleInputChange}
              placeholder="Search a location"
              className="bg-transparent w-full text-sm placeholder-white text-white outline-none"
            />
          </div>

          {/* Suggestions Pop-up */}
          {suggestions.length > 0 && (
            <ul className="absolute z-50 bg-white text-black border border-gray-300 rounded mt-2 shadow-md w-full max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  {suggestion.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Location and Info */}
        <div className="text-white space-y-2">
          {selectedPosition ? (
            <div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 11V7a4 4 0 118 0v4a4 4 0 01-8 0zm12 0v2a4 4 0 01-4 4h-1a4 4 0 01-4-4v-2"
                  />
                </svg>
                <span className="text-lg font-medium">{searchText}</span>
              </div>
              <div className="text-gray-300 text-lg">
                Lat: {selectedPosition.lat}, Lng: {selectedPosition.lng}
              </div>
            </div>
          ) : (
            <div>No location selected</div>
          )}
          <div className="text-5xl font-bold">23.5°C</div>
          <div className="text-gray-300 text-lg">{currentTime}</div>
        </div>

        <AirQualityGauge />
      </div>

      {/* Right Panel */}
      <div className="flex flex-col gap-4 border rounded-3xl backdrop-blur-3xl h-fit p-4 w-full md:w-1/2">
        <div className="backdrop-brightness-50 rounded-2xl">
          <Graph
            data={newData}
            independant="date"
            dependant="pm25"
            color="#2450ca"
            title="Concentration"
          />
        </div>
        <div className="backdrop-brightness-50 rounded-2xl">
          <Graph
            data={newData}
            independant="date"
            dependant="pm25"
            color="#e91eac"
            title="Concentration"
          />
        </div>
        <div className="backdrop-brightness-50 rounded-2xl">
          <Graph
            data={newData}
            independant="date"
            dependant="pm25"
            color="#10f308"
            title="Concentration"
          />
        </div>
        <div className="backdrop-brightness-50 rounded-2xl">
          <Graph
            data={newData}
            independant="date"
            dependant="pm25"
            color="#e2f110"
            title="Concentration"
          />
        </div>
      </div>
    </div>
  );
}

export default LocationSearch;
