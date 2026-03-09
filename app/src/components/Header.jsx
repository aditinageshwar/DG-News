import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Facebook, 
  Twitter, 
  Youtube, 
  Instagram,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

export default function Header({ onSearch, onCategorySelect }) {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
    setIsSearchOpen(false);
  };

  const handleCategoryClick = (categoryName) => {
    if (onCategorySelect) {
      onCategorySelect(categoryName);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="bg-primary dark:bg-primary/90 text-primary-foreground py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="text-xs bg-red-500 px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-white/80 transition-colors"><Facebook size={16} /></a>
            <a href="#" className="hover:text-white/80 transition-colors"><Twitter size={16} /></a>
            <a href="#" className="hover:text-white/80 transition-colors"><Youtube size={16} /></a>
            <a href="#" className="hover:text-white/80 transition-colors"><Instagram size={16} /></a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">DG</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-foreground leading-tight">DG News</h1>
                <p className="text-xs text-muted-foreground">Daily Global Gazette</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleCategoryClick('')}
                className="font-medium"
              >
                Home
              </Button>
              {categories.slice(0, 5).map((category) => (
                <Button
                  key={category.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCategoryClick(category.name)}
                  className="font-medium"
                >
                  {category.name}
                </Button>
              ))}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('more')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Button variant="ghost" size="sm" className="font-medium flex items-center gap-1">
                  More <ChevronDown size={14} />
                </Button>
                <AnimatePresence>
                  {activeDropdown === 'more' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-50"
                    >
                      {categories.slice(5).map((category) => (
                        <button
                          key={category.id}
                          onClick={() => handleCategoryClick(category.name)}
                          className="w-full text-left px-4 py-2 hover:bg-accent transition-colors text-sm"
                        >
                          {category.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 'auto', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    onSubmit={handleSearch}
                    className="overflow-hidden"
                  >
                    <Input
                      type="text"
                      placeholder="Search news..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-48 sm:w-64"
                      autoFocus
                    />
                  </motion.form>
                )}
              </AnimatePresence>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                {isSearchOpen ? <X size={20} /> : <Search size={20} />}
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="relative"
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
              <Button
                variant="ghost"
                className="justify-start"
                onClick={() => handleCategoryClick('')}
              >
                Home
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant="ghost"
                  className="justify-start"
                  onClick={() => handleCategoryClick(category.name)}
                >
                  {category.name}
                </Button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
