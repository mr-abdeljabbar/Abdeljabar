import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AboutSectionProps {
    standalone?: boolean;
}

export function AboutSection({ standalone = true }: AboutSectionProps) {
    return (
        <section id="about" className={`relative ${standalone ? 'py-24 lg:py-32' : 'pb-24 lg:pb-32'} bg-zinc-900/50 border-y border-white/5`}>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {standalone && (
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                                <span className="gradient-text">Bridging Vision & Execution</span>
                            </h2>
                        )}
                        <div className="space-y-6 text-lg text-zinc-400">

                            <p>
                                I’m a Full-Stack Developer and Digital Strategist focused on
                                building practical, scalable digital products that align with
                                real business goals. I believe technology should serve
                                strategy—not the other way around.
                            </p>
                            <p>
                                Beyond development, I provide domain sales and domain
                                consulting services, helping businesses choose, secure, and
                                optimize the right domain names for branding, SEO, and
                                long-term growth.
                            </p>
                            <p>
                                Every project I work on starts with deep discovery—understanding
                                the business model, user needs, and market positioning. From
                                there, I design and build clean, reliable, and future-ready
                                solutions that deliver real impact.
                            </p>
                            <div className="pt-4 flex justify-center">
                                <Link to="/contact">
                                    <Button
                                        size="lg"
                                        className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold px-8"
                                    >
                                        <TrendingUp className="w-5 h-5 mr-2" />
                                        Get in Touch                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 rounded-2xl blur-2xl transform rotate-3" />
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 to-transparent z-10" />
                            <img
                                src="/images/profile.jpg"
                                alt="Profile"
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
