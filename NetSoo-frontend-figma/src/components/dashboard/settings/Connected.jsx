import React, { useState } from "react";

const Connected = () => {
  const [connectedNetworks] = useState([
    {
      name: "Facebook",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui",
    },
    {
      name: "Instagram",
      description:
        "Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo",
    },
    {
      name: "Twitter",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse",
    },
    {
      name: "LinkedIn",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco",
    },
    {
      name: "YouTube",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
  ]);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Connected Social Networks</h1>

      {connectedNetworks.map((network, index) => (
        <div className="mb-6" key={index}>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">{network.name}</h3>
            <button className="font-bold flex items-center justify-center gap-2 px-6 py-2.5 bg-[#2C3334] border border-[#30AD811A] text-[#4CD0A2] rounded-[138px] hover:bg-[#2C3334]/80 transition cursor-pointer">
              Connected
              <svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8434 8.66064C12.6247 10.4419 12.6247 13.3236 10.8434 15.0969C9.06219 16.8702 6.18052 16.8781 4.40719 15.0969C2.63386 13.3156 2.62594 10.434 4.40719 8.66064"
                  stroke="#4CD0A2"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.88937 10.616C7.03687 8.76354 7.03687 5.7552 8.88937 3.89479C10.7419 2.03437 13.7502 2.04229 15.6106 3.89479C17.471 5.74729 17.4631 8.75562 15.6106 10.616"
                  stroke="#4CD0A2"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <p className="text-zinc-400">{network.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Connected;
