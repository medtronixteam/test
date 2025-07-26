"use client";
import Layout from "@/components/dashboard/Layout";
import React, { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import Pagination from "@/components/Pagination"; // Assuming Pagination is a component in your project

const affiliatesData = [
  {
    affiliateName: "John Doe",
    email: "johndoe01@gmail.com",
    incomeGenerated: "€810.00",
    referredCustomers: "53",
    kpis: "3.1% CR Avg. Value €27",
    paymentHistory: "View",
    joinedDate: "Mar 28, 2025",
    conversationRate: "9.8%",
    totalSpend: "$900",
    status: "Active",
    lastPayment: "Mar 28, 2025",
  },
  {
    affiliateName: "Jane Smith",
    email: "jane@example.com",
    incomeGenerated: "€1,230.00",
    referredCustomers: "74",
    kpis: "2.8% CR Avg. Value €32",
    paymentHistory: "View",
    joinedDate: "Feb 15, 2025",
    conversationRate: "8.5%",
    totalSpend: "$1,200",
    status: "Active",
    lastPayment: "Feb 20, 2025",
  },
  {
    affiliateName: "Alice Johnson",
    email: "alice@example.com",
    incomeGenerated: "€950.00",
    referredCustomers: "61",
    kpis: "3.5% CR Avg. Value €25",
    paymentHistory: "View",
    joinedDate: "Jan 10, 2025",
    conversationRate: "10.2%",
    totalSpend: "$850",
    status: "Inactive",
    lastPayment: "Jan 15, 2025",
  },
  {
    affiliateName: "Bob Brown",
    email: "bob@example.com",
    incomeGenerated: "€1,100.00",
    referredCustomers: "80",
    kpis: "3.0% CR Avg. Value €29",
    paymentHistory: "View",
    joinedDate: "Dec 5, 2024",
    conversationRate: "7.9%",
    totalSpend: "$1,050",
    status: "Active",
    lastPayment: "Dec 10, 2024",
  },
  {
    affiliateName: "Charlie Davis",
    email: "charlie@example.com",
    incomeGenerated: "€670.00",
    referredCustomers: "40",
    kpis: "2.9% CR Avg. Value €26",
    paymentHistory: "View",
    joinedDate: "Nov 20, 2024",
    conversationRate: "6.8%",
    totalSpend: "$600",
    status: "Inactive",
    lastPayment: "Nov 25, 2024",
  },
];

const page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(5);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Active");

  const filteredUsers = affiliatesData.filter((user) => {
    if (selectedPlan === "Active") {
      return user.status === "Active";
    } else if (selectedPlan === "Monthly") {
      return user.status === "Inactive"; // or whatever logic applies
    }
    return true;
  });
  // Handle page change logic
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Paginate data
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <Layout>
      <h1 className="text-2xl font-[600] mb-6 mt-2 ml-1">
        Affiliate Management
      </h1>
      <div className="border border-[#FFFFFF30] rounded-[8px] backdrop-blur-[111.51px]">
        <div className="p-5 rounded-t-[8px]">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-400">Top Posts</div>
              <h2 className="text-lg font-semibold text-white">
                Affiliate Management
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-32">
                <div
                  className="px-4 py-3 flex w-full justify-between items-center border border-[#FFFFFF30] rounded-[8px] cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span className="text-white text-sm">{selectedPlan}</span>
                  <ChevronDown className="w-4 h-4 text-white" />
                </div>
                {dropdownOpen && (
                  <div className="absolute z-10 mt-1 bg-[#1e1e1e] border border-[#FFFFFF30] rounded-[8px] w-full overflow-auto">
                    {["Active", "Monthly"].map((plan) => (
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

        <div className="overflow-x-auto max-w-[92vw] md:max-w-[calc(100vw-300px)]">
          <table className="w-full ">
            <thead>
              <tr className="text-sm text-gray-400 bg-[#2A2A2A]">
                <th className="py-5 px-4 whitespace-nowrap text-left font-normal">
                  Affiliate Name
                </th>
                <th className="py-5 px-4 whitespace-nowrap text-left font-normal">
                  Email
                </th>
                <th className="py-5 px-4 whitespace-nowrap text-left font-normal">
                  Income Generated
                </th>
                <th className="py-5 px-4 whitespace-nowrap text-left font-normal">
                  Referred Customers
                </th>
                <th className="py-5 px-4 whitespace-nowrap text-left font-normal">
                  KPIs
                </th>
                <th className="py-5 px-4 whitespace-nowrap text-left font-normal">
                  Payment History
                </th>
                <th className="py-5 px-4 whitespace-nowrap text-left font-normal">
                  Joined Date
                </th>
                <th className="py-5 px-4 whitespace-nowrap text-left font-normal">
                  Conversation Rate
                </th>
                <th className="py-5 px-4 whitespace-nowrap text-left font-normal">
                  Total Spend
                </th>
                <th className="py-5 px-4 whitespace-nowrap text-left font-normal">
                  Status
                </th>
                <th className="py-5 px-4 whitespace-nowrap text-left font-normal">
                  Last Payment
                </th>
                <th className="py-5 px-4 whitespace-nowrap text-left font-normal">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr
                  key={index}
                  className="text-sm text-white border-b border-[#2a2a2a] hover:bg-[#222222] bg-[#1F1F1F] transition-colors"
                >
                  <td className="py-5 px-4 whitespace-nowrap">
                    {user.affiliateName}
                  </td>
                  <td className="py-5 px-4 whitespace-nowrap">{user.email}</td>
                  <td className="py-5 px-4 whitespace-nowrap">
                    {user.incomeGenerated}
                  </td>
                  <td className="py-5 px-4 whitespace-nowrap">
                    {user.referredCustomers}
                  </td>
                  <td className="py-5 px-4 whitespace-nowrap">{user.kpis}</td>
                  <td className="py-5 px-4 whitespace-nowrap">
                    <button className="text-gray-400 hover:text-white flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      {user.paymentHistory}
                    </button>
                  </td>
                  <td className="py-5 px-4 whitespace-nowrap">
                    {user.joinedDate}
                  </td>
                  <td className="py-5 px-4 whitespace-nowrap">
                    {user.conversationRate}
                  </td>
                  <td className="py-5 px-4 whitespace-nowrap">
                    {user.totalSpend}
                  </td>
                  <td className="py-5 px-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.status === "Active"
                          ? "bg-green-900/30 text-green-500"
                          : "bg-red-900/30 text-red-500"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-5 px-4 whitespace-nowrap ">
                    {user.lastPayment}
                  </td>
                  <td className="py-5 px-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button className="flex items-center gap-1 bg-green-900/30 text-green-500 px-2 py-1 rounded-full text-xs ">
                        <Check size={16} />
                        Approve
                      </button>
                      <button className="flex items-center gap-1 bg-red-900/30 text-red-500 px-2 py-1 rounded-full text-xs ">
                        <X size={16} />
                        Deny
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
    </Layout>
  );
};

export default page;
