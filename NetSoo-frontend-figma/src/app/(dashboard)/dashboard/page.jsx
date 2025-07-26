"use client";

import AdCampaigns from "@/components/dashboard/home/AdCampaigns";
import { AIRecommendations } from "@/components/dashboard/home/AIRecommendationProps";
import CurrentPlan from "@/components/dashboard/home/CurrentPlan";
import { QuickInbox } from "@/components/dashboard/home/QuickInbox";
import { ScheduledPosts } from "@/components/dashboard/home/ScheduledPosts";
import SmartLinksPerformance from "@/components/dashboard/home/SmartLinksPerformance";
import SocialNetworkChart from "@/components/dashboard/home/SocialNetworkChart";
import Layout from "@/components/dashboard/Layout";
import { MetricCard } from "@/components/dashboard/virality/MetricCard";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useMetrics } from '@/context/MetricsContext';
import { useConversations } from "@/context/ConversationsContext";
import { usePost } from "@/context/PostContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useUserConnections } from "@/context/UserConnectionsContext";
import { CustomButton } from "@/components/ui/custom-button";

export default function DashboardPage() {
  const { insightMetrics, loading: metricsLoading, error } = useMetrics();
  const { userPosts, loading: postsLoading, fetchPosts } = usePost();
  const { userConversations, conversationsLoading, conversationsError } = useConversations();
  const { userConnections, userConnectionsLoading, userConnectionsError, userConnectionsChecked } = useUserConnections();

  const router = useRouter();
  const { user, fetchUser,  isAuthenticated, isAuthChecked, setUser } = useUser(); 

  const [ inboxMessages, setInboxMessages ] = useState([]);
  const [ scheduledPosts, setScheduledPosts ] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const socialData = {
    network: "Instagram",
    weeks: ["Week 1", "Week 2", "Week 3", "Week 4"],
    values: [15000, 23432, 18000, 25000],
    min: 0,
    max: 75000,
  };

  const aiRecommendation = {
    score: 8.4,
    platform: "TikTok",
    thumbnail: "/dashboard/dummyPost1.png",
    tip: "Tip: use more dynamic subtitles and change shots every 3 seconds.",
  };
  const [metrics, setMetrics] = useState({
    views: {
      value: 0,
      changePercentage: 0,
      subtext: "Last 7 days",
      data: [
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 },
      ],
      isPositive: false,
    },
    engagement: {
      value: 0,
      changePercentage: 0,
      subtext: "Likes, Shares and Comments",
      data: [
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 },
        { value: 0 },
      ],
      isPositive: false,
    }
  });

  const formatCustomDate = (dateInput) => {
    const dateObj = new Date(dateInput);
  
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const monthName = months[dateObj.getMonth()];
    const day = dateObj.getDate();
  
    let hours = dateObj.getHours();
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours; // convert 0 to 12 for 12 AM/PM
  
    return `${monthName} ${day} at ${hours}:${minutes} ${ampm}`;
  };
  

  useEffect(() => {
    // [
    //   {
    //     id: 1,
    //     name: "Esther Howard",
    //     message: "Hey There what's up? Is everything ok?",
    //     time: "04:43",
    //     avatar: "/dashboard/dummy-image.jpg",
    //     unread: 2,
    //     platform: "instagram",
    //   },

    let newConversations = [];
    for (const conversation of userConversations)
    {
      const dateObj = new Date(conversation.updated_at);

      const formattedConversationTime = `${String(dateObj.getDate()).padStart(2, '0')}/${
        String(dateObj.getMonth() + 1).padStart(2, '0')
      } ${String(dateObj.getHours()).padStart(2, '0')}:${
        String(dateObj.getMinutes()).padStart(2, '0')
      }`;
      newConversations.push({
        id : conversation.conversation_id,
        name : conversation.participant_name,
        avatar: "/dashboard/dummy-image.jpg",
        platform: "facebook",
        message : conversation.last_message,
        time : formattedConversationTime,
        unread : 0,
      });
    }
    setInboxMessages(newConversations);

  }, [userConversations])

  useEffect(() => {
    // {
    //   id: 1,
    //   title: "Post title goes here",
    //   scheduledFor: "March 25 at 10:00 AM",
    //   avatar: "/dashboard/dummyPost1.png",
    //   isNext: true,
    //   platform: "instagram",
    // },
    let newPosts = [];
    for (const post of userPosts)
    {
      
      let postDate = new Date(post.scheduled_time);
      console.log(post);
    
      // formattedDate = formattedDate.replace(",", " at");
      newPosts.push({
        id : post.id,
        title : post.post_group_title,
        scheduledFor : formatCustomDate(postDate),
        avatar : "",
        image : post.image,
        video : post.video,
        isNext : true,
        platform: post.platforms[0]
      });
    }

    setScheduledPosts(newPosts);
  }, [userPosts]);


  useEffect(() => {
    console.log("insightMetrics",insightMetrics);
    const cardMetrics = {};
    let total_views = 0;
    let total_engagement = 0;
    let view_aggregate_7_days = [];
    let engagement_aggregate_7_days = [];

    // Extracting views data
    for (let i = 0; i < 7; i++)
    {
      view_aggregate_7_days.push({"value": 0});
      engagement_aggregate_7_days.push({"value": 0});
    }



    Object.keys(insightMetrics).forEach((platform) => {
      const recentData = insightMetrics[platform].slice(-7); // 🔹 Get last 7 entries
      let i = 0;
      for (const platformData of recentData)
      {
        total_views += platformData.post_views; 
        view_aggregate_7_days[i].value += platformData.post_views;
        
        if (platform === "instagram")
        {
          total_engagement += platformData.engagement;
          engagement_aggregate_7_days[i].value += platformData.engagement;
          
        }
        else if (platform === "tiktok")
        {
          total_engagement += (platformData.likes + platformData.shares + platformData.comments);
          engagement_aggregate_7_days[i].value += (platformData.likes + platformData.shares + platformData.comments);
        }
        i += 1;
      }
    });

    cardMetrics["views"] = {
      value: total_views,
      changePercentage: 0,
      subtext: "Last 7 days",
      data: view_aggregate_7_days,
      isPositive: false,
    }

    console.log("engagement_aggregate_7_days", engagement_aggregate_7_days);
    cardMetrics["engagement"] = {
      value: total_engagement,
      changePercentage: 0,
      subtext: "Last 7 days",
      data: engagement_aggregate_7_days,
      isPositive: false,
    }

    setMetrics(cardMetrics);
  }, [insightMetrics])

  if (!isAuthenticated) { return null}


  if (userConnectionsChecked && userConnections.length === 0) 
    {
      return (
        <Layout>
          <div className="flex h-full justify-center items-center flex-col space-y-4  ">
          <img src={"/dashboard/NoAnalyticsYet.svg"} alt="" />
          <h2 className="text-3xl font-bold text-white">No Dashboard Data Yet</h2>
          <p className="text-white/80 text-center">
            You haven't connected any social accounts. Once you
            <br /> connect your accounts, we'll have a summary of all your activity right here.
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
      <div className="grid grid-cols-6 md:grid-cols-12 gap-5 ">
        <div className="col-span-6 md:col-span-7">
          <div className="flex flex-col md:flex-row gap-3">
            <MetricCard
              title="TOTAL VIEWS"
              value={metrics.views.value}
              changePercentage={metrics.views.changePercentage}
              subtext={metrics.views.subtext}
              data={metrics.views.data}
              isPositive={metrics.views.isPositive}
            />

            <MetricCard
              title="ENGAGEMENT GLOBAL"
              value={metrics.engagement.value}
              changePercentage={metrics.engagement.changePercentage}
              subtext={metrics.engagement.subtext}
              data={metrics.engagement.data}
              isPositive={metrics.engagement.isPositive}
            />

            {/* <MetricCard
              title="AVERAGE ROI"
              value={metrics.views.value}
              changePercentage={metrics.views.changePercentage}
              subtext={metrics.views.subtext}
              data={metrics.views.data}
              isPositive={metrics.views.isPositive}
            /> */}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
            <div className="border border-[#FFFFFF30] rounded-[20px] p-4 bg-[#FFFFFF05]">
              <div className="text-white mb-2 border-b border-[#353535] pb-3">
                <h2 className="text-2xl ">
                  05<span className="text-sm text-[#FFFFFF99]">/Posts</span>
                </h2>
                <h3 className="font-medium">Posts scheduled</h3>
                <p className="text-sm text-[#FFFFFF99]">
                  Number of posts scheduled this week.
                </p>
              </div>
              <ScheduledPosts posts={scheduledPosts} />
              <Link href={"/dashboard/schedule"}>
                <button className=" cursor-pointer flex gap-1 items-center text-[#FFFFFFCC] mt-5 text-sm border border-[#FFFFFF30] rounded-[8px] p-3">
                  <svg
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8" clipPath="url(#clip0_2798_28939)">
                      <path
                        d="M5.16602 4.6665H4.49935C4.14573 4.6665 3.80659 4.80698 3.55654 5.05703C3.30649 5.30708 3.16602 5.64622 3.16602 5.99984V11.9998C3.16602 12.3535 3.30649 12.6926 3.55654 12.9426C3.80659 13.1927 4.14573 13.3332 4.49935 13.3332H10.4993C10.853 13.3332 11.1921 13.1927 11.4422 12.9426C11.6922 12.6926 11.8327 12.3535 11.8327 11.9998V11.3332"
                        stroke="white"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.09 4.39007C14.3526 4.12751 14.5001 3.77139 14.5001 3.40007C14.5001 3.02875 14.3526 2.67264 14.09 2.41007C13.8274 2.14751 13.4713 2 13.1 2C12.7287 2 12.3726 2.14751 12.11 2.41007L6.5 8.00007V10.0001H8.5L14.09 4.39007Z"
                        stroke="white"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.166 3.3335L13.166 5.3335"
                        stroke="white"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2798_28939">
                        <rect
                          width="16"
                          height="16"
                          fill="white"
                          transform="translate(0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  Edit Schedule
                </button>
              </Link>
            </div>
            <div className="border border-[#FFFFFF30] rounded-[20px] p-4 bg-[#FFFFFF05]">
              <h2 className="text-white text-lg font-medium mb-3">
                Quick Inbox
              </h2>
              <QuickInbox messages={inboxMessages} />
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-5">
          <SocialNetworkChart highlightedWeek="Week 3" />
          <AIRecommendations recommendation={aiRecommendation} />
        </div>
        {/* <div className="col-span-6 md:col-span-3">
          <CurrentPlan />
        </div> */}
        {/* <div className="col-span-6 md:col-span-9">
          <SmartLinksPerformance />
        </div> */}
        {/* <div className="col-span-6 md:col-span-12">
          <AdCampaigns />
        </div> */}
      </div>
    </Layout>
  );
}
