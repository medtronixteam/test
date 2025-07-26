import { getPlatformIcon } from "@/utils/getPlatformIcon";
import { ChevronDown } from "lucide-react";
import React, { useState, useEffect } from "react";
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

import { useMetrics } from "@/context/MetricsContext";

const SOCIAL_DATA = {
  Instagram: [10000, 45000, 15000, 50000],
  Facebook: [8000, 40000, 12000, 46000],
  Twitter: [6000, 42000, 10000, 48000],
  TikTok: [5000, 47000, 14000, 55000],
};
const WEEKS = ["Week 1", "Week 2", "Week 3", "Week 4"];

const SocialNetworkChart = ({ highlightedWeek }) => {
  const [selectedNetwork, setSelectedNetwork] = useState();
  const [platforms, setPlatforms] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [graphData, setGraphData] = useState(false);
  const { insightMetrics, loading: metricsLoading, error } = useMetrics();



  // const values = SOCIAL_DATA[selectedNetwork];
  // const data = WEEKS.map((date, i) => ({ date, users: values[i] }));
  // const highlightedIndex = data.findIndex(
  //   (item) => item.week === highlightedWeek
  // );
  // const highlightedValue = data[highlightedIndex]?.users || 0;

  // const formatNumber = (num) =>
  //   num >= 1000 ? `${Math.floor(num / 1000)}k` : num.toString();


  useEffect(() => {
    if (selectedNetwork){
      if (insightMetrics[selectedNetwork].length > 0){
        const last7 = insightMetrics[selectedNetwork].slice(Math.max(-7, -insightMetrics[selectedNetwork].length));

        const views = last7.map(entry => entry.followers_count);
        const dates = last7.map(entry => entry.date);

        const data = dates.map((date, i) => ({ date, users: views[i] }));

        setGraphData(data);
      }
    }

    if (Object.keys(insightMetrics).length > 0)
    {
      let allPlatforms = [];
      Object.keys(insightMetrics).forEach((platform) => {
        allPlatforms.push(platform);
      });

      setPlatforms(allPlatforms);
      if (!selectedNetwork)
      {
        setSelectedNetwork(allPlatforms[0]);
      }
    }
  }, [insightMetrics, metricsLoading, selectedNetwork])

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1a1a1a] border border-[#333] rounded p-2 text-white text-sm">
          <p className="font-medium">{payload[0].payload.date}</p>
          <p className="text-[#3570BC]">
            {payload[0].value.toLocaleString()} users
          </p>
        </div>
      );
    }
    return null;
  };

  if (platforms.length ==0 )
  {
    return (
      <div className="border border-[#FFFFFF30] rounded-[20px] p-4 bg-[#FFFFFF05]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-8">
          <h2 className="text-lg font-medium">No platforms Connected</h2>
        <div className="relative w-full md:w-48">
      <div className="h-[230px] w-full ">
    </div>  
    </div>  
    </div>  
    </div>  
    )
  }

  return (
    <div className="border border-[#FFFFFF30] rounded-[20px] p-4 bg-[#FFFFFF05]">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-8">
        <h2 className="text-lg font-medium">
          Social Networks <br className="hidden md:block" />
          Comparison
        </h2>

        <div className="relative w-full md:w-48">
          {" "}
          <div
            className="px-4 py-3 flex w-full justify-between items-center border border-[#FFFFFF30] rounded-[8px] cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="flex items-center gap-2">
              <img
                src={getPlatformIcon(selectedNetwork.toLowerCase())}
                alt={selectedNetwork}
                className="w-5 h-5"
              />
              <span className="text-white">{selectedNetwork}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-white" />
          </div>
          {dropdownOpen && (
            <div className="absolute z-10 mt-1 bg-[#1e1e1e] border border-[#FFFFFF30] rounded-[8px] w-full max-h-48 overflow-auto">
              {platforms.map((platform) => (
                <div
                  key={platform}
                  className="flex items-center gap-2 px-4 py-2 text-white hover:bg-[#333] cursor-pointer"
                  onClick={() => {
                    setSelectedNetwork(platform);
                    setDropdownOpen(false);
                  }}
                >
                  <img
                    src={getPlatformIcon(platform.toLowerCase())}
                    alt={platform}
                    className="w-5 h-5"
                  />
                  {platform}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="h-[230px] w-full ">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={graphData}
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
              dataKey="date"
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
              // tickFormatter={formatNumber}
              // domain={[0, 75000]}
              // ticks={[0, 10000, 25000, 50000, 75000]}
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
            {/* {highlightedIndex !== -1 && (
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
            )} */}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SocialNetworkChart;
