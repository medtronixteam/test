import { ArrowUp, Check, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { CircularGauge } from "./CircularGauge";
import EstimatedReach from "./EstimatedReach";
import { MetricCard } from "./MetricCard";
const insights = [
  {
    title: "Trend Alignment",
    description: "Post matches current sports trend",
    status: "Good",
    color: "#4CD0A2",
    bg: "#283430",
    icon: <Check size={16} className="mr-1" />,
  },
  {
    title: "Caption Strength",
    description: "Add urgency or curiosity to increase CTR",
    status: "Fair",
    color: "#F48845",
    bg: "#3B312A",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-1"
      >
        <path
          d="M12 9V14M12 17.5V17.6M4.9 19.1L19.1 4.9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Hashtag Relevance",
    description: "Hashtags align with popular topics",
    status: "Good",
    color: "#4CD0A2",
    bg: "#283430",
    icon: <Check size={16} className="mr-1" />,
  },
  {
    title: "Optimal Post Length",
    description: "Video may be too long (keep under 30 sec)",
    status: "Poor",
    color: "#F54444",
    bg: "#3C2A2A",
    icon: <X size={16} className="mr-1" />,
  },
  {
    title: "Visual Quality",
    description: "High-resolution media detected",
    status: "Good",
    color: "#4CD0A2",
    bg: "#283430",
    icon: <Check size={16} className="mr-1" />,
  },
];
const ViralityScoreAnalytics = () => {
  const chartRef = useRef(null);
  const interactionsData = [
    { value: 15 },
    { value: 18 },
    { value: 12 },
    { value: 8 },
    { value: 10 },
    { value: 15 },
    { value: 20 },
  ];

  const clicksData = [
    { value: 8 },
    { value: 10 },
    { value: 12 },
    { value: 15 },
    { value: 18 },
    { value: 20 },
    { value: 25 },
  ];

  const viewsData = [
    { value: 300 },
    { value: 320 },
    { value: 280 },
    { value: 250 },
    { value: 270 },
    { value: 310 },
    { value: 290 },
  ];

  const [metrics, setMetrics] = useState({
    interactions: {
      value: 18000,
      changePercentage: 4.2,
      subtext: "+12% Week-over-Week",
      data: interactionsData,
      isPositive: false,
    },
    clicks: {
      value: 10000,
      changePercentage: 1.3,
      subtext: "10% Click Rate",
      data: clicksData,
      isPositive: true,
    },
    views: {
      value: 340000,
      changePercentage: 1.3,
      subtext: "Stable Compared to before",
      data: viewsData,
      isPositive: false,
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        interactions: {
          ...prev.interactions,
          value: Math.floor(
            prev.interactions.value * (0.98 + Math.random() * 0.04)
          ),
          changePercentage: +(4 + Math.random() * 0.5).toFixed(1),
        },
        clicks: {
          ...prev.clicks,
          value: Math.floor(prev.clicks.value * (0.98 + Math.random() * 0.04)),
          changePercentage: +(1.2 + Math.random() * 0.3).toFixed(1),
        },
        views: {
          ...prev.views,
          value: Math.floor(prev.views.value * (0.99 + Math.random() * 0.02)),
          changePercentage: +(1.2 + Math.random() * 0.3).toFixed(1),
        },
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (chartRef.current) {
      const canvas = chartRef.current;
      const ctx = canvas.getContext("2d");

      // Set canvas dimensions
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      // Chart data
      const dates = [
        "APR 09",
        "APR 10",
        "APR 11",
        "APR 12",
        "APR 13",
        "APR 14",
        "APR 15",
        "APR 16",
        "APR 17",
      ];
      const visitsData = [1, 14, 8, 8, 7, 2, 10, 5, 0];
      const clicksButtonsData = [0, 10, 4, 4, 5, 3, 8, 10, 2];
      const clicksImagesData = [0, 5, 17, 10, 8, 4, 5, 13, 7];

      // Chart configuration
      const padding = 40;
      const chartWidth = canvas.width - padding * 2;
      const chartHeight = canvas.height - padding * 2;
      const maxValue = 25;

      // Draw grid lines
      ctx.beginPath();
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 1;

      // Horizontal grid lines
      for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);

        // Add y-axis labels
        ctx.fillStyle = "#999";
        ctx.font = "12px Arial";
        ctx.textAlign = "right";
        ctx.fillText(`${25 - i * 5}`, padding - 10, y + 4);
      }

      // Draw x-axis labels
      dates.forEach((date, i) => {
        const x = padding + (chartWidth / (dates.length - 1)) * i;
        ctx.fillStyle = "#999";
        ctx.font = "10px Arial";
        ctx.textAlign = "center";
        ctx.fillText(date, x, canvas.height - 10);
      });

      ctx.stroke();

      // Function to draw a line
      const drawLine = (data, color) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]); // Dashed line

        for (let i = 0; i < data.length - 1; i++) {
          const x0 = padding + (chartWidth / (data.length - 1)) * i;
          const y0 = padding + chartHeight - (data[i] / maxValue) * chartHeight;
          const x1 = padding + (chartWidth / (data.length - 1)) * (i + 1);
          const y1 =
            padding + chartHeight - (data[i + 1] / maxValue) * chartHeight;

          const cx = (x0 + x1) / 2;
          const cy = (y0 + y1) / 2;

          if (i === 0) {
            ctx.moveTo(x0, y0);
          }

          ctx.quadraticCurveTo(x0, y0, cx, cy); // Smooth curve
        }

        ctx.stroke();
        ctx.setLineDash([]); // Reset dash for next drawing
      };

      // Draw the lines
      drawLine(visitsData, "#3570BC");
      drawLine(clicksButtonsData, "#4CD0A2");
      drawLine(clicksImagesData, "#F54444");
    }
  }, []);

  return (
    <div className="border border-[#FFFFFF30] rounded-[20px]  mt-5">
      {/* Header */}
      <div className="flex items-center rounded-t-[20px] gap-2 bg-[#232323] border-b border-[#FFFFFF30] p-5">
        <svg
          width="32"
          height="33"
          viewBox="0 0 32 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M23.667 5.92061C23.667 5.33795 23.311 4.81395 22.7683 4.59928C22.2257 4.38461 21.607 4.52328 21.2083 4.94861C18.6723 7.65395 15.1297 9.18861 11.423 9.18861C9.81366 9.18861 8.12699 9.18861 6.66699 9.18861C5.34033 9.18861 4.06966 9.71528 3.13099 10.6526C2.19366 11.5913 1.66699 12.8619 1.66699 14.1886V15.5219C1.66699 16.8486 2.19366 18.1193 3.13099 19.0579C4.06966 19.9953 5.34033 20.5219 6.66699 20.5219H11.423C15.1297 20.5219 18.6723 22.0566 21.2083 24.7619C21.607 25.1873 22.2257 25.3259 22.7683 25.1113C23.311 24.8966 23.667 24.3726 23.667 23.7899C23.667 20.3233 23.667 9.38728 23.667 5.92061Z"
            fill="#3570BC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M29.334 13.8555H27.334C26.782 13.8555 26.334 14.3035 26.334 14.8555C26.334 15.4075 26.782 15.8555 27.334 15.8555H29.334C29.886 15.8555 30.334 15.4075 30.334 14.8555C30.334 14.3035 29.886 13.8555 29.334 13.8555Z"
            fill="#3570BC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M25.5859 20.1886L27.0006 21.6033C27.3913 21.9926 28.0246 21.9926 28.4153 21.6033C28.8046 21.2126 28.8046 20.5793 28.4153 20.1886L27.0006 18.7739C26.6099 18.3846 25.9766 18.3846 25.5859 18.7739C25.1966 19.1646 25.1966 19.7979 25.5859 20.1886Z"
            fill="#3570BC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M27.0006 10.9368L28.4153 9.5221C28.8046 9.13143 28.8046 8.4981 28.4153 8.10743C28.0246 7.7181 27.3913 7.7181 27.0006 8.10743L25.5859 9.5221C25.1966 9.91276 25.1966 10.5461 25.5859 10.9368C25.9766 11.3261 26.6099 11.3261 27.0006 10.9368Z"
            fill="#3570BC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.92871 21.8125L6.83004 27.2578C7.01538 28.3845 7.99004 29.2112 9.13138 29.2112H12.2554C12.8327 29.2112 13.37 28.9125 13.6727 28.4205C13.9767 27.9298 14.0047 27.3152 13.746 26.7992L12.962 25.2298C12.95 25.2072 12.942 25.1845 12.9354 25.1605L12.1247 21.8752C11.8914 21.8618 6.17271 21.8405 5.92871 21.8125Z"
            fill="#3570BC"
          />
        </svg>

        <h1 className="text-lg font-medium">Results for AI Virality Score</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 bg-[#232323] ">
        {/* Left Column - Score and Metrics */}
        <div className="space-y-6 px-5 py-8 bg-[#232323] rounded-bl-[20px] border-r border-[#FFFFFF30]">
          {/* Score Gauge */}
          <div className="flex flex-col items-center border-b border-[#FFFFFF30] pb-3">
            <CircularGauge value={7.4} />
            <h2 className="text-xl font-semibold mt-8">Summary</h2>
            <p className="text-center text-md text-white/76 mt-1">
              Good chance of engagement due to strong caption, trending topic,
              and ideal timing.
            </p>
          </div>

          {/* Metrics */}
          <div className="">
            {insights.map((item, idx) => (
              <div
                key={idx}
                className={`py-6 ${
                  idx !== insights.length - 1
                    ? "border-b border-[#FFFFFF30]"
                    : ""
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                  <div
                    style={{ color: item.color, backgroundColor: item.bg }}
                    className={`flex items-center rounded-[48px] py-2 px-3`}
                  >
                    {item.icon}
                    <span className="text-sm">{item.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Columns - Charts and Stats */}
        <div className="md:col-span-2 p-6 ">
          {/* Overview Chart */}
          <div className="bg-[#232323] p-4 border border-[#FFFFFF30] rounded-[20px]">
            <div className="mb-4 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
              <div>
                <h2 className="text-xl font-medium text-white">Overview</h2>
                <p className="text-sm text-white/50">
                  Overview of smartlink engagement
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 flex-wrap">
                <div className="rounded-[12px] p-[1px] bg-[linear-gradient(91.71deg,_rgba(53,112,188,0.06)_-40.38%,_rgba(53,112,188,0.59)_55.05%,_rgba(53,112,188,0.06)_115.46%)]">
                  <div className="bg-[#212831] rounded-[12px] p-3 min-w-[115px]">
                    <div className="flex items-center gap-2">
                      <ArrowUp className="text-white" size={22} />
                      <span className="text-2xl font-bold">15</span>
                    </div>
                    <div className="text-gray-400 text-sm mt-1">Visits</div>
                  </div>
                </div>

                <div className="rounded-[12px] p-[1px] bg-[linear-gradient(91.71deg,_rgba(76,208,162,0.06)_-40.38%,_rgba(76,208,162,0.59)_55.05%,_rgba(76,208,162,0.06)_115.46%)]">
                  <div className="bg-[#232D29] rounded-[12px] p-3 min-w-[115px]">
                    <div className="flex items-center gap-2">
                      <ArrowUp className="text-white" size={22} />
                      <span className="text-2xl font-bold">15</span>
                    </div>
                    <div className="text-gray-400 text-sm mt-1">
                      Clicks Buttons
                    </div>
                  </div>
                </div>

                <div className="p-[1px] rounded-[12px] bg-[linear-gradient(91.71deg,_rgba(245,68,68,0.06)_-40.38%,_rgba(245,68,68,0.59)_55.05%,_rgba(245,68,68,0.06)_115.46%)]">
                  <div className="bg-[#342323] rounded-[12px] p-3 min-w-[115px]">
                    <div className="flex items-center gap-2">
                      <ArrowUp className="text-white" size={22} />
                      <span className="text-2xl font-bold">04</span>
                    </div>
                    <div className="text-gray-400 text-sm mt-1">
                      Clicks Images
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-72 mb-6">
              <canvas ref={chartRef} className="w-full h-full"></canvas>
            </div>
          </div>

          <EstimatedReach
            data={[
              { week: "Week 1", users: 18000 },
              { week: "Week 2", users: 32000 },
              { week: "Week 3", users: 23432 },
              { week: "Week 4", users: 42000 },
              { week: "Week 5", users: 10000 },
            ]}
            minReach={12}
            maxReach={28}
            highlightedWeek="Week 3"
            highlightedValue={23432}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <MetricCard
              title="INTERACTIONS"
              value={metrics.interactions.value}
              changePercentage={metrics.interactions.changePercentage}
              subtext={metrics.interactions.subtext}
              data={metrics.interactions.data}
              isPositive={metrics.interactions.isPositive}
            />

            <MetricCard
              title="CLICKS"
              value={metrics.clicks.value}
              changePercentage={metrics.clicks.changePercentage}
              subtext={metrics.clicks.subtext}
              data={metrics.clicks.data}
              isPositive={metrics.clicks.isPositive}
            />

            <MetricCard
              title="VIEWS"
              value={metrics.views.value}
              changePercentage={metrics.views.changePercentage}
              subtext={metrics.views.subtext}
              data={metrics.views.data}
              isPositive={metrics.views.isPositive}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViralityScoreAnalytics;
