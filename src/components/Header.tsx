import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Mic,
  Video as VideoIcon,
  Bell,
  Settings,
  Moon,
  Sun,
  Shield,
  HelpCircle,
  LogOut,
  X,
  Check,
  Radio,
  ExternalLink,
  Laptop
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const {
    toggleSidebar,
    searchQuery,
    setSearchQuery,
    setCurrentView,
    setSettingsTab,
    darkMode,
    toggleDarkMode,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    setIsUploadModalOpen,
    showToast,
  } = useApp();

  const [showSearchClear, setShowSearchClear] = useState(false);
  const [isMicListening, setIsMicListening] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifMenu(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleVoiceSearch = () => {
    setIsMicListening(true);
    showToast('Listening for voice search...', 'info');
    setTimeout(() => {
      setIsMicListening(false);
      setSearchQuery('Rao Video 4K');
      setCurrentView('home');
      showToast('Search query recognized: "Rao Video 4K"', 'success');
    }, 1800);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentView('home');
      showToast(`Searching for "${searchQuery}"`, 'info');
    }
  };

  return (
    <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between px-4 bg-white dark:bg-[#0f0f0f] border-b border-neutral-200 dark:border-neutral-800 transition-colors select-none">
      {/* Zone 1: Left - Menu & YouSun Brand */}
      <div className="flex items-center gap-4 shrink-0">
        <button
          onClick={toggleSidebar}
          aria-label="Toggle navigation menu"
          className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* YouSun Logo (YouTube-identical design with YouSun name) */}
        <button
          onClick={() => {
            setCurrentView('home');
            setSearchQuery('');
          }}
          className="flex items-center gap-1.5 focus:outline-none group text-left"
          title="YouSun Home"
        >
          <div className="relative flex items-center justify-center w-7 h-5 bg-[#FF0000] rounded-[6px] shadow-sm group-hover:scale-105 transition-transform">
            {/* White play triangle */}
            <div className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[7px] border-l-white ml-0.5" />
          </div>
          <div className="flex items-start">
            <span className="font-bold text-lg tracking-tighter text-neutral-900 dark:text-white font-sans">
              YouSun
            </span>
            <span className="text-[10px] text-neutral-400 font-medium ml-0.5 -mt-0.5">
              PK
            </span>
          </div>
        </button>
      </div>

      {/* Zone 2: Middle - Search bar with voice search */}
      <div className="hidden sm:flex items-center justify-center max-w-xl w-full mx-4">
        <form onSubmit={handleSearchSubmit} className="flex items-center w-full max-w-lg">
          <div className="relative flex items-center w-full rounded-l-full border border-neutral-300 dark:border-neutral-700 bg-transparent focus-within:border-blue-500 pl-4 pr-2 py-1.5 dark:bg-[#121212]">
            <input
              type="text"
              placeholder="Search Rao Video, Tech, Settings..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchClear(!!e.target.value);
              }}
              className="w-full bg-transparent text-sm text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none"
            />
            {showSearchClear && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setShowSearchClear(false);
                }}
                className="p-1 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            title="Search"
            className="flex items-center justify-center px-5 py-2 rounded-r-full border-y border-r border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

        <button
          onClick={handleVoiceSearch}
          title="Search with your voice"
          className={`ml-3 p-2 rounded-full transition-all ${
            isMicListening
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200'
          }`}
        >
          <Mic className="w-4 h-4" />
        </button>
      </div>

      {/* Zone 3: Right - Actions & Profile */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        {/* Create button */}
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition-colors"
          title="Upload or create video"
        >
          <VideoIcon className="w-4 h-4 text-red-500" />
          <span className="hidden md:inline">Create</span>
        </button>

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            aria-label="Notifications"
            className="relative p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center min-w-[16px] h-4 px-1 text-[10px] font-bold text-white bg-red-600 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifMenu && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-white dark:bg-[#212121] shadow-2xl border border-neutral-200 dark:border-neutral-700 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
                <span className="font-semibold text-sm text-neutral-900 dark:text-white">
                  Notifications
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Mark all as read
                  </button>
                  <button
                    onClick={() => {
                      setCurrentView('settings');
                      setSettingsTab('notifications');
                      setShowNotifMenu(false);
                    }}
                    title="Notification settings"
                    className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full text-neutral-500"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800">
                {notifications.map(notif => (
                  <div
                    key={notif.id}
                    onClick={() => markNotificationRead(notif.id)}
                    className={`flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors ${
                      !notif.read ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''
                    }`}
                  >
                    {!notif.read && (
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-1">
                        {notif.title}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-0.5">
                        {notif.message}
                      </p>
                      <span className="text-[11px] text-neutral-400 mt-1 block">
                        {notif.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar & YouTube-style Account Menu */}
        <div className="relative" ref={userRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            aria-label="Account menu"
            className="flex items-center gap-1 p-0.5 rounded-full hover:ring-2 hover:ring-neutral-300 dark:hover:ring-neutral-700 transition-all"
          >
            <img
              src="/src/assets/images/nemesis_rao_avatar_1792923873527.jpg"
              alt="Rao Video Creator"
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover border border-neutral-300 dark:border-neutral-700"
            />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white dark:bg-[#282828] shadow-2xl border border-neutral-200 dark:border-neutral-700 py-3 z-50 text-sm animate-in fade-in zoom-in-95 duration-150">
              {/* Account header */}
              <div className="flex items-center gap-3 px-4 pb-3 border-b border-neutral-200 dark:border-neutral-700">
                <img
                  src="/src/assets/images/nemesis_rao_avatar_1792923873527.jpg"
                  alt="Rao Video"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="font-semibold text-neutral-900 dark:text-white truncate">
                    Rao Video Productions
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                    @raovideo_official
                  </p>
                  <button
                    onClick={() => {
                      setCurrentView('studio');
                      setShowUserMenu(false);
                    }}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-0.5 block"
                  >
                    View your channel
                  </button>
                </div>
              </div>

              {/* Menu items */}
              <div className="py-2 border-b border-neutral-200 dark:border-neutral-700">
                <button
                  onClick={() => {
                    setCurrentView('studio');
                    setShowUserMenu(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-left text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700/60 transition-colors"
                >
                  <Laptop className="w-4 h-4 text-red-500" />
                  <span>YouSun Studio</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentView('settings');
                    setSettingsTab('billing');
                    setShowUserMenu(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-left text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700/60 transition-colors"
                >
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <span>Purchases and memberships</span>
                </button>
              </div>

              {/* Settings and Theme */}
              <div className="py-2 border-b border-neutral-200 dark:border-neutral-700">
                <button
                  onClick={() => {
                    setCurrentView('settings');
                    setShowUserMenu(false);
                  }}
                  className="flex items-center justify-between w-full px-4 py-2 text-left text-neutral-900 dark:text-white font-medium hover:bg-neutral-100 dark:hover:bg-neutral-700/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Settings className="w-4 h-4 text-blue-500" />
                    <span>Settings</span>
                  </div>
                  <span className="text-[11px] bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 font-semibold px-2 py-0.5 rounded-full">
                    Complete Hub
                  </span>
                </button>

                <button
                  onClick={toggleDarkMode}
                  className="flex items-center justify-between w-full px-4 py-2 text-left text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    <span>Appearance: {darkMode ? 'Dark' : 'Light'}</span>
                  </div>
                </button>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    showToast('Switched to Rao Video account', 'info');
                    setShowUserMenu(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-left text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700/60 transition-colors text-xs"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Help & feedback</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
