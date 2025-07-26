import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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

const RecurringRevenueTable = ({}) => {
  const dashboardData = {
    operatingCosts: {
      categories: ["$400", "$300", "$200", "$100", "$10"],
      data: [
        { month: "Jan", value: 10 },
        { month: "Mar", value: 100 },
        { month: "May", value: 200 },
        { month: "Jul", value: 300 },
        { month: "Sep", value: 400 },
        { month: "Nov", value: 300 },
        { month: "Dec", value: 100 },
      ],
    },
  };

  return (
    <div className="bg-[#FFFFFF05] rounded-[8px] p-4 border border-[#FFFFFF30] backdrop-blur-[111.51px] mt-4">
      <div className="flex justify-between items-center mb-8 ">
        <h2 className="text-white font-semibold">Monthly Recurring Revenue</h2>
        <div className="relative">
          <button className="flex items-center gap-2 justify-between border border-[#FFFFFF30] text-white text-sm px-4 py-2 rounded-[8px]">
            Monthly
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
      <div className="flex h-40 w-full relative">
        <div className="flex flex-col justify-between text-xs text-[#D2D2D2] pb-[13px]">
          {dashboardData.operatingCosts.categories.map((category, index) => (
            <div className="" key={index}>
              {category}
            </div>
          ))}
        </div>
        <div className="flex-1 relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dashboardData.operatingCosts.data}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3570BC" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3570BC" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E2E8F014"
                strokeOpacity={1}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#D2D2D2", fontSize: 12 }}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="linear"
                dataKey="value"
                stroke="#3570BC"
                strokeWidth={2}
                fill="url(#colorUsers)"
                dot={false}
                activeDot={{
                  r: 6,
                  fill: "#3570BC",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default RecurringRevenueTable;
