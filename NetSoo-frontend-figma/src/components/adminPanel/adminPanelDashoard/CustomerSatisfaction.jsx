import { LineChart, Line } from "recharts";

const CustomerSatisfaction = () => {
  // Sample data for trend charts
  const trendData = [
    { value: 10 },
    { value: 15 },
    { value: 13 },
    { value: 17 },
    { value: 20 },
    { value: 25 },
    { value: 30 },
    { value: 35 },
  ];

  // Activity data
  const activityData = [
    { type: "New users", increase: "5.2%", time: "2m 35s" },
    { type: "New users", increase: "5.2%", time: "2m 35s" },
    { type: "New users", increase: "5.2%", time: "2m 35s" },
    { type: "New users", increase: "5.2%", time: "2m 35s" },
  ];
  const satisfactionData = {
    negative: 560,
    neutral: 950,
    positive: 2113,
  };

  const totalResponses =
    satisfactionData.negative +
    satisfactionData.neutral +
    satisfactionData.positive;

  const getPercentage = (count) =>
    ((count / totalResponses) * 100).toFixed(1) + "%";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Customer Satisfaction Score */}
      <div className="bg-[#FFFFFF05] rounded-[8px] p-5 border border-[#FFFFFF30] backdrop-blur-[111.51px]">
        <h2 className="text-white/80 text-sm uppercase tracking-wider mb-2">
          Customer satisfaction score.
        </h2>
        <h3 className="text-white text-2xl font-semibold mb-16">
          {" "}
          {totalResponses.toLocaleString()} Score
        </h3>

        <div className="flex gap-2 w-full h-12 mb-16 overflow-hidden">
          <div
            className="bg-[#FF718B]  rounded-md"
            style={{ width: getPercentage(satisfactionData.negative) }}
          ></div>
          <div
            className="bg-[#FFEB3A]  rounded-md"
            style={{ width: getPercentage(satisfactionData.neutral) }}
          ></div>
          <div
            className="bg-[#7FE47E]  rounded-md"
            style={{ width: getPercentage(satisfactionData.positive) }}
          ></div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-center">
            <p className="text-white/80 mb-2">Negative</p>
            <div className="flex items-center justify-center">
              <div className="text-[#FF6B81] text-2xl mr-2">
                <svg
                  width="25"
                  height="26"
                  viewBox="0 0 25 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.481 0.484863C19.3248 0.484863 24.9785 6.09757 24.9785 12.8742C24.9692 20.0482 19.5691 25.4875 12.4623 25.4688C5.35547 25.4501 -0.0352671 19.9568 0.00017374 12.809C0.031884 6.07146 5.69123 0.484863 12.481 0.484863ZM12.4623 22.3519C17.59 22.3668 21.7888 18.2687 21.8056 13.2398C21.8205 7.73718 17.9183 3.69879 12.5668 3.68014C7.21519 3.66148 3.1656 7.68868 3.15255 12.9955C3.14615 14.2222 3.38232 15.4381 3.84745 16.5732C4.31259 17.7083 4.99752 18.7403 5.86287 19.6099C6.72822 20.4794 7.75691 21.1692 8.8898 21.6398C10.0227 22.1104 11.2374 22.3524 12.4642 22.3519H12.4623Z"
                    fill="#FF718B"
                  />
                  <path
                    d="M15.3533 17.4891C14.4915 17.4033 13.8872 17.2186 13.3295 17.3138C12.4601 17.4375 11.6151 17.6948 10.8243 18.0767C9.77045 18.6269 8.88629 18.6363 8.35841 17.8472C7.79882 17.006 8.07302 16.0938 9.11572 15.4354C11.1303 14.1651 13.2884 13.7454 15.6033 14.4169C16.521 14.6818 16.9351 15.3776 16.7747 16.2487C16.7274 16.5922 16.5574 16.907 16.2962 17.135C16.035 17.3629 15.7001 17.4887 15.3533 17.4891Z"
                    fill="#FF718B"
                  />
                  <path
                    d="M9.3289 8.32329C9.75066 8.32016 10.1569 8.48212 10.4609 8.77455C10.7648 9.06699 10.9423 9.46671 10.9554 9.88828C10.9292 10.2928 10.7588 10.6746 10.475 10.9642C10.1913 11.2537 9.81306 11.4319 9.4091 11.4663C9.00414 11.4616 8.61584 11.3044 8.32163 11.0261C8.02742 10.7478 7.84892 10.3688 7.82173 9.96476C7.80419 9.75608 7.83012 9.54603 7.89787 9.34788C7.96562 9.14973 8.07373 8.96778 8.21536 8.81352C8.35699 8.65927 8.52908 8.53606 8.72074 8.45168C8.9124 8.3673 9.11948 8.32358 9.3289 8.32329Z"
                    fill="#FF718B"
                  />
                  <path
                    d="M15.5645 11.4492C15.1422 11.4371 14.7413 11.2608 14.447 10.9577C14.1527 10.6547 13.9881 10.2489 13.9883 9.82642C14.0233 9.42325 14.2049 9.04692 14.4989 8.76878C14.7928 8.49064 15.1786 8.33003 15.5831 8.31738C15.7929 8.31724 16.0005 8.35941 16.1935 8.44137C16.3866 8.52332 16.5612 8.64339 16.7067 8.79437C16.8523 8.94535 16.966 9.12416 17.0408 9.32008C17.1157 9.516 17.1503 9.72501 17.1425 9.9346C17.1257 10.3419 16.9521 10.7269 16.658 11.0092C16.3639 11.2914 15.9721 11.4491 15.5645 11.4492Z"
                    fill="#FF718B"
                  />
                </svg>
              </div>
              <span className="text-white text-xl">
                {" "}
                {satisfactionData.negative}
              </span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-white/80 mb-2">Neutral</p>
            <div className="flex items-center justify-center">
              <div className="text-[#FFE066] text-2xl mr-2">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.0625 12.8425C0.0625 6.07519 5.73675 0.475548 12.588 0.484875C19.374 0.484875 25.0277 6.10503 25.0389 12.8406C25.052 19.9922 19.6295 25.465 12.5414 25.4687C5.45323 25.4725 0.0625 20.0239 0.0625 12.8425ZM12.5134 22.3556C17.5758 22.3817 21.8586 18.2612 21.8865 13.3405C21.9164 7.81179 17.9806 3.70626 12.6272 3.68387C7.31293 3.66149 3.34543 7.63645 3.20927 12.9003C3.08429 17.7557 7.20661 22.447 12.5134 22.3518V22.3556Z"
                    fill="#FFEB3A"
                  />
                  <path
                    d="M12.4801 17.8361C11.1147 17.8361 9.74934 17.851 8.3858 17.8361C7.32631 17.8212 6.70703 17.2224 6.70703 16.2692C6.70703 15.3161 7.3431 14.6875 8.3858 14.68C11.1763 14.6614 13.9674 14.6614 16.7591 14.68C17.7981 14.68 18.3838 15.3198 18.3689 16.3028C18.3559 17.2448 17.7907 17.8137 16.7703 17.8324C15.3322 17.8622 13.9052 17.8361 12.4801 17.8361Z"
                    fill="#FFEB3A"
                  />
                  <path
                    d="M9.29881 11.4677C8.89304 11.4616 8.50445 11.3029 8.21033 11.0233C7.91621 10.7437 7.7381 10.3636 7.71144 9.9587C7.69553 9.75018 7.72281 9.54062 7.79158 9.34313C7.86035 9.14563 7.96913 8.96445 8.11112 8.81091C8.2531 8.65737 8.42524 8.53478 8.61676 8.4508C8.80828 8.36682 9.01507 8.32325 9.2242 8.32283C9.63009 8.31879 10.0224 8.46913 10.3216 8.74342C10.6208 9.01771 10.8046 9.39544 10.8358 9.80015C10.8398 10.2215 10.683 10.6284 10.3975 10.9382C10.1119 11.248 9.71904 11.4374 9.29881 11.4677Z"
                    fill="#FFEB3A"
                  />
                  <path
                    d="M15.4367 8.32316C15.6387 8.31315 15.8408 8.34343 16.0311 8.41224C16.2214 8.48105 16.396 8.58702 16.545 8.72398C16.6939 8.86093 16.8141 9.02615 16.8986 9.21C16.9831 9.39385 17.0302 9.59267 17.0371 9.79488C17.052 10.2184 16.9008 10.631 16.6157 10.9447C16.3306 11.2583 15.9343 11.4481 15.5113 11.4737C14.6905 11.4942 13.8754 10.6977 13.8829 9.87696C13.9028 9.47129 14.0728 9.08753 14.36 8.80033C14.6472 8.51314 15.031 8.34305 15.4367 8.32316Z"
                    fill="#FFEB3A"
                  />
                </svg>
              </div>
              <span className="text-white text-xl">
                {" "}
                {satisfactionData.neutral}
              </span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-white/80 mb-2">Positive</p>
            <div className="flex items-center justify-center">
              <div className="text-[#7CEC9F] text-2xl mr-2">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5796 25.4686C5.4523 25.4593 0.113826 20.0444 0.125018 12.8369C0.136209 6.12179 5.81604 0.484863 12.5908 0.484863C19.3954 0.484863 25.12 6.14604 25.1032 12.8928C25.0939 20.0798 19.7106 25.4798 12.5796 25.4686ZM3.29602 13.1409C3.15985 17.3453 6.56775 22.4021 12.602 22.4114C18.3247 22.4114 21.9285 17.778 21.9453 13.1558C21.962 7.76698 17.8677 3.64281 12.5684 3.67452C7.2691 3.70623 3.29602 7.75952 3.29602 13.1409Z"
                    fill="#7FE47E"
                  />
                  <path
                    d="M12.5583 19.4958C10.2249 19.4958 8.22153 18.1248 7.4493 16.0133C7.07624 14.9967 7.4064 14.0473 8.23832 13.7395C9.13553 13.4075 9.95999 13.8123 10.3704 14.8419C10.7807 15.8716 11.538 16.3341 12.5901 16.3565C13.6421 16.3789 14.4069 15.8212 14.8489 14.8643C15.3432 13.7917 16.1546 13.3721 17.0425 13.7638C17.8632 14.1238 18.1263 15.0303 17.714 16.0805C16.8821 18.205 14.9347 19.5107 12.5583 19.4958Z"
                    fill="#7FE47E"
                  />
                  <path
                    d="M10.9042 9.91745C10.9048 10.3215 10.7504 10.7104 10.4728 11.004C10.1951 11.2976 9.81545 11.4735 9.41198 11.4955C9.20335 11.5125 8.99347 11.4861 8.79553 11.418C8.5976 11.3499 8.41591 11.2416 8.2619 11.0998C8.10788 10.9581 7.98488 10.786 7.90063 10.5944C7.81639 10.4028 7.77272 10.1958 7.77238 9.98647C7.75986 9.78582 7.78869 9.58475 7.85707 9.3957C7.92545 9.20666 8.03194 9.03367 8.16992 8.88747C8.3079 8.74127 8.47444 8.62497 8.65922 8.54577C8.84399 8.46658 9.04307 8.42618 9.2441 8.42708C10.1973 8.3935 10.88 9.01465 10.9042 9.91745Z"
                    fill="#7FE47E"
                  />
                  <path
                    d="M17.1012 9.95481C17.1039 10.1637 17.0635 10.3709 16.9824 10.5635C16.9014 10.756 16.7815 10.9298 16.6302 11.0739C16.479 11.218 16.2996 11.3293 16.1033 11.4009C15.907 11.4725 15.6981 11.5028 15.4896 11.4899C15.0853 11.4713 14.7025 11.3025 14.4161 11.0165C14.1298 10.7305 13.9605 10.3479 13.9414 9.94362C13.9451 9.73459 13.9909 9.52846 14.0761 9.33752C14.1612 9.14659 14.284 8.97479 14.437 8.83236C14.5901 8.68994 14.7703 8.57983 14.9668 8.5086C15.1634 8.43737 15.3722 8.40649 15.581 8.41781C15.7836 8.4123 15.9851 8.44842 16.1732 8.52393C16.3612 8.59944 16.5317 8.71274 16.6742 8.85681C16.8167 9.00089 16.9282 9.17267 17.0016 9.36153C17.075 9.55039 17.1089 9.75232 17.1012 9.95481Z"
                    fill="#7FE47E"
                  />
                </svg>
              </div>
              <span className="text-white text-xl">
                {satisfactionData.positive.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity */}
      <div className="bg-[#FFFFFF05] rounded-[8px] p-5 border border-[#FFFFFF30] backdrop-blur-[111.51px]">
        <h2 className="text-white font-semibold mb-6">Activity</h2>

        <div className="space-y-6">
          {activityData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#2A2A30] rounded-full mr-4"></div>
                <div>
                  <p className="text-white text-md">{item.type}</p>
                  <p className="text-white/80 text-sm">
                    Increased by {item.increase}
                  </p>
                </div>
              </div>
              <div className="text-white text-sm">{item.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="space-y-4">
        <div className="bg-[#FFFFFF05] rounded-[8px] p-5 border border-[#FFFFFF30] backdrop-blur-[111.51px]">
          <div className="flex justify-between mb-4">
            <div className="">
              <img src={"/dashboard/wallet.png"} alt="" />
            </div>
            <div className="w-24 h-12">
              <LineChart data={trendData} width={96} height={48}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </div>
          </div>
          <div className="text-white text-xs uppercase tracking-wider mb-1">
            Avg. usage time per session
          </div>
          <div className="flex items-baseline">
            <span className="text-white text-3xl font-bold mr-2">200</span>
            <span className="text-white text-sm">↑ 4.2%</span>
          </div>
        </div>

        {/* Net Promoter Score */}
        <div className="bg-[#FFFFFF05] rounded-[8px] p-5 border border-[#FFFFFF30] backdrop-blur-[111.51px]">
          <div className="flex justify-between mb-4">
            <div className="">
              <img src={"/dashboard/wallet.png"} alt="" />
            </div>
            <div className="w-24 h-12">
              <LineChart data={trendData} width={96} height={48}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </div>
          </div>
          <div className="text-white text-xs uppercase tracking-wider mb-1">
            Net promoter score
          </div>
          <div className="flex items-baseline">
            <span className="text-white text-3xl font-bold mr-2">200</span>
            <span className="text-white text-sm">↑ 4.2%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSatisfaction;
