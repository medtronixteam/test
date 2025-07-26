import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const GrowthLineChart = ({
  dashboardData,
  userGrowthTimeframe,
  setUserGrowthTimeframe,
  CustomTooltip,
}) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        {/* Title */}
        <h2 className="text-white font-semibold">User Growth</h2>

        {/* Timeframe Buttons */}
        <div className="flex border border-[#FFFFFF30] rounded-[8px] overflow-hidden w-full md:w-auto">
          {["Daily", "Weekly", "Annually"].map((timeframe) => (
            <button
              key={timeframe}
              className={`flex-1 md:flex-none text-white text-sm px-6 py-2 transition ${
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

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dashboardData.userGrowth.data}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3570BC" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#3570BC" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="month"
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
              tickFormatter={(value) => {
                if (value === 0) return "0";
                if (value === 500) return "50k";
                if (value === 1000) return "100k";
                return "";
              }}
              domain={[0, 1000]}
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

export default GrowthLineChart;
