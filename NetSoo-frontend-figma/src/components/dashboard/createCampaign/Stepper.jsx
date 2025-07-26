"use client";

import { Check } from "lucide-react";

const Stepper = ({ steps = 7, currentStep = 2, onChange }) => {
  const handleStepClick = (step) => {
    if (onChange && step <= currentStep) {
      onChange(step);
    }
  };

  return (
    <div className="w-full  p-6">
      <div className="flex items-center justify-between">
        {Array.from({ length: steps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isActive = stepNumber === currentStep;
          const stepText = stepNumber.toString().padStart(2, "0");

          return (
            <div
              key={stepNumber}
              className="flex items-center flex-1 last:flex-none"
            >
              {/* Step Circle */}
              <button
                className={`w-[38px] h-[38px] rounded-full flex items-center justify-center  font-medium text-md relative z-10 ${
                  isCompleted
                    ? "bg-[#30AD81] cursor-pointer text-white"
                    : isActive
                    ? "bg-[#3570BC] cursor-pointer text-white"
                    : "bg-[#3A3A3A] cursor-default border border-[#FFFFFF30] text-[#FFFFFF30]"
                }`}
                onClick={() => handleStepClick(stepNumber)}
                disabled={stepNumber > currentStep}
              >
                {isCompleted ? <Check size={24} /> : stepText}
              </button>

              {/* Connector Line */}
              {stepNumber < steps && (
                <div className="flex-1 h-[6px] mx-2 ">
                  <div
                    className={`h-full rounded-[13px] ${
                      isCompleted
                        ? "bg-[#30AD81]"
                        : isActive
                        ? "bg-[#3570BC]"
                        : "bg-[#3A3A3A]"
                    }`}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
