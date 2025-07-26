"use client";

import { useEffect, useRef } from "react";
import { ArrowUp, ArrowUpRight, ExternalLink } from "lucide-react";
import { getPlatformIcon } from "@/utils/getPlatformIcon";

const SmartlinkAnalytics = () => {
  const chartRef = useRef(null);

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
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-medium text-white">Overview</h2>
          <p className="text-sm text-white/50">
            Overview of smartlink engagement
          </p>
        </div>

        <div className="flex gap-2">
          <div className="rounded-[12px] p-[1px] bg-[linear-gradient(91.71deg,_rgba(53,112,188,0.06)_-40.38%,_rgba(53,112,188,0.59)_55.05%,_rgba(53,112,188,0.06)_115.46%)]">
            <div className="bg-[#212831] rounded-[10px] p-3 min-w-[115px]">
              <div className="flex items-center gap-2">
                <ArrowUp className="text-white" size={22} />
                <span className="text-2xl font-bold">15</span>
              </div>
              <div className="text-gray-400 text-sm mt-1">Visits</div>
            </div>
          </div>
          <div className="rounded-[12px] p-[1px] bg-[linear-gradient(91.71deg,_rgba(76,208,162,0.06)_-40.38%,_rgba(76,208,162,0.59)_55.05%,_rgba(76,208,162,0.06)_115.46%)]">
            <div className="bg-[#232D29] rounded-lg p-3  min-w-[115px]">
              <div className="flex items-center gap-2">
                <ArrowUp className="text-white" size={22} />
                <span className="text-2xl font-bold">15</span>
              </div>
              <div className="text-gray-400 text-sm mt-1">Clicks Buttons</div>
            </div>
          </div>
          <div className="p-[1px] rounded-[12px] bg-[linear-gradient(91.71deg,_rgba(245,68,68,0.06)_-40.38%,_rgba(245,68,68,0.59)_55.05%,_rgba(245,68,68,0.06)_115.46%)]">
            <div className="bg-[#342323] rounded-lg p-3  min-w-[115px]">
              <div className="flex items-center gap-2">
                <ArrowUp className="text-white" size={22} />
                <span className="text-2xl font-bold">04</span>
              </div>
              <div className="text-gray-400 text-sm mt-1">Clicks Images</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72 mb-6">
        <canvas ref={chartRef} className="w-full h-full"></canvas>
      </div>

      {/* Buttons List */}
      <div className="border border-[#2C2C2C] rounded-[8px] mt-4 bg-[#1F1F1F]">
        <div className="grid grid-cols-7 bg-[#282828] p-3 rounded-t-lg py-5">
          <div className="text-white font-medium col-span-3">
            List of buttons
          </div>
          <div className="text-white/80 font-medium">Status</div>
          <div className="text-white/80 font-medium col-span-2">
            Organic Clicks
          </div>
          <div className="text-white/80 font-medium">CTR%</div>
        </div>

        <div className="border-t border-[#2C2C2C]">
          {[
            { icon: "website", name: "Visit our website" },
            {
              icon: "Facebook",
              name: "Follow us on Facebook",
            },
            {
              icon: "Instagram",
              name: "Follow us on Instagram",
            },
            { icon: "Tiktok", name: "Follow us on Tiktok" },
            {
              icon: "Youtube",
              name: "Visit our Youtube channel",
            },
            { icon: "email", name: "Send us an email" },
          ].map((button, index) => (
            <div
              key={index}
              className="grid grid-cols-7 p-3 border-b border-[#2C2C2C]"
            >
              <div className="flex items-center gap-2 col-span-3 border border-[#434343] rounded-full w-[fit-content] px-3 py-2.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white">
                  <img
                    src={getPlatformIcon(button?.icon)}
                    alt={button.icon}
                    className="w-6 h-6"
                  />
                </div>
                <span>{button.name}</span>

                <ArrowUpRight size={20} />
              </div>
              <div className="text-[#4CD0A2] flex items-center">Active</div>
              <div className="flex items-center text-white/80 col-span-2">
                03
              </div>
              <div className="flex items-center text-white/80">23.08</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartlinkAnalytics;
