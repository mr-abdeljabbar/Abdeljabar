import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Globe, Sparkles, Zap, Layers, Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AboutSection } from '@/components/sections';
import { useLanguage } from '@/lib/i18n';

const FEATURE_ICONS = [Code2, Globe, Zap];

export function Home() {
  const { t } = useLanguage();
  const h = t.home;

  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const total = h.testimonialsList.length;

  const go = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setActiveIdx((next + total) % total);
  }, [total]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(activeIdx + 1, 1), 5000);
    return () => clearInterval(id);
  }, [activeIdx, paused, go]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-zinc-950">

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(240_6%_3%)_100%)]" />
        </div>
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)`, backgroundSize: '60px 60px' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">

            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-zinc-300">{h.heroBadge}</span>
            </motion.div>

            {/* H1 */}
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 text-balance">
              {h.heroH1a}{' '}
              <span className="gradient-text">{h.heroH1b}</span>
              <br />
              <span className="text-zinc-400">{h.heroH1c}</span>{' '}
              <span className="gradient-text">{h.heroH1d}</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto text-lg sm:text-xl text-zinc-400 mb-10">
              {h.heroSub}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://wa.me/212700789623?text=Bonjour%2C%20je%20voudrais%20un%20devis%20pour%20un%20site%20web%20professionnel"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold rounded-md transition-colors duration-300 text-base">
                {h.heroCta1}
              </a>
              <Link to="/projects">
                <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 text-white px-8">
                  <Layers className="w-5 h-5 mr-2" />
                  {h.heroCta2}
                </Button>
              </Link>
            </motion.div>

            {/* Stats Bar */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-6 mt-14 pt-10 border-t border-white/5">
              {h.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white font-mono">{stat.value}</div>
                  <div className="text-xs text-zinc-500 mt-1 tracking-wide uppercase">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── About ──────────────────────────────────────────────────── */}
      <AboutSection />

      {/* ── Business Types ─────────────────────────────────────────── */}
      <section className="relative py-16 border-t border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }} className="text-center mb-10">
            <p className="text-sm text-zinc-500 uppercase tracking-widest mb-3">{h.businessSub}</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {h.businessTitle} <span className="gradient-text">{h.businessTitleGrad}</span>
            </h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {h.businessTypes.map((type) => (
              <motion.div key={type.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900/50 border border-white/5 rounded-full text-sm text-zinc-300 hover:border-emerald-500/30 hover:text-white transition-all duration-300">
                <span>{type.icon}</span>
                <span>{type.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {h.featuresTitle} <span className="gradient-text">{h.featuresTitleGrad}</span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">{h.featuresSub}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {h.features.map((feature, index) => {
              const Icon = FEATURE_ICONS[index];
              return (
                <motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative p-8 bg-zinc-900/30 border border-white/5 rounded-2xl hover:border-emerald-500/20 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
                      <Icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                    <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────── */}
      <section className="relative py-24 lg:py-32 border-t border-white/5 overflow-hidden"
        onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[128px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-14">
            <Badge variant="outline" className="mb-5 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
              <Star className="w-3.5 h-3.5 mr-1.5 fill-emerald-400" />{h.testimonialsBadge}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              {h.testimonialsTitle} <span className="gradient-text">{h.testimonialsTitleGrad}</span>
            </h2>
          </motion.div>

          {/* Card */}
          <div className="relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div key={activeIdx} custom={direction} variants={variants}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="bg-zinc-900/50 border border-white/8 rounded-3xl p-8 sm:p-10 relative overflow-hidden">
                {/* Quote icon */}
                <Quote className="absolute top-6 right-8 w-10 h-10 text-emerald-500/10" />

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: h.testimonialsList[activeIdx].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-zinc-200 text-lg sm:text-xl leading-relaxed mb-8 font-light">
                  "{h.testimonialsList[activeIdx].text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-zinc-950 font-bold text-base flex-shrink-0">
                    {h.testimonialsList[activeIdx].name.charAt(0)}
                  </div>
                  <div className="font-semibold text-white">{h.testimonialsList[activeIdx].name}</div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next */}
            <button onClick={() => go(activeIdx - 1, -1)} aria-label="Previous"
              className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-emerald-500/40 transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => go(activeIdx + 1, 1)} aria-label="Next"
              className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-emerald-500/40 transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {h.testimonialsList.map((_, i) => (
              <button key={i} onClick={() => go(i, i > activeIdx ? 1 : -1)} aria-label={`Go to ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${i === activeIdx ? 'w-6 h-2 bg-emerald-500' : 'w-2 h-2 bg-zinc-600 hover:bg-zinc-400'}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ─────────────────────────────────────────────── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/10 via-zinc-900/50 to-blue-500/10 border border-white/5 p-12 lg:p-16">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
            <div className="relative text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{h.ctaTitle}</h2>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8">{h.ctaSub}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="https://wa.me/212700789623?text=Bonjour%2C%20je%20voudrais%20un%20devis%20pour%20un%20site%20web"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold rounded-md transition-colors duration-300">
                  {h.ctaBtn1}
                </a>
                <Link to="/projects">
                  <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 text-white px-8">
                    <Layers className="w-5 h-5 mr-2" />
                    {h.ctaBtn2}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
