import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChevronDown } from "lucide-react";

const UserAcquisitionChart = () => {
  const [timeframe, setTimeframe] = useState("Monthly");
  const [showDropdown, setShowDropdown] = useState(false);

  const acquisitionData = [
    { name: "Organic", value: 39.11, change: 0.98, color: "#7C3AD1" },
    { name: "Paid ad", value: 28.02, change: -3.25, color: "#2C5892" },
    { name: "Referrals", value: 23.13, change: 0.14, color: "#436FA9" },
    { name: "Social", value: 5.03, change: -1.11, color: "#AD70FB" },
  ];

  const seoKeywords = [
    { keyword: "Key word", progress: 95 },
    { keyword: "Key word", progress: 85 },
    { keyword: "Key word", progress: 75 },
    { keyword: "Key word", progress: 65 },
    { keyword: "Key word", progress: 50 },
    { keyword: "Key word", progress: 35 },
    { keyword: "Key word", progress: 35 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1A1A1A] p-2 border border-gray-700 rounded shadow-lg">
          <p className="text-white text-xs">{`${payload[0].name}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-[#FFFFFF05] rounded-[8px] p-5 border border-[#FFFFFF30] backdrop-blur-[111.51px]">
        <div className="flex justify-between  mb-4">
          <div>
            <h2 className="text-white font-semibold">
              Sources of user acquisition
            </h2>{" "}
            <h3 className="text-white text-3xl ">$3,348</h3>
          </div>
          <div className="relative w-32">
            <button
              className="flex w-full items-center gap-2 justify-between border border-[#FFFFFF30] text-white text-sm px-4 py-2 rounded-[8px]"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {timeframe} <ChevronDown size={16} />
            </button>
            {showDropdown && (
              <div className="absolute z-10 mt-1 w-full rounded-[8px] bg-[#1e1e1e] border border-[#FFFFFF30] shadow-lg backdrop-blur-md">
                {["Daily", "Weekly", "Monthly", "Yearly"].map((option) => (
                  <button
                    key={option}
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-[#3A3A40]"
                    onClick={() => {
                      setTimeframe(option);
                      setShowDropdown(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Chart Container */}
          <div className="w-full md:w-1/2 min-h-[200px] h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={acquisitionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={100}
                  paddingAngle={0}
                  dataKey="value"
                >
                  {acquisitionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Details List */}
          <div className="w-full md:w-1/2 p-4 overflow-y-auto flex flex-col justify-center h-auto">
            {acquisitionData.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-4"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-white text-sm">{item.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-white/60 text-sm">{item.value}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`${
                      item.change >= 0 ? "text-[#04CE00]" : "text-[#FF718B]"
                    } text-sm`}
                  >
                    ({item.change >= 0 ? "+" : ""}
                    {item.change}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#FFFFFF05] rounded-[8px] p-5 border border-[#FFFFFF30] backdrop-blur-[111.51px]">
        <h2 className="text-white font-semibold mb-6"> SEO analysis</h2>

        <div className="space-y-4">
          {seoKeywords.map((item, index) => (
            <div key={index}>
              <div className="flex items-center gap-3  mb-1">
                <div className="text-white/80 min-w-20">{item.keyword}</div>
                <div className="w-full bg-[#2A2A2A] rounded-md h-3.5 flex-1">
                  <div
                    className="bg-[#2F5E9B] h-3.5 rounded-md"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserAcquisitionChart;
