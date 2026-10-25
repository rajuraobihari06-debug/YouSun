import React, { useState } from 'react';
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Download,
  Bookmark,
  Bell,
  Check,
  ChevronDown,
  MessageSquare,
  Sparkles,
  Settings as SettingsIcon,
  Send
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VideoPlayer } from './VideoPlayer';
import { VideoCard } from './VideoCard';
import { INITIAL_COMMENTS } from '../mockData';

export const WatchView: React.FC = () => {
  const {
    selectedVideo,
    setSelectedVideo,
    videos,
    likedVideoIds,
    toggleLikeVideo,
    subscribedChannelHandles,
    toggleSubscribe,
    downloadVideo,
    downloadedVideoIds,
    toggleWatchLater,
    watchLaterIds,
    showToast,
    setCurrentView,
    setSettingsTab,
  } = useApp();

  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [newCommentText, setNewCommentText] = useState('');
  const [commentInputActive, setCommentInputActive] = useState(false);

  const isLiked = likedVideoIds.includes(selectedVideo.id);
  const isSubscribed = subscribedChannelHandles.includes(selectedVideo.channelHandle);
  const isDownloaded = downloadedVideoIds.includes(selectedVideo.id);
  const isSavedWatchLater = watchLaterIds.includes(selectedVideo.id);

  // Recommendations: exclude current video
  const recommendations = videos.filter(v => v.id !== selectedVideo.id);

  const handleNextVideo = () => {
    if (recommendations.length > 0) {
      setSelectedVideo(recommendations[0]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment = {
      id: `c-${Date.now()}`,
      author: 'You (Sami Raju Rao)',
      avatarUrl: '/src/assets/images/nemesis_rao_avatar_1792923873527.jpg',
      text: newCommentText.trim(),
      timestamp: 'Just now',
      likes: 0,
      userLiked: false,
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
    setCommentInputActive(false);
    showToast('Comment published', 'success');
  };

  const toggleCommentLike = (id: string) => {
    setComments(prev =>
      prev.map(c => {
        if (c.id === id) {
          const liked = !c.userLiked;
          return {
            ...c,
            userLiked: liked,
            likes: liked ? c.likes + 1 : c.likes - 1,
          };
        }
        return c;
      })
    );
  };

  return (
    <div className="w-full max-w-[1720px] mx-auto px-2 sm:px-6 py-4 select-none">
      <div className={`grid grid-cols-1 ${isTheaterMode ? 'lg:grid-cols-1' : 'lg:grid-cols-12'} gap-6`}>
        {/* Left Column: Player, Video info, Description & Comments */}
        <div className={`${isTheaterMode ? 'w-full' : 'lg:col-span-8'} space-y-4`}>
          {/* Main Video Player */}
          <VideoPlayer
            video={selectedVideo}
            onNext={handleNextVideo}
            isTheaterMode={isTheaterMode}
            setIsTheaterMode={setIsTheaterMode}
          />

          {/* Video Title */}
          <h1 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white leading-tight">
            {selectedVideo.title}
          </h1>

          {/* Channel Info & Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-neutral-200 dark:border-neutral-800">
            {/* Channel info & Subscribe */}
            <div className="flex items-center gap-3">
              <img
                src={selectedVideo.channelAvatarUrl}
                alt={selectedVideo.channelName}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-sm text-neutral-900 dark:text-white flex items-center gap-1">
                  <span>{selectedVideo.channelName}</span>
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {selectedVideo.subscribers} subscribers
                </p>
              </div>

              <button
                onClick={() => toggleSubscribe(selectedVideo.channelHandle)}
                className={`ml-2 px-4 py-2 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  isSubscribed
                    ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-300 dark:hover:bg-neutral-700'
                    : 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100'
                }`}
              >
                {isSubscribed ? (
                  <>
                    <Bell className="w-3.5 h-3.5 fill-current" />
                    <span>Subscribed</span>
                  </>
                ) : (
                  <span>Subscribe</span>
                )}
              </button>
            </div>

            {/* Action buttons (Like, Share, Download, Watch Later, Settings) */}
            <div className="flex items-center flex-wrap gap-2 text-xs font-medium">
              {/* Like / Dislike */}
              <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <button
                  onClick={() => toggleLikeVideo(selectedVideo.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors ${
                    isLiked ? 'text-red-600 dark:text-red-400 font-semibold' : 'text-neutral-800 dark:text-neutral-200'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{(selectedVideo.likes + (isLiked ? 1 : 0)).toLocaleString()}</span>
                </button>
                <div className="w-[1px] h-5 bg-neutral-300 dark:bg-neutral-700" />
                <button
                  onClick={() => showToast('Feedback recorded', 'info')}
                  className="px-2.5 py-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition-colors"
                  title="Dislike"
                >
                  <ThumbsDown className="w-4 h-4" />
                </button>
              </div>

              {/* Share */}
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  showToast('YouSun video link copied to clipboard', 'info');
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>

              {/* Download */}
              <button
                onClick={() => downloadVideo(selectedVideo.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full transition-colors ${
                  isDownloaded
                    ? 'bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 font-semibold'
                    : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>{isDownloaded ? 'Downloaded' : 'Download'}</span>
              </button>

              {/* Watch Later */}
              <button
                onClick={() => toggleWatchLater(selectedVideo.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full transition-colors ${
                  isSavedWatchLater
                    ? 'bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 font-semibold'
                    : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>{isSavedWatchLater ? 'Saved' : 'Save'}</span>
              </button>

              {/* Quick Settings Jumper */}
              <button
                onClick={() => {
                  setCurrentView('settings');
                  setSettingsTab('playback');
                }}
                title="Open Playback & Performance Settings"
                className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
              >
                <SettingsIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Description Box */}
          <div
            onClick={() => setDescExpanded(!descExpanded)}
            className="p-3.5 rounded-xl bg-neutral-100 dark:bg-[#222222] hover:bg-neutral-200/80 dark:hover:bg-[#272727] cursor-pointer transition-colors text-xs text-neutral-800 dark:text-neutral-200 space-y-2"
          >
            <div className="flex items-center gap-2 font-semibold text-neutral-900 dark:text-white">
              <span>{selectedVideo.views}</span>
              <span>·</span>
              <span>{selectedVideo.timestamp}</span>
              <span className="text-red-600 dark:text-red-400 font-normal">
                #{selectedVideo.category.replace(/\s+/g, '')}
              </span>
            </div>

            <p className={`whitespace-pre-line leading-relaxed ${!descExpanded ? 'line-clamp-2' : ''}`}>
              {selectedVideo.description}
            </p>

            <span className="font-semibold text-neutral-600 dark:text-neutral-400 block pt-1">
              {descExpanded ? 'Show less' : '...more'}
            </span>
          </div>

          {/* Comments Section */}
          <div className="pt-4 space-y-4">
            <div className="flex items-center gap-4">
              <h3 className="font-bold text-base text-neutral-900 dark:text-white">
                {comments.length} Comments
              </h3>
              <span className="text-xs text-neutral-500">Sorted by Top</span>
            </div>

            {/* Add Comment Input Form */}
            <form onSubmit={handleAddComment} className="flex gap-3 items-start">
              <img
                src="/src/assets/images/nemesis_rao_avatar_1792923873527.jpg"
                alt="You"
                className="w-9 h-9 rounded-full object-cover shrink-0"
              />
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Add a comment to Rao Video..."
                  value={newCommentText}
                  onFocus={() => setCommentInputActive(true)}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="w-full py-1.5 px-0 text-sm bg-transparent border-b border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
                />

                {commentInputActive && (
                  <div className="flex items-center justify-end gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setNewCommentText('');
                        setCommentInputActive(false);
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!newCommentText.trim()}
                      className="px-4 py-1.5 text-xs font-semibold text-white bg-red-600 disabled:opacity-50 hover:bg-red-700 rounded-full transition-colors flex items-center gap-1"
                    >
                      <span>Comment</span>
                    </button>
                  </div>
                )}
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4 pt-2">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 text-xs">
                  <img
                    src={comment.avatarUrl}
                    alt={comment.author}
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-neutral-900 dark:text-white">
                        {comment.author}
                      </span>
                      <span className="text-[11px] text-neutral-500">
                        {comment.timestamp}
                      </span>
                    </div>
                    <p className="text-neutral-800 dark:text-neutral-200 leading-normal">
                      {comment.text}
                    </p>

                    <div className="flex items-center gap-3 pt-1 text-neutral-500">
                      <button
                        onClick={() => toggleCommentLike(comment.id)}
                        className={`flex items-center gap-1 hover:text-red-500 ${
                          comment.userLiked ? 'text-red-600 dark:text-red-400 font-semibold' : ''
                        }`}
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${comment.userLiked ? 'fill-current' : ''}`} />
                        <span>{comment.likes}</span>
                      </button>
                      <button
                        onClick={() => showToast('Reply thread opened', 'info')}
                        className="hover:text-neutral-700 dark:hover:text-neutral-300 font-medium"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Recommendations Feed */}
        <div className={`${isTheaterMode ? 'w-full max-w-4xl mx-auto' : 'lg:col-span-4'} space-y-3`}>
          <div className="flex items-center justify-between pb-1">
            <h3 className="font-semibold text-sm text-neutral-900 dark:text-white">
              Up Next &amp; Recommended
            </h3>
            <button
              onClick={() => {
                setCurrentView('settings');
                setSettingsTab('playback');
              }}
              className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline"
            >
              Autoplay is {useApp().settings.autoplayNext ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="space-y-3">
            {recommendations.map((v) => (
              <VideoCard key={v.id} video={v} layout="horizontal" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
