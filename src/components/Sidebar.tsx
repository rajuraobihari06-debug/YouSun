import React from 'react';
import {
  Home,
  Compass,
  PlaySquare,
  Clock,
  ThumbsUp,
  History,
  Download,
  Settings,
  Library,
  Flame,
  Music2,
  Gamepad2,
  Newspaper,
  Film,
  Sparkles,
  HelpCircle,
  Flag,
  MessageSquareWarning,
  Tv2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    setSettingsTab,
    sidebarCollapsed,
    downloadedVideoIds,
    likedVideoIds,
    watchLaterIds,
  } = useApp();

  const handleNav = (view: any, tab?: any) => {
    setCurrentView(view);
    if (tab) setSettingsTab(tab);
  };

  // Mini sidebar (collapsed mode, like YouTube)
  if (sidebarCollapsed) {
    return (
      <aside className="w-18 shrink-0 flex flex-col items-center py-2 px-1 bg-white dark:bg-[#0f0f0f] border-r border-neutral-200 dark:border-neutral-800 transition-all select-none">
        <button
          onClick={() => handleNav('home')}
          className={`flex flex-col items-center justify-center w-16 py-3 rounded-xl transition-colors ${
            currentView === 'home'
              ? 'text-red-600 dark:text-red-500 font-semibold'
              : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
          title="Home"
        >
          <Home className="w-5 h-5 mb-1" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => handleNav('subscriptions')}
          className={`flex flex-col items-center justify-center w-16 py-3 rounded-xl transition-colors ${
            currentView === 'subscriptions'
              ? 'text-red-600 dark:text-red-500 font-semibold'
              : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
          title="Subscriptions"
        >
          <PlaySquare className="w-5 h-5 mb-1" />
          <span className="text-[10px]">Subscriptions</span>
        </button>

        <button
          onClick={() => handleNav('library')}
          className={`flex flex-col items-center justify-center w-16 py-3 rounded-xl transition-colors ${
            currentView === 'library'
              ? 'text-red-600 dark:text-red-500 font-semibold'
              : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
          title="You"
        >
          <Library className="w-5 h-5 mb-1" />
          <span className="text-[10px]">You</span>
        </button>

        <button
          onClick={() => handleNav('downloads')}
          className={`flex flex-col items-center justify-center w-16 py-3 rounded-xl transition-colors ${
            currentView === 'downloads'
              ? 'text-red-600 dark:text-red-500 font-semibold'
              : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
          title="Downloads"
        >
          <Download className="w-5 h-5 mb-1" />
          <span className="text-[10px]">Downloads</span>
        </button>

        <div className="w-8 h-[1px] bg-neutral-200 dark:bg-neutral-800 my-2" />

        <button
          onClick={() => handleNav('settings')}
          className={`flex flex-col items-center justify-center w-16 py-3 rounded-xl transition-colors ${
            currentView === 'settings'
              ? 'text-red-600 dark:text-red-500 font-semibold bg-red-50 dark:bg-red-950/20'
              : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
          }`}
          title="Settings"
        >
          <Settings className="w-5 h-5 mb-1 text-red-500" />
          <span className="text-[10px]">Settings</span>
        </button>
      </aside>
    );
  }

  // Expanded sidebar (standard YouTube layout)
  return (
    <aside className="w-60 shrink-0 h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto px-3 py-3 bg-white dark:bg-[#0f0f0f] border-r border-neutral-200 dark:border-neutral-800 select-none custom-scrollbar">
      {/* Section 1: Main navigation */}
      <div className="space-y-1 pb-3 border-b border-neutral-200 dark:border-neutral-800">
        <button
          onClick={() => handleNav('home')}
          className={`flex items-center gap-4 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            currentView === 'home'
              ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold'
              : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => handleNav('subscriptions')}
          className={`flex items-center gap-4 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            currentView === 'subscriptions'
              ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold'
              : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
          }`}
        >
          <PlaySquare className="w-5 h-5" />
          <span>Subscriptions</span>
        </button>
      </div>

      {/* Section 2: You / Library */}
      <div className="py-3 border-b border-neutral-200 dark:border-neutral-800 space-y-1">
        <button
          onClick={() => handleNav('library')}
          className="flex items-center justify-between w-full px-3 py-1.5 text-sm font-semibold text-neutral-900 dark:text-white hover:text-red-500"
        >
          <span>You</span>
          <span className="text-xs text-neutral-400">›</span>
        </button>

        <button
          onClick={() => handleNav('history')}
          className={`flex items-center gap-4 w-full px-3 py-2 rounded-lg text-sm transition-colors ${
            currentView === 'history'
              ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium'
              : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
          }`}
        >
          <History className="w-4 h-4 text-neutral-500" />
          <span>History</span>
        </button>

        <button
          onClick={() => handleNav('library')}
          className="flex items-center gap-4 w-full px-3 py-2 rounded-lg text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
        >
          <Clock className="w-4 h-4 text-neutral-500" />
          <span>Watch Later ({watchLaterIds.length})</span>
        </button>

        <button
          onClick={() => handleNav('downloads')}
          className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-colors ${
            currentView === 'downloads'
              ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium'
              : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
          }`}
        >
          <div className="flex items-center gap-4">
            <Download className="w-4 h-4 text-neutral-500" />
            <span>Downloads</span>
          </div>
          {downloadedVideoIds.length > 0 && (
            <span className="text-xs bg-neutral-200 dark:bg-neutral-700 px-1.5 py-0.5 rounded-full font-mono text-neutral-700 dark:text-neutral-300">
              {downloadedVideoIds.length}
            </span>
          )}
        </button>

        <button
          onClick={() => handleNav('library')}
          className="flex items-center gap-4 w-full px-3 py-2 rounded-lg text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
        >
          <ThumbsUp className="w-4 h-4 text-neutral-500" />
          <span>Liked videos ({likedVideoIds.length})</span>
        </button>
      </div>

      {/* Section 3: Subscriptions / Rao Channels */}
      <div className="py-3 border-b border-neutral-200 dark:border-neutral-800">
        <h4 className="px-3 pb-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
          Subscriptions
        </h4>
        <div className="space-y-0.5">
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 w-full px-3 py-1.5 rounded-lg text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors text-left"
          >
            <img
              src="/src/assets/images/nemesis_rao_avatar_1792923873527.jpg"
              alt="Rao Video"
              className="w-5 h-5 rounded-full object-cover shrink-0"
            />
            <span className="truncate">Rao Video Productions</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 ml-auto shrink-0" />
          </button>

          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 w-full px-3 py-1.5 rounded-lg text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors text-left"
          >
            <div className="w-5 h-5 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-bold shrink-0">
              RT
            </div>
            <span className="truncate">Rao Tech Reviews</span>
          </button>

          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 w-full px-3 py-1.5 rounded-lg text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors text-left"
          >
            <div className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] flex items-center justify-center font-bold shrink-0">
              RG
            </div>
            <span className="truncate">Rao Gaming Live</span>
          </button>
        </div>
      </div>

      {/* Section 4: Explore */}
      <div className="py-3 border-b border-neutral-200 dark:border-neutral-800">
        <h4 className="px-3 pb-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
          Explore
        </h4>
        <div className="space-y-0.5">
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-4 w-full px-3 py-2 rounded-lg text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
          >
            <Flame className="w-4 h-4 text-orange-500" />
            <span>Trending</span>
          </button>
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-4 w-full px-3 py-2 rounded-lg text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
          >
            <Music2 className="w-4 h-4 text-pink-500" />
            <span>Music</span>
          </button>
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-4 w-full px-3 py-2 rounded-lg text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
          >
            <Gamepad2 className="w-4 h-4 text-emerald-500" />
            <span>Gaming</span>
          </button>
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-4 w-full px-3 py-2 rounded-lg text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
          >
            <Film className="w-4 h-4 text-red-500" />
            <span>Movies & 4K</span>
          </button>
        </div>
      </div>

      {/* Section 5: More from YouSun (Studio, Kids, Music) */}
      <div className="py-3 border-b border-neutral-200 dark:border-neutral-800">
        <h4 className="px-3 pb-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
          More from YouSun
        </h4>
        <div className="space-y-0.5">
          <button
            onClick={() => handleNav('studio')}
            className={`flex items-center gap-4 w-full px-3 py-2 rounded-lg text-sm transition-colors ${
              currentView === 'studio'
                ? 'bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 font-semibold'
                : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
            }`}
          >
            <Tv2 className="w-4 h-4 text-red-600" />
            <span>YouSun Studio</span>
          </button>
        </div>
      </div>

      {/* Section 6: YouTube-identical Settings & Help */}
      <div className="py-3 border-b border-neutral-200 dark:border-neutral-800">
        <button
          onClick={() => handleNav('settings')}
          className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm transition-colors ${
            currentView === 'settings'
              ? 'bg-red-600 text-white font-semibold shadow-sm'
              : 'text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-medium'
          }`}
        >
          <div className="flex items-center gap-4">
            <Settings className={`w-5 h-5 ${currentView === 'settings' ? 'text-white' : 'text-red-500'}`} />
            <span>Settings</span>
          </div>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
            currentView === 'settings' ? 'bg-white/20 text-white' : 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400'
          }`}>
            Full
          </span>
        </button>

        <button
          onClick={() => handleNav('history')}
          className="flex items-center gap-4 w-full px-3 py-2 rounded-lg text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
        >
          <Flag className="w-4 h-4 text-neutral-500" />
          <span>Report history</span>
        </button>

        <button
          onClick={() => handleNav('settings', 'notifications')}
          className="flex items-center gap-4 w-full px-3 py-2 rounded-lg text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-neutral-500" />
          <span>Help</span>
        </button>
      </div>

      {/* Footer copyright */}
      <div className="px-3 pt-4 pb-8 text-[11px] text-neutral-400 space-y-2">
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          <span>About</span>
          <span>Press</span>
          <span>Copyright</span>
          <span>Creators</span>
          <span>Advertise</span>
          <span>Developers</span>
        </div>
        <p className="text-neutral-500">© 2026 YouSun LLC · Rao Video</p>
      </div>
    </aside>
  );
};
