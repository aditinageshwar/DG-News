import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function VideoSection({ videos }) {
  const [selectedVideo, setSelectedVideo] = useState(videos[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleSeek = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    if (videoRef.current) {
      videoRef.current.currentTime = (newProgress / 100) * videoRef.current.duration;
    }
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    setIsPlaying(false);
    setProgress(0);
  };

  if (!selectedVideo) return null;

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Play size={24} className="text-primary" />
          Video News
        </h2>
        <Button variant="outline" size="sm">
          View All Videos
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Video Player */}
        <div className="lg:col-span-2">
          <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
            {/* Video Element */}
            <video
              ref={videoRef}
              src={selectedVideo.videoUrl}
              poster={selectedVideo.thumbnail}
              className="w-full h-full object-cover"
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              muted={isMuted}
            />

            {/* Play Overlay */}
            {!isPlaying && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
                onClick={handlePlayPause}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 bg-primary/90 rounded-full flex items-center justify-center"
                >
                  <Play size={32} className="text-primary-foreground ml-1" fill="currentColor" />
                </motion.div>
              </div>
            )}

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
              {/* Progress Bar */}
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer mb-4"
                style={{
                  background: `linear-gradient(to right, white ${progress}%, rgba(255,255,255,0.3) ${progress}%)`
                }}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePlayPause}
                    className="text-white hover:bg-white/20 h-8 w-8"
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white hover:bg-white/20 h-8 w-8"
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </Button>
                  <span className="text-white text-sm">{selectedVideo.duration}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 h-8 w-8"
                >
                  <Maximize size={18} />
                </Button>
              </div>
            </div>

            {/* Video Info Overlay */}
            <div className="absolute top-4 left-4 right-4">
              <Badge className="mb-2">{selectedVideo.category}</Badge>
              <h3 className="text-white font-bold text-lg line-clamp-2 drop-shadow-lg">
                {selectedVideo.title}
              </h3>
            </div>
          </div>

          {/* Video Details */}
          <div className="mt-4 p-4 bg-card rounded-xl border border-border">
            <h3 className="font-bold text-xl mb-2">{selectedVideo.title}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{selectedVideo.author}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{selectedVideo.duration}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Eye size={14} />
                <span>{(selectedVideo.views / 1000).toFixed(1)}K views</span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Playlist */}
        <div className="lg:col-span-1">
          <div className="relative">
            <div 
              className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-thin"
            >
              {videos.map((video, index) => (
                <motion.div
                  key={video._id || video.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group cursor-pointer rounded-lg overflow-hidden border transition-all ${
                    selectedVideo._id === video._id || selectedVideo.id === video.id
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleVideoSelect(video)}
                >
                  <div className="flex gap-3 p-3">
                    <div className="relative w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play size={20} className="text-white" fill="currentColor" />
                      </div>
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {video.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {video.category}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <Eye size={12} />
                        <span>{(video.views / 1000).toFixed(1)}K</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
