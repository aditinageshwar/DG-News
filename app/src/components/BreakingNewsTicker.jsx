import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Volume2, VolumeX } from 'lucide-react';

export default function BreakingNewsTicker({ news }) {
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current || isPaused) return;

    const scrollContainer = scrollRef.current;
    let animationId;
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += 0.5;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPaused]);

  if (!news || news.length === 0) return null;

  // Duplicate news for seamless scrolling
  const duplicatedNews = [...news, ...news];

  return (
    <div className="bg-red-600 text-white py-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
        {/* Breaking News Label */}
        <motion.div 
          className="flex-shrink-0 flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.5 }}
        >
          <AlertCircle size={16} className="animate-pulse" />
          <span className="font-bold text-sm uppercase tracking-wider">Breaking</span>
        </motion.div>

        {/* Scrolling News */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-hidden whitespace-nowrap"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="inline-flex gap-8">
            {duplicatedNews.map((item, index) => (
              <motion.a
                key={`${item._id || item.id}-${index}`}
                href={`#news-${item._id || item.id}`}
                className="inline-flex items-center gap-3 hover:text-red-100 transition-colors cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <span className="font-medium text-sm">{item.title}</span>
                <span className="text-red-200 text-xs">
                  {new Date(item.publishedAt).toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
                <span className="text-red-300">|</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex-shrink-0 flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
            title={isMuted ? 'Unmute notifications' : 'Mute notifications'}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
