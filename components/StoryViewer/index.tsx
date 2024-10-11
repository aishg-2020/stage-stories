import { useEffect, useState } from "react";
import ProgressBarSegments from "../ProgressSegments";
import StoryInfo from "../StoryInfo";
import Image from "next/image";

interface Story {
  id: number;
  imageUrl: string;
}

interface StoryViewerProps {
  stories: Story[];
  currentStory: number;
  setCurrentStory: (index: number) => void;
  userDisplayName: string;
  moveToNextUser: () => void;
  moveToPreviousUser: () => void;
  userProfilePicture: string;
  setCurrentUserIndex: (index: number | null) => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({
  stories,
  currentStory,
  setCurrentStory,
  userDisplayName,
  moveToNextUser,
  moveToPreviousUser,
  userProfilePicture,
  setCurrentUserIndex,
}) => {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const totalDuration = 5000;
    const increment = 100 / (totalDuration / 10);

    const intervalId = setInterval(() => {
      if (!isPaused) {
        setProgress((prev) => {
          if (prev < 100) return prev + increment;
          else {
            clearInterval(intervalId);
            return 100;
          }
        });
      }
    }, 10);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentStory, isPaused]);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(nextStory, 100);
    }
  }, [progress]);

  const nextStory = () => {
    if (currentStory < stories.length - 1) {
      setProgress(0);
      setCurrentStory(currentStory + 1);
    } else {
      setProgress(0);
      moveToNextUser();
    }
  };

  const prevStory = () => {
    if (currentStory > 0) {
      setProgress(0);
      setCurrentStory(currentStory - 1);
    } else {
      moveToPreviousUser();
    }
  };

  const handleMouseDown = () => {
    setIsPaused(true);
  };

  const handleMouseUp = () => {
    setIsPaused(false);
  };

  return (
    <div className="story-viewer">
      <ProgressBarSegments
        key={userDisplayName}
        segments={stories.map((single, currentIndex) => {
          return {
            progress:
              currentIndex < currentStory
                ? 100
                : currentIndex === currentStory
                ? progress
                : 0,
            id: single.id,
          };
        })}
      />
      <StoryInfo
        profilePicture={userProfilePicture}
        userName={userDisplayName}
        timeAgo="1h"
      />

      <div
        className="story-image"
        style={{ backgroundImage: `url(${stories[currentStory].imageUrl})` }}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        <div className="story-nav prev" onClick={prevStory}></div>
        <div className="story-nav next" onClick={nextStory}></div>
      </div>

      <Image
        src="/images/cross-icon.png"
        alt="cross-icon"
        width={24}
        height={24}
        className="close-icon"
        onClick={() => {
          setCurrentUserIndex(null);
        }}
      />
    </div>
  );
};

export default StoryViewer;
