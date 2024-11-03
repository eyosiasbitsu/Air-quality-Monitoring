import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { newSensor } from "../../services/sensorsApi";
import { useMutation } from "@tanstack/react-query";

const RegisterSensor = () => {
  const [location, setLocation] = useState("");
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
    <div className=" bg-inherit flex items-center justify-center min-h-[90vh] pb-20">
      <div
        className="bg-inherit shadow-lg rounded-3xl p-8 backdrop-blur-3xl text-gray-100 w-[100vm] md:w-[50vm]"
        
      >
        <h2 className="md:text-3xl font-bold mb-8 text-center">
          Air Quality Monitoring Registration
        </h2>
        <form className="flex flex-col space-y-6 ">
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
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border rounded-md px-3 py-1 w-full bg-inherit backdrop-brightness-50"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gray-100 opacity-30 hover:bg-gray-300 text-gray-700 font-bold md:py-2 px-6 rounded-full h-[44px] w-[40%]"
            onClick={(e) => {
              e.preventDefault();
              mutate({ city, location, streetAddress });
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterSensor;
