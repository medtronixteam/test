import React from "react";

const MonthTab = ({
  isToday,
  formatTime,
  getDaysOfMonth,
  getPostsForDay,
  setCurrentDate,
  setCurrentView,
  isCurrentMonth,
  setSelectedDate,
  setIsCreateModalOpen,
  showBestTimes,
  getEngagementPercentage,
}) => {
  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="grid grid-cols-7 min-w-[700px]  gap-2">
        {/* Day Headers */}
        {[
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ].map((day) => (
          <div key={day} className="text-center text-white font-medium py-2">
            {day}
          </div>
        ))}

        {/* Calendar Days */}
        {getDaysOfMonth().map((date, index) => {
          const postsForDay = getPostsForDay(date);

          return (
            <div
              key={index}
              style={
                showBestTimes && postsForDay.length === 0
                  ? {
                      backgroundColor: `rgba(44, 44, 44, ${
                        getEngagementPercentage(date, 12) / 100
                      })`, // Dynamic RGBA color
                    }
                  : {} // No style if condition is false
              }
              className={`min-h-[120px] border border-gray-800 rounded-md p-2 ${
                !isCurrentMonth(date) ? "bg-[#232323]/10" : "bg-[#232323]"
              } ${isToday(date) ? "border-blue-500" : ""}`}
              onClick={() => {
                setSelectedDate(date);
                setCurrentDate(date);
               
                setIsCreateModalOpen(true);
              }}
            >
              <div
                className={`text-right mb-2 ${
                  isToday(date)
                    ? "text-blue-500 font-bold"
                    : !isCurrentMonth(date)
                    ? "text-gray-600"
                    : "text-white"
                }`}
              >
                {date.getDate()}
              </div>
              {showBestTimes && postsForDay.length === 0 && (
                <div className="flex justify-center items-center h-12 text-gray-400 font-medium">
                  {getEngagementPercentage(date, 12)}%
                </div>
              )}
              <div className="space-y-1">
                {postsForDay.slice(0, 2).map((post) => (
                  <div
                    key={post.id}
                    className="bg-gray-800 rounded-sm p-1 text-xs truncate cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle post click
                      console.log("Month Tab - Post clicked:", post);
                    }}
                  >
                    {formatTime(post.scheduled_time)} - {post.post_group_title}
                  </div>
                ))}

                {postsForDay.length > 2 && (
                  <div className="text-xs text-gray-500 text-center">
                    +{postsForDay.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthTab;
