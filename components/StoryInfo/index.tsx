import React from 'react';

interface StoryInfoProps {
  profilePicture: string;
  userName: string;
  timeAgo: string; 
}

const StoryInfo: React.FC<StoryInfoProps> = ({ profilePicture, userName, timeAgo }) => {
  return (
    <div className="story-info">
    
      <img src={profilePicture} alt={`${userName}'s profile`} className="profile-picture" />
      
      <div className="user-info">
        <div className="user-name">{userName}</div>
        <div className="time-ago">{timeAgo}</div>
      </div>
    </div>
  );
};

export default StoryInfo;
