import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Eye, Calendar, Bookmark, Facebook, Twitter, Link2, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function NewsDetail({ 
  article, 
  isOpen, 
  onClose,
  relatedArticles = [],
  onRelatedArticleClick
}) {
  if (!article) return null;

  const handleShare = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article.title);
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${title}&url=${url}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(window.location.href);
        break;
      case 'print':
        window.print();
        break;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-background rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
            >
              <X size={20} />
            </Button>

            <ScrollArea className="h-[90vh]">
              {/* Hero Image */}
              <div className="relative h-64 md:h-80">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="text-sm">{article.category}</Badge>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-2xl md:text-4xl font-bold text-foreground"
                  >
                    {article.title}
                  </motion.h1>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <motion.div 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={article.authorAvatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80'}
                      alt={article.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium text-foreground">{article.author}</span>
                  </div>
                  <Separator orientation="vertical" className="h-4 hidden sm:block" />
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{article.readTime} read</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={14} />
                    <span>{(article.views / 1000).toFixed(1)}K views</span>
                  </div>
                </motion.div>

                {/* Share Buttons */}
                <motion.div 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-2 mb-6"
                >
                  <span className="text-sm text-muted-foreground mr-2">Share:</span>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleShare('facebook')}>
                    <Facebook size={14} />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleShare('twitter')}>
                    <Twitter size={14} />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleShare('copy')}>
                    <Link2 size={14} />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleShare('print')}>
                    <Printer size={14} />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <Bookmark size={14} />
                  </Button>
                </motion.div>

                <Separator className="mb-6" />

                {/* Article Content */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="prose prose-lg max-w-none dark:prose-invert"
                >
                  <p className="text-xl text-muted-foreground leading-relaxed mb-6 font-medium">
                    {article.excerpt}
                  </p>
                  <div className="text-foreground leading-relaxed whitespace-pre-line">
                    {article.content}
                  </div>
                </motion.div>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <motion.div 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8"
                  >
                    <h4 className="font-semibold mb-3">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="capitalize">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Location */}
                {article.location && (
                  <motion.div 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span className="font-medium">Location:</span>
                    <span>{article.location}</span>
                  </motion.div>
                )}

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mt-10"
                  >
                    <h3 className="text-xl font-bold mb-4">Related Articles</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {relatedArticles.slice(0, 4).map((relatedArticle) => (
                        <div
                          key={relatedArticle._id || relatedArticle.id}
                          className="flex gap-3 cursor-pointer group"
                          onClick={() => onRelatedArticleClick?.(relatedArticle)}
                        >
                          <div className="w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                            <img
                              src={relatedArticle.image}
                              alt={relatedArticle.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                          <div>
                            <Badge variant="outline" className="text-xs mb-1">
                              {relatedArticle.category}
                            </Badge>
                            <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                              {relatedArticle.title}
                            </h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
