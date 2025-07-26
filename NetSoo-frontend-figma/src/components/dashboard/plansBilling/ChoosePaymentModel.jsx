"use client";

import { X } from "lucide-react";

import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import ThankYouModel from "./ThankYouModel";

const ChoosePaymentModel = ({
  setIsCreateModalOpen,
  setThankyouModal,
  selectedPlan = { name: "Advanced", price: 49, billingPeriod: "Monthly" },
}) => {
  const modalRef = useRef(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    holderName: "Diana Palavandishvili",
    cardNumber: "4224 4224 4224 4224",
    expiration: "05/2027",
    cvc: "737",
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsCreateModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsCreateModalOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // toast.custom((t) => (
    //   <div
    //     className={`flex items-start gap-2 w-[450px] p-3 rounded-[12px] border border-[#FFFFFF30] bg-[#171717] text-white shadow-md ${
    //       t.visible ? "animate-enter" : "animate-leave"
    //     }`}
    //   >
    //     <div className="mt-[3.5px]">
    //       <svg
    //         width="17"
    //         height="17"
    //         viewBox="0 0 17 17"
    //         fill="none"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path
    //           d="M0.375 8.5C0.375 9.55058 0.581926 10.5909 0.983964 11.5615C1.386 12.5321 1.97528 13.414 2.71815 14.1569C3.46101 14.8997 4.34293 15.489 5.31353 15.891C6.28414 16.2931 7.32443 16.5 8.375 16.5C9.42558 16.5 10.4659 16.2931 11.4365 15.891C12.4071 15.489 13.289 14.8997 14.0319 14.1569C14.7747 13.414 15.364 12.5321 15.766 11.5615C16.1681 10.5909 16.375 9.55058 16.375 8.5C16.375 7.44943 16.1681 6.40914 15.766 5.43853C15.364 4.46793 14.7747 3.58601 14.0319 2.84315C13.289 2.10028 12.4071 1.511 11.4365 1.10896C10.4659 0.706926 9.42558 0.5 8.375 0.5C7.32443 0.5 6.28414 0.706926 5.31353 1.10896C4.34293 1.511 3.46101 2.10028 2.71815 2.84315C1.97528 3.58601 1.386 4.46793 0.983964 5.43853C0.581926 6.40914 0.375 7.44943 0.375 8.5Z"
    //           fill="#30AD81"
    //         />
    //         <path
    //           d="M5.70703 8.49995L7.48481 10.2777L11.0404 6.72217"
    //           fill="#30AD81"
    //         />
    //         <path
    //           d="M5.70703 8.49995L7.48481 10.2777L11.0404 6.72217"
    //           stroke="white"
    //           strokeWidth="2"
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //         />
    //       </svg>
    //     </div>

    //     <div className="flex-1">
    //       <div className="text-white text-md">
    //         Payment successful. You're officially in!
    //       </div>
    //     </div>

    //     <button
    //       onClick={() => toast.dismiss(t.id)}
    //       className="text-white/40 hover:text-white mt-[3.5px]"
    //     >
    //       <X size={18} />
    //     </button>
    //   </div>
    // ));
    console.log("Card details:", cardDetails);
    setIsCreateModalOpen(false);
    setThankyouModal(true);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-[12px] bg-[#17171780] flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-[#FFFFFF0A] backdrop-blur-[120.57px] rounded-[20px] border border-[#FFFFFF30] p-6 w-full max-w-2xl max-h-[90vh] overflow-auto "
      >
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-white text-2xl font-semibold text-center w-full">
            Choose payment method
          </h1>
        </div>

        {/* Selected Plan */}
        <div className=" rounded-[12px] mb-8 overflow-hidden border border-[#3570BC]">
          <div className="flex justify-between items-center bg-[#3570BC] text-white px-4 py-2 ">
            <span className=" text-sm">Selected plan</span>
            <button className=" text-sm underline">Change plan</button>
          </div>
          <div className="p-4 flex justify-between items-end bg-[#252B34]">
            <div>
              <h3 className="text-white text-lg">{selectedPlan.name}</h3>
              <div className="flex items-baseline">
                <span className="text-white text-2xl font-bold">
                  €{selectedPlan.price}
                </span>
                <span className="text-[#FFFFFF99] text-sm ml-1">
                  /per month
                </span>
              </div>
            </div>
            <span className="text-[#FFFFFF99]">
              {selectedPlan.billingPeriod}
            </span>
          </div>
        </div>

        {/* Payment Section */}
        <div className="mb-8">
          <h2 className="text-white text-2xl font-semibold text-center mb-2">
            Complete Your Payment
          </h2>
          <p className="text-[#FFFFFF99] text-center mb-6">
            Choose your preferred payment method to purchase the plan.
          </p>

          {/* Payment Methods */}
          <div className="space-y-3 mb-6">
            {/* PayPal Option */}
            <div
              className={`flex justify-between items-center p-4 rounded-[8px] border ${
                paymentMethod === "paypal"
                  ? "border-[#3570BC] bg-[#FFFFFF05]"
                  : "border-[#FFFFFF30] bg-[#FFFFFF05]"
              } cursor-pointer`}
              onClick={() => setPaymentMethod("paypal")}
            >
              <div className="flex items-center">
                <div className=" mr-3 flex items-center">
                  <img src="/dashboard/paypal.svg" alt="" />
                </div>
                <span className="text-white/60 font-medium">Pay by PayPal</span>
              </div>
              <div>
                {paymentMethod === "paypal" ? (
                  <div className="w-6 h-6 rounded-full border-[8px]  border-[#3570BC]" />
                ) : (
                  <div
                    className={`w-6 h-6 rounded-full border-3  border-[#525559]`}
                  />
                )}
              </div>
            </div>

            {/* Credit Card Option */}
            <div
              className={`flex justify-between items-center p-4 rounded-lg border ${
                paymentMethod === "card"
                  ? "border-[#3570BC] bg-[#FFFFFF05]"
                  : "border-[#FFFFFF30] bg-[#FFFFFF05]"
              } cursor-pointer`}
              onClick={() => setPaymentMethod("card")}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 mr-3 flex items-center">
                  <svg
                    width="39"
                    height="24"
                    viewBox="0 0 39 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_2535_2632)">
                      <path
                        d="M22.7975 5.44775H16.1836V17.5028H22.7975V5.44775Z"
                        fill="#FF5F00"
                      />
                      <path
                        d="M16.6045 11.4757C16.6035 10.3147 16.8629 9.16874 17.363 8.12445C17.8632 7.08018 18.5911 6.165 19.4915 5.44822C18.3764 4.55923 17.0373 4.00639 15.6271 3.85287C14.2169 3.69935 12.7925 3.95135 11.5169 4.58007C10.2412 5.20879 9.16568 6.18886 8.41322 7.40826C7.66075 8.62766 7.26172 10.0372 7.26172 11.4757C7.26172 12.9143 7.66075 14.3238 8.41322 15.5432C9.16568 16.7626 10.2412 17.7427 11.5169 18.3714C12.7925 19.0001 14.2169 19.2521 15.6271 19.0986C17.0373 18.9451 18.3764 18.3922 19.4915 17.5033C18.5911 16.7865 17.8632 15.8713 17.363 14.827C16.8629 13.7827 16.6035 12.6367 16.6045 11.4757Z"
                        fill="#EB001B"
                      />
                      <path
                        d="M31.7216 11.4757C31.7216 12.9143 31.3227 14.3238 30.5702 15.5432C29.8178 16.7626 28.7423 17.7427 27.4667 18.3714C26.191 19.0001 24.7667 19.2521 23.3565 19.0986C21.9464 18.9451 20.6072 18.3922 19.4922 17.5033C20.3918 16.7857 21.1191 15.8704 21.6192 14.8263C22.1193 13.7822 22.3792 12.6365 22.3792 11.4757C22.3792 10.3149 22.1193 9.16928 21.6192 8.12516C21.1191 7.08105 20.3918 6.16572 19.4922 5.44821C20.6072 4.55923 21.9464 4.00638 23.3565 3.85287C24.7667 3.69935 26.191 3.95136 27.4667 4.58008C28.7423 5.20881 29.8178 6.18888 30.5702 7.40828C31.3227 8.62769 31.7216 10.0372 31.7216 11.4757Z"
                        fill="#F79E1B"
                      />
                      <path
                        d="M30.9994 16.2268V15.98H31.0975V15.9297H30.8477V15.98H30.9458V16.2268H30.9994ZM31.4845 16.2268V15.9292H31.4079L31.3199 16.1339L31.2317 15.9292H31.1551V16.2268H31.2092V16.0023L31.2918 16.1958H31.3479L31.4305 16.0018V16.2268H31.4845Z"
                        fill="#F79E1B"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2535_2632">
                        <rect
                          width="39"
                          height="23"
                          fill="white"
                          transform="translate(0 0.475586)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <span className="text-white/60 font-medium">Pay by Card</span>
              </div>
              <div>
                {paymentMethod === "card" ? (
                  <div className="w-6 h-6 rounded-full border-[8px]  border-[#3570BC]" />
                ) : (
                  <div
                    className={`w-6 h-6 rounded-full border-3  border-[#525559]`}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Card Details Form */}
          {paymentMethod === "card" && (
            <form onSubmit={handleSubmit}>
              <h3 className="text-white font-semibold mb-4">
                Add card details
              </h3>

              <div className="space-y-4">
                {/* Holder Name */}
                <div>
                  <label
                    htmlFor="holderName"
                    className="block text-[16px] text-[#A7A7A7] mb-2"
                  >
                    Holder Name
                  </label>
                  <input
                    type="text"
                    id="holderName"
                    name="holderName"
                    placeholder="Enter Holder Name"
                    value={cardDetails.holderName}
                    onChange={handleInputChange}
                    className="px-3 py-3 flex w-full justify-between items-center border border-zinc-700 rounded-[8px] p-3  mt-2  appearance-none focus:outline-none focus:ring-1 focus:ring-[#555] transition"
                  />
                </div>

                {/* Card Number */}
                <div>
                  <label
                    htmlFor="cardNumber"
                    className="block text-[16px] text-[#A7A7A7] mb-2"
                  >
                    Credit/debit card number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="Enter Card Number"
                    value={cardDetails.cardNumber}
                    onChange={handleInputChange}
                    className="px-3 py-3 flex w-full justify-between items-center border border-zinc-700 rounded-[8px] p-3  mt-2  appearance-none focus:outline-none focus:ring-1 focus:ring-[#555] transition"
                  />
                </div>

                {/* Expiration and CVC */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="expiration"
                      className="block text-[16px] text-[#A7A7A7] mb-2"
                    >
                      Expiration month and year
                    </label>
                    <input
                      type="text"
                      id="expiration"
                      name="expiration"
                      value={cardDetails.expiration}
                      onChange={handleInputChange}
                      placeholder="MM/YYYY"
                      className="px-3 py-3 flex w-full justify-between items-center border border-zinc-700 rounded-[8px] p-3  mt-2  appearance-none focus:outline-none focus:ring-1 focus:ring-[#555] transition"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cvc"
                      className="block text-[16px] text-[#A7A7A7] mb-2"
                    >
                      CVC
                    </label>
                    <input
                      type="text"
                      id="cvc"
                      name="cvc"
                      value={cardDetails.cvc}
                      onChange={handleInputChange}
                      className="px-3 py-3 flex w-full justify-between items-center border border-zinc-700 rounded-[8px] p-3  mt-2  appearance-none focus:outline-none focus:ring-1 focus:ring-[#555] transition"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-6 py-3 border border-zinc-700 bg-[#2a2a2a] hover:bg-[#333] rounded-full text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#3570BC] hover:bg-blue-600 rounded-full text-white transition-colors"
                >
                  Confirm payment of €{selectedPlan.price}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChoosePaymentModel;
