import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Code2,
  Globe,
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AboutSection } from '@/components/sections';


const features = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description:
      'Building scalable web applications with modern technologies like React, Node.js, and cloud infrastructure.',
  },
  {
    icon: Globe,
    title: 'Domain Investing',
    description:
      'Curating premium digital real estate. High-value domains for tech, finance, and SaaS industries.',
  },
  {
    icon: Zap,
    title: 'Digital Strategy',
    description:
      'Combining technical expertise with market insights to deliver comprehensive digital solutions.',
  },
];



export function Home() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(240_6%_3%)_100%)]" />
        </div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-zinc-300">
                Full-Stack Developer & Domain Broker
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            >
              Building{' '}
              <span className="gradient-text">Scalable Web Apps</span>
              <br />
              <span className="text-zinc-400">& Curating</span>{' '}
              <span className="gradient-text">Premium Digital Real Estate</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl mx-auto text-lg sm:text-xl text-zinc-400 mb-10"
            >
              Dual expertise in full-stack development and digital strategy.
              I craft high-performance applications while managing a portfolio
              of premium domain names for forward-thinking businesses.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/projects">
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold px-8"
                >
                  <Code2 className="w-5 h-5 mr-2" />
                  View Projects
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/domains">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/10 hover:bg-white/5 text-white px-8"
                >
                  <Globe className="w-5 h-5 mr-2" />
                  Browse Domains
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </motion.div>
        </motion.div>
      </section>




      {/* About Section */}
      <AboutSection />

      {/* Features Section */}

      <section className="relative py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Dual Expertise, <span className="gradient-text">Double Value</span>
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              Combining technical excellence with strategic domain investing to
              deliver comprehensive digital solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-8 bg-zinc-900/30 border border-white/5 rounded-2xl hover:border-emerald-500/20 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="relative py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/10 via-zinc-900/50 to-blue-500/10 border border-white/5 p-12 lg:p-16"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />

            <div className="relative text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Build or Acquire?
              </h2>
              <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8">
                Whether you need a high-performance web application or want to
                secure a premium domain for your brand, let&apos;s discuss how I
                can help.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="mailto:owner@abdeljabar.com">

                  <Button
                    size="lg"
                    className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold px-8"
                  >
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Get in Touch
                  </Button>
                </a>
                <Link to="/projects">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/10 hover:bg-white/5 text-white px-8"
                  >
                    <Layers className="w-5 h-5 mr-2" />
                    Explore Work
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
