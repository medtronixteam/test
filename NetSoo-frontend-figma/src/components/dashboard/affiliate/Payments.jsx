import { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Calendar,
  ArrowUp,
} from "lucide-react";
import Pagination from "@/components/Pagination";

const MyBalance = () => {
  const [progressPercentage, setProgressPercentage] = useState(80);
  const strokeDashoffset = 100 - (progressPercentage * 100) / 100;

  return (
    <div className="bg-[#FFFFFF0A] backdrop-blur-[120.57px] text-white border border-[#FFFFFF30] rounded-[20px] p-6 mb-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#393939"
                strokeWidth="2"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#FF9500"
                strokeWidth="4"
                strokeDasharray="100"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="flex items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-white">
              <ArrowUp size={14} />
              {progressPercentage}%
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-400">My Balance</div>
            <div className="text-2xl font-bold">
              $1000 000, 00{" "}
              <span className="inline-flex items-center text-xs">
                1.3% VS LAST MONTH
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[#FFFFFF0A] border border-[#FFFFFF30] rounded-lg px-4 py-2 flex items-center gap-2">
          <Calendar size={16} />
          <span className="text-sm">This Month</span>
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );
};

const PaymentsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(5);
  const payments = [
    {
      id: "#1",
      user: {
        name: "Cameron Williamson",
        avatar: "/dashboard/user1.png",
      },
      email: "cameron2625@gmail.com",
      amount: "$ 3.500",
      date: "23 Mar, 2025",
    },
    {
      id: "#1",
      user: {
        name: "Cameron Williamson",
        avatar: "/dashboard/user1.png",
      },
      email: "cameron2625@gmail.com",
      amount: "$ 3.500",
      date: "23 Mar, 2025",
    },
    {
      id: "#1",
      user: {
        name: "Cameron Williamson",
        avatar: "/dashboard/user1.png",
      },
      email: "cameron2625@gmail.com",
      amount: "$ 3.500",
      date: "23 Mar, 2025",
    },
    {
      id: "#1",
      user: {
        name: "Cameron Williamson",
        avatar: "/dashboard/user1.png",
      },
      email: "cameron2625@gmail.com",
      amount: "$ 3.500",
      date: "23 Mar, 2025",
    },
    {
      id: "#1",
      user: {
        name: "Cameron Williamson",
        avatar: "/dashboard/user1.png",
      },
      email: "cameron2625@gmail.com",
      amount: "$ 3.500",
      date: "23 Mar, 2025",
    },
    {
      id: "#1",
      user: {
        name: "Cameron Williamson",
        avatar: "/dashboard/user1.png",
      },
      email: "cameron2625@gmail.com",
      amount: "$ 3.500",
      date: "23 Mar, 2025",
    },
    {
      id: "#1",
      user: {
        name: "Cameron Williamson",
        avatar: "/dashboard/user1.png",
      },
      email: "cameron2625@gmail.com",
      amount: "$ 3.500",
      date: "23 Mar, 2025",
    },
    {
      id: "#1",
      user: {
        name: "Cameron Williamson",
        avatar: "/dashboard/user1.png",
      },
      email: "cameron2625@gmail.com",
      amount: "$ 3.500",
      date: "23 Mar, 2025",
    },
  ];
  const indexOfLastPayment = currentPage * cardsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - cardsPerPage;
  const currentPayments = payments.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-[#FFFFFF0A] backdrop-blur-[120.57px] text-white border border-[#FFFFFF30] rounded-[20px]">
      <div className="flex justify-between items-center p-6">
        <h2 className="text-xl font-semibold">Payments</h2>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search here"
            className="bg-[#FFFFFF0A] border border-[#FFFFFF30] rounded-lg pl-10 pr-4 py-2 w-64 text-sm focus:outline-none"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 text-sm border-y border-[#FFFFFF15] bg-[#2E2E2E]">
              <th className="py-3 px-6 font-normal">Sr No.</th>
              <th className="py-3 px-6 font-normal">Affiliate User</th>
              <th className="py-3 px-6 font-normal">Email</th>
              <th className="py-3 px-6 font-normal">Amount</th>
              <th className="py-3 px-6 font-normal">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentPayments.map((payment, index) => (
              <tr key={index} className="border-b border-[#FFFFFF15]">
                <td className="py-4 px-6 text-sm">{payment.id}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <img
                        src={payment.user.avatar}
                        alt={payment.user.avatar}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </div>
                    <span>{payment.user.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-white/80">{payment.email}</td>
                <td className="py-4 px-6 text-white/80">{payment.amount}</td>
                <td className="py-4 px-6 text-white/80">{payment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalItems={payments.length}
        itemsPerPage={cardsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={(val) => {
          setCardsPerPage(val);
          setCurrentPage(1); // Reset to the first page when items per page changes
        }}
      />
    </div>
  );
};

export default function PaymentsDashboard() {
  return (
    <div className="">
      <MyBalance />
      <PaymentsTable />
    </div>
  );
}
