"use client";

import PlanCards from "@/components/dashboard/plansBilling/PlanCards";
import React from "react";

const SimplePricing = ({ mvp }) => {
  return (
    <div className="py-10 px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
        Simple pricing for <br />
        creators and teams.
      </h2>
      <div>
        <PlanCards landingPage={false} mvp={mvp} />
      </div>
    </div>
  );
};

export default SimplePricing;
