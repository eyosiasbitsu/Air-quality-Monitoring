import React from "react";
import {
  AreaChart,
  ResponsiveContainer,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function Graph({ data, color, independant, dependant, title }) {
  return (
    <div>
      <h2 className="text-sm font-medium flex items-start text-center text-white mb-2 relative top-2 left-5">
        {title}
      </h2>
      <div className="h-20 w-[100%] relative top-4 right-5">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <XAxis
              dataKey={independant}
              tick={false} // Custom tick styles
              // axisLine={{ stroke: "white" }} // Custom axis line color
              // tickLine={{ stroke: "white" }} // Custom tick line color
            />
            {/* YAxis with custom tick color */}
            <YAxis
              tick={{ fill: "white", fontSize: 12 }} // Custom tick styles
              // axisLine={{ stroke: "white" }} // Custom axis line color
              // tickLine={{ stroke: "white" }} // Custom tick line color
            />
            <Area
              type="monotone"
              dataKey={dependant}
              stroke={color}
              fill={color}
            />
            <Tooltip />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
