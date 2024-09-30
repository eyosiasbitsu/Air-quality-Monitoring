import React from "react";
import { Link } from "react-router-dom";

const RegisterSensor = () => {
  return (
    <div className=" bg-inherit flex items-center justify-center min-h-[90vh] pb-20">
      <div
        className="bg-inherit shadow-lg rounded-3xl p-12 backdrop-blur-3xl text-gray-100"
        style={{
          width: "50vw", // 50% of the viewport width
        }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">
          Air Quality Monitoring Registration
        </h2>
        <form className="flex flex-col space-y-6 ">
          <input
            type="text"
            placeholder="City"
            className="border rounded-md px-4 py-2 w-full bg-inherit backdrop-brightness-50"
          />
          <input
            type="text"
            placeholder="Street Address"
            className="border rounded-md px-4 py-2 w-full bg-inherit backdrop-brightness-50"
          />
          <input
            type="text"
            placeholder="Sensor ID"
            className="border rounded-md px-4 py-2 w-full bg-inherit backdrop-brightness-50"
          />
          <input
            type="text"
            placeholder="Location"
            className="border rounded-md px-4 py-2 w-full bg-inherit backdrop-brightness-50"
          />
          <button
            type="submit"
            className="bg-gray-100 opacity-30 hover:bg-gray-300 text-gray-700 font-bold py-2 px-6 rounded-full"
            style={{ height: "44px", width: "40%" }} // Ensure button height is 44px
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterSensor;
