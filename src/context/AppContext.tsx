import React, { createContext, useContext, useState, useEffect } from 'react';
import { Video, YouSunSettings, SettingsTabId, NotificationItem } from '../types';
import { INITIAL_SETTINGS, INITIAL_VIDEOS, INITIAL_NOTIFICATIONS } from '../mockData';

interface AppContextType {
  currentView: 'home' | 'watch' | 'settings' | 'studio' | 'library' | 'history' | 'downloads' | 'subscriptions';
  setCurrentView: (view: 'home' | 'watch' | 'settings' | 'studio' | 'library' | 'history' | 'downloads' | 'subscriptions') => void;
  settingsTab: SettingsTabId;
  setSettingsTab: (tab: SettingsTabId) => void;
  selectedVideo: Video;
  setSelectedVideo: (video: Video) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  toggleDarkMode: () => void;
  settings: YouSunSettings;
  updateSetting: <K extends keyof YouSunSettings>(key: K, value: YouSunSettings[K]) => void;
  resetSettings: () => void;
  videos: Video[];
  addVideo: (video: Video) => void;
  likedVideoIds: string[];
  watchLaterIds: string[];
  downloadedVideoIds: string[];
  historyVideoIds: string[];
  subscribedChannelHandles: string[];
  toggleLikeVideo: (id: string) => void;
  toggleSubscribe: (handle: string) => void;
  toggleWatchLater: (id: string) => void;
  downloadVideo: (id: string) => void;
  deleteDownload: (id: string) => void;
  clearAllDownloads: () => void;
  clearWatchHistory: () => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  toast: { message: string; type?: 'info' | 'success' | 'warning' } | null;
  showToast: (message: string, type?: 'info' | 'success' | 'warning') => void;
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<'home' | 'watch' | 'settings' | 'studio' | 'library' | 'history' | 'downloads' | 'subscriptions'>('home');
  const [settingsTab, setSettingsTab] = useState<SettingsTabId>('account');
  const [selectedVideo, setSelectedVideo] = useState<Video>(INITIAL_VIDEOS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type?: 'info' | 'success' | 'warning' } | null>(null);

  // Dark mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('yousun_theme');
    return saved !== null ? saved === 'dark' : true;
  });

  // Settings
  const [settings, setSettings] = useState<YouSunSettings>(() => {
    try {
      const saved = localStorage.getItem('yousun_settings');
      if (saved) {
        return { ...INITIAL_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
    return INITIAL_SETTINGS;
  });

  // Videos
  const [videos, setVideos] = useState<Video[]>(INITIAL_VIDEOS);

  // User interactions
  const [likedVideoIds, setLikedVideoIds] = useState<string[]>(['vid-1']);
  const [watchLaterIds, setWatchLaterIds] = useState<string[]>(['vid-2']);
  const [downloadedVideoIds, setDownloadedVideoIds] = useState<string[]>(['vid-1']);
  const [historyVideoIds, setHistoryVideoIds] = useState<string[]>(['vid-1', 'vid-2', 'vid-3']);
  const [subscribedChannelHandles, setSubscribedChannelHandles] = useState<string[]>(['@raovideo_official', '@raotech_studio']);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  useEffect(() => {
    localStorage.setItem('yousun_theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('yousun_settings', JSON.stringify(settings));
  }, [settings]);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const next = !prev;
      showToast(next ? 'Dark theme enabled' : 'Light theme enabled', 'info');
      return next;
    });
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  const showToast = (message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 3200);
  };

  const updateSetting = <K extends keyof YouSunSettings>(key: K, value: YouSunSettings[K]) => {
    setSettings(prev => {
      const updated = { ...prev, [key]: value };
      return updated;
    });
    showToast(`Saved setting: ${String(key)}`, 'success');
  };

  const resetSettings = () => {
    setSettings(INITIAL_SETTINGS);
    showToast('All YouSun settings reset to default', 'info');
  };

  const addVideo = (video: Video) => {
    setVideos(prev => [video, ...prev]);
    showToast(`Video published: "${video.title}"`, 'success');
  };

  const toggleLikeVideo = (id: string) => {
    setLikedVideoIds(prev => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter(item => item !== id) : [...prev, id];
      showToast(exists ? 'Removed from Liked videos' : 'Added to Liked videos', 'info');
      return next;
    });
  };

  const toggleSubscribe = (handle: string) => {
    setSubscribedChannelHandles(prev => {
      const exists = prev.includes(handle);
      const next = exists ? prev.filter(item => item !== handle) : [...prev, handle];
      showToast(exists ? `Unsubscribed from ${handle}` : `Subscribed to ${handle}!`, exists ? 'info' : 'success');
      return next;
    });
  };

  const toggleWatchLater = (id: string) => {
    setWatchLaterIds(prev => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter(item => item !== id) : [...prev, id];
      showToast(exists ? 'Removed from Watch later' : 'Saved to Watch later', 'info');
      return next;
    });
  };

  const downloadVideo = (id: string) => {
    if (!downloadedVideoIds.includes(id)) {
      setDownloadedVideoIds(prev => [...prev, id]);
      setSettings(prev => ({
        ...prev,
        storageUsedGb: +(prev.storageUsedGb + 1.2).toFixed(1),
      }));
      showToast('Video downloaded for offline playback', 'success');
    } else {
      showToast('Video already downloaded', 'info');
    }
  };

  const deleteDownload = (id: string) => {
    setDownloadedVideoIds(prev => prev.filter(item => item !== id));
    setSettings(prev => ({
      ...prev,
      storageUsedGb: Math.max(0, +(prev.storageUsedGb - 1.2).toFixed(1)),
    }));
    showToast('Download removed', 'info');
  };

  const clearAllDownloads = () => {
    setDownloadedVideoIds([]);
    setSettings(prev => ({ ...prev, storageUsedGb: 0 }));
    showToast('All downloads cleared', 'info');
  };

  const clearWatchHistory = () => {
    setHistoryVideoIds([]);
    showToast('Watch history cleared', 'info');
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        settingsTab,
        setSettingsTab,
        selectedVideo,
        setSelectedVideo,
        searchQuery,
        setSearchQuery,
        categoryFilter,
        setCategoryFilter,
        sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar,
        darkMode,
        setDarkMode,
        toggleDarkMode,
        settings,
        updateSetting,
        resetSettings,
        videos,
        addVideo,
        likedVideoIds,
        watchLaterIds,
        downloadedVideoIds,
        historyVideoIds,
        subscribedChannelHandles,
        toggleLikeVideo,
        toggleSubscribe,
        toggleWatchLater,
        downloadVideo,
        deleteDownload,
        clearAllDownloads,
        clearWatchHistory,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        toast,
        showToast,
        isUploadModalOpen,
        setIsUploadModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
