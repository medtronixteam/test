import Pagination from "@/components/Pagination";
import { getPlatformIcon } from "@/utils/getPlatformIcon";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const AdCampaigns = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(5);
  const [selectedNetwork, setSelectedNetwork] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const campaigns = [
    {
      id: 1,
      platform: "instagram",
      name: "Campaign Name Goes here",
      objective: "App Installs",
      strategy: "Lowest Cost Without Cap",
      dailyBudget: "23.00 USD",
      lifetimeBudget: "100,000 USD",
      spend: "23.00 USD",
      impressions: "2,532",
      active: false,
    },
    {
      id: 2,
      platform: "instagram",
      name: "Campaign Name Goes here",
      objective: "App Installs",
      strategy: "Lowest Cost Without Cap",
      dailyBudget: "23.00 USD",
      lifetimeBudget: "100,000 USD",
      spend: "23.00 USD",
      impressions: "2,532",
      active: true,
    },
    {
      id: 3,
      platform: "facebook",
      name: "Campaign Name Goes here",
      objective: "App Installs",
      strategy: "Lowest Cost Without Cap",
      dailyBudget: "23.00 USD",
      lifetimeBudget: "100,000 USD",
      spend: "23.00 USD",
      impressions: "2,532",
      active: false,
    },
    {
      id: 4,
      platform: "facebook",
      name: "Campaign Name Goes here",
      objective: "App Installs",
      strategy: "Lowest Cost Without Cap",
      dailyBudget: "23.00 USD",
      lifetimeBudget: "100,000 USD",
      spend: "23.00 USD",
      impressions: "2,532",
      active: true,
    },
    {
      id: 5,
      platform: "instagram",
      name: "Campaign Name Goes here",
      objective: "App Installs",
      strategy: "Lowest Cost Without Cap",
      dailyBudget: "23.00 USD",
      lifetimeBudget: "100,000 USD",
      spend: "23.00 USD",
      impressions: "2,532",
      active: true,
    },
    {
      id: 6,
      platform: "linkedIn",
      name: "Campaign Name Goes here",
      objective: "App Installs",
      strategy: "Lowest Cost Without Cap",
      dailyBudget: "23.00 USD",
      lifetimeBudget: "100,000 USD",
      spend: "23.00 USD",
      impressions: "2,532",
      active: false,
    },
    {
      id: 7,
      platform: "tikTok",
      name: "Campaign Name Goes here",
      objective: "App Installs",
      strategy: "Lowest Cost Without Cap",
      dailyBudget: "23.00 USD",
      lifetimeBudget: "100,000 USD",
      spend: "23.00 USD",
      impressions: "2,532",
      active: false,
    },
    {
      id: 8,
      platform: "facebook",
      name: "Campaign Name Goes here",
      objective: "App Installs",
      strategy: "Lowest Cost Without Cap",
      dailyBudget: "23.00 USD",
      lifetimeBudget: "100,000 USD",
      spend: "23.00 USD",
      impressions: "2,532",
      active: false,
    },
  ];

  const platforms = [
    "All",
    ...Array.from(new Set(campaigns.map((c) => c.platform))),
  ];

  const filteredCampaigns =
    selectedNetwork === "All"
      ? campaigns
      : campaigns.filter((c) => c.platform === selectedNetwork.toLowerCase());

  const displayedCampaigns = filteredCampaigns.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <div>
      {" "}
      <div className="border border-[#FFFFFF30] rounded-[20px]">
        <div className=" p-5 bg-[#1F1F1F] rounded-t-[20px]">
          <div className="text-xs text-gray-400">Ad Campaigns</div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <h2 className="text-lg font-semibold">Ad Campaigns</h2>
            <div className="relative w-full md:w-48">
              <div
                className="px-4 py-3 flex w-full justify-between items-center border border-[#FFFFFF30] rounded-[8px] cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="flex items-center gap-2">
                  {selectedNetwork !== "All" && (
                    <img
                      src={getPlatformIcon(selectedNetwork.toLowerCase())}
                      alt={selectedNetwork}
                      className="w-5 h-5"
                    />
                  )}
                  <span className="text-white">{selectedNetwork}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-white" />
              </div>

              {dropdownOpen && (
                <div className="absolute z-10 mt-1 bg-[#1e1e1e] border border-[#FFFFFF30] rounded-[8px] w-full max-h-48 overflow-auto">
                  {platforms.map((platform) => (
                    <div
                      key={platform}
                      className="flex items-center gap-2 px-4 py-2 text-white hover:bg-[#333] cursor-pointer"
                      onClick={() => {
                        setSelectedNetwork(platform);
                        setDropdownOpen(false);
                        setCurrentPage(1);
                      }}
                    >
                      {platform !== "All" && (
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
          </div>
        </div>

        <div className="bg-[#FFFFFF05]  overflow-x-auto max-w-[92vw] md:max-w-[calc(100vw-300px)]">
          <table className="min-w-4xl w-full text-sm text-left text-white">
            <thead className="bg-[#2A2A2A] text-gray-400 text-nowrap">
              <tr>
                <th className="py-5 px-2">Campaign</th>
                <th className="py-5 px-2">Platform</th>
                <th className="py-5 px-2">Objective</th>
                <th className="py-5 px-2">Strategy</th>
                <th className="py-5 px-2">Daily Budget</th>
                <th className="py-5 px-2">Lifetime Budget</th>
                <th className="py-5 px-2">Spend</th>
                <th className="py-5 px-2">Impressions</th>
              </tr>
            </thead>
            <tbody>
              {displayedCampaigns.map((campaign) => (
                <tr
                  key={campaign.id}
                  className="bg-[#1F1F1F] border-b border-[#2A2A2A] hover:bg-[#222222] transition-colors text-nowrap"
                >
                  <td className="py-4 px-2">
                    <div className="flex gap-4 items-center">
                      <div
                        className={`w-10 h-5 transition-colors duration-300 ${
                          campaign.active ? "bg-[#3570BC]" : "bg-gray-700"
                        } rounded-full flex items-center cursor-pointer`}
                      >
                        <div
                          className={`w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                            campaign.active ? "ml-5" : "ml-0.5"
                          }`}
                        ></div>
                      </div>
                      <span>{campaign.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <img
                      src={getPlatformIcon(campaign.platform)}
                      alt={campaign.platform}
                      className="w-6 h-6"
                    />
                  </td>
                  <td className="py-4 px-2">{campaign.objective}</td>
                  <td className="py-4 px-2">{campaign.strategy}</td>
                  <td className="py-4 px-2">{campaign.dailyBudget}</td>
                  <td className="py-4 px-2">{campaign.lifetimeBudget}</td>
                  <td className="py-4 px-2">{campaign.spend}</td>
                  <td className="py-4 px-2">{campaign.impressions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={filteredCampaigns.length}
          itemsPerPage={cardsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={(val) => {
            setCardsPerPage(val);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
};

export default AdCampaigns;
