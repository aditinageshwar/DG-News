import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Eye, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function HeroSection({ featuredNews, onArticleClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = useCallback((newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = featuredNews.length - 1;
      if (nextIndex >= featuredNews.length) nextIndex = 0;
      return nextIndex;
    });
  }, [featuredNews.length]);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(timer);
  }, [paginate]);

  if (!featuredNews || featuredNews.length === 0) return null;

  const currentArticle = featuredNews[currentIndex];

  return (
    <section className="relative w-full bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Featured Carousel */}
          <div className="lg:col-span-2 relative">
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(_, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  className="absolute inset-0 cursor-grab active:cursor-grabbing"
                  onClick={() => onArticleClick?.(currentArticle)}
                >
                  {/* Image */}
                  <img
                    src={currentArticle.image}
                    alt={currentArticle.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Badge className="mb-3 bg-primary hover:bg-primary/90">
                        {currentArticle.category}
                      </Badge>
                      <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 line-clamp-3">
                        {currentArticle.title}
                      </h2>
                      <p className="text-gray-200 text-sm md:text-base mb-4 line-clamp-2 max-w-2xl">
                        {currentArticle.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-gray-300 text-sm">
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          <span>{currentArticle.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{currentArticle.readTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye size={14} />
                          <span>{(currentArticle.views / 1000).toFixed(1)}K views</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <div className="absolute inset-y-0 left-0 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => paginate(-1)}
                  className="m-2 bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm"
                >
                  <ChevronLeft size={24} />
                </Button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => paginate(1)}
                  className="m-2 bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm"
                >
                  <ChevronRight size={24} />
                </Button>
              </div>

              {/* Progress Indicators */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                {featuredNews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex 
                        ? 'w-8 bg-white' 
                        : 'bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Side Featured Articles */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            {featuredNews.slice(0, 3).map((article, index) => (
              <motion.article
                key={article._id || article.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group relative rounded-xl overflow-hidden cursor-pointer ${
                  index === currentIndex ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                  onArticleClick?.(article);
                }}
              >
                <div className="relative h-[120px] md:h-[156px]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {article.category}
                    </Badge>
                    <h3 className="text-white font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
