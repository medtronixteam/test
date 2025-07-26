import React, { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const EstimatedReach = ({
  data: initialData,
  minReach = 12,
  maxReach = 28,
  highlightedWeek = "Week 3",
  highlightedValue = 23432,
}) => {
  const defaultData = [
    { week: "Week 1", users: 15000 },
    { week: "Week 2", users: 32000 },
    { week: "Week 3", users: 23432 },
    { week: "Week 4", users: 42000 },
    { week: "Week 5", users: 10000 },
  ];

  const [data, setData] = useState(initialData || defaultData);

  // Find the highlighted point index
  const highlightedIndex = data.findIndex(
    (item) => item.week === highlightedWeek
  );

  // Format number with k suffix
  const formatNumber = (num) => {
    if (num >= 1000) {
      return `${Math.floor(num / 1000)}k`;
    }
    return num.toString();
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1a1a1a] border border-[#333] rounded p-2 text-white text-sm">
          <p className="font-medium">{payload[0].payload.week}</p>
          <p className="text-[#3570BC]">
            {payload[0].value.toLocaleString()} users
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="mt-6 w-full bg-[#232323] p-5 border border-[#FFFFFF30] rounded-[20px] text-white overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-5 gap-2">
        <h2 className="text-lg font-medium">Estimated Reach</h2>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold">
            {minReach}K - {maxReach}K
          </span>
          <span className="text-sm text-gray-400 uppercase">users</span>
        </div>
      </div>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3570BC" stopOpacity={1} />
                <stop offset="95%" stopColor="#3570BC" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#333"
              strokeOpacity={0.5}
            />
            <XAxis
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#999", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              orientation="right"
              axisLine={false}
              tickLine={false}
              width={40}
              tick={{ fill: "#999", fontSize: 12 }}
              tickFormatter={formatNumber}
              domain={[0, 75000]}
              ticks={[0, 10000, 25000, 50000, 75000]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="users"
              stroke="#3570BC"
              strokeWidth={3}
              fill="url(#colorUsers)"
              dot={false}
              activeDot={{
                r: 6,
                fill: "#3570BC",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
            {highlightedIndex !== -1 && (
              <>
                <ReferenceLine
                  x={data[highlightedIndex].week}
                  stroke="#3570BC"
                  strokeWidth={1.5}
                />
                <ReferenceLine
                  x={data[highlightedIndex].week}
                  y={data[highlightedIndex].users}
                  ifOverflow="extendDomain"
                  label={{
                    value: highlightedValue.toLocaleString(),
                    position: "top",
                    fill: "#fff",
                    fontSize: 12,
                  }}
                  stroke="none"
                />
              </>
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EstimatedReach;
