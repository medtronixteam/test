"use client";

import { useState, useEffect } from "react";
import { getPlatformIcon } from "@/utils/getPlatformIcon";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { getAllConnections, getConnectionOAuthURL, deletePlatform } from "@/api/connections";
import { useUserConnections } from "@/context/UserConnectionsContext";
import FacebookPageSelectModal from "./FacebookPageSelectModal";

const backendURL = process.env.NEXT_PUBLIC_API_URL;

const socialNetworks = [
  // { id: 1, name: "Website", connectText: "Connect a Web page", enabled: false, link: ""},
  // { id: 2, name: "Blog", connectText: "Connect a blog", enabled: false, link: "" },
  { id: 3, name: "Facebook", connectText: "Connect to Facebook", enabled: true, link: backendURL + "social-accounts/facebook/auth/" },
  { id: 4, name: "Instagram", connectText: "Connect a Instagram page", enabled: true, link: backendURL + "social-accounts/instagram/auth/" },
  // { id: 5, name: "Threads", connectText: "Connect a Threads account", enabled: false, link: "" },
  // { id: 6, name: "Twitter", connectText: "Connect a twitter / X account", enabled: false, link: "" },
  // { id: 7, name: "Bluesky", connectText: "Connect a Bluesky account", enabled: false, link: "" },
  // { id: 8, name: "LinkedIn", connectText: "Connect a Linkedin account", enabled: false, link: "" },
  // { id: 9, name: "Pinterest", connectText: "Connect a Pinterest account", enabled: false, link: "" },
  {
    id: 10,
    name: "Tiktok",
    connectText: "Connect a Tiktok personal account", 
    enabled: true, 
    link: backendURL + "social-accounts/tiktok/auth/"
  },
  // {
  //   id: 11,
  //   name: "Tiktok Business",
  //   connectText: "Connect a Tiktok business account",
  //   enabled: false, 
  //   link: backendURL + "social-accounts/tiktok/auth/"
  // },
  // {
  //   id: 12,
  //   name: "Google Business Profile",
  //   connectText: "Connect a Google Business Profile",
  //   enabled: false, 
  //   link: ""
  // },
  // { id: 13, name: "YouTube", connectText: "Connect a YouTube account", enabled: false, link: "" },
  // { id: 14, name: "Twitch", connectText: "Connect a Twitch account", enabled: false, link: "" },
  // { id: 15, name: "Meta Ads", connectText: "Connect to Meta Ads Account", enabled: false, link: "" },
  // { id: 16, name: "Google Ads", connectText: "Connect a Google Ads account", enabled: false, link: "" },
  // { id: 17, name: "Tiktok Ads", connectText: "Connect a Tiktok Ads account", enabled: false, link: "" },
  // { id: 18, name: "Looker Studio", connectText: "Connect Looker Studio", enabled: false, link: "" },
];
const SocialNetworkScreen1 = () => {
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [connectionsUpdated, setConnectionsUpdated] = useState(true);
  const [showFacebookModal, setShowFacebookModal] = useState(false);
  const [facebookPages, setFacebookPages] = useState([]);
  const [facebookConnected, setFacebookConnected] = useState([]);
  const [oauthURL, setOauthURL] = useState(null);
  const searchParams = useSearchParams();
  const { userConnections, userConnectionsLoading, refreshConnections, userConnectionsChecked, userConnectionsError } = useUserConnections();

  // useEffect(() => {
  //   const getActiveConnections = async () => {
  //     // console.log("userConnectionsChecked", userConnectionsChecked);
  //     if (userConnectionsChecked){
  //       const activeConnections = userConnections;
  //       console.log(activeConnections);
  //       setConnectedAccounts(activeConnections);
  //       setConnectionsUpdated(false);
  //     }
  //   }
  //   getActiveConnections();
  // }, [connectionsUpdated, userConnections, userConnectionsChecked]);


  // useEffect(() => {
  //   if (searchParams.get("action") === 'fb_page_select') {
  //     console.log("userConnections", userConnections);
  //     if (userConnections.length > 0){
  //       const activeConnections = userConnections;
  //       const isConnected = activeConnections.some(account => account.platform === "facebook" && account.account_title);
  //       if (!isConnected){
  //         console.log("searchParams", searchParams);
  //         const pageNamesList = searchParams.get("action_params").split(",").map(name => name.trim());
  //         const pageDictList = pageNamesList.map(label => ({ label }));
  //         setFacebookPages(pageDictList);
  //         setShowFacebookModal(true);
  //         setConnectionsUpdated(true);
  //       }
  //     }
  //   }

  // }, [searchParams, userConnections, userConnectionsLoading]);
// }, [searchParams]);

useEffect(() => {
  console.log("UseEffectTriggered");
  console.log(userConnections);
  console.log(userConnectionsChecked);
  console.log(searchParams);
  if (userConnectionsChecked && userConnections.length > 0) {
    setConnectedAccounts(userConnections);
    setConnectionsUpdated(false);
    
    // Handle FB Page Selection
    if (searchParams.get("action") === "fb_page_select") {
      const isConnected = userConnections.some(
        (acc) => acc.platform === "facebook" && acc.account_title
      );

      if (!isConnected) {
        const pageNamesList = searchParams
          .get("action_params")
          .split(",")
          .map((name) => name.trim());

        setFacebookPages(pageNamesList.map((label) => ({ label })));
        setShowFacebookModal(true);
        // setConnectionsUpdated(true);
      }
    }
  }
}, [userConnections, userConnectionsChecked, searchParams]);

  useEffect(() =>{
    if (oauthURL){
      window.location.href = oauthURL;
    }
  }, [oauthURL])
  
  useEffect(() => {
    const refreshAllConnections = async () => {
      if (connectionsUpdated)
      {
        console.log("connections updated.", connectionsUpdated);
        await refreshConnections();
      } 
    }
    refreshAllConnections();
  }, [connectionsUpdated]);

  useEffect(() => {
    if (!showFacebookModal)
    {
      console.log("Connects updated after fb modal close", connectionsUpdated);
      setConnectionsUpdated(true);
    }
  }, [showFacebookModal]);

  const handleRemoveConnected = async (platform) => {
    const token = localStorage.getItem("accessToken");
    const res = await deletePlatform(token, platform.toLowerCase());
    // console.log("removal", res);
    if (res.success){
      await refreshConnections();
      console.log("Removing connection", connectionsUpdated);
      setConnectionsUpdated(true);
    }
  };

  const [inputs, setInputs] = useState({});

  const handleInputChange = (id, value) => {
    setInputs((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleClearInput = (id) => {
    setInputs((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  
  const handleSocialMediaButtonClick = async (id) => {
    const token = localStorage.getItem("accessToken");
    let clickedSocialMedia = socialNetworks.find((network) => network.id === id);
    let platformOauthURL = await getConnectionOAuthURL(token, clickedSocialMedia.link);
    setOauthURL(platformOauthURL.auth_url);
  };

  return (
    <div className="mt-8">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {socialNetworks.map((network) => {
      const connected = connectedAccounts.find(
        (acc) => acc.platform.toLowerCase() === network.name.toLowerCase()
      );

      return (
        <div key={network.id} className="mb-6">
          {/* Platform name and icon */}
          <div className="flex items-center mb-2">
            <img
              src={getPlatformIcon(network.name)}
              alt={network.name}
              className="w-6 h-6 mr-2"
            />
            <span className="text-gray-300">{network.name}</span>
          </div>

          {connected ? (
            // If connected, show avatar + name + remove button
            <div className="flex items-center justify-between h-[57.5px] gap-4 p-2 bg-zinc-800/50 border border-zinc-700 rounded-[8px]">
              <div className="flex items-center gap-4">
                <img
                  src={connected.profile_picture_url || "/dashboard/dummy-image.jpg"}
                  alt={connected.account_title || ""}
                  className="w-[38px] h-[38px] rounded-full"
                />
                <div>
                  {/* <div className="text-sm text-gray-400">{connected.type}</div> */}
                  <div className="text-white font-medium text-sm">
                    {connected.account_title || ""}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleRemoveConnected(connected.platform)}
                className="text-gray-400 hover:text-red-500 transition-colors"
                title={`Disconnect ${connected.account_title}`}
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            // If not connected, show connect button (disabled or active)
            <div
              className={`flex items-center justify-between w-full p-4 border rounded-[8px]
                ${network.enabled
                  ? "bg-zinc-800/50 border-zinc-700"
                  : "bg-zinc-700/30 border-zinc-700 opacity-50 cursor-not-allowed"
                }`}
            >
              <button
              onClick={() => handleSocialMediaButtonClick(network.id)}
              key={network.id}
              disabled={!network.enabled}
              className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors border
                ${network.enabled
                  ? "bg-blue-600 text-white border-blue-700 hover:bg-blue-700"
                  : "bg-zinc-800 text-gray-500 border-zinc-700 cursor-not-allowed"
                }`}
              >
              
                {network.connectText}
              </button>

              {/* Optional icon or clear input (if applicable in future) */}
              <img
                src={getPlatformIcon(network.name)}
                alt={network.name}
                className="w-5 h-5 ml-2"
              />
            </div>
          )}
        </div>
      );
    })}
  </div>
  {showFacebookModal && (
    <FacebookPageSelectModal
          title="Choose a Platform"
          buttons={facebookPages}
          onClose={() => setShowFacebookModal(false)}
    >

    </FacebookPageSelectModal>
  )}
</div>
  );
};

export default SocialNetworkScreen1;
