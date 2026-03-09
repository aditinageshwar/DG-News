import { motion } from 'framer-motion';
import { Clock, Eye, User, Share2, Bookmark } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function NewsCard({ article, variant = 'default', onClick }) {
  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href
      });
    }
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
  };

  if (variant === 'compact') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        className="group cursor-pointer"
        onClick={() => onClick?.(article)}
      >
        <div className="flex gap-3">
          <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="flex-1 min-w-0">
            <Badge variant="outline" className="text-xs mb-1">
              {article.category}
            </Badge>
            <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {article.title}
            </h4>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <Clock size={12} />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <motion.article
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: 4 }}
        className="group cursor-pointer bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow"
        onClick={() => onClick?.(article)}
      >
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-3 left-3">
              <Badge className="bg-primary">{article.category}</Badge>
            </div>
          </div>
          <div className="sm:w-3/5 p-5">
            <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {article.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User size={14} />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{article.readTime}</span>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleShare}>
                  <Share2 size={14} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleBookmark}>
                  <Bookmark size={14} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  // Default variant
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group cursor-pointer bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300"
      onClick={() => onClick?.(article)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-3 left-3">
          <Badge className="bg-primary">{article.category}</Badge>
        </div>
        {article.isBreaking && (
          <div className="absolute top-3 right-3">
            <Badge variant="destructive" className="animate-pulse">Breaking</Badge>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <User size={14} />
              <span className="truncate max-w-[80px]">{article.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{article.readTime}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Eye size={14} />
            <span>{(article.views / 1000).toFixed(1)}K</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
