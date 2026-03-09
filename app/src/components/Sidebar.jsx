import { motion } from 'framer-motion';
import { TrendingUp, Clock, Tag, MapPin, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import NewsCard from './NewsCard';

const categories = [
  { id: '1', name: 'National', slug: 'national' },
  { id: '2', name: 'Politics', slug: 'politics' },
  { id: '3', name: 'Business', slug: 'business' },
  { id: '4', name: 'Technology', slug: 'technology' },
  { id: '5', name: 'Sports', slug: 'sports' },
  { id: '6', name: 'Entertainment', slug: 'entertainment' },
  { id: '7', name: 'Health', slug: 'health' },
  { id: '8', name: 'World', slug: 'world' },
];

const locations = [
  'New Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 
  'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
];

export default function Sidebar({ 
  latestNews = [], 
  trendingNews = [],
  onArticleClick,
  onCategoryClick,
  onSearch
}) {
  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search');
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  // Get trending tags from articles
  const allTags = latestNews.flatMap(article => article.tags || []);
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});
  const trendingTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag]) => tag);

  return (
    <aside className="space-y-8">
      {/* Search Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-xl p-5 border border-border shadow-sm"
      >
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Clock size={18} className="text-primary" />
          Search News
        </h3>
        <form onSubmit={handleSearch}>
          <div className="flex gap-2">
            <Input 
              name="search"
              placeholder="Search articles..."
              className="flex-1"
            />
            <Button type="submit" size="sm">
              <ChevronRight size={16} />
            </Button>
          </div>
        </form>
      </motion.div>

      {/* Latest News Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-xl p-5 border border-border shadow-sm"
      >
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Clock size={18} className="text-primary" />
          Latest News
        </h3>
        <div className="space-y-4">
          {latestNews.slice(0, 5).map((article) => (
            <NewsCard 
              key={article._id || article.id} 
              article={article} 
              variant="compact"
              onClick={onArticleClick}
            />
          ))}
        </div>
        <Button variant="ghost" className="w-full mt-4 text-primary">
          View All News
          <ChevronRight size={16} className="ml-1" />
        </Button>
      </motion.div>

      {/* Trending News Widget */}
      {trendingNews && trendingNews.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl p-5 border border-border shadow-sm"
        >
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-primary" />
            Trending Now
          </h3>
          <div className="space-y-4">
            {trendingNews.slice(0, 4).map((article, index) => (
              <div 
                key={article._id || article.id}
                className="flex gap-3 items-start cursor-pointer group"
                onClick={() => onArticleClick?.(article)}
              >
                <span className="text-2xl font-bold text-primary/30 group-hover:text-primary transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {(article.views / 1000).toFixed(1)}K views
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Categories Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-xl p-5 border border-border shadow-sm"
      >
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <Tag size={18} className="text-primary" />
          Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant="secondary"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => onCategoryClick?.(category.name)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </motion.div>

      {/* Locations Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-xl p-5 border border-border shadow-sm"
      >
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <MapPin size={18} className="text-primary" />
          Locations
        </h3>
        <div className="flex flex-wrap gap-2">
          {locations.slice(0, 8).map((location) => (
            <Badge
              key={location}
              variant="outline"
              className="cursor-pointer hover:bg-accent transition-colors"
            >
              {location}
            </Badge>
          ))}
        </div>
      </motion.div>

      {/* Trending Tags Widget */}
      {trendingTags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-xl p-5 border border-border shadow-sm"
        >
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-primary" />
            Trending Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors capitalize"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </motion.div>
      )}

      {/* Newsletter Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-primary text-primary-foreground rounded-xl p-5 shadow-sm"
      >
        <h3 className="font-bold text-lg mb-2">Subscribe to Newsletter</h3>
        <p className="text-sm text-primary-foreground/80 mb-4">
          Get the latest news delivered to your inbox daily.
        </p>
        <form className="space-y-2">
          <Input 
            placeholder="Enter your email"
            className="bg-white/10 border-white/20 placeholder:text-white/50"
          />
          <Button variant="secondary" className="w-full">
            Subscribe
          </Button>
        </form>
      </motion.div>
    </aside>
  );
}
