import { useRouter } from "next/navigation";
import React from "react";

const WeekTab = ({
  timeSlots,
  formatTime,
  daysOfWeek,
  showBestTimes,
  setSelectedDate,
  getPostsForTimeSlot,
  setIsCreateModalOpen,
  getEngagementPercentage,
  setSelectedPost,
}) => {
  const router = useRouter();
  return (
    <div className="flex-1 overflow-auto">
      <div className="flex">
        <div className="w-24 flex-shrink-0 border-r border-gray-800">
          <div className="h-24 flex items-center justify-center text-white text-sm">
            GTM+7
          </div>
          {timeSlots.map((hour) => (
            <div
              key={hour}
              className="h-24 flex items-center justify-center text-white text-sm border-t border-gray-800"
            >
              {hour < 10 ? `0${hour}:00` : `${hour}:00`}
            </div>
          ))}
        </div>

        {/* Days Columns */}
        {daysOfWeek.map((day, dayIndex) => (
          <div
            key={dayIndex}
            className="flex-1 min-w-[120px] border-r border-gray-800"
          >
            {/* Day Header */}
            <div className="h-24 flex flex-col items-center justify-center border-b border-gray-800">
              <div className="text-lg font-medium">{day.getDate()}</div>
              <div className="text-md text-white">
                {day.toLocaleDateString("en-US", {
                  weekday: "long",
                })}
              </div>
            </div>

            {/* Time Slots */}
            {timeSlots.map((hour) => {
              const postsInSlot = getPostsForTimeSlot(day, hour);

              return (
                <div
                  key={hour}
                  className="h-24 border-t border-gray-800  relative   "
                  style={
                    showBestTimes && postsInSlot.length === 0
                      ? {
                          backgroundColor: `rgba(44, 44, 44, ${
                            getEngagementPercentage(day, hour) / 100
                          })`,
                        }
                      : {}
                  }
                  onClick={() => {
                    // Set the date and time for the new post
                    console.debug("Clicking on new post");
                    const newDate = new Date(day);
                    newDate.setHours(hour, 0, 0, 0);
                    setSelectedDate(newDate);
                    setIsCreateModalOpen(true);
                  }}
                >
                  {showBestTimes && postsInSlot.length === 0 && (
                    <div
                      // onClick={() => {
                      //   router.push(
                      //     "/dashboard/post?date=" + day.toISOString()
                      //   );
                      // }}
                      className="cursor-pointer absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 font-medium"
                    >
                      {getEngagementPercentage(day, hour)}%
                    </div>
                  )}
                  {postsInSlot.map((post) => (
                    <div
                      key={post.id}
                      className="absolute bg-[#232323] z-40   rounded-md p-1 m-1 flex flex-col cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();

                        console.log("Week Tab - Post clicked:", post);
                        setSelectedPost(post);
                        setSelectedDate(new Date(post.scheduled_time));
                        setIsCreateModalOpen(true);
                      }}
                    >
                      <div className="w-full h-16  rounded-md  mb-1">
                      {post.image ? (
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : post.video ? (
                        <video
                          src={post.video}
                          className="w-full h-full object-cover"
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <img
                          src="/placeholder.svg"
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      )}
                      </div>
                      <div className="text-sm font-medium">{post.post_group_title}</div>
                      <div className="text-sm text-gray-500">
                        {formatTime(post.scheduled_time)}
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        {post.platforms.includes("tiktok") && (
                          <div className="">
                            <img
                              src="/dashboard/tiktok.svg"
                              alt="tiktok"
                              className="w-5 h-5"
                            />
                          </div>
                        )}
                        {post.platforms.includes("facebook") && (
                          <div className="">
                            <img
                              src="/dashboard/facebook.svg"
                              alt="tiktok"
                              className="w-5 h-5"
                            />
                          </div>
                        )}
                        {post.platforms.includes("instagram") && (
                          <div className="">
                            <img
                              src="/dashboard/insta.svg"
                              alt="tiktok"
                              className="w-5 h-5"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekTab;
