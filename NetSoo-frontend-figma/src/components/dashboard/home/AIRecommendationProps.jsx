import Image from "next/image";
import Link from "next/link";

export const AIRecommendations = ({ recommendation }) => {
  return (
    <div className="border border-[#FFFFFF30] rounded-[20px]  bg-[#FFFFFF05] mt-5">
      <div className="p-4">
        <h2 className="text-white font-semibold text-lg mb-4 border-b border-[#353535] pb-3">
          AI Recommendations
        </h2>
        <div className="flex flex-wrap justify-between gap-4">
          <div className="">
            <Image
              src={recommendation.thumbnail || "/placeholder.svg"}
              alt="Video thumbnail"
              width={100}
              height={100}
              className="rounded-md"
            />
          </div>
          <div className="flex-1 order-2 md:order-0">
            <p className="text-white text-sm mb-4 mt-2 md:mt-0">
              Your {recommendation.platform} video has an {recommendation.score}
              /10 chance of going viral.
            </p>
            <Link href={"/dashboard/analytics"}>
              <button className="cursor-pointer text-md text-white border border-[#FFFFFF30] rounded-[8px] px-4 py-2  hover:bg-[#303040] transition-colors">
                See Full Analysis
              </button>
            </Link>
          </div>
          <div className="ml-4 self-center">
            <svg width="80" height="40" viewBox="0 0 80 40">
              <path
                d="M5,35 Q20,5 35,25 T65,15 T75,5"
                fill="none"
                stroke="#10B981"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>
      <p className="text-sm text-white p-4 text-center border-t  border-[#353535]">
        {recommendation.tip}
      </p>
    </div>
  );
};
