import React from "react";

const DayTab = ({
  timeSlots,
  formatTime,
  currentDate,
  showBestTimes,
  getPostsForTimeSlot,
  setSelectedDate,
  setIsCreateModalOpen,
  getEngagementPercentage,
}) => {
  return (
    <div className="flex-1 overflow-auto">
      <div className="flex">
        {/* Time Column */}
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

        {/* Single Day Column */}
        <div className="flex-1 min-w-[120px] border-r border-gray-800">
          {/* Day Header */}
          <div className="h-24 flex flex-col items-center justify-center border-b border-gray-800">
            <div className="text-lg font-medium">{currentDate.getDate()}</div>
            <div className="text-md text-white">
              {currentDate?.toLocaleDateString("en-US", {
                weekday: "long",
              })}
            </div>
          </div>

          {/* Time Slots */}
          {timeSlots.map((hour) => {
            const postsInSlot = getPostsForTimeSlot(currentDate, hour);

            return (
              <div
                key={hour}
                style={
                  showBestTimes && postsInSlot.length === 0
                    ? {
                        backgroundColor: `rgba(44, 44, 44, ${
                          getEngagementPercentage(currentDate, hour) / 100
                        })`,
                      }
                    : {}
                }
                className="h-24 border-t border-gray-800 relative"
                onClick={() => {
                  // Set the date and time for the new post
                  const newDate = new Date(currentDate);
                  newDate.setHours(hour, 0, 0, 0);
                  setSelectedDate(newDate);
                  setIsCreateModalOpen(true);
                }}
              >
                {showBestTimes && postsInSlot.length === 0 && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 font-medium">
                    {getEngagementPercentage(currentDate, hour)}%
                  </div>
                )}

                {postsInSlot.map((post) => (
                  <div
                    key={post.id}
                    className="absolute bg-[#232323] z-40 rounded-md p-1 m-1  flex flex-col cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle post click - could open edit modal
                      console.log("Day Tab - Post clicked:", post);
                    }}
                  >
                    <div className="w-full h-16 bg-gray-700 rounded-md overflow-hidden mb-1">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt=""
                        className="w-full h-full object-cover"
                      />
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
      </div>
    </div>
  );
};

export default DayTab;
