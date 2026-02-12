import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Filter, Code2, Globe, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/cards';

import { PageHeader } from '@/components/sections';


const categories = ['All', 'Frontend', 'Full-Stack', 'Backend', 'Mobile'];

const projects = [
  {
    title: 'E-Commerce Platform',
    description:
      'A full-featured online marketplace with real-time inventory, payment processing, and admin dashboard.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop',
    techStack: [
      { name: 'React', color: 'blue' },
      { name: 'Node.js', color: 'green' },
      { name: 'PostgreSQL', color: 'cyan' },
      { name: 'Redis', color: 'red' },
    ],
    liveDemo: 'https://example.com',
    githubRepo: 'https://github.com',
    category: 'Full-Stack',
  },
  {
    title: 'AI Content Generator',
    description:
      'SaaS platform leveraging OpenAI API for automated content creation, SEO optimization, and scheduling.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
    techStack: [
      { name: 'Next.js', color: 'zinc' },
      { name: 'TypeScript', color: 'blue' },
      { name: 'Python', color: 'yellow' },
      { name: 'AWS', color: 'orange' },
    ],
    liveDemo: 'https://example.com',
    githubRepo: 'https://github.com',
    category: 'Full-Stack',
  },
  {
    title: 'Financial Dashboard',
    description:
      'Real-time analytics dashboard for tracking investments, portfolios, and market trends with data visualization.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
    techStack: [
      { name: 'React', color: 'blue' },
      { name: 'TypeScript', color: 'blue' },
      { name: 'D3.js', color: 'orange' },
      { name: 'GraphQL', color: 'pink' },
    ],
    liveDemo: 'https://example.com',
    githubRepo: 'https://github.com',
    category: 'Frontend',
  },
  {
    title: 'Task Management API',
    description:
      'RESTful API for team collaboration with real-time updates, file sharing, and project tracking features.',
    image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=450&fit=crop',
    techStack: [
      { name: 'Node.js', color: 'green' },
      { name: 'MongoDB', color: 'green' },
      { name: 'Docker', color: 'blue' },
      { name: 'Redis', color: 'red' },
    ],
    liveDemo: 'https://example.com',
    githubRepo: 'https://github.com',
    category: 'Backend',
  },
  {
    title: 'Social Media App',
    description:
      'Mobile-first social platform with stories, messaging, notifications, and content discovery algorithms.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop',
    techStack: [
      { name: 'React', color: 'blue' },
      { name: 'Node.js', color: 'green' },
      { name: 'PostgreSQL', color: 'cyan' },
      { name: 'AWS', color: 'orange' },
    ],
    liveDemo: 'https://example.com',
    githubRepo: 'https://github.com',
    category: 'Mobile',
  },
  {
    title: 'Healthcare Portal',
    description:
      'HIPAA-compliant patient management system with appointment scheduling, telemedicine, and EHR integration.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=450&fit=crop',
    techStack: [
      { name: 'Next.js', color: 'zinc' },
      { name: 'TypeScript', color: 'blue' },
      { name: 'Prisma', color: 'emerald' },
      { name: 'Docker', color: 'blue' },
    ],
    liveDemo: 'https://example.com',
    githubRepo: 'https://github.com',
    category: 'Full-Stack',
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

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
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
                className="flex flex-col items-center gap-3 p-6 bg-zinc-900/30 border border-white/5 rounded-xl hover:border-emerald-500/20 transition-colors"
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
