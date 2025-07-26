import { getPlatformIcon } from "@/utils/getPlatformIcon";
import { Instagram } from "lucide-react";

// Custom circular progress component
const CircularProgress = ({ percentage = 76, color = "#3570BC" }) => {
  const radius = 15;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative h-10 w-10 flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 40 40">
        <circle
          cx="20"
          cy="20"
          r={radius}
          fill="transparent"
          stroke="#393939"
          strokeWidth="4"
        />
        <circle
          cx="20"
          cy="20"
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 20 20)"
        />
      </svg>
      <span className="absolute text-[10px] text-white">{percentage}%</span>
    </div>
  );
};
const StatTables = () => {
  const trafficSources = [
    {
      id: "01",
      name: "Facebook",

      percentage: 76,
      visitors: 3578,
    },
    {
      id: "02",
      name: "Instagram",

      percentage: 76,
      visitors: 3578,
    },
    {
      id: "03",
      name: "Tiktok",

      percentage: 76,
      visitors: 3578,
    },
    {
      id: "04",
      name: "Google",

      percentage: 76,
      visitors: 3578,
    },
    {
      id: "05",
      name: "Twitter",
      percentage: 76,
      visitors: 3578,
    },
  ];

  const countries = [
    {
      id: "01",
      name: "United States",
      flag: (
        <div className="w-6 h-4 relative overflow-hidden border border-gray-700">
          <div className="absolute top-0 left-0 w-1/4 h-1/2 bg-blue-800"></div>
          <div className="absolute top-0 right-0 w-3/4 h-1/2 bg-red-500"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-red-500"></div>
        </div>
      ),
      percentage: 76,
      visitors: 3578,
    },
    {
      id: "02",
      name: "China",
      flag: (
        <div className="w-6 h-4 bg-red-600 relative overflow-hidden border border-gray-700">
          <div className="absolute top-0 left-0 w-1/4 h-1/4 flex">
            <div className="w-1 h-1 bg-yellow-400 absolute top-0 left-1"></div>
            <div className="w-1 h-1 bg-yellow-400 absolute top-1 left-0"></div>
            <div className="w-1 h-1 bg-yellow-400 absolute top-1 left-2"></div>
            <div className="w-1 h-1 bg-yellow-400 absolute top-2 left-1"></div>
          </div>
        </div>
      ),
      percentage: 76,
      visitors: 3578,
    },
    {
      id: "03",
      name: "Chile",
      flag: (
        <div className="w-6 h-4 relative overflow-hidden border border-gray-700">
          <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-blue-800"></div>
          <div className="absolute top-0 right-0 w-2/3 h-1/2 bg-white"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-red-600"></div>
        </div>
      ),
      percentage: 76,
      visitors: 3578,
    },
    {
      id: "04",
      name: "Belgium",
      flag: (
        <div className="w-6 h-4 flex overflow-hidden border border-gray-700">
          <div className="w-1/3 h-full bg-black"></div>
          <div className="w-1/3 h-full bg-yellow-500"></div>
          <div className="w-1/3 h-full bg-red-600"></div>
        </div>
      ),
      percentage: 76,
      visitors: 3578,
    },
    {
      id: "05",
      name: "Brazil",
      flag: (
        <div className="w-6 h-4 bg-green-600 relative overflow-hidden border border-gray-700">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-400 rounded-full"></div>
        </div>
      ),
      percentage: 76,
      visitors: 3578,
    },
  ];
  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Traffic sources */}
        <div className="bg-[#FFFFFF0A] rounded-[20px]">
          <h2 className="text-xl font-semibold p-5 border-b border-[#FFFFFF0F]">
            Traffic sources
          </h2>

          {/* Header Row */}
          <div className="grid grid-cols-12 text-sm text-white/80 p-4 px-6 border-b border-[#FFFFFF0F] bg-[#2D2D2D]">
            <div className="col-span-1"></div>
            <div className="col-span-5">Origen</div>
            <div className="col-span-3">Percent</div>
            <div className="col-span-3">Total visitors</div>
          </div>

          {/* Traffic source rows */}
          {trafficSources.map((source) => (
            <div
              key={source.id}
              className="grid grid-cols-12 items-center text-sm p-4 px-6 border-b border-[#FFFFFF0F] hover:bg-[#FFFFFF10]"
            >
              <div className="col-span-1 text-white/60">{source.id}</div>
              <div className="col-span-5 flex items-center gap-2">
                <img
                  src={getPlatformIcon(source.name)}
                  alt={source.name}
                  className="w-6 h-6"
                />
                <span>{source.name}</span>
              </div>
              <div className="col-span-3">
                <CircularProgress percentage={source.percentage} />
              </div>
              <div className="col-span-3">
                {source.visitors.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Visitors countries */}
        <div className="bg-[#FFFFFF0A] rounded-[20px]">
          <h2 className="text-xl font-semibold p-5 border-b border-[#FFFFFF0F]">
            Visitors countries
          </h2>

          {/* Header Row */}
          <div className="grid grid-cols-12 text-sm text-white/80 p-4 px-6 border-b border-[#FFFFFF0F] bg-[#2D2D2D]">
            <div className="col-span-1"></div>
            <div className="col-span-5">Origen</div>
            <div className="col-span-3">Percent</div>
            <div className="col-span-3">Total visitors</div>
          </div>

          {/* Country rows */}
          {countries.map((country) => (
            <div
              key={country.id}
              className="grid grid-cols-12 items-center text-sm p-4 px-6 border-b border-[#FFFFFF0F]"
            >
              <div className="col-span-1 text-white/60">{country.id}</div>
              <div className="col-span-5 flex items-center gap-2">
                {country.flag}
                <span>{country.name}</span>
              </div>
              <div className="col-span-3">
                <CircularProgress percentage={country.percentage} />
              </div>
              <div className="col-span-3">
                {country.visitors.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatTables;
