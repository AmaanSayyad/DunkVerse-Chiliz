import React from 'react';
import { IoEyeOutline, IoHeartOutline, IoChatbubbleOutline, IoShareOutline, IoTrendingUp } from 'react-icons/io5';

interface StoryAnalyticsProps {
  storyId: number;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  reach: number;
  engagementRate: number;
  duration: number; // in seconds
}

const StoryAnalytics: React.FC<StoryAnalyticsProps> = ({
  storyId,
  views,
  likes,
  comments,
  shares,
  reach,
  engagementRate,
  duration
}) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-dark rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold text-lg">Story Analytics</h3>
        <div className="flex items-center gap-1 text-green-400">
          <IoTrendingUp size={16} />
          <span className="text-sm">+{engagementRate.toFixed(1)}%</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center gap-2 text-gray-300 mb-1">
            <IoEyeOutline size={16} />
            <span className="text-xs">Views</span>
          </div>
          <div className="text-white font-bold text-xl">{formatNumber(views)}</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center gap-2 text-gray-300 mb-1">
            <IoHeartOutline size={16} />
            <span className="text-xs">Likes</span>
          </div>
          <div className="text-white font-bold text-xl">{formatNumber(likes)}</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center gap-2 text-gray-300 mb-1">
            <IoChatbubbleOutline size={16} />
            <span className="text-xs">Comments</span>
          </div>
          <div className="text-white font-bold text-xl">{formatNumber(comments)}</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center gap-2 text-gray-300 mb-1">
            <IoShareOutline size={16} />
            <span className="text-xs">Shares</span>
          </div>
          <div className="text-white font-bold text-xl">{formatNumber(shares)}</div>
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm">Reach</span>
          <span className="text-white font-semibold">{formatNumber(reach)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm">Engagement Rate</span>
          <span className="text-green-400 font-semibold">{engagementRate.toFixed(1)}%</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm">Average View Duration</span>
          <span className="text-white font-semibold">{formatDuration(duration)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-300 text-sm">Completion Rate</span>
          <span className="text-white font-semibold">
            {((views / reach) * 100).toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Performance Indicators */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-300">Performance</span>
          <span className={`font-semibold ${
            engagementRate > 5 ? 'text-green-400' : 
            engagementRate > 2 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {engagementRate > 5 ? 'Excellent' : 
             engagementRate > 2 ? 'Good' : 'Needs Improvement'}
          </span>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              engagementRate > 5 ? 'bg-green-500' : 
              engagementRate > 2 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${Math.min(engagementRate * 10, 100)}%` }}
          />
        </div>
      </div>

      {/* Insights */}
      <div className="bg-blue-900 bg-opacity-20 border border-blue-500 rounded-lg p-3">
        <h4 className="text-blue-400 font-semibold text-sm mb-2">💡 Insights</h4>
        <ul className="text-gray-300 text-xs space-y-1">
          {engagementRate > 5 && (
            <li>• Your story is performing exceptionally well!</li>
          )}
          {likes > views * 0.1 && (
            <li>• High like-to-view ratio indicates strong content</li>
          )}
          {comments > likes * 0.2 && (
            <li>• Great engagement with your audience</li>
          )}
          {shares > 0 && (
            <li>• Your content is being shared - viral potential!</li>
          )}
          <li>• Post at peak hours for better reach</li>
        </ul>
      </div>
    </div>
  );
};

export default StoryAnalytics; 