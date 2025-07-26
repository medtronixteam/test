"use client";
import SocialNetworkScreen1 from "@/components/auth/socialNetworks/SocialNetworkScreen1";
import SocialNetworkScreen2 from "@/components/auth/socialNetworks/SocialNetworkScreen2";
import SocialNetworkScreen3 from "@/components/auth/socialNetworks/SocialNetworkScreen3";
import Stepper from "@/components/dashboard/createCampaign/Stepper";
import { CustomButton } from "@/components/ui/custom-button";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";


const SocialNetworksPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const router = useRouter();
  const { fetchUser,  isAuthenticated, setUser } = useUser();

  useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login");
      }
    }, [isAuthenticated, router]);

  const renderStepForm = (step) => {
    switch (step) {
      case 1:
        return <SocialNetworkScreen1 />;
      case 2:
        return <SocialNetworkScreen2 />;
      case 3:
        return <SocialNetworkScreen3 />;
      default:
        return null;
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-8">
      <div className="w-full md:max-w-screen-xl p-4 md:p-10  rounded-[20px] backdrop-blur-[120.57px]  border border-[#FFFFFF30]">
        <h2 className="text-3xl font-bold text-white text-center">
          Connect Your Social Networks
        </h2>
        <div>
          <div className="max-w-2xl mx-auto mt-8">
            {/* <Stepper
              steps={3}
              currentStep={currentStep}
              onChange={setCurrentStep}
            /> */}
          </div>

          <div className="min-h-[300px]">{renderStepForm(currentStep)}</div>

          <div className="mt-8 space-y-6 text-center">
            {/* <div>
              <CustomButton
                onClick={() => {
                  setCurrentStep(currentStep + 1);
                }}
                className="w-80"
              >
                Continue
              </CustomButton>
            </div> */}

            <Link
              href={"/dashboard"}
              className="text-center text-sm text-white/60 underline"
            >
              Skip and go to dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialNetworksPage;
