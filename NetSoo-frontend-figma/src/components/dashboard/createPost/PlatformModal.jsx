import { useEffect, useRef } from "react";
import { X } from "lucide-react";

const PlatformModal = ({
  togglePlatform,
  setShowPlatformModal,
  selectedPlatforms,
}) => {
  const modalRef = useRef();

  const platforms = [
    { name: "facebook", label: "Facebook", icon: "/dashboard/facebook.svg" },
    { name: "instagram", label: "Instagram", icon: "/dashboard/insta.svg" },
    { name: "tiktok", label: "Tiktok", icon: "/dashboard/tiktok.svg" },
    // { name: "youtube", label: "Youtube", icon: "/dashboard/youtube.svg" },
    // { name: "twitter", label: "X/Twitter", icon: "/dashboard/twitter.svg" },
    // { name: "linkedin", label: "LinkedIn", icon: "/dashboard/linkedIn.svg" },
    // { name: "pinterest", label: "Pinterest", icon: "/dashboard/pinterest.svg" },
    // { name: "twitch", label: "Twitch", icon: "/dashboard/twitch.svg" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setShowPlatformModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowPlatformModal]);
  // bg-[#FFFFFF]/4
  return (
    <div className="fixed inset-0 backdrop-blur-[12px] bg-[#171717]/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className=" bg-[#FFFFFF0A] backdrop-blur-[120.57px] border border-[#FFFFFF30] rounded-[20px] p-6 w-full max-w-4xl  overflow-y-auto max-h-[600px]"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-white text-2xl font-semibold">
            Where do you like to post?
          </h1>
          <button
            onClick={() => setShowPlatformModal(false)}
            className="text-white cursor-pointer"
          >
            <X />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="border border-[#393939] rounded-[8px] p-4 flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 overflow-hidden">
                  <img
                    src={platform.icon}
                    alt={platform.label}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-white text-md">{platform.label}</span>
              </div>

              <div
                className={`w-12 h-7 rounded-full flex items-center p-1 cursor-pointer transition-all duration-200 ${
                  selectedPlatforms.includes(platform.name)
                    ? "bg-[#3570BC] justify-end"
                    : "bg-[#464646] justify-start"
                }`}
                onClick={() => togglePlatform(platform.name)}
              >
                <div
                  className={`w-5 h-5 rounded-full transition-all duration-200 ${
                    selectedPlatforms.includes(platform.name)
                      ? "bg-white"
                      : "bg-[#5F5F5F]"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => setShowPlatformModal(false)}
            className="bg-[#3570BC] hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-full w-full max-w-xs cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlatformModal;
