import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="text-white py-16 px-4 ">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-block bg-[#FFFFFF0A] rounded-[40px] px-2 sm:px-6 py-2 mb-6 border border-[#FFFFFF0A]">
          <div className="flex items-center space-x-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_2735_19743)">
                <path
                  d="M2 11.3334L6 7.33341L8.66667 10.0001L14 4.66675"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.33594 4.6665H14.0026V9.33317"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2735_19743">
                  <rect width="16" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <p className="text-white text-sm md:text-base">
              Spend Less Time Posting, More Time Growing
            </p>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Manage All Your{" "}
          <span className="relative w-[135px] h-[49px] inline-block">
            <Image
              src="/client/socialIcons.svg"
              alt="socialIcons"
              fill
              className="object-contain"
            />
          </span>{" "}
          Socials in One Place - Effortlessly
        </h1>

        <p className="text-white/60 text-lg mb-12 max-w-3xl mx-auto">
          It's not easy to stay on top of social media management when you have
          more platforms than you can remember. Instagram, Facebook, Twitter (or
          is it X?) the list goes on.
        </p>
      </div>
      <div className="text-center ">
        <div className="bg-[#FFFFFF05] rounded-[16px] p-4 mb-10 border border-[#FFFFFF0A] backdrop-blur-[9px]">
          <h3 className="text-lg mb-6">
            We bring them all into the one place:
          </h3>
          <div className="grid md:grid-cols-3 gap-3 text-left">
            <div className="flex items-start text-white/60">
              <div className="mt-2 mr-2 w-[6px] h-[6px] bg-[#A7A6A9] rounded-[2px]"></div>
              <p className="text-[15px]">
                Schedule one post and it's published everywhere
              </p>
            </div>
            <div className="flex items-start text-white/60">
              <div className="mt-2 mr-2 w-[6px] h-[6px] bg-[#A7A6A9] rounded-[2px]"></div>
              <p className="text-[15px]">
                Reply to your messages and comments from one inbox
              </p>
            </div>
            <div className="flex items-start text-white/60">
              <div className="mt-2 mr-2 w-[6px] h-[6px] bg-[#A7A6A9] rounded-[2px]"></div>
              <p className="text-[15px]">
                Multiple clients, biolinks, analytics & more, in one dashboard
              </p>
            </div>
          </div>
        </div>
        <p className="text-xl mb-8 text-white/80">
          We have one plan. $18/month, per social set. If you work in a team,
          it's an extra $29/month, per user.
        </p>
        <Link
          href="/signup"
          className="bg-[#3570BC]  hover:bg-blue-600 text-white text-lg font-medium px-14 py-4 rounded-full inline-block transition duration-300 mb-6"
        >
          Start Free for 14 Days
        </Link>
        <p className="text-white/80 ">
          No setup. No credit card. Just results.
        </p>
        <div className="inline-block">
          <Image
            src="/client/heroCard.svg"
            alt="socialIcons"
            width={1248}
            height={786}
            className="h-auto w-auto "
          />
          <p className="text-white/80 text-capitalize text-lg mt-6 ">
            Get instant analytics for all your socials with Netsoo.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
