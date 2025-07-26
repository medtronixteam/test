"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const BillingForm = () => {
  const [formData, setFormData] = useState({
    company: "",
    taxId: "",
    address: "",
    country: "",
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className=" mt-6 text-white">
      <h1 className="text-2xl font-bold mb-8">Billing information</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company */}
          <div className="space-y-2">
            <label
              htmlFor="company"
              className="block text-[16px] text-[#A7A7A7]"
            >
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Type here..."
              className="px-3 py-3 flex w-full justify-between items-center border border-zinc-700 rounded-[8px] p-3  mt-2 bg-[#1e1e1e] appearance-none focus:outline-none focus:ring-1 focus:ring-[#555] transition"
            />
          </div>

          {/* VAT/Tax ID */}
          <div className="space-y-2">
            <label htmlFor="taxId" className="block text-[16px] text-[#A7A7A7]">
              VAT/Tax Id Number
            </label>
            <input
              type="text"
              id="taxId"
              name="taxId"
              value={formData.taxId}
              onChange={handleChange}
              placeholder="Type here..."
              className="px-3 py-3 flex w-full justify-between items-center border border-zinc-700 rounded-[8px] p-3  mt-2 bg-[#1e1e1e] appearance-none focus:outline-none focus:ring-1 focus:ring-[#555] transition"
            />
          </div>

          {/* Full Address */}
          <div className="space-y-2">
            <label
              htmlFor="address"
              className="block text-[16px] text-[#A7A7A7]"
            >
              Full address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Type here..."
              className="px-3 py-3 flex w-full justify-between items-center border border-zinc-700 rounded-[8px] p-3  mt-2 bg-[#1e1e1e] appearance-none focus:outline-none focus:ring-1 focus:ring-[#555] transition"
            />
            <p className="text-sm text-gray-500">
              Enter your street, zip code and city
            </p>
          </div>

          {/* Country */}
          <div className="space-y-2">
            <label
              htmlFor="country"
              className="block text-[16px] text-[#A7A7A7]"
            >
              Country
            </label>
            <div className="relative">
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="px-3 py-3 flex w-full justify-between items-center border border-zinc-700 rounded-[8px] p-3  mt-2 bg-[#1e1e1e] appearance-none focus:outline-none focus:ring-1 focus:ring-[#555] transition"
              >
                <option value="" disabled>
                  Select here...
                </option>
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="uk">United Kingdom</option>
                <option value="au">Australia</option>
                <option value="de">Germany</option>
                <option value="fr">France</option>
                <option value="es">Spain</option>
                <option value="it">Italy</option>
                <option value="jp">Japan</option>
                <option value="cn">China</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size={20}
              />
            </div>
          </div>
        </div>

        {/* Email - Full Width */}
        <div className="mt-6 space-y-2">
          <label htmlFor="email" className="block text-[16px] text-[#A7A7A7]">
            E-mails to receive invoices
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Type here..."
            className="px-3 py-3 flex w-full justify-between items-center border border-zinc-700 rounded-[8px] p-3  mt-2 bg-[#1e1e1e] appearance-none focus:outline-none focus:ring-1 focus:ring-[#555] transition"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="bg-[#FFFFFF05] hover:bg-[#2a2a2a] border border-[#FFFFFF30] text-white px-6 py-3 rounded-[60px] transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default BillingForm;
