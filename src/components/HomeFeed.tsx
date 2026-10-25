import React from 'react';
import { Sparkles, SlidersHorizontal, Settings as SettingsIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VideoCard } from './VideoCard';

export const HomeFeed: React.FC = () => {
  const {
    videos,
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    setCurrentView,
    setSettingsTab,
  } = useApp();

  const categories = [
    'All',
    'Rao Video',
    'Science & Technology',
    'Technology',
    'Education',
    'Travel & Nature',
    'Gaming',
  ];

  const filteredVideos = videos.filter((video) => {
    const matchesCategory =
      categoryFilter === 'All'
        ? true
        : categoryFilter === 'Rao Video'
        ? video.channelName.toLowerCase().includes('rao')
        : video.category === categoryFilter;

    const matchesSearch = searchQuery
      ? video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.channelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      : true;

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 py-4 space-y-6 select-none">
      {/* Category Pills (YouTube styled interactive filter bar) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              categoryFilter === cat
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            }`}
          >
            {cat}
          </button>
        ))}

        <div className="h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700 shrink-0 mx-1" />

        <button
          onClick={() => {
            setCurrentView('settings');
            setSettingsTab('playback');
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 transition-colors"
        >
          <SettingsIcon className="w-3.5 h-3.5" />
          <span>Player Settings</span>
        </button>
      </div>

      {/* Quick Spotlight Banner for YouSun Settings Hub */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-600/10 via-neutral-100 to-transparent dark:from-red-950/40 dark:via-[#1e1e1e] dark:to-transparent border border-red-200/40 dark:border-red-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-red-600 text-white font-bold px-2 py-0.5 rounded">
              YouSun Settings
            </span>
            <span className="font-semibold text-sm text-neutral-900 dark:text-white">
              Identical YouTube Settings Experience Active
            </span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-2xl">
            Ambient mode, AV1 codec preference, offline downloads storage gauge, custom caption styling, notifications, and Rao Video creator studio defaults are fully configurable.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('settings')}
          className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow transition-colors shrink-0"
        >
          Open YouSun Settings
        </button>
      </div>

      {/* Main Video Cards Grid */}
      {filteredVideos.length === 0 ? (
        <div className="py-20 text-center text-neutral-500">
          <p className="text-sm font-medium">No videos found matching your search</p>
          <button
            onClick={() => setCategoryFilter('All')}
            className="mt-3 px-4 py-1.5 text-xs text-red-600 font-semibold border border-red-200 dark:border-red-800 rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-7">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};
