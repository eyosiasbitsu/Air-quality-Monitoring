import React, { useState } from "react";
import { format, parseISO } from "date-fns";
import { FaStar } from "react-icons/fa";

const TableComponent = ({ data }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(0);
  const startIdx = currentPage * itemsPerPage;
  const paginatedData = data?.slice(startIdx, startIdx + itemsPerPage);

  const handleNext = () => {
    if ((currentPage + 1) * itemsPerPage < data.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full bg-inherit backdrop-blur-md shadow-2xl shadow-black rounded-3xl md:p-6">
      <div className="w-full overflow-x-auto">
        <table className="w-full rounded-2xl bg-inherit overflow-hidden text-gray-200 border-spacing-0">
          <thead className="rounded-3xl backdrop-brightness-50 p-1">
            <tr>
              <th className="py-1 px-2 md:px-6 text-left font-semibold w-1/3">
                Date Recorded
              </th>
              {/* <th className="py-1 px-2 md:px-6 text-left font-semibold w-1/6">
                SPI
              </th> */}
              <th className="py-1 px-2 md:px-6 text-left font-semibold w-1/6">
                Temperature
              </th>
              <th className="py-1 px-2 md:px-6 text-left font-semibold w-1/6">
                Humidity
              </th>
              <th className="py-1 px-2 md:px-6 text-left font-semibold w-1/6">
                PM 2.5
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((row, index) => (
              <tr
                key={index}
                className="border-b border-gray-300 p-6 bg-inherit"
              >
                <td className="py-2 md:py-4 px-4 text-sm font-bold">
                  {format(parseISO(row?.createdAt), "yyyy-MM-dd HH:mm")}
                </td>
                {/* <td className="py-2 md:py-4 px-4">
                  <div className="min-w-12 text-center bg-gray-200 text-gray-800 w-fit text-xs rounded-lg px-2 py-1">
                    {row.spi}
                  </div>
                </td> */}
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
      <div className="flex justify-between w-full mt-4">
        <button
          onClick={handleBack}
          disabled={currentPage === 0}
          className="bg-gray-500 text-gray-200 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={(currentPage + 1) * itemsPerPage >= data?.length}
          className="bg-gray-500 text-gray-200 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
