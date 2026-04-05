import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, Linkedin, X, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/i18n';

const FiverrIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.107 6.429h-3.214V5.357c0-.286.214-.536.535-.536h2.679V1.071h-2.679c-2.357 0-4.286 1.929-4.286 4.286V6.43H7.464V10.71h2.679v12.214h4.286V10.71h3.75l.535-4.286zM6.429 10.714H1.071v4.286h5.358v-4.286z" />
  </svg>
);

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();
  const c = t.contact;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch('https://formspree.io/f/xreapdog', {
        method: 'POST', body: formData, headers: { 'Accept': 'application/json' },
      });
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const data = await response.json();
        setError(Object.prototype.hasOwnProperty.call(data, 'errors')
          ? data.errors.map((err: { message: string }) => err.message).join(', ')
          : c.errorMsg);
      }
    } catch {
      setError(c.errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socials = [
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61588393573891', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/go.abdeljabar', label: 'Instagram' },
    { icon: X, href: 'https://x.com/b_abdeljabbar', label: 'X' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/babdeljabbar', label: 'LinkedIn' },
    { icon: MessageCircle, href: 'https://wa.me/212700789623', label: 'WhatsApp' },
    { icon: FiverrIcon, href: 'https://www.fiverr.com/s/o8lvXz8', label: 'Fiverr' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <Helmet>
        <title>Contact | Demandez un Devis Gratuit – Abdeljabar Développeur Web Maroc</title>
        <meta name="description" content="Contactez Abdeljabar pour votre projet de site web au Maroc. Réponse garantie en moins de 24h. Disponible par email, WhatsApp et réseaux sociaux. Devis gratuit." />
        <link rel="alternate" hrefLang="fr" href="https://abdeljabar.com/fr/contact" />
        <link rel="alternate" hrefLang="ar" href="https://abdeljabar.com/ar/contact" />
        <link rel="alternate" hrefLang="en" href="https://abdeljabar.com/en/contact" />
        <link rel="alternate" hrefLang="x-default" href="https://abdeljabar.com/contact" />
      </Helmet>
      {/* Header */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-500/5 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-[128px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-6 bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
              <Mail className="w-4 h-4 mr-2" />{c.badge}
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {c.title1} <span className="gradient-text">{c.title2}</span>
            </h1>
            <p className="text-lg text-zinc-400">{c.desc}</p>
          </motion.div>
        </div>
      </section>

      {/* Form & Info */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-3xl blur-xl" />
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="relative p-8 bg-zinc-900/50 border border-white/5 rounded-3xl space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-zinc-300">{c.name}</label>
                          <Input name="name" type="text" placeholder={c.namePh} required
                            className="bg-zinc-950/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-emerald-500/50" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-zinc-300">{c.email}</label>
                          <Input name="email" type="email" placeholder={c.emailPh} required
                            className="bg-zinc-950/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-emerald-500/50" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">{c.subject}</label>
                        <Input name="subject" type="text" placeholder={c.subjectPh} required
                          className="bg-zinc-950/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-emerald-500/50" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">{c.message}</label>
                        <Textarea name="message" placeholder={c.messagePh} required rows={5}
                          className="bg-zinc-950/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-emerald-500/50 resize-none" />
                      </div>
                      {error && (
                        <p className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">{error}</p>
                      )}
                      <Button type="submit" disabled={isSubmitting}
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold py-6 disabled:opacity-50">
                        <Send className={`w-5 h-5 mr-2 ${isSubmitting ? 'animate-pulse' : ''}`} />
                        {isSubmitting ? c.sendingBtn : c.sendBtn}
                      </Button>
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-white/5" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-zinc-900 px-2 text-zinc-500">{c.orReach}</span>
                        </div>
                      </div>
                      <a href="https://wa.me/212700789623" target="_blank" rel="noopener noreferrer" className="block w-full">
                        <Button type="button" variant="outline"
                          className="w-full border-emerald-500/20 hover:border-emerald-500/50 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-400 py-6">
                          <MessageCircle className="w-5 h-5 mr-2" />
                          {c.whatsappBtn}
                        </Button>
                      </a>
                    </motion.form>
                  ) : (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                      className="relative p-12 bg-zinc-900/50 border border-emerald-500/20 rounded-3xl text-center space-y-6 flex flex-col items-center justify-center min-h-[400px]">
                      <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
                        <Send className="w-10 h-10 text-emerald-400" />
                      </div>
                      <h3 className="text-3xl font-bold text-white">{c.successTitle}</h3>
                      <p className="text-zinc-400 text-lg max-w-sm">{c.successMsg}</p>
                      <Button onClick={() => setIsSubmitted(false)} variant="outline"
                        className="mt-4 border-white/10 text-zinc-400 hover:text-white hover:bg-white/5">
                        {c.sendAnother}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }} className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">{c.infoTitle}</h2>
                <p className="text-zinc-400 mb-8">{c.infoSub}</p>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{c.emailLabel}</h3>
                    <a href="mailto:owner@abdeljabar.com" className="text-zinc-400 hover:text-emerald-400 transition-colors">
                      owner@abdeljabar.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{c.locationLabel}</h3>
                    <p className="text-zinc-400">
                      {c.location}<br />
                      <span className="text-sm">{c.locationSub}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5">
                <h3 className="text-lg font-semibold text-white mb-4">{c.socialTitle}</h3>
                <div className="flex gap-3">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-12 h-12 rounded-xl bg-zinc-900/50 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300">
                      <s.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-medium text-emerald-400">{c.availableBadge}</span>
                </div>
                <p className="text-zinc-400 text-sm">{c.availableMsg}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
