import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

const AirQualityGauge = () => {
  return (
    <div className="bg-black/50 backdrop-blur-md rounded-3xl mt-8 max-w-sm w-full shadow-lg text-white h-fit p-4">
      <h3 className="text-center text-lg font-semibold mb-4">
        Air Quality Monitor
      </h3>
      <div className="flex items-center justify-center">
        <ReactSpeedometer
          value={75} // Air Quality value (0-100)
          minValue={0}
          maxValue={100}
          segments={5} // Number of segments
          segmentColors={[
            "#ff4d4d",
            "#ff6f6f",
            "#ffc107",
            "#8bd23c",
            "#28a745",
          ]} // Gradient of colors
          needleColor="#ffffff"
          needleBaseColor="#000000" // Dark base circle for needle
          needleHeightRatio={0.7} // Shorter needle
          ringWidth={15} // Thicker ring
          width={300} // Width of the semicircle
          height={150} // Height for the semicircle
          startAngle={-90} // Start angle for semicircle
          endAngle={90} // End angle for semicircle
          customSegmentLabels={[
            { text: "Critical", position: "OUTSIDE", color: "#fff" },
            { text: "Danger", position: "OUTSIDE", color: "#fff" },
            { text: "Moderate", position: "OUTSIDE", color: "#fff" },
            { text: "", position: "OUTSIDE", color: "#fff" },
            { text: "Healthy", position: "OUTSIDE", color: "#fff" },
          ]}
          labelFontSize="8" // Smaller font size for labels
          currentValueText="" // Hide current value
        />
      </div>
      <p className="text-center text-xs mt-4">Last update: Now</p>
    </div>
  );
};

export default AirQualityGauge;
