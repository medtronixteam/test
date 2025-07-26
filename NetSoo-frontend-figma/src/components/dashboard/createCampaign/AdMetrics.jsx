import { metricOptions } from "@/app/(dashboard)/dashboard/campaigns/[ad-name]/page";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

const AdMetrics = ({ selectedMetrics = [] }) => {
  const SmallMetricCard = ({ title, value, change, isPositive, subtitle }) => (
    <div className="bg-[#FFFFFF05] rounded-[8px] p-4 border border-[#FFFFFF30] backdrop-blur-[12px] min-h-[162px]">
      <div className="flex justify-between items-start mb-2">
        <div className="mb-2">
          <img src={"/dashboard/wallet.png"} alt="" />
        </div>
        <div className="w-16 h-8">
          <LineChart
            data={isPositive ? positiveData : negativeData}
            width={72}
            height={32}
          >
            <Line
              type="monotone"
              dataKey="value"
              stroke={isPositive ? "#22C55E" : "#EF4444"}
              strokeWidth={1.5}
              dot={false}
              isAnimationActive={false}
              style={{
                filter: isPositive
                  ? "drop-shadow(0 0 3px rgba(16, 185, 129, 0.6))"
                  : "drop-shadow(0 0 3px rgba(239, 68, 68, 0.6))",
              }}
            />
          </LineChart>
        </div>
      </div>
      <div className="text-white/80 text-sm uppercase mb-2 font-semibold">
        {title}
      </div>
      <div className="flex items-baseline">
        <span className="text-white text-2xl font-bold mr-2">{value}</span>
        <span className={`text-xs text-white flex gap-1 items-center`}>
          <span className="w-[16px] h-[16px] flex justify-center items-center bg-[#FFFFFF1A] rounded-full">
            <svg
              width="8"
              height="8"
              viewBox="0 0 5 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.9684 2.01716L3.8074 2.17816C2.94589 3.03967 2.0843 3.90127 1.22262 4.76294C1.04831 4.93726 0.842347 4.97543 0.636639 4.88024C0.438466 4.78706 0.32971 4.61651 0.358595 4.4103C0.384546 4.26131 0.454837 4.12362 0.560283 4.01521C1.39341 3.16701 2.23734 2.32962 3.078 1.48895L3.23725 1.32971C3.18586 1.32093 3.13405 1.31489 3.08202 1.31163C2.74495 1.31012 2.40763 1.31338 2.07082 1.30911C1.80407 1.3061 1.61997 1.1225 1.61645 0.867308C1.61293 0.589013 1.77996 0.402394 2.05901 0.400635C2.83429 0.395612 3.60914 0.395026 4.38358 0.398877C4.69679 0.400635 4.87311 0.569923 4.87889 0.879615C4.89312 1.64836 4.90158 2.41719 4.90426 3.1861C4.90526 3.46791 4.72191 3.63369 4.44185 3.63143C4.17762 3.62891 4.00381 3.45912 3.99578 3.18535C3.98724 2.86034 3.98648 2.53507 3.98171 2.20981C3.98071 2.15857 3.97418 2.10834 3.9684 2.01716Z"
                fill="white"
              />
            </svg>
          </span>
          {change}
        </span>
      </div>
      {subtitle && <p className="text-white/40 text-sm mt-1">{subtitle}</p>}
    </div>
  );
  console.log("selectedMetrics", selectedMetrics);
  const ChartMetricCard = ({ title, value, data, color }) => (
    <div className="bg-[#FFFFFF05] rounded-[8px] p-4 border border-[#FFFFFF30] ">
      <div className="mb-3">
        <div className="text-white/60 text-sm">{title}</div>
        <div className="flex items-center mt-1">
          {title.includes("likes") ? (
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2665_26926)">
                <path
                  d="M4.76471 8.18162V15.6794C4.76471 15.9279 4.66555 16.1663 4.48904 16.3421C4.31254 16.5178 4.07314 16.6166 3.82353 16.6166H1.94118C1.69156 16.6166 1.45217 16.5178 1.27566 16.3421C1.09916 16.1663 1 15.9279 1 15.6794V9.11884C1 8.87027 1.09916 8.63189 1.27566 8.45612C1.45217 8.28036 1.69156 8.18162 1.94118 8.18162H4.76471ZM4.76471 8.18162C5.76317 8.18162 6.72074 7.78665 7.42676 7.0836C8.13277 6.38055 8.52941 5.42701 8.52941 4.43275V3.49553C8.52941 2.9984 8.72773 2.52163 9.08074 2.1701C9.43375 1.81858 9.91253 1.62109 10.4118 1.62109C10.911 1.62109 11.3898 1.81858 11.7428 2.1701C12.0958 2.52163 12.2941 2.9984 12.2941 3.49553V8.18162H15.1176C15.6169 8.18162 16.0957 8.3791 16.4487 8.73063C16.8017 9.08215 17 9.55892 17 10.0561L16.0588 14.7421C15.9235 15.3171 15.6667 15.8108 15.3272 16.1489C14.9877 16.4869 14.5838 16.6511 14.1765 16.6166H7.58824C6.83939 16.6166 6.12121 16.3204 5.5917 15.7931C5.06218 15.2658 4.76471 14.5506 4.76471 13.8049"
                  stroke="white"
                  stroke-width="1.5"
                />
              </g>
              <defs>
                <clipPath id="clip0_2665_26926">
                  <rect
                    width="18"
                    height="18"
                    fill="white"
                    transform="translate(0 0.121094)"
                  />
                </clipPath>
              </defs>
            </svg>
          ) : title === "Comments" ? (
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2665_26947)">
                <path
                  d="M2.25 15.6214L3.225 12.6964C1.482 10.1186 2.1555 6.79237 4.8 4.91587C7.4445 3.04012 11.2425 3.19387 13.6838 5.27587C16.125 7.35862 16.455 10.7254 14.4555 13.1516C12.456 15.5779 8.74425 16.3129 5.775 14.8714L2.25 15.6214Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2665_26947">
                  <rect
                    width="18"
                    height="18"
                    fill="white"
                    transform="translate(0 0.621094)"
                  />
                </clipPath>
              </defs>
            </svg>
          ) : title.includes("visits") ? (
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.158 8.40485C16.386 8.72457 16.5 8.88447 16.5 9.1211C16.5 9.35772 16.386 9.51762 16.158 9.83735C15.1334 11.274 12.5169 14.3711 9 14.3711C5.48308 14.3711 2.86657 11.274 1.84203 9.83735C1.61401 9.51762 1.5 9.35772 1.5 9.1211C1.5 8.88447 1.61401 8.72457 1.84203 8.40485C2.86657 6.96818 5.48308 3.87109 9 3.87109C12.5169 3.87109 15.1334 6.96818 16.158 8.40485Z"
                stroke="white"
                stroke-width="1.5"
              />
              <path
                d="M11.25 9.12109C11.25 7.87842 10.2427 6.87109 9 6.87109C7.75732 6.87109 6.75 7.87842 6.75 9.12109C6.75 10.3638 7.75732 11.3711 9 11.3711C10.2427 11.3711 11.25 10.3638 11.25 9.12109Z"
                stroke="white"
                stroke-width="1.5"
              />
            </svg>
          ) : (
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2665_26988)">
                <path
                  d="M9.88896 1.62109V5.36991C4.04458 6.33336 1.87127 11.7317 1.00017 16.6164C0.967279 16.8094 5.7859 11.0288 9.88896 10.9931V14.742L17 8.18152L9.88896 1.62109Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2665_26988">
                  <rect
                    width="18"
                    height="18"
                    fill="white"
                    transform="translate(0 0.121094)"
                  />
                </clipPath>
              </defs>
            </svg>
          )}
          <span className="text-white text-xl font-semibold ml-2">{value}</span>
        </div>
      </div>

      <div className="h-32 mt-4 relative">
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-gray-500 text-xs">
          <span>10k</span>
          <span>5k</span>
          <span>1k</span>
          <span>0</span>
        </div>
        <div className="pl-8 h-full">
          <ResponsiveContainer width={240} height={120}>
            <AreaChart data={data}>
              <CartesianGrid vertical={false} stroke="#2B2B2C" />
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={1.5}
                fill="url(#colorUsers)"
                fillOpacity={1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const blueChartData = Array.from({ length: 20 }, (_, i) => ({
    value: Math.floor(Math.random() * 30) + 10,
  }));

  const purpleChartData = Array.from({ length: 20 }, (_, i) => ({
    value: Math.floor(Math.random() * 30) + 10,
  }));

  const allSmallMetrics = [
    {
      id: "cpc",
      title: "CPC",
      value: "€3,200",
      change: "3.5",
      isPositive: true,
      subtitle: "22 increase from before",
    },
    {
      id: "cpm",
      title: "CPM",
      value: "€8,500",
      change: "3.2",
      isPositive: false,
      subtitle: "22% increase from before",
    },
    {
      id: "roi",
      title: "ROI",
      value: "€8,500",
      change: "3.2",
      isPositive: true,
      subtitle: "22% increase from before",
    },
    {
      id: "cpa",
      title: "CPA",
      value: "€8,500",
      change: "3.2",
      isPositive: false,
      subtitle: "22% increase from before",
    },
    {
      id: "ctr",
      title: "CTR",
      value: "€8,500",
      change: "3.2",
      isPositive: true,
      subtitle: "22% increase from before",
    },
    {
      id: "cpe",
      title: "CPE",
      value: "€8,500",
      change: "3.4%",
      isPositive: true,
      subtitle: "22% increase from before",
    },
    {
      id: "interaction",
      title: "INTERACTIONS",
      value: "18,000",
      change: "4.2%",
      isPositive: true,
      subtitle: "10% more than usual",
    },
    {
      id: "impressions",
      title: "IMPRESSIONS",
      value: "350,000",
      change: "3.1%",
      isPositive: true,
      subtitle: "22% increase from before",
    },
    {
      id: "clicks",
      title: "CLICKS",
      value: "10,000",
      change: "3.5%",
      isPositive: true,
      subtitle: "10% more than usual",
    },
    {
      id: "views",
      title: "VIEWS",
      value: "340,000",
      change: "3.5%",
      isPositive: true,
      subtitle: "22% increase from before",
    },
  ];

  const allChartMetrics = [
    {
      id: "likes",
      title: "No. of likes",
      value: "3,654",
      data: blueChartData,
      color: "#3570BC",
    },
    {
      id: "comments",
      title: "Comments",
      value: "253",
      data: purpleChartData,
      color: "#9747FF",
    },
    {
      id: "total_visits",
      title: "Total visits",
      value: "452",
      data: blueChartData,
      color: "#3570BC",
    },
    {
      id: "shares",
      title: "Shares",
      value: "253",
      data: purpleChartData,
      color: "#9747FF",
    },
  ];

  const selectedSmallMetricIds = metricOptions
    .filter((opt) => selectedMetrics.includes(opt.id) && opt.type === "small")
    .map((opt) => opt.id);

  const selectedChartMetricIds = metricOptions
    .filter((opt) => selectedMetrics.includes(opt.id) && opt.type === "chart")
    .map((opt) => opt.id);

  // Use these to filter the actual metrics
  const visibleSmallMetrics = allSmallMetrics.filter((metric) =>
    selectedSmallMetricIds.includes(metric.id)
  );

  const visibleChartMetrics = allChartMetrics.filter((metric) =>
    selectedChartMetricIds.includes(metric.id)
  );
  const positiveData = [
    { value: 10 },
    { value: 15 },
    { value: 13 },
    { value: 17 },
    { value: 20 },
    { value: 25 },
    { value: 30 },
  ];

  const negativeData = [
    { value: 30 },
    { value: 25 },
    { value: 28 },
    { value: 22 },
    { value: 20 },
    { value: 15 },
    { value: 10 },
  ];

  return (
    <div className="space-y-4 mt-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {visibleSmallMetrics.map((metric) => (
          <SmallMetricCard key={metric.id} {...metric} />
        ))}
        {console.log("visibleSmallMetrics", visibleSmallMetrics.length)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {console.log("visibleChartMetrics", visibleChartMetrics.length)}
        {visibleChartMetrics.map((metric) => (
          <ChartMetricCard key={metric.id} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default AdMetrics;
