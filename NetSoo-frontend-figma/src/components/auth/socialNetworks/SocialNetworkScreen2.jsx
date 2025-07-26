"use client";

import { useState } from "react";
import { Link, ArrowRight, Megaphone } from "lucide-react";

const SocialNetworkScreen2 = () => {
  // Single state
  const [state, setState] = useState({
    selectedTheme: "", // initially no theme selected
  });

  // Array of template cards (themes)
  const templateCards = [
    { id: "dark", name: "Dark", primaryColor: "#1a1a1a" },
    { id: "blue", name: "Blue", primaryColor: "#1e3a5f" },
    { id: "brown", name: "Brown", primaryColor: "#3d2c1f" },
    { id: "purple", name: "Purple", primaryColor: "#3d1a45" },
    { id: "green", name: "Green", primaryColor: "#1e3b2c" },
  ];

  // Options for starting
  const startOptions = [
    {
      id: 1,
      title: "Start from scratch",
      description: "Build a custom landing page that links to all your content",
      icon: <Link className="w-5 h-5" />,
    },
    {
      id: 2,
      title: "Create a Campaign",
      description: "Build a custom landing page that links to all your content",
      icon: <Megaphone className="w-5 h-5" />,
    },
  ];

  // Handle theme change
  const handleThemeChange = (themeId) => {
    setState((prev) => ({
      ...prev,
      selectedTheme: themeId,
    }));
  };

  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <h1 className="text-center text-xl mb-8 text-white">
          Start from Smart Link template or start new
        </h1>

        {/* Template cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {templateCards.map((theme) => (
            <div
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`w-[140px] h-[215px] rounded-lg p-3 flex flex-col gap-3 cursor-pointer border transition-all duration-200 ${
                state.selectedTheme === theme.id
                  ? "border-white"
                  : "border border-[#4E4B4C]"
              }`}
              style={{ backgroundColor: theme.primaryColor }}
            >
              <div className="w-10 h-10 rounded-full bg-white/10 mb-2" />
              <div className="flex flex-col gap-2">
                {[100, 80, 90, 70, 60].map((w, i) => (
                  <div
                    key={i}
                    className="h-2 bg-white/10 rounded"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Start options */}
        <div className="space-y-4 mb-4">
          {startOptions.map((option, index) => (
            <div key={option.id}>
              <div className="border border-[#FFFFFF30] backdrop-blur-[101.51px] rounded-lg p-3 flex items-center justify-between cursor-pointer transition-colors duration-200">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-lg text-white bg-[#222222] flex items-center justify-center mr-3">
                    {option.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-white text-lg">
                      {option.title}
                    </h3>
                    <p className="text-md text-white/60 ">
                      {option.description}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-white" />
              </div>

              {index === 0 && (
                <div className="flex items-center justify-center my-6">
                  <div className="flex-grow border-t border-white/10"></div>
                  <span className="mx-4 text-white/60 text-sm">OR</span>
                  <div className="flex-grow border-t border-white/10"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialNetworkScreen2;
