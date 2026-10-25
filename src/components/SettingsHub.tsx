import React, { useState } from 'react';
import {
  User,
  Bell,
  Play,
  Download,
  Shield,
  Share2,
  CreditCard,
  Sliders,
  Tv,
  Check,
  Copy,
  Trash2,
  RotateCcw,
  Search,
  ExternalLink,
  Sparkles,
  Info,
  HardDrive,
  Eye,
  SlidersHorizontal,
  MonitorPlay,
  Volume2,
  Subtitles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SettingsTabId } from '../types';

export const SettingsHub: React.FC = () => {
  const {
    settings,
    updateSetting,
    resetSettings,
    settingsTab,
    setSettingsTab,
    clearWatchHistory,
    clearAllDownloads,
    downloadedVideoIds,
    showToast,
    setCurrentView,
  } = useApp();

  const [searchFilter, setSearchFilter] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(label);
    showToast(`Copied ${label} to clipboard`, 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const navItems: { id: SettingsTabId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'playback', label: 'Playback and performance', icon: Play },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'connected', label: 'Connected apps', icon: Share2 },
    { id: 'billing', label: 'Billing and payments', icon: CreditCard },
    { id: 'advanced', label: 'Advanced settings', icon: Sliders },
    { id: 'studio', label: 'YouSun Studio settings', icon: Tv },
  ];

  return (
    <div className="min-w-0 flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-20 select-none">
      {/* Header bar of Settings */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-neutral-200 dark:border-neutral-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-2xl tracking-tight text-neutral-900 dark:text-white">
              Settings
            </span>
            <span className="text-xs bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 font-semibold px-2 py-0.5 rounded">
              YouSun Standard
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Manage your YouSun account, video playback, Rao Video defaults, privacy, and preferences
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Settings Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search settings..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1f1f1f] text-neutral-900 dark:text-white focus:outline-none focus:border-red-500 w-44 sm:w-56"
            />
          </div>

          <button
            onClick={resetSettings}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors shrink-0"
            title="Reset to default settings"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
        {/* Left Settings Sidebar Navigation Tabs */}
        <nav className="md:col-span-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = settingsTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSettingsTab(item.id)}
                className={`flex items-center gap-3 w-full px-3.5 py-2.5 rounded-lg text-sm text-left font-medium transition-all ${
                  isActive
                    ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-red-500' : ''}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Settings Content Panes */}
        <div className="md:col-span-3 bg-white dark:bg-[#1a1a1a] border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 sm:p-7 space-y-8 shadow-sm">
          {/* TAB 1: ACCOUNT */}
          {settingsTab === 'account' && (
            <div className="space-y-7 animate-in fade-in duration-150">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Your Channel
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  This is your public presence on YouSun. You need a channel to upload your own videos, comment on videos, or make playlists.
                </p>

                <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg bg-neutral-50 dark:bg-[#222222] border border-neutral-200 dark:border-neutral-700">
                  <img
                    src="/src/assets/images/nemesis_rao_avatar_1792923873527.jpg"
                    alt="Channel Avatar"
                    className="w-14 h-14 rounded-full object-cover border-2 border-red-500"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-neutral-900 dark:text-white truncate">
                        {settings.channelName}
                      </h4>
                      <span className="text-[11px] bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 px-1.5 py-0.2 rounded font-medium">
                        Verified
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {settings.channelHandle} · 1.28M subscribers · 142 videos
                    </p>
                    <div className="flex flex-wrap gap-3 mt-3 text-xs">
                      <button
                        onClick={() => setCurrentView('studio')}
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                      >
                        Channel status and features
                      </button>
                      <span className="text-neutral-300 dark:text-neutral-700">·</span>
                      <button
                        onClick={() => setSettingsTab('studio')}
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                      >
                        Customize channel
                      </button>
                      <span className="text-neutral-300 dark:text-neutral-700">·</span>
                      <button
                        onClick={() => setSettingsTab('advanced')}
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                      >
                        View advanced settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Your YouSun Account */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Your YouSun Account
                </h3>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-neutral-100 dark:border-neutral-800/80 gap-2">
                    <div>
                      <span className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                        Primary Email Address
                      </span>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Linked with your Google and YouSun sync
                      </p>
                    </div>
                    <span className="text-xs font-mono bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded text-neutral-700 dark:text-neutral-300">
                      {settings.email}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-neutral-100 dark:border-neutral-800/80 gap-2">
                    <div>
                      <span className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                        Channel Name
                      </span>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Displayed on video cards, comments, and recommendations
                      </p>
                    </div>
                    <input
                      type="text"
                      value={settings.channelName}
                      onChange={(e) => updateSetting('channelName', e.target.value)}
                      className="px-3 py-1.5 text-xs rounded border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white focus:border-red-500"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-neutral-100 dark:border-neutral-800/80 gap-2">
                    <div>
                      <span className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                        Handle
                      </span>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Unique identifier on YouSun URLs
                      </p>
                    </div>
                    <input
                      type="text"
                      value={settings.channelHandle}
                      onChange={(e) => updateSetting('channelHandle', e.target.value)}
                      className="px-3 py-1.5 text-xs font-mono rounded border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white focus:border-red-500"
                    />
                  </div>
                </div>
              </div>

              {/* Membership status */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <div className="flex items-start justify-between p-4 rounded-lg bg-gradient-to-r from-red-500/10 via-red-500/5 to-transparent border border-red-500/20">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-red-500" />
                      <span className="font-semibold text-sm text-neutral-900 dark:text-white">
                        YouSun Premium
                      </span>
                      <span className="text-[10px] bg-red-600 text-white font-bold px-2 py-0.5 rounded-full">
                        ACTIVE
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">
                      Ad-free streaming, offline downloads in 1080p, and background playback enabled.
                    </p>
                  </div>
                  <button
                    onClick={() => setSettingsTab('billing')}
                    className="px-3 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 border border-red-300 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors"
                  >
                    Manage
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: NOTIFICATIONS */}
          {settingsTab === 'notifications' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  General Notifications
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Select what notifications you receive about your activity and your subscriptions.
                </p>
              </div>

              <div className="space-y-4">
                <label className="flex items-start justify-between cursor-pointer py-2 border-b border-neutral-100 dark:border-neutral-800/80">
                  <div className="pr-4">
                    <span className="text-sm font-medium text-neutral-900 dark:text-white block">
                      Subscriptions
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      Notify me about activity from the channels I am subscribed to
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifySubscriptions}
                    onChange={(e) => updateSetting('notifySubscriptions', e.target.checked)}
                    className="w-5 h-5 accent-red-600 rounded mt-0.5 cursor-pointer"
                  />
                </label>

                <label className="flex items-start justify-between cursor-pointer py-2 border-b border-neutral-100 dark:border-neutral-800/80">
                  <div className="pr-4">
                    <span className="text-sm font-medium text-neutral-900 dark:text-white block">
                      Recommended videos
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      Notify me of videos I might like based on what I watch on YouSun
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifyRecommended}
                    onChange={(e) => updateSetting('notifyRecommended', e.target.checked)}
                    className="w-5 h-5 accent-red-600 rounded mt-0.5 cursor-pointer"
                  />
                </label>

                <label className="flex items-start justify-between cursor-pointer py-2 border-b border-neutral-100 dark:border-neutral-800/80">
                  <div className="pr-4">
                    <span className="text-sm font-medium text-neutral-900 dark:text-white block">
                      Activity on my channel
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      Notify me about comments, likes, and other activity on my Rao Video productions
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifyChannelActivity}
                    onChange={(e) => updateSetting('notifyChannelActivity', e.target.checked)}
                    className="w-5 h-5 accent-red-600 rounded mt-0.5 cursor-pointer"
                  />
                </label>

                <label className="flex items-start justify-between cursor-pointer py-2 border-b border-neutral-100 dark:border-neutral-800/80">
                  <div className="pr-4">
                    <span className="text-sm font-medium text-neutral-900 dark:text-white block">
                      Replies to my comments
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      Notify me when someone replies to comments I post
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifyReplies}
                    onChange={(e) => updateSetting('notifyReplies', e.target.checked)}
                    className="w-5 h-5 accent-red-600 rounded mt-0.5 cursor-pointer"
                  />
                </label>

                <label className="flex items-start justify-between cursor-pointer py-2 border-b border-neutral-100 dark:border-neutral-800/80">
                  <div className="pr-4">
                    <span className="text-sm font-medium text-neutral-900 dark:text-white block">
                      Mentions
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      Notify me when other channels mention @raovideo_official
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifyMentions}
                    onChange={(e) => updateSetting('notifyMentions', e.target.checked)}
                    className="w-5 h-5 accent-red-600 rounded mt-0.5 cursor-pointer"
                  />
                </label>
              </div>

              {/* Email Notifications */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Email Notifications
                </h3>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-sm font-medium text-neutral-900 dark:text-white block">
                      Digest frequency
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      Receive an email digest of important video highlights
                    </span>
                  </div>
                  <select
                    value={settings.emailDigestCadence}
                    onChange={(e) => updateSetting('emailDigestCadence', e.target.value as any)}
                    className="px-3 py-1.5 text-xs rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#222] text-neutral-900 dark:text-white"
                  >
                    <option value="daily">Daily digest</option>
                    <option value="weekly">Weekly digest</option>
                    <option value="never">Never send digest</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PLAYBACK AND PERFORMANCE */}
          {settingsTab === 'playback' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Playback and Performance
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Control your video player viewing experience, ambient lighting, audio normalization, and codecs.
                </p>
              </div>

              {/* Ambient Mode */}
              <div className="p-4 rounded-lg bg-neutral-50 dark:bg-[#222222] border border-neutral-200 dark:border-neutral-700 flex items-start justify-between">
                <div className="pr-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                      Ambient Mode
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Projects soft colors from the active video into the surrounding player background for immersive viewing.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.ambientMode}
                  onChange={(e) => updateSetting('ambientMode', e.target.checked)}
                  className="w-5 h-5 accent-red-600 rounded cursor-pointer mt-1"
                />
              </div>

              {/* Autoplay & Inline playback */}
              <div className="space-y-4">
                <label className="flex items-start justify-between cursor-pointer py-2 border-b border-neutral-100 dark:border-neutral-800/80">
                  <div className="pr-4">
                    <span className="text-sm font-medium text-neutral-900 dark:text-white block">
                      Autoplay next video
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      When you finish a video, another recommended video starts automatically
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.autoplayNext}
                    onChange={(e) => updateSetting('autoplayNext', e.target.checked)}
                    className="w-5 h-5 accent-red-600 rounded mt-0.5 cursor-pointer"
                  />
                </label>

                <label className="flex items-start justify-between cursor-pointer py-2 border-b border-neutral-100 dark:border-neutral-800/80">
                  <div className="pr-4">
                    <span className="text-sm font-medium text-neutral-900 dark:text-white block">
                      Inline playback (Previews)
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      Play preview snippets as you browse the Home and Subscriptions feeds
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.inlinePlayback}
                    onChange={(e) => updateSetting('inlinePlayback', e.target.checked)}
                    className="w-5 h-5 accent-red-600 rounded mt-0.5 cursor-pointer"
                  />
                </label>

                <label className="flex items-start justify-between cursor-pointer py-2 border-b border-neutral-100 dark:border-neutral-800/80">
                  <div className="pr-4">
                    <span className="text-sm font-medium text-neutral-900 dark:text-white block">
                      Stable Volume
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      Dynamically normalizes volume between quiet dialogue and loud action scenes
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.stableVolume}
                    onChange={(e) => updateSetting('stableVolume', e.target.checked)}
                    className="w-5 h-5 accent-red-600 rounded mt-0.5 cursor-pointer"
                  />
                </label>

                <label className="flex items-start justify-between cursor-pointer py-2 border-b border-neutral-100 dark:border-neutral-800/80">
                  <div className="pr-4">
                    <span className="text-sm font-medium text-neutral-900 dark:text-white block">
                      Show in-video info cards
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      Display creator annotations and interactive cards during playback
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.showAnnotations}
                    onChange={(e) => updateSetting('showAnnotations', e.target.checked)}
                    className="w-5 h-5 accent-red-600 rounded mt-0.5 cursor-pointer"
                  />
                </label>
              </div>

              {/* AV1 Settings */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-2">
                  AV1 Video Codec Settings
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { val: 'auto', label: 'Auto (Recommended)', desc: 'Optimized efficiency based on device' },
                    { val: 'sd', label: 'Prefer AV1 for SD', desc: 'Saves data on standard quality' },
                    { val: 'always', label: 'Always prefer AV1', desc: 'Maximum compression & bitrate quality' },
                  ].map((option) => (
                    <button
                      key={option.val}
                      onClick={() => updateSetting('av1Preference', option.val as any)}
                      className={`p-3 rounded-lg border text-left text-xs transition-colors ${
                        settings.av1Preference === option.val
                          ? 'border-red-600 bg-red-50/50 dark:bg-red-950/20 text-neutral-900 dark:text-white font-medium'
                          : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 text-neutral-600 dark:text-neutral-400'
                      }`}
                    >
                      <p className="font-semibold">{option.label}</p>
                      <p className="text-[11px] text-neutral-500 mt-1">{option.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Captions custom styling */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
                <div className="flex items-center gap-2">
                  <Subtitles className="w-4 h-4 text-blue-500" />
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                    Captions &amp; Subtitles
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-neutral-500 dark:text-neutral-400 block mb-1">
                      Font size
                    </label>
                    <select
                      value={settings.captionFontSize}
                      onChange={(e) => updateSetting('captionFontSize', e.target.value as any)}
                      className="w-full px-3 py-1.5 text-xs rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#222] text-neutral-900 dark:text-white"
                    >
                      <option value="small">Small (75%)</option>
                      <option value="medium">Medium (100%)</option>
                      <option value="large">Large (150%)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-neutral-500 dark:text-neutral-400 block mb-1">
                      Text color
                    </label>
                    <select
                      value={settings.captionColor}
                      onChange={(e) => updateSetting('captionColor', e.target.value as any)}
                      className="w-full px-3 py-1.5 text-xs rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#222] text-neutral-900 dark:text-white"
                    >
                      <option value="white">White</option>
                      <option value="yellow">Yellow</option>
                      <option value="cyan">Cyan</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-neutral-500 dark:text-neutral-400 block mb-1">
                      Background opacity ({settings.captionBgOpacity}%)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="25"
                      value={settings.captionBgOpacity}
                      onChange={(e) => updateSetting('captionBgOpacity', Number(e.target.value))}
                      className="w-full accent-red-600 mt-2"
                    />
                  </div>
                </div>

                {/* Subtitle preview box */}
                <div className="p-3 bg-neutral-900 rounded-lg text-center mt-2">
                  <span
                    style={{
                      color: settings.captionColor === 'yellow' ? '#facc15' : settings.captionColor === 'cyan' ? '#38bdf8' : '#ffffff',
                      fontSize: settings.captionFontSize === 'small' ? '12px' : settings.captionFontSize === 'large' ? '18px' : '14px',
                      backgroundColor: `rgba(0,0,0,${settings.captionBgOpacity / 100})`,
                    }}
                    className="px-2 py-0.5 rounded font-sans"
                  >
                    YouSun Live Caption Preview: "Rao Video entering deep space..."
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DOWNLOADS */}
          {settingsTab === 'downloads' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Downloads &amp; Offline
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Manage video download quality, Wi-Fi restrictions, and device storage allocation.
                </p>
              </div>

              {/* Storage meter */}
              <div className="p-4 rounded-lg bg-neutral-50 dark:bg-[#222222] border border-neutral-200 dark:border-neutral-700 space-y-3">
                <div className="flex items-center justify-between text-xs font-medium">
                  <div className="flex items-center gap-2 text-neutral-900 dark:text-white">
                    <HardDrive className="w-4 h-4 text-red-500" />
                    <span>Device Storage</span>
                  </div>
                  <span className="font-mono text-neutral-500 dark:text-neutral-400">
                    {settings.storageUsedGb} GB used of {settings.storageTotalGb} GB
                  </span>
                </div>

                <div className="w-full h-3 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${(settings.storageUsedGb / settings.storageTotalGb) * 100}%` }}
                    className="bg-red-600 h-full transition-all duration-300"
                    title="YouSun Downloads"
                  />
                  <div
                    style={{ width: '30%' }}
                    className="bg-neutral-400 dark:bg-neutral-600 h-full"
                    title="Other Apps"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" />
                    YouSun downloads ({downloadedVideoIds.length} videos)
                  </span>
                  <span>
                    {(settings.storageTotalGb - settings.storageUsedGb - 38.4).toFixed(1)} GB available
                  </span>
                </div>
              </div>

              {/* Quality & options */}
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-neutral-100 dark:border-neutral-800/80">
                  <div>
                    <span className="text-sm font-medium text-neutral-900 dark:text-white block">
                      Download quality
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      Standard quality for offline videos
                    </span>
                  </div>
                  <select
                    value={settings.downloadQuality}
                    onChange={(e) => updateSetting('downloadQuality', e.target.value as any)}
                    className="px-3 py-1.5 text-xs rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#222] text-neutral-900 dark:text-white"
                  >
                    <option value="ask">Ask each time</option>
                    <option value="1080p">Full HD (1080p)</option>
                    <option value="720p">High (720p)</option>
                    <option value="360p">Standard (360p - data saver)</option>
                  </select>
                </div>

                <label className="flex items-start justify-between cursor-pointer py-2 border-b border-neutral-100 dark:border-neutral-800/80">
                  <div className="pr-4">
                    <span className="text-sm font-medium text-neutral-900 dark:text-white block">
                      Download over Wi-Fi only
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      Prevent cellular data usage when downloading videos
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.downloadWifiOnly}
                    onChange={(e) => updateSetting('downloadWifiOnly', e.target.checked)}
                    className="w-5 h-5 accent-red-600 rounded mt-0.5 cursor-pointer"
                  />
                </label>

                <label className="flex items-start justify-between cursor-pointer py-2 border-b border-neutral-100 dark:border-neutral-800/80">
                  <div className="pr-4">
                    <span className="text-sm font-medium text-neutral-900 dark:text-white block">
                      Smart Downloads
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      Automatically downloads recommended videos when connected to Wi-Fi
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.smartDownloads}
                    onChange={(e) => updateSetting('smartDownloads', e.target.checked)}
                    className="w-5 h-5 accent-red-600 rounded mt-0.5 cursor-pointer"
                  />
                </label>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <button
                  onClick={() => setCurrentView('downloads')}
                  className="px-4 py-2 text-xs font-semibold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                >
                  View downloaded videos
                </button>

                <button
                  onClick={clearAllDownloads}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors border border-red-200 dark:border-red-900/50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete all downloads</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: PRIVACY */}
          {settingsTab === 'privacy' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Privacy Settings
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Manage who can see your saved playlists, subscriptions, and control your YouSun activity history.
                </p>
              </div>

              <div className="space-y-4">
                <label className="flex items-start justify-between cursor-pointer py-2 border-b border-neutral-100 dark:border-neutral-800/80">
                  <div className="pr-4">
                    <span className="text-sm font-medium text-neutral-900 dark:text-white block">
                      Keep all my saved playlists private
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      Playlists created by you will not be publicly visible on your channel
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.privatePlaylists}
                    onChange={(e) => updateSetting('privatePlaylists', e.target.checked)}
                    className="w-5 h-5 accent-red-600 rounded mt-0.5 cursor-pointer"
                  />
                </label>

                <label className="flex items-start justify-between cursor-pointer py-2 border-b border-neutral-100 dark:border-neutral-800/80">
                  <div className="pr-4">
                    <span className="text-sm font-medium text-neutral-900 dark:text-white block">
                      Keep all my subscriptions private
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      Your subscriptions will not be shown to other users on your profile
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.privateSubscriptions}
                    onChange={(e) => updateSetting('privateSubscriptions', e.target.checked)}
                    className="w-5 h-5 accent-red-600 rounded mt-0.5 cursor-pointer"
                  />
                </label>

                <label className="flex items-start justify-between cursor-pointer py-2 border-b border-neutral-100 dark:border-neutral-800/80">
                  <div className="pr-4">
                    <span className="text-sm font-medium text-neutral-900 dark:text-white block">
                      Pause watch history
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      While paused, newly watched videos won't be saved to your YouSun history
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.pauseWatchHistory}
                    onChange={(e) => updateSetting('pauseWatchHistory', e.target.checked)}
                    className="w-5 h-5 accent-red-600 rounded mt-0.5 cursor-pointer"
                  />
                </label>

                <label className="flex items-start justify-between cursor-pointer py-2 border-b border-neutral-100 dark:border-neutral-800/80">
                  <div className="pr-4">
                    <span className="text-sm font-medium text-neutral-900 dark:text-white block">
                      Pause search history
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      Searches you make won't appear in future search suggestions
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.pauseSearchHistory}
                    onChange={(e) => updateSetting('pauseSearchHistory', e.target.checked)}
                    className="w-5 h-5 accent-red-600 rounded mt-0.5 cursor-pointer"
                  />
                </label>
              </div>

              {/* History deletion */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap gap-3">
                <button
                  onClick={clearWatchHistory}
                  className="px-4 py-2 text-xs font-semibold text-red-600 border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                >
                  Clear all watch history
                </button>
                <button
                  onClick={() => showToast('Search history cleared', 'info')}
                  className="px-4 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  Clear search history
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: CONNECTED APPS */}
          {settingsTab === 'connected' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Connected Apps &amp; Services
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Link your gaming and community accounts to unlock stream drops, game rewards, and discord integration.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { key: 'connectedSteam', name: 'Steam Account', desc: 'Sync game activity and claim stream in-game loot', state: settings.connectedSteam },
                  { key: 'connectedDiscord', name: 'Discord Rich Presence', desc: 'Display what video you are streaming on YouSun', state: settings.connectedDiscord },
                  { key: 'connectedTwitch', name: 'Twitch Sync', desc: 'Simulcast chat streams to Rao Video productions', state: settings.connectedTwitch },
                  { key: 'connectedDrive', name: 'Google Drive & Backup', desc: 'Auto-export video recordings and raw project assets', state: settings.connectedDrive },
                ].map((app) => (
                  <div
                    key={app.key}
                    className="flex items-center justify-between p-4 rounded-lg bg-neutral-50 dark:bg-[#222222] border border-neutral-200 dark:border-neutral-700"
                  >
                    <div>
                      <span className="font-semibold text-sm text-neutral-900 dark:text-white block">
                        {app.name}
                      </span>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        {app.desc}
                      </span>
                    </div>

                    <button
                      onClick={() => updateSetting(app.key as any, !app.state)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                        app.state
                          ? 'bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      {app.state ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: BILLING AND PAYMENTS */}
          {settingsTab === 'billing' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Billing &amp; Payments
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Manage memberships, Super Chat purchase methods, and creator tipping.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-neutral-50 dark:bg-[#222222] border border-neutral-200 dark:border-neutral-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-sm text-neutral-900 dark:text-white block">
                      Active Subscription: YouSun Premium
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      $11.99/month · Auto-renews on November 25, 2026
                    </span>
                  </div>
                  <span className="text-xs bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-neutral-100 dark:border-neutral-800/80">
                  <div>
                    <span className="text-sm font-medium text-neutral-900 dark:text-white block">
                      Default Payment Method
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                      {settings.defaultPayment}
                    </span>
                  </div>
                  <button
                    onClick={() => showToast('Opening payment gateway modal', 'info')}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    Edit payment
                  </button>
                </div>

                <label className="flex items-start justify-between cursor-pointer py-2 border-b border-neutral-100 dark:border-neutral-800/80">
                  <div className="pr-4">
                    <span className="text-sm font-medium text-neutral-900 dark:text-white block">
                      Quick Purchase
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      Enable 1-click purchases for Super Chats, Super Stickers, and Channel Memberships
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.quickPurchase}
                    onChange={(e) => updateSetting('quickPurchase', e.target.checked)}
                    className="w-5 h-5 accent-red-600 rounded mt-0.5 cursor-pointer"
                  />
                </label>
              </div>
            </div>
          )}

          {/* TAB 8: ADVANCED SETTINGS */}
          {settingsTab === 'advanced' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Advanced Settings
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Unique identifiers, brand account migration, and channel deletion.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 block">
                    YouSun User ID
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={settings.userId}
                      className="w-full max-w-md px-3 py-1.5 text-xs font-mono rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 select-all"
                    />
                    <button
                      onClick={() => copyToClipboard(settings.userId, 'User ID')}
                      className="p-1.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                      title="Copy User ID"
                    >
                      {copiedId === 'User ID' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 block">
                    YouSun Channel ID
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={settings.channelId}
                      className="w-full max-w-md px-3 py-1.5 text-xs font-mono rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 select-all"
                    />
                    <button
                      onClick={() => copyToClipboard(settings.channelId, 'Channel ID')}
                      className="p-1.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                      title="Copy Channel ID"
                    >
                      {copiedId === 'Channel ID' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 block">
                    Custom URL
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={settings.customUrl}
                      className="w-full max-w-md px-3 py-1.5 text-xs font-mono rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                    />
                    <button
                      onClick={() => copyToClipboard(settings.customUrl, 'Custom URL')}
                      className="p-1.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
                    >
                      {copiedId === 'Custom URL' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="pt-4 border-t border-red-200 dark:border-red-950/60 space-y-3">
                <h4 className="text-sm font-semibold text-red-600 dark:text-red-400">
                  Delete or Hide Channel
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Deleting your YouSun channel will permanently erase your uploaded videos, comments, playlists, and channel branding.
                </p>
                <button
                  onClick={() => showToast('Action protected: channel deletion requires 2FA confirmation', 'warning')}
                  className="px-4 py-2 text-xs font-semibold text-red-600 border border-red-300 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                >
                  Delete channel
                </button>
              </div>
            </div>
          )}

          {/* TAB 9: YOUSUN STUDIO SETTINGS */}
          {settingsTab === 'studio' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  YouSun Studio Creator Defaults
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Set default metadata, comment moderation rules, and licensing for all new video uploads.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300 block mb-1">
                    Default upload visibility
                  </label>
                  <select
                    value={settings.defaultVisibility}
                    onChange={(e) => updateSetting('defaultVisibility', e.target.value as any)}
                    className="w-full max-w-sm px-3 py-1.5 text-xs rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#222] text-neutral-900 dark:text-white"
                  >
                    <option value="public">Public (Everyone can see video)</option>
                    <option value="unlisted">Unlisted (Anyone with link can watch)</option>
                    <option value="private">Private (Only you can watch)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300 block mb-1">
                    Default Category
                  </label>
                  <select
                    value={settings.defaultCategory}
                    onChange={(e) => updateSetting('defaultCategory', e.target.value)}
                    className="w-full max-w-sm px-3 py-1.5 text-xs rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#222] text-neutral-900 dark:text-white"
                  >
                    <option value="Science & Technology">Science & Technology</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Education">Education</option>
                    <option value="Music">Music</option>
                    <option value="Travel & Events">Travel & Events</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300 block mb-1">
                    Comment Moderation
                  </label>
                  <select
                    value={settings.commentModeration}
                    onChange={(e) => updateSetting('commentModeration', e.target.value as any)}
                    className="w-full max-w-sm px-3 py-1.5 text-xs rounded border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#222] text-neutral-900 dark:text-white"
                  >
                    <option value="hold_inappropriate">Hold potentially inappropriate comments for review</option>
                    <option value="allow_all">Allow all comments</option>
                    <option value="hold_all">Hold all comments for review</option>
                    <option value="disable">Disable comments</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300 block mb-1">
                    Default Upload Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={settings.tagsDefault}
                    onChange={(e) => updateSetting('tagsDefault', e.target.value)}
                    className="w-full max-w-md px-3 py-1.5 text-xs rounded border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white focus:border-red-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <button
                  onClick={() => setCurrentView('studio')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm"
                >
                  Open YouSun Studio Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
