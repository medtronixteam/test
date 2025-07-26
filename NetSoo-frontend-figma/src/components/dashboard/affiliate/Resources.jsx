import React from "react";
// Custom chart icon component
const ChartIcon = ({ className = "" }) => (
  <svg
    width="51"
    height="51"
    viewBox="0 0 51 51"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_2650_20504)">
      <path
        d="M2.10938 2.23047V44.418C2.10938 46.5753 3.8583 48.3242 6.01562 48.3242H48.2031"
        stroke="#3570BC"
        strokeWidth="3.90625"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.1"
        d="M15.7812 36.6057C15.7812 36.1752 15.9523 35.7623 16.2567 35.4579L28.4763 23.2407L28.3087 23.0732C26.7832 21.5479 24.3101 21.5478 22.7846 23.0731L9.92188 35.9333V36.6057C9.92188 38.7631 11.6708 40.512 13.8281 40.512H19.6875C17.5302 40.512 15.7812 38.7631 15.7812 36.6057Z"
        fill="white"
      />
      <path
        d="M10.3974 35.4574L22.7847 23.0725C24.3102 21.5473 26.7833 21.5474 28.3087 23.0728L30.597 25.361C32.1226 26.8866 34.596 26.8865 36.1215 25.3608L45.0781 16.4028V36.6053C45.0781 38.7626 43.3292 40.5115 41.1719 40.5115H13.8281C11.6708 40.5115 9.92188 38.7626 9.92188 36.6053C9.92188 36.1747 10.093 35.7618 10.3974 35.4574Z"
        stroke="#3570BC"
        strokeWidth="3.90625"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.92188 24.8867L22.7848 12.0238C24.3103 10.4983 26.7836 10.4983 28.3091 12.0238L30.5973 14.312C32.1228 15.8375 34.5961 15.8375 36.1216 14.312L41.1719 9.26172"
        stroke="#9834B9"
        strokeWidth="3.90625"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40.3906 2.23047H44.2969C46.4542 2.23047 48.2031 3.97939 48.2031 6.13672V10.043"
        stroke="#9834B9"
        strokeWidth="3.90625"
        stroke-miterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2650_20504">
        <rect
          width="50"
          height="50"
          fill="white"
          transform="translate(0.15625 0.277344)"
        />
      </clipPath>
    </defs>
  </svg>
);

const ResourceCard = ({ title, description, icon, align = "center" }) => {
  return (
    <div className="bg-[#252525] rounded-[20px] p-8 flex flex-col items-center border border-[#FFFFFF30]">
      <div className={`flex flex-col items-${align} w-full`}>
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-medium mb-2 text-center">{title}</h3>
        <p className="text-white/60 text-center mb-6">{description}</p>
      </div>
      <button className="bg-[#3570BC] hover:bg-blue-600 text-white font-medium py-2.5 px-8 rounded-full transition-colors">
        Download
      </button>
    </div>
  );
};
const Resources = () => {
  return (
    <div className="bg-[#FFFFFF0A] backdrop-blur-[120.57px] text-white border border-[#FFFFFF30] rounded-[20px] overflow-hidden min-h-screen">
      {/* Header section */}
      <div className="p-6 border-b border-[#FFFFFF30]">
        <h2 className="text-xl font-medium mb-2">Resources center</h2>
        <p className="text-white/50">
          Gain access to all the resources to effectively inform others about
          Metricool. Create content about our brand and generate revenue with
          our affiliate program.
        </p>
      </div>

      {/* Resources grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        <ResourceCard
          title="Official graphic elements"
          description="Get Netsoos logos, banners and official graphic resources."
          icon={<ChartIcon />}
        />
        <ResourceCard
          title="Netsoo tutorials"
          description="Obtain all the tutorials about our tool."
          icon={<ChartIcon />}
        />
      </div>
    </div>
  );
};

export default Resources;
