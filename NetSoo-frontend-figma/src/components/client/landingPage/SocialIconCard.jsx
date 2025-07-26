const SocialIconCard = () => {
  const socialPlatforms = [
    {
      id: "facebook",
      name: "Facebook",
      icon: "/client/facebook.svg",
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: "/client/instagram.svg",
    },
    {
      id: "threads",
      name: "Threads",
      icon: "/client/threads.svg",
    },
    {
      id: "twitter",
      name: "Twitter/X",
      icon: "/client/twitter.svg",
    },
    {
      id: "bluesky",
      name: "Bluesky",
      icon: "/client/bluesky.svg",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: "/client/linkedIn.svg",
    },
    {
      id: "google",
      name: "Google",
      icon: "/client/google.svg",
    },
    {
      id: "pinterest",
      name: "Pinterest",
      icon: "/client/pinterest.svg",
    },

    {
      id: "tiktok",
      name: "TikTok",
      icon: "/client/tiktok.svg",
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: "/client/youtube.svg",
    },
    {
      id: "meta",
      name: "Meta",
      icon: "/client/meta.svg",
    },
    {
      id: "ads",
      name: "Mastodon",
      icon: "/client/ads.svg",
    },
    {
      id: "twitch",
      name: "Twitch",
      icon: "/client/twitch.svg",
    },
    {
      id: "looker",
      name: "Looker",
      icon: "/client/looker.svg",
    },
  ];

  return (
    <div className="py-10 sm:px-4">
      <div>
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
          We're like an everything bagel.
        </h2>
        <p className="max-w-xl mx-auto text-white/80 text-lg text-center mb-10">
          But for your socials. Forget logging in to all your socials
          one-by-one. We support all the popular platforms:
        </p>

        <div className="flex justify-center items-center gap-4 sm:gap-8 mb-6 flex-wrap">
          {socialPlatforms.map((platform) => (
            <div
              key={platform.id}
              className="w-[60px] h-[60px] sm:w-[120px] sm:h-[120px] bg-white/2 border border-[#494949] rounded-[11px] backdrop-blur-[20px] flex items-center justify-center hover:border-gray-600 transition-colors"
            >
              <div className="w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] rounded-full bg-white/4 border flex justify-center items-center border-[#FFFFFF0A]">
                <img
                  src={platform.icon}
                  alt={platform.icon}
                  className="sm:w-[32px] sm:h-[32px] w-[24px] h-[24px]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialIconCard;
