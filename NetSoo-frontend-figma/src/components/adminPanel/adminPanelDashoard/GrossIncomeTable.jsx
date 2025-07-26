import React, { useState } from "react";
import {
  Area,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const dashboardData = {
  userGrowth: {
    Daily: [
      { label: "Mon", value: 200 },
      { label: "Tue", value: 300 },
      { label: "Wed", value: 250 },
      { label: "Thu", value: 400 },
      { label: "Fri", value: 350 },
      { label: "Sat", value: 500 },
      { label: "Sun", value: 300 },
    ],
    Weekly: [
      { label: "Week 1", value: 500 },
      { label: "Week 2", value: 600 },
      { label: "Week 3", value: 700 },
      { label: "Week 4", value: 800 },
    ],
    Annually: [
      { label: "Jan", value: 200 },
      { label: "Mar", value: 300 },
      { label: "May", value: 500 },
      { label: "Jul", value: 700 },
      { label: "Sep", value: 1000 },
      { label: "Nov", value: 800 },
      { label: "Dec", value: 600 },
    ],
  },
};

const GrossIncomeTable = () => {
  const [userGrowthTimeframe, setUserGrowthTimeframe] = useState("Daily");

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1a1a1a] border border-[#333] rounded p-2 text-white text-sm">
          <p className="font-medium">{payload[0].payload.label}</p>
          <p className="text-[#3570BC]">
            {payload[0].value.toLocaleString()} users
          </p>
        </div>
      );
    }
    return null;
  };
  const incomeTotal = dashboardData.userGrowth[userGrowthTimeframe].reduce(
    (sum, item) => sum + item.value,
    0
  );
  return (
    <div className="bg-[#FFFFFF05] rounded-[8px] p-4 border border-[#FFFFFF30] backdrop-blur-[111.51px]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        {/* Left: Title and Income */}
        <div>
          <h2 className="text-white font-semibold">Gross income</h2>
          <h1 className="text-white font-semibold text-2xl">
            ${incomeTotal.toLocaleString()}
          </h1>
        </div>

        {/* Right: Timeframe Buttons */}
        <div className="flex border border-[#FFFFFF30] rounded-[8px] overflow-hidden w-full md:w-auto">
          {["Daily", "Weekly", "Annually"].map((timeframe) => (
            <button
              key={timeframe}
              className={`w-full md:w-auto text-white text-sm px-6 py-2 transition ${
                userGrowthTimeframe === timeframe
                  ? "bg-[#3570BC] rounded-[8px] m-1 font-semibold"
                  : "bg-transparent"
              }`}
              onClick={() => setUserGrowthTimeframe(timeframe)}
            >
              {timeframe}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dashboardData.userGrowth[userGrowthTimeframe]}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3570BC" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#3570BC" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#D2D2D2", fontSize: 12 }}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              width={30}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#D2D2D2", fontSize: 12 }}
              tickFormatter={(value) => `${value}$`}
              domain={[0, 500]}
              ticks={[0, 10, 100, 200, 300, 400, 500]}
              padding={{ bottom: 15 }}
            />
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E2E8F014"
              strokeOpacity={1}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3570BC"
              strokeWidth={2}
              fill="url(#colorUsers)"
              activeDot={{ r: 6, fill: "#3570BC", stroke: "#1E1E24" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GrossIncomeTable;
