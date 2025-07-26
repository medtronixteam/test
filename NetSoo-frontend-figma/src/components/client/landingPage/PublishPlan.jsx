import Image from "next/image";

const PublishPlan = () => {
  const features = [
    {
      id: "scheduling",
      title: "Smart Content Scheduling",
      description:
        "Schedule and automate posts in seconds. Maintain an active presence effortlessly and maximize your reach across all platforms.",
      image: "/client/Smart.svg",
    },
    {
      id: "inbox",
      title: "Unified Inbox",
      description:
        "Manage messages, comments, and mentions from a single dashboard. Boost engagement without switching between apps.",
      image: "/client/Unified.svg",
    },
    {
      id: "ai-content",
      title: "AI-Powered Content Suggestions",
      description:
        "Our AI analyzes trends and engagement to provide optimized text, titles, descriptions, and hashtags that truly work.",
      image: "/client/Suggestions.svg",
    },
    {
      id: "analytics",
      title: "Real-Time Analytics and Reports",
      description:
        "Discover what works and what doesn't with detailed reports. Make strategic decisions based on data and optimize your content like a pro.",
      image: "/client/Reports.svg",
    },
  ];

  const viralityFeature = {
    id: "virality",
    title: "Virality Prediction: Publish with Confidence",
    description:
      "Before publishing, NetSoo analyzes your content and gives it a 0-10 score based on its virality potential. Plus, it offers tailored strategies and improvements based on:",
    benefits: [
      "Trending topics and recent industry successes.",
      "Competitor analysis and their most viral content.",
      "Content quality and dynamism (editing, catchy captions, visual effects).",
      "Optimal posting times for maximum audience reach.",
    ],
    image: "/client/Virality.svg",
  };

  return (
    <div className="py-10 px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
        Plan. Publish. Grow.
      </h2>
      <p className="max-w-xl mx-auto text-white/80 text-lg text-center mb-10">
        Everything you need to streamline your social media strategy
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className=" rounded-[12px] overflow-hidden border border-[#FFFFFF30]  bg-[#1F1F1F] backdrop-blur-[111.51px]">
          <div className="relative h-[241px] w-full ">
            <Image
              src={features[0].image || "/placeholder.svg"}
              alt={features[0].title}
              fill
              className=""
            />
          </div>
          <div className="p-5">
            <h3 className="text-xl font-bold text-white mb-2">
              {features[0].title}
            </h3>
            <p className="text-white/60 text-md">{features[0].description}</p>
          </div>
        </div>

        <div className=" rounded-[12px] overflow-hidden border border-[#FFFFFF30] bg-[#1F1F1F] backdrop-blur-[111.51px]">
          <div className="relative h-[241px] w-full ">
            <Image
              src={features[1].image || "/placeholder.svg"}
              alt={features[1].title}
              fill
              className=""
            />
          </div>
          <div className="p-5">
            <h3 className="text-xl font-bold text-white mb-2">
              {features[1].title}
            </h3>
            <p className="text-white/60 text-md">{features[1].description}</p>
          </div>
        </div>

        {/* Third column - Virality Prediction (spans full height) */}
        <div className="rounded-[12px] overflow-hidden border border-[#FFFFFF30] row-span-2 bg-[#1F1F1F] backdrop-blur-[111.51px]">
          <div className="relative h-[350px] w-full ">
            <Image
              src={viralityFeature.image || "/placeholder.svg"}
              alt={viralityFeature.title}
              fill
              className="object-contain"
            />
          </div>
          <div className="p-5">
            <h3 className="text-xl font-bold text-white mb-2">
              {viralityFeature.title}
            </h3>
            <p className="text-white/60 text-md mb-6">
              {viralityFeature.description}
            </p>
            <div className="space-y-4">
              {viralityFeature.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_2735_19262)">
                      <path
                        d="M5.83594 9.99967L10.0026 14.1663L18.3359 5.83301"
                        stroke="#3570BC"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1.66406 9.99967L5.83073 14.1663M9.9974 9.99967L14.1641 5.83301"
                        stroke="#3570BC"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2735_19262">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <p className="text-white/80 text-md">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fourth column - AI-Powered Content Suggestions */}
        <div className=" rounded-[12px] overflow-hidden border border-[#FFFFFF30] bg-[#1F1F1F] backdrop-blur-[111.51px]">
          <div className="relative h-[241px] w-full ">
            <Image
              src={features[2].image || "/placeholder.svg"}
              alt={features[2].title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-5">
            <h3 className="text-xl font-bold text-white mb-2">
              {features[2].title}
            </h3>
            <p className="text-white/60 text-md">{features[2].description}</p>
          </div>
        </div>

        {/* Fifth column - Real-Time Analytics and Reports */}
        <div className=" rounded-[12px] overflow-hidden border border-[#FFFFFF30] bg-[#1F1F1F] backdrop-blur-[111.51px]">
          <div className="relative h-[241px] w-full">
            <Image
              src={features[3].image || "/placeholder.svg"}
              alt={features[3].title}
              fill
              className=""
            />
          </div>
          <div className="p-5">
            <h3 className="text-xl font-bold text-white mb-2">
              {features[3].title}
            </h3>
            <p className="text-white/60 text-md">{features[3].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishPlan;
