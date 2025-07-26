"use client";

import { useState } from "react";
import Image from "next/image";
import { getPlatformIcon } from "@/utils/getPlatformIcon";
const Switch = ({ checked, onCheckedChange }) => {
  return (
    <button
      onClick={() => onCheckedChange(!checked)}
      className={`w-12 h-6 flex items-center rounded-full transition-colors duration-300 ${
        checked ? "bg-[#22C55E]" : "bg-gray-600"
      }`}
      role="switch"
      aria-checked={checked}
    >
      <span
        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      ></span>
    </button>
  );
};
const Integration = ({ name, enabled, onToggle }) => {
  return (
    <div className="bg-[#FFFFFF0D] rounded-[14px] backdrop-blur-[111.51px] p-5">
      <div className="mb-4">
        <Image src={getPlatformIcon(name)} alt={name} width={50} height={50} />
      </div>

      <h3 className="text-white font-semibold text-lg mb-3">{name}</h3>
      <div className="flex justify-between items-center">
        <p className="text-white/70 text-md max-w-[70%]">
          Use {name} to manage members and teams automatically.
        </p>
        <Switch
          checked={enabled}
          onCheckedChange={onToggle}
          className="data-[state=checked]:bg-green-500"
        />
      </div>
    </div>
  );
};

const AdminIntegrationTab = () => {
  const [integrations, setIntegrations] = useState({
    facebook: true,
    tiktok: true,
    twitter: true,
    youtube: true,
    instagram: true,
    metaAds: true,
    linkedin: true,
    snapchat: true,
  });

  const handleToggle = (integration, enabled) => {
    setIntegrations((prev) => ({
      ...prev,
      [integration]: enabled,
    }));
  };

  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-6">Integrations</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Facebook */}
        <Integration
          name="Facebook"
          enabled={integrations.facebook}
          onToggle={(enabled) => handleToggle("facebook", enabled)}
        />

        {/* TikTok */}
        <Integration
          name="TikTok"
          enabled={integrations.tiktok}
          onToggle={(enabled) => handleToggle("tiktok", enabled)}
        />

        {/* Twitter */}
        <Integration
          name="Twitter"
          enabled={integrations.twitter}
          onToggle={(enabled) => handleToggle("twitter", enabled)}
        />

        {/* YouTube */}
        <Integration
          name="YouTube"
          enabled={integrations.youtube}
          onToggle={(enabled) => handleToggle("youtube", enabled)}
        />

        {/* Instagram */}
        <Integration
          name="Instagram"
          enabled={integrations.instagram}
          onToggle={(enabled) => handleToggle("instagram", enabled)}
        />

        {/* Meta Ads */}
        <Integration
          name="Meta Ads"
          enabled={integrations.metaAds}
          onToggle={(enabled) => handleToggle("metaAds", enabled)}
        />

        {/* LinkedIn */}
        <Integration
          name="LinkedIn"
          enabled={integrations.linkedin}
          onToggle={(enabled) => handleToggle("linkedin", enabled)}
        />

        {/* Snapchat */}
        <Integration
          name="Snapchat"
          enabled={integrations.snapchat}
          onToggle={(enabled) => handleToggle("snapchat", enabled)}
        />
      </div>
    </div>
  );
};

export default AdminIntegrationTab;
