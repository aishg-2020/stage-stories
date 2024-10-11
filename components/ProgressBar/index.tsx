import React from "react";

type ProgressBarProps = {
  progress: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div
      className="progress-bar"
      style={{
        transition: progress == 0 ? "none" : "width 0.1s ease",
        width: `${progress}%`,
      }}
    ></div>
  );
};

export default ProgressBar;
