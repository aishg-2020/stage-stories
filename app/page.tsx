"use client";
import { usersWithStories } from "../data";
import StoryViewer from "../components/StoryViewer";
import { useState } from "react";
import Image from "next/image";
import { UserWithStories } from "@/types";

export default function Home() {
  const [currentUserIndex, setCurrentUserIndex] = useState<number | null>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);

  const startStoryForUser = (userIndex: number) => {
    setCurrentUserIndex(userIndex);
    setCurrentStoryIndex(0);
  };

  const moveToNextUser = () => {
    if (
      currentUserIndex !== null &&
      currentUserIndex < usersWithStories.length - 1
    ) {
      setCurrentUserIndex(currentUserIndex + 1);
      setCurrentStoryIndex(0);
    } else {
      setCurrentUserIndex(null);
    }
  };
  const moveToPreviousUser = () => {
    if (currentUserIndex !== null && currentUserIndex > 0) {
      setCurrentUserIndex(currentUserIndex - 1);
      setCurrentStoryIndex(0);
    } else {
      setCurrentUserIndex(null);
    }
  };

  return (
    <div className="container">
      <div className="page-title">Stage Stories</div>
      <div className="users-list">
        {usersWithStories.map((user: UserWithStories, index: number) => (
          <div key={user.username} className="user-thumbnail">
            <div className="thumbnail-wrapper">
              <Image
                src={user.profilePicture}
                width={60}
                height={60}
                alt={user.displayName}
                onClick={() => startStoryForUser(index)}
              />
            </div>
            <p className="username">{user.username}</p>
          </div>
        ))}
      </div>

      {currentUserIndex !== null && (
        <StoryViewer
          key={usersWithStories[currentUserIndex].username}
          stories={usersWithStories[currentUserIndex].stories}
          currentStory={currentStoryIndex}
          setCurrentStory={setCurrentStoryIndex}
          userDisplayName={usersWithStories[currentUserIndex].displayName}
          userProfilePicture={usersWithStories[currentUserIndex].profilePicture}
          setCurrentUserIndex={setCurrentUserIndex}
          moveToNextUser={moveToNextUser}
          moveToPreviousUser={moveToPreviousUser}
        />
      )}
    </div>
  );
}
