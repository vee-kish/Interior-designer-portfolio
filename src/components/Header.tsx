import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Services & Pricing', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Request Booking', path: '/booking', mobileOnly: true },
  ];

  return (
    <nav className="sticky top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-stone-50/80 backdrop-blur-md border-b border-stone-200/50 shadow-sm transition-all duration-300">
      <Link to="/" className="text-xl font-serif font-bold tracking-widest text-primary z-50 transition-colors hover:text-stone-800">
        AMANI INTERIORS
      </Link>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-10">
        {navLinks.filter(link => !link.mobileOnly).map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "font-serif text-sm tracking-widest uppercase transition-all duration-300 hover:text-secondary",
              location.pathname === link.path 
                ? "text-primary font-bold border-b border-secondary pb-1"
                : "text-stone-500"
            )}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <Link 
          to="/booking"
          className="hidden sm:inline-block bg-primary-container text-white px-8 py-3 label-caps tracking-widest scale-95 active:scale-90 transition-all hover:bg-[#234f3b] shadow-sm"
        >
          Book Now
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden z-50 p-2 text-primary hover:text-secondary transition-colors focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-5">
            <span className={cn(
              "absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ease-in-out",
              isMenuOpen ? "top-2 rotate-45" : "top-0"
            )} />
            <span className={cn(
              "absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ease-in-out",
              isMenuOpen ? "opacity-0" : "top-2"
            )} />
            <span className={cn(
              "absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ease-in-out",
              isMenuOpen ? "top-2 -rotate-45" : "top-4"
            )} />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 1 }}
              className="fixed right-0 top-0 bottom-0 w-[80%] max-w-sm bg-stone-50 z-40 flex flex-col p-12 md:hidden shadow-2xl"
            >
              <div className="mt-16 flex flex-col gap-8">
                <span className="label-caps text-secondary opacity-60 mb-2">Explore Studio</span>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "text-2xl font-serif tracking-tight transition-all duration-300 hover:pl-2 hover:text-secondary",
                      location.pathname === link.path ? "text-primary font-bold" : "text-stone-500"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Gallery Peek */}
              <div className="mt-12 hidden xs:block">
                <span className="label-caps text-secondary opacity-60 mb-4 block">Portfolio Peek</span>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-24 bg-stone-200 rounded overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=200" className="w-full h-full object-cover" alt="Portfolio 1" />
                  </div>
                  <div className="h-24 bg-stone-200 rounded overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=200" className="w-full h-full object-cover" alt="Portfolio 2" />
                  </div>
                </div>
              </div>
              
              <div className="mt-auto pt-10 border-t border-stone-200">
                <p className="text-xs font-serif text-stone-500 leading-relaxed italic mb-8">
                  "Creating spaces that harmonize contemporary functionality with the soulful textures of Kenyan craftsmanship."
                </p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:border-secondary hover:text-secondary transition-all">
                    <span className="text-[10px] uppercase font-bold">IG</span>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:border-secondary hover:text-secondary transition-all">
                    <span className="text-[10px] uppercase font-bold">IN</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
