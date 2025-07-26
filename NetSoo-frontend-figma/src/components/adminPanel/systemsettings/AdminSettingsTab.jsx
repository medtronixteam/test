"use client";

import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";

const AdminSettingsTab = () => {
  const [settings, setSettings] = useState({
    email: "example123@gmail.com",
    password: "********",
    domains: ["www.examplewebsite.com"],
    language: "English",
    showLanguageDropdown: false,
    socialImage: null,
  });

  const languageOptions = [
    {
      code: "gb",
      label: "English",
      flagUrl: "https://flagcdn.com/gb.svg",
    },
    {
      code: "es",
      label: "Spanish",
      flagUrl: "https://flagcdn.com/es.svg",
    },
  ];

  const selected = languageOptions.find(
    (lang) => lang.label === settings.language
  );

  const updateSettings = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddDomain = () => {
    updateSettings("domains", [...settings.domains, ""]);
  };

  const handleRemoveDomain = (index) => {
    const updated = settings.domains.filter((_, i) => i !== index);
    updateSettings("domains", updated);
  };

  const handleDomainChange = (index, value) => {
    const updated = [...settings.domains];
    updated[index] = value;
    updateSettings("domains", updated);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateSettings("socialImage", URL.createObjectURL(file));
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg">Language Management</h2>
        <div className="relative">
          <button
            className="flex items-center gap-2 border border-[#FFFFFF30] hover:bg-zinc-700 text-white px-5 py-2.5 rounded-full text-sm transition"
            onClick={() =>
              updateSettings(
                "showLanguageDropdown",
                !settings.showLanguageDropdown
              )
            }
          >
            <img
              src={selected?.flagUrl}
              alt={`${selected?.label} Flag`}
              className="w-5 h-5"
            />
            {selected?.label} <ChevronDown size={16} />
          </button>

          {settings.showLanguageDropdown && (
            <div className="absolute right-0 mt-1 bg-[#2A2A30] rounded-md shadow-lg z-10 w-full">
              <div className="py-1">
                {languageOptions.map((lang) => (
                  <button
                    key={lang.code}
                    className="flex items-center w-full px-4 py-2 text-left hover:bg-[#3A3A40]"
                    onClick={() => {
                      updateSettings("language", lang.label);
                      updateSettings("showLanguageDropdown", false);
                    }}
                  >
                    <img
                      src={lang.flagUrl}
                      alt={`${lang.label} Flag`}
                      className="w-5 h-5 mr-2"
                    />
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-[#393939] my-6"></div>

       <div className="mb-8">
        <h2 className="text-sm text-white/60 mb-2">System Parameters</h2>

        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-white">Email Address</h3>
            <button className="border border-[#FFFFFF30] hover:bg-zinc-700 text-white px-5 py-2.5 rounded-full text-sm transition">
              Change Email
            </button>
          </div>
          <p className="text-white/60">{settings.email}</p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Password</h3>
            <button className="border border-[#FFFFFF30] hover:bg-zinc-700 text-white px-5 py-2.5 rounded-full text-sm transition">
              Reset Password
            </button>
          </div>
          <p className="text-white/60">••••••••</p>
        </div>
      </div>

      <div className="border-t border-[#393939] my-6"></div>

      <h2 className="font-semibold mb-4">Domain</h2>
      {settings.domains.map((domain, index) => (
        <div
          key={index}
          className="flex items-center gap-4 mb-3 bg-zinc-800/50 border border-zinc-700 rounded-lg px-4 py-2"
        >
          <input
            type="text"
            value={domain}
            onChange={(e) => handleDomainChange(index, e.target.value)}
            className="flex-grow bg-transparent text-white focus:outline-none"
          />
          <button
            onClick={() => handleRemoveDomain(index)}
            className="text-red-500 hover:underline text-sm"
          >
            Remove
          </button>
          <span className="hidden md:block bg-[#283430] text-[#4CD0A2] px-5 py-2 rounded-[8px] text-sm font-bold flex items-center">
            Connected
            <svg
              className="ml-1"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8395 9.16113C12.6208 10.9424 12.6208 13.8241 10.8395 15.5974C9.05828 17.3707 6.17662 17.3786 4.40328 15.5974C2.62995 13.8161 2.62203 10.9345 4.40328 9.16113"
                stroke="#4CD0A2"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.88547 11.1165C7.03297 9.26402 7.03297 6.25569 8.88547 4.39527C10.738 2.53486 13.7463 2.54278 15.6067 4.39527C17.4671 6.24777 17.4592 9.25611 15.6067 11.1165"
                stroke="#4CD0A2"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        </div>
      ))}
     <button
        className="bg-[#3570BC] text-white px-4 py-2 rounded-lg font-semibold text-sm flex items-center"
        onClick={handleAddDomain}
      >
        <Plus size={16} className="mr-2" /> Add Domain
      </button>

      <div className="border-t border-[#393939] my-6"></div>

     <div className="mb-8">
        <h2 className="font-semibold mb-4">SEO Settings</h2>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Meta Title</h3>
          <input
            type="text"
            className="w-full px-3 py-3 bg-zinc-800/50 border border-zinc-700 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-zinc-600"
            placeholder="Your platform title as seen in browser tabs & search engines."
          />
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Meta Description</h3>
          <input
            type="text"
            className="w-full px-3 py-3 bg-zinc-800/50 border border-zinc-700 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-zinc-600"
            placeholder="Brief summary of your platform shown in search results."
          />
        </div>

        <h3 className="font-semibold mb-2">
          Social Sharing Image{" "}
          <span className="text-white/60 text-sm">(Optional)</span>
        </h3>
        <label className="block cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <div className="w-full bg-zinc-800/50 border border-zinc-700 rounded-lg p-3 text-white/60 flex items-center justify-center">
            <svg
              className="mr-2"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.6" clip-path="url(#clip0_2798_38936)">
                <path
                  d="M15.5 8H15.51"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13 21H6.5C5.70435 21 4.94129 20.6839 4.37868 20.1213C3.81607 19.5587 3.5 18.7956 3.5 18V6C3.5 5.20435 3.81607 4.44129 4.37868 3.87868C4.94129 3.31607 5.70435 3 6.5 3H18.5C19.2956 3 20.0587 3.31607 20.6213 3.87868C21.1839 4.44129 21.5 5.20435 21.5 6V12.5"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.5 15.9998L8.5 10.9998C9.428 10.1068 10.572 10.1068 11.5 10.9998L15.5 14.9998"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.5 14.0004L15.5 13.0004C16.17 12.3564 16.95 12.1764 17.682 12.4604"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.5 19H22.5"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.5 16V22"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2798_38936">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>{" "}
            Upload OpenGraph Image
          </div>
        </label>

        {settings.socialImage && (
          <img
            src={settings.socialImage}
            alt="Uploaded"
            className="mt-4 rounded-md max-h-48 object-contain border border-zinc-700"
          />
        )}
      </div> 
    </div>
  );
};

export default AdminSettingsTab;
