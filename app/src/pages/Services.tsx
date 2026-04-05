import { motion } from 'framer-motion';
import { Check, MessageCircle, Globe, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/i18n';

function Code2Icon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export function Services() {
  const { t } = useLanguage();
  const s = t.services;

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16">

      {/* Header */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[128px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant="outline" className="mb-6 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
              <Globe className="w-4 h-4 mr-2" />{s.badge}
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {s.title1} <span className="gradient-text">{s.title2}</span>
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">{s.desc}</p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {s.packages.map((pkg, index) => (
              <motion.div key={pkg.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col bg-zinc-900/50 border rounded-2xl p-8 hover:border-emerald-500/30 transition-all duration-500 ${pkg.badge ? 'border-emerald-500/40 ring-1 ring-emerald-500/20' : 'border-white/5'}`}>
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-zinc-950 text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                    {pkg.badge}
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                  <div className="text-2xl font-bold text-emerald-400 mb-1">{pkg.price}</div>
                  <div className="text-sm text-zinc-500">{s.deliveryPrefix} {pkg.delay}</div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/212700789623?text=Bonjour%2C%20je%20suis%20intéressé%20par%20l'offre%20"${encodeURIComponent(pkg.name)}"`}
                  target="_blank" rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${pkg.badge ? 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950' : 'bg-zinc-800 hover:bg-emerald-500 hover:text-zinc-950 text-zinc-300'}`}>
                  <MessageCircle className="w-4 h-4" />
                  {pkg.cta} {s.whatsappSuffix}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              {s.processTitle} <span className="gradient-text">{s.processTitleGrad}</span>
            </h2>
            <p className="text-zinc-400">{s.processSub}</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {s.processSteps.map((step, i) => {
              const icons = [MessageCircle, Code2Icon, Globe];
              const Icon = icons[i];
              return (
                <motion.div key={step.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="relative p-8 bg-zinc-900/30 border border-white/5 rounded-2xl hover:border-emerald-500/20 transition-all text-center">
                  <div className="text-5xl font-black text-white/5 absolute top-4 right-6 font-mono">{step.step}</div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="relative py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-white mb-8">
              {s.citiesTitle} <span className="gradient-text">{s.citiesTitleGrad}</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {s.cities.map((city) => (
                <span key={city}
                  className="flex items-center gap-1.5 px-4 py-2 bg-zinc-900/50 border border-white/5 rounded-full text-sm text-zinc-400 hover:border-emerald-500/30 hover:text-white transition-all">
                  📍 {city}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-24 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-16">
            <HelpCircle className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">
              {s.faqTitle} <span className="gradient-text">{s.faqTitleGrad}</span>
            </h2>
          </motion.div>
          <div className="space-y-4">
            {s.faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="p-6 bg-zinc-900/50 border border-white/5 rounded-xl hover:border-emerald-500/20 transition-all">
                <h3 className="font-semibold text-white mb-3 text-sm">{faq.q}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-10 bg-gradient-to-br from-emerald-500/10 via-zinc-900/50 to-blue-500/10 border border-white/5 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-4">{s.ctaTitle}</h2>
            <p className="text-zinc-400 mb-6 text-sm">{s.ctaSub}</p>
            <a href="https://wa.me/212700789623?text=Bonjour%2C%20je%20voudrais%20un%20devis%20gratuit%20pour%20mon%20site%20web"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold rounded-lg transition-all hover:scale-105 text-sm">
              <MessageCircle className="w-5 h-5" />
              {s.ctaBtn}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
