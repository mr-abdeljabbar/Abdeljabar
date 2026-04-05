import { motion } from 'framer-motion';
import { ExternalLink, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/i18n';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  techStack: { name: string; color: string }[];
  liveDemo?: string;
  category: string;
  index?: number;
}

const techColors: Record<string, string> = {
  React: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Next.js': 'bg-zinc-500/10 text-zinc-300 border-zinc-500/20',
  TypeScript: 'bg-blue-600/10 text-blue-400 border-blue-600/20',
  'Node.js': 'bg-green-500/10 text-green-400 border-green-500/20',
  PostgreSQL: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  MongoDB: 'bg-green-600/10 text-green-400 border-green-600/20',
  Python: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  Django: 'bg-green-700/10 text-green-400 border-green-700/20',
  Tailwind: 'bg-cyan-400/10 text-cyan-400 border-cyan-400/20',
  GraphQL: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  AWS: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Docker: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Redis: 'bg-red-500/10 text-red-400 border-red-500/20',
  Prisma: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
};

export function ProjectCard({ title, description, image, techStack, liveDemo, category, index = 0 }: ProjectCardProps) {
  const { t } = useLanguage();

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative h-full bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-500">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10" />
          <img src={image} alt={title} loading="lazy" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute top-3 left-3 z-20">
            <Badge variant="secondary" className="bg-zinc-950/80 backdrop-blur-sm text-zinc-300 border-0 text-xs">
              <Layers className="w-3 h-3 mr-1" />{category}
            </Badge>
          </div>
        </div>
        {/* Content */}
        <div className="p-5 space-y-4">
          <div>
            <h3 className={`font-bold text-white group-hover:text-emerald-400 transition-colors duration-300 break-words leading-snug ${title.length > 40 ? 'text-base' : 'text-lg'}`}>
              {title}
            </h3>
            <p className="mt-2 text-sm text-zinc-400 line-clamp-2">{description}</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {techStack.map((tech) => (
              <Badge key={tech.name} variant="outline"
                className={`text-xs font-medium ${techColors[tech.name] || 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'}`}>
                {tech.name}
              </Badge>
            ))}
          </div>
          {liveDemo && (
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button size="sm" className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-medium" asChild>
                <a href={liveDemo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-1.5" />
                  {t.projects.visitBtn}
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
