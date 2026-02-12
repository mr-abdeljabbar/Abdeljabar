import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface PageHeaderProps {
    icon: LucideIcon;
    badge: string;
    title1: string;
    title2: string;
    description: string;
    children?: ReactNode;
}

export function PageHeader({ icon: Icon, badge, title1, title2, description, children }: PageHeaderProps) {
    return (
        <section className="relative py-16 lg:py-24 overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[128px]" />
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
                        <Icon className="w-4 h-4 mr-2" />
                        {badge}
                    </Badge>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                        {title1} <span className="gradient-text">{title2}</span>
                    </h1>
                    <p className="text-lg text-zinc-400">
                        {description}
                    </p>
                    {children && <div className="mt-8">{children}</div>}
                </motion.div>
            </div>
        </section>
    );
}
