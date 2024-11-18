import React from "react";
import Graph from "./Graph";

export default function HomePage({
  setSearchText,
  handleSearch,
  searchText,
  data,
}) {
  return (
    <div className="flex flex-col gap-2 mt-4 ">
      <div className="flex relative bottom-80 gap-3">
        <input
          type="text"
          placeholder="Search location..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="py-2 px-6 border   border-gray-300 focus:outline-none rounded-full backdrop-brightness-50 bg-inherit"
        />
        <button
          onClick={handleSearch}
          className="bg-gray-300 py-2 px-4  hover:bg-gray-400 transition-colors rounded-full"
        >
          Search
        </button>
      </div>
      {Array.isArray(data) && (
        <div className="flex ">
          <div className="bg-inherit text-gray-200 flex flex-col text-xl font-semibold gap-2 relative bottom-72">
            <div className="flex justify-between">
              <span> temperature</span>
              <span>{data[0].temperature}</span>
            </div>
            <div className="flex justify-between">
              <span> humidity</span>
              <span>{data[0].humidity}</span>
            </div>
            <div className="flex justify-between">
              <span> spi</span>
              <span>{data[0].spi}</span>
            </div>
            <div className="flex justify-between">
              <span> pm25</span>
              <span>{data[0].pm25}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
