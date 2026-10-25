import React, { useState } from 'react';
import {
  Download,
  History,
  Clock,
  ThumbsUp,
  HardDrive,
  Trash2,
  Play,
  PlaySquare,
  Search,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VideoCard } from './VideoCard';

interface LibraryViewProps {
  mode: 'library' | 'downloads' | 'history' | 'subscriptions';
}

export const LibraryView: React.FC<LibraryViewProps> = ({ mode }) => {
  const {
    videos,
    downloadedVideoIds,
    likedVideoIds,
    watchLaterIds,
    historyVideoIds,
    settings,
    clearAllDownloads,
    clearWatchHistory,
    setCurrentView,
    setSelectedVideo,
  } = useApp();

  const [historySearch, setHistorySearch] = useState('');

  // Filtered lists
  const downloadedVideos = videos.filter(v => downloadedVideoIds.includes(v.id));
  const likedVideos = videos.filter(v => likedVideoIds.includes(v.id));
  const watchLaterVideos = videos.filter(v => watchLaterIds.includes(v.id));
  const historyVideos = videos.filter(v => {
    const isHistory = historyVideoIds.includes(v.id);
    if (!historySearch) return isHistory;
    return isHistory && (v.title.toLowerCase().includes(historySearch.toLowerCase()) || v.channelName.toLowerCase().includes(historySearch.toLowerCase()));
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-20 select-none space-y-6">
      {/* DOWNLOADS MODE */}
      {mode === 'downloads' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-red-600" />
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                  Downloads
                </h2>
                <span className="text-xs bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 font-semibold px-2 py-0.5 rounded">
                  Offline Library
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Videos saved for offline viewing on YouSun in {settings.downloadQuality} quality
              </p>
            </div>

            {downloadedVideos.length > 0 && (
              <button
                onClick={clearAllDownloads}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors border border-red-200 dark:border-red-900/50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All Downloads</span>
              </button>
            )}
          </div>

          {/* Storage bar */}
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-[#1f1f1f] border border-neutral-200 dark:border-neutral-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-900 dark:text-white flex items-center gap-1.5">
                <HardDrive className="w-4 h-4 text-red-500" />
                YouSun Storage
              </span>
              <span className="font-mono text-neutral-500">
                {settings.storageUsedGb} GB used / {settings.storageTotalGb} GB total
              </span>
            </div>
            <div className="w-full h-2.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
              <div
                style={{ width: `${Math.min(100, (settings.storageUsedGb / settings.storageTotalGb) * 100)}%` }}
                className="bg-red-600 h-full rounded-full transition-all duration-300"
              />
            </div>
          </div>

          {downloadedVideos.length === 0 ? (
            <div className="py-16 text-center text-neutral-500 space-y-3">
              <Download className="w-12 h-12 mx-auto text-neutral-300 dark:text-neutral-700" />
              <p className="text-sm font-medium">No videos downloaded yet</p>
              <button
                onClick={() => setCurrentView('home')}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg"
              >
                Explore videos to download
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {downloadedVideos.map((vid) => (
                <VideoCard key={vid.id} video={vid} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* HISTORY MODE */}
      {mode === 'history' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-red-600" />
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                  Watch History
                </h2>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {settings.pauseWatchHistory
                  ? 'History is currently paused in Privacy Settings'
                  : 'Videos you have previously watched on YouSun'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search watch history..."
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1f1f1f] text-neutral-900 dark:text-white"
                />
              </div>

              {historyVideos.length > 0 && (
                <button
                  onClick={clearWatchHistory}
                  className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-900/50"
                >
                  Clear history
                </button>
              )}
            </div>
          </div>

          {historyVideos.length === 0 ? (
            <div className="py-16 text-center text-neutral-500 space-y-3">
              <History className="w-12 h-12 mx-auto text-neutral-300 dark:text-neutral-700" />
              <p className="text-sm font-medium">No watch history found</p>
            </div>
          ) : (
            <div className="space-y-4 max-w-4xl">
              {historyVideos.map((vid) => (
                <VideoCard key={vid.id} video={vid} layout="horizontal" />
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUBSCRIPTIONS MODE */}
      {mode === 'subscriptions' && (
        <div className="space-y-6">
          <div className="pb-4 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <PlaySquare className="w-5 h-5 text-red-600" />
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                Subscriptions
              </h2>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Latest uploads from your subscribed Rao Video channels
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((vid) => (
              <VideoCard key={vid.id} video={vid} />
            ))}
          </div>
        </div>
      )}

      {/* GENERAL LIBRARY MODE */}
      {mode === 'library' && (
        <div className="space-y-8">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-[#1f1f1f] border border-neutral-200 dark:border-neutral-800">
            <img
              src="/src/assets/images/nemesis_rao_avatar_1792923873527.jpg"
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover border-2 border-red-500"
            />
            <div>
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                {settings.channelName}
              </h2>
              <p className="text-xs text-neutral-500">
                {settings.channelHandle} · {settings.email}
              </p>
            </div>
          </div>

          {/* Watch Later Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span>Watch Later ({watchLaterVideos.length})</span>
              </h3>
            </div>
            {watchLaterVideos.length === 0 ? (
              <p className="text-xs text-neutral-500 py-4">No videos saved to watch later.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {watchLaterVideos.map((vid) => (
                  <VideoCard key={vid.id} video={vid} />
                ))}
              </div>
            )}
          </div>

          {/* Liked Videos Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="font-bold text-base text-neutral-900 dark:text-white flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 text-red-500" />
                <span>Liked Videos ({likedVideos.length})</span>
              </h3>
            </div>
            {likedVideos.length === 0 ? (
              <p className="text-xs text-neutral-500 py-4">No liked videos yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {likedVideos.map((vid) => (
                  <VideoCard key={vid.id} video={vid} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
