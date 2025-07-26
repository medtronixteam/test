import { useState } from "react";
import { ChevronDown, Download, ChevronLeft, ChevronRight } from "lucide-react";
import Pagination from "@/components/Pagination";

const HistoryTable = () => {
  const [timeFilter, setTimeFilter] = useState("Last 10 days");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);

  const options = ["This Week", "This Month", "Last Month", "This Year"];
  // Sample transaction data
  const transactions = [
    {
      id: "TXN829364728",
      planName: "Advanced Plan",
      paymentMethod: "Visa",
      cardLastFour: "1234",
      amountPaid: 49.0,
      currency: "USD",
      status: "Paid",
      date: "Mar 28, 2025",
    },
    {
      id: "TXN829364728",
      planName: "Advanced Plan",
      paymentMethod: "Visa",
      cardLastFour: "1234",
      amountPaid: 49.0,
      currency: "USD",
      status: "Failed",
      date: "Mar 28, 2025",
    },
    {
      id: "TXN829364728",
      planName: "Advanced Plan",
      paymentMethod: "Visa",
      cardLastFour: "1234",
      amountPaid: 49.0,
      currency: "USD",
      status: "Paid",
      date: "Mar 28, 2025",
    },
    {
      id: "TXN829364728",
      planName: "Advanced Plan",
      paymentMethod: "Visa",
      cardLastFour: "1234",
      amountPaid: 49.0,
      currency: "USD",
      status: "Pending",
      date: "Mar 28, 2025",
    },
    {
      id: "TXN829364728",
      planName: "Advanced Plan",
      paymentMethod: "Visa",
      cardLastFour: "1234",
      amountPaid: 49.0,
      currency: "USD",
      status: "Failed",
      date: "Mar 28, 2025",
    },
  ];

  const totalItems = transactions.length;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = transactions.slice(startIndex, endIndex);
  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-[#1a3a2a] text-[#4ade80]";
      case "Failed":
        return "bg-[#3a1a1a] text-[#f87171]";
      case "Pending":
        return "bg-[#3a2a1a] text-[#f59e0b]";
      default:
        return "bg-gray-700 text-gray-300";
    }
  };

  return (
    <div className="text-white mt-6 ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Payment History</h2>
        <div className="flex gap-3">
          <div className="relative inline-block text-left">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 bg-[#FFFFFF05] border border-[#FFFFFF30] rounded-[8px] px-4 py-2 text-sm"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.6" clipPath="url(#clip0_2286_849)">
                  <path
                    d="M3.33594 5.83317C3.33594 5.39114 3.51153 4.96722 3.82409 4.65466C4.13665 4.3421 4.56058 4.1665 5.0026 4.1665H15.0026C15.4446 4.1665 15.8686 4.3421 16.1811 4.65466C16.4937 4.96722 16.6693 5.39114 16.6693 5.83317V15.8332C16.6693 16.2752 16.4937 16.6991 16.1811 17.0117C15.8686 17.3242 15.4446 17.4998 15.0026 17.4998H5.0026C4.56058 17.4998 4.13665 17.3242 3.82409 17.0117C3.51153 16.6991 3.33594 16.2752 3.33594 15.8332V5.83317Z"
                    stroke="white"
                    strokeWidth="1.41022"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.3359 2.5V5.83333"
                    stroke="white"
                    strokeWidth="1.41022"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.66406 2.5V5.83333"
                    stroke="white"
                    strokeWidth="1.41022"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.33594 9.1665H16.6693"
                    stroke="white"
                    strokeWidth="1.41022"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.66406 12.5H8.33073V14.1667H6.66406V12.5Z"
                    stroke="white"
                    strokeWidth="1.41022"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2286_849">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span>{timeFilter}</span>
              <ChevronDown size={16} />
            </button>

            {open && (
              <div className="absolute z-10 mt-2 w-full rounded-md bg-[#FFFFFF05] border border-[#FFFFFF30] shadow-lg backdrop-blur-md">
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
          <button className="flex items-center gap-2 bg-[#FFFFFF05] border border-[#FFFFFF30] rounded-[8px] px-4 py-2 text-sm">
            <svg
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.0165 7.5459C15.8665 7.79132 17.0303 9.2559 17.0303 12.4621V12.5651C17.0303 16.1038 15.6132 17.5209 12.0744 17.5209H6.92068C3.38193 17.5209 1.96484 16.1038 1.96484 12.5651V12.4621C1.96484 9.27965 3.11276 7.81507 5.91526 7.55382"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.5 12.3749V3.36572"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.1518 5.13109L9.49974 2.479L6.84766 5.13109"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto border border-[#2C2C2C] rounded-[8px] bg-[#1F1F1F]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-white/60 text-md border-b border-[#2a2a2a] bg-[#FFFFFF0D] ">
              <th className="px-3 py-4 font-medium">Transaction ID</th>
              <th className="px-3 py-4 font-medium">Plan Name</th>
              <th className="px-3 py-4 font-medium">Payment Method</th>
              <th className="px-3 py-4 font-medium">Amount Paid</th>
              <th className="px-3 py-4 font-medium">Status</th>
              <th className="px-3 py-4 font-medium">Date</th>
              <th className="px-3 py-4 font-medium">Download Invoice</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((transaction, index) => (
              <tr
                key={index}
                className="border-b border-[#2a2a2a] text-md hover:bg-[#1a1a1a] transition-colors"
              >
                <td className="py-4 px-3 text-white/80">#{transaction.id}</td>
                <td className="py-4 px-3 text-white/80">
                  {transaction.planName}
                </td>
                <td className="py-4 px-3 text-white/80">
                  ******* {transaction.cardLastFour} (
                  {transaction.paymentMethod})
                </td>
                <td className="py-4 px-3 text-white/80">
                  {transaction.amountPaid.toFixed(2)} {transaction.currency}
                </td>
                <td className="py-4 px-3 text-white/80">
                  <span
                    className={`px-3 py-1  rounded-full text-sm ${getStatusColor(
                      transaction.status
                    )}`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="py-4 px-3 text-white/80">{transaction.date}</td>
                <td className="">
                  <button className="flex items-center gap-1 rounded-[48px] border border-[#FFFFFF30] py-2 px-4 text-white/80 hover:text-white transition-colors">
                    <Download size={16} />
                    <span>Download PDF</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={(val) => {
            setItemsPerPage(val);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
};

export default HistoryTable;
