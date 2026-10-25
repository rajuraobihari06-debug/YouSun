import React, { useState } from 'react';
import { CheckCircle2, Clock, Download, MoreVertical, Share2, ThumbsUp } from 'lucide-react';
import { Video } from '../types';
import { useApp } from '../context/AppContext';

interface VideoCardProps {
  video: Video;
  layout?: 'grid' | 'horizontal';
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, layout = 'grid' }) => {
  const {
    setSelectedVideo,
    setCurrentView,
    toggleWatchLater,
    watchLaterIds,
    downloadVideo,
    downloadedVideoIds,
    showToast,
  } = useApp();

  const [menuOpen, setMenuOpen] = useState(false);
  const isWatchLater = watchLaterIds.includes(video.id);
  const isDownloaded = downloadedVideoIds.includes(video.id);

  const handleCardClick = () => {
    setSelectedVideo(video);
    setCurrentView('watch');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (layout === 'horizontal') {
    return (
      <div className="flex gap-3 group cursor-pointer select-none" onClick={handleCardClick}>
        <div className="relative w-40 sm:w-48 aspect-video rounded-xl overflow-hidden bg-neutral-900 shrink-0">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 text-[10px] font-mono font-medium bg-black/80 text-white rounded">
            {video.duration}
          </span>
        </div>

        <div className="flex-1 min-w-0 py-0.5">
          <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white line-clamp-2 leading-snug group-hover:text-red-600 dark:group-hover:text-red-400">
            {video.title}
          </h4>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 truncate">
            {video.channelName}
          </p>
          <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
            {video.views} · {video.timestamp}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col group cursor-pointer select-none">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-neutral-900" onClick={handleCardClick}>
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Duration badge */}
        <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 text-[11px] font-mono font-medium bg-black/85 text-white rounded">
          {video.duration}
        </span>

        {/* Hover Quick Overlay Buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWatchLater(video.id);
            }}
            title={isWatchLater ? 'Remove from Watch Later' : 'Watch Later'}
            className={`p-1.5 rounded-md backdrop-blur-md transition-colors ${
              isWatchLater ? 'bg-red-600 text-white' : 'bg-black/60 text-white hover:bg-black/80'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              downloadVideo(video.id);
            }}
            title={isDownloaded ? 'Downloaded' : 'Download Video'}
            className={`p-1.5 rounded-md backdrop-blur-md transition-colors ${
              isDownloaded ? 'bg-red-600 text-white' : 'bg-black/60 text-white hover:bg-black/80'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Metadata */}
      <div className="flex gap-3 mt-3">
        {/* Channel Avatar */}
        <div className="shrink-0">
          <img
            src={video.channelAvatarUrl}
            alt={video.channelName}
            referrerPolicy="no-referrer"
            className="w-9 h-9 rounded-full object-cover"
          />
        </div>

        {/* Title & Channel details */}
        <div className="flex-1 min-w-0" onClick={handleCardClick}>
          <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-2 leading-tight group-hover:text-red-600 dark:group-hover:text-red-400">
            {video.title}
          </h3>

          <div className="flex items-center gap-1 mt-1 text-xs text-neutral-600 dark:text-neutral-400">
            <span className="truncate hover:text-neutral-900 dark:hover:text-white">
              {video.channelName}
            </span>
            {video.verified && (
              <CheckCircle2 className="w-3 h-3 text-neutral-400 shrink-0 fill-current" />
            )}
          </div>

          <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-0.5">
            <span>{video.views}</span>
            <span className="mx-1">·</span>
            <span>{video.timestamp}</span>
          </p>
        </div>

        {/* Three dots menu */}
        <div className="relative shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="p-1 rounded-full text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 top-6 w-44 rounded-xl bg-white dark:bg-[#282828] shadow-xl border border-neutral-200 dark:border-neutral-700 py-1.5 z-30 text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  toggleWatchLater(video.id);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{isWatchLater ? 'Remove from Watch Later' : 'Save to Watch Later'}</span>
              </button>
              <button
                onClick={() => {
                  downloadVideo(video.id);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download video</span>
              </button>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  showToast('Video link copied to clipboard', 'info');
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share link</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
