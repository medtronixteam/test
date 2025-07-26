"use client";

import { useState } from "react";
import ViralityScoreDragScreen from "./ViralityScoreDragScreen";
import ViralityScoreAnalytics from "./ViralityScoreAnalytics";

const ViralityScore = () => {
  return (
    <>
      <ViralityScoreDragScreen />
      <ViralityScoreAnalytics />
    </>
  );
};

export default ViralityScore;
