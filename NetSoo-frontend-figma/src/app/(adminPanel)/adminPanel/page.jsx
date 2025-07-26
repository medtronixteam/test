"use client";

import CustomerSatisfaction from "@/components/adminPanel/adminPanelDashoard/CustomerSatisfaction";
import GrossIncomeTable from "@/components/adminPanel/adminPanelDashoard/GrossIncomeTable";
import ProgressBarCards from "@/components/adminPanel/adminPanelDashoard/ProgressBarCards";
import RecurringRevenueTable from "@/components/adminPanel/adminPanelDashoard/RecurringRevenueTable";
import RetentionTable from "@/components/adminPanel/adminPanelDashoard/RetentionTable";
import { TopMetricCard } from "@/components/adminPanel/adminPanelDashoard/TopMetricCard";
import UserAcquisitionChart from "@/components/adminPanel/adminPanelDashoard/UserAcquisitionChart";
import Layout from "@/components/dashboard/Layout";
import { MetricCard } from "@/components/dashboard/virality/MetricCard";
import { getPlatformIcon } from "@/utils/getPlatformIcon";
import { CalendarIcon, ChevronDown, DownloadIcon } from "lucide-react";
import React, { useState } from "react";
const platforms = [
  "All",
  "Facebook",
  "Instagram",
  "Twitter",
  "LinkedIn",
  "YouTube",
  "TikTok",
  "Snapchat",
  "Meta Ads",
];
const dailyData = [
  { value: 450 },
  { value: 520 },
  { value: 470 },
  { value: 580 },
  { value: 610 },
  { value: 570 },
  { value: 620 },
];

const weeklyData = [
  { value: 6000 },
  { value: 7200 },
  { value: 6900 },
  { value: 7050 },
  { value: 7400 },
  { value: 7300 },
  { value: 7100 },
];

const monthlyData = [
  { value: 28000 },
  { value: 32000 },
  { value: 35000 },
  { value: 37000 },
  { value: 39000 },
  { value: 41000 },
  { value: 40210 },
];
const options = ["This Week", "This Month", "Last Month", "This Year"];

