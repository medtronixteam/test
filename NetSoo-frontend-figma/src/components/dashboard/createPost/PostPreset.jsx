"use client";

import { getPlatformIcon } from "@/utils/getPlatformIcon";
import {
  AlertTriangle,
  Calendar,
  ChevronDown,
  CircleHelp,
  Settings,
} from "lucide-react";

import { useState, useEffect } from "react";
import { addPost, uploadMedia } from "@/api/posts";
import DatePickerButton from "./datePicker";
import DatePicker from "react-datepicker";
import { scheduledPost } from "@/api/scheduler";

const PostPreset = ({
  selectedPlatforms,
  postTypes,
  selectedDate,
  setIsCreateModalOpen,
  postCaption,
  selectedImages,
  selectedVideos,
  selectedPost
}) => {
  // console.log("selectedPlatforms", selectedPlatforms);
  // console.log("postTypes", postTypes);
  // console.log("selectedDate", selectedDate);
  // console.log("setIsCreateModalOpen", setIsCreateModalOpen);
  // Initialize form data with all platforms
  const [formData, setFormData] = useState({
    youtube: {
      title: "",
      description: "",
      category: "entertainment",
      videoPrivacy: "public",
      tags: "",
      monetization: false,
    },
    instagram: {
      caption: "",
      altText: "",
      advancedSettings: false,
      turnOffComments: false,
      hideLikesViews: false,
    },
    facebook: {
      caption: "",
      title: ""
    },
    twitter: {
      text: "",
      poll: false,
      whoCanReply: false,
    },
    linkedin: {
      content: "",
      hashtags: false,
      visibility: false,
    },
    tiktok: {
      caption: "",
      privacy: "",
      allowComments: "",
      allowDuet: "",
      allowStitch: "",
      privacyDD: false,
      allowCommentsDD: false,
      allowDuetDD: false,
      allowStitchDD: false
    },
    pinterest: {
      title: "",
      description: "",
      destinationLink: false,
      altText: false,
      boardSelection: false,
    },
    twitch: {
      title: "",
      category: false,
      tags: false,
      matureContent: false,
    },
    global: {
      title: "",
      description: "",
      audienceConfig: false,
      privacyConfig: false,
      category: false,
      tags: false,
    },
  });

  const [errors, setErrors] = useState({
    general: ["Publish date can't be a past date."],
    facebook: [
      // "Post > Content length should be at least 1 character or 1 media file.",
    ],
    youtube: [
      "Add at least 1 video.",
      "Video or short title is required and must be shorter than 100 characters. The characters < or > are not allowed.",
    ],
    instagram: ["Caption must be at least 1 character or have media."],
    tiktok: ["Please upload a video and write a caption under 150 characters."],
    linkedin: ["Content is required for a LinkedIn post."],
    twitter: ["Text must not exceed 280 characters."],
    pinterest: ["Add a title and at least one image."],
    twitch: ["Title and category are required to schedule a stream."],
  });

  const [errorsList] = useState({
    general: {date_in_past : "Publish date can't be a past date."},
    facebook: {
      post_content_length : "Post → Content length should be at least 1 character or 1 media file.",
      post_single_media_type : "Post → Choose either video or images only.",
      story_content_length: "Auto publish (story) → Max characters allowed 0.",
      story_content_media: "Auto publish (story) → Add at least 1 image or video.",
      story_invalid_aspect_ratio: "Auto publish (story) → Invalid aspect ratio for video, ratio must be 9:16.",
      story_invalid_video_length: "Auto publish (story) → Video time cannot exceed (60 seconds).",
      reel_content_media: "Auto publish (reel) → Add at least 1 video file.",
      reel_invalid_aspect_ratio: "Auto publish (reel) → Invalid aspect ratio for video, ratio must be 9:16.",
      reel_invalid_height: "Auto publish (reel) → Video height resolution can't be less than 960p.",
      reel_multiple_videos: "Auto publish (reel) → You can only select 1 video file.",

    },
    instagram: {
      post_media_length : "Add 1 image.",
      post_media_aspect_ratio : "Image aspect ratio must be between 4:5 and 1.91:1.",
      story_media_length : "Auto publish (story) → Add 1 image or video.",
      story_no_caption : "Auto publish (story) → Caption length must be 0 characters.",
      story_media_duration : "Auto publish (story) → The video duration must be between 3 seconds and 60 seconds.",
      story_media_width : "Auto publish (story) → The video frame width must be less than 1920 pixels.",
      reel_media_length : "Auto publish (reel) → Add 1 video.",
      reel_media_duration : "Auto publish (reel) → The video duration must be between 3 seconds and 15 minutes.",
      reel_media_width : "Auto publish (reel) → The video frame width must be less than 1920 pixels.",
    },
    tiktok: {
      video_content_media : "Please upload a video and write a caption under 150 characters.",
      video_privacy : "Auto publish → A privacy option must be selected.",
    },
  });

  const [scheduleDate, setScheduleDate] = useState(() => {
    return selectedDate ? selectedDate : new Date();
  });

  const [postScheduled, setPostScheduled] = useState(false);
  const [numErrors, setNumErrors] = useState(false);

  // State for expanded sections
  const [expandedSections, setExpandedSections] = useState({
    global: false,
    errors: false,
  });

  const token = localStorage.getItem("accessToken");

  // Initialize expanded state for selected platforms
  useEffect(() => {
    const newExpandedSections = { ...expandedSections };
    selectedPlatforms.forEach((platform) => {
      newExpandedSections[platform] = true;
    });
    setExpandedSections(newExpandedSections);

  }, [selectedPlatforms]);

  useEffect(() => {
    const now = new Date();
    const newErrors = { ...errors }; // clone errors to avoid overwriting in each case
    if (scheduleDate){
      if (scheduleDate < now) {
        console.log("Date is in the past");
        newErrors["general"] = [errorsList.general.date_in_past];
      } else {
        console.log("Date is in the future or now");
        newErrors["general"] = [];
      }
      setErrors(newErrors);
    }
  }, [scheduleDate]);

  useEffect(()=> {
    // Handling Platform Errors
    const newErrors = { ...errors }; // clone errors to avoid overwriting in each case

    selectedPlatforms.forEach((platform) => {
      switch (platform) {
        case "facebook": {
          const facebookErrors = [];

          const postType = postTypes["facebook"]?.toLowerCase();

          if (postType === "post") {
            if (
              postCaption.length === 0 &&
              selectedImages.length === 0 &&
              selectedVideos.length === 0
            ) {
              facebookErrors.push(errorsList.facebook.post_content_length);
            }

            if (selectedImages.length > 0 && selectedVideos.length > 0) {
              facebookErrors.push(errorsList.facebook.post_single_media_type);
            }
          } else if (postType === "reel") {
            // reel_invalid_height: "Auto publish (reel) → Video height resolution can't be less than 960p.",
            if (selectedVideos.length !== 1){
              facebookErrors.push(errorsList.facebook.reel_content_media);
            }
            for (const selectedVideo of selectedVideos) {
              if (Math.abs(selectedVideo.metadata.aspectRatio - 9 / 16) > 1e-3) {
                facebookErrors.push(errorsList.facebook.reel_invalid_aspect_ratio);
              }
              if (selectedVideo.metadata.height < 960) {
                facebookErrors.push(errorsList.facebook.reel_invalid_height);
              }

            }
          } else if (postType === "story") {
            if (postCaption.length > 0) {
              facebookErrors.push(errorsList.facebook.story_content_length);
            }
            if ((selectedImages.length === 0 && selectedVideos.length === 0) ||
                (selectedImages.length > 0 && selectedVideos.length > 0) ||
                selectedImages.length > 0 || selectedVideos.length > 0
            ) {
              facebookErrors.push(errorsList.facebook.story_content_media);
            }

            if (selectedVideos.length > 0) {
              for (const selectedVideo of selectedVideos) {
                if (selectedVideo.metadata.duration >= 60) {
                  facebookErrors.push(
                    errorsList.facebook.story_invalid_video_length
                  );
                }

                if (
                  Math.abs(selectedVideo.metadata.aspectRatio - 9 / 16) > 1e-3) {
                  facebookErrors.push(
                    errorsList.facebook.story_invalid_aspect_ratio
                  );
                }
              }
            }
          }

          newErrors["facebook"] = facebookErrors;
          break;
        }

        case "tiktok": {
          const tiktokErrors = [];

          if (selectedVideos.length === 0) {
            tiktokErrors.push(errorsList.tiktok.video_content_media);
          }

          if (!formData.tiktok.privacy) {
            tiktokErrors.push(errorsList.tiktok.video_privacy);
          }

          newErrors["tiktok"] = tiktokErrors;
          break;
        }

        case "instagram": {
          // instagram: {
          //   post_media_length : "Add 1 image.",
          //   post_media_aspect_ratio : "Image aspect ratio must be between 4:5 and 1.91:1.",

          //   story_media_length : "Auto publish (story) → Add 1 image or video.",
          //   story_no_caption : "Auto publish (story) → Caption length must be 0 characters.",
          //   story_media_duration : "Auto publish (story) → The video duration must be between 3 seconds and 60 seconds.",
          //   story_media_width : "Auto publish (story) → The video frame width must be less than 1920 pixels.",
          
          //   reel_media_length : "Auto publish (reel) → Add 1 video.",
          //   reel_media_duration : "Auto publish (reel) → The video duration must be between 3 seconds and 15 minutes.",
          //   reel_media_width : "Auto publish (reel) → The video frame width must be less than 1920 pixels.",
          // },
          const instagramErrors = [];
          const postType = postTypes["instagram"]?.toLowerCase();


          if (postType == "post"){
            if (selectedImages.length === 0 || selectedImages.length > 1 || selectedVideos.length > 0) {
              instagramErrors.push(errorsList.instagram.post_media_length);
            }
            for (const selectedImage of selectedImages)
            {
              if (selectedImage.metadata.aspectRatio < 4/5 && selectedImage.metadata.aspectRatio > 1.91)
              {
                instagramErrors.push(errorsList.instagram.post_media_aspect_ratio);
                break;
              }
            }
          }
          else if (postType == "reel"){
            if (selectedVideos.length === 0 || selectedImages.length > 0 || selectedVideos.length > 1) {
              instagramErrors.push(errorsList.instagram.reel_media_length);
            }
            for (const selectedVideo of selectedVideos)
            {
              if (selectedVideo.metadata.width > 1920) {
                instagramErrors.push(errorsList.instagram.reel_media_width);
                break;
              }
              if (selectedVideo.metadata.duration > 15*60 || selectedVideo.metadata.duration < 3) {
                instagramErrors.push(errorsList.instagram.reel_media_duration);
                break;
              }
            }
          }
          else if (postType == "story"){
            if ((selectedImages.length === 0 && selectedVideos.length == 0) || 
                (selectedImages.length > 0 && selectedVideos.length > 0) || 
                 selectedImages.length > 1 || 
                 selectedVideos.length > 1)
                {
                  instagramErrors.push(errorsList.instagram.story_media_length);
                }
            if (postCaption.length > 0)
            {
              instagramErrors.push(errorsList.instagram.story_no_caption);
            }
            for (const selectedVideo of selectedVideos)
              {
                if (selectedVideo.metadata.width > 1920) {
                  instagramErrors.push(errorsList.instagram.story_media_width);
                }
                if (selectedVideo.metadata.duration > 60 || selectedVideo.metadata.duration < 3) {
                  instagramErrors.push(errorsList.instagram.story_media_duration);
                }
              }

          }

          newErrors["instagram"] = instagramErrors;
          break;
        }

        default:
          break;
      }
    });

    setErrors(newErrors);
  }, [selectedPlatforms, postTypes, postCaption, selectedImages, selectedVideos, formData]);


  useEffect(()=> {
    for (const selectedPlatform of selectedPlatforms)
    {
      if ("caption" in formData[selectedPlatform]){
        formData[selectedPlatform]["caption"] = postCaption;
      }
    }    
  }, [postCaption]);

  useEffect(() => {
    let errorCount = 0;
    for (const platform of selectedPlatforms)
    {
      errorCount += errors[platform].length
    }

    setNumErrors(errorCount);
  }, [errors]);

  //   const [scheduleDate, setScheduleDate] = useState(new Date());

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Toggle configuration sections
  const toggleConfig = (platform, configType) => {
    setFormData((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [configType]: !prev[platform][configType],
      },
    }));
    console.log("Configs Toggled");
  };

  // Handle input changes
  const handleInputChange = (platform, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: value,
      },
    }));

    // Log the change to console
    console.log(`Changed ${field} for ${platform} to:`, value);
  };

  const formatScheduleDate = (date) => {
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const onSchedule = async (date) => {
    if (!postScheduled && numErrors == 0){
      setPostScheduled(true);
      const filteredPlatformData = Object.fromEntries(
        Object.entries(formData)
          .filter(([platform]) => selectedPlatforms.includes(platform))
          .map(([platform, data]) => [
            platform,
            {
              ...data,
              postType: postTypes[platform].toLowerCase(),
              scheduled_time: date
            },
          ])
      );


      console.log("scheduling for:", filteredPlatformData)
      const imageUrls = await uploadMedia(token, selectedImages, 'image');
      const videoUrls = await uploadMedia(token, selectedVideos, 'video');
      
      const resp = await addPost(token, filteredPlatformData, imageUrls, videoUrls);
      console.log("Scheduling for:", resp);
      setIsCreateModalOpen(false);
    }
  };

  const onSaveChanges = async (date) => {
    console.log("Save Changes");
  };

  const onDeletePost = async (date) => {
    console.log("Delete Post");
  };

  // Submit form data for a specific platform
  const submitForm = async (platform) => {
    try {
      // Example API call
      console.log(`${platform} preset data:`, formData[platform]);
      console.log(`${platform} preset saved successfully!`);
    } catch (error) {
      console.error(`Error saving ${platform} preset:`, error);
    }
  };

  // Get post type for a platform
  const getPostType = (platform) => {
    return (
      postTypes[platform] ||
      {
        facebook: "Post",
        instagram: "Post",
        youtube: "Video",
        twitter: "Post",
        linkedin: "Post",
        tiktok: "Video",
        pinterest: "Pin",
        twitch: "Stream",
      }[platform] ||
      ""
    );
  };

  // Render configuration sections for a platform
  const renderConfigSections = (platform) => {
    const charLimits = {
      youtube: 5000,
      instagram: 2200,
      facebook: 63206,
      twitter: 280,
      linkedin: 3000,
      tiktok: 2200,
      pinterest: 500,
      twitch: 140,
      global: 1000,
    };

    const postType = getPostType(platform);

    // Platform-specific UI elements
    switch (platform) {
      case "youtube":
        return (
          <>
            <div className="text-xs text-gray-400 mb-2">
              Configuring for YouTube {postType}
            </div>
            <div className="space-y-3">
              <input
                type="text"
                className="w-full p-4 border border-[#393939] rounded-[8px] text-sm text-gray-300"
                placeholder="Video title"
                value={formData[platform].title || ""}
                onChange={(e) =>
                  handleInputChange(platform, "title", e.target.value)
                }
              />

              <textarea
                className="w-full p-4 border border-[#393939] rounded-[8px] text-sm text-gray-300 resize-none"
                placeholder="Video description"
                rows={3}
                value={formData[platform].description || ""}
                onChange={(e) =>
                  handleInputChange(platform, "description", e.target.value)
                }
              ></textarea>

              <div className="flex justify-end text-xs text-gray-500">
                <span>
                  {(formData[platform].description || "").length}/
                  {charLimits[platform]}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div
                className="flex justify-between items-center p-4 border border-[#393939] rounded-[8px] cursor-pointer"
                onClick={() => toggleConfig(platform, "category")}
              >
                <span className="text-sm text-gray-400">Video Category</span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${
                    formData[platform].category ? "transform rotate-180" : ""
                  }`}
                />
              </div>
              {formData[platform].category && (
                <div className="">
                  <select
                    className="w-full  border border-[#393939] rounded-[8px] p-3 text-sm text-gray-300"
                    onChange={(e) =>
                      handleInputChange(
                        platform,
                        "categoryValue",
                        e.target.value
                      )
                    }
                  >
                    {/* <option value="">Select a category</option> */}
                    <option value="entertainment">Entertainment</option>
                    <option value="music">Music</option>
                    <option value="gaming">Gaming</option>
                    <option value="education">Education</option>
                  </select>
                </div>
              )}

              <div
                className="flex justify-between items-center p-4 border border-[#393939] rounded-[8px] cursor-pointer"
                onClick={() => toggleConfig(platform, "videoPrivacy")}
              >
                <span className="text-sm text-gray-400">Video Privacy</span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${
                    formData[platform].videoPrivacy
                      ? "transform rotate-180"
                      : ""
                  }`}
                />
              </div>
              {formData[platform].videoPrivacy && (
                <div className="">
                  <select
                    className="w-full  border border-[#393939] rounded-[8px] p-3 text-sm text-gray-300"
                    onChange={(e) =>
                      handleInputChange(
                        platform,
                        "privacyValue",
                        e.target.value
                      )
                    }
                  >
                    <option value="public">Public</option>
                    <option value="unlisted">Unlisted</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              )}

              <div
                className="flex justify-between items-center p-4 border border-[#393939] rounded-[8px] cursor-pointer"
                onClick={() => toggleConfig(platform, "tags")}
              >
                <span className="text-sm text-gray-400">Tags</span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${
                    formData[platform].tags ? "transform rotate-180" : ""
                  }`}
                />
              </div>
              {formData[platform].tags && (
                <div className="">
                  <input
                    type="text"
                    className="w-full  border border-[#393939] rounded-[8px] p-3 text-sm text-gray-300"
                    placeholder="Add tags separated by commas"
                    onChange={(e) =>
                      handleInputChange(platform, "tagsValue", e.target.value)
                    }
                  />
                </div>
              )}

              <div
                className="flex justify-between items-center p-4 border border-[#393939] rounded-[8px] cursor-pointer"
                onClick={() => toggleConfig(platform, "monetization")}
              >
                <span className="text-sm text-gray-400">Monetization</span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${
                    formData[platform].monetization
                      ? "transform rotate-180"
                      : ""
                  }`}
                />
              </div>
              {formData[platform].monetization && (
                <div className="">
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="monetize-video"
                      className="mr-2"
                      onChange={(e) =>
                        handleInputChange(
                          platform,
                          "monetizeWithAds",
                          e.target.checked
                        )
                      }
                    />
                    <label
                      htmlFor="monetize-video"
                      className="text-sm text-gray-300"
                    >
                      Monetize with ads
                    </label>
                  </div>
                </div>
              )}
            </div>
          </>
        );

      case "instagram":
        return (
          <>
            <div className="space-y-3">
              <div
                className="flex justify-between items-center p-4 border border-[#393939] rounded-[8px] cursor-pointer"
                onClick={() => toggleConfig(platform, "advancedSettings")}
              >
                <span className="text-sm text-gray-400">Advanced Settings</span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${
                    formData[platform].advancedSettings
                      ? "transform rotate-180"
                      : ""
                  }`}
                />
              </div>
              {formData[platform].advancedSettings && (
                <div className="">
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="hide-likes-views"
                      className="mr-2"
                      onChange={(e) =>
                        handleInputChange(
                          platform,
                          "hideLikesViews",
                          e.target.checked
                        )
                      }
                    />
                    <label
                      htmlFor="hide-likes-views"
                      className="text-sm text-gray-300"
                    >
                      Hide like and view counts on this post
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="turn-off-comments"
                      className="mr-2"
                      onChange={(e) =>
                        handleInputChange(
                          platform,
                          "turnOffComments",
                          e.target.checked
                        )
                      }
                    />
                    <label
                      htmlFor="turn-off-comments"
                      className="text-sm text-gray-300"
                    >
                      Turn off commenting
                    </label>
                  </div>
                </div>
              )}
            </div>
          </>
        );

      case "facebook":
        return (
          <>
            <div className="text-xs text-gray-400 mb-2">
              Configuring for Facebook {postType}
            </div>

            <div className="space-y-3">
              <textarea
                className="w-full p-4 border border-[#393939] rounded-[8px] text-sm text-gray-300 resize-none"
                placeholder="Reel Title"
                rows={1}
                value={""}
              ></textarea>
              <div className="flex justify-end text-xs text-gray-500">
                <span>
                  {(formData[platform].description || "").length}/
                  {charLimits[platform]}
                </span>
              </div>
            </div>
          </>
        );

      case "twitter":
        return (
          <>
            <div className="text-xs text-gray-400 mb-2">
              Configuring for Twitter {postType}
            </div>
            <div className="space-y-3">
              <textarea
                className="w-full p-4 border border-[#393939] rounded-[8px] text-sm text-gray-300 resize-none"
                placeholder="What's happening?"
                rows={3}
                value={formData[platform].text || ""}
                onChange={(e) =>
                  handleInputChange(platform, "text", e.target.value)
                }
              ></textarea>

              <div className="flex justify-end text-xs text-gray-500">
                <span>
                  {(formData[platform].text || "").length}/
                  {charLimits[platform]}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div
                className="flex justify-between items-center p-4 border border-[#393939] rounded-[8px] cursor-pointer"
                onClick={() => toggleConfig(platform, "poll")}
              >
                <span className="text-sm text-gray-400">Add Poll</span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${
                    formData[platform].poll ? "transform rotate-180" : ""
                  }`}
                />
              </div>
              {formData[platform].poll && (
                <div className="">
                  <input
                    type="text"
                    className="w-full  border border-[#393939] rounded-[8px] p-3 text-sm text-gray-300 mb-2"
                    placeholder="Poll question"
                    onChange={(e) =>
                      handleInputChange(
                        platform,
                        "pollQuestion",
                        e.target.value
                      )
                    }
                  />
                  <input
                    type="text"
                    className="w-full  border border-[#393939] rounded-[8px] p-3 text-sm text-gray-300 mb-2"
                    placeholder="Choice 1"
                    onChange={(e) =>
                      handleInputChange(platform, "pollChoice1", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    className="w-full  border border-[#393939] rounded-[8px] p-3 text-sm text-gray-300 mb-2"
                    placeholder="Choice 2"
                    onChange={(e) =>
                      handleInputChange(platform, "pollChoice2", e.target.value)
                    }
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Poll length:</span>
                    <select
                      className="border border-gray-700 rounded p-1 text-xs text-gray-300 bg-[#1e1e1e] appearance-none focus:outline-none focus:ring-1 focus:ring-[#555] transition"
                      onChange={(e) =>
                        handleInputChange(
                          platform,
                          "pollLength",
                          e.target.value
                        )
                      }
                    >
                      <option value="1" className="bg-[#1e1e1e] text-gray-300">
                        1 day
                      </option>
                      <option value="3" className="bg-[#1e1e1e] text-gray-300">
                        3 days
                      </option>
                      <option value="7" className="bg-[#1e1e1e] text-gray-300">
                        7 days
                      </option>
                    </select>
                  </div>
                </div>
              )}

              <div
                className="flex justify-between items-center p-4 border border-[#393939] rounded-[8px] cursor-pointer"
                onClick={() => toggleConfig(platform, "whoCanReply")}
              >
                <span className="text-sm text-gray-400">Who can reply</span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${
                    formData[platform].whoCanReply ? "transform rotate-180" : ""
                  }`}
                />
              </div>
              {formData[platform].whoCanReply && (
                <div className="">
                  <div className="relative w-full">
                    <select
                      className="flex w-full justify-between items-center  border border-[#393939] rounded-[8px] p-3 text-sm text-gray-300 mb-2 pe-3 bg-[#1e1e1e] appearance-none focus:outline-none focus:ring-1 focus:ring-[#555] transition"
                      onChange={(e) =>
                        handleInputChange(
                          platform,
                          "whoCanReplyValue",
                          e.target.value
                        )
                      }
                    >
                      <option value="everyone">Everyone</option>
                      <option value="following">People you follow</option>
                      <option value="mentioned">Only people you mention</option>
                    </select>

                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <ChevronDown
                        size={16}
                        className={`text-gray-500 transition-transform `}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        );

      case "linkedin":
        return (
          <>
            <div className="text-xs text-gray-400 mb-2">
              Configuring for LinkedIn {postType}
            </div>
            <div className="space-y-3">
              <textarea
                className="w-full p-4 border border-[#393939] rounded-[8px] text-sm text-gray-300 resize-none"
                placeholder="What do you want to talk about?"
                rows={3}
                value={formData[platform].content || ""}
                onChange={(e) =>
                  handleInputChange(platform, "content", e.target.value)
                }
              ></textarea>

              <div className="flex justify-end text-xs text-gray-500">
                <span>
                  {(formData[platform].content || "").length}/
                  {charLimits[platform]}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div
                className="flex justify-between items-center p-4 border border-[#393939] rounded-[8px] cursor-pointer"
                onClick={() => toggleConfig(platform, "hashtags")}
              >
                <span className="text-sm text-gray-400">Add Hashtags</span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${
                    formData[platform].hashtags ? "transform rotate-180" : ""
                  }`}
                />
              </div>
              {formData[platform].hashtags && (
                <div className="">
                  <input
                    type="text"
                    className="w-full  border border-[#393939] rounded-[8px] p-3 text-sm text-gray-300"
                    placeholder="Add hashtags separated by spaces"
                    onChange={(e) =>
                      handleInputChange(
                        platform,
                        "hashtagsValue",
                        e.target.value
                      )
                    }
                  />
                </div>
              )}

              <div
                className="flex justify-between items-center p-4 border border-[#393939] rounded-[8px] cursor-pointer"
                onClick={() => toggleConfig(platform, "visibility")}
              >
                <span className="text-sm text-gray-400">Post Visibility</span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${
                    formData[platform].visibility ? "transform rotate-180" : ""
                  }`}
                />
              </div>
              {formData[platform].visibility && (
                <div className="">
                  <div className="relative w-full">
                    <select
                      className="flex w-full justify-between items-center border border-[#393939] rounded-[8px] p-3 text-sm text-gray-300 mb-2 pe-3 bg-[#1e1e1e] appearance-none focus:outline-none focus:ring-1 focus:ring-[#555] transition"
                      onChange={(e) =>
                        handleInputChange(
                          platform,
                          "visibilityValue",
                          e.target.value
                        )
                      }
                    >
                      <option value="anyone">Anyone</option>
                      <option value="connections">Connections only</option>
                      <option value="twitter">Twitter audience</option>
                    </select>

                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <ChevronDown
                        size={16}
                        className="text-gray-500 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        );

      case "tiktok":
        return (
          <>
            <div className="text-xs text-gray-400 mb-2">
              Configuring for TikTok {postType}
            </div>

            <div className="space-y-3">
              <div
                className="flex justify-between items-center p-4 border border-[#393939] rounded-[8px] cursor-pointer"
                onClick={() => toggleConfig(platform, "privacyDD")}
              >
                <span className="text-sm text-gray-400">Privacy Settings</span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${
                    formData[platform].privacyDD ? "transform rotate-180" : ""
                  }`}
                />
              </div>
              {formData[platform].privacyDD && (
                <div className="">
                  <div className="relative w-full">
                    <select
                      className="flex w-full justify-between items-center border border-[#393939] rounded-[8px] p-3 text-sm text-gray-300 mb-2 pe-3 bg-[#1e1e1e] appearance-none focus:outline-none focus:ring-1 focus:ring-[#555] transition"
                      onChange={(e) =>
                        handleInputChange(
                          platform,
                          "privacy",
                          e.target.value
                        )
                      }
                      defaultChecked
                      defaultValue = ""
                    >
                      <option value="" disabled>Select a Privacy level</option>
                      <option value="public">Public</option>
                      <option value="friends">Friends</option>
                      <option value="private">Private</option>
                    </select>

                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <ChevronDown
                        size={16}
                        className="text-gray-500 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div
                className="flex w-full justify-between items-center p-4 border border-[#393939] rounded-[8px] cursor-pointer"
                onClick={() => toggleConfig(platform, "allowCommentsDD")}
              >
                <span className="text-sm text-gray-400">Allow Comments</span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${
                    formData[platform].allowCommentsDD
                      ? "transform rotate-180"
                      : ""
                  }`}
                />
              </div>
              {formData[platform].allowCommentsDD && (
                <div className="">
                  <div className="relative w-full">
                    <select
                      className="flex w-full justify-between items-center border border-[#393939] rounded-[8px] p-3 text-sm text-gray-300 mb-2 pe-3 bg-[#1e1e1e] appearance-none focus:outline-none focus:ring-1 focus:ring-[#555] transition"
                      onChange={(e) =>
                        handleInputChange(
                          platform,
                          "allowComments",
                          e.target.value
                        )
                      }
                    >
                      <option value="everyone">Everyone</option>
                      <option value="friends">Friends</option>
                      <option value="no-one">No one</option>
                    </select>

                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <ChevronDown
                        size={16}
                        className="text-gray-500 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div
                className="flex justify-between items-center p-4 border border-[#393939] rounded-[8px] cursor-pointer"
                onClick={() => toggleConfig(platform, "allowDuetDD")}
              >
                <span className="text-sm text-gray-400">Allow Duet</span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${
                    formData[platform].allowDuetDD ? "transform rotate-180" : ""
                  }`}
                />
              </div>
              {formData[platform].allowDuetDD && (
                <div className="">
                  <div className="relative w-full">
                    <select
                      className="flex w-full justify-between items-center border border-[#393939] rounded-[8px] p-3 text-sm text-gray-300 mb-2 pe-3 bg-[#1e1e1e] appearance-none focus:outline-none focus:ring-1 focus:ring-[#555] transition"
                      onChange={(e) =>
                        handleInputChange(
                          platform,
                          "allowDuet",
                          e.target.value
                        )
                      }
                    >
                      <option value="everyone">Everyone</option>
                      <option value="friends">Friends</option>
                      <option value="no-one">No one</option>
                    </select>

                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <ChevronDown
                        size={16}
                        className="text-gray-500 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div
                className="flex justify-between items-center p-4 border border-[#393939] rounded-[8px] cursor-pointer"
                onClick={() => toggleConfig(platform, "allowStitchDD")}
              >
                <span className="text-sm text-gray-400">Allow Stitch</span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${
                    formData[platform].allowStitchDD ? "transform rotate-180" : ""
                  }`}
                />
              </div>
              {formData[platform].allowStitchDD && (
                <div className="">
                  <div className="relative w-full">
                    <select
                      className="flex w-full justify-between items-center border border-[#393939] rounded-[8px] p-3 text-sm text-gray-300 mb-2 pe-3 bg-[#1e1e1e] appearance-none focus:outline-none focus:ring-1 focus:ring-[#555] transition"
                      onChange={(e) =>
                        handleInputChange(
                          platform,
                          "allowStitch",
                          e.target.value
                        )
                      }
                    >
                      <option value="everyone">Everyone</option>
                      <option value="friends">Friends</option>
                      <option value="no-one">No one</option>
                    </select>

                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <ChevronDown
                        size={16}
                        className="text-gray-500 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        );

      case "pinterest":
        return (
          <>
            <div className="text-xs text-gray-400 mb-2">
              Configuring for Pinterest {postType}
            </div>
            <div className="space-y-3">
              <input
                type="text"
                className="w-full p-4 border border-[#393939] rounded-[8px] text-sm text-gray-300"
                placeholder="Add a title"
                value={formData[platform].title || ""}
                onChange={(e) =>
                  handleInputChange(platform, "title", e.target.value)
                }
              />

              <textarea
                className="w-full p-4 border border-[#393939] rounded-[8px] text-sm text-gray-300 resize-none"
                placeholder="Tell everyone what your Pin is about"
                rows={3}
                value={formData[platform].description || ""}
                onChange={(e) =>
                  handleInputChange(platform, "description", e.target.value)
                }
              ></textarea>

              <div className="flex justify-end text-xs text-gray-500">
                <span>
                  {(formData[platform].description || "").length}/
                  {charLimits[platform]}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div
                className="flex justify-between items-center p-4 border border-[#393939] rounded-[8px] cursor-pointer"
                onClick={() => toggleConfig(platform, "destinationLink")}
              >
                <span className="text-sm text-gray-400">Destination Link</span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${
                    formData[platform].destinationLink
                      ? "transform rotate-180"
                      : ""
                  }`}
                />
              </div>
              {formData[platform].destinationLink && (
                <div className="">
                  <input
                    type="text"
                    className="w-full  border border-[#393939] rounded-[8px] p-3 text-sm text-gray-300"
                    placeholder="Add a destination link"
                    onChange={(e) =>
                      handleInputChange(
                        platform,
                        "destinationLinkValue",
                        e.target.value
                      )
                    }
                  />
                </div>
              )}

              <div
                className="flex justify-between items-center p-4 border border-[#393939] rounded-[8px] cursor-pointer"
                onClick={() => toggleConfig(platform, "altText")}
              >
                <span className="text-sm text-gray-400">Alt Text</span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${
                    formData[platform].altText ? "transform rotate-180" : ""
                  }`}
                />
              </div>
              {formData[platform].altText && (
                <div className="">
                  <textarea
                    className="w-full  border border-[#393939] rounded-[8px] p-3 text-sm text-gray-300 resize-none"
                    placeholder="Describe this image for people with visual impairments"
                    rows={2}
                    onChange={(e) =>
                      handleInputChange(
                        platform,
                        "altTextValue",
                        e.target.value
                      )
                    }
                  ></textarea>
                </div>
              )}

              <div
                className="flex justify-between items-center p-4 border border-[#393939] rounded-[8px] cursor-pointer"
                onClick={() => toggleConfig(platform, "boardSelection")}
              >
                <span className="text-sm text-gray-400">Board Selection</span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${
                    formData[platform].boardSelection
                      ? "transform rotate-180"
                      : ""
                  }`}
                />
              </div>
              {formData[platform].boardSelection && (
                <div className="">
                  <div className="relative w-full">
                    <select
                      className="flex w-full justify-between items-center border border-[#393939] rounded-[8px] p-3 text-sm text-gray-300 mb-2 pe-3 bg-[#1e1e1e] appearance-none focus:outline-none focus:ring-1 focus:ring-[#555] transition"
                      onChange={(e) =>
                        handleInputChange(
                          platform,
                          "boardSelectionValue",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Select a board</option>
                      <option value="home-decor">Home Decor</option>
                      <option value="recipes">Recipes</option>
                      <option value="fashion">Fashion</option>
                      <option value="travel">Travel</option>
                    </select>

                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <ChevronDown
                        size={16}
                        className="text-gray-500 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        );

      case "twitch":
        return (
          <>
            <div className="text-xs text-gray-400 mb-2">
              Configuring for Twitch {postType}
            </div>
            <div className="space-y-3">
              <input
                type="text"
                className="w-full p-4 border border-[#393939] rounded-[8px] text-sm text-gray-300"
                placeholder="Stream title"
                value={formData[platform].title || ""}
                onChange={(e) =>
                  handleInputChange(platform, "title", e.target.value)
                }
              />

              <div className="flex justify-end text-xs text-gray-500">
                <span>
                  {(formData[platform].title || "").length}/
                  {charLimits[platform]}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div
                className="flex justify-between items-center p-4 border border-[#393939] rounded-[8px] cursor-pointer"
                onClick={() => toggleConfig(platform, "category")}
              >
                <span className="text-sm text-gray-400">Category/Game</span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${
                    formData[platform].category ? "transform rotate-180" : ""
                  }`}
                />
              </div>
              {formData[platform].category && (
                <div className="">
                  <input
                    type="text"
                    className="w-full  border border-[#393939] rounded-[8px] p-3 text-sm text-gray-300"
                    placeholder="Search for a category or game"
                    onChange={(e) =>
                      handleInputChange(
                        platform,
                        "categoryValue",
                        e.target.value
                      )
                    }
                  />
                </div>
              )}

              <div
                className="flex justify-between items-center p-4 border border-[#393939] rounded-[8px] cursor-pointer"
                onClick={() => toggleConfig(platform, "tags")}
              >
                <span className="text-sm text-gray-400">Tags</span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${
                    formData[platform].tags ? "transform rotate-180" : ""
                  }`}
                />
              </div>
              {formData[platform].tags && (
                <div className="">
                  <input
                    type="text"
                    className="w-full  border border-[#393939] rounded-[8px] p-3 text-sm text-gray-300"
                    placeholder="Add tags separated by commas"
                    onChange={(e) =>
                      handleInputChange(platform, "tagsValue", e.target.value)
                    }
                  />
                </div>
              )}

              <div
                className="flex justify-between items-center p-4 border border-[#393939] rounded-[8px] cursor-pointer"
                onClick={() => toggleConfig(platform, "matureContent")}
              >
                <span className="text-sm text-gray-400">Mature Content</span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${
                    formData[platform].matureContent
                      ? "transform rotate-180"
                      : ""
                  }`}
                />
              </div>
              {formData[platform].matureContent && (
                <div className="">
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="mature-content"
                      className="mr-2"
                      onChange={(e) =>
                        handleInputChange(
                          platform,
                          "matureContentValue",
                          e.target.checked
                        )
                      }
                    />
                    <label
                      htmlFor="mature-content"
                      className="text-sm text-gray-300"
                    >
                      This stream contains mature content
                    </label>
                  </div>
                </div>
              )}
            </div>
          </>
        );

      // Global preset case
      default:
        return (
          <>
            <div className="text-xs text-gray-400 mb-2">
              Global Settings (applies to all platforms)
            </div>
            <div className="space-y-3">
              <input
                type="text"
                className="w-full p-4 border border-[#393939] rounded-[8px] text-sm text-gray-300"
                placeholder="Global title"
                value={formData[platform].title || ""}
                onChange={(e) =>
                  handleInputChange(platform, "title", e.target.value)
                }
              />

              <textarea
                className="w-full p-4 border border-[#393939] rounded-[8px] text-sm text-gray-300 resize-none"
                placeholder="Global description"
                rows={3}
                value={formData[platform].description || ""}
                onChange={(e) =>
                  handleInputChange(platform, "description", e.target.value)
                }
              ></textarea>

              <div className="flex justify-end text-xs text-gray-500">
                <span>
                  {(formData[platform].description || "").length}/
                  {charLimits[platform]}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div
                className="flex justify-between items-center p-4 border border-[#393939] rounded-[8px] cursor-pointer"
                onClick={() => toggleConfig(platform, "audienceConfig")}
              >
                <span className="text-sm text-gray-400">
                  Audience Configuration
                </span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${
                    formData[platform].audienceConfig
                      ? "transform rotate-180"
                      : ""
                  }`}
                />
              </div>
              {formData[platform].audienceConfig && (
                <div className="">
                  <p className="text-xs text-gray-400">
                    Global audience settings go here
                  </p>
                  <div className="relative w-full">
                    <select
                      className="flex w-full justify-between items-center border border-[#393939] rounded-[8px] p-3 text-sm text-gray-300 mt-2 bg-[#1e1e1e] appearance-none focus:outline-none focus:ring-1 focus:ring-[#555] transition"
                      onChange={(e) =>
                        handleInputChange(
                          platform,
                          "audienceValue",
                          e.target.value
                        )
                      }
                    >
                      <option value="all">All Audiences</option>
                      <option value="adult">Adult (18+)</option>
                      <option value="teen">Teen (13-17)</option>
                    </select>

                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <ChevronDown
                        size={16}
                        className="text-gray-500 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div
                className="flex justify-between items-center p-4 border border-[#393939] rounded-[8px] cursor-pointer"
                onClick={() => toggleConfig(platform, "privacyConfig")}
              >
                <span className="text-sm text-gray-400">
                  Privacy Configuration
                </span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${
                    formData[platform].privacyConfig
                      ? "transform rotate-180"
                      : ""
                  }`}
                />
              </div>
              {formData[platform].privacyConfig && (
                <div className="">
                  <p className="text-xs text-gray-400">
                    Global privacy settings go here
                  </p>
                  <div className="relative w-full">
                    <select
                      className="flex w-full justify-between items-center border border-[#393939] rounded-[8px] p-3 text-sm text-gray-300 mt-2 bg-[#1e1e1e] appearance-none focus:outline-none focus:ring-1 focus:ring-[#555] transition"
                      onChange={(e) =>
                        handleInputChange(
                          platform,
                          "privacyValue",
                          e.target.value
                        )
                      }
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="unlisted">Unlisted</option>
                    </select>

                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <ChevronDown
                        size={16}
                        className="text-gray-500 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div
                className="flex justify-between items-center p-4 border border-[#393939] rounded-[8px] cursor-pointer"
                onClick={() => toggleConfig(platform, "tags")}
              >
                <span className="text-sm text-gray-400">Tags</span>
                <ChevronDown
                  size={16}
                  className={`text-gray-500 transition-transform ${
                    formData[platform].tags ? "transform rotate-180" : ""
                  }`}
                />
              </div>
              {formData[platform].tags && (
                <div className="">
                  <input
                    type="text"
                    className="w-full   border border-[#393939] rounded-[8px] p-3 text-sm text-gray-300"
                    placeholder="Add global tags separated by commas"
                    onChange={(e) =>
                      handleInputChange(platform, "tagsValue", e.target.value)
                    }
                  />
                </div>
              )}
            </div>
          </>
        );
    }
  };

  return (
    <div className="space-y-3">
      {/* Global Preset */}
      <div className="border border-[#393939] rounded-[8px] backdrop-blur-[101.51px] overflow-hidden ">
        <div
          className="flex justify-between items-center p-4 cursor-pointer"
          onClick={() => toggleSection("global")}
        >
          <div className="flex items-center">
            <span className="w-6 h-6 mr-2 flex items-center justify-center">
              <Settings size={20} />
            </span>
            <span className="text-white">Global Preset</span>
          </div>

          <div className="flex items-center">
            <span className="hidden md:flex text-md text-gray-500 mr-2  items-center">
              Auto Publish
              <CircleHelp size={20} className="ml-2" />
            </span>
            <div className="w-8 h-4 bg-[#3570BC] rounded-full flex items-center mr-2">
              <div className="w-3 h-3 bg-white rounded-full ml-auto mr-0.5"></div>
            </div>
            <ChevronDown
              size={18}
              className={`text-gray-500 transition-transform ${
                expandedSections.global ? "transform rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {expandedSections.global && (
          <div className="p-3 border-t border-gray-800">
            <div className="space-y-3">
              {renderConfigSections("global")}
              <button
                className="w-full bg-[#3570BC] hover:bg-blue-600 text-white py-2 rounded"
                onClick={() => submitForm("global")}
              >
                Save Global Settings
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Only render platform presets for selected platforms */}
      {selectedPlatforms.includes("instagram") && (
        <div className="border border-[#393939] rounded-[8px] backdrop-blur-[101.51px] overflow-hidden ">
          <div
            className="flex justify-between items-center p-4 cursor-pointer"
            onClick={() => toggleSection("instagram")}
          >
            <div className="flex items-center">
              <span className="w-6 h-6 mr-2 flex items-center justify-center">
                <img
                  src="/dashboard/insta.svg"
                  alt="Instagram"
                  className="w-6 h-6"
                />
              </span>
              <span className="text-white">Instagram Presets</span>
            </div>
            <ChevronDown
              size={18}
              className={`text-gray-500 transition-transform ${
                expandedSections.instagram ? "transform rotate-180" : ""
              }`}
            />
          </div>
          {expandedSections.instagram && (
            <div className="p-3 border-t border-gray-800">
              <div className="space-y-3">
                {renderConfigSections("instagram")}
                <button
                  className="w-full bg-[#3570BC] hover:bg-blue-600 text-white py-2 rounded"
                  onClick={() => submitForm("instagram")}
                >
                  Save Instagram Preset
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Facebook Presets */}
      {selectedPlatforms.includes("facebook") && postTypes["facebook"].toLowerCase() === "reel" && (
        <div className="border border-[#393939] rounded-[8px] backdrop-blur-[101.51px] overflow-hidden ">
          <div
            className="flex justify-between items-center p-4 cursor-pointer"
            onClick={() => toggleSection("facebook")}
          >
            <div className="flex items-center">
              <span className="w-6 h-6 mr-2 flex items-center justify-center">
                <img
                  src="/dashboard/facebook.svg"
                  alt="facebook"
                  className="w-6 h-6"
                />
              </span>
              <span className="text-white">Facebook Presets</span>
            </div>
            <ChevronDown
              size={18}
              className={`text-gray-500 transition-transform ${
                expandedSections.facebook ? "transform rotate-180" : ""
              }`}
            />
          </div>
          {expandedSections.facebook && (
            <div className="p-3 border-t border-gray-800">
              <div className="space-y-3">
                {renderConfigSections("facebook")}
                <button
                  className="w-full bg-[#3570BC] hover:bg-blue-600 text-white py-2 rounded"
                  onClick={() => submitForm("facebook")}
                >
                  Save Facebook Preset
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* YouTube Presets */}
      {selectedPlatforms.includes("youtube") && (
        <div className="border border-[#393939] rounded-[8px] backdrop-blur-[101.51px] overflow-hidden ">
          <div
            className="flex justify-between items-center p-4 cursor-pointer"
            onClick={() => toggleSection("youtube")}
          >
            <div className="flex items-center">
              <span className="w-6 h-6 mr-2 flex items-center justify-center">
                <img
                  src="/dashboard/youtube.svg"
                  alt="youtube"
                  className="w-6 h-6"
                />
              </span>
              <span className="text-white">Youtube Presets</span>
            </div>
            <ChevronDown
              size={18}
              className={`text-gray-500 transition-transform ${
                expandedSections.youtube ? "transform rotate-180" : ""
              }`}
            />
          </div>
          {expandedSections.youtube && (
            <div className="p-3 border-t border-gray-800">
              <div className="space-y-3">
                {renderConfigSections("youtube")}
                <button
                  className="w-full bg-[#3570BC] hover:bg-blue-600 text-white py-2 rounded"
                  onClick={() => submitForm("youtube")}
                >
                  Save YouTube Preset
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Twitter Presets */}
      {selectedPlatforms.includes("twitter") && (
        <div className="border border-[#393939] rounded-[8px] backdrop-blur-[101.51px] overflow-hidden ">
          <div
            className="flex justify-between items-center p-4 cursor-pointer"
            onClick={() => toggleSection("twitter")}
          >
            <div className="flex items-center">
              <span className="w-6 h-6 mr-2 flex items-center justify-center">
                <img
                  src="/dashboard/twitter.svg"
                  alt="twitter"
                  className="w-6 h-6"
                />
              </span>
              <span className="text-white">Twitter Presets</span>
            </div>
            <ChevronDown
              size={18}
              className={`text-gray-500 transition-transform ${
                expandedSections.twitter ? "transform rotate-180" : ""
              }`}
            />
          </div>
          {expandedSections.twitter && (
            <div className="p-3 border-t border-gray-800">
              <div className="space-y-3">
                {renderConfigSections("twitter")}
                <button
                  className="w-full bg-[#3570BC] hover:bg-blue-600 text-white py-2 rounded"
                  onClick={() => submitForm("twitter")}
                >
                  Save Twitter Preset
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* LinkedIn Presets */}
      {selectedPlatforms.includes("linkedin") && (
        <div className="border border-[#393939] rounded-[8px] backdrop-blur-[101.51px] overflow-hidden ">
          <div
            className="flex justify-between items-center p-4 cursor-pointer"
            onClick={() => toggleSection("linkedin")}
          >
            <div className="flex items-center">
              <span className="w-6 h-6 mr-2 flex items-center justify-center">
                <img
                  src="/dashboard/linkedIn.svg"
                  alt="linkedin"
                  className="w-6 h-6"
                />
              </span>
              <span className="text-white">LinkedIn Presets</span>
            </div>
            <ChevronDown
              size={18}
              className={`text-gray-500 transition-transform ${
                expandedSections.linkedin ? "transform rotate-180" : ""
              }`}
            />
          </div>
          {expandedSections.linkedin && (
            <div className="p-3 border-t border-gray-800">
              <div className="space-y-3">
                {renderConfigSections("linkedin")}
                <button
                  className="w-full bg-[#3570BC] hover:bg-blue-600 text-white py-2 rounded"
                  onClick={() => submitForm("linkedin")}
                >
                  Save LinkedIn Preset
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TikTok Presets */}
      {selectedPlatforms.includes("tiktok") && (
        <div className="border border-[#393939] rounded-[8px] backdrop-blur-[101.51px] overflow-hidden ">
          <div
            className="flex justify-between items-center p-4 cursor-pointer"
            onClick={() => toggleSection("tiktok")}
          >
            <div className="flex items-center">
              <span className="w-6 h-6 mr-2 flex items-center justify-center">
                <img
                  src="/dashboard/tiktok.svg"
                  alt="tiktok"
                  className="w-6 h-6"
                />
              </span>
              <span className="text-white">TikTok Presets</span>
            </div>
            <ChevronDown
              size={18}
              className={`text-gray-500 transition-transform ${
                expandedSections.tiktok ? "transform rotate-180" : ""
              }`}
            />
          </div>
          {expandedSections.tiktok && (
            <div className="p-3 border-t border-gray-800">
              <div className="space-y-3">
                {renderConfigSections("tiktok")}
                <button
                  className="w-full bg-[#3570BC] hover:bg-blue-600 text-white py-2 rounded"
                  onClick={() => submitForm("tiktok")}
                >
                  Save TikTok Preset
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Pinterest Presets */}
      {selectedPlatforms.includes("pinterest") && (
        <div className="border border-[#393939] rounded-[8px] backdrop-blur-[101.51px] overflow-hidden ">
          <div
            className="flex justify-between items-center p-4 cursor-pointer"
            onClick={() => toggleSection("pinterest")}
          >
            <div className="flex items-center">
              <span className="w-6 h-6 mr-2 flex items-center justify-center">
                <img
                  src="/dashboard/pinterest.svg"
                  alt="pinterest"
                  className="w-6 h-6"
                />
              </span>
              <span className="text-white">Pinterest Presets</span>
            </div>
            <ChevronDown
              size={18}
              className={`text-gray-500 transition-transform ${
                expandedSections.pinterest ? "transform rotate-180" : ""
              }`}
            />
          </div>
          {expandedSections.pinterest && (
            <div className="p-3 border-t border-gray-800">
              <div className="space-y-3">
                {renderConfigSections("pinterest")}
                <button
                  className="w-full bg-[#3570BC] hover:bg-blue-600 text-white py-2 rounded"
                  onClick={() => submitForm("pinterest")}
                >
                  Save Pinterest Preset
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Twitch Presets */}
      {selectedPlatforms.includes("twitch") && (
        <div className="border border-[#393939] rounded-[8px] backdrop-blur-[101.51px] overflow-hidden ">
          <div
            className="flex justify-between items-center p-4 cursor-pointer"
            onClick={() => toggleSection("twitch")}
          >
            <div className="flex items-center">
              <span className="w-6 h-6 mr-2 flex items-center justify-center">
                <img
                  src="/dashboard/twitch.svg"
                  alt="twitch"
                  className="w-6 h-6"
                />
              </span>
              <span className="text-white">Twitch Presets</span>
            </div>
            <ChevronDown
              size={18}
              className={`text-gray-500 transition-transform ${
                expandedSections.twitch ? "transform rotate-180" : ""
              }`}
            />
          </div>
          {expandedSections.twitch && (
            <div className="p-3 border-t border-gray-800">
              <div className="space-y-3">
                {renderConfigSections("twitch")}
                <button
                  className="w-full bg-[#3570BC] hover:bg-blue-600 text-white py-2 rounded"
                  onClick={() => submitForm("twitch")}
                >
                  Save Twitch Preset
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Errors Section */}
      <div className="border border-[#393939] rounded-[8px] backdrop-blur-[101.51px] overflow-hidden">
        <div
          className="flex justify-between items-center p-4 cursor-pointer bg-red-900/30"
          onClick={() => toggleSection("errors")}
        >
          <div className="flex items-center text-red-400">
            <AlertTriangle size={16} className="mr-2" />
            <span>
              {
                // Count total visible errors (general + selected platforms)
                (errors["general"]?.length || 0) +
                  selectedPlatforms.reduce(
                    (total, platform) =>
                      total + (errors[platform]?.length || 0),
                    0
                  )
              }{" "}
              Errors
            </span>
          </div>
          <ChevronDown
            size={18}
            className={`text-gray-500 transition-transform ${
              expandedSections.errors ? "transform rotate-180" : ""
            }`}
          />
        </div>

        {expandedSections.errors && (
          <div className="p-4 border-t border-gray-800">
            <div className="space-y-3">
              {/* General Errors */}
              {errors["general"]?.map((msg, index) => (
                <div
                  key={`general-${index}`}
                  className="flex items-start gap-2"
                >
                  <div className="w-5 h-5">
                    <AlertTriangle size={20} className="text-red-500" />
                  </div>
                  <div className="text-xs text-[#A7A7A7] leading-snug mt-0.5">
                    {msg}
                  </div>
                </div>
              ))}

              {/* Platform-specific Errors */}
              {selectedPlatforms.map((platform) =>
                errors[platform]?.map((msg, index) => (
                  <div
                    key={`${platform}-${index}`}
                    className="flex items-start gap-2"
                  >
                    <div className="w-5 h-5">
                      <img
                        src={getPlatformIcon(platform)}
                        alt={platform}
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                    <div className="text-xs text-[#A7A7A7] leading-snug mt-0.5">
                      {msg}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 gap-4">
        <button
          onClick={() => setIsCreateModalOpen(false)}
          className="cursor-pointer px-4 py-3 text-gray-400 hover:text-white border border-[#393939] rounded-[8px] backdrop-blur-[101.51px]"
        >
          Cancel
        </button>

        { selectedPost ? (
          <button
            className="cursor-pointer px-4 py-3 text-gray-400 hover:text-white border border-[#393939] rounded-[8px] backdrop-blur-[101.51px]"
            onClick={() => onDeletePost(scheduleDate)}
                >
                Delete Post
          </button>
          ) : (<></>)
        }
        <div className="flex items-center gap-2">
          {/* <button className="flex items-center px-4 py-3 border border-[#393939] rounded-[8px] backdrop-blur-[101.51px]">
            <Calendar size={16} className="mr-2" />
            <span>{formatScheduleDate(scheduleDate)}</span>
            <input
              type="date"
              className="hidden"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
            />
          </button> */}
          <DatePickerButton
            scheduleDate={scheduleDate}
            setScheduleDate={setScheduleDate}
          ></DatePickerButton>
          {selectedPost ? (
            <button
              className="px-4 py-3 border border-[#393939] rounded-[8px] backdrop-blur-[101.51px] flex items-center"
              onClick={() => onSaveChanges(scheduleDate)}
            >
              <span className="mr-1">Save</span>
            </button>
          ) : (
            <button
              className="px-4 py-3 border border-[#393939] rounded-[8px] backdrop-blur-[101.51px] flex items-center"
              onClick={() => onSchedule(scheduleDate)}
            >
            <span className="mr-1">Schedule</span>
            </button>
          )
          }
        </div>
      </div>
    </div>
  );
};

export default PostPreset;
