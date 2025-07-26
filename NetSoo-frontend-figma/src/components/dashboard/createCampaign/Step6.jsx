"use client";
import DatePicker from "react-datepicker";

import { Calendar, ChevronDown } from "lucide-react";
import React, { useState } from "react";

const Step6 = () => {
  const [formData, setFormData] = useState({
    budgete: "",
    budgetAmount: "",
    bidType: "automatic",
    campaignDurationType: "custom",
    customStartDate: new Date(),
    customEndDate: new Date(),
    payerName: "",
    beneficiaryName: "",
  });

  const formatScheduleDate = (date) => {
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggle = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div>
      <h2 className="text-lg font-semibold my-4">Campaign Duration & Budget</h2>

      {/* Budget */}
      <div>
        <label className="block text-[16px] text-[#A7A7A7] mb-2">Budget</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="relative">
            <select
              name="budgete"
              value={formData.budgete}
              onChange={handleChange}
              className="px-3 py-3 w-full border border-zinc-700 rounded-[8px] bg-[#272729] appearance-none focus:outline-none focus:ring-1 focus:ring-zinc-600"
            >
              <option value="" disabled>
                Select budget type
              </option>
              <option value="daily">Daily</option>
              <option value="lifetime">Lifetime</option>
            </select>
            <ChevronDown className="absolute right-3 top-4 w-4 h-4 text-zinc-400 pointer-events-none" />
          </div>
          <div className="w-full">
            <input
              type="text"
              name="budgetAmount"
              value={formData.budgetAmount}
              onChange={handleChange}
              placeholder="Paste here..."
              className="w-full px-3 py-3 bg-zinc-800/50 border border-zinc-700 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-zinc-600"
            />
          </div>
        </div>
      </div>

      {/* Bid Cap */}
      <div>
        <label className="block text-[16px] text-[#A7A7A7] mb-2">Bid Cap</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {["automatic", "manual"].map((type) => (
            <div
              key={type}
              onClick={() => handleToggle("bidType", type)}
              className={`px-3 py-3 flex w-full justify-between items-center border border-zinc-700 rounded-[8px] bg-[#272729] cursor-pointer`}
            >
              <span className="text-sm font-medium capitalize">{type}</span>
              <div
                className={`w-10 h-5 rounded-full relative transition ${
                  formData.bidType === type ? "bg-[#3570BC]" : "bg-zinc-700"
                }`}
              >
                <div
                  className={`absolute top-[2px] w-4 h-4 rounded-full transition-all ${
                    formData.bidType === type
                      ? "left-[22px] bg-white"
                      : "left-[2px] bg-zinc-500"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campaign Duration */}
      <div>
        <label className="block text-[16px] text-[#A7A7A7] mb-2">
          Campaign Duration
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Custom Duration */}
          <div>
            <div
              onClick={() => handleToggle("campaignDurationType", "custom")}
              className={`px-3 py-3 flex w-full justify-between items-center border border-zinc-700 rounded-t-[8px] bg-[#272729] cursor-pointer`}
            >
              <span className="text-sm font-medium">Custom</span>
              <div
                className={`w-10 h-5 rounded-full relative transition ${
                  formData.campaignDurationType === "custom"
                    ? "bg-[#3570BC]"
                    : "bg-zinc-700"
                }`}
              >
                <div
                  className={`absolute top-[2px] w-4 h-4 rounded-full transition-all ${
                    formData.campaignDurationType === "custom"
                      ? "left-[22px] bg-white"
                      : "left-[2px] bg-zinc-500"
                  }`}
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-full justify-center gap-2 flex items-center px-4 py-3 border border-[#393939] rounded-bl-[8px] backdrop-blur-[101.51px]">
                <Calendar size={16} className="mr-2" />
                <DatePicker
                  selected={formData.customStartDate}
                  onChange={(date) => handleToggle("customStartDate", date)}
                  dateFormat="MMM d, yyyy h:mm aa"
                  className="w-full focus:outline-none"
                />
                <ChevronDown size={16} className="ml-2" />
              </div>
              <div className="w-full flex justify-center gap-2 items-center px-4 py-3 border border-[#393939] rounded-br-[8px] backdrop-blur-[101.51px]">
                <Calendar size={16} />
                <DatePicker
                  autoFocus={false}
                  selected={formData.customEndDate}
                  onChange={(date) => handleToggle("customEndDate", date)}
                  dateFormat="MMM d, yyyy h:mm aa"
                  className="w-full focus:outline-none"
                />{" "}
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          {/* Fixed Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[fit-content]">
            {["1week", "1month"].map((type) => (
              <div
                key={type}
                onClick={() => handleToggle("campaignDurationType", type)}
                className={`px-3 py-3 flex w-full justify-between items-center border border-zinc-700 rounded-[8px] bg-[#272729] cursor-pointer`}
              >
                <span className="text-sm font-medium">
                  {type === "1week" ? "1 Week" : "1 Month"}
                </span>
                <div
                  className={`w-10 h-5 rounded-full relative transition ${
                    formData.campaignDurationType === type
                      ? "bg-[#3570BC]"
                      : "bg-zinc-700"
                  }`}
                >
                  <div
                    className={`absolute top-[2px] w-4 h-4 rounded-full transition-all ${
                      formData.campaignDurationType === type
                        ? "left-[22px] bg-white"
                        : "left-[2px] bg-zinc-500"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payor / Beneficiary */}
      <div>
        <label className="block text-[16px] text-[#A7A7A7] mb-2">
          Payor and beneficiary information
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="payerName"
            value={formData.payerName}
            onChange={handleChange}
            placeholder="Name of payer"
            className="w-full px-3 py-3 bg-zinc-800/50 border border-zinc-700 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-zinc-600"
          />
          <input
            type="text"
            name="beneficiaryName"
            value={formData.beneficiaryName}
            onChange={handleChange}
            placeholder="Name of beneficiary"
            className="w-full px-3 py-3 bg-zinc-800/50 border border-zinc-700 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-zinc-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Step6;
