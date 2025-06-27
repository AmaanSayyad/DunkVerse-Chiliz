import React, { useState, useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

import StoryReactions from './StoryReactions';

const StoryBar = ({ stories }) => {
  const [activeStory, setActiveStory] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const progressInterval = useRef(null);
  const storyTimeout = useRef(null);

  const handleStoryClick = (story) => {
    setActiveStory(story);
    setCurrentSlideIndex(0);
    setIsPlaying(true);
    startProgress();
  };

  const startProgress = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    
    progressInterval.current = setInterval(() => {
      setCurrentSlideIndex(prev => {
        if (prev >= activeStory.slides.length - 1) {
          // Story completed, move to next story or close
          if (activeStory.id < stories.length) {
            const nextStory = stories.find(s => s.id === activeStory.id + 1);
            if (nextStory) {
              setActiveStory(nextStory);
              return 0;
            }
          }
          closeStory();
          return 0;
        }
        return prev + 1;
      });
    }, 3000); // 3 seconds per slide
  };

  const pauseStory = () => {
    setIsPlaying(false);
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
  };

  const resumeStory = () => {
    setIsPlaying(true);
    startProgress();
  };

  const closeStory = () => {
    setActiveStory(null);
    setCurrentSlideIndex(0);
    setIsPlaying(false);
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    if (storyTimeout.current) {
      clearTimeout(storyTimeout.current);
    }
  };

  const goToNextSlide = () => {
    if (currentSlideIndex < activeStory.slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } else {
      // Move to next story
      const currentIndex = stories.findIndex(s => s.id === activeStory.id);
      if (currentIndex < stories.length - 1) {
        setActiveStory(stories[currentIndex + 1]);
        setCurrentSlideIndex(0);
      } else {
        closeStory();
      }
    }
  };

  const goToPreviousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    } else {
      // Move to previous story
      const currentIndex = stories.findIndex(s => s.id === activeStory.id);
      if (currentIndex > 0) {
        setActiveStory(stories[currentIndex - 1]);
        setCurrentSlideIndex(stories[currentIndex - 1].slides.length - 1);
      }
    }
  };

  const handleSlideClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    if (x < width / 3) {
      goToPreviousSlide();
    } else if (x > (width * 2) / 3) {
      goToNextSlide();
    } else {
      // Center click - pause/resume
      if (isPlaying) {
        pauseStory();
      } else {
        resumeStory();
      }
    }
  };

  // Story interaction handlers
  const handleLike = (storyId, slideId) => {
    console.log(`Liked story ${storyId}, slide ${slideId}`);
    // Here you would typically make an API call to save the like
  };

  const handleComment = (storyId, slideId, comment) => {
    console.log(`Commented on story ${storyId}, slide ${slideId}: ${comment}`);
    // Here you would typically make an API call to save the comment
  };

  const handleShare = (storyId, slideId) => {
    console.log(`Shared story ${storyId}, slide ${slideId}`);
    // Here you would typically make an API call to track the share
  };

  const handleSave = (storyId, slideId) => {
    console.log(`Saved story ${storyId}, slide ${slideId}`);
    // Here you would typically make an API call to save the story
  };

  useEffect(() => {
    if (activeStory) {
      startProgress();
    }
    
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [activeStory]);

  useEffect(() => {
    if (activeStory) {
      startProgress();
    }
  }, [currentSlideIndex]);

  return (
    <div>
      {/* Enhanced Story Bar */}
      <div className="flex overflow-x-auto gap-3 p-2 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {stories.map((story, index) => (
          <div
            key={story.id}
            className="flex flex-col items-center cursor-pointer min-w-[70px] group"
            onClick={() => handleStoryClick(story)}
          >
            {/* Enhanced Story Avatar with Ring */}
            <div className="relative">
              <div
                className={`w-16 h-16 rounded-full p-0.5 transition-all duration-300 group-hover:scale-110 ${
                  story.isActive 
                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 shadow-lg shadow-purple-500/30' 
                    : 'bg-gradient-to-r from-gray-600 to-gray-500'
                }`}
              >
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src={story.avatar || story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
              
              {/* Active Indicator */}
              {story.isActive && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-dark animate-pulse">
                  <div className="w-full h-full bg-green-400 rounded-full animate-ping"></div>
                </div>
              )}
              
              {/* Story Count Badge */}
              {story.slides && story.slides.length > 1 && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-dark flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{story.slides.length}</span>
                </div>
              )}
            </div>
            
            {/* Enhanced Story Title */}
            <div className="mt-2 text-center">
              <span className="text-xs text-white font-medium truncate block w-16 transition-colors">
                {story.title}
              </span>
            </div>
            
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Enhanced Story Modal */}
      {activeStory && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center animate-in fade-in duration-300">
          {/* Enhanced Progress Bar */}
          <div className="absolute top-4 left-4 right-4 z-10">
            <div className="flex gap-1">
              {activeStory.slides.map((_, index) => (
                <div key={index} className="flex-1 bg-gray-600/50 backdrop-blur-sm rounded-full h-1.5">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ease-out ${
                      index < currentSlideIndex 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                        : index === currentSlideIndex && isPlaying
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse'
                        : 'bg-gray-400'
                    }`}
                    style={{
                      width: index < currentSlideIndex 
                        ? '100%' 
                        : index === currentSlideIndex && isPlaying
                        ? '100%'
                        : '0%'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Header with User Info */}
          <div className="absolute top-8 left-4 right-4 z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-purple-500/50">
                <img
                  src={activeStory.avatar || activeStory.image}
                  alt={activeStory.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-white font-bold text-base">{activeStory.title}</div>
                <div className="text-gray-300 text-sm flex items-center gap-2">
                  <span>{activeStory.slides?.[currentSlideIndex]?.timestamp || '2 hours ago'}</span>
                  <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                  <span>{currentSlideIndex + 1} of {activeStory.slides?.length || 1}</span>
                </div>
              </div>
            </div>
            <button
              onClick={closeStory}
              className="text-white p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
            >
              <IoClose size={24} />
            </button>
          </div>

          {/* Enhanced Story Content */}
          <div 
            className="w-full h-full flex items-center justify-center"
            onClick={handleSlideClick}
          >
            <div className="relative max-w-lg max-h-[85vh] mx-4">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={activeStory.slides?.[currentSlideIndex]?.image || activeStory.image}
                  alt={activeStory.title}
                  className="max-w-full max-h-full object-contain"
                />
                
                {/* Enhanced Story Caption */}
                {activeStory.slides?.[currentSlideIndex]?.caption && (
                  <div className="absolute bottom-20 left-4 right-4 text-white text-sm bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10">
                    <p className="leading-relaxed">{activeStory.slides[currentSlideIndex].caption}</p>
                  </div>
                )}

                {/* Enhanced Navigation Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPreviousSlide();
                  }}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white p-3 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110"
                >
                  <IoChevronBack size={28} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNextSlide();
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white p-3 hover:bg-white/20 rounded-full transition-all duration-200 hover:scale-110"
                >
                  <IoChevronForward size={28} />
                </button>
              </div>
            </div>
          </div>

          {/* Story Reactions */}
          <StoryReactions
            storyId={activeStory.id}
            slideId={activeStory.slides?.[currentSlideIndex]?.id || 1}
            onLike={handleLike}
            onComment={handleComment}
            onShare={handleShare}
            onSave={handleSave}
            initialLikes={Math.floor(Math.random() * 100) + 10}
            initialComments={Math.floor(Math.random() * 20) + 2}
          />

          {/* Enhanced Pause/Play Indicator */}
          {!isPlaying && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl animate-pulse">
              ⏸️
            </div>
          )}

          {/* Slide Counter */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
            {currentSlideIndex + 1} / {activeStory.slides?.length || 1}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryBar;
