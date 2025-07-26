import React from "react";

const AnalysisCircularProgress = ({ value, total, label, tags }) => {
  const percentage = (value / total) * 100;
  const formattedValue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-white font-semibold">Analysis</h2>
      </div>
      <div className="h-56">
        <div className="relative flex flex-col items-center justify-center h-full">
          <div className="relative w-56 h-56">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#333"
                strokeWidth="10"
                strokeDasharray="283"
                strokeDashoffset="0"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#3570BC"
                strokeWidth="10"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * percentage) / 100}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <div className="text-sm ">Total income</div>
              <div className="text-xl font-bold">{formattedValue}</div>
            </div>
          </div>
          <div className="flex gap-6 mt-6">
            {tags.map((tag, index) => (
              <div key={index} className="flex items-center ">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: tag.color }}
                ></div>
                <span className="text-white text-sm mr-3">{tag.name}</span>
                <span className="text-white/60 text-sm">{tag.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisCircularProgress;
