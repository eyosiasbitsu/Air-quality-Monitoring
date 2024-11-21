import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { newSensor } from "../../services/sensorsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import MyMap2 from "../components/MyMap";

const RegisterSensor = () => {
  const [sensorTag, setSensorTag] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [showMap, setShowMap] = useState(false); // Control the map visibility

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  queryClient.invalidateQueries({ queryKey: ["todos"] });

  const { isPending, mutate } = useMutation({
    mutationFn: (obj) => newSensor(obj),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sensors"] });
      navigate("/sensorpage");
    },
  });

  return (
    <div className="bg-inherit flex flex-col items-center justify-center min-h-[90vh] pb-20">
      <div className="bg-inherit shadow-lg rounded-3xl p-8 backdrop-blur-3xl text-gray-100 w-full md:w-1/2 ">
        <h2 className="md:text-3xl font-bold mb-8 text-center">
          Air Quality Monitoring Registration
        </h2>
        <form className="flex flex-col space-y-6">
          <input
            type="text"
            placeholder="Sensor Tag"
            value={sensorTag}
            onChange={(e) => setSensorTag(e.target.value)}
            className="border rounded-md px-3 py-1 w-full bg-inherit backdrop-brightness-50"
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border rounded-md px-3 py-1 w-full bg-inherit backdrop-brightness-50"
          />
          <input
            type="text"
            placeholder="Street Address"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            className="border rounded-md px-3 py-1 w-full bg-inherit backdrop-brightness-50"
          />
          <input
            type="text"
            placeholder="Latitude"
            value={lat}
            onFocus={() => setShowMap(true)} // Show the map when focused
            className="border rounded-md px-3 py-1 w-full bg-inherit backdrop-brightness-50"
            readOnly // Prevent manual typing
          />
          <input
            type="text"
            placeholder="Longitude"
            value={lng}
            onFocus={() => setShowMap(true)} // Show the map when focused
            className="border rounded-md px-3 py-1 w-full bg-inherit backdrop-brightness-50"
            readOnly // Prevent manual typing
          />
          <button
            type="submit"
            disabled={isPending}
            className={
              sensorTag && lat && lng && city && streetAddress
                ? "bg-white  hover:bg-gray-300 text-gray-700 font-bold md:py-2 px-6 rounded-full h-[44px] w-[40%]"
                : "bg-gray-100 opacity-30 hover:bg-gray-300 text-gray-700 font-bold md:py-2 px-6 rounded-full h-[44px] w-[40%]"
            }
            onClick={(e) => {
              e.preventDefault();
              mutate({ sensorTag, city, lat, lng, streetAddress });
            }}
          >
            {isPending ? "Registering" : "Register"}
          </button>
        </form>
      </div>
      {/* Conditional rendering for the map */}
      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-4 w-[90%] h-[70%] relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              onClick={() => setShowMap(false)}
            >
              Close
            </button>
            <MyMap2 setLat={setLat} setLng={setLng} setShowMap={setShowMap} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterSensor;
