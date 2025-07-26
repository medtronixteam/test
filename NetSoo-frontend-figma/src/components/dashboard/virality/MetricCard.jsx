"use client";

import { ArrowUpLeft, ArrowUpRight, MoveUpLeft, MoveUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

export function MetricCard({
  data,
  title,
  value,
  subtext,
  isRounded,
  changePercentage,
  isPositive = true,
}) {
  const canvasRef = useRef(null);

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // No data case
    if (!data || data.length === 0) return;

    // Find min and max values for scaling
    const values = data.map((d) => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const range = maxValue - minValue || 1;

    // Draw sparkline
    const lineColor = isPositive ? "#4ade80" : "#ef4444";
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1.5;

    // Shadow settings
    ctx.shadowColor = lineColor + "80"; // semi-transparent
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;

    ctx.beginPath();

    // Calculate points
    const step = rect.width / (data.length - 1);
    data.forEach((d, i) => {
      const x = i * step;
      const normalizedValue = (d.value - minValue) / range;
      const y =
        rect.height - normalizedValue * rect.height * 0.8 - rect.height * 0.1;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();
  }, [data, isPositive]);

  return (
    <div
      className={`bg-[#232323] p-5 border border-[#FFFFFF30] flex flex-col w-full ${isRounded ? isRounded : "rounded-[20px]"
        }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="">
          <img src={"/dashboard/wallet.png"} alt="" />
        </div>
        <div className="w-20 h-12">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
      </div>

      <div className="text-white/80 text-xs uppercase tracking-wider mt-2">
        {title}
      </div>

      <div className="flex items-baseline mt-1">
        <span className="text-white text-2xl font-bold mr-2">
          {formatNumber(value)}
        </span>
        <span className="flex items-center gap-1 text-xs">
          <span className="bg-gray-500 text-white rounded-full p-1 w-5 h-5 flex justify-center items-center">
            {changePercentage > 0 ? <ArrowUpRight className="w-5 h-5" /> : <ArrowUpLeft className="w-5 h-5" />}
          </span>
          {Math.abs(changePercentage)}%
        </span>
      </div>
      <div className="text-white/40 text-sm mt-1">{subtext}</div>
    </div>
  );
}
