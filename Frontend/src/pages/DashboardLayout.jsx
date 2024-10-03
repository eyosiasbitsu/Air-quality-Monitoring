import React, { useState } from "react";
import TablePage from "../components/TablePage";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router";

const DashboardLayout = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const tableData = [
    {
      sensors: "Sensor 1",
      spi: " 1",
      temperature: " 2",
      humidity: " 3",
      location: "Location 1",
      city: "11",
    },
    {
      sensors: "Sensor 2",
      spi: " 4",
      temperature: " 5",
      humidity: " 6",
      location: "Location 2",
      city: "12",
    },
    {
      sensors: "Sensor 3",
      spi: " 7",
      temperature: " 8",
      humidity: " 9",
      location: "Location 1",
      city: "13",
    },
    {
      sensors: "Sensor 4",
      spi: " 10",
      temperature: " 11",
      humidity: " 12",
      location: "Location 3",
      city: "11",
    },
    {
      sensors: "Sensor 5",
      spi: " 13",
      temperature: " 14",
      humidity: " 15",
      location: "Location 2",
      city: "12",
    },
    {
      sensors: "Sensor 6",
      spi: " 16",
      temperature: " 17",
      humidity: " 18",
      location: "Location 3",
      city: "13",
    },
  ];

  const filteredData = tableData.filter(
    (row) =>
      (selectedLocation ? row.location === selectedLocation : true) &&
      (selectedCity ? row.city === selectedCity : true) &&
      (searchText
        ? row.sensors.toLowerCase().includes(searchText.toLowerCase())
        : true),
  );

  const navigate = useNavigate();
  const handleRegistor = () => {
    navigate("/register");
  };

  return (
    <div className=" bg-inherit flex gap-8  flex-row items-start  font-[Prata] justify-around w-[100%] min-h-[90vh] pt-20 p-10">
      <button
        onClick={handleRegistor}
        className="hover:bg-gray-700 text-black font-bold py-6 rounded-3xl px-4 mt-10  bg-gray-600 opacity-70 shadow-2xl backdrop-blur-3xl   min-w-[250px]  "
      >
        <div className="backdrop-brightness-75 py-2 px-3 text-xs flex items-center justify-between w-fit gap-5 rounded-lg">
          <div>Registor a new sensor</div>
          <IoMdAdd color="black" size="1.5rem" />
        </div>
      </button>
      <TablePage filteredData={filteredData} />
    </div>
  );
};

export default DashboardLayout;
