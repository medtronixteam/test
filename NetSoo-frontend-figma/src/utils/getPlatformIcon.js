

const platformIcons = {
    facebook: "/dashboard/facebook.svg",
    instagram: "/dashboard/insta.svg",
    tiktok: "/dashboard/tiktok.svg",
    "tiktok business": "/dashboard/tiktok.svg",
    "tiktok personal": "/dashboard/tiktok.svg",
    "tiktok ads": "/dashboard/tiktok.svg",
    youtube: "/dashboard/youtube.svg",
    twitter: "/dashboard/twitter.svg",
    linkedin: "/dashboard/linkedIn.svg",
    LinkedIn: "/dashboard/linkedIn.svg",
    pinterest: "/dashboard/pinterest.svg",
    twitch: "/dashboard/twitch.svg",
    snapchat: "/dashboard/snapchat.svg",
    website: "/dashboard/website.svg",
    email: "/dashboard/mail.png",
    meta: "/dashboard/meta.svg",
    "meta ads": "/dashboard/meta.svg",
    "looker studio": "/dashboard/looker.svg",
    blog: "/dashboard/blog.svg",
    "threads": "/dashboard/threads.svg",
    "google ads": "/dashboard/googleAds.svg",
    "google": "/dashboard/google.svg",
    "google business profile": "/dashboard/google.svg",
    "bluesky": "/dashboard/Bluesky.svg",
};

export const getPlatformIcon = (name) =>
    platformIcons[name?.toLowerCase().trim()] || null;

const platformPostTypeIcons = {
    facebook: {
        Post: "/dashboard/facebook.svg",
        Story: "/dashboard/facebook.svg",
        Reel: "/dashboard/facebook.svg",
    },
    instagram: {
        Post: "/dashboard/insta.svg",
        Story: "/dashboard/insta.svg",
        Reel: "/dashboard/insta.svg",
    },
    youtube: {
        Video: "/dashboard/youtube.svg",
        Short: "/dashboard/youtube.svg",
    },
    twitter: {
        Post: "/dashboard/twitter.svg",
        Thread: "/dashboard/twitter.svg",
    },
    linkedin: {
        Post: "/dashboard/linkedin.svg",
    },
    tiktok: {
        Video: "/dashboard/tiktok.svg",
    },
    pinterest: {
        Pin: "/dashboard/pinterest.svg",
    },
    twitch: {
        Stream: "/dashboard/twitch.svg",
    },
};

export const getPostTypeIcon = (platform, type) => {
    const platformIcons = platformPostTypeIcons[platform.toLowerCase()];
    return platformIcons ? platformIcons[type] || "/dashboard/insta.svg" : "/dashboard/default.svg";
};
