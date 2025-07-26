"use client";

export const CircularGauge = ({
  value,
  label = "Medium",
  size = 160,
  strokeWidth = 10,
  startColor = "#F48E45",
  endColor = "#F5C644",
  backgroundColor = "#3F3E3D",
}) => {
  // Calculate the percentage (0-100) from the value (0-10)
  const percentage = Math.min(Math.max(value, 0), 10) * 10;

  // Calculate the circumference of the circle
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  // Calculate the dash offset based on the percentage
  const dashOffset = circumference - (percentage / 100) * circumference;

  const gradientId = `gauge-gradient-${Math.random()
    .toString(36)
    .substring(2, 9)}`;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Background arc */}
        <path
          d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Colored arc */}
        <path
          d="M 50,50 m 0,-45 a 45,45 0 1 1 0,90 a 45,45 0 1 1 0,-90"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          fill="none"
        />
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={startColor} />
            <stop offset="100%" stopColor={endColor} />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-bold">{value.toFixed(1)}</span>
        {label && <span className="text-sm text-gray-400">{label}</span>}
      </div>
    </div>
  );
};
