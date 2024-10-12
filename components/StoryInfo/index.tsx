import { StoryInfoProps } from "@/types";
import Image from "next/image";
import React from "react";



const StoryInfo: React.FC<StoryInfoProps> = ({
  profilePicture,
  userName,
  timeAgo,
}) => {
  return (
    <div className="story-info">
      <Image
        width={32}
        height={32}
        src={profilePicture}
        alt={`${userName}'s profile`}
        className="profile-picture"
      />

      <div className="user-info">
        <div className="user-name">{userName}</div>
        <div className="time-ago">{timeAgo}</div>
      </div>
    </div>
  );
};

export default StoryInfo;
