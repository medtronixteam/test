"use client";
import { ChevronDown, Info } from "lucide-react";
import React, { useState, useEffect } from "react";
import { fetchChatHistory, sendMessageToAI } from "@/api/ai-chat";
import ReactMarkdown from 'react-markdown';

const TextGenerator = () => {
  const [formData, setFormData] = useState({
    topic: "",
    tone: "",
    language: "English",
    socialMedia: "Any Social media",
  });
  const [messages, setMessages] = useState([]);
  const [generatingText, setGeneratingText] = useState(false);
  

  const token = localStorage.getItem('accessToken');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateAIText = async (e) => {
    if (!generatingText && formData.topic.length > 0){
      setGeneratingText(true);

      const formattedText = `
      User Query: ${formData.topic}
      Tone: ${formData.tone}
      Language: ${formData.language}
      Social Media: ${formData.socialMedia}`;
      const response = await sendMessageToAI(formattedText, token);
      setGeneratingText(false);
    }
  };

  useEffect(() => {
    const loadHistory = async () => {
      const data = await fetchChatHistory(token);
      setMessages(data);
    };
    loadHistory();
  }, [generatingText]);

  return (
    <div className="border border-[#FFFFFF30] rounded-[20px]">
      <div className="flex justify-between flex-col md:flex-row items-center border-b border-[#FFFFFF30]  p-5">
        <h1 className="text-xl">Text generator with AI</h1>
        <div className="flex items-center text-md text-white">
          <span>
            Available credits: <span className="text-white font-bold">2.9</span>{" "}
            of <span className="text-white font-bold">5</span>
          </span>
          <button className="ml-2 text-[#ADA9AC]">
            <Info size={18} />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row ">
        {/* Left Column - Message */}
        <div className="md:w-[70%] flex  p-5">
          <div className="flex flex-col gap-4 w-full">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex  ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "agent" && (
                  <svg
                    width="26"
                    height="25"
                    viewBox="0 0 26 25"
                    className="mr-3"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.0423 8.3335V18.8335C22.0423 19.6844 21.7043 20.5005 21.1026 21.1021C20.5009 21.7038 19.6849 22.0418 18.834 22.0418H13.094L10.259 24.4918C9.99779 24.7222 9.66225 24.8506 9.31398 24.8535C9.10014 24.8385 8.89258 24.7747 8.70732 24.6668C8.45267 24.5535 8.23652 24.3685 8.08528 24.1344C7.93404 23.9003 7.85425 23.6272 7.85565 23.3485V22.0418H7.16732C6.31642 22.0418 5.50036 21.7038 4.89868 21.1021C4.297 20.5005 3.95898 19.6844 3.95898 18.8335V8.3335C3.95898 7.48259 4.297 6.66654 4.89868 6.06486C5.50036 5.46318 6.31642 5.12516 7.16732 5.12516H15.6257V1.3335C15.6257 1.10143 15.7178 0.878872 15.8819 0.714778C16.046 0.550683 16.2686 0.458496 16.5007 0.458496C16.7327 0.458496 16.9553 0.550683 17.1194 0.714778C17.2835 0.878872 17.3757 1.10143 17.3757 1.3335V5.12516H18.834C19.6849 5.12516 20.5009 5.46318 21.1026 6.06486C21.7043 6.66654 22.0423 7.48259 22.0423 8.3335ZM17.3757 15.9168C17.3726 15.6857 17.2795 15.4649 17.116 15.3015C16.9526 15.138 16.7318 15.0449 16.5007 15.0418H9.50065C9.26859 15.0418 9.04603 15.134 8.88193 15.2981C8.71784 15.4622 8.62565 15.6848 8.62565 15.9168C8.62565 16.1489 8.71784 16.3715 8.88193 16.5355C9.04603 16.6996 9.26859 16.7918 9.50065 16.7918H16.5007C16.7318 16.7888 16.9526 16.6957 17.116 16.5322C17.2795 16.3688 17.3726 16.148 17.3757 15.9168ZM17.3757 11.2502C17.3726 11.019 17.2795 10.7982 17.116 10.6348C16.9526 10.4713 16.7318 10.3782 16.5007 10.3752H9.50065C9.26859 10.3752 9.04603 10.4674 8.88193 10.6314C8.71784 10.7955 8.62565 11.0181 8.62565 11.2502C8.62565 11.4822 8.71784 11.7048 8.88193 11.8689C9.04603 12.033 9.26859 12.1252 9.50065 12.1252H16.5007C16.7318 12.1221 16.9526 12.029 17.116 11.8655C17.2795 11.7021 17.3726 11.4813 17.3757 11.2502Z"
                      fill="white"
                    />
                    <path
                      opacity="0.4"
                      d="M25.5419 11.2502V13.5835C25.5529 14.1848 25.3946 14.7771 25.0852 15.2928C24.7758 15.8085 24.3276 16.2269 23.7919 16.5002V8.39183C24.3187 8.66067 24.7609 9.06991 25.0698 9.57432C25.3786 10.0787 25.542 10.6587 25.5419 11.2502ZM0.458544 11.2502V13.5835C0.447549 14.1848 0.605791 14.7771 0.915218 15.2928C1.22464 15.8085 1.6728 16.2269 2.20854 16.5002V8.39183C1.68173 8.66067 1.23947 9.06991 0.930646 9.57432C0.621818 10.0787 0.458434 10.6587 0.458544 11.2502ZM22.0419 8.3335V18.8335C22.0419 19.6844 21.7039 20.5005 21.1022 21.1021C20.5005 21.7038 19.6844 22.0418 18.8335 22.0418H13.0935L10.2585 24.4918C9.99735 24.7222 9.66181 24.8506 9.31354 24.8535C9.0997 24.8385 8.89214 24.7747 8.70688 24.6668C8.45223 24.5535 8.23608 24.3685 8.08484 24.1344C7.9336 23.9003 7.8538 23.6272 7.85521 23.3485V22.0418H7.16688C6.31597 22.0418 5.49992 21.7038 4.89824 21.1021C4.29656 20.5005 3.95854 19.6844 3.95854 18.8335V8.3335C3.95854 7.48259 4.29656 6.66654 4.89824 6.06486C5.49992 5.46318 6.31597 5.12516 7.16688 5.12516H15.6252V1.3335C15.6252 1.10143 15.7174 0.878872 15.8815 0.714778C16.0456 0.550683 16.2681 0.458496 16.5002 0.458496C16.7323 0.458496 16.9548 0.550683 17.1189 0.714778C17.283 0.878872 17.3752 1.10143 17.3752 1.3335V5.12516H18.8335C19.6844 5.12516 20.5005 5.46318 21.1022 6.06486C21.7039 6.66654 22.0419 7.48259 22.0419 8.3335ZM17.3752 15.9168C17.3722 15.6857 17.279 15.4649 17.1156 15.3015C16.9521 15.138 16.7313 15.0449 16.5002 15.0418H9.50021C9.26815 15.0418 9.04559 15.134 8.88149 15.2981C8.7174 15.4622 8.62521 15.6848 8.62521 15.9168C8.62521 16.1489 8.7174 16.3715 8.88149 16.5355C9.04559 16.6996 9.26815 16.7918 9.50021 16.7918H16.5002C16.7313 16.7888 16.9521 16.6957 17.1156 16.5322C17.279 16.3688 17.3722 16.148 17.3752 15.9168ZM17.3752 11.2502C17.3722 11.019 17.279 10.7982 17.1156 10.6348C16.9521 10.4713 16.7313 10.3782 16.5002 10.3752H9.50021C9.26815 10.3752 9.04559 10.4674 8.88149 10.6314C8.7174 10.7955 8.62521 11.0181 8.62521 11.2502C8.62521 11.4822 8.7174 11.7048 8.88149 11.8689C9.04559 12.033 9.26815 12.1252 9.50021 12.1252H16.5002C16.7313 12.1221 16.9521 12.029 17.1156 11.8655C17.279 11.7021 17.3722 11.4813 17.3752 11.2502Z"
                      fill="white"
                    />
                  </svg>
                )}

                <div
                  className={`border border-[#FFFFFF30] rounded-[8px] p-4 max-w-[70%] ${
                    msg.sender === "user"
                      ? "bg-[#3570BC] text-white"
                      : " text-white"
                  }`}
                >
                  <>
                    {index === 0 ? (
                      <div>
                        <h2 className="text-lg font-medium">
                          Hello! I'm your AI assistant.
                        </h2>
                        <p className="text-white/60">
                          Fill in the fields and I'll generate a text for you to
                          customize as your own. Let's get started!
                        </p>
                      </div>
                    ) : (
                      // <p className="text-lg font-medium">{msg.message}</p>
                      <ReactMarkdown>{msg.message}</ReactMarkdown>
                    )}
                  </>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="md:w-[30%] border-l border-[#FFFFFF30] px-5">
          <div className="flex justify-center items-center h-40">
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M82.2913 33.3335V70.8335C82.2913 73.8724 81.0841 76.7869 78.9353 78.9358C76.7864 81.0846 73.872 82.2918 70.833 82.2918H50.333L40.208 91.0418C39.2752 91.8646 38.0768 92.3232 36.833 92.3335C36.0693 92.2801 35.328 92.052 34.6663 91.6668C33.7569 91.2622 32.9849 90.6015 32.4448 89.7654C31.9046 88.9292 31.6197 87.9539 31.6247 86.9585V82.2918H29.1663C26.1274 82.2918 23.2129 81.0846 21.0641 78.9358C18.9152 76.7869 17.708 73.8724 17.708 70.8335V33.3335C17.708 30.2946 18.9152 27.3801 21.0641 25.2312C23.2129 23.0824 26.1274 21.8752 29.1663 21.8752H59.3747V8.3335C59.3747 7.50469 59.7039 6.70984 60.29 6.12379C60.876 5.53774 61.6709 5.2085 62.4997 5.2085C63.3285 5.2085 64.1233 5.53774 64.7094 6.12379C65.2954 6.70984 65.6247 7.50469 65.6247 8.3335V21.8752H70.833C73.872 21.8752 76.7864 23.0824 78.9353 25.2312C81.0841 27.3801 82.2913 30.2946 82.2913 33.3335ZM65.6247 60.4168C65.6139 59.5914 65.2812 58.8028 64.6974 58.2191C64.1137 57.6353 63.3251 57.3026 62.4997 57.2918H37.4997C36.6709 57.2918 35.876 57.6211 35.29 58.2071C34.7039 58.7932 34.3747 59.588 34.3747 60.4168C34.3747 61.2456 34.7039 62.0405 35.29 62.6265C35.876 63.2126 36.6709 63.5418 37.4997 63.5418H62.4997C63.3251 63.531 64.1137 63.1983 64.6974 62.6146C65.2812 62.0309 65.6139 61.2423 65.6247 60.4168ZM65.6247 43.7502C65.6139 42.9247 65.2812 42.1361 64.6974 41.5524C64.1137 40.9687 63.3251 40.636 62.4997 40.6252H37.4997C36.6709 40.6252 35.876 40.9544 35.29 41.5405C34.7039 42.1265 34.3747 42.9214 34.3747 43.7502C34.3747 44.579 34.7039 45.3738 35.29 45.9599C35.876 46.5459 36.6709 46.8752 37.4997 46.8752H62.4997C63.3251 46.8644 64.1137 46.5317 64.6974 45.9479C65.2812 45.3642 65.6139 44.5756 65.6247 43.7502Z"
                fill="white"
              />
              <path
                opacity="0.4"
                d="M94.7913 43.7502V52.0835C94.8306 54.2311 94.2654 56.3464 93.1603 58.1882C92.0552 60.0301 90.4547 61.5242 88.5413 62.5002V33.5418C90.4228 34.502 92.0023 35.9635 93.1052 37.765C94.2082 39.5665 94.7917 41.6378 94.7913 43.7502ZM5.20797 43.7502V52.0835C5.1687 54.2311 5.73385 56.3464 6.83895 58.1882C7.94404 60.0301 9.54458 61.5242 11.458 62.5002V33.5418C9.57648 34.502 7.99701 35.9635 6.89405 37.765C5.79109 39.5665 5.20758 41.6378 5.20797 43.7502ZM82.2913 33.3335V70.8335C82.2913 73.8724 81.0841 76.7869 78.9352 78.9358C76.7864 81.0846 73.8719 82.2918 70.833 82.2918H50.333L40.208 91.0418C39.2751 91.8646 38.0768 92.3232 36.833 92.3335C36.0692 92.2801 35.328 92.052 34.6663 91.6668C33.7568 91.2622 32.9849 90.6015 32.4447 89.7654C31.9046 88.9292 31.6196 87.9539 31.6246 86.9585V82.2918H29.1663C26.1274 82.2918 23.2129 81.0846 21.064 78.9358C18.9152 76.7869 17.708 73.8724 17.708 70.8335V33.3335C17.708 30.2946 18.9152 27.3801 21.064 25.2312C23.2129 23.0824 26.1274 21.8752 29.1663 21.8752H59.3746V8.3335C59.3746 7.50469 59.7039 6.70984 60.2899 6.12379C60.876 5.53774 61.6708 5.2085 62.4996 5.2085C63.3284 5.2085 64.1233 5.53774 64.7093 6.12379C65.2954 6.70984 65.6246 7.50469 65.6246 8.3335V21.8752H70.833C73.8719 21.8752 76.7864 23.0824 78.9352 25.2312C81.0841 27.3801 82.2913 30.2946 82.2913 33.3335ZM65.6246 60.4168C65.6138 59.5914 65.2811 58.8028 64.6974 58.2191C64.1137 57.6353 63.3251 57.3026 62.4996 57.2918H37.4996C36.6708 57.2918 35.876 57.6211 35.2899 58.2071C34.7039 58.7932 34.3746 59.588 34.3746 60.4168C34.3746 61.2456 34.7039 62.0405 35.2899 62.6265C35.876 63.2126 36.6708 63.5418 37.4996 63.5418H62.4996C63.3251 63.531 64.1137 63.1983 64.6974 62.6146C65.2811 62.0309 65.6138 61.2423 65.6246 60.4168ZM65.6246 43.7502C65.6138 42.9247 65.2811 42.1361 64.6974 41.5524C64.1137 40.9687 63.3251 40.636 62.4996 40.6252H37.4996C36.6708 40.6252 35.876 40.9544 35.2899 41.5405C34.7039 42.1265 34.3746 42.9214 34.3746 43.7502C34.3746 44.579 34.7039 45.3738 35.2899 45.9599C35.876 46.5459 36.6708 46.8752 37.4996 46.8752H62.4996C63.3251 46.8644 64.1137 46.5317 64.6974 45.9479C65.2811 45.3642 65.6138 44.5756 65.6246 43.7502Z"
                fill="white"
              />
            </svg>
          </div>
          {/* Form Fields */}
          <div className="space-y-4">
            {/* Topic */}
            <div>
              <label className="block text-[16px] text-[#A7A7A7] mb-2">
                Write the topic of the text to generate.
              </label>
              <textarea
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                placeholder="Type here..."
                rows={4}
                className="w-full px-3 py-3  bg-zinc-800/50 border border-zinc-700 rounded-[8px] resize-none focus:outline-none focus:ring-1 focus:ring-zinc-600"
              ></textarea>
            </div>

            <div>
              <label className="block text-[16px] text-[#A7A7A7] mb-2">
                Choose a Tone
              </label>
              <div className="relative">
                <select
                  name="tone"
                  value={formData.tone}
                  onChange={handleChange}
                  className="px-3 py-3 w-full border border-zinc-700 rounded-[8px] bg-[#1e1e1e] appearance-none focus:outline-none focus:ring-1 focus:ring-[#555] transition"
                >
                  {/* <option value="">Select tone</option> */}
                  <option value="Professional">Professional</option>
                  <option value="Casual">Casual</option>
                  <option value="Friendly">Friendly</option>
                </select>
                <ChevronDown className="absolute right-3 top-4 w-4 h-4 text-zinc-400 pointer-events-none" />
              </div>
            </div>

            {/* Language */}
            <div>
              <label className="block text-[16px] text-[#A7A7A7] mb-2">
                Language
              </label>
              <div className="relative">
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="px-3 py-3 w-full border border-zinc-700 rounded-[8px] bg-[#1e1e1e] appearance-none focus:outline-none focus:ring-1 focus:ring-[#555] transition"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
                <ChevronDown className="absolute right-3 top-4 w-4 h-4 text-zinc-400 pointer-events-none" />
              </div>
            </div>

            {/* Social Media */}
            <div>
              <label className="block text-[16px] text-[#A7A7A7] mb-2">
                Optimize for Social media
              </label>
              <div className="relative">
                <select
                  name="socialMedia"
                  value={formData.socialMedia}
                  onChange={handleChange}
                  className="px-3 py-3 w-full border border-zinc-700 rounded-[8px] bg-[#1e1e1e] appearance-none focus:outline-none focus:ring-1 focus:ring-[#555] transition"
                >
                  <option value="Any Social media">Any Social media</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Twitter">Twitter</option>
                  <option value="LinkedIn">LinkedIn</option>
                </select>
                <ChevronDown className="absolute right-3 top-4 w-4 h-4 text-zinc-400 pointer-events-none" />
              </div>
            </div>

            {/* Generate Button */}
            <div className="mt-20 mb-6">
              <button className="w-full bg-[#3570BC] hover:bg-blue-600 text-white py-3 rounded-[138px] transition-colors duration-200" onClick={generateAIText}>
                Generate Text
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextGenerator;
