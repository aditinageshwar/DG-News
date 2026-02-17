import React, { useState } from 'react';
import { ChevronDown, Menu, Search, Bell, X, Facebook, Twitter, Instagram, Youtube, ChevronRight } from 'lucide-react';
import { MapPin } from 'lucide-react';

const DGNewsHome = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMPDropdownOpen, setIsMPDropdownOpen] = useState(false);

  //Dummy Data
  const mpDistricts = [
    "Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur",
    "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad",
    "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur",
    "Neemuch", "Niwari", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni",
    "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"
  ];

  const categories = ["Home", "Politics", "Business", "Technology", "Entertainment", "Sports", "Health", "Education"];
  
  const featuredNews = {
    category: "Breaking News",
    title: "Major Economic Policy Shift Announced for 2026 Fiscal Year",
    description: "The government has unveiled a comprehensive roadmap aimed at boosting digital infrastructure and local manufacturing.",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=1200"
  };

  const trendingNews = [
    { id: 1, category: "Tech", title: "New AI regulations to be implemented globally", date: "2 hours ago" },
    { id: 2, category: "Sports", title: "National team secures victory in qualifiers", date: "5 hours ago" },
    { id: 3, category: "Market", title: "Stock market hits record high amid festive season", date: "7 hours ago" },
    { id: 4, category: "Health", title: "New breakthroughs in sustainable healthcare", date: "Yesterday" },
  ];

  const newsCards = [
    { id: 1, category: "Business", title: "AI Startups in India save ₹20,000 crore in logistics through automation", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=60&w=500", date: "February 17, 2026" },
    { id: 2, category: "Politics", title: "Supreme Court refers Digital Personal Data Law challenge to Constitution Bench", img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=60&w=500",date: "February 16, 2026" },
    { id: 3, category: "Tech", title: "India-AI Impact Summit 2026: DRDO stresses need for indigenous AI in defense", img: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&q=60&w=500",date: "February 17, 2026" },
    { id: 4, category: "Education", title: "CBSE to introduce two Board Exam editions for Class 10 from 2026 session", img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=60&w=500",date: "February 15, 2026" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Top Bar */}
      <div className="bg-red-700 text-white py-2 px-4 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span>{new Date().toLocaleDateString('en-GB', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})} | Bhopal</span>
          <div className="flex space-x-4">
            <span>Login</span>
           <a 
            href="http://facebook.com/dgnews.co.in" 
            target="_blank" 
            className="hover:text-gray-300 transition-colors"
            aria-label="Facebook"
           >
            <Facebook size={16} />
           </a>

           <a 
            href="https://twitter.com/anilmalviya01" 
            target="_blank" 
            className="hover:text-gray-300 transition-colors"
            aria-label="Twitter"
           >
            <Twitter size={16} />
           </a>

           <a 
            href="https://www.instagram.com/dgnewsindia/" 
            target="_blank" 
            className="hover:text-gray-300 transition-colors"
            aria-label="Instagram"
           >
            <Instagram size={16} />
           </a>

           <a 
            href="https://www.youtube.com/dgnewsindia" 
            target="_blank" 
            className="hover:text-gray-300 transition-colors"
            aria-label="Youtube"
           >
            <Youtube size={16} />
           </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              <Menu size={28} />
            </button>
            <h1 className="text-3xl font-black tracking-tighter text-red-700 uppercase">DG NEWS</h1>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex ml-10 space-x-6 font-bold uppercase text-[13px] items-center">
            <a href="#" className="hover:text-red-700 transition-colors">Home</a>
            {/* Madhya Pradesh Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsMPDropdownOpen(true)}
              onMouseLeave={() => setIsMPDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-red-700 transition-colors text-red-700 border-b-2 border-red-700 pb-1">
                Madhya Pradesh <ChevronDown size={14} />
              </button>

              {/* Mega Dropdown for Districts */}
              <div className={`absolute top-full -left-20 mt-0 w-[650px] bg-white shadow-2xl border border-gray-100 p-6 rounded-b-lg transition-all duration-300 z-50 
                ${isMPDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
              
                <div className="mb-4 border-b pb-2"><span className="text-red-700 text-sm font-black italic">CHOOSE YOUR DISTRICT</span></div>
                <div className="grid grid-cols-4 gap-x-4 gap-y-2">
                {mpDistricts.map((district) => (
                  <a 
                    key={district} 
                    href={`#/${district.toLowerCase().replace(' ', '-')}`} 
                    className="text-[11px] text-gray-600 hover:text-red-700 hover:bg-gray-50 px-2 py-1 rounded transition-all"
                  >
                    {district}
                  </a>
                ))}
                </div>
               </div>
            </div>

            {/* Other Categories */}
            {categories.slice(1).map((cat) => (
              <a key={cat} href="#" className="hover:text-red-700 transition-colors whitespace-nowrap">{cat}</a>
            ))}
           </nav>

          {/* Search & Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative flex items-center">
               <input 
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`transition-all duration-300 ease-in-out border-b border-gray-300 focus:border-red-700 outline-none text-sm
                ${isSearchOpen ? 'w-40 md:w-64 opacity-100 px-2' : 'w-0 opacity-0'}`}
               />
            
               <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-1 hover:text-red-700 transition-colors">
                {isSearchOpen ? <X size={20} /> : <Search size={22} />}
               </button>
            </div>

            <button className="relative p-1 hover:text-red-700 transition-colors">
              <Bell size={22} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Hero Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="relative group overflow-hidden rounded-lg">
              <img 
                src={featuredNews.image} 
                alt="Featured" 
                className="w-full h-[450px] object-cover transform group-hover:scale-105 transition duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent p-6 text-white">
                <span className="bg-red-700 px-3 py-1 text-xs font-bold uppercase mb-3 inline-block">
                  {featuredNews.category}
                </span>
                <h2 className="text-3xl font-bold leading-tight mb-2">
                  {featuredNews.title}
                </h2>
                <p className="text-gray-200 line-clamp-2">{featuredNews.description}</p>
              </div>
            </div>

            {/* Grid of smaller news */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsCards.map((news) => (
              <div key={news.id} className="bg-white flex flex-col sm:flex-row gap-4 p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all group">
               <div className="relative overflow-hidden rounded-md shrink-0">
                <img 
                  src={news.img} 
                  className="w-full sm:w-36 h-48 sm:h-28 object-cover transform group-hover:scale-105 transition duration-500" 
                  alt={news.title} 
                />
                <span className="absolute top-2 left-2 bg-red-700 text-white text-[10px] px-2 py-0.5 rounded font-bold sm:hidden">
                  {news.category}
                </span>
               </div>

               {/* Content Area */}
               <div className="flex flex-col justify-between flex-grow">
                <div>
                  <div className="hidden sm:flex justify-between items-center mb-1">
                    <span className="text-red-700 text-[10px] font-extrabold uppercase tracking-widest">{news.category}</span>
                    <span className="text-gray-400 text-[11px] font-medium">{news.date}</span>
                  </div>
          
                  <h3 className="font-bold text-base leading-tight text-gray-800 group-hover:text-red-700 transition-colors line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-gray-400 text-[11px] mt-1 sm:hidden">{news.date}</p>
                </div>

                <div className="mt-4">
                 <button className="w-full sm:w-auto px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold uppercase rounded transition-colors flex items-center justify-center gap-2">
                  Continue Reading
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-3 w-3" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7-7 7" />
                  </svg>
                 </button>
                </div>
               </div>
              </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="bg-white p-6 border-t-4 border-red-700 shadow-sm">
              <h4 className="text-xl font-bold mb-4 flex items-center">Trending Updates <ChevronRight className="text-red-700" /></h4>
              <div className="divide-y divide-gray-100">
                {trendingNews.map((news) => (
                  <div key={news.id} className="py-4 first:pt-0 group cursor-pointer">
                    <span className="text-xs text-gray-500 font-medium uppercase">{news.category}</span>
                    <h5 className="font-semibold group-hover:text-red-700 transition-colors mt-1">{news.title}</h5>
                    <p className="text-xs text-gray-400 mt-1">{news.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gray-900 p-6 rounded-lg text-white">
              <h4 className="text-lg font-bold mb-2">Subscribe to DG News</h4>
              <p className="text-gray-400 text-sm mb-4">Get the latest headlines delivered to your inbox.</p>
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded mb-3 text-sm focus:outline-none focus:border-red-500"
              />
              <button className="w-full bg-red-700 hover:bg-red-800 py-2 rounded font-bold transition">
                JOIN NOW
              </button>
            </div>
          </aside>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <h2 className="text-2xl font-black text-red-700 mb-4">DG NEWS</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-2">
              Leading the way in digital journalism, DG News provides the latest updates from across the globe, keeping you informed 24/7.
            </p>
            {/* Clickable Address Section */}
            <div className="flex items-start space-x-2 group">
              <MapPin size={10} className="text-red-700 mt-1 shrink-0" />
              <a 
               href="https://www.google.com/maps/place//data=!3m4!1e2!3m2!1sCIHM0ogKEICAgIDeoZzPDQ!2e10!4m2!3m1!1s0x397c42f53c880af7:0x2f11fd292161a05d"
               target="_blank" 
               className="text-gray-500 text-sm hover:text-red-700 transition-colors cursor-pointer"
              >
                BDA 96 C Maa Hinglaj Sewa Sansthan,<br />
                Hitech Publication, Shivaji Nagar,<br />
                Bhopal, Madhya Pradesh 462016
             </a>
            </div>
          </div>

          <div>
            <h5 className="font-bold mb-4 uppercase text-sm tracking-widest">Categories</h5>
            <ul className="text-gray-500 text-sm space-y-2">
              <li>World News</li>
              <li>India News</li>
              <li>Madhya Pradesh News</li>
              <li>Stock Market</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4 uppercase text-sm tracking-widest">Company</h5>
            <ul className="text-gray-500 text-sm space-y-2">
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4 uppercase text-sm tracking-widest">Follow Us</h5>
            <div className="flex space-x-4">
                <a href="http://facebook.com/dgnews.co.in" className="text-gray-400 hover:text-red-700 cursor-pointer" aria-label="Facebook">
                  <Facebook size={24} />
                </a>
                <a href="https://twitter.com/anilmalviya01" className="text-gray-400 hover:text-red-700 cursor-pointer" aria-label="Twitter">
                  <Twitter size={24} />
                </a>
                <a href="https://www.youtube.com/dgnewsindia" className="text-gray-400 hover:text-red-700 cursor-pointer" aria-label="Youtube">
                  <Youtube size={24} />
                </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t mt-10 pt-6 text-center text-gray-400 text-sm">
          © 2023 DG News Network. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default DGNewsHome;