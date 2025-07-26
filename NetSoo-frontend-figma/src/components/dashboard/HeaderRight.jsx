"use client";
import { getPlatformIcon } from "@/utils/getPlatformIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { logoutUser } from "@/api/auth";
import { useUser } from "@/context/UserContext";


const HeaderRight = () => {
  const { user, logout } = useUser();
  
  const router = useRouter();
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isMessageOpen, setMessageOpen] = useState(false);
  const [userData, setUserData] = useState(
    {
      firstName : "",
      lastName : "",
      profilePicture : "/dashboard/dummy-image.jpg",
    }
  );

  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
        setNotificationOpen(false);
        setMessageOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (user) {
      setUserData({
                firstName: user.first_name || "",
                lastName: user.last_name || "",
                profilePicture: user.profile_picture  || "/dashboard/dummy-image.jpg",
      });
    }
  }, [user]); // <--- runs whenever 'user' changes
  

  const profileMenu = [
    {
      label: "Connections",
      href: "/dashboard/connections",
      icon: "/dashboard/Connections.svg",
    },
    // {
    //   label: "User management",
    //   href: "",
    //   icon: "/dashboard/User.svg",
    // },
    {
      label: "Account settings",
      href: "/dashboard/settings",
      icon: "/dashboard/setting.svg",
    },

    {
      label: "Logout",
      onClick: async () => {
        // Handle logout here
        console.log("Logging out...");
        await logoutUser();
        logout();
        router.push("/");
      },
      icon: "/dashboard/logout.svg",
    },
    // {
    //   label: "Legal conditions",
    //   href: "",
    // },
  ];

  const notifications = [
    // {
    //   platform: "Facebook",
    //   text: "New follower on your page.",
    //   time: "2 hours ago",
    // },
    // {
    //   platform: "Instagram",
    //   text: "Someone liked your post.",
    //   time: "5 hours ago",
    // },
    // {
    //   platform: "LinkedIn",
    //   text: "You have a new connection request.",
    //   time: "1 day ago",
    // },
  ];

  const messages = [
    // {
    //   avatar: "/dashboard/dummy-image",
    //   name: "John Doe",
    //   message: "Hey! Can we reschedule our meeting?",
    //   time: "3 min ago",
    // },
    // {
    //   avatar: "/dashboard/dummy-image",
    //   name: "Alice Smith",
    //   message: "Looking forward to the campaign launch!",
    //   time: "45 min ago",
    // },
  ];

  return (
    <div
      className="relative flex items-center gap-3 md:gap-3"
      //   ref={dropdownRef}
    >
      <div className="relative">
        <button
          onClick={() => {
            setMessageOpen(!isMessageOpen);
            setNotificationOpen(false);
            setProfileOpen(false);
          }}
          className="hidden w-[50px] h-[50px] md:flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 transition"
        >
          <img src="/dashboard/message.svg" alt="message" className="w-5 h-5" />
        </button>
        {isMessageOpen && (
          <div className="absolute right-0 top-14 w-96 backdrop-blur-[101.51px] border border-[#504152] rounded-[12px] z-50">
            {messages.length ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className="border-b border-[#504152] py-5 px-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={`${msg.avatar}.jpg`} // Added file extension
                      alt={msg.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-md font-medium">{msg.name}</div>
                      <div className="text-sm text-white/80">{msg.message}</div>
                      <div className="text-xs text-white/50 mt-1">
                        {msg.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-center py-4">No new messages.</p>
            )}
          </div>
        )}
      </div>

      {/* Notification Button */}
      <div className="relative">
        <button
          onClick={() => {
            setNotificationOpen(!isNotificationOpen);
            setMessageOpen(false);
            setProfileOpen(false);
          }}
          className="hidden w-[50px] h-[50px] md:flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 transition"
        >
          <img src="/dashboard/notification.svg" alt="notification" />
        </button>
        {isNotificationOpen && (
          <div className="absolute right-0 top-14 w-96  backdrop-blur-[101.51px] border border-[#504152] rounded-[12px] z-50">
            {notifications.length ? (
              notifications.map((note, index) => (
                <div
                  key={index}
                  className="border-b border-[#504152] py-5 px-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={getPlatformIcon(note.platform)}
                      alt={note.platform}
                      className="w-10 h-10"
                    />
                    <div>
                      <div className="text-md font-medium">{note.text}</div>
                      <div className="text-sm text-white/60 ">{note.time}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm">No new notifications.</p>
            )}
          </div>
        )}
      </div>

      {/* Profile button */}
      <button
        onClick={() => setProfileOpen(!isProfileOpen)}
        className="flex items-center h-[50px] gap-2 pl-[5px] pe-2 rounded-full border border-white/20  text-white"
      >
        <img
          src={userData.profilePicture}
          alt="User Avatar"
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
        <span className="text-sm font-medium hidden sm:block ml-2">
          {userData.firstName} {userData.lastName}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 transition-transform duration-200 ${
            isProfileOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Profile dropdown */}
      {isProfileOpen && (
        <div className="absolute right-0 top-14 mt-1 w-56 backdrop-blur-[101.51px] border border-[#504152] rounded-[12px]  text-white  overflow-hidden z-50">
          {profileMenu.map((item, idx) =>
            item.href ? (
              <Link
                key={idx}
                href={item.href}
                className="flex items-center gap-2 px-4 py-3 hover:backdrop-blur-[120px] border border-[#504152] cursor-pointer"
              >
                {item.icon && (
                  <img src={item.icon} alt="" className="w-5 h-5" />
                )}
                {item.label}
              </Link>
            ) : (
              <button
                key={idx}
                onClick={item.onClick}
                className="flex items-center gap-2 w-full text-left px-4 py-3 hover:hover:backdrop-blur-[120px] border border-[#504152] cursor-pointer"
              >
                {item.icon && (
                  <img src={item.icon} alt="" className="w-5 h-5" />
                )}
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderRight;
