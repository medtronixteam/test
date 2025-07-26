"use client";
import Layout from "@/components/dashboard/Layout";
import { useState, useRef, useEffect } from "react";
import {
  ImageIcon,
  Hash,
  MessageCircle,
  AtSign,
  VideoIcon,
  Smile,
  ChevronDown,
  X,
  Plus,
  FacebookIcon,
  Instagram,
} from "lucide-react";
import PreviewRightBar from "@/components/dashboard/createPost/PreviewRightBar";
import PostPreset from "@/components/dashboard/createPost/PostPreset";

import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import PlatformModal from "@/components/dashboard/createPost/PlatformModal";
import PlatformSelectDropdown from "@/components/dashboard/createPost/PlatformSelectDropdown";
import { getPlatformIcon } from "@/utils/getPlatformIcon";
import { getUploadSignature } from "@/api/posts";
import { useUserConnections } from "@/context/UserConnectionsContext";

const platformPostTypes = {
  facebook: ["Post", "Story", "Reel"],
  instagram: ["Post", "Story", "Reel"],
  tiktok: ["Video"],
  // youtube: ["Video", "Short"],
  // twitter: ["Post", "Thread"],
  // linkedin: ["Post"],
  // pinterest: ["Pin"],
  // twitch: ["Stream"],
};


const postTypeLookup = {
  post: "Post",
  story: "Story",
  reel: "Reel",
  video: "Video",
  short: "Short",
  thread: "Thread",
  pin: "Pin",
  stream: "Stream",
};

