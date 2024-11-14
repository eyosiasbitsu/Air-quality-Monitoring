import React from "react";
import MyMap from "../components/Map";
import Graph from "../components/Graph";

export default function SensorData() {
  return (
    <div className="flex flex-col gap-8 mt-10 mb-36 justify-center ">
      <MyMap />
      {/* <Graph /> */}
    </div>
  );
}
