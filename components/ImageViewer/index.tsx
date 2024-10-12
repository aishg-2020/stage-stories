import { ImageViewerProps } from "@/types";
import { useEffect, useState } from "react";



const ImageViewer: React.FC<ImageViewerProps> = ({
  imageUrl,
  prevStory,
  nextStory,
  handleMouseDown,
  handleMouseUp,
}) => {
  const [loading, setLoading] = useState(true);
  const handleContextMenu = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      setLoading(false);
    };

    img.onerror = () => {
      setLoading(false);
    };

    return () => {
      setLoading(true);
    };
  }, [imageUrl]);

  return (
    <div className="story-image-wrapper">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div
          className="story-image"
          style={{ backgroundImage: `url(${imageUrl})` }}
          onContextMenu={handleContextMenu}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
        >
          <div className="story-nav prev" onClick={prevStory}></div>
          <div className="story-nav next" onClick={nextStory}></div>
        </div>
      )}
    </div>
  );
};

export default ImageViewer;
