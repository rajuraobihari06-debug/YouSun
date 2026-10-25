import React, { useState } from 'react';
import { X, Upload, Film, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Video } from '../types';

export const UploadModal: React.FC = () => {
  const { isUploadModalOpen, setIsUploadModalOpen, addVideo, settings } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(settings.defaultCategory || 'Science & Technology');
  const [thumbnailOption, setThumbnailOption] = useState<'nebula' | 'cyber' | 'nature'>('cyber');

  if (!isUploadModalOpen) return null;

  const thumbnailMap = {
    nebula: '/src/assets/images/nemesis_cinematic_thumbnail_1792923843546.jpg',
    cyber: '/src/assets/images/nemesis_tech_future_thumbnail_1792923858431.jpg',
    nature: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newVideo: Video = {
      id: `vid-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || 'Uploaded to YouSun by Rao Video Productions.',
      thumbnailUrl: thumbnailMap[thumbnailOption],
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      duration: '12:30',
      durationSeconds: 750,
      views: '0 views',
      viewCount: 0,
      timestamp: 'Just now',
      channelName: settings.channelName,
      channelHandle: settings.channelHandle,
      channelAvatarUrl: '/src/assets/images/nemesis_rao_avatar_1792923873527.jpg',
      verified: true,
      subscribers: '1.28M',
      likes: 1,
      dislikes: 0,
      category,
      tags: settings.tagsDefault.split(',').map(t => t.trim()),
    };

    addVideo(newVideo);
    setIsUploadModalOpen(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in select-none">
      <div className="w-full max-w-xl bg-white dark:bg-[#212121] rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-red-500" />
            <h3 className="font-bold text-base text-neutral-900 dark:text-white">
              Upload video to YouSun
            </h3>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(false)}
            className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
              Title (required)
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rao Video: Next Generation 4K Production"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Tell viewers about your video..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-white focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] text-neutral-900 dark:text-white"
              >
                <option value="Science & Technology">Science & Technology</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Gaming">Gaming</option>
                <option value="Education">Education</option>
                <option value="Travel & Nature">Travel & Nature</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 block mb-1">
                Thumbnail Art
              </label>
              <select
                value={thumbnailOption}
                onChange={(e) => setThumbnailOption(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1a1a1a] text-neutral-900 dark:text-white"
              >
                <option value="cyber">Cyber Desk Studio (4K)</option>
                <option value="nebula">Deep Space Exploration (HDR)</option>
                <option value="nature">Emerald Alpine Glaciers</option>
              </select>
            </div>
          </div>

          <div className="p-3 bg-neutral-50 dark:bg-[#1a1a1a] rounded-lg border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-500 space-y-1">
            <p>• Visibility: <span className="font-semibold text-neutral-800 dark:text-neutral-200">{settings.defaultVisibility}</span></p>
            <p>• License: <span className="font-semibold text-neutral-800 dark:text-neutral-200">{settings.defaultLicense}</span></p>
            <p>• Auto-tags: <span className="font-mono text-[11px] text-neutral-400">{settings.tagsDefault}</span></p>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-200 dark:border-neutral-700">
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="px-5 py-2 text-xs font-semibold text-white bg-red-600 disabled:opacity-50 hover:bg-red-700 rounded-lg shadow-sm transition-colors"
            >
              Publish to YouSun
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
