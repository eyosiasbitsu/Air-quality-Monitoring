import React, { useState, useEffect } from "react";
import Graph from "./Graph";
import AirQualityGauge from "./AirQualityGauge";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSensorDataBYLocation } from "../../services/sensorsApi";
import { VscSearch } from "react-icons/vsc";
import { LiaLocationArrowSolid } from "react-icons/lia";
import { format, parseISO } from "date-fns";
import showToast from "./Toast";
import Spinner from "./Spinner";

function LocationSearch() {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const [position, setPosition] = useState({});
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const mokeData = {
    sensorDetail: {
      id: "67389693cb3dd321b837a6d6",
      tag: "0000001",
      streetAddress: "Piassa Main Road",
      city: "Addis Ababa",
      location: {
        latitude: "9.037",
        longitude: "38.763",
      },
    },
    sensorData: [
      {
        _id: "6739f101ce0d25622cf65396",
        temperature: "28.78",
        humidity: "60.44",
        pm25: "86.34",
        latitude: "-95.223456",
        longitude: "47.223456",
        createdAt: "2024-11-16T11:38:00.000Z",
        sensorTag: "0000001",
        __v: 0,
      },
      {
        _id: "6739f101ce0d25622cf65399",
        temperature: "28.78",
        humidity: "60.44",
        pm25: "86.34",
        latitude: "-95.223456",
        longitude: "47.223456",
        createdAt: "2024-11-16T11:38:00.000Z",
        sensorTag: "0000001",
        __v: 0,
      },
      {
        _id: "6739e6dd34c028f26d7b7d15",
        temperature: "28.78",
        humidity: "52.34",
        pm25: "21.34",
        latitude: "-95.223456",
        longitude: "47.223456",
        createdAt: "2024-11-16T11:35:00.000Z",
        sensorTag: "0000001",
        __v: 0,
      },
      {
        _id: "6739e6dd34c028f26d7b7d18",
        temperature: "28.78",
        humidity: "52.34",
        pm25: "21.34",
        latitude: "-95.223456",
        longitude: "47.223456",
        createdAt: "2024-11-16T11:35:00.000Z",
        sensorTag: "0000001",
        __v: 0,
      },
      {
        _id: "6739e6de34c028f26d7b7d1b",
        temperature: "28.78",
        humidity: "52.34",
        pm25: "21.34",
        latitude: "-95.223456",
        longitude: "47.223456",
        createdAt: "2024-11-16T11:35:00.000Z",
        sensorTag: "0000001",
        __v: 0,
      },
      {
        _id: "6739f0ffce0d25622cf6538a",
        temperature: "28.78",
        humidity: "40.34",
        pm25: "81.34",
        latitude: "-95.223456",
        longitude: "47.223456",
        createdAt: "2024-11-16T11:35:00.000Z",
        sensorTag: "0000001",
        __v: 0,
      },
      {
        _id: "6739f0ffce0d25622cf6538d",
        temperature: "28.78",
        humidity: "40.34",
        pm25: "81.34",
        latitude: "-95.223456",
        longitude: "47.223456",
        createdAt: "2024-11-16T11:35:00.000Z",
        sensorTag: "0000001",
        __v: 0,
      },
      {
        _id: "6739f100ce0d25622cf65390",
        temperature: "28.78",
        humidity: "60.44",
        pm25: "81.34",
        latitude: "-95.223456",
        longitude: "47.223456",
        createdAt: "2024-11-16T11:35:00.000Z",
        sensorTag: "0000001",
        __v: 0,
      },
      {
        _id: "6739f100ce0d25622cf65393",
        temperature: "28.78",
        humidity: "60.44",
        pm25: "86.34",
        latitude: "-95.223456",
        longitude: "47.223456",
        createdAt: "2024-11-16T11:35:00.000Z",
        sensorTag: "0000001",
        __v: 0,
      },
    ],
  };
  const queryClient = useQueryClient();

  const [selectedOption, setSelectedOption] = useState(""); // State to handle selected value

  const handleChange = (event) => {
    setSelectedOption(event.target.value); // Update state on selection
    sendRequest(position, selectedOption);
  };

  const modifiedData = mokeData?.sensorData?.map((sensor) => {
    return {
      temperature: parseFloat(sensor.temperature),
      humidity: parseFloat(sensor.humidity),
      pm25: parseFloat(sensor.pm25),
      createdAt: format(parseISO(sensor?.createdAt), "yyyy-MM-dd HH:mm"),
    };
  });

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
    setPosition({ lat: parseFloat(lat), lng: parseFloat(lon) });

    // Send request with the selected position
    sendRequest(position);
  };

  // Mock function to send a request
  const sendRequest = (position, timeFrame = "daily") => {
    const { isLoading, data } = useQuery({
      queryKey: ["searchedSensor", timeFrame],
      queryFn: getSensorDataBYLocation({ ...position, timeFrame }),
      onError: (err) => showToast(err?.message, "error"),
    });
    setIsLoading(isLoading);
    setData(data);
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

  if (isLoading) return <Spinner />;
  return (
    <div className="flex gap-4 relative min-h-screen">
      {/* Left Panel */}
      <div className="flex flex-col gap-6 border rounded-3xl backdrop-blur-md bg-white/10 h-fit p-6 w-full md:w-1/2">
        {/* Search Bar */}
        <div className="relative">
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

        {selectedPosition ? (
          <div className="text-white space-y-2">
            <div>
              <div className="flex items-center gap-2">
                <LiaLocationArrowSolid size={30} />
                <span className="text-lg font-medium">
                  {mokeData?.sensorDetail?.streetAddress},{" "}
                  {mokeData?.sensorDetail?.city}
                </span>
              </div>
            </div>
            <div className="text-5xl font-bold">
              {mokeData?.sensorData[0].temperature} °C
            </div>
            <div className="text-gray-300 text-lg">{currentTime}</div>
          </div>
        ) : (
          ""
        )}
        {selectedPosition ? (
          <AirQualityGauge pm25={mokeData?.sensorData[0]?.pm25} />
        ) : (
          ""
        )}
      </div>

      {selectedPosition ? (
        <div className="flex flex-col gap-4 border rounded-3xl backdrop-blur-3xl h-fit p-4 w-fit md:w-1/2">
          <div className="w-fit h-fit relative ">
            <select
              id="dropdown"
              name="dropdown"
              value={selectedOption}
              onChange={handleChange}
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
            <p className="mt-4 text-sm text-gray-500">
              {/* Selected: {selectedOption || "None"} */}
            </p>
          </div>
          <div className="backdrop-brightness-50 rounded-2xl">
            <Graph
              data={modifiedData}
              independant="createdAt"
              dependant="temperature"
              color="#2450ca"
              title="Concentration"
            />
          </div>
          <div className="backdrop-brightness-50 rounded-2xl">
            <Graph
              data={modifiedData}
              independant="createdAt"
              dependant="humidity"
              color="#e91eac"
              title="Concentration"
            />
          </div>
          <div className="backdrop-brightness-50 rounded-2xl ">
            <Graph
              data={modifiedData}
              independant="createdAt"
              dependant="pm25"
              color="#10f308"
              title="Concentration"
            />
          </div>
          {/* <div className="backdrop-brightness-50 rounded-2xl">
            <Graph
              data={modifiedData}
              independant="createdAt"
              dependant="pm25"
              color="#e2f110"
              title="Concentration"
            />
          </div> */}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default LocationSearch;
