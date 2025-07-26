"use client";

import Pagination from "@/components/Pagination";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

// Dummy data
const dummyUsers = [
  {
    id: 1,
    sessionTime: "6m 20s",
    country: "Pakistan",
    activeUsers: 500,
    ageGroup: "20 - 30 Yrs",
  },
  {
    id: 2,
    sessionTime: "5m 45s",
    country: "India",
    activeUsers: 430,
    ageGroup: "25 - 35 Yrs",
  },
  {
    id: 3,
    sessionTime: "7m 10s",
    country: "USA",
    activeUsers: 610,
    ageGroup: "18 - 25 Yrs",
  },
  {
    id: 4,
    sessionTime: "4m 50s",
    country: "UK",
    activeUsers: 290,
    ageGroup: "30 - 40 Yrs",
  },
  {
    id: 5,
    sessionTime: "8m 00s",
    country: "Canada",
    activeUsers: 480,
    ageGroup: "35 - 45 Yrs",
  },
  {
    id: 6,
    sessionTime: "7m 10s",
    country: "USA",
    activeUsers: 610,
    ageGroup: "18 - 25 Yrs",
  },
  {
    id: 7,
    sessionTime: "4m 50s",
    country: "UK",
    activeUsers: 290,
    ageGroup: "30 - 40 Yrs",
  },
  {
    id: 8,
    sessionTime: "8m 00s",
    country: "Canada",
    activeUsers: 480,
    ageGroup: "35 - 45 Yrs",
  },
];

const timeRanges = ["Daily", "Weekly", "Monthly"];

const RetentionTable = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState("Daily");
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(5);
  const [openActionIndex, setOpenActionIndex] = useState(null);

  const filteredUsers = dummyUsers;

  const indexOfLast = currentPage * cardsPerPage;
  const indexOfFirst = indexOfLast - cardsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleActionClick = (index) =>
    setOpenActionIndex(openActionIndex === index ? null : index);

  return (
    <div>
      <div className="border border-[#FFFFFF30] rounded-[8px] backdrop-blur-[111.51px]">
        <div className="p-5 rounded-t-[8px]">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-400">Top Posts</div>
              <h2 className="text-lg font-semibold text-white">
                User Retention Rates
              </h2>
            </div>
            <div className="relative w-32">
              <div
                className="px-4 py-3 flex w-full justify-between items-center border border-[#FFFFFF30] rounded-[8px] cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="text-white text-sm">{selectedTimeRange}</span>
                <ChevronDown className="w-4 h-4 text-white" />
              </div>
              {dropdownOpen && (
                <div className="absolute z-10 mt-1 bg-[#1e1e1e] border border-[#FFFFFF30] rounded-[8px] w-full overflow-auto">
                  {timeRanges.map((range) => (
                    <div
                      key={range}
                      onClick={() => {
                        setSelectedTimeRange(range);
                        setDropdownOpen(false);
                        setCurrentPage(1);
                      }}
                      className="px-4 py-2 text-sm text-white hover:bg-[#333] cursor-pointer"
                    >
                      {range}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div>
          <div className="grid grid-cols-12 text-sm text-white/60 bg-[#2A2A2A]">
            <div className="py-5 px-5 col-span-3 text-left">
              Avg Session Time
            </div>
            <div className="py-5 px-5 col-span-3 text-left">Top Countries</div>
            <div className="py-5 px-5 col-span-3 text-left">Active Users</div>
            <div className="py-5 px-5 col-span-3 text-left">Age Group</div>
          </div>

          {currentUsers.map((user, index) => (
            <div
              key={user.id}
              className="grid grid-cols-12 text-sm border-b border-[#2a2a2a] hover:bg-[#222222]  transition-colors relative"
            >
              <div className="py-4 px-5 col-span-3 text-left text-white/80">
                {user.sessionTime}
              </div>
              <div className="py-4 px-5 col-span-3 text-left text-white/80">
                {user.country}
              </div>
              <div className="py-4 px-5 col-span-3 text-left text-white/80">
                {user.activeUsers}
              </div>
              <div className="py-4 px-5 col-span-3 text-left text-white/80">
                {user.ageGroup}
              </div>
            </div>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={filteredUsers.length}
          itemsPerPage={cardsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={(val) => {
            setCardsPerPage(val);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
};

export default RetentionTable;
