import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { getPostTypeIcon } from "@/utils/getPlatformIcon";

const PlatformSelectDropdown = ({ options, selected, onSelect, platform }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`flex items-center justify-center border-2 border-[#393939] backdrop-blur-[101.51px] rounded-[8px] px-4 py-2`}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <img
          src={getPostTypeIcon(platform, selected)}
          alt={selected}
          className="w-6 h-6 mr-2"
        />
        {selected} <ChevronDown size={16} className="ml-1" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 bg-[#121212] rounded-lg shadow-lg w-full z-50">
          <ul role="listbox">
            {options.map((option) => (
              <li
                key={option}
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center"
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlatformSelectDropdown;
