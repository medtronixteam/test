"use client";
import React, { useState } from "react";
import Layout from "@/components/dashboard/Layout";
import { ChevronDown, Search } from "lucide-react";
import Pagination from "@/components/Pagination";

const usersData = [
  {
    id: 1,
    name: "Lukas Müller",
    email: "lukas.mueller@example.de",
    plan: "Basic",
    registrationDate: "2024-01-12",
  },
  {
    id: 2,
    name: "Sophie Dubois",
    email: "sophie.dubois@example.fr",
    plan: "Pro",
    registrationDate: "2024-02-20",
  },
  {
    id: 3,
    name: "Marco Rossi",
    email: "marco.rossi@example.it",
    plan: "Premium",
    registrationDate: "2023-12-18",
  },
  {
    id: 4,
    name: "Anna Nowak",
    email: "anna.nowak@example.pl",
    plan: "Basic",
    registrationDate: "2024-03-01",
  },
  {
    id: 5,
    name: "Jonas Bergström",
    email: "jonas.bergstrom@example.se",
    plan: "Pro",
    registrationDate: "2024-01-25",
  },
  {
    id: 6,
    name: "Isabelle Lefevre",
    email: "isabelle.lefevre@example.fr",
    plan: "Premium",
    registrationDate: "2024-03-15",
  },
];

const Page = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("All");
  const [openActionIndex, setOpenActionIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(5);

  const plans = ["All", "Basic", "Pro", "Premium"];

  const filteredUsers =
    selectedPlan === "All"
      ? usersData
      : usersData.filter((user) => user.plan === selectedPlan);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstCard, indexOfLastCard);

  const handleActionClick = (index) => {
    setOpenActionIndex(openActionIndex === index ? null : index);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-[600] mb-6 mt-2 ml-1">User Management</h1>
      <div className="border border-[#FFFFFF30] rounded-[8px] backdrop-blur-[111.51px]">
        <div className="p-5 rounded-t-[8px]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-xs text-gray-400">Top Posts</div>
              <h2 className="text-lg font-semibold text-white">
                User Management
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search here"
                  className="w-full border border-[#FFFFFF30] rounded-[8px] pl-10 pr-4 py-3 w-64 text-sm focus:outline-none"
                />
              </div>
              <div className="relative w-full sm:w-32">
                <div
                  className="px-4 py-3 flex w-full justify-between items-center border border-[#FFFFFF30] rounded-[8px] cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span className="text-white text-sm">{selectedPlan}</span>
                  <ChevronDown className="w-4 h-4 text-white" />
                </div>
                {dropdownOpen && (
                  <div className="absolute z-10 mt-1 bg-[#1e1e1e] border border-[#FFFFFF30] rounded-[8px] w-full overflow-auto">
                    {plans.map((plan) => (
                      <div
                        key={plan}
                        onClick={() => {
                          setSelectedPlan(plan);
                          setDropdownOpen(false);
                          setCurrentPage(1);
                        }}
                        className="px-4 py-2 text-sm text-white hover:bg-[#333] cursor-pointer"
                      >
                        {plan}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="">
          {/* Header Row */}
          <div className="hidden md:grid grid-cols-12 text-sm text-gray-400 bg-[#2A2A2A]">
            <div className="py-5 px-5 col-span-3 text-left">Name</div>
            <div className="py-5 px-5 col-span-4 text-left">Email</div>
            <div className="py-5 px-5 col-span-2 text-left">Plan</div>
            <div className="py-5 px-5 col-span-2 text-left">
              Registration Date
            </div>
            <div className="py-5 px-5 col-span-1 text-left">Activity</div>
          </div>

          {/* Data Rows */}
          {currentUsers.map((user, index) => (
            <div
              key={user.id}
              className="grid grid-cols-1 md:grid-cols-12 text-sm border-b border-[#2a2a2a] hover:bg-[#222222] bg-[#1F1F1F] transition-colors relative"
            >
              {/* Name */}
              <div className="py-4 px-5 md:col-span-3">
                <span className="block md:hidden text-gray-500">Name</span>
                {user.name}
              </div>

              {/* Email */}
              <div className="py-4 px-5 md:col-span-4">
                <span className="block md:hidden text-gray-500">Email</span>
                {user.email}
              </div>

              {/* Plan */}
              <div className="py-4 px-5 md:col-span-2">
                <span className="block md:hidden text-gray-500">Plan</span>
                {user.plan}
              </div>

              {/* Registration Date */}
              <div className="py-4 px-5 md:col-span-2">
                <span className="block md:hidden text-gray-500">
                  Registration Date
                </span>
                {user.registrationDate}
              </div>

              {/* Action */}
              <div className="py-4 px-5 md:col-span-1 relative">
                <span className="block md:hidden text-gray-500">Actions</span>
                <button onClick={() => handleActionClick(index)}>
                  {/* your SVG button */}
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.437652"
                      y="0.437652"
                      width="29.1247"
                      height="29.1247"
                      rx="7.56235"
                      fill="white"
                      fillOpacity="0.02"
                    />
                    <rect
                      x="0.437652"
                      y="0.437652"
                      width="29.1247"
                      height="29.1247"
                      rx="7.56235"
                      stroke="url(#paint0_linear)"
                      strokeWidth="0.875305"
                    />
                    <g clipPath="url(#clip0)">
                      <path
                        d="M15.4987 10.8334C16.4192 10.8334 17.1654 10.0872 17.1654 9.16668C17.1654 8.2462 16.4192 7.5 15.4987 7.5C14.5782 7.5 13.832 8.2462 13.832 9.16668C13.832 10.0872 14.5782 10.8334 15.4987 10.8334Z"
                        fill="white"
                        fillOpacity="0.8"
                      />
                      <path
                        d="M15.4987 16.6669C16.4192 16.6669 17.1654 15.9207 17.1654 15.0002C17.1654 14.0797 16.4192 13.3335 15.4987 13.3335C14.5782 13.3335 13.832 14.0797 13.832 15.0002C13.832 15.9207 14.5782 16.6669 15.4987 16.6669Z"
                        fill="white"
                        fillOpacity="0.8"
                      />
                      <path
                        d="M15.4987 22.4999C16.4192 22.4999 17.1654 21.7537 17.1654 20.8332C17.1654 19.9127 16.4192 19.1665 15.4987 19.1665C14.5782 19.1665 13.832 19.9127 13.832 20.8332C13.832 21.7537 14.5782 22.4999 15.4987 22.4999Z"
                        fill="white"
                        fillOpacity="0.8"
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="-12.6955"
                        y1="7.35539"
                        x2="35.4124"
                        y2="8.79441"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" stopOpacity="0" />
                        <stop
                          offset="0.612334"
                          stopColor="white"
                          stopOpacity="0.19"
                        />
                        <stop offset="1" stopColor="white" stopOpacity="0" />
                      </linearGradient>
                      <clipPath id="clip0">
                        <rect
                          width="15"
                          height="15"
                          fill="white"
                          transform="translate(8 7.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </button>

                {openActionIndex === index && (
                  <div className="absolute right-0 md:right-12 top-12 z-50 backdrop-blur-[120.57px] text-white rounded-[20px] border border-[#FFFFFF30] w-40">
                    <div className="px-4 py-2 rounded-t-[20px] hover:bg-[#333] cursor-pointer">
                      View Profile
                    </div>
                    <div className="px-4 py-2 hover:bg-[#333] cursor-pointer">
                      Suspend
                    </div>
                    <div className="px-4 py-2 hover:bg-[#333] rounded-b-[20px] cursor-pointer">
                      Reset Password
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
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
    </Layout>
  );
};

export default Page;
