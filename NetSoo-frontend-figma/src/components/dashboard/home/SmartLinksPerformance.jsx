"use client";

import { useEffect, useRef } from "react";
import { getPlatformIcon } from "@/utils/getPlatformIcon";
import Link from "next/link";

const SmartLinksPerformance = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const canvas = chartRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

        const dates = [
      "Mon", "Tue", "Wed", "Thu",
      "Fri", "Sat", "Sun", 
    ];
      const visitsData = [1, 14, 8, 8, 7, 2, 10, 5, 0];
      const clicksButtonsData = [0, 10, 4, 4, 5, 3, 8, 10, 2];
      const clicksImagesData = [0, 5, 17, 10, 8, 4, 5, 13, 7];

      const padding = 30;
      const chartWidth = canvas.width - padding * 2;
      const chartHeight = canvas.height - padding * 2;
      const maxValue = 25;

      ctx.beginPath();
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 1;

      for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);

        ctx.fillStyle = "#999";
        ctx.font = "12px Arial";
        ctx.textAlign = "right";
        ctx.fillText(`${25 - i * 5}`, padding - 10, y + 4);
      }

      dates.forEach((date, i) => {
        const x = padding + (chartWidth / (dates.length - 1)) * i;
        ctx.fillStyle = "#999";
        ctx.font = "10px Arial";
        ctx.textAlign = "center";
        ctx.fillText(date, x, canvas.height - 10);
      });

      ctx.stroke();

      const drawLine = (data, color) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);

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

          ctx.quadraticCurveTo(x0, y0, cx, cy);
        }

        ctx.stroke();
        ctx.setLineDash([]);
      };

      drawLine(visitsData, "#3570BC");
      drawLine(clicksButtonsData, "#4CD0A2");
      drawLine(clicksImagesData, "#F54444");
    }
  }, []);

  return (
    <div className="border border-[#FFFFFF30] rounded-[20px]  bg-[#FFFFFF05]   flex gap-3 justify-between flex-col md:flex-row">
      <div className="w-full p-5">
        <div className="mb-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-white font-semibold text-lg mb-2">
              SmartLinks performance
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-sm bg-[#F54444]"></div>
                <p className="text-[#FFFFFF99] text-sm">Clicks Images</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-sm bg-[#4CD0A2]"></div>
                <p className="text-[#FFFFFF99] text-sm">Clicks Buttons</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-sm bg-[#3570BC]"></div>
                <p className="text-[#FFFFFF99] text-sm">Visits</p>
              </div>
            </div>
          </div>
          <div>
            <Link href={"/dashboard/smartlinks"}>
              <button className=" cursor-pointer text-[#FFFFFFCC] text-sm border border-[#FFFFFF30] rounded-[8px] px-4 py-3">
                Create new SmartLink
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full h-[300px] md:h-48">
          <canvas ref={chartRef} className="w-full h-full block"></canvas>
        </div>
      </div>

      <div className="border-l border-[#FFFFFF30] bg-[#FFFFFF05]">
        <div className="space-y-4 p-5">
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
              className="flex justify-between items-center gap-2"
            >
              <div className="flex items-center gap-2 ">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white">
                  <img
                    src={getPlatformIcon(button?.icon)}
                    alt={button.icon}
                    className="w-6 h-6"
                  />
                </div>
                <span className="text-nowrap">{button.name}</span>
              </div>

              <div className=" text-white/80 text-nowrap">03 Clicks</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartLinksPerformance;