const AdminPanelHome = () => {
  const [selectedNetwork, setSelectedNetwork] = useState("Facebook");
  const [timeFilter, setTimeFilter] = useState("Last 10 days");
  const [open, setOpen] = useState(false);
  const [metrics, setMetrics] = useState({
    interactions: {
      value: 72400,
      changePercentage: 4.2,
      subtext: "Last 7 days",
      data: [
        { value: 15 },
        { value: 18 },
        { value: 12 },
        { value: 8 },
        { value: 10 },
        { value: 15 },
        { value: 20 },
      ],
      isPositive: false,
    },
    clicks: {
      value: 72400,
      changePercentage: 1.3,
      subtext: "likes, shares, comentarios",
      data: [
        { value: 8 },
        { value: 10 },
        { value: 12 },
        { value: 15 },
        { value: 18 },
        { value: 20 },
        { value: 25 },
      ],
      isPositive: true,
    },
    views: {
      value: 485000,
      changePercentage: 1.3,
      subtext: "Last 7 days",
      data: [
        { value: 300 },
        { value: 320 },
        { value: 280 },
        { value: 250 },
        { value: 270 },
        { value: 310 },
        { value: 290 },
      ],
      isPositive: false,
    },
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TopMetricCard
          title="Daily Users"
          value={1560}
          changePercentage={+4.2}
          subtext="From all platforms"
          data={dailyData}
          isPositive={true}
        />
        <TopMetricCard
          title="Weekly Users"
          value={10230}
          changePercentage={-2.8}
          subtext="From all platforms"
          data={weeklyData}
          isPositive={false}
        />
        <TopMetricCard
          title="Monthly Users"
          value={40210}
          changePercentage={+6.7}
          subtext="From all platforms"
          data={monthlyData}
          isPositive={true}
        />
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-xl font-semibold">User Retention Rates</h2>

            <div className="flex flex-col sm:flex-row sm:flex-wrap md:flex-nowrap items-stretch gap-4 w-full md:w-auto">
              {/* Network Dropdown */}
              <div className="relative w-full sm:w-44">
                <div
                  className="px-4 py-2.5 flex w-full justify-between items-center bg-[#FFFFFF05] border border-[#FFFFFF30] rounded-[8px] cursor-pointer text-sm text-white"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <div className="flex items-center gap-2">
                    {selectedNetwork !== "All" && (
                      <img
                        src={getPlatformIcon(selectedNetwork.toLowerCase())}
                        alt={selectedNetwork}
                        className="w-5 h-5"
                      />
                    )}
                    <span>{selectedNetwork}</span>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </div>

                {dropdownOpen && (
                  <div className="absolute z-10 mt-1 bg-[#1e1e1e] border border-[#FFFFFF30] rounded-[8px] w-full max-h-48 overflow-auto text-sm text-white">
                    {platforms.map((platform) => (
                      <div
                        key={platform}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-[#333] cursor-pointer"
                        onClick={() => {
                          setSelectedNetwork(platform);
                          setDropdownOpen(false);
                        }}
                      >
                        {platform !== "All" && (
                          <img
                            src={getPlatformIcon(platform.toLowerCase())}
                            alt={platform}
                            className="w-5 h-5"
                          />
                        )}
                        {platform}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Time Filter Dropdown */}
              <div className="relative w-full sm:w-44">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center justify-between gap-2 bg-[#FFFFFF05] border border-[#FFFFFF30] rounded-[8px] px-4 py-2.5 w-full text-sm text-white"
                >
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 opacity-60" />
                    <span>{timeFilter}</span>
                  </div>
                  <ChevronDown size={16} />
                </button>

                {open && (
                  <div className="absolute z-10 mt-1 w-full rounded-[8px] bg-[#1e1e1e] border border-[#FFFFFF30] shadow-lg backdrop-blur-md">
                    <ul className="py-1 text-sm text-white">
                      {options.map((option) => (
                        <li
                          key={option}
                          onClick={() => {
                            setTimeFilter(option);
                            setOpen(false);
                          }}
                          className="px-4 py-2 cursor-pointer hover:bg-[#FFFFFF10]"
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Export Button */}
              <button className="flex items-center justify-center gap-2 bg-[#FFFFFF05] border border-[#FFFFFF30] rounded-[8px] px-4 py-2.5 text-sm text-white w-full sm:w-auto">
                <DownloadIcon className="w-5 h-5" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-2">
          <RetentionTable />
        </div>
        <div className="col-span-1">
          <div className="flex flex-col md:flex-row gap-4">
            <MetricCard
              title="New Users Registered"
              data={metrics.views.data}
              value={metrics.views.value}
              isRounded={"rounded-[8px]"}
              subtext={metrics.views.subtext}
              isPositive={metrics.views.isPositive}
              changePercentage={metrics.views.changePercentage}
            />
            <MetricCard
              title="Page Visited"
              data={metrics.views.data}
              value={metrics.views.value}
              isRounded={"rounded-[8px]"}
              subtext={metrics.views.subtext}
              isPositive={metrics.views.isPositive}
              changePercentage={metrics.views.changePercentage}
            />
          </div>
          <RecurringRevenueTable />
        </div>
        <div className="md:col-span-2">
          <GrossIncomeTable />
        </div>
        <div className="col-span-1">
          <div className="flex flex-col gap-4">
            <MetricCard
              title="Subscription conversion rates"
              data={metrics.interactions.data}
              value={metrics.interactions.value}
              isRounded={"rounded-[8px]"}
              subtext={metrics.interactions.subtext}
              isPositive={metrics.interactions.isPositive}
              changePercentage={metrics.interactions.changePercentage}
            />
            <MetricCard
              title="Avg. customer lifetime value"
              data={metrics.clicks.data}
              value={metrics.clicks.value}
              isRounded={"rounded-[8px]"}
              subtext={metrics.clicks.subtext}
              isPositive={metrics.clicks.isPositive}
              changePercentage={metrics.clicks.changePercentage}
            />
          </div>
        </div>
        <div className="md:col-span-3">
          <UserAcquisitionChart />
        </div>
        <div className="md:col-span-3">
          <CustomerSatisfaction />
        </div>
        <div className="md:col-span-3">
          <ProgressBarCards />
        </div>{" "}
      </div>
    </Layout>
  );
};

export default AdminPanelHome;
