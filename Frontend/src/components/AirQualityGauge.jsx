import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

const AirQualityGauge = ({ pm25 }) => {
  if (pm25 > 70) pm25 = 70;
  return (
    <div className="bg-black/50 backdrop-blur-md rounded-3xl mt-8 max-w-sm w-full shadow-lg text-white h-fit p-4">
      <h3 className="text-center text-lg font-semibold mb-4">
        Air Quality Monitor
      </h3>
      <div className="flex items-center justify-center">
        <ReactSpeedometer
          value={pm25} // Air Quality value (0-100)
          minValue={0}
          maxValue={71}
          segments={4} // Number of segments
          customSegmentStops={[0, 12, 35.4, 55.4, 71]}
          segmentColors={[
            "#28a745",
            "#ffc107",
            "#ff6f6f",
            "#e20707",
            // "#8bd23c",
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
            { text: "Healthy", position: "OUTSIDE", color: "#fff" },
            { text: "Moderate", position: "OUTSIDE", color: "#fff" },
            { text: "Danger", position: "OUTSIDE", color: "#fff" },
            { text: "Critical", position: "OUTSIDE", color: "#fff" },
            // { text: "", position: "OUTSIDE", color: "#fff" },
          ]}
          labelFontSize="8" // Smaller font size for labels
          currentValueText="8" // Hide current value
        />
      </div>
      <p className="text-center text-xs mt-4">Last update: Now</p>
    </div>
  );
};

export default AirQualityGauge;
