import { getPlatformIcon } from "@/utils/getPlatformIcon";
import Image from "next/image";

export const ScheduledPosts = ({ posts }) => {
  return (
    <div className="space-y-4 mt-4 ">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex items-center border-b border-[#353535] pb-3"
        >
          <div className="relative mr-3">
            {/* <Image
              src={post.avatar || "/placeholder.svg"}
              alt={post.title}
              width={48}
              height={48}
              className="rounded-md"
            /> */}
            {post.image ? (
              <img
                src={post.image || "/placeholder.svg"}
                alt=""
                className="rounded-md"
                width={48}
                height={48}
              />
            ) : post.video ? (
              <video
                src={post.video}
                className="rounded-md"
                width={48}
                height={48}
                muted
              />
            ) : (
              <img
                src="/placeholder.svg"
                alt=""
                className="rounded-md"
                width={48}
                height={48}
              />
            )}
            <div className={`absolute -bottom-1 -right-2`}>
              <img
                src={getPlatformIcon(post.platform)}
                alt={post.platform}
                className="w-4 h-4"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <h4 className="text-white text-md ">{post.title}</h4>
              {post.isNext && (
                <span className="ml-2 text-xs bg-[#DDAB2E] text-black px-2 py-0.5 rounded-full">
                  Next
                </span>
              )}
            </div>
            <p className="text-[#FFFFFF99] text-sm mt-0.5">
              Scheduled for: {post.scheduledFor}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