const CreatePostModel = ({ setIsCreateModalOpen, selectedDate, selectedPost}) => {
  const modalRef = useRef();

  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [postTypes, setPostTypes] = useState(() => {
    if (selectedPlatforms.length > 0) {
      const firstPlatform = selectedPlatforms[0];
      return {
        [firstPlatform]: platformPostTypes[firstPlatform]?.[0] || "Post",
      };
    }
    return {};
  });

  const [activePlatform, setActivePlatform] = useState(
    selectedPlatforms[0] || null
  );

  const [caption, setCaption] = useState("");

  const [uploadedImages, setUploadedImages] = useState([
  ]);

  const [uploadedVideos, setUploadedVideos] = useState([]);

  const [characterCount, setCharacterCount] = useState(0);
  const [maxCharacters, setMaxCharacters] = useState(600);
  const [mediaCount, setMediaCount] = useState(2);
  const [maxMedia, setMaxMedia] = useState(30);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showPlatformModal, setShowPlatformModal] = useState(false);
  const { userConnections, userConnectionsLoading, userConnectionsError } = useUserConnections();


  const token = localStorage.getItem("accessToken");

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const fileInputRef = useRef(null);


  const handleCaptionChange = (e) => {
    const text = e.target.value;
    if (text.length > maxCharacters) return;
    setCaption(text);
    setCharacterCount(text.length);
  };


  // Helper to extract image metadata
  const getImageMetadata = (src) =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () =>
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
          aspectRatio: parseFloat((img.naturalWidth / img.naturalHeight).toFixed(3)),
        });
      img.onerror = () => resolve(null);
      img.src = src;
  });

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const totalFiles = uploadedVideos.length + uploadedImages.length + files.length;

    if (totalFiles > maxMedia) {
      alert(`You can upload a maximum of ${maxMedia} images and videos.`);
      return;
    }

    const analyzedImages = [];

    for (const file of files) {
      const previewURL = URL.createObjectURL(file);
      const metadata = await getImageMetadata(previewURL);

      if (!metadata) {
        alert(`Failed to read metadata for image "${file.name}".`);
        continue;
      }

      // e.g. you could enforce a minimum width/height here:
      // if (metadata.width < 300) { alert(...); continue; }

      analyzedImages.push({
        name:   file.name,
        metadata,
        file, // if you need to upload it later
      });
    }

    setUploadedImages((prev) => [...prev, ...analyzedImages]);
    setMediaCount(uploadedVideos.length + (uploadedImages.length + analyzedImages.length));
  };


  const addImagesFromUrl = async (urls) => {
    if (urls.length == 0) return;

    for (const url of urls){
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const file = new File([blob], "imageFromURL", { type: blob.type });

        const previewURL = URL.createObjectURL(file);
        const metadata = await getImageMetadata(previewURL);

        if (!metadata) {
          alert("Failed to read metadata for image from URL.");
          return;
        }

        setUploadedImages((prev) => [...prev, { name: "imageFromURL", metadata, file }]);
      } catch (error) {
        console.error("Error fetching image from URL:", error);
        alert("Failed to fetch image from URL.");
      }
    }
  };


  const removeImage = (index) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
    const totalFiles = uploadedVideos.length + uploadedImages.length;
    setMediaCount(totalFiles);
  };

  const getVideoMetadata = (src) => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "metadata";
  
      video.onloadedmetadata = () => {
        resolve({
          width: video.videoWidth,
          height: video.videoHeight,
          duration: video.duration,
          aspectRatio: parseFloat((video.videoWidth / video.videoHeight).toFixed(3)),
        });
  
        // Clean up
        URL.revokeObjectURL(video.src);
      };
  
      video.onerror = () => resolve(null);
  
      video.src = src;
    });
  };
  
  const handleVideoUpload = async (e) => {
    // let upload_signature = await getUploadSignature(token);
    // console.log("upload_signature", upload_signature);
    const files = Array.from(e.target.files);
    const totalFiles = uploadedVideos.length + uploadedImages.length + files.length;

    if (totalFiles > maxMedia) {
      alert(`You can upload a maximum of ${maxMedia} images and videos.`);
      return;
    }

    const newVideos = [];

    for (const file of files) {
      const videoURL = URL.createObjectURL(file);
      const metadata = await getVideoMetadata(videoURL);

      if (!metadata) {
        alert("Failed to read video metadata.");
        continue;
      }

      newVideos.push({
        name: file.name,
        metadata,
        file, // optional: include file if you need to upload later
      });
    }

    setUploadedVideos([...uploadedVideos, ...newVideos]);
    setMediaCount(totalFiles);
  };


  const addVideoFromUrl = async (urls) => {
    if (urls.length == 0) return;

    for (const url of urls){
      try {
        // const response = await fetch(url);
        // const blob = await response.blob();
        // const file = new File([blob], "videoFromURL", { type: blob.type });

        // const videoURL = URL.createObjectURL(file);
        const metadata = await getVideoMetadata(url);

        if (!metadata) {
          alert("Failed to read video metadata from URL.");
          return;
        }

        setUploadedVideos((prev) => [...prev, { name: "videoFromURL", metadata, url }]);
      } catch (error) {
        console.error("Error fetching video from URL:", error);
        alert("Failed to fetch video from URL.");
      }
    }
  };


  const removeVideo = (index) => {
    const newVideos = [...uploadedVideos];
    newVideos.splice(index, 1);
    setUploadedVideos(newVideos);
    const totalFiles = uploadedVideos.length + uploadedImages.length;
    setMediaCount(totalFiles);
  };
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  const triggerImageInput = () => {
    imageInputRef.current.click();
  };
  const triggerVideoInput = () => {
    videoInputRef.current.click();
  };
  
  const insertAtCursor = (value) => {
    const textarea = document.querySelector("textarea");
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const newText = text.slice(0, start) + value + text.slice(end);
    setCaption(newText);
    setCharacterCount(newText.length);
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + value.length;
    }, 0);
  };
  const handleEmojiSelect = (emoji) => {
    insertAtCursor(emoji.native);
    setShowEmojiPicker(false);
  };
  const handleInsertHashtag = () => {
    insertAtCursor(" #hashtag ");
  };
  const handleInsertMention = () => {
    insertAtCursor(" @username ");
  };
  const handleInsertComment = () => {
    insertAtCursor(" 💬 ");
  };
  const togglePlatform = (platform) => {
    let allConnectedPlatforms = userConnections.map(item => item.platform);
    if(!allConnectedPlatforms.includes(platform))
    {
      return;
    }
    setSelectedPlatforms((prev) => {
      const updatedPlatforms = prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform];

      // Agar new platform add ho raha hai
      if (!prev.includes(platform)) {
        console.log("Adding new platform", platform);
        setPostTypes((prevTypes) => ({
          ...prevTypes,
          [platform]: platformPostTypes[platform]?.[0] || "",
        }));
      } else {
        console.log("Removing platform", platform);
        // Agar platform remove ho raha hai, to uska postType bhi remove kar dein
        setPostTypes((prevTypes) => {
          const newTypes = { ...prevTypes };
          delete newTypes[platform];
          return newTypes;
        });
      }

      return updatedPlatforms;
    });
  };

  const handlePostTypeChange = (platform, newPostType) => {
    setPostTypes((prevPostTypes) => ({
      ...prevPostTypes,
      [platform]: newPostType,
    }));
  };
  
  useEffect(() => {
    const loadSelectedPost = async () => {
      if (selectedPost)
      {
        // Select Appropriate post types
        let allPlatforms = [];
        let allPlatformPostTypes = {};
        setSelectedPlatforms(selectedPost.platforms);
        for (const p_data of selectedPost.platform_data)
        {
          console.log("p_data.platform", p_data.platform);
          allPlatforms.push(p_data.platform);
          allPlatformPostTypes[p_data.platform] = postTypeLookup[p_data.postType];
        }
        
        setSelectedPlatforms(allPlatforms);
        setPostTypes(allPlatformPostTypes);

        // Add Media
        await addImagesFromUrl(selectedPost.media.image);
        await addVideoFromUrl(selectedPost.media.video);

        if (allPlatforms.length > 0){
          setActivePlatform(allPlatforms[0]);
        }
      }
    }
    loadSelectedPost();

  }, [selectedPost]);
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsCreateModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsCreateModalOpen]);


  return (
    <div className="fixed inset-0 backdrop-blur-[12px] bg-[#171717]/50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-[url('/dashboard/modelBg.png')] bg-[length:100%_100%]  bg-no-repeat p-6  w-full max-w-6xl "
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-white text-2xl font-semibold">Create Post</h1>
          <button
            onClick={() => setIsCreateModalOpen(false)}
            className="text-white cursor-pointer"
          >
            <X />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-5 max-h-[80vh] overflow-y-auto">
          {/* Left Panel - Post Creation */}
          <div className="md:w-3/5 w-[100%] ">
            <div className="flex gap-2 mb-4 flex-wrap">
              {selectedPlatforms.map((platform) => (
                <PlatformSelectDropdown
                  key={platform}
                  options={platformPostTypes[platform]}
                  selected={
                    postTypes[platform] || platformPostTypes[platform][0]
                  }
                  onSelect={(val) => handlePostTypeChange(platform, val)}
                  platform={platform}
                />
              ))}
              <button
                className="flex items-center justify-center w-11 h-11 border border-[#393939] rounded-[8px] backdrop-blur-[101.51px] cursor-pointer"
                onClick={() => setShowPlatformModal(true)}
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="border border-[#393939] rounded-[8px]">
              <div className="flex flex-wrap border-b border-[#393939]">
                {selectedPlatforms.length > 0 ? (
                  selectedPlatforms.map((platform) => (
                    <div
                      key={platform}
                      onClick={() => setActivePlatform(platform)}
                      className={`flex items-center py-3 px-5 border-r backdrop-blur-[101.51px] border-[#393939] text-white cursor-pointer ${
                        activePlatform === platform
                          ? "bg-[#444444]"
                          : "hover:bg-[#333333]"
                      }`}
                    >
                      <img
                        src={getPlatformIcon(platform)}
                        alt={platform}
                        className="w-5 h-5 object-contain"
                      />
                      <span className="ml-2 capitalize">{platform}</span>
                      <X
                        size={14}
                        className="ml-2 text-white/60 hover:text-white"
                        onClick={() => togglePlatform(platform)}
                      />
                    </div>
                  ))
                ) : (
                  <button className="flex items-center border-r border-[#393939] rounded-tl-[8px] py-3 px-5 bg-[#333333]">
                    Template <X size={14} className="ml-2" />
                  </button>
                )}
              </div>

              {/* Caption Input */}
              <div className=" p-4">
                <textarea
                  className="w-full bg-transparent border-none outline-none text-gray-300 placeholder-gray-600 resize-none"
                  placeholder="Enter post caption here..."
                  rows={8}
                  value={caption}
                  onChange={handleCaptionChange}
                ></textarea>
              </div>

              {/* Media Upload Area */}
              <div className="">
              {/* Image Upload Area */}
              <div className="flex space-x-3 p-4  border-b border-[#393939]">
              {uploadedImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative w-22 h-22 rounded-sm overflow-hidden"
                    >
                      <img
                        src={URL.createObjectURL(img.file)}
                        onLoad={e => URL.revokeObjectURL(e.target.src)}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <button
                        className="absolute top-1 right-1 bg-gray-900 rounded-full p-0.5"
                        onClick={() => removeImage(index)}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}

              {uploadedVideos.map((video, index) => (
                    <div
                      key={index}
                      className="relative w-22 h-22 rounded-sm overflow-hidden"
                    >
                      <div className="relative w-full h-full">
                      <video
                        src={video.file ? URL.createObjectURL(video.file) : video.url}
                        onLoad={e => URL.revokeObjectURL(e.target.src)}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                      />

                      {/* Playback icon overlay */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 text-white opacity-80"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                    </div>
                      <button
                        className="absolute top-1 right-1 bg-gray-900 rounded-full p-0.5"
                        onClick={() => removeVideo(index)}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}

                  <input
                    type="file"
                    ref={imageInputRef}
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                </div>
                {/* Video Upload Area */}
                <div className="flex space-x-3 p-4  border-b border-[#393939]">
                  <input
                    type="file"
                    ref={videoInputRef}
                    className="hidden"
                    accept="video/*"
                    multiple
                    onChange={handleVideoUpload}
                  />
                </div>

                {/* Media Tools */}
                <div className="flex  p-4 justify-between items-center">
                  <div className="space-x-6 relative ">
                  <button
                      className="text-gray-400 hover:text-white"
                      onClick={triggerImageInput}
                    >
                      <ImageIcon size={20} />
                    </button>
                    <button
                      className="text-gray-400 hover:text-white"
                      onClick={triggerVideoInput}
                    >
                      <VideoIcon size={20} />
                    </button>
                    <button
                      className="text-gray-400 hover:text-white"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                      <Smile size={20} />
                    </button>

                    {showEmojiPicker && (
                      <div className="absolute z-50 bottom-14">
                        <Picker
                          data={data}
                          onEmojiSelect={handleEmojiSelect}
                          theme="dark"
                        />
                      </div>
                    )}

                    <button
                      className="text-gray-400 hover:text-white"
                      onClick={handleInsertHashtag}
                    >
                      <Hash size={20} />
                    </button>
                    <button
                      className="text-gray-400 hover:text-white"
                      onClick={handleInsertComment}
                    >
                      <MessageCircle size={20} />
                    </button>
                    <button
                      className="text-gray-400 hover:text-white"
                      onClick={handleInsertMention}
                    >
                      <AtSign size={20} />
                    </button>
                  </div>
                  <div className="flex justify-end items-center text-xs text-gray-500">
                    <span>
                      {characterCount}/{maxCharacters} - {mediaCount}/{maxMedia}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <PostPreset
                postTypes={postTypes}
                selectedPlatforms={selectedPlatforms}
                selectedDate={selectedDate}
                setIsCreateModalOpen={setIsCreateModalOpen}
                postCaption = {caption}
                selectedImages = {uploadedImages}
                selectedVideos = {uploadedVideos}
                selectedPost = {selectedPost}
              />
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="md:w-2/5 w-[100%]   ">
            <PreviewRightBar
              selectedPlatforms={selectedPlatforms}
              postTypes={postTypes}
              setActivePlatform={setActivePlatform}
              activePlatform={activePlatform}
              postContent={
                {
                  text : caption,
                  image: uploadedImages[0] || null,
                  video: uploadedVideos[0] || null,
                }
              }
            />
          </div>
        </div>
        {showPlatformModal && (
          <PlatformModal
            togglePlatform={togglePlatform}
            setShowPlatformModal={setShowPlatformModal}
            selectedPlatforms={selectedPlatforms}
          />
        )}
      </div>
    </div>
  );
};

export default CreatePostModel;
