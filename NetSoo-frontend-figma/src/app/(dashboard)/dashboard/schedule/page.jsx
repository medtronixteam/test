"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  Maximize,
  Clock,
  Plus,
  ChevronDown,
  Search,
} from "lucide-react";
import Layout from "@/components/dashboard/Layout";
import WeekTab from "@/components/schedule/WeekTab";
import DayTab from "@/components/schedule/DayTab";
import MonthTab from "@/components/schedule/MonthTab";
import Link from "next/link";
import CreatePostModel from "@/components/dashboard/createPost/CreatePostModel";
import SearchInput from "@/components/dashboard/SearchInput";
import { usePost } from "@/context/PostContext";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useUserConnections } from "@/context/UserConnectionsContext";
import { CustomButton } from "@/components/ui/custom-button";

const SchedulePage = () => {
  const { userPosts, loading } = usePost();
  const [currentView, setCurrentView] = useState("Week");

  // State for current date and selected date
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const [selectedPost, setSelectedPost] = useState(null);

  // Add a new state for the Best Times toggle
  const [showBestTimes, setShowBestTimes] = useState(false);

  // State for posts
  const [posts, setPosts] = useState([]);

  // State for create post modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { userConnections, userConnectionsLoading, userConnectionsError, userConnectionsChecked } = useUserConnections();

  
  const { user, isAuthenticated } = useUser(); 
  const router = useRouter();


  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);


  if (!isAuthenticated) { return null}


  // Generate sample posts on component mount
  useEffect(() => {
    setPosts(userPosts);
    console.log(posts);
  }, [userPosts]);

  useEffect(() => {
    setPosts(userPosts);
    if (!isCreateModalOpen){
      setSelectedPost(null);
    }
  }, [isCreateModalOpen])

  // Function to navigate to previous week/month
  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (currentView === "Day") {
      newDate.setDate(newDate.getDate() - 1);
    } else if (currentView === "Week") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  // Function to navigate to next week/month
  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (currentView === "Day") {
      newDate.setDate(newDate.getDate() + 1);
    } else if (currentView === "Week") {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  // Function to go to today
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Function to format date as Month, Year
  const formatMonthYear = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  // Function to get the start of the week
  const getStartOfWeek = (date) => {
    const result = new Date(date);
    const day = date.getDay();
    result.setDate(date.getDate() - day);
    return result;
  };

  // Function to get days of the current week
  const getDaysOfWeek = () => {
    const startOfWeek = getStartOfWeek(currentDate);
    const days = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }

    return days;
  };

  // Function to get days of the current month
  const getDaysOfMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get the first day of the month
    const firstDay = new Date(year, month, 1);
    // Get the last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
    const firstDayOfWeek = firstDay.getDay();

    // Calculate the number of days to show from the previous month
    const daysFromPrevMonth = firstDayOfWeek;

    // Calculate the start date (might be from the previous month)
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - daysFromPrevMonth);

    // We'll show 6 weeks (42 days) to ensure we have enough rows
    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }

    return days;
  };

  // Function to check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Function to check if a date is the selected date
  const isSelected = (date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  // Function to check if a date is in the current month
  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  // Function to get posts for a specific day
  const getPostsForDay = (date) => {
    return posts.filter((post) => {
      const postDate = new Date(post.scheduled_time);
      return (
        postDate.getDate() === date.getDate() &&
        postDate.getMonth() === date.getMonth() &&
        postDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Function to get posts for a specific time slot
  const getPostsForTimeSlot = (date, hour) => {
    return posts.filter((post) => {
      const postDate = new Date(post.scheduled_time);
      return (
        postDate.getDate() === date.getDate() &&
        postDate.getMonth() === date.getMonth() &&
        postDate.getFullYear() === date.getFullYear() &&
        postDate.getHours() === hour
      );
    });
  };

  // Function to format time (e.g., 14:00 -> 02:00 PM)
  const formatTime = (input) => {
    let date;
    if (typeof input === "string") {
      date = new Date(input);
    } else {
      date = input;
    }
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get the days of the week for the current view
  const daysOfWeek = getDaysOfWeek();

  // Add a function to generate random engagement percentages (for demo purposes)
  const getEngagementPercentage = (day, hour) => {
    // This would normally come from your analytics data
    // For demo, we'll generate semi-random values that are higher during prime hours
    const seed = (day.getDay() * 10 + hour) % 7;

    if (hour >= 8 && hour <= 10) return [30, 45, 50][seed % 3]; // Morning prime time
    if (hour >= 19 && hour <= 21) return [45, 50, 55][seed % 3]; // Evening prime time
    if (hour >= 12 && hour <= 14) return [30, 35, 40][seed % 3]; // Lunch time

    // Lower engagement for other times
    return [14, 20, 25, 30][seed % 4];
  };

  // Time slots for the week view
  // const timeSlots = [8, 9, 10, 11, 12, 13, 14, 15, 16];
  const timeSlots = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];


  if (userConnectionsChecked && userConnections.length === 0) 
    {
      return (
        <Layout>
          <div className="flex h-full justify-center items-center flex-col space-y-4  ">
          <img src={"/dashboard/NoAnalyticsYet.svg"} alt="" />
          <h2 className="text-3xl font-bold text-white">No Scheduled Data Yet</h2>
          <p className="text-white/80 text-center">
            You haven't connected any social accounts. Once you
            <br /> connect your accounts, we'll have all the scheduled posts right here.
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
      <div className="min-h-screen text-white">
        <div className="flex flex-col h-screen">
          {/* Top Navigation */}
          <div className="flex justify-center md:justify-between items-center py-4 gap-y-4 flex-wrap ">
            {/* <div className="flex  space-x-1 border border-[#4A4A4A] rounded-full p-1 ">
              <button
                className={`px-6.5 py-2 rounded-full ${
                  currentView === "Day"
                    ? "border border-[#4A4A4A] text-white"
                    : "text-gray-400"
                }`}
                onClick={() => setCurrentView("Day")}
              >
                Day
              </button>
              <button
                className={`px-6.5 py-2 rounded-full ${
                  currentView === "Week"
                    ? "border border-[#4A4A4A] text-white"
                    : "text-gray-400"
                }`}
                onClick={() => setCurrentView("Week")}
              >
                Week
              </button>
              <button
                className={`px-6.5 py-2 rounded-full ${
                  currentView === "Month"
                    ? "border border-[#4A4A4A] text-white"
                    : "text-gray-400"
                }`}
                onClick={() => setCurrentView("Month")}
              >
                Month
              </button>
            </div> */}

            <div className="flex items-center space-x-4 flex-wrap">
              <h2 className="text-xl font-semibold">
                {formatMonthYear(currentDate)}
              </h2>
              <div className="flex space-x-2">
                <button
                  className=" border border-[#4A4A4A] rounded-[8px]  p-2 text-white cursor-pointer"
                  onClick={goToPrevious}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  className=" border border-[#4A4A4A] rounded-[8px]  p-2 text-white cursor-pointer"
                  onClick={goToNext}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              <button
                className=" flex items-center cursor-pointer  border border-[#4A4A4A] rounded-[8px] text-white/80 px-2 py-1.5 "
                onClick={goToToday}
              >
                Today <ChevronDown size={16} className="ml-1" />
              </button>
            </div>

            <div className="flex items-center space-x-4 flex-wrap gap-y-4 justify-center">
              <div className="flex items-center space-x-2"></div>
              <div className="flex items-center space-x-2 border border-[#4A4A4A] rounded-[8px] p-2">
                <span className="text-white/80">Best Times</span>
                <div
                  className={`w-10 h-5 ${
                    showBestTimes ? "bg-[#3570BC]" : "bg-gray-700"
                  } rounded-full flex items-center cursor-pointer`}
                  onClick={() => setShowBestTimes(!showBestTimes)}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-all ${
                      showBestTimes ? "ml-5" : "ml-0.5"
                    }`}
                  ></div>
                </div>
              </div>
              <button className="p-2 border border-[#4A4A4A] rounded-[8px] text-white/80  hover:bg-gray-800">
                <Settings size={20} />
              </button>
              <button className="p-2 border border-[#4A4A4A] rounded-[8px] text-white/80  hover:bg-gray-800">
                <Maximize size={20} />
              </button>
              <button className="p-2 border border-[#4A4A4A] rounded-[8px] text-white/80  hover:bg-gray-800">
                <Clock size={20} />
              </button>
              {/* <Link href="/dashboard/post" className=""> */}
              <button
                className="cursor-pointer bg-[#3570BC] text-white rounded-[8px] px-4 py-2 flex items-center hover:bg-blue-600"
                onClick={() => {
                  setIsCreateModalOpen(true);
                }}
              >
                <Plus size={18} className="mr-2" /> Create new post
              </button>
              {/* </Link> */}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-1  pb-10 flex-col md:flex-row ">
            <div className="md:w-[298px] w-full  md:border-r md:border-gray-800 flex flex-col">
              <div className="px-4 pt-4">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium">
                      {" "}
                      {formatMonthYear(currentDate)}
                    </h3>
                    <div className="flex space-x-2">
                      <button
                        className=" border border-[#4A4A4A] rounded-[8px]  p-1 text-white cursor-pointer"
                        onClick={goToPrevious}
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        className=" border border-[#4A4A4A] rounded-[8px]  p-1 text-white cursor-pointer"
                        onClick={goToNext}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    <div className="text-white/60">Sun</div>
                    <div className="text-white/60">Mon</div>
                    <div className="text-white/60">Tue</div>
                    <div className="text-white/60">Wed</div>
                    <div className="text-white/60">Thu</div>
                    <div className="text-white/60">Fri</div>
                    <div className="text-white/60">Sat</div>

                    {getDaysOfMonth().map((date, index) => {
                      const hasPost = posts.some((post) => {
                        const postDate = new Date(post.scheduled_time);
                        return (
                          postDate.getDate() === date.getDate() &&
                          postDate.getMonth() === date.getMonth() &&
                          postDate.getFullYear() === date.getFullYear()
                        );
                      });

                      return (
                        <div
                          key={index}
                          className={`py-2 cursor-pointer relative
                        ${isToday(date) ? "text-blue-400 font-bold" : ""}
                        ${
                          isSelected(date)
                            ? "bg-[#3570BC] text-white rounded-lg"
                            : ""
                        }
                        ${
                          !isCurrentMonth(date)
                            ? "text-gray-600"
                            : "text-gray-400"
                        }
                      `}
                          onClick={() => {
                            setSelectedDate(date);
                            setCurrentDate(date);
                          }}
                        >
                          {date.getDate()}

                          {hasPost && (
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <ChevronDown size={20} className="mr-2" /> Posts
                </h3>
                <SearchInput placeholder="Search here" />

                <div className="space-y-4 max-h-[500px] overflow-auto">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-center space-x-3 border-b pb-2 border-[#4A4A4A] "
                    >
                      <div className="w-10 h-10 bg-gray-800 rounded overflow-hidden">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-gray-300 text-sm">
                        {/* {"post.post_group_title post. post group_ title post post_group title"} */}
                        {post.post_group_title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Calendar View */}
            <div className="flex-1 flex flex-col max-w-[320px] sm:max-w-[100%] overflow-y-scroll">
              {currentView === "Week" && (
                <WeekTab
                  timeSlots={timeSlots}
                  formatTime={formatTime}
                  daysOfWeek={daysOfWeek}
                  showBestTimes={showBestTimes}
                  setSelectedDate={setSelectedDate}
                  getPostsForTimeSlot={getPostsForTimeSlot}
                  setIsCreateModalOpen={setIsCreateModalOpen}
                  getEngagementPercentage={getEngagementPercentage}
                  setSelectedPost = {setSelectedPost}
                />
              )}

              {currentView === "Day" && (
                <DayTab
                  timeSlots={timeSlots}
                  formatTime={formatTime}
                  currentDate={currentDate}
                  showBestTimes={showBestTimes}
                  getPostsForTimeSlot={getPostsForTimeSlot}
                  setSelectedDate={setSelectedDate}
                  setIsCreateModalOpen={setIsCreateModalOpen}
                  getEngagementPercentage={getEngagementPercentage}
                />
              )}

              {currentView === "Month" && (
                <MonthTab
                  isToday={isToday}
                  formatTime={formatTime}
                  showBestTimes={showBestTimes}
                  getDaysOfMonth={getDaysOfMonth}
                  getPostsForDay={getPostsForDay}
                  setCurrentDate={setCurrentDate}
                  setCurrentView={setCurrentView}
                  isCurrentMonth={isCurrentMonth}
                  setSelectedDate={setSelectedDate}
                  setIsCreateModalOpen={setIsCreateModalOpen}
                  getEngagementPercentage={getEngagementPercentage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isCreateModalOpen && (
        <CreatePostModel
          setIsCreateModalOpen={setIsCreateModalOpen}
          selectedDate={selectedDate}
          selectedPost={selectedPost}
        />
      )}
    </Layout>
  );
};

export default SchedulePage;
