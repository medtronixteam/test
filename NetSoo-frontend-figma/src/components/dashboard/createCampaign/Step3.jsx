"use client";

import { useState } from "react";
import { Users, User, ChevronDown } from "lucide-react";

export default function Step3() {
  const [selectedGender, setSelectedGender] = useState("all");
  const [ageRange, setAgeRange] = useState([18, 35]);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [showOtherLanguages, setShowOtherLanguages] = useState(false);

  const languages = ["english", "spanish", "french", "german", "italian"];
  const otherLanguages = ["portuguese", "chinese", "japanese", "russian", "arabic"];

  const handleAgeChange = (e) => {
    const value = parseInt(e.target.value);
    if (e.target.name === "minAge") {
      setAgeRange([value, Math.max(value, ageRange[1])]);
    } else {
      setAgeRange([Math.min(value, ageRange[0]), value]);
    }
  };

  return (
    <div className="text-white">
      {/* Gender */}
      <h2 className="text-lg font-semibold my-4 text-center">Select your targeted gender</h2>
      <div className="flex gap-3 mb-8 justify-center">
        {["all", "female", "male"].map((gender) => (
          <button
            key={gender}
            onClick={() => setSelectedGender(gender)}
            className={`border border-[#FFFFFF30] rounded-[8px] flex items-center justify-center gap-2 px-6 py-2.5 min-w-[120px] transition-colors ${
              selectedGender === gender
                ? "bg-[#3570BC] text-white"
                : "text-[#AAAAAA] hover:bg-zinc-700"
            }`}
          >
            {gender === "all" ? <Users size={20} /> : <User size={20} />}
            <span className="capitalize">{gender}</span>
          </button>
        ))}
      </div>

      {/* Age Range */}
      <div className="bg-[#2F2F31] rounded-[20px] border border-[#FFFFFF30] p-5 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg">Age Range</h3>
          <span className="text-lg">
            {ageRange[0]} - {ageRange[1]} years old
          </span>
        </div>

        <div className="relative mb-6">
          <div className="h-1 w-full bg-[#4B4B4B] rounded-full relative">
            <div
              className="absolute h-1 bg-[#3570BC] rounded-full"
              style={{
                left: `${((ageRange[0] - 18) / (65 - 18)) * 100}%`,
                width: `${((ageRange[1] - ageRange[0]) / (65 - 18)) * 100}%`,
              }}
            ></div>
          </div>

          {/* Sliders */}
          <input
            type="range"
            name="minAge"
            min={18}
            max={65}
            value={ageRange[0]}
            onChange={handleAgeChange}
            className="absolute top-0 left-0 w-full h-1 appearance-none bg-transparent pointer-events-auto z-10
              [&::-webkit-slider-thumb]:appearance-none 
              [&::-webkit-slider-thumb]:h-5 
              [&::-webkit-slider-thumb]:w-5 
              [&::-webkit-slider-thumb]:rounded-full 
              [&::-webkit-slider-thumb]:bg-[#3570BC] 
            
              [&::-webkit-slider-thumb]:cursor-pointer"
          />
          <input
            type="range"
            name="maxAge"
            min={18}
            max={65}
            value={ageRange[1]}
            onChange={handleAgeChange}
            className="absolute top-0 left-0 w-full h-1 appearance-none bg-transparent pointer-events-auto z-10
              [&::-webkit-slider-thumb]:appearance-none 
              [&::-webkit-slider-thumb]:h-5 
              [&::-webkit-slider-thumb]:w-5 
              [&::-webkit-slider-thumb]:rounded-full 
              [&::-webkit-slider-thumb]:bg-[#3570BC] 
           
              [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>

        <div className="flex justify-between mt-4 text-sm text-gray-400">
          <span>18 Years</span>
          <span className="bg-[#39424F] text-white/80 px-4 py-2 rounded-full">{ageRange[1]} Years</span>
          <span>+65 Years</span>
        </div>
      </div>

      {/* Language Selection */}
      <div className="mb-20">
        <h3 className="text-lg text-center mb-4">Select your preferred language</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {languages.map((language) => (
            <button
              key={language}
              onClick={() => setSelectedLanguage(language)}
              className={`px-4 py-2.5 transition-colors border border-[#FFFFFF30] rounded-[8px]  ${
                selectedLanguage === language ? "bg-[#3570BC] text-white" : "text-[#AAAAAA] hover:bg-zinc-700"
              }`}
            >
              {language.charAt(0).toUpperCase() + language.slice(1)}
            </button>
          ))}

          <div className="relative">
            <button
              onClick={() => setShowOtherLanguages(!showOtherLanguages)}
              className="border border-[#FFFFFF30] rounded-[8px] w-full flex items-center justify-center gap-1 px-4 py-2.5 bg-zinc-800/70 text-gray-300 hover:bg-zinc-700"
            >
              Others <ChevronDown size={16} className={`transition-transform ${showOtherLanguages ? "rotate-180" : ""}`} />
            </button>

            {showOtherLanguages && (
              <div className="border border-[#FFFFFF30] rounded-[8px] absolute top-full left-0 w-full mt-1 bg-zinc-800  shadow-lg z-10">
                {otherLanguages.map((language) => (
                  <button
                    key={language}
                    onClick={() => {
                      setSelectedLanguage(language);
                      setShowOtherLanguages(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-zinc-700 transition-colors"
                  >
                    {language.charAt(0).toUpperCase() + language.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
