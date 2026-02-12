import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Filter, Code2, Globe, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/cards';

import { PageHeader } from '@/components/sections';


const categories = ['All', 'Frontend', 'Full-Stack', 'Mobile'];

const projects = [
  {
    title: 'ChronoMaster – Smart Stopwatch & Timer Web App',
    description:
      'A lightweight web-based stopwatch and timer application designed for tracking time with a clean and interactive user interface. Built as a modern frontend app and hosted on Netlify.',
    image: '/images/chronomaster.png',
    techStack: [
      { name: 'Node.js', color: 'green' },
      { name: 'React', color: 'blue' },
      { name: 'JavaScript', color: 'yellow' },
      { name: 'Tailwind', color: 'cyan' },
      { name: 'Netlify', color: 'blue' },
    ],
    liveDemo: 'https://chronomasterapp.netlify.app/',
    githubRepo: 'https://github.com/mr-abdeljabbar/Chronomaster/',
    category: 'Frontend',
  },
  {
    title: 'AtlasDrive – Car Rental & Mobility Web Platform',
    description:
      'A car rental showcase web application that presents vehicle options and rental services with a modern UI. It works as a frontend web platform hosted on Netlify.',
    image: '/images/atlasdrive.png',
    techStack: [
      { name: 'Node.js', color: 'green' },
      { name: 'React', color: 'blue' },
      { name: 'JavaScript', color: 'yellow' },
      { name: 'Tailwind', color: 'cyan' },
      { name: 'Netlify', color: 'blue' },
    ],
    liveDemo: 'https://atlasdrive.netlify.app/',
    githubRepo: 'https://github.com/mr-abdeljabbar/AtlasDrive/',
    category: 'Frontend',
  },
  {
    title: 'LibriFind – Online Book Discovery Web App',
    description:
      'A book search and discovery web application that allows users to explore books through a simple and interactive interface. Built as a frontend JavaScript app deployed on Netlify.',
    image: '/images/librifind.png',
    techStack: [
      { name: 'Node.js', color: 'green' },
      { name: 'React', color: 'blue' },
      { name: 'JavaScript', color: 'yellow' },
      { name: 'TypeScript', color: 'blue' },
      { name: 'Tailwind', color: 'cyan' },
      { name: 'Netlify', color: 'blue' },
    ],
    liveDemo: 'https://librifind.netlify.app/',
    githubRepo: 'https://github.com/mr-abdeljabbar/LibriFind/',
    category: 'Frontend',
  },
  {
    title: 'EnglishSchool Kelaa – Language Learning School Website',
    description:
      'A static educational website presenting an English language school, courses, and contact information. Designed as a simple informational site for students and visitors.',
    image: '/images/englishschoolkelaa.png',
    techStack: [
      { name: 'Node.js', color: 'green' },
      { name: 'React', color: 'blue' },
      { name: 'TypeScript', color: 'blue' },
      { name: 'Tailwind', color: 'cyan' },
      { name: 'Netlify', color: 'blue' },
    ],
    liveDemo: 'https://englishschoolkelaa.netlify.app/',
    githubRepo: 'https://github.com/mr-abdeljabbar/ESK/',
    category: 'Frontend',
  },
  {
    title: 'La Délice – Restaurant / Food Service Website',
    description:
      'A static website showcasing a restaurant or food brand, including menu and presentation content. Designed for branding and customer information.',
    image: '/images/ladelice.png',
    techStack: [
      { name: 'Node.js', color: 'green' },
      { name: 'React', color: 'blue' },
      { name: 'TypeScript', color: 'blue' },
      { name: 'Tailwind', color: 'cyan' },
      { name: 'Netlify', color: 'blue' },
    ],
    liveDemo: 'https://ladelice.netlify.app/',
    githubRepo: 'https://github.com/mr-abdeljabbar/La-Delice/',
    category: 'Frontend',
  },
  {
    title: 'CERYSA – Developer Portfolio Website',
    description:
      'A personal portfolio website showcasing projects, skills, and developer identity with a tech-themed design. Built as a static web portfolio.',
    image: '/images/cerysa.png',
    techStack: [
      { name: 'HTML', color: 'orange' },
      { name: 'CSS', color: 'blue' },
      { name: 'JavaScript', color: 'yellow' },
      { name: 'Cloudflare', color: 'orange' },
    ],
    liveDemo: 'http://cerysa.com/',
    category: 'Frontend',
  },
];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-zinc-950 pt-24 pb-16">
      <PageHeader
        icon={Code2}
        badge="Live Projects"
        title1="Featured"
        title2="Development Work"
        description="A curated selection of full-stack applications, from e-commerce platforms to AI-powered SaaS solutions. Each project demonstrates modern architecture and scalable design patterns."
      />


      {/* Filter & Projects */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12"
          >
            <div className="flex items-center gap-2 text-zinc-400">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filter by category:</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeFilter === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveFilter(category)}
                  className={
                    activeFilter === category
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950'
                      : 'border-white/10 hover:bg-white/5 text-zinc-400 hover:text-white'
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                {...project}
                index={index}
              />
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <Layers className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No projects found
              </h3>
              <p className="text-zinc-400">
                Try selecting a different category filter.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Tech Stack Overview */}
      <section className="relative py-24 lg:py-32 mt-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Technologies I Work With
            </h2>
            <p className="text-zinc-400">
              Modern stack for building scalable, performant applications
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: Code2, name: 'React & Next.js' },
              { icon: Database, name: 'Node.js & Databases' },
              { icon: Globe, name: 'Cloud & DevOps' },
              { icon: Layers, name: 'TypeScript' },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center gap-3 p-6 bg-zinc-900/30 border border-white/5 rounded-xl hover:border-emerald-500/20 transition-colors min-w-[140px] flex-1 sm:flex-none"
              >
                <tech.icon className="w-8 h-8 text-emerald-400" />
                <span className="text-sm text-zinc-400 text-center">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
