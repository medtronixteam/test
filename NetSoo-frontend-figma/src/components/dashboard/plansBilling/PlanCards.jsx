import React, { useState, useEffect } from "react";
import ChoosePaymentModel from "./ChoosePaymentModel";
import ThankYouModel from "./ThankYouModel";
import { subscribeUser } from "@/api/subscription";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";

const PlanCards = ({ landingPage = true, mvp = false }) => {
  const [currency, setCurrency] = useState("EUR");
  const [billingPeriod, setBillingPeriod] = useState("Monthly");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [thankyouModal, setThankyouModal] = useState(false);
  const searchParams = useSearchParams();

  const token = localStorage.getItem("accessToken");

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  const currencySymbols = {
    EUR: "€",
    USD: "$",
  };

  
  const lookupKeys = {
    monthly : "netsoo_paid_monthly",
    annual : "netsoo_paid_yearly",
  };

  const plans = [
    {
      name: "Starter",
      price: {
        eur: 24,
        usd: 29,
      },
      postsPerMonth: 25,
      maxProfiles: 4,
      features: [
        { text: "Self-publishing planning 25 posts month per profile" },
        { text: "Reports" },
        { text: "Support" },
        { text: "Analysis of competitors and metrics of each social network" },
        { text: "Multiple SmartLinks" },
        {
          text: "Artificial intelligence to create texts for posts, videos & images (texts, tags, keywords & titles for each publication, whether it is a tweet, an image & video)",
        },
        { text: "Up to 4 profiles" },
      ],
    // },
    // {
    //   name: "Advanced",
    //   price: {
    //     eur: 49,
    //     usd: 59,
    //   },
    //   postsPerMonth: 1000,
    //   maxProfiles: 20,
    //   popular: true,
    //   features: [
    //     { text: "Self-publishing planning 1,000 posts month per profile" },
    //     { text: "Reports" },
    //     { text: "Support" },
    //     {
    //       text: "Unified inbox: direct message response and comments from all social networks synchronized from NetSoo with AI integration for responses.",
    //     },
    //     { text: "Analysis of competitors and metrics of each social network" },
    //     { text: "Multiple SmartLinks" },
    //     { text: "Basic AI for impact & virality predictions." },
    //     {
    //       text: "Artificial intelligence to create texts for posts, videos & images (texts, tags, keywords & titles for each publication, whether it is a tweet, an image & video)",
    //     },
    //     { text: "Up to 20 profiles" },
    //     { text: "Comparisons between networks." },
    //   ],
    // },
    // {
    //   name: "Enterprise",
    //   price: {
    //     eur: 99,
    //     usd: 119,
    //   },
    //   postsPerMonth: 12000,
    //   maxProfiles: 50,
    //   features: [
    //     { text: "Self-publishing planning 12000 posts/mes" },
    //     { text: "Reports" },
    //     { text: "Support" },
    //     {
    //       text: "Inbox uninformed: Direct message response and comments from all social networks synchronized from NetSoo with AI integration for responses.",
    //     },
    //     {
    //       text: "Advanced content scheduling with data analysis tools to optimize posts.",
    //     },
    //     {
    //       text: "Detailed monitoring of analytics and performance of advertising campaigns.",
    //     },
    //     { text: "Ad analysis with automatic optimizations." },
    //     { text: "Detailed ROI tracking." },
    //     { text: "Analysis of competitors and metrics of each social network" },
    //     { text: "Multiple SmartLinks" },
    //     {
    //       text: "Artificial intelligence to create texts for posts, videos and images (texts, tags, keywords and titles for each publication, whether it is a tweet, an image or a video)",
    //     },
    //     {
    //       text: "Advanced artificial intelligence to analyze the probability of virality that your posts, images or videos have of going viral before uploading them.",
    //     },
    //     { text: "Up to 50 profiles" },
    //   ],
    },
  ];

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId)
    {
      setThankyouModal(true);
    }
  }, [sessionId]);

  const getPrice = (plan) => {
    const basePrice = currency === "EUR" ? plan.price.eur : plan.price.usd;
    return billingPeriod === "Monthly" ? basePrice : basePrice * 10; // Annual is 10 months worth
  };

  const startSubscription = async () => {
    const lookupKey = lookupKeys[billingPeriod.toLowerCase()];
    const res = await subscribeUser(token, lookupKey);
    const stripe = await stripePromise;
    stripe.redirectToCheckout({ sessionId: res.sessionId });
  };

  const startTrial = () => {
    console.log("Starting Trial");
  };

  return (
    <div className=" text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          {landingPage && (
            <>
              <h1 className="text-2xl font-bold">Plans and billing</h1>
              <div className="flex space-x-2">
                {/* Currency toggle */}
                <div className="bg-[#FFFFFF05] border border-[#FFFFFF30] rounded-[8px] flex overflow-hidden">
                  <button
                    onClick={() => setCurrency("EUR")}
                    className={`px-4 py-2 text-sm ${
                      currency === "EUR" ? "bg-[#FFFFFF14]" : ""
                    }`}
                  >
                    EUR
                  </button>
                  <button
                    onClick={() => setCurrency("USD")}
                    className={`px-4 py-2 text-sm ${
                      currency === "USD" ? "bg-[#FFFFFF14]" : ""
                    }`}
                  >
                    USD
                  </button>
                </div>

                {/* Billing period toggle */}
                <div className="bg-[#FFFFFF05] border border-[#FFFFFF30] rounded-[8px] flex overflow-hidden">
                  <button
                    onClick={() => setBillingPeriod("Monthly")}
                    className={`px-4 py-2 text-sm ${
                      billingPeriod === "Monthly" ? "bg-[#FFFFFF14]" : ""
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingPeriod("Annual")}
                    className={`px-4 py-2 text-sm ${
                      billingPeriod === "Annual" ? "bg-[#FFFFFF14]" : ""
                    }`}
                  >
                    Annual
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        <div
          className={`grid gap-4 ${
            mvp
              ? "grid-cols-1 justify-center max-w-md mx-auto"
              : "grid-cols-1 md:grid-cols-3"
          }`}
        >
          {" "}
          {(mvp ? plans.filter((p) => p.popular) : plans).map((plan, index) => {
            const displayName = mvp && plan.popular ? "Unique" : plan.name;
            return (
              <div
                key={index}
                className={`rounded-[20px] p-6 relative border border-[#FFFFFF30]  ${
                  plan.popular ? "bg-[#3570BC1F]" : "bg-[#FFFFFF0A]"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium mb-1">{displayName}</h2>
                  {plan.popular && (
                    <div className="bg-[#3570BC] text-white text-xs px-2 py-1 rounded-[138px]">
                      Most Popular
                    </div>
                  )}
                </div>
                <div className="flex items-baseline mb-6 ">
                  <span className="text-3xl font-bold">
                    {currencySymbols[currency]}
                    {mvp && plan.price ? "$24" : getPrice(plan)}
                  </span>
                  <span className="text-white/70 text-sm ml-1">
                    {billingPeriod === "Monthly" ? "/per month" : "/per year"}
                  </span>
                </div>
                <div className=" border-t border-[#FFFFFF30] my-6 "></div>

                <h3 className="font-bold mb-5 text-lg">Features</h3>
                <ul className="space-y-3 mb-6  md:min-h-[750px]">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className=" mr-2 mt-1">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0 7.875C-1.54102e-08 8.90916 0.203693 9.93319 0.599449 10.8886C0.995204 11.8441 1.57527 12.7122 2.30653 13.4435C3.0378 14.1747 3.90593 14.7548 4.86137 15.1506C5.81681 15.5463 6.84084 15.75 7.875 15.75C8.90916 15.75 9.93319 15.5463 10.8886 15.1506C11.8441 14.7548 12.7122 14.1747 13.4435 13.4435C14.1747 12.7122 14.7548 11.8441 15.1506 10.8886C15.5463 9.93319 15.75 8.90916 15.75 7.875C15.75 6.84084 15.5463 5.81681 15.1506 4.86137C14.7548 3.90593 14.1747 3.0378 13.4435 2.30653C12.7122 1.57527 11.8441 0.995205 10.8886 0.599449C9.93319 0.203693 8.90916 0 7.875 0C6.84084 0 5.81681 0.203693 4.86137 0.599449C3.90593 0.995205 3.0378 1.57527 2.30653 2.30653C1.57527 3.0378 0.995204 3.90593 0.599449 4.86137C0.203693 5.81681 -1.54102e-08 6.84084 0 7.875Z"
                            fill="white"
                          />
                          <path
                            d="M5.25 7.875L7 9.625L10.5 6.125"
                            stroke="#1E1E1E"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-md text-[#D3D3D3]">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="">
                  <button
                    onClick={startSubscription}
                    className="w-full py-3 px-4 bg-[#FFFFFF0A] cursor-pointer rounded-[12px] border border-[#FFFFFF30] text-md transition-colors mb-3"
                  >
                    Free trial 14 days
                  </button>
                  <button
                    onClick={startSubscription}
                    className="w-full py-3 px-4 bg-[#FFFFFF0A] cursor-pointer rounded-[12px] border border-[#FFFFFF30] text-md transition-colors"
                  >
                    Subscribe Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* {isCreateModalOpen && (
        <ChoosePaymentModel
          setIsCreateModalOpen={setIsCreateModalOpen}
          setThankyouModal={setThankyouModal}
        />
      )} */}
      {thankyouModal && <ThankYouModel setThankyouModal={setThankyouModal} />}
    </div>
  );
};

export default PlanCards;
