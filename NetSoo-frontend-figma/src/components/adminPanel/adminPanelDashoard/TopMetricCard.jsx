"use client";

import { useEffect, useRef } from "react";

export function TopMetricCard({
  title,
  value,
  changePercentage,
  subtext,
  data,
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
    <div className="bg-[#FFFFFF05] p-5 border border-[#FFFFFF30] backdrop-blur-[12px] rounded-[8px] flex flex-col w-full">
      <div className="flex items-start justify-between mb-2">
        <div className="">
          <img src={"/dashboard/wallet.png"} alt="" />
        </div>
        <div>
          <div
            className={`text-sm text-white flex items-center gap-2 bg-[#353535] rounded-full px-2 py-1`}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="7" cy="7" r="7.00391" fill="white" />
              <g clip-path="url(#clip0_2798_39617)">
                <path
                  d="M8.85547 5.14502L5.14128 8.85921"
                  stroke="black"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.5127 5.14502H8.85547V8.48779"
                  stroke="black"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2798_39617">
                  <rect
                    width="8.91406"
                    height="8.91406"
                    fill="white"
                    transform="matrix(-1 0 0 1 11.457 2.54346)"
                  />
                </clipPath>
              </defs>
            </svg>
            {Math.abs(changePercentage)}%
          </div>
        </div>
      </div>

      <div className="text-white/80 text-xs uppercase tracking-wider mt-2">
        {title}
      </div>

      <div className="flex items-center justify-between mt-1">
        <span className="text-white text-4xl  mr-2">{formatNumber(value)}</span>
        <div className="w-40 h-16">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
      </div>

      <div className="text-white/40 text-sm mt-1">{subtext}</div>
    </div>
  );
}
