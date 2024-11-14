import React from "react";
import {
  AreaChart,
  ResponsiveContainer,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { date: "2024-11-01", pm25: 35 },
  { date: "2024-11-02", pm25: 42 },
  { date: "2024-11-03", pm25: 30 },
  { date: "2024-11-04", pm25: 28 },
  { date: "2024-11-05", pm25: 40 },
  { date: "2024-11-06", pm25: 45 },
  { date: "2024-11-07", pm25: 50 },
  { date: "2024-11-08", pm25: 48 },
  { date: "2024-11-09", pm25: 60 },
  { date: "2024-11-10", pm25: 55 },
];

export default function Graph() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Area type="monotone" dataKey="pm25" stroke="#8884d8" fill="#8884d8" />
        <Tooltip />
      </AreaChart>
    </ResponsiveContainer>
  );
}
