import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage, type Lang } from '@/lib/i18n';

const LANG_OPTIONS: { code: Lang; label: string }[] = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t, lang, setLang } = useLanguage();

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.services, path: '/services' },
    { name: t.nav.projects, path: '/projects' },
    { name: t.nav.about, path: '/about' },
    { name: t.nav.contact, path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [location]);

  const startProjectLabel = lang === 'ar' ? '🚀 ابدأ مشروعك' : lang === 'en' ? '🚀 Start a Project' : '🚀 Démarrer un Projet';

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 rounded-lg blur-lg group-hover:bg-emerald-500/30 transition-all duration-300" />
              <div className="relative flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-white/10 p-0.5 overflow-hidden">
                <img src="/logo.png" alt="Abdeljabar.com Logo" className="w-full h-full object-cover" />
              </div>
            </div>
            <span className="gradient-text font-bold text-lg hidden sm:inline">Abdeljabar.com</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button
                  variant="ghost"
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'text-emerald-400'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {location.pathname === link.path && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute inset-0 bg-emerald-500/10 rounded-lg"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative">{link.name}</span>
                </Button>
              </Link>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center gap-0.5 bg-zinc-900/60 border border-white/10 rounded-lg p-0.5">
              {LANG_OPTIONS.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => setLang(opt.code)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all duration-200 ${
                    lang === opt.code
                      ? 'bg-emerald-500 text-zinc-950'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Phone */}
            <a href="tel:+212700789623"
              className="hidden lg:flex items-center gap-1.5 text-sm text-zinc-400 hover:text-emerald-400 transition-colors duration-300">
              <span>📞</span>
              <span>{t.nav.phone}</span>
            </a>

            {/* Start a Project CTA */}
            <Link to="/start-project"
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-zinc-950 bg-emerald-500 rounded-lg hover:bg-emerald-400 transition-colors duration-300 whitespace-nowrap">
              {startProjectLabel}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-zinc-400 hover:text-white hover:bg-white/5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-zinc-950/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.07 }}
                >
                  <Link to={link.path}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-left px-4 py-3 ${
                        location.pathname === link.path
                          ? 'text-emerald-400 bg-emerald-500/10'
                          : 'text-zinc-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                    </Button>
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Language Switcher */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.07 }}
                className="flex items-center gap-1 pt-2 px-1"
              >
                {LANG_OPTIONS.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => setLang(opt.code)}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      lang === opt.code
                        ? 'bg-emerald-500 text-zinc-950'
                        : 'bg-zinc-900/50 border border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </motion.div>

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.07 }}
                className="pt-1"
              >
                <Link to="/start-project"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold text-zinc-950 bg-emerald-500 rounded-lg hover:bg-emerald-400 transition-colors">
                  {startProjectLabel}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
