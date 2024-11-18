import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { BsBoxArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router";

const SensorList = ({ data }) => {
  const navigate = useNavigate();
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

  const handleSubmit = (id) => {
    navigate(id);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full bg-inherit backdrop-blur-md shadow-2xl shadow-black rounded-3xl md:p-6">
      <div className="w-full overflow-x-auto">
        <div className="w-full rounded-2xl bg-inherit overflow-hidden text-gray-200 border-spacing-0">
          <div className="flex justify-center">
            <span className="border px-16 py-1 backdrop-brightness-75 rounded-2xl font-semibold">
              Sensors
            </span>
          </div>
          <div>
            {paginatedData.map((row, index) => (
              <div
                key={index}
                className="flex border-b border-gray-300 p-3 bg-inherit w-auto min-w-[28rem] gap-10 justify-between"
              >
                <div className="py-2 md:py-2 px-4 text-sm font-semibold">
                  <div className="w-auto">
                    {row.streetAddress}, {row.city}
                  </div>
                  <div className="text-xs">{row.sensorTag}</div>
                </div>
                <button
                  className="flex gap-5 items-center border px-4 rounded-2xl"
                  onClick={() => handleSubmit(row._id)}
                >
                  <div>See Detail</div>
                  <div>
                    <BsBoxArrowRight />
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
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
          disabled={(currentPage + 1) * itemsPerPage >= data.length}
          className="bg-gray-500 text-gray-200 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SensorList;
