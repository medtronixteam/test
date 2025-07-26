import Image from "next/image";

const MediaManagement = () => {
  return (
    <div className="relative pb-10 px-4">
      <div className="relative w-full h-[20px] sm:h-[100px] md:h-[114px] mb-4">
        {" "}
        <Image
          src="/client/ellipseGradient.svg"
          alt="Gradient Ellipse"
          width={1248}
          height={114}
          className="object-fit"
        />
      </div>
      <div className=" backdrop-blur-[571.51px] rounded-[30px] border border-[#FFFFFF29] overflow-hidden ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="p-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Simplify Social Media Management with One Powerful Platform
            </h1>
            <p className="text-white/80 text-lg mb-8">
              Plan campaigns, collaborate across teams, and optimize content
              with NetSoo – your all-in-one tool for serious social growth.
            </p>
            <button className="bg-[#3570BC] hover:bg-blue-600 text-white text-lg font-medium px-8 py-3 rounded-full inline-block transition duration-300 ">
              Start Free for 14 Days
            </button>
          </div>
          <div className="mt-8">
            <Image
              src="/client/mediaManagement.svg"
              alt="Media Management Interface"
              width={753}
              height={518}
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaManagement;
