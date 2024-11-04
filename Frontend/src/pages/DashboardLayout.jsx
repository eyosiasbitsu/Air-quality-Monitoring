import React, { useState } from "react";
import TablePage from "../components/TablePage";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router";

const DashboardLayout = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const navigate = useNavigate();
  const handleRegistor = () => {
    navigate("/register");
  };

  return (
    <div className=" bg-inherit flex gap-4 md:gap-8  md:flex-row flex-col-reverse items-start  font-[Prata] justify-around w-[100%] md:min-h-[90vh] pt-20 p-0 md:p-10">
      <button
        onClick={handleRegistor}
        className="hover:bg-gray-700 text-black font-bold py-6 rounded-3xl px-4 mt-10  bg-gray-600 opacity-70 shadow-2xl backdrop-blur-3xl   min-w-[250px]  "
      >
        <div className="backdrop-brightness-75 py-2 px-3 text-xs flex items-center justify-between w-fit gap-5 rounded-lg">
          <div>Registor a new sensor</div>
          <IoMdAdd color="black" size="1.5rem" />
        </div>
      </button>
      <TablePage />
    </div>
  );
};

export default DashboardLayout;
