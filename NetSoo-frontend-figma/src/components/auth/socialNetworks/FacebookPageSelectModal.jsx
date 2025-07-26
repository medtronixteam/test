"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { selectFacebookPage } from "@/api/connections";

const FacebookPageSelectModal = ({ title, buttons, onClose }) => {
  const modalRef = useRef();
  const token = localStorage.getItem("accessToken");

  console.log("Showing facebook modal");

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleFacebookPageSelect = async (pageName) => {
    let res = await selectFacebookPage(token, pageName);
    onClose();
  }


  return (
    <div className="fixed inset-0 backdrop-blur-[12px] bg-[#171717]/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-zinc-900 border border-[#393939] p-6 w-full max-w-md rounded-[12px] shadow-lg"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-white">
            <X />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={() => handleFacebookPageSelect(btn.label)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacebookPageSelectModal;
