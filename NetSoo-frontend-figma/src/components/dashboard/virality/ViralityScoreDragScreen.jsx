import React from "react";
import { useState, useRef } from "react";
import { ChevronDown, Upload, X } from "lucide-react";
import { getPlatformIcon } from "@/utils/getPlatformIcon";
const platforms = [
  { label: "Facebook", value: "facebook" },
  { label: "Instagram", value: "instagram" },
  { label: "Twitter", value: "twitter" },
];
const ViralityScoreDragScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState([
    "Hashtag 01",
    "Hashtag 02",
    "Hashtag 03",
  ]);
  const [hashtagInput, setHashtagInput] = useState("");
  const [selected, setSelected] = useState(platforms[0]);
  const [open, setOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([
    "/dashboard/dummyPost1.png",
    "/dashboard/dummyPost1.png",
  ]);
  const fileInputRef = useRef(null);

  const handleHashtagKeyDown = (e) => {
    if (e.key === "Enter" && hashtagInput.trim()) {
      e.preventDefault();
      addHashtag();
    }
  };

  const addHashtag = () => {
    if (hashtagInput.trim()) {
      setHashtags([...hashtags, hashtagInput.trim()]);
      setHashtagInput("");
    }
  };

  const removeHashtag = (index) => {
    setHashtags(hashtags.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setTitle("");
    setDescription("");
    setHashtags([]);
    setUploadedImages([]);
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setUploadedImages([...uploadedImages, ...newImages]);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="border border-[#FFFFFF30] rounded-[20px] text-white p-5 backdrop-blur-[120.57px]">
      {/* Upload Area */}
      <div
        onClick={triggerFileInput}
        className="bg-[#252B32] border-2 border-dashed border-[#3570BC] rounded-[12px] p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-800/50 transition-colors duration-200 mb-6"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept="image/*,video/*"
          multiple
        />
        <Upload className="w-6 h-6 mb-2 text-gray-400" />
        <h3 className="text-lg font-medium mb-1">Upload Images</h3>
        <p className="text-gray-400 text-sm">
          Drag & drop or click here to upload image/videos
        </p>
      </div>

      {/* Uploaded Images Preview */}
      {uploadedImages.length > 0 && (
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {uploadedImages.map((image, index) => (
            <div key={index} className="relative mt-2">
              <img
                src={image || "/placeholder.svg"}
                alt={`Uploaded ${index + 1}`}
                className="w-20 h-20 object-cover rounded-md"
              />
              <button
                onClick={() =>
                  setUploadedImages(
                    uploadedImages.filter((_, i) => i !== index)
                  )
                }
                className="absolute -top-2 -right-2 bg-[#3570BC] rounded-full p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Platform Selector */}
      {/* <div className="mb-6">
        <button className="flex items-center gap-2 bg-gray-800 rounded-md px-3 py-2 hover:bg-gray-700 transition-colors duration-200">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 via-pink-600 to-yellow-500 flex items-center justify-center">
            <span className="text-white text-xs">📷</span>
          </div>
          <span>Instagram</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-1"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </div> */}
      <div className="relative w-full md:w-72 mb-6">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full px-3 py-3 border border-zinc-700 rounded-[8px] bg-[#1e1e1e] text-white"
        >
          <div className="flex items-center gap-2">
            <img
              src={getPlatformIcon(selected.value)}
              alt={selected.label}
              className="w-5 h-5"
            />
            <span>{selected.label}</span>
          </div>
          <ChevronDown className="w-4 h-4 text-zinc-400" />
        </button>

        {open && (
          <div className="absolute mt-2 w-full bg-[#1e1e1e] border border-zinc-700 rounded-[8px] shadow-md z-10">
            {platforms.map((platform) => (
              <button
                key={platform.value}
                onClick={() => {
                  setSelected(platform);
                  setOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 w-full text-left text-white hover:bg-zinc-800"
              >
                <img
                  src={getPlatformIcon(platform.value)}
                  alt={platform.label}
                  className="w-5 h-5"
                />
                {platform.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Title Input */}
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Video or short title"
          className="w-full px-3 py-3 bg-zinc-800/50 border border-zinc-700 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-zinc-600"
        />
      </div>

      {/* Description Textarea */}
      <div className="mb-4 relative">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a short description here..."
          maxLength={200}
          rows={4}
          className="w-full px-3 py-3 bg-zinc-800/50 border border-zinc-700 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-zinc-600 resize-none"
        />
        <div className="absolute bottom-3 right-3 text-xs text-gray-400">
          {description.length}/200
        </div>
      </div>

      {/* Hashtag Input */}
      <div className="mb-6">
        <input
          type="text"
          value={hashtagInput}
          onChange={(e) => setHashtagInput(e.target.value)}
          onKeyDown={handleHashtagKeyDown}
          placeholder="Add ( ) after entering a keyword to make a hashtag"
          className="w-full px-3 py-3 bg-zinc-800/50 border border-zinc-700 rounded-[8px] focus:outline-none focus:ring-1 focus:ring-zinc-600 mb-3"
        />

        {/* Hashtags */}
        <div className="flex flex-wrap gap-2">
          {hashtags.map((hashtag, index) => (
            <div
              key={index}
              className="border border-zinc-700  rounded-full px-4 py-2 flex items-center gap-1 text-sm"
            >
              <span>{hashtag}</span>
              <button
                onClick={() => removeHashtag(index)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={handleClearAll}
          className=" px-8 py-3 border border-[#FFFFFF30] bg-transparent text-white rounded-[138px] cursor-pointer "
        >
          Clear All
        </button>
        <button className="bg-[#3570BC] hover:bg-blue-600 text-white px-4 py-2 rounded-[138px] transition-colors duration-200">
          Check Virality Score
        </button>
      </div>
    </div>
  );
};

export default ViralityScoreDragScreen;
