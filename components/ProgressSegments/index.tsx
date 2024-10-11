import { ProgressBarProps } from "@/types";
import React from "react";
import ProgressBar from "../ProgressBar";

type ProgressSegmentsProps = {
  segments: ProgressBarProps[];
};

const ProgressBarSegments: React.FC<ProgressSegmentsProps> = ({ segments }) => {
  return (
    <div className="progress-bar-segments">
      {segments.map((single, i) => (
        <div
          className="progress-segment-wrapper"
          key={`progress-wrapper-${single.id}`}
          style={{ width: `${100 / segments.length}%` }}
        >
          <ProgressBar progress={single.progress} />
        </div>
      ))}
    </div>
  );
};

export default ProgressBarSegments;
