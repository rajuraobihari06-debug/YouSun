import React from 'react';
import {
  Tv2,
  TrendingUp,
  Users,
  Eye,
  Clock,
  DollarSign,
  Upload,
  Settings,
  MoreVertical,
  CheckCircle,
  ShieldCheck,
  Play
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const StudioView: React.FC = () => {
  const {
    videos,
    settings,
    setIsUploadModalOpen,
    setCurrentView,
    setSettingsTab,
    setSelectedVideo,
    showToast
  } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-20 select-none space-y-6">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-600 text-white shadow-md">
            <Tv2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                YouSun Rao Studio
              </h2>
              <span className="text-xs bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 font-semibold px-2 py-0.5 rounded">
                Partner Creator
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Channel dashboard &amp; studio settings for {settings.channelName} ({settings.channelHandle})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setCurrentView('settings');
              setSettingsTab('studio');
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4 text-red-500" />
            <span>Studio Settings</span>
          </button>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm"
          >
            <Upload className="w-4 h-4" />
            <span>Upload Videos</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-[#1f1f1f] border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 text-xs">
            <span>Total Subscribers</span>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-xl font-bold text-neutral-900 dark:text-white font-mono mt-1">
            1,284,520
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold">
            +14,200 past 28 days
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#1f1f1f] border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 text-xs">
            <span>Channel Views</span>
            <Eye className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-xl font-bold text-neutral-900 dark:text-white font-mono mt-1">
            5.84M
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold">
            +18.4% vs previous period
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#1f1f1f] border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 text-xs">
            <span>Watch Time (Hours)</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-xl font-bold text-neutral-900 dark:text-white font-mono mt-1">
            420,180
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold">
            Real-time AV1 streaming
          </span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#1f1f1f] border border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 text-xs">
            <span>Estimated Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-xl font-bold text-neutral-900 dark:text-white font-mono mt-1">
            $9,420.50
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold">
            YouSun Premium + Ad Share
          </span>
        </div>
      </div>

      {/* Videos Management Table */}
      <div className="bg-white dark:bg-[#1a1a1a] border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <h3 className="font-semibold text-sm text-neutral-900 dark:text-white">
            Channel Content ({videos.length} videos)
          </h3>
          <span className="text-xs text-neutral-500">
            Default license: {settings.defaultLicense === 'standard' ? 'Standard YouSun' : 'Creative Commons'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 dark:bg-[#222] border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Video</th>
                <th className="py-3 px-3">Visibility</th>
                <th className="py-3 px-3">Monetization</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Views</th>
                <th className="py-3 px-3">Likes</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800 text-neutral-700 dark:text-neutral-300">
              {videos.map((vid) => (
                <tr key={vid.id} className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition-colors">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      src={vid.thumbnailUrl}
                      alt={vid.title}
                      className="w-16 h-10 object-cover rounded-md shrink-0 bg-neutral-900"
                    />
                    <div className="min-w-0 max-w-xs sm:max-w-md">
                      <p className="font-semibold text-neutral-900 dark:text-white line-clamp-1">
                        {vid.title}
                      </p>
                      <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
                        {vid.category} · {vid.duration}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{settings.defaultVisibility}</span>
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <DollarSign className="w-3.5 h-3.5" />
                      <span>Enabled</span>
                    </span>
                  </td>
                  <td className="py-3 px-3 text-neutral-500 font-mono">
                    {vid.timestamp}
                  </td>
                  <td className="py-3 px-3 font-mono font-medium">
                    {vid.views}
                  </td>
                  <td className="py-3 px-3 font-mono">
                    {vid.likes.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedVideo(vid);
                        setCurrentView('watch');
                      }}
                      className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                      title="Play in YouSun"
                    >
                      <Play className="w-4 h-4 text-red-500 fill-current" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
