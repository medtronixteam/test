import { metricOptions } from "@/app/(dashboard)/dashboard/campaigns/[ad-name]/page";
import { CustomSwitch } from "@/components/ui/custom-switch";
import React, { useEffect, useRef, useState } from "react";

const ChooseMetricsModel = ({ setIsOpen, onSave, selectedMetrics }) => {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const initializedMetrics = metricOptions.map((opt) => ({
      id: opt.id,
      name: opt.title,
      description: "Voluptate velit esse cillum dolore eu fugiat",
      enabled: selectedMetrics.includes(opt.id),
    }));
    setMetrics(initializedMetrics);
  }, [selectedMetrics]);

  const modalRef = useRef();
  const handleSave = () => {
    if (onSave) {
      const selectedMetricIds = metrics
        .filter((m) => m.enabled)
        .map((m) => m.id);
      onSave(selectedMetricIds);
    }
    setIsOpen(false);
  };

  const handleToggleMetric = (id) => {
    setMetrics(
      metrics.map((metric) =>
        metric.id === id ? { ...metric, enabled: !metric.enabled } : metric
      )
    );
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!modalRef.current) return;

      if (!modalRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside, true);
  }, [setIsOpen]);

  return (
    <div>
      <div className="fixed inset-0 backdrop-blur-[12px] bg-[#17171780] flex items-center justify-center z-50">
        <div
          ref={modalRef}
          className=" p-6 w-full max-w-4xl max-h-[585px] overflow-auto  bg-[#FFFFFF0A] backdrop-blur-[120.57px] border border-[#FFFFFF30] rounded-[20px]"
        >
          <h1 className="text-white text-2xl md:text-3xl font-semibold text-center mb-6">
            Choose which metrics to show
          </h1>
          <p className="text-white mb-3 text-center">Available Metrics</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {metrics.map((metric) => (
              <div
                key={metric.id}
                className="bg-[#FFFFFF05] rounded-lg p-4 border border-[#FFFFFF30] min-w-[275px] min-h-[100px]"
              >
                <div className="flex justify-between  items-start">
                  <div className="w-3/5">
                    <h3 className="text-white font-medium">{metric.name}</h3>
                    <p className="text-white/60 text-sm mt-1">
                      {metric.description}
                    </p>
                  </div>
                  <CustomSwitch
                    checked={metric.enabled}
                    onCheckedChange={() => handleToggleMetric(metric.id)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 flex justify-center gap-3">
            <button
              onClick={() => setIsOpen(false)}
              className="min-w-[160px] px-4 py-4 border border-[#FFFFFF30] bg-transparent text-white rounded-[138px] font-medium cursor-pointer "
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="min-w-[160px] px-4 py-4 bg-[#3570BC] font-medium text-white rounded-[138px] cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseMetricsModel;
