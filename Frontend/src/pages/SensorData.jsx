import React from "react";

export default function SensorData() {
  return (
    <div className="flex gap-8 mt-10 mb-36 justify-center">
      <div>
        <img src="/image.png" className="max-h-[29rem] rounded-2xl"></img>
      </div>
      <div className=" backdrop-blur-3xl p-4 w-fit">
        <img src="/imageGraph.png" className="max-h-96 "></img>
      </div>
    </div>
  );
}
