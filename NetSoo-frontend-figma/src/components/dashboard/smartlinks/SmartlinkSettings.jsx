import React, { useState } from "react";
import ButtonsTab from "./ButtonsTab";
import MediaTab from "./MediaTab";
import AppearanceTab from "./AppearanceTab";

const SmartlinkSettings = ({
  links,
  activeSection,
  setActiveSection,
  userData,
  setUserData,
  setLinks,
}) => {
  return (
    <div>
      <div className="p-4 border-b border-zinc-800">
        <h2 className="text-sm font-medium text-zinc-400 mb-6">General</h2>
        <div className="flex  items-center gap-4 mb-4">
          <div className="w-full">
            <label className="block text-[16px] text-[#A7A7A7] mb-2">
              Name
            </label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              className="w-full px-3 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-zinc-600"
            />
          </div>
          <div className="w-full">
            <label className="block text-[16px] text-[#A7A7A7] mb-2">URL</label>
            <input
              type="text"
              value={userData.profileUrl}
              onChange={(e) =>
                setUserData({ ...userData, profileUrl: e.target.value })
              }
              placeholder="Paste here..."
              className="w-full px-3 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-zinc-600"
            />
          </div>
        </div>
      </div>

      <div className="">
        <div className="flex">
          {["Buttons", "Media", "Appearance"].map((section) => (
            <button
              key={section}
              className={`flex-1 px-6 py-3 border-y border-[#FFFFFF30]  text-md font-[500] 
                ${
                  activeSection === "Buttons"
                    ? " border-r border-[#FFFFFF30]"
                    : ""
                }
                 ${
                   activeSection === "Appearance"
                     ? " border-l border-[#FFFFFF30]"
                     : ""
                 }
                ${
                  activeSection === section
                    ? "text-white bg-[#333333]"
                    : "text-[#D3D3D3] hover:bg-[#333333]"
                }`}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </button>
          ))}
        </div>

        {activeSection === "Buttons" && (
          <ButtonsTab links={links} setLinks={setLinks} />
        )}
        {activeSection === "Media" && (
          <MediaTab
            links={links}
            setLinks={setLinks}
            userData={userData}
            setUserData={setUserData}
          />
        )}
        {activeSection === "Appearance" && (
          <AppearanceTab userData={userData} setUserData={setUserData} />
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-4 flex justify-end gap-3 border-t border-zinc-800 mt-auto">
        <button className="min-w-[95px] bg-[#FFFFFF05] hover:bg-zinc-700 text-white px-4 py-2.5 rounded-[8px] text-md">
          Cancel
        </button>
        <button className="min-w-[95px] bg-[#3570BC] hover:bg-blue-600 text-white px-4 py-2.5 rounded-[8px] text-md">
          Save
        </button>
      </div>
    </div>
  );
};

export default SmartlinkSettings;
