"use client";

import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [5, 10, 20, 50],
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex items-center justify-between p-5 text-sm">
      {/* Items per page selector */}
      <div className="flex items-center space-x-4 text-white/60">
        <span>Show</span>
        <div className="relative inline-block">
          <select
            className="bg-[#1e1e1e] border border-[#fff]/6 rounded-[80px] px-4 py-1 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-[#555] transition"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option.toString().padStart(2, "0")}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white/60">
            <ChevronDown size={16} />
          </div>
        </div>
        <span className="hidden md:block">Cards per page</span>
      </div>

      {/* Page buttons */}
      <div className="flex items-center space-x-2">
        <button
          className="w-8 h-8 flex items-center text-white/60 justify-center rounded-md border border-[#2a2a2a]"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
        </button>

        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const pageNumber = i + 1;
          return (
            <button
              key={pageNumber}
              className={`w-8 h-8 flex items-center justify-center rounded-md ${
                currentPage === pageNumber
                  ? "bg-[#3570BC] text-white"
                  : "border border-[#2a2a2a] text-gray-400"
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}

        {totalPages > 5 && (
          <>
            <span className="px-1">...</span>
            <button
              className={`w-8 h-8 flex items-center justify-center rounded-md border border-[#2a2a2a] text-gray-400`}
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          className="w-8 h-8 flex text-white/60 items-center justify-center rounded-md border border-[#2a2a2a]"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
