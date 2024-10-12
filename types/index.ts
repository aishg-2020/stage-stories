export type ProgressBarProps = {
  progress: number;
  id: number;
};
export type Story = {
  id: number;
  imageUrl: string;
};

export type UserWithStories = {
  username: string;
  displayName: string;
  profilePicture: string;
  stories: Story[];
};

export type ImageViewerProps = {
  imageUrl: string;
  prevStory: () => void;
  nextStory: () => void;
  handleMouseDown: () => void;
  handleMouseUp: () => void;
};

export type StoryInfoProps = {
  profilePicture: string;
  userName: string;
  timeAgo: string;
};

export type StoryViewerProps = {
  stories: Story[];
  currentStory: number;
  setCurrentStory: (index: number) => void;
  userDisplayName: string;
  moveToNextUser: () => void;
  moveToPreviousUser: () => void;
  userProfilePicture: string;
  setCurrentUserIndex: (index: number | null) => void;
};
