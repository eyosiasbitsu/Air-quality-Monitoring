import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { FaStar } from "react-icons/fa";
import { LiaLocationArrowSolid } from "react-icons/lia";
import AirQualityGauge from "./AirQualityGauge";
import { BiArrowBack } from "react-icons/bi";
import SensorPage from "./SensorPage";
import { useNavigate } from "react-router";

const TableComponent = ({ data }) => {
  const itemsPerPage = 10;
  const [currentTime, setCurrentTime] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const startIdx = currentPage * itemsPerPage;
  const paginatedData = data?.sensorData?.slice(
    startIdx,
    startIdx + itemsPerPage,
  );

  const navigate = useNavigate();

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
    <>
      <button
        className="relative top-10 left-5 hover:bg-black hover:opacity-20 rounded-lg"
        onClick={() => navigate("/SensorPage")}
      >
        <BiArrowBack size={35} color="white" />
      </button>
      <div className="flex gap-10 mt-20">
        {" "}
        <div className="flex flex-col gap-6 h-fit p-6 w-3/5 md:w-1/2 relative top-10">
          <div className="text-white space-y-2">
            <div>
              <div className="flex items-center gap-2">
                <LiaLocationArrowSolid size={30} />
                <span className="text-lg font-medium">
                  {data?.streetAddress}, {data?.city}
                </span>
              </div>
            </div>
            <div className="text-5xl font-bold">
              {data?.sensorData[0]?.temperature} °C
            </div>
            <div className="text-gray-300 text-lg">{currentTime}</div>
          </div>

          <AirQualityGauge pm25={data?.sensorData[0]?.pm25} />
        </div>
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
                    <td className="flex items-center gap-2 py-2 md:py-4 px-4 text-sm font-bold">
                      <FaStar size="1rem" color="gold" />
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
      </div>
    </>
  );
};

export default TableComponent;
