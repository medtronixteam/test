"use client";

import Layout from "@/components/dashboard/Layout";
import { CustomButton } from "@/components/ui/custom-button";
import {
  ChevronDown,
  Download,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Facebook,
  ArrowUp,
} from "lucide-react";
import Link from "next/link";
import SocialNetworkChart from "@/components/dashboard/home/SocialNetworkChart";
import { useUserConnections } from "@/context/UserConnectionsContext";
import { useMetrics } from "@/context/MetricsContext";
import Graph from "@/components/dashboard/analytics/Graph";
import { useState, useEffect } from "react";
import { getPlatformIcon } from "@/utils/getPlatformIcon";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";


const AnalyticsPage = () => {
  const {userConnections, userConnectionsLoading, userConnectionsError, userConnectionsChecked} = useUserConnections();
  const {insightMetrics, loading, error} = useMetrics();

  const [platformMetrics, setPlatformMetrics] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);

  const [selectedRange, setSelectedRange] = useState("Last 10 days");
  const [rangeDropdownOpen, setRangeDropdownOpen] = useState(false);

  const [platforms, setPlatforms] = useState([]);
  const dateRanges = ["Last 7 days", "Last 10 days", "Last 30 days"];

  const { user, fetchUser,  isAuthenticated, isAuthChecked, setUser } = useUser(); 
  const router = useRouter();


  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);


  if (!isAuthenticated) { return null}

  useEffect(()=> {
    const keysList = Object.keys(insightMetrics);
    setPlatforms(keysList);
    if (!selectedPlatform && keysList.length > 0)
    {
      setSelectedPlatform(keysList[0]);
    }
    let singlePlatformMetrics = insightMetrics[selectedPlatform];
    let filteredMetrics = [];
    if (singlePlatformMetrics){
      if (selectedRange === "Last 7 days"){
        filteredMetrics = singlePlatformMetrics.slice(-7); 
      }
      else if (selectedRange === "Last 10 days"){
        filteredMetrics = singlePlatformMetrics.slice(-10); 
      }
      else {
        filteredMetrics = singlePlatformMetrics.slice(-30); 
      }
    }

    setPlatformMetrics(filteredMetrics);    
  }, [insightMetrics, selectedRange, selectedPlatform]);

  const renderPlatformMetrics = (platform) => {
    switch (platform) {
      case "facebook":
        return (
          <>
          </>
        );

      case "instagram":
        return (
          <>
          <div className="col-span-6 md:col-span-5">
            <Graph 
            title={"Followers"}
            dataX={platformMetrics.map(item => item.date)}
            xKey={"Date"}
            dataY={platformMetrics.map(item => item.followers_count)}
            yKey={"Followers"}
            highlightedX={2}
            />
          </div>
          <br></br>
          <div className="col-span-6 md:col-span-5">
              <Graph 
              title={"Reach"}
              dataX={platformMetrics.map(item => item.date)}
              xKey={"Date"}
              dataY={platformMetrics.map(item => item.reach)}
              yKey={"Reach"}
              highlightedX={2}
              />
          </div>
          <br></br>
          <div className="col-span-6 md:col-span-5">
              <Graph 
              title={"Likes"}
              dataX={platformMetrics.map(item => item.date)}
              xKey={"Date"}
              dataY={platformMetrics.map(item => item.likes)}
              yKey={"Likes"}
              highlightedX={2}
              />
          </div>
          <br></br>
          <div className="col-span-6 md:col-span-5">
              <Graph 
              title={"Media Count"}
              dataX={platformMetrics.map(item => item.date)}
              xKey={"Date"}
              dataY={platformMetrics.map(item => item.media_count)}
              yKey={"Media Count"}
              highlightedX={2}
              />
          </div>
          <br></br>
          <div className="col-span-6 md:col-span-5">
              <Graph 
              title={"Engagement"}
              dataX={platformMetrics.map(item => item.date)}
              xKey={"Date"}
              dataY={platformMetrics.map(item => item.engagement)}
              yKey={"Engagement"}
              highlightedX={2}
              />
          </div>
          <br></br>
          </>
        );
      case "tiktok":
        return (
          <>
            <div className="col-span-6 md:col-span-5">
            <Graph 
              title={"Followers"}
              dataX={platformMetrics.map(item => item.date)}
              xKey={"Date"}
              dataY={platformMetrics.map(item => item.followers_count)}
              yKey={"Followers"}
              highlightedX={2}
              />
            </div>
            <br></br>
            <div className="col-span-6 md:col-span-5">
            <Graph 
              title={"Media Count"}
              dataX={platformMetrics.map(item => item.date)}
              xKey={"Date"}
              dataY={platformMetrics.map(item => item.media_count)}
              yKey={"Media Count"}
              highlightedX={2}
              />
            </div>
            <br></br>
            <div className="col-span-6 md:col-span-5">
            <Graph 
              title={"Likes"}
              dataX={platformMetrics.map(item => item.date)}
              xKey={"Date"}
              dataY={platformMetrics.map(item => item.likes)}
              yKey={"Likes"}
              highlightedX={2}
              />
            </div>
            <br></br>
            <div className="col-span-6 md:col-span-5">
            <Graph 
              title={"Shares"}
              dataX={platformMetrics.map(item => item.date)}
              xKey={"Date"}
              dataY={platformMetrics.map(item => item.shares)}
              yKey={"Shares"}
              highlightedX={2}
              />
            </div>
            <br></br>
            <div className="col-span-6 md:col-span-5">
            <Graph 
              title={"Post Views"}
              dataX={platformMetrics.map(item => item.date)}
              xKey={"Date"}
              dataY={platformMetrics.map(item => item.post_views)}
              yKey={"Views"}
              highlightedX={2}
              />
            </div>
            <br></br>
          </>
        );
      }
  };


  if (userConnectionsChecked && userConnections.length === 0) 
  {
    return (
      <Layout>
        <div className="flex h-full justify-center items-center flex-col space-y-4  ">
        <img src={"/dashboard/NoAnalyticsYet.svg"} alt="" />
        <h2 className="text-3xl font-bold text-white">No Analytics Yet</h2>
        <p className="text-white/80 text-center">
          You haven't connected any social accounts. Once you
          <br /> connect your accounts, we'll track performance right here.
        </p>
        <div>
          <Link href={"/dashboard/connections"} className="">
            <CustomButton className="w-full px-12">
              Connect Social Accounts
            </CustomButton>
          </Link>
        </div>

        </div> 
      </Layout>
   )
  }

  return (
    <Layout>
    <div className="min-h-screen text-white p-4">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold w-full sm:w-auto">Analytics</h1>
        {selectedPlatform && (
          <div className="flex flex-wrap items-center gap-4">

            {/* Platform Dropdown */}
            <div className="relative w-full md:w-48">
              <div
              className="px-4 py-3 flex w-full justify-between items-center border border-[#FFFFFF30] rounded-[8px] cursor-pointer"
              onClick={() => setPlatformDropdownOpen((prev) => !prev)}
              >
                  <img
                  src={getPlatformIcon(selectedPlatform.toLowerCase())}
                  alt={selectedPlatform}
                  className="w-5 h-5"
                />
                <span>{selectedPlatform}</span>
                <ChevronDown size={16} />
              </div>

              {platformDropdownOpen && (
                <div className="absolute z-10 mt-2 bg-gray-800 rounded shadow-lg w-full">
                  {platforms.map((platform) => (
                    <div
                      key={platform}
                      onClick={() => {
                        setSelectedPlatform(platform);
                        setPlatformDropdownOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    >
                      {platform}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Date Range Dropdown */}
            <div className="relative w-full md:w-48">
              <div
                className="px-4 py-3 flex w-full justify-between items-center border border-[#FFFFFF30] rounded-[8px] cursor-pointer"
                onClick={() => setRangeDropdownOpen((prev) => !prev)}
                >
                <span>{selectedRange}</span>
                <ChevronDown size={16} />
              </div>

              {rangeDropdownOpen && (
                <div className="absolute z-10 mt-2 bg-gray-800 rounded shadow-lg w-full">
                  {dateRanges.map((range) => (
                    <div
                      key={range}
                      onClick={() => {
                        setSelectedRange(range);
                        setRangeDropdownOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    >
                      {range}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Export Button */}
            {/* <button className="flex items-center space-x-2 bg-gray-800 rounded-md px-3 py-2">
              <Download size={16} />
              <span>Export</span>
            </button> */}
          </div>
        )}
      </div>


      
      {renderPlatformMetrics(selectedPlatform)}
    </div>
    </Layout>
  );
};

export default AnalyticsPage;
