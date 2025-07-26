import { Calendar } from "lucide-react";
import Link from "next/link";
import React from "react";

const CurrentPlan = () => {
  return (
    <div className="border border-[#FFFFFF30] rounded-[20px]  bg-[#FFFFFF05]  p-4 h-full flex flex-col justify-between">
      <h2 className="text-white font-semibold text-lg mb-4 ">Current plan</h2>
      <div className="border border-[#FFFFFF30] rounded-[20px] p-4">
        <h2 className="text-lg font-medium mb-1">Advanced</h2>
        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold">
            €49<span className="text-white/70 text-sm ml-1">/per month</span>
          </p>
          <p className="text-[#FFFFFF99] text-md mt-3">Monthly</p>
        </div>
      </div>
      <button className="flex items-center  gap-2 mt-4 text-[#FFFFFF99] text-sm">
        <Calendar size={16} className="" />
        <span>Renewal date: Apr 9, 2025</span>
      </button>
      <Link href={"/dashboard/plans-billing"}>
        <button className=" bg-[#3570BC] rounded-[8px] mt-4 px-4 py-3 hover:bg-blue-600 cursor-pointer w-full">
          <span className="text-sm font-medium">Change Plan</span>
        </button>
      </Link>
    </div>
  );
};

export default CurrentPlan;
