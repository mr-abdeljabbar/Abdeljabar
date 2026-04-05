import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layers, Filter, Code2, Globe, Database, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/cards';
import { PageHeader } from '@/components/sections';
import { useLanguage } from '@/lib/i18n';

// Raw category keys (always English for data matching)
const RAW_CATEGORIES = ['All', 'Frontend', 'Full-Stack', 'SaaS', 'Mobile'];

const projects = [
  {
    title: 'Clickyx AI – AI Image Generation Platform',
    description: 'An AI-powered web application that enables users to generate images from text prompts. Designed as a creative tool for producing visuals quickly and easily through an intuitive browser-based interface.',
    image: '/images/clickyx.png',
    techStack: [{ name: 'React', color: 'blue' }, { name: 'TypeScript', color: 'blue' }, { name: 'Tailwind', color: 'cyan' }, { name: 'Node.js', color: 'green' }, { name: 'Postgres', color: 'blue' }, { name: 'API', color: 'purple' }],
    liveDemo: 'https://clickyx.netlify.app/',
    category: 'SaaS',
  },
  {
    title: 'NitroGym – Fitness & Gym Website',
    description: 'A fitness business website presenting gym services, workout information, and membership details. Designed as an informational platform to engage visitors and promote fitness services.',
    image: '/images/nitrogym.png',
    techStack: [{ name: 'HTML', color: 'orange' }, { name: 'React', color: 'blue' }, { name: 'TypeScript', color: 'blue' }, { name: 'Tailwind', color: 'cyan' }, { name: 'Node.js', color: 'green' }, { name: 'Netlify', color: 'blue' }],
    liveDemo: 'https://nitrogym.netlify.app/',
    category: 'Frontend',
  },
  {
    title: 'Centre Al-Ilham – Community & Cultural Center Website',
    description: 'A static informational website presenting the Centre Al-Ilham organization, its mission, services, and contact information.',
    image: '/images/centre-alilham.png',
    techStack: [{ name: 'React', color: 'blue' }, { name: 'TypeScript', color: 'blue' }, { name: 'Tailwind', color: 'cyan' }, { name: 'HTML', color: 'orange' }, { name: 'JavaScript', color: 'yellow' }, { name: 'Netlify', color: 'blue' }],
    liveDemo: 'https://centre-alilham.netlify.app/',
    category: 'Frontend',
  },
  {
    title: 'TexasRoofingAndConstruction – Roofing & Construction Services Website',
    description: 'A static business website presenting professional roofing and construction services, company information, and contact details.',
    image: '/images/texasroofing.png',
    techStack: [{ name: 'HTML', color: 'orange' }, { name: 'React', color: 'blue' }, { name: 'TypeScript', color: 'blue' }, { name: 'JavaScript', color: 'yellow' }, { name: 'Tailwind', color: 'cyan' }, { name: 'Netlify', color: 'blue' }],
    liveDemo: 'https://texasroofingandconstruction.netlify.app/',
    category: 'Frontend',
  },
  {
    title: 'Construction Company Website',
    description: 'A business website presenting construction services, company overview, and contact information.',
    image: '/images/ediconstruction.png',
    techStack: [{ name: 'React', color: 'blue' }, { name: 'Node.js', color: 'green' }, { name: 'TypeScript', color: 'blue' }, { name: 'Tailwind', color: 'cyan' }, { name: 'JavaScript', color: 'yellow' }, { name: 'Netlify', color: 'blue' }],
    liveDemo: 'https://ediconstruction-inc.netlify.app/',
    category: 'Frontend',
  },
  {
    title: 'Excavation & Plumbing Services Website',
    description: 'A service business website presenting excavation and plumbing solutions, company information, and contact details.',
    image: '/images/excavationandplumbing.png',
    techStack: [{ name: 'TypeScript', color: 'blue' }, { name: 'React', color: 'blue' }, { name: 'Tailwind', color: 'cyan' }, { name: 'JavaScript', color: 'yellow' }, { name: 'Netlify', color: 'blue' }],
    liveDemo: 'https://excavationandplumbing.netlify.app/',
    category: 'Frontend',
  },
  {
    title: 'ChronoMaster – Smart Stopwatch & Timer Web App',
    description: 'A lightweight web-based stopwatch and timer application designed for tracking time with a clean and interactive user interface.',
    image: '/images/chronomaster.png',
    techStack: [{ name: 'Node.js', color: 'green' }, { name: 'React', color: 'blue' }, { name: 'JavaScript', color: 'yellow' }, { name: 'Tailwind', color: 'cyan' }, { name: 'Netlify', color: 'blue' }],
    liveDemo: 'https://chronomasterapp.netlify.app/',
    category: 'Frontend',
  },
  {
    title: 'AtlasDrive – Car Rental & Mobility Web Platform',
    description: 'A car rental showcase web application that presents vehicle options and rental services with a modern UI.',
    image: '/images/atlasdrive.png',
    techStack: [{ name: 'Node.js', color: 'green' }, { name: 'React', color: 'blue' }, { name: 'JavaScript', color: 'yellow' }, { name: 'Tailwind', color: 'cyan' }, { name: 'Netlify', color: 'red' }],
    liveDemo: 'https://atlasdrive.netlify.app/',
    category: 'Full-Stack',
  },
  {
    title: 'LibriFind – Online Book Discovery Web App',
    description: 'A book search and discovery web application that allows users to explore books through a simple and interactive interface.',
    image: '/images/librifind.png',
    techStack: [{ name: 'Node.js', color: 'green' }, { name: 'React', color: 'blue' }, { name: 'JavaScript', color: 'yellow' }, { name: 'TypeScript', color: 'blue' }, { name: 'Tailwind', color: 'cyan' }, { name: 'Netlify', color: 'blue' }],
    liveDemo: 'https://librifind.netlify.app/',
    category: 'Frontend',
  },
  {
    title: 'EnglishSchool Kelaa – Language Learning School Website',
    description: 'A static educational website presenting an English language school, courses, and contact information.',
    image: '/images/englishschoolkelaa.png',
    techStack: [{ name: 'Node.js', color: 'green' }, { name: 'React', color: 'blue' }, { name: 'TypeScript', color: 'blue' }, { name: 'Tailwind', color: 'cyan' }, { name: 'Netlify', color: 'blue' }],
    liveDemo: 'https://englishschoolkelaa.netlify.app/',
    category: 'Full-Stack',
  },
  {
    title: 'La Délice – Restaurant / Food Service Website',
    description: 'A static website showcasing a restaurant or food brand, including menu and presentation content.',
    image: '/images/ladelice.png',
    techStack: [{ name: 'Node.js', color: 'green' }, { name: 'React', color: 'blue' }, { name: 'TypeScript', color: 'blue' }, { name: 'Tailwind', color: 'cyan' }, { name: 'Netlify', color: 'blue' }],
    liveDemo: 'https://ladelice.netlify.app/',
    category: 'Full-Stack',
  },
  {
    title: 'CERYSA – Cyber-Themed Developer Website',
    description: 'A personal developer website showcasing identity, projects, and technical skills with a futuristic hacker-style design.',
    image: '/images/cerysa.png',
    techStack: [{ name: 'HTML', color: 'orange' }, { name: 'CSS', color: 'blue' }, { name: 'JavaScript', color: 'yellow' }, { name: 'Cloudflare', color: 'orange' }],
    liveDemo: 'https://cerysa.netlify.app/',
    category: 'SaaS',
  },
  {
    title: 'Victoria Smolyar – Business & IP Attorney Website',
    description: 'A professional legal services website showcasing business and intellectual property law expertise.',
    image: '/images/victoriasmolyar.png',
    techStack: [{ name: 'HTML', color: 'orange' }, { name: 'React', color: 'blue' }, { name: 'TypeScript', color: 'blue' }, { name: 'Tailwind', color: 'cyan' }, { name: 'Node.js', color: 'green' }, { name: 'Netlify', color: 'blue' }],
    liveDemo: 'https://victoriasmolyar.netlify.app/',
    category: 'Full-Stack',
  },
];

