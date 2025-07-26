"use client";
import { ArrowUp } from "lucide-react";
import { useEffect, useRef } from "react";
import StatTables from "./StatTables";

const Stats = () => {
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
    }
  }, []);

  return (
    <div className="">
      <div className="bg-[#FFFFFF0A] backdrop-blur-[120.57px] text-white border border-[#FFFFFF30] rounded-[20px] p-6">
        <div className="mb-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-medium text-white">Growth</h2>
            <p className="text-sm text-white/50">Overview of referals growth</p>
          </div>

          <div className="flex gap-2">
            <div className="rounded-[12px] p-[1px] bg-[linear-gradient(91.71deg,_rgba(53,112,188,0.06)_-40.38%,_rgba(53,112,188,0.59)_55.05%,_rgba(53,112,188,0.06)_115.46%)]">
              <div className="bg-[#212831] rounded-[12px] p-3 min-w-[115px]">
                <div className="flex items-center gap-2">
                  <ArrowUp className="text-white" size={22} />
                  <span className="text-2xl font-bold">15</span>
                </div>
                <div className="text-gray-400 text-sm mt-1">Total Clicks</div>
              </div>
            </div>
            <div className="rounded-[12px] p-[1px] bg-[linear-gradient(91.71deg,_rgba(76,208,162,0.06)_-40.38%,_rgba(76,208,162,0.59)_55.05%,_rgba(76,208,162,0.06)_115.46%)]">
              <div className="bg-[#232D29] rounded-[12px] p-3  min-w-[115px]">
                <div className="flex items-center gap-2">
                  <ArrowUp className="text-white" size={22} />
                  <span className="text-2xl font-bold">15</span>
                </div>
                <div className="text-gray-400 text-sm mt-1">Registrations</div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-72 mb-6">
          <canvas ref={chartRef} className="w-full h-full"></canvas>
        </div>
      </div>

      <StatTables />
    </div>
  );
};
export default Stats;
