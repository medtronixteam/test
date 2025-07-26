import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";

const ThankYouModel = ({ setThankyouModal }) => {
  const modalRef = useRef(null);

  const handleDone = (e) => {
    e.preventDefault();
    setThankyouModal(false)
    toast.custom((t) => (
      <div
        className={`flex items-start gap-2 w-[450px] p-3 rounded-[12px] border border-[#FFFFFF30] bg-[#171717] text-white shadow-md ${
          t.visible ? "animate-enter" : "animate-leave"
        }`}
      >
        <div className="mt-[3.5px]">
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.375 8.5C0.375 9.55058 0.581926 10.5909 0.983964 11.5615C1.386 12.5321 1.97528 13.414 2.71815 14.1569C3.46101 14.8997 4.34293 15.489 5.31353 15.891C6.28414 16.2931 7.32443 16.5 8.375 16.5C9.42558 16.5 10.4659 16.2931 11.4365 15.891C12.4071 15.489 13.289 14.8997 14.0319 14.1569C14.7747 13.414 15.364 12.5321 15.766 11.5615C16.1681 10.5909 16.375 9.55058 16.375 8.5C16.375 7.44943 16.1681 6.40914 15.766 5.43853C15.364 4.46793 14.7747 3.58601 14.0319 2.84315C13.289 2.10028 12.4071 1.511 11.4365 1.10896C10.4659 0.706926 9.42558 0.5 8.375 0.5C7.32443 0.5 6.28414 0.706926 5.31353 1.10896C4.34293 1.511 3.46101 2.10028 2.71815 2.84315C1.97528 3.58601 1.386 4.46793 0.983964 5.43853C0.581926 6.40914 0.375 7.44943 0.375 8.5Z"
              fill="#30AD81"
            />
            <path
              d="M5.70703 8.49995L7.48481 10.2777L11.0404 6.72217"
              fill="#30AD81"
            />
            <path
              d="M5.70703 8.49995L7.48481 10.2777L11.0404 6.72217"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="flex-1">
          <div className="text-white text-md">
            Payment successful. You're officially in!
          </div>
        </div>

        <button
          onClick={() => toast.dismiss(t.id)}
          className="text-white/40 hover:text-white mt-[3.5px]"
        >
          <X size={18} />
        </button>
      </div>
    ));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setThankyouModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setThankyouModal]);
  return (
    <div className="fixed inset-0 backdrop-blur-[12px] bg-[#17171780] flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-[#FFFFFF0A] backdrop-blur-[120.57px] rounded-[20px] border border-[#FFFFFF30] p-8 w-full max-w-5xl max-h-[90vh] overflow-auto "
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <div className="flex-1">
              <h1 className="text-white font-bold text-5xl">
                Thank you for letting us be part of your story!
              </h1>
              <p className="mt-10 text-[#E5E5E5]">
                Every great story begins with a single step. We’re excited to
                help you discover yours.
              </p>
            </div>
            <div className="flex  gap-3 mt-8">
              <button
                type="button"
                onClick={() => setThankyouModal(false)}
                className="min-w-[150px] px-6 py-3 border border-zinc-700 bg-[#2a2a2a] hover:bg-[#333] rounded-full text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDone}
                type="submit"
                className="min-w-[150px] px-6 py-3 bg-[#3570BC] hover:bg-blue-600 rounded-full text-white transition-colors"
              >
                Done
              </button>
            </div>
          </div>
          <div>
            <img src="/dashboard/thankyou.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouModel;
