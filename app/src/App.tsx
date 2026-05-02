import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { Navbar } from '@/components/layout';
import { LanguageProvider, useLanguage } from '@/lib/i18n';

const Home = lazy(() => import('@/pages').then(m => ({ default: m.Home })));
const About = lazy(() => import('@/pages').then(m => ({ default: m.About })));
const Projects = lazy(() => import('@/pages').then(m => ({ default: m.Projects })));
const Domains = lazy(() => import('@/pages').then(m => ({ default: m.Domains })));
const Contact = lazy(() => import('@/pages').then(m => ({ default: m.Contact })));
const PaymentSuccess = lazy(() => import('@/pages').then(m => ({ default: m.PaymentSuccess })));
const StartProject = lazy(() => import('@/pages').then(m => ({ default: m.StartProject })));
const Services = lazy(() => import('@/pages').then(m => ({ default: m.Services })));
const ArabicLanding = lazy(() => import('@/pages').then(m => ({ default: m.ArabicLanding })));

import { Github, Linkedin, X, Facebook, Instagram, MessageCircle } from 'lucide-react';
import './App.css';

const FiverrIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.107 6.429h-3.214V5.357c0-.286.214-.536.535-.536h2.679V1.071h-2.679c-2.357 0-4.286 1.929-4.286 4.286V6.43H7.464V10.71h2.679v12.214h4.286V10.71h3.75l.535-4.286zM6.429 10.714H1.071v4.286h5.358v-4.286z" />
  </svg>
);

function ScrollToHashElement() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash]);
  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const WA_BASE = 'https://wa.me/212700789623?text=';
const WA_TEXTS: Record<string, string> = {
  fr: 'Bonjour%2C%20je%20voudrais%20un%20devis%20pour%20un%20site%20web%20professionnel',
  en: 'Hello%2C%20I%20would%20like%20a%20quote%20for%20a%20professional%20website',
  ar: 'السلام%20عليكم%2C%20بغيت%20عرض%20سعر%20لموقع%20ويب%20احترافي',
};

function AppInner() {
  const { t, lang } = useLanguage();
  const { pathname } = useLocation();
  const waLink = WA_BASE + (WA_TEXTS[lang] ?? WA_TEXTS.fr);
  const isAr = pathname === '/offer';

  return (
    <div className="min-h-screen bg-zinc-950 overflow-x-hidden">
      <ScrollToTop />
      <ScrollToHashElement />
      {!isAr && <Navbar />}

      <main>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-zinc-950">
            <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/domains" element={<Domains />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/start-project" element={<StartProject />} />
            <Route path="/offer" element={<ArabicLanding />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer + WhatsApp — hidden on Arabic landing page which has its own */}
      {!isAr && (
        <>
          <footer className="border-t border-white/5 bg-zinc-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center overflow-hidden p-0.5">
                    <img src="/logo.png" alt="Abdeljabar Logo" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-zinc-400 text-sm">{t.footer.copy}</span>
                </div>
                <div className="flex items-center gap-6">
                  {[
                    { href: 'https://www.facebook.com/profile.php?id=61588393573891', icon: Facebook },
                    { href: 'https://www.instagram.com/go.abdeljabar', icon: Instagram },
                    { href: 'https://x.com/b_abdeljabbar', icon: X },
                    { href: 'https://www.linkedin.com/in/babdeljabbar', icon: Linkedin },
                    { href: 'https://github.com/mr-abdeljabbar', icon: Github },
                    { href: 'https://wa.me/212700789623', icon: MessageCircle },
                  ].map(({ href, icon: Icon }) => (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-emerald-400 transition-colors">
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                  <a href="https://www.fiverr.com/s/o8lvXz8" target="_blank" rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-emerald-400 transition-colors">
                    <FiverrIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </footer>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 left-6 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
            style={{ backgroundColor: '#25D366', color: 'white' }}
            aria-label={t.nav.cta}
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.12.553 4.107 1.518 5.83L.055 23.454a.5.5 0 0 0 .491.546c.06 0 .12-.011.177-.034l5.82-2.118A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.028-1.382l-.36-.213-3.733 1.357 1.302-3.624-.234-.373A9.818 9.818 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/>
            </svg>
          </a>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <LanguageProvider>
          <AppInner />
        </LanguageProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
