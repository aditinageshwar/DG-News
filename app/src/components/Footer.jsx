import { motion } from 'framer-motion';
import { 
  Facebook, 
  Twitter, 
  Youtube, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin,
  Send,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

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

const quickLinks = [
  { label: 'About Us', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Advertise', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
];

export default function Footer({ onCategoryClick }) {
  return (
    <footer className="bg-muted/50 border-t border-border">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">DG</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">DG News</h3>
                <p className="text-xs text-muted-foreground">Daily Global Gazette</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Your trusted source for breaking news, in-depth analysis, and comprehensive coverage of national and international events.
            </p>
            <div className="flex gap-2">
              <a href="#" className="p-2 bg-background rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-background rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-background rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                <Youtube size={18} />
              </a>
              <a href="#" className="p-2 bg-background rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </motion.div>

          {/* Categories Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-bold text-lg mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => onCategoryClick?.(category.name)}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-sm"
                  >
                    <ChevronRight size={14} />
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 text-sm"
                  >
                    <ChevronRight size={14} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Newsletter Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={16} className="text-primary" />
                123 News Street, Media City, NY 10001
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone size={16} className="text-primary" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={16} className="text-primary" />
                editor@dgnews.com
              </li>
            </ul>

            <h4 className="font-bold text-lg mb-3">Newsletter</h4>
            <form className="flex gap-2">
              <Input 
                placeholder="Your email"
                className="flex-1"
              />
              <Button size="icon">
                <Send size={16} />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <Separator />
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2026 DG News. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
