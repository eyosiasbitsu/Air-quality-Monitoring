// RegisterSensor.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { newSensor } from "../../services/sensorsApi";
import { useMutation } from "@tanstack/react-query";
import MyMap2 from "../components/MyMap";

const RegisterSensor = () => {
  const [sensorId, setSensorId] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");

  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation({
    mutationFn: (obj) => newSensor(obj),
    onSuccess: () => {
      navigate("/sensordata");
    },
  });

  return (
    <div className="bg-inherit flex items-center justify-center min-h-[90vh] pb-20">
      <div className="bg-inherit shadow-lg rounded-3xl p-8 backdrop-blur-3xl text-gray-100 w-full md:w-1/2">
        <h2 className="md:text-3xl font-bold mb-8 text-center">
          Air Quality Monitoring Registration
        </h2>
        <form className="flex flex-col space-y-6">
          <input
            type="text"
            placeholder="Sensor ID"
            value={sensorId}
            onChange={(e) => setSensorId(e.target.value)}
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
            onChange={(e) => setLat(e.target.value)}
            className="border rounded-md px-3 py-1 w-full bg-inherit backdrop-brightness-50"
          />
          <input
            type="text"
            placeholder="Longitude"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            className="border rounded-md px-3 py-1 w-full bg-inherit backdrop-brightness-50"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gray-100 opacity-30 hover:bg-gray-300 text-gray-700 font-bold md:py-2 px-6 rounded-full h-[44px] w-[40%]"
            onClick={(e) => {
              e.preventDefault();
              mutate({ sensorId, city, lat, lng, streetAddress });
            }}
          >
            Register
          </button>
        </form>
      </div>
      <div className="w-full md:w-1/2 h-full">
        <MyMap2 setLat={setLat} setLng={setLng} />
      </div>
    </div>
  );
};

export default RegisterSensor;
