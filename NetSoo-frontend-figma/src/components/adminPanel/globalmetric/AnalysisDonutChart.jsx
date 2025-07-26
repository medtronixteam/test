import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const AnalysisDonutChart = ({ dashboardData }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-white font-semibold">Analysis</h2>
      </div>

      <div className="flex gap-4 justify-center mb-4 flex-wrap">
        {dashboardData.analysisDonut.data.map((entry, index) => (
          <div key={index} className="flex items-center">
            <div
              className="w-3 h-3 rounded-full mr-1.5"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-white text-sm opacity-80">{entry.label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dashboardData.analysisDonut.data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              cornerRadius={4}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              labelLine={false}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
              }) => {
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    fill="#fff"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={14}
                    fontWeight="bold"
                  >
                    {`${value}%`}
                  </text>
                );
              }}
              isAnimationActive={false}
              activeIndex={null}
            >
              {dashboardData.analysisDonut.data.map((entry, index) => (
                <Cell stroke="none" key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalysisDonutChart;
