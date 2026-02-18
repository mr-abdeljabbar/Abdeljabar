import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';

import { Navbar } from '@/components/layout';
// Lazy load pages for better performance
const Home = lazy(() => import('@/pages').then(module => ({ default: module.Home })));
const About = lazy(() => import('@/pages').then(module => ({ default: module.About })));
const Projects = lazy(() => import('@/pages').then(module => ({ default: module.Projects })));
const Domains = lazy(() => import('@/pages').then(module => ({ default: module.Domains })));
const Contact = lazy(() => import('@/pages').then(module => ({ default: module.Contact })));
import { Github, Linkedin, X, Facebook, Instagram, MessageCircle } from 'lucide-react';
import './App.css';

function ScrollToHashElement() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 overflow-x-hidden">
        <ScrollToTop />
        <ScrollToHashElement />
        <Navbar />

        <main>
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-zinc-950">
              <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/domains" element={<Domains />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        {/* Footer */}
        <footer className="border-t border-white/5 bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center overflow-hidden p-0.5">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
                </div>
                <span className="text-zinc-400 text-sm">
                  © 2024 Abdeljabar.com. All rights reserved.

                </span>
              </div>
              <div className="flex items-center gap-6">
                <a
                  href="https://www.facebook.com/people/Abdeljabar-Bougrine/61585574073923/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-emerald-400 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/go.abdeljabar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-emerald-400 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/b_abdeljabbar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-emerald-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/babdeljabbar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-emerald-400 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/mr-abdeljabbar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-emerald-400 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/212700789623"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
