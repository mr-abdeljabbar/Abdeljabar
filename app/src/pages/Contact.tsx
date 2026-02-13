import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Linkedin, X, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

export function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Thank you for your message! I will get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16">
      {/* Header */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-500/5 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-[128px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge
              variant="outline"
              className="mb-6 bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
            >
              <Mail className="w-4 h-4 mr-2" />
              Get in Touch
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Let&apos;s <span className="gradient-text">Connect</span>
            </h1>
            <p className="text-lg text-zinc-400">
              Whether you&apos;re interested in a project collaboration, want to
              inquire about a domain, or just want to say hello, I&apos;d love to
              hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-3xl blur-xl" />
                <form
                  action="https://formspree.io/f/xreapdog"
                  method="POST"
                  className="relative p-8 bg-zinc-900/50 border border-white/5 rounded-3xl space-y-6"
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">
                        Name
                      </label>
                      <Input
                        name="name"
                        type="text"
                        placeholder="Your name"
                        required
                        className="bg-zinc-950/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300">
                        Email
                      </label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="bg-zinc-950/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">
                      Subject
                    </label>
                    <Input
                      name="subject"
                      type="text"
                      placeholder="Project inquiry / Domain purchase / Other"
                      required
                      className="bg-zinc-950/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      placeholder="Tell me about your project or inquiry..."
                      required
                      rows={5}
                      className="bg-zinc-950/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-emerald-500/20 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold py-6"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Contact Information
                </h2>
                <p className="text-zinc-400 mb-8">
                  Feel free to reach out through any of these channels. I
                  typically respond within 24-48 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Email
                    </h3>
                    <a
                      href="mailto:owner@abdeljabar.com"

                      className="text-zinc-400 hover:text-emerald-400 transition-colors"
                    >
                      owner@abdeljabar.com

                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      Location
                    </h3>
                    <p className="text-zinc-400">
                      Remote / Worldwide
                      <br />
                      <span className="text-sm">
                        Available for global collaborations
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Connect on Social
                </h3>
                <div className="flex gap-3">
                  {[
                    {
                      icon: Facebook,
                      href: 'https://www.facebook.com/people/Abdeljabar-Bougrine/61585574073923/',
                      label: 'Facebook'
                    },
                    {
                      icon: Instagram,
                      href: 'https://www.instagram.com/go.abdeljabar',
                      label: 'Instagram'
                    },
                    {
                      icon: X,
                      href: 'https://x.com/b_abdeljabbar',
                      label: 'X'
                    },
                    {
                      icon: Linkedin,
                      href: 'https://www.linkedin.com/in/babdeljabbar',
                      label: 'LinkedIn',
                    },
                    {
                      icon: MessageCircle,
                      href: 'https://wa.me/212700789623',
                      label: 'WhatsApp',
                    }
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-zinc-900/50 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-300"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Response Badge */}
              <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-2xl">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-medium text-emerald-400">
                    Currently Available
                  </span>
                </div>
                <p className="text-zinc-400 text-sm">
                  I&apos;m currently accepting new projects and domain inquiries.
                  Response time is typically within 24 hours.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
