"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Layout from "@/components/dashboard/Layout";
import { ChevronDown, User, Settings, Bell, Share2, Lock } from "lucide-react";
import Account from "@/components/dashboard/settings/Account";
import { default as SettingsTab } from "@/components/dashboard/settings/Settings";
import Notification from "@/components/dashboard/settings/Notification";
import Connected from "@/components/dashboard/settings/Connected";
import Security from "@/components/dashboard/settings/Security";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("Account");
  const { user, isAuthenticated } = useUser(); 
  const router = useRouter();


  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);


  if (!isAuthenticated) { return null}

  const tabs = [
    { label: "Account", icon: User },
    { label: "Settings", icon: Settings },
    // { label: "Notification", icon: Bell },
    // { label: "Connected Social Networks", icon: Share2 },
    // { label: "Login & Security", icon: Lock },
  ];
  return (
    <Layout>
      <h1 className="text-2xl font-[600] mb-6 mt-2 ml-1 ">
        Profile and settings
      </h1>
      <div className="flex min-h-screen backdrop-blur-[120.57px] text-white border border-[#FFFFFF30] rounded-[20px]">
        <div className="w-80 border-r border-[#FFFFFF30]">
          <h2 className="text-xl font-semibold p-5 border-b border-[#FFFFFF30]">
            Settings
          </h2>

          <nav className="space-y-1 mt-5 px-3">
            {tabs.map(({ label, icon: Icon }) => (
              <button
                key={label}
                className={`flex items-center w-full px-3 py-2 ${
                  activeTab === label
                    ? "text-[#3570BC] font-semibold"
                    : "text-white"
                }`}
                onClick={() => setActiveTab(label)}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-5">
          {activeTab === "Account" && <Account />}
          {activeTab === "Settings" && <SettingsTab />}
          {activeTab === "Notification" && <Notification />}
          {activeTab === "Connected Social Networks" && <Connected />}
          {activeTab === "Login & Security" && <Security />}
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
