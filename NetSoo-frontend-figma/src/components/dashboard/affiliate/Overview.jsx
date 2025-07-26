"use client";
import { ArrowUp, Copy } from "lucide-react";

const Overview = () => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-[#FFFFFF0A] backdrop-blur-[120.57px] text-white border border-[#FFFFFF30] rounded-[20px] p-5">
          <h2 className="text-lg font-medium mb-4">
            Affiliation account sumary
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-[12px] p-[1px] bg-[linear-gradient(91.71deg,_rgba(53,112,188,0.06)_-40.38%,_rgba(53,112,188,0.59)_55.05%,_rgba(53,112,188,0.06)_115.46%)]">
              <div className="bg-[#212831] rounded-[12px] p-3 min-w-[115px]">
                <p className="text-gray-400 text-sm">Total Clicks</p>
                <p className="text-white text-2xl font-bold">2,456</p>
              </div>
            </div>

            {/* Registrations */}
            <div className="rounded-[12px] p-[1px] bg-[linear-gradient(91.71deg,_rgba(76,208,162,0.06)_-40.38%,_rgba(76,208,162,0.59)_55.05%,_rgba(76,208,162,0.06)_115.46%)]">
              <div className="bg-[#232D29] rounded-[12px] p-3 min-w-[115px]">
                <p className="text-gray-400 text-sm">Registrations</p>
                <p className="text-white text-2xl font-bold">465</p>
              </div>
            </div>

            {/* Earnings */}
            <div className="p-[1px] rounded-[12px] bg-[linear-gradient(91.71deg,_rgba(245,68,68,0.06)_-40.38%,_rgba(245,68,68,0.59)_55.05%,_rgba(245,68,68,0.06)_115.46%)]">
              <div className="bg-[#342323] rounded-[12px] p-3 min-w-[115px]">
                <p className="text-gray-400 text-sm">Earnings</p>
                <p className="text-white text-2xl font-bold">$3,465</p>
              </div>
            </div>

            {/* Balance */}
            <div className="rounded-[12px] p-[1px] bg-[linear-gradient(91.71deg,_rgba(76,208,162,0.06)_-40.38%,_rgba(76,208,162,0.59)_55.05%,_rgba(76,208,162,0.06)_115.46%)]">
              <div className="bg-[#1e2a1e] rounded-[12px] p-3 min-w-[115px]">
                <p className="text-gray-400 text-sm">Balance</p>
                <p className="text-white text-2xl font-bold">$3,465</p>
              </div>
            </div>
          </div>
        </div>

        {/* Affiliation Link */}
        <div className="bg-[#FFFFFF0A] backdrop-blur-[120.57px]  border border-[#FFFFFF30] rounded-[20px] p-5">
          <h2 className="text-lg font-medium mb-2 text-white/60">
            Your affiliation link
          </h2>
          <div className="bg-[#2a2a2a] rounded-[8px] p-3 border border-[#FFFFFF30] mb-2">
            <p className="text-gray-300 truncate">https://f.mtr.cool/RFTEFO</p>
          </div>
          <button
            onClick={() => copyToClipboard("https://f.mtr.cool/RFTEFO")}
            className="flex items-center text-[#3570BC] hover:text-[#60a5fa] transition-colors underline"
          >
            <Copy size={16} className="ml-1 mr-2" />
            Copy Link
          </button>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="bg-[#FFFFFF0A] backdrop-blur-[120.57px] text-white border border-[#FFFFFF30] rounded-[20px] p-5">
        <h2 className="text-lg font-medium mb-2">
          Welcome to Netsoos Affiliate Program!
        </h2>
        <p className="text-white/60 ">
          If you love Netsoo, recommend it to everyone you know and make an
          income in return. By making use of our Affiliate you will be able to
          start earning money with every user you refer that purchases a Netsoo
          Premium plan!
        </p>
      </div>

      {/* How It Works Section */}
      <div className="bg-[#FFFFFF0A] backdrop-blur-[120.57px] text-white border border-[#FFFFFF30] rounded-[20px] ">
        <h2 className="text-lg font-medium border-b border-[#FFFFFF30] mb-6 p-5">
          How does it work?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-5">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className=" mb-6">
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2650_20012)">
                  <path
                    opacity="0.1"
                    d="M9.59524 32.2512L15.3988 26.4473C18.7415 23.1045 23.6011 22.204 27.7618 23.7446V22.2375C23.1854 17.6611 15.7655 17.6611 11.189 22.2375L5.38547 28.0414C0.809009 32.6179 0.809009 40.0378 5.38547 44.6143C6.11282 45.3416 6.91223 45.953 7.76038 46.449C5.13489 41.9606 5.74612 36.1002 9.59524 32.2512Z"
                    fill="white"
                  />
                  <path
                    d="M18.8242 18.8237C18.9781 16.0455 20.1162 13.3117 22.2385 11.1894L28.0427 5.38547C32.6191 0.809009 40.0391 0.809009 44.6154 5.38547C49.1918 9.96194 49.1919 17.3819 44.6154 21.9583L38.8112 27.7622C34.2348 32.3387 26.8148 32.3387 22.2385 27.7622"
                    stroke="#3570BC"
                    strokeWidth="3.90625"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M27.7631 22.2382C26.2404 20.7155 26.2404 18.2366 27.7631 16.7139L33.5673 10.9101C35.0899 9.3874 37.5688 9.3874 39.0916 10.9101C40.6144 12.4327 40.6143 14.9116 39.0916 16.4344L33.2874 22.2382C31.7646 23.7608 29.2857 23.7608 27.7631 22.2382Z"
                    stroke="#3570BC"
                    strokeWidth="3.90625"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M27.7617 38.8104L21.9582 44.6143C17.3817 49.1907 9.9618 49.1907 5.38544 44.6143C0.80907 40.0378 0.808972 32.6179 5.38544 28.0414L11.189 22.2375C15.7654 17.6611 23.1853 17.6611 27.7617 22.2375"
                    stroke="#3570BC"
                    strokeWidth="3.90625"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.9115 39.0902C9.38887 37.5676 9.38887 35.0887 10.9115 33.5659L16.715 27.7621C18.2377 26.2395 20.7166 26.2395 22.2394 27.7621C23.7621 29.2848 23.762 31.7637 22.2394 33.2864L16.4358 39.0902C14.9131 40.6129 12.4342 40.6129 10.9115 39.0902Z"
                    stroke="#3570BC"
                    strokeWidth="3.90625"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M41.4375 35.6812L44.6374 37.9217"
                    stroke="#9834B9"
                    strokeWidth="3.90625"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.36328 12.0786L8.56309 14.3191"
                    stroke="#9834B9"
                    strokeWidth="3.90625"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M35.6797 41.437L37.9202 44.6368"
                    stroke="#9834B9"
                    strokeWidth="3.90625"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.0781 5.36377L14.3187 8.56357"
                    stroke="#9834B9"
                    strokeWidth="3.90625"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2650_20012">
                    <rect width="50" height="50" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h3 className="text-white font-medium mb-2">1. Share your link</h3>
            <p className="text-white/60 text-sm">
              Share your link and encourage your community to register through
              it.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className=" mb-6">
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2650_20054)">
                  <path
                    d="M1.95312 1.95312V44.1406C1.95312 46.2979 3.70205 48.0469 5.85938 48.0469H48.0469"
                    stroke="#3570BC"
                    strokeWidth="3.90625"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    opacity="0.1"
                    d="M15.625 36.3284C15.625 35.8978 15.7961 35.4849 16.1005 35.1805L28.32 22.9634L28.1524 22.7959C26.627 21.2706 24.1538 21.2705 22.6283 22.7958L9.76562 35.6559V36.3284C9.76562 38.4857 11.5146 40.2346 13.6719 40.2346H19.5312C17.3739 40.2346 15.625 38.4857 15.625 36.3284Z"
                    fill="white"
                  />
                  <path
                    d="M10.2411 35.1801L22.6284 22.7951C24.1539 21.2699 26.6271 21.27 28.1524 22.7954L30.4407 25.0837C31.9663 26.6093 34.4397 26.6092 35.9652 25.0835L44.9219 16.1255V36.3279C44.9219 38.4853 43.1729 40.2342 41.0156 40.2342H13.6719C11.5146 40.2342 9.76562 38.4853 9.76562 36.3279C9.76562 35.8974 9.93672 35.4845 10.2411 35.1801Z"
                    stroke="#3570BC"
                    strokeWidth="3.90625"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.76562 24.6094L22.6285 11.7465C24.154 10.221 26.6273 10.221 28.1528 11.7465L30.441 14.0347C31.9665 15.5602 34.4398 15.5602 35.9653 14.0347L41.0156 8.98438"
                    stroke="#9834B9"
                    strokeWidth="3.90625"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M40.2344 1.95312H44.1406C46.2979 1.95312 48.0469 3.70205 48.0469 5.85938V9.76562"
                    stroke="#9834B9"
                    strokeWidth="3.90625"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2650_20054">
                    <rect width="50" height="50" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h3 className="text-white font-medium mb-2">
              2. Analyze your results
            </h3>
            <p className="text-white/60 text-sm">
              Check your Affiliate Metrics to analyze your results in detail at
              any time.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className=" mb-6">
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2650_20074)">
                  <path
                    opacity="0.1"
                    d="M7.8125 42.1875V30.4688C7.8125 27.2265 10.4296 24.6094 13.6719 24.6094H7.8125C4.57021 24.6094 1.95312 27.2265 1.95312 30.4688V42.1875C1.95312 45.4295 4.57021 48.0469 7.8125 48.0469H13.6719C10.4296 48.0469 7.8125 45.4295 7.8125 42.1875Z"
                    fill="white"
                  />
                  <path
                    d="M8.98438 17.5781V7.8125C8.98438 4.57021 11.6015 1.95312 14.8438 1.95312H42.1875C45.4298 1.95312 48.0469 4.57021 48.0469 7.8125V19.5312C48.0469 21.3307 47.2407 22.9376 45.9688 24.0114"
                    stroke="#3570BC"
                    strokeWidth="3.90625"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M41.0156 30.4688V42.1875C41.0156 45.4295 38.3985 48.0469 35.1562 48.0469H7.8125C4.57021 48.0469 1.95312 45.4295 1.95312 42.1875V30.4688C1.95312 27.2265 4.57021 24.6094 7.8125 24.6094H35.1562C38.3985 24.6094 41.0156 27.2265 41.0156 30.4688Z"
                    stroke="#3570BC"
                    strokeWidth="3.90625"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M28.5156 17.5781C30.673 17.5781 32.4219 15.8292 32.4219 13.6719C32.4219 11.5145 30.673 9.76562 28.5156 9.76562C26.3583 9.76562 24.6094 11.5145 24.6094 13.6719C24.6094 15.8292 26.3583 17.5781 28.5156 17.5781Z"
                    stroke="#9834B9"
                    strokeWidth="3.90625"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="16.7969"
                    cy="13.6719"
                    r="1.95312"
                    fill="#9834B9"
                  />
                  <circle
                    cx="40.2344"
                    cy="13.6719"
                    r="1.95312"
                    fill="#9834B9"
                  />
                  <path
                    d="M21.4844 40.2344C23.6417 40.2344 25.3906 38.4855 25.3906 36.3281C25.3906 34.1708 23.6417 32.4219 21.4844 32.4219C19.327 32.4219 17.5781 34.1708 17.5781 36.3281C17.5781 38.4855 19.327 40.2344 21.4844 40.2344Z"
                    stroke="#3570BC"
                    strokeWidth="3.90625"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="9.76562"
                    cy="36.3281"
                    r="1.95312"
                    fill="#3570BC"
                  />
                  <circle
                    cx="33.2031"
                    cy="36.3281"
                    r="1.95312"
                    fill="#3570BC"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2650_20074">
                    <rect width="50" height="50" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h3 className="text-white font-medium mb-2">3. Earn money</h3>
            <p className="text-white/60 text-sm">
              Recieve commission of % of your users' spending (up to a maximum
              of $50USD per user).
            </p>
          </div>
        </div>

        <div className="flex justify-center my-8">
          <button className="bg-[#3570BC] hover:bg-blue-600 text-white px-6 py-3 rounded-full transition-colors">
            More Information
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;
