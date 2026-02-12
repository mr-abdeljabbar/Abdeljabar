import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, Layers, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AboutSection, PageHeader } from '@/components/sections';



export function About() {
    return (
        <div className="min-h-screen bg-zinc-950 pt-20">
            <PageHeader
                icon={User}
                badge="About Me"
                title1="Bridging Vision"
                title2="& Execution"
                description="Full-Stack Developer and Digital Strategist focused on building practical, scalable digital products that align with real business goals."
            />
            <AboutSection standalone={false} />




            {/* CTA Section */}
            <section className="relative py-24 lg:py-32 border-t border-white/5">
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
                                <Link to="/contact">
                                    <Button
                                        size="lg"
                                        className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold px-8"
                                    >
                                        <TrendingUp className="w-5 h-5 mr-2" />
                                        Get in Touch
                                    </Button>
                                </Link>
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
