"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

const faqsData = [
  {
    question:
      "What exactly is NetSoo and how is it different from other content tools?",
    answer:
      "NetSoo is an all-in-one AI platform that not only helps you create content but also predicts its performance, suggests improvements, and streamlines your posting workflow — unlike basic schedulers or generic AI writers.",
  },
  {
    question: "I’m not a marketing expert — can I still use NetSoo?",
    answer:
      "Yes! NetSoo is designed for creators, freelancers, and small business owners. It's intuitive and guides you through every step, from idea to execution, without needing marketing expertise.",
  },
  {
    question: "How does the AI know what content will perform well?",
    answer:
      "NetSoo analyzes millions of data points across platforms to understand trends, engagement triggers, and virality signals. It uses this to predict which content is most likely to succeed — before you even post it.",
  },
  {
    question: "Do I need to connect all my social media accounts?",
    answer:
      "No, you can use NetSoo without connecting accounts. However, linking them unlocks advanced features like auto-publishing, real-time analytics, and platform-specific optimization tips.",
  },
  {
    question: "What happens after I sign up?",
    answer:
      "Once you sign up, you’ll get a quick onboarding walkthrough. You can start creating content immediately, test AI features, and build a content plan tailored to your brand — all from day one.",
  },
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-10 px-4 max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12">
        Frequently asked questions
      </h2>

      <div className="space-y-4">
        {faqsData.map((faq, index) => (
          <div
            key={index}
            className="bg-[#FFFFFF05] border border-[#FFFFFF30]  backdrop-blur-[111.51px] rounded-[12px] p-6"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left text-white  text-lg cursor-pointer"
            >
              0{index + 1 + ".  " + faq.question}
              <span className="text-xl">
                {openIndex === index ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </span>
            </button>

            {openIndex === index && (
              <p className="mt-5 pt-5 text-white/60 text-md border-t border-[#FFFFFF]/6">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
