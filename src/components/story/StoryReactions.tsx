import React, { useState } from 'react';
import { IoHeart, IoHeartOutline, IoChatbubbleOutline, IoShareOutline, IoBookmarkOutline } from 'react-icons/io5';

interface StoryReactionsProps {
  storyId: number;
  slideId: number;
  onLike?: (storyId: number, slideId: number) => void;
  onComment?: (storyId: number, slideId: number, comment: string) => void;
  onShare?: (storyId: number, slideId: number) => void;
  onSave?: (storyId: number, slideId: number) => void;
  initialLikes?: number;
  initialComments?: number;
  isLiked?: boolean;
  isSaved?: boolean;
}

const StoryReactions: React.FC<StoryReactionsProps> = ({
  storyId,
  slideId,
  onLike,
  onComment,
  onShare,
  onSave,
  initialLikes = 0,
  initialComments = 0,
  isLiked = false,
  isSaved = false
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState(initialComments);
  const [liked, setLiked] = useState(isLiked);
  const [saved, setSaved] = useState(isSaved);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
    onLike?.(storyId, slideId);
  };

  const handleComment = () => {
    if (showCommentInput && commentText.trim()) {
      setComments(comments + 1);
      onComment?.(storyId, slideId, commentText);
      setCommentText('');
      setShowCommentInput(false);
    } else {
      setShowCommentInput(!showCommentInput);
    }
  };

  const handleShare = () => {
    onShare?.(storyId, slideId);
    // Show share options
    if (navigator.share) {
      navigator.share({
        title: 'Check out this story!',
        text: 'Amazing basketball content from DunkVerse',
        url: window.location.href
      });
    }
  };

  const handleSave = () => {
    setSaved(!saved);
    onSave?.(storyId, slideId);
  };

  return (
    <div className="absolute bottom-4 left-4 right-4 z-20">
      {/* Reactions Bar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className="flex items-center gap-1 text-white hover:scale-110 transition-transform"
          >
            {liked ? (
              <IoHeart size={24} className="text-red-500 fill-current" />
            ) : (
              <IoHeartOutline size={24} />
            )}
            <span className="text-sm font-semibold">{likes}</span>
          </button>

          <button
            onClick={handleComment}
            className="flex items-center gap-1 text-white hover:scale-110 transition-transform"
          >
            <IoChatbubbleOutline size={24} />
            <span className="text-sm font-semibold">{comments}</span>
          </button>

          <button
            onClick={handleShare}
            className="text-white hover:scale-110 transition-transform"
          >
            <IoShareOutline size={24} />
          </button>
        </div>

        <button
          onClick={handleSave}
          className={`hover:scale-110 transition-transform ${
            saved ? 'text-yellow-400' : 'text-white'
          }`}
        >
          <IoBookmarkOutline size={24} />
        </button>
      </div>

      {/* Comment Input */}
      {showCommentInput && (
        <div className="flex items-center gap-2 bg-black bg-opacity-50 rounded-lg p-3">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 bg-transparent text-white placeholder-gray-300 border-none outline-none"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleComment();
              }
            }}
            autoFocus
          />
          <button
            onClick={handleComment}
            disabled={!commentText.trim()}
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              commentText.trim()
                ? 'bg-blue-500 text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            Post
          </button>
        </div>
      )}

      {/* Quick Reactions */}
      <div className="flex items-center gap-2 mt-2">
        <button
          onClick={() => {
            if (!liked) handleLike();
          }}
          className="text-2xl hover:scale-125 transition-transform"
        >
          👍
        </button>
        <button
          onClick={() => {
            if (!liked) handleLike();
          }}
          className="text-2xl hover:scale-125 transition-transform"
        >
          🔥
        </button>
        <button
          onClick={() => {
            if (!liked) handleLike();
          }}
          className="text-2xl hover:scale-125 transition-transform"
        >
          🏀
        </button>
        <button
          onClick={() => {
            if (!liked) handleLike();
          }}
          className="text-2xl hover:scale-125 transition-transform"
        >
          👑
        </button>
      </div>
    </div>
  );
};

export default StoryReactions; 