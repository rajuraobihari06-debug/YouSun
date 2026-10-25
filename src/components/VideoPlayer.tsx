import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings as SettingsIcon,
  Subtitles,
  SkipForward,
  RotateCcw,
  Sparkles,
  Check,
  ChevronRight,
  Info,
  Clock,
  Radio
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Video } from '../types';

interface VideoPlayerProps {
  video: Video;
  onNext?: () => void;
  isTheaterMode?: boolean;
  setIsTheaterMode?: (val: boolean) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  onNext,
  isTheaterMode = false,
  setIsTheaterMode,
}) => {
  const { settings, updateSetting, showToast } = useApp();

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gearMenuRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(video.durationSeconds || 120);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Player Settings Menu States
  const [isGearOpen, setIsGearOpen] = useState(false);
  const [menuSubView, setMenuSubView] = useState<'main' | 'speed' | 'quality' | 'sleeptimer' | 'captions'>('main');
  const [currentSpeed, setCurrentSpeed] = useState(settings.playbackSpeed || 1.0);
  const [currentQuality, setCurrentQuality] = useState('1080p60 HD');
  const [showStatsForGeeks, setShowStatsForGeeks] = useState(false);
  const [showCaptions, setShowCaptions] = useState(settings.alwaysShowCaptions);
  const [sleepTimerRemaining, setSleepTimerRemaining] = useState<string>('Off');

  // Controls hide timer
  const controlsTimeout = useRef<any>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = currentSpeed;
      videoRef.current.volume = isMuted ? 0 : volume;
    }
  }, [currentSpeed, volume, isMuted]);

  useEffect(() => {
    // Reset playback on video change
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(true);
      videoRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [video.id]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (gearMenuRef.current && !gearMenuRef.current.contains(e.target as Node)) {
        setIsGearOpen(false);
        setMenuSubView('main');
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = Number(e.target.value);
    setCurrentTime(targetTime);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = Number(e.target.value);
    setVolume(newVol);
    setIsMuted(newVol === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => {
      if (isPlaying && !isGearOpen) setShowControls(false);
    }, 2800);
  };

  const speeds = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];
  const qualities = ['4K 2160p60 HDR', '1440p60', '1080p60 HD', '720p', '480p', '360p', 'Auto'];

  return (
    <div className="relative group w-full select-none" onMouseMove={handleMouseMove}>
      {/* Ambient Mode Glow (if enabled in settings) */}
      {settings.ambientMode && (
        <div
          className="absolute -inset-4 sm:-inset-8 blur-3xl opacity-35 dark:opacity-45 pointer-events-none transition-opacity duration-700 -z-10 rounded-3xl"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(239, 68, 68, 0.45), rgba(59, 130, 246, 0.25), transparent)',
          }}
        />
      )}

      {/* Main Video Screen Container */}
      <div
        ref={containerRef}
        className={`relative overflow-hidden bg-black w-full rounded-2xl shadow-xl aspect-video flex items-center justify-center`}
      >
        <video
          ref={videoRef}
          src={video.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
          poster={video.thumbnailUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => {
            setIsPlaying(false);
            if (settings.autoplayNext && onNext) onNext();
          }}
          onClick={togglePlay}
          className="w-full h-full object-contain cursor-pointer"
          playsInline
        />

        {/* Captions Overlay */}
        {showCaptions && isPlaying && (
          <div className="absolute bottom-16 left-0 right-0 flex justify-center pointer-events-none px-4 z-20">
            <span
              style={{
                color: settings.captionColor === 'yellow' ? '#facc15' : settings.captionColor === 'cyan' ? '#38bdf8' : '#ffffff',
                fontSize: settings.captionFontSize === 'small' ? '13px' : settings.captionFontSize === 'large' ? '20px' : '15px',
                backgroundColor: `rgba(0,0,0,${settings.captionBgOpacity / 100})`,
              }}
              className="px-3 py-1 rounded text-center max-w-lg shadow font-medium"
            >
              [YouSun Auto-Captions: "{video.title}"]
            </span>
          </div>
        )}

        {/* Stats for Geeks Overlay */}
        {showStatsForGeeks && (
          <div className="absolute top-4 left-4 z-30 p-3 bg-black/85 text-[11px] font-mono text-white rounded-lg border border-neutral-700 max-w-xs space-y-1">
            <div className="flex items-center justify-between pb-1 border-b border-neutral-700">
              <span className="font-bold text-red-400">Stats for Geeks</span>
              <button
                onClick={() => setShowStatsForGeeks(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p>Video ID: {video.id} / YouSun-AV01</p>
            <p>Dimensions: 1920x1080@60 (Viewport 854x480)</p>
            <p>Codecs: av01.0.08M.08 / opus (48000Hz)</p>
            <p>Current / Optimal Res: 1080p60 / 1080p60</p>
            <p>Buffer Health: 24.8 s</p>
            <p>Connection Speed: 84,200 Kbps</p>
            <p>Dropped Frames: 0 / 1840</p>
          </div>
        )}

        {/* In-Video Controls Bar Overlay */}
        <div
          className={`absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-10 pb-2 px-3 sm:px-4 transition-opacity duration-200 ${
            showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Progress Seekbar */}
          <div className="relative flex items-center mb-2 group/seek">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 group-hover/seek:h-2 accent-red-600 bg-white/30 rounded-lg cursor-pointer transition-all duration-150"
            />
          </div>

          {/* Bottom buttons row */}
          <div className="flex items-center justify-between text-white text-xs">
            {/* Left Controls: Play, Next, Volume, Time */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-1.5 hover:text-red-400 transition-colors"
                title={isPlaying ? 'Pause (k)' : 'Play (k)'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              </button>

              {onNext && (
                <button
                  onClick={onNext}
                  className="p-1.5 hover:text-neutral-300 transition-colors"
                  title="Next video (Shift+N)"
                >
                  <SkipForward className="w-5 h-5 fill-current" />
                </button>
              )}

              {/* Volume Slider Group */}
              <div className="flex items-center group/vol gap-1.5">
                <button
                  onClick={toggleMute}
                  className="p-1.5 hover:text-neutral-300 transition-colors"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 accent-white bg-white/30 rounded-lg cursor-pointer"
                />
              </div>

              {/* Time display */}
              <span className="font-mono text-neutral-300 text-[11px] ml-1">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Right Controls: Autoplay, Captions, Gear Settings, Theater, Fullscreen */}
            <div className="flex items-center gap-2 relative">
              {/* Autoplay toggle */}
              <button
                onClick={() => updateSetting('autoplayNext', !settings.autoplayNext)}
                title={`Autoplay is ${settings.autoplayNext ? 'on' : 'off'}`}
                className="p-1.5 text-neutral-300 hover:text-white"
              >
                <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${settings.autoplayNext ? 'bg-red-600' : 'bg-neutral-600'}`}>
                  <div className={`w-3 h-3 rounded-full bg-white transition-transform ${settings.autoplayNext ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
              </button>

              {/* Subtitles CC */}
              <button
                onClick={() => {
                  setShowCaptions(!showCaptions);
                  showToast(showCaptions ? 'Subtitles turned off' : 'Subtitles turned on', 'info');
                }}
                className={`p-1.5 rounded transition-colors ${
                  showCaptions ? 'text-white border-b-2 border-red-600' : 'text-neutral-400 hover:text-white'
                }`}
                title="Subtitles/closed captions (c)"
              >
                <Subtitles className="w-5 h-5" />
              </button>

              {/* YouTube-famous Gear ⚙️ Settings Menu */}
              <div className="relative" ref={gearMenuRef}>
                <button
                  onClick={() => {
                    setIsGearOpen(!isGearOpen);
                    setMenuSubView('main');
                  }}
                  className={`p-1.5 transition-transform duration-200 ${
                    isGearOpen ? 'rotate-45 text-white' : 'text-neutral-300 hover:text-white'
                  }`}
                  title="Player Settings"
                >
                  <SettingsIcon className="w-5 h-5" />
                </button>

                {/* Popover Gear Menu */}
                {isGearOpen && (
                  <div className="absolute right-0 bottom-9 w-64 rounded-xl bg-[#212121]/95 backdrop-blur-md border border-neutral-700 py-2 shadow-2xl text-xs text-white z-50 animate-in fade-in duration-150">
                    {/* Main Menu */}
                    {menuSubView === 'main' && (
                      <div className="divide-y divide-neutral-800">
                        <div className="py-1">
                          {/* Ambient Mode */}
                          <button
                            onClick={() => updateSetting('ambientMode', !settings.ambientMode)}
                            className="flex items-center justify-between w-full px-4 py-2 hover:bg-white/10 transition-colors text-left"
                          >
                            <span className="flex items-center gap-2">
                              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                              Ambient mode
                            </span>
                            <span className="text-neutral-400">
                              {settings.ambientMode ? 'On' : 'Off'}
                            </span>
                          </button>

                          {/* Annotations */}
                          <button
                            onClick={() => updateSetting('showAnnotations', !settings.showAnnotations)}
                            className="flex items-center justify-between w-full px-4 py-2 hover:bg-white/10 transition-colors text-left"
                          >
                            <span>Annotations</span>
                            <span className="text-neutral-400">
                              {settings.showAnnotations ? 'On' : 'Off'}
                            </span>
                          </button>

                          {/* Playback Speed */}
                          <button
                            onClick={() => setMenuSubView('speed')}
                            className="flex items-center justify-between w-full px-4 py-2 hover:bg-white/10 transition-colors text-left"
                          >
                            <span>Playback speed</span>
                            <span className="flex items-center gap-1 text-neutral-400">
                              {currentSpeed === 1.0 ? 'Normal' : `${currentSpeed}x`}
                              <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </button>

                          {/* Quality */}
                          <button
                            onClick={() => setMenuSubView('quality')}
                            className="flex items-center justify-between w-full px-4 py-2 hover:bg-white/10 transition-colors text-left"
                          >
                            <span>Quality</span>
                            <span className="flex items-center gap-1 text-neutral-400">
                              {currentQuality}
                              <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </button>

                          {/* Sleep timer */}
                          <button
                            onClick={() => setMenuSubView('sleeptimer')}
                            className="flex items-center justify-between w-full px-4 py-2 hover:bg-white/10 transition-colors text-left"
                          >
                            <span className="flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5 text-blue-400" />
                              Sleep timer
                            </span>
                            <span className="flex items-center gap-1 text-neutral-400">
                              {sleepTimerRemaining}
                              <ChevronRight className="w-3.5 h-3.5" />
                            </span>
                          </button>
                        </div>

                        {/* Stable volume & Stats */}
                        <div className="py-1">
                          <button
                            onClick={() => updateSetting('stableVolume', !settings.stableVolume)}
                            className="flex items-center justify-between w-full px-4 py-2 hover:bg-white/10 transition-colors text-left"
                          >
                            <span>Stable volume</span>
                            <span className="text-neutral-400">
                              {settings.stableVolume ? 'On' : 'Off'}
                            </span>
                          </button>

                          <button
                            onClick={() => {
                              setShowStatsForGeeks(!showStatsForGeeks);
                              setIsGearOpen(false);
                            }}
                            className="flex items-center justify-between w-full px-4 py-2 hover:bg-white/10 transition-colors text-left"
                          >
                            <span>Stats for geeks</span>
                            <span className="text-neutral-400">
                              {showStatsForGeeks ? 'Shown' : 'Hidden'}
                            </span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Speed Submenu */}
                    {menuSubView === 'speed' && (
                      <div>
                        <div className="flex items-center gap-2 px-3 py-1.5 border-b border-neutral-700 text-neutral-300 font-semibold">
                          <button
                            onClick={() => setMenuSubView('main')}
                            className="hover:text-white"
                          >
                            ‹ Back
                          </button>
                          <span>Playback speed</span>
                        </div>
                        <div className="py-1 max-h-52 overflow-y-auto">
                          {speeds.map((s) => (
                            <button
                              key={s}
                              onClick={() => {
                                setCurrentSpeed(s);
                                if (videoRef.current) videoRef.current.playbackRate = s;
                                setMenuSubView('main');
                                showToast(`Playback speed set to ${s}x`, 'info');
                              }}
                              className="flex items-center justify-between w-full px-4 py-1.5 hover:bg-white/10 text-left"
                            >
                              <span>{s === 1.0 ? 'Normal' : `${s}x`}</span>
                              {currentSpeed === s && <Check className="w-3.5 h-3.5 text-red-500" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quality Submenu */}
                    {menuSubView === 'quality' && (
                      <div>
                        <div className="flex items-center gap-2 px-3 py-1.5 border-b border-neutral-700 text-neutral-300 font-semibold">
                          <button
                            onClick={() => setMenuSubView('main')}
                            className="hover:text-white"
                          >
                            ‹ Back
                          </button>
                          <span>Quality</span>
                        </div>
                        <div className="py-1 max-h-52 overflow-y-auto">
                          {qualities.map((q) => (
                            <button
                              key={q}
                              onClick={() => {
                                setCurrentQuality(q);
                                setMenuSubView('main');
                                showToast(`Quality adjusted to ${q}`, 'info');
                              }}
                              className="flex items-center justify-between w-full px-4 py-1.5 hover:bg-white/10 text-left"
                            >
                              <span>{q}</span>
                              {currentQuality === q && <Check className="w-3.5 h-3.5 text-red-500" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Sleep Timer Submenu */}
                    {menuSubView === 'sleeptimer' && (
                      <div>
                        <div className="flex items-center gap-2 px-3 py-1.5 border-b border-neutral-700 text-neutral-300 font-semibold">
                          <button
                            onClick={() => setMenuSubView('main')}
                            className="hover:text-white"
                          >
                            ‹ Back
                          </button>
                          <span>Sleep timer</span>
                        </div>
                        <div className="py-1 max-h-52 overflow-y-auto">
                          {['Off', '10 minutes', '15 minutes', '30 minutes', '45 minutes', '60 minutes', 'End of video'].map((timer) => (
                            <button
                              key={timer}
                              onClick={() => {
                                setSleepTimerRemaining(timer);
                                setMenuSubView('main');
                                showToast(`Sleep timer set: ${timer}`, 'info');
                              }}
                              className="flex items-center justify-between w-full px-4 py-1.5 hover:bg-white/10 text-left"
                            >
                              <span>{timer}</span>
                              {sleepTimerRemaining === timer && <Check className="w-3.5 h-3.5 text-red-500" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Theater Mode Toggle */}
              {setIsTheaterMode && (
                <button
                  onClick={() => setIsTheaterMode(!isTheaterMode)}
                  className="p-1.5 text-neutral-300 hover:text-white hidden md:block"
                  title="Theater mode (t)"
                >
                  <div className="w-4 h-3 border-2 border-white rounded-sm" />
                </button>
              )}

              {/* Fullscreen Toggle */}
              <button
                onClick={toggleFullscreen}
                className="p-1.5 text-neutral-300 hover:text-white"
                title="Full screen (f)"
              >
                {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
