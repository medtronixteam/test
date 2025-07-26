"use client";
import { useState, useEffect } from "react";
import Layout from "@/components/dashboard/Layout";
import { MetricCard } from "@/components/dashboard/virality/MetricCard";
import GrowthLineChart from "@/components/adminPanel/globalmetric/GrowthLineChart";
import ProfitMarginChart from "@/components/adminPanel/globalmetric/ProfitMarginChart";
import AnalysisDonutChart from "@/components/adminPanel/globalmetric/AnalysisDonutChart";
import OperatingCostsChart from "@/components/adminPanel/globalmetric/OperatingCostsChart";
import OperatingCostsLineChart from "@/components/adminPanel/globalmetric/OperatingCostsLineChart";
import AnalysisCircularProgress from "@/components/adminPanel/globalmetric/AnalysisCircularProgress";
const dummyDashboardData = {
  operatingCosts: {
    data: [
      { month: "Jan", value: 10000, category: "Infra" },
      { month: "Feb", value: 15000, category: "Marketing" },
      { month: "Mar", value: 20000, category: "Staffing" },
      { month: "Apr", value: 17000, category: "Misc" },
      { month: "May", value: 19000, category: "Tools" },
    ],
    categories: ["Infra", "Marketing", "Staffing", "Misc", "Tools"],
  },
  profitMargin: {
    data: [
      { month: "Jan", blue: 45.2, purple: 43.0 },
      { month: "Feb", blue: 44.5, purple: 42.7 },
      { month: "Mar", blue: 46.0, purple: 44.3, highlight: true },
      { month: "Apr", blue: 44.8, purple: 43.1 },
      { month: "May", blue: 45.5, purple: 43.6 },
    ],
  },
  operatingCostsBar: {
    data: [
      { month: "Jan", value: 3000 },
      { month: "Feb", value: 4000 },
      { month: "Mar", value: 3500, highlight: true },
      { month: "Apr", value: 2000 },
      { month: "May", value: 2500 },
    ],
  },
  analysisDonut: {
    data: [
      { name: "A", value: 20, color: "#FF6384", label: "Organic" },
      { name: "B", value: 30, color: "#36A2EB", label: "Paid" },
      { name: "C", value: 25, color: "#FFCE56", label: "Referral" },
      { name: "D", value: 25, color: "#4BC0C0", label: "Other" },
    ],
  },
  totalIncome: {
    value: 75000,
    tags: [
      { name: "Product", value: 60, color: "#66BB6A" },
      { name: "Services", value: 40, color: "#FFA726" },
    ],
  },
  userGrowth: {
    data: [
      { month: "Jan", value: 100 },
      { month: "Feb", value: 300 },
      { month: "Mar", value: 250 },
      { month: "Apr", value: 400 },
      { month: "May", value: 350, highlight: true },
    ],
  },
  metrics: [
    {
      title: "NET PROMOTER SCORE",
      value: 75,
      change: 3.5,
      trend: [
        { value: 60 },
        { value: 65 },
        { value: 70 },
        { value: 75 },
        { value: 78 },
      ],
    },
    {
      title: "TICKET RESOLUTION TIME",
      value: 180,
      change: -2.1,
      trend: [
        { value: 200 },
        { value: 195 },
        { value: 190 },
        { value: 185 },
        { value: 180 },
      ],
    },
  ],
};

