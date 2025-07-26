"use client";
import { useRef, useEffect, useState } from "react";
import { X } from "lucide-react";
import Stepper from "./Stepper";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";

const CreateCampaignModel = ({ setIsCreateModalOpen }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!modalRef.current) return;

      const isGoogleMapOrAutocomplete =
        e.target.closest(".pac-container") || e.target.closest(".gm-style");

      if (!modalRef.current.contains(e.target) && !isGoogleMapOrAutocomplete) {
        setIsCreateModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside, true);
  }, [setIsCreateModalOpen]);

  const renderStepForm = (step) => {
    switch (step) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      case 4:
        return <Step4 />;
      case 5:
        return <Step5 />;
      case 6:
        return <Step6 />;
      case 7:
        return <Step7 />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-[12px] bg-[#171717]/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-[url('/dashboard/modelBg.png')] bg-[length:100%_100%]  bg-no-repeat p-6  w-full max-w-6xl max-h-[600px] overflow-auto "
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-white text-2xl font-semibold">
            Create new campaign
          </h1>
          <button
            onClick={() => setIsCreateModalOpen(false)}
            className="text-white cursor-pointer"
          >
            <X />
          </button>
        </div>
        <div>
          <Stepper
            steps={7}
            currentStep={currentStep}
            onChange={setCurrentStep}
          />

          <div className="min-h-[300px]">{renderStepForm(currentStep)}</div>

          <div className="mt-8 flex justify-center gap-3">
            <button
              className="min-w-[160px] px-4 py-3 border border-[#FFFFFF30] bg-transparent text-white rounded-[138px] cursor-pointer "
              onClick={() => {
                if (currentStep === 1) {
                  setIsCreateModalOpen(false);
                } else {
                  setCurrentStep(Math.max(1, currentStep - 1));
                }
              }}
            >
              {currentStep === 1 ? "Cancel" : "Back"}
            </button>
            <button
              className="min-w-[160px] px-4 py-3 bg-[#3570BC]  text-white rounded-[138px] cursor-pointer"
              onClick={() => {
                if (currentStep === 7) {
                  // Handle form submission here
                  console.log("Form submitted!");
                } else {
                  setCurrentStep(Math.min(7, currentStep + 1));
                }
              }}
            >
              {currentStep === 7 ? "Submit" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignModel;
