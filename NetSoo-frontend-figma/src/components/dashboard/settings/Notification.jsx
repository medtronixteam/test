import React, { useState } from "react";

const Notification = () => {
  const [formData, setFormData] = useState({
    specialOffers: false,
    recommendations: false,
    chatSafetyTips: false,
    enableNotifications: false,
  });

  const handleToggle = (key) => {
    setFormData((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Notification</h1>

      {/* Special communications & offers */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-lg font-medium">Special communications & offers</h3>
          <button
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              formData.specialOffers ? "bg-[#3570BC]" : "bg-zinc-700"
            }`}
            onClick={() => handleToggle("specialOffers")}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.specialOffers ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        <p className="text-zinc-400">Receive updates, offers and more</p>
      </div>

      <div className="border-t border-[#393939] my-6"></div>

      {/* Recommendations */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-lg font-medium">Recommendations</h3>
          <button
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              formData.recommendations ? "bg-[#3570BC]" : "bg-zinc-700"
            }`}
            onClick={() => handleToggle("recommendations")}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.recommendations ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        <p className="text-zinc-400">
          Receive recommendations based on your activity
        </p>
      </div>

      <div className="border-t border-[#393939] my-6"></div>

      {/* Chat safety Tips */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-lg font-medium">Chat safety Tips</h3>
          <button
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              formData.chatSafetyTips ? "bg-[#3570BC]" : "bg-zinc-700"
            }`}
            onClick={() => handleToggle("chatSafetyTips")}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.chatSafetyTips ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        <p className="text-zinc-400">
          Receive safety tips based on your chat activity
        </p>
      </div>

      <div className="border-t border-[#393939] my-6"></div>

      {/* Enable Notifications */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-lg font-medium">Enable Notifications</h3>
          <button
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              formData.enableNotifications ? "bg-[#3570BC]" : "bg-zinc-700"
            }`}
            onClick={() => handleToggle("enableNotifications")}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.enableNotifications ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        <p className="text-zinc-400">
          Enable notifications to receive updates about your account and
          activity
        </p>
      </div>
    </div>
  );
};

export default Notification;
