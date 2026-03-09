import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid3X3, List, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import NewsCard from '@/components/NewsCard';

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

export default function NewsGrid({ 
  articles, 
  title = 'Latest News', 
  showFilters = true,
  onArticleClick,
  selectedCategory = '',
  onCategoryChange
}) {
  const [viewMode, setViewMode] = useState('grid');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  const filteredArticles = articles.filter(article => {
    if (selectedCategory && article.category !== selectedCategory) return false;
    if (locationFilter && locationFilter !== 'all' && article.location !== locationFilter) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    } else if (sortBy === 'popular') {
      return b.views - a.views;
    }
    return 0;
  });

  const handleCategoryChange = (value) => {
    onCategoryChange?.(value === 'all' ? '' : value);
  };

  const handleLocationChange = (value) => {
    setLocationFilter(value);
  };

  return (
    <section className="py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">{title}</h2>
          {selectedCategory && (
            <Badge variant="secondary" className="text-sm">
              {selectedCategory}
              <button 
                onClick={() => onCategoryChange?.('')}
                className="ml-2 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
        </div>

        {showFilters && (
          <div className="flex items-center gap-2 flex-wrap">
            {/* Category Filter */}
            <Select value={selectedCategory || 'all'} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-[140px]">
                <Filter size={14} className="mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Select value={locationFilter} onValueChange={handleLocationChange}>
              <SelectTrigger className="w-[140px]">
                <SlidersHorizontal size={14} className="mr-2" />
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map(loc => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode Toggle */}
            <div className="flex items-center border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                className="rounded-none h-9 w-9"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 size={16} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                className="rounded-none h-9 w-9"
                onClick={() => setViewMode('list')}
              >
                <List size={16} />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <p className="text-sm text-muted-foreground mb-4">
        Showing {filteredArticles.length} articles
      </p>

      {/* News Grid/List */}
      <motion.div 
        layout
        className={viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'flex flex-col gap-4'
        }
      >
        {filteredArticles.map((article, index) => (
          <motion.div
            key={article._id || article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <NewsCard 
              article={article} 
              variant={viewMode === 'list' ? 'horizontal' : 'default'}
              onClick={onArticleClick}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No articles found matching your criteria.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              onCategoryChange?.('');
              setLocationFilter('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </section>
  );
}
