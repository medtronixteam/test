import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ProfitMarginChart = ({ CustomTooltip, dashboardData }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-white font-semibold">Profit Margin</h2>
      </div>
      <div className="h-56 relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dashboardData.profitMargin.data}>
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#D2D2D2", fontSize: 12 }}
            />
            <YAxis
              domain={[42, 44]}
              ticks={[42, 42.5, 43, 43.5, 44]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#D2D2D2", fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
              width={40}
              padding={{ bottom: 15 }}
              widths={30}
            />
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E2E8F014"
              strokeOpacity={1}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Blue Line */}
            <Line
              type="monotone"
              dataKey="blue"
              name="Blue Line"
              stroke="#3264A5"
              strokeWidth={2}
              strokeOpacity={1}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#3264A5",
                stroke: "#1E1E24",
              }}
            />
            {/* Purple Line */}
            <Line
              type="monotone"
              dataKey="purple"
              name="Purple Line"
              stroke="#7C3AD1"
              strokeWidth={2}
              strokeOpacity={1}
              dot={false}
              activeDot={{
                r: 6,
                fill: "#7C3AD1",
                stroke: "#1E1E24",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProfitMarginChart;
