import React, { useState, useEffect } from "react";
import Graph from "./Graph";
import AirQualityGauge from "./AirQualityGauge";
import { useQuery } from "@tanstack/react-query";
import { getSensorDataBYLocation } from "../../services/sensorsApi";
import { VscSearch } from "react-icons/vsc";
import { LiaLocationArrowSolid } from "react-icons/lia";
import { format, parseISO } from "date-fns";
import showToast from "./Toast";
import Spinner from "./Spinner";

function LocationSearch() {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [position, setPosition] = useState({ lat: null, lng: null });
  const [timeFrame, setTimeFrame] = useState("weekly");
  const [currentTime, setCurrentTime] = useState("");

  const { lat, lng } = position;

  // React Query to fetch sensor data based on position and timeFrame
  const { isLoading, data, error, refetch, isError } = useQuery({
    queryKey: ["searchedSensor", timeFrame, lat, lng],
    queryFn: () => getSensorDataBYLocation({ ...position, timeFrame }),
    enabled: !!lat && !!lng,
    // throwOnError: true, // Propagates errors to be handled explicitly
  });

  if (isError) {
    showToast(error.message, "info");
  }

  const modifiedData = data?.sensorData?.map((sensor) => ({
    temperature: parseFloat(sensor.temperature),
    humidity: parseFloat(sensor.humidity),
    pm25: parseFloat(sensor.pm25),
    createdAt: format(parseISO(sensor?.createdAt), "yyyy-MM-dd HH:mm"),
  }));

  // Fetch suggestions for the search input
  const fetchSuggestions = (query) => {
    fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=8`,
    )
      .then((response) => response.json())
      .then((data) => setSuggestions(data.length > 0 ? data : []))
      .catch((error) => console.error("Error fetching suggestions:", error));
  };

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
    setPosition({ lat: parseFloat(lat), lng: parseFloat(lon) });
    setSearchText(suggestion.display_name); // Update search bar with selected location
    setSuggestions([]); // Clear suggestions after selection
  };

  // Handle timeframe change
  const handleTimeFrameChange = (event) => {
    setTimeFrame(event.target.value); // Update state
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
    <div className="flex gap-4 relative min-h-screen">
      {isLoading && <Spinner />}
      {/* Left Panel */}
      <div
        className={
          data
            ? "flex flex-col gap-6 border rounded-3xl backdrop-blur-md bg-white/10 h-fit p-6 w-full md:w-1/2"
            : "flex flex-col gap-6 border rounded-3xl backdrop-blur-md bg-white/10 h-fit p-6 w-full md:w-1/2 absolute left-80 top-32"
        }
      >
        {/* Search Bar */}
        <div className={"relative"}>
          <div className="flex items-center gap-3 border border-gray-500/50 rounded-full px-4 py-2 backdrop-brightness-75 text-white">
            <VscSearch />
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

        {data ? (
          <div className="text-white space-y-2">
            <div>
              <div className="flex items-center gap-2">
                <LiaLocationArrowSolid size={30} />
                <span className="text-lg font-medium">
                  {data?.sensorDetail?.streetAddress},{" "}
                  {data?.sensorDetail?.city}
                </span>
              </div>
            </div>
            <div className="text-5xl font-bold">
              {data?.sensorData[0]?.temperature} °C
            </div>
            <div className="text-gray-300 text-lg">{currentTime}</div>
          </div>
        ) : null}
        {data ? <AirQualityGauge pm25={data?.sensorData[0]?.pm25} /> : null}
      </div>

      {/* Right Panel */}
      {data && (
        <div className="flex flex-col gap-4 border rounded-3xl backdrop-blur-3xl h-fit p-4 w-fit md:w-1/2">
          <div className="w-fit h-fit relative">
            <select
              id="dropdown"
              name="dropdown"
              value={timeFrame}
              onChange={handleTimeFrameChange}
              className="w-full bg-inherit border border-inherit text-gray-200 text-sm rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5  backdrop-brightness-50"
            >
              <option value="daily" className="bg-slate-800 text-gray-900">
                daily
              </option>
              <option value="weekly" className="bg-inherit text-gray-900">
                weekly
              </option>
              <option value="monthly" className="bg-inherit text-gray-900">
                monthly
              </option>
            </select>
          </div>
          <div className="backdrop-brightness-50 rounded-2xl">
            <Graph
              data={modifiedData}
              independant="createdAt"
              dependant="temperature"
              color="#2450ca"
              title="Temperature"
            />
          </div>
          <div className="backdrop-brightness-50 rounded-2xl">
            <Graph
              data={modifiedData}
              independant="createdAt"
              dependant="humidity"
              color="#e91eac"
              title="Humidity"
            />
          </div>
          <div className="backdrop-brightness-50 rounded-2xl">
            <Graph
              data={modifiedData}
              independant="createdAt"
              dependant="pm25"
              color="#10f308"
              title="PM25"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default LocationSearch;
