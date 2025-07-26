"use client";

import Navbar from "@/components/client/Navbar";
import Footer from "@/components/client/Footer";
import { useSearchParams } from "next/navigation";
import Faqs from "@/components/client/landingPage/Faqs";
import PublishPlan from "@/components/client/landingPage/PublishPlan";
import HeroSection from "@/components/client/landingPage/HeroSection";
import Testimonials from "@/components/client/landingPage/Testimonials";
import SimplePricing from "@/components/client/landingPage/SimplePricing";
import MVPHeroSection from "@/components/client/landingPage/MVPHeroSection";
import SocialIconCard from "@/components/client/landingPage/SocialIconCard";
import MediaManagement from "@/components/client/landingPage/MediaManagement";
import { useState, useEffect } from "react";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

import { Suspense } from "react";

const HomeContent = () => {
  const router = useRouter();
  const { fetchUser,  isAuthenticated, setUser } = useUser(); 

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const searchParams = useSearchParams();
  const mvp = searchParams.get("mvp") === "true";
  return (
    <div>
      <Navbar />
      <div className="max-w-screen-xl mx-auto">
        {
          mvp ?
            <MVPHeroSection /> : <>
              <HeroSection />
              <SocialIconCard />
            </>
        }
        <PublishPlan />
        <SimplePricing mvp={mvp} />
        <Testimonials />
        <Faqs />
        <MediaManagement />
      </div>
      <Footer />
    </div>
  );
}
export default function Home() {
  return (
    <Suspense fallback={<div className="text-white">Loading....</div>}>
      <HomeContent />
    </Suspense>
  )
}