const GlobalMetricPage = () => {
  const [timeframe, setTimeframe] = useState("Monthly");
  const [userGrowthTimeframe, setUserGrowthTimeframe] = useState("Annually");
  const [dashboardData, setDashboardData] = useState(dummyDashboardData);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setDashboardData({
          operatingCosts: {
            data: [
              { month: "Nov", value: 18000, category: "Misc" },
              { month: "Dec", value: 22000, category: "Tools" },
              { month: "Jan", value: 15000, category: "Marketing" },
              { month: "Feb", value: 12000, category: "Infra" },
              { month: "Mar", value: 23432, category: "Staffing" },
              { month: "Apr", value: 19000, category: "Misc" },
            ],
            categories: ["Misc", "Tools", "Marketing", "Infra", "Staffing"],
          },
          profitMargin: {
            data: [
              { month: "Nov", blue: 42.8, purple: 43.5 },
              { month: "Dec", blue: 43.1, purple: 43.2 },
              { month: "Jan", blue: 42.9, purple: 43.0 },
              { month: "Feb", blue: 42.5, purple: 43.2 },
              { month: "Mar", blue: 43.0, purple: 42.8, highlight: true },
              { month: "Apr", blue: 42.7, purple: 43.1 },
              { month: "May", blue: 42.5, purple: 43.3 },
              { month: "June", blue: 42.3, purple: 42.9 },
            ],
          },
          operatingCostsBar: {
            data: [
              { month: "Nov", value: 2000 },
              { month: "Dec", value: 1000 },
              { month: "Jan", value: 2100 },
              { month: "Feb", value: 1500 },
              { month: "Mar", value: 3500, highlight: true },
              { month: "Apr", value: 1000 },
              { month: "May", value: 2000 },
            ],
          },
          analysisDonut: {
            data: [
              {
                name: "Segment 1",
                value: 11,
                color: "#6E97CD",
                label: "Organic",
              },
              {
                name: "Segment 2",
                value: 24,
                color: "#AD70FB",
                label: "Organic",
              },
              {
                name: "Segment 3",
                value: 39,
                color: "#2C5892",
                label: "Organic",
              },
              {
                name: "Segment 4",
                value: 26,
                color: "#436FA9",
                label: "Organic",
              },
            ],
          },
          totalIncome: {
            value: 54000,
            tags: [
              { name: "Tag here", value: 65, color: "#7B68EE" },
              { name: "Tag here", value: 35, color: "#4FC3F7" },
            ],
          },
          userGrowth: {
            data: [
              { month: "Nov", value: 500 },
              { month: "Dec", value: 300 },
              { month: "Jan", value: 700 },
              { month: "Feb", value: 900 },
              { month: "Mar", value: 800 },
              { month: "Apr", value: 600, highlight: true },
              { month: "May", value: 400 },
              { month: "Jun", value: 500 },
              { month: "Jul", value: 700 },
              { month: "Aug", value: 900 },
            ],
          },
          metrics: [
            {
              title: "FIRST CONTACT RESOLUTION RATE",
              value: 200,
              change: 4.2,
              trend: [
                { value: 40 },
                { value: 35 },
                { value: 50 },
                { value: 45 },
                { value: 60 },
                { value: 55 },
                { value: 70 },
              ],
            },
            {
              title: "RESPONSE TIME TO SUPPORT TICKETS",
              value: 200,
              change: 4.2,
              trend: [
                { value: 40 },
                { value: 35 },
                { value: 50 },
                { value: 45 },
                { value: 60 },
                { value: 55 },
                { value: 70 },
              ],
            },
          ],
        });
      }, 500);
    };

    fetchData();
  }, [timeframe, userGrowthTimeframe]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1A1A1A] p-2 border border-gray-700 rounded shadow-lg">
          <p className="text-white text-xs">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const BarTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1A1A1A] p-2 border border-gray-700 rounded shadow-lg">
          <p className="text-white text-xs">{`${label}`}</p>
          <p className="text-white text-xs">{`$${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="col-span-1 bg-[#FFFFFF05] rounded-[20px] p-4 border border-[#FFFFFF30] backdrop-blur-[111.51px]">
          <OperatingCostsChart
            CustomTooltip={CustomTooltip}
            dashboardData={dashboardData}
            timeframe={timeframe}
          />
        </div>
        <div className="md:col-span-2 bg-[#FFFFFF05] rounded-[20px] p-4 border border-[#FFFFFF30] backdrop-blur-[111.51px]">
          <ProfitMarginChart
            CustomTooltip={CustomTooltip}
            dashboardData={dashboardData}
          />
        </div>
        <div className="col-span-1 bg-[#FFFFFF05] rounded-[20px] p-4 border border-[#FFFFFF30] backdrop-blur-[111.51px]">
          <OperatingCostsLineChart
            BarTooltip={BarTooltip}
            dashboardData={dashboardData}
            timeframe={timeframe}
          />
        </div>
        <div className="col-span-1 bg-[#FFFFFF05] rounded-[20px] p-4 border border-[#FFFFFF30] backdrop-blur-[111.51px]">
          <AnalysisDonutChart dashboardData={dashboardData} />
        </div>
        <div className="col-span-1 bg-[#FFFFFF05] rounded-[20px] p-4 border border-[#FFFFFF30] backdrop-blur-[111.51px]">
          <AnalysisCircularProgress
            value={dashboardData.totalIncome.value}
            total={100000}
            label="Total income"
            tags={dashboardData.totalIncome.tags}
          />
        </div>
        <div className="md:col-span-2 bg-[#FFFFFF05] rounded-[20px] p-4 border border-[#FFFFFF30] backdrop-blur-[111.51px]">
          <GrowthLineChart
            userGrowthTimeframe={userGrowthTimeframe}
            setUserGrowthTimeframe={setUserGrowthTimeframe}
            CustomTooltip={CustomTooltip}
            dashboardData={dashboardData}
          />
        </div>
        <div className="col-span-1 space-y-4">
          <MetricCard
            title={dashboardData?.metrics[0].title}
            value={dashboardData?.metrics[0].value}
            changePercentage={dashboardData.metrics[0].change}
            subtext="Compared to last week"
            data={dashboardData.metrics[0].trend}
            isPositive={dashboardData.metrics[0].change >= 0}
          />

          <MetricCard
            title={dashboardData.metrics[1].title}
            value={dashboardData.metrics[1].value}
            changePercentage={dashboardData.metrics[1].change}
            subtext="Compared to last week"
            data={dashboardData.metrics[1].trend}
            isPositive={dashboardData.metrics[1].change >= 0}
          />
        </div>
      </div>
    </Layout>
  );
};

export default GlobalMetricPage;
