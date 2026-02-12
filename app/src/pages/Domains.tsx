import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Search, Filter, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DomainCard } from '@/components/cards';
import { PageHeader } from '@/components/sections';


const categories = ['All', 'Tech', 'Finance', 'SaaS', 'AI', 'Crypto'];

const domains = [
  {
    domain: '01fox.com',
    status: 'Premium' as const,
    category: 'Tech',
    price: '$200',
    buyUrl: 'https://forsale.godaddy.com/forsale/01fox.com',
    description:
      'Perfect for tech startups, digital products, or modern innovation platforms.',
  },
  {
    domain: 'chort.net',
    status: 'For Sale' as const,
    category: 'Tech',
    price: '$100',
    buyUrl: 'https://forsale.godaddy.com/forsale/chort.net',
    description:
      'Perfect for gaming brands, edgy communities, or underground culture projects.',
  },
  {
    domain: 'memeorbit.com',
    status: 'For Sale' as const,
    category: 'Crypto',
    price: '$150',
    buyUrl: 'https://forsale.godaddy.com/forsale/memeorbit.com',
    description:
      'Perfect for meme platforms, viral content hubs, or social entertainment brands.',
  },
  {
    domain: 'purpleslot.com',
    status: 'For Sale' as const,
    category: 'Crypto',
    price: '$150',
    buyUrl: 'https://forsale.godaddy.com/forsale/purpleslot.com',
    description:
      'Perfect for gaming platforms, crypto casinos, or online entertainment brands.',
  },
  {
    domain: 'syntaxserver.com',
    status: 'For Sale' as const,
    category: 'Crypto',
    price: '$150',
    buyUrl: 'https://forsale.godaddy.com/forsale/syntaxserver.com',
    description:
      'Perfect for developer platforms, APIs, cloud tools, or backend infrastructure.',
  },
  {
    domain: 'hidling.com',
    status: 'For Sale' as const,
    category: 'Crypto',
    price: '$150',
    buyUrl: 'https://forsale.godaddy.com/forsale/hidling.com',
    description:
      'Perfect for privacy tools, security apps, or stealth tech products.',
  },
  {
    domain: 'happiplus.com',
    status: 'Premium' as const,
    category: 'SaaS',
    price: '$250',
    buyUrl: 'https://forsale.godaddy.com/forsale/happiplus.com',
    description:
      'Perfect for wellness apps, subscription platforms, or lifestyle services.',
  },
  {
    domain: 'crateloop.com',
    status: 'For Sale' as const,
    category: 'SaaS',
    price: '$250',
    buyUrl: 'https://forsale.godaddy.com/forsale/crateloop.com',
    description:
      'Perfect for logistics platforms, SaaS tools, or delivery automation systems.',
  },
  {
    domain: 'clickyx.com',
    status: 'Premium' as const,
    category: 'Finance',
    price: '$475',
    buyUrl: 'https://forsale.godaddy.com/forsale/clickyx.com',
    description:
      'Perfect for marketing tools, ad platforms, or growth analytics brands.',
  },
  {
    domain: 'yieldaro.com',
    status: 'Premium' as const,
    category: 'Finance',
    price: '$475',
    buyUrl: 'https://forsale.godaddy.com/forsale/yieldaro.com',
    description:
      'Perfect for fintech platforms, investment tools, or performance analytics brands.',
  },
  {
    domain: 'unaffliction.com',
    status: 'For Sale' as const,
    category: 'SaaS',
    price: '$150',
    buyUrl: 'https://forsale.godaddy.com/forsale/unaffliction.com',
    description:
      'Perfect for mental health platforms, wellness brands, or motivational projects.',
  },
  {
    domain: 'cerysa.com',
    status: 'Premium' as const,
    category: 'SaaS',
    price: '$150',
    buyUrl: 'https://cerysa.com/',
    description:
      'Perfect for SaaS startups, AI products, or modern tech companies.',
  },
];

export function Domains() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDomains = domains.filter((domain) => {
    const matchesCategory =
      activeFilter === 'All' || domain.category === activeFilter;
    const matchesSearch =
      domain.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      domain.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const availableCount = domains.filter((d) => (d.status as string) !== 'Sold').length;
  const premiumCount = domains.filter((d) => d.status === 'Premium').length;

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <PageHeader
        icon={Globe}
        badge="Domain Portfolio"
        title1="Premium"
        title2="Digital Real Estate"
        description="A curated collection of high-value domain names for tech startups, SaaS businesses, and forward-thinking brands. Secure your perfect digital identity today."
      >
        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-3 px-6 py-3 bg-zinc-900/50 border border-white/5 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-white">
                {availableCount}
              </div>
              <div className="text-xs text-zinc-400">Available</div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 bg-zinc-900/50 border border-white/5 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-white">
                {premiumCount}
              </div>
              <div className="text-xs text-zinc-400">Premium</div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 bg-zinc-900/50 border border-white/5 rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-xs text-zinc-400">GoDaddy Marketplace</div>
            </div>
          </div>
        </div>
      </PageHeader>


      {/* Search & Filter */}
      <section className="relative py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4"
          >
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <Input
                type="text"
                placeholder="Search domains..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 bg-zinc-900/50 border-white/10 text-white placeholder:text-zinc-500 focus:border-emerald-500/50 focus:ring-emerald-500/20"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
              <Filter className="w-4 h-4 text-zinc-500 flex-shrink-0" />
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeFilter === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveFilter(category)}
                  className={`flex-shrink-0 ${activeFilter === category
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950'
                    : 'border-white/10 hover:bg-white/5 text-zinc-400 hover:text-white'
                    }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Domains Grid */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredDomains.map((domain, index) => (
              <DomainCard key={domain.domain} {...domain} index={index} />
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredDomains.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <Globe className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No domains found
              </h3>
              <p className="text-zinc-400">
                Try adjusting your search or filter criteria.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Trust Section */}
      <section className="relative py-24 lg:py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Secure & <span className="gradient-text">Hassle-Free</span>{' '}
                Transfers
              </h2>
              <p className="text-lg text-zinc-400 mb-8">
                Every domain transaction is handled with professionalism and
                security. I use trusted GoDaddy Marketplace to ensure safe transfers
                for both parties.
              </p>
              <div className="space-y-4">
                {[
                  'GoDaddy Marketplace verified transactions',
                  'Fast domain push or auth code transfer',
                  'Payment plans available for premium domains',
                  'Professional communication throughout',
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-zinc-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-3xl blur-2xl" />
              <div className="relative p-8 bg-zinc-900/50 border border-white/5 rounded-3xl">
                <div className="text-center">
                  <Globe className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Looking for Something Specific?
                  </h3>
                  <p className="text-zinc-400 mb-6">
                    If you don&apos;t see what you&apos;re looking for, I may have
                    additional domains in my portfolio. Let me know your
                    requirements.
                  </p>
                  <a href="/contact">
                    <Button className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold">
                      <Globe className="w-4 h-4 mr-2" />
                      Make an Inquiry
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
