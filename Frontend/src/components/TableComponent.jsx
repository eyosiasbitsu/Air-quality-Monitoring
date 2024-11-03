import React from "react";
import { FaStar } from "react-icons/fa";

const TableComponent = ({ data }) => {
  return (
    <div className="flex justify-center items-center w-full bg-inherit backdrop-blur-md shadow-2xl shadow-black rounded-3xl md:p-6">
      <div className="w-full overflow-x-auto">
        <table className="w-full rounded-2xl bg-inherit overflow-hidden text-gray-200 border-spacing-0">
          <thead>
            <tr>
              <th className="py-1 px-2 md:px-6 text-left font-semibold w-1/3">Sensors</th>
              <th className="py-1 px-2 md:px-6 text-left font-semibold w-1/6">SPI</th>
              <th className="py-1 px-2 md:px-6 text-left font-semibold w-1/6">Temperature</th>
              <th className="py-1 px-2 md:px-6 text-left font-semibold w-1/6">Humidity</th>
              <th className="py-1 px-2 md:px-6 text-left font-semibold w-1/6">PM 2.5</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b border-gray-300 p-6 bg-inherit">
                <td className="py-2 md:py-4 px-4 text-sm">{row.sensors}</td>
                <td className="py-2 md:py-4 px-4">
                  <div className="min-w-12 text-center bg-gray-200 text-gray-800 w-fit text-xs rounded-lg px-2 py-1">
                    {row.spi}
                  </div>
                </td>
                <td className="py-2 md:py-4 px-4">
                  <div className="min-w-12 text-center bg-gray-200 text-gray-800 w-fit text-xs rounded-lg px-2 py-1">
                    {row.temperature}
                  </div>
                </td>
                <td className="py-2 md:py-4 px-4">
                  <div className="min-w-12 text-center bg-gray-200 text-gray-800 w-fit text-xs rounded-lg px-2 py-1">
                    {row.humidity}
                  </div>
                </td>
                <td className="py-2 md:py-4 px-4">
                  <div className="min-w-12 text-center bg-gray-200 text-gray-800 w-fit text-xs rounded-lg px-2 py-1">
                    {row.pm25}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
