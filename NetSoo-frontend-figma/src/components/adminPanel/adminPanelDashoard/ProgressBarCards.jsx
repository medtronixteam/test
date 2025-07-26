const ProgressCard = ({ title, children }) => {
  return (
    <div className="bg-[#FFFFFF05] rounded-[8px] p-5 border border-[#FFFFFF30] backdrop-blur-[111.51px]">
      <div className="mb-4">
        <div className="">
          <img src={"/dashboard/wallet.png"} alt="" />
        </div>
      </div>
      <h2 className="text-white/80 text-xs uppercase tracking-wider mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
};

const ProgressBarCards = () => {
  // Data for the third card
  const tierData = [
    { name: "Basic", percentage: 75 },
    { name: "Standard", percentage: 85 },
    { name: "Premium", percentage: 65 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <ProgressCard title="Subscription abandonment rate">
        <div>
          <h3 className="text-white text-4xl font-bold mb-1">82%</h3>
          <p className="text-white/40 text-sm">From all platforms</p>
        </div>
      </ProgressCard>

      <ProgressCard title="Rate of users in free period">
        <div className="mb-4">
          <div className="w-full bg-[#2A2A2A] rounded-md h-3.5">
            <div
              className="bg-[#2F5E9B] h-3.5 rounded-md"
              style={{ width: "82%" }}
            ></div>
          </div>
        </div>
        <div className="flex items-baseline">
          <h3 className="text-white text-4xl font-bold">82%</h3>
          <span className="text-white text-sm ml-2">↑ 4.2%</span>
        </div>
      </ProgressCard>

      <ProgressCard title="Rate of users in free period">
        <div className="space-y-4">
          {tierData.map((tier, index) => (
            <div key={index}>
              <div className="flex justify-between gap-3 items-center mb-1">
                <div className="text-white/80 text-sm w-20">{tier.name}</div>
                <div className="w-full bg-[#2A2A2A] rounded-md h-3.5">
                  <div
                    className="bg-[#2F5E9B] h-3.5 rounded-md"
                    style={{ width: `${tier.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ProgressCard>
    </div>
  );
};

export default ProgressBarCards;