const TECH_ICONS = [Code2, Database, Globe, Layers];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { t } = useLanguage();
  const p = t.projects;

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((proj) => proj.category === activeFilter);

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <PageHeader
        icon={Code2}
        badge={p.badge}
        title1={p.title1}
        title2={p.title2}
        description={p.desc}
      />

      {/* Filter & Projects */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
            <div className="flex items-center gap-2 text-zinc-400">
              <Filter className="w-4 h-4" />
              <span className="text-sm">{p.filterLabel}</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {RAW_CATEGORIES.map((raw, i) => {
                const label = p.categories[i] ?? raw;
                return (
                  <Button key={raw} variant={activeFilter === raw ? 'default' : 'outline'} size="sm"
                    onClick={() => setActiveFilter(raw)}
                    className={activeFilter === raw
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950'
                      : 'border-white/10 hover:bg-white/5 text-zinc-400 hover:text-white'}>
                    {label}
                  </Button>
                );
              })}
            </div>
          </motion.div>

          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
              <Layers className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{p.noProjects}</h3>
              <p className="text-zinc-400">{p.noProjectsSub}</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="relative py-24 lg:py-32 mt-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{p.techTitle}</h2>
            <p className="text-zinc-400">{p.techSub}</p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4">
            {p.techItems.map((name, index) => {
              const Icon = TECH_ICONS[index];
              return (
                <motion.div key={name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center gap-3 p-6 bg-zinc-900/30 border border-white/5 rounded-xl hover:border-emerald-500/20 transition-colors min-w-[140px] flex-1 sm:flex-none">
                  <Icon className="w-8 h-8 text-emerald-400" />
                  <span className="text-sm text-zinc-400 text-center">{name}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 p-8 sm:p-12 text-center">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{p.ctaTitle}</h2>
              <p className="text-zinc-400 mb-8 max-w-xl mx-auto text-lg">{p.ctaSub}</p>
              <div className="flex justify-center">
                <Link to="/start-project">
                  <Button size="lg"
                    className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-lg h-12 px-8 gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105">
                    <Sparkles className="w-5 h-5" />
                    {p.ctaBtn}
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
