import { getPlatformIcon } from "@/utils/getPlatformIcon";
import {
  Pin,
  Eye,
  Play,
  Info,
  Send,
  Heart,
  Share2,
  Monitor,
  Repeat2,
  ThumbsUp,
  Bookmark,
  Smartphone,
  MessageSquare,
  MessageCircle,
  MoreHorizontal,
  Camera,
} from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useUserConnections } from "@/context/UserConnectionsContext";

const PreviewRightBar = ({
  type,
  selectedPlatforms,
  setActivePlatform,
  activePlatform,
  postTypes,
  postContent = {
    text: "Duis aute irure dolor in reprehenderit",
    image: "/dashboard/sample.svg?height=400&width=400",
    video: "",
    title: "",
  },
}) => {
  const [viewMode, setViewMode] = useState("default");
  const activePostType = postTypes[activePlatform];
  const { userConnections, userConnectionsLoading, userConnectionsError } = useUserConnections();

  let [accountTitles, setAccountTitles] = useState({});


  useEffect(() => {
    let userAccountTitles = userConnections.reduce((acc, item) => {
      acc[item.platform] = item.account_title;
      return acc;
    }, {});
    setAccountTitles(userAccountTitles);
  }, [userConnections])


  const renderPlatformPreview = () => {
    switch (activePlatform) {
      case "instagram":
        return renderInstagramPreview();
      case "facebook":
        return renderFacebookPreview();
      case "twitter":
        return renderTwitterPreview();
      case "linkedin":
        return renderLinkedinPreview();
      case "youtube":
        return renderYoutubePreview();
      case "tiktok":
        return renderTiktokPreview();
      case "pinterest":
        return renderPinterestPreview();
      case "twitch":
        return renderTwitchPreview();
      default:
        return (
          <div className="flex flex-col items-center justify-center text-center text-gray-400 py-20">
            <img
              src="/dashboard/placeholder-platform.svg"
              alt="Select platform"
              className="w-24 h-24 mb-4 opacity-50"
            />
            <p className="text-lg font-medium">
              Select a platform to preview the post
            </p>
            <p className="text-sm mt-1 text-gray-500">
              Click on a platform icon above to view preview
            </p>
          </div>
        );
    }
  };

  // Instagram preview
  const renderInstagramPreview = () => {
    if (activePostType === "Story") {
      return (
        <div className="flex flex-col h-full">
          <div className="aspect-[9/16] bg-gradient-to-b from-gray-800 to-gray-900 relative">
              {postContent.image ? (
                  <img
                    src={postContent.image.file ? URL.createObjectURL(postContent.image.file) : postContent.image.url}
                    alt="Story content"
                    className="w-full h-full object-cover"
                  />
                ) :  postContent.video ? (
                  <video
                    src={postContent.video.file ? URL.createObjectURL(postContent.video.file) : postContent.video.url}
                    alt="Story content"
                    className="w-full h-full object-cover"
                  />
                ) : (<></>)
                }
            <div className="absolute top-4 left-0 right-0 flex justify-between px-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-pink-500 flex items-center justify-center overflow-hidden">
                  <img
                    src="/dashboard/sample.svg?height=32&width=32"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-white text-sm font-medium">
                  {accountTitles["tiktok"]}
                </span>
              </div>
              <MoreHorizontal size={20} className="text-white" />
            </div>
            <div className="absolute bottom-6 left-0 right-0 flex justify-between px-4">
              <input
                type="text"
                placeholder="Send message"
                className="bg-transparent border-white/20 border rounded-full text-white px-4 py-2 text-sm w-full"
                readOnly
              />
              <div className="flex items-center ml-2">
                <Heart size={20} className="text-white" />
                <Send size={20} className="text-white ml-4" />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (activePostType === "Reel") {
      return (
        <div className="flex flex-col h-full">
          <div className="aspect-[9/16] bg-gradient-to-b from-gray-800 to-gray-900 relative">
              {postContent.image ? (
                <img
                  src={postContent.image.file ? URL.createObjectURL(postContent.image.file) : postContent.image.url}
                  alt="Story content"
                  className="w-full h-full object-cover"
                />
              ) :  postContent.video ? (
                <video
                  src={postContent.video.file ? URL.createObjectURL(postContent.video.file) : postContent.video.url}
                  alt="Story content"
                  className="w-full h-full object-cover"
                />
              ) : (<></>)
              }
            <div className="absolute inset-0 flex items-center justify-center">
              <Play size={48} className="text-white/70" />
            </div>
            <div className="absolute top-4 left-0 right-0 flex justify-between px-4">
              <div className="flex items-center space-x-2">
                <span className="text-white text-sm font-medium">Reels</span>
              </div>
              <div className="flex items-center space-x-4">
                <Camera size={20} className="text-white" />
                <MoreHorizontal size={20} className="text-white" />
              </div>
            </div>
            <div className="absolute bottom-4 right-4 flex flex-col items-center space-y-6">
              <div className="flex flex-col items-center">
                <Heart size={28} className="text-white mb-1" />
                <span className="text-white text-xs">24.5k</span>
              </div>
              <div className="flex flex-col items-center">
                <MessageCircle size={28} className="text-white mb-1" />
                <span className="text-white text-xs">1,012</span>
              </div>
              <div className="flex flex-col items-center">
                <Send size={28} className="text-white mb-1" />
                <span className="text-white text-xs">Send</span>
              </div>
              <div className="flex flex-col items-center">
                <MoreHorizontal size={28} className="text-white mb-1" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4">
              <div className="text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src="/dashboard/sample.svg?height=32&width=32"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">{accountTitles["tiktok"]}</span>
                </div>
                <p className="text-sm">{postContent.text}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default Instagram Post
    return (
      <>
        <div className="flex justify-between items-center p-4 backdrop-blur-[119.29px]">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full mr-3 flex items-center justify-center overflow-hidden">
              <img
                src="/dashboard/sample.svg?height=40&width=40"
                alt="Profile"
                className="rounded-full h-full w-full object-cover"
              />
            </div>
            <span className="text-md font-medium">{accountTitles["tiktok"]}</span>
          </div>
          <MoreHorizontal size={18} />
        </div>

        <div className="aspect-square">
          {postContent.image ? (
            <img
              src={postContent.image.file ? URL.createObjectURL(postContent.image.file) : postContent.image.url}
              alt="Story content"
              className="w-full h-full object-cover"
            />
          ) :  postContent.video ? (
            <video
              src={postContent.video.file ? URL.createObjectURL(postContent.video.file) : postContent.video.url}
              alt="Story content"
              className="w-full h-full object-cover"
            />
          ) : (<></>)
          }
        </div>

        <div className="flex justify-between p-4">
          <div className="flex space-x-4">
            <Heart size={20} />
            <MessageCircle size={20} />
            <Send size={20} />
          </div>
          <Bookmark size={20} />
        </div>

        <div className="px-3 pb-3">
          <p className="text-md mb-1">
            <span className="font-medium">shoeibaro431</span>
          </p>
          <p className="text-sm text-[#A7A7A7]">{postContent.text}</p>
        </div>
      </>
    );
  };

  // Facebook preview
  const renderFacebookPreview = () => {
    if (activePostType === "Story") {
      return (
        <div className="flex flex-col h-full">
          <div className="aspect-[9/16] bg-gradient-to-b from-gray-800 to-gray-900 relative">
          {postContent.image ? (
            <img
              src={postContent.image.file ? URL.createObjectURL(postContent.image.file) : postContent.image.url}
              alt="Story content"
              className="w-full h-full object-cover"
            />
          ) :  postContent.video ? (
            <video
              src={postContent.video.file ? URL.createObjectURL(postContent.video.file) : postContent.video.url}
              alt="Story content"
              className="w-full h-full object-cover"
            />
          ) : (<></>)
          }
            <div className="absolute top-4 left-0 right-0 flex justify-between px-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center overflow-hidden">
                  <img
                    src="/dashboard/sample.svg?height=40&width=40"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-white text-sm font-medium">
                  {accountTitles["facebook"]}
                </span>
              </div>
              <MoreHorizontal size={20} className="text-white" />
            </div>
          </div>
        </div>
      );
    } else if (activePostType === "Reel") {
      return (
        <div className="flex flex-col h-full">
          <div className="aspect-[9/16] bg-gradient-to-b from-gray-800 to-gray-900 relative">
            {postContent.image ? (
                <img
                  src={postContent.image.file ? URL.createObjectURL(postContent.image.file) : postContent.image.url}
                  alt="Story content"
                  className="w-full h-full object-cover"
                />
              ) :  postContent.video ? (
                <video
                  src={postContent.video.file ? URL.createObjectURL(postContent.video.file) : postContent.video.url}
                  alt="Story content"
                  className="w-full h-full object-cover"
                />
              ) : (<></>)
              }
            <div className="absolute inset-0 flex items-center justify-center">
              <Play size={48} className="text-white/70" />
            </div>
            <div className="absolute bottom-4 right-4 flex flex-col items-center space-y-6">
              <div className="flex flex-col items-center">
                <ThumbsUp size={28} className="text-white mb-1" />
                <span className="text-white text-xs">24.5k</span>
              </div>
              <div className="flex flex-col items-center">
                <MessageSquare size={28} className="text-white mb-1" />
                <span className="text-white text-xs">1,012</span>
              </div>
              <div className="flex flex-col items-center">
                <Share2 size={28} className="text-white mb-1" />
                <span className="text-white text-xs">Share</span>
              </div>
            </div>
            <div className="absolute bottom-4 left-4">
              <div className="text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src="/dashboard/sample.svg?height=32&width=32"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm font-medium">{accountTitles["facebook"]}</span>
                </div>
                <p className="text-sm">{postContent.text}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default Facebook Post
    return (
      <>
        <div className="flex justify-between items-center p-4 bg-[#242526]">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full mr-3 flex items-center justify-center overflow-hidden">
              <img
                src="/dashboard/sample.svg?height=40&width=40"
                alt="Profile"
                className="rounded-full h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-md font-medium">{accountTitles["facebook"]}</span>
              <span className="text-xs text-[#B0B3B8]">2h · 🌍</span>
            </div>
          </div>
          <MoreHorizontal size={18} />
        </div>

        <div className="p-4 bg-[#242526] text-[#E4E6EB]">
          <p className="text-sm">{postContent.text}</p>
        </div>

        <div className="aspect-[4/3]">
          {postContent.image ? (
            <img
              src={postContent.image.file ? URL.createObjectURL(postContent.image.file) : postContent.image.url}
              alt="Story content"
              className="w-full h-full object-cover"
            />
          ) :  postContent.video ? (
            <video
              src={postContent.video.file ? URL.createObjectURL(postContent.video.file) : postContent.video.url}
              alt="Story content"
              className="w-full h-full object-cover"
            />
          ) : (<></>)
          }
        </div>

        <div className="flex justify-between items-center px-4 py-2 bg-[#242526] text-[#B0B3B8] text-xs">
          <div className="flex items-center">
            <ThumbsUp size={16} className="text-[#2078F4] mr-1" />
            <span>24K</span>
          </div>
          <div className="flex space-x-2">
            <span>1.2K comments</span>
            <span>3.5K shares</span>
          </div>
        </div>

        <div className="flex justify-between p-2 border-t border-[#393939] bg-[#242526]">
          <button className="flex items-center justify-center flex-1 py-1 text-[#B0B3B8] hover:bg-[#3A3B3C] rounded">
            <ThumbsUp size={18} className="mr-2" />
            <span className="text-sm">Like</span>
          </button>
          <button className="flex items-center justify-center flex-1 py-1 text-[#B0B3B8] hover:bg-[#3A3B3C] rounded">
            <MessageSquare size={18} className="mr-2" />
            <span className="text-sm">Comment</span>
          </button>
          <button className="flex items-center justify-center flex-1 py-1 text-[#B0B3B8] hover:bg-[#3A3B3C] rounded">
            <Share2 size={18} className="mr-2" />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </>
    );
  };

  // Twitter preview
  const renderTwitterPreview = () => {
    if (activePostType === "Thread") {
      return (
        <div className="flex flex-col bg-black text-white">
          <div className="p-4 border-b border-[#2F3336]">
            <div className="flex">
              <div className="mr-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src="/dashboard/sample.svg?height=40&width=40"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-bold mr-1">shoeibaro431</span>
                  <span className="text-[#71767B] text-sm">
                    @shoeibaro431 · 2h
                  </span>
                </div>
                <p className="mt-1 mb-2">{postContent.text}</p>
                <div className="rounded-xl overflow-hidden mt-2 mb-3">
                  <img
                    src={
                      postContent.image ||
                      "/dashboard/sample.svg?height=300&width=400"
                    }
                    alt="Post content"
                    className="w-full object-cover"
                  />
                </div>
                <div className="flex justify-between text-[#71767B] mt-2">
                  <button className="flex items-center hover:text-[#1D9BF0]">
                    <MessageCircle size={16} className="mr-1" />
                    <span>42</span>
                  </button>
                  <button className="flex items-center hover:text-[#00BA7C]">
                    <Repeat2 size={16} className="mr-1" />
                    <span>128</span>
                  </button>
                  <button className="flex items-center hover:text-[#F91880]">
                    <Heart size={16} className="mr-1" />
                    <span>1.5K</span>
                  </button>
                  <button className="flex items-center hover:text-[#1D9BF0]">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-b border-[#2F3336]">
            <div className="flex">
              <div className="mr-3 relative">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src="/dashboard/sample.svg?height=40&width=40"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-10 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-[#2F3336]"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <span className="font-bold mr-1">shoeibaro431</span>
                  <span className="text-[#71767B] text-sm">
                    @shoeibaro431 · 2h
                  </span>
                </div>
                <p className="mt-1">
                  Continuing the thread with more insights about this topic...
                </p>
                <div className="flex justify-between text-[#71767B] mt-2">
                  <button className="flex items-center hover:text-[#1D9BF0]">
                    <MessageCircle size={16} className="mr-1" />
                    <span>12</span>
                  </button>
                  <button className="flex items-center hover:text-[#00BA7C]">
                    <Repeat2 size={16} className="mr-1" />
                    <span>45</span>
                  </button>
                  <button className="flex items-center hover:text-[#F91880]">
                    <Heart size={16} className="mr-1" />
                    <span>820</span>
                  </button>
                  <button className="flex items-center hover:text-[#1D9BF0]">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default Twitter Post
    return (
      <div className="flex flex-col bg-black text-white">
        <div className="p-4">
          <div className="flex">
            <div className="mr-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src="/dashboard/sample.svg?height=40&width=40"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-bold mr-1">shoeibaro431</span>
                <span className="text-[#71767B] text-sm">
                  @shoeibaro431 · 2h
                </span>
              </div>
              <p className="mt-1 mb-2">{postContent.text}</p>
              <div className="rounded-xl overflow-hidden mt-2 mb-3">
                <img
                  src={
                    postContent.image ||
                    "/dashboard/sample.svg?height=300&width=400"
                  }
                  alt="Post content"
                  className="w-full object-cover"
                />
              </div>
              <div className="flex justify-between text-[#71767B] mt-2">
                <button className="flex items-center hover:text-[#1D9BF0]">
                  <MessageCircle size={16} className="mr-1" />
                  <span>42</span>
                </button>
                <button className="flex items-center hover:text-[#00BA7C]">
                  <Repeat2 size={16} className="mr-1" />
                  <span>128</span>
                </button>
                <button className="flex items-center hover:text-[#F91880]">
                  <Heart size={16} className="mr-1" />
                  <span>1.5K</span>
                </button>
                <button className="flex items-center hover:text-[#1D9BF0]">
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // LinkedIn preview
  const renderLinkedinPreview = () => {
    return (
      <div className="flex flex-col bg-white text-black">
        <div className="p-4">
          <div className="flex items-start">
            <div className="mr-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src="/dashboard/sample.svg?height=48&width=48"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-col">
                <span className="font-bold">shoeibaro431</span>
                <span className="text-[#666] text-xs">
                  Digital Marketing Specialist
                </span>
                <span className="text-[#666] text-xs">2h · 🌍</span>
              </div>
              <p className="mt-2 text-sm">{postContent.text}</p>
            </div>
            <div>
              <MoreHorizontal size={18} className="text-[#666]" />
            </div>
          </div>

          <div className="mt-3 border border-[#e0e0e0] rounded-md overflow-hidden">
            <img
              src={
                postContent.image ||
                "/dashboard/sample.svg?height=300&width=400"
              }
              alt="Post content"
              className="w-full object-cover"
            />
            {postContent.title && (
              <div className="p-3 bg-white">
                <h3 className="font-medium text-sm">{postContent.title}</h3>
                <p className="text-xs text-[#666] mt-1">linkedin.com</p>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-2 pt-2 text-[#666]">
            <div className="flex items-center text-xs">
              <ThumbsUp size={12} className="text-[#0a66c2] mr-1" />
              <span>248</span>
            </div>
            <div className="text-xs">
              <span>42 comments</span>
            </div>
          </div>

          <div className="flex justify-between mt-2 pt-2 border-t border-[#e0e0e0]">
            <button className="flex items-center justify-center flex-1 py-1 text-[#666] hover:bg-[#f3f3f3] rounded">
              <ThumbsUp size={18} className="mr-2" />
              <span className="text-sm">Like</span>
            </button>
            <button className="flex items-center justify-center flex-1 py-1 text-[#666] hover:bg-[#f3f3f3] rounded">
              <MessageSquare size={18} className="mr-2" />
              <span className="text-sm">Comment</span>
            </button>
            <button className="flex items-center justify-center flex-1 py-1 text-[#666] hover:bg-[#f3f3f3] rounded">
              <Repeat2 size={18} className="mr-2" />
              <span className="text-sm">Repost</span>
            </button>
            <button className="flex items-center justify-center flex-1 py-1 text-[#666] hover:bg-[#f3f3f3] rounded">
              <Send size={18} className="mr-2" />
              <span className="text-sm">Send</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // YouTube preview
  const renderYoutubePreview = () => {
    if (activePostType === "Short") {
      return (
        <div className="flex flex-col h-full">
          <div className="aspect-[9/16] bg-black relative">
            <img
              src={
                postContent.image ||
                "/dashboard/sample.svg?height=800&width=450"
              }
              alt="YouTube Short"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Play size={48} className="text-white/70" />
            </div>
            <div className="absolute bottom-4 right-4 flex flex-col items-center space-y-6">
              <div className="flex flex-col items-center">
                <ThumbsUp size={28} className="text-white mb-1" />
                <span className="text-white text-xs">24.5k</span>
              </div>
              <div className="flex flex-col items-center">
                <MessageSquare size={28} className="text-white mb-1" />
                <span className="text-white text-xs">1,012</span>
              </div>
              <div className="flex flex-col items-center">
                <Share2 size={28} className="text-white mb-1" />
                <span className="text-white text-xs">Share</span>
              </div>
            </div>
            <div className="absolute bottom-4 left-4">
              <div className="text-white">
                <p className="text-sm font-medium mb-2">{postContent.text}</p>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img
                      src="/dashboard/sample.svg?height=32&width=32"
                      alt="Channel"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm">shoeibaro431</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default YouTube Video
    return (
      <div className="flex flex-col bg-white">
        <div className="aspect-video bg-black relative">
          <img
            src={
              postContent.image || "/dashboard/sample.svg?height=225&width=400"
            }
            alt="YouTube Video"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Play size={48} className="text-white/70" />
          </div>
          <div className="absolute bottom-2 right-2 bg-black text-white text-xs px-1">
            10:28
          </div>
        </div>

        <div className="p-3">
          <div className="flex">
            <div className="mr-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src="/dashboard/sample.svg?height=40&width=40"
                  alt="Channel"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h3 className="font-medium text-sm line-clamp-2">
                {postContent.text ||
                  "How to master digital marketing strategies in 2023"}
              </h3>
              <p className="text-[#606060] text-xs mt-1">shoeibaro431</p>
              <p className="text-[#606060] text-xs">24K views · 2 weeks ago</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // TikTok preview
  const renderTiktokPreview = () => {
    return (
      <div className="flex flex-col h-full">
        <div className="aspect-[9/16] bg-black relative">
          <img
            src={
              postContent.image || "/dashboard/sample.svg?height=800&width=450"
            }
            alt="TikTok Video"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Play size={48} className="text-white/70" />
          </div>
          <div className="absolute bottom-4 right-4 flex flex-col items-center space-y-6">
            <div className="flex flex-col items-center">
              <Heart size={28} className="text-white mb-1" />
              <span className="text-white text-xs">24.5k</span>
            </div>
            <div className="flex flex-col items-center">
              <MessageCircle size={28} className="text-white mb-1" />
              <span className="text-white text-xs">1,012</span>
            </div>
            <div className="flex flex-col items-center">
              <Share2 size={28} className="text-white mb-1" />
              <span className="text-white text-xs">Share</span>
            </div>
            <div className="flex flex-col items-center">
              <Bookmark size={28} className="text-white mb-1" />
              <span className="text-white text-xs">Save</span>
            </div>
          </div>
          <div className="absolute bottom-4 left-4">
            <div className="text-white">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src="/dashboard/sample.svg?height=32&width=32"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium">{accountTitles["tiktok"]}</span>
              </div>
              <p className="text-sm">{postContent.text}</p>
              <p className="text-xs mt-2">#trending #viral #tiktok</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Pinterest preview
  const renderPinterestPreview = () => {
    return (
      <div className="flex flex-col bg-white">
        <div className="rounded-lg overflow-hidden">
          <div className="relative">
            <img
              src={
                postContent.image ||
                "/dashboard/sample.svg?height=600&width=400"
              }
              alt="Pinterest Pin"
              className="w-full object-cover"
              style={{ aspectRatio: "2/3" }}
            />
            <div className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2">
              <Pin size={16} />
            </div>
          </div>

          <div className="p-3">
            <p className="text-sm font-medium line-clamp-2">
              {postContent.text ||
                "Creative design inspiration for your next project"}
            </p>
            <div className="flex items-center mt-2">
              <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                <img
                  src="/dashboard/sample.svg?height=24&width=24"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs text-[#666]">shoeibaro431</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTwitchPreview = () => {
    return (
      <div className="bg-[#18181b] rounded-[8px] overflow-hidden text-white max-w-[400px] mx-auto">
        {/* Stream Thumbnail */}
        <div className="relative w-full aspect-video bg-black">
          <img
            src={postContent.image || "/dashboard/sample.svg"}
            alt="Stream thumbnail"
            className="w-full h-full object-cover"
          />
          <span className="absolute top-2 left-2 bg-red-600 text-xs font-bold px-2 py-0.5 rounded">
            LIVE
          </span>
          <span className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 text-xs rounded">
            1080p • 60FPS
          </span>
        </div>

        {/* Stream Info */}
        <div className="flex p-3 space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src="/dashboard/sample.svg"
              alt="Streamer profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-semibold text-sm">shoeibaro431</h4>
            <p className="text-xs text-gray-400 truncate">
              {postContent.text || "Playing some crazy games live!"}
            </p>
            <div className="text-xs text-purple-400 mt-1">Just Chatting</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="border border-[#393939] rounded-[8px]">
      <div className="flex justify-between p-4 border-b border-[#393939]">
        <div className="flex space-x-2">
          {selectedPlatforms.map((platform) => (
            <div
              onClick={() => setActivePlatform(platform)}
              key={platform}
              className={`w-10 h-10 flex items-center justify-center rounded-full border cursor-pointer 
                ${
                  activePlatform === platform
                    ? "border-white"
                    : "border-white/20 hover:bg-white/10"
                } transition`}
            >
              <img
                src={getPlatformIcon(platform)}
                alt={platform}
                className="w-5 h-5 object-contain"
              />
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode("default")}
            className={`p-2 border  rounded-[8px] cursor-pointer ${
              viewMode === "default"
                ? "text-white border-white "
                : "text-white/70 border-[#4A4A4A]"
            }`}
          >
            <Eye size={20} />
          </button>
          <button
            onClick={() => setViewMode("mobile")}
            className={`p-2 border  rounded-[8px] cursor-pointer ${
              viewMode === "mobile"
                ? "text-white border-white"
                : "text-white/70 border-[#4A4A4A]"
            }`}
          >
            <Smartphone size={20} />
          </button>
          <button
            onClick={() => setViewMode("desktop")}
            className={`p-2 border  rounded-[8px] cursor-pointer  ${
              viewMode === "desktop"
                ? "text-white border-white"
                : "text-white/70 border-[#4A4A4A]"
            }`}
          >
            <Monitor size={20} />
          </button>
        </div>
      </div>

      {activePlatform && (
        <div
          className={`rounded-[9.4px] overflow-hidden relative my-20 m-8  border border-[#393939] mx-auto ${
            viewMode === "mobile"
              ? "max-w-[275px]"
              : viewMode === "desktop"
              ? "max-w-[320px] md:max-w-[450px]"
              : "max-w-[350px] md:max-w-[400px]"
          }`}
        >
          {renderPlatformPreview()}
        </div>
      )}

      {type != "campaign" && (
        <>
          <div className="flex justify-center mb-5">
            <Link href="/dashboard/AI-virality">
              <button className="flex justify-center gap-3 items-center px-5 py-2.5 border border-[#FFFFFF30] bg-transparent text-white rounded-[8px] cursor-pointer ">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.75 3.79923C17.75 3.36223 17.483 2.96923 17.076 2.80823C16.669 2.64723 16.205 2.75123 15.906 3.07023C14.004 5.09923 11.347 6.25023 8.567 6.25023C7.36 6.25023 6.095 6.25023 5 6.25023C4.005 6.25023 3.052 6.64523 2.348 7.34823C1.645 8.05223 1.25 9.00523 1.25 10.0002V11.0002C1.25 11.9952 1.645 12.9482 2.348 13.6522C3.052 14.3552 4.005 14.7502 5 14.7502H8.567C11.347 14.7502 14.004 15.9012 15.906 17.9302C16.205 18.2492 16.669 18.3532 17.076 18.1922C17.483 18.0312 17.75 17.6382 17.75 17.2012C17.75 14.6012 17.75 6.39923 17.75 3.79923Z"
                    fill="#3570BC"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M22 9.75H20.5C20.086 9.75 19.75 10.086 19.75 10.5C19.75 10.914 20.086 11.25 20.5 11.25H22C22.414 11.25 22.75 10.914 22.75 10.5C22.75 10.086 22.414 9.75 22 9.75Z"
                    fill="#3570BC"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M19.1887 14.5002L20.2497 15.5612C20.5427 15.8532 21.0177 15.8532 21.3107 15.5612C21.6027 15.2682 21.6027 14.7932 21.3107 14.5002L20.2497 13.4392C19.9567 13.1472 19.4817 13.1472 19.1887 13.4392C18.8967 13.7322 18.8967 14.2072 19.1887 14.5002Z"
                    fill="#3570BC"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20.2497 7.56121L21.3107 6.50021C21.6027 6.20721 21.6027 5.73221 21.3107 5.43921C21.0177 5.14721 20.5427 5.14721 20.2497 5.43921L19.1887 6.50021C18.8967 6.79321 18.8967 7.26821 19.1887 7.56121C19.4817 7.85321 19.9567 7.85321 20.2497 7.56121Z"
                    fill="#3570BC"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.44629 15.7183L5.12229 19.8023C5.26129 20.6473 5.99229 21.2673 6.84829 21.2673H9.19129C9.62429 21.2673 10.0273 21.0433 10.2543 20.6743C10.4823 20.3063 10.5033 19.8453 10.3093 19.4583L9.72129 18.2813C9.71229 18.2643 9.70629 18.2473 9.70129 18.2293L9.09329 15.7653C8.91829 15.7553 4.62929 15.7393 4.44629 15.7183Z"
                    fill="#3570BC"
                  />
                </svg>
                Check AI Virality Score
              </button>
            </Link>
          </div>
          <div className="  backdrop-blur-[119.29px] rounded-b-[8px] border-t border-[#393939] text-[#A7A7A7]">
            <div className="flex items-start h-full p-4">
              <Info className="mr-2 w-16" />
              <p>
                Please note that these previews are an approximation of how your
                post would look like when published. We aim to be as accurate as
                possible but take into account that final result may look
                different.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PreviewRightBar;
