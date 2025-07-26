import { GripHorizontal, XIcon } from "lucide-react";
import React, { useRef, useState } from "react";

const MediaTab = ({ userData, setUserData }) => {
  const profileInputRef = useRef(null);
  const bgInputRef = useRef(null);

  const [modalType, setModalType] = useState(null); // 'device' or 'link'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(""); // for link modal

  const handleFileChange = (e, imageType) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserData((prev) => ({
        ...prev,
        [imageType]: {
          src: imageUrl,
          name: file.name,
          type: "file",
        },
      }));
    }
    setIsModalOpen(false);
  };

  const triggerFileInput = (imageType) => {
    if (imageType === "profileImage") {
      profileInputRef.current.click();
    } else {
      bgInputRef.current.click();
    }
  };

  const handleAddImageLink = (imageType) => {
    if (!imageUrl.trim()) return;
    setUserData((prev) => ({
      ...prev,
      [imageType]: {
        src: imageUrl,
        name: imageUrl,
        type: "link",
      },
    }));
    setImageUrl("");
    setIsModalOpen(false);
  };

  const handleRemoveImage = (imageType) => {
    setUserData((prev) => ({
      ...prev,
      [imageType]: null,
    }));
  };

  const renderImageRow = (imageType) => {
    const img = userData[imageType];
    return (
      <div className="flex items-center gap-2">
        <GripHorizontal className="text-gray-400 cursor-move w-5 h-5" />
        <img
          src={img?.src || "/dashboard/dummy-image.jpg"}
          alt="Preview"
          className={`w-12 h-12 ${
            imageType === "profileImage" ? "rounded-full" : "rounded-[8px]"
          } border border-zinc-700`}
        />
        <input
          type="text"
          value={img?.name || ""}
          readOnly
          placeholder={
            imageType === "profileImage" ? "Profile Image" : "Background Image"
          }
          className="flex-1 px-3 py-3 bg-zinc-800/50 border border-zinc-700 rounded-[8px]"
        />
        <button
          onClick={() => handleRemoveImage(imageType)}
          className="text-gray-500"
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>
    );
  };

  return (
    <div>
      {/* File inputs hidden */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={profileInputRef}
        onChange={(e) => handleFileChange(e, "profileImage")}
      />
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={bgInputRef}
        onChange={(e) => handleFileChange(e, "backgroundImage")}
      />

      {/* Buttons */}
      <div className="p-5">
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              setModalType("device");
              setIsModalOpen(true);
            }}
            className="border border-[#FFFFFF30] hover:bg-zinc-700 text-zinc-300 w-full px-4 py-3 rounded-[8px] flex justify-center items-center gap-2"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.6" clipPath="url(#clip0_2307_2612)">
                <path
                  d="M15 8H15.01"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.5 21H6C5.20435 21 4.44129 20.6839 3.87868 20.1213C3.31607 19.5587 3 18.7956 3 18V6C3 5.20435 3.31607 4.44129 3.87868 3.87868C4.44129 3.31607 5.20435 3 6 3H18C18.7956 3 19.5587 3.31607 20.1213 3.87868C20.6839 4.44129 21 5.20435 21 6V12.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 15.9998L8 10.9998C8.928 10.1068 10.072 10.1068 11 10.9998L15 14.9998"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 14L15 13C15.67 12.356 16.45 12.176 17.182 12.46"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 19H22"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 16V22"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2307_2612">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>{" "}
            Add Image from device
          </button>
          <button
            onClick={() => {
              setModalType("link");
              setIsModalOpen(true);
            }}
            className="border border-[#FFFFFF30] hover:bg-zinc-700 text-zinc-300 w-full px-4 py-3 rounded-[8px] flex justify-center items-center gap-2"
          >
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.6" clipPath="url(#clip0_2307_2622)">
                <path
                  d="M9.5 15L15.5 9"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.5 5.99982L11.963 5.46382C12.9008 4.52614 14.1727 3.99942 15.4989 3.99951C16.825 3.99961 18.0968 4.52651 19.0345 5.46432C19.9722 6.40212 20.4989 7.67401 20.4988 9.00017C20.4987 10.3263 19.9718 11.5981 19.034 12.5358L18.5 12.9998"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.5001 18L13.1031 18.534C12.1544 19.4722 10.8739 19.9984 9.53964 19.9984C8.20535 19.9984 6.92489 19.4722 5.97614 18.534C5.5085 18.0716 5.13724 17.521 4.88385 16.9141C4.63047 16.3073 4.5 15.6561 4.5 14.9985C4.5 14.3408 4.63047 13.6897 4.88385 13.0829C5.13724 12.476 5.5085 11.9254 5.97614 11.463L6.50014 11"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2307_2622">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>{" "}
            Add Image link
          </button>
        </div>
        <div className="border-t border-[#393939] mt-6"></div>
      </div>

      {/* Image rows */}
      <div className="p-5 flex flex-col gap-4">
        {renderImageRow("profileImage")}
        {renderImageRow("backgroundImage")}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#171717]/70 backdrop-blur-[10px]">
          <div className="relative w-full max-w-2xl bg-[url('/dashboard/modelBg.png')] bg-cover bg-center rounded-xl p-8 shadow-2xl border border-white/10 text-white">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold tracking-wide">
                {modalType === "device"
                  ? "Select Image Type"
                  : "Paste Image URL"}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setImageUrl("");
                }}
                className="text-white hover:text-gray-300 transition"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>

            {/* URL Input */}
            {modalType === "link" && (
              <div className="mb-6">
                <label className="block text-sm mb-2 text-gray-300">
                  Paste Image URL
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-3 bg-zinc-800/50 border border-zinc-700 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-zinc-600"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 max-w-3xla mx-auto">
              <button
                onClick={() =>
                  modalType === "device"
                    ? triggerFileInput("profileImage")
                    : handleAddImageLink("profileImage")
                }
                className="min-w-[160px] px-4 py-3 bg-[#3570BC] text-white rounded-[138px] cursor-pointer hover:bg-blue-600 transition"
              >
                Use as Profile Image
              </button>
              <button
                onClick={() =>
                  modalType === "device"
                    ? triggerFileInput("backgroundImage")
                    : handleAddImageLink("backgroundImage")
                }
                className="min-w-[160px] px-4 py-3 bg-[#3570BC] text-white rounded-[138px] cursor-pointer hover:bg-blue-600 transition"
              >
                Use as Background Image
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setImageUrl("");
                }}
                className="min-w-[160px] px-4 py-3 border border-[#FFFFFF30] bg-transparent text-white rounded-[138px] cursor-pointer "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaTab;
