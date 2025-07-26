import { getPlatformIcon } from "@/utils/getPlatformIcon";
import { ChevronDown } from "lucide-react";
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

const SOCIAL_DATA = {
  Instagram: [10000, 45000, 15000, 50000],
  Facebook: [8000, 40000, 12000, 46000],
  Twitter: [6000, 42000, 10000, 48000],
  TikTok: [5000, 47000, 14000, 55000],
};
const WEEKS = ["Week 1", "Week 2", "Week 3", "Week 4"];

const Graph = ({ 
    title,
    dataX,
    xKey,
    dataY,
    yKey,
    highlightedX 
    }) => {
  const data = dataX.map((x, i) => ({ [xKey] : x, [yKey] : dataY[i] }));

  const highlightedIndex = data.findIndex(
    (item) => item[xKey] === highlightedX
  );
  const highlightedValue = data[highlightedIndex]?.[yKey] || 0;

  const formatNumber = (num) =>
    num >= 1000 ? `${Math.floor(num / 1000)}k` : num.toString();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1a1a1a] border border-[#333] rounded p-2 text-white text-sm">
          <p className="font-medium">{payload[0].payload[xKey]}</p>
          <p className="text-[#3570BC]">
            {payload[0].value.toLocaleString()} {yKey}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="border border-[#FFFFFF30] rounded-[20px] p-4 bg-[#FFFFFF05]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-8">
        <h2 className="text-lg font-medium">
          {title} <br className="hidden md:block" />
        </h2>
      </div>

      <div className="h-[230px] w-full ">
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
              dataKey={xKey}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#999", fontSize: 12 }}
              dy={10}
              interval={0}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis
              orientation="right"
              axisLine={false}
              width={30}
              tickLine={false}
              tick={{ fill: "#999", fontSize: 12 }}
              tickFormatter={formatNumber}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={yKey}
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

export default Graph;
