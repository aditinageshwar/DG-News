import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/Header';
import BreakingNewsTicker from '@/components/BreakingNewsTicker';
import Footer from '@/components/Footer';
import NewsDetail from '@/components/NewsDetail';
import Sidebar from '@/components/Sidebar';
import HeroSection from '@/sections/HeroSection';
import NewsGrid from '@/sections/NewsGrid';
import VideoSection from '@/sections/VideoSection';
import { newsApi, videoApi } from '@/lib/api';
import './App.css';

// Mock data for initial render
const mockNews = [
  {
    id: '1',
    title: 'Government Announces Major Infrastructure Development Plan Worth $50 Billion',
    excerpt: 'The central government has unveiled an ambitious infrastructure development plan aimed at transforming the nation\'s connectivity.',
    content: 'In a landmark announcement today, the government revealed a comprehensive infrastructure development plan valued at $50 billion. The initiative focuses on building modern highways, bridges, and urban transit systems across major metropolitan areas.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    category: 'National',
    author: 'Rajesh Sharma',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    publishedAt: '2026-03-10T08:30:00Z',
    readTime: '5 min',
    isBreaking: true,
    isFeatured: true,
    views: 125000,
    tags: ['infrastructure', 'government', 'economy'],
    location: 'New Delhi'
  },
  {
    id: '2',
    title: 'Tech Giants Report Record Quarterly Earnings Amid AI Boom',
    excerpt: 'Major technology companies have exceeded analyst expectations with their latest quarterly results.',
    content: 'Leading technology firms announced record-breaking quarterly earnings today, surpassing Wall Street predictions by significant margins.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    category: 'Technology',
    author: 'Priya Patel',
    publishedAt: '2026-03-10T07:15:00Z',
    readTime: '4 min',
    isBreaking: true,
    views: 98000,
    tags: ['technology', 'AI', 'earnings'],
    location: 'Bangalore'
  },
  {
    id: '3',
    title: 'Indian Cricket Team Secures Historic Test Series Victory',
    excerpt: 'In a thrilling finish, Team India clinched the Test series against Australia.',
    content: 'The Indian cricket team created history today by securing a memorable Test series victory against Australia.',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80',
    category: 'Sports',
    author: 'Vikram Singh',
    publishedAt: '2026-03-09T18:45:00Z',
    readTime: '6 min',
    isFeatured: true,
    views: 210000,
    tags: ['cricket', 'sports', 'team-india'],
    location: 'Melbourne'
  }
];

const mockVideos = [
  {
    id: 'v1',
    title: 'Live: Parliament Monsoon Session - Key Bills Discussion',
    thumbnail: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&q=80',
    videoUrl: 'https://example.com/video1',
    duration: '2:45:30',
    category: 'Politics',
    author: 'DG News Desk',
    publishedAt: '2026-03-10T09:00:00Z',
    views: 45000
  },
  {
    id: 'v2',
    title: 'Exclusive Interview: Finance Minister on Economic Growth',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80',
    videoUrl: 'https://example.com/video2',
    duration: '28:15',
    category: 'Business',
    author: 'Economic Bureau',
    publishedAt: '2026-03-09T16:30:00Z',
    views: 67000
  },
  {
    id: 'v3',
    title: 'Match Highlights: India vs Australia - Final Test Day 5',
    thumbnail: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80',
    videoUrl: 'https://example.com/video3',
    duration: '15:42',
    category: 'Sports',
    author: 'Sports Desk',
    publishedAt: '2026-03-09T20:00:00Z',
    views: 189000
  }
];

function AppContent() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [news, setNews] = useState(mockNews);
  const [videos, setVideos] = useState(mockVideos);
  const [loading, setLoading] = useState(true);

  // Fetch news from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await newsApi.getAll();
        if (response.data && response.data.length > 0) {
          setNews(response.data);
        }
      } catch (error) {
        console.log('Using mock data - API not available');
      } finally {
        setLoading(false);
      }
    };

    const fetchVideos = async () => {
      try {
        const response = await videoApi.getAll();
        if (response.data && response.data.length > 0) {
          setVideos(response.data);
        }
      } catch (error) {
        console.log('Using mock video data - API not available');
      }
    };

    fetchNews();
    fetchVideos();
  }, []);

  // Filter articles based on search and category
  const filteredArticles = useMemo(() => {
    return news.filter(article => {
      if (selectedCategory && article.category !== selectedCategory) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = article.title.toLowerCase().includes(query);
        const matchesExcerpt = article.excerpt.toLowerCase().includes(query);
        const matchesTags = article.tags?.some(tag => tag.toLowerCase().includes(query));
        return matchesTitle || matchesExcerpt || matchesTags;
      }
      return true;
    });
  }, [news, selectedCategory, searchQuery]);

  // Get breaking news
  const breakingNews = useMemo(() => {
    return news.filter(article => article.isBreaking);
  }, [news]);

  // Get featured news
  const featuredNews = useMemo(() => {
    return news.filter(article => article.isFeatured);
  }, [news]);

  // Get latest news (sorted by date)
  const latestNews = useMemo(() => {
    return [...news].sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [news]);

  // Get trending news (sorted by views)
  const trendingNews = useMemo(() => {
    return [...news].sort((a, b) => b.views - a.views);
  }, [news]);

  // Get related articles for the detail view
  const getRelatedArticles = (article) => {
    if (!article) return [];
    return news.filter(a => 
      (a._id !== article._id && a.id !== article.id) && 
      (a.category === article.category || a.tags?.some(tag => article.tags?.includes(tag)))
    ).slice(0, 4);
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    setIsDetailOpen(true);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedCategory('');
    const newsSection = document.getElementById('news-section');
    if (newsSection) {
      newsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchQuery('');
    const newsSection = document.getElementById('news-section');
    if (newsSection) {
      newsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header 
        onSearch={handleSearch}
        onCategorySelect={handleCategorySelect}
      />

      {/* Breaking News Ticker */}
      <BreakingNewsTicker news={breakingNews} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <HeroSection 
          featuredNews={featuredNews.length > 0 ? featuredNews : news.slice(0, 3)}
          onArticleClick={handleArticleClick}
        />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Section */}
            <VideoSection videos={videos} />

            {/* News Grid */}
            <div id="news-section">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory + searchQuery}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <NewsGrid
                    articles={filteredArticles}
                    title={searchQuery ? `Search Results: "${searchQuery}"` : selectedCategory || 'Latest News'}
                    showFilters={true}
                    onArticleClick={handleArticleClick}
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategorySelect}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Sidebar
                latestNews={latestNews}
                trendingNews={trendingNews}
                onArticleClick={handleArticleClick}
                onCategoryClick={handleCategorySelect}
                onSearch={handleSearch}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer onCategoryClick={handleCategorySelect} />

      {/* News Detail Modal */}
      <NewsDetail
        article={selectedArticle}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        relatedArticles={getRelatedArticles(selectedArticle)}
        onRelatedArticleClick={(article) => {
          setSelectedArticle(article);
        }}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
