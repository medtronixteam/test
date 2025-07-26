import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { getPlatformIcon } from "@/utils/getPlatformIcon";

const platformsData = [
  {
    name: "Facebook",
    enabled: true,
    objective: "",
    locations: {
      Feed: true,
      Stories: false,
    },
  },
  {
    name: "Instagram",
    enabled: true,
    objective: "",
    locations: {
      Feed: true,
      Stories: false,
    },
  },
  {
    name: "Tiktok",
    enabled: true,
    objective: "",
    locations: {
      Feed: true,
      Stories: false,
    },
  },
];

const objectives = ["Awareness", "Engagement", "Conversions"];

const Step1 = () => {
  const [campaignData, setCampaignData] = useState({
    name: "",
    url: "",
    platforms: platformsData,
  });

  const handleToggle = (platformIndex, location) => {
    const updated = [...campaignData.platforms];
    updated[platformIndex].locations[location] =
      !updated[platformIndex].locations[location];
    setCampaignData({ ...campaignData, platforms: updated });
  };

  const handlePlatformEnable = (index) => {
    const updated = [...campaignData.platforms];
    updated[index].enabled = !updated[index].enabled;
    setCampaignData({ ...campaignData, platforms: updated });
  };

  const handleObjectiveChange = (index, value) => {
    const updated = [...campaignData.platforms];
    updated[index].objective = value;
    setCampaignData({ ...campaignData, platforms: updated });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold my-4">Campaign Info</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="w-full">
          <label className="block text-[16px] text-[#A7A7A7] mb-2">
            Campaign Name
          </label>
          <input
            type="text"
            placeholder="Enter campaign name"
            value={campaignData.name}
            onChange={(e) =>
              setCampaignData({ ...campaignData, name: e.target.value })
            }
            className="w-full px-3 py-3 bg-zinc-800/50 border border-zinc-700 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-zinc-600"
          />
        </div>
        <div className="w-full">
          <label className="block text-[16px] text-[#A7A7A7] mb-2">
            Target URL
          </label>
          <input
            type="text"
            placeholder="Paste here..."
            value={campaignData.url}
            onChange={(e) =>
              setCampaignData({ ...campaignData, url: e.target.value })
            }
            className="w-full px-3 py-3 bg-zinc-800/50 border border-zinc-700 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-zinc-600"
          />
        </div>
      </div>

      {/* Provider Section */}
      <div className="mt-8">
        <h3 className="text-md font-medium">Provider and objectives</h3>
        <p className="text-zinc-400">Choose platform and its objective</p>

        {campaignData.platforms.map((platform, index) => (
          <div className="mt-3 flex gap-3" key={platform.name}>
            <div className="relative w-72">
              <select
                value={platform.objective}
                onChange={(e) => handleObjectiveChange(index, e.target.value)}
                className="px-3 py-3 w-full border border-zinc-700 rounded-[8px] bg-[#272729] appearance-none focus:outline-none focus:ring-1 focus:ring-zinc-600"
              >
                <option value="">Select an objective</option>
                {objectives.map((obj) => (
                  <option key={obj} value={obj}>
                    {obj}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-4 w-4 h-4 text-zinc-400 pointer-events-none" />
            </div>
            <div
              onClick={() => handlePlatformEnable(index)}
              className={`px-3 py-3 flex w-full justify-between items-center border border-zinc-700 rounded-[8px] bg-[#272729] cursor-pointer`}
            >
              <div className="flex items-center gap-2">
                <img
                  src={getPlatformIcon(platform.name)}
                  alt={platform.name}
                  className="w-5 h-5"
                />
                <span className="text-sm font-medium">{platform.name}</span>
              </div>
              <div
                className={`w-10 h-5 rounded-full relative transition ${
                  platform.enabled ? "bg-[#3570BC]" : "bg-zinc-700"
                }`}
              >
                <div
                  className={`absolute top-[2px] w-4 h-4 rounded-full transition-all ${
                    platform.enabled
                      ? "left-[22px] bg-white"
                      : "left-[2px] bg-zinc-500"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ad Location */}
      <div className="mt-8">
        <h3 className="text-md font-medium">Ad Location</h3>
        <p className="text-zinc-400">
          Choose where you want to show your campaign
        </p>

        {campaignData.platforms.map((platform, index) => (
          <div key={platform.name} className="mt-3 flex gap-3">
            <div className="px-3 py-3.5 flex w-full justify-between items-center border border-zinc-700 rounded-[8px] bg-[#272729]">
              <div className="flex items-center gap-2">
                <img
                  src={getPlatformIcon(platform.name)}
                  alt={platform.name}
                  className="w-5 h-5"
                />
                <span className="text-sm font-medium">{platform.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {Object.entries(platform.locations).map(([loc, isOn]) => (
                  <div className="flex items-center gap-2" key={loc}>
                    <div
                      onClick={() => handleToggle(index, loc)}
                      className={`w-10 h-5 rounded-full relative cursor-pointer transition ${
                        isOn ? "bg-[#3570BC]" : "bg-zinc-700"
                      }`}
                    >
                      <div
                        className={`absolute top-[2px] w-4 h-4 rounded-full transition-all ${
                          isOn
                            ? "left-[22px] bg-white"
                            : "left-[2px] bg-zinc-500"
                        }`}
                      />
                    </div>
                    <div className="text-sm font-medium">{loc} </div>
                    {loc === "Feed" ? (
                      <div className="h-[26px] w-[2px] bg-[#393939] mx-12" />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step1;
