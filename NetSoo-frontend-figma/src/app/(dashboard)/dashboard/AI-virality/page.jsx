"use client";
import Layout from "@/components/dashboard/Layout";
import TextGenerator from "@/components/dashboard/virality/TextGenerator";
import ViralityScore from "@/components/dashboard/virality/ViralityScore";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";


const AIViralityPage = () => {
  const [activeTab, setActiveTab] = useState("generator");
  const { user, fetchUser,  isAuthenticated, isAuthChecked, setUser } = useUser(); 
  const router = useRouter();


  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);


  if (!isAuthenticated) { return null}

  return (
    <Layout>
      <div className="">
        <div className="flex flex-col md:flex-row gap-4  mb-6">
          <button
            onClick={() => setActiveTab("generator")}
            className={`rounded-full px-5 py-2 text-sm  cursor-pointer ${
              activeTab === "generator"
                ? "bg-[#3570BC] text-white"
                : "border border-[#FFFFFF30] bg-transparent"
            }`}
          >
            Text Generator With AI
          </button>
          <button
            onClick={() => setActiveTab("virality")}
            className={`rounded-full px-5 py-2 text-sm cursor-pointer ${
              activeTab === "virality"
                ? "bg-[#3570BC] text-white"
                : "border border-[#FFFFFF30] bg-transparent"
            }`}
          >
            Check AI Virality Score
          </button>
        </div>

        {activeTab === "generator" && <TextGenerator />}
        {activeTab === "virality" && <ViralityScore />}
      </div>
    </Layout>
  );
};

export default AIViralityPage;
