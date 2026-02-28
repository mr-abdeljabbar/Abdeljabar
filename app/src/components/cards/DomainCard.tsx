import { motion } from 'framer-motion';
import { ExternalLink, Shield, Tag, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface DomainCardProps {
  domain: string;
  status: 'For Sale' | 'Premium' | 'Sold' | 'Reserved';
  category: string;
  price?: string;
  description?: string;
  buyUrl?: string;
  marketplace?: string;
  index?: number;
}

const statusConfig = {
  'For Sale': {
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    icon: Tag,
  },
  Premium: {
    color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    icon: Sparkles,
  },
  Sold: {
    color: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
    icon: Shield,
  },
  Reserved: {
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    icon: Shield,
  },
};

const categoryColors: Record<string, string> = {
  Tech: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Finance: 'bg-green-500/10 text-green-400 border-green-500/20',
  SaaS: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  AI: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  Crypto: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Health: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  Education: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  Ecommerce: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
};

export function DomainCard({
  domain,
  status,
  category,
  price,
  description,
  buyUrl,
  marketplace = 'GoDaddy Marketplace',
  index = 0,
}: DomainCardProps) {
  const statusStyle = statusConfig[status];
  const StatusIcon = statusStyle.icon;

  const handleInquiry = () => {
    const subject = encodeURIComponent(`Domain Inquiry: ${domain}`);
    const body = encodeURIComponent(
      `Hi,\n\nI'm interested in purchasing the domain: ${domain}\n\nPlease provide more information about the pricing and transfer process.\n\nBest regards`
    );
    window.location.href = `mailto:owner@abdeljabar.com?subject=${subject}&body=${body}`;

  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative h-full bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-500">
        {/* Status Badge */}
        <div className="flex items-center justify-between mb-4">
          <Badge
            variant="outline"
            className={`text-xs font-medium ${statusStyle.color}`}
          >
            <StatusIcon className="w-3 h-3 mr-1" />
            {status}
          </Badge>
          <Badge
            variant="outline"
            className={`text-xs font-medium ${categoryColors[category] ||
              'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
              }`}
          >
            {category}
          </Badge>
        </div>

        {/* Domain Name */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300 break-all">
            {domain}
          </h3>
          {price && (
            <p className="mt-2 text-lg font-semibold text-emerald-400">
              {price}
            </p>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-zinc-400 mb-6 line-clamp-2">
            {description}
          </p>
        )}

        {/* Trust Element */}
        <div className="flex items-center gap-2 mb-4 text-xs text-zinc-500">
          <Shield className="w-4 h-4 text-emerald-500/60" />
          <span>{marketplace}</span>
        </div>

        {/* CTA Button */}
        {status !== 'Sold' && (
          buyUrl ? (
            <a href={buyUrl} target="_blank" rel="noopener noreferrer" className="block w-full">
              <Button
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold transition-all duration-300 group/btn"
              >
                <span>Buy Now</span>
                <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-0.5 transition-transform" />
              </Button>
            </a>
          ) : (
            <Button
              onClick={handleInquiry}
              className="w-full bg-zinc-800 hover:bg-emerald-500 hover:text-zinc-950 text-zinc-300 font-medium transition-all duration-300 group/btn"
            >
              <span>Inquire to Buy</span>
              <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-0.5 transition-transform" />
            </Button>
          )
        )}
        {status === 'Sold' && (
          <Button
            disabled
            className="w-full bg-zinc-800/50 text-zinc-500 cursor-not-allowed"
          >
            Sold
          </Button>
        )}
      </div>
    </motion.div>
  );
}
