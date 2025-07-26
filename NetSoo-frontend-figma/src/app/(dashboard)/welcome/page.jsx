"use client";
import { CustomButton } from "@/components/ui/custom-button";
import Link from "next/link";
import React from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


const WelcomePage = () => {
  const router = useRouter();
  const { fetchUser,  isAuthenticated, setUser } = useUser();

  useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login");
      }
    }, [isAuthenticated, router]);


  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-8">
      <div className="w-full max-w-lg p-4 md:p-10 space-y-8 rounded-[20px] backdrop-blur-[120.57px]  border border-[#FFFFFF30]">
        <div className="flex justify-center">
          <div className="w-16 h-16  flex items-center justify-center">
            <img src="/images/logo.svg" alt="" />
          </div>
        </div>

        <div className="text-center space-y-6">
          <h2 className="mt-2 text-3xl font-bold text-white">
            Welcome to NetSoo!
          </h2>
          <p className="text-white/80">
            Let’s get your account set up in just a few steps — so you can start
            growing smarter, faster.
          </p>
          <p className="text-white">This will only take a minute.</p>

          <div>
            <Link href={"/social-networks"} className="">
              <CustomButton className="w-full">Continue</CustomButton>
            </Link>
          </div>

          <Link
            href={"/dashboard"}
            className="text-center text-sm text-white/60 underline"
          >
            Skip and go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
