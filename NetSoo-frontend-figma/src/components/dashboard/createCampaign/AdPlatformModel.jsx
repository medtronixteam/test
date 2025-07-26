import { getPlatformIcon } from "@/utils/getPlatformIcon";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const platforms = [
  "Website",
  "Blog",
  "Facebook",
  "Instagram",
  "Threads",
  "Twitter",
  "Bluesky",
  "LinkedIn",
  "Pinterest",
  "Tiktok Personal",
  "Tiktok Business",
  "Google Business Profile",
  "YouTube",
  "Twitch",
  "Meta Ads",
  "Google Ads",
  "Tiktok Ads",
  "Looker Studio",
];

const AdPlatformModel = ({ setIsCreateModalOpen }) => {
  const modalRef = useRef();
  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("Select");
  const [errorMessage, setErrorMessage] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const handleLaunch = () => {
    if (selectedNetwork === "Select") {
      setErrorMessage("Please select a platform.");
      return;
    }
    if (!campaignName.trim()) {
      setErrorMessage("Please enter a campaign name.");
      return;
    }

    setErrorMessage("");

    const encodedCampaign = encodeURIComponent(campaignName.trim());
    router.push(`/dashboard/campaigns/${encodedCampaign}`);
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!modalRef.current) return;

      const isGoogleMapOrAutocomplete =
        e.target.closest(".pac-container") || e.target.closest(".gm-style");

      if (!modalRef.current.contains(e.target) && !isGoogleMapOrAutocomplete) {
        setIsCreateModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside, true);
  }, [setIsCreateModalOpen]);
  return (
    <div>
      <div className="fixed inset-0 backdrop-blur-[12px] bg-[#17171780] flex items-center justify-center z-50">
        <div
          ref={modalRef}
          className=" p-6 bg-[#FFFFFF0A] backdrop-blur-[120.57px] w-full max-w-2xl max-h-[560px] min-h-[560px] overflow-auto border border-[#FFFFFF30] rounded-[20px]"
        >
          <h1 className="text-white text-2xl md:text-3xl font-semibold text-center mb-14">
            Choose a Platform to <br />
            Launch Your Ad
          </h1>
          <p className="text-white mb-3">Select Platform</p>
          <div className="relative w-full">
            <div
              className="px-4 py-4 flex w-full justify-between items-center  border border-[#FFFFFF30] rounded-[8px] cursor-pointer text-md text-white"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="flex items-center gap-2">
                {selectedNetwork !== "Select" && (
                  <img
                    src={getPlatformIcon(selectedNetwork.toLowerCase())}
                    alt={selectedNetwork}
                    className="w-5 h-5"
                  />
                )}
                <span>{selectedNetwork}</span>
              </div>
              <ChevronDown className="w-5 h-5" />
            </div>

            {dropdownOpen && (
              <div className="absolute z-10 mt-1 bg-[#1e1e1e] border border-[#FFFFFF30] rounded-[8px] w-full max-h-40 overflow-auto text-sm text-white">
                {platforms.map((platform) => (
                  <div
                    key={platform}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-[#333] cursor-pointer text-md"
                    onClick={() => {
                      setSelectedNetwork(platform);
                      setDropdownOpen(false);
                    }}
                  >
                    {platform !== "Select" && (
                      <img
                        src={getPlatformIcon(platform.toLowerCase())}
                        alt={platform}
                        className="w-5 h-5"
                      />
                    )}
                    {platform}
                  </div>
                ))}
              </div>
            )}
          </div>
          <p className="text-white my-2">Campaign Name</p>
          <input
            type="text"
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            placeholder="Enter your campaign name"
            className="w-full px-4 py-4 mb-3 text-white bg-transparent border border-[#FFFFFF30] rounded-[8px] outline-none"
          />
          {errorMessage && (
            <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
          )}
          <p className="text-white/60 my-2">
            All campaign analytics will still be tracked within NetSoo
            automatically.
          </p>
          <div className="mt-16 flex justify-center gap-3">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="min-w-[160px] px-4 py-4 border border-[#FFFFFF30] bg-transparent text-white rounded-[138px] font-medium cursor-pointer "
            >
              Cancel
            </button>
            <button
              onClick={handleLaunch}
              className="min-w-[160px] px-4 py-4 bg-[#3570BC] font-medium text-white rounded-[138px] cursor-pointer"
            >
              Launch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdPlatformModel;
