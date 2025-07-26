import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const OperatingCostsLineChart = ({ timeframe, dashboardData, BarTooltip }) => {
  const chartData = dashboardData.operatingCostsBar.data.map((item) => {
    return {
      ...item,
      fill: item.highlight ? "#3570BC" : "#4A4A4A",
    };
  });
  return (
    <div>
      {" "}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-white font-semibold">Operating Costs</h2>
        <div className="relative ">
          <button className="flex items-center gap-2 justify-between border border-[#FFFFFF30] text-white text-sm px-4 py-2 rounded-[8px]">
            {timeframe}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </div>
      <div className="h-56 relative w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barSize={26}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#D2D2D2", fontSize: 12 }}

            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#D2D2D2", fontSize: 12 }}
              tickFormatter={(value) => `${value / 1000}k`}
              domain={[0, 4000]}
              width={30}
            />
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E2E8F014"
              strokeOpacity={1}
            />
            <Tooltip content={<BarTooltip />} />
            <Bar dataKey="value" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OperatingCostsLineChart;
